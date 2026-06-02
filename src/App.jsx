import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'

import Layout from './components/Layout.jsx'
import { Loading } from './components/AsyncBoundary.jsx'
import { useAnalytics } from './lib/analytics.js'

// === Public pages — EAGER ===
// Pages are tiny (1–8 KB each, ~75 KB total) so we bundle them into the
// main chunk for instant client-side navigation. The cost is a slightly
// larger initial download; the win is no loading flash between routes.
import Studio           from './pages/Studio.jsx'
import Heroes           from './pages/Heroes.jsx'
import About            from './pages/About.jsx'
import NotFound         from './pages/NotFound.jsx'
import Practice         from './pages/Practice.jsx'
import PracticeDetail   from './pages/PracticeDetail.jsx'
import Programmes       from './pages/Programmes.jsx'
import ProgrammeDetail  from './pages/ProgrammeDetail.jsx'
import Journal          from './pages/Journal.jsx'
import NoteDetail       from './pages/NoteDetail.jsx'
import Membership       from './pages/Membership.jsx'
import Retreats         from './pages/Retreats.jsx'
import Speaking         from './pages/Speaking.jsx'
import Shop             from './pages/Shop.jsx'
import ShopProduct      from './pages/ShopProduct.jsx'
import Enquire          from './pages/Enquire.jsx'
import { Privacy, Cookies, Terms } from './pages/LegalPage.jsx'

// === Admin / login — LAZY ===
// The admin bundle is 48 KB — the only chunk worth deferring. Public
// visitors never download it; only loaded when /admin or /login is hit.
const Login              = lazy(() => import('./pages/Login.jsx'))
const AdminLayout        = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.AdminLayout })))
const Overview           = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.Overview })))
const AnalyticsPanel     = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.AnalyticsPanel })))
const PostsPanel         = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.PostsPanel })))
const PracticePanel      = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.PracticePanel })))
const ProgrammesPanel    = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.ProgrammesPanel })))
const ShopPanel          = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.ShopPanel })))
const InquiriesPanel     = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.InquiriesPanel })))
const OrdersPanel        = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.OrdersPanel })))
const SiteDetailsPanel   = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.SiteDetailsPanel })))
const NavSettings        = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.NavSettings })))
const NotificationSettings = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.NotificationSettings })))
const MediaPanel         = lazy(() => import('./pages/Admin.jsx').then(m => ({ default: m.MediaPanel })))

function ScrollToTopOnNav() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login'
  useAnalytics()  // anonymous page-view ping on public route changes

  let content
  if (isAdminRoute) {
    content = (
      <>
        <ScrollToTopOnNav />
        <Suspense fallback={<Loading />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="analytics" element={<AnalyticsPanel />} />
              <Route path="posts" element={<PostsPanel />} />
              <Route path="practice" element={<PracticePanel />} />
              <Route path="programmes" element={<ProgrammesPanel />} />
              <Route path="shop" element={<ShopPanel />} />
              <Route path="inquiries" element={<InquiriesPanel />} />
              <Route path="orders" element={<OrdersPanel />} />
              <Route path="settings/site" element={<SiteDetailsPanel />} />
              <Route path="settings/nav" element={<NavSettings />} />
              <Route path="settings/notification" element={<NotificationSettings />} />
              <Route path="settings/media" element={<MediaPanel />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    )
  } else {
    // Public routes — no Suspense because every page is eager-bundled.
    content = (
      <Layout>
        <ScrollToTopOnNav />
        <AnimatePresence mode="popLayout">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Studio />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/about" element={<About />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/:slug" element={<PracticeDetail />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/programmes/:slug" element={<ProgrammeDetail />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<NoteDetail />} />
            {/* Legacy routes — /notes and /blog merged into /journal */}
            <Route path="/notes" element={<Navigate to="/journal" replace />} />
            <Route path="/blog" element={<Navigate to="/journal" replace />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ShopProduct />} />
            <Route path="/enquire" element={<Enquire />} />
            {/* Legal */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/terms" element={<Terms />} />
            {/* Anything else → 404 (still inside Layout for consistent chrome) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    )
  }

  return <MotionConfig reducedMotion="user">{content}</MotionConfig>
}
