import { Link, useParams, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCover from '../components/ProductCover.jsx'
import { shop } from '../data/siteData.js'

export default function ShopProduct() {
  const { slug } = useParams()
  const product = shop.products.find((p) => p.slug === slug)
  if (!product) return <Navigate to="/shop" replace />
  const idx = shop.products.findIndex((p) => p.slug === slug)
  const next = shop.products[(idx + 1) % shop.products.length]
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [card, setCard] = useState({ number: '', exp: '', cvc: '' })

  return (
    <PageTransition>
      <section className="container-edge pt-16 pb-10">
        <Link to="/shop" className="mono atelier-link inline-flex items-center gap-2"><ArrowLeft size={12} /> Back · Shop</Link>
      </section>

      <section className="container-edge pb-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-6 md:sticky md:top-32 self-start">
            <Reveal>
              <ProductCover product={product} size="hero" asLink={false} />
              <div className="mt-5 flex items-baseline justify-between mono text-ink/55">
                <span>{product.num} · Posted from the studio</span>
                <span className="tabular">{product.edition}</span>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            {product.series && (
              <Reveal>
                <span className="mono text-clay-500">{product.num} · {product.series}</span>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h1 className="mt-4 display-thin text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]">
                {product.italicTitle ? (
                  (() => {
                    const idx = product.name.toLowerCase().indexOf(product.italicTitle.toLowerCase())
                    if (idx === -1) return product.name
                    return (
                      <>
                        {product.name.slice(0, idx)}
                        <span className="display-italic">{product.name.slice(idx, idx + product.italicTitle.length)}</span>
                        {product.name.slice(idx + product.italicTitle.length)}
                      </>
                    )
                  })()
                ) : (
                  product.name
                )}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 display-italic text-2xl text-ink/85">{product.subtitle}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-lg leading-[1.65] text-ink/85">{product.blurb}</p>
            </Reveal>

            {/* Colophon — atelier museum-label spec grid */}
            <Reveal delay={0.18}>
              <dl className="mt-10 grid grid-cols-2 gap-y-4 gap-x-6 border-t border-b border-ink/15 py-6">
                {[
                  ['Format',  product.format],
                  ['Extent',  product.pages],
                  ['Binding', product.binding],
                  ['Edition', product.edition],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono-sm text-ink/55 text-[0.55rem]">{k}</dt>
                    <dd className="mt-1 display-thin text-base">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="mono-sm text-ink/55">From the studio</div>
                  <div className="display-thin text-3xl tabular mt-1">{product.price}</div>
                </div>
                <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono">
                  Add to basket <ArrowRight size={12} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.27}>
              <ul className="mt-10 space-y-2 text-sm text-ink/75">
                {[
                  'Posted from the Oxford studio within five working days.',
                  'Hand-bound or letterpress where indicated.',
                  'Members of The Circle receive 10% off — automatic at checkout.',
                ].map((l, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} className="mt-1 text-clay-500 shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15">
        <Link to={`/shop/${next.slug}`} className="container-edge py-16 md:py-20 grid grid-cols-12 gap-6 hover:bg-paper-warm transition-colors group">
          <span className="col-span-12 md:col-span-3 mono text-ink/55 self-end">{next.num} · Next →</span>
          <h3 className="col-span-12 md:col-span-9 display-thin text-3xl md:text-5xl group-hover:text-clay-500 transition-colors">{next.name}</h3>
        </Link>
      </section>

      {/* Mock checkout */}
      <AnimatePresence>
        {step > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setStep(0)}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper w-full max-w-xl my-12 p-10 md:p-14">
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2) }}>
                  <span className="mono text-clay-500">Step 01 — Where to send it</span>
                  <h3 className="mt-3 display-thin text-3xl md:text-4xl">{product.name} <span className="display-italic">— posting to.</span></h3>
                  <div className="mt-8 space-y-5">
                    <div>
                      <label className="mono text-ink/55 block mb-2">Email</label>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg" />
                    </div>
                    <div>
                      <label className="mono text-ink/55 block mb-2">Postal address (UK only for printed)</label>
                      <textarea rows={3} className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-base resize-none" />
                    </div>
                  </div>
                  <button type="submit" className="mt-8 w-full py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 mono transition-colors">Continue →</button>
                </form>
              )}
              {step === 2 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(3) }}>
                  <span className="mono text-clay-500">Step 02 — Card details</span>
                  <h3 className="mt-3 display-thin text-3xl md:text-4xl">A few <span className="display-italic">precise</span> details.</h3>
                  <div className="mt-8 space-y-5">
                    <div>
                      <label className="mono text-ink/55 block mb-2">Card number</label>
                      <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="0000 0000 0000 0000"
                        className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="mono text-ink/55 block mb-2">Expiry</label>
                        <input value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} placeholder="MM / YY"
                          className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg" />
                      </div>
                      <div>
                        <label className="mono text-ink/55 block mb-2">CVC</label>
                        <input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} placeholder="•••"
                          className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg" />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="mt-8 w-full py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 mono transition-colors">Confirm · {product.price}</button>
                </form>
              )}
              {step === 3 && (
                <div className="text-center py-6">
                  <div className="w-12 h-12 mx-auto bg-clay-500 text-paper-warm flex items-center justify-center"><Check size={20} /></div>
                  <h3 className="mt-6 display-thin text-3xl md:text-4xl">Posted with <span className="display-italic">care.</span></h3>
                  <p className="mt-4 text-ink/75 max-w-md mx-auto">A confirmation note will arrive shortly. Your edition will be in the post by Friday.</p>
                  <p className="display-italic text-2xl text-clay-500 mt-6">— Eunice</p>
                  <button onClick={() => setStep(0)} className="mt-8 mono atelier-link">Return to the shop</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
