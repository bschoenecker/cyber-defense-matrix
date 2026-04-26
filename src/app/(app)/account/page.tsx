import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { ChangePasswordForm } from '@/components/account/change-password-form'
import { MfaSection } from '@/components/account/mfa-section'
import { ShieldAlertIcon } from 'lucide-react'

const ROLE_LABELS: Record<string, string> = { ADMIN: 'Admin', EDITOR: 'Editor', VIEWER: 'Viewer' }

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ mfa?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect('/auth/login')

  const { mfa } = await searchParams
  // Use the JWT flag — reflects the state at login time, not live DB state
  const enrollmentRequired = session.user.needsMfaSetup

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Account Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your password and security preferences.</p>
      </div>

      {/* MFA enrollment required banner */}
      {enrollmentRequired && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <ShieldAlertIcon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-300">Two-factor authentication required</p>
            <p className="text-xs text-amber-400/80 mt-0.5">
              Your administrator requires you to set up two-factor authentication before you can access the app.
              Complete the setup below to continue.
            </p>
          </div>
        </div>
      )}

      {/* Profile info */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-200">Profile</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-zinc-500 mb-0.5">Name</p>
            <p className="text-zinc-200">{user.name}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-0.5">Email</p>
            <p className="text-zinc-200">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-0.5">Role</p>
            <p className="text-zinc-200">{ROLE_LABELS[user.role] ?? user.role}</p>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-200">Change Password</h2>
        <ChangePasswordForm />
      </div>

      {/* MFA */}
      <div className={`rounded-lg border bg-zinc-900 p-5 space-y-4 ${
        enrollmentRequired ? 'border-amber-500/40' : 'border-zinc-700'
      }`}>
        <div>
          <h2 className="text-sm font-semibold text-zinc-200">Two-Factor Authentication</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Requires a one-time code from an authenticator app on each login.</p>
        </div>
        <MfaSection mfaEnabled={user.mfaEnabled} enrollmentRequired={enrollmentRequired} />
      </div>
    </div>
  )
}
