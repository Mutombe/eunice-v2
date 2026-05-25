# Cross-browser / Device QA Checklist

For each device + browser below, walk through every section. Mark ✓ pass, ✗ fail with a note, or — for "didn't test".

This is a manual sweep — it complements the automated `npm run a11y` audit. Schedule ~2 hours per device.

---

## Test matrix

| Browser | Versions to cover | Device |
|---|---|---|
| **Safari (macOS)** | latest | MacBook |
| **Safari (iOS)** | latest | iPhone — portrait + landscape |
| **Chrome (desktop)** | latest | Mac/Windows |
| **Chrome (Android)** | latest | Android phone |
| **Firefox** | latest | Mac/Windows |
| **Edge** | latest | Windows |
| Optional: **Brave**, **Samsung Internet** | latest | Brave on Mac, Samsung on Android |

Notes worth flagging early:
- **Safari is the strictest** — it lags on new CSS features (subgrid, container queries). Test it first.
- **iOS 100vh** is a perennial trap — viewport changes when the URL bar hides. We use `dvh` units in places; verify scroll-snap and hero heights.
- **Firefox** sometimes renders Framer Motion animations differently — watch for janky scroll-reveals.

---

## Per-page walkthrough

For each browser, hit every route, look for the items in each section.

### Site chrome (visible on every page)

- [ ] **Top notice bar** appears (if enabled in admin), dismisses on `×`, stays dismissed after reload
- [ ] **Nav wordmark** — shows "EDC" on mobile (<768px), "Eunice De Campi" on desktop
- [ ] **Nav links** — all 7 items align horizontally on desktop, collapse into a menu on mobile
- [ ] **Hamburger / mobile menu** — opens smoothly, closes on link click, closes on Esc, body scroll locks while open
- [ ] **Sign in** link in footer goes to `/login`
- [ ] **Cookie banner** — appears on first visit, persists choice in localStorage, Accept/Decline both work
- [ ] **Footer** — wordmark, secondary nav (Speaking/Retreats/Privacy/Cookies/Terms), studio contact, subscribe form
- [ ] **Footer subscribe** — submits with valid email, shows confirmation, shows graceful error on duplicate
- [ ] **Skip to content** link — Tab on page-load focuses it, Enter scrolls to `#main`
- [ ] **Ticker / marquee** — scrolls smoothly between `<main>` and `<footer>`; doesn't break on reduced motion

### `/` Studio (homepage)

- [ ] **Hero image** — loads eagerly, no flash of unstyled content, parallax scrolls smoothly
- [ ] **Display type** — Fraunces font loaded, no fallback flash (FOUT)
- [ ] **Hero CTA buttons** route correctly
- [ ] **Practice preview** — 4 disciplines, hover state, founder photo loads at `/practice/mindset`
- [ ] **Journal preview** — 5 latest, dates render correctly
- [ ] **Shop preview** — 4 featured editions, covers load
- [ ] **Testimonials** — 3 quotes carousel/list, citations render
- [ ] **Beliefs list** (numbered `<ol>` of 4) — animations stagger correctly, no layout shift

### `/about`

- [ ] Hero masthead loads, h1 + lede readable
- [ ] **Story column** — 3 paragraphs render under "— The story" caption
- [ ] **Portrait sticky** on scroll (desktop only) — doesn't sticky on mobile
- [ ] **Philosophy** — 4 cards in 2×2 grid (desktop), single column (mobile)
- [ ] **Credentials list** — 5 items, numbered
- [ ] **CTA** at bottom routes to `/enquire`

### `/practice` + `/practice/<slug>`

- [ ] List page — 4 disciplines as rows, hover bg change, image scales on hover
- [ ] Detail page — long-form body paragraphs, formats list, "back to practice" link works
- [ ] **Mindset** still uses the founder photo (`/eunice/working.jpg`)

### `/programmes` + `/programmes/<slug>`

- [ ] List page — 3 programmes with covers + price + italic subtitle
- [ ] "Featured" tag shows on Reinvention + Interior Wellbeing Audit
- [ ] Detail page sections render in order: masthead (with `dl` of duration/cadence/format/price), Problem, Transformation, Modules (4 cards), Inclusions (table), dark CTA
- [ ] **Apply** button on dark CTA section routes to `/enquire?subject=programme-<slug>`
- [ ] "All programmes" link at bottom of CTA section

### `/journal` + `/journal/<slug>`

- [ ] List loads all 5 articles, premium badge on locked ones
- [ ] Detail page — body paragraphs, premium articles show paywall message
- [ ] Article JSON-LD in source (view-source → `<script type="application/ld+json">`)

