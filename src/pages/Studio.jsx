import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import NoteCard from '../components/NoteCard.jsx'
import ParallaxImage from '../components/ParallaxImage.jsx'
import HairlineDivider from '../components/HairlineDivider.jsx'
import CountUp from '../components/CountUp.jsx'
import RingCursor from '../components/RingCursor.jsx'
import ProductCover from '../components/ProductCover.jsx'
import { hero, practice, projects, notes, voices, brand, studio, shop } from '../data/siteData.js'

/* ============= HERO — three-slide typographic carousel ===============
   v2 is type-led, not photo-led. The carousel cycles three subtle paper
   tones, three typographic compositions, and three architectural marks.
   Each slide is its own museum-card composition; only paper + content
   cross-fade. Calm, considered, no flourish.
==================================================================== */

const HERO_SLIDES = [
  {
    key: 'studio',
    paper: '#F5F2EC',           // paper-warm
    leftLabel: 'EDC—STUDIO 2026',
    rightLabel: 'OXFORD · MMXXVI',
    indexNum: '01 / 03',
    pretitle: 'An atelier — for the long, considered work',
    title: [
      { text: 'Of', italic: false },
      { text: 'interiors,', italic: true, br: true },
      { text: 'mindset, and', italic: false },
      { text: 'human living.', italic: true },
    ],
    body:
      'An interdisciplinary studio practice working at the intersection of residential interior design, mindset coaching, and the editorial study of how rooms shape the people inside them.',
    primaryCta: { label: 'Read the practice →', to: '/practice' },
    secondaryCta: { label: 'Enquire', to: '/enquire' },
    meta: [
      { label: 'Founded', value: '2008' },
      { label: 'Disciplines', value: 'Four' },
      { label: 'Studio', value: 'Oxford' },
    ],
    layout: 'studio',
  },
  {
    key: 'index',
    paper: '#EFE9E3',           // stone-100
    leftLabel: 'EDC—INDEX 2026',
    rightLabel: 'FIVE PLATES · ROOMS',
    indexNum: '02 / 03',
    pretitle: 'Recent residential and atelier commissions',
    title: [
      { text: 'An', italic: false },
      { text: 'index', italic: true, br: true },
      { text: 'of considered', italic: false },
      { text: 'rooms.', italic: true },
    ],
    body:
      'Five plates from the studio. Lime plaster, untreated oak, brass that is allowed to age — interiors held to a slow architectural standard.',
    primaryCta: { label: 'Open the index →', to: '/index' },
    metaLeft: 'Oxford · Cotswolds · St John\'s Wood',
    metaRight: '5 plates · 2023–2025',
    layout: 'index',
  },
  {
    key: 'circle',
    paper: '#EFF1E8',           // olive-50
    leftLabel: 'EDC—CIRCLE 2026',
    rightLabel: 'BY APPLICATION · CAPPED 240',
    indexNum: '03 / 03',
    pretitle: 'A small membership · for women in the long work',
    title: [
      { text: 'The', italic: false },
      { text: 'Circle.', italic: true, br: true },
      { text: 'Capped at', italic: false },
      { text: 'two hundred forty.', italic: true },
    ],
    body:
      'Two retreats. Four reports. Twelve letters a year. By application only — read slowly.',
    primaryCta: { label: 'Apply to enter →', to: '/membership' },
    metaLeft: 'Oxford · Cotswolds · By small invitation',
    metaRight: '240 / 240 capped',
    layout: 'circle',
  },
]

const SLIDE_DURATION = 8500
const FADE = 1.4

