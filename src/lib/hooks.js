import { useState, useEffect } from 'react'
import { resources } from './api.js'
import { practice as mockPractice, notes as mockNotes, shop as mockShop, voices as mockVoices, mockProgrammes } from '../data/siteData.js'

/* Fetches a content collection from the API with a stale-while-revalidate cache.
 *
 *   - First visit to a collection: shows `loading: true`, fetches, populates cache.
 *   - Subsequent visits during the session: returns cached data INSTANTLY,
 *     refreshes in the background so any admin edits show up next nav.
 *
 * The cache is module-scoped — it lives for the lifetime of the page load.
 * Reloading the tab starts fresh (deliberately — picks up any admin changes).
 *
 * Mock mode — when VITE_MOCK_DATA=true at build time, the hook bypasses
 * the API entirely and returns data baked into src/data/siteData.js. Used
 * by the palette-preview deploys so they don't depend on the backend. */

const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

const MOCKS = {
  practice:   mockPractice,
  journal:    mockNotes,
  shop:       mockShop?.products || [],
  testimonials: mockVoices,
  programmes: mockProgrammes,
}

const cache = new Map()       // name → array of items
const inflight = new Map()    // name → Promise (de-dupes concurrent fetches)

/* Kick off a fetch in the background without subscribing to it. Call from
 * Layout on first paint so the four main collections are already in cache
 * by the time the user navigates anywhere. No-op if already cached / in flight. */
export function prefetchCollection(name) {
  if (MOCK) return                        // nothing to prefetch in mock mode
  if (cache.has(name) || inflight.has(name)) return
  const promise = resources.list(name).finally(() => inflight.delete(name))
  inflight.set(name, promise)
  promise.then((d) => cache.set(name, d)).catch(() => { /* best-effort */ })
}

export function useCollection(name) {
  // === Mock mode — return baked-in data, never call the API ===
  if (MOCK) {
    const items = MOCKS[name] || []
    return { items, loading: false, error: null }
  }

  const cached = cache.get(name)
  const [data, setData] = useState(cached ?? null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    // If we already have cached data, surface it immediately while we
    // re-fetch in the background. Otherwise show loading until the fetch
    // returns.
    const have = cache.get(name)
    if (have) setData(have)
    setError(null)

    // De-dupe — if a fetch for this collection is already in flight (e.g.
    // two components mounting at once), share the same promise.
    let promise = inflight.get(name)
    if (!promise) {
      promise = resources.list(name).finally(() => inflight.delete(name))
      inflight.set(name, promise)
    }

    promise
      .then((d) => {
        if (!alive) return
        cache.set(name, d)
        setData(d)
      })
      .catch((e) => { if (alive) setError(e) })

    return () => { alive = false }
  }, [name])

  return { items: data || [], loading: data === null && !error, error }
}
