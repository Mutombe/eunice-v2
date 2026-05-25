import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import { useSettings } from '../lib/settings.jsx'

/* Retreats — extracted from Membership, expanded into its own page.
   Upcoming retreats, format, philosophy. Content from SiteSettings.retreats. */

export default function Retreats() {
  const { retreats } = useSettings()

  return (
    <PageTransition>
      <Seo
        title="Retreats"
        path="/retreats"
        description={retreats.lede || 'Twice a year — a sourced house, a closed door, a long table. Eight guests at most.'}
      />

      {/* === Masthead === */}
      <section className="relative">
        {retreats.image && (
          <div className="absolute inset-0 -z-10">
            <img src={retreats.image} alt="" className="w-full h-full object-cover opacity-30" loading="eager" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/75 to-paper" />
          </div>
        )}
        <div className="container-edge pt-20 md:pt-28 pb-12 md:pb-16">
          <Heading num="06" label={retreats.edition || 'Retreats · MMXXVI'} />
          {retreats.pretitle && (
            <p className="mt-10 mono text-clay-500 tracking-[0.2em]">— {retreats.pretitle}</p>
          )}
          <h1 className="mt-6 display-thin text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.9]">
            {retreats.title}{' '}
            <span className="display-italic">{retreats.titleEm}</span>
            {retreats.title2 && <><br />{retreats.title2}</>}
          </h1>
          {retreats.lede && (
            <p className="mt-10 display-thin text-xl md:text-2xl text-ink/80 max-w-3xl leading-[1.35]">
              {retreats.lede}
            </p>
          )}
        </div>
      </section>

      {/* === Philosophy === */}
      {(retreats.philosophy || []).length > 0 && (
        <section className="border-t border-ink/15">
          <div className="container-edge py-16 md:py-24 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="mono text-clay-500">— On retreats</span>
              <p className="mt-6 mono-sm text-ink/65 max-w-xs">
                The studio works in seasons, not sprints. A retreat is the practice, condensed.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-6">
              {retreats.philosophy.map((para, i) => (
                <Reveal key={i}>
                  <p className="text-lg md:text-xl text-ink/85 leading-relaxed">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Format === */}
      {(retreats.format || []).length > 0 && (
        <section className="border-t border-ink/15 bg-paper-warm">
          <div className="container-edge py-16 md:py-24">
            <Heading num="II" label="What is included" />
            <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-12">
              {retreats.format.map((f) => (
                <Reveal key={f.num + f.label}>
                  <div className="border-t border-ink/20 pt-6">
                    <div className="flex items-center gap-3 mono-sm text-clay-500">
                      <span className="tabular">{f.num}</span>
                      <span className="w-6 h-px bg-clay-500/40" />
                    </div>
                    <h3 className="mt-3 display-thin text-2xl md:text-3xl">{f.label}</h3>
                    <p className="mt-3 text-ink/80 leading-relaxed">{f.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Upcoming retreats === */}
      {(retreats.upcoming || []).length > 0 && (
        <section className="border-t border-ink/15">
          <div className="container-edge py-16 md:py-24">
            <Heading num="III" label="The current list" />
            <div className="mt-12 space-y-px bg-ink/15">
              {retreats.upcoming.map((r, i) => (
                <Reveal key={i}>
                  <article className="bg-paper grid lg:grid-cols-12 gap-y-4 gap-x-6 px-1 py-10 md:py-14 hover:bg-paper-warm transition-colors">
                    <div className="lg:col-span-2 mono-sm text-clay-500 tabular">
                      {String(i + 1).padStart(2, '0')} / {String(retreats.upcoming.length).padStart(2, '0')}
                    </div>
                    <div className="lg:col-span-6">
                      <h3 className="display-thin text-3xl md:text-5xl leading-[1.05]">{r.title}</h3>
                      <p className="mt-3 mono-sm text-ink/65">{r.dates} · {r.where}{r.length ? ` · ${r.length}` : ''}</p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
                      <span className="mono-sm text-ink/65">{r.status}</span>
                      <Link
                        to={r.applyTo || '/enquire?subject=retreat'}
                        className="mono atelier-link"
                      >
                        Apply →
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === CTA === */}
      <section className="bg-ink-500 text-paper-warm">
        <div className="container-edge py-24 md:py-32 text-center">
          <p className="mono text-paper-warm/65 tracking-[0.2em]">— A note</p>
          <h2 className="mt-6 display-thin text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
            The retreat list is held <span className="display-italic">privately.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-paper-warm/80 leading-relaxed">
            Write to be added. A short conversation follows. Where the room fits, an invitation arrives.
          </p>
          <Link
            to={retreats.cta?.to || '/enquire?subject=retreat'}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-paper-warm text-ink-500 hover:bg-clay-300 transition-colors mono"
          >
            {retreats.cta?.label || 'Apply to the retreat list'} →
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
