import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

const stepperVariants = cva(
  'flex h-8 items-center justify-center gap-3 rounded-2 px-3', // rounded-2 = Radius.2 (8px)
  {
    variants: {
      variant: {
        filled: 'bg-primary-400/10 text-primary-400',
        outline: 'border border-[1.5px] border-neutral-600 bg-white text-neutral-1000',
      },
    },
    defaultVariants: { variant: 'filled' },
  }
)

// Divider awalnya "Grey/200" (#E5E7EA), di luar 21 warna canonical — diganti
// dengan warna terdekat di Color Main: Neutral/600 (#E0E5F2, jarak terkecil).
const dividerColor: Record<string, string> = {
  filled: 'bg-primary-400',
  outline: 'bg-neutral-600',
}

// Bukan icon dari icon set — di Figma-nya murni garis vektor, bukan glyph Solar.
function MinusGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none">
      <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PlusGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none">
      <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export interface StepperProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  onDecrement?: () => void
  onIncrement?: () => void
  decrementDisabled?: boolean
  incrementDisabled?: boolean
}

// Murni dua tombol (kurang/tambah) + divider — TIDAK ada tampilan angka di
// dalam komponen ini (dikonfirmasi user). Nilai/counter ditampilkan &
// dikelola oleh pemanggil, di luar Stepper.
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ className, variant = 'filled', onDecrement, onIncrement, decrementDisabled, incrementDisabled, ...props }, ref) => (
    <div ref={ref} className={cn(stepperVariants({ variant }), className)} {...props}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={decrementDisabled}
        aria-label="Kurangi"
        className="flex shrink-0 items-center justify-center disabled:opacity-40"
      >
        <MinusGlyph />
      </button>
      <span className={cn('h-8 w-[1.5px] shrink-0', dividerColor[variant ?? 'filled'])} />
      <button
        type="button"
        onClick={onIncrement}
        disabled={incrementDisabled}
        aria-label="Tambah"
        className="flex shrink-0 items-center justify-center disabled:opacity-40"
      >
        <PlusGlyph />
      </button>
    </div>
  )
)
Stepper.displayName = 'Stepper'
