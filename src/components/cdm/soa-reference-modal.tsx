'use client'

import { useState, useMemo } from 'react'
import { XIcon, SearchIcon, CopyIcon, CheckIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { SOA_CATEGORIES, type SoaItem } from '@/lib/soa-data'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      className="p-1 rounded text-zinc-600 hover:text-zinc-300 hover:bg-zinc-700 transition-colors shrink-0"
    >
      {copied
        ? <CheckIcon className="h-3.5 w-3.5 text-green-400" />
        : <CopyIcon className="h-3.5 w-3.5" />}
    </button>
  )
}

function SubtopicRow({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-start gap-2 pl-4 py-1.5 border-l border-zinc-700/60 ml-3">
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-zinc-300">{name}:</span>{' '}
        <span className="text-xs text-zinc-400">{description}</span>
      </div>
      <CopyButton text={`${name}: ${description}`} />
    </div>
  )
}

function ItemCard({ item, color, defaultOpen }: { item: SoaItem; color: string; defaultOpen: boolean }) {
  const [expanded, setExpanded] = useState(defaultOpen)

  return (
    <div className="rounded border border-zinc-700/60 bg-zinc-800/30 overflow-hidden">
      <div className="flex items-start gap-2 p-3">
        {item.subtopics && item.subtopics.length > 0 ? (
          <button
            onClick={() => setExpanded(v => !v)}
            className="mt-0.5 shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {expanded
              ? <ChevronDownIcon className="h-3.5 w-3.5" />
              : <ChevronRightIcon className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="mt-0.5 shrink-0 h-3.5 w-3.5 inline-block" />
        )}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold leading-snug ${color}`}>{item.name}</p>
          <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{item.description}</p>
        </div>
        <CopyButton text={`${item.name}: ${item.description}`} />
      </div>
      {expanded && item.subtopics && item.subtopics.length > 0 && (
        <div className="pb-2 px-3 space-y-0.5">
          {item.subtopics.map(sub => (
            <SubtopicRow key={sub.name} name={sub.name} description={sub.description} />
          ))}
        </div>
      )}
    </div>
  )
}

export function SoaReferenceModal({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return SOA_CATEGORIES.map(cat => {
      if (activeCategory && cat.label !== activeCategory) return null
      const items = cat.items.filter(item => {
        if (!q) return true
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.subtopics?.some(
            s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
          )
        )
      })
      if (items.length === 0) return null
      return { ...cat, items }
    }).filter(Boolean) as typeof SOA_CATEGORIES
  }, [search, activeCategory])

  const totalItems = filtered.reduce((sum, cat) => sum + cat.items.length, 0)
  const hasSearch = search.trim().length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-zinc-100">SOA Reference Library</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Security Operations Architecture — browse and copy controls for CDM entries</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Search + Category Filter */}
        <div className="px-5 py-3 border-b border-zinc-800 space-y-3 shrink-0">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search controls, descriptions, subtopics…"
              className="w-full bg-zinc-800/60 border border-zinc-700 rounded-md pl-8 pr-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {[{ label: 'All', color: '' }, ...SOA_CATEGORIES].map(cat => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label === 'All' ? null : cat.label)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  (cat.label === 'All' ? activeCategory === null : activeCategory === cat.label)
                    ? 'bg-zinc-700 text-zinc-100'
                    : cat.label === 'All'
                      ? 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                      : `${cat.color} opacity-70 hover:opacity-100 hover:bg-zinc-800`
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="px-5 py-2 border-b border-zinc-800/50 shrink-0">
          <p className="text-xs text-zinc-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}{hasSearch ? ` matching "${search.trim()}"` : ''}
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {filtered.length === 0 && (
            <p className="text-sm text-zinc-600 text-center py-10 italic">No items match your search.</p>
          )}
          {filtered.map(cat => (
            <div key={cat.label}>
              <h3 className={`text-sm font-bold mb-3 ${cat.color}`}>
                {cat.label}
                <span className="text-zinc-600 font-normal ml-2 text-xs">{cat.items.length} items</span>
              </h3>
              <div className="space-y-2">
                {cat.items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    color={cat.color}
                    defaultOpen={hasSearch}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-800 shrink-0">
          <p className="text-xs text-zinc-600">
            Use the copy button on any item or subtopic to paste its description directly into a CDM entry.
          </p>
        </div>
      </div>
    </div>
  )
}
