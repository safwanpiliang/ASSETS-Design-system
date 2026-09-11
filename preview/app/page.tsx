'use client'

import { useState } from 'react'
import { Button } from '../../src/components/Button/Button'
import { Input } from '../../src/components/Input/Input'
import { Text } from '../../src/components/Text/Text'
import { Alert, getAlertActionTextClass } from '../../src/components/Alert/Alert'
import { Switch } from '../../src/components/Switch/Switch'
import { SwitchField } from '../../src/components/Switch/SwitchField'
import { Checkbox } from '../../src/components/Checkbox/Checkbox'
import { CheckboxField } from '../../src/components/Checkbox/CheckboxField'
import { Radio } from '../../src/components/Radio/Radio'
import { RadioField } from '../../src/components/Radio/RadioField'
import { Pagination } from '../../src/components/Pagination/Pagination'
import { Dropdown, type DropdownOption } from '../../src/components/Dropdown/Dropdown'
import { Modal } from '../../src/components/Modal/Modal'
import { Stepper } from '../../src/components/Stepper/Stepper'
import { Tooltip } from '../../src/components/Tooltip/Tooltip'
import { Avatar, type AvatarSize } from '../../src/components/Avatar/Avatar'
import { StatCard } from '../../src/components/StatCard/StatCard'
import { Table, type TableColumn } from '../../src/components/Table/Table'
import { Sidebar, type SidebarItem } from '../../src/components/Sidebar/Sidebar'
import { Breadcrumbs, type BreadcrumbItem } from '../../src/components/Breadcrumbs/Breadcrumbs'
import { Chip } from '../../src/components/Chip/Chip'
import { Card } from '../../src/components/Card/Card'
import { CardCta } from '../../src/components/Card/CardCta'
import { ScheduleWidget } from '../../src/components/ScheduleWidget/ScheduleWidget'
import { Steps, type StepItem } from '../../src/components/Steps/Steps'
import { ScheduleGrid, type ScheduleGridEntry } from '../../src/components/ScheduleGrid/ScheduleGrid'
import { ScheduleDots } from '../../src/components/ScheduleGrid/ScheduleDots'
import { Navbar, type NavbarLink } from '../../src/components/Navbar/Navbar'
import { Footer, type FooterColumn } from '../../src/components/Footer/Footer'
import { DatePicker } from '../../src/components/DatePicker/DatePicker'
import { DateRangePicker } from '../../src/components/DatePicker/DateRangePicker'
import { DateTimePicker } from '../../src/components/DatePicker/DateTimePicker'
import { MonthPicker } from '../../src/components/DatePicker/MonthPicker'
import Bolt from '@solar-icons/react/ui/Bolt'
import Letter from '@solar-icons/react/messages/Letter'
import { SimatkulLogo } from './SimatkulLogo'
import Calendar from '@solar-icons/react/time/Calendar'
import StarIcon from '@solar-icons/react/like/Star'

import Database from '@solar-icons/react/ui/Database'
import FileSmile from '@solar-icons/react/files/FileSmile'
import FileSend from '@solar-icons/react/files/FileSend'
import BookmarkSquare from '@solar-icons/react/school/BookmarkSquare'
import Magnifer from '@solar-icons/react/search/Magnifer'
import AddSquare from '@solar-icons/react/ui/AddSquare'
import Pen from '@solar-icons/react/messages/Pen'
import TrashBinTrash from '@solar-icons/react/ui/TrashBinTrash'
import User from '@solar-icons/react/users/User'
import UserId from '@solar-icons/react/users/UserId'
import Bell from '@solar-icons/react/notifications/Bell'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-b border-neutral-500 pb-10">
      <h2 className="text-h6 font-bold text-neutral-1000">{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`h-14 w-full rounded-2 border border-neutral-500 ${className}`} />
      <span className="text-b5 text-neutral-800">{name}</span>
    </div>
  )
}

