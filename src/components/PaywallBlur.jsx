import { useState } from 'react'
import { Lock } from '@phosphor-icons/react'
import { AnimatePresence } from 'framer-motion'
import MembershipModal from './MembershipModal.jsx'

export default function PaywallBlur({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="relative max-h-[24rem] overflow-hidden">
        {children}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-paper/0 via-paper/85 to-paper" />
      </div>

      <div className="mt-12 border-y border-ink/15 py-12">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-2">
            <span className="mono inline-flex items-center gap-2 text-clay-500"><Lock size={11} /> Members</span>
          </div>
          <div className="md:col-span-7">
            <p className="display-thin text-3xl md:text-4xl leading-[1.1]">
              The remainder of this <span className="display-italic">essay</span> is held inside The Circle.
            </p>
            <p className="mt-4 text-ink/70 leading-relaxed">
              Members read every essay, the quarterly Quiet Reports, and receive the monthly private letter.
            </p>
          </div>
          <div className="md:col-span-3">
            <button
              onClick={() => setOpen(true)}
              className="w-full mono py-3.5 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors"
            >
              Join the Circle →
            </button>
            <p className="mono-sm text-ink/40 mt-3">From £14 / month · cancel anytime</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && <MembershipModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
