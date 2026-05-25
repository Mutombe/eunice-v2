import { Link, useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import { Loading, LoadError } from '../components/AsyncBoundary.jsx'
import { useCollection } from '../lib/hooks.js'

/* Programme sales page — problem → transformation → modules → inclusions → CTA.
   Content comes from /api/programmes/<slug>/ via SiteSettings-like singleton. */

export default function ProgrammeDetail() {
  const { slug } = useParams()
  const { items: programmes, loading, error } = useCollection('programmes')

  if (loading) return <Loading />
  if (error) return <LoadError />

  const p = programmes.find((x) => x.slug === slug)
  if (!p) return (
    <PageTransition>
      <section className="container-edge py-40 text-center">
        <p className="mono text-clay-500 tracking-[0.2em]">— Not currently listed</p>
        <h1 className="mt-6 display-thin text-4xl md:text-6xl">
          That programme is not <span className="display-italic">open just now.</span>
        </h1>
        <Link to="/programmes" className="mt-10 inline-block atelier-link mono">
          ← Back to programmes
        </Link>
      </section>
    </PageTransition>
  )

  return (
    <PageTransition>
      <Seo
        title={p.title}
        path={`/programmes/${p.slug}`}
        description={p.lede}
        type="article"
        image={p.cover}
      />

      {/* === Masthead === */}
      <section className="relative">
        {p.cover && (
          <div className="absolute inset-0 -z-10">
            <img src={p.cover} alt="" className="w-full h-full object-cover opacity-25" loading="eager" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/80 to-paper" />
          </div>
        )}
        <div className="container-edge pt-20 md:pt-28 pb-16">
          <Heading num={p.num} label={p.discipline || 'Programme'} />
          <h1 className="mt-10 display-thin text-[clamp(2.75rem,9vw,9rem)] leading-[0.9]">
            {p.title}
            {p.italicTitle && (
              <span className="block display-italic text-3xl md:text-5xl mt-4 text-ink/70 max-w-3xl">
                — {p.italicTitle}
              </span>
            )}
          </h1>
          {p.lede && (
            <p className="mt-10 display-thin text-xl md:text-2xl text-ink/85 max-w-3xl leading-[1.35]">
              {p.lede}
            </p>
          )}

          {/* Logistics inline */}
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 max-w-4xl">
            {p.duration && (
              <div>
                <dt className="mono-sm text-ink/50 tabular">— Duration</dt>
                <dd className="mt-1 text-ink/85">{p.duration}</dd>
              </div>
            )}
            {p.cadence && (
              <div>
                <dt className="mono-sm text-ink/50 tabular">— Cadence</dt>
                <dd className="mt-1 text-ink/85">{p.cadence}</dd>
              </div>
            )}
            {p.format && (
              <div>
                <dt className="mono-sm text-ink/50 tabular">— Format</dt>
                <dd className="mt-1 text-ink/85">{p.format}</dd>
              </div>
            )}
            {p.price && (
              <div>
                <dt className="mono-sm text-ink/50 tabular">— From</dt>
                <dd className="mt-1 text-ink/85 tabular">{p.price}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* === Problem === */}
      {(p.problem || []).length > 0 && (
        <section className="border-t border-ink/15">
          <div className="container-edge py-16 md:py-24 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="mono text-clay-500">— Who this is for</span>
              <p className="mt-6 display-thin text-3xl md:text-4xl leading-tight max-w-sm">
                If the room you have <span className="display-italic">is not the room</span> you live in.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-7">
              {p.problem.map((para, i) => (
                <Reveal key={i}>
                  <p className="text-lg md:text-xl text-ink/85 leading-relaxed">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Transformation === */}
      {(p.transformation || []).length > 0 && (
        <section className="border-t border-ink/15 bg-paper-warm">
          <div className="container-edge py-16 md:py-24 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="mono text-clay-500">— What changes</span>
              <p className="mt-6 display-thin text-3xl md:text-4xl leading-tight max-w-sm">
                Not productivity. <span className="display-italic">Accuracy.</span>
              </p>
            </div>
            <div className="lg:col-span-8 space-y-7">
              {p.transformation.map((para, i) => (
                <Reveal key={i}>
                  <p className="text-lg md:text-xl text-ink/85 leading-relaxed">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Modules === */}
      {(p.modules || []).length > 0 && (
        <section className="border-t border-ink/15">
          <div className="container-edge py-16 md:py-24">
            <Heading num="II" label="The arc" />
            <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-14">
              {p.modules.map((m) => (
                <Reveal key={m.num + m.title}>
                  <div className="border-t border-ink/20 pt-6">
                    <div className="flex items-center gap-3 mono-sm text-clay-500">
                      <span className="tabular">{m.num}</span>
                      <span className="w-6 h-px bg-clay-500/40" />
                    </div>
                    <h3 className="mt-3 display-thin text-2xl md:text-3xl leading-tight">{m.title}</h3>
                    <p className="mt-4 text-ink/80 leading-relaxed">{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Inclusions === */}
      {(p.inclusions || []).length > 0 && (
        <section className="border-t border-ink/15 bg-paper-warm">
          <div className="container-edge py-16 md:py-24">
            <Heading num="III" label="What is included" />
            <ul className="mt-10 divide-y divide-ink/15 max-w-4xl">
              {p.inclusions.map((inc, i) => (
                <li key={i} className="py-6 grid grid-cols-12 gap-4 items-baseline">
                  <span className="col-span-1 mono-sm text-clay-500 tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="col-span-4 display-thin text-2xl md:text-3xl">{inc.label}</span>
                  <span className="col-span-7 text-ink/80 leading-relaxed">{inc.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* === CTA === */}
      <section className="bg-ink-500 text-paper-warm">
        <div className="container-edge py-24 md:py-32 text-center">
          <p className="mono text-paper-warm/65 tracking-[0.2em]">— By application</p>
          <h2 className="mt-6 display-thin text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
            {p.title} is <span className="display-italic">opened in cohorts.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-paper-warm/80 leading-relaxed">
            A short application is followed by a brief conversation. Where the fit is right, an invitation follows.
          </p>
          {p.price && (
            <p className="mt-6 mono-sm tabular text-paper-warm/65">— {p.price}</p>
          )}
          <Link
            to={p.ctaTo || '/enquire?subject=programme'}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-paper-warm text-ink-500 hover:bg-clay-300 transition-colors mono"
          >
            {p.ctaLabel || 'Apply to this programme'} →
          </Link>
          <div className="mt-10">
            <Link to="/programmes" className="atelier-link mono-sm text-paper-warm/65 hover:text-paper-warm">
              ← All programmes
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
