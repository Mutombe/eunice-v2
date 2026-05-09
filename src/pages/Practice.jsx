import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import { practice, studio } from '../data/siteData.js'

export default function Practice() {
  return (
    <PageTransition>
      <section className="container-edge pt-20 md:pt-28 pb-16">
        <Heading num="02" label="The Practice · Disciplines" />
        <h1 className="mt-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
          One studio, <br /> <span className="display-italic">four</span> disciplines.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-ink/75 max-w-2xl leading-relaxed">
          {studio.shortBio}
        </p>
      </section>

      {/* Pillars */}
      <section className="border-t border-ink/15">
        {practice.map((p, i) => (
          <Reveal key={p.slug}>
            <Link to={`/practice/${p.slug}`} className="group block border-b border-ink/15 hover:bg-paper-warm transition-colors">
              <div className="container-edge grid md:grid-cols-12 gap-x-6 gap-y-6 py-12 md:py-16 items-start">
                <div className="md:col-span-2">
                  <span className="mono text-clay-500 tabular text-base">{p.num}</span>
                </div>
                <div className="md:col-span-6">
                  <h2 className="display-thin text-5xl md:text-7xl leading-[0.92] group-hover:text-clay-500 transition-colors">{p.title}</h2>
                  <p className="mono-sm text-ink/55 mt-3">{p.discipline}</p>
                  <p className="mt-6 text-ink/85 leading-relaxed text-lg max-w-xl">{p.short}</p>
                  <span className="mt-6 inline-block mono atelier-link">Read the discipline →</span>
                </div>
                <div className="md:col-span-4 self-start">
                  <div className="img-cover overflow-hidden">
                    <img src={p.image} alt={p.title} loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* Closing */}
      <section className="container-edge py-24 md:py-32 text-center">
        <h2 className="display-thin text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
          For everything else, <span className="display-italic">simply write.</span>
        </h2>
        <Link to="/enquire" className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono">
          Enquire →
        </Link>
      </section>
    </PageTransition>
  )
}
