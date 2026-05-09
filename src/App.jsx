import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Studio from './pages/Studio.jsx'
import Practice from './pages/Practice.jsx'
import PracticeDetail from './pages/PracticeDetail.jsx'
import IndexPage from './pages/Index.jsx'
import IndexDetail from './pages/IndexDetail.jsx'
import Notes from './pages/Notes.jsx'
import NoteDetail from './pages/NoteDetail.jsx'
import Membership from './pages/Membership.jsx'
import Shop from './pages/Shop.jsx'
import ShopProduct from './pages/ShopProduct.jsx'
import Enquire from './pages/Enquire.jsx'
import Blog from './pages/Blog.jsx'
import Login from './pages/Login.jsx'
import {
  AdminLayout,
  Overview,
  PostsPanel,
  ProjectsPanel,
  PracticePanel,
  ShopPanel,
  InquiriesPanel,
  OrdersPanel,
  NavSettings,
  NotificationSettings,
  MediaPanel,
} from './pages/Admin.jsx'

function ScrollToTopOnNav() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login'

  if (isAdminRoute) {
    return (
      <>
        <ScrollToTopOnNav />
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="posts" element={<PostsPanel />} />
            <Route path="projects" element={<ProjectsPanel />} />
            <Route path="practice" element={<PracticePanel />} />
            <Route path="shop" element={<ShopPanel />} />
            <Route path="inquiries" element={<InquiriesPanel />} />
            <Route path="orders" element={<OrdersPanel />} />
            <Route path="settings/nav" element={<NavSettings />} />
            <Route path="settings/notification" element={<NotificationSettings />} />
            <Route path="settings/media" element={<MediaPanel />} />
          </Route>
        </Routes>
      </>
    )
  }

  return (
    <Layout>
      <ScrollToTopOnNav />
      <AnimatePresence mode="popLayout">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Studio />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:slug" element={<PracticeDetail />} />
          <Route path="/index" element={<IndexPage />} />
          <Route path="/index/:slug" element={<IndexDetail />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:slug" element={<NoteDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<ShopProduct />} />
          <Route path="/enquire" element={<Enquire />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
