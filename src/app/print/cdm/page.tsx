import { notFound } from 'next/navigation'
import { validatePrintToken } from '@/lib/print-token'
import { db } from '@/lib/db'

const ASSET_CLASSES = [
  { id: 'DEVICES',      label: 'Devices',      color: '#3b82f6', bg: '#eff6ff' },
  { id: 'APPLICATIONS', label: 'Applications', color: '#a855f7', bg: '#faf5ff' },
  { id: 'NETWORKS',     label: 'Networks',     color: '#06b6d4', bg: '#ecfeff' },
  { id: 'DATA',         label: 'Data',         color: '#d97706', bg: '#fffbeb' },
  { id: 'USERS',        label: 'Users',        color: '#16a34a', bg: '#f0fdf4' },
]

const NIST_FUNCTIONS = [
  { id: 'IDENTIFY', label: 'Identify', color: '#7c3aed' },
  { id: 'PROTECT',  label: 'Protect',  color: '#15803d' },
  { id: 'DETECT',   label: 'Detect',   color: '#b45309' },
  { id: 'RESPOND',  label: 'Respond',  color: '#c2410c' },
  { id: 'RECOVER',  label: 'Recover',  color: '#0f766e' },
]

const CSS = `
  @page { size: A3 landscape; margin: 15mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; font-size: 10px; color: #1e293b; background: #fff; line-height: 1.4; }

  /* Header */
  .header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px; border-bottom: 2px solid #1e293b; margin-bottom: 14px; }
  .header-left { display: flex; align-items: center; gap: 12px; }
  .header-title { font-size: 22px; font-weight: 800; color: #1e293b; letter-spacing: -0.5px; }
  .header-sub { font-size: 11px; color: #64748b; margin-top: 2px; }
  .header-meta { text-align: right; font-size: 9px; color: #94a3b8; line-height: 1.6; }

  /* Stats row */
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px; }
  .stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; }
  .stat-value { font-size: 24px; font-weight: 800; line-height: 1; }
  .stat-label { font-size: 9px; color: #64748b; margin-top: 3px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }

  /* Matrix table */
  .section-title { font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; letter-spacing: 0.5px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
  th { padding: 6px 8px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid #e2e8f0; }
  td { border: 1px solid #e2e8f0; padding: 6px 8px; vertical-align: top; font-size: 9px; }
  .th-asset { background: #f1f5f9; text-align: left; width: 90px; }
  .cell-empty { color: #cbd5e1; text-align: center; font-style: italic; }
  .cell-full { background: #f0fdf4; }
  .cell-partial { background: #fffbeb; }

  /* Control entry in matrix cell */
  .ctrl { margin-bottom: 5px; padding-bottom: 5px; border-bottom: 1px dashed #e2e8f0; }
  .ctrl:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .ctrl-title { font-weight: 600; color: #1e293b; }
  .ctrl-tool { color: #64748b; font-style: italic; }
  .badge { display: inline-block; padding: 1px 5px; border-radius: 9px; font-size: 8px; font-weight: 700; }
  .badge-impl { background: #dcfce7; color: #15803d; }
  .badge-pending { background: #fef3c7; color: #b45309; }

  /* Details section */
  .page-break { page-break-before: always; break-before: page; }
  .asset-section { margin-bottom: 20px; }
  .asset-header { font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 4px; margin-bottom: 8px; }
  .fn-group { margin-bottom: 10px; margin-left: 8px; }
  .fn-header { font-size: 10px; font-weight: 700; color: #475569; margin-bottom: 5px; padding-bottom: 3px; border-bottom: 1px solid #f1f5f9; }
  .detail-ctrl { display: flex; gap: 8px; padding: 5px 0; border-bottom: 1px solid #f8fafc; align-items: flex-start; }
  .detail-ctrl:last-child { border-bottom: none; }
  .detail-status { flex-shrink: 0; margin-top: 2px; }
  .detail-body { flex: 1; }
  .detail-title { font-weight: 600; font-size: 10px; color: #1e293b; }
  .detail-tool { font-size: 9px; color: #64748b; margin-top: 1px; }
  .detail-desc { font-size: 9px; color: #475569; margin-top: 2px; line-height: 1.5; }
  .detail-notes { font-size: 9px; color: #94a3b8; margin-top: 2px; font-style: italic; }
  .no-controls { color: #cbd5e1; font-style: italic; font-size: 9px; padding: 4px 0; }

  /* Coverage bars */
  .coverage-section { margin-bottom: 14px; }
  .coverage-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .coverage-label { width: 80px; font-size: 9px; font-weight: 600; }
  .coverage-bar-bg { flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
  .coverage-bar-fill { height: 100%; border-radius: 4px; }
  .coverage-pct { font-size: 9px; color: #64748b; width: 28px; text-align: right; }
  .coverage-count { font-size: 9px; color: #94a3b8; width: 60px; }

  /* Footer */
  .footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 8px; color: #cbd5e1; padding: 6px; border-top: 1px solid #f1f5f9; }
`

