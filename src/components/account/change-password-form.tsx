'use client'

import { useState, useTransition } from 'react'
import { changePassword } from '@/app/actions/account'
import { validatePassword, PASSWORD_RULES } from '@/lib/password'
import { CheckCircleIcon } from 'lucide-react'

export function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    const fd = new FormData(e.currentTarget)
    const current = fd.get('current') as string
    const next = fd.get('next') as string
    const confirm = fd.get('confirm') as string

    const pwError = validatePassword(next)
    if (pwError) { setError(pwError); return }

    if (next !== confirm) { setError('New passwords do not match'); return }

    startTransition(async () => {
      try {
        await changePassword(current, next)
        setSuccess(true)
        ;(e.target as HTMLFormElement).reset()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to change password')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-xs text-zinc-400 font-medium">Current password</label>
        <input name="current" type="password" required
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-zinc-400 font-medium">New password</label>
        <input name="next" type="password" required minLength={12}
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500" />
        <p className="text-xs text-zinc-600">{PASSWORD_RULES}</p>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-zinc-400 font-medium">Confirm new password</label>
        <input name="confirm" type="password" required minLength={12}
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500" />
      </div>

      {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">{error}</p>}
      {success && (
        <p className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded px-3 py-2 flex items-center gap-1.5">
          <CheckCircleIcon className="h-3.5 w-3.5" /> Password changed successfully
        </p>
      )}

      <button type="submit" disabled={isPending}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded transition-colors">
        {isPending ? 'Saving…' : 'Change password'}
      </button>
    </form>
  )
}
