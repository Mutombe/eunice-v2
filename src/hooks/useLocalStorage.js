import { useCallback, useEffect, useState } from 'react'

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = window.localStorage.getItem(key)
      if (raw == null) return initial
      return JSON.parse(raw)
    } catch {
      return initial
    }
  })

  const set = useCallback((next) => {
    setValue((prev) => {
      const v = typeof next === 'function' ? next(prev) : next
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(v))
        }
      } catch { /* ignore */ }
      return v
    })
  }, [key])

  useEffect(() => {
    function onStorage(e) {
      if (e.key !== key) return
      if (e.newValue == null) { setValue(initial); return }
      try { setValue(JSON.parse(e.newValue)) } catch { /* ignore */ }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [value, set]
}
