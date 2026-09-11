import { cn } from '../../lib/cn'

export interface ScheduleDotsProps {
  /** true = sesi itu terisi (dot solid), false = kosong (dot pudar). */
  occupied: boolean[]
  className?: string
}

/**
 * Indikator ringkas jadwal per-sesi (dipakai di dalam `render` kolom
 * `Table` yang sudah ada — bukan komponen tabel terpisah, karena Figma-nya
 * ("Table Schedule Dot") strukturnya sama persis dengan `Table` biasa,
 * cuma isi selnya beda). Cocok dipasang di kolom per-hari.
 */
export function ScheduleDots({ occupied, className }: ScheduleDotsProps) {
  return (
    <div className={cn('flex items-center justify-between gap-1', className)}>
      {occupied.map((on, i) => (
        <span key={i} className={cn('size-5 shrink-0 rounded-1', on ? 'bg-secondary-400' : 'bg-secondary-400/10')} />
      ))}
    </div>
  )
}
