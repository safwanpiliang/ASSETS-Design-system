import { useState } from 'react'
import KurikulumPage from './pages/Kurikulum'
import ShowcasePage from './pages/Showcase'

export default function App() {
  const [page, setPage] = useState<'kurikulum' | 'showcase'>('kurikulum')

  return (
    <div>
      <div className="flex gap-2 bg-neutral-1000 p-2">
        <button
          onClick={() => setPage('kurikulum')}
          className={`text-b4 rounded-2 px-3 py-1 ${page === 'kurikulum' ? 'bg-primary-400 text-white' : 'text-neutral-500'}`}
        >
          Halaman Kurikulum
        </button>
        <button
          onClick={() => setPage('showcase')}
          className={`text-b4 rounded-2 px-3 py-1 ${page === 'showcase' ? 'bg-primary-400 text-white' : 'text-neutral-500'}`}
        >
          Component Showcase
        </button>
      </div>
      {page === 'kurikulum' ? <KurikulumPage /> : <ShowcasePage />}
    </div>
  )
}
