import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import { LoadError } from '../components/AsyncBoundary.jsx'
import { useCollection } from '../lib/hooks.js'

/* Programmes — list page. Each item links to a dedicated sales page.
   Distinct from Practice (the high-level disciplines) and Shop (one-off
   physical / digital products). */

export default function Programmes() {
  const { items: programmes, error } = useCollection('programmes')

  if (error) return <LoadError />
  // Render structure immediately — list fills in when API responds.

  return (
    <PageTransition>
      <Seo
        title="Programmes"
        path="/programmes"
        description="The studio's packaged offerings — coaching arcs, recovery practices, and the Interior Wellbeing Audit. Slow, considered, by application."
      />

      <section className="container-edge pt-20 md:pt-28 pb-12">
        <Heading num="04" label="The studio · Programmes" />
        <h1 className="mt-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
          Packaged <span className="display-italic">work</span><br />
          for considered <span className="display-italic">lives.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink/80 leading-relaxed">
          A small number of named programmes, each designed for a particular kind of work.
          Slow. By application. The studio takes a limited number of clients into each cohort.
        </p>
      </section>

      {/* Programme list */}
      <section className="border-t border-ink/15">
        {programmes.length === 0 && (
          <div className="container-edge py-24 text-center text-ink/60">
            <p>No programmes are open just now. Write to be told when the next list opens.</p>
            <Link to="/enquire" className="mt-6 inline-block mono atelier-link">Send a note →</Link>
          </div>
        )}
        {programmes.map((p) => (
          <Reveal key={p.slug}>
            <Link
              to={`/programmes/${p.slug}`}
              className="group block border-b border-ink/15 hover:bg-paper-warm transition-colors"
            >
              <div className="container-edge grid md:grid-cols-12 gap-x-6 gap-y-6 py-12 md:py-16 items-start">
                <div className="md:col-span-2">
                  <span className="mono text-clay-500 tabular text-base">{p.num}</span>
                  {p.featured && (
                    <div className="mt-2 mono-sm text-clay-500 tracking-[0.18em]">— FEATURED</div>
                  )}
                </div>
                <div className="md:col-span-6">
                  <h2 className="display-thin text-5xl md:text-7xl leading-[0.92] group-hover:text-clay-500 transition-colors">
                    {p.title}
                    {p.italicTitle && (
                      <span className="block display-italic text-3xl md:text-4xl mt-2 text-ink/70">
                        {p.italicTitle}
                      </span>
                    )}
                  </h2>
                  <p className="mono-sm text-ink/65 mt-4">{p.discipline}</p>
                  <p className="mt-6 text-ink/85 leading-relaxed text-lg max-w-xl">{p.lede}</p>
                  <span className="mt-6 inline-block mono atelier-link">Read the programme →</span>
                </div>
                <div className="md:col-span-4 self-start">
                  {p.cover ? (
                    <div className="img-cover overflow-hidden">
                      <img src={p.cover} alt={p.title} loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                  ) : null}
                  {p.price && (
                    <p className="mt-4 mono-sm text-ink/65 tabular">
                      <span className="text-ink/40">Price</span> · {p.price}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* Closing */}
      <section className="container-edge py-24 md:py-32 text-center">
        <p className="mono text-clay-500 tracking-[0.2em]">— A note</p>
        <h2 className="mt-6 display-thin text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
          Not certain which programme fits? <span className="display-italic">Write first.</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-ink/70 leading-relaxed">
          A short conversation can save a wrong commitment. The studio reads every note.
        </p>
        <Link to="/enquire" className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono">
          Begin a private conversation →
        </Link>
      </section>
    </PageTransition>
  )
}
