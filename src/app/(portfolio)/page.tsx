import { BASE, contact, featuredProjects, posts } from "./data"
import { PostRow } from "./_components/post-row"
import { ProjectCard } from "./_components/project-card"
import { SectionHeader } from "./_components/section-header"

export default function V2Home() {
  return (
    <div className="mx-auto max-w-[1040px] px-6">
      <section aria-labelledby="hero-title" className="pb-16 pt-20 sm:pb-20 sm:pt-28">
        <h1 id="hero-title" className="text-5xl font-semibold tracking-tight sm:text-6xl">
          ShyGuy
        </h1>
        <p className="mt-4 max-w-2xl text-xl leading-snug text-(--v2-text)/85 sm:text-2xl">
          Student developer building games, apps, and robots
        </p>
        <p className="mono mt-6 flex items-center gap-2.5 text-sm text-(--v2-muted)">
          <span className="h-2 w-2 shrink-0 rounded-full bg-(--v2-accent)" aria-hidden="true" />
          Currently exploring spatial intelligence and computer vision
        </p>
      </section>

      <section aria-labelledby="work-title" className="pb-20">
        <SectionHeader id="work-title" title="Select Work" action={{ label: "All work", href: `${BASE}/work` }} />
        <div className="flex flex-wrap justify-center gap-5">
          {featuredProjects.map((project, i) => (
            <div key={project.slug} className="flex w-full md:w-[calc((100%-2.5rem)/3)]">
              <ProjectCard project={project} priority={i === 0} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="writing-title" className="pb-24">
        <SectionHeader
          id="writing-title"
          title="Blog Posts"
          action={{ label: "More on Substack", href: contact.substack, external: true }}
        />
        <ul>
          {posts.map((post) => (
            <PostRow key={post.href} post={post} />
          ))}
        </ul>
      </section>
    </div>
  )
}
