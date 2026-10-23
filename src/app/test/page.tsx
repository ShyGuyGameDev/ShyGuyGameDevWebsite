import { BASE, clips, contact, featuredProjects, heroReel, posts, projectHref, stillFor } from "./site"
import { HeroReel } from "./_components/hero-reel"
import { WorkIndex, type IndexItem } from "./_components/work-index"

export default function TestHome() {
  const indexItems: IndexItem[] = featuredProjects.flatMap((p) => {
    const still = stillFor(p)
    const href = projectHref(p)
    return still && href ? [{ slug: p.slug, title: p.title, href, kind: p.category, date: p.date, still }] : []
  })

  return (
    <>
      <HeroReel
        clips={heroReel.map((slug) => clips[slug])}
        lead="Currently exploring spatial intelligence and computer vision"
      >
        <div className="hero__title">
          <h1 id="hero-title" className="hero__half hero__half--start">
            <span style={{ "--i": 0 } as React.CSSProperties}>ShyGuy</span>
          </h1>
          <p className="hero__half hero__half--end hero__tagline">
            <span style={{ "--i": 1 } as React.CSSProperties}>Student developer building games, apps, and robots</span>
          </p>
        </div>
      </HeroReel>

      <WorkIndex items={indexItems} more={{ label: "All work", href: `${BASE}/work` }} />

      <section className="lineup wrap" aria-labelledby="writing-title">
        <div className="lineup__head">
          <h2 id="writing-title" className="lineup__title display" data-reveal>
            Blog Posts
          </h2>
          <a href={contact.substack} target="_blank" rel="noopener noreferrer" className="link" data-reveal>
            More on Substack
          </a>
        </div>
        <ul className="lineup__rows">
          {posts.map((post, i) => (
            <li key={post.href} className="lineup__row" data-reveal style={{ "--i": i } as React.CSSProperties}>
              <span>
                <a href={post.href} target="_blank" rel="noopener noreferrer" className="link">
                  {post.title}
                </a>
              </span>
              <span>{post.summary}</span>
              <span>{post.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
