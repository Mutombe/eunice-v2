import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { apiRequest } from './api.js'

/* Anonymous page-view ping — fires on every public route change.
   Records only the path (and the referrer URL if any). No IPs, no cookies,
   no fingerprinting; the Django backend stores aggregates only. */
export function useAnalytics() {
  const location = useLocation()
  const last = useRef(null)

  useEffect(() => {
    const path = location.pathname
    // Don't pollute stats with admin / login traffic.
    if (path.startsWith('/admin') || path === '/login') return
    if (last.current === path) return
    last.current = path

    apiRequest('/analytics/pageview/', {
      method: 'POST',
      body: { path, referrer: document.referrer || '' },
    }).catch(() => { /* best-effort — analytics never blocks the UI */ })
  }, [location.pathname])
}
