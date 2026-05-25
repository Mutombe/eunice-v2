# Gap Audit — Current Site vs. BITS Studio Brief

> Audit date: 2026-05-21 · Brief: *BITS STUDIO — Website Design Brief for EDC* (12 May 2026)
> Companion document: [PLAN.md](./PLAN.md)

## The headline finding

**The site predates this brief.** It was last committed ~9 May; the brief is dated 12 May. The README confirms it was built to a separate spec ("Concept B — Atelier"), explicitly aiming to feel like *"a contemporary studio / fashion-house's website"* with *"its OWN creative persona — architectural drafting."*

The brief asks for a different framing: a **wellbeing & transformation brand**, explicitly *"NOT a traditional interior design website."* The two documents share a vocabulary (calm, editorial, restraint, olive, architectural calm) but diverge on what the site fundamentally *is*. The structural bones are reusable; the persona, content, and nearly all backend functionality are not yet aligned.

**Legend:** ✅ on-brief · 🟡 partial / needs work · ❌ missing or conflicts

---

## 1 · Brand positioning

| Brief says | Current site | Verdict |
|---|---|---|
| Wellbeing/transformation brand; interiors is *one* pillar | Positioned as a design **atelier**; interiors is *"the founding discipline, established 2008"* | ❌ Conflict |
| 10 service areas: wellbeing strategy, mindset coaching, burnout recovery, grief & reinvention, feminine leadership, wellbeing interior design, Feng Shui, speaking, retreats, programmes | Collapsed to 4 "disciplines": Interiors, Mindset, Writing, Circle | ❌ 6 areas have no home |
| "Showcase my unique story" | Founder bio is fully fabricated placeholder ("b. Lagos," "founded Oxford 2008," invented bereavement narrative) | ❌ Needs real story |
| A "movement," thought-leadership platform | Reads as a boutique design studio | 🟡 |
| Soft-luxury conversion — invitational, not pushy | "Write to the studio," "by application" — genuinely invitational | ✅ |

All brand data is placeholder: phone `+44 (0)1865 000 000`, `studio@eunicedecampi.com`, "The Atelier · Oxford OX1."

---

## 2 · Page-by-page

| Route | Brief expectation | Status |
|---|---|---|
| `/` Studio (home) | Emotional landing, clear paths to convert | 🟡 Strong layout; atelier framing, no in-page newsletter capture |
| `/practice` + `/practice/:slug` | Services / "work with me" | 🟡 Framed as 4 design disciplines, not the 10 offerings |
| `/index` + `/index/:slug` | Project portfolio | 🟡 Interior-design portfolio — fine as *one* section, over-weighted now |
| `/notes` + `/notes/:slug` | Editorial journal w/ category filter | ✅ Filter works; paywall blur present |
| `/blog` | Blog w/ category filtering, SEO structure | ❌ Duplicate of `/notes` — same data, no filter — confusing + duplicate-content risk |
| `/membership` | Community/membership | ✅ Good foundation (tiers, retreats, benefits) |
| `/shop` + `/shop/:slug` | Shopping cart, digital delivery | 🟡 No real cart; mock card-form checkout; no delivery |
| `/enquire` | Contact form w/ confirmation flow | 🟡 Mock only; interests lack Speaking / Coaching / Programmes |
| `/login` + `/admin/*` | Self-editing CMS; member area | 🟡 Mock studio CMS (localStorage, no backend); no member-facing portal |
| Missing | About/Story page | ❌ |
| Missing | Programme sales pages (each a standalone SEO landing page) | ❌ |
| Missing | Speaking page (a stated conversion goal) | ❌ |
| Missing | Retreats page (only buried inside Membership) | ❌ |
| Missing | Privacy / cookie / legal pages | ❌ |
| Missing | Podcast page/embed (should-have) | ❌ |

---

## 3 · Visual direction — the brief's 5 core themes

**1. Low cognitive load & calm aesthetics** — 🟡
Whitespace is generous ✅. But typography conflicts: Italiana is a thin high-contrast Didot-style serif, and JetBrains Mono (a *code* font) is used pervasively for labels, numbers, captions. The brief wants *"rounded, human-centred, legible fonts to feel approachable and calm."*

