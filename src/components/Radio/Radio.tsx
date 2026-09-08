import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface RadioProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

/**
 * Standalone terkontrol, sama seperti Checkbox — TIDAK ada RadioGroup/Context.
 * Pemilihan tunggal (cuma satu yang aktif) diatur pemanggil dengan satu state
 * `value` dan me-render tiap opsi dengan `checked={value === opsi.key}` +
 * `onCheckedChange={() => setValue(opsi.key)}` — lihat contoh di Showcase.
 * Titik isi (12px, persis setengah diameter 24px) diukur langsung dari SVG
 * asli Figma untuk state "Selected", bukan tebakan proporsi.
 */
export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ className, checked = false, onCheckedChange, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'relative flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-solid border-primary-400 transition-colors',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/10',
        !checked && 'hover:bg-primary-400/10',
        disabled && 'pointer-events-none border-neutral-700 opacity-50',
        className
      )}
      {...props}
    >
      {checked && <span className="size-3 rounded-full bg-primary-400" />}
    </button>
  )
)
Radio.displayName = 'Radio'
