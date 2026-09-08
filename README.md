# SIMATKUL Design System

Component library React + Tailwind CSS v4, dibangun dari design system Figma SIMATKUL.

## Pakai di project lain (install dari Git)

```bash
npm install github:<org-atau-username>/<nama-repo>#main
```

Ganti `#main` dengan tag versi tertentu (mis. `#v0.1.0`) kalau mau pin ke versi
yang tidak berubah-ubah — untuk sekarang, karena masih sering di-update,
`#main` dulu tidak apa-apa.

React & React DOM **tidak** ikut ter-bundle (`peerDependencies`) — project
yang install ini harus sudah punya React 18+ sendiri.

## Pakai komponennya

```tsx
import { Button, Input, Table } from 'simatkul-design-system'
import 'simatkul-design-system/style.css' // sekali saja, di entry point app

function App() {
  return <Button theme="primary" variant="solid">Simpan</Button>
}
```

Project yang meng-install ini **wajib pakai Tailwind CSS juga** (v4), karena
sebagian besar styling di komponen ini pakai utility class Tailwind (bukan
CSS-in-JS) — `style.css` di atas cuma berisi token warna/tipografi/shadow milik
design system ini (`@theme` block), bukan seluruh utility Tailwind.

## Development lokal (di repo ini)

```bash
npm install
npm run dev     # buka halaman preview: Kurikulum (contoh nyata) + Component Showcase (semua komponen)
npm run build   # build library ke dist/ (dipanggil otomatis lewat "prepare" saat konsumen install)
```

`src/pages/` (Kurikulum, Showcase) itu alat bantu preview lokal saja — TIDAK
ikut ke package yang di-install konsumen. Yang diekspor cuma isi `src/index.ts`.

## Struktur

- `src/components/` — semua komponen (Button, Input, Table, Sidebar, Modal, dst)
- `src/styles/tokens.css` — token warna/tipografi/radius/shadow (`@theme` Tailwind v4)
- `src/lib/cn.ts` — helper gabung className (clsx + tailwind-merge)
- `src/index.ts` — barrel export, ini yang jadi entry point package

## Catatan status

Masih aktif dikembangkan — lihat komponen satu per satu untuk detail asumsi/
keterbatasan yang belum sempat diverifikasi ke desainer (dicatat sebagai
komentar di masing-masing file).
