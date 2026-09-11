import { cn } from '../../lib/cn'
import AltArrowLeft from '@solar-icons/react/arrows/AltArrowLeft'
import AltArrowRight from '@solar-icons/react/arrows/AltArrowRight'

// Ukuran item 40px (bukan 48px) dan teks text-b3 (bukan b2) — nilai persis
// dari Figma, sempat salah dipakai lebih besar sebelumnya.
const itemBase =
  'flex size-10 shrink-0 items-center justify-center rounded-full text-b3 transition-colors ' +
  'focus-visible:outline-none focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary-400/10'

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

/**
 * Figma cuma menunjukkan contoh 4 halaman, tanpa pola pemotongan/ellipsis
 * untuk banyak halaman — jadi di sini SEMUA nomor halaman ditampilkan apa
 * adanya. Untuk daftar dengan puluhan halaman, ini kemungkinan perlu pola
 * ellipsis yang belum ada speknya; belum diimplementasikan karena tidak ada
 * rujukan desainnya.
 */
export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Navigasi halaman" className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(itemBase, 'text-primary-400 hover:bg-primary-400/10 disabled:pointer-events-none disabled:text-neutral-700')}
      >
        <span className="size-5 [&>svg]:size-full">
          <AltArrowLeft weight="LineDuotone" />
        </span>
      </button>

      {pages.map((p) => {
        const active = p === page
        return (
          <button
            key={p}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => onPageChange(p)}
            className={cn(itemBase, active ? 'bg-primary-400 text-white' : 'text-primary-400 hover:bg-primary-400/10')}
          >
            {p}
          </button>
        )
      })}

      <button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={cn(itemBase, 'text-primary-400 hover:bg-primary-400/10 disabled:pointer-events-none disabled:text-neutral-700')}
      >
        <span className="size-5 [&>svg]:size-full">
          <AltArrowRight weight="LineDuotone" />
        </span>
      </button>
    </nav>
  )
}
