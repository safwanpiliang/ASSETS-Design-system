import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface ScheduleGridEntry {
  day: string
  /** Index sesi mulai (0-based, mengacu ke posisi di array `sessions`). */
  startSession: number
  /** Berapa sesi berturut-turut dipakai entry ini. Default 1. */
  span?: number
  title: string
  subtitle?: string
}

export interface ScheduleGridProps {
  /** Slot bebas untuk kolom kiri — biasanya nama dosen + total SKS. */
  rowHeader: ReactNode
  /** Label tiap sesi (ditampilkan di kolom "Sesi"), mis. [1,2,3,4,5]. */
  sessions: ReactNode[]
  days: { key: string; label: string }[]
  entries: ScheduleGridEntry[]
  /** Biasanya dropdown filter dosen + tombol ekspor. */
  toolbar?: ReactNode
  className?: string
}

const SESSION_HEIGHT = 56
const SESSION_GAP = 16

function renderDayColumn(dayKey: string, sessionCount: number, entries: ScheduleGridEntry[]) {
  const blocks: ReactNode[] = []
  let i = 0
  while (i < sessionCount) {
    const entry = entries.find((e) => e.day === dayKey && e.startSession === i)
    if (entry) {
      const span = entry.span ?? 1
      const height = span * SESSION_HEIGHT + (span - 1) * SESSION_GAP
      blocks.push(
        <div
          key={i}
          style={{ height }}
          className="flex w-full shrink-0 flex-col items-center justify-center gap-0.5 rounded-2 bg-secondary-400/10 p-2 text-center"
        >
          <p className="text-b4 font-bold text-secondary-500">{entry.title}</p>
          {entry.subtitle && <p className="text-b5 text-secondary-400">{entry.subtitle}</p>}
        </div>
      )
      i += span
    } else {
      blocks.push(
        <div key={i} className="flex h-14 w-full shrink-0 items-center justify-center rounded-2 bg-neutral-300">
          <span className="text-b5 text-neutral-1000">-</span>
        </div>
      )
      i += 1
    }
  }
  return blocks
}

// Figma-nya bukan grid dengan rowspan asli — tiap kolom hari cuma daftar
// blok yang disusun vertikal, di mana blok multi-sesi tingginya dihitung
// dari jumlah sesi yang dipakai (span * 56px + gap 16px antar-sesi). Dibaca
// dari nilai piksel asli (mis. blok 2-sesi = 128px = 56*2+16), bukan tebakan.
export function ScheduleGrid({ rowHeader, sessions, days, entries, toolbar, className }: ScheduleGridProps) {
  return (
    <div className={cn('flex flex-col overflow-hidden rounded-2 border border-neutral-600', className)}>
      {toolbar && (
        <div className="flex items-center justify-between gap-4 border-b border-neutral-600 bg-neutral-400 p-3">
          {toolbar}
        </div>
      )}
      <div className="flex h-[60px] shrink-0 items-center justify-between bg-neutral-400 p-3">
        <p className="text-b2 w-[200px] shrink-0 font-bold text-neutral-1000">Nama Dosen</p>
        <p className="text-b2 w-20 shrink-0 text-center font-bold text-neutral-1000">Sesi</p>
        {days.map((d) => (
          <p key={d.key} className="text-b2 flex-1 text-center font-bold text-neutral-1000">
            {d.label}
          </p>
        ))}
      </div>
      <div className="flex w-full items-stretch">
        <div className="flex w-[200px] shrink-0 flex-col items-center justify-center gap-0.5 border-r border-neutral-400 bg-white p-3 text-center">
          {rowHeader}
        </div>
        <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-4 border-r border-neutral-400 bg-white p-3">
          {sessions.map((s, i) => (
            <span
              key={i}
              className="flex h-14 w-[42px] shrink-0 items-center justify-center rounded-2 bg-primary-400/10 text-b4 font-bold text-primary-400"
            >
              {s}
            </span>
          ))}
        </div>
        {days.map((d) => (
          <div key={d.key} className="flex flex-1 flex-col items-center justify-center gap-4 bg-white p-3">
            {renderDayColumn(d.key, sessions.length, entries)}
          </div>
        ))}
      </div>
    </div>
  )
}
