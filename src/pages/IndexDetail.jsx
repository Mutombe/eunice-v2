import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import ParallaxImage from '../components/ParallaxImage.jsx'
import { projects } from '../data/siteData.js'

export default function IndexDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <Navigate to="/index" replace />
  const idx = projects.findIndex((p) => p.slug === slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <PageTransition>
      <section className="container-edge pt-16 pb-10">
        <Link to="/index" className="mono atelier-link inline-flex items-center gap-2"><ArrowLeft size={12} /> Back · Index</Link>
      </section>

      <section className="container-edge pb-12">
        <div className="grid grid-cols-12 gap-6 items-end">
          <span className="col-span-12 md:col-span-2 mono text-clay-500 tabular">{project.num}</span>
          <h1 className="col-span-12 md:col-span-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
            {project.title}
          </h1>
        </div>
        <div className="mt-8 grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-start-3 md:col-span-9 display-italic text-2xl md:text-3xl text-ink/85 leading-[1.3]">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Hero photo with parallax wipe-reveal */}
      <ParallaxImage
        src={project.cover}
        alt={project.title}
        ratio="cinematic"
        intensity={0.18}
        wipe
      />

      {/* Specs */}
      <section className="container-edge py-12 border-b border-ink/15">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { k: 'Typology',  v: project.typology },
            { k: 'Location',  v: project.location },
            { k: 'Year',      v: project.year },
            { k: 'Surface',   v: project.surface },
            { k: 'Rooms',     v: project.rooms },
          ].map((s, i) => (
            <div key={s.k}>
              <div className="mono-sm text-ink/45">{String(i + 1).padStart(2, '0')} · {s.k}</div>
              <div className="mt-1 display-thin text-xl md:text-2xl">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Palette */}
      <section className="container-edge py-12 border-b border-ink/15">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <span className="md:col-span-3 mono text-ink/55">— Material palette</span>
          <ul className="md:col-span-9 flex flex-wrap gap-3">
            {project.palette.map((p, i) => (
              <li key={p} className="px-4 py-2 border border-ink/30 mono">
                {String(i + 1).padStart(2, '0')} · {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Editorial gallery */}
      <section className="container-edge py-20 space-y-12">
        {project.gallery.map((img, i) => {
          const widths = ['md:w-full', 'md:w-[72%] md:ml-auto', 'md:w-[58%]', 'md:w-[88%] md:ml-[6%]']
          // Atelier rhythm: alternate plate (4:3) and cover (4:5) ratios
          const ratio = i % 3 === 1 ? 'cover' : 'plate'
          return (
            <Reveal key={img} delay={i * 0.04}>
              <figure className={widths[i % widths.length]}>
                <ParallaxImage
                  src={img}
                  alt={`${project.title} — plate ${i + 1}`}
                  ratio={ratio}
                  intensity={0.1}
                />
                <figcaption className="mt-3 mono-sm text-ink/55 flex items-center gap-3">
                  <span className="tabular">Plate {String(i + 1).padStart(2, '0')}</span>
                  <span className="w-6 h-px bg-ink/30"></span>
                  <span>{project.title} · {project.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          )
        })}
      </section>

      {/* Next */}
      <section className="border-t border-ink/15">
        <Link to={`/index/${next.slug}`} className="container-edge py-16 md:py-24 grid grid-cols-12 gap-6 hover:bg-paper-warm transition-colors group">
          <span className="col-span-12 md:col-span-3 mono text-ink/55 self-end">{next.num} · Next →</span>
          <h3 className="col-span-12 md:col-span-9 display-thin text-4xl md:text-7xl group-hover:text-clay-500 transition-colors">
            {next.title}
          </h3>
        </Link>
      </section>
    </PageTransition>
  )
}
