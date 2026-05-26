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
  CaretDown,
  ChartBar,
  ChartLineUp,
  CheckCircle,
  Compass,
  Envelope,
  Folder,
  House,
  IdentificationBadge,
  Image as ImageIcon,
  ListBullets,
  MagnifyingGlass,
  NotePencil,
  Path as PathIcon,
  Pencil,
  Plus,
  Receipt,
  ShoppingBag,
  SignOut,
  Trash,
} from '@phosphor-icons/react'
import { getToken, setToken, fetchMe, logout as apiLogout, resources, apiRequest, uploadFile } from '../lib/api.js'
import { DEFAULT_NOTIFICATION } from '../lib/settings.jsx'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'
import {
  brand,
  notes as defaultNotes,
  shop as defaultShop,
} from '../data/siteData.js'

/* The studio admin · v2 (Atelier).
   Same architecture as v1's admin, drawn in the atelier register:
   Italiana display, JetBrains Mono labels, ink/olive/clay palette. */

/* ====== AUTH GUARD + LAYOUT ===================================== */

function AdminChecking() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <span className="mono-sm text-ink/55 tracking-[0.22em]">CHECKING ACCESS…</span>
    </div>
  )
}

export function AdminLayout() {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState('checking') // checking | authed | denied
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!getToken()) {
      setAuthState('denied')
      return
    }
    let active = true
    fetchMe()
      .then((u) => { if (active) { setUser(u); setAuthState('authed') } })
      .catch(() => { if (active) { setToken(null); setAuthState('denied') } })
    return () => { active = false }
  }, [])

  if (authState === 'checking') return <AdminChecking />
  if (authState === 'denied') return <Navigate to="/login" replace />

  async function logout() {
    await apiLogout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-stone-50 text-ink-500 flex">
      <Sidebar email={user.email} onLogout={logout} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopStrip email={user.email} />
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
    { to: '/admin/analytics', label: 'Analytics', icon: ChartBar },
  ]},
  { section: 'CONTENT', items: [
    { to: '/admin/posts',      label: 'Notes & posts',   icon: NotePencil },
    { to: '/admin/practice',   label: 'Practice',        icon: Compass },
    { to: '/admin/programmes', label: 'Programmes',      icon: PathIcon },
    { to: '/admin/shop',       label: 'Shop editions',   icon: ShoppingBag },
  ]},
  { section: 'COMMERCE', items: [
    { to: '/admin/inquiries', label: 'Inquiries', icon: Envelope },
    { to: '/admin/orders',    label: 'Orders',    icon: Receipt },
  ]},
  { section: 'SITE', items: [
    { to: '/admin/settings/site',         label: 'Site details',  icon: IdentificationBadge },
    { to: '/admin/settings/nav',          label: 'Navigation',    icon: ListBullets },
    { to: '/admin/settings/notification', label: 'Notice bar',    icon: Bell },
    { to: '/admin/settings/media',        label: 'Media library', icon: ImageIcon },
  ]},
]

