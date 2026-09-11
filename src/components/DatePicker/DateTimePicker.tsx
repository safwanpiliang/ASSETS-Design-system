import { useState } from 'react'
import { cn } from '../../lib/cn'
import { CalendarGrid, MONTH_NAMES, isSameDay, type CalendarDayState } from './CalendarGrid'

export interface DateTimePickerProps {
  value?: Date | null
  onChange?: (date: Date) => void
  timeSlots: string[]
  selectedTime?: string
  onSelectTime?: (time: string) => void
  today?: Date
  className?: string
}

export function DateTimePicker({
  value,
  onChange,
  timeSlots,
  selectedTime,
  onSelectTime,
  today = new Date(),
  className,
}: DateTimePickerProps) {
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
    <div className={cn('inline-flex items-stretch rounded-3 bg-white shadow-e2', className)}>
      <CalendarGrid
        year={year}
        month={month}
        monthLabel={`${MONTH_NAMES[month]} ${year}`}
        onPrevMonth={() => setViewDate(new Date(year, month - 1, 1))}
        onNextMonth={() => setViewDate(new Date(year, month + 1, 1))}
        getDayState={getDayState}
        onSelectDay={(d) => onChange?.(d)}
        className="border-r border-neutral-600"
      />
      <div className="flex w-[120px] flex-col">
        <div className="flex h-[52px] shrink-0 items-center justify-center px-0.5 py-1">
          <span className="text-b3 text-neutral-900">Time Picker</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 overflow-y-auto p-2">
          {timeSlots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onSelectTime?.(t)}
              className={cn(
                'flex h-8 w-full shrink-0 items-center justify-center rounded-2 text-b3',
                t === selectedTime ? 'bg-primary-400 text-white' : 'text-neutral-800 hover:bg-neutral-400'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
