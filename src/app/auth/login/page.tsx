'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ShieldCheckIcon } from 'lucide-react'

type Phase = 'credentials' | 'mfa'

export default function LoginPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/check-credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setLoading(false)

    if (res.status === 429) {
      setError(data.error ?? 'Too many attempts. Please try again later.')
      return
    }

    if (!data.valid) {
      setError('Invalid email or password')
      return
    }

    if (data.requiresMfa) {
      setPhase('mfa')
      return
    }

    await completeSignIn()
  }

  async function handleMfa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await completeSignIn(totpCode)
  }

  async function completeSignIn(totp?: string) {
    const result = await signIn('credentials', {
      email,
      password,
      totpCode: totp ?? '',
      redirect: false,
    })
    setLoading(false)

    if (result?.error) {
      setError(totp ? 'Invalid authentication code. Please try again.' : 'Sign in failed.')
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Image src="/bookimage.png" alt="Cyber Defense Matrix" width={80} height={80} className="rounded-lg" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Cyber Defense Matrix Tool</h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            A framework created by{' '}
            <a href="https://x.com/sounilyu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              @sounilyu
            </a>
            {' '}to help you expertly navigate the cybersecurity landscape.
          </p>
        </div>

        {phase === 'credentials' ? (
          <form onSubmit={handleCredentials} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Email</label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@cdm.local"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors">
              {loading ? 'Checking…' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMfa} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
              <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <ShieldCheckIcon className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">Two-factor authentication</p>
                <p className="text-xs text-zinc-500">{email}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Authentication code</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                autoFocus
                value={totpCode}
                onChange={e => setTotpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 tracking-widest text-center"
              />
              <p className="text-xs text-zinc-600">Enter the 6-digit code from your authenticator app.</p>
            </div>
            {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading || totpCode.length !== 6}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors">
              {loading ? 'Verifying…' : 'Sign in'}
            </button>
            <button type="button" onClick={() => { setPhase('credentials'); setError(''); setTotpCode('') }}
              className="w-full py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
