import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'

/* Hero C — Centered Architectural.
 * All-type. No hero image. The logo, the headline, and the type alone.
 * Register: Cereal essay / museum poster / architecture firm.
 * The most restrained option — leans fully into Cormorant + Inter +
 * Eunice's wordmark elsewhere on the page.
 */
export default function HeroC() {
  return (
    <section className="relative h-[100svh] md:h-[88svh] max-h-[820px] flex flex-col items-center justify-center container-edge text-center">
      {/* Eyebrow with hairlines */}
      <div className="flex items-center gap-4 text-ink/65">
        <span className="w-10 md:w-16 h-px bg-ink/30" />
        <span className="mono tracking-[0.3em] text-[0.7rem] md:text-xs">STUDIO · MMXXVI</span>
        <span className="w-10 md:w-16 h-px bg-ink/30" />
      </div>

      <h1 className="mt-10 md:mt-14 display-thin leading-[0.92] max-w-5xl text-[clamp(2.75rem,9vw,9rem)]">
        The <span className="display-italic">considered</span>
        <br />
        work of <span className="display-italic">becoming.</span>
      </h1>

      <p className="mt-10 text-base md:text-xl text-ink/75 max-w-2xl leading-[1.6]">
        Coaching for reinvention, recovery, and the long work of
        becoming someone new. For women in their second season.
      </p>

      <div className="mt-12 md:mt-14 flex items-center gap-10 flex-wrap justify-center">
        <Link
          to="/programmes"
          className="mono tracking-[0.2em] text-ink atelier-link inline-flex items-center gap-2 text-[0.75rem]"
        >
          READ THE PROGRAMMES <ArrowRight size={12} />
        </Link>
        <Link
          to="/enquire"
          className="mono tracking-[0.2em] text-ink/65 hover:text-clay-500 transition-colors text-[0.75rem]"
        >
          APPLY · BY NOTE
        </Link>
      </div>

      {/* Footer caption — small index */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="mono-sm tracking-[0.3em] text-ink/40 text-[0.65rem]">— 01 / 04 —</span>
      </div>
    </section>
  )
}
