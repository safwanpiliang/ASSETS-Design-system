import { useState } from 'react'
import { cn } from '../../lib/cn'
import { CalendarGrid, MONTH_NAMES, isSameDay, type CalendarDayState } from './CalendarGrid'

export interface DatePickerProps {
  value?: Date | null
  onChange?: (date: Date) => void
  /** Dipakai untuk highlight "hari ini" (tint hijau). Default `new Date()`. */
  today?: Date
  className?: string
}

export function DatePicker({ value, onChange, today = new Date(), className }: DatePickerProps) {
  const [viewDate, setViewDate] = useState(value ?? today)
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  function getDayState(d: Date): CalendarDayState {
    if (d.getMonth() !== month) return 'muted'
    if (isSameDay(d, value)) return 'selected'
    if (isSameDay(d, today)) return 'today'
    return 'default'
  }

  return (
    <div className={cn('inline-flex rounded-3 bg-white shadow-e2', className)}>
      <CalendarGrid
        year={year}
        month={month}
        monthLabel={`${MONTH_NAMES[month]} ${year}`}
        onPrevMonth={() => setViewDate(new Date(year, month - 1, 1))}
        onNextMonth={() => setViewDate(new Date(year, month + 1, 1))}
        getDayState={getDayState}
        onSelectDay={(d) => onChange?.(d)}
      />
    </div>
  )
}
