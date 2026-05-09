import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, Lock } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import HairlineDivider from '../components/HairlineDivider.jsx'
import { notes } from '../data/siteData.js'

/* The Blog is the studio's public feed — chronological, museum-card brief.
   Same notes data, tighter posture than the editorial /notes page. */

export default function Blog() {
  const [lead, ...rest] = notes
  return (
    <PageTransition>
      <section className="container-edge pt-20 md:pt-28 pb-14 md:pb-20">
        <span className="mono text-ink/55">— Field notes · Public posts</span>
        <div className="mt-8 grid md:grid-cols-12 gap-6 items-end">
          <h1 className="md:col-span-7 display-thin text-[clamp(2.75rem,9vw,8rem)] leading-[0.92]">
            Notes, <br /><span className="display-italic">posted</span> in seasons.
          </h1>
          <div className="md:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg leading-relaxed text-ink/80 max-w-md">
                Short essays, field notes, and occasional letters from the studio. Posted as they arrive.
              </p>
              <div className="mt-5 flex items-center gap-3 mono-sm text-ink/55 tabular text-[0.6rem]">
                <span>{notes.length} POSTS</span>
                <span>·</span>
                <span>{notes.filter((n) => !n.isPremium).length} PUBLIC</span>
                <span>·</span>
                <Link to="/notes" className="atelier-link">Open the notes →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <HairlineDivider num="—" label="Lead post" />

      {/* Lead — wide spread */}
      <section className="container-edge pb-12 md:pb-16">
        <Reveal>
          <Link to={`/notes/${lead.slug}`} className="group grid md:grid-cols-12 gap-6 md:gap-10 items-center block">
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
              <div className="flex items-center gap-2 mono-sm text-ink/55 text-[0.6rem]">
                <span className="tabular">{lead.num}</span>
                <span>·</span>
                <span>{lead.section}</span>
                {lead.isPremium && <span className="ml-2 inline-flex items-center gap-1 text-clay-500"><Lock size={10} /> MEMBERS</span>}
              </div>
              <h2 className="mt-4 display-thin text-3xl md:text-5xl leading-[1.0] group-hover:text-clay-500 transition-colors">
                {lead.title}
              </h2>
              <p className="mt-3 display-italic text-lg text-ink/75">{lead.deck}</p>
              <p className="mt-4 text-ink/85 leading-relaxed">{lead.body[0].slice(0, 200)}…</p>
              <div className="mt-6 flex items-center gap-4 mono-sm text-ink/55 text-[0.55rem]">
                <span className="inline-flex items-center gap-1.5"><Calendar size={11} /> {lead.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock size={11} /> {lead.readTime}</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 mono atelier-link text-ink">
                Read post <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <HairlineDivider num="—" label="More posts" />

      {/* Feed */}
      <section className="container-edge pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-10">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link to={`/notes/${p.slug}`} className="group block">
                <div className="aspect-[3/2] overflow-hidden bg-stone-100">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 grid grid-cols-12 gap-2">
                  <span className="col-span-2 mono-sm tabular text-ink/55 text-[0.6rem] self-start">{p.num}</span>
                  <div className="col-span-10">
                    <div className="mono-sm text-ink/55 text-[0.55rem]">
                      {p.section}
                      {p.isPremium && <span className="ml-2 text-clay-500">· MEMBERS</span>}
                    </div>
                    <h3 className="mt-1.5 display-thin text-xl md:text-2xl leading-[1.0] group-hover:text-clay-500 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 display-italic text-sm text-ink/65">{p.deck}</p>
                    <div className="mt-3 flex items-center gap-3 mono-sm text-ink/45 text-[0.55rem]">
                      <span className="inline-flex items-center gap-1"><Calendar size={10} /> {p.date}</span>
                      <span className="inline-flex items-center gap-1"><Clock size={10} /> {p.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
