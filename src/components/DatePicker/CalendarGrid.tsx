import { cn } from '../../lib/cn'
import AltArrowLeft from '@solar-icons/react/arrows/AltArrowLeft'
import AltArrowRight from '@solar-icons/react/arrows/AltArrowRight'

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export type CalendarDayState = 'default' | 'muted' | 'today' | 'selected' | 'range-start' | 'range-end' | 'in-range'

/** 42 tanggal (6 baris x 7 kolom) meliputi 1 bulan penuh + padding hari dari
 * bulan sebelum/sesudahnya, persis pola grid kalender di Figma. */
export function getMonthGrid(year: number, month: number): Date[] {
  const firstOfMonth = new Date(year, month, 1)
  const start = new Date(year, month, 1 - firstOfMonth.getDay())
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
}

export function isSameDay(a?: Date | null, b?: Date | null): boolean {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// Kelas per state diambil langsung dari Figma: "today" pakai tint Green/200
// (bukan Primary), "selected" solid Primary-400 + teks putih, "range-start"/
// "range-end" cuma di-rounded satu sisi supaya menyambung ke pita "in-range"
// (background tint tanpa radius) di antaranya.
const dayStateClass: Record<CalendarDayState, string> = {
  default: 'text-neutral-800',
  muted: 'text-neutral-700',
  today: 'rounded-full bg-green-200/10 text-green-200',
  selected: 'rounded-full bg-primary-400 text-white',
  'range-start': 'rounded-l-full bg-primary-400 text-white',
  'range-end': 'rounded-r-full bg-primary-400 text-white',
  'in-range': 'bg-primary-400/10 text-primary-400',
}

export interface CalendarGridProps {
  year: number
  month: number
  monthLabel: string
  onPrevMonth: () => void
  onNextMonth: () => void
  hidePrevButton?: boolean
  hideNextButton?: boolean
  getDayState: (date: Date) => CalendarDayState
  onSelectDay: (date: Date) => void
  className?: string
}

export function CalendarGrid({
  year,
  month,
  monthLabel,
  onPrevMonth,
  onNextMonth,
  hidePrevButton,
  hideNextButton,
  getDayState,
  onSelectDay,
  className,
}: CalendarGridProps) {
  const days = getMonthGrid(year, month)

  return (
    <div className={cn('flex w-[300px] flex-col items-center gap-2 p-2', className)}>
      <div className="flex w-full items-center px-0.5 py-1">
        {!hidePrevButton ? (
          <button
            type="button"
            onClick={onPrevMonth}
            aria-label="Bulan sebelumnya"
            className="flex size-9 shrink-0 items-center justify-center rounded-2 text-neutral-900 hover:bg-neutral-400"
          >
            <span className="size-5 [&>svg]:size-full">
              <AltArrowLeft weight="LineDuotone" />
            </span>
          </button>
        ) : (
          <span className="size-9 shrink-0" />
        )}
        <span className="text-b2 flex-1 text-center text-neutral-900">{monthLabel}</span>
        {!hideNextButton ? (
          <button
            type="button"
            onClick={onNextMonth}
            aria-label="Bulan berikutnya"
            className="flex size-9 shrink-0 items-center justify-center rounded-2 text-neutral-900 hover:bg-neutral-400"
          >
            <span className="size-5 [&>svg]:size-full">
              <AltArrowRight weight="LineDuotone" />
            </span>
          </button>
        ) : (
          <span className="size-9 shrink-0" />
        )}
      </div>

      <div className="flex w-full text-b3 font-bold text-neutral-900">
        {WEEKDAYS.map((w) => (
          <span key={w} className="flex w-10 shrink-0 items-center justify-center">
            {w}
          </span>
        ))}
      </div>

      <div className="grid w-full grid-cols-7">
        {days.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelectDay(d)}
            className={cn('flex h-9 w-10 items-center justify-center text-b3', dayStateClass[getDayState(d)])}
          >
            {d.getDate()}
          </button>
        ))}
      </div>
    </div>
  )
}
