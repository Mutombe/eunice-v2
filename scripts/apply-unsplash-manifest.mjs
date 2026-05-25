/* Applies the URLs from scripts/unsplash-manifest.json to:
 *   - src/data/siteData.js  (practice/journal/shop/about/retreats)
 *   - backend/seed_programmes.py (3 programme covers)
 *
 * Matches by the OLD URL substring already in the file. Idempotent — if
 * the file already has the new URL, the replacement is a no-op.
 *
 * Old URLs are listed alongside the slot in OLD_BY_SLOT below; update
 * those when re-running after a fresh batch.
 */

import fs from 'node:fs/promises'

const manifest = JSON.parse(await fs.readFile('./scripts/unsplash-manifest.json', 'utf-8'))

const OLD_BY_SLOT = {
  // siteData.js
  'practice/interiors':                   'photo-1589271243979-3153ef0dcbd7',
  'practice/writing':                     'photo-1635880431084-bccf4ae5f0cd',
  'practice/circle':                      'photo-1536392706976-e486e2ba97af',
  'journal/the-room-as-a-collaborator':   'photo-1519119668-e2ea8e7278f7',
  'journal/second-season':                'photo-1774799948519-a8df7d5eceb1',
  'journal/inner-architecture':           'photo-1643216231930-0dcfa9645c5a',
  'journal/quiet-report-q1':              'photo-1720534195942-d55d1760df95',
  'journal/letters-to-women-rebuilding':  'photo-1722078141103-70ca6f653b76',
  'shop/second-season-workbook':          'photo-1726938757756-c3fb24fb49c1',
  'shop/quiet-report-q1':                 'photo-1529651737248-dad5e287768e',
  'shop/letters-pamphlet':                'photo-1648994605501-fe0a391d2653',
  'shop/sanctuary-bedroom-guide':         'photo-1601276174812-63280a55656e',
  'shop/annual-print-edition':            'photo-1764437835730-eee9d2dc8d28',
  'shop/morning-ledger':                  'photo-1612376204437-2d178fc7fb92',
  'about/image':                          'photo-1766431014989-3a1fce5420a5',
  'retreats/image':                       'photo-1760681554175-6b3920cad591',
  // seed_programmes.py
  'programme/reinvention':                'photo-1696219364365-971986983759',
  'programme/considered-recovery':        'photo-1557316655-8715fdecd2d1',
  'programme/interior-wellbeing-audit':   'photo-1580253249085-e4a9c178a450',
}

function newId(slot) {
  const e = manifest.find((x) => x.slot === slot)
  if (!e || !e.url) throw new Error(`No manifest entry for ${slot}`)
  // Extract just the photo id from the manifest URL
  const m = e.url.match(/photo-([a-zA-Z0-9_-]+)/)
  if (!m) throw new Error(`Cannot parse photo id from ${e.url}`)
  return 'photo-' + m[1]
}

async function rewrite(filePath, slots) {
  let text = await fs.readFile(filePath, 'utf-8')
  let changes = 0
  for (const slot of slots) {
    const oldId = OLD_BY_SLOT[slot]
    const next = newId(slot)
    if (oldId === next) {
      console.log(`  · ${slot.padEnd(44)} unchanged`)
      continue
    }
    if (!text.includes(oldId)) {
      console.log(`  ! ${slot.padEnd(44)} OLD id "${oldId}" not found — skipping`)
      continue
    }
    text = text.split(oldId).join(next)
    console.log(`  ✓ ${slot.padEnd(44)} ${oldId.slice(-12)} → ${next.slice(-12)}`)
    changes++
  }
  await fs.writeFile(filePath, text)
  return changes
}

console.log('Updating src/data/siteData.js …')
const a = await rewrite('src/data/siteData.js', [
  'practice/interiors', 'practice/writing', 'practice/circle',
  'journal/the-room-as-a-collaborator', 'journal/second-season',
  'journal/inner-architecture', 'journal/quiet-report-q1',
  'journal/letters-to-women-rebuilding',
  'shop/second-season-workbook', 'shop/quiet-report-q1', 'shop/letters-pamphlet',
  'shop/sanctuary-bedroom-guide', 'shop/annual-print-edition', 'shop/morning-ledger',
  'about/image', 'retreats/image',
])

console.log('\nUpdating backend/seed_programmes.py …')
const b = await rewrite('backend/seed_programmes.py', [
  'programme/reinvention', 'programme/considered-recovery', 'programme/interior-wellbeing-audit',
])

console.log(`\n${a + b} URLs updated in 2 files.`)
