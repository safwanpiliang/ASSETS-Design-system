import { cn } from '../../lib/cn'

// Namanya "Stepper" di Figma, tapi disebut Steps di sini supaya tidak
// bentrok dengan komponen Stepper (+/-) yang sudah ada di library ini —
// dua hal yang beda sama sekali walau kebetulan nama Figma-nya sama.
export interface StepItem {
  key: string
  title: string
  optionalLabel?: string
}

type StepStatus = 'complete' | 'active' | 'inactive'

export interface StepsProps {
  steps: StepItem[]
  /** Index step yang sedang aktif (0-based). Sebelum index ini = complete,
   * sesudahnya = inactive. */
  activeIndex: number
  orientation?: 'horizontal' | 'vertical'
  textPosition?: 'left' | 'center'
  /** Tampilkan nomor urut (01, 02, ...) di sebelah ikon. Default true —
   * Figma cuma menunjukkan nomor di layout "left", tapi dibuat berlaku
   * juga untuk "center" supaya konsisten; matikan lewat prop ini kalau
   * mau persis seperti contoh Figma. */
  showNumbers?: boolean
  className?: string
}

// Konstruksi ikon persis Figma (dicek dari SVG asli): lingkaran luar +
// lingkaran putih kecil di tengah bikin efek "ring". Bukan border biasa.
function StepIcon({ status }: { status: StepStatus }) {
  if (status === 'complete') {
    return (
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-400 text-white">
        <svg viewBox="0 0 24 24" className="size-3" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <span
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-full',
        status === 'active' ? 'bg-primary-400' : 'bg-primary-400/12'
      )}
    >
      <span className="size-3.5 rounded-full bg-white" />
    </span>
  )
}

export function Steps({
  steps,
  activeIndex,
  orientation = 'horizontal',
  textPosition = 'left',
  showNumbers = true,
  className,
}: StepsProps) {
  const isVertical = orientation === 'vertical'
  const isCenter = textPosition === 'center'

  return (
    <div className={cn('flex', isVertical ? 'flex-col items-start' : 'w-full items-center', className)}>
      {steps.map((step, i) => {
        const status: StepStatus = i < activeIndex ? 'complete' : i === activeIndex ? 'active' : 'inactive'
        const isLast = i === steps.length - 1

        return (
          <div
            key={step.key}
            className={cn('flex', isVertical ? 'flex-col items-center' : 'items-center', !isLast && !isVertical && 'flex-1')}
          >
            <div className={cn('flex', isCenter ? 'flex-col items-center gap-2' : 'items-center gap-2')}>
              <StepIcon status={status} />
              {showNumbers && (
                <span className={cn('text-h7 font-bold', status === 'inactive' ? 'text-neutral-700' : 'text-neutral-900')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              <div className={cn('flex flex-col', isCenter && 'items-center')}>
                <span className={cn('text-b3 whitespace-nowrap text-neutral-900', isCenter && 'text-center')}>
                  {step.title}
                </span>
                {step.optionalLabel && <span className="text-b4 text-neutral-800">{step.optionalLabel}</span>}
              </div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'shrink-0 rounded-full bg-primary-400',
                  status !== 'complete' && 'opacity-12',
                  isVertical ? 'my-2 h-8 w-[3px]' : 'mx-2 h-[3px] flex-1'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
