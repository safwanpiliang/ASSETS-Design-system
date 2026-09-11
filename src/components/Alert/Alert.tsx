import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Nama status dinormalisasi dari layer Figma: "Succes" -> success, "Eror" -> error,
 * "Alert" (state) -> warning (state Figma-nya bentrok nama dengan komponennya sendiri).
 */
// rounded-3 = Radius.3 (12px), lihat light.tokens.json
// Border cuma ada di variant="outline" (1.5px, bukan default 1px) — Figma
// filled TIDAK punya border sama sekali, jadi base class-nya sengaja tanpa
// border supaya filled tidak ikut kebawa border tak terlihat/mengambil ruang.
const alertVariants = cva('flex items-start gap-4 rounded-3 p-4', {
  variants: {
    variant: { filled: '', outline: 'border-[1.5px] border-solid' },
    status: { default: '', secondary: '', success: '', warning: '', error: '' },
  },
  compoundVariants: [
    // Filled default/secondary pakai step -400 (bukan -500) — dikoreksi
    // 2026-09 setelah pemilik design system mengubahnya langsung di Figma.
    { variant: 'filled', status: 'default', className: 'bg-primary-400' },
    { variant: 'outline', status: 'default', className: 'border-primary-500 bg-primary-400/10' },
    { variant: 'filled', status: 'secondary', className: 'bg-secondary-400' },
    { variant: 'outline', status: 'secondary', className: 'border-secondary-500 bg-secondary-400/10' },
    { variant: 'filled', status: 'success', className: 'bg-green-200' },
    { variant: 'outline', status: 'success', className: 'border-green-200 bg-green-200/10' },
    { variant: 'filled', status: 'warning', className: 'bg-yellow-200' },
    { variant: 'outline', status: 'warning', className: 'border-yellow-200 bg-yellow-200/10' },
    { variant: 'filled', status: 'error', className: 'bg-red-200' },
    // Tint pakai Red/100 (bukan /200) — mengikuti definisi alpha "/10" di Color Main.
    { variant: 'outline', status: 'error', className: 'border-red-200 bg-red-100/10' },
  ],
  defaultVariants: { variant: 'outline', status: 'default' },
})

// Warna teks tombol aksi saat variant="outline" — sama dengan accent border di atas.
const outlineAccentText: Record<string, string> = {
  default: 'text-primary-400',
  secondary: 'text-secondary-400',
  success: 'text-green-200',
  warning: 'text-yellow-200',
  error: 'text-red-200',
}

export interface AlertProps
  // Omit 'title': native title (tooltip string) bentrok dengan title kita
  // sendiri (ReactNode, judul alert) — ketahuan dari error TS2430 saat
  // generate declaration file (.d.ts).
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  icon?: ReactNode
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'outline', status = 'default', icon, title, description, actions, ...props }, ref) => {
    const isFilled = variant === 'filled'

    return (
      <div ref={ref} className={cn(alertVariants({ variant, status }), className)} {...props}>
        {icon && (
          <span
            className={cn(
              'size-6 shrink-0 [&>svg]:size-full',
              isFilled ? 'text-white' : outlineAccentText[status ?? 'default']
            )}
          >
            {icon}
          </span>
        )}

        <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            {title && (
              <p className={cn('text-b2 w-full font-bold', isFilled ? 'text-white' : 'text-neutral-1000')}>
                {title}
              </p>
            )}
            {description && (
              <p className={cn('text-b3 w-full font-normal', isFilled ? 'text-neutral-300' : 'text-neutral-800')}>
                {description}
              </p>
            )}
          </div>

          {/* Konsumen mengisi <Button type="ghost" size="sm"> di sini, warna
              tombol otomatis kontras karena mengikuti isFilled/outlineAccentText
              lewat prop `actionTextClassName` di bawah — lihat contoh Storybook. */}
          {actions && <div className="flex items-center gap-4">{actions}</div>}
        </div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export function getAlertActionTextClass(variant: AlertProps['variant'], status: AlertProps['status']) {
  return variant === 'filled' ? 'text-white' : outlineAccentText[status ?? 'default']
}
