import { useState } from 'react'
import { Check } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Heading from '../components/Heading.jsx'
import { contact, brand } from '../data/siteData.js'

const interests = ['Interiors', 'Mindset', 'Membership', 'Other']

export default function Enquire() {
  const [form, setForm] = useState({ name: '', email: '', interest: 'Interiors', note: '', budget: 'Open' })
  const [sent, setSent] = useState(false)
  const submit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <PageTransition>
      <section className="container-edge pt-20 md:pt-28 pb-12">
        <Heading num="06" label="Enquire · Begin a precise note" />
        <h1 className="mt-10 display-thin text-[clamp(3rem,10vw,9rem)] leading-[0.92]">
          Write to the<br /> <span className="display-italic">studio.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink/80 leading-relaxed">
          {contact.intro}
        </p>
      </section>

      <section className="container-edge pb-32">
        <div className="grid grid-cols-12 gap-12">
          {/* Left rail */}
          <aside className="col-span-12 md:col-span-4 space-y-10">
            {contact.channels.map((ch) => (
              <div key={ch.label}>
                <span className="mono text-ink/55 tabular">{ch.num} · {ch.label}</span>
                <p className="mt-2 display-thin text-2xl md:text-3xl">
                  {ch.href ? <a href={ch.href} className="atelier-link">{ch.value}</a> : ch.value}
                </p>
              </div>
            ))}
            <div>
              <span className="mono text-ink/55">— Elsewhere</span>
              <ul className="mt-3 space-y-1">
                <li><a href={brand.social.instagram} target="_blank" rel="noreferrer" className="atelier-link mono-sm">Instagram · @eunicedecampi</a></li>
                <li><a href={brand.social.linkedin} target="_blank" rel="noreferrer" className="atelier-link mono-sm">LinkedIn</a></li>
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="col-span-12 md:col-span-8 md:pl-12 md:border-l border-ink/15">
            {!sent ? (
              <form onSubmit={submit} className="space-y-10">
                <div>
                  <label className="mono text-ink/55 block mb-2">01 — Name</label>
                  <input
                    type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-xl"
                  />
                </div>
                <div>
                  <label className="mono text-ink/55 block mb-2">02 — Email</label>
                  <input
                    type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-xl"
                  />
                </div>
                <div>
                  <label className="mono text-ink/55 block mb-3">03 — What brings you to the studio?</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((i) => (
                      <button
                        type="button" key={i}
                        onClick={() => setForm({ ...form, interest: i })}
                        className={`px-4 py-2 mono transition-colors ${
                          form.interest === i ? 'bg-ink-500 text-paper-warm' : 'border border-ink/30 hover:border-ink'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
                {form.interest === 'Interiors' && (
                  <div>
                    <label className="mono text-ink/55 block mb-3">04 — Indicative budget</label>
                    <div className="flex flex-wrap gap-2">
                      {['Under £40k', '£40k – £100k', '£100k – £250k', '£250k +', 'Open'].map((b) => (
                        <button
                          type="button" key={b}
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`px-4 py-2 mono transition-colors ${
                            form.budget === b ? 'bg-clay-500 text-paper-warm' : 'border border-ink/30 hover:border-ink'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="mono text-ink/55 block mb-2">05 — A short note</label>
                  <textarea
                    required rows={6} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="Tell the studio a little about where you are, and what you would like to make."
                    className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg leading-relaxed resize-none"
                  />
                </div>
                <div className="pt-4">
                  <button type="submit" className="px-8 py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono">
                    Send the note →
                  </button>
                  <p className="mt-3 mono-sm text-ink/45">A reply usually arrives within three working days.</p>
                </div>
              </form>
            ) : (
              <Reveal>
                <div className="border-t border-ink/20 pt-10">
                  <div className="w-12 h-12 bg-clay-500 text-paper-warm flex items-center justify-center"><Check size={20} /></div>
                  <h2 className="mt-6 display-thin text-5xl md:text-6xl leading-tight">
                    Your note has <span className="display-italic">arrived.</span>
                  </h2>
                  <p className="mt-4 max-w-md text-ink/80">
                    Thank you, {form.name?.split(' ')[0] || 'friend'}. The studio will read it carefully and write back, slowly, within a few days.
                  </p>
                  <p className="display-italic text-3xl text-clay-500 mt-6">— Eunice</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
