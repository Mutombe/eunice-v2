/* Curates beautiful Unsplash images per slot. Each slot has:
 *   - a precise, intentional search query (subject + mood + light + texture)
 *   - an `orientation` (landscape / portrait / squarish)
 *   - a `pick` index — which result to take from the page (1st is default,
 *     but for some slots a deeper result is more on-brand)
 *
 * Writes `scripts/unsplash-manifest.json` mapping slot → URL + attribution
 * so we can audit + re-run without spending API calls.
 *
 * Run from repo root:  node scripts/fetch-unsplash.mjs
 * Needs UNSPLASH_ACCESS_KEY in backend/.env (or env directly).
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

// Read access key from backend/.env so we don't hard-code it.
async function loadKey() {
  const envText = await fs.readFile(path.join(REPO_ROOT, 'backend', '.env'), 'utf-8')
  const m = envText.match(/^UNSPLASH_ACCESS_KEY=(.+)$/m)
  if (!m) throw new Error('UNSPLASH_ACCESS_KEY not set in backend/.env')
  return m[1].trim()
}

/* Queries are tuned for quiet-luxury / "old money" register —
 * The Gentlewoman / Cereal / Loro Piana, not Pinterest farmhouse.
 * Search vocab: linen, cashmere, oak, brass aged, country home,
 * private library, refined, considered, restrained, soft natural light.
 * Avoid: rustic, farmhouse, cozy, hygge (all read as middle-market).
 */
const SLOTS = [
  // === Practice (3 — mindset stays /eunice/working.jpg) ===
  { slot: 'practice/interiors', query: 'elegant living room linen interior natural light', orientation: 'landscape', pick: 0,
    note: 'Wellbeing-led residential interior — quiet luxury, premium restraint.' },
  { slot: 'practice/writing',   query: 'leather bound book writing desk vintage lamp library elegant', orientation: 'landscape', pick: 0,
    note: 'The editorial practice — private library writing room.' },
  { slot: 'practice/circle',    query: 'elegant private dinner table candlelight wine glasses linen',  orientation: 'landscape', pick: 0,
    note: 'The Circle — small, considered gathering.' },

  // === Journal (5) ===
  { slot: 'journal/the-room-as-a-collaborator', query: 'elegant living room linen curtain morning sunlight refined', orientation: 'landscape', pick: 0,
    note: 'On rooms as collaborators — quiet luxurious interior.' },
  { slot: 'journal/second-season',              query: 'autumn forest mist golden cinematic refined landscape',     orientation: 'landscape', pick: 0,
    note: 'On second seasons — autumnal, transitional.' },
  { slot: 'journal/inner-architecture',         query: 'morning sunlight bedroom linen window quiet',     orientation: 'landscape', pick: 0,
    note: 'The architecture of a quiet day — morning ritual.' },
  { slot: 'journal/quiet-report-q1',            query: 'leather books antique library elegant',       orientation: 'landscape', pick: 0,
    note: 'Quiet Report — the dossier in a private library.' },
  { slot: 'journal/letters-to-women-rebuilding', query: 'vintage handwritten letter wax seal envelope ink elegant', orientation: 'landscape', pick: 0,
    note: 'Letters — handwritten, refined correspondence.' },

  // === Shop (6) ===
  { slot: 'shop/second-season-workbook',  query: 'cloth bound notebook linen elegant flat lay',                 orientation: 'portrait', pick: 0,
    note: 'Second Season workbook — linen-bound, considered.' },
  { slot: 'shop/quiet-report-q1',         query: 'leather notebook journal elegant minimal flatlay',              orientation: 'portrait', pick: 0,
    note: 'Quiet Report — leather, dossier, refined.' },
  { slot: 'shop/letters-pamphlet',        query: 'vintage letter wax seal envelope ink elegant',                 orientation: 'portrait', pick: 0,
    note: 'Letters pamphlet — wax-sealed, considered.' },
  { slot: 'shop/sanctuary-bedroom-guide', query: 'luxury bedroom linen bedding morning sunlight private',         orientation: 'portrait', pick: 0,
    note: 'Sanctuary bedroom — quiet luxury bedroom.' },
  { slot: 'shop/annual-print-edition',    query: 'leather bound book antique library private elegant',           orientation: 'portrait', pick: 0,
    note: 'Annual edition — leather-bound book object.' },
  { slot: 'shop/morning-ledger',          query: 'morning ritual coffee notebook elegant breakfast',              orientation: 'portrait', pick: 0,
    note: 'Morning ledger — considered morning ritual.' },

  // === About (1 — founder photos stay where they are) ===
  { slot: 'about/image', query: 'elegant woman writing desk sunlight refined considered', orientation: 'landscape', pick: 0,
    note: 'About page — refined private library / reading room.' },

  // === Retreats (1) ===
  { slot: 'retreats/image', query: 'tuscan villa countryside cypress estate private golden hour', orientation: 'landscape', pick: 0,
    note: 'Retreats — private Tuscan villa / sourced estate.' },

  // === Programmes (3) ===
  { slot: 'programme/reinvention',              query: 'woman walking mountain trail solitude contemplative refined', orientation: 'landscape', pick: 0,
    note: 'Reinvention — solitude, second-season metaphor.' },
  { slot: 'programme/considered-recovery',      query: 'serene mountain lake reflection dawn cinematic',              orientation: 'landscape', pick: 0,
    note: 'Considered Recovery — calm, restorative.' },
  { slot: 'programme/interior-wellbeing-audit', query: 'elegant home interior oak natural light english refined',     orientation: 'landscape', pick: 0,
    note: 'Interior Wellbeing Audit — premium home interior.' },
]

