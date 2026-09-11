import NotebookBookmark from '@solar-icons/react/school/NotebookBookmark'

// Contoh isi slot `logo` Sidebar — SIMATKUL-spesifik, sengaja hidup di app
// preview ini (bukan di dalam komponen Sidebar itu sendiri) karena Sidebar
// dipakai lintas project ASSETS dengan branding masing-masing.
export function SimatkulLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <NotebookBookmark weight="BoldDuotone" className="size-12 text-primary-500" />
      <span className="text-h7 font-bold text-primary-500">SIMATKUL</span>
    </div>
  )
}
