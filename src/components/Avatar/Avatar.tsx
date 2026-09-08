import { forwardRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type AvatarSize = 'tiny' | 'small' | 'medium' | 'large' | 'giant' | 'xl' | 'xxl' | 'xxxl'

/**
 * Nilai px asli dari Figma untuk tiap ukuran. Huruf inisial di Figma memakai
 * skala tipografi Inter terpisah (H1/H3/H4/H5/S1/S2/C2) yang sepertinya sisa
 * template figr.design, bukan bagian sistem tipografi proyek — di sini dipakai
 * ANGKA PIKSEL yang sama (visual identik) tapi dengan font-sans + font-bold
 * milik proyek, bukan Inter.
 */
const sizeConfig: Record<AvatarSize, { box: number; letter: number; dot: number }> = {
  tiny: { box: 24, letter: 12, dot: 8 },
  small: { box: 32, letter: 16, dot: 10 },
  medium: { box: 40, letter: 18, dot: 12 },
  large: { box: 48, letter: 24, dot: 12 },
  giant: { box: 56, letter: 28, dot: 16 },
  xl: { box: 64, letter: 32, dot: 16 },
  xxl: { box: 80, letter: 48, dot: 20 },
  xxxl: { box: 96, letter: 48, dot: 24 },
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize
  /** URL foto profil user. Bukan bagian dari komponen Figma aslinya (yang cuma
   * punya Letter/Icon) — ditambahkan karena kebutuhan nyata: sebelum user
   * mengunggah foto (atau kalau gagal dimuat), otomatis fallback ke Letter/Icon. */
  src?: string
  alt?: string
  /** Huruf inisial — fallback kalau `src` kosong/gagal dan `icon` tidak diisi. */
  letter?: string
  /** Slot ikon (mis. UserBoldDuotoneIcon dari @solar-icons/react) — fallback kalau `src` kosong/gagal. */
  icon?: React.ReactNode
  /** Titik status hijau di pojok kanan-bawah (dari Figma cuma boolean, bukan varian warna). */
  status?: boolean
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = 'medium', src, alt = '', letter = 'A', icon, status = false, style, ...props }, ref) => {
    const { box, letter: letterSize, dot } = sizeConfig[size]
    // Menyimpan src yang GAGAL dimuat (bukan boolean) — kalau `src` berganti ke
    // URL baru (mis. user unggah ulang), fallback otomatis lepas lagi tanpa
    // perlu reset manual dari luar.
    const [erroredSrc, setErroredSrc] = useState<string>()
    const showPhoto = Boolean(src) && src !== erroredSrc

    return (
      <div
        ref={ref}
        // TIDAK overflow-hidden di sini — kalau ditambah, root yang rounded-full
        // ikut memotong titik status jadi bentuk lingkaran, bikin dot yang
        // seharusnya nongol di atas tepi avatar malah keliatan tenggelam ke
        // dalam. <img> di bawah sudah clip sendiri ke bentuk bulat via rounded-full.
        className={cn('relative shrink-0 rounded-full bg-secondary-500', className)}
        style={{ width: box, height: box, ...style }}
        {...props}
      >
        {showPhoto ? (
          <img
            src={src}
            alt={alt}
            onError={() => setErroredSrc(src)}
            className="size-full rounded-full object-cover"
          />
        ) : icon ? (
          <div className="absolute inset-1/4 flex items-center justify-center text-white [&>svg]:size-full">{icon}</div>
        ) : (
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-bold whitespace-nowrap text-white"
            style={{ fontSize: letterSize, lineHeight: 1 }}
          >
            {letter}
          </span>
        )}

        {status && (
          <span
            className="absolute right-0 bottom-0 rounded-full bg-green-200 ring-2 ring-white"
            style={{ width: dot, height: dot }}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'
