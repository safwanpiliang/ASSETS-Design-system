import { forwardRef, useId } from 'react'
import { Radio, type RadioProps } from './Radio'
import { cn } from '../../lib/cn'

export interface RadioFieldProps extends RadioProps {
  label: string
  textSide?: 'left' | 'right'
}

// Figma-nya pakai font Inter 16px (bukan token proyek) — dikoreksi jadi
// text-b2 / text-neutral-1000, sama seperti Checkbox+Text/Toggle+Text.
export const RadioField = forwardRef<HTMLButtonElement, RadioFieldProps>(
  ({ label, textSide = 'left', className, ...props }, ref) => {
    const id = useId()
    return (
      <div className={cn('flex w-full items-center gap-4', textSide === 'right' && 'flex-row-reverse', className)}>
        <Radio ref={ref} id={id} {...props} />
        <label htmlFor={id} className="text-b2 flex-1 text-neutral-1000">
          {label}
        </label>
      </div>
    )
  }
)
RadioField.displayName = 'RadioField'
