import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { checkRateLimit, retryAfterSeconds } from '@/lib/rate-limit'

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req)

    // 10 attempts per IP per 15 minutes
    if (!checkRateLimit(`login:ip:${ip}`)) {
      return NextResponse.json(
        { valid: false, error: 'Too many attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSeconds(`login:ip:${ip}`)) } }
      )
    }

    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ valid: false })

    // Also rate limit per email to protect against distributed attacks on one account
    if (!checkRateLimit(`login:email:${email.toLowerCase()}`, 10)) {
      return NextResponse.json(
        { valid: false, error: 'Too many attempts for this account. Please try again later.' },
        { status: 429 }
      )
    }

    const user = await db.user.findUnique({ where: { email } })
    if (!user || !user.active) return NextResponse.json({ valid: false })

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return NextResponse.json({ valid: false })

    return NextResponse.json({ valid: true, requiresMfa: user.mfaEnabled })
  } catch {
    return NextResponse.json({ valid: false })
  }
}
