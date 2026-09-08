import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  /** Konten bebas — di Figma badan modal berbeda-beda tiap pemakaian (form,
   * kartu pilihan, dst), jadi tidak digeneralisasi jadi prop terstruktur. */
  children?: ReactNode
  /** Tombol footer — kirim elemen <Button> asli, bukan label string, supaya
   * pemanggil bebas pilih theme/type sesuai konteks (mis. "Batal" outline,
   * "Simpan" solid), sama seperti dua contoh yang disampel dari Figma. */
  actions?: ReactNode
  buttonLayout?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * Tidak ada tombol close (X) — 4 contoh yang disampel dari Figma semuanya
 * cuma punya title+description+tombol, tanpa X. Tertutup lewat Escape/klik
 * di luar (bawaan useDismiss) atau tombol aksi yang dikirim pemanggil.
 */
export function Modal({ open, onClose, title, description, children, actions, buttonLayout = 'horizontal', className }: ModalProps) {
  const { refs, context } = useFloating({
    open,
    onOpenChange: (next) => {
      if (!next) onClose()
    },
  })

  const { getFloatingProps } = useInteractions([useDismiss(context), useRole(context)])

  if (!open) return null

  return (
    <FloatingPortal>
      {/* bg-neutral-1000/50: backdrop tidak tersampel di Figma (4 contoh cuma
       * menunjukkan kartunya sendiri) — dipilih dari token tergelap yang ada,
       * bukan hasil ekstraksi. */}
      <FloatingOverlay lockScroll className="z-50 flex items-center justify-center bg-neutral-1000/50 p-4">
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            className={cn(
              'flex w-[350px] flex-col gap-6 rounded-3 border-[1.5px] border-neutral-300 bg-neutral-200 p-6',
              className
            )}
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h2 className="text-h7 font-bold text-neutral-1000">{title}</h2>
              {description && <p className="text-b3 text-neutral-800">{description}</p>}
            </div>

            {children}

            {actions && (
              <div className={cn('flex w-full gap-4', buttonLayout === 'vertical' ? 'flex-col' : '[&>*]:flex-1')}>
                {actions}
              </div>
            )}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  )
}
