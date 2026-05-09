import { Link } from 'react-router-dom'
import { Lock } from '@phosphor-icons/react'

export default function NoteCard({ note }) {
  return (
    <Link to={`/notes/${note.slug}`} className="group block">
      <div className="img-tall overflow-hidden bg-stone-100">
        <img src={note.cover} alt={note.title} loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
      </div>
      <div className="mt-5 grid grid-cols-12 gap-3">
        <span className="col-span-2 mono text-ink/50 tabular self-start">{note.num}</span>
        <div className="col-span-10">
          <div className="flex items-center gap-2 mono-sm text-ink/60">
            <span>{note.section}</span>
            {note.isPremium && <span className="inline-flex items-center gap-1 text-clay-500"><Lock size={9} /> Members</span>}
          </div>
          <h3 className="mt-2 display-thin text-2xl md:text-3xl leading-[1] group-hover:text-clay-500 transition-colors">{note.title}</h3>
          <p className="mt-2 display-italic text-base text-ink/70">{note.deck}</p>
          <p className="mt-3 mono-sm text-ink/45">{note.date} · {note.readTime}</p>
        </div>
      </div>
    </Link>
  )
}