const API_URL = 'https://api.unsplash.com/search/photos'

async function searchOne(key, { slot, query, orientation, pick }) {
  const url = new URL(API_URL)
  url.searchParams.set('query', query)
  url.searchParams.set('orientation', orientation)
  url.searchParams.set('per_page', '6')        // pull a small page so `pick` 0–5 works
  url.searchParams.set('order_by', 'relevant')
  url.searchParams.set('content_filter', 'high')

  const res = await fetch(url, { headers: { 'Authorization': `Client-ID ${key}` } })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`${slot}: HTTP ${res.status} — ${body.slice(0, 200)}`)
  }
  const data = await res.json()
  const results = data.results || []
  if (!results.length) {
    return { slot, query, error: 'no results' }
  }
  const chosen = results[pick] || results[0]
  // Build a clean URL with our preferred sizing — large enough for covers
  // (1600w) without being excessive. Unsplash IDs survive transformation.
  const photoId = chosen.id
  const url1600 = `https://images.unsplash.com/photo-${chosen.urls.raw.split('/photo-')[1].split('?')[0]}?auto=format&fit=crop&w=1600&q=85`

  return {
    slot,
    query,
    url: url1600,
    photoId,
    alt: chosen.alt_description || chosen.description || '',
    photographer: chosen.user?.name || '',
    photographerLink: chosen.user?.links?.html || '',
    pickedIndex: results.indexOf(chosen),
    totalResults: data.total,
  }
}

async function main() {
  const key = await loadKey()
  console.log(`Fetching ${SLOTS.length} images from Unsplash…\n`)

  const manifest = []
  let ok = 0, fail = 0
  for (const cfg of SLOTS) {
    try {
      const r = await searchOne(key, cfg)
      if (r.error) {
        console.log(`  ✗ ${cfg.slot.padEnd(44)} — ${r.error}`)
        manifest.push(r); fail++
      } else {
        console.log(`  ✓ ${cfg.slot.padEnd(44)} — ${r.alt?.slice(0, 50) || '(no alt)'} · by ${r.photographer}`)
        manifest.push(r); ok++
      }
    } catch (err) {
      console.log(`  ✗ ${cfg.slot.padEnd(44)} — ${err.message}`)
      manifest.push({ slot: cfg.slot, query: cfg.query, error: err.message })
      fail++
    }
    // Be polite to Unsplash — small delay between requests
    await new Promise(r => setTimeout(r, 200))
  }

  const out = path.join(__dirname, 'unsplash-manifest.json')
  await fs.writeFile(out, JSON.stringify(manifest, null, 2))
  console.log(`\nWrote ${manifest.length} entries to ${path.relative(REPO_ROOT, out)}`)
  console.log(`${ok} ok · ${fail} failed`)
  if (fail) process.exit(1)
}

main().catch((err) => { console.error(err); process.exit(1) })
