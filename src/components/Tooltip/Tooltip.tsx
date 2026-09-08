import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  FloatingPortal,
  FloatingArrow,
  type Placement,
} from '@floating-ui/react'
import { useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type TooltipDirection = 'up' | 'down' | 'left' | 'right' | 'none'

const placementMap: Record<Exclude<TooltipDirection, 'none'>, Placement> = {
  up: 'top',
  down: 'bottom',
  left: 'left',
  right: 'right',
}

export interface TooltipProps {
  title: ReactNode
  description?: ReactNode
  direction?: TooltipDirection
  /** Kalau diisi, tooltip terkontrol (dipakai untuk tips/tutorial sesaat).
   * Kalau dikosongkan, tampil otomatis lewat hover/focus pada trigger. */
  open?: boolean
  children: ReactNode
  className?: string
}

export function Tooltip({ title, description, direction = 'up', open, children, className }: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen
  const showArrow = direction !== 'none'
  const arrowRef = useRef<SVGSVGElement>(null)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: isControlled ? undefined : setUncontrolledOpen,
    placement: direction === 'none' ? 'top' : placementMap[direction],
    // whileElementsMounted+autoUpdate: reposisi otomatis saat scroll/resize/animasi,
    // bukan cuma sekali dihitung di awal — inilah yang bikin auto-flip benar-benar
    // "flip" saat ruang berubah, bukan cuma saat pertama muncul.
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(showArrow ? 10 : 8),
      // fallbackAxisSideDirection: kalau top/bottom/left/right semua mentok,
      // tetap coba sisi lain daripada diam-diam terpotong di tepi layar.
      flip({ fallbackAxisSideDirection: 'start' }),
      shift({ padding: 8 }),
      ...(showArrow ? [arrow({ element: arrowRef })] : []),
    ],
  })

  // Interaksi hover/focus/dismiss hanya aktif saat mode tidak terkontrol —
  // mode terkontrol (tips onboarding) sepenuhnya dikendalikan prop `open`.
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { enabled: !isControlled }),
    useFocus(context, { enabled: !isControlled }),
    useDismiss(context, { enabled: !isControlled }),
    useRole(context, { role: 'tooltip' }),
  ])

  return (
    <>
      {/* Dibungkus <span> polos, bukan cloneElement ke children — supaya trigger
          APA PUN (Button, teks, ikon, komponen custom) pasti bisa nge-ref tanpa
          perlu tahu apakah children-nya forward ref dengan benar atau tidak. */}
      <span ref={refs.setReference} {...getReferenceProps()} className="inline-flex">
        {children}
      </span>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            role="tooltip"
            className={cn(
              'z-50 flex flex-col items-center whitespace-nowrap rounded-[6px] bg-secondary-400 px-2 py-1 text-neutral-300',
              className
            )}
            {...getFloatingProps()}
          >
            <span className="text-b4 font-bold">{title}</span>
            {description && <span className="text-b5">{description}</span>}
            {showArrow && <FloatingArrow ref={arrowRef} context={context} className="fill-secondary-400" />}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
