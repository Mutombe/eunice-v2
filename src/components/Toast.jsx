import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, WarningCircle, Info } from '@phosphor-icons/react'

/* App-wide toast system.
 *
 *   const toast = useToast()
 *   toast('Saved')
 *   toast('Could not save', { kind: 'error' })
 *   toast('A small note', { kind: 'info', duration: 4000 })
 *
 * Toasts queue (multiple visible at once) and auto-dismiss after `duration`.
 * Pass `duration: 0` to make a toast sticky until manually dismissed.
 */

const ToastContext = createContext({ show: () => {} })

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((message, opts = {}) => {
    const id = ++counter.current
    const kind = opts.kind || 'success'        // 'success' | 'error' | 'info'
    const duration = opts.duration ?? 2400
    setToasts((list) => [...list, { id, message, kind }])
    if (duration > 0) {
      window.setTimeout(() => dismiss(id), duration)
    }
    return id
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              role={t.kind === 'error' ? 'alert' : 'status'}
              className={`pointer-events-auto mono-sm tracking-wider text-[0.7rem] px-4 py-2.5 shadow-[0_12px_30px_-12px_rgba(26,26,25,0.45)] flex items-center gap-2 ${
                t.kind === 'error'
                  ? 'bg-clay-500 text-paper-warm'
                  : t.kind === 'info'
                  ? 'bg-paper-warm text-ink-500 border border-ink/15'
                  : 'bg-ink-500 text-paper-warm'
              }`}
              onClick={() => dismiss(t.id)}
            >
              {t.kind === 'error'
                ? <WarningCircle size={14} weight="regular" />
                : t.kind === 'info'
                ? <Info size={14} weight="regular" className="text-clay-500" />
                : <CheckCircle size={14} weight="regular" className="text-clay-300" />}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext).show
}
