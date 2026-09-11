import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Token ukuran teks kustom kita (text-h1..h7, text-b1..b5) dipakai lewat
// utility Tailwind "text-*" yang sama dengan text-{warna} (text-primary-400,
// dst). Tanpa config ini, tailwind-merge mengira keduanya SATU grup ("ukuran
// vs warna sama-sama diawali text-") dan otomatis membuang salah satunya
// (yang belakangan menang) — bug nyata yang bikin text-b3 hilang diam-diam
// saat dipakai bareng text-primary-400 dalam satu cn() (lihat Pagination).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'b1', 'b2', 'b3', 'b4', 'b5'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
