import { forwardRef, useId } from 'react'
import { Checkbox, type CheckboxProps } from './Checkbox'
import { cn } from '../../lib/cn'

export interface CheckboxFieldProps extends CheckboxProps {
  label: string
  textSide?: 'left' | 'right'
}

// Figma-nya pakai font Inter 16px (bukan token proyek) — dikoreksi jadi
// text-b2 / text-neutral-1000, sama seperti perbaikan Toggle+Text sebelumnya.
export const CheckboxField = forwardRef<HTMLButtonElement, CheckboxFieldProps>(
  ({ label, textSide = 'left', className, ...props }, ref) => {
    const id = useId()
    return (
      <div className={cn('flex w-full items-center gap-4', textSide === 'right' && 'flex-row-reverse', className)}>
        <Checkbox ref={ref} id={id} {...props} />
        <label htmlFor={id} className="text-b2 flex-1 text-neutral-1000">
          {label}
        </label>
      </div>
    )
  }
)
CheckboxField.displayName = 'CheckboxField'
