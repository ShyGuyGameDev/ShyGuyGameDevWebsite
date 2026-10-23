import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BASE, clips, featuredProjects, gallery } from "../../site"

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
  return { title: project.title, description: project.summary }
}

export default async function TestCaseStudy({ params }: { params: Params }) {
  const { slug } = await params
  const project = findProject(slug)
  if (!project?.caseStudy) notFound()

  const study = project.caseStudy
  const index = featuredProjects.indexOf(project)
  const next = featuredProjects[(index + 1) % featuredProjects.length]
  const clip = clips[project.slug]
  const film = study.extraVideo ?? (clip && { src: clip.src, caption: undefined })

  const parts = [
    { title: "The problem", body: study.problem },
    { title: study.builtHeading ?? "What he built", body: study.built },
    { title: "Result", body: study.result },
    { title: "What he learned", body: study.learned },
  ]

  return (
    <article className="wrap t3-page-top">
      <h1 className="cs-title display" data-reveal>
        {project.title}
      </h1>
      <div className="cs-back">
        <Link href={`${BASE}/work`} className="link">
          All work
        </Link>
        <span>{project.category}</span>
      </div>

      <div className="cs-intro">
        <div className="cs-intro__text">
          <p className="cs-intro__lead" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {project.summary}
          </p>
          <dl className="cs-facts" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            <dt>When</dt>
            <dd>{project.date}</dd>
            <dt>Team</dt>
            <dd>{study.team}</dd>
          </dl>
          {study.links.length > 0 && (
            <ul className="cs-links" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              {study.links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={(link.filled ?? i === 0) ? "button" : "link"}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {project.image && (
          <div
            className={`cs-intro__picture frame${project.image.fit === "contain" ? " frame--contain" : ""}`}
            data-shutter
          >
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
          </div>
        )}
      </div>

      {film && (
        <figure className="cs-film">
          <div className="frame" data-reveal>
            <video
              src={film.src}
              poster={clip?.poster}
              controls
              muted
              playsInline
              preload="metadata"
              aria-label={film.caption ?? clip?.label}
            />
          </div>
          {film.caption && (
            <figcaption data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              {film.caption}
            </figcaption>
          )}
        </figure>
      )}

      <div className="cs-parts">
        {parts.map((part) => (
          <section key={part.title} className="cs-part">
            <h2 data-reveal>{part.title}</h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              {part.body}
            </p>
          </section>
        ))}
      </div>

      {gallery[project.slug] && (
        <div className="cs-gallery">
          {gallery[project.slug].map((still, i) => (
            <div
              key={still.src}
              className={`frame${still.fit === "contain" ? " frame--contain" : ""}`}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
            >
              <Image src={still.src} alt={still.alt} fill sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      )}

      {next && next.slug !== project.slug && (
        <Link href={`${BASE}/work/${next.slug}`} className="cs-next">
          <span className="cs-next__label">Next project</span>
          <span className="cs-next__name display">{next.title}</span>
        </Link>
      )}
    </article>
  )
}
