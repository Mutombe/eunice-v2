# Eunice De Campi · v2 — Atelier

Concept B. A modern atelier / architectural personal-brand site for Eunice De Campi.

> "An atelier — for interiors, mindset, and the architecture of human living."

## Concept summary
Architectural / atelier aesthetic. Mono-grid, monumental thin-serif type, vertical mono labels, numbered indices, ticker-tape footer, terracotta used surgically. Feels like a contemporary studio / fashion-house's website.

- **Palette** — Charcoal `#1A1A19` · Deep olive `#5D6A3F` · Mid olive `#8A9362` · Stone `#D6CFC4` · Bone `#EFE9E3` · Terracotta accent `#C78553`
- **Typography** — Italiana (display, thin elongated serif) · Manrope (body, geometric sans) · JetBrains Mono (numbers, indices, captions)
- **Navigation** — *01 Studio · 02 Practice · 03 Index · 04 Notes · 05 Membership · 06 Enquire*

## Pages
- `/` — Studio (mono-grid hero · four-discipline Practice · index of works · four beliefs · notes · voices · closing CTA)
- `/practice` — Four disciplines, alternating-row editorial layout
- `/practice/:slug` — Discipline detail with numbered formats & prev/next
- `/index` — Project index, two-column grid with typology filter
- `/index/:slug` — Project detail with specs · material palette · editorial gallery (varied widths)
- `/notes` — Editorial articles, three-column grid with section filter
- `/notes/:slug` — Article reader with paywall blur for `isPremium: true`
- `/membership` — The Circle membership · 3 tiers · 2 retreats · 6 benefits · CTA → modal checkout
- `/enquire` — Contact form (stateless mock) with budget tier selection for interiors

## Distinctive details
- **Ticker** — animated marquee of "currently making / currently reading / currently quiet" lines, visible at footer (component: `Ticker.jsx`)
- **Vertical mono labels** — "STUDIO MMXXVI" floats vertically on hero (right + left)
- **Grid overlay** — press `Cmd/Ctrl + G` on any page to toggle the 12-column grid (development helper)
- **Numbered everything** — every section, project, note, form field, palette item is given a 2-digit index

## Premium / paywall
Same architecture as v1 but atelier-styled: hairline borders, mono labels, terracotta for the lock badge.

## Stack
- React 18 + Vite 6
- Tailwind v4 (`@tailwindcss/vite`)
- React Router v6
- Framer Motion
- Lucide icons

## Run
```bash
npm install
npm run dev       # http://localhost:5174
npm run build     # → dist/
npm run preview   # preview the build
```

## Image replacement
**Every photograph is a stand-in.** See [REPLACE-IMAGES.md](./REPLACE-IMAGES.md) for an indexed list of every image location and what should replace it.

## Inspiration
See `inspiration/Branding Board for Holistic Wellness Coach _ Calm, Grounded, Elegant.jpg` for the brand mood board this design responds to.
