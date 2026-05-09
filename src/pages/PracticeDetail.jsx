import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import ParallaxImage from '../components/ParallaxImage.jsx'
import { practice } from '../data/siteData.js'

export default function PracticeDetail() {
  const { slug } = useParams()
  const item = practice.find((p) => p.slug === slug)
  if (!item) return <Navigate to="/practice" replace />
  const idx = practice.findIndex((p) => p.slug === slug)
  const next = practice[(idx + 1) % practice.length]
  const prev = practice[(idx - 1 + practice.length) % practice.length]

  return (
    <PageTransition>
      <section className="container-edge pt-16 pb-10">
        <Link to="/practice" className="mono atelier-link inline-flex items-center gap-2"><ArrowLeft size={12} /> Back · The Practice</Link>
      </section>

      <section className="container-edge pb-12">
        <div className="grid grid-cols-12 gap-6 items-end">
          <span className="col-span-12 md:col-span-2 mono text-clay-500 tabular text-lg">{item.num}</span>
          <h1 className="col-span-12 md:col-span-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.92]">
            {item.title}.
          </h1>
        </div>
        <p className="mono-sm text-ink/55 mt-4">{item.discipline}</p>
        <p className="mt-8 max-w-3xl display-thin text-2xl md:text-3xl text-ink/85 leading-[1.25] display-italic">
          {item.short}
        </p>
      </section>

      <ParallaxImage src={item.image} alt={item.title} ratio="cinematic" intensity={0.16} wipe />

      <section className="container-edge py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <span className="mono text-ink/55">— On the discipline</span>
          </div>
          <div className="md:col-span-9 space-y-6">
            {item.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-lg md:text-xl leading-[1.6] text-ink/85">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-warm py-20 md:py-28 border-y border-ink/15">
        <div className="container-edge">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <span className="mono text-clay-500">— Formats</span>
              <h3 className="mt-4 display-thin text-3xl md:text-4xl">In what shape this work is offered.</h3>
            </div>
            <div className="md:col-span-9 grid sm:grid-cols-2 gap-px bg-ink/15">
              {item.formats.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.05}>
                  <div className="bg-paper-warm p-8 h-full">
                    <span className="mono text-ink/55 tabular">{f.num}</span>
                    <h4 className="mt-4 display-thin text-2xl md:text-3xl">{f.label}</h4>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-edge py-24 text-center">
        <h2 className="display-thin text-5xl md:text-6xl max-w-3xl mx-auto leading-tight">
          Begin a <span className="display-italic">precise</span> conversation.
        </h2>
        <Link to="/enquire" className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono">
          Enquire →
        </Link>
      </section>

      <section className="grid grid-cols-2 border-t border-ink/15">
        <Link to={`/practice/${prev.slug}`} className="container-edge py-10 md:py-14 hover:bg-paper-warm transition-colors group">
          <span className="mono text-ink/55 inline-flex items-center gap-2"><ArrowLeft size={12} /> {prev.num} · Previous</span>
          <h3 className="mt-3 display-thin text-2xl md:text-4xl group-hover:text-clay-500 transition-colors">{prev.title}</h3>
        </Link>
        <Link to={`/practice/${next.slug}`} className="container-edge py-10 md:py-14 hover:bg-paper-warm transition-colors group text-right border-l border-ink/15">
          <span className="mono text-ink/55 inline-flex items-center gap-2 justify-end w-full">{next.num} · Next <ArrowRight size={12} /></span>
          <h3 className="mt-3 display-thin text-2xl md:text-4xl group-hover:text-clay-500 transition-colors">{next.title}</h3>
        </Link>
      </section>
    </PageTransition>
  )
}
