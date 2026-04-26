'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { requireAdmin, requireAuth } from '@/lib/auth-helpers'
import bcrypt from 'bcryptjs'
import { validatePassword } from '@/lib/password'

export async function createUser(fd: FormData) {
  await requireAdmin()

  const name = (fd.get('name') as string)?.trim()
  const email = (fd.get('email') as string)?.trim().toLowerCase()
  const password = fd.get('password') as string
  const role = fd.get('role') as string

  if (!name || !email || !password || !role) throw new Error('All fields required')

  const pwError = validatePassword(password)
  if (pwError) throw new Error(pwError)

  const passwordHash = await bcrypt.hash(password, 12)
  await db.user.create({ data: { name, email, passwordHash, role: role as 'ADMIN' | 'EDITOR' | 'VIEWER' } })
  revalidatePath('/settings/users')
}

export async function updateUserRole(id: string, role: string) {
  await requireAdmin()
  await db.user.update({ where: { id }, data: { role: role as 'ADMIN' | 'EDITOR' | 'VIEWER' } })
  revalidatePath('/settings/users')
}

export async function toggleUserActive(id: string, active: boolean) {
  const session = await requireAdmin()
  if (id === session.user.id) throw new Error('Cannot deactivate yourself')
  await db.user.update({ where: { id }, data: { active } })
  revalidatePath('/settings/users')
}

export async function deleteUser(id: string) {
  const session = await requireAdmin()
  if (id === session.user.id) throw new Error('Cannot delete yourself')
  await db.user.delete({ where: { id } })
  revalidatePath('/settings/users')
}

export async function setMfaRequired(id: string, required: boolean) {
  await requireAdmin()
  await db.user.update({ where: { id }, data: { mfaRequired: required } })
  revalidatePath('/settings/users')
}

export async function adminResetPassword(id: string, newPassword: string) {
  await requireAdmin()
  const pwError = validatePassword(newPassword)
  if (pwError) throw new Error(pwError)
  const passwordHash = await bcrypt.hash(newPassword, 12)
  await db.user.update({ where: { id }, data: { passwordHash } })
}
