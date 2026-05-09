// Eunice De Campi — Atelier · Content
// Voice: precise, considered, low-emotive register. Curated like a museum label.
// Every photo chosen for context (subject + palette + architectural mood).
// All Unsplash IDs verified 200 OK.

export const brand = {
  name: "Eunice De Campi",
  shortName: "EDC",
  tagline: "An atelier for interiors, mindset, and the architecture of a considered life.",
  email: "studio@eunicedecampi.com",
  phone: "+44 (0)1865 000 000",
  studio: "The Atelier · Oxford OX1",
  hours: "Tue – Fri · 09:00 – 17:00 GMT · By appointment",
  social: {
    instagram: "https://instagram.com/eunicedecampi",
    linkedin: "https://linkedin.com/in/eunicedecampi",
  },
  index: "EDC—STUDIO 2026",
}

export const navLinks = [
  { num: "01", label: "Studio", to: "/" },
  { num: "02", label: "Practice", to: "/practice" },
  { num: "03", label: "Index", to: "/index" },
  { num: "04", label: "Notes", to: "/notes" },
  { num: "05", label: "Blog", to: "/blog" },
  { num: "06", label: "Shop", to: "/shop" },
  { num: "07", label: "Membership", to: "/membership" },
  { num: "08", label: "Enquire", to: "/enquire" },
]

// === Hero ===
export const hero = {
  index: "01 / 06",
  edition: "STUDIO · MMXXVI · NO. 01",
  wordmark: "Eunice De Campi",
  pretitle: "An atelier — for the long, considered work",
  title: "Of",
  titleEm: "interiors,",
  title2: "mindset, and",
  title2Em: "human living.",
  body:
    "An interdisciplinary studio practice working at the intersection of residential interior design, mindset coaching, and the editorial study of how rooms shape the people inside them. Founded in Oxford. Working internationally.",
  meta: [
    { label: "Founded", value: "2008" },
    { label: "Disciplines", value: "Four" },
    { label: "Studio", value: "Oxford" },
  ],
}

