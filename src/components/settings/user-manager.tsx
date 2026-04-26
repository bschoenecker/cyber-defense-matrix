'use client'

import { useState, useTransition } from 'react'
import { createUser, updateUserRole, toggleUserActive, deleteUser, adminResetPassword } from '@/app/actions/users'
import { PlusIcon, TrashIcon, KeyIcon } from 'lucide-react'

type User = {
  id: string
  name: string
  email: string
  role: string
  active: boolean
  createdAt: Date
}

const ROLES = ['ADMIN', 'EDITOR', 'VIEWER']

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-red-500/10 text-red-400 border-red-500/20',
  EDITOR: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  VIEWER: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

function CreateUserForm({ onDone }: { onDone: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function handleSubmit(fd: FormData) {
    setError('')
    startTransition(async () => {
      try {
        await createUser(fd)
        onDone()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to create user')
      }
    })
  }

  return (
    <form action={handleSubmit} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4 space-y-3">
      <h3 className="text-sm font-semibold text-zinc-200">Create User</h3>
      <div className="grid grid-cols-2 gap-3">
        <input name="name" required placeholder="Full name" className="bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500" />
        <input name="email" type="email" required placeholder="Email address" className="bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500" />
        <input name="password" type="password" required placeholder="Password (min 8 chars)" minLength={8} className="bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500" />
        <select name="role" required defaultValue="VIEWER" className="bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500">
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs rounded transition-colors">
          {isPending ? 'Creating…' : 'Create User'}
        </button>
        <button type="button" onClick={onDone} className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs rounded transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

function ResetPasswordModal({ userId, userName, onClose }: { userId: string; userName: string; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const pw = fd.get('password') as string
    setError('')
    startTransition(async () => {
      try {
        await adminResetPassword(userId, pw)
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to reset password')
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <form onSubmit={handleSubmit} className="w-80 rounded-xl border border-zinc-700 bg-zinc-900 p-5 space-y-3">
        <h3 className="text-sm font-semibold text-zinc-200">Reset password for {userName}</h3>
        <input name="password" type="password" required minLength={8} placeholder="New password (min 8 chars)"
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" disabled={isPending} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs rounded transition-colors">
            {isPending ? 'Saving…' : 'Reset Password'}
          </button>
          <button type="button" onClick={onClose} className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs rounded transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export function UserManager({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const [creating, setCreating] = useState(false)
  const [resetTarget, setResetTarget] = useState<{ id: string; name: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleRoleChange(id: string, role: string) {
    startTransition(async () => { await updateUserRole(id, role) })
  }

  function handleToggleActive(id: string, active: boolean) {
    startTransition(async () => { await toggleUserActive(id, active) })
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return
    startTransition(async () => { await deleteUser(id) })
  }

  return (
    <div className="space-y-4">
      {!creating && (
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          Add User
        </button>
      )}

      {creating && <CreateUserForm onDone={() => setCreating(false)} />}

      {resetTarget && (
        <ResetPasswordModal
          userId={resetTarget.id}
          userName={resetTarget.name}
          onClose={() => setResetTarget(null)}
        />
      )}

      <div className="rounded-lg border border-zinc-700 bg-zinc-900 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left px-4 py-3 text-xs text-zinc-500 font-medium">Name</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 font-medium">Email</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 font-medium">Role</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 font-medium">Status</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} className={`${i < users.length - 1 ? 'border-b border-zinc-800' : ''} ${isPending ? 'opacity-60' : ''}`}>
                <td className="px-4 py-3">
                  <span className="text-sm text-zinc-200">{user.name}</span>
                  {user.id === currentUserId && (
                    <span className="ml-2 text-xs text-zinc-600">(you)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-400">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleActive(user.id, !user.active)}
                    disabled={user.id === currentUserId}
                    className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                      user.active
                        ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                        : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20'
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {user.active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setResetTarget({ id: user.id, name: user.name })}
                      title="Reset password"
                      className="p-1 rounded text-zinc-600 hover:text-zinc-300 hover:bg-zinc-700 transition-colors"
                    >
                      <KeyIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      disabled={user.id === currentUserId}
                      title="Delete user"
                      className="p-1 rounded text-zinc-600 hover:text-red-400 hover:bg-zinc-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
