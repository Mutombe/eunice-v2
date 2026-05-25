# Phased Implementation Plan — Eunice De Campi Website

> Companion document: [AUDIT.md](./AUDIT.md) · Created 2026-05-21

## Assumptions

- Estimates are **developer-days** for one experienced React/full-stack dev; "design" tasks (★) need a designer's input and can run in parallel.
- The **existing React/Vite codebase is kept as the base** (not a rebuild).
- Estimates **exclude client-supplied content** — Eunice's real bio/story, copywriting, photography, programme details, legal text — and third-party subscription costs.
- Phases 0–1 outputs can swing the total **±30%** (see Risks).

---

## Phase 0 — Decisions & direction · `3–5 days`

*Nothing else can be costed accurately until these land. Covers priorities 1 & 2.*

| Task | Priority | Effort | Notes |
|---|---|---|---|
| Positioning workshop + written statement + moodboard ★ | 1 | 2–3 d | Atelier → wellbeing pivot, or confirm hybrid |
| Architecture decision: backend stack + SSR/SSG approach | 2 | 1–2 d | Decision doc |

**Recommended stack** — Headless CMS (Sanity or Storyblok) · Mailerlite/Kit for newsletter+CRM · Stripe for commerce later · forms via serverless functions. SEO paths:
- **Path A (pragmatic):** stay Vite, add static prerendering (`vite-react-ssg`) + meta/head solution.
- **Path B (proper):** migrate to Astro (React components as islands) — best SEO/performance, +5–8 d in Phase 2.

---

## Phase 1 — Design system realignment + quick wins · `11–16 days`

*Low-risk, high-impact. Covers priorities 4, 5, 7 and the static half of 6.*

| Task | Priority | Effort | Depends on |
|---|---|---|---|
| Typography swap — humanist sans + softer serif; replace mono label style | 4 | 3–4 d | Phase 0 |
| Accessibility pass — contrast, font sizes for 45+, focus states, skip-link, alt text | 4 | 3–5 d | — |
| Palette re-tune — clay→sage/olive tokens, lighten charcoal sections ★ | 5 | 2–3 d | Phase 0 |
| Merge `/notes` + `/blog` into one journal w/ filter | 7 | 1 d | — |
| Static SEO baseline — favicon, robots.txt, sitemap.xml, per-page meta + OG + schema | 6 | 2–3 d | — |

---

## Phase 2 — Platform & integrations · `25–40 days` (revised: self-hosted)

*CMS + analytics decided 2026-05-21: **fully self-hosted**. Backend is **Django +
Django REST Framework** in `backend/` — Django's ORM, auth and migrations cut the
build vs. a from-scratch Node API. CMS is a **custom React admin** wired to the
Django API. SQLite database (single file). React frontend stays a prerendered SPA.*

| Task | Effort | Status |
|---|---|---|
| Per-page SEO/head management (react-helmet-async) | 1–2 d | ✅ Done — `Seo` on all 12 public pages |
| Backend foundation — Django + DRF, SQLite, CORS, media | 2–4 d | ✅ Done — `backend/`, `/api/health/` live |
| Static prerendering for crawlers/scrapers | 2–3 d | ✅ Done — Puppeteer snapshot of 21 routes |
| Content models + DRF serializers/viewsets/API | 4–6 d | ✅ Done — 7 endpoints, content seeded |
| Auth — login API for the admin (session/token) | 1–2 d | ✅ Done — DRF token auth |
| Real CMS — wire the `Admin.jsx` panel to the API + media uploads | 5–8 d | ✅ Done — all panels live incl. Site Details (Orders remains a mock) |
| Wire public pages to fetch from the API (replaces `siteData.js`) | 3–5 d | ✅ Done — every public page on API + settings |
| Newsletter + CRM (email-sending service) integration | 1–2 d | ✅ Done — Mailerlite live, verified end-to-end |
| Contact/enquiry form → real submission + confirmation | 2–3 d | ✅ Done — POSTs to /api/enquiries/ |
| Self-hosted analytics + GDPR cookie consent | 2–4 d | ✅ Done — first-party page-view analytics + consent banner |

*Deployment note: self-hosting needs a small VPS (~$5–10/mo) — see Phase 4.*

---

