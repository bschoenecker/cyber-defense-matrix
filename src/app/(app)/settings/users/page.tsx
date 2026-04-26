import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth-helpers'
import { db } from '@/lib/db'
import { UserManager } from '@/components/settings/user-manager'

export default async function UsersPage() {
  const session = await requireAdmin().catch(() => null)
  if (!session) redirect('/')

  const users = await db.user.findMany({
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">User Management</h1>
        <p className="text-sm text-zinc-500 mt-1">{users.length} {users.length === 1 ? 'user' : 'users'}</p>
      </div>
      <UserManager users={users} currentUserId={session.user.id} />
    </div>
  )
}
