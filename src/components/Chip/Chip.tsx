import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import CloseCircle from '@solar-icons/react/ui/CloseCircle'

// Nama status disamakan dengan Alert (default/secondary/success/warning/error)
// + "primary" eksplisit karena di Chip, "Default" (abu-abu/neutral) dan warna
// aksen utama (primary-400) adalah dua pilihan warna yang terpisah — beda
// dengan Alert yang menyatukan keduanya sebagai satu status "default".
// border-transparent di semua varian (bukan cuma outline) supaya tinggi
// chip konsisten 32px/24px — kalau cuma outline yang punya border, box-nya
// jadi 2px lebih tinggi dari solid/tint.
const chipVariants = cva('inline-flex items-center rounded-full border border-solid border-transparent', {
  variants: {
    variant: { solid: '', tint: '', outline: '' },
    status: { default: '', primary: '', secondary: '', error: '', warning: '', success: '' },
    size: { sm: 'px-1 py-[3px]', md: 'p-1' },
  },
  compoundVariants: [
    { variant: 'solid', status: 'default', className: 'bg-neutral-600 text-neutral-900' },
    { variant: 'solid', status: 'primary', className: 'bg-primary-400 text-neutral-300' },
    { variant: 'solid', status: 'secondary', className: 'bg-secondary-400 text-neutral-300' },
    { variant: 'solid', status: 'error', className: 'bg-red-100 text-neutral-300' },
    { variant: 'solid', status: 'warning', className: 'bg-yellow-200 text-neutral-300' },
    { variant: 'solid', status: 'success', className: 'bg-green-200 text-neutral-300' },

    // Figma tidak mendefinisikan varian tint untuk status "default" (chip
    // solid default sudah cukup terang/netral untuk peran itu) — disamakan
    // dengan solid+default alih-alih dibiarkan tidak terdefinisi.
    { variant: 'tint', status: 'default', className: 'bg-neutral-600 text-neutral-900' },
    { variant: 'tint', status: 'primary', className: 'bg-primary-400/10 text-primary-400' },
    { variant: 'tint', status: 'secondary', className: 'bg-secondary-400/10 text-secondary-400' },
    { variant: 'tint', status: 'error', className: 'bg-red-100/10 text-red-100' },
    { variant: 'tint', status: 'warning', className: 'bg-yellow-200/10 text-yellow-200' },
    { variant: 'tint', status: 'success', className: 'bg-green-200/10 text-green-200' },

    { variant: 'outline', status: 'default', className: 'border-neutral-700 text-neutral-900' },
    // Outline untuk secondary/error/warning/success diekstrapolasi dari pola
    // "primary" (border sama dengan warna teks) — cuma default & primary yang
    // diverifikasi langsung ke Figma.
    { variant: 'outline', status: 'primary', className: 'border-primary-400 text-primary-400' },
    { variant: 'outline', status: 'secondary', className: 'border-secondary-400 text-secondary-400' },
    { variant: 'outline', status: 'error', className: 'border-red-100 text-red-100' },
    { variant: 'outline', status: 'warning', className: 'border-yellow-200 text-yellow-200' },
    { variant: 'outline', status: 'success', className: 'border-green-200 text-green-200' },
  ],
  defaultVariants: { variant: 'solid', status: 'default', size: 'md' },
})

// Padding label mengikuti Figma: horizontal selalu 6px (sama di kedua
// ukuran), vertikal 3px (md dapat tambahan dari padding container p-1).
const textPaddingBySize = { sm: 'px-1.5', md: 'px-1.5 py-[3px]' } as const

// Catatan: font Figma Chip literal 13px/18px (Inter) — di luar skala b1-b5
// kita (b4 terdekat = 12px/18px). Dinormalisasi ke text-b4 (Plus Jakarta
// Sans) mengikuti aturan proyek: selalu pakai token kanonik, bukan nilai
// custom off-canon.

export interface ChipProps extends VariantProps<typeof chipVariants> {
  children: ReactNode
  /** Slot avatar/thumbnail kecil (24px) di kiri label — mis. `<Avatar size="tiny" />`. */
  avatar?: ReactNode
  removable?: boolean
  onRemove?: () => void
  className?: string
}

export function Chip({ variant, status, size = 'md', children, avatar, removable, onRemove, className }: ChipProps) {
  return (
    <span className={cn(chipVariants({ variant, status, size }), className)}>
      {avatar && <span className="size-6 shrink-0 overflow-hidden rounded-full [&>*]:size-full">{avatar}</span>}
      <span className={cn('text-b4 whitespace-nowrap', textPaddingBySize[size ?? 'md'])}>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Hapus"
          className="flex size-[22px] shrink-0 items-center justify-center opacity-70 transition-opacity hover:opacity-100 [&>svg]:size-full"
        >
          <CloseCircle weight="BoldDuotone" />
        </button>
      )}
    </span>
  )
}
