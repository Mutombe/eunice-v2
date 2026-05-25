import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, Lock } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import NoteCard from '../components/NoteCard.jsx'
import { LoadError } from '../components/AsyncBoundary.jsx'
import { useCollection } from '../lib/hooks.js'

/* The Journal — the studio's single editorial feed.
   Merges the former /notes (filtered grid) and /blog (featured lead)
   pages into one, per the brief's "Blog / Journal" requirement. */

export default function Journal() {
  const { items: notes, error } = useCollection('journal')
  const [filter, setFilter] = useState('All')

  if (error) return <LoadError />
  // Render structure immediately — notes fill in when the API responds.

  const sections = ['All', ...Array.from(new Set(notes.map((n) => n.section)))]
  const lead = notes[0]
  const showLead = filter === 'All' && notes.length > 0
  const pool = filter === 'All' ? notes.slice(1) : notes.filter((n) => n.section === filter)
  const shownCount = filter === 'All' ? notes.length : pool.length

  return (
    <PageTransition>
      <Seo title="Journal" path="/journal" description="A modern editorial journal — essays and field notes on wellbeing, burnout, grief, reinvention and intentional living." />
      <section className="container-edge pt-20 md:pt-28 pb-12 md:pb-16">
        <Heading num="04" label="Journal · Editorial" />
        <h1 className="mt-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.92]">
          The <span className="display-italic">Journal.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-ink/75 max-w-2xl leading-relaxed">
          A modern editorial journal — essays and field notes on wellbeing, burnout,
          grief, reinvention and intentional living. Some pieces are public; some are
          written for members.
        </p>
      </section>

      {/* Featured lead — the most recent essay */}
      {showLead && (
        <section className="container-edge pb-14 md:pb-20">
          <Reveal>
            <Link
              to={`/journal/${lead.slug}`}
              className="group grid md:grid-cols-12 gap-6 md:gap-10 items-center"
            >
              <div className="md:col-span-7">
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={lead.cover}
                    alt={lead.title}
                    loading="eager"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="flex items-center gap-2 mono-sm text-ink/65">
                  <span className="tabular">{lead.num}</span>
                  <span>·</span>
                  <span>{lead.section}</span>
                  {lead.isPremium && (
                    <span className="ml-1 inline-flex items-center gap-1 text-clay-500">
                      <Lock size={10} /> Members
                    </span>
                  )}
                </div>
                <h2 className="mt-4 display-thin text-3xl md:text-5xl leading-[1.0] group-hover:text-clay-500 transition-colors">
                  {lead.title}
                </h2>
                <p className="mt-3 display-italic text-lg text-ink/75">{lead.deck}</p>
                <p className="mt-4 text-ink/80 leading-relaxed">{lead.body[0].slice(0, 200)}…</p>
                <div className="mt-6 flex items-center gap-4 mono-sm text-ink/65">
                  <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {lead.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {lead.readTime}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 mono atelier-link">
                  Read the essay <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* Section filter */}
      <section className="container-edge mb-12">
        <div className="border-y border-ink/15 py-3 flex flex-wrap gap-x-6 gap-y-2 items-center">
          <span className="mono text-ink/65">Section</span>
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`mono transition-colors ${filter === s ? 'text-clay-500' : 'text-ink/65 hover:text-ink'}`}
            >
              {s}
            </button>
          ))}
          <span className="ml-auto mono text-ink/65 tabular">
            {shownCount} {shownCount === 1 ? 'entry' : 'entries'}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="container-edge pb-32">
        {pool.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
            {pool.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.04}>
                <NoteCard note={n} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mono text-ink/65">No entries in this section yet.</p>
        )}
      </section>
    </PageTransition>
  )
}
