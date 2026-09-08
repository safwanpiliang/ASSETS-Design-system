import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import NotebookBookmark from '@solar-icons/react/school/NotebookBookmark'
import Logout3 from '@solar-icons/react/arrows-action/Logout3'

export interface SidebarItem {
  key: string
  icon: ReactNode
  label: string
  active?: boolean
  href?: string
  onClick?: () => void
}

export interface SidebarUser {
  name: string
  avatarSrc?: string
}

export interface SidebarProps {
  /** Slot logo penuh (ikon + nama brand, atau elemen apa pun). Kalau kosong,
   * dipakai contoh default "SIMATKUL" — project lain WAJIB mengisi ini
   * dengan branding mereka sendiri saat memakai ulang komponen ini. */
  logo?: ReactNode
  items: SidebarItem[]
  user?: SidebarUser
  onLogout?: () => void
  /**
   * Warna aksen item menu yang sedang aktif (tint background, garis kanan,
   * warna ikon+teks). Default-nya ikut token `primary-400` design system ini,
   * TAPI bisa dioverride per-instance tanpa fork seluruh sistem token warna —
   * inilah yang bikin Sidebar ini bisa dipakai ulang di project lain dengan
   * warna brand berbeda, misalnya `activeColor="#7C3AED"`.
   */
  activeColor?: string
  className?: string
}

export function Sidebar({ logo, items, user, onLogout, activeColor, className }: SidebarProps) {
  return (
    <nav
      aria-label="Navigasi utama"
      // Sengaja tanpa h-full: itu butuh parent dengan height eksplisit untuk
      // resolve (min-h-screen di App cuma batas minimum, bukan height pasti).
      // self-stretch + shrink-0 memakai perilaku align-items:stretch default
      // dari flex parent-nya, supaya Sidebar selalu fill container secara
      // vertikal apa pun tinggi konten di sebelahnya.
      className={cn('flex w-[280px] shrink-0 flex-col items-center justify-between self-stretch bg-white', className)}
      style={activeColor ? ({ '--sb-active': activeColor } as CSSProperties) : undefined}
    >
      <div className="flex w-full flex-col items-start gap-12">
        <div className="flex h-28 w-full items-center justify-center border-b border-neutral-300 px-10 py-10">
          {logo ?? (
            <div className="flex items-center gap-2.5">
              <NotebookBookmark weight="BoldDuotone" className="size-12 text-primary-500" />
              <span className="text-h7 font-bold text-primary-500">SIMATKUL</span>
            </div>
          )}
        </div>

        <ul className="flex w-full flex-col items-start gap-2">
          {items.map((item) => {
            // Arbitrary value var(--sb-active, fallback): kalau `activeColor`
            // tidak di-set, otomatis jatuh ke token primary-400 bawaan.
            const accentText = 'text-[var(--sb-active,var(--color-primary-400))]'
            const content = (
              <>
                <span className={cn('size-6 shrink-0 [&>svg]:size-full', item.active ? accentText : 'text-neutral-900')}>
                  {item.icon}
                </span>
                <span className={cn('text-b2 font-bold', item.active ? accentText : 'text-neutral-900')}>
                  {item.label}
                </span>
              </>
            )
            const sharedClassName = cn(
              'flex w-full items-center gap-2 px-10 py-4 transition-colors',
              item.active
                ? 'border-r-2 border-[var(--sb-active,var(--color-primary-400))] bg-[color-mix(in_srgb,var(--sb-active,var(--color-primary-400))_10%,transparent)]'
                : 'hover:bg-neutral-200'
            )
            return (
              <li key={item.key} className="w-full">
                {item.href ? (
                  <a href={item.href} className={sharedClassName} aria-current={item.active ? 'page' : undefined}>
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={sharedClassName}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {content}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {user && (
        <div className="flex w-full flex-col items-center justify-center p-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar size="small" letter={user.name.charAt(0)} src={user.avatarSrc} />
              <span className="text-b3 text-neutral-1000">{user.name}</span>
            </div>
            <Button
              theme="secondary"
              variant="ghost"
              size="sm"
              onClick={onLogout}
              aria-label="Keluar"
              iconLeft={<Logout3 weight="BoldDuotone" />}
            />
          </div>
        </div>
      )}
    </nav>
  )
}
