import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { BASE, featuredProjects } from "../../data"

type Params = Promise<{ slug: string }>

function findProject(slug: string) {
  return featuredProjects.find((p) => p.slug === slug)
}

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = findProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} · ShyGuy`,
      description: project.summary,
      images: project.image ? [{ url: project.image.src, alt: project.image.alt }] : undefined,
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params
  const project = findProject(slug)
  if (!project?.caseStudy) notFound()

  const study = project.caseStudy
  const index = featuredProjects.indexOf(project)
  const next = featuredProjects[(index + 1) % featuredProjects.length]

  const facts = [
    { label: "When", value: project.date },
    { label: "Team", value: study.team },
  ]

  const sections = [
    { title: "The problem", body: study.problem },
    { title: study.builtHeading ?? "What he built", body: study.built },
    { title: "Result", body: study.result },
    { title: "What he learned", body: study.learned },
  ]

  return (
    <article className="mx-auto max-w-[720px] px-6 pb-24 pt-12 sm:pt-16">
      <Link
        href={`${BASE}/work`}
        className="inline-flex items-center gap-1.5 text-sm text-(--v2-muted) transition-colors hover:text-(--v2-accent)"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All work
      </Link>

      <header className="mt-8">
        <p className="mono text-xs text-(--v2-muted)">{project.category}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-(--v2-text)/85">{project.summary}</p>
      </header>

      <dl className="mt-8 grid gap-4 border-y border-(--v2-border) py-5 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="mono text-[11px] uppercase tracking-[0.18em] text-(--v2-muted)">{fact.label}</dt>
            <dd className="mt-1 text-sm">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {project.image && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-(--v2-border) bg-(--v2-surface)">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            sizes="(min-width: 768px) 672px, 100vw"
            className={project.image.fit === "contain" ? "object-contain" : "object-cover"}
          />
        </div>
      )}

      {study.extraVideo && (
        <figure className="mt-10">
          <video
            src={study.extraVideo.src}
            controls
            playsInline
            preload="metadata"
            aria-label={study.extraVideo.caption}
            className="aspect-video w-full rounded-2xl border border-(--v2-border) bg-(--v2-surface) object-contain"
          />
          <figcaption className="mono mt-3 text-xs text-(--v2-muted)">{study.extraVideo.caption}</figcaption>
        </figure>
      )}

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-(--v2-text)/80">{section.body}</p>
          </section>
        ))}
      </div>

      {study.links.length > 0 && (
        <ul className="mt-12 flex flex-wrap gap-3">
          {study.links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  (link.filled ??
                    (i === 0 ||
                      project.slug === "robotic-dog" ||
                      (project.slug === "bugged-out" && i === 1)))
                    ? "inline-flex items-center gap-1.5 rounded-full bg-(--v2-accent) px-4 py-2 text-sm font-medium text-(--v2-bg) transition-opacity hover:opacity-90"
                    : "inline-flex items-center gap-1.5 rounded-full border border-(--v2-border) px-4 py-2 text-sm transition-colors hover:border-(--v2-accent) hover:text-(--v2-accent)"
                }
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {next && next.slug !== project.slug && (
        <Link
          href={`${BASE}/work/${next.slug}`}
          className="group mt-16 flex items-center justify-between rounded-2xl border border-(--v2-border) bg-(--v2-surface) p-5 transition-colors hover:border-(--v2-accent)/50"
        >
          <span>
            <span className="mono block text-[11px] uppercase tracking-[0.18em] text-(--v2-muted)">
              Next project
            </span>
            <span className="mt-1 block font-medium">{next.title}</span>
          </span>
          <ArrowRight
            className="h-5 w-5 text-(--v2-muted) transition-all group-hover:translate-x-0.5 group-hover:text-(--v2-accent)"
            aria-hidden="true"
          />
        </Link>
      )}
    </article>
  )
}
