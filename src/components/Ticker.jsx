// Atelier marquee — currently making, currently reading, currently quiet
const items = [
  "Currently making · Olive House Vol. II",
  "Currently reading · The Poetics of Space, Bachelard",
  "Currently quiet · December retreat list, closed",
  "Now sourcing · Larch from a small Surrey mill",
  "Studio status · Accepting two new commissions for Q3",
  "From the kettle · Lapsang, this morning",
  "Currently making · Quiet Report, edition 02",
  "Now reading the room · Notting Hill, NW6",
]

export default function Ticker() {
  return (
    <div className="border-y border-ink/15 bg-paper-warm overflow-hidden mt-12">
      <div className="flex animate-marquee whitespace-nowrap py-3">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mono text-ink/65 mx-8 inline-flex items-center gap-3">
            <span className="text-clay-500">◇</span> {it}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        .animate-marquee { animation: marquee 60s linear infinite; }
      `}</style>
    </div>
  )
}