// Nama class ditulis literal lengkap, sengaja TIDAK dirakit lewat template
// string (`bg-primary-${s}`) — Tailwind men-scan kode secara statis, jadi
// class yang cuma ada dalam bentuk runtime-interpolated tidak pernah
// ter-generate. Ini bug nyata yang sempat kejadian di halaman ini sebelum
// diperbaiki (bg-primary-600/700, bg-neutral-700/800/900 dkk render transparan).
const colorSwatches = [
  { name: 'primary-100', className: 'bg-primary-100' },
  { name: 'primary-200', className: 'bg-primary-200' },
  { name: 'primary-300', className: 'bg-primary-300' },
  { name: 'primary-400', className: 'bg-primary-400' },
  { name: 'primary-500', className: 'bg-primary-500' },
  { name: 'primary-600', className: 'bg-primary-600' },
  { name: 'primary-700', className: 'bg-primary-700' },
  { name: 'secondary-100', className: 'bg-secondary-100' },
  { name: 'secondary-200', className: 'bg-secondary-200' },
  { name: 'secondary-300', className: 'bg-secondary-300' },
  { name: 'secondary-400', className: 'bg-secondary-400' },
  { name: 'secondary-500', className: 'bg-secondary-500' },
  { name: 'secondary-600', className: 'bg-secondary-600' },
  { name: 'secondary-700', className: 'bg-secondary-700' },
  { name: 'neutral-100', className: 'bg-neutral-100' },
  { name: 'neutral-200', className: 'bg-neutral-200' },
  { name: 'neutral-300', className: 'bg-neutral-300' },
  { name: 'neutral-400', className: 'bg-neutral-400' },
  { name: 'neutral-500', className: 'bg-neutral-500' },
  { name: 'neutral-600', className: 'bg-neutral-600' },
  { name: 'neutral-700', className: 'bg-neutral-700' },
  { name: 'neutral-800', className: 'bg-neutral-800' },
  { name: 'neutral-900', className: 'bg-neutral-900' },
  { name: 'neutral-1000', className: 'bg-neutral-1000' },
  { name: 'red-100', className: 'bg-red-100' },
  { name: 'red-200', className: 'bg-red-200' },
  { name: 'yellow-100', className: 'bg-yellow-100' },
  { name: 'yellow-200', className: 'bg-yellow-200' },
  { name: 'green-100', className: 'bg-green-100' },
  { name: 'green-200', className: 'bg-green-200' },
]

const buttonThemes = ['primary', 'secondary', 'neutral', 'error'] as const
const buttonTypes = ['solid', 'outline', 'ghost', 'link'] as const

interface DemoRow {
  id: number
  name: string
}
const demoRows: DemoRow[] = [
  { id: 1, name: 'Contoh Baris 1' },
  { id: 2, name: 'Contoh Baris 2' },
]
const demoColumns: TableColumn<DemoRow>[] = [
  { key: 'name', header: 'Nama' },
  {
    key: 'aksi',
    header: 'Aksi',
    align: 'center',
    width: '120px',
    render: () => (
      <div className="flex justify-center gap-2">
        <Button theme="error" variant="outline" size="sm" iconLeft={<TrashBinTrash weight="BoldDuotone" />} />
        <Button theme="primary" variant="solid" size="sm" iconLeft={<Pen weight="BoldDuotone" />} />
      </div>
    ),
  },
]

const dropdownOptions: DropdownOption[] = [
  { key: 'dosen', label: 'Dosen', icon: <UserId weight="BoldDuotone" /> },
  { key: 'mahasiswa', label: 'Mahasiswa', icon: <User weight="BoldDuotone" /> },
  { key: 'staff', label: 'Staff Akademik', icon: <BookmarkSquare weight="BoldDuotone" /> },
  { key: 'admin', label: 'Admin', icon: <Database weight="BoldDuotone" /> },
  { key: 'lainnya', label: 'Lainnya', icon: <Bell weight="BoldDuotone" /> },
]

