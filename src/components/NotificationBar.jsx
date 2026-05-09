import { Link } from 'react-router-dom'
import { X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import useLocalStorage from '../hooks/useLocalStorage.js'

const KEY = 'eunice-v2.notification'
const DISMISSED_KEY = 'eunice-v2.notification.dismissed'

export const DEFAULT_NOTIFICATION = {
  enabled: false,
  message: 'The Quiet Report · Q1 has arrived. By application only.',
  linkLabel: 'Open the report',
  linkTo: '/shop/quiet-report-q1',
}

export default function NotificationBar() {
  const [n] = useLocalStorage(KEY, DEFAULT_NOTIFICATION)
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

export { KEY as NOTIFICATION_KEY }