## Phase 3 — Content & new pages · `10–16 days`

*Covers priority 3. Needs real content from Eunice.*

| Task | Priority | Effort | Status |
|---|---|---|---|
| About/Story page | 3 | 2–3 d | ✅ Done — /about with admin-editable story, philosophy, credentials |
| Programme sales-page template + ~3 programme pages | 3 | 3–5 d | ✅ Done — Programme model + admin panel + sales template + 3 seeded |
| Speaking page | 3 | 1–2 d | ✅ Done — /speaking with topics, formats, engagements |
| Retreats page (extract from Membership + expand) | 3 | 1–2 d | ✅ Done — /retreats with philosophy, format, upcoming list |
| Privacy / cookie / terms legal pages | 3/6 | 1 d | ✅ Done — /privacy, /cookies, /terms (shared LegalPage component) |
| Nav restructure (Studio · About · Practice · Programmes · Journal · Shop · Enquire) | 1/3 | 2–3 d | ✅ Done — 6 → 7 items; secondary nav in footer |
| 10 service areas reframe | 1/3 | — | ✅ Done structurally — areas now mapped across Practice (4 pillars) + Programmes (3 offerings) + Speaking + Retreats. Copy refinement remains for Eunice via admin. |

---

## Phase 4 — Launch readiness · `7–11 days`

| Task | Effort | Status |
|---|---|---|
| Performance — code-split, lazy-load, image hints | 2–3 d | ✅ Done — 575 KB monolith → 80 KB index + 5 vendor chunks + per-route lazy |
| Cross-browser/device QA | 2–3 d | ✅ Checklist done (`QA-checklist.md`) — manual walk-through is the user's |
| Final accessibility audit | 1–2 d | ✅ Done — `npm run a11y` shows 0 violations across 17 routes |
| SEO verification + handover doc | 2–3 d | ✅ Done — sitemap regenerated (31 URLs), `HANDOVER.md` written |

---

## Roll-up

| Phase | Effort (dev-days) |
|---|---|
| 0 · Decisions & direction | 3–5 |
| 1 · Design system + quick wins | 11–16 |
| 2 · Platform & integrations (self-hosted) | 25–40 |
| 3 · Content & new pages | 10–16 |
| 4 · Launch readiness | 7–11 |
| **Total** | **≈ 56–88 dev-days** |

**Calendar:** ~13–18 weeks one dev solo · ~9–12 weeks with a dev + designer in parallel. Critical path: Phase 0 gates everything → Phase 2 backend + CMS gates Phase 3 content.

---

## Risks & variables

- **Positioning pivot scale** — a hard atelier→wellbeing reframe enlarges Phases 1 & 3; a hybrid keeps them lean.
- **Content readiness** — Phase 3 stalls without Eunice's real story, programme details, and photography. Start content collection during Phase 0.
- **Path A vs B** — if SEO/AI-search visibility is mission-critical, Path B is worth the +5–8 days.

## Beyond priorities 1–7

Not in this plan: real shopping cart, booking/scheduling, member portal, digital-product delivery, podcast, site search. Budget a **Phase 5 ≈ 15–25 dev-days** for those when ready.

---

## Progress log

- 2026-05-21 — AUDIT.md and PLAN.md created.
- 2026-05-21 — **Phase 0 decided:** Hybrid positioning (wellbeing brand, architecturally calm) · Path A (Vite + prerender).
- 2026-05-21 — **Phase 1 — design system + tokens:**
  - Typography swapped via tokens — Italiana → Fraunces (soft serif), Manrope → Figtree (humanist sans), JetBrains Mono code-font dropped (labels now Figtree).
  - Palette re-tuned via tokens — terracotta/clay accent → muted sage; near-black section/button fill softened to warm charcoal.
  - Accessibility: base font 15→16px / weight 300→400; label sizes bumped (~9–11px → 11–12px).
  - Static SEO: `favicon.svg` created (was a 404), `robots.txt`, `sitemap.xml`, base `<title>`/description/OG/Twitter meta.