### `/shop` + `/shop/<slug>`

- [ ] List — 6 products, "featured" highlighted, tone palette visible (ink / olive / clay / stone)
- [ ] Detail — cover + edition metadata + blurb + buy CTA
- [ ] Currency symbol renders (£ — no `?` boxes)

### `/membership`

- [ ] Hero with parallax background
- [ ] 3 tiers (Reader / Member / Inner Circle) — highlighted card has different background
- [ ] Retreats teaser — links through to `/retreats`

### `/retreats`

- [ ] Faded background image in masthead, gradient overlay readable
- [ ] **6 format cards** (8 guests / 3 or 7 days / sourced house / coaching / chef / phones)
- [ ] **Upcoming retreats** — 3 entries with status (Application open / Waiting list / Closed)
- [ ] Each "Apply" link routes to `/enquire?subject=retreat-<name>`
- [ ] Dark closing CTA section

### `/speaking`

- [ ] 4 topics in 2×2 grid
- [ ] Formats table with 4 rows
- [ ] 4 selected engagements rendered
- [ ] CTA links to `/enquire?subject=speaking`

### `/enquire`

- [ ] **Form labels** — all inputs visibly associated with labels (focus indicator on click)
- [ ] **Required field validation** — submitting empty name / email / note blocks submission
- [ ] **Interest buttons** — clicking selects (visual state changes), Budget appears only when Interest = Interiors
- [ ] **Subject prefill** — `/enquire?subject=programme-reinvention` pre-selects the right interest if implemented
- [ ] **Submit** — success shows "Thank you" screen; failure shows red error message
- [ ] **Sidebar (contact channels)** — Studio email, Voice phone, Address, Hours visible

### `/privacy`, `/cookies`, `/terms`

- [ ] All three load with the right title + last revised date
- [ ] **Sticky table of contents** scrolls with body on desktop
- [ ] Anchor links jump to sections
- [ ] Bottom cross-links between Privacy / Cookies / Terms work

### Admin (`/login` → `/admin`)

- [ ] **Login form** — labels associated, "show password" if any, submits, redirects to `/admin`
- [ ] **Wrong password** → error message, no redirect
- [ ] **After login** → sidebar shows all sections, can navigate between panels
- [ ] **Analytics panel** loads counters + charts (uses API GET /api/analytics/summary/)
- [ ] **Programmes panel** — list, click row to edit, change a field, Save persists, reload confirms
- [ ] **Add new programme** — + button → edit form → Save → appears in list
- [ ] **Delete programme** — confirmation prompt → row disappears
- [ ] **Media library** — upload an image, copy URL, paste into another field
- [ ] **Site details panel** — change brand tagline, Save, see change on the public homepage after reload
- [ ] **Logout** — clears token, redirects to `/login`

---

## Performance spot-checks (any browser, but Chrome DevTools easiest)

- [ ] **Lighthouse mobile** score for `/` ≥ 90 across all four categories
- [ ] **First Contentful Paint** under 1.5s on a fast connection
- [ ] **Largest Contentful Paint** (hero image) under 2.5s
- [ ] **Cumulative Layout Shift** under 0.1 (no obvious image jumping)
- [ ] **Total Blocking Time** under 200ms
- [ ] **Bundle sizes** — open Network tab, reload `/`, verify the JS chunks load in parallel: `react-vendor`, `motion`, `icons`, `helmet`, `index`, plus the route's tiny chunk

---

## Accessibility spot-checks (keyboard + screen reader)

- [ ] **Tab through the homepage** — focus indicator visible on every interactive element, in logical order
- [ ] **Skip-to-content** — works (first Tab hit shows it, Enter jumps to main)
- [ ] **No keyboard traps** — can Tab through everything and back out
- [ ] **Esc closes modals / mobile menu**
- [ ] **VoiceOver (macOS)** or **NVDA (Windows)** — open `/`, read through with screen reader, confirm headings make sense and landmark navigation works
- [ ] **Reduced motion** — enable in OS settings; confirm animations are subdued (Framer Motion's `MotionConfig reducedMotion="user"` should handle this)

---

## What to do when something fails

1. **Note the page, browser, version, and what you saw** in a markdown comment below this checklist
2. Capture a screenshot if visual; copy the error message if console
3. For critical breakage (login broken, payment broken, blank pages), file as P0
4. Cosmetic issues (Safari only · pixel-off · only on iPad Mini portrait) can wait

---

*Walk this list end-to-end before any public launch. Re-run after any major content or component change.*
