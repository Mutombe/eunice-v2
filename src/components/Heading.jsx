// Atelier numbered section heading — used across pages.
// When there's no `title`, the small label IS the section heading —
// emit it as <h2> so document outline progresses h1 → h2 → h3 (a11y).
export default function Heading({ num, label, title, italic = '' }) {
  const LabelEl = title ? 'span' : 'h2'
  return (
    <div>
      <div className="flex items-center gap-3 mono text-ink/65">
        {num && <span className="tabular">{num}</span>}
        {num && <span className="w-8 h-px bg-ink/30"></span>}
        <LabelEl className="m-0 font-normal mono text-ink/65">{label}</LabelEl>
      </div>
      {title && (
        <h2 className="mt-8 display-thin text-[clamp(3rem,8vw,7rem)] leading-[0.92] max-w-5xl">
          {title}
          {italic && <> <span className="display-italic">{italic}</span></>}
        </h2>
      )}
    </div>
  )
}
