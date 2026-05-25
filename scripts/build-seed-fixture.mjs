/*
 * Generates a Django fixture (backend/api/fixtures/seed.json) from the
 * frontend's src/data/siteData.js — no manual transcription, no drift.
 * Run from the repo root:  node scripts/build-seed-fixture.mjs
 */
import {
  practice, notes, shop, voices,
  brand, navLinks, hero, studio, membership, contact,
  about, speaking, retreats, legal,
} from '../src/data/siteData.js'
import { writeFileSync, mkdirSync } from 'fs'

const fixtures = []

practice.forEach((p, i) => {
  fixtures.push({
    model: 'api.practice',
    pk: i + 1,
    fields: {
      slug: p.slug, num: p.num, title: p.title, discipline: p.discipline ?? '',
      short: p.short ?? '', body: p.body ?? [], formats: p.formats ?? [],
      image: p.image ?? '', order: i,
    },
  })
})

notes.forEach((n, i) => {
  fixtures.push({
    model: 'api.journalpost',
    pk: i + 1,
    fields: {
      slug: n.slug, num: n.num, title: n.title, deck: n.deck ?? '',
      section: n.section ?? '', date: n.date ?? '', read_time: n.readTime ?? '',
      is_premium: !!n.isPremium, cover: n.cover ?? '', body: n.body ?? [],
      published: true, order: i,
    },
  })
})

shop.products.forEach((p, i) => {
  fixtures.push({
    model: 'api.product',
    pk: i + 1,
    fields: {
      slug: p.slug, num: p.num, name: p.name, italic_title: p.italicTitle ?? '',
      subtitle: p.subtitle ?? '', series: p.series ?? '', edition: p.edition ?? '',
      stamp: p.stamp ?? '', format: p.format ?? '', pages: p.pages ?? '',
      binding: p.binding ?? '', kind: p.kind ?? '', price: p.price ?? '',
      tone: p.tone ?? '', cover: p.cover ?? '', blurb: p.blurb ?? '',
      featured: !!p.featured, order: i,
    },
  })
})

voices.forEach((v, i) => {
  fixtures.push({
    model: 'api.testimonial',
    pk: i + 1,
    fields: { quote: v.quote, name: v.name, role: v.role ?? '', order: i },
  })
})

// loaddata performs raw saves, so auto_now / auto_now_add never fire —
// the fixture must supply created_at / updated_at explicitly.
const now = new Date().toISOString()
for (const f of fixtures) {
  f.fields.created_at = now
  f.fields.updated_at = now
}

mkdirSync('backend/api/fixtures', { recursive: true })
writeFileSync('backend/api/fixtures/seed.json', JSON.stringify(fixtures, null, 2))
console.log(`Wrote ${fixtures.length} records to backend/api/fixtures/seed.json`)

// Site settings — a separate fixture so reseeding it never touches content.
const settings = [{
  model: 'api.sitesettings',
  pk: 1,
  fields: {
    brand, nav: navLinks, hero, studio, membership, contact,
    notification: {
      enabled: false,
      message: 'The Quiet Report · Q1 has arrived. By application only.',
      linkLabel: 'Open the report',
      linkTo: '/shop/quiet-report-q1',
    },
    // Phase 3 content blocks
    about, speaking, retreats, legal,
    updated_at: now,
  },
}]
writeFileSync('backend/api/fixtures/site_settings.json', JSON.stringify(settings, null, 2))
console.log('Wrote site settings to backend/api/fixtures/site_settings.json')
