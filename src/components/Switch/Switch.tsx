import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

/**
 * Figma mengekspor track+knob sebagai satu gambar SVG per state (tidak bisa
 * dipecah), jadi warnanya ditulis ulang di sini sebagai div asli, bukan <img>.
 * "Selected" di Figma = state Disabled (dikonfirmasi user) — track Off jadi
 * neutral pucat, track On jadi tint primary 10%, bukan solid.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        'focus-visible:outline-none focus-visible:ring-4',
        disabled
          ? checked
            ? 'bg-primary-400/10'
            : 'bg-neutral-400'
          : checked
            ? 'bg-primary-500 hover:bg-primary-700 focus-visible:ring-primary-400/10'
            : 'bg-neutral-600 hover:bg-neutral-700 focus-visible:ring-neutral-800/10',
        disabled && 'pointer-events-none cursor-not-allowed',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block size-5 rounded-full bg-white shadow-e1 transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        )}
      />
    </button>
  )
)
Switch.displayName = 'Switch'
