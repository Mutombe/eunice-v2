import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Heading from '../components/Heading.jsx'
import { useSettings } from '../lib/settings.jsx'

/* Shared layout for the three legal pages (Privacy / Cookies / Terms).
   Each route picks the relevant document key out of SiteSettings.legal.
   Editable from the admin. */

export default function LegalPage({ docKey, path, num }) {
  const { legal } = useSettings()
  const doc = legal?.[docKey] || {}
  const title = doc.title || docKey.charAt(0).toUpperCase() + docKey.slice(1)

  return (
    <PageTransition>
      <Seo
        title={title}
        path={path}
        description={doc.intro || `${title} — the studio's policies, written plainly.`}
      />

      <section className="container-edge pt-20 md:pt-28 pb-12 md:pb-16">
        <Heading num={num} label={`The studio · ${title}`} />
        <h1 className="mt-10 display-thin text-[clamp(2.5rem,8vw,7rem)] leading-[0.9]">
          {title}
        </h1>
        {doc.updated && (
          <p className="mt-6 mono-sm text-ink/65">Last revised · {doc.updated}</p>
        )}
        {doc.intro && (
          <p className="mt-10 display-thin text-xl md:text-2xl text-ink/80 max-w-3xl leading-[1.35]">
            {doc.intro}
          </p>
        )}
      </section>

      <section className="border-t border-ink/15">
        <div className="container-edge py-16 md:py-24 grid lg:grid-cols-12 gap-12">
          {/* Table of contents — nav element (in-page anchors) */}
          <nav aria-label="Document sections" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <span className="mono text-clay-500">— Contents</span>
              <ul className="mt-5 space-y-2">
                {(doc.sections || []).map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className="atelier-link mono-sm text-ink/80 hover:text-clay-500"
                    >
                      <span className="tabular text-ink/40 mr-2">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Body */}
          <div className="lg:col-span-9 space-y-12">
            {(doc.sections || []).map((s, i) => (
              <section key={i} id={`section-${i}`} className="border-t border-ink/15 pt-8 first:border-t-0 first:pt-0 scroll-mt-28">
                <div className="flex items-center gap-3 mono-sm text-clay-500">
                  <span className="tabular">{String(i + 1).padStart(2, '0')}</span>
                  <span className="w-6 h-px bg-clay-500/40" />
                </div>
                <h2 className="mt-3 display-thin text-3xl md:text-4xl leading-tight">{s.title}</h2>
                <div className="mt-5 space-y-4">
                  {(s.body || []).map((para, j) => (
                    <p key={j} className="text-ink/85 text-lg leading-relaxed">{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge py-16 md:py-24 border-t border-ink/15">
        <div className="grid md:grid-cols-3 gap-6 items-baseline">
          <Link to="/privacy" className="atelier-link mono text-ink/80 hover:text-clay-500">— Privacy</Link>
          <Link to="/cookies" className="atelier-link mono text-ink/80 hover:text-clay-500">— Cookies</Link>
          <Link to="/terms" className="atelier-link mono text-ink/80 hover:text-clay-500">— Terms</Link>
        </div>
        <p className="mt-10 max-w-2xl text-ink/70 leading-relaxed">
          Questions about any of the above are welcome — write to{' '}
          <a href="mailto:studio@eunicedecampi.com" className="atelier-link text-ink hover:text-clay-500">
            studio@eunicedecampi.com
          </a>{' '}
          and a considered reply will follow.
        </p>
      </section>
    </PageTransition>
  )
}

// Thin wrappers so each legal route has its own component name + path.
export function Privacy()  { return <LegalPage docKey="privacy" path="/privacy" num="P-01" /> }
export function Cookies()  { return <LegalPage docKey="cookies" path="/cookies" num="P-02" /> }
export function Terms()    { return <LegalPage docKey="terms"   path="/terms"   num="P-03" /> }
