/* Prerender — snapshot every public route to static HTML.
 *
 * Why: React Router SPAs serve the same empty shell to every URL until
 * JS boots, which is bad for SEO and social-link previews. This script
 * runs *after* `vite build` to take a real headless-Chrome snapshot of
 * each route and write it to `dist/<route>/index.html`. The runtime SPA
 * still loads and hydrates over the top — the snapshot is just for the
 * first paint, crawlers, and `og:` previews.
 *
 * The Django API is *optional* at prerender time:
 *   - If `http://127.0.0.1:8000/api/health/` answers, the live API is
 *     used (content lists render with real data).
 *   - If it doesn't, the script falls back to the slug list baked into
 *     `src/data/siteData.js`. Chrome (header, footer, meta) still
 *     renders correctly because `SettingsProvider` ships its own
 *     fallback. Content lists may be empty — they hydrate at runtime.
 *
 * Usage:
 *   npm run build           # SPA-only (fast)
 *   npm run build:static    # SPA + prerender (slower, for deploys)
 *   npm run prerender       # just the snapshot step against existing dist/
 *
 * Env flags:
 *   PRERENDER_BASE_PATH=/eunice-v2/   for GitHub Pages
 *   PRERENDER_PORT=4321               internal static-server port
 */

import http from 'node:http'
import fs from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, '..', 'dist')
const BASE_PATH = process.env.PRERENDER_BASE_PATH || '/'
const PORT = parseInt(process.env.PRERENDER_PORT || '4321', 10)
const API_BASE = process.env.PRERENDER_API_BASE || 'http://127.0.0.1:8000/api'
const PAGE_TIMEOUT_MS = 20000
const POST_HYDRATE_WAIT_MS = 400

// --- Static slug fallbacks (from src/data/siteData.js) ------------------
const FALLBACK = {
  practice: ['interiors', 'mindset', 'writing', 'circle'],
  journal: [
    'the-room-as-a-collaborator',
    'second-season',
    'inner-architecture',
    'quiet-report-q1',
    'letters-to-women-rebuilding',
  ],
  shop: [
    'second-season-workbook',
    'quiet-report-q1',
    'letters-pamphlet',
    'sanctuary-bedroom-guide',
    'annual-print-edition',
    'morning-ledger',
  ],
  programmes: [
    'reinvention',
    'considered-recovery',
    'interior-wellbeing-audit',
  ],
}

// Hard-coded public routes. Admin & /login are intentionally NOT
// prerendered — they're behind auth and need fresh client state.
const STATIC_ROUTES = [
  '/',
  '/about',
  '/practice',
  '/programmes',
  '/journal',
  '/membership',
  '/retreats',
  '/speaking',
  '/shop',
  '/enquire',
  // Legal
  '/privacy',
  '/cookies',
  '/terms',
]

// --- Tiny static file server -------------------------------------------
// Serves dist/ under BASE_PATH. Unknown extensionless paths fall back to
// index.html so the SPA router picks them up.

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      let urlPath
      try {
        urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname)
      } catch {
        res.writeHead(400)
        res.end('Bad URL')
        return
      }

      // === /api/* — server-side proxy to the real backend.
      //    The puppeteer page asks for /api/... (same-origin → no CORS),
      //    and we forward the request to API_BASE here. This is the only
      //    way to make a production-built bundle (which has a cross-
      //    origin VITE_API_URL baked in) talk to the API from Puppeteer.
      if (urlPath === '/api' || urlPath.startsWith('/api/')) {
        try {
          const upstream = `${API_BASE.replace(/\/$/, '')}${urlPath.replace(/^\/api/, '')}`
          const body = ['GET', 'HEAD'].includes(req.method)
            ? undefined
            : await new Promise((resolve) => {
                const chunks = []
                req.on('data', (c) => chunks.push(c))
                req.on('end', () => resolve(Buffer.concat(chunks)))
              })
          const upstreamRes = await fetch(upstream, {
            method: req.method,
            headers: {
              ...(req.headers['content-type'] ? { 'content-type': req.headers['content-type'] } : {}),
              ...(req.headers['authorization'] ? { 'authorization': req.headers['authorization'] } : {}),
              'accept': req.headers['accept'] || 'application/json',
            },
            body,
          })
          const text = await upstreamRes.text()
          res.writeHead(upstreamRes.status, {
            'Content-Type': upstreamRes.headers.get('content-type') || 'application/json',
          })
          res.end(text)
        } catch (err) {
          res.writeHead(502, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'proxy failed', detail: err.message }))
        }
        return
      }

      // Strip base path
      if (BASE_PATH !== '/') {
        if (urlPath === BASE_PATH.slice(0, -1) || urlPath === BASE_PATH) {
          urlPath = '/'
        } else if (urlPath.startsWith(BASE_PATH)) {
          urlPath = '/' + urlPath.slice(BASE_PATH.length)
        } else {
          res.writeHead(404)
          res.end('Not under base path')
          return
        }
      }

      let filePath = path.join(DIST_DIR, urlPath)
      if (urlPath === '/' || urlPath === '') filePath = path.join(DIST_DIR, 'index.html')

      // SPA fallback for extensionless routes
      if (!existsSync(filePath)) {
        if (!path.extname(urlPath)) {
          filePath = path.join(DIST_DIR, 'index.html')
        } else {
          res.writeHead(404)
          res.end('Not found')
          return
        }
      }

      const ext = path.extname(filePath).toLowerCase()
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      createReadStream(filePath).pipe(res)
    })
    server.listen(PORT, '127.0.0.1', () => resolve(server))
  })
}

