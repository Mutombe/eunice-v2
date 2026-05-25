// Eunice De Campi — Studio · Content
// Voice: precise, considered, low-emotive register. Wellbeing-coach first;
// interiors and editorial practice as expressions of the same idea.
// Photography curated via scripts/fetch-unsplash.mjs (see unsplash-manifest.json).

export const brand = {
  name: "Eunice De Campi",
  siteUrl: "https://eunicedecampi.com",
  shortName: "EDC",
  tagline: "A wellbeing practice for women in reinvention — coaching, considered interiors, and the architecture of a considered life.",
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
  { num: "02", label: "About", to: "/about" },
  { num: "03", label: "Practice", to: "/practice" },
  { num: "04", label: "Programmes", to: "/programmes" },
  { num: "05", label: "Journal", to: "/journal" },
  { num: "06", label: "Shop", to: "/shop" },
  { num: "07", label: "Enquire", to: "/enquire" },
]

// === Hero ===
export const hero = {
  index: "01 / 07",
  edition: "STUDIO · MMXXVI · NO. 01",
  wordmark: "Eunice De Campi",
  pretitle: "A wellbeing practice — for women in second seasons",
  title: "The",
  titleEm: "considered",
  title2: "work of",
  title2Em: "becoming.",
  body:
    "Coaching for reinvention, recovery, and the long work of becoming someone new. Alongside it, a small interiors practice and a quarterly journal of considered living. Founded in Oxford. Working internationally. By application.",
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
    // Restraint — plant on oak table, neutral palette (Thanos Pal · Unsplash)
    image: "https://images.unsplash.com/photo-1632829882891-5047ccc421bc?auto=format&fit=crop&w=1600&q=85",
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
    // A writing desk · lamp + open book (Romina Mosquera · Unsplash)
    image: "https://images.unsplash.com/photo-1560752596-3d5bdd30ddc1?auto=format&fit=crop&w=1600&q=85",
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
    // The Circle — set table, considered gathering (Juliette F · Unsplash)
    image: "https://images.unsplash.com/photo-1683803181172-594517d41077?auto=format&fit=crop&w=1600&q=85",
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
    // The room as a collaborator — sunlit window (nulo · Unsplash)
    cover: "https://images.unsplash.com/photo-1718112188918-dbdabca87aa7?auto=format&fit=crop&w=1600&q=85",
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
    // Second season — autumn leaves in misty forest (heino eisner · Unsplash)
    cover: "https://images.unsplash.com/photo-1611458182018-c043f4e947ec?auto=format&fit=crop&w=1600&q=85",
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
    // Inner architecture — woman in kitchen at window (ochimax studio · Unsplash)
    cover: "https://images.unsplash.com/photo-1764867249027-06a1db1c6613?auto=format&fit=crop&w=1600&q=85",
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
    // Quiet Report — books stacked on a wooden table (Tim Wildsmith · Unsplash)
    cover: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1600&q=85",
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
    // Letters — open book on wooden table (micheile henderson · Unsplash)
    cover: "https://images.unsplash.com/photo-1641477176034-1a3e10c343a8?auto=format&fit=crop&w=1600&q=85",
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
    "Eunice De Campi is a coach, writer and interior wellbeing designer. The studio was founded in Oxford in 2008 and has grown — slowly, quietly — into a wellbeing-first practice for women in reinvention, with a small interiors arm and a quarterly editorial journal running alongside.",
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
      cover: "https://images.unsplash.com/photo-1726938757756-c3fb24fb49c1?auto=format&fit=crop&w=1600&q=85",
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
      cover: "https://images.unsplash.com/photo-1654542645844-590f5b8c146a?auto=format&fit=crop&w=1600&q=85",
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
      cover: "https://images.unsplash.com/photo-1646568779353-b9d2b903b3e1?auto=format&fit=crop&w=1600&q=85",
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
      cover: "https://images.unsplash.com/photo-1778731525611-64dc4006a5da?auto=format&fit=crop&w=1600&q=85",
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
      cover: "https://images.unsplash.com/photo-1771313121019-4d0ce055b9a4?auto=format&fit=crop&w=1600&q=85",
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
      cover: "https://images.unsplash.com/photo-1603950227760-e609ce8e15b4?auto=format&fit=crop&w=1600&q=85",
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

// === About / Story ===
// The long-form page about Eunice — replaces a one-line bio with a
// considered story, a stated philosophy, and a credentials list.
export const about = {
  edition: "STUDIO · MMXXVI · STORY",
  pretitle: "The interior life of the woman in her second chapter",
  title: "I built the practice",
  titleEm: "I needed",
  title2: "first.",
  lede:
    "Eunice De Campi is a coach, writer, and interior wellbeing designer. She works at the meeting point of three disciplines — coaching psychology, residential interiors, and the editorial study of considered living — with women navigating reinvention, leadership, and the long quiet of a life rebuilt on purpose.",
  story: [
    "The studio began in a room. A real one, in Oxford, with bad light and a chair that did not belong to me. I had left a corporate role, a marriage, and a city that I had agreed to call home for fifteen years. None of the language available to me — pivot, hustle, journey — fit the work that was actually required.",
    "What I needed was a quiet practice for a loud transition. A method for designing the next chapter the way an architect designs a room — slowly, on paper, with attention to load-bearing walls. I built it, by hand, out of the books and the training and the long hours of asking better questions. I built it for me first.",
    "The practice you find here is what came of that. It is for women in second seasons. For founders rebuilding after burnout. For couples reordering a household around a quieter ambition. For the small handful each year who want a coach who reads architecture and an interior designer who reads psychology — and who knows the two are the same conversation.",
  ],
  philosophy: [
    {
      num: "I",
      title: "The architecture of a considered life",
      body: "A life is constructed, not received. Rooms, schedules, relationships, language — each is a load-bearing element. Coaching, at its best, is the slow editing of the building.",
    },
    {
      num: "II",
      title: "Restraint is the discipline",
      body: "Less, more carefully chosen. The studio rejects optimisation, content velocity, the language of acceleration. We work in seasons, not sprints.",
    },
    {
      num: "III",
      title: "Privacy is the standard",
      body: "Names, addresses, and detail are not for circulation. Every commission is private; every retreat is closed-door; every conversation is held.",
    },
    {
      num: "IV",
      title: "The room is part of the work",
      body: "Where you live shapes who you become. The studio's interior practice and its coaching practice are not adjacent — they are the same idea, applied at different scales.",
    },
  ],
  credentials: [
    "MSc Coaching Psychology, University of East London",
    "ICF Professional Certified Coach (PCC)",
    "Trained in Internal Family Systems · grief literacy · trauma-informed coaching",
    "Fifteen years in residential interior design — Oxford, London, Lisbon",
    "Contributing essays in Cereal, World of Interiors, and The Gentlewoman",
  ],
  // Reading nook · bookshelf, wooden chair (Annie Spratt · Unsplash)
  image: "https://images.unsplash.com/photo-1600188769045-bc6026bfc8cd?auto=format&fit=crop&w=1600&q=85",
  imageCaption: "The reading room · Oxford · MMXXVI",
  cta: { label: "Begin a private conversation", to: "/enquire" },
}

// === Speaking ===
export const speaking = {
  edition: "STUDIO · MMXXVI · SPEAKING",
  pretitle: "On stages, around tables, in rooms",
  title: "Quieter",
  titleEm: "speaking",
  title2: "— in service of a louder idea.",
  lede:
    "Eunice speaks to audiences working through transition — founders re-entering after burnout, women in second seasons, design teams interested in wellbeing as practice rather than perk. Keynote, workshop, and fireside formats. Sourced material, no slides for show.",
  topics: [
    {
      num: "I",
      title: "The architecture of a considered life",
      body: "How rooms — physical and otherwise — shape the people inside them. A keynote on burnout, restoration, and the editorial practice of subtraction.",
    },
    {
      num: "II",
      title: "Second seasons",
      body: "On women rebuilding in mid-life. The chapter no one warns you is coming, and the practice that meets it well.",
    },
    {
      num: "III",
      title: "Interiors as wellbeing infrastructure",
      body: "For design teams and developers — designing residential spaces that hold a person, not just a programme. Case studies from fifteen years of private commissions.",
    },
    {
      num: "IV",
      title: "Restraint, in a season of more",
      body: "On building a quiet brand in a loud industry. For founders, marketers, and creative directors who suspect velocity is not the answer.",
    },
  ],
  formats: [
    { num: "I", label: "Keynote", detail: "45–60 minutes · auditorium or conference" },
    { num: "II", label: "Workshop", detail: "Half-day or full · capped at 24 participants · materials included" },
    { num: "III", label: "Fireside / panel", detail: "Moderated conversation · 30–60 minutes" },
    { num: "IV", label: "Private salon", detail: "8–16 guests · in a borrowed room · by invitation" },
  ],
  engagements: [
    { date: "MMXXVI", venue: "The London Design Biennale", title: "Rooms that hold us" },
    { date: "MMXXVI", venue: "Cereal Editions, in conversation", title: "On restraint" },
    { date: "MMXXV", venue: "House of St Barnabas, London", title: "Second seasons — closed salon" },
    { date: "MMXXV", venue: "Hawkwood College", title: "The architecture of a considered life" },
  ],
  audience: "Founders, executives in transition, designers, women in second chapter, considered creative teams.",
  cta: { label: "Invite Eunice to speak", to: "/enquire?subject=speaking" },
}

// === Retreats ===
// Extracted and expanded from the membership tiers so retreats can have
// their own page, their own application list, and their own SEO.
export const retreats = {
  edition: "STUDIO · MMXXVI · RETREATS",
  pretitle: "A small house, a quieter table, a closed door",
  title: "Three days that",
  titleEm: "behave",
  title2: "like a season.",
  lede:
    "Twice a year the studio takes a small group of guests into a sourced house — Tuscany in spring, the Hebrides in autumn — for a closed-door practice in coaching, conversation, and considered living. No optimisation, no agenda densely packed, no Instagram permitted. Eight guests. Three days. A long table.",
  philosophy: [
    "A retreat is not a holiday. It is a practice of subtraction — fewer inputs, slower meals, a smaller room, a single book. The studio's retreats are designed around what you would do if you trusted yourself for three days.",
    "Each retreat is built like a residency, not a programme: coaching sessions in the morning, long unstructured afternoons, a chef who reads the room, and conversations that finish themselves. Guests arrive at a stranger's table on Friday and leave it changed on Monday.",
  ],
  format: [
    { num: "I", label: "Eight guests", detail: "Sometimes twelve. Never more. A waiting list is kept." },
    { num: "II", label: "Three or seven days", detail: "Short retreats are quarterly; long retreats are biannual." },
    { num: "III", label: "A sourced house", detail: "Always private, always small, always far from the road. Locations are confidential." },
    { num: "IV", label: "Coaching included", detail: "One private session per guest. Group coaching afternoons. A take-home practice." },
    { num: "V", label: "A chef in residence", detail: "Slow Italian, mostly vegetarian. Wine sourced locally. Coffee considered." },
    { num: "VI", label: "No phones, lightly", detail: "Phones are welcomed at the bedside, discouraged at the table." },
  ],
  upcoming: [
    {
      title: "Spring — The Tuscan retreat",
      dates: "April · MMXXVII",
      where: "Val d'Orcia · Italy",
      length: "Three nights",
      status: "Application list open",
      applyTo: "/enquire?subject=retreat-tuscany",
    },
    {
      title: "Autumn — The Hebridean retreat",
      dates: "October · MMXXVI",
      where: "Isle of Mull · Scotland",
      length: "Three nights",
      status: "Waiting list only",
      applyTo: "/enquire?subject=retreat-hebrides",
    },
    {
      title: "Winter — The long retreat",
      dates: "January · MMXXVII",
      where: "Sourced · undisclosed",
      length: "Seven nights",
      status: "Closed",
      applyTo: "/enquire?subject=retreat-winter",
    },
  ],
  // Golden sunrise over misty rural landscape (Peter Thomas · Unsplash)
  image: "https://images.unsplash.com/photo-1760681554843-da433454c08e?auto=format&fit=crop&w=1600&q=85",
  imageCaption: "The Tuscan retreat · April",
  cta: { label: "Apply to the retreat list", to: "/enquire?subject=retreat" },
}

// === Legal pages ===
// Standard templates, brand-voiced. Editable from the admin. Replace
// the placeholder address/contact details with the studio's actual ones
// before public launch.
export const legal = {
  privacy: {
    title: "Privacy",
    updated: "May MMXXVI",
    intro:
      "The studio collects only what is necessary to write back, send the letter, fulfil orders, and run its practice. No tracking pixels are loaded. No third-party advertising networks are used. This page tells you, plainly, what is kept and why.",
    sections: [
      {
        title: "What we collect",
        body: [
          "When you enquire — your name, email, and the message you write. When you subscribe to the letter — your email. When you purchase from the shop — billing and delivery details necessary to fulfil the order. When you browse — anonymous page counts (path, referrer, no IP, no identifier).",
        ],
      },
      {
        title: "Where it lives",
        body: [
          "Enquiries and subscribers are stored on the studio's own servers (the database is not shared with third parties). Newsletter delivery is operated by Mailerlite (your email is shared with them for the sole purpose of sending the letter; you can unsubscribe in one click). Payment processing, when available, is handled by Stripe — the studio does not see or store card numbers.",
        ],
      },
      {
        title: "What we never do",
        body: [
          "Sell, rent, or share your details for advertising. Load third-party tracking pixels (Facebook, Google, TikTok, none). Use cookies for cross-site profiling. Send marketing email to anyone who has not asked for it.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "Ask for a copy of what we hold on you. Ask to correct anything wrong. Ask to be deleted entirely — and we will, within thirty days. Write to studio@eunicedecampi.com to exercise any of these.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookies",
    updated: "May MMXXVI",
    intro:
      "The studio uses very few cookies. Those it does use are first-party only and do exactly what the page describes — nothing more.",
    sections: [
      {
        title: "What we set",
        body: [
          "edc.token — your sign-in token, if you are a member of the studio team using the admin. Only set after you log in.",
          "edc.cookieConsent — remembers whether you accepted this notice, so you are not asked again.",
          "edc.notification.dismissed — remembers whether you dismissed the small notice bar at the top of the page.",
        ],
      },
      {
        title: "What we do not set",
        body: [
          "Advertising cookies. Cross-domain tracking. Social-media pixels. Any cookie set by a third party.",
        ],
      },
      {
        title: "Anonymous page counts",
        body: [
          "We do count, anonymously, which pages are read. The count records the path and the referring page only — no IP address, no fingerprint, no identifier. Nothing about you, only about the page.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms",
    updated: "May MMXXVI",
    intro:
      "Plain-English terms for the studio's site, shop, and coaching practice. By using this site you accept what follows. If anything does not work for you, write — we will read it.",
    sections: [
      {
        title: "The site",
        body: [
          "The writing, photography, and design on this site are © Eunice De Campi unless attributed otherwise. Quote freely, with credit; reproduce in full only with written permission. Excerpts of the journal may be syndicated for editorial purposes with attribution.",
        ],
      },
      {
        title: "The shop",
        body: [
          "Products are sold by the studio directly. Digital goods are non-refundable once downloaded. Physical goods may be returned, unused, within fourteen days. Bespoke commissions — interior, editorial, coaching — are governed by the engagement letter signed at the start of work.",
        ],
      },
      {
        title: "Coaching and retreats",
        body: [
          "Coaching engagements are private. Retreat applications are reviewed individually; deposits, when invited, are non-refundable but transferable to a future cohort. Cancellations within twenty-eight days of a retreat forfeit the deposit; cancellations earlier are refunded in full less a small administration fee.",
        ],
      },
      {
        title: "Liability",
        body: [
          "The studio writes about wellbeing, design, and reinvention. Nothing on this site is medical advice. Coaching is not therapy. Where you are working through a clinical question, the studio will refer you to a professional in the appropriate field.",
        ],
      },
      {
        title: "Law",
        body: [
          "These terms are governed by the laws of England and Wales. Any dispute that cannot be resolved by writing will be heard in the courts of Oxford.",
        ],
      },
    ],
  },
}
