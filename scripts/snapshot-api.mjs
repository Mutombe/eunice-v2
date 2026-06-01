/* Snapshot the live API into src/data/snapshot.json so the palette
 * variant deploys can serve real content without calling the backend.
 *
 * Run:  node scripts/snapshot-api.mjs
 *
 * The variants set VITE_MOCK_DATA=true at build time; hooks.js +
 * settings.jsx then read from this snapshot instead of the API.
 *
 * Re-run this before pushing to a palette branch to refresh the data.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.resolve(__dirname, '..', 'src', 'data', 'snapshot.json')
const API = process.env.SNAPSHOT_API || 'https://eunice-backend.onrender.com/api'

async function fetchJson(endpoint) {
  const url = `${API}${endpoint}`
  const res = await fetch(url, { headers: { accept: 'application/json' } })
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  return res.json()
}

async function main() {
  console.log(`Snapshotting from ${API}…\n`)

  const [settings, practice, programmes, journal, shop, testimonials] = await Promise.all([
    fetchJson('/settings/'),
    fetchJson('/practice/'),
    fetchJson('/programmes/'),
    fetchJson('/journal/'),
    fetchJson('/shop/'),
    fetchJson('/testimonials/'),
  ])

  // List endpoints return either an array or {results: [...]} depending on
  // pagination. Normalise to a plain array.
  const arr = (x) => (Array.isArray(x) ? x : x?.results || [])

  const snapshot = {
    _meta: {
      sourcedFrom: API,
      sourcedAt: new Date().toISOString(),
    },
    settings,
    collections: {
      practice:     arr(practice),
      programmes:   arr(programmes),
      journal:      arr(journal),
      shop:         arr(shop),
      testimonials: arr(testimonials),
    },
  }

  await fs.writeFile(OUT_PATH, JSON.stringify(snapshot, null, 2))

  console.log(`  settings keys:   ${Object.keys(settings).length}`)
  for (const [name, items] of Object.entries(snapshot.collections)) {
    console.log(`  ${name.padEnd(13)} ${items.length} items`)
  }
  console.log(`\nWrote ${(JSON.stringify(snapshot).length / 1024).toFixed(1)} KB to ${path.relative(path.resolve(__dirname, '..'), OUT_PATH)}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
