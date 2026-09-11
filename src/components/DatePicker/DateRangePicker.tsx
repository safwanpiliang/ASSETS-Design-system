import { useState } from 'react'
import { cn } from '../../lib/cn'
import { CalendarGrid, MONTH_NAMES, isSameDay, type CalendarDayState } from './CalendarGrid'

export interface DateRangePickerProps {
  value?: [Date | null, Date | null]
  onChange?: (range: [Date | null, Date | null]) => void
  today?: Date
  className?: string
}

// Interaksi: klik pertama set start (range kosong), klik kedua jadi end
// (otomatis dibalik kalau tanggalnya sebelum start). Klik lagi setelah range
// lengkap mulai range baru — pola umum date-range-picker, tidak dijelaskan
// eksplisit di Figma (yang cuma tampilan statis) tapi ini interaksi standar.
export function DateRangePicker({ value, onChange, today = new Date(), className }: DateRangePickerProps) {
  const [start, end] = value ?? [null, null]
  const [viewDate, setViewDate] = useState(start ?? today)
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const nextMonthDate = new Date(year, month + 1, 1)
  const nextYear = nextMonthDate.getFullYear()
  const nextMonth = nextMonthDate.getMonth()

  function handleSelect(d: Date) {
    if (!start || (start && end)) {
      onChange?.([d, null])
    } else if (d < start) {
      onChange?.([d, start])
    } else {
      onChange?.([start, d])
    }
  }

  function getDayState(d: Date, viewMonth: number): CalendarDayState {
    if (d.getMonth() !== viewMonth) return 'muted'
    if (isSameDay(d, start) && isSameDay(d, end)) return 'selected'
    if (isSameDay(d, start)) return end ? 'range-start' : 'selected'
    if (isSameDay(d, end)) return 'range-end'
    if (start && end && d > start && d < end) return 'in-range'
    if (isSameDay(d, today)) return 'today'
    return 'default'
  }

  function goPrev() {
    setViewDate(new Date(year, month - 1, 1))
  }
  function goNext() {
    setViewDate(new Date(year, month + 1, 1))
  }

  return (
    <div className={cn('inline-flex items-start rounded-3 bg-white shadow-e2', className)}>
      <CalendarGrid
        year={year}
        month={month}
        monthLabel={`${MONTH_NAMES[month]} ${year}`}
        onPrevMonth={goPrev}
        onNextMonth={goNext}
        hideNextButton
        getDayState={(d) => getDayState(d, month)}
        onSelectDay={handleSelect}
      />
      <CalendarGrid
        year={nextYear}
        month={nextMonth}
        monthLabel={`${MONTH_NAMES[nextMonth]} ${nextYear}`}
        onPrevMonth={goPrev}
        onNextMonth={goNext}
        hidePrevButton
        getDayState={(d) => getDayState(d, nextMonth)}
        onSelectDay={handleSelect}
        className="border-l border-neutral-600"
      />
    </div>
  )
}
