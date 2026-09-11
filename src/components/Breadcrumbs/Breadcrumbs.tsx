import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import AltArrowRight from '@solar-icons/react/arrows/AltArrowRight'
import MenuDots from '@solar-icons/react/ui/MenuDots'

export interface BreadcrumbItem {
  key: string
  label: string
  href?: string
  icon?: ReactNode
  onClick?: () => void
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  /** Pemisah antar item: garis miring teks, atau ikon panah. Default "text". */
  separator?: 'text' | 'icon'
  /**
   * Kalau jumlah item melebihi ini, item di tengah dipadatkan jadi "…" —
   * cuma item pertama & terakhir yang tetap tampil (persis pola di Figma:
   * tidak ada menu dropdown untuk item yang disembunyikan).
   */
  maxItems?: number
  className?: string
}

function Separator({ variant }: { variant: 'text' | 'icon' }) {
  return variant === 'text' ? (
    <span className="text-b2 text-neutral-800" aria-hidden="true">
      /
    </span>
  ) : (
    <span className="size-5 shrink-0 text-neutral-800 [&>svg]:size-full" aria-hidden="true">
      <AltArrowRight weight="LineDuotone" />
    </span>
  )
}

// Sesuai Figma: item pertama & terakhir ditonjolkan (Neutral/800), item di
// antaranya diredupkan (Neutral/700) — bukan gradasi biasa "semua link sama
// warna kecuali current page".
function Crumb({ item, emphasize }: { item: BreadcrumbItem; emphasize: boolean }) {
  const content = (
    <span className={cn('flex items-center gap-1 text-b2', emphasize ? 'text-neutral-800' : 'text-neutral-700')}>
      {item.icon && <span className="size-5 shrink-0 [&>svg]:size-full">{item.icon}</span>}
      {item.label}
    </span>
  )
  if (item.href) {
    return (
      <a href={item.href} className="hover:underline">
        {content}
      </a>
    )
  }
  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} className="hover:underline">
        {content}
      </button>
    )
  }
  return content
}

export function Breadcrumbs({ items, separator = 'text', maxItems, className }: BreadcrumbsProps) {
  const collapsed = maxItems != null && items.length > maxItems && items.length > 2
  const visible = collapsed ? [items[0], items[items.length - 1]] : items

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2', className)}>
      {visible.map((item, i) => (
        <div key={item.key} className="flex items-center gap-2">
          <Crumb item={item} emphasize={i === 0 || i === visible.length - 1} />
          {collapsed && i === 0 && (
            <>
              <Separator variant={separator} />
              <span className="flex size-4 shrink-0 items-center text-neutral-700 [&>svg]:size-full" aria-hidden="true">
                <MenuDots weight="BoldDuotone" />
              </span>
            </>
          )}
          {i < visible.length - 1 && <Separator variant={separator} />}
        </div>
      ))}
    </nav>
  )
}