// === Practice — disciplines ===
// Photo set INTENTIONALLY DIFFERENT from v1 — each ID appears only in v2.
// The Eunice founder photos are the only deliberate overlap.
export const practice = [
  {
    slug: "interiors",
    num: "01",
    title: "Interiors",
    discipline: "Residential & Studio Design",
    short:
      "Interiors held to a slow, architectural standard. Plaster, oak, wool, light. Each room considered as an instrument the household plays.",
    body: [
      "The interiors practice is the founding discipline of the studio, established in 2008. We work primarily on residential and small studio commissions across the UK, with occasional international projects.",
      "Each project begins with a long brief — closer to a portrait than a moodboard. We listen for the tempo of the household, the shape of its mornings, the order of its returns. Only then do we begin to shape the rooms.",
      "Material restraint is the studio's working ethic. A small palette, deeply held. Lime plaster, untreated oak, wool, linen, brass that is allowed to age. We commission with named makers — never trends.",
    ],
    formats: [
      { num: "i", label: "Full residential commissions" },
      { num: "ii", label: "Sanctuary-room edits" },
      { num: "iii", label: "Studio & wellness spaces" },
      { num: "iv", label: "Pre-sale property styling" },
    ],
    // Modern open living room with architectural light — atelier interiors
    image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1800&auto=format&fit=crop&q=85",
  },
  {
    slug: "mindset",
    num: "02",
    title: "Mindset",
    discipline: "Aligned Coaching for Women",
    short:
      "Private coaching for women in transition. Eastern wisdom, Western frameworks, working slowly in the present tense.",
    body: [
      "The coaching practice is the most intimate of the studio's four disciplines. It is private, attentive, and unhurried. It is conducted in person at the Oxford studio or remotely, by long-form video call.",
      "Eunice's methodology brings together Eastern spiritual wisdom and Western mindset frameworks — not as competing schools, but as two languages for the same question: how does a woman become someone new without losing what she was?",
      "Most clients arrive in the middle of a recognised transition — bereavement, separation, children leaving, professional reinvention. The work is not to recover the prior life, but to design the next one with care.",
    ],
    formats: [
      { num: "i", label: "1:1 private coaching" },
      { num: "ii", label: "90-day reinvention intensive" },
      { num: "iii", label: "Grief & transition support" },
      { num: "iv", label: "Quarterly reset sessions" },
    ],
    // Eunice in session — at the work table
    image: "/eunice/working.jpg",
  },
  {
    slug: "writing",
    num: "03",
    title: "Writing",
    discipline: "The Editorial Practice",
    short:
      "Long-form essays and the quarterly Quiet Reports — a slow editorial study of spatial psychology, grief, and reinvention.",
    body: [
      "The studio publishes long-form writing on the disciplines it works in. Some of it is public. Most of it is for members.",
      "The signature publication is the Quiet Report — a quarterly dossier of 30 to 40 pages, posted to members in the first week of each season. Past editions have covered slow-luxury interiors, the architecture of bereavement, and the contemporary politics of restraint.",
      "Selected essays appear in print. The annual edition is sent in December.",
    ],
    formats: [
      { num: "i", label: "Public essays" },
      { num: "ii", label: "Quarterly Quiet Reports" },
      { num: "iii", label: "Members letters" },
      { num: "iv", label: "Annual print edition" },
    ],
    // White tufted chair on a clean studio backdrop — the writing room as object
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1800&auto=format&fit=crop&q=85",
  },
  {
    slug: "circle",
    num: "04",
    title: "Circle",
    discipline: "Membership & Retreats",
    short:
      "A small private membership of women across four continents. Two retreats, four reports, twelve letters. Read slowly.",
    body: [
      "The Circle is the studio's membership programme. It is intentionally small. Numbers are capped at 240 members.",
      "Membership includes the full body of editorial work — essays, letters, reports — and access to two annual in-person retreats in Oxford and the Cotswolds. Inner-circle members receive three private sessions per year and the annual print edition.",
    ],
    formats: [
      { num: "i", label: "Member · £14/mo" },
      { num: "ii", label: "Inner Circle · £420/yr" },
      { num: "iii", label: "Two annual retreats" },
      { num: "iv", label: "Quarterly reports" },
    ],
    // Cream living room with macrame & plants — the gathering room
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1800&auto=format&fit=crop&q=85",
  },
]

