import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Button } from '../Button/Button'
import ArrowRight from '@solar-icons/react/arrows/ArrowRight'

// Namanya "Widget" > "Medium Calendar 1/2" di Figma, tapi isinya daftar
// agenda/jadwal, bukan grid kalender — dinamai ScheduleWidget di sini biar
// tidak rancu dengan Date Picker (komponen kalender grid asli).
export interface ScheduleWidgetItem {
  key: string
  title: string
  time: string
  /** Bar warna 4px di kiri item. Abaikan kalau `icon` diisi. */
  accentColor?: string
  icon?: ReactNode
}

export interface ScheduleWidgetProps {
  /**
   * Slot bebas untuk bagian atas kartu — di Figma ada 2 pola: heading
   * tanggal + tombol ikon kalender, atau kartu ringkasan warna (mis. pakai
   * `<StatCard variant="color">`). Sengaja tidak dibakukan jadi prop
   * terpisah karena kedua pola itu strukturnya cukup beda.
   */
  header: ReactNode
  items: ScheduleWidgetItem[]
  onViewAll?: () => void
  viewAllLabel?: string
  className?: string
}

export function ScheduleWidget({ header, items, onViewAll, viewAllLabel = 'Lihat Semua', className }: ScheduleWidgetProps) {
  // Figma punya 2 contoh dengan gap antar-item yang beda: list bar-warna
  // (accentColor) pakai gap 20px, list ikon pakai gap 16px — bukan salah
  // ketik, dua nilai itu memang literally berbeda di kedua frame aslinya.
  const hasIcons = items.some((item) => item.icon)

  return (
    <div className={cn('flex size-[360px] flex-col justify-between overflow-hidden rounded-3 bg-white p-6', className)}>
      <div className="flex w-full flex-col items-start gap-8">
        {header}
        <div className={cn('flex w-full flex-col items-start', hasIcons ? 'gap-4' : 'gap-5')}>
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              {item.icon ? (
                <span className="size-8 shrink-0 [&>svg]:size-full">{item.icon}</span>
              ) : (
                <span
                  className="h-[42px] w-1 shrink-0 rounded-4"
                  style={{ backgroundColor: item.accentColor ?? 'var(--color-secondary-400)' }}
                />
              )}
              <div className="flex flex-col items-start">
                <p className="text-b2 font-bold text-neutral-900">{item.title}</p>
                <p className="text-b4 text-neutral-700">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {onViewAll && (
        <div className="flex w-full justify-end">
          {/* variant="link" (bukan "ghost") — Figma tidak memberi padding
              sama sekali di tombol ini, cuma gap-4px antara teks & ikon. */}
          <Button variant="link" size="sm" iconRight={<ArrowRight weight="LineDuotone" />} onClick={onViewAll}>
            {viewAllLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
