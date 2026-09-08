import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface TableColumn<T> {
  key: string
  header: ReactNode
  /** Default 'left'. Di Figma, cuma kolom pertama yang left — sisanya center. */
  align?: 'left' | 'center' | 'right'
  /** Kolom lebar tetap (mis. kolom "Aksi") — tanpa ini, kolom flex-1 (bagi rata). */
  width?: string
  /** Custom render sel, terima seluruh row. Tanpa ini, tampilkan `row[key]` apa adanya. */
  render?: (row: T) => ReactNode
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  rowKey: (row: T) => string | number
  /** Slot bebas di atas header kolom — biasanya search Input + tombol aksi. */
  toolbar?: ReactNode
  emptyMessage?: ReactNode
}

function cellAlign(align: TableColumn<unknown>['align']) {
  if (align === 'center') return 'text-center justify-center'
  if (align === 'right') return 'text-right justify-end'
  return 'text-left justify-start'
}

/**
 * Catatan: ini hanya struktur dasar (toolbar + header + baris). Figma yang
 * disampel (node 4101:19081) tidak menunjukkan pagination atau state kosong —
 * `emptyMessage` di bawah ini asumsi praktis, bukan hasil ekstraksi Figma.
 */
export function Table<T>({ columns, data, rowKey, toolbar, emptyMessage = 'Tidak ada data' }: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2 border border-neutral-600 bg-white">
      {toolbar && (
        <div className="flex items-center justify-between border-b border-neutral-600 bg-neutral-400 p-3">
          {toolbar}
        </div>
      )}

      <div className="flex items-center bg-neutral-400 p-3">
        {columns.map((col) => (
          <p
            key={col.key}
            style={col.width ? { width: col.width, flexShrink: 0 } : undefined}
            className={cn('text-b2 font-bold text-neutral-1000', !col.width && 'flex-1', cellAlign(col.align))}
          >
            {col.header}
          </p>
        ))}
      </div>

      {data.length === 0 ? (
        <p className="text-b2 p-8 text-center text-neutral-700">{emptyMessage}</p>
      ) : (
        data.map((row, i) => (
          <div
            key={rowKey(row)}
            className={cn('flex items-center p-3', i < data.length - 1 && 'border-b border-neutral-400')}
          >
            {columns.map((col) => (
              <div
                key={col.key}
                style={col.width ? { width: col.width, flexShrink: 0 } : undefined}
                className={cn('flex items-center', !col.width && 'flex-1', cellAlign(col.align))}
              >
                {col.render ? (
                  col.render(row)
                ) : (
                  <p className="text-b2 text-neutral-1000">{String((row as Record<string, unknown>)[col.key] ?? '')}</p>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}