**2. Trust, empathy, human design** — 🟡
The data file defines the voice as *"precise, considered, low-emotive register… curated like a museum label."* The brief wants *warm, emotionally intelligent, a friendly digital companion.* Only 3 testimonials, home page only (brief wants social proof across key pages).

**3. Purpose-driven functionality & ease of use** — ❌
- Navigation: 8 top-level items + Sign in, with jargon labels ("Studio," "Index," "Practice," "Notes" *and* "Blog").
- Accessibility (audience is 45+): mono labels render at ~9–11px uppercase; body text frequently at low opacity (`text-ink/45–/55`). Both fail the brief's *"high-contrast for readability."* No skip-link; decorative `RingCursor` hides the system cursor.

**4. Interactive calm & gentle motion** — 🟡
Scroll reveals are gentle ✅. But auto-advancing hero carousel (8.5s), a perpetual marquee ticker, parallax on most images, count-ups, and a custom cursor edge toward the brief's *"avoid excessive animations."*

**5. Biophilia / organic shapes** — ❌
The whole surface is deliberately architectural: hairline rules, a 12-column grid, floor-plan glyphs, a "drafting cross-hatch" texture, hard rectangles, zero rounded corners. The brief wants *organic shapes, soft sunrise/dusk gradients, nature textures.*

**Palette** — 🟡 Warm bone/stone base is on-brief ✅. But terracotta/clay (`#C78553`) is the accent everywhere — the brief specifies *muted sage/olive* accents. Near-black charcoal sections read heavier than the brief's airy ivory/taupe.

---

## 4 · Functional requirements

**Root issue: there is no backend.** Every form, checkout, login, and the admin CMS is a front-end mock (localStorage / state).

**Must-have**

| Item | Status |
|---|---|
| Mobile-first responsive | ✅ |
| Newsletter integration | 🟡 Footer form is a mock |
| CRM / email list (Mailerlite/Kit) | ❌ |
| SEO-ready structure | ❌ SPA, single static title/description for all routes |
| OG / social-sharing meta on all pages | ❌ |
| GA4 + privacy-first analytics | ❌ |
| SSL · GDPR cookie consent · privacy policy | ❌ |
| Enquiry form w/ confirmation flow | 🟡 On-screen success only; no email sent |
| Blog w/ category filtering | 🟡 `/notes` filters; `/blog` doesn't |
| Fast load / global CDN | 🟡 Images hot-linked from Unsplash; `favicon.svg` referenced but missing (404) |

**Should-have:** podcast ❌ · search ❌ · newsletter archive ❌ · course/programme template ❌ · member/community login area ❌ · multi-currency ❌ · digital-product delivery ❌ · lead-magnet capability ❌.

---

## 5 · SEO & discoverability

- No `robots.txt`, no `sitemap.xml`, no schema markup (Organization / Person / Article all absent).
- Identical `<title>` and meta description on every route.
- Client-rendered SPA with no SSR/prerender — weak for "global discoverability" and "AI-powered search visibility."
- PageSpeed 90+ target at risk: large hot-linked images, Google Fonts, Framer Motion bundle.
- Blog content is fictional placeholder essays — not planned around long-tail keywords.

---

## 6 · What's genuinely on-brief

✅ Editorial, elevated, restrained tone · ✅ generous whitespace · ✅ invitational/non-pushy conversion voice · ✅ warm bone/stone base palette · ✅ Membership ("The Circle") is a solid community foundation · ✅ paywall/premium mechanic exists · ✅ responsive structure · ✅ "Second Season" / reinvention language already woven through copy.

---

## 7 · Priority recommendations

1. Resolve the positioning question — atelier vs wellbeing brand vs hybrid.
2. Decide the backend — CMS + integrations stack, and SSR/SSG approach.
3. Add the missing pages — About/Story, Programmes, Speaking, Retreats, Privacy/legal.
4. Typography & accessibility pass — soft humanist fonts; larger text/contrast for the 45+ audience.
5. Re-tune palette — sage/olive accent; lighten the charcoal-heavy sections.
6. SEO/compliance baseline — per-page meta, OG, schema, sitemap, robots.txt, GA4, cookie consent.
7. Merge `/notes` and `/blog` — they are duplicates.

See [PLAN.md](./PLAN.md) for the phased implementation plan.
