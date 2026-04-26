import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { generatePrintToken } from '@/lib/print-token'

export async function GET() {
  await requireAuth()

  const token = generatePrintToken()
  // Always use the internal port — NEXTAUTH_URL may be the external host:port
  const internalBase = `http://localhost:${process.env.PORT ?? 3000}`
  const printUrl = `${internalBase}/print/cdm?token=${token}`

  const puppeteer = await import('puppeteer')
  const browser = await puppeteer.default.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // critical for Docker — avoids /dev/shm exhaustion
      '--disable-gpu',
      '--no-zygote',
      '--single-process',
    ],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1400, height: 900 })
    await page.goto(printUrl, { waitUntil: 'networkidle0', timeout: 30000 })
    const pdf = await page.pdf({
      format: 'A3',
      landscape: true,
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
    })

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="cyber-defense-matrix-${new Date().toISOString().slice(0, 10)}.pdf"`,
      },
    })
  } finally {
    await browser.close()
  }
}
