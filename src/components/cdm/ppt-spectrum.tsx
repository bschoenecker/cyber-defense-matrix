'use client'

import { useRef, useState } from 'react'

// Technology (red) → People (blue)
const TECH_PEOPLE_GRADIENT = 'linear-gradient(to right, #ef4444, #a855f7 50%, #3b82f6)'

// Process/Govern: least mature (dark) → most mature (bright green)
const PROCESS_GRADIENT = 'linear-gradient(to right, #14532d, #166534, #15803d, #22c55e, #4ade80)'

function techPct(v: number) { return Math.round(100 - v) }
function peoplePct(v: number) { return Math.round(v) }

function clickPct(e: React.MouseEvent, el: HTMLElement | null): number {
  if (!el) return 50
  const rect = el.getBoundingClientRect()
  return Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
}

// ── Clickable bar used in the entry form ─────────────────────────────────────

export function PPTSelector({
  pptValue,
  processValue,
  onPptChange,
  onProcessChange,
}: {
  pptValue: number | null
  processValue: number | null
  onPptChange: (v: number | null) => void
  onProcessChange: (v: number | null) => void
}) {
  const tpRef = useRef<HTMLDivElement>(null)
  const procRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-3">
      {/* ── Technology / People bar ─────────────────────────── */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Technology / People</span>
          {pptValue !== null && (
            <button type="button" onClick={() => onPptChange(null)}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">clear</button>
          )}
        </div>

        <div
          ref={tpRef}
          onClick={e => onPptChange(Math.round(clickPct(e, tpRef.current) * 10) / 10)}
          className="relative h-10 rounded cursor-crosshair select-none overflow-hidden"
          style={{ background: TECH_PEOPLE_GRADIENT }}
        >
          {/* 50/50 centre guide */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 pointer-events-none" />

          {pptValue !== null && (
            <div
              className="absolute top-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-zinc-900 shadow-lg pointer-events-none"
              style={{ left: `${pptValue}%`, transform: 'translate(-50%, -50%)' }}
            />
          )}
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-red-400 font-medium">
            Technology{pptValue !== null ? ` ${techPct(pptValue)}%` : ''}
          </span>
          {pptValue === null && (
            <span className="text-zinc-600 text-xs">click to set — starts 50 / 50</span>
          )}
          <span className="text-blue-400 font-medium">
            People{pptValue !== null ? ` ${peoplePct(pptValue)}%` : ''}
          </span>
        </div>
      </div>

      {/* ── Process / Govern maturity bar ───────────────────── */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Process / Govern maturity</span>
          {processValue !== null && (
            <button type="button" onClick={() => onProcessChange(null)}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">clear</button>
          )}
        </div>

        <div
          ref={procRef}
          onClick={e => onProcessChange(Math.round(clickPct(e, procRef.current) * 10) / 10)}
          className="relative h-6 rounded cursor-crosshair select-none overflow-hidden"
          style={{ background: PROCESS_GRADIENT }}
        >
          {processValue !== null && (
            <div
              className="absolute top-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-zinc-900 shadow-lg pointer-events-none"
              style={{ left: `${processValue}%`, transform: 'translate(-50%, -50%)' }}
            />
          )}
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-green-700 font-medium">Least mature</span>
          {processValue !== null && (
            <span className="text-green-400 font-medium">{Math.round(processValue)}% maturity</span>
          )}
          <span className="text-green-400 font-medium">Most mature</span>
        </div>
      </div>
    </div>
  )
}

// ── Full display shown below the matrix ──────────────────────────────────────

type SpectrumEntry = {
  id: string
  title: string
  pptValue: number | null
  processValue: number | null
  implemented: boolean
}

function Dot({
  entry,
  positionPct,
  topPct,
  hovered,
  onEnter,
  onLeave,
  tooltipExtra,
}: {
  entry: SpectrumEntry
  positionPct: number
  topPct: number
  hovered: boolean
  onEnter: () => void
  onLeave: () => void
  tooltipExtra: string
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${positionPct}%`, top: `${topPct}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {hovered && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 px-2 py-1 rounded shadow-lg pointer-events-none">
          <span className="font-medium">{entry.title}</span>
          <span className="text-zinc-400 ml-1.5">— {tooltipExtra}</span>
        </div>
      )}
      <div
        className={`rounded-full border-2 transition-all ${hovered ? 'w-4 h-4 border-white shadow-lg' : 'w-3 h-3 border-zinc-900/70'}`}
        style={{ backgroundColor: entry.implemented ? '#4ade80' : '#ffffff' }}
      />
    </div>
  )
}

export function PPTSpectrum({
  entries,
}: {
  entries: SpectrumEntry[]
}) {
  const [hovered, setHovered] = useState<string | null>(null)
  const tpEntries = entries.filter(e => e.pptValue !== null)
  const procEntries = entries.filter(e => e.processValue !== null)

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4 space-y-3">
      <div className="flex items-stretch gap-3">
        {/* Y-axis label */}
        <div className="shrink-0 w-10 flex items-center justify-center">
          <span
            className="text-xs text-zinc-500 font-medium"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.05em' }}
          >
            Degree of Dependency
          </span>
        </div>

        <div className="flex-1 space-y-2">
          {/* Technology / People bar */}
          <div>
            <div className="relative h-10 rounded" style={{ background: TECH_PEOPLE_GRADIENT }}>
              {/* 50/50 centre guide */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 pointer-events-none" />

              {tpEntries.map(e => (
                <Dot
                  key={e.id}
                  entry={e}
                  positionPct={e.pptValue!}
                  topPct={50}
                  hovered={hovered === `tp-${e.id}`}
                  onEnter={() => setHovered(`tp-${e.id}`)}
                  onLeave={() => setHovered(null)}
                  tooltipExtra={`Technology ${techPct(e.pptValue!)}% / People ${peoplePct(e.pptValue!)}%`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1 text-xs font-medium">
              <span className="text-red-400">Technology</span>
              <span className="text-zinc-600 text-xs">· 50 / 50 ·</span>
              <span className="text-blue-400">People</span>
            </div>
          </div>

          {/* Process / Govern bar */}
          <div>
            <div className="relative h-6 rounded" style={{ background: PROCESS_GRADIENT }}>
              {procEntries.map(e => (
                <Dot
                  key={e.id}
                  entry={e}
                  positionPct={e.processValue!}
                  topPct={50}
                  hovered={hovered === `proc-${e.id}`}
                  onEnter={() => setHovered(`proc-${e.id}`)}
                  onLeave={() => setHovered(null)}
                  tooltipExtra={`Process/Govern ${Math.round(e.processValue!)}% maturity`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1 text-xs font-medium">
              <span className="text-green-800">Process / Govern — Least mature</span>
              <span className="text-green-400">Most mature</span>
            </div>
          </div>

          {tpEntries.length === 0 && procEntries.length === 0 && (
            <p className="text-xs text-zinc-600 italic text-center pt-1">
              {entries.length === 0
                ? 'Select a cell to view its controls on the spectrum.'
                : 'No controls in this cell have positions set — edit a control to add them.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
