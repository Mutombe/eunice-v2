import HeroA from '../components/hero/HeroA.jsx'
import HeroB from '../components/hero/HeroB.jsx'
import HeroC from '../components/hero/HeroC.jsx'
import HeroD from '../components/hero/HeroD.jsx'

/* /heroes — a stacked lineup of every hero direction so the four can be
 * compared in one scroll. Each is the real component (not a screenshot),
 * so links work and the live palette applies. A labelled banner sits
 * above each so it's clear which is which.
 *
 * Not linked in the nav — a private review page. Share the URL directly. */

const LINEUP = [
  { id: 'A', Hero: HeroA, name: 'Editorial Cover',
    note: 'Full-bleed b&w portrait. Headline on the quiet left half.' },
  { id: 'B', Hero: HeroB, name: 'Split — Portrait + Manifesto',
    note: 'Eunice on the left, brand statement on the right.' },
  { id: 'C', Hero: HeroC, name: 'Centered Architectural',
    note: 'All type, no image. The most restrained direction.' },
  { id: 'D', Hero: HeroD, name: 'Asymmetric Editorial Poster',
    note: 'Dropped-line headline, small portrait inset, issue-cover feel.' },
]

export default function Heroes() {
  return (
    <div className="bg-paper">
      {/* Page header */}
      <header className="container-edge pt-28 md:pt-32 pb-10 border-b border-ink/10">
        <p className="mono tracking-[0.3em] text-[0.7rem] text-clay-500">REVIEW · HERO DIRECTIONS</p>
        <h1 className="display-thin text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mt-3">
          Four ways to <span className="display-italic">open</span> the page.
        </h1>
        <p className="text-ink/70 max-w-xl mt-4">
          The same site, four hero treatments. Scroll through and note which
          one feels most like you — everything below the fold is identical.
        </p>
      </header>

      {LINEUP.map(({ id, Hero, name, note }) => (
        <section key={id} aria-label={`Hero ${id}`}>
          {/* Label banner */}
          <div className="container-edge py-6 flex items-baseline gap-5 border-b border-ink/10">
            <span className="display-italic text-clay-500 text-3xl md:text-4xl leading-none">{id}</span>
            <div>
              <h2 className="display-thin text-xl md:text-2xl leading-tight">{name}</h2>
              <p className="mono-sm tracking-[0.12em] text-ink/55 text-[0.7rem] mt-1">{note}</p>
            </div>
          </div>
          {/* The real hero */}
          <Hero />
        </section>
      ))}

      <footer className="container-edge py-16 text-center">
        <p className="mono-sm tracking-[0.18em] text-ink/45 text-[0.7rem]">
          EDC · HERO REVIEW · MMXXVI
        </p>
      </footer>
    </div>
  )
}
