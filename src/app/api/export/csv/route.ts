import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { db } from '@/lib/db'

function csvEscape(val: string | null | undefined): string {
  if (val == null) return ''
  const s = String(val)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

export async function GET() {
  await requireAuth()

  const entries = await db.cdmEntry.findMany({
    include: { createdBy: { select: { name: true } } },
    orderBy: [{ assetClass: 'asc' }, { nistFunction: 'asc' }, { createdAt: 'asc' }],
  })

  const header = ['Asset Class', 'NIST Function', 'Title', 'Description', 'Tool', 'Implemented', 'Notes', 'Created By', 'Created At']
  const rows = entries.map(e => [
    e.assetClass,
    e.nistFunction,
    e.title,
    e.description,
    e.tool,
    e.implemented ? 'Yes' : 'No',
    e.notes,
    e.createdBy?.name,
    e.createdAt.toISOString(),
  ].map(csvEscape).join(','))

  const csv = [header.join(','), ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="cdm-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