// === Index — projects ===
// v2's photo set is intentionally distinct from v1.
// Covers and primary slots use NEW Unsplash IDs that don't appear in v1.
// Gallery photos are documented per-image — most are new; a few re-use v1
// gallery shots in different contexts (no cover-to-cover collisions anywhere).
export const projects = [
  {
    slug: "house-on-park",
    num: "001",
    title: "House on Park",
    typology: "Full Residential",
    location: "Oxford",
    year: "2025",
    surface: "186 m²",
    rooms: 7,
    summary:
      "A 1920s family house reworked over fourteen months. Lime-plaster walls, an oak-clad library, and a kitchen built around the household's morning ritual.",
    palette: ["Bone", "Olive", "Untreated oak", "Aged brass"],
    // Modern dining + sweeping stairs — architectural family scale
    cover: "https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?w=2000&auto=format&fit=crop&q=85",
    gallery: [
      // Warm boho-modern living
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&auto=format&fit=crop&q=85",
      // Modern open living detail
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1600&auto=format&fit=crop&q=85",
      // Tropical-warm bedroom
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&auto=format&fit=crop&q=85",
      // Cream + macrame living
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&auto=format&fit=crop&q=85",
    ],
  },
  {
    slug: "atelier-no-2",
    num: "002",
    title: "Atelier №2",
    typology: "Studio & Wellness",
    location: "Oxford",
    year: "2025",
    surface: "28 m²",
    rooms: 1,
    summary:
      "A single-room coaching studio designed to hold three light-moods inside a single 28 m² envelope: morning, afternoon, and candlelit.",
    palette: ["Stone", "Olive", "Linen", "Slow brass"],
    // Single pendant lamp on grey — atelier-spare
    cover: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=2000&auto=format&fit=crop&q=85",
    gallery: [
      // White tufted chair, studio
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&auto=format&fit=crop&q=85",
      // Modern open living detail
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1600&auto=format&fit=crop&q=85",
      // Warm boho — afternoon light variant
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&auto=format&fit=crop&q=85",
    ],
  },
  {
    slug: "olive-house",
    num: "003",
    title: "Olive House",
    typology: "Full Residential",
    location: "Cotswolds",
    year: "2024",
    surface: "240 m²",
    rooms: 9,
    summary:
      "A countryside house for a returning expat family. Olive plaster, reclaimed elm, and a 9-metre kitchen built for long Sundays.",
    palette: ["Olive plaster", "Reclaimed elm", "Cream wool", "Stone"],
    // Dark moody kitchen — the long Cotswold kitchen
    cover: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=2000&auto=format&fit=crop&q=85",
    gallery: [
      // Modern dining/stairs detail
      "https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?w=1600&auto=format&fit=crop&q=85",
      // Cream + macrame
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&auto=format&fit=crop&q=85",
      // Tropical bedroom variant
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&auto=format&fit=crop&q=85",
    ],
  },
  {
    slug: "sanctuary-edit",
    num: "004",
    title: "Sanctuary Edit",
    typology: "Bedroom Edit",
    location: "St John's Wood",
    year: "2024",
    surface: "32 m²",
    rooms: 1,
    summary:
      "A bedroom-only intervention for a recovering CEO. Ivory linen, low warm light, hidden tech. Designed around her morning, not her work.",
    palette: ["Ivory linen", "Charcoal oak", "Brass", "Stone"],
    // Tropical-style bedroom — warm linen variation
    cover: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=2000&auto=format&fit=crop&q=85",
    gallery: [
      // Single pendant lamp accent
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1600&auto=format&fit=crop&q=85",
      // White tufted chair detail
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&auto=format&fit=crop&q=85",
      // Dark moody kitchen as detail
      "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=1600&auto=format&fit=crop&q=85",
    ],
  },
  {
    slug: "garden-pavilion",
    num: "005",
    title: "Garden Pavilion",
    typology: "Studio & Wellness",
    location: "Surrey",
    year: "2023",
    surface: "44 m²",
    rooms: 1,
    summary:
      "A standalone garden room for a yoga teacher. Underfloor heating, a single oversize window, a wall of pale clay bricks reclaimed from the prior outhouse.",
    palette: ["Pale clay", "Linen", "Larch", "Brass"],
    // Warm boho living = pavilion mood
    cover: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=2000&auto=format&fit=crop&q=85",
    gallery: [
      // Modern open with garden view
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1600&auto=format&fit=crop&q=85",
      // Pendant lamp accent
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1600&auto=format&fit=crop&q=85",
    ],
  },
]

