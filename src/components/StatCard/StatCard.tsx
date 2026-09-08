import type { ReactNode } from 'react'

export interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
}

// Catatan: Figma pakai gap 7px (bukan token spacing manapun, ganjil) — dibiarkan
// apa adanya sebagai arbitrary value, bukan dibulatkan ke Spacing.2 (8px).
export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-1 items-center gap-[7px] rounded-2 bg-white p-2">
      <span className="size-12 shrink-0 text-secondary-400 [&>svg]:size-full">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <p className="text-b1 font-bold text-neutral-900">{value}</p>
        <p className="text-b4 text-neutral-800">{label}</p>
      </div>
    </div>
  )
}
