import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import ScrollToTopBtn from './ScrollToTopBtn.jsx'
import GridOverlay from './GridOverlay.jsx'
import Ticker from './Ticker.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import NotificationBar from './NotificationBar.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink relative drafting-surface">
      <ScrollProgress />
      <GridOverlay />
      <NotificationBar />
      <Nav />
      <main className="flex-1 pt-[64px]">{children}</main>
      <Ticker />
      <Footer />
      <ScrollToTopBtn />
    </div>
  )
}
