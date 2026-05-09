import { useEffect, useMemo, useState } from 'react'
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  ArrowsCounterClockwise,
  ArrowSquareOut,
  Bell,
  Buildings,
  CaretDown,
  ChartLineUp,
  CheckCircle,
  Compass,
  Envelope,
  Folder,
  House,
  Image as ImageIcon,
  ListBullets,
  MagnifyingGlass,
  NotePencil,
  Pencil,
  Plus,
  Receipt,
  ShoppingBag,
  SignOut,
  Trash,
} from '@phosphor-icons/react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { ADMIN_AUTH_KEY } from './Login.jsx'
import { DEFAULT_NOTIFICATION, NOTIFICATION_KEY } from '../components/NotificationBar.jsx'
import {
  brand,
  navLinks as defaultNavLinks,
  notes as defaultNotes,
  projects as defaultProjects,
  practice as defaultPractice,
  shop as defaultShop,
} from '../data/siteData.js'

/* The studio admin · v2 (Atelier).
   Same architecture as v1's admin, drawn in the atelier register:
   Italiana display, JetBrains Mono labels, ink/olive/clay palette. */

/* ====== AUTH GUARD + LAYOUT ===================================== */

export function AdminLayout() {
  const [auth, setAuth] = useLocalStorage(ADMIN_AUTH_KEY, null)
  const navigate = useNavigate()

  if (!auth?.loggedIn) return <Navigate to="/login" replace />

  function logout() {
    setAuth(null)
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-stone-50 text-ink-500 flex">
      <Sidebar email={auth.email} onLogout={logout} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopStrip email={auth.email} />
        <main className="flex-1 px-6 md:px-10 py-8 md:py-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

const NAV = [
  { section: 'STUDIO', items: [
    { to: '/admin', label: 'Overview', icon: ChartLineUp, end: true },
  ]},
  { section: 'CONTENT', items: [
    { to: '/admin/posts',    label: 'Notes & posts',  icon: NotePencil },
    { to: '/admin/projects', label: 'Projects',       icon: Buildings },
    { to: '/admin/practice', label: 'Practice',       icon: Compass },
    { to: '/admin/shop',     label: 'Shop editions',  icon: ShoppingBag },
  ]},
  { section: 'COMMERCE', items: [
    { to: '/admin/inquiries', label: 'Inquiries', icon: Envelope },
    { to: '/admin/orders',    label: 'Orders',    icon: Receipt },
  ]},
  { section: 'SITE', items: [
    { to: '/admin/settings/nav',          label: 'Navigation',    icon: ListBullets },
    { to: '/admin/settings/notification', label: 'Notice bar',    icon: Bell },
    { to: '/admin/settings/media',        label: 'Media library', icon: ImageIcon },
  ]},
]

function Sidebar({ email, onLogout }) {
  return (
    <aside className="w-[260px] shrink-0 hidden md:flex flex-col bg-ink-500 text-paper-warm sticky top-0 h-screen overflow-y-auto">
      <Link to="/admin" className="px-6 py-7 border-b border-paper-warm/12">
        <div className="mono-sm text-paper-warm/45 text-[0.55rem]">{brand.name}</div>
        <div className="mt-1 display-thin text-2xl">
          The <span className="display-italic">studio</span> desk
        </div>
      </Link>

      <nav className="flex-1 py-5">
        {NAV.map((g) => (
          <div key={g.section} className="mb-5">
            <div className="px-6 mb-2 mono-sm text-paper-warm/35 text-[0.55rem] tracking-[0.22em]">{g.section}</div>
            <ul>
              {g.items.map((it) => (
                <li key={it.to}>
                  <NavLink
                    to={it.to}
                    end={it.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-6 py-2.5 text-sm transition-colors border-l-2 ${
                        isActive
                          ? 'bg-paper-warm/8 border-clay-400 text-paper-warm'
                          : 'border-transparent text-paper-warm/72 hover:text-paper-warm hover:bg-paper-warm/5'
                      }`
                    }
                  >
                    <it.icon size={14} />
                    {it.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-paper-warm/12 p-5">
        <div className="mono-sm text-paper-warm/65 text-[0.55rem] truncate">{email}</div>
        <div className="mt-3 flex items-center gap-2">
          <Link to="/" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-paper-warm/8 hover:bg-paper-warm/16 transition-colors mono-sm text-[0.55rem]">
            <House size={12} /> PUBLIC
          </Link>
          <button onClick={onLogout} aria-label="Sign out" className="px-3 py-2 bg-paper-warm/8 hover:bg-paper-warm/16 transition-colors">
            <SignOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}

function TopStrip({ email }) {
  const location = useLocation()
  const crumb = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean)
    return parts.map((p) => p.replace(/-/g, ' ')).join(' / ')
  }, [location.pathname])
  return (
    <div className="border-b border-ink/10 bg-paper-warm">
      <div className="px-6 md:px-10 py-3.5 flex items-center justify-between gap-4">
        <div className="mono-sm text-ink/55 text-[0.55rem] truncate">{crumb || 'admin'}</div>
        <div className="flex items-center gap-3">
          <Link to="/" className="atelier-link mono-sm text-[0.55rem] inline-flex items-center gap-1.5 hidden sm:inline-flex">
            <ArrowSquareOut size={12} /> VIEW SITE
          </Link>
          <span className="hidden sm:block w-px h-4 bg-ink/15" />
          <span className="mono-sm text-ink/55 text-[0.55rem] truncate max-w-[160px]">{email}</span>
        </div>
      </div>
    </div>
  )
}

/* ====== SHARED PRIMITIVES ======================================= */

function PageTitle({ kicker, title, subtitle, children }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
      <div>
        {kicker && <div className="mono-sm text-clay-500 text-[0.6rem]">{kicker}</div>}
        <h1 className="mt-2 display-thin text-3xl md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-ink/70 max-w-2xl">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}

function Card({ className = '', children }) {
  return <div className={`bg-paper-warm border border-ink/10 ${className}`}>{children}</div>
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mono-sm text-ink/55 text-[0.55rem] mb-1.5 inline-block">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-[0.65rem] text-ink/45">{hint}</span>}
    </label>
  )
}

const inputCls =
  'w-full px-3 py-2.5 bg-stone-50 border border-ink/15 focus:border-ink focus:bg-paper-warm outline-none text-sm transition-colors placeholder:text-ink/30'

function Toolbar({ children }) {
  return <div className="flex items-center gap-2 flex-wrap">{children}</div>
}

function Btn({ variant = 'default', children, ...props }) {
  const base = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs mono tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    default: 'bg-paper-warm border border-ink/15 hover:bg-stone-100 text-ink',
    primary: 'bg-ink-500 text-paper-warm hover:bg-clay-500',
    ghost:   'text-ink hover:bg-stone-100',
    danger:  'bg-paper-warm border border-clay-500/35 text-clay-500 hover:bg-clay-500/10',
  }
  return <button className={`${base} ${variants[variant]}`} {...props}>{children}</button>
}

function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink-500 text-paper-warm px-4 py-2.5 mono-sm text-[0.6rem] tracking-wider shadow-lg flex items-center gap-2">
      <CheckCircle size={14} className="text-clay-300" />
      {message}
    </div>
  )
}

function useToast() {
  const [msg, setMsg] = useState('')
  function show(message) { setMsg(message); window.setTimeout(() => setMsg(''), 1800) }
  return [msg, show]
}

function StatPill({ label, value, hint }) {
  return (
    <Card className="p-5">
      <div className="mono-sm text-ink/55 text-[0.55rem]">{label}</div>
      <div className="mt-2 display-thin text-3xl tabular">{value}</div>
      {hint && <div className="mt-1 text-[0.65rem] text-ink/45">{hint}</div>}
    </Card>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 transition-colors ${checked ? 'bg-ink-500' : 'bg-ink/15'}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-paper-warm transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  )
}

/* ====== OVERVIEW ================================================ */

export function Overview() {
  return (
    <>
      <PageTitle
        kicker="01 — OVERVIEW"
        title={<>Good morning, <span className="display-italic">Eunice</span>.</>}
        subtitle="A quiet view of the atelier. Nothing requires your attention right now."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatPill label="POSTS PUBLISHED" value={defaultNotes.length} hint="3 public · 2 members-only" />
        <StatPill label="PROJECTS" value={defaultProjects.length} hint="Last added · House on Park" />
        <StatPill label="EDITIONS" value={defaultShop.products.length} hint={`${defaultShop.products.filter((p) => p.featured).length} featured`} />
        <StatPill label="OPEN INQUIRIES" value={MOCK_INQUIRIES.filter((i) => i.status === 'new').length} hint="Awaiting reply" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="display-thin text-xl">Recent activity</h2>
            <span className="mono-sm text-ink/55 text-[0.55rem] tabular">LAST 14 DAYS</span>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              { icon: NotePencil, text: 'Eunice published "The room as a collaborator".', when: '2 days ago' },
              { icon: ShoppingBag, text: 'New order · Annual Print Edition · A. H., London.', when: '3 days ago' },
              { icon: Envelope, text: 'New inquiry · St John\'s Wood bedroom edit.', when: '5 days ago' },
              { icon: Buildings, text: 'Project added · Garden Pavilion (Surrey).', when: '8 days ago' },
              { icon: Bell, text: 'Notice bar enabled · "The Quiet Report Q1".', when: '11 days ago' },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3 py-2 border-b border-ink/8 last:border-b-0">
                <a.icon size={14} className="mt-0.5 text-ink/55 shrink-0" />
                <span className="flex-1 text-ink/85">{a.text}</span>
                <span className="text-[0.6rem] mono-sm text-ink/45 tabular shrink-0">{a.when.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="display-thin text-xl mb-4">Quick actions</h2>
          <div className="space-y-2">
            {[
              { to: '/admin/posts',    icon: NotePencil, label: 'Write a new post' },
              { to: '/admin/projects', icon: Buildings,  label: 'Add a project' },
              { to: '/admin/shop',     icon: ShoppingBag,label: 'Add an edition' },
              { to: '/admin/settings/notification', icon: Bell, label: 'Open notice bar' },
            ].map((q) => (
              <Link key={q.to} to={q.to} className="flex items-center justify-between gap-3 px-3 py-2.5 bg-stone-50 hover:bg-stone-100 transition-colors text-sm border border-ink/8">
                <span className="inline-flex items-center gap-2.5">
                  <q.icon size={14} className="text-ink/55" />
                  {q.label}
                </span>
                <span className="text-ink/55">→</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}

/* ====== POSTS / PROJECTS / PRACTICE / SHOP — Collection Editor ==== */

const POSTS_KEY    = 'eunice-v2.admin.posts'
const PROJECTS_KEY = 'eunice-v2.admin.projects'
const PRACTICE_KEY = 'eunice-v2.admin.practice'
const SHOP_KEY     = 'eunice-v2.admin.shop'

export function PostsPanel() {
  return <CollectionEditor
    storageKey={POSTS_KEY}
    seed={defaultNotes}
    label="Posts"
    title={<>Notes & <span className="display-italic">posts</span>.</>}
    kicker="02 — CONTENT / NOTES"
    subtitle="Long-form essays. Toggle 'members-only' to lock posts behind The Circle."
    fields={[
      { key: 'title',    label: 'Title', kind: 'text', required: true, span: 12 },
      { key: 'slug',     label: 'Slug',  kind: 'text', required: true, span: 6, hint: 'URL fragment after /notes/' },
      { key: 'num',      label: 'Number', kind: 'text', span: 2 },
      { key: 'section',  label: 'Section', kind: 'text', span: 4 },
      { key: 'date',     label: 'Date', kind: 'text', span: 4 },
      { key: 'readTime', label: 'Read time', kind: 'text', span: 4 },
      { key: 'isPremium',label: 'Members-only', kind: 'bool', span: 4 },
      { key: 'cover',    label: 'Cover image URL', kind: 'image', span: 12 },
      { key: 'deck',     label: 'Deck', kind: 'text', span: 12 },
      { key: 'body',     label: 'Body (paragraph per blank line)', kind: 'paragraphs', span: 12 },
    ]}
    listColumns={[
      { key: 'title', label: 'Title' },
      { key: 'section', label: 'Section', width: 140 },
      { key: 'date', label: 'Date', width: 120 },
      { key: 'badge', label: '', width: 80, render: (it) => it.isPremium ? <span className="mono-sm text-clay-500 text-[0.55rem]">MEMBERS</span> : <span className="mono-sm text-ink/45 text-[0.55rem]">PUBLIC</span> },
    ]}
    newItem={() => ({
      slug: 'new-post', num: '013', title: 'A new post', deck: '',
      section: 'Notes', date: 'May 2026', readTime: '5 min', isPremium: false,
      cover: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1800&auto=format&fit=crop&q=85',
      body: [''],
    })}
  />
}

export function ProjectsPanel() {
  return <CollectionEditor
    storageKey={PROJECTS_KEY}
    seed={defaultProjects}
    label="Projects"
    title={<>The <span className="display-italic">index</span>.</>}
    kicker="02 — CONTENT / PROJECTS"
    subtitle="Residential and atelier commissions."
    fields={[
      { key: 'title',    label: 'Title',    kind: 'text', span: 8, required: true },
      { key: 'num',      label: 'Number',   kind: 'text', span: 4 },
      { key: 'slug',     label: 'Slug',     kind: 'text', span: 6, required: true },
      { key: 'typology', label: 'Typology', kind: 'text', span: 6 },
      { key: 'location', label: 'Location', kind: 'text', span: 4 },
      { key: 'year',     label: 'Year',     kind: 'text', span: 4 },
      { key: 'surface',  label: 'Surface',  kind: 'text', span: 4 },
      { key: 'rooms',    label: 'Rooms',    kind: 'text', span: 4 },
      { key: 'cover',    label: 'Cover',    kind: 'image', span: 12 },
      { key: 'summary',  label: 'Summary', kind: 'textarea', span: 12, rows: 3 },
    ]}
    listColumns={[
      { key: 'title', label: 'Title' },
      { key: 'typology', label: 'Typology', width: 160 },
      { key: 'location', label: 'Location', width: 160 },
      { key: 'year', label: 'Year', width: 80 },
    ]}
    newItem={() => ({ slug: 'new-project', num: '006', title: 'A new project', typology: 'Full Residential', location: 'Oxford', year: '2026', surface: '— m²', rooms: 1, summary: '', cover: '' })}
  />
}

export function PracticePanel() {
  return <CollectionEditor
    storageKey={PRACTICE_KEY}
    seed={defaultPractice}
    label="Disciplines"
    title={<>The four <span className="display-italic">disciplines</span>.</>}
    kicker="02 — CONTENT / PRACTICE"
    subtitle="Interiors, mindset, writing, the circle."
    fields={[
      { key: 'title',      label: 'Title',  kind: 'text', span: 8, required: true },
      { key: 'num',        label: 'Number', kind: 'text', span: 4 },
      { key: 'slug',       label: 'Slug',   kind: 'text', span: 6, required: true },
      { key: 'discipline', label: 'Discipline label', kind: 'text', span: 6 },
      { key: 'image',      label: 'Image',  kind: 'image', span: 12 },
      { key: 'short',      label: 'Short',  kind: 'textarea', span: 12, rows: 2 },
      { key: 'body',       label: 'Long body (paragraphs)', kind: 'paragraphs', span: 12 },
    ]}
    listColumns={[
      { key: 'num', label: '№', width: 60 },
      { key: 'title', label: 'Discipline' },
      { key: 'short', label: 'Short' },
    ]}
    newItem={() => ({ slug: 'new-discipline', num: '05', title: 'New discipline', discipline: '', short: '', body: [''], image: '' })}
  />
}

export function ShopPanel() {
  return <CollectionEditor
    storageKey={SHOP_KEY}
    seed={defaultShop.products}
    label="Editions"
    title={<>Shop <span className="display-italic">editions</span>.</>}
    kicker="02 — CONTENT / SHOP"
    subtitle="Workbooks, dossiers, letters and the annual print edition."
    fields={[
      { key: 'name',     label: 'Name',     kind: 'text', span: 8, required: true },
      { key: 'slug',     label: 'Slug',     kind: 'text', span: 4, required: true },
      { key: 'num',      label: 'Number',   kind: 'text', span: 3 },
      { key: 'price',    label: 'Price',    kind: 'text', span: 3 },
      { key: 'featured', label: 'Featured', kind: 'bool', span: 3 },
      { key: 'tone',     label: 'Tone',     kind: 'select', span: 3, options: ['ink','ink-soft','olive','olive-deep','clay','stone'] },
      { key: 'subtitle', label: 'Subtitle', kind: 'text', span: 12 },
      { key: 'kind',     label: 'Kind',     kind: 'text', span: 6 },
      { key: 'edition',  label: 'Edition stamp', kind: 'text', span: 6 },
      { key: 'cover',    label: 'Cover',    kind: 'image', span: 12 },
      { key: 'blurb',    label: 'Blurb',    kind: 'textarea', span: 12, rows: 4 },
    ]}
    listColumns={[
      { key: 'name', label: 'Name' },
      { key: 'kind', label: 'Kind', width: 200 },
      { key: 'price', label: 'Price', width: 80 },
      { key: 'featured', label: '', width: 80, render: (it) => it.featured ? <span className="mono-sm text-clay-500 text-[0.55rem]">FEATURED</span> : null },
    ]}
    newItem={() => ({ slug: 'new-edition', num: '007', name: 'New edition', subtitle: '', kind: 'Printed · — pages', price: '£—', cover: '', blurb: '', tone: 'ink', edition: 'No. 0X' })}
  />
}

/* ====== INQUIRIES =============================================== */

const MOCK_INQUIRIES = [
  { id: 1, name: 'Anna H.',    email: 'anna.h@protonmail.com',  subject: 'Cotswold kitchen extension', date: '2026-04-28', status: 'new' },
  { id: 2, name: 'S. M.',      email: 's.m@private.uk',         subject: 'Mews bedroom — second pass', date: '2026-04-25', status: 'new' },
  { id: 3, name: 'Valerie',    email: 'val@oxford.uk',          subject: 'Coaching · 90-day intensive', date: '2026-04-22', status: 'replied' },
  { id: 4, name: 'J. Conway',  email: 'jconway@studio.co',      subject: 'Press — Apartamento feature', date: '2026-04-19', status: 'replied' },
  { id: 5, name: 'L. Watford', email: 'l.watford@gmail.com',    subject: 'St John\'s Wood — bedroom',   date: '2026-04-14', status: 'archived' },
  { id: 6, name: 'C. Reedley', email: 'c.r@reedley.co',         subject: 'Surrey pavilion — yoga room', date: '2026-04-09', status: 'archived' },
]

export function InquiriesPanel() {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const filtered = MOCK_INQUIRIES.filter((i) =>
    (filter === 'all' || i.status === filter) &&
    (q === '' || (i.name + i.subject + i.email).toLowerCase().includes(q.toLowerCase()))
  )
  return (
    <>
      <PageTitle kicker="03 — COMMERCE / INQUIRIES" title={<>Studio <span className="display-italic">inbox</span>.</>} subtitle="Notes from the public site's enquire form." />

      <Card className="p-3 mb-5 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <MagnifyingGlass size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/55" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className={`${inputCls} pl-8 w-64`} />
        </div>
        <Toolbar>
          {['all', 'new', 'replied', 'archived'].map((s) => (
            <Btn key={s} variant={filter === s ? 'primary' : 'default'} onClick={() => setFilter(s)}>
              {s.toUpperCase()}
              <span className="ml-1.5 opacity-65 tabular">({s === 'all' ? MOCK_INQUIRIES.length : MOCK_INQUIRIES.filter((i) => i.status === s).length})</span>
            </Btn>
          ))}
        </Toolbar>
      </Card>

      <Card>
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="border-b border-ink/10">
              <Th>Name</Th><Th>Subject</Th><Th width="180">Email</Th><Th width="120">Date</Th><Th width="120">Status</Th><Th width="60"></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-ink/8 hover:bg-stone-50">
                <Td>{row.name}</Td>
                <Td className="text-ink/85">{row.subject}</Td>
                <Td className="text-ink/55 text-xs">{row.email}</Td>
                <Td className="tabular text-xs">{row.date}</Td>
                <Td><StatusPill status={row.status} /></Td>
                <Td><Btn variant="ghost"><CaretDown size={12} /></Btn></Td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-ink/45 text-sm">No inquiries match.</td></tr>}
          </tbody>
        </table>
      </Card>
    </>
  )
}

function Th({ children, width }) {
  return <th style={{ width }} className="px-5 py-3 mono-sm text-ink/55 text-[0.55rem] font-normal tracking-[0.18em]">{children}</th>
}
function Td({ children, className = '' }) {
  return <td className={`px-5 py-3.5 ${className}`}>{children}</td>
}
function StatusPill({ status }) {
  const styles = {
    new: 'bg-ink/10 text-ink',
    replied: 'bg-clay-300/35 text-clay-600',
    archived: 'bg-stone-100 text-ink/55',
    paid: 'bg-olive-200/45 text-olive-700',
    posted: 'bg-clay-300/35 text-clay-600',
    refunded: 'bg-stone-100 text-ink/55',
  }
  return <span className={`inline-flex items-center px-2 py-1 mono-sm text-[0.55rem] tracking-[0.16em] ${styles[status] || ''}`}>{status.toUpperCase()}</span>
}

/* ====== ORDERS ================================================== */

const MOCK_ORDERS = [
  { id: 'EDC-2026-019', product: 'Annual Print Edition',   buyer: 'Anna H.',   date: '2026-04-28', amount: '£48', status: 'paid' },
  { id: 'EDC-2026-018', product: 'Second Season Workbook', buyer: 'L. Wood',   date: '2026-04-26', amount: '£32', status: 'posted' },
  { id: 'EDC-2026-017', product: 'Quiet Report · Q1',      buyer: 'M. Drey',   date: '2026-04-23', amount: '£18', status: 'paid' },
  { id: 'EDC-2026-016', product: 'Four Letters',           buyer: 'P. Lane',   date: '2026-04-20', amount: '£14', status: 'posted' },
  { id: 'EDC-2026-015', product: 'Morning Ledger',         buyer: 'C. Reedley',date: '2026-04-16', amount: '£22', status: 'refunded' },
  { id: 'EDC-2026-014', product: 'Sanctuary Bedroom',      buyer: 'A. Holm',   date: '2026-04-12', amount: '£12', status: 'paid' },
]

export function OrdersPanel() {
  return (
    <>
      <PageTitle kicker="03 — COMMERCE / ORDERS" title={<>Recent <span className="display-italic">orders</span>.</>} subtitle="Posted from the studio. Payment is mocked in this preview." />
      <Card>
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="border-b border-ink/10">
              <Th>Order</Th><Th>Product</Th><Th>Buyer</Th><Th width="120">Date</Th><Th width="100">Amount</Th><Th width="120">Status</Th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((row) => (
              <tr key={row.id} className="border-b border-ink/8 hover:bg-stone-50">
                <Td className="mono-sm text-ink/85 text-[0.6rem] tracking-[0.12em]">{row.id}</Td>
                <Td>{row.product}</Td>
                <Td>{row.buyer}</Td>
                <Td className="tabular text-xs">{row.date}</Td>
                <Td className="tabular display-thin text-base">{row.amount}</Td>
                <Td><StatusPill status={row.status} /></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}

/* ====== SETTINGS — NAVIGATION =================================== */

const NAV_KEY = 'eunice-v2.admin.nav'

export function NavSettings() {
  const [items, setItems] = useLocalStorage(NAV_KEY, defaultNavLinks)
  const [toast, showToast] = useToast()

  function add() { setItems([...items, { num: String(items.length + 1).padStart(2, '0'), label: 'New link', to: '/' }]) }
  function remove(i) { setItems(items.filter((_, idx) => idx !== i)) }
  function move(i, dir) {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]; [next[i], next[j]] = [next[j], next[i]]; setItems(next)
  }
  function update(i, key, val) { setItems(items.map((it, idx) => (idx === i ? { ...it, [key]: val } : it))) }
  function reset() { setItems(defaultNavLinks); showToast('Reset to defaults') }

  return (
    <>
      <PageTitle kicker="04 — SITE / NAVIGATION" title={<>The <span className="display-italic">navigation</span>.</>} subtitle="Reorder, rename, or hide links from the public site's header.">
        <Btn variant="ghost" onClick={reset}><ArrowsCounterClockwise size={12} /> Reset</Btn>
        <Btn variant="primary" onClick={add}><Plus size={12} /> Add link</Btn>
      </PageTitle>

      <Card className="divide-y divide-ink/8">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-12 gap-3 items-center px-5 py-3.5">
            <input value={it.num || String(i + 1).padStart(2, '0')} onChange={(e) => update(i, 'num', e.target.value)} className={`${inputCls} col-span-1 mono text-[0.6rem] tabular text-center`} />
            <input value={it.label} onChange={(e) => update(i, 'label', e.target.value)} className={`${inputCls} col-span-4`} />
            <input value={it.to} onChange={(e) => update(i, 'to', e.target.value)} placeholder="/path" className={`${inputCls} col-span-4 mono text-xs`} />
            <div className="col-span-3 flex items-center justify-end gap-1.5">
              <Btn variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}>↑</Btn>
              <Btn variant="ghost" onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</Btn>
              <Btn variant="danger" onClick={() => remove(i)}><Trash size={12} /></Btn>
            </div>
          </div>
        ))}
      </Card>

      <Toast message={toast} />
    </>
  )
}

/* ====== SETTINGS — NOTIFICATION BAR ============================= */

export function NotificationSettings() {
  const [n, setN] = useLocalStorage(NOTIFICATION_KEY, DEFAULT_NOTIFICATION)
  const [toast, showToast] = useToast()
  function update(key, val) { setN({ ...n, [key]: val }) }
  return (
    <>
      <PageTitle kicker="04 — SITE / NOTICE BAR" title={<>The <span className="display-italic">notice</span> bar.</>} subtitle="A thin strip at the top of the public site. Use it sparingly — for new editions, retreats, or studio news.">
        <Btn variant="ghost" onClick={() => { setN(DEFAULT_NOTIFICATION); showToast('Reset to defaults') }}><ArrowsCounterClockwise size={12} /> Reset</Btn>
      </PageTitle>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="mono-sm text-ink/55 text-[0.55rem]">STATUS</div>
              <div className="mt-1 text-base">{n.enabled ? 'Visible on the public site' : 'Hidden'}</div>
            </div>
            <Toggle checked={n.enabled} onChange={(v) => update('enabled', v)} />
          </div>

          <div className="space-y-5">
            <Field label="MESSAGE" hint="Keep it under 80 characters.">
              <input value={n.message} onChange={(e) => update('message', e.target.value)} className={inputCls} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="LINK LABEL"><input value={n.linkLabel} onChange={(e) => update('linkLabel', e.target.value)} className={inputCls} /></Field>
              <Field label="LINK TARGET" hint="Internal path or full URL"><input value={n.linkTo} onChange={(e) => update('linkTo', e.target.value)} className={`${inputCls} mono text-xs`} /></Field>
            </div>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-3 border-b border-ink/10 flex items-center justify-between">
            <span className="mono-sm text-ink/55 text-[0.55rem]">LIVE PREVIEW</span>
            <Link to="/" className="mono-sm text-ink/55 text-[0.55rem] atelier-link">OPEN SITE →</Link>
          </div>
          <div className="bg-paper">
            {n.enabled ? (
              <div className="bg-ink-500 text-paper-warm px-5 py-2 flex items-center gap-3 justify-between">
                <span className="flex items-center gap-3 truncate">
                  <span aria-hidden className="w-3 h-px bg-clay-400" />
                  <span className="mono-sm text-paper-warm/85 tracking-[0.18em] truncate">{n.message || '— message —'}</span>
                </span>
                <span className="mono-sm text-clay-300 text-[0.55rem] truncate">{n.linkLabel || 'READ MORE'} →</span>
              </div>
            ) : (
              <div className="px-5 py-10 text-center text-ink/45 text-sm">Notice bar is hidden. Toggle the switch to preview.</div>
            )}
            <div className="px-5 py-6 border-t border-ink/8">
              <div className="mono-sm text-ink/45 text-[0.55rem]">PUBLIC · EUNICE DE CAMPI</div>
              <div className="mt-2 display-thin text-xl">[ The site continues here ]</div>
            </div>
          </div>
        </Card>
      </div>

      <Toast message={toast} />
    </>
  )
}

/* ====== SETTINGS — MEDIA LIBRARY ================================ */

const MEDIA_KEY = 'eunice-v2.admin.media'
const SEED_MEDIA = [
  'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=600&auto=format&fit=crop&q=80',
]

export function MediaPanel() {
  const [items, setItems] = useLocalStorage(MEDIA_KEY, SEED_MEDIA)
  const [pasted, setPasted] = useState('')
  const [toast, showToast] = useToast()

  function addUrl() {
    const url = pasted.trim()
    if (!url) return
    setItems([url, ...items]); setPasted(''); showToast('Added to library')
  }
  function remove(i) { setItems(items.filter((_, idx) => idx !== i)) }
  function copy(url) { navigator.clipboard?.writeText(url); showToast('Copied URL') }

  return (
    <>
      <PageTitle kicker="04 — SITE / MEDIA" title={<>Media <span className="display-italic">library</span>.</>} subtitle="A simple visual register of every image used on the site." />

      <Card className="p-4 mb-5 flex items-center gap-3 flex-wrap">
        <input value={pasted} onChange={(e) => setPasted(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addUrl()} placeholder="Paste an image URL…" className={`${inputCls} flex-1 min-w-[280px] mono text-xs`} />
        <Btn variant="primary" onClick={addUrl}><Plus size={12} /> Add</Btn>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((src, i) => (
          <Card key={i} className="group relative overflow-hidden">
            <div className="aspect-[4/5] bg-stone-100">
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-2 flex items-center gap-1.5 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <Btn variant="ghost" onClick={() => copy(src)} className="!bg-paper-warm/90 !text-ink">Copy URL</Btn>
              <Btn variant="danger" onClick={() => remove(i)} className="!bg-paper-warm/90"><Trash size={12} /></Btn>
            </div>
          </Card>
        ))}
      </div>

      <Toast message={toast} />
    </>
  )
}

/* ====== COLLECTION EDITOR (shared) ============================== */

function CollectionEditor({ storageKey, seed, label, title, kicker, subtitle, fields, listColumns, newItem }) {
  const [items, setItems] = useLocalStorage(storageKey, seed)
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug || '')
  const [toast, showToast] = useToast()
  const [q, setQ] = useState('')

  const active = items.find((it) => it.slug === activeSlug) || items[0]
  const filtered = items.filter((it) =>
    q === '' || Object.values(it).some((v) => typeof v === 'string' && v.toLowerCase().includes(q.toLowerCase())),
  )

  useEffect(() => {
    if (!items.some((it) => it.slug === activeSlug)) setActiveSlug(items[0]?.slug || '')
  }, [items, activeSlug])

  function update(key, val) { setItems(items.map((it) => (it.slug === active.slug ? { ...it, [key]: val } : it))) }
  function save() { showToast(`${active.title || active.name} saved`) }
  function add() {
    const next = newItem(); setItems([next, ...items]); setActiveSlug(next.slug)
  }
  function duplicate() {
    if (!active) return
    const copy = { ...active, slug: `${active.slug}-copy`, title: active.title ? `${active.title} (copy)` : undefined, name: active.name ? `${active.name} (copy)` : undefined }
    setItems([copy, ...items]); setActiveSlug(copy.slug)
  }
  function remove() {
    if (!active) return
    if (!window.confirm(`Delete "${active.title || active.name}"?`)) return
    setItems(items.filter((it) => it.slug !== active.slug)); showToast('Deleted')
  }
  function reset() { setItems(seed); setActiveSlug(seed[0]?.slug || ''); showToast('Reset to defaults') }

  return (
    <>
      <PageTitle kicker={kicker} title={title} subtitle={subtitle}>
        <Btn variant="ghost" onClick={reset}><ArrowsCounterClockwise size={12} /> Reset</Btn>
        <Btn variant="primary" onClick={add}><Plus size={12} /> New {label.toLowerCase().replace(/s$/, '')}</Btn>
      </PageTitle>

      <div className="grid lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-5 xl:col-span-4 p-0 overflow-hidden self-start sticky top-6">
          <div className="px-3 py-2 border-b border-ink/10 flex items-center gap-2">
            <MagnifyingGlass size={12} className="text-ink/55" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-ink/30" />
            <span className="mono-sm text-ink/55 text-[0.55rem] tabular">{filtered.length}/{items.length}</span>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto">
            {filtered.map((it) => {
              const isActive = it.slug === active?.slug
              return (
                <li key={it.slug}>
                  <button onClick={() => setActiveSlug(it.slug)} className={`w-full text-left px-4 py-3 border-b border-ink/8 transition-colors ${isActive ? 'bg-stone-100' : 'hover:bg-stone-50'}`}>
                    <div className="text-sm">{it.title || it.name}</div>
                    <div className="mt-0.5 text-[0.6rem] mono-sm text-ink/55 flex items-center gap-2">
                      {listColumns.slice(1).map((c) => (
                        <span key={c.key}>{c.render ? c.render(it) : it[c.key]}</span>
                      )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={i}>·</span>, el], [])}
                    </div>
                  </button>
                </li>
              )
            })}
            {filtered.length === 0 && <li className="px-4 py-8 text-center text-ink/45 text-sm">No matches.</li>}
          </ul>
        </Card>

        <Card className="lg:col-span-7 xl:col-span-8 p-6 md:p-8">
          {active ? (
            <>
              <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
                <div className="flex items-center gap-3">
                  <Pencil size={14} className="text-ink/55" />
                  <span className="mono-sm text-ink/55 text-[0.55rem]">EDITING</span>
                  <span className="text-sm">{active.title || active.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Btn variant="ghost" onClick={duplicate}><Folder size={12} /> Duplicate</Btn>
                  <Btn variant="danger" onClick={remove}><Trash size={12} /> Delete</Btn>
                  <Btn variant="primary" onClick={save}><CheckCircle size={12} /> Save</Btn>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                {fields.map((f) => (
                  <div key={f.key} className={`col-span-12 sm:col-span-${f.span || 12}`}>
                    <Field label={f.label} hint={f.hint}>
                      <FieldInput field={f} value={active[f.key]} onChange={(v) => update(f.key, v)} />
                    </Field>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-ink/45">No items. Use “New” to create one.</div>
          )}
        </Card>
      </div>

      <Toast message={toast} />
    </>
  )
}

function FieldInput({ field, value, onChange }) {
  if (field.kind === 'textarea') {
    return <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={field.rows || 4} className={`${inputCls} resize-y leading-relaxed`} />
  }
  if (field.kind === 'paragraphs') {
    const text = Array.isArray(value) ? value.join('\n\n') : value || ''
    return <textarea value={text} onChange={(e) => onChange(e.target.value.split(/\n\n+/))} rows={field.rows || 8} className={`${inputCls} resize-y leading-relaxed`} />
  }
  if (field.kind === 'lines') {
    const text = Array.isArray(value) ? value.join('\n') : value || ''
    return <textarea value={text} onChange={(e) => onChange(e.target.value.split('\n').filter(Boolean))} rows={field.rows || 4} className={`${inputCls} resize-y`} />
  }
  if (field.kind === 'bool') {
    return (
      <div className="flex items-center gap-3 mt-1">
        <Toggle checked={!!value} onChange={onChange} />
        <span className="mono-sm text-ink/55 text-[0.55rem]">{value ? 'ON' : 'OFF'}</span>
      </div>
    )
  }
  if (field.kind === 'select') {
    return <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputCls}>{field.options.map((o) => <option key={o} value={o}>{o}</option>)}</select>
  }
  if (field.kind === 'image') {
    return (
      <div className="grid sm:grid-cols-[160px_1fr] gap-3 items-start">
        <div className="aspect-[4/5] bg-stone-100 overflow-hidden">
          {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-ink/30 mono-sm text-[0.55rem]">NO IMAGE</div>}
        </div>
        <input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="https://…" className={`${inputCls} mono text-xs`} />
      </div>
    )
  }
  return <input type={field.kind === 'number' ? 'number' : 'text'} value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputCls} />
}
