/* Snapshot key pages at iPhone widths so we can visually audit them.
 * Outputs PNGs into scripts/mobile-previews/<route>__<width>.png.
 * Run after `npm run build`; talks to dist/ via a tiny static server.
 */

import http from 'node:http'
import fs from 'node:fs/promises'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, '..', 'dist')
const OUT_DIR = path.join(__dirname, 'mobile-previews')
const PORT = 4323
const API_BASE = process.env.MOBILE_SNAP_API || 'https://eunice-backend.onrender.com/api'
const ROUTES = ['/', '/about', '/practice', '/programmes', '/journal', '/shop', '/enquire', '/membership']
const WIDTHS = [375]   // iPhone standard

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const u = new URL(req.url, `http://localhost:${PORT}`).pathname

      // Proxy /api/* to the real backend (same trick as prerender.mjs) so
      // the runtime SPA inside puppeteer can fetch content without CORS.
      if (u === '/api' || u.startsWith('/api/')) {
        try {
          const upstream = `${API_BASE.replace(/\/$/, '')}${u.replace(/^\/api/, '')}`
          const r = await fetch(upstream, { headers: { accept: 'application/json' } })
          const body = await r.text()
          res.writeHead(r.status, { 'Content-Type': r.headers.get('content-type') || 'application/json' })
          res.end(body)
        } catch (e) {
          res.writeHead(502); res.end(JSON.stringify({ error: e.message }))
        }
        return
      }

      let file = path.join(DIST_DIR, u)
      if (u === '/' || u === '') file = path.join(DIST_DIR, 'index.html')
      if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html')
      if (!existsSync(file)) {
        if (!path.extname(u)) file = path.join(DIST_DIR, 'index.html')
        else { res.writeHead(404); res.end(); return }
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' })
      createReadStream(file).pipe(res)
    })
    server.listen(PORT, '127.0.0.1', () => resolve(server))
  })
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const server = await startServer()
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })

  console.log(`Snapping ${ROUTES.length} routes × ${WIDTHS.length} widths…\n`)
  for (const route of ROUTES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage()
      await page.setViewport({ width, height: 812, deviceScaleFactor: 2 })  // iPhone 11/12 pixel ratio
      // Same-origin /api proxy + cookie consent pre-set before any JS runs.
      await page.evaluateOnNewDocument(() => {
        window.__EDC_API__ = '/api'
        try { localStorage.setItem('edc.cookieConsent', 'accepted') } catch {}
      })
      const url = `http://127.0.0.1:${PORT}${route}`
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
        await new Promise((r) => setTimeout(r, 800))    // let fonts + animations settle
        const slug = (route === '/' ? '__home' : route.replace(/\//g, '__'))
        const out = path.join(OUT_DIR, `${slug.replace(/^__/, '')}_${width}.png`)
        await page.screenshot({ path: out, fullPage: false })   // viewport-sized only
        const stat = await fs.stat(out)
        console.log(`  ✓ ${route.padEnd(16)} @${width}px → ${path.relative(path.resolve(__dirname, '..'), out)} (${(stat.size/1024).toFixed(0)}KB)`)
      } catch (err) {
        console.log(`  ✗ ${route} @${width}px — ${err.message}`)
      } finally {
        await page.close()
      }
    }
  }
  await browser.close()
  server.close()
}

main().catch((err) => { console.error(err); process.exit(1) })
