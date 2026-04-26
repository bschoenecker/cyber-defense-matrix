'use client'

import { useState, useTransition } from 'react'
import { generateMfaSecret, verifyAndEnableMfa, disableMfa } from '@/app/actions/account'
import { signOut } from 'next-auth/react'
import { ShieldCheckIcon, ShieldOffIcon, CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'

type Props = { mfaEnabled: boolean; enrollmentRequired?: boolean }
type SetupState = 'idle' | 'loading' | 'ready' | 'enrolled'
type DisableState = 'idle' | 'confirming'

export function MfaSection({ mfaEnabled: initialEnabled, enrollmentRequired = false }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [setupState, setSetupState] = useState<SetupState>('idle')
  const [disableState, setDisableState] = useState<DisableState>('idle')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [secret, setSecret] = useState('')
  const [code, setCode] = useState('')
  const [disablePassword, setDisablePassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function startSetup() {
    setError('')
    setSetupState('loading')
    try {
      const result = await generateMfaSecret()
      setQrDataUrl(result.qrDataUrl)
      setSecret(result.secret)
      setSetupState('ready')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate setup code')
      setSetupState('idle')
    }
  }

  function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        await verifyAndEnableMfa(code)
        setEnabled(true)
        setSetupState(enrollmentRequired ? 'enrolled' : 'idle')
        setCode('')
        setQrDataUrl('')
        setSecret('')

        // If MFA was required by admin, sign out so the next login
        // gets a fresh JWT without needsMfaSetup=true
        if (enrollmentRequired) {
          setTimeout(() => signOut({ callbackUrl: '/auth/login' }), 2500)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed')
      }
    })
  }

  function handleDisable(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        await disableMfa(disablePassword)
        setEnabled(false)
        setDisableState('idle')
        setDisablePassword('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to disable MFA')
      }
    })
  }

  // Post-enrollment sign-out screen (shown when enrollment was required)
  if (setupState === 'enrolled') {
    return (
      <div className="flex items-start gap-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
        <CheckCircleIcon className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-green-400">MFA enabled successfully</p>
          <p className="text-xs text-zinc-400 mt-1">
            Signing you out so your new session includes MFA verification…
          </p>
        </div>
      </div>
    )
  }

  if (enabled) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-green-500/20 bg-green-500/5">
          <ShieldCheckIcon className="h-5 w-5 text-green-400 shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-400">Two-factor authentication is enabled</p>
            <p className="text-xs text-zinc-500 mt-0.5">Your account requires an authenticator code on each login.</p>
          </div>
        </div>

        {disableState === 'idle' ? (
          <button onClick={() => { setDisableState('confirming'); setError('') }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs transition-colors">
            <ShieldOffIcon className="h-3.5 w-3.5" />
            Disable MFA
          </button>
        ) : (
          <form onSubmit={handleDisable} className="space-y-3 p-3 rounded-lg border border-zinc-700 bg-zinc-800/40">
            <p className="text-xs text-zinc-400">Enter your password to confirm disabling MFA.</p>
            <input type="password" required value={disablePassword} onChange={e => setDisablePassword(e.target.value)}
              placeholder="Your password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500" />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={isPending}
                className="px-3 py-1.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white text-xs rounded transition-colors">
                {isPending ? 'Disabling…' : 'Confirm disable'}
              </button>
              <button type="button" onClick={() => { setDisableState('idle'); setError('') }}
                className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs rounded transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    )
  }

  if (setupState === 'idle') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-700 bg-zinc-800/30">
          <ShieldOffIcon className="h-5 w-5 text-zinc-500 shrink-0" />
          <div>
            <p className="text-sm font-medium text-zinc-300">Two-factor authentication is not enabled</p>
            <p className="text-xs text-zinc-500 mt-0.5">Add an extra layer of security to your account.</p>
          </div>
        </div>
        <button onClick={startSetup}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-blue-700 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-blue-100 text-xs transition-colors">
          <ShieldCheckIcon className="h-3.5 w-3.5" />
          Set up MFA
        </button>
      </div>
    )
  }

  if (setupState === 'loading') {
    return <p className="text-xs text-zinc-500">Generating setup code…</p>
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-zinc-200">Scan with your authenticator app</p>
      <p className="text-xs text-zinc-500">Use Google Authenticator, Authy, or any TOTP app to scan the QR code below.</p>

      {qrDataUrl && (
        <div className="inline-block p-3 bg-white rounded-lg">
          <Image src={qrDataUrl} alt="MFA QR Code" width={220} height={220} unoptimized />
        </div>
      )}

      <div className="space-y-1">
        <p className="text-xs text-zinc-500">Can&apos;t scan? Enter this key manually:</p>
        <code className="text-xs font-mono text-zinc-300 bg-zinc-800 px-2 py-1 rounded tracking-widest break-all">{secret}</code>
      </div>

      <form onSubmit={handleVerify} className="space-y-3 pt-2 border-t border-zinc-800">
        <p className="text-xs text-zinc-400">Enter the 6-digit code from your app to verify and enable MFA.</p>
        <input
          type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} required
          value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
          placeholder="000000"
          className="w-32 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 tracking-widest text-center"
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div className="flex gap-2 items-center">
          <button type="submit" disabled={isPending || code.length !== 6}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white text-xs rounded transition-colors">
            <CheckCircleIcon className="h-3.5 w-3.5" />
            {isPending ? 'Verifying…' : 'Verify and enable'}
          </button>
          <button type="button" onClick={() => { setSetupState('idle'); setError(''); setCode('') }}
            className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs rounded transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
