import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface CardProps {
  orientation?: 'vertical' | 'horizontal'
  /** Elemen `<img>` (atau apa pun) yang mengisi area gambar — pemanggil yang
   * kontrol src/alt, wrapper ini cuma mengatur ukuran & crop-nya. */
  image?: ReactNode
  /** Biasanya `<Chip variant="tint" status="secondary">Label</Chip>`. */
  chip?: ReactNode
  title: ReactNode
  description?: ReactNode
  /** Biasanya dua `<Button size="sm">` (ghost + solid). */
  actions?: ReactNode
  className?: string
}

export function Card({ orientation = 'vertical', image, chip, title, description, actions, className }: CardProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      className={cn(
        'flex overflow-hidden rounded-3 bg-white shadow-e2',
        isHorizontal ? 'flex-row items-stretch' : 'flex-col',
        className
      )}
    >
      {image && (
        <div
          className={cn(
            'shrink-0 bg-white [&>img]:size-full [&>img]:object-cover',
            isHorizontal ? 'w-[218px] self-stretch' : 'h-48 w-full'
          )}
        >
          {image}
        </div>
      )}
      <div className="flex flex-1 flex-col items-end justify-center gap-8 p-6">
        <div className="flex w-full flex-col items-start gap-1">
          {chip}
          <p className="text-b2 w-full font-bold text-neutral-1000">{title}</p>
          {description && <p className="text-b3 w-full text-neutral-800">{description}</p>}
        </div>
        {actions && <div className="flex items-start gap-2.5">{actions}</div>}
      </div>
    </div>
  )
}
