import type { Metadata } from "next"
import { categories } from "../../(portfolio)/data"
import { projectHref, projects, stillFor } from "../site"
import { PreviewIndex, type PreviewRow } from "../_components/preview-index"

export const metadata: Metadata = {
  title: "Work",
  description: "Games, apps, and robots built by ShyGuy.",
}

export default function TestWork() {
  return (
    <div className="wrap t3-page-top">
      <header className="work-head">
        <h1 className="display" data-reveal>
          Work
        </h1>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          Everything ShyGuy has built, newest first. The ones marked case study have a full write-up.
        </p>
      </header>

      {categories.map((category) => {
        const rows: PreviewRow[] = projects
          .filter((p) => p.category === category)
          .map((p) => ({
            slug: p.slug,
            title: p.title,
            href: projectHref(p),
            summary: p.summary,
            meta: [p.date, p.caseStudy && "Case study", p.withEmptyConsole && "with Empty Console"]
              .filter(Boolean)
              .join(" · "),
            still: stillFor(p),
            mention: p.mention,
          }))
        if (rows.length === 0) return null
        const id = `work-${category.toLowerCase()}`
        return (
          <section key={category} className="work-group" aria-labelledby={id}>
            <h2 id={id} data-reveal>
              {category}
            </h2>
            <PreviewIndex rows={rows} />
          </section>
        )
      })}
    </div>
  )
}
