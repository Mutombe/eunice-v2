import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { ArrowRight, EnvelopeSimple, Lock as LockIcon, ShieldCheck } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import useLocalStorage from '../hooks/useLocalStorage.js'

export const ADMIN_AUTH_KEY = 'eunice-v2.adminAuth'

export default function Login() {
  const [auth, setAuth] = useLocalStorage(ADMIN_AUTH_KEY, null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  if (auth?.loggedIn) return <Navigate to="/admin" replace />

  function onSubmit(e) {
    e.preventDefault()
    if (!email || !password) return
    setBusy(true)
    window.setTimeout(() => {
      const next = { loggedIn: true, email, since: new Date().toISOString() }
      try { window.localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(next)) } catch {}
      setAuth(next)
      navigate('/admin', { replace: true })
    }, 600)
  }

  return (
    <PageTransition>
      <section className="container-edge pt-20 md:pt-28 pb-32 grid md:grid-cols-12 gap-10 md:gap-14 items-start">
        {/* Press title */}
        <div className="md:col-span-6">
          <span className="mono text-clay-500">— Studio · Private entry</span>
          <Reveal delay={0.05}>
            <h1 className="mt-6 display-thin text-[clamp(3rem,9vw,8rem)] leading-[0.9]">
              The <br /><span className="display-italic">studio</span><br />door.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg text-ink/85 leading-relaxed">
              For Eunice and the studio team. Sign in to manage projects, the index, the shop, and the small details that keep the atelier readable.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 mono-sm text-ink/55 inline-flex items-center gap-2">
              <ShieldCheck size={13} />
              <span>MOCKUP · NO DATA IS SENT</span>
            </div>
          </Reveal>
        </div>

        {/* Card */}
        <div className="md:col-span-6 md:col-start-8">
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="bg-paper-warm border border-ink/15 p-8 md:p-10"
              style={{ boxShadow: '0 30px 60px -30px rgba(26,26,25,0.18)' }}
            >
              <span className="mono text-ink/55">01 — Identify</span>
              <h2 className="mt-2 display-thin text-3xl md:text-4xl">Sign in.</h2>

              <div className="mt-8 space-y-6">
                <Field
                  label="Email"
                  icon={<EnvelopeSimple size={14} />}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="studio@eunicedecampi.com"
                  autoComplete="email"
                />
                <Field
                  label="Password"
                  icon={<LockIcon size={14} />}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <div className="mt-6 flex items-center justify-between mono-sm text-ink/55 text-[0.6rem]">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-ink-500" />
                  KEEP ME SIGNED IN
                </label>
                <a className="atelier-link cursor-pointer">FORGOT?</a>
              </div>

              <button
                type="submit"
                disabled={busy || !email || !password}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink-500 text-paper-warm hover:bg-clay-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mono"
              >
                {busy ? 'OPENING THE STUDIO…' : 'ENTER THE STUDIO'}
                {!busy && <ArrowRight size={12} />}
              </button>

              <p className="mt-5 mono-sm text-center text-ink/55 text-[0.55rem]">
                USE ANY EMAIL + PASSWORD — THIS IS A MOCKUP
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center justify-between mono-sm text-ink/55 text-[0.55rem]">
              <Link to="/" className="atelier-link">← RETURN TO PUBLIC SITE</Link>
              <span className="tabular">v2 · MMXXVI</span>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}

function Field({ label, icon, ...props }) {
  return (
    <label className="block">
      <span className="mono-sm text-ink/55 text-[0.55rem] mb-2 inline-flex items-center gap-2">
        {icon} {label}
      </span>
      <input
        {...props}
        className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2.5 text-base placeholder:text-ink/30"
      />
    </label>
  )
}
