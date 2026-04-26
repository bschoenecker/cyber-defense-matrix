const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  VIEWER: 'Viewer',
}

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-red-500/10 text-red-400 border-red-500/20',
  EDITOR: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  VIEWER: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

export function Topbar({ name, role }: { name: string; role: string }) {
  return (
    <header className="h-12 shrink-0 flex items-center justify-end px-6 bg-zinc-950">
      <div className="flex items-center gap-3">
        <span className={`text-xs px-2 py-0.5 rounded-full border ${ROLE_COLORS[role] ?? ROLE_COLORS.VIEWER}`}>
          {ROLE_LABELS[role] ?? role}
        </span>
        <span className="text-sm text-zinc-400">{name}</span>
      </div>
    </header>
  )
}