const breadcrumbItems: BreadcrumbItem[] = [
  { key: 'home', label: 'Beranda' },
  { key: 'kurikulum', label: 'Master Data' },
  { key: 'current', label: 'Semester Gasal' },
]

const breadcrumbItemsLong: BreadcrumbItem[] = [
  { key: 'home', label: 'Beranda' },
  { key: 'a', label: 'Master Data' },
  { key: 'b', label: 'Kurikulum' },
  { key: 'c', label: 'Semester' },
  { key: 'current', label: 'Gasal 2026/2027' },
]

const navLinks: NavbarLink[] = [
  { key: 'home', label: 'Beranda', active: true },
  { key: 'sekretariatan', label: 'Kesekretariatan' },
  { key: 'vokasipedia', label: 'VokasiPedia' },
  { key: 'univokasi', label: 'Uni-Vokasi' },
  { key: 'aduan', label: 'Aduan Vokasi' },
  { key: 'galeri', label: 'Galeri' },
]

const footerColumns: FooterColumn[] = [
  { key: 'a', title: 'Lorem ipsum dolor', links: Array.from({ length: 5 }, (_, i) => ({ key: String(i), label: 'Lorem ipsum' })) },
  { key: 'b', title: 'Lorem ipsum dolor', links: Array.from({ length: 5 }, (_, i) => ({ key: String(i), label: 'Lorem ipsum' })) },
  { key: 'c', title: 'Lorem ipsum dolor', links: Array.from({ length: 5 }, (_, i) => ({ key: String(i), label: 'Lorem ipsum' })) },
]

const stepItems: StepItem[] = [
  { key: '1', title: 'Account Details' },
  { key: '2', title: 'Personal Info' },
  { key: '3', title: 'Social Links' },
]

const demoNavItems: SidebarItem[] = [
  { key: 'a', label: 'Master Data', icon: <Database weight="BoldDuotone" />, active: true },
  { key: 'b', label: 'Penjadwalan', icon: <FileSmile weight="BoldDuotone" /> },
  { key: 'c', label: 'Hasil', icon: <FileSend weight="BoldDuotone" /> },
]

