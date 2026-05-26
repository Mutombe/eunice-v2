import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* Promise-based confirm modal — drop-in replacement for window.confirm()
 * with proper styling, accessibility, and Esc/click-outside handling.
 *
 *   const confirm = useConfirm()
 *
 *   if (await confirm({
 *     title: 'Delete this programme?',
 *     message: '"Reinvention" will be removed permanently. This cannot be undone.',
 *     confirmLabel: 'Delete',
 *     danger: true,
 *   })) {
 *     // user clicked Delete
 *   }
 */

const ConfirmContext = createContext({ confirm: () => Promise.resolve(false) })

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null)   // { title, message, confirmLabel, cancelLabel, danger, resolve }
  const cancelBtnRef = useRef(null)
  const confirmBtnRef = useRef(null)

  const confirm = useCallback((opts = {}) => {
    return new Promise((resolve) => {
      setState({
        title:        opts.title        || 'Are you sure?',
        message:      opts.message      || '',
        confirmLabel: opts.confirmLabel || 'Confirm',
        cancelLabel:  opts.cancelLabel  || 'Cancel',
        danger:       opts.danger       || false,
        resolve,
      })
    })
  }, [])

  const close = useCallback((answer) => {
    if (!state) return
    state.resolve(answer)
    setState(null)
  }, [state])

  // Esc to cancel · focus the Cancel button when the dialog opens · trap nothing
  // else (page scroll lock is handled by Tailwind's overflow on the backdrop).
  useEffect(() => {
    if (!state) return
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(false) }
      if (e.key === 'Enter')  { e.preventDefault(); close(true) }
    }
    window.addEventListener('keydown', onKey)
    // Focus Cancel by default — safer than focusing Confirm for destructive actions
    setTimeout(() => (state.danger ? cancelBtnRef : confirmBtnRef).current?.focus(), 50)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, close])

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <AnimatePresence>
        {state && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-ink/40 backdrop-blur-[2px] flex items-center justify-center p-4"
            onClick={() => close(false)}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(e) => e.stopPropagation()}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-dialog-title"
              aria-describedby={state.message ? 'confirm-dialog-message' : undefined}
              className="bg-paper max-w-md w-full p-7 md:p-8 shadow-[0_30px_60px_-20px_rgba(26,26,25,0.4)] border border-ink/10"
            >
              <p className="mono-sm text-clay-500 tracking-[0.2em] text-[0.7rem]">
                {state.danger ? '— A careful step' : '— A small confirmation'}
              </p>
              <h2 id="confirm-dialog-title" className="mt-3 display-thin text-2xl md:text-3xl leading-[1.1]">
                {state.title}
              </h2>
              {state.message && (
                <p id="confirm-dialog-message" className="mt-4 text-ink/75 leading-relaxed">
                  {state.message}
                </p>
              )}
              <div className="mt-7 flex items-center justify-end gap-3">
                <button
                  ref={cancelBtnRef}
                  onClick={() => close(false)}
                  className="mono px-5 py-2.5 border border-ink/30 hover:border-ink hover:bg-stone-50 transition-colors text-[0.8rem]"
                >
                  {state.cancelLabel}
                </button>
                <button
                  ref={confirmBtnRef}
                  onClick={() => close(true)}
                  className={`mono px-5 py-2.5 transition-colors text-paper-warm text-[0.8rem] ${
                    state.danger
                      ? 'bg-clay-500 hover:bg-clay-400'
                      : 'bg-ink-500 hover:bg-clay-500'
                  }`}
                >
                  {state.confirmLabel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  return useContext(ConfirmContext).confirm
}
