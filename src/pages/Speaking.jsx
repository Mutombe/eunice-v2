import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import { useSettings } from '../lib/settings.jsx'

/* Speaking — topics, formats, past engagements, booking CTA.
   Content from SiteSettings.speaking — admin-editable. */

export default function Speaking() {
  const { speaking } = useSettings()

  return (
    <PageTransition>
      <Seo
        title="Speaking"
        path="/speaking"
        description={speaking.lede || 'Keynote, workshop and fireside formats — on the architecture of a considered life.'}
      />

      {/* === Masthead === */}
      <section className="container-edge pt-20 md:pt-28 pb-12 md:pb-16">
        <Heading num="07" label={speaking.edition || 'Speaking · MMXXVI'} />
        {speaking.pretitle && (
          <p className="mt-10 mono text-clay-500 tracking-[0.2em]">— {speaking.pretitle}</p>
        )}
        <h1 className="mt-6 display-thin text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.9]">
          {speaking.title}{' '}
          <span className="display-italic">{speaking.titleEm}</span>
          {speaking.title2 && <><br />{speaking.title2}</>}
        </h1>
        {speaking.lede && (
          <p className="mt-10 display-thin text-xl md:text-2xl text-ink/80 max-w-3xl leading-[1.35]">
            {speaking.lede}
          </p>
        )}
        {speaking.audience && (
          <p className="mt-6 mono-sm text-ink/65 max-w-2xl">— For {speaking.audience}</p>
        )}
      </section>

      {/* === Topics === */}
      {(speaking.topics || []).length > 0 && (
        <section className="border-t border-ink/15">
          <div className="container-edge py-16 md:py-24">
            <Heading num="I" label="Topics" />
            <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-14">
              {speaking.topics.map((t) => (
                <Reveal key={t.num + t.title}>
                  <div>
                    <div className="flex items-center gap-3 mono-sm text-clay-500">
                      <span className="tabular">{t.num}</span>
                      <span className="w-6 h-px bg-clay-500/40" />
                    </div>
                    <h3 className="mt-4 display-thin text-3xl md:text-4xl leading-[1.05]">
                      {t.title}
                    </h3>
                    <p className="mt-4 text-ink/80 leading-relaxed">{t.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Formats === */}
      {(speaking.formats || []).length > 0 && (
        <section className="border-t border-ink/15 bg-paper-warm">
          <div className="container-edge py-16 md:py-24">
            <Heading num="II" label="Formats" />
            <ul className="mt-10 divide-y divide-ink/15 max-w-3xl">
              {speaking.formats.map((f) => (
                <li key={f.num + f.label} className="py-6 grid grid-cols-12 gap-4 items-baseline">
                  <span className="col-span-2 mono-sm text-clay-500 tabular">{f.num}</span>
                  <span className="col-span-3 display-thin text-2xl md:text-3xl">{f.label}</span>
                  <span className="col-span-7 text-ink/80 leading-relaxed">{f.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* === Past engagements === */}
      {(speaking.engagements || []).length > 0 && (
        <section className="border-t border-ink/15">
          <div className="container-edge py-16 md:py-24">
            <Heading num="III" label="Selected engagements" />
            <ul className="mt-10 divide-y divide-ink/15 max-w-4xl">
              {speaking.engagements.map((e, i) => (
                <li key={i} className="py-6 grid grid-cols-12 gap-4 items-baseline">
                  <span className="col-span-2 mono-sm text-clay-500 tabular">{e.date}</span>
                  <span className="col-span-5 mono text-ink/80">{e.venue}</span>
                  <span className="col-span-5 display-thin text-xl md:text-2xl leading-tight">{e.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* === CTA === */}
      <section className="container-edge py-24 md:py-32 text-center">
        <h2 className="display-thin text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
          For a stage, a salon, a <span className="display-italic">long table</span> —
        </h2>
        <Link
          to={speaking.cta?.to || '/enquire?subject=speaking'}
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono"
        >
          {speaking.cta?.label || 'Invite Eunice to speak'} →
        </Link>
      </section>
    </PageTransition>
  )
}