function Sidebar({ email, onLogout }) {
  return (
    <aside className="w-[260px] shrink-0 hidden md:flex flex-col bg-ink-500 text-paper-warm sticky top-0 h-screen overflow-y-auto">
      <Link to="/admin" className="px-6 py-7 border-b border-paper-warm/12">
        <div className="mono-sm text-paper-warm/65 text-[0.7rem]">{brand.name}</div>
        <div className="mt-1 display-thin text-2xl">
          The <span className="display-italic">studio</span> desk
        </div>
      </Link>

      <nav className="flex-1 py-5">
        {NAV.map((g) => (
          <div key={g.section} className="mb-5">
            <div className="px-6 mb-2 mono-sm text-paper-warm/35 text-[0.7rem] tracking-[0.22em]">{g.section}</div>
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
        <div className="mono-sm text-paper-warm/65 text-[0.7rem] truncate">{email}</div>
        <div className="mt-3 flex items-center gap-2">
          <Link to="/" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-paper-warm/8 hover:bg-paper-warm/16 transition-colors mono-sm text-[0.7rem]">
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
        <div className="mono-sm text-ink/65 text-[0.7rem] truncate">{crumb || 'admin'}</div>
        <div className="flex items-center gap-3">
          <Link to="/" className="atelier-link mono-sm text-[0.7rem] inline-flex items-center gap-1.5 hidden sm:inline-flex">
            <ArrowSquareOut size={12} /> VIEW SITE
          </Link>
          <span className="hidden sm:block w-px h-4 bg-ink/15" />
          <span className="mono-sm text-ink/65 text-[0.7rem] truncate max-w-[160px]">{email}</span>
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
        {kicker && <div className="mono-sm text-clay-500 text-[0.7rem]">{kicker}</div>}
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

function Field({ label, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mono-sm text-ink/65 text-[0.7rem] mb-1.5 inline-block">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-[0.7rem] text-ink/65">{hint}</span>}
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

/* Toast + confirm dialog are app-wide — see src/components/Toast.jsx and
 * src/components/ConfirmDialog.jsx. We import the hooks below. */

function StatPill({ label, value, hint }) {
  return (
    <Card className="p-5">
      <div className="mono-sm text-ink/65 text-[0.7rem]">{label}</div>
      <div className="mt-2 display-thin text-3xl tabular">{value}</div>
      {hint && <div className="mt-1 text-[0.7rem] text-ink/65">{hint}</div>}
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatPill label="POSTS PUBLISHED" value={defaultNotes.length} hint="3 public · 2 members-only" />
        <StatPill label="EDITIONS" value={defaultShop.products.length} hint={`${defaultShop.products.filter((p) => p.featured).length} featured`} />
        <StatPill label="OPEN INQUIRIES" value={MOCK_INQUIRIES.filter((i) => i.status === 'new').length} hint="Awaiting reply" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="display-thin text-xl">Recent activity</h2>
            <span className="mono-sm text-ink/65 text-[0.7rem] tabular">LAST 14 DAYS</span>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              { icon: NotePencil, text: 'Eunice published "The room as a collaborator".', when: '2 days ago' },
              { icon: ShoppingBag, text: 'New order · Annual Print Edition · A. H., London.', when: '3 days ago' },
              { icon: Envelope, text: 'New inquiry · a coaching enquiry from London.', when: '5 days ago' },
              { icon: Bell, text: 'Notice bar enabled · "The Quiet Report Q1".', when: '11 days ago' },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3 py-2 border-b border-ink/8 last:border-b-0">
                <a.icon size={14} className="mt-0.5 text-ink/65 shrink-0" />
                <span className="flex-1 text-ink/85">{a.text}</span>
                <span className="text-[0.7rem] mono-sm text-ink/65 tabular shrink-0">{a.when.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="display-thin text-xl mb-4">Quick actions</h2>
          <div className="space-y-2">
            {[
              { to: '/admin/posts',    icon: NotePencil, label: 'Write a new post' },
              { to: '/admin/shop',     icon: ShoppingBag,label: 'Add an edition' },
              { to: '/admin/settings/notification', icon: Bell, label: 'Open notice bar' },
            ].map((q) => (
              <Link key={q.to} to={q.to} className="flex items-center justify-between gap-3 px-3 py-2.5 bg-stone-50 hover:bg-stone-100 transition-colors text-sm border border-ink/8">
                <span className="inline-flex items-center gap-2.5">
                  <q.icon size={14} className="text-ink/65" />
                  {q.label}
                </span>
                <span className="text-ink/65">→</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}

/* ====== POSTS / PROJECTS / PRACTICE / SHOP — Collection Editor ==== */

export function PostsPanel() {
  return <CollectionEditor
    resource="journal"
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
      { key: 'badge', label: '', width: 80, render: (it) => it.isPremium ? <span className="mono-sm text-clay-500 text-[0.7rem]">MEMBERS</span> : <span className="mono-sm text-ink/65 text-[0.7rem]">PUBLIC</span> },
    ]}
    newItem={() => ({
      slug: 'new-post', num: '013', title: 'A new post', deck: '',
      section: 'Notes', date: 'May 2026', readTime: '5 min', isPremium: false,
      cover: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1800&auto=format&fit=crop&q=85',
      body: [''],
    })}
  />
}

export function PracticePanel() {
  return <CollectionEditor
    resource="practice"
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
    resource="shop"
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
      { key: 'featured', label: '', width: 80, render: (it) => it.featured ? <span className="mono-sm text-clay-500 text-[0.7rem]">FEATURED</span> : null },
    ]}
    newItem={() => ({ slug: 'new-edition', num: '007', name: 'New edition', subtitle: '', kind: 'Printed · — pages', price: '£—', cover: '', blurb: '', tone: 'ink', edition: 'No. 0X' })}
  />
}

export function ProgrammesPanel() {
  return <CollectionEditor
    resource="programmes"
    label="Programmes"
    title={<>Packaged <span className="display-italic">offerings</span>.</>}
    kicker="02 — CONTENT / PROGRAMMES"
    subtitle="Sales-page programmes — problem, transformation, modules, price, CTA."
    fields={[
      { key: 'title',         label: 'Title',          kind: 'text', span: 8, required: true },
      { key: 'slug',          label: 'Slug',           kind: 'text', span: 4, required: true },
      { key: 'num',           label: 'Number',         kind: 'text', span: 3 },
      { key: 'price',         label: 'Price',          kind: 'text', span: 3 },
      { key: 'featured',      label: 'Featured',       kind: 'bool', span: 3 },
      { key: 'italicTitle',   label: 'Italic subtitle',kind: 'text', span: 12 },
      { key: 'discipline',    label: 'Discipline label', kind: 'text', span: 6 },
      { key: 'duration',      label: 'Duration',       kind: 'text', span: 3 },
      { key: 'cadence',       label: 'Cadence',        kind: 'text', span: 3 },
      { key: 'format',        label: 'Format',         kind: 'text', span: 6 },
      { key: 'cover',         label: 'Cover image',    kind: 'image', span: 12 },
      { key: 'imageCaption',  label: 'Image caption',  kind: 'text', span: 12 },
      { key: 'lede',          label: 'Lede',           kind: 'textarea', span: 12, rows: 3 },
      { key: 'problem',        label: 'Problem (paragraphs · who this is for)',     kind: 'paragraphs', span: 12 },
      { key: 'transformation', label: 'Transformation (paragraphs · what changes)', kind: 'paragraphs', span: 12 },
      { key: 'modules',        label: 'Modules — JSON list of {num, title, body}',  kind: 'json',       span: 12 },
      { key: 'inclusions',     label: 'Inclusions — JSON list of {label, detail}',  kind: 'json',       span: 12 },
      { key: 'ctaLabel',      label: 'CTA label',      kind: 'text', span: 6 },
      { key: 'ctaTo',         label: 'CTA link',       kind: 'text', span: 6 },
    ]}
    listColumns={[
      { key: 'num', label: '№', width: 60 },
      { key: 'title', label: 'Programme' },
      { key: 'discipline', label: 'Discipline', width: 220 },
      { key: 'price', label: 'Price', width: 100 },
      { key: 'featured', label: '', width: 80, render: (it) => it.featured ? <span className="mono-sm text-clay-500 text-[0.7rem]">FEATURED</span> : null },
    ]}
    newItem={() => ({
      slug: 'new-programme', num: '04', title: 'New programme',
      italicTitle: '', discipline: '', lede: '',
      problem: [''], transformation: [''], modules: [], inclusions: [],
      duration: '', cadence: '', format: '', price: '£—',
      cover: '', imageCaption: '', ctaLabel: 'Apply', ctaTo: '/enquire?subject=programme',
      featured: false, order: 0,
    })}
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
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')   // all | open | handled
  const [q, setQ] = useState('')

  useEffect(() => {
    let alive = true
    apiRequest('/enquiries/', { auth: true })
      .then((data) => {
        if (!alive) return
        setItems(data.results || data)
        setLoading(false)
      })
      .catch((err) => {
        if (!alive) return
        setError(err.message || 'Could not load enquiries.')
        setLoading(false)
      })
    return () => { alive = false }
  }, [])

  const statusOf = (i) => (i.handled ? 'handled' : 'open')
  const filtered = items.filter((i) =>
    (filter === 'all' || statusOf(i) === filter) &&
    (q === '' || (i.name + i.interest + i.email + (i.note || '')).toLowerCase().includes(q.toLowerCase()))
  )
  const count = (s) => (s === 'all' ? items.length : items.filter((i) => statusOf(i) === s).length)

  return (
    <>
      <PageTitle kicker="03 — COMMERCE / INQUIRIES" title={<>Studio <span className="display-italic">inbox</span>.</>} subtitle="Enquiries submitted through the public site's form." />

      <Card className="p-3 mb-5 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <MagnifyingGlass size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/65" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className={`${inputCls} pl-8 w-64`} />
        </div>
        <Toolbar>
          {['all', 'open', 'handled'].map((s) => (
            <Btn key={s} variant={filter === s ? 'primary' : 'default'} onClick={() => setFilter(s)}>
              {s.toUpperCase()}
              <span className="ml-1.5 opacity-65 tabular">({count(s)})</span>
            </Btn>
          ))}
        </Toolbar>
      </Card>

      {loading ? (
        <Card className="p-12 text-center text-ink/65 text-sm">Loading…</Card>
      ) : error ? (
        <Card className="p-12 text-center text-clay-600 text-sm">{error}</Card>
      ) : (
        <Card>
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="border-b border-ink/10">
                <Th>Name</Th><Th>Interest</Th><Th width="200">Email</Th><Th width="120">Date</Th><Th width="110">Status</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-ink/8 hover:bg-stone-50 align-top">
                  <Td>{row.name}</Td>
                  <Td className="text-ink/85">
                    <div>{row.interest || '—'}</div>
                    {row.note && <div className="mt-1 text-xs text-ink/65 line-clamp-2">{row.note}</div>}
                  </Td>
                  <Td className="text-ink/65 text-xs">{row.email}</Td>
                  <Td className="tabular text-xs">{(row.created_at || '').slice(0, 10)}</Td>
                  <Td><StatusPill status={statusOf(row)} /></Td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-ink/65 text-sm">
                  {items.length ? 'No enquiries match.' : 'No enquiries yet.'}
                </td></tr>
              )}
            </tbody>
          </table>
        </Card>
      )}
    </>
  )
}

function Th({ children, width }) {
  return <th style={{ width }} className="px-5 py-3 mono-sm text-ink/65 text-[0.7rem] font-normal tracking-[0.18em]">{children}</th>
}
function Td({ children, className = '' }) {
  return <td className={`px-5 py-3.5 ${className}`}>{children}</td>
}
function StatusPill({ status }) {
  const styles = {
    new: 'bg-ink/10 text-ink',
    open: 'bg-ink/10 text-ink',
    handled: 'bg-olive-200/45 text-olive-700',
    replied: 'bg-clay-300/35 text-clay-600',
    archived: 'bg-stone-100 text-ink/65',
    paid: 'bg-olive-200/45 text-olive-700',
    posted: 'bg-clay-300/35 text-clay-600',
    refunded: 'bg-stone-100 text-ink/65',
  }
  return <span className={`inline-flex items-center px-2 py-1 mono-sm text-[0.7rem] tracking-[0.16em] ${styles[status] || ''}`}>{status.toUpperCase()}</span>
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
                <Td className="mono-sm text-ink/85 text-[0.7rem] tracking-[0.12em]">{row.id}</Td>
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

export function NavSettings() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const showToast = useToast()

  useEffect(() => {
    let alive = true
    apiRequest('/settings/')
      .then((d) => { if (alive) { setItems(d.navLinks || []); setLoading(false) } })
      .catch(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  function add() { setItems([...items, { num: String(items.length + 1).padStart(2, '0'), label: 'New link', to: '/' }]) }
  function remove(i) { setItems(items.filter((_, idx) => idx !== i)) }
  function move(i, dir) {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]; [next[i], next[j]] = [next[j], next[i]]; setItems(next)
  }
  function update(i, key, val) { setItems(items.map((it, idx) => (idx === i ? { ...it, [key]: val } : it))) }
  async function save() {
    setBusy(true)
    try {
      await apiRequest('/settings/', { method: 'PATCH', body: { navLinks: items }, auth: true })
      showToast('Navigation saved')
    } catch (e) {
      showToast(e.message || 'Save failed', { kind: 'error' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageTitle kicker="04 — SITE / NAVIGATION" title={<>The <span className="display-italic">navigation</span>.</>} subtitle="Reorder, rename, or hide links from the public site's header.">
        <Btn variant="ghost" onClick={add} disabled={loading}><Plus size={12} /> Add link</Btn>
        <Btn variant="primary" onClick={save} disabled={loading || busy}><CheckCircle size={12} /> {busy ? 'Saving…' : 'Save'}</Btn>
      </PageTitle>

      {loading ? (
        <Card className="p-12 text-center text-ink/65 text-sm">Loading…</Card>
      ) : (
        <Card className="divide-y divide-ink/8">
          {items.map((it, i) => (
          <div key={i} className="grid grid-cols-12 gap-3 items-center px-5 py-3.5">
            <input value={it.num || String(i + 1).padStart(2, '0')} onChange={(e) => update(i, 'num', e.target.value)} className={`${inputCls} col-span-1 mono text-[0.7rem] tabular text-center`} />
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
      )}

      {/* Toasts are rendered globally by ToastProvider */}
    </>
  )
}

/* ====== SETTINGS — NOTIFICATION BAR ============================= */

export function NotificationSettings() {
  const [n, setN] = useState(DEFAULT_NOTIFICATION)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const showToast = useToast()

  useEffect(() => {
    let alive = true
    apiRequest('/settings/')
      .then((d) => {
        if (!alive) return
        const notif = d.notification && Object.keys(d.notification).length ? d.notification : DEFAULT_NOTIFICATION
        setN(notif)
        setLoading(false)
      })
      .catch(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  function update(key, val) { setN({ ...n, [key]: val }) }
  async function save() {
    setBusy(true)
    try {
      await apiRequest('/settings/', { method: 'PATCH', body: { notification: n }, auth: true })
      showToast('Notice bar saved')
    } catch (e) {
      showToast(e.message || 'Save failed', { kind: 'error' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageTitle kicker="04 — SITE / NOTICE BAR" title={<>The <span className="display-italic">notice</span> bar.</>} subtitle="A thin strip at the top of the public site. Use it sparingly — for new editions, retreats, or studio news.">
        <Btn variant="ghost" onClick={() => setN(DEFAULT_NOTIFICATION)} disabled={loading}><ArrowsCounterClockwise size={12} /> Reset</Btn>
        <Btn variant="primary" onClick={save} disabled={loading || busy}><CheckCircle size={12} /> {busy ? 'Saving…' : 'Save'}</Btn>
      </PageTitle>

      {loading ? (
        <Card className="p-12 text-center text-ink/65 text-sm">Loading…</Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="mono-sm text-ink/65 text-[0.7rem]">STATUS</div>
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
              <span className="mono-sm text-ink/65 text-[0.7rem]">LIVE PREVIEW</span>
              <Link to="/" className="mono-sm text-ink/65 text-[0.7rem] atelier-link">OPEN SITE →</Link>
            </div>
            <div className="bg-paper">
              {n.enabled ? (
                <div className="bg-ink-500 text-paper-warm px-5 py-2 flex items-center gap-3 justify-between">
                  <span className="flex items-center gap-3 truncate">
                    <span aria-hidden className="w-3 h-px bg-clay-400" />
                    <span className="mono-sm text-paper-warm/85 tracking-[0.18em] truncate">{n.message || '— message —'}</span>
                  </span>
                  <span className="mono-sm text-clay-300 text-[0.7rem] truncate">{n.linkLabel || 'READ MORE'} →</span>
                </div>
              ) : (
                <div className="px-5 py-10 text-center text-ink/65 text-sm">Notice bar is hidden. Toggle the switch to preview.</div>
              )}
              <div className="px-5 py-6 border-t border-ink/8">
                <div className="mono-sm text-ink/65 text-[0.7rem]">PUBLIC · EUNICE DE CAMPI</div>
                <div className="mt-2 display-thin text-xl">[ The site continues here ]</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Toasts are rendered globally by ToastProvider */}
    </>
  )
}

/* ====== SETTINGS — MEDIA LIBRARY ================================ */

export function MediaPanel() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const showToast = useToast()
  const confirm = useConfirm()

  useEffect(() => {
    let alive = true
    apiRequest('/media/', { auth: true })
      .then((d) => { if (alive) { setItems(d || []); setLoading(false) } })
      .catch((e) => { if (alive) { setError(e.message || 'Could not load.'); setLoading(false) } })
    return () => { alive = false }
  }, [])

  async function handleFile(file) {
    if (!file) return
    setBusy(true); setError('')
    try {
      const created = await uploadFile('/media/', file, { label: file.name })
      setItems((list) => [created, ...list])
      showToast('Uploaded')
    } catch (e) {
      setError(e.message || 'Upload failed.')
      showToast(e.message || 'Upload failed', { kind: 'error' })
    } finally {
      setBusy(false)
    }
  }

  async function remove(item) {
    const ok = await confirm({
      title: 'Delete this image?',
      message: 'Anywhere this image is used will fall back to its placeholder until you swap in a new one.',
      confirmLabel: 'Delete',
      danger: true,
    })
    if (!ok) return
    try {
      await apiRequest(`/media/${item.id}/`, { method: 'DELETE', auth: true })
      setItems((list) => list.filter((it) => it.id !== item.id))
      showToast('Deleted')
    } catch (e) {
      showToast(e.message || 'Delete failed', { kind: 'error' })
    }
  }

  function copy(url) {
    navigator.clipboard?.writeText(url)
    showToast('URL copied')
  }

  return (
    <>
      <PageTitle kicker="04 — SITE / MEDIA" title={<>Media <span className="display-italic">library</span>.</>} subtitle="Upload images, then copy a URL into any image field in the admin.">
        <label className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs mono tracking-wider transition-colors cursor-pointer bg-ink-500 text-paper-warm hover:bg-clay-500 ${busy ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}>
          <Plus size={12} /> {busy ? 'Uploading…' : 'Upload image'}
          <input
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
            className="hidden"
          />
        </label>
      </PageTitle>

      {error && (
        <Card className="p-3 mb-5 border-clay-500/40">
          <span className="mono-sm text-clay-600 text-[0.7rem]">{error}</span>
        </Card>
      )}

      {loading ? (
        <Card className="p-12 text-center text-ink/65 text-sm">Loading…</Card>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center text-ink/65 text-sm">No media yet. Click "Upload image" to add the first one.</Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden">
              <div className="aspect-[4/5] bg-stone-100">
                <img src={item.url} alt={item.label || ''} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-2 flex items-center gap-1.5 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <Btn variant="ghost" onClick={() => copy(item.url)} className="!bg-paper-warm/90 !text-ink">Copy URL</Btn>
                <Btn variant="danger" onClick={() => remove(item)} className="!bg-paper-warm/90"><Trash size={12} /></Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Toasts are rendered globally by ToastProvider */}
    </>
  )
}

/* ====== COLLECTION EDITOR (shared) ============================== */

function CollectionEditor({ resource, label, title, kicker, subtitle, fields, listColumns, newItem }) {
  const [items, setItems] = useState([])
  const [activeSlug, setActiveSlug] = useState('')   // server slug of the selected item
  const [draft, setDraft] = useState(null)           // editable working copy
  const [savedSnapshot, setSavedSnapshot] = useState(null)  // last server-confirmed version of draft
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const showToast = useToast()
  const confirm = useConfirm()
  const [q, setQ] = useState('')

  // Has the user edited the draft since the last save / load?
  // Compared by JSON to catch nested-object changes (modules, inclusions, etc.).
  const isDirty = useMemo(() => {
    if (!draft || !savedSnapshot) return false
    return JSON.stringify(draft) !== JSON.stringify(savedSnapshot)
  }, [draft, savedSnapshot])

  // Warn before closing the tab / refreshing if there are unsaved changes.
  useEffect(() => {
    function onBeforeUnload(e) {
      if (isDirty) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [isDirty])

  // Load the collection from the API.
  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')
    resources.list(resource)
      .then((data) => {
        if (!alive) return
        setItems(data)
        const first = data[0] ? { ...data[0] } : null
        setActiveSlug(data[0]?.slug || '')
        setDraft(first)
        setSavedSnapshot(first)
        setLoading(false)
      })
      .catch((err) => {
        if (!alive) return
        setError(err.message || 'Could not load.')
        setLoading(false)
      })
    return () => { alive = false }
  }, [resource])

  const filtered = items.filter((it) =>
    q === '' || Object.values(it).some((v) => typeof v === 'string' && v.toLowerCase().includes(q.toLowerCase())),
  )

  // Centralised guard — used by select, add, duplicate. Returns true if it's
  // safe to switch to a different item.
  async function confirmDiscardIfDirty() {
    if (!isDirty) return true
    const name = savedSnapshot?.title || savedSnapshot?.name || 'this item'
    return confirm({
      title: `Discard your changes to "${name}"?`,
      message: 'You have unsaved edits. Switching now will lose them.',
      confirmLabel: 'Discard',
      cancelLabel: 'Keep editing',
      danger: true,
    })
  }

  async function select(slug) {
    if (slug === activeSlug) return
    if (!(await confirmDiscardIfDirty())) return
    const item = items.find((it) => it.slug === slug)
    setActiveSlug(slug)
    setDraft(item ? { ...item } : null)
    setSavedSnapshot(item ? { ...item } : null)
    setError('')
  }

  function update(key, val) {
    setDraft((d) => ({ ...d, [key]: val }))
  }

  function revert() {
    if (!savedSnapshot) return
    setDraft({ ...savedSnapshot })
    setError('')
    showToast('Changes discarded')
  }

  async function save() {
    if (!draft) return
    const original = items.find((it) => it.slug === activeSlug)  // keep for rollback
    const optimisticDraft = { ...draft }
    setBusy(true); setError('')
    // Optimistic — reflect the edit in the list immediately, even though
    // the API roundtrip to Neon takes ~2 seconds.
    setItems((list) => list.map((it) => (it.slug === activeSlug ? optimisticDraft : it)))
    try {
      const saved = await resources.update(resource, activeSlug, draft)
      setItems((list) => list.map((it) => (it.slug === activeSlug ? saved : it)))
      setActiveSlug(saved.slug)
      setDraft({ ...saved })
      setSavedSnapshot({ ...saved })
      showToast(`${saved.title || saved.name} saved`)
    } catch (err) {
      // Roll back the optimistic list update.
      if (original) setItems((list) => list.map((it) => (it.slug === activeSlug ? original : it)))
      setError(err.message || 'Save failed.')
      showToast(err.message || 'Save failed', { kind: 'error' })
    } finally {
      setBusy(false)
    }
  }

  async function add() {
    if (!(await confirmDiscardIfDirty())) return
    setBusy(true); setError('')
    try {
      const created = await resources.create(resource, newItem())
      setItems((list) => [created, ...list])
      setActiveSlug(created.slug)
      setDraft({ ...created })
      setSavedSnapshot({ ...created })
      showToast('Created')
    } catch (err) {
      setError(err.message || 'Could not create.')
      showToast(err.message || 'Could not create', { kind: 'error' })
    } finally {
      setBusy(false)
    }
  }

  async function duplicate() {
    if (!draft) return
    if (!(await confirmDiscardIfDirty())) return
    setBusy(true); setError('')
    try {
      const copy = {
        ...draft,
        slug: `${draft.slug}-copy`,
        title: draft.title ? `${draft.title} (copy)` : undefined,
        name: draft.name ? `${draft.name} (copy)` : undefined,
      }
      const created = await resources.create(resource, copy)
      setItems((list) => [created, ...list])
      setActiveSlug(created.slug)
      setDraft({ ...created })
      setSavedSnapshot({ ...created })
      showToast('Duplicated')
    } catch (err) {
      setError(err.message || 'Could not duplicate.')
      showToast(err.message || 'Could not duplicate', { kind: 'error' })
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!draft) return
    const name = draft.title || draft.name || 'this item'
    const ok = await confirm({
      title: `Delete "${name}"?`,
      message: 'It will disappear from the public site immediately. This cannot be undone.',
      confirmLabel: 'Delete',
      danger: true,
    })
    if (!ok) return

    const removed = items.find((it) => it.slug === activeSlug)
    const removedIndex = items.findIndex((it) => it.slug === activeSlug)
    const remaining = items.filter((it) => it.slug !== activeSlug)
    const nextItem = remaining[0] || null

    setBusy(true); setError('')
    // Optimistic — pull it out of the list and jump to the next item.
    setItems(remaining)
    setActiveSlug(nextItem?.slug || '')
    setDraft(nextItem ? { ...nextItem } : null)
    setSavedSnapshot(nextItem ? { ...nextItem } : null)

    try {
      await resources.remove(resource, removed.slug)
      showToast(`"${name}" deleted`)
    } catch (err) {
      // Roll back — re-insert at the original index and re-select.
      if (removed) {
        setItems((list) => {
          const restored = [...list]
          restored.splice(removedIndex, 0, removed)
          return restored
        })
        setActiveSlug(removed.slug)
        setDraft({ ...removed })
        setSavedSnapshot({ ...removed })
      }
      setError(err.message || 'Could not delete.')
      showToast(err.message || 'Could not delete', { kind: 'error' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageTitle kicker={kicker} title={title} subtitle={subtitle}>
        <Btn variant="primary" onClick={add} disabled={busy || loading}>
          <Plus size={12} /> New {label.toLowerCase().replace(/s$/, '')}
        </Btn>
      </PageTitle>

      {error && (
        <Card className="p-3 mb-5 border-clay-500/40">
          <span className="mono-sm text-clay-600 text-[0.7rem]">{error}</span>
        </Card>
      )}

      {loading ? (
        <Card className="p-12 text-center text-ink/65 text-sm">Loading…</Card>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-5 xl:col-span-4 p-0 overflow-hidden self-start sticky top-6">
            <div className="px-3 py-2 border-b border-ink/10 flex items-center gap-2">
              <MagnifyingGlass size={12} className="text-ink/65" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-ink/30" />
              <span className="mono-sm text-ink/65 text-[0.7rem] tabular">{filtered.length}/{items.length}</span>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto">
              {filtered.map((it) => {
                const isActive = it.slug === activeSlug
                return (
                  <li key={it.slug}>
                    <button onClick={() => select(it.slug)} className={`w-full text-left px-4 py-3 border-b border-ink/8 transition-colors ${isActive ? 'bg-stone-100' : 'hover:bg-stone-50'}`}>
                      <div className="text-sm">{it.title || it.name}</div>
                      <div className="mt-0.5 text-[0.7rem] mono-sm text-ink/65 flex items-center gap-2">
                        {listColumns.slice(1).map((c) => (
                          <span key={c.key}>{c.render ? c.render(it) : it[c.key]}</span>
                        )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`sep${i}`}>·</span>, el], [])}
                      </div>
                    </button>
                  </li>
                )
              })}
              {filtered.length === 0 && <li className="px-4 py-8 text-center text-ink/65 text-sm">No matches.</li>}
            </ul>
          </Card>

          <Card className="lg:col-span-7 xl:col-span-8 p-6 md:p-8">
            {draft ? (
              <>
                <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Pencil size={14} className="text-ink/65" />
                    <span className="mono-sm text-ink/65 text-[0.7rem]">EDITING</span>
                    <span className="text-sm">{draft.title || draft.name}</span>
                    {/* Dirty indicator — small clay dot when there are unsaved edits. */}
                    {isDirty && (
                      <span className="mono-sm text-clay-500 text-[0.65rem] tracking-[0.2em] inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-clay-500" />
                        UNSAVED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isDirty && (
                      <Btn variant="ghost" onClick={revert} disabled={busy}>
                        <ArrowsCounterClockwise size={12} /> Discard
                      </Btn>
                    )}
                    <Btn variant="ghost" onClick={duplicate} disabled={busy}><Folder size={12} /> Duplicate</Btn>
                    <Btn variant="danger" onClick={remove} disabled={busy}><Trash size={12} /> Delete</Btn>
                    <Btn
                      variant="primary"
                      onClick={save}
                      disabled={busy || !isDirty}
                      title={!isDirty ? 'No changes to save' : ''}
                    >
                      <CheckCircle size={12} /> {busy ? 'Saving…' : 'Save'}
                    </Btn>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  {fields.map((f) => (
                    <div key={f.key} className={`col-span-12 sm:col-span-${f.span || 12}`}>
                      <Field label={f.label} hint={f.hint}>
                        <FieldInput field={f} value={draft[f.key]} onChange={(v) => update(f.key, v)} />
                      </Field>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-20 text-center text-ink/65">No items. Use “New” to create one.</div>
            )}
          </Card>
        </div>
      )}

      {/* Toasts are rendered globally by ToastProvider */}
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
        <span className="mono-sm text-ink/65 text-[0.7rem]">{value ? 'ON' : 'OFF'}</span>
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
          {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-ink/30 mono-sm text-[0.7rem]">NO IMAGE</div>}
        </div>
        <input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="https://…" className={`${inputCls} mono text-xs`} />
      </div>
    )
  }
  if (field.kind === 'json') {
    // Structured arrays / objects edited as JSON. Validates on blur; bad
    // JSON keeps the unparsed text in local state until the user fixes it.
    return <JsonField value={value} onChange={onChange} rows={field.rows || 8} hint={field.hint} embedded />
  }
  return <input type={field.kind === 'number' ? 'number' : 'text'} value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputCls} />
}


/* ====== SETTINGS — SITE DETAILS =================================== */
/* The "no more Django admin" panel — brand, hero, studio, membership and
   contact copy, all PATCH-ed to /api/settings/. Simple flat fields get
   structured inputs; arrays of objects use a JSON editor with live
   validation (won't accept invalid JSON on Save). */

export function SiteDetailsPanel() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [loadErr, setLoadErr] = useState('')
  const [saveErr, setSaveErr] = useState('')
  const showToast = useToast()

  useEffect(() => {
    let alive = true
    apiRequest('/settings/')
      .then((d) => { if (alive) { setData(d); setLoading(false) } })
      .catch((e) => { if (alive) { setLoadErr(e.message || 'Could not load.'); setLoading(false) } })
    return () => { alive = false }
  }, [])

  function update(section, key, val) {
    setData((d) => ({ ...d, [section]: { ...(d?.[section] || {}), [key]: val } }))
  }

  function updateNested(section, path, val) {
    setData((d) => {
      const next = { ...d, [section]: { ...(d?.[section] || {}) } }
      let cur = next[section]
      for (let i = 0; i < path.length - 1; i++) {
        cur[path[i]] = { ...(cur[path[i]] || {}) }
        cur = cur[path[i]]
      }
      cur[path[path.length - 1]] = val
      return next
    })
  }

  async function saveAll() {
    if (!data) return
    setBusy(true); setSaveErr('')
    try {
      await apiRequest('/settings/', {
        method: 'PATCH',
        body: {
          brand: data.brand,
          hero: data.hero,
          studio: data.studio,
          membership: data.membership,
          contact: data.contact,
        },
        auth: true,
      })
      showToast('Site details saved')
    } catch (e) {
      setSaveErr(e.message || 'Save failed.')
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <>
        <PageTitle kicker="04 — SITE / DETAILS" title={<>Site <span className="display-italic">details</span>.</>} subtitle="Brand, hero, about, membership and contact copy." />
        <Card className="p-12 text-center text-ink/65 text-sm">Loading…</Card>
      </>
    )
  }
  if (loadErr || !data) {
    return (
      <>
        <PageTitle kicker="04 — SITE / DETAILS" title="Site details" />
        <Card className="p-12 text-center text-clay-600 text-sm">{loadErr || 'Could not load.'}</Card>
      </>
    )
  }

  const b = data.brand || {}
  const h = data.hero || {}
  const s = data.studio || {}
  const m = data.membership || {}
  const c = data.contact || {}

  return (
    <>
      <PageTitle kicker="04 — SITE / DETAILS" title={<>Site <span className="display-italic">details</span>.</>} subtitle="Brand, hero, about, membership and contact copy. All live in your database — edit here, never via Django admin.">
        <Btn variant="primary" onClick={saveAll} disabled={busy}>
          <CheckCircle size={12} /> {busy ? 'Saving…' : 'Save all'}
        </Btn>
      </PageTitle>

      {saveErr && (
        <Card className="p-3 mb-5 border-clay-500/40">
          <span className="mono-sm text-clay-600 text-[0.7rem]">{saveErr}</span>
        </Card>
      )}

      {/* === BRAND === */}
      <Card className="p-6 md:p-8 mb-6">
        <h2 className="display-thin text-2xl mb-1">Brand</h2>
        <p className="mono-sm text-ink/65 text-[0.7rem] mb-6">Name, contact details, social links. Shown in the nav, footer and Enquire page.</p>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Name"><input value={b.name || ''} onChange={(e) => update('brand', 'name', e.target.value)} className={inputCls} /></Field>
          <Field label="Short name (initials)"><input value={b.shortName || ''} onChange={(e) => update('brand', 'shortName', e.target.value)} className={inputCls} /></Field>
          <Field label="Tagline" className="md:col-span-2"><input value={b.tagline || ''} onChange={(e) => update('brand', 'tagline', e.target.value)} className={inputCls} /></Field>
          <Field label="Email"><input type="email" value={b.email || ''} onChange={(e) => update('brand', 'email', e.target.value)} className={inputCls} /></Field>
          <Field label="Phone"><input value={b.phone || ''} onChange={(e) => update('brand', 'phone', e.target.value)} className={inputCls} /></Field>
          <Field label="Studio address"><input value={b.studio || ''} onChange={(e) => update('brand', 'studio', e.target.value)} className={inputCls} /></Field>
          <Field label="Hours"><input value={b.hours || ''} onChange={(e) => update('brand', 'hours', e.target.value)} className={inputCls} /></Field>
          <Field label="Instagram URL"><input value={b.social?.instagram || ''} onChange={(e) => updateNested('brand', ['social', 'instagram'], e.target.value)} className={`${inputCls} mono text-xs`} /></Field>
          <Field label="LinkedIn URL"><input value={b.social?.linkedin || ''} onChange={(e) => updateNested('brand', ['social', 'linkedin'], e.target.value)} className={`${inputCls} mono text-xs`} /></Field>
          <Field label="Edition / index strip (nav + footer)" className="md:col-span-2"><input value={b.index || ''} onChange={(e) => update('brand', 'index', e.target.value)} className={inputCls} /></Field>
        </div>
      </Card>

      {/* === HOMEPAGE HERO === */}
      <Card className="p-6 md:p-8 mb-6">
        <h2 className="display-thin text-2xl mb-1">Homepage hero</h2>
        <p className="mono-sm text-ink/65 text-[0.7rem] mb-6">Pretitle and body copy on the home page. Title segments and meta stay as JSON — they're typographically structured.</p>
        <div className="space-y-5">
          <Field label="Pretitle (small label above the title)"><input value={h.pretitle || ''} onChange={(e) => update('hero', 'pretitle', e.target.value)} className={inputCls} /></Field>
          <Field label="Body (paragraph under the title)"><textarea rows={3} value={h.body || ''} onChange={(e) => update('hero', 'body', e.target.value)} className={`${inputCls} resize-y leading-relaxed`} /></Field>
          <JsonField label="Meta (array of { label, value })" value={h.meta} onChange={(v) => update('hero', 'meta', v)} rows={6} />
        </div>
      </Card>

      {/* === ABOUT / STUDIO === */}
      <Card className="p-6 md:p-8 mb-6">
        <h2 className="display-thin text-2xl mb-1">About / Studio</h2>
        <p className="mono-sm text-ink/65 text-[0.7rem] mb-6">Founder bio, beliefs, timeline. Shown on the home and the Practice page.</p>
        <div className="space-y-5">
          <Field label="Short bio (founder section)"><textarea rows={5} value={s.shortBio || ''} onChange={(e) => update('studio', 'shortBio', e.target.value)} className={`${inputCls} resize-y leading-relaxed`} /></Field>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Founder portrait URL"><input value={s.founderPortrait || ''} onChange={(e) => update('studio', 'founderPortrait', e.target.value)} className={`${inputCls} mono text-xs`} /></Field>
            <Field label="Founder seated URL"><input value={s.founderSeated || ''} onChange={(e) => update('studio', 'founderSeated', e.target.value)} className={`${inputCls} mono text-xs`} /></Field>
          </div>
          <JsonField label="Beliefs (array of { num, line })" value={s.beliefs} onChange={(v) => update('studio', 'beliefs', v)} rows={7} />
          <JsonField label="Timeline (array of { num, year, h, b })" value={s.timeline} onChange={(v) => update('studio', 'timeline', v)} rows={9} />
        </div>
      </Card>

      {/* === MEMBERSHIP === */}
      <Card className="p-6 md:p-8 mb-6">
        <h2 className="display-thin text-2xl mb-1">Membership · The Circle</h2>
        <p className="mono-sm text-ink/65 text-[0.7rem] mb-6">Pitch, tiers, retreats and hero image. The hero image is also shown faintly behind the home hero.</p>
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Name"><input value={m.name || ''} onChange={(e) => update('membership', 'name', e.target.value)} className={inputCls} /></Field>
            <Field label="Pretitle"><input value={m.pretitle || ''} onChange={(e) => update('membership', 'pretitle', e.target.value)} className={inputCls} /></Field>
          </div>
          <Field label="Pitch (the membership intro paragraph)"><textarea rows={4} value={m.pitch || ''} onChange={(e) => update('membership', 'pitch', e.target.value)} className={`${inputCls} resize-y leading-relaxed`} /></Field>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Hero image URL (also shown on the home hero)"><input value={m.heroImage || ''} onChange={(e) => update('membership', 'heroImage', e.target.value)} className={`${inputCls} mono text-xs`} /></Field>
            <Field label="Founder portrait URL"><input value={m.founderPortrait || ''} onChange={(e) => update('membership', 'founderPortrait', e.target.value)} className={`${inputCls} mono text-xs`} /></Field>
          </div>
          <JsonField label="Tiers (array of { num, name, price, cadence, features, cta, highlighted })" value={m.tiers} onChange={(v) => update('membership', 'tiers', v)} rows={11} />
          <JsonField label="Retreats (array of { num, season, location, date, spots })" value={m.retreats} onChange={(v) => update('membership', 'retreats', v)} rows={7} />
        </div>
      </Card>

      {/* === ENQUIRE / CONTACT === */}
      <Card className="p-6 md:p-8 mb-6">
        <h2 className="display-thin text-2xl mb-1">Enquire / Contact</h2>
        <p className="mono-sm text-ink/65 text-[0.7rem] mb-6">Intro paragraph and channels list on the Enquire page.</p>
        <div className="space-y-5">
          <Field label="Intro"><textarea rows={3} value={c.intro || ''} onChange={(e) => update('contact', 'intro', e.target.value)} className={`${inputCls} resize-y leading-relaxed`} /></Field>
          <JsonField label="Channels (array of { num, label, value, href })" value={c.channels} onChange={(v) => update('contact', 'channels', v)} rows={8} />
        </div>
      </Card>

      {/* Toasts are rendered globally by ToastProvider */}
    </>
  )
}

function JsonField({ label, value, onChange, rows = 6, hint, embedded = false }) {
  const [text, setText] = useState(() => JSON.stringify(value ?? null, null, 2))
  const [err, setErr] = useState('')

  function handle(t) {
    setText(t)
    try {
      const parsed = JSON.parse(t)
      onChange(parsed)
      setErr('')
    } catch {
      setErr('Invalid JSON — fix it before Save.')
    }
  }

  const editor = (
    <>
      <textarea
        rows={rows}
        value={text}
        onChange={(e) => handle(e.target.value)}
        spellCheck={false}
        className={`${inputCls} font-mono text-xs leading-relaxed resize-y whitespace-pre`}
      />
      {err && <p className="mt-1 text-xs text-red-800">{err}</p>}
    </>
  )

  // When used inside CollectionEditor's FieldInput, the parent already
  // renders the <Field> wrapper — embedded skips it to avoid double labels.
  if (embedded) return editor
  return <Field label={label} hint={hint}>{editor}</Field>
}


/* ====== STUDIO — ANALYTICS ======================================= */
/* First-party, anonymous reading analytics — counts only, no PII.
   Pings from src/lib/analytics.js → POST /api/analytics/pageview/.
   This panel reads aggregates from GET /api/analytics/summary/. */

export function AnalyticsPanel() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    apiRequest('/analytics/summary/', { auth: true })
      .then((d) => { if (alive) { setData(d); setLoading(false) } })
      .catch((e) => { if (alive) { setError(e.message || 'Could not load.'); setLoading(false) } })
    return () => { alive = false }
  }, [])

  if (loading) {
    return (
      <>
        <PageTitle kicker="01 — STUDIO / ANALYTICS" title={<>Reading <span className="display-italic">analytics</span>.</>} subtitle="First-party, anonymous page-view counts." />
        <Card className="p-12 text-center text-ink/65 text-sm">Loading…</Card>
      </>
    )
  }
  if (error || !data) {
    return (
      <>
        <PageTitle kicker="01 — STUDIO / ANALYTICS" title="Analytics" />
        <Card className="p-12 text-center text-clay-600 text-sm">{error || 'Could not load.'}</Card>
      </>
    )
  }

  const maxDaily = Math.max(1, ...data.daily.map((d) => d.views))
  const maxPath  = data.topPaths[0]?.views || 1

  return (
    <>
      <PageTitle kicker="01 — STUDIO / ANALYTICS" title={<>Reading <span className="display-italic">analytics</span>.</>} subtitle="First-party, anonymous page-view counts — no IPs, no cookies, no third party." />

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <StatPill label="TOTAL VIEWS"  value={data.total}      hint="all time" />
        <StatPill label="LAST 7 DAYS"  value={data.last7Days}  hint="this week" />
        <StatPill label="LAST 30 DAYS" value={data.last30Days} hint="this month" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top paths */}
        <Card className="p-6">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="display-thin text-xl">Most-read pages</h2>
            <span className="mono-sm text-ink/65 text-[0.7rem] tabular">LAST 30 DAYS</span>
          </div>
          {data.topPaths.length === 0 ? (
            <p className="text-sm text-ink/65">No views yet.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {data.topPaths.map((row) => {
                const pct = Math.round((row.views / maxPath) * 100)
                return (
                  <li key={row.path} className="grid grid-cols-12 items-center gap-3 py-1.5">
                    <span className="col-span-7 truncate font-mono text-xs text-ink/85">{row.path}</span>
                    <span className="col-span-4 h-1.5 bg-ink/10 relative overflow-hidden">
                      <span className="absolute inset-y-0 left-0 bg-clay-500" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="col-span-1 mono-sm text-ink/65 tabular text-right">{row.views}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>

        {/* Daily chart */}
        <Card className="p-6">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="display-thin text-xl">Daily views</h2>
            <span className="mono-sm text-ink/65 text-[0.7rem] tabular">LAST 30 DAYS</span>
          </div>
          {data.daily.length === 0 ? (
            <p className="text-sm text-ink/65">No views yet.</p>
          ) : (
            <>
              <div className="flex items-end gap-1 h-40">
                {data.daily.map((d) => {
                  const pct = Math.max(2, Math.round((d.views / maxDaily) * 100))
                  return (
                    <div
                      key={d.date}
                      className="flex-1 bg-clay-500 hover:bg-clay-600 transition-colors"
                      style={{ height: `${pct}%` }}
                      title={`${d.date}: ${d.views} view${d.views === 1 ? '' : 's'}`}
                    />
                  )
                })}
              </div>
              <p className="mt-3 mono-sm text-ink/65 text-[0.7rem] tabular flex justify-between">
                <span>{data.daily[0]?.date || '—'}</span>
                <span>{data.daily[data.daily.length - 1]?.date || '—'}</span>
              </p>
            </>
          )}
        </Card>
      </div>
    </>
  )
}
