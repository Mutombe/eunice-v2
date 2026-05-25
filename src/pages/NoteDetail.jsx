import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Lock } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import PaywallBlur from '../components/PaywallBlur.jsx'
import ParallaxImage from '../components/ParallaxImage.jsx'
import { Loading, LoadError } from '../components/AsyncBoundary.jsx'
import { useCollection } from '../lib/hooks.js'
import { useSettings } from '../lib/settings.jsx'

export default function NoteDetail() {
  const { slug } = useParams()
  const { items: notes, loading, error } = useCollection('journal')
  const { brand } = useSettings()

  if (loading) return <Loading />
  if (error) return <LoadError />

  const note = notes.find((n) => n.slug === slug)
  if (!note) return <Navigate to="/journal" replace />
  const idx = notes.findIndex((n) => n.slug === slug)
  const next = notes[(idx + 1) % notes.length]

  const Body = () => (
    <article className="space-y-7">
      {note.body.map((p, i) => (
        <p key={i} className="text-lg md:text-xl leading-[1.65] text-ink/90">
          {p}
        </p>
      ))}
    </article>
  )

  return (
    <PageTransition>
      <Seo
        title={note.title}
        path={`/journal/${note.slug}`}
        description={note.deck}
        image={note.cover}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: note.title,
          description: note.deck,
          image: note.cover,
          author: { '@type': 'Person', name: 'Eunice De Campi' },
        }}
      />
      <section className="container-edge pt-16 pb-10">
        <Link to="/journal" className="mono atelier-link inline-flex items-center gap-2"><ArrowLeft size={12} /> Back · Journal</Link>
      </section>

      <header className="container-edge pb-12">
        <div className="grid grid-cols-12 gap-6 items-end">
          <span className="col-span-12 md:col-span-2 mono text-clay-500 tabular">{note.num}</span>
          <div className="col-span-12 md:col-span-10">
            <div className="flex items-center gap-3 mono text-ink/65">
              <span>{note.section}</span>
              <span>·</span>
              <span>{note.date}</span>
              <span>·</span>
              <span>{note.readTime}</span>
              {note.isPremium && (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 text-clay-500"><Lock size={11} /> Members-only</span>
                </>
              )}
            </div>
            <h1 className="mt-4 display-thin text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95]">{note.title}</h1>
            <p className="mt-5 display-italic text-2xl md:text-3xl text-ink/75 leading-[1.3]">{note.deck}</p>
            <p className="mt-6 mono-sm text-ink/65">By Eunice De Campi · {brand.studio}</p>
          </div>
        </div>
      </header>

      <ParallaxImage src={note.cover} alt={note.title} ratio="cinematic" intensity={0.16} wipe />

      <section className="container-edge py-20 md:py-28">
        <div className="grid grid-cols-12 gap-10">
          {/* Note metadata rail — visual sidebar, not a top-level landmark */}
          <div className="col-span-12 md:col-span-3">
            <div className="sticky top-24 space-y-3">
              <span className="mono text-ink/65">— Note no.</span>
              <p className="display-thin text-5xl tabular">{note.num}</p>
              <div className="hairline mt-6"></div>
              <p className="mono-sm text-ink/65 mt-3">{note.section}</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              {note.isPremium ? (
                <PaywallBlur>
                  <Body />
                </PaywallBlur>
              ) : (
                <Body />
              )}
            </Reveal>
            {!note.isPremium && (
              <div className="mt-12 border-t border-ink/15 pt-8">
                <p className="display-italic text-3xl text-clay-500">— Eunice</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15">
        <Link to={`/journal/${next.slug}`} className="container-edge py-12 md:py-20 grid grid-cols-12 gap-6 hover:bg-paper-warm transition-colors group">
          <span className="col-span-12 md:col-span-3 mono text-ink/65 self-end">{next.num} · Next note <ArrowRight size={11} className="inline ml-1" /></span>
          <h3 className="col-span-12 md:col-span-9 display-thin text-3xl md:text-5xl group-hover:text-clay-500 transition-colors">{next.title}</h3>
        </Link>
      </section>
    </PageTransition>
  )
}
