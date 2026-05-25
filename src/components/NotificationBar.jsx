import { Link } from 'react-router-dom'
import { X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { useSettings } from '../lib/settings.jsx'

/* The notice bar's content comes from site settings (editable in the admin).
   Per-visitor dismissal stays in localStorage. */
const DISMISSED_KEY = 'eunice-v2.notification.dismissed'

export default function NotificationBar() {
  const { notification: n } = useSettings()
  const [dismissed, setDismissed] = useLocalStorage(DISMISSED_KEY, '')
  const visible = n?.enabled && dismissed !== n.message

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="bg-ink-500 text-paper-warm overflow-hidden relative z-40"
          role="status"
        >
          <div className="container-edge py-2 flex items-center gap-4 justify-between">
            <span className="flex items-center gap-3 truncate">
              <span aria-hidden className="hidden sm:block w-3 h-px bg-clay-400" />
              <span className="mono-sm tracking-[0.18em] text-paper-warm/85 truncate">
                {n.message}
              </span>
            </span>
            <span className="flex items-center gap-3 shrink-0">
              {n.linkLabel && n.linkTo && (
                <Link to={n.linkTo} className="mono-sm text-clay-300 atelier-link whitespace-nowrap">
                  {n.linkLabel} →
                </Link>
              )}
              <button
                onClick={() => setDismissed(n.message)}
                aria-label="Dismiss notification"
                className="text-paper-warm/65 hover:text-paper-warm transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