function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yLabel = useTransform(scrollYProgress, [0, 1], [0, 80])
  const fadeOnScroll = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(
      () => setActive((a) => (a + 1) % HERO_SLIDES.length),
      SLIDE_DURATION,
    )
    return () => window.clearTimeout(id)
  }, [active, paused])

  const slide = HERO_SLIDES[active]

  return (
    <section
      ref={ref}
      className="relative hero-fit overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Paper tone — cross-fades between slides */}
      <motion.div
        animate={{ backgroundColor: slide.paper }}
        transition={{ duration: FADE, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute inset-0"
      />

      {/* Vertical mono labels — outside slides so they cross-fade their text */}
      <motion.div
        style={{ y: yLabel, opacity: fadeOnScroll }}
        className="vertical-label fixed left-3 top-32 z-30 text-ink/55 tracking-[0.4em] hidden md:block"
      >
        <CrossFadeText value={slide.leftLabel} />
      </motion.div>
      <motion.div
        style={{ y: yLabel, opacity: fadeOnScroll }}
        className="vertical-label fixed right-3 top-32 z-30 text-ink/55 tracking-[0.4em] hidden md:block"
      >
        <CrossFadeText value={slide.rightLabel} />
      </motion.div>

      {/* Slides — opacity-toggled, all mounted */}
      {HERO_SLIDES.map((s, i) => (
        <Slide key={s.key} slide={s} active={i === active} fadeOnScroll={fadeOnScroll} />
      ))}

      {/* Pagination — mono numerals + thin progress bars */}
      <SlidePagination
        active={active}
        setActive={setActive}
        count={HERO_SLIDES.length}
        paused={paused}
        duration={SLIDE_DURATION / 1000}
      />
    </section>
  )
}

function CrossFadeText({ value }) {
  // A small inner cross-fade for label text, so vertical labels swap calmly
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: FADE, ease: 'linear' }}
      className="block"
    >
      {value}
    </motion.span>
  )
}

function Slide({ slide, active, fadeOnScroll }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: FADE, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ pointerEvents: active ? 'auto' : 'none', zIndex: active ? 2 : 1 }}
      className="absolute inset-0"
    >
      <motion.div style={{ opacity: fadeOnScroll }} className="absolute inset-0 grid grid-rows-[auto_1fr_auto]">
        {slide.layout === 'studio' && <StudioLayout slide={slide} />}
        {slide.layout === 'index'  && <IndexLayout  slide={slide} />}
        {slide.layout === 'circle' && <CircleLayout slide={slide} />}
      </motion.div>
    </motion.div>
  )
}

/* === Slide title renderer (shared) === */
function SlideTitle({ segments, className = '' }) {
  return (
    <h1 className={`display-thin hero-display ${className}`}>
      {segments.map((seg, i) => (
        <span key={i} className={seg.italic ? 'display-italic' : undefined}>
          {seg.text}
          {seg.br ? <br /> : ' '}
        </span>
      ))}
    </h1>
  )
}