// === Notes — articles ===
// Note covers in v2 are atmospheric / landscape rather than figure-led.
// Distinct from v1 article covers — none of these IDs appear in v1.
export const notes = [
  {
    slug: "the-room-as-a-collaborator",
    num: "012",
    title: "The room as a collaborator",
    deck: "On the quiet domestic architecture of becoming someone else.",
    section: "Spatial Studies",
    date: "April 2026",
    readTime: "8 min",
    isPremium: false,
    // Mountain mist — quiet domestic architecture
    cover: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1800&auto=format&fit=crop&q=85",
    body: [
      "There is a kind of grief that arrives before language does. It sits in the corner of a room you can no longer enter the same way.",
      "I think of rooms now the way I once thought about people — as quiet collaborators in who we are becoming. The window seat that asks you to read. The kitchen that holds a Sunday morning argument and resolves it by the time the kettle boils.",
      "When a client tells me she wants her bedroom to feel \"calm\", I know she is also telling me about the size of the noise inside her. We don't begin with paint. We begin with a question — what version of you wants to come home? — and let the answer build the room.",
    ],
  },
  {
    slug: "second-season",
    num: "011",
    title: "Second Season",
    deck: "On the chapter no one warns you is coming, and the woman who lives there.",
    section: "Mindset",
    date: "March 2026",
    readTime: "11 min",
    isPremium: true,
    // Mist landscape — the unmarked chapter
    cover: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&auto=format&fit=crop&q=85",
    body: [
      "There is a chapter that arrives quietly, often in the hour before the rest of the house wakes up. It is the chapter where the woman you have been will no longer carry you.",
      "I lost my husband in a single afternoon. The version of me who had built a life around him died on the same day in a different way — slower, more privately. What followed was not grief alone. It was the long, uncertain becoming of someone I hadn't met yet.",
      "[Members-only — sign in to continue. The full essay covers the four-part framework I use with private clients to navigate the first eighteen months of a major life transition: the inventory, the burial, the threshold, the build.]",
    ],
  },
  {
    slug: "inner-architecture",
    num: "010",
    title: "The Inner Architecture of a Quiet Day",
    deck: "Why the woman you become at 6:30am is the one who designs your life.",
    section: "Wellbeing",
    date: "February 2026",
    readTime: "6 min",
    isPremium: false,
    // Ocean wave — the architecture of a quiet day
    cover: "https://images.unsplash.com/photo-1465804575741-338df8554e02?w=1800&auto=format&fit=crop&q=85",
    body: [
      "I keep a small notebook by the kettle. Not a journal — a ledger. It records the temperature of the room, the colour of the light, the shape of the silence.",
      "The rooms in your house are working on you whether you have asked them to or not. The lighting in your kitchen at 7am is shaping the woman who will walk out of the front door at 8.",
      "None of this is to be moralised. But it is to be designed.",
    ],
  },
  {
    slug: "quiet-report-q1",
    num: "009",
    title: "The Quiet Report · Q1",
    deck: "A 38-page private dossier on the contemporary slow-luxury interior.",
    section: "Quiet Report",
    date: "January 2026",
    readTime: "32 min",
    isPremium: true,
    // Mountain forest — the dossier mood
    cover: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1800&auto=format&fit=crop&q=85",
    body: [
      "[The Quiet Report is a members-only quarterly dossier. This edition spans 38 pages and includes: the state-of-craft index, a private sourcebook for material specialists, four anonymised case studies, and a long essay on the politics of slow luxury.]",
      "[Become a member to access the report.]",
    ],
  },
  {
    slug: "letters-to-women-rebuilding",
    num: "008",
    title: "Four letters",
    deck: "A series of four short letters, written for the woman in the middle of the unsayable.",
    section: "Letters",
    date: "December 2025",
    readTime: "5 min",
    isPremium: false,
    // Mist landscape (variant) — the unsayable
    cover: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1800&auto=format&fit=crop&q=85",
    body: [
      "Dear one — I am writing this from the small green room at the back of the house. The light is doing something forgiving. There are four letters in this series. You will know which one to read first.",
      "I.   For the woman who has not yet said the thing out loud.",
      "II.  For the woman who has been mistaken for capable for too long.",
      "III. For the woman who is waiting for permission.",
      "IV.  For the woman who is, finally, beginning.",
    ],
  },
]

// === Membership ===
export const membership = {
  name: "The Circle",
  pretitle: "By small invitation · Capped at 240",
  pitch:
    "A private membership for women across four continents. Two annual retreats, four quarterly Quiet Reports, twelve monthly letters, and the full editorial archive. The Circle is intentionally small.",
  // Mountain mist — quiet, monumental — distinct from v1's hero
  heroImage: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=2400&auto=format&fit=crop&q=85",
  // Founder portrait inset — by the window, the "rising" energy
  founderPortrait: "/eunice/window.jpg",
  tiers: [
    {
      num: "01",
      name: "Reader",
      price: "Free",
      cadence: "always",
      features: ["Public essays in full", "Quarterly reading list", "Monthly excerpt of the private letter"],
      cta: "Subscribe",
      highlighted: false,
    },
    {
      num: "02",
      name: "Member",
      price: "£14",
      cadence: "/ month",
      features: ["All members essays & letters", "The Quiet Reports — quarterly", "The members archive", "Two members calls / year", "10% off all programmes"],
      cta: "Join the Circle",
      highlighted: true,
    },
    {
      num: "03",
      name: "Inner Circle",
      price: "£420",
      cadence: "/ year · by application",
      features: ["All Member benefits", "Two annual retreats (UK)", "Quarterly group intensives", "Three private sessions / year", "Annual print edition"],
      cta: "Apply",
      highlighted: false,
    },
  ],
  retreats: [
    { num: "I", season: "Spring", location: "Oxford", date: "April 2026", spots: "Members only · 12 spaces" },
    { num: "II", season: "Autumn", location: "Cotswolds", date: "October 2026", spots: "Members only · 12 spaces" },
  ],
}

