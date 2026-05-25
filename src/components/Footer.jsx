import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  InstagramLogo, LinkedinLogo, EnvelopeSimple, Phone, MapPin, ArrowRight,
} from '@phosphor-icons/react'
import { useSettings } from '../lib/settings.jsx'
import { apiRequest } from '../lib/api.js'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const year = new Date().getFullYear()
  const { brand, navLinks } = useSettings()

  async function submit(e) {
    e.preventDefault()
    if (!email || busy) return
    setBusy(true); setError('')
    try {
      await apiRequest('/newsletter/', { method: 'POST', body: { email } })
      setDone(true)
    } catch (err) {
      // Treat "already subscribed" as a soft success — the visitor doesn't
      // need to see a scary error when their email is already on the list.
      const msg = err?.message || ''
      if (/already|exists|unique/i.test(msg)) {
        setDone(true)
      } else {
        setError(msg || 'Could not subscribe just now. Please try again.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <footer className="bg-ink-500 text-paper-warm relative">
      {/* === Top hairline + index === */}
      <div className="container-edge pt-10 pb-6">
        <div className="flex items-baseline justify-between mono text-paper-warm/65 tabular">
          <span>{brand.index}</span>
          <span className="hidden md:inline">END OF DOCUMENT · SCROLL UP TO RETURN</span>
          <span className="hidden md:inline">EDC—STUDIO 2026</span>
        </div>
      </div>

      <div className="container-edge pt-16 md:pt-20 pb-10">
        {/* === Wordmark + script === */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 mb-16">
          <div className="lg:col-span-7">
            <Link to="/" className="block">
              <h2 className="display-thin text-[clamp(3.5rem,11vw,11rem)] leading-[0.88]">
                Eunice<br /><span className="display-italic">De Campi.</span>
              </h2>
            </Link>
          </div>
          <div className="lg:col-span-5 lg:pl-10 lg:border-l border-paper-warm/15">
            <p className="mono text-paper-warm/65">— Studio statement</p>
            <p className="display-thin text-2xl md:text-3xl leading-[1.2] mt-4 max-w-md">
              An atelier — for interiors, mindset, and the architecture of a considered life.
            </p>
          </div>
        </div>

        {/* === Status / index / reach grid === */}
        <div className="hairline bg-paper-warm/15 my-12"></div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6">
          {/* Index */}
          <div className="lg:col-span-3">
            <span className="mono text-paper-warm/65">— Index</span>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to} className="flex items-baseline gap-3">
                  <span className="mono-sm text-paper-warm/65 w-6 tabular">{l.num}</span>
                  <Link to={l.to} className="atelier-link text-paper-warm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach the studio */}
          <div className="lg:col-span-4">
            <span className="mono text-paper-warm/65">— Reach the studio</span>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${brand.email}`} className="atelier-link text-paper-warm inline-flex items-center gap-3 group">
                  <EnvelopeSimple size={15} className="text-paper-warm/65 group-hover:text-clay-300 transition-colors" />
                  <span>{brand.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="atelier-link text-paper-warm inline-flex items-center gap-3 group">
                  <Phone size={15} className="text-paper-warm/65 group-hover:text-clay-300 transition-colors" />
                  <span className="tabular">{brand.phone}</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-3 text-paper-warm/85">
                  <MapPin size={15} className="text-paper-warm/65" />
                  <span>{brand.studio}</span>
                </span>
              </li>
            </ul>
            <p className="mt-6 mono-sm text-paper-warm/65">{brand.hours}</p>

            {/* Social */}
            <div className="mt-8 pt-8 border-t border-paper-warm/15 flex items-center gap-4">
              <span className="mono text-paper-warm/65">Elsewhere</span>
              <a href={brand.social.instagram} target="_blank" rel="noreferrer"
                className="w-9 h-9 border border-paper-warm/30 flex items-center justify-center text-paper-warm/85 hover:bg-paper-warm hover:text-ink-500 transition-all"
                aria-label="Instagram">
                <InstagramLogo size={15} />
              </a>
              <a href={brand.social.linkedin} target="_blank" rel="noreferrer"
                className="w-9 h-9 border border-paper-warm/30 flex items-center justify-center text-paper-warm/85 hover:bg-paper-warm hover:text-ink-500 transition-all"
                aria-label="LinkedIn">
                <LinkedinLogo size={15} />
              </a>
            </div>
          </div>

          {/* The private letter */}
          <div className="lg:col-span-5 lg:pl-10 lg:border-l border-paper-warm/15">
            <span className="mono text-paper-warm/65">— The private letter</span>
            <p className="display-thin text-2xl md:text-3xl mt-3 leading-[1.15]">
              Sent only when there is something <span className="display-italic">worth saying.</span>
            </p>
            <p className="mt-3 text-paper-warm/65 text-sm leading-relaxed max-w-sm">
              No schedule, no marketing — twelve letters a year, posted on Sundays.
            </p>
            {!done ? (
              <>
                <form onSubmit={submit} className="mt-6 flex gap-3 items-end">
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@somewhere.com"
                    disabled={busy}
                    className="flex-1 bg-transparent border-b border-paper-warm/30 focus:border-paper-warm outline-none py-2 text-paper-warm placeholder:text-paper-warm/30 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="mono text-clay-300 hover:text-paper-warm whitespace-nowrap inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    {busy ? 'Subscribing…' : <>Subscribe <ArrowRight size={11} /></>}
                  </button>
                </form>
                {error && (
                  <p className="mt-3 mono-sm text-clay-300/80">— {error}</p>
                )}
              </>
            ) : (
              <p className="display-italic text-2xl mt-4 text-clay-300">Thank you. We'll write when there is something worth saying.</p>
            )}

            <Link
              to="/enquire"
              className="mt-10 inline-flex items-center gap-2 mono text-paper-warm border border-paper-warm/30 px-5 py-3 hover:bg-paper-warm hover:text-ink-500 transition-all"
            >
              Begin a private conversation <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* === Currently — atelier status block === */}
      <div className="container-edge pb-10">
        <div className="hairline bg-paper-warm/15 mb-8"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: 'I',   k: 'Currently making', v: 'House on Park · Phase II' },
            { num: 'II',  k: 'Currently reading', v: 'Bachelard, The Poetics of Space' },
            { num: 'III', k: 'Currently quiet', v: 'December retreat list — closed' },
          ].map((item) => (
            <div key={item.num} className="border-t border-paper-warm/15 pt-4">
              <div className="flex items-baseline gap-3 mono-sm text-paper-warm/65">
                <span className="tabular">{item.num}</span>
                <span>{item.k}</span>
              </div>
              <p className="display-thin text-xl md:text-2xl mt-2 leading-tight">{item.v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === Secondary nav — pages that live below the top nav === */}
      <div className="container-edge pb-8">
        <div className="hairline bg-paper-warm/15 mb-6"></div>
        <div className="grid md:grid-cols-12 gap-y-3 gap-x-6 mono-sm">
          <div className="md:col-span-3 text-paper-warm/65">— Beyond the top nav</div>
          <div className="md:col-span-9 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <Link to="/speaking" className="atelier-link text-paper-warm/85 hover:text-paper-warm">Speaking</Link>
            <Link to="/retreats" className="atelier-link text-paper-warm/85 hover:text-paper-warm">Retreats</Link>
            <Link to="/privacy"  className="atelier-link text-paper-warm/85 hover:text-paper-warm">Privacy</Link>
            <Link to="/cookies"  className="atelier-link text-paper-warm/85 hover:text-paper-warm">Cookies</Link>
            <Link to="/terms"    className="atelier-link text-paper-warm/85 hover:text-paper-warm">Terms</Link>
          </div>
        </div>
      </div>

      {/* === Colophon — printer's mark === */}
      <div className="container-edge pb-10">
        <div className="hairline bg-paper-warm/15 mb-6"></div>
        <div className="grid md:grid-cols-12 gap-4 items-baseline mono-sm text-paper-warm/65">
          <div className="md:col-span-3 tabular">{brand.index}</div>
          <div className="md:col-span-3 tabular">First impression · MMXXVI</div>
          <div className="md:col-span-3 tabular">Set in Fraunces &amp; Figtree</div>
          <div className="md:col-span-3 tabular md:text-right flex items-baseline gap-3 md:justify-end flex-wrap">
            <Link to="/login" className="atelier-link text-paper-warm/65 hover:text-paper-warm">STUDIO · SIGN IN</Link>
            <span className="text-paper-warm/25">·</span>
            <span>© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
