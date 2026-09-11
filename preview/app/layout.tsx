import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ASSETS Design System — Preview',
  description: 'Preview lokal semua komponen ASSETS Design System (dev only, tidak diikutkan ke package).',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
