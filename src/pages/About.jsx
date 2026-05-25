import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import { useSettings } from '../lib/settings.jsx'

/* About / Story — the long-form page about Eunice.
   Replaces a one-line bio with a considered story, a stated philosophy,
   and a credentials list. All content comes from SiteSettings.about so
   it is editable from the admin without code. */

export default function About() {
  const { about } = useSettings()

  return (
    <PageTransition>
      <Seo
        title="About"
        path="/about"
        description={about.lede || 'Coach, writer, and interior wellbeing designer — the story of the practice.'}
      />

      {/* === Masthead === */}
      <section className="container-edge pt-20 md:pt-28 pb-12 md:pb-16">
        <Heading num="02" label={about.edition || 'Story · The architect'} />
        {about.pretitle && (
          <p className="mt-10 mono text-clay-500 tracking-[0.2em]">— {about.pretitle}</p>
        )}
        <h1 className="mt-6 display-thin text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.9]">
          {about.title}{' '}
          <span className="display-italic">{about.titleEm}</span>
          {about.title2 && <><br />{about.title2}</>}
        </h1>
        {about.lede && (
          <p className="mt-10 display-thin text-xl md:text-2xl text-ink/80 max-w-3xl leading-[1.35]">
            {about.lede}
          </p>
        )}
      </section>

      {/* === Story + portrait === */}
      <section className="border-t border-ink/15">
        <div className="container-edge py-16 md:py-24 grid lg:grid-cols-12 gap-y-10 gap-x-12">
          <div className="lg:col-span-5">
            {about.image && (
              <div className="lg:sticky lg:top-28">
                <div className="img-cover overflow-hidden">
                  <img
                    src={about.image}
                    alt={about.imageCaption || 'The studio'}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {about.imageCaption && (
                  <p className="mt-3 mono-sm text-ink/65">— {about.imageCaption}</p>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-7 space-y-7">
            <span className="mono text-clay-500">— The story</span>
            {(about.story || []).map((para, i) => (
              <Reveal key={i}>
                <p className="text-lg md:text-xl text-ink/85 leading-relaxed">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* === Philosophy === */}
      {(about.philosophy || []).length > 0 && (
        <section className="border-t border-ink/15">
          <div className="container-edge py-16 md:py-24">
            <Heading num="II" label="A stated philosophy" />
            <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-14">
              {about.philosophy.map((p) => (
                <Reveal key={p.num + p.title}>
                  <div>
                    <div className="flex items-center gap-3 mono-sm text-clay-500">
                      <span className="tabular">{p.num}</span>
                      <span className="w-6 h-px bg-clay-500/40" />
                    </div>
                    <h3 className="mt-4 display-thin text-3xl md:text-4xl leading-[1.05]">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-ink/80 leading-relaxed">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Credentials === */}
      {(about.credentials || []).length > 0 && (
        <section className="border-t border-ink/15 bg-paper-warm">
          <div className="container-edge py-16 md:py-24">
            <Heading num="III" label="Training & record" />
            <ul className="mt-10 space-y-5 max-w-2xl">
              {about.credentials.map((c, i) => (
                <li key={i} className="flex items-baseline gap-5 text-ink/85 text-lg leading-relaxed">
                  <span className="mono-sm text-clay-500 tabular shrink-0">
                    — {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* === CTA === */}
      <section className="container-edge py-24 md:py-32 text-center">
        <h2 className="display-thin text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
          For the long, considered <span className="display-italic">work,</span>
        </h2>
        <Link
          to={about.cta?.to || '/enquire'}
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono"
        >
          {about.cta?.label || 'Begin a private conversation'} →
        </Link>
      </section>
    </PageTransition>
  )
}
