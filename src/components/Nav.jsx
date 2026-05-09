import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { brand, navLinks } from '../data/siteData.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-ink/15 transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <nav className="container-edge h-[64px] flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="display-thin text-2xl tracking-tight">
            Eunice De Campi
          </span>
          <span className="hidden md:inline mono-sm text-ink/55">{brand.index}</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `mono inline-flex items-center gap-1.5 transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-ink/45 hover:text-ink'
                  }`
                }
              >
                <span className="text-[0.62rem] opacity-70">{link.num}</span> {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/login" className="hidden lg:inline-flex items-center gap-2 mono text-clay-500 hover:text-ink transition-colors">
          Sign in <span className="text-clay-500">→</span>
        </Link>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-ink" aria-label="Menu">
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-paper border-t border-ink/15"
          >
            <ul className="container-edge py-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to} className="flex items-baseline gap-4">
                  <span className="mono-sm text-ink/40 w-8">{link.num}</span>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className="display-thin text-3xl"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
