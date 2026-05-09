# Replace-Images · eunice-v2 (Atelier)

All imagery is currently sourced from Unsplash for tone and palette only. Replace each entry with Eunice's real photography before launch.

The recommended replacement workflow:
1. Save real photos to `public/images/<slug>/` in the repo.
2. Update each `src` reference (file + line below) to e.g. `/images/<slug>/01.jpg`.
3. Delete the Unsplash query string (`?w=...`) — it isn't needed for local files.
4. Re-run `npm run build`.

---

## Hard-coded photos (in JSX)

| File | Line | Where it appears | What to replace with |
|------|------|------------------|----------------------|
| `src/pages/Membership.jsx` | 16 | The Circle / Membership hero backdrop (low opacity) | Atmospheric photo — light through linen, a tablescape, a path. Should fade into the background |

---

## Practice — Four disciplines (`src/data/siteData.js`)

| Slug | Line | Suggested subject |
|------|------|-------------------|
| `interiors` | 67 | Hero shot of one of her real interiors — architectural, restrained |
| `mindset`   | 87 | A coaching session in progress — calm, considered |
| `writing`   | 107 | A writing scene — hand on a notebook in clean monochrome lighting |
| `circle`    | 126 | A retreat scene — layered table, candles, soft monochrome |

---

## Index — Five projects (`src/data/siteData.js`)

| Project | `cover` line | Gallery lines |
|---------|--------------|---------------|
| House on Park | 144 | 146–149 |
| Atelier №2 | 164 | 166–168 |
| Olive House | 183 | 185–187 |
| Sanctuary Edit | 202 | 204–206 |
| Garden Pavilion | 221 | 223–224 |

`cover` is used both on the index list and as the project hero — pick the strongest editorial shot. Gallery widths are auto-varied in `IndexDetail.jsx` (full / 72% right / 58% left / 88% with offset).

---

## Notes — Article covers (`src/data/siteData.js`)

| Slug | Line |
|------|------|
| `the-room-as-a-collaborator` | 240 |
| `second-season` | 256 |
| `inner-architecture` | 272 |
| `quiet-report-q1` | 288 |
| `letters-to-women-rebuilding` | 303 |

Atelier note covers favour negative space and architectural composition over warmth — pick photos with clean lines, restraint, monochrome palette.

---

## Inspiration

The branding mood-board lives in `inspiration/`. Match that palette and feeling — restrained, architectural, with deep olive, charcoal, bone, and one terracotta accent. Avoid warmth-heavy stock photos.

## Licensing note

All current Unsplash URLs are royalty-free per Unsplash License (https://unsplash.com/license). They are nonetheless **stand-ins** until real photography arrives.
