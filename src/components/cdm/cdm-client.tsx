'use client'

import { useState, useTransition } from 'react'
import { createCdmEntry, updateCdmEntry, toggleCdmImplemented, deleteCdmEntry } from '@/app/actions/cdm'
import { PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon, CircleIcon, BookOpenIcon, FileTextIcon, TableIcon } from 'lucide-react'
import { SoaReferenceModal } from './soa-reference-modal'
import { PPTSelector, PPTSpectrum } from './ppt-spectrum'
import { getCdmSuggestions } from '@/lib/cdm-reference-data'

const ASSET_CLASSES = [
  { id: 'DEVICES',      label: 'Devices',       abbr: 'DEV', color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
  { id: 'APPLICATIONS', label: 'Applications',  abbr: 'APP', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { id: 'NETWORKS',     label: 'Networks',      abbr: 'NET', color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30' },
  { id: 'DATA',         label: 'Data',          abbr: 'DAT', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  { id: 'USERS',        label: 'Users',         abbr: 'USR', color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/30' },
]

const NIST_FUNCTIONS = [
  { id: 'IDENTIFY', label: 'Identify', color: 'text-purple-400' },
  { id: 'PROTECT',  label: 'Protect',  color: 'text-green-400' },
  { id: 'DETECT',   label: 'Detect',   color: 'text-yellow-400' },
  { id: 'RESPOND',  label: 'Respond',  color: 'text-orange-400' },
  { id: 'RECOVER',  label: 'Recover',  color: 'text-teal-400' },
]

type CdmEntry = {
  id: string
  assetClass: string
  nistFunction: string
  title: string
  description: string | null
  tool: string | null
  implemented: boolean
  pptValue: number | null
  processValue: number | null
  notes: string | null
  createdBy: { name: string } | null
  createdAt: Date
}

function cellCoverage(entries: CdmEntry[]): 'none' | 'partial' | 'full' {
  if (entries.length === 0) return 'none'
  const impl = entries.filter(e => e.implemented).length
  if (impl === 0) return 'partial'
  if (impl === entries.length) return 'full'
  return 'partial'
}

function CellDot({ coverage }: { coverage: 'none' | 'partial' | 'full' }) {
  if (coverage === 'full')    return <span className="h-3.5 w-3.5 rounded-full bg-green-400 shrink-0" />
  if (coverage === 'partial') return <span className="h-3.5 w-3.5 rounded-full bg-yellow-400 shrink-0" />
  return <span className="h-3.5 w-3.5 rounded-full bg-zinc-700 shrink-0" />
}

function EntryForm({
  assetClass,
  nistFunction,
  initial,
  entryId,
  onDone,
}: {
  assetClass: string
  nistFunction: string
  initial?: CdmEntry
  entryId?: string
  onDone: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const [pptValue, setPptValue] = useState<number | null>(initial?.pptValue ?? null)
  const [processValue, setProcessValue] = useState<number | null>(initial?.processValue ?? null)
  const [title, setTitle] = useState(initial?.title ?? '')
  const [tool, setTool] = useState(initial?.tool ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const suggestions = getCdmSuggestions(assetClass, nistFunction)

  function applySuggestion(s: { title: string; description: string; tool?: string }) {
    setTitle(s.title)
    setDescription(s.description)
    if (s.tool) setTool(s.tool)
    setSuggestionsOpen(false)
  }

  function handleSubmit(fd: FormData) {
    startTransition(async () => {
      if (entryId) {
        await updateCdmEntry(entryId, fd)
      } else {
        fd.set('assetClass', assetClass)
        fd.set('nistFunction', nistFunction)
        await createCdmEntry(fd)
      }
      onDone()
    })
  }

  return (
    <form action={handleSubmit} className="space-y-2 rounded border border-zinc-700/60 bg-zinc-800/40 p-3">
      {entryId && (
        <input type="hidden" name="implemented" value={String(initial?.implemented ?? false)} />
      )}

      {/* Suggestions panel */}
      {suggestions.length > 0 && (
        <div className="rounded border border-zinc-700/50 overflow-hidden">
          <button
            type="button"
            onClick={() => setSuggestionsOpen(v => !v)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 bg-zinc-800/60 hover:bg-zinc-700/50 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <span className="font-medium">Browse {suggestions.length} reference controls for this cell</span>
            <span className="text-zinc-600">{suggestionsOpen ? '▲' : '▼'}</span>
          </button>
          {suggestionsOpen && (
            <div className="max-h-48 overflow-y-auto divide-y divide-zinc-800">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applySuggestion(s)}
                  className="w-full text-left px-2.5 py-2 hover:bg-zinc-700/40 transition-colors space-y-0.5"
                >
                  <div className="text-xs font-medium text-zinc-200">{s.title}</div>
                  <div className="text-xs text-zinc-500 leading-relaxed">{s.description}</div>
                  {s.tool && <div className="text-xs text-zinc-600">e.g. {s.tool}</div>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <input
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        autoFocus
        placeholder="Control or capability name"
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
      />
      <input
        name="tool"
        value={tool}
        onChange={e => setTool(e.target.value)}
        placeholder="Tool / technology (optional)"
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
      />
      <textarea
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
        placeholder="Description (optional)"
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-500 resize-none"
      />
      <textarea
        name="notes"
        defaultValue={initial?.notes ?? ''}
        rows={1}
        placeholder="Notes (optional)"
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-500 resize-none"
      />
      <input type="hidden" name="pptValue" value={pptValue !== null ? String(pptValue) : ''} />
      <input type="hidden" name="processValue" value={processValue !== null ? String(processValue) : ''} />
      <PPTSelector
        pptValue={pptValue}
        processValue={processValue}
        onPptChange={setPptValue}
        onProcessChange={setProcessValue}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-2 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs rounded transition-colors"
        >
          {isPending ? 'Saving…' : entryId ? 'Save' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function EntryCard({ entry, canEdit }: { entry: CdmEntry; canEdit: boolean }) {
  const [editing, setEditing] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(async () => { await toggleCdmImplemented(entry.id, !entry.implemented) })
  }

  function handleDelete() {
    if (!confirm(`Delete "${entry.title}"?`)) return
    startTransition(async () => { await deleteCdmEntry(entry.id) })
  }

  if (editing) {
    return (
      <EntryForm
        assetClass={entry.assetClass}
        nistFunction={entry.nistFunction}
        initial={entry}
        entryId={entry.id}
        onDone={() => setEditing(false)}
      />
    )
  }

  return (
    <div className={`rounded border p-2.5 space-y-1 transition-opacity ${isPending ? 'opacity-50' : ''} ${
      entry.implemented
        ? 'border-green-500/20 bg-green-500/5'
        : 'border-zinc-700/60 bg-zinc-800/30'
    }`}>
      <div className="flex items-start gap-2">
        {canEdit ? (
          <button onClick={handleToggle} className="mt-0.5 shrink-0">
            {entry.implemented
              ? <CheckCircleIcon className="h-3.5 w-3.5 text-green-400" />
              : <CircleIcon className="h-3.5 w-3.5 text-zinc-600" />}
          </button>
        ) : (
          <span className="mt-0.5 shrink-0">
            {entry.implemented
              ? <CheckCircleIcon className="h-3.5 w-3.5 text-green-400" />
              : <CircleIcon className="h-3.5 w-3.5 text-zinc-600" />}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium leading-snug ${entry.implemented ? 'text-zinc-200' : 'text-zinc-200'}`}>
            {entry.title}
          </p>
          {entry.tool && (
            <p className="text-xs text-zinc-500 mt-0.5">
              <span className="text-zinc-600">Tool:</span> {entry.tool}
            </p>
          )}
          {entry.description && (
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{entry.description}</p>
          )}
          {entry.notes && (
            <p className="text-xs text-zinc-400 italic mt-0.5">{entry.notes}</p>
          )}
        </div>
        {canEdit && (
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => setEditing(true)}
              className="p-0.5 rounded text-zinc-600 hover:text-zinc-300 hover:bg-zinc-700 transition-colors">
              <PencilIcon className="h-3 w-3" />
            </button>
            <button onClick={handleDelete}
              className="p-0.5 rounded text-zinc-600 hover:text-red-400 hover:bg-zinc-700 transition-colors">
              <TrashIcon className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CellPanel({
  assetClass,
  nistFunction,
  entries,
  canEdit,
  onClose,
}: {
  assetClass: string
  nistFunction: string
  entries: CdmEntry[]
  canEdit: boolean
  onClose: () => void
}) {
  const [adding, setAdding] = useState(false)
  const asset = ASSET_CLASSES.find(a => a.id === assetClass)!
  const fn = NIST_FUNCTIONS.find(f => f.id === nistFunction)!
  const implemented = entries.filter(e => e.implemented).length

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${asset.color}`}>{asset.label}</span>
            <span className="text-zinc-600">×</span>
            <span className={`text-sm font-semibold ${fn.color}`}>{fn.label}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} · {implemented} implemented
          </p>
        </div>
        <button onClick={onClose} className="text-zinc-600 hover:text-zinc-300 text-lg leading-none">×</button>
      </div>

      <div className="space-y-2">
        {entries.length === 0 && !adding && (
          <p className="text-xs text-zinc-600 italic text-center py-3">
            No controls defined for this cell yet.
          </p>
        )}
        {entries.map(e => (
          <EntryCard key={e.id} entry={e} canEdit={canEdit} />
        ))}
        {adding && canEdit && (
          <EntryForm
            assetClass={assetClass}
            nistFunction={nistFunction}
            onDone={() => setAdding(false)}
          />
        )}
      </div>

      {canEdit && !adding && (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          Add entry
        </button>
      )}
    </div>
  )
}

export function CdmClient({
  entries,
  canEdit,
}: {
  entries: CdmEntry[]
  canEdit: boolean
}) {
  const [selected, setSelected] = useState<{ asset: string; fn: string } | null>(null)
  const [soaOpen, setSoaOpen] = useState(false)

  function getEntries(asset: string, fn: string) {
    return entries.filter(e => e.assetClass === asset && e.nistFunction === fn)
  }

  const totalEntries = entries.length
  const implemented = entries.filter(e => e.implemented).length
  const cellsWithEntries = ASSET_CLASSES.flatMap(a =>
    NIST_FUNCTIONS.map(f => getEntries(a.id, f.id))
  ).filter(e => e.length > 0).length
  const totalCells = ASSET_CLASSES.length * NIST_FUNCTIONS.length

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-center">
          <div className="text-2xl font-bold text-zinc-200">{totalEntries}</div>
          <div className="text-xs text-zinc-500 mt-0.5">Total Controls</div>
        </div>
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{implemented}</div>
          <div className="text-xs text-zinc-500 mt-0.5">Implemented</div>
        </div>
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{cellsWithEntries}/{totalCells}</div>
          <div className="text-xs text-zinc-500 mt-0.5">Cells Covered</div>
        </div>
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {totalEntries > 0 ? Math.round((implemented / totalEntries) * 100) : 0}%
          </div>
          <div className="text-xs text-zinc-500 mt-0.5">Implementation Rate</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-zinc-500">
        <span className="font-medium text-zinc-400">Coverage:</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-green-400" /> Fully implemented</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-yellow-400" /> Partially implemented</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-zinc-700" /> Not started</span>
        <span className="ml-auto italic">Click any cell to view or add controls</span>
        <button
          onClick={() => setSoaOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 transition-colors text-xs font-medium not-italic"
        >
          <BookOpenIcon className="h-3.5 w-3.5" />
          SOA Reference
        </button>
        <a
          href="/api/export/csv"
          download
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 transition-colors text-xs font-medium not-italic"
        >
          <TableIcon className="h-3.5 w-3.5" />
          Export CSV
        </a>
        <a
          href="/api/export/pdf"
          download
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-blue-700 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-blue-100 transition-colors text-xs font-medium not-italic"
        >
          <FileTextIcon className="h-3.5 w-3.5" />
          Export PDF
        </a>
      </div>

      {soaOpen && <SoaReferenceModal onClose={() => setSoaOpen(false)} />}

      {/* 5×5 Grid */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                <th className="border-b border-r border-zinc-800 p-3 text-left text-xs text-zinc-500 font-normal w-32">
                  Asset Class
                </th>
                {NIST_FUNCTIONS.map(fn => (
                  <th key={fn.id} className={`border-b border-r border-zinc-800 p-3 text-center text-xs font-semibold last:border-r-0 ${fn.color}`}>
                    {fn.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ASSET_CLASSES.map((asset, ai) => (
                <tr key={asset.id} className={ai < ASSET_CLASSES.length - 1 ? 'border-b border-zinc-800' : ''}>
                  <td className={`border-r border-zinc-800 p-3`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${asset.color}`}>{asset.label}</span>
                    </div>
                  </td>
                  {NIST_FUNCTIONS.map((fn, fi) => {
                    const cellEntries = getEntries(asset.id, fn.id)
                    const coverage = cellCoverage(cellEntries)
                    const isSelected = selected?.asset === asset.id && selected?.fn === fn.id

                    return (
                      <td
                        key={fn.id}
                        className={`border-r border-zinc-800 last:border-r-0 p-0`}
                      >
                        <button
                          onClick={() => setSelected(
                            isSelected ? null : { asset: asset.id, fn: fn.id }
                          )}
                          className={`w-full h-full min-h-16 p-2.5 flex flex-col items-center justify-center gap-1.5 transition-colors text-center ${
                            isSelected
                              ? 'bg-zinc-700/60'
                              : 'hover:bg-zinc-800/60'
                          }`}
                        >
                          <CellDot coverage={coverage} />
                          {cellEntries.length > 0 && (
                            <span className="text-xs text-zinc-500">
                              {cellEntries.filter(e => e.implemented).length}/{cellEntries.length}
                            </span>
                          )}
                          {cellEntries.length === 0 && canEdit && (
                            <PlusIcon className="h-3 w-3 text-zinc-700" />
                          )}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected cell detail */}
      {selected && (
        <CellPanel
          assetClass={selected.asset}
          nistFunction={selected.fn}
          entries={getEntries(selected.asset, selected.fn)}
          canEdit={canEdit}
          onClose={() => setSelected(null)}
        />
      )}

      {/* PPT Spectrum */}
      <PPTSpectrum
        entries={selected ? getEntries(selected.asset, selected.fn) : entries}
      />

      {/* Asset class coverage bars */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <h2 className="text-sm font-semibold text-zinc-200 mb-3">Coverage by Asset Class</h2>
        <div className="space-y-3">
          {ASSET_CLASSES.map(asset => {
            const assetEntries = entries.filter(e => e.assetClass === asset.id)
            const assetImpl = assetEntries.filter(e => e.implemented).length
            const pct = assetEntries.length > 0 ? Math.round((assetImpl / assetEntries.length) * 100) : 0
            const cellsCovered = NIST_FUNCTIONS.filter(fn => getEntries(asset.id, fn.id).length > 0).length
            return (
              <div key={asset.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium ${asset.color}`}>{asset.label}</span>
                  <span className="text-xs text-zinc-500">
                    {cellsCovered}/5 cells · {assetImpl}/{assetEntries.length} implemented
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 80 ? '#4ade80' : pct >= 50 ? '#facc15' : pct >= 25 ? '#fb923c' : '#52525b',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
