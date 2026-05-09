// Atelier numbered section heading — used across pages
export default function Heading({ num, label, title, italic = '' }) {
  return (
    <div>
      <div className="flex items-center gap-3 mono text-ink/60">
        {num && <span className="tabular">{num}</span>}
        {num && <span className="w-8 h-px bg-ink/30"></span>}
        <span>{label}</span>
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
