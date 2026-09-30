import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { projectHref, type Project } from "../data"
import { TeamLabel } from "./badge"

/**
 * One line in the Work list. The title link is stretched over the whole row with `after:inset-0`,
 * so the row is clickable while the optional mention link (raised with `z-10`) stays separately
 * clickable instead of being nested inside another anchor.
 */
export function ProjectRow({ project }: { project: Project }) {
  const href = projectHref(project)
  const titleClass =
    "rounded-sm transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-(--v2-accent)"

  return (
    <li className="group relative flex flex-col gap-3 border-b border-(--v2-border) py-5 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="min-w-0">
        <h3 className="flex items-center gap-2 font-medium">
          {project.caseStudy && href ? (
            <Link href={href} className={titleClass}>
              {project.title}
            </Link>
          ) : href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={titleClass}>
              {project.title}
            </a>
          ) : (
            project.title
          )}
          {project.caseStudy ? (
            <span className="mono text-[11px] text-(--v2-accent)">Case study</span>
          ) : (
            href && (
              <ArrowUpRight
                className="h-4 w-4 text-(--v2-muted) transition-colors group-hover:text-(--v2-accent)"
                aria-hidden="true"
              />
            )
          )}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-(--v2-muted)">{project.summary}</p>
        {(project.withEmptyConsole || project.mention) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            {project.withEmptyConsole && <TeamLabel />}
            {project.mention && (
              <a
                href={project.mention.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-1 text-xs text-(--v2-text) underline decoration-(--v2-border) underline-offset-4 transition-colors hover:text-(--v2-accent) hover:decoration-(--v2-accent)"
              >
                {project.mention.label}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
        <span className="mono text-xs text-(--v2-muted)">{project.date}</span>
      </div>
    </li>
  )
}