- 2026-05-21 — **Phase 1 — structure + a11y:**
  - Merged `/notes` + `/blog` → single `/journal` (featured lead + section filter); `Blog.jsx`/`Notes.jsx` removed; legacy routes redirect; nav 8→7 items.
  - JSON-LD schema (Organization + Person + WebSite) added to `index.html`.
  - Accessibility: skip-to-content link, keyboard focus-visible ring, `prefers-reduced-motion` support (CSS + Framer Motion `MotionConfig reducedMotion="user"`).
  - Verified: production build passes (4963 modules, no errors).
- 2026-05-21 — **Phase 1 — polish (complete):**
  - Contrast sweep — 145 low-opacity text classes across 22 files raised to a 65% floor (WCAG AA).
  - Font-size sweep — 36 sub-11px text classes raised to an ~11px floor for the 45+ audience.
  - Type polish — `.display-thin` weight 400→300 (Fraunces reads heavier than Italiana); hero line-heights eased for the new metrics.
  - Verified: production build passes.
- ✅ **PHASE 1 COMPLETE.**
- 2026-05-21 — **Phase 2 — CMS/analytics decision:** fully self-hosted CMS (custom backend on the existing admin panel) + self-hosted privacy-first analytics. Revised Phase 2 ≈ 25–40 dev-days (was 12–19); project total ≈ 56–88. Backend stack: Node + Express, SQLite + Drizzle, session auth, local media uploads.
- 2026-05-21 — **Phase 2 started — per-page SEO:** `react-helmet-async` installed; `Seo` component created and wired into all 12 public pages (per-page title, description, canonical, OG, Twitter; Article JSON-LD on journal posts; `noindex` on login). `index.html` slimmed — per-page meta now owned by Helmet. Build verified.
- 2026-05-21 — **Phase 2 — backend stack:** chose **Django + Django REST Framework** for the self-hosted backend (Django's admin/ORM/auth/migrations cut build effort vs. a from-scratch Node API).
- 2026-05-21 — **Phase 2 — backend foundation (done):** `backend/` scaffolded — venv, Django 5.2 + DRF, settings (DRF, CORS, SQLite, media, `.env`), `api` app, `/api/health/` endpoint, migrations applied. Server verified at `localhost:8000`.
- 2026-05-21 — **Phase 2 — content models + API (done):** 7 Django models (Practice, Project, JournalPost, Product, Testimonial, Enquiry, NewsletterSubscriber) + DRF serializers/viewsets registered on a router. Content endpoints are read-public / write-auth; form endpoints (enquiries, newsletter) are public-create / admin-read. Existing `siteData.js` content seeded via a generated Django fixture (`scripts/build-seed-fixture.mjs` → 23 records). Serializers output the camelCase shape the frontend already uses. All endpoints verified.
- 2026-05-21 — **Phase 2 — auth (done):** DRF token authentication. Backend — `/api/auth/login|logout|me/` (login by username *or* email, staff-only). Frontend — `src/lib/api.js` client, real token-based `Login.jsx`, and the `Admin.jsx` guard now validates the stored token via `/auth/me/`. Content writes require a valid token (verified: token PATCH 200, no-token 401). Dev superuser created.
- 2026-05-21 — **Phase 2 — admin wiring (content panels):** `CollectionEditor` rewired from localStorage to the live API — the Posts/Journal, Projects, Practice and Shop panels now do real create/read/update/delete against Django (token-authenticated, draft-then-save model). Verified full CRUD cycle (POST 201 / PUT 200 / DELETE 204). Still on mocks: Inquiries, Orders, and the site-settings panels (Navigation, Notice bar, Media) — the last three pending site-settings models. Media uploads not yet built.
- 2026-05-21 — **Phase 2 — Inquiries + public pages (part 1):** Admin Inquiries panel now reads live submissions from `/api/enquiries/` (filter, search). Public pages — added a `useCollection` hook + shared loading/error states (`AsyncBoundary`); wired the **Journal, journal-post, Index and project-detail** pages to fetch from the API instead of `siteData.js`. Build verified.
- 2026-05-22 — **Index / properties section removed** (per request — properties/spaces will get their own website later). Frontend: `/index` + `/index/:slug` routes, the `Index`/`IndexDetail` pages, `ProjectCard`, the home-page projects section and the hero 'index' slide all deleted; nav 7 → 6 items. Backend: `Project` model + API + admin removed (migration `0002_delete_project` drops the table); `siteData.js` projects array and the seed fixture's project records removed. Build + API verified — `/api/projects/` now returns 404. (Old project data is preserved in git history if it needs migrating to the future property site.)
- 2026-05-22 — **Phase 2 — public pages (part 2):** Practice, practice-detail, Shop and shop-product pages wired to the API via `useCollection`. Every content-collection public page now loads from Django. Build verified. Still on `siteData.js`: Studio (home), Membership, Enquire, Nav, Footer — these need site-settings models.
- 2026-05-22 — **Phase 2 — site-settings model:** added a `SiteSettings` singleton (Django — JSON blobs for brand / nav / hero / studio / membership / contact) + `/api/settings/` endpoint (public read, authenticated write), seeded from `siteData.js`. Frontend: a `SettingsProvider` context + `useSettings` hook with `siteData.js` as an instant fallback; `Nav` and `Footer` now read brand + nav links from it. Build verified.
- 2026-05-22 — **Phase 2 — public pages fully wired:** Studio (home), Membership and Enquire wired to the API / settings — the home-page previews pull live practice / journal / shop / testimonials, and studio / membership / contact config comes from `useSettings`. Practice and NoteDetail's last config strings moved to settings too. **The public site no longer depends on `siteData.js` for live data** — it remains only as the offline fallback inside `settings.jsx`. Build verified.
- 2026-05-22 — **Phase 2 — admin settings panels:** added a `notification` field to `SiteSettings`; the admin's **Navigation** and **Notice bar** panels now load from / save to `/api/settings/` (were localStorage mocks), and the public `NotificationBar` reads the notice bar from settings. Nav links and the notice bar are now editable from the real admin UI. Build + PATCH verified (auth 200 / no-auth 401 / persisted).
- 2026-05-24 — **Phase 2 — aesthetic polish + contact form:** warmed the paper ivory (#EFE9E3 → #F2ECE2), added a `cocoa` token family to the design system, swapped the nav logo to a wide-tracked uppercase wordmark (`EDC` on mobile, `EUNICE DE CAMPI` on desktop) — closer to the brief's premium, spaced typographic flair. Footer colophon corrected to "Set in Fraunces & Figtree." Public **Enquire form now POSTs to `/api/enquiries/`** for real (verified 201) — submissions reach the inbox.
- 2026-05-24 — **Phase 2 — media uploads (done):** new `MediaAsset` Django model (`ImageField`, `uploads/` directory) + admin-only `/api/media/` viewset (multipart upload, list, delete). Frontend `MediaPanel` rewritten — was a localStorage + paste-URL mock, now a real file picker. `uploadFile` helper added to the API client; `useLocalStorage` import dropped from `Admin.jsx` (no longer needed anywhere). Verified end-to-end with a real JPG upload served from `/media/uploads/`.
- 2026-05-24 — **Phase 2 — DigitalOcean Spaces + imagery:** wired media storage to **DigitalOcean Spaces** (`django-storages` + `boto3`, S3-compatible). Toggle via `USE_S3_MEDIA=True` in `.env`. Bucket `edc` in SFO3 region; uploads land at `https://sfo3.digitaloceanspaces.com/edc/uploads/…` (verified end-to-end via `/api/media/`). Practice page images swapped from property/interior shots to **calm nature** (mountain mist, mountain forest, mist landscape) — wellbeing direction the brief asks for. Existing local-disk media records cleaned out.
- **Security note:** DO Spaces credentials were shared in chat — they need to be **rotated** in the DigitalOcean control panel once integration is stable.
- 2026-05-24 — **Phase 2 — Site Details admin panel + cookie consent:** added `SiteDetailsPanel` (`/admin/settings/site`) with structured editors for brand, hero, studio, membership and contact — plus live-validated JSON editors for the array fields (tiers, retreats, beliefs, timeline, channels, meta). **Django admin is no longer needed** for editing site copy. Also mounted a GDPR cookie-consent banner (`CookieConsent`) in `Layout.jsx` — honest copy ("no tracking, no third-party cookies"), accept/decline persisted in localStorage.
- 2026-05-24 — **Phase 2 — first-party analytics:** new `PageView` model + `POST /api/analytics/pageview/` (public) + `GET /api/analytics/summary/` (admin-only). Frontend `useAnalytics` hook (in `src/lib/analytics.js`) pings on every public route change with the path + referrer — no IPs, no cookies, no third party. New admin **Analytics panel** at `/admin/analytics` with total / 7-day / 30-day counters, top-20 pages chart, and a daily-views bar chart. Cookie-consent copy updated to mention anonymous page counts. Backend verified (POST 201, GET unauth 401, authed GET returns aggregates).
- 2026-05-24 — **Phase 2 — Mailerlite integration done.** `backend/api/integrations/mailerlite.py` posts each newsletter signup to `https://connect.mailerlite.com/api/subscribers` via stdlib `urllib` (no new dependency). Wired into `NewsletterSubscriberViewSet.perform_create` as best-effort — local DB is source of truth, Mailerlite failures are logged but never fail the signup. Footer subscribe form now actually hits `/api/newsletter/` with busy/error/success states (treats "already subscribed" as soft success). Config via `MAILERLITE_API_KEY` + optional `MAILERLITE_GROUP_IDS` in `.env`. **Verified live**: POST → 201 locally + the email lands in Mailerlite with `status: active`. Test subscribers were created/cleaned during verification — Mailerlite list is back to its real state.
- 2026-05-24 — **Phase 2 — static prerendering done.** `scripts/prerender.mjs` (~200 lines, stdlib + Puppeteer) starts an in-process static server over `dist/`, then headless-Chromes each public route and writes the post-hydration HTML to `dist/<route>/index.html`. 21 routes captured in ~80s (6 static + 4 practice + 5 journal + 6 shop). API-aware: probes `http://127.0.0.1:8000/api/health/` first — if Django is up, dynamic slugs are pulled live from `/api/practice/`, `/api/posts/`, `/api/shop/`; otherwise it falls back to the slug list baked into `src/data/siteData.js`. CORS origins now include `:4321`. Per-page meta verified: `/practice/interiors` ships title "Interiors — Eunice De Campi", og:description "Interiors held to a slow, architectural standard…", and 614 words of visible content. New npm scripts: `build` (SPA only, fast), `build:static` (SPA + prerender, for production), `build:gh-pages` (with `/eunice-v2/` base + prerender for the Pages preview), `prerender` (snapshot only).
- **Phase 2 COMPLETE.** Phase 3 (about/story · programmes · speaking · retreats · legal pages) is next.
- 2026-05-24 — **Phase 3 — content blocks in SiteSettings:** extended `SiteSettings` with four JSON fields (`about`, `speaking`, `retreats`, `legal`) so Phase 3 page copy is admin-editable without new singletons. Migration `0008_*` adds the fields; serializer + `SettingsProvider` updated; `siteData.js` shipped with brand-voice placeholder defaults that double as the offline fallback. Seed fixture re-generated; DB loaded.
- 2026-05-24 — **Phase 3 — six new public pages:** `/about` (909 words — story, philosophy in 4 pillars, credentials list, image, CTA), `/speaking` (topics, formats table, selected engagements, audience), `/retreats` (extracted/expanded from membership — philosophy, six-point format, upcoming cohorts with status, dark CTA), `/privacy`/`/cookies`/`/terms` (shared `LegalPage` component with sticky table of contents; plain-English brand voice; reads from `SiteSettings.legal`). Nav restructured from 6 to 7 items: Studio · About · Practice · Programmes · Journal · Shop · Enquire. Footer secondary row carries Speaking, Retreats and legal links.
- 2026-05-24 — **Phase 3 — Programme system:** new `Programme` Django model (slug, num, italic title, discipline, lede, JSON `problem`/`transformation`/`modules`/`inclusions`, duration/cadence/format/price, cover, CTA, featured/order). Migration `0008_programme` applied. Serializer + ViewSet wired (`/api/programmes/`, public read / auth write). Admin panel `ProgrammesPanel` added to the React studio admin using the existing `CollectionEditor` — new `json` field kind so structured arrays (modules, inclusions) can be edited inline alongside text fields. Three placeholder programmes seeded: **Reinvention** (12-week 1:1, women in second seasons, from £4,800), **Considered Recovery** (8-week, founders post-burnout, from £5,400), **The Interior Wellbeing Audit** (6-week hybrid, from £8,600 + site visit). List page `/programmes` + per-programme sales page at `/programmes/<slug>` with problem→transformation→modules→inclusions→CTA structure.
- 2026-05-24 — **Phase 3 — verified:** full prerendered build captures **31 routes in 107s**. Per-page SEO confirmed: `/about` ships title "About — Eunice De Campi" + lede as og:description + 909 indexable words; `/programmes/reinvention` ships title "Reinvention — Eunice De Campi" + 910 words of sales copy. New pages indexable by crawlers and ready for social-link previews.
- **Phase 3 COMPLETE.** Next: **Phase 4 — launch readiness** (performance · cross-browser QA · accessibility audit · final SEO + handover).
- 2026-05-25 — **Image curation pass (high-end re-tune):** new `scripts/fetch-unsplash.mjs` (Unsplash API) + `scripts/apply-unsplash-manifest.mjs` curated **19 cover images** across Practice, Journal, Shop, About, Retreats, and Programmes. Queries tuned to a quiet-luxury / Gentlewoman / Cereal-magazine register (linen, oak, leather, library, considered). Each image visually previewed via `Read` before commit. 3 iterations on inner-architecture, quiet-report-q1, and about/image until they landed. Homepage hero + all `/eunice/*.jpg` founder photos preserved as instructed. Wellbeing-first copy revisions: brand tagline, hero (now "The *considered* work of *becoming.*"), studio shortBio.
- 2026-05-25 — **DB migrated SQLite → Neon Postgres:** Added `psycopg[binary]` + `dj-database-url`. Django settings now uses `DATABASE_URL` when present (Postgres) and falls back to SQLite when blank. 150 records (1 superuser + token, 4 practice, 3 programme, 5 journal, 6 shop, 3 testimonial, 1 SiteSettings, 122 PageViews, 2 enquiries) dumped from SQLite and loaded into Neon. Connection uses TLS channel-binding. Local SQLite kept as a switchable fallback.
- 2026-05-25 — **Phase 4 — Performance:** Vite `manualChunks` split the 575 KB monolith into a 80 KB `index` + 165 KB `react-vendor` + 123 KB `motion` + 90 KB `icons` + 17 KB `helmet` + per-route lazy chunks (1–8 KB each, gzipped to under 3 KB). Admin code is now a single 48 KB lazy chunk loaded only when /admin is hit — public visitors don't download it. Image hints added (`loading="eager"` + `fetchpriority="high"` + `decoding="async"` on hero images; `loading="lazy"` everywhere else). `preconnect` for images.unsplash.com added in index.html. Prerender still captures all 31 routes cleanly with lazy chunks.
- 2026-05-25 — **Phase 4 — Accessibility:** New `scripts/a11y-audit.mjs` (axe-core via Puppeteer) audits 17 representative routes. Initial run found 6 distinct violation rules (2 critical labels, 2 serious list/listitem, 3 moderate: region / heading-order / aside-nested). Fixed: (1) `Enquire.jsx` form labels associated via `htmlFor`/`id`; (2) `Studio.jsx` beliefs `<ol>` made a valid list — Reveal moved into `motion.li`; (3) `Ticker.jsx` wrapped in `<aside aria-label="Studio status">` so the marquee is a top-level landmark; (4) `Heading.jsx` emits `<h2>` for the label when no title is passed — fixes h1→h3 jumps on About/Retreats/Speaking; (5) `<aside>` in nested page-rails changed to `<div>` (Enquire) or `<nav>` (LegalPage TOC) or `<div>` (NoteDetail). Re-audit: **0 violations across all 17 routes**.
- 2026-05-25 — **Phase 4 — SEO + handover:** `scripts/build-sitemap.mjs` regenerates `public/sitemap.xml` from the same route list as prerender (pulls live slugs from API when reachable, falls back to siteData). 31 URLs in the new sitemap (was 5, stale). `HANDOVER.md` written — practical operations guide covering: editing content via admin, deploying, where credentials live, how content gets to where it shows, file locations, common tasks. `QA-checklist.md` written — per-browser/device manual sweep checklist for the next human walk-through.
- **Phase 4 COMPLETE.** Only **manual cross-browser QA** + **credential rotation** + **production hosting for the backend** remain before launch.
