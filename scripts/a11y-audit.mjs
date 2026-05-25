/* Accessibility audit — runs axe-core against every public route
 * via Puppeteer (same setup as prerender). Outputs:
 *   - scripts/a11y-report.json — full violations
 *   - a console summary grouped by impact (critical / serious / moderate / minor)
 *
 * Run from repo root (Django + Vite preview should be running):
 *   npm run a11y
 *
 * Critical / serious violations should be fixed before launch.
 */

import http from 'node:http'
import fs from 'node:fs/promises'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import puppeteer from 'puppeteer'
import { AxePuppeteer } from '@axe-core/puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, '..', 'dist')
const PORT = parseInt(process.env.A11Y_PORT || '4322', 10)
const PAGE_TIMEOUT = 25000

const ROUTES = [
  '/', '/about', '/practice', '/programmes', '/journal', '/membership',
  '/retreats', '/speaking', '/shop', '/enquire',
  '/privacy', '/cookies', '/terms',
  '/practice/interiors',
  '/programmes/reinvention',
  '/journal/second-season',
  '/shop/quiet-report-q1',
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml',
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const u = new URL(req.url, `http://localhost:${PORT}`).pathname
      let file = path.join(DIST_DIR, u)
      if (u === '/' || u === '') file = path.join(DIST_DIR, 'index.html')

      // If the path resolves to a directory (e.g. /about → dist/about),
      // the prerendered HTML lives at dist/about/index.html.
      if (existsSync(file) && statSync(file).isDirectory()) {
        file = path.join(file, 'index.html')
      }

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

async function auditOne(browser, route) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  try {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: PAGE_TIMEOUT })
    await new Promise((r) => setTimeout(r, 300))  // settle helmet + lazy chunks
    const results = await new AxePuppeteer(page)
      .options({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } })
      .analyze()
    return { route, ok: true, violations: results.violations }
  } catch (err) {
    return { route, ok: false, error: err.message, violations: [] }
  } finally {
    await page.close()
  }
}

async function main() {
  if (!existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.error('✗ dist/index.html not found — run `npm run build` first')
    process.exit(1)
  }
  const server = await startServer()
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })

  console.log(`Auditing ${ROUTES.length} routes…\n`)
  const reports = []
  for (const r of ROUTES) {
    const res = await auditOne(browser, r)
    reports.push(res)
    const by = res.violations.reduce((m, v) => { m[v.impact] = (m[v.impact] || 0) + 1; return m }, {})
    const summary = ['critical', 'serious', 'moderate', 'minor'].map(k => `${by[k] || 0} ${k}`).join(' · ')
    const flag = (by.critical || by.serious) ? '✗' : (by.moderate || by.minor) ? '!' : '✓'
    console.log(`  ${flag} ${r.padEnd(46)} ${summary}`)
  }

  await browser.close()
  server.close()

  // Aggregate per-rule violations across all pages
  const byRule = new Map()
  for (const r of reports) {
    for (const v of r.violations) {
      const key = v.id
      const entry = byRule.get(key) || { id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl, pages: [], nodes: 0 }
      entry.pages.push(r.route)
      entry.nodes += v.nodes.length
      byRule.set(key, entry)
    }
  }

  const rules = Array.from(byRule.values()).sort((a, b) => {
    const order = { critical: 0, serious: 1, moderate: 2, minor: 3 }
    return (order[a.impact] ?? 9) - (order[b.impact] ?? 9)
  })

  console.log(`\n=== Distinct violation rules: ${rules.length} ===`)
  for (const r of rules) {
    console.log(`  [${r.impact.padEnd(8)}] ${r.id} — ${r.help}`)
    console.log(`            ${r.nodes} nodes across ${r.pages.length} pages`)
    console.log(`            ${r.helpUrl}`)
  }

  const out = path.join(__dirname, 'a11y-report.json')
  await fs.writeFile(out, JSON.stringify({ reports, rules }, null, 2))
  console.log(`\nWrote full report to ${path.relative(path.resolve(__dirname, '..'), out)}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
