import { useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/siteData.js'

const typologies = ['All', ...Array.from(new Set(projects.map((p) => p.typology)))]

export default function IndexPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.typology === filter)

  return (
    <PageTransition>
      <section className="container-edge pt-20 md:pt-28 pb-16">
        <Heading num="03" label="Index · Selected works · 2023 — 2025" />
        <h1 className="mt-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.92]">
          Five rooms, <br/> <span className="display-italic">five</span> small lives.
        </h1>
      </section>

      <section className="container-edge mb-12">
        <div className="border-y border-ink/15 py-3 flex flex-wrap gap-x-6 gap-y-2 items-center">
          <span className="mono text-ink/55">Typology</span>
          {typologies.map((t) => (
            <button
              key={t} onClick={() => setFilter(t)}
              className={`mono transition-colors ${filter === t ? 'text-clay-500' : 'text-ink/45 hover:text-ink'}`}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto mono text-ink/45 tabular">{filtered.length} of {projects.length}</span>
        </div>
      </section>

      <section className="container-edge pb-24">
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-16">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
