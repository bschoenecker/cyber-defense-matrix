import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.NEXTAUTH_SECRET ?? 'dev-secret'
const TTL_MS = 60 * 1000 // 1 minute

export function generatePrintToken(): string {
  const ts = Date.now().toString()
  const sig = createHmac('sha256', SECRET).update(ts).digest('hex')
  return `${ts}.${sig}`
}

export function validatePrintToken(token: string): boolean {
  const [ts, sig] = token.split('.')
  if (!ts || !sig) return false
  if (Date.now() - Number(ts) > TTL_MS) return false
  const expected = createHmac('sha256', SECRET).update(ts).digest('hex')
  try {
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}
