import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

/**
 * Menggabungkan "Button-Primary" dan "Button-Secondary" dari Figma
 * (dua component set terpisah yang isinya identik kecuali warna accent)
 * menjadi satu axis `theme` — hindari duplikasi 100+ varian dua kali.
 */
const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-bold transition-colors ' +
    'disabled:pointer-events-none focus-visible:outline-none',
  {
    variants: {
      theme: {
        primary: '',   // teal — Primary/400 #0298AB, Primary/500 #017793
        secondary: '', // oranye — Secondary/400 #D16E05, Secondary/500 #B35503
        neutral: '',   // Neutral/800 #7085AE, border #E9EAEB
        error: '',     // Red/100 #FB3748, Red/200 #D00416
      },
      // Nama axis ini sengaja "variant", bukan "type" — "type" bentrok dengan
      // atribut native <button type="submit|reset|button">, ketahuan pas
      // generate declaration file (.d.ts) (TS2320: Interface cannot
      // simultaneously extend ... incompatible 'type').
      variant: {
        // rounded-2 = Radius.2 (8px), lihat light.tokens.json
        // solid TIDAK dapat border di sini — di Figma border-width-nya 0 untuk
        // primary/secondary/error (bg warna sudah cukup); neutral jadi
        // pengecualian yang menambahkan border 1px lewat compoundVariants.
        solid: 'border-0 rounded-2',
        outline: 'border border-solid rounded-2 bg-transparent',
        ghost: 'rounded-2 bg-transparent border-0',
        link: 'bg-transparent border-0 p-0 rounded-none',
      },
      size: {
        sm: 'text-xs leading-[18px]',
        md: 'text-sm leading-[21px]',
        lg: 'text-sm leading-[21px]',
      },
    },
    compoundVariants: [
      // ---- padding & tinggi per size, kecuali Link (fixed height, no padding) ----
      { variant: ['solid', 'outline', 'ghost'], size: 'sm', className: 'p-2' },
      { variant: ['solid', 'outline', 'ghost'], size: 'md', className: 'p-3' },
      { variant: ['solid', 'outline', 'ghost'], size: 'lg', className: 'p-4 rounded-3' },
      { variant: 'link', size: 'sm', className: 'h-9 gap-1' },
      { variant: 'link', size: 'md', className: 'h-11 gap-1' },
      { variant: 'link', size: 'lg', className: 'h-[52px] gap-1' },

      // ---- theme=primary (teal) ----
      {
        theme: 'primary', variant: 'solid',
        className:
          'bg-primary-400 border-primary-500 text-white ' +
          'hover:bg-primary-500 hover:border-primary-500 ' +
          'focus-visible:ring-4 focus-visible:ring-primary-400/10 ' +
          'disabled:bg-disabled-fill disabled:border-transparent disabled:text-primary-400/10',
      },
      {
        theme: 'primary', variant: 'outline',
        className:
          'border-primary-500 text-primary-400 ' +
          'hover:bg-primary-400/10 focus-visible:ring-4 focus-visible:ring-primary-400/10 ' +
          'disabled:border-disabled-stroke disabled:text-primary-400/10',
      },
      {
        theme: 'primary', variant: 'ghost',
        className:
          'text-primary-400 hover:bg-primary-400/10 ' +
          'focus-visible:ring-4 focus-visible:ring-primary-400/10 disabled:text-primary-400/10',
      },
      {
        theme: 'primary', variant: 'link',
        className: 'text-primary-400 hover:underline disabled:text-primary-400/10',
      },

      // ---- theme=secondary (oranye) ----
      {
        theme: 'secondary', variant: 'solid',
        className:
          'bg-secondary-400 border-secondary-500 text-white ' +
          'hover:bg-secondary-500 hover:border-secondary-500 ' +
          'focus-visible:ring-4 focus-visible:ring-secondary-400/10 ' +
          'disabled:bg-disabled-fill disabled:border-transparent disabled:text-secondary-400/10',
      },
      {
        theme: 'secondary', variant: 'outline',
        className:
          'border-secondary-500 text-secondary-400 ' +
          'hover:bg-secondary-400/10 focus-visible:ring-4 focus-visible:ring-secondary-400/10 ' +
          'disabled:border-disabled-stroke disabled:text-secondary-400/10',
      },
      {
        theme: 'secondary', variant: 'ghost',
        className:
          'text-secondary-400 hover:bg-secondary-400/10 ' +
          'focus-visible:ring-4 focus-visible:ring-secondary-400/10 disabled:text-secondary-400/10',
      },
      {
        theme: 'secondary', variant: 'link',
        className: 'text-secondary-400 hover:underline disabled:text-secondary-400/10',
      },

      // ---- theme=neutral ----
      {
        // Satu-satunya solid yang benar-benar butuh border terlihat (bg putih
        // di atas bg putih/terang butuh garis, beda dari primary/secondary/error).
        theme: 'neutral', variant: 'solid',
        className:
          'border border-solid bg-white border-border-default text-neutral-800 ' +
          'hover:bg-disabled-fill focus-visible:ring-4 focus-visible:ring-neutral-800/10 ' +
          'disabled:bg-disabled-fill disabled:border-disabled-stroke disabled:text-neutral-800/30',
      },
      {
        theme: 'neutral', variant: 'outline',
        className:
          'border-border-default text-neutral-800 hover:bg-disabled-fill ' +
          'focus-visible:ring-4 focus-visible:ring-neutral-800/10 ' +
          'disabled:border-disabled-stroke disabled:text-neutral-800/30',
      },
      {
        theme: 'neutral', variant: 'ghost',
        className:
          'text-neutral-800 hover:bg-disabled-fill ' +
          'focus-visible:ring-4 focus-visible:ring-neutral-800/10 disabled:text-neutral-800/30',
      },
      {
        theme: 'neutral', variant: 'link',
        className: 'text-neutral-800 hover:underline disabled:text-neutral-800/30',
      },

      // ---- theme=error ----
      {
        theme: 'error', variant: 'solid',
        className:
          'bg-red-100 border-red-200 text-white ' +
          'hover:bg-red-200 hover:border-red-200 ' +
          'focus-visible:ring-4 focus-visible:ring-red-100/10 ' +
          'disabled:bg-disabled-fill disabled:border-transparent disabled:text-red-100/10',
      },
      {
        theme: 'error', variant: 'outline',
        className:
          'border-red-100 text-red-100 hover:bg-red-100/10 ' +
          'focus-visible:ring-4 focus-visible:ring-red-100/10 ' +
          'disabled:border-disabled-stroke disabled:text-red-100/10',
      },
      {
        theme: 'error', variant: 'ghost',
        className:
          'text-red-100 hover:bg-red-100/10 ' +
          'focus-visible:ring-4 focus-visible:ring-red-100/10 disabled:text-red-100/10',
      },
      {
        theme: 'error', variant: 'link',
        className: 'text-red-100 hover:underline disabled:text-red-100/10',
      },
    ],
    defaultVariants: { theme: 'primary', variant: 'solid', size: 'md' },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, theme, variant, size, iconLeft, iconRight, children, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ theme, variant, size }), className)}
      {...props}
    >
      {iconLeft && <span className="size-5 shrink-0 [&>svg]:size-full">{iconLeft}</span>}
      {children}
      {iconRight && <span className="size-5 shrink-0 [&>svg]:size-full">{iconRight}</span>}
    </button>
  )
)
Button.displayName = 'Button'