/* === STUDIO — left-aligned typographic, classical hero === */
function StudioLayout({ slide }) {
  return (
    <>
      <div className="container-edge pt-6 md:pt-8 mono hero-eyebrow text-ink/55 flex items-center gap-3">
        <span className="tabular">{slide.indexNum}</span>
        <span className="w-10 h-px bg-ink/30" />
        <span className="truncate">{slide.pretitle}</span>
      </div>

      <div className="container-edge self-center w-full">
        <SlideTitle segments={slide.title} />
      </div>

      <div className="container-edge pb-6 md:pb-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
          <p className="col-span-12 md:col-span-6 hero-body text-ink/75 max-w-md">
            {slide.body}
          </p>
          <div className="col-span-6 md:col-span-3 flex flex-col gap-1.5 md:items-end">
            <Link to={slide.primaryCta.to} className="mono hero-eyebrow atelier-link">{slide.primaryCta.label}</Link>
            {slide.secondaryCta && (
              <Link to={slide.secondaryCta.to} className="mono hero-eyebrow text-clay-500 atelier-link">{slide.secondaryCta.label}</Link>
            )}
          </div>
          <div className="col-span-6 md:col-span-3 grid grid-cols-3 gap-2 border-t border-ink/15 pt-2.5">
            {slide.meta.map((m) => (
              <div key={m.label}>
                <div className="mono-sm text-ink/45 text-[0.55rem]">{m.label}</div>
                <div className="display-thin text-lg md:text-2xl mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* === INDEX — title left, drafted floor-plan diagram bottom-right === */
function IndexLayout({ slide }) {
  return (
    <>
      <div className="container-edge pt-6 md:pt-8 mono hero-eyebrow text-ink/55 flex items-center gap-3">
        <span className="tabular">{slide.indexNum}</span>
        <span className="w-10 h-px bg-ink/30" />
        <span className="truncate">{slide.pretitle}</span>
      </div>

      <div className="container-edge self-center w-full">
        <SlideTitle segments={slide.title} />
      </div>

      <div className="container-edge pb-6 md:pb-8 relative">
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
          <p className="col-span-12 md:col-span-6 hero-body text-ink/75 max-w-md">{slide.body}</p>

          <div className="col-span-6 md:col-span-3 flex flex-col gap-1.5 md:items-end">
            <Link to={slide.primaryCta.to} className="mono hero-eyebrow atelier-link">{slide.primaryCta.label}</Link>
          </div>

          {/* Drafted floor-plan diagram — the signature gesture for this slide */}
          <div className="col-span-6 md:col-span-3 flex items-end justify-end gap-3">
            <FloorPlanGlyph className="text-ink/40 w-28 md:w-32 hidden md:block" />
            <div className="border-t border-ink/15 pt-2.5 mono-sm text-ink/55 leading-tight">
              <div className="text-[0.55rem] text-ink/45">— Index</div>
              <div className="mt-1 tabular text-[0.6rem]">{slide.metaRight}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function FloorPlanGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="1" y="1"   width="78" height="49" stroke="currentColor" strokeWidth="0.6" />
      <rect x="79" y="1"  width="40" height="29" stroke="currentColor" strokeWidth="0.6" />
      <rect x="79" y="30" width="40" height="20" stroke="currentColor" strokeWidth="0.6" />
      <rect x="1" y="50"  width="118" height="29" stroke="currentColor" strokeWidth="0.6" />
      {/* Door breaks — small notches in the rules */}
      <line x1="40" y1="1"  x2="50" y2="1"  stroke="currentColor" strokeWidth="0.6" opacity="0" />
      <line x1="40" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="2.4" />
      <line x1="79" y1="20" x2="79" y2="14" stroke="currentColor" strokeWidth="2.4" />
      {/* Plate stamp — tiny dot at the entry */}
      <circle cx="45" cy="50" r="0.9" fill="currentColor" />
    </svg>
  )
}

/* === CIRCLE — centered invitation card with a drafted compass circle === */
function CircleLayout({ slide }) {
  return (
    <>
      <div className="container-edge pt-6 md:pt-8 mono hero-eyebrow text-ink/55 flex items-center gap-3">
        <span className="tabular">{slide.indexNum}</span>
        <span className="w-10 h-px bg-ink/30" />
        <span className="truncate">{slide.pretitle}</span>
      </div>

      <div className="container-edge self-center w-full">
        <div className="relative mx-auto w-full max-w-3xl text-center">
          {/* Drafted compass circle behind the title — architectural mark */}
          <CircleGlyph className="absolute left-1/2 -translate-x-1/2 -top-[12%] text-ink/15 w-[42vh] max-w-[420px] aspect-square pointer-events-none select-none" />
          <div className="relative">
            <SlideTitle segments={slide.title} />
          </div>
        </div>
      </div>

      <div className="container-edge pb-6 md:pb-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
          <p className="col-span-12 md:col-span-5 hero-body text-ink/75 max-w-md">{slide.body}</p>
          <div className="col-span-12 md:col-span-4 flex md:justify-center">
            <Link to={slide.primaryCta.to} className="mono hero-eyebrow atelier-link text-clay-500">
              {slide.primaryCta.label}
            </Link>
          </div>
          <div className="col-span-12 md:col-span-3 border-t border-ink/15 pt-2.5">
            <div className="mono-sm text-ink/45 text-[0.55rem]">— Membership</div>
            <div className="mt-1 tabular mono-sm text-ink/65 text-[0.6rem]">{slide.metaRight}</div>
          </div>
        </div>
      </div>
    </>
  )
}

function CircleGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="48.5" stroke="currentColor" strokeWidth="0.4" />
      {/* Compass crosshair — quarter ticks */}
      <line x1="50" y1="0" x2="50" y2="2"  stroke="currentColor" strokeWidth="0.4" />
      <line x1="50" y1="98" x2="50" y2="100" stroke="currentColor" strokeWidth="0.4" />
      <line x1="0" y1="50" x2="2" y2="50"  stroke="currentColor" strokeWidth="0.4" />
      <line x1="98" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="50" cy="50" r="0.8" fill="currentColor" />
    </svg>
  )
}

/* === Pagination — mono numerals over thin progress bars === */
function SlidePagination({ active, setActive, count, paused, duration }) {
  return (
    <div className="absolute bottom-2.5 md:bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-end gap-5">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active
        const isPast   = i < active
        return (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className="group flex flex-col items-center gap-1.5"
          >
            <span className={`mono-sm tabular text-[0.55rem] transition-colors ${isActive ? 'text-ink' : 'text-ink/40 group-hover:text-ink/70'}`}>
              0{i + 1}
            </span>
            <span className="block w-12 md:w-14 h-px bg-ink/15 relative overflow-hidden">
              {isActive ? (
                <motion.span
                  key={`fill-${active}-${paused ? 'p' : 'r'}`}
                  initial={{ width: '0%' }}
                  animate={{ width: paused ? '35%' : '100%' }}
                  transition={{ duration: paused ? 0.4 : duration, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 bg-ink"
                />
              ) : isPast ? (
                <span className="absolute inset-y-0 left-0 right-0 bg-ink/60" />
              ) : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ============= STATS / COUNT-UP ROW ============= */
function StatsRow() {
  return (
    <section className="border-t border-ink/15 py-20 md:py-28">
      <div className="container-edge grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {[
          { num: 18, label: 'Years in practice', suffix: '' },
          { num: 84, label: 'Commissioned spaces', suffix: '' },
          { num: 240, label: 'Members capped', suffix: '' },
          { num: 4, label: 'Disciplines, one studio', suffix: '' },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="border-l border-ink/15 pl-6">
              <div className="mono text-ink/55 tabular">{String(i + 1).padStart(2, '0')}</div>
              <div className="display-thin text-[clamp(3rem,6vw,5rem)] leading-none mt-3">
                <CountUp to={s.num} suffix={s.suffix} />
              </div>
              <div className="mono-sm text-ink/55 mt-2">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ============= PRACTICE — disciplines ============= */
function Practice() {
  return (
    <>
      <HairlineDivider num="02" label="The Practice" />
      <section className="container-edge pb-24 md:pb-36">
        <Reveal>
          <Heading num="" label="Four disciplines · one studio" title="An interdisciplinary" italic="atelier." />
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
          {practice.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/practice/${p.slug}`} className="group block bg-paper p-8 lg:p-10 h-full transition-colors hover:bg-paper-warm">
                <div className="flex items-center gap-3">
                  <span className="mono text-ink/55 tabular">{p.num}</span>
                  <span className="w-6 h-px bg-ink/30"></span>
                </div>
                <h3 className="mt-4 display-thin text-4xl md:text-5xl leading-[0.95] group-hover:text-clay-500 transition-colors">{p.title}</h3>
                <p className="mono-sm text-ink/55 mt-2">{p.discipline}</p>
                <p className="mt-5 text-ink/80 leading-relaxed text-sm">{p.short}</p>
                <span className="mt-8 inline-block mono atelier-link">Read →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

/* ============= INDEX with parallax on covers ============= */
function IndexFeatured() {
  const featured = projects.slice(0, 4)
  return (
    <>
      <HairlineDivider num="03" label="Index · Recent works" />
      <section className="pb-24 md:pb-36">
        <div className="container-edge">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <Heading num="" label="Selected · 2023 — 2025" title="Five rooms," italic="five small lives." />
              <Link to="/index" className="mono atelier-link text-clay-500">Open the index →</Link>
            </div>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-2 gap-8 md:gap-x-6 md:gap-y-16">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ============= BELIEFS — sticky number column ============= */
function Beliefs() {
  return (
    <section className="bg-ink-500 text-paper-warm py-28 md:py-44 border-t border-ink/15">
      <div className="container-edge">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 md:sticky md:top-32 self-start">
            <span className="mono text-paper-warm/55">04 — A working ethic</span>
            <h2 className="mt-6 display-thin text-4xl md:text-5xl leading-[0.95]">
              Four <span className="display-italic">beliefs</span><br />the studio works by.
            </h2>
            <p className="mt-6 mono-sm text-paper-warm/55 max-w-xs">
              Held quietly. Defended only by example.
            </p>
          </div>
          <ol className="md:col-span-8 space-y-2">
            {studio.beliefs.map((b, i) => (
              <Reveal key={b.num} delay={i * 0.07}>
                <li className="grid grid-cols-12 gap-4 items-baseline border-b border-paper-warm/15 pb-8 pt-4">
                  <span className="col-span-2 mono text-paper-warm/55 tabular">{b.num}</span>
                  <p className="col-span-10 display-thin text-2xl md:text-4xl leading-[1.05]">{b.line}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ============= SHOP PREVIEW — printed editions ============= */
function ShopPreview() {
  const featured = shop.products.slice(0, 4)
  return (
    <>
      <HairlineDivider num="04" label="Shop · Printed editions" />
      <section className="container-edge pb-24 md:pb-36">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <Heading num="" label="Reading resources · From the studio" title="Slow reading," italic="printed & posted." />
            <Link to="/shop" className="mono atelier-link text-clay-500">All editions →</Link>
          </div>
        </Reveal>
        <div
          className="
            mt-16 flex overflow-x-auto snap-x snap-mandatory gap-x-6 pb-4 -mx-6 px-6
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:snap-none sm:pb-0 sm:mx-0 sm:px-0
          "
        >
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="shrink-0 w-[78%] snap-start sm:w-auto">
              <ProductCover product={p} size="compact" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

/* ============= FOUNDER — Eunice, full-length, atelier scale ============= */
function Founder() {
  return (
    <section className="container-edge py-28 md:py-40 border-t border-ink/15">
      <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
        {/* Mono index strip */}
        <div className="md:col-span-2">
          <Reveal>
            <span className="mono text-ink/55 tabular">04—1/2 · Founder</span>
          </Reveal>
        </div>

        {/* Bio + signed letter */}
        <div className="md:col-span-6 md:order-1">
          <Reveal>
            <h2 className="display-thin text-[clamp(2.5rem,6vw,5rem)] leading-[0.92]">
              Eunice <br />
              <span className="display-italic">De Campi.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mono-sm text-ink/55 mt-3">b. Lagos · founded the studio in Oxford, 2008</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 text-lg md:text-xl leading-[1.55] text-ink/85 max-w-md">
              {studio.shortBio}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base text-ink/75 leading-relaxed max-w-md">
              Aligned mindset coach, holistic wellbeing strategist, designer, writer — and mother. The disciplines are different doors into the same room.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-sm border-t border-ink/15 pt-5">
              <div>
                <div className="mono-sm text-ink/45">Practising</div>
                <div className="display-thin text-2xl mt-1 tabular">18</div>
                <div className="mono-sm text-ink/55">years</div>
              </div>
              <div>
                <div className="mono-sm text-ink/45">Working</div>
                <div className="display-thin text-2xl mt-1">UK · int.</div>
              </div>
              <div>
                <div className="mono-sm text-ink/45">Studio</div>
                <div className="display-thin text-2xl mt-1">Oxford</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Portrait — full-length, architectural */}
        <div className="md:col-span-4 md:order-2">
          <Reveal delay={0.05}>
            <div className="img-tall overflow-hidden bg-stone-100">
              <img
                src={studio.founderPortrait}
                alt="Eunice De Campi at the Oxford studio"
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 25%' }}
              />
            </div>
            <p className="mono-sm text-ink/55 mt-4 flex justify-between">
              <span>Eunice · Studio · Oxford</span>
              <span className="tabular">2026</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============= NOTES preview ============= */
function NotesPreview() {
  const featured = notes.slice(0, 3)
  return (
    <>
      <HairlineDivider num="05" label="Notes · From the studio" />
      <section className="container-edge pb-24 md:pb-36">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <Heading num="" label="Editorial · Vol. I" title="Slow" italic="reading." />
            <Link to="/notes" className="mono atelier-link text-clay-500">All notes →</Link>
          </div>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-x-6 gap-y-12">
          {featured.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.06}>
              <NoteCard note={n} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

/* ============= VOICES ============= */
function Voices() {
  return (
    <section className="bg-paper-warm py-28 md:py-36 border-t border-ink/15">
      <div className="container-edge">
        <Reveal>
          <Heading num="06" label="Voices · Selected" />
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-px bg-ink/15">
          {voices.map((v, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <figure className="bg-paper-warm p-8 lg:p-10 h-full flex flex-col">
                <span className="mono text-ink/55 tabular">{String(i + 1).padStart(2, '0')}</span>
                <blockquote className="mt-6 display-thin text-2xl md:text-3xl leading-[1.15] flex-1">
                  <span className="display-italic text-clay-500">"</span>{v.quote}<span className="display-italic text-clay-500">"</span>
                </blockquote>
                <figcaption className="mt-6 mono-sm text-ink/65">— {v.name} · {v.role}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section className="container-edge py-32 md:py-44 border-t border-ink/15 text-center">
      <Reveal>
        <span className="mono text-clay-500">07 — Begin</span>
        <h2 className="mt-6 display-thin text-[clamp(3rem,9vw,8rem)] leading-[0.92]">
          Write to the<br /><span className="display-italic">studio.</span>
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-ink/70 leading-relaxed">
          The studio works with a small number of private clients each year. New commissions and coaching enquiries are welcomed by note.
        </p>
        <Link to="/enquire" className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono">
          Enquire →
        </Link>
      </Reveal>
    </section>
  )
}

export default function Studio() {
  return (
    <PageTransition>
      <RingCursor />
      <Hero />
      <StatsRow />
      <Practice />
      <IndexFeatured />
      <Beliefs />
      <Founder />
      <ShopPreview />
      <NotesPreview />
      <Voices />
      <ClosingCTA />
    </PageTransition>
  )
}
