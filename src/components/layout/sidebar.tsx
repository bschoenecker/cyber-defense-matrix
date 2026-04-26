'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { ShieldIcon, UsersIcon, LogOutIcon } from 'lucide-react'

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href
  }

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-zinc-900 border-r border-zinc-800 min-h-screen">
      <div className="px-4 py-6 border-b border-zinc-800">
        <div className="flex flex-col items-center gap-2 text-center">
          <Image src="/bookimage.png" alt="CDM" width={80} height={80} className="rounded-lg" />
          <span className="text-sm font-semibold text-zinc-100">Cyber Defense Matrix</span>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        <Link
          href="/"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
            isActive('/')
              ? 'bg-zinc-800 text-zinc-100'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
          }`}
        >
          <Image src="/bookimage.png" alt="" width={16} height={16} className="rounded shrink-0" />
          Matrix Dashboard
        </Link>

        {role === 'ADMIN' && (
          <Link
            href="/settings/users"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive('/settings/users')
                ? 'bg-zinc-800 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
            }`}
          >
            <UsersIcon className="h-4 w-4" />
            User Management
          </Link>
        )}
      </nav>

      <div className="px-2 py-4 border-t border-zinc-800 space-y-1">
        <a
          href="https://a.co/d/0hdpNec5"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors text-center"
        >
          Order the book
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors w-full"
        >
          <LogOutIcon className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
