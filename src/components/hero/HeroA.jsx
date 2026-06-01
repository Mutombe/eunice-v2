import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'

/* Hero A — Editorial Cover.
 *
 * Full-bleed cover image (the black-and-white kitchen portrait from her
 * "How to Navigate Unexpected Life Changes" post). The image is landscape,
 * so no awkward portrait-in-landscape cropping — her face sits naturally
 * in the upper-right. Headline goes left where the composition is quiet.
 */
const COVER_URL =
  'https://sfo3.digitaloceanspaces.com/edc/blog/navigate-unexpected-life-changes.jpg'

export default function HeroA() {
  return (
    <section className="relative h-[100svh] md:h-[88svh] max-h-[820px] overflow-hidden bg-ink-500">
      {/* Full-bleed cover image */}
      <div className="absolute inset-0">
        <img
          src={COVER_URL}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        {/* Soft gradient from the LEFT — keeps her face visible on the
            right while seating the headline cleanly on the left. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-500/75 via-ink-500/30 to-transparent pointer-events-none" />
        {/* Light vignette at bottom for any text overflow */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-500/60 to-transparent pointer-events-none" />
      </div>

      {/* Top eyebrow */}
      <div className="absolute top-0 left-0 right-0 container-edge pt-6 md:pt-10 flex items-baseline justify-between text-paper-warm">
        <span className="mono tracking-[0.3em] text-[0.7rem] md:text-xs">STUDIO</span>
        <span className="mono-sm tracking-[0.2em] text-[0.7rem]">MMXXVI · No. 01</span>
      </div>

      {/* Headline + CTAs — sits LEFT, over the gradient-darkened side */}
      <div className="absolute inset-0 container-edge flex items-center">
        <div className="md:w-7/12 lg:w-1/2 text-paper-warm">
          <p className="mono-sm tracking-[0.25em] text-paper-warm/85 mb-5 text-[0.75rem]">
            For women in their second season
          </p>
          <h1 className="display-thin text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95]">
            On the <span className="display-italic">considered</span><br />
            work of <span className="display-italic">becoming.</span>
          </h1>
          <div className="mt-8 md:mt-12 flex items-center gap-8 flex-wrap">
            <Link
              to="/enquire"
              className="mono tracking-[0.2em] text-paper-warm border-b border-paper-warm/70 hover:border-paper-warm pb-1 inline-flex items-center gap-2"
            >
              APPLY <ArrowRight size={12} />
            </Link>
            <Link
              to="/practice"
              className="mono tracking-[0.2em] text-paper-warm/80 hover:text-paper-warm transition-colors"
            >
              READ THE PRACTICE
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
