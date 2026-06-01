import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'

/* Hero B — Split: Portrait + Manifesto.
 * Left half = Eunice (full-length, professional). Right half = brand
 * statement + body + CTAs. Visitor meets her before the words.
 * Image: standing.jpg (white top / black skirt — confident, clean kitchen).
 * Mobile: portrait stacks on top, statement below.
 */
export default function HeroB() {
  return (
    <section className="relative grid md:grid-cols-2 md:h-[88svh] md:max-h-[820px] bg-paper">
      {/* Left — Portrait. The image is oversized vertically (~160% of
          container) and top-anchored, so the visible window lands on the
          face + upper body and never reaches the legs. Sides crop instead
          of legs cropping. */}
      <div className="relative md:order-1 h-[55svh] md:h-auto overflow-hidden bg-stone-100">
        <img
          src={`${import.meta.env.BASE_URL}eunice/standing.jpg`}
          alt="Eunice De Campi"
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[160%] w-auto max-w-none object-cover object-top"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      {/* Right — Manifesto */}
      <div className="md:order-2 flex flex-col justify-center container-edge py-12 md:py-0">
        <p className="mono tracking-[0.25em] text-clay-500 text-[0.75rem]">
          STUDIO · MMXXVI
        </p>
        <h1 className="mt-6 display-thin text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] text-ink">
          The<br />
          <span className="display-italic">considered</span><br />
          work of<br />
          <span className="display-italic">becoming.</span>
        </h1>
        <p className="mt-8 text-base md:text-lg text-ink/75 max-w-md leading-[1.6]">
          A wellbeing practice for women rebuilding after loss,
          burnout, and reinvention. Coaching, considered interiors,
          and a quarterly journal of considered living.
        </p>
        <div className="mt-10 flex items-center gap-8 flex-wrap">
          <Link
            to="/programmes"
            className="mono tracking-[0.2em] text-ink hover:text-clay-500 inline-flex items-center gap-2 transition-colors"
          >
            — PROGRAMMES <ArrowRight size={12} />
          </Link>
          <Link
            to="/enquire"
            className="mono tracking-[0.2em] text-clay-500 hover:text-ink transition-colors"
          >
            — APPLY
          </Link>
        </div>
      </div>
    </section>
  )
}
