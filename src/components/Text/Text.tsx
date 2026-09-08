import { cva, type VariantProps } from 'class-variance-authority'
import { createElement, forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

const textVariants = cva('font-sans', {
  variants: {
    variant: {
      h1: 'text-h1 font-bold',
      h2: 'text-h2 font-bold',
      h3: 'text-h3 font-bold',
      h4: 'text-h4 font-bold',
      h5: 'text-h5 font-bold',
      h6: 'text-h6 font-bold',
      h7: 'text-h7 font-bold',
      b1: 'text-b1 font-medium',
      b2: 'text-b2 font-normal',
      b3: 'text-b3 font-normal',
      b4: 'text-b4 font-normal',
      b5: 'text-b5 font-normal',
    },
  },
  defaultVariants: { variant: 'b2' },
})

// Elemen HTML default per varian, supaya <Text variant="h1"> otomatis jadi <h1>
// dan tetap semantik untuk screen reader — bisa dioverride lewat prop `as`.
const defaultElement: Record<NonNullable<VariantProps<typeof textVariants>['variant']>, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6', h7: 'h6',
  b1: 'p', b2: 'p', b3: 'p', b4: 'p', b5: 'p',
}

export interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant = 'b2', as, children, ...props }, ref) =>
    createElement(
      as ?? defaultElement[variant!],
      { ref, className: cn(textVariants({ variant }), className), ...props },
      children
    )
)
Text.displayName = 'Text'
