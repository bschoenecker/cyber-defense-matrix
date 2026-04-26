'use server'

import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-helpers'
import bcrypt from 'bcryptjs'
import { authenticator } from 'otplib'
import qrcode from 'qrcode'
import { validatePassword } from '@/lib/password'

export async function changePassword(currentPassword: string, newPassword: string) {
  const session = await requireAuth()
  const pwError = validatePassword(newPassword)
  if (pwError) throw new Error(pwError)

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!valid) throw new Error('Current password is incorrect')

  const passwordHash = await bcrypt.hash(newPassword, 12)
  await db.user.update({ where: { id: user.id }, data: { passwordHash } })
}

export async function generateMfaSecret(): Promise<{ secret: string; qrDataUrl: string }> {
  const session = await requireAuth()
  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) throw new Error('User not found')

  const secret = authenticator.generateSecret()
  const otpauth = authenticator.keyuri(user.email, 'Cyber Defense Matrix', secret)
  const qrDataUrl = await qrcode.toDataURL(otpauth, { width: 220, margin: 2 })

  // Store secret but leave mfaEnabled false until verified
  await db.user.update({ where: { id: user.id }, data: { mfaSecret: secret, mfaEnabled: false } })
  return { secret, qrDataUrl }
}

export async function verifyAndEnableMfa(code: string) {
  const session = await requireAuth()
  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user?.mfaSecret) throw new Error('No MFA setup in progress')

  const valid = authenticator.verify({ token: code.trim(), secret: user.mfaSecret })
  if (!valid) throw new Error('Invalid code — please try again')

  await db.user.update({ where: { id: user.id }, data: { mfaEnabled: true } })
}

export async function disableMfa(password: string) {
  const session = await requireAuth()
  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) throw new Error('Incorrect password')

  await db.user.update({ where: { id: user.id }, data: { mfaEnabled: false, mfaSecret: null } })
}