export default function ShowcasePage() {
  const [switchA, setSwitchA] = useState(true)
  const [switchB, setSwitchB] = useState(false)
  const [checkboxA, setCheckboxA] = useState(true)
  const [checkboxB, setCheckboxB] = useState(false)
  const [radioValue, setRadioValue] = useState('gasal')
  const [page, setPage] = useState(2)
  const [dropdownValue, setDropdownValue] = useState<string[]>(['dosen'])
  const [modalH, setModalH] = useState(false)
  const [modalV, setModalV] = useState(false)
  const [stepperValue, setStepperValue] = useState(2)
  const [inputValue, setInputValue] = useState('')
  const [dateValue, setDateValue] = useState<Date | null>(new Date(2021, 11, 14))
  const [rangeValue, setRangeValue] = useState<[Date | null, Date | null]>([new Date(2021, 11, 23), new Date(2021, 11, 27)])
  const [dateTimeValue, setDateTimeValue] = useState<Date | null>(new Date(2021, 11, 14))
  const [timeValue, setTimeValue] = useState('18:00')
  const [monthValue, setMonthValue] = useState({ year: 2021, month: 2 })

  return (
    <div className="flex min-h-screen flex-col gap-10 bg-neutral-300 p-10">
      <div>
        <Text variant="h4">Component Showcase</Text>
        <p className="text-b2 text-neutral-800">Semua komponen ASSETS Design System di satu halaman.</p>
      </div>

      <Section title="Warna — Color Main (21 canonical)">
        <div className="grid grid-cols-6 gap-3 md:grid-cols-10">
          {colorSwatches.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-2 rounded-2 bg-white p-6">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="h5">Heading 5</Text>
          <Text variant="h6">Heading 6</Text>
          <Text variant="h7">Heading 7</Text>
          <Text variant="b1">Body 1 — Medium</Text>
          <Text variant="b2">Body 2 — Regular (default)</Text>
          <Text variant="b3">Body 3 — Regular</Text>
          <Text variant="b4">Body 4 — Regular</Text>
          <Text variant="b5">Body 5 — Regular</Text>
        </div>
      </Section>

      <Section title="Button">
        <div className="flex flex-col gap-4 rounded-2 bg-white p-6">
          {buttonThemes.map((theme) => (
            <div key={theme} className="flex items-center gap-3">
              <span className="text-b4 w-20 shrink-0 text-neutral-800">{theme}</span>
              {buttonTypes.map((variant) => (
                <Button key={variant} theme={theme} variant={variant} size="md">
                  {variant}
                </Button>
              ))}
              <Button theme={theme} variant="solid" size="md" disabled>
                disabled
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-3 border-t border-neutral-500 pt-4">
            <span className="text-b4 w-20 shrink-0 text-neutral-800">size</span>
            <Button theme="primary" variant="solid" size="sm">Small</Button>
            <Button theme="primary" variant="solid" size="md">Medium</Button>
            <Button theme="primary" variant="solid" size="lg">Large</Button>
            <Button theme="primary" variant="solid" size="md" iconLeft={<AddSquare weight="BoldDuotone" />}>
              Dengan ikon
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Input">
        <div className="flex flex-wrap gap-6 rounded-2 bg-white p-6">
          <Input
            label="Outline"
            variant="outline"
            placeholder="Cari sesuatu"
            leftIcon={<Magnifer weight="LineDuotone" />}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-64"
          />
          <Input label="Filled" variant="filled" placeholder="Placeholder" className="w-64" />
          <Input label="Success" status="success" helperText="Berhasil disimpan" defaultValue="Contoh nilai" className="w-64" />
          <Input label="Warning" status="warning" helperText="Perlu perhatian" className="w-64" />
          <Input label="Error" status="error" helperText="Wajib diisi" className="w-64" />
          <Input label="Disabled" placeholder="Tidak bisa diisi" disabled className="w-64" />
        </div>
      </Section>

      <Section title="Alert">
        <div className="grid grid-cols-2 gap-4">
          {(['default', 'secondary', 'success', 'warning', 'error'] as const).flatMap((status) =>
            (['outline', 'filled'] as const).map((variant) => (
              <Alert
                key={`${status}-${variant}`}
                variant={variant}
                status={status}
                icon={<Bell weight="BoldDuotone" />}
                title="Title"
                description="Get immediate alerts and a notification badge."
                actions={
                  <>
                    <Button variant="link" size="sm" className={getAlertActionTextClass(variant, status)}>
                      Later
                    </Button>
                    <Button variant="link" size="sm" className={getAlertActionTextClass(variant, status)}>
                      Enable
                    </Button>
                  </>
                }
              />
            ))
          )}
        </div>
      </Section>

      <Section title="Switch">
        <div className="flex flex-col gap-4 rounded-2 bg-white p-6">
          <div className="flex items-center gap-6">
            <Switch checked={switchA} onCheckedChange={setSwitchA} />
            <Switch checked={switchB} onCheckedChange={setSwitchB} />
            <Switch checked={false} disabled />
            <Switch checked disabled />
          </div>
          <SwitchField label="Notifikasi email" checked={switchA} onCheckedChange={setSwitchA} className="w-72" />
          <SwitchField label="Mode gelap" textSide="right" checked={switchB} onCheckedChange={setSwitchB} className="w-72" />
        </div>
      </Section>

      <Section title="Checkbox">
        <div className="flex flex-col gap-4 rounded-2 bg-white p-6">
          <div className="flex items-center gap-6">
            <Checkbox checked={checkboxA} onCheckedChange={setCheckboxA} />
            <Checkbox checked={false} />
            <Checkbox indeterminate />
            <Checkbox checked disabled />
            <Checkbox checked={false} disabled />
          </div>
          <CheckboxField label="Setuju dengan syarat & ketentuan" checked={checkboxA} onCheckedChange={setCheckboxA} className="w-80" />
          <CheckboxField label="Ingat saya" textSide="right" checked={checkboxB} onCheckedChange={setCheckboxB} className="w-80" />
        </div>
      </Section>

      <Section title="Dropdown">
        <div className="rounded-2 bg-white p-6">
          <Dropdown
            label="Peran"
            placeholder="Pilih peran"
            options={dropdownOptions}
            value={dropdownValue}
            onChange={setDropdownValue}
            className="w-80"
          />
        </div>
      </Section>

      <Section title="Modal">
        <div className="flex gap-4 rounded-2 bg-white p-6">
          <Button theme="primary" variant="outline" onClick={() => setModalH(true)}>
            Buka Modal (horizontal)
          </Button>
          <Button theme="primary" variant="outline" onClick={() => setModalV(true)}>
            Buka Modal (vertical)
          </Button>
        </div>

        <Modal
          open={modalH}
          onClose={() => setModalH(false)}
          title="Hapus data?"
          description="Tindakan ini tidak bisa dibatalkan. Data yang sudah dihapus tidak dapat dikembalikan."
          buttonLayout="horizontal"
          actions={
            <>
              <Button theme="primary" variant="outline" onClick={() => setModalH(false)}>
                Batal
              </Button>
              <Button theme="error" variant="solid" onClick={() => setModalH(false)}>
                Hapus
              </Button>
            </>
          }
        />

        <Modal
          open={modalV}
          onClose={() => setModalV(false)}
          title="Tambah periode baru"
          description="Tentukan tahun ajaran dan semester untuk periode akademik baru"
          buttonLayout="vertical"
          actions={
            <>
              <Button theme="primary" variant="solid" onClick={() => setModalV(false)}>
                Simpan
              </Button>
              <Button theme="primary" variant="outline" onClick={() => setModalV(false)}>
                Batal
              </Button>
            </>
          }
        >
          <Input placeholder="Tahun ajaran, mis. 2026/2027" />
        </Modal>
      </Section>

      <Section title="Radio">
        <div className="flex flex-col gap-4 rounded-2 bg-white p-6">
          <div className="flex items-center gap-6">
            <Radio checked={radioValue === 'gasal'} onCheckedChange={() => setRadioValue('gasal')} />
            <Radio checked={radioValue === 'genap'} onCheckedChange={() => setRadioValue('genap')} />
            <Radio checked disabled />
            <Radio checked={false} disabled />
          </div>
          {/* Contoh grup pilihan tunggal: satu state `value` di pemanggil, tiap
              RadioField bandingkan value-nya sendiri — tidak ada RadioGroup/Context. */}
          <div className="flex flex-col gap-2">
            <RadioField label="Semester Gasal" checked={radioValue === 'gasal'} onCheckedChange={() => setRadioValue('gasal')} className="w-80" />
            <RadioField label="Semester Genap" checked={radioValue === 'genap'} onCheckedChange={() => setRadioValue('genap')} className="w-80" />
            <RadioField label="Semester Pendek" checked={radioValue === 'pendek'} onCheckedChange={() => setRadioValue('pendek')} className="w-80" />
          </div>
        </div>
      </Section>

      <Section title="Pagination">
        <div className="flex flex-col gap-4 rounded-2 bg-white p-6">
          <Pagination page={page} totalPages={4} onPageChange={setPage} />
          <Pagination page={1} totalPages={4} onPageChange={() => {}} />
        </div>
      </Section>

      <Section title="Stepper">
        <div className="flex items-center gap-6 rounded-2 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="text-b3 tabular-nums">{stepperValue}</span>
            <Stepper
              variant="filled"
              onDecrement={() => setStepperValue((v) => Math.max(0, v - 1))}
              onIncrement={() => setStepperValue((v) => Math.min(10, v + 1))}
              decrementDisabled={stepperValue <= 0}
              incrementDisabled={stepperValue >= 10}
            />
          </div>
          <Stepper variant="outline" onDecrement={() => {}} onIncrement={() => {}} />
        </div>
      </Section>

      <Section title="Tooltip">
        <div className="flex items-center gap-10 rounded-2 bg-white p-10">
          <Tooltip title="This is tooltip" description="My Tooltip" direction="up">
            <Button variant="outline">Hover (up)</Button>
          </Tooltip>
          <Tooltip title="This is tooltip" description="My Tooltip" direction="down">
            <Button variant="outline">Hover (down)</Button>
          </Tooltip>
          <Tooltip title="This is tooltip" description="My Tooltip" direction="left">
            <Button variant="outline">Hover (left)</Button>
          </Tooltip>
          <Tooltip title="This is tooltip" description="My Tooltip" direction="right">
            <Button variant="outline">Hover (right)</Button>
          </Tooltip>
          <Tooltip title="Coba fitur baru ini" description="Klik untuk mulai" direction="down" open>
            <Button variant="solid">Onboarding (terkontrol)</Button>
          </Tooltip>
        </div>
      </Section>

      <Section title="Avatar">
        <div className="flex flex-col gap-6 rounded-2 bg-white p-6">
          <div className="flex items-end gap-4">
            {(['tiny', 'small', 'medium', 'large', 'giant', 'xl', 'xxl', 'xxxl'] as AvatarSize[]).map((size) => (
              <Avatar key={size} size={size} letter="A" status />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Avatar size="giant" icon={<User weight="BoldDuotone" />} />
            <Avatar size="giant" src="https://i.pravatar.cc/150?img=12" alt="Foto profil" status />
            <Avatar size="giant" src="https://example.com/tidak-ada.jpg" letter="F" status />
          </div>
        </div>
      </Section>

      <Section title="StatCard">
        <div className="flex flex-wrap gap-4">
          <StatCard icon={<BookmarkSquare weight="BoldDuotone" />} value={425} label="Data Kurikulum" />
          <StatCard icon={<BookmarkSquare weight="BoldDuotone" />} value={60} label="Daftar Ruang" />
          <StatCard variant="color" status="secondary" icon={<Database weight="BoldDuotone" />} value="Rp 1.109.000" label="Pengeluaran bulan ini" />
        </div>
      </Section>

      <Section title="ScheduleWidget">
        <div className="flex flex-wrap gap-6">
          <ScheduleWidget
            header={
              <div className="flex w-full items-center gap-2.5">
                <Text variant="h5" className="flex-1">27 May</Text>
                <Button theme="primary" variant="solid" size="sm" iconLeft={<Calendar weight="BoldDuotone" />} />
              </div>
            }
            items={[
              { key: '1', title: 'Reading time', time: '03:00 PM - 04:00 PM', accentColor: 'var(--color-secondary-400)' },
              { key: '2', title: 'Reading time', time: '03:00 PM - 04:00 PM', accentColor: 'var(--color-secondary-400)' },
              { key: '3', title: 'Reading time', time: '03:00 PM - 04:00 PM', accentColor: 'var(--color-secondary-400)' },
            ]}
            onViewAll={() => {}}
          />
          <ScheduleWidget
            header={
              <StatCard
                className="flex-none"
                variant="color"
                status="primary"
                icon={<Calendar weight="BoldDuotone" />}
                value="Rp 1.109.000"
                label="Pengeluaran bulan May"
              />
            }
            items={[
              { key: '1', title: 'Reading time', time: '03:00 PM - 04:00 PM', icon: <StarIcon weight="BoldDuotone" className="text-secondary-400" /> },
              { key: '2', title: 'Reading time', time: '03:00 PM - 04:00 PM', icon: <StarIcon weight="BoldDuotone" className="text-secondary-400" /> },
              { key: '3', title: 'Reading time', time: '03:00 PM - 04:00 PM', icon: <StarIcon weight="BoldDuotone" className="text-secondary-400" /> },
            ]}
            onViewAll={() => {}}
          />
        </div>
      </Section>

      <Section title="Table">
        <Table
          columns={demoColumns}
          data={demoRows}
          rowKey={(r) => r.id}
          toolbar={
            <>
              <Input variant="filled" placeholder="Cari" leftIcon={<Magnifer weight="LineDuotone" />} className="w-64" />
              <Button theme="primary" variant="solid" size="md">Tambah</Button>
            </>
          }
        />

        <Table
          columns={[
            { key: 'name', header: 'Nama Dosen', width: '220px' },
            { key: 'senin', header: 'Senin', align: 'center', render: (r) => <ScheduleDots occupied={r.senin} /> },
            { key: 'selasa', header: 'Selasa', align: 'center', render: (r) => <ScheduleDots occupied={r.selasa} /> },
          ]}
          data={[
            { id: 1, name: 'Yohana Ika Harnita Sari', senin: [false, false, false, true, true], selasa: [true, false, false, false, false] },
          ]}
          rowKey={(r) => r.id}
        />
      </Section>

      <Section title="ScheduleGrid">
        <ScheduleGrid
          toolbar={
            <>
              <Input variant="filled" placeholder="Semua dosen" className="w-64" />
              <Button theme="primary" variant="solid" size="md">Ekspor to PDF</Button>
            </>
          }
          rowHeader={
            <>
              <p className="text-b3 font-bold text-neutral-1000">Dr. Sri Mulyana, M.Kom</p>
              <p className="text-b5 text-neutral-1000">Beban Dosen: 14 SKS</p>
            </>
          }
          sessions={[1, 2, 3, 4, 5]}
          days={[
            { key: 'senin', label: 'Senin' },
            { key: 'selasa', label: 'Selasa' },
            { key: 'rabu', label: 'Rabu' },
          ]}
          entries={
            [
              { day: 'senin', startSession: 0, title: 'Matematika Teknik', subtitle: 'PL1AA - CU 208' },
              { day: 'senin', startSession: 2, title: 'Rangkaian Listrik DC', subtitle: 'PL1AA - CU 208' },
              { day: 'selasa', startSession: 0, span: 2, title: 'Praktikum Instalasi Listrik', subtitle: 'PL1AA - CU 208' },
              { day: 'rabu', startSession: 2, title: 'Matematika Teknik', subtitle: 'PL1AA - CU 208' },
            ] as ScheduleGridEntry[]
          }
        />
      </Section>

      <Section title="Breadcrumbs">
        <div className="flex flex-col gap-4 rounded-2 bg-white p-6">
          <Breadcrumbs items={breadcrumbItems} separator="text" />
          <Breadcrumbs items={breadcrumbItems} separator="icon" />
          <Breadcrumbs items={breadcrumbItemsLong} separator="text" maxItems={3} />
        </div>
      </Section>

      <Section title="Chip">
        <div className="flex flex-col gap-4 rounded-2 bg-white p-6">
          <div className="flex flex-wrap items-center gap-2">
            {(['default', 'primary', 'secondary', 'error', 'warning', 'success'] as const).map((status) => (
              <Chip key={status} variant="solid" status={status}>{status}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(['default', 'primary', 'secondary', 'error', 'warning', 'success'] as const).map((status) => (
              <Chip key={status} variant="tint" status={status}>{status}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(['default', 'primary', 'secondary', 'error', 'warning', 'success'] as const).map((status) => (
              <Chip key={status} variant="outline" status={status}>{status}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip variant="tint" status="primary" avatar={<Avatar size="tiny" letter="A" />}>Admin 1</Chip>
            <Chip variant="solid" status="primary" removable onRemove={() => {}}>Removable</Chip>
            <Chip variant="tint" status="secondary" size="sm">Small</Chip>
            <Chip variant="tint" status="secondary" size="sm" removable onRemove={() => {}}>Small removable</Chip>
          </div>
        </div>
      </Section>

      <Section title="Card">
        <div className="flex flex-wrap items-start gap-6">
          <Card
            orientation="vertical"
            className="w-[430px]"
            image={<img src="https://picsum.photos/seed/assets1/464/348" alt="" />}
            chip={<Chip variant="tint" status="secondary">Kementrian Minat dan Bakat</Chip>}
            title="Pekan Olahraga Vokasi dan Vocational Art"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do…"
            actions={
              <>
                <Button variant="ghost" size="sm">Selengkapnya</Button>
                <Button variant="solid" size="sm">Selengkapnya</Button>
              </>
            }
          />
          <Card
            orientation="horizontal"
            className="w-[600px]"
            image={<img src="https://picsum.photos/seed/assets2/282/211" alt="" />}
            chip={<Chip variant="tint" status="secondary">Kementrian Minat dan Bakat</Chip>}
            title="Pekan Olahraga Vokasi dan Vocational Art"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do…"
            actions={
              <>
                <Button variant="ghost" size="sm">Selengkapnya</Button>
                <Button variant="solid" size="sm">Selengkapnya</Button>
              </>
            }
          />
          <CardCta
            className="w-[680px]"
            title="Try Venus for free now!"
            description="Enter in this creative world. Venus is the best product for your business."
            image={<img src="https://picsum.photos/seed/assets3/292/286" alt="" />}
            actions={
              <>
                <Button theme="primary" variant="solid">Lihat Penawaran</Button>
                <Button theme="primary" variant="ghost">Lewati</Button>
              </>
            }
          />
        </div>
      </Section>

      <Section title="Steps">
        <div className="flex flex-col gap-8 rounded-2 bg-white p-6">
          <Steps steps={stepItems} activeIndex={1} orientation="horizontal" textPosition="left" />
          <div className="flex gap-16">
            <Steps steps={stepItems} activeIndex={1} orientation="vertical" textPosition="left" className="h-[220px]" />
            <Steps steps={stepItems} activeIndex={1} orientation="horizontal" textPosition="center" showNumbers={false} />
          </div>
        </div>
      </Section>

      <Section title="Navbar">
        <div className="overflow-hidden rounded-2 border border-neutral-500">
          <Navbar
            logo={<Text variant="h6" className="font-bold text-primary-500">ASSETS</Text>}
            links={navLinks}
            actions={
              <>
                <Button variant="ghost" size="md">Sign up</Button>
                <Button theme="primary" variant="solid" size="md" iconLeft={<Bolt weight="BoldDuotone" />}>Lorem Ipsum</Button>
              </>
            }
          />
        </div>
      </Section>

      <Section title="Footer">
        <Footer
          logo={<Text variant="h6" className="font-bold text-white">ASSETS</Text>}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          email="loremipsum@mail.ugm.ac.id"
          emailIcon={<Letter weight="BoldDuotone" />}
          columns={footerColumns}
        />
      </Section>

      <Section title="Date Picker">
        <div className="flex flex-wrap items-start gap-6">
          <DatePicker value={dateValue} onChange={setDateValue} today={new Date(2021, 11, 24)} />
          <DateRangePicker value={rangeValue} onChange={setRangeValue} today={new Date(2021, 11, 24)} />
          <DateTimePicker
            value={dateTimeValue}
            onChange={setDateTimeValue}
            today={new Date(2021, 11, 24)}
            timeSlots={['17:30', '17:45', '18:00', '18:15', '18:30', '18:45']}
            selectedTime={timeValue}
            onSelectTime={setTimeValue}
          />
          <MonthPicker value={monthValue} onChange={setMonthValue} />
        </div>
      </Section>

      <Section title="Sidebar (dalam kotak terbatas — biasanya full height)">
        <div className="flex h-[420px] w-fit overflow-hidden rounded-2 border border-neutral-500">
          <Sidebar logo={<SimatkulLogo />} items={demoNavItems} user={{ name: 'Admin 1' }} onLogout={() => {}} />
        </div>
      </Section>
    </div>
  )
}
