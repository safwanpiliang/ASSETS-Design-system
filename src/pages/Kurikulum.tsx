import { Sidebar, type SidebarItem } from '../components/Sidebar/Sidebar'
import { SimatkulLogo } from './SimatkulLogo'
import { Button } from '../components/Button/Button'
import { Input } from '../components/Input/Input'
import { StatCard } from '../components/StatCard/StatCard'
import { Table, type TableColumn } from '../components/Table/Table'
import { Pagination } from '../components/Pagination/Pagination'
import { useState } from 'react'

import Database from '@solar-icons/react/ui/Database'
import FileSmile from '@solar-icons/react/files/FileSmile'
import FileSend from '@solar-icons/react/files/FileSend'
import BookmarkSquare from '@solar-icons/react/school/BookmarkSquare'
import KeySquare from '@solar-icons/react/security/KeySquare'
import UserId from '@solar-icons/react/users/UserId'
import UsersGroupTwoRounded from '@solar-icons/react/users/UsersGroupTwoRounded'
import ClockSquare from '@solar-icons/react/time/ClockSquare'
import Magnifer from '@solar-icons/react/search/Magnifer'
import Filter from '@solar-icons/react/ui/Filter'
import AddSquare from '@solar-icons/react/ui/AddSquare'
import Pen from '@solar-icons/react/messages/Pen'
import TrashBinTrash from '@solar-icons/react/ui/TrashBinTrash'

const navItems: SidebarItem[] = [
  { key: 'master-data', label: 'Master Data', icon: <Database weight="BoldDuotone" />, active: true },
  { key: 'penjadwalan', label: 'Penjadwalan', icon: <FileSmile weight="BoldDuotone" /> },
  { key: 'hasil', label: 'Hasil', icon: <FileSend weight="BoldDuotone" /> },
]

const stats = [
  { icon: <BookmarkSquare weight="BoldDuotone" />, value: 425, label: 'Data Kurikulum' },
  { icon: <KeySquare weight="BoldDuotone" />, value: 60, label: 'Daftar Ruang' },
  { icon: <UserId weight="BoldDuotone" />, value: 63, label: 'Daftar Dosen' },
  { icon: <UsersGroupTwoRounded weight="BoldDuotone" />, value: 22, label: 'Daftar Kelas' },
  { icon: <ClockSquare weight="BoldDuotone" />, value: 5, label: 'Sesi' },
]

const filterTabs = ['Kurikulum', 'Ruangan', 'Dosen', 'Kelas', 'Sesi']

interface MataKuliahRow {
  id: number
  code: string
  name: string
  semester: number
  sks: number
  kelompok: string
  jenis: string
  tipe: string
}

const rows: MataKuliahRow[] = [
  { id: 1, code: 'TRIK SVIK214101', name: 'Bahasa Inggris 1', semester: 1, sks: 2, kelompok: 'MKK', jenis: 'Wajib', tipe: 'Teori' },
  { id: 2, code: 'TRIK SVIK214102', name: 'Fisika Teknik 1', semester: 1, sks: 2, kelompok: 'MKK', jenis: 'Wajib', tipe: 'Teori' },
  { id: 3, code: 'TRIK SVIK214101', name: 'Bahasa Inggris 1', semester: 1, sks: 2, kelompok: 'MKK', jenis: 'Wajib', tipe: 'Teori' },
  { id: 4, code: 'TRIK SVIK214101', name: 'Bahasa Inggris 1', semester: 1, sks: 2, kelompok: 'MKK', jenis: 'Wajib', tipe: 'Teori' },
  { id: 5, code: 'TRIK SVIK214101', name: 'Bahasa Inggris 1', semester: 1, sks: 2, kelompok: 'MKK', jenis: 'Wajib', tipe: 'Teori' },
]

const columns: TableColumn<MataKuliahRow>[] = [
  {
    key: 'name',
    header: 'Mata Kuliah',
    render: (row) => (
      <div className="flex flex-col gap-1">
        <p className="text-b5 text-neutral-900">{row.code}</p>
        <p className="text-b2 text-neutral-1000">{row.name}</p>
      </div>
    ),
  },
  { key: 'semester', header: 'Semester', align: 'center' },
  { key: 'sks', header: 'SKS', align: 'center' },
  { key: 'kelompok', header: 'Kelompok', align: 'center' },
  { key: 'jenis', header: 'Jenis', align: 'center' },
  { key: 'tipe', header: 'Tipe', align: 'center' },
  {
    key: 'aksi',
    header: 'Aksi',
    align: 'center',
    width: '160px',
    render: (row) => (
      <div className="flex justify-center gap-2">
        <Button theme="error" variant="outline" size="sm" iconLeft={<TrashBinTrash weight="BoldDuotone" />} onClick={() => console.log('hapus', row.id)} />
        <Button theme="primary" variant="solid" size="sm" iconLeft={<Pen weight="BoldDuotone" />} onClick={() => console.log('edit', row.id)} />
      </div>
    ),
  },
]

export default function KurikulumPage() {
  const [page, setPage] = useState(1)

  return (
    <div className="flex min-h-screen bg-neutral-300">
      <Sidebar logo={<SimatkulLogo />} items={navItems} user={{ name: 'Admin 1' }} onLogout={() => alert('Logout')} />

      <main className="flex-1 p-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-0.5">
          <p className="text-b3 text-neutral-700">Mater Data &gt; Semester Gasal 2026/2027</p>
          <h1 className="text-h5 font-bold text-primary-400">Gasal 2026/2027</h1>
        </div>

        {/* Stat cards */}
        <div className="mb-6 flex gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex gap-2">
          {filterTabs.map((label, i) => (
            <Button key={label} theme="primary" variant={i === 0 ? 'solid' : 'outline'} size="sm">
              {label}
            </Button>
          ))}
        </div>

        <Table
          columns={columns}
          data={rows}
          rowKey={(row) => row.id}
          toolbar={
            <>
              <Input
                variant="filled"
                size="lg"
                placeholder="Cari nama mata kuliah"
                leftIcon={<Magnifer weight="LineDuotone" />}
                className="w-[350px]"
              />
              <div className="flex items-center gap-4">
                <Button theme="primary" variant="outline" size="md" iconLeft={<Filter weight="BoldDuotone" />} />
                <Button theme="primary" variant="solid" size="md" iconLeft={<AddSquare weight="BoldDuotone" />}>
                  Tambah Mata Kuliah
                </Button>
              </div>
            </>
          }
        />

        <div className="mt-4 flex justify-end">
          <Pagination page={page} totalPages={4} onPageChange={setPage} />
        </div>
      </main>
    </div>
  )
}
