import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface FooterLink {
  key: string
  label: string
  href?: string
  onClick?: () => void
}

export interface FooterColumn {
  key: string
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  logo: ReactNode
  description?: ReactNode
  email?: string
  emailIcon?: ReactNode
  /** Slot bebas tambahan di bawah email — di Figma isinya semacam badge/ikon
   * sosial yang tidak jelas asetnya, jadi diserahkan ke pemanggil. */
  extra?: ReactNode
  columns: FooterColumn[]
  className?: string
}

export function Footer({ logo, description, email, emailIcon, extra, columns, className }: FooterProps) {
  return (
    <footer className={cn('flex w-full flex-wrap items-start justify-between gap-10 bg-primary-500 p-10', className)}>
      <div className="flex w-full max-w-[606px] flex-col items-start gap-5">
        <div className="shrink-0">{logo}</div>
        {description && <p className="text-b1 text-white">{description}</p>}
        {email && (
          <div className="flex items-center gap-4">
            {emailIcon && <span className="size-6 shrink-0 text-white [&>svg]:size-full">{emailIcon}</span>}
            <span className="text-b3 whitespace-nowrap text-white">{email}</span>
          </div>
        )}
        {extra}
      </div>

      {columns.map((col) => (
        <div key={col.key} className="flex shrink-0 flex-col items-start gap-4 whitespace-nowrap text-white">
          <p className="text-b2 font-bold">{col.title}</p>
          <div className="flex flex-col items-start gap-2.5">
            {col.links.map((link) =>
              link.href ? (
                <a key={link.key} href={link.href} className="text-b3">
                  {link.label}
                </a>
              ) : (
                <button key={link.key} type="button" onClick={link.onClick} className="text-b3">
                  {link.label}
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </footer>
  )
}
