import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

// Config KHUSUS untuk build library (npm run build). Config utama
// (vite.config.ts) tetap dipakai apa adanya untuk `npm run dev` — preview
// Kurikulum/Showcase tidak ikut ter-bundle ke package yang dipakai konsumen.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ['src/components', 'src/lib', 'src/index.ts'], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SimatkulDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: 'style.css',
      },
    },
    cssCodeSplit: false,
  },
})
