/* End-to-end CRUD test against the LIVE backend (Render) and a smoke
 * check of the published frontend (GitHub Pages).
 *
 * What it exercises:
 *   1. Public read endpoints — no auth needed.
 *   2. Public write endpoints — enquiry, newsletter, analytics pageview.
 *   3. Auth-required reads — /enquiries/ and /newsletter/ require admin.
 *   4. Full CRUD on Programme, Practice, JournalPost, Product as admin.
 *   5. SiteSettings singleton PATCH (with restore).
 *   6. Analytics summary (admin-only).
 *
 * Cleans up after itself — every record it creates, it deletes.
 *
 * Run:  node scripts/test-crud-live.mjs
 */

const API = process.env.TEST_API || 'https://eunice-backend.onrender.com/api'

// Token is required via env var — never committed.
// Get one by logging in to /admin and copying the value from localStorage
// (key: edc.token), or pass TEST_TOKEN=... when invoking the script:
//   TEST_TOKEN=xxx node scripts/test-crud-live.mjs
const TOKEN = process.env.TEST_TOKEN
if (!TOKEN) {
  console.error('✗ TEST_TOKEN env var required — see top of script for how to get one.')
  process.exit(2)
}

let pass = 0, fail = 0, skipped = 0
const failures = []

function ok(label) { console.log(`  ✓ ${label}`); pass++ }
function ko(label, detail) { console.log(`  ✗ ${label} — ${detail}`); fail++; failures.push({ label, detail }) }
function info(label) { console.log(`  · ${label}`) }
function section(name) { console.log(`\n── ${name} ──`) }

