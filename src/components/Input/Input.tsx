import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Figma memodelkan Hover/Focus/Disabled sebagai "State" yang sama level-nya
 * dengan Success/Info/Warning/Error. Di kode dipisah: interaksi native lewat
 * pseudo-class (:hover, :focus-within, :disabled), validasi lewat prop `status`.
 */
const wrapperVariants = cva(
  'flex items-center gap-3 border border-solid transition-colors ' +
    'focus-within:border-primary-400 ' +
    'has-[:disabled]:!border-neutral-400 has-[:disabled]:bg-neutral-200',
  {
    variants: {
      size: {
        // Figma "Medium" — Radius.2 (8px), lihat light.tokens.json
        md: 'px-3 py-2 rounded-2',
        // Figma "Large" — Radius.3 (12px)
        lg: 'p-3 rounded-3',
      },
      variant: {
        outline: 'bg-transparent border-neutral-500 hover:border-neutral-700',
        filled: 'bg-neutral-200 border-neutral-500 hover:border-neutral-700',
      },
      status: {
        default: '',
        success: 'border-green-200 focus-within:border-green-200',
        warning: 'border-yellow-200 focus-within:border-yellow-200',
        error: 'border-red-200 focus-within:border-red-200',
      },
    },
    defaultVariants: { size: 'lg', variant: 'outline', status: 'default' },
  }
)

const helperTextColor: Record<string, string> = {
  default: 'text-neutral-700',
  success: 'text-green-200',
  warning: 'text-yellow-200',
  error: 'text-red-200',
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof wrapperVariants> {
  label?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size = 'lg', variant = 'outline', status = 'default', label, helperText, leftIcon, rightIcon, id, disabled, ...props },
    ref
  ) => {
    const autoId = useId()
    const inputId = id ?? autoId

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn('text-b2', disabled ? 'text-neutral-900' : 'text-neutral-1000')}
          >
            {label}
          </label>
        )}

        <div className={cn(wrapperVariants({ size, variant, status }), className)}>
          {leftIcon && (
            <span className="size-6 shrink-0 text-neutral-700 [&>svg]:size-full">{leftIcon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'min-w-0 flex-1 bg-transparent outline-none',
              size === 'md' ? 'text-b3' : 'text-b2',
              'placeholder:text-neutral-700',
              disabled ? 'text-neutral-600 placeholder:text-neutral-600' : 'text-neutral-1000'
            )}
            {...props}
          />
          {rightIcon && (
            <span className="size-6 shrink-0 text-neutral-700 [&>svg]:size-full">{rightIcon}</span>
          )}
        </div>

        {helperText && (
          <p className={cn('text-b3', disabled ? 'text-neutral-600' : helperTextColor[status ?? 'default'])}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
