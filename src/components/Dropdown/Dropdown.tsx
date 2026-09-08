import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
  FloatingPortal,
} from '@floating-ui/react'
import { useState, type ReactNode } from 'react'
import { Input, type InputProps } from '../Input/Input'
import { Checkbox } from '../Checkbox/Checkbox'
import AltArrowDown from '@solar-icons/react/arrows/AltArrowDown'
import { cn } from '../../lib/cn'

export interface DropdownOption {
  key: string
  label: string
  icon?: ReactNode
}

export interface DropdownProps extends Pick<InputProps, 'label' | 'size' | 'variant' | 'status' | 'helperText' | 'className'> {
  placeholder?: string
  options: DropdownOption[]
  /** Multi-select — sesuai Figma (tiap opsi punya Checkbox sendiri, bukan radio tunggal). */
  value: string[]
  onChange: (value: string[]) => void
}

/**
 * Trigger-nya benar-benar komponen Input yang sama dipakai di form biasa
 * (readOnly, cuma buat nampilin ringkasan pilihan + buka panel saat diklik) —
 * bukan komponen terpisah, sesuai instruksi user.
 */
export function Dropdown({ label, placeholder = 'Pilih opsi', options, value, onChange, size: inputSize, variant, status, helperText, className }: DropdownProps) {
  const [open, setOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      // Lebar panel selalu ngikutin lebar trigger — sama seperti di Figma
      // (menu selebar Input Large, bukan lebar tetap 350px).
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, { width: `${rects.reference.width}px` })
        },
      }),
    ],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: 'listbox' }),
  ])

  const toggle = (key: string) => {
    onChange(value.includes(key) ? value.filter((k) => k !== key) : [...value, key])
  }

  const summary = options
    .filter((o) => value.includes(o.key))
    .map((o) => o.label)
    .join(', ')

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()} className="cursor-pointer">
        <Input
          label={label}
          size={inputSize}
          variant={variant}
          status={status}
          helperText={helperText}
          placeholder={placeholder}
          value={summary}
          readOnly
          rightIcon={
            <AltArrowDown weight="LineDuotone" className={cn('transition-transform', open && 'rotate-180')} />
          }
          className={cn('cursor-pointer', className)}
        />
      </div>

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 flex flex-col gap-2 overflow-hidden rounded-2 bg-white py-2 shadow-e3"
          >
            {options.map((opt) => {
              const checked = value.includes(opt.key)
              return (
                <div
                  key={opt.key}
                  role="option"
                  aria-selected={checked}
                  onClick={() => toggle(opt.key)}
                  className="flex w-full cursor-pointer items-center gap-3 py-3 pr-4 pl-3 hover:bg-neutral-200"
                >
                  <span className="flex flex-1 items-center gap-3 overflow-hidden">
                    {opt.icon && (
                      <span className="size-6 shrink-0 text-neutral-800 [&>svg]:size-full">{opt.icon}</span>
                    )}
                    <span className="text-b2 truncate text-neutral-1000">{opt.label}</span>
                  </span>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggle(opt.key)}
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={-1}
                  />
                </div>
              )
            })}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