// === Studio bio ===
export const studio = {
  index: "STUDIO 2026",
  pretitle: "On the practice and the woman who founded it",
  // Founder portrait — full-length, architectural
  founderPortrait: "/eunice/standing.jpg",
  // Secondary portrait — seated, considered authority
  founderSeated: "/eunice/seated.jpg",
  shortBio:
    "Eunice De Campi founded the studio in Oxford in 2008. The practice has grown — slowly, quietly — into a four-discipline atelier working internationally on interiors, mindset, and the long study of how rooms shape the people inside them.",
  timeline: [
    { num: "01", year: "2008", h: "Interiors", b: "Practice founded. Residential commissions across Oxford and London." },
    { num: "02", year: "2014", h: "Event styling", b: "The studio expands into private events. Same instincts, different scale." },
    { num: "03", year: "2019", h: "Refined Wellbeing", b: "An editorial writing practice begins. The bridge between rooms and inner lives." },
    { num: "04", year: "2021", h: "A pause", b: "Personal bereavement. The practice goes quiet for a year. The work that returns is rebuilt." },
    { num: "05", year: "2022", h: "Coaching", b: "The mindset discipline is added to the studio. Eastern wisdom, Western frameworks." },
    { num: "06", year: "2026", h: "The atelier today", b: "Four disciplines, one practice. Working internationally, with a small list of named clients." },
  ],
  beliefs: [
    { num: "I",   line: "A room is never decoration. It is a quiet collaborator." },
    { num: "II",  line: "Wellbeing is not a posture. It is an architecture." },
    { num: "III", line: "Reinvention is not recovery. It is design." },
    { num: "IV",  line: "Restraint, in the end, is the most generous luxury." },
  ],
}

// === Testimonials ===
export const voices = [
  {
    quote:
      "Eunice's calm and positive energy helped me gain clarity and confidence to make decisions I had been putting off for years.",
    name: "Valerie",
    role: "Member · Oxford",
  },
  {
    quote:
      "She designed our home and, somewhere in the process, helped me redesign my marriage. I cannot fully explain how. The kitchen is also exquisite.",
    name: "Anna H.",
    role: "Client · Cotswolds",
  },
  {
    quote:
      "Having worked with Eunice before, she was the only person I called when my life broke open. She helped me embrace the new path holistically — as a chosen one, not a recovery.",
    name: "S. M.",
    role: "Client · London",
  },
]

