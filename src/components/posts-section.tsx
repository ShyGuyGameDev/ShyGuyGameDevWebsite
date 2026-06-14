"use client"

import { useEffect, useRef } from "react"
import type React from "react"
import { PostCard } from "@/components/post-card"

interface MediaMention {
  title: string
  source: string
  date: string
  url: string
  description: string | React.ReactNode
  tag?: string
  image?: string
  video?: string
}

const mediaMentions: MediaMention[] = [
  {
    title: "Bugged Out",
    source: "itch.io",
    date: "September 2025",
    url: "https://emptyconsole.itch.io/bugged-out",
    tag: "Game Jam",
    image: "/buggedout.png",
    video: "/Clips/BuggedOut.mp4",
    description: (
      <>
        Created for the{" "}
        <a
          href="https://itch.io/jam/patch-notes-v-1-0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Patch Notes Game Jam
        </a>{" "}
        with the theme &apos;The Error is the Feature&apos; in a 3-day jam, placing 17th out of 474 entries. This platformer intentionally uses glitches as core gameplay mechanics, requiring players to use logic, memory, and reflexes to navigate levels.
      </>
    ),
  },
  {
    title: "Malice and Mercy",
    source: "github.io",
    date: "June 2025",
    url: "https://emptyconsole.github.io/Malice-and-Mercy/",
    tag: "Game Jam",
    image: "/malice_and_mercy-Picsart-AiImageEnhancer.png",
    video: "/Clips/MaliceAndMercy.mp4",
    description: (
      <>
        A{" "}
        <a
          href="https://p5js.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5.js
        </a>{" "}
        platformer created for the{" "}
        <a
          href="https://p5play.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5Play
        </a>{" "}
        game jam that earned Honorable Mention. The game explores ethical decision-making in fast-paced platforming. Players choose to save or kill characters while balancing points and time using three throwable abilities. Features a fully custom physics engine, tilemap system, collision detection, particles, and a level editor coded from scratch. You can read about it in an{" "}
        <a
          href="https://q5js.substack.com/p/p5play-game-jam-2025-results"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          article
        </a>{" "}
        written by the creator of p5Play, Quinton Ashley.
      </>
    ),
  },
  {
    title: "Space Looper",
    source: "itch.io",
    date: "August 2025",
    url: "https://emptyconsole.itch.io/space-looper",
    tag: "Game Jam",
    image: "/Untitled_presentation_1-Picsart-AiImageEnhancer.png",
    video: "/Clips/SpaceLooper.mp4",
    description: (
      <>
        A{" "}
        <a
          href="https://itch.io/jam/gmtk-2025"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          GMTK Game Jam
        </a>{" "}
        strategy game created in a 4-day jam with 9,574 submissions. Players circle meteors with limited rope and energy, managing resources across 20 research centers. The game challenges players with precise movement mechanics and strategic resource allocation.
      </>
    ),
  },
  {
    title: "Open Stage",
    source: "vercel.app",
    date: "October 2025",
    url: "https://open-stage.vercel.app/signin",
    tag: "App Challenge",
    image: "/openstage.png",
    video: "/Clips/OpenStage.mp4",
    description: (
      <>
        A{" "}
        <a
          href="https://www.congressionalappchallenge.us/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Congressional App Challenge
        </a>{" "}
        project designed to help musicians earn more revenue via reduced upfront costs and real-time tipping. Empty Console collaborated with local SF Bay Area bands to develop a user-friendly UX and sustainable revenue model. The project placed third in district CA-15, one of the hardest and most competitive districts in the nation.
      </>
    ),
  },
]

// Sort newest first so the most recent post is top-left and the
// earliest ends up farthest down and farthest to the right.
const sortedMediaMentions = [...mediaMentions].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

export function PostsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen py-[100px] pt-[172px] bg-background">
      {/* Abstract gradient background overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-[32px] font-semibold text-primary mb-4">
            Posts &amp; Media Mentions
          </h2>
          <p className="animate-on-scroll opacity-0 animate-delay-100 text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles, features, and write-ups where Empty Console and our projects have been
            mentioned
          </p>
        </div>

        {sortedMediaMentions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedMediaMentions.map((mention, index) => (
              <div
                key={mention.title}
                className="animate-on-scroll opacity-0"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <PostCard {...mention} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No media mentions yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  )
}
