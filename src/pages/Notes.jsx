import { useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import NoteCard from '../components/NoteCard.jsx'
import { notes } from '../data/siteData.js'

const sections = ['All', ...Array.from(new Set(notes.map((n) => n.section)))]

export default function Notes() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? notes : notes.filter((n) => n.section === filter)

  return (
    <PageTransition>
      <section className="container-edge pt-20 md:pt-28 pb-16">
        <Heading num="04" label="Notes · Editorial · Vol. I" />
        <h1 className="mt-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.92]">
          Slow reading, <br/> for the <span className="display-italic">long</span> way.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-ink/75 max-w-2xl leading-relaxed">
          A small editorial body of work. Some pieces are public. Most are for members. New writing arrives when there is something worth saying.
        </p>
      </section>

      <section className="container-edge mb-12">
        <div className="border-y border-ink/15 py-3 flex flex-wrap gap-x-6 gap-y-2 items-center">
          <span className="mono text-ink/55">Section</span>
          {sections.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`mono transition-colors ${filter === s ? 'text-clay-500' : 'text-ink/45 hover:text-ink'}`}>
              {s}
            </button>
          ))}
          <span className="ml-auto mono text-ink/45 tabular">{filtered.length} of {notes.length}</span>
        </div>
      </section>

      <section className="container-edge pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {filtered.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.04}>
              <NoteCard note={n} />
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
