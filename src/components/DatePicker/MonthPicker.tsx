import { useState } from 'react'
import { cn } from '../../lib/cn'
import AltArrowLeft from '@solar-icons/react/arrows/AltArrowLeft'
import AltArrowRight from '@solar-icons/react/arrows/AltArrowRight'

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export interface MonthPickerValue {
  year: number
  /** 0-based, sama seperti `Date.getMonth()`. */
  month: number
}

export interface MonthPickerProps {
  value?: MonthPickerValue | null
  onChange?: (value: MonthPickerValue) => void
  className?: string
}

export function MonthPicker({ value, onChange, className }: MonthPickerProps) {
  const [year, setYear] = useState(value?.year ?? new Date().getFullYear())

  return (
    <div className={cn('inline-flex w-[200px] flex-col items-center gap-1.5 rounded-3 bg-white p-2 shadow-e2', className)}>
      <div className="flex w-full items-center pt-1">
        <button
          type="button"
          onClick={() => setYear((y) => y - 1)}
          aria-label="Tahun sebelumnya"
          className="flex size-9 shrink-0 items-center justify-center rounded-2 text-neutral-900 hover:bg-neutral-400"
        >
          <span className="size-5 [&>svg]:size-full">
            <AltArrowLeft weight="LineDuotone" />
          </span>
        </button>
        <span className="text-b2 flex-1 text-center text-neutral-900">{year}</span>
        <button
          type="button"
          onClick={() => setYear((y) => y + 1)}
          aria-label="Tahun berikutnya"
          className="flex size-9 shrink-0 items-center justify-center rounded-2 text-neutral-900 hover:bg-neutral-400"
        >
          <span className="size-5 [&>svg]:size-full">
            <AltArrowRight weight="LineDuotone" />
          </span>
        </button>
      </div>
      <div className="grid w-full grid-cols-3 gap-y-1 pb-2">
        {MONTH_SHORT.map((label, i) => {
          const selected = value?.year === year && value.month === i
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange?.({ year, month: i })}
              className={cn(
                'flex h-8 items-center justify-center rounded-1 text-b3',
                selected ? 'bg-primary-400 text-white' : 'text-neutral-800 hover:bg-neutral-400'
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
