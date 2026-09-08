import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface CheckboxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
}

// Centang/minus di Figma murni vektor (layer "check"/"minus"), bukan ikon
// Solar — digambar inline, sama seperti pendekatan Stepper.
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-full p-1" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-full p-1" fill="none">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked = false, indeterminate = false, onCheckedChange, disabled, ...props }, ref) => {
    const active = checked || indeterminate

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          'relative flex size-6 shrink-0 items-center justify-center rounded-2 border-[1.5px] border-solid text-white transition-colors',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/10',
          active ? 'border-transparent bg-primary-400' : 'border-primary-400 bg-transparent hover:bg-white',
          disabled && !active && 'border-neutral-600',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        {indeterminate ? <MinusIcon /> : checked ? <CheckIcon /> : null}
      </button>
    )
  }
)
Checkbox.displayName = 'Checkbox'
