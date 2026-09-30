import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { projectHref, type Project } from "../data"
import { TeamLabel } from "./badge"

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={projectHref(project) ?? "#"}
      className="group flex flex-col overflow-hidden rounded-2xl border border-(--v2-border) bg-(--v2-surface) transition-colors hover:border-(--v2-accent)/50"
    >
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-(--v2-border) bg-(--v2-bg)">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 768px) 330px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="mono text-xs text-(--v2-muted)">
          {project.category} · {project.date}
        </p>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-(--v2-muted)">{project.summary}</p>
        </div>
        {project.withEmptyConsole && (
          <div className="flex flex-wrap items-center gap-2">
            <TeamLabel />
          </div>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-(--v2-accent)">
          Read case study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
