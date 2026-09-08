import { forwardRef, useId } from 'react'
import { Switch, type SwitchProps } from './Switch'
import { cn } from '../../lib/cn'

export interface SwitchFieldProps extends SwitchProps {
  label: string
  textSide?: 'left' | 'right'
}

// Figma-nya pakai font Inter 16px warna #131927 (bukan token proyek) — dikoreksi
// di sini jadi text-b2 / text-neutral-1000, sama seperti perbaikan Input/Medium.
export const SwitchField = forwardRef<HTMLButtonElement, SwitchFieldProps>(
  ({ label, textSide = 'left', className, ...props }, ref) => {
    const id = useId()
    return (
      <div className={cn('flex w-full items-start gap-4', textSide === 'right' && 'flex-row-reverse', className)}>
        <Switch ref={ref} id={id} {...props} />
        <label htmlFor={id} className={cn('text-b2 flex-1 text-neutral-1000', textSide === 'right' && 'text-right')}>
          {label}
        </label>
      </div>
    )
  }
)
SwitchField.displayName = 'SwitchField'
