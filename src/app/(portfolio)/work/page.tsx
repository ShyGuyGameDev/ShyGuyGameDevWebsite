import type { Metadata } from "next"
import { categories, projects } from "../data"
import { ProjectRow } from "../_components/project-row"

export const metadata: Metadata = {
  title: "Work",
  description: "Games, apps, and robots built by ShyGuy.",
}

export default function V2Work() {
  return (
    <div className="mx-auto max-w-[720px] px-6 pb-24 pt-16 sm:pt-20">
      <h1 className="text-4xl font-semibold tracking-tight">Work</h1>
      <p className="mt-3 text-(--v2-muted)">
        Everything ShyGuy has built, newest first. The ones marked case study have a full write-up.
      </p>

      {categories.map((category) => {
        const items = projects.filter((p) => p.category === category)
        if (items.length === 0) return null
        const headingId = `work-${category.toLowerCase()}`
        return (
          <section key={category} aria-labelledby={headingId} className="mt-14">
            <h2 id={headingId} className="mono text-xs uppercase tracking-[0.18em] text-(--v2-muted)">
              {category}
            </h2>
            <ul className="mt-2">
              {items.map((project) => (
                <ProjectRow key={project.slug} project={project} />
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