// === Shop — printed and digital editions ===
// Each product carries cover-design metadata: tone (atelier palette: ink /
// olive / clay / stone / olive-deep / paper), italic word, edition, series,
// split format/pages/binding for the spec strip and ghost stamp.
export const shop = {
  intro: "Workbooks, dossiers, letters, and the annual print edition — written, designed and posted from the Oxford studio.",
  products: [
    {
      slug: "second-season-workbook",
      num: "001",
      name: "Second Season",
      italicTitle: "Season",
      subtitle: "A 90-day reinvention workbook",
      series: "The Coaching Library",
      edition: "Vol. I — No. 01",
      stamp: "01",
      format: "Printed workbook",
      pages: "96 pages",
      binding: "Hand-stitched · olive linen",
      kind: "Printed workbook · 96 pages",
      price: "£32",
      tone: "ink",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1400&auto=format&fit=crop&q=85",
      blurb: "The framework I use with private clients, in book form. Three chapters — the inventory, the burial, the build — with thirty short prompts.",
      featured: true,
    },
    {
      slug: "quiet-report-q1",
      num: "002",
      name: "The Quiet Report · Q1",
      italicTitle: "Quiet",
      subtitle: "Spring · slow-luxury interiors",
      series: "The Quarterly Reports",
      edition: "Q1 — MMXXVI",
      stamp: "Q1",
      format: "Quarterly dossier",
      pages: "38 pages",
      binding: "PDF · digital edition",
      kind: "PDF · 38 pages · digital",
      price: "£18",
      tone: "olive-deep",
      cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&auto=format&fit=crop&q=85",
      blurb: "Quarterly dossier — state-of-craft index, sourcebook, four anonymised case studies, an essay on restraint.",
    },
    {
      slug: "letters-pamphlet",
      num: "003",
      name: "Four letters",
      italicTitle: "letters",
      subtitle: "On rebuilding · printed pamphlet",
      series: "The Correspondence",
      edition: "Edition of 200 — No. III",
      stamp: "IV",
      format: "Letterpress pamphlet",
      pages: "32 pages",
      binding: "Saddle-stitched · hand-bound",
      kind: "Saddle-stitched · 32 pages · letterpress",
      price: "£14",
      tone: "clay",
      cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&auto=format&fit=crop&q=85",
      blurb: "Four short letters in their original envelopes — for the woman in the middle of the unsayable. Hand-bound, edition of 200.",
    },
    {
      slug: "sanctuary-bedroom-guide",
      num: "004",
      name: "On the Sanctuary Bedroom",
      italicTitle: "Sanctuary",
      subtitle: "Design notes from a real commission",
      series: "Field Guides",
      edition: "Field Note No. 04",
      stamp: "—",
      format: "Field guide",
      pages: "24 pages",
      binding: "PDF · digital edition",
      kind: "PDF · 24 pages · digital",
      price: "£12",
      tone: "stone",
      cover: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&auto=format&fit=crop&q=85",
      blurb: "The brief, palette, lighting plan, mistakes, sourcebook. A working monograph from the St John's Wood project.",
    },
    {
      slug: "annual-print-edition",
      num: "005",
      name: "Annual Print Edition",
      italicTitle: "Print",
      subtitle: "MMXXVI · the year in essays",
      series: "The Annual",
      edition: "Edition of 500 — MMXXVI",
      stamp: "★",
      format: "Hardcover annual",
      pages: "184 pages",
      binding: "Linen-bound · olive cloth",
      kind: "Hardcover · 184 pages · linen-bound",
      price: "£48",
      tone: "olive",
      cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop&q=85",
      blurb: "The year's best writing bound by hand in olive linen. Posted in December. Edition of 500.",
    },
    {
      slug: "morning-ledger",
      num: "006",
      name: "The Morning Ledger",
      italicTitle: "Morning",
      subtitle: "A small daily notebook",
      series: "Studio Instruments",
      edition: "No. VI — Daily",
      stamp: "06",
      format: "Letterpress ledger",
      pages: "128 pages · A6",
      binding: "Cloth-bound · olive linen",
      kind: "Letterpress notebook · A6 · 128 pages",
      price: "£22",
      tone: "ink-soft",
      cover: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1400&auto=format&fit=crop&q=85",
      blurb: "Not a journal — a ledger. For the temperature of the room, the colour of the light, the shape of the silence.",
    },
  ],
}

// === Contact ===
export const contact = {
  intro:
    "The studio works with a small number of private clients each year. New commissions and coaching enquiries are welcomed by note. A short reply usually arrives within three working days.",
  channels: [
    { num: "01", label: "Studio", value: "studio@eunicedecampi.com", href: "mailto:studio@eunicedecampi.com" },
    { num: "02", label: "Voice", value: "+44 (0)1865 000 000", href: "tel:+441865000000" },
    { num: "03", label: "Address", value: "The Atelier · Oxford OX1" },
    { num: "04", label: "Hours", value: "Tue – Fri · 09:00 – 17:00 GMT" },
  ],
}