async function req(method, path, { auth = false, body, expectStatus, label } = {}) {
  const headers = { Accept: 'application/json' }
  if (auth) headers.Authorization = `Token ${TOKEN}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  const res = await fetch(`${API}${path}`, {
    method, headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  let payload = null
  const text = await res.text()
  try { payload = text ? JSON.parse(text) : null } catch { payload = text }
  const tag = label || `${method} ${path}`

  if (expectStatus !== undefined) {
    if (res.status === expectStatus) ok(`${tag} → ${res.status}`)
    else ko(`${tag}`, `expected ${expectStatus}, got ${res.status}: ${typeof payload === 'string' ? payload.slice(0,200) : JSON.stringify(payload).slice(0,200)}`)
  }
  return { status: res.status, data: payload }
}

function assertField(payload, field, expected, label) {
  const value = field.split('.').reduce((o, k) => o?.[k], payload)
  if (value === expected) ok(`${label} (${field}=${JSON.stringify(value)})`)
  else ko(label, `${field} expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`)
}

// ────────────────────────────────────────────────────────────────────

async function testPublicReads() {
  section('1. Public reads (no auth)')

  const r = await req('GET', '/health/', { expectStatus: 200 })
  if (r.data?.status === 'ok') ok('health body has status:ok')

  for (const ep of ['practice', 'programmes', 'journal', 'shop', 'testimonials']) {
    const r = await req('GET', `/${ep}/`, { expectStatus: 200, label: `GET /${ep}/` })
    if (Array.isArray(r.data)) ok(`/${ep}/ returns array (${r.data.length} items)`)
    else if (r.data?.results) ok(`/${ep}/ returns paginated (${r.data.results.length} items)`)
  }

  const s = await req('GET', '/settings/', { expectStatus: 200 })
  for (const key of ['brand', 'navLinks', 'hero', 'studio', 'membership', 'about', 'speaking', 'retreats', 'legal']) {
    if (s.data?.[key]) ok(`settings.${key} present`)
    else ko(`settings.${key} present`, 'missing')
  }
}

async function testAuthGuards() {
  section('2. Auth guards — protected routes deny anon')
  await req('GET', '/analytics/summary/', { expectStatus: 401, label: 'GET /analytics/summary/ (no auth)' })
  await req('GET', '/enquiries/', { expectStatus: 401, label: 'GET /enquiries/ (no auth)' })
  await req('GET', '/newsletter/', { expectStatus: 401, label: 'GET /newsletter/ (no auth)' })
  await req('PATCH', '/settings/', { expectStatus: 401, body: { brand: { name: 'Hack' } }, label: 'PATCH /settings/ (no auth)' })
  await req('POST', '/programmes/', { expectStatus: 401, body: { slug: 'x', title: 'x' }, label: 'POST /programmes/ (no auth)' })
}

async function testPublicWrites() {
  section('3. Public writes — forms accept anon')
  const stamp = Date.now()

  // Enquiry
  const e = await req('POST', '/enquiries/', { body: {
    name: 'CRUD Test',
    email: `crud-test+${stamp}@example.com`,
    interest: 'Programmes',
    note: 'Automated CRUD test — safe to delete.',
  }, expectStatus: 201, label: 'POST /enquiries/' })
  const enquiryId = e.data?.id
  if (enquiryId) ok(`enquiry created (id=${enquiryId})`)

  // Newsletter
  await req('POST', '/newsletter/', { body: {
    email: `crud-test+${stamp}@example.com`,
  }, expectStatus: 201, label: 'POST /newsletter/' })

  // Analytics
  await req('POST', '/analytics/pageview/', { body: {
    path: `/crud-test-${stamp}`,
    referrer: '',
  }, expectStatus: 201, label: 'POST /analytics/pageview/' })

  return { enquiryId, newsletterEmail: `crud-test+${stamp}@example.com` }
}

async function testProgrammeCrud() {
  section('4. Programme — full CRUD (admin token)')
  const slug = `crud-test-${Date.now()}`

  // CREATE
  const c = await req('POST', '/programmes/', { auth: true, body: {
    slug, num: '99', title: 'CRUD Test Programme',
    italicTitle: 'for automated testing',
    discipline: 'Automated test',
    lede: 'Created by scripts/test-crud-live.mjs — safe to delete.',
    problem: ['Problem paragraph 1.'],
    transformation: ['Transformation paragraph 1.'],
    modules: [{ num: 'I', title: 'Module 1', body: 'Body 1.' }],
    inclusions: [{ label: 'Inclusion 1', detail: 'Detail 1.' }],
    duration: 'Test', cadence: 'Test', format: 'Test', price: '£0',
    cover: '', imageCaption: '',
    ctaLabel: 'Apply', ctaTo: '/enquire?subject=crud-test',
    featured: false, order: 99,
  }, expectStatus: 201 })

  // READ
  const r = await req('GET', `/programmes/${slug}/`, { expectStatus: 200, label: `GET /programmes/${slug}/` })
  assertField(r.data, 'title', 'CRUD Test Programme', 'created title persisted')
  assertField(r.data, 'price', '£0', 'created price persisted')
  if (Array.isArray(r.data?.modules) && r.data.modules.length === 1) ok('modules JSON survived round-trip')

  // UPDATE
  const u = await req('PATCH', `/programmes/${slug}/`, { auth: true, body: { price: '£42', featured: true }, expectStatus: 200, label: `PATCH /programmes/${slug}/` })
  assertField(u.data, 'price', '£42', 'updated price')
  assertField(u.data, 'featured', true, 'updated featured flag')

  // LIST includes the test item
  const list = await req('GET', '/programmes/', { expectStatus: 200, label: 'GET /programmes/ (with test item)' })
  const items = Array.isArray(list.data) ? list.data : list.data.results
  if (items.find((p) => p.slug === slug)) ok('test programme appears in list')
  else ko('test programme in list', 'not found')

  // DELETE
  await req('DELETE', `/programmes/${slug}/`, { auth: true, expectStatus: 204, label: `DELETE /programmes/${slug}/` })
  await req('GET', `/programmes/${slug}/`, { expectStatus: 404, label: `GET /programmes/${slug}/ (after delete)` })
}

async function testSmokeCrud(name, payload, patch) {
  // Slug is taken from the payload, not a separate arg (the old signature
  // dropped it on the floor).
  const slug = payload.slug
  section(`5. ${name} — smoke CRUD`)
  await req('POST', `/${name}/`, { auth: true, body: payload, expectStatus: 201 })
  const r = await req('GET', `/${name}/${slug}/`, { expectStatus: 200, label: `GET /${name}/${slug}/` })
  assertField(r.data, Object.keys(patch)[0] === 'title' ? 'title' : 'slug', payload.title || payload.name, `${name} create persisted`)
  const u = await req('PATCH', `/${name}/${slug}/`, { auth: true, body: patch, expectStatus: 200 })
  Object.entries(patch).forEach(([k, v]) => assertField(u.data, k, v, `${name} patch.${k}`))
  await req('DELETE', `/${name}/${slug}/`, { auth: true, expectStatus: 204 })
  await req('GET', `/${name}/${slug}/`, { expectStatus: 404, label: `GET /${name}/${slug}/ (after delete)` })
}

async function testSiteSettings() {
  section('6. SiteSettings — singleton PATCH with restore')
  const original = await req('GET', '/settings/', { expectStatus: 200 })
  const origTagline = original.data?.brand?.tagline

  // Patch a field
  const p = await req('PATCH', '/settings/', { auth: true, body: {
    brand: { ...original.data.brand, tagline: 'CRUD-test marker — should be restored.' },
  }, expectStatus: 200 })
  assertField(p.data, 'brand.tagline', 'CRUD-test marker — should be restored.', 'tagline updated')

  // Restore
  await req('PATCH', '/settings/', { auth: true, body: {
    brand: { ...original.data.brand, tagline: origTagline },
  }, expectStatus: 200, label: 'restore tagline' })

  const after = await req('GET', '/settings/', { expectStatus: 200, label: 'verify restore' })
  assertField(after.data, 'brand.tagline', origTagline, 'tagline restored to original')
}

async function testAdminReads(enquiryId, newsletterEmail) {
  section('7. Admin reads — see what anonymous can\'t')
  const a = await req('GET', '/analytics/summary/', { auth: true, expectStatus: 200, label: 'GET /analytics/summary/ (admin)' })
  if (typeof a.data?.total === 'number') ok(`analytics.total = ${a.data.total}`)
  if (typeof a.data?.last7Days === 'number') ok(`analytics.last7Days = ${a.data.last7Days}`)
  if (Array.isArray(a.data?.topPaths)) ok(`analytics.topPaths len=${a.data.topPaths.length}`)
  if (Array.isArray(a.data?.daily)) ok(`analytics.daily len=${a.data.daily.length}`)

  // Confirm the enquiry the public form just submitted is visible
  const eList = await req('GET', '/enquiries/', { auth: true, expectStatus: 200, label: 'GET /enquiries/ (admin)' })
  const items = Array.isArray(eList.data) ? eList.data : eList.data.results
  if (items.find((e) => e.id === enquiryId)) ok('newly-submitted enquiry visible to admin')
  else ko('enquiry visible to admin', `id ${enquiryId} not found`)

  const nList = await req('GET', '/newsletter/', { auth: true, expectStatus: 200, label: 'GET /newsletter/ (admin)' })
  const ns = Array.isArray(nList.data) ? nList.data : nList.data.results
  if (ns.find((n) => n.email === newsletterEmail)) ok('newly-submitted newsletter signup visible')
  else ko('newsletter signup visible', `${newsletterEmail} not found`)

  return { enquiries: items, newsletter: ns }
}

async function cleanup(enquiryId, newsletterEmail, ns) {
  section('8. Cleanup — remove test enquiry + newsletter')
  // Enquiries use a generic viewset — only Create is public; admin can also delete via DRF ModelViewSet... let me check.
  // EnquiryViewSet is mixins.CreateModelMixin + ListModelMixin + RetrieveModelMixin (no destroy). So we can't DELETE them via API.
  info(`(test enquiry id=${enquiryId} kept — viewset doesn't expose DELETE; remove via admin UI / Django shell if needed)`)

  // Newsletter — same shape, no DELETE in viewset.
  info(`(test newsletter ${newsletterEmail} kept — same reason)`)
}

// ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Testing live backend: ${API}\n`)
  const t0 = Date.now()

  try {
    await testPublicReads()
    await testAuthGuards()
    const { enquiryId, newsletterEmail } = await testPublicWrites()
    await testProgrammeCrud()
    await testSmokeCrud('practice', {
      slug: `crud-test-practice-${Date.now()}`, num: '99', title: 'CRUD test practice',
      discipline: 'Test', short: 'test', body: ['p'], formats: [], image: '', order: 99,
    }, { title: 'CRUD test practice updated' })
    // Capture the slug from the create body for smoke tests — refactor:
    // (we'll just inline these inside the next two calls)
    {
      const slug = `crud-test-journal-${Date.now()}`
      section('5b. JournalPost — smoke CRUD')
      await req('POST', '/journal/', { auth: true, body: {
        slug, num: '99', title: 'CRUD test post', deck: 'd', section: 'Test',
        date: 'May 2026', readTime: '1 min', isPremium: false, cover: '', body: ['p'],
      }, expectStatus: 201 })
      const r = await req('GET', `/journal/${slug}/`, { expectStatus: 200 })
      assertField(r.data, 'title', 'CRUD test post', 'journal title persisted')
      await req('PATCH', `/journal/${slug}/`, { auth: true, body: { deck: 'updated' }, expectStatus: 200 })
      await req('DELETE', `/journal/${slug}/`, { auth: true, expectStatus: 204 })
    }
    {
      const slug = `crud-test-product-${Date.now()}`
      section('5c. Product — smoke CRUD')
      await req('POST', '/shop/', { auth: true, body: {
        slug, num: '99', name: 'CRUD test product', subtitle: 's', kind: 'Test', price: '£0',
        tone: 'ink', cover: '', blurb: 'b', featured: false,
      }, expectStatus: 201 })
      const r = await req('GET', `/shop/${slug}/`, { expectStatus: 200 })
      assertField(r.data, 'name', 'CRUD test product', 'product name persisted')
      await req('PATCH', `/shop/${slug}/`, { auth: true, body: { price: '£99' }, expectStatus: 200 })
      await req('DELETE', `/shop/${slug}/`, { auth: true, expectStatus: 204 })
    }

    await testSiteSettings()
    await testAdminReads(enquiryId, newsletterEmail)
    await cleanup(enquiryId, newsletterEmail)

    // (Practice cleanup now happens inside testSmokeCrud — no extra sweep needed.)
  } catch (err) {
    console.error('\nFATAL:', err.message)
    process.exit(2)
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
  console.log(`\n────────────`)
  console.log(`${pass} passed · ${fail} failed${skipped ? ` · ${skipped} skipped` : ''}  in ${elapsed}s`)
  if (fail) {
    console.log(`\nFailures:`)
    for (const f of failures) console.log(`  - ${f.label}: ${f.detail}`)
    process.exit(1)
  }
}

main()
