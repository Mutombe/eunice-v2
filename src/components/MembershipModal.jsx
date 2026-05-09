import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, Check } from '@phosphor-icons/react'

export default function MembershipModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [tier, setTier] = useState('Member')
  const [email, setEmail] = useState('')
  const [card, setCard] = useState({ number: '', exp: '', cvc: '' })
  const next = (e) => { e?.preventDefault(); setStep(step + 1) }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-paper w-full max-w-2xl my-12 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-ink/50 hover:text-ink">
          <X size={20} />
        </button>

        <div className="p-10 md:p-14">
          {/* Step indicator */}
          <div className="mono text-ink/55 flex items-center gap-3 mb-10">
            <span>{`Step 0${step}`}</span>
            <span className="flex-1 h-px bg-ink/15"></span>
            <span className="text-ink/35">of 03</span>
          </div>

          {step === 1 && (
            <>
              <h3 className="display-thin text-4xl md:text-5xl leading-[1]">
                Become a member of <span className="display-italic">The Circle</span>.
              </h3>
              <p className="mt-4 text-ink/70 leading-relaxed">A small membership of women across four continents. Capped at 240.</p>
              <div className="space-y-2 mt-10">
                {[
                  { name: 'Member', price: '£14 / month', detail: 'Essays, letters, the Quiet Reports.' },
                  { name: 'Inner Circle', price: '£420 / year', detail: 'All Member benefits + retreats + sessions. By application.' },
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setTier(t.name)}
                    className={`w-full text-left p-5 border transition-all ${
                      tier === t.name ? 'border-ink bg-ink-500 text-paper-warm' : 'border-ink/20 hover:border-ink/60'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="display-thin text-2xl">{t.name}</div>
                        <div className="text-sm opacity-75 mt-1">{t.detail}</div>
                      </div>
                      <div className="mono shrink-0">{t.price}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={next} className="mt-10 w-full py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 mono transition-colors">
                Continue →
              </button>
            </>
          )}

          {step === 2 && (
            <form onSubmit={next}>
              <h3 className="display-thin text-4xl md:text-5xl leading-[1]">A few <span className="display-italic">precise</span> details.</h3>
              <div className="space-y-6 mt-10">
                <div>
                  <label className="mono text-ink/55 block mb-2">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg" />
                </div>
                <div>
                  <label className="mono text-ink/55 block mb-2">Card number</label>
                  <input placeholder="0000 0000 0000 0000" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })}
                    className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg tabular" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mono text-ink/55 block mb-2">Expiry</label>
                    <input placeholder="MM / YY" value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg tabular" />
                  </div>
                  <div>
                    <label className="mono text-ink/55 block mb-2">CVC</label>
                    <input placeholder="•••" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                      className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2 text-lg tabular" />
                  </div>
                </div>
                <p className="mono-sm text-ink/45">Demonstration form · no data stored · no charge made</p>
              </div>
              <button type="submit" className="mt-10 w-full py-4 bg-ink-500 text-paper-warm hover:bg-clay-500 mono transition-colors">
                Confirm membership →
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-12 h-12 mx-auto bg-clay-500 text-paper-warm flex items-center justify-center">
                <Check size={20} />
              </div>
              <h3 className="mt-6 display-thin text-4xl md:text-5xl">
                Welcome to <span className="display-italic">the Circle</span>.
              </h3>
              <p className="mt-4 text-ink/70 max-w-md mx-auto">A confirmation note will arrive shortly. Your first private letter is in this week's send.</p>
              <p className="display-italic text-2xl text-clay-500 mt-6">— Eunice</p>
              <button onClick={onClose} className="mt-8 mono atelier-link">Return to reading</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
