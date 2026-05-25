import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* A small GDPR-baseline cookie/storage notice.
   The site currently uses only first-party local storage (auth token,
   dismissed-notification preference, this consent record itself) and no
   third-party tracking, so the message stays honest and brief. */

const KEY = 'edc.cookieConsent'

export default function CookieConsent() {
  const [choice, setChoice] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'accepted' || saved === 'declined') setChoice(saved)
    } catch { /* storage unavailable */ }
  }, [])

  function save(value) {
    setChoice(value)
    try { localStorage.setItem(KEY, value) } catch { /* storage unavailable */ }
  }

  // Don't render until mounted (avoids a brief visible flh while reading storage).
  if (!mounted || choice) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        role="dialog"
        aria-label="Cookie preferences"
        className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-paper-warm border border-ink/15 p-5 md:p-6 shadow-[0_30px_60px_-20px_rgba(26,26,25,0.22)]"
      >
        <p className="mono-sm text-clay-500 tracking-[0.18em]">— A small note</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/85">
          The studio uses a little local storage to remember your reading preferences,
          and counts page views <em>anonymously</em> to know which essays land.
          <span className="block mt-1 text-ink/70">No individual tracking. No third-party cookies.</span>
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => save('accepted')}
            className="px-5 py-2.5 bg-ink-500 text-paper-warm hover:bg-clay-500 transition-colors mono text-xs tracking-[0.2em]"
          >
            ACCEPT
          </button>
          <button
            onClick={() => save('declined')}
            className="px-5 py-2.5 border border-ink/30 hover:border-ink hover:bg-stone-50 transition-colors mono text-xs tracking-[0.2em]"
          >
            DECLINE
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
