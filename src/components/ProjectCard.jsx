import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <Link to={`/index/${project.slug}`} className="group block">
      <div className="img-cover overflow-hidden bg-stone-100">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 grid grid-cols-12 gap-2">
        <span className="col-span-2 mono text-ink/50 tabular">{project.num}</span>
        <div className="col-span-10">
          <h3 className="display-thin text-3xl md:text-4xl leading-[0.95] group-hover:text-clay-500 transition-colors">{project.title}</h3>
          <p className="mt-2 mono-sm text-ink/55">{project.typology} · {project.location} · {project.year}</p>
        </div>
      </div>
    </Link>
  )
}
