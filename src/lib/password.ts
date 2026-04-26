export const PASSWORD_RULES = 'At least 12 characters, one number, and one symbol.'

export function validatePassword(password: string): string | null {
  if (password.length < 12) return 'Password must be at least 12 characters.'
  if (!/\d/.test(password)) return 'Password must contain at least one number.'
  if (!/[^a-zA-Z0-9]/.test(password)) return 'Password must contain at least one symbol.'
  return null
}
