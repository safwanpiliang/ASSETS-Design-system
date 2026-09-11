import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface CardCtaProps {
  title: ReactNode
  description?: ReactNode
  /** Elemen `<img>` di sisi kanan — di Figma gambarnya di-crop bentuk custom
   * (mask organik), disederhanakan di sini jadi persegi rounded biasa. */
  image?: ReactNode
  /** Biasanya dua `<Button size="md">` (solid + ghost). */
  actions?: ReactNode
  className?: string
}

export function CardCta({ title, description, image, actions, className }: CardCtaProps) {
  return (
    <div className={cn('flex items-center gap-6 rounded-5 bg-white p-6 shadow-e2', className)}>
      <div className="flex flex-1 flex-col items-start justify-between gap-6 self-stretch">
        <div className="flex flex-col items-start gap-2">
          <p className="text-h5 font-bold text-neutral-1000">{title}</p>
          {description && <p className="text-b2 text-neutral-700">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {image && (
        <div className="h-[286px] w-[292px] shrink-0 overflow-hidden rounded-3 [&>img]:size-full [&>img]:object-cover">
          {image}
        </div>
      )}
    </div>
  )
}