// --- API probe + slug discovery ----------------------------------------

async function probeApi() {
  try {
    const res = await fetch(`${API_BASE}/health/`, { signal: AbortSignal.timeout(2000) })
    return res.ok
  } catch {
    return false
  }
}

async function fetchSlugs(endpoint) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}/`, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) return null
    const data = await res.json()
    const items = Array.isArray(data) ? data : data.results || []
    return items.map((x) => x.slug).filter(Boolean)
  } catch {
    return null
  }
}

async function resolveDynamicSlugs(apiOk) {
  if (!apiOk) return FALLBACK
  const [practice, journal, shop, programmes] = await Promise.all([
    fetchSlugs('practice'),
    fetchSlugs('journal'),
    fetchSlugs('shop'),
    fetchSlugs('programmes'),
  ])
  return {
    practice: practice && practice.length ? practice : FALLBACK.practice,
    journal: journal && journal.length ? journal : FALLBACK.journal,
    shop: shop && shop.length ? shop : FALLBACK.shop,
    programmes: programmes && programmes.length ? programmes : FALLBACK.programmes,
  }
}

// --- Snapshot one route -------------------------------------------------

async function snapshot(browser, route) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  // Mute console noise from React DevTools recommendation, etc.
  page.on('pageerror', (err) => console.error(`  pageerror on ${route}:`, err.message))

  // Override the bundle's baked API URL to use our same-origin proxy
  // (defined in startServer above). Bypasses CORS that would otherwise
  // block the page from reaching the production API from localhost.
  await page.evaluateOnNewDocument(() => { window.__EDC_API__ = '/api' })

  const url = `http://127.0.0.1:${PORT}${BASE_PATH === '/' ? '' : BASE_PATH.slice(0, -1)}${route}`
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: PAGE_TIMEOUT_MS })
    // Settle: give react-helmet-async and any final state a beat
    await new Promise((r) => setTimeout(r, POST_HYDRATE_WAIT_MS))
    const html = await page.content()

    const outDir = route === '/' ? DIST_DIR : path.join(DIST_DIR, route)
    await fs.mkdir(outDir, { recursive: true })
    const outPath = path.join(outDir, 'index.html')
    await fs.writeFile(outPath, html, 'utf-8')
    return { route, ok: true, size: html.length }
  } finally {
    await page.close()
  }
}

// --- Main ---------------------------------------------------------------

async function main() {
  if (!existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.error('✗ dist/index.html not found — run `vite build` first')
    process.exit(1)
  }

  console.log(`Prerender — base path "${BASE_PATH}", port ${PORT}`)

  const apiOk = await probeApi()
  console.log(`  API ${API_BASE}: ${apiOk ? '✓ reachable (live content)' : '✗ unreachable (siteData fallback)'}`)

  const slugs = await resolveDynamicSlugs(apiOk)
  console.log(`  Practice slugs   (${slugs.practice.length}): ${slugs.practice.join(', ')}`)
  console.log(`  Journal slugs    (${slugs.journal.length}): ${slugs.journal.join(', ')}`)
  console.log(`  Shop slugs       (${slugs.shop.length}): ${slugs.shop.join(', ')}`)
  console.log(`  Programme slugs  (${slugs.programmes.length}): ${slugs.programmes.join(', ')}`)

  const routes = [
    ...STATIC_ROUTES,
    ...slugs.practice.map((s) => `/practice/${s}`),
    ...slugs.journal.map((s) => `/journal/${s}`),
    ...slugs.shop.map((s) => `/shop/${s}`),
    ...slugs.programmes.map((s) => `/programmes/${s}`),
  ]

  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  console.log(`\nPrerendering ${routes.length} routes:\n`)
  const start = Date.now()
  const results = []
  for (const route of routes) {
    try {
      const r = await snapshot(browser, route)
      const kb = (r.size / 1024).toFixed(1)
      console.log(`  ✓ ${route.padEnd(48)} ${kb.padStart(6)} KB`)
      results.push(r)
    } catch (err) {
      console.log(`  ✗ ${route.padEnd(48)} ${err.message}`)
      results.push({ route, ok: false, error: err.message })
    }
  }

  await browser.close()
  server.close()

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  const ok = results.filter((r) => r.ok).length
  const failed = results.length - ok
  console.log(`\nDone — ${ok}/${results.length} routes in ${elapsed}s${failed ? `, ${failed} failed` : ''}.`)
  if (failed) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
