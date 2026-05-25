import { useEffect } from 'react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import ScrollToTopBtn from './ScrollToTopBtn.jsx'
import GridOverlay from './GridOverlay.jsx'
import Ticker from './Ticker.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import NotificationBar from './NotificationBar.jsx'
import CookieConsent from './CookieConsent.jsx'
import { prefetchCollection } from '../lib/hooks.js'

export default function Layout({ children }) {
  // Warm the cache for the four main content collections in the background.
  // By the time someone clicks Practice / Programmes / Journal / Shop the
  // data is already loaded — no loading flash on navigation.
  useEffect(() => {
    ;['practice', 'programmes', 'journal', 'shop'].forEach(prefetchCollection)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink relative drafting-surface">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <GridOverlay />
      <NotificationBar />
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1 pt-[64px] focus:outline-none">{children}</main>
      <Ticker />
      <Footer />
      <ScrollToTopBtn />
      <CookieConsent />
    </div>
  )
}
