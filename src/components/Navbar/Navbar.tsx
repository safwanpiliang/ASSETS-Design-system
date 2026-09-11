import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface NavbarLink {
  key: string
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

export interface NavbarProps {
  logo: ReactNode
  links: NavbarLink[]
  /** Biasanya dua `<Button>` (ghost + solid). */
  actions?: ReactNode
  className?: string
}

export function Navbar({ logo, links, actions, className }: NavbarProps) {
  return (
    <nav className={cn('relative flex h-[72px] w-full items-center justify-between bg-white px-10 py-4', className)}>
      <div className="shrink-0">{logo}</div>

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-6 whitespace-nowrap">
        {links.map((link) => {
          const content = (
            <span className={cn('text-b3 text-neutral-900', link.active && 'font-bold underline')}>{link.label}</span>
          )
          if (link.href) {
            return (
              <a key={link.key} href={link.href}>
                {content}
              </a>
            )
          }
          return (
            <button key={link.key} type="button" onClick={link.onClick}>
              {content}
            </button>
          )
        })}
      </div>

      {actions && <div className="flex shrink-0 items-center gap-2.5">{actions}</div>}
    </nav>
  )
}
