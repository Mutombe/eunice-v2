import { useState, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import MembershipModal from '../components/MembershipModal.jsx'
import { membership } from '../data/siteData.js'

export default function Membership() {
  const [open, setOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress: sp } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yBg = useTransform(sp, [0, 1], [0, 220])

  return (
    <PageTransition>
      {/* Hero — strict one viewport */}
      <section ref={heroRef} className="relative hero-fit border-b border-ink/15">
        <motion.div style={{ y: yBg }} className="absolute inset-0 -top-[8%] h-[116%] opacity-[0.22] -z-10">
          <img src={membership.heroImage} alt="" className="w-full h-full object-cover object-center" />
        </motion.div>
        <div className="container-edge pt-6 md:pt-8 flex items-center justify-between">
          <span className="mono hero-eyebrow text-clay-500">{membership.pretitle}</span>
          <span className="mono hero-eyebrow text-ink/55 hidden md:inline tabular">240 / 240 capped · 71 places open</span>
        </div>
        <div className="container-edge self-center w-full">
          <h1 className="display-thin hero-display">
            The <span className="display-italic">Circle.</span>
          </h1>
        </div>
        <div className="container-edge pb-6 md:pb-8">
          <p className="max-w-xl hero-body text-ink/85">
            {membership.pitch}
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="container-edge py-24 md:py-32 border-b border-ink/15">
        <Reveal>
          <Heading num="01" label="Three doors" title="Read freely. Or" italic="read deeply." />
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-px bg-ink/15">
          {membership.tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className={`p-8 lg:p-10 h-full flex flex-col ${
                t.highlighted ? 'bg-ink-500 text-paper-warm' : 'bg-paper'
              }`}>
                <span className={`mono tabular ${t.highlighted ? 'text-paper-warm/55' : 'text-ink/55'}`}>{t.num} — Tier</span>
                <h3 className="mt-4 display-thin text-5xl md:text-6xl">{t.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="display-thin text-3xl tabular">{t.price}</span>
                  <span className={`text-sm ${t.highlighted ? 'text-paper-warm/65' : 'text-ink/65'}`}>{t.cadence}</span>
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 mono-sm leading-relaxed">
                      <Check size={12} className={`mt-1 shrink-0 ${t.highlighted ? 'text-clay-300' : 'text-clay-500'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setOpen(true)}
                  className={`mt-10 py-3.5 mono transition-colors ${
                    t.highlighted ? 'bg-paper-warm text-ink hover:bg-clay-300' : 'border border-ink hover:bg-ink-500 hover:text-paper-warm'
                  }`}
                >
                  {t.cta} →
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* === Founder portrait + signed letter === */}
      <section className="container-edge py-24 md:py-32 border-b border-ink/15">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <div className="img-tall overflow-hidden bg-stone-100">
                <img
                  src={membership.founderPortrait}
                  alt="Eunice De Campi by the studio window"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
              <p className="mono-sm text-ink/55 mt-4 flex justify-between">
                <span>Eunice — Founder · Oxford</span>
                <span className="tabular">2026</span>
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pl-6">
            <Reveal delay={0.1}>
              <span className="mono text-clay-500">— a short letter, on the Circle</span>
              <p className="display-italic text-3xl md:text-4xl text-ink mt-4">Dear one,</p>
              <p className="display-thin text-2xl md:text-3xl mt-6 leading-[1.25]">
                I built this circle because the work is too long, too tender, and too important to do alone.
              </p>
              <p className="mt-6 text-base text-ink/80 leading-relaxed max-w-md">
                The Circle is small on purpose — capped at 240 women — so the conversations are real and the letters arrive into a known room. I read every reply.
              </p>
              <p className="display-italic text-3xl text-clay-500 mt-8">— Eunice</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Retreats */}
      <section className="container-edge py-24 md:py-32 border-b border-ink/15">
        <Reveal>
          <Heading num="02" label="Two annual retreats" title="In Oxford & the" italic="Cotswolds." />
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 gap-px bg-ink/15">
          {membership.retreats.map((r, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="bg-paper p-10 md:p-14 h-full">
                <span className="mono text-clay-500 tabular">{r.num}</span>
                <h3 className="mt-4 display-thin text-5xl md:text-6xl leading-[0.95]">{r.season}</h3>
                <p className="mt-4 mono-sm text-ink/55">{r.date} · {r.location}</p>
                <p className="mt-6 text-ink/85 leading-relaxed">
                  Three nights, twelve members, considered food, considered silence. The retreats are the slow-time of the membership year — the place where the year's writing is read aloud, walked through, and put to rest.
                </p>
                <p className="mt-6 mono-sm text-ink/55">{r.spots}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-paper-warm py-24 md:py-32 border-b border-ink/15">
        <div className="container-edge">
          <Reveal>
            <Heading num="03" label="What lives inside" title="Six quiet" italic="benefits." />
          </Reveal>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15">
            {[
              { num: '01', h: 'Members essays', p: 'Two long essays each month — for subjects too tender or too long for the public.' },
              { num: '02', h: 'The Quiet Reports', p: 'A 30-40 page private dossier, posted in the first week of each season.' },
              { num: '03', h: 'The private letter', p: 'A monthly letter from the studio. Written, not generated. Read by the people it is sent to.' },
              { num: '04', h: 'Two annual retreats', p: 'Oxford in spring, Cotswolds in autumn. Twelve members each. Three nights.' },
              { num: '05', h: 'The members archive', p: 'Every essay, letter and report from launch onward. Searchable, downloadable, kept.' },
              { num: '06', h: 'Annual print edition', p: 'For Inner Circle members. A quietly beautiful book of the year, posted in December.' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="bg-paper-warm p-8 lg:p-10 h-full">
                  <span className="mono text-ink/55 tabular">{c.num}</span>
                  <h3 className="mt-4 display-thin text-2xl md:text-3xl leading-[1.05]">{c.h}</h3>
                  <p className="mt-3 text-ink/75 leading-relaxed text-sm">{c.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge py-28 md:py-36 text-center">
        <h2 className="display-thin text-[clamp(3rem,9vw,8rem)] leading-[0.95] max-w-3xl mx-auto">
          Become a <span className="display-italic">member.</span>
        </h2>
        <button onClick={() => setOpen(true)} className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono">
          Join the Circle →
        </button>
      </section>

      <AnimatePresence>
        {open && <MembershipModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </PageTransition>
  )
}