function coverageColor(pct: number) {
  if (pct >= 80) return '#16a34a'
  if (pct >= 50) return '#d97706'
  if (pct >= 20) return '#ea580c'
  return '#94a3b8'
}

export default async function PrintCdmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  if (!token || !validatePrintToken(token)) notFound()

  const entries = await db.cdmEntry.findMany({
    include: { createdBy: { select: { name: true } } },
    orderBy: { createdAt: 'asc' },
  })

  function getEntries(asset: string, fn: string) {
    return entries.filter(e => e.assetClass === asset && e.nistFunction === fn)
  }

  const total = entries.length
  const implemented = entries.filter(e => e.implemented).length
  const implPct = total > 0 ? Math.round((implemented / total) * 100) : 0
  const cellsWithEntries = ASSET_CLASSES.flatMap(a =>
    NIST_FUNCTIONS.map(f => getEntries(a.id, f.id))
  ).filter(e => e.length > 0).length
  const totalCells = ASSET_CLASSES.length * NIST_FUNCTIONS.length
  const generatedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'long', timeStyle: 'short',
  })

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Cyber Defense Matrix Report</title>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="header">
          <div className="header-left">
            <div>
              <div className="header-title">Cyber Defense Matrix</div>
              <div className="header-sub">Security Posture Assessment Report</div>
            </div>
          </div>
          <div className="header-meta">
            Generated: {generatedAt}<br />
            Framework: NIST CSF · CDM v2
          </div>
        </div>

        {/* ── Summary stats ──────────────────────────────────────── */}
        <div className="stats">
          <div className="stat">
            <div className="stat-value" style={{ color: '#1e293b' }}>{total}</div>
            <div className="stat-label">Total Controls</div>
          </div>
          <div className="stat">
            <div className="stat-value" style={{ color: '#16a34a' }}>{implemented}</div>
            <div className="stat-label">Implemented</div>
          </div>
          <div className="stat">
            <div className="stat-value" style={{ color: '#2563eb' }}>{cellsWithEntries}<span style={{ fontSize: 12, fontWeight: 400, color: '#94a3b8' }}>/{totalCells}</span></div>
            <div className="stat-label">Cells Covered</div>
          </div>
          <div className="stat">
            <div className="stat-value" style={{ color: coverageColor(implPct) }}>{implPct}%</div>
            <div className="stat-label">Implementation Rate</div>
          </div>
        </div>

        {/* ── Coverage by asset class ─────────────────────────────── */}
        <div className="coverage-section">
          <div className="section-title">Coverage by Asset Class</div>
          {ASSET_CLASSES.map(asset => {
            const ae = entries.filter(e => e.assetClass === asset.id)
            const ai = ae.filter(e => e.implemented).length
            const pct = ae.length > 0 ? Math.round((ai / ae.length) * 100) : 0
            const cells = NIST_FUNCTIONS.filter(fn => getEntries(asset.id, fn.id).length > 0).length
            return (
              <div key={asset.id} className="coverage-row">
                <div className="coverage-label" style={{ color: asset.color }}>{asset.label}</div>
                <div className="coverage-bar-bg">
                  <div className="coverage-bar-fill" style={{ width: `${pct}%`, backgroundColor: coverageColor(pct) }} />
                </div>
                <div className="coverage-pct" style={{ color: coverageColor(pct) }}>{pct}%</div>
                <div className="coverage-count">{ai}/{ae.length} · {cells}/5 cells</div>
              </div>
            )
          })}
        </div>

        {/* ── 5×5 Matrix overview ─────────────────────────────────── */}
        <div className="section-title">Matrix Overview</div>
        <table>
          <thead>
            <tr>
              <th className="th-asset">Asset Class</th>
              {NIST_FUNCTIONS.map(fn => (
                <th key={fn.id} style={{ color: fn.color, textAlign: 'center', background: '#f8fafc' }}>
                  {fn.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ASSET_CLASSES.map(asset => (
              <tr key={asset.id}>
                <td style={{ fontWeight: 700, color: asset.color, background: asset.bg, whiteSpace: 'nowrap' }}>
                  {asset.label}
                </td>
                {NIST_FUNCTIONS.map(fn => {
                  const cellEntries = getEntries(asset.id, fn.id)
                  const impl = cellEntries.filter(e => e.implemented).length
                  const cellClass = cellEntries.length === 0 ? '' : impl === cellEntries.length ? 'cell-full' : 'cell-partial'
                  return (
                    <td key={fn.id} className={cellClass}>
                      {cellEntries.length === 0 ? (
                        <span className="cell-empty">—</span>
                      ) : (
                        cellEntries.map(e => (
                          <div key={e.id} className="ctrl">
                            <div className="ctrl-title">{e.title}</div>
                            {e.tool && <div className="ctrl-tool">{e.tool}</div>}
                            <span className={`badge ${e.implemented ? 'badge-impl' : 'badge-pending'}`}>
                              {e.implemented ? '✓ Implemented' : '○ Pending'}
                            </span>
                          </div>
                        ))
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Detailed control listings ───────────────────────────── */}
        <div className="page-break" />
        <div className="header" style={{ marginBottom: 14 }}>
          <div>
            <div className="header-title">Control Details</div>
            <div className="header-sub">Full breakdown of all {total} controls across the matrix</div>
          </div>
          <div className="header-meta">Generated: {generatedAt}</div>
        </div>

        <div style={{ columns: 2, columnGap: 20 }}>
          {ASSET_CLASSES.map(asset => {
            const assetEntries = entries.filter(e => e.assetClass === asset.id)
            if (assetEntries.length === 0) return null
            return (
              <div key={asset.id} className="asset-section" style={{ breakInside: 'avoid' }}>
                <div className="asset-header" style={{ color: asset.color, background: asset.bg }}>
                  {asset.label} — {assetEntries.filter(e => e.implemented).length}/{assetEntries.length} implemented
                </div>
                {NIST_FUNCTIONS.map(fn => {
                  const cellEntries = getEntries(asset.id, fn.id)
                  if (cellEntries.length === 0) return null
                  return (
                    <div key={fn.id} className="fn-group">
                      <div className="fn-header" style={{ color: fn.color }}>{fn.label}</div>
                      {cellEntries.map(e => (
                        <div key={e.id} className="detail-ctrl">
                          <div className="detail-status">
                            <span className={`badge ${e.implemented ? 'badge-impl' : 'badge-pending'}`}>
                              {e.implemented ? '✓' : '○'}
                            </span>
                          </div>
                          <div className="detail-body">
                            <div className="detail-title">{e.title}</div>
                            {e.tool && <div className="detail-tool">Tool: {e.tool}</div>}
                            {e.description && <div className="detail-desc">{e.description}</div>}
                            {e.notes && <div className="detail-notes">{e.notes}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="footer">
          Cyber Defense Matrix Report · Generated {generatedAt} · Framework by Sounil Yu (cyberdefensematrix.com)
        </div>
      </body>
    </html>
  )
}
