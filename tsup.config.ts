import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outExtension: ({ format }) => ({ js: format === 'esm' ? '.mjs' : '.cjs' }),
  dts: true,
  clean: true,
  sourcemap: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  // Semua komponen di package ini pakai hooks, jadi wajib ditandai Client
  // Component untuk Next.js App Router. Lihat README "Pakai di Next.js".
  banner: { js: "'use client';" },
})
