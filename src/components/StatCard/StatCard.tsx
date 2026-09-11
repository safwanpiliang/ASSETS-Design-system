import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type StatCardStatus = 'primary' | 'secondary' | 'error' | 'warning' | 'success'

export interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
  /** "neutral" = kartu putih polos (default). "color" = latar warna solid,
   * ikon & teks otomatis kontras terang, dan urutan value/label dibalik
   * (label kecil di atas, value besar di bawah) — persis pola di Figma. */
  variant?: 'neutral' | 'color'
  /** Dipakai hanya saat variant="color". Default "secondary". */
  status?: StatCardStatus
  className?: string
}

const statusBg: Record<StatCardStatus, string> = {
  primary: 'bg-primary-400',
  secondary: 'bg-secondary-400',
  error: 'bg-red-100',
  warning: 'bg-yellow-200',
  success: 'bg-green-200',
}

// Catatan: Figma pakai gap 7px (bukan token spacing manapun, ganjil) — dibiarkan
// apa adanya sebagai arbitrary value, bukan dibulatkan ke Spacing.2 (8px).
// Radius Widget di Figma terbaru = Radius.4 (16px) — dikoreksi dari rounded-2 lama.
export function StatCard({ icon, value, label, variant = 'neutral', status = 'secondary', className }: StatCardProps) {
  const isColor = variant === 'color'

  return (
    <div
      className={cn(
        'flex flex-1 items-center gap-[7px] rounded-4 p-2',
        isColor ? statusBg[status] : 'bg-white',
        className
      )}
    >
      <span className={cn('size-12 shrink-0 [&>svg]:size-full', isColor ? 'text-white' : 'text-secondary-400')}>
        {icon}
      </span>
      {isColor ? (
        <div className="flex flex-col gap-0.5">
          <p className="text-b4 text-neutral-300">{label}</p>
          <p className="text-b1 font-bold text-white">{value}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          <p className="text-b1 font-bold text-neutral-900">{value}</p>
          <p className="text-b4 text-neutral-800">{label}</p>
        </div>
      )}
    </div>
  )
}
