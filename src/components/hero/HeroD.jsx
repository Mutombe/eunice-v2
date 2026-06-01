import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'

/* Hero D — Asymmetric Editorial Poster.
 *
 * A different composition entirely from Hero C: left 60% holds the
 * dropped-line headline with the eyebrow above and a body block + CTAs
 * stacked below; right 40% holds a small portrait inset with caption,
 * sitting on a warm-stone backplate. Numbered nav of disciplines runs
 * down the very left edge — a true "issue cover" feel.
 *
 * Light kinetic pacing on entry (~2s total) layers the elements in.
 */

const ease = [0.21, 0.47, 0.32, 0.98]

const DISCIPLINES = [
  ['I',   'Coaching'],
  ['II',  'Interiors'],
  ['III', 'Journal'],
  ['IV',  'Retreats'],
]

export default function HeroD() {
  return (
    <section className="relative md:h-[88svh] md:max-h-[820px] bg-paper overflow-hidden">
      {/* Left rail — vertical numbered disciplines, desktop only */}
      <motion.aside
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.4, ease }}
        aria-hidden
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col gap-5"
      >
        {DISCIPLINES.map(([n, label]) => (
          <div key={n} className="flex items-baseline gap-3">
            <span className="mono-sm tabular text-clay-500 text-[0.65rem] w-5">{n}</span>
            <span className="mono tracking-[0.25em] text-ink/55 text-[0.65rem]">{label}</span>
          </div>
        ))}
      </motion.aside>

      <div className="container-edge h-full grid md:grid-cols-12 gap-10 md:gap-14 items-center py-12 md:py-0">
        {/* Left 7/12 — eyebrow + dropped-line headline + body + CTAs */}
        <div className="md:col-span-7 md:col-start-2 lg:col-start-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="flex items-baseline gap-3 mono tracking-[0.3em] text-clay-500 text-[0.7rem]"
          >
            <span className="tabular">EDC</span>
            <span className="w-6 h-px bg-clay-500/50" />
            <span>STUDIO · MMXXVI · NO. 01</span>
          </motion.div>

          {/* Dropped-line headline — each line offsets the next, asymmetric. */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { delayChildren: 0.55, staggerChildren: 0.18 } },
            }}
            className="mt-8 md:mt-12 display-thin text-[clamp(2.5rem,8vw,8rem)] leading-[0.92]"
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="block">
              The
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="block display-italic pl-[1em]"
            >
              considered
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="block">
              work of
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="block display-italic pl-[2em]"
            >
              becoming.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6, ease }}
            className="mt-8 md:mt-10 max-w-md text-base md:text-lg text-ink/75 leading-[1.6]"
          >
            A wellbeing practice for women in their second season — coaching
            for reinvention, recovery, and the long work of becoming someone new.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9, ease }}
            className="mt-8 md:mt-10 flex items-center gap-6 flex-wrap"
          >
            <Link
              to="/programmes"
              className="mono tracking-[0.2em] text-ink atelier-link inline-flex items-center gap-2 text-[0.75rem]"
            >
              READ THE PROGRAMMES <ArrowRight size={12} />
            </Link>
            <Link
              to="/enquire"
              className="mono tracking-[0.2em] text-clay-500 hover:text-ink transition-colors text-[0.75rem]"
            >
              APPLY · BY NOTE
            </Link>
          </motion.div>
        </div>

        {/* Right 4/12 — portrait inset with caption */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.0, ease }}
          className="md:col-span-4 self-stretch flex flex-col justify-center"
        >
          <div className="relative aspect-[3/4] md:aspect-[3/4] bg-stone-100 overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}eunice/window.jpg`}
              alt="Eunice De Campi"
              className="w-full h-full object-cover object-top"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="mt-4 mono-sm tracking-[0.22em] text-ink/65 text-[0.65rem]">
            <span>EUNICE DE CAMPI</span>
          </figcaption>
        </motion.figure>
      </div>

      {/* Bottom-right small caption */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-6 right-6 hidden md:block"
      >
        <span className="mono-sm tracking-[0.3em] text-ink/40 text-[0.65rem]">
          — ISSUE No. 01 / Spring MMXXVI
        </span>
      </motion.div>
    </section>
  )
}
