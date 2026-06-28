"use client"

import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import type React from "react"
import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { compareByDateThenTitle, getNodeText, getYearFromDate, matchesSearch } from "@/lib/utils"

interface MediaMention {
  title: string
  date: string
  url: string
  description: string | React.ReactNode
  tag?: string
  themes?: string[]
  image?: string
}

const mediaMentions: MediaMention[] = [
  {
    title: "Competitive Robotics Strategies",
    date: "February 2025",
    url: "https://shyguygamedev.substack.com/p/strategies-for-competitive-robotics",
    tag: "Post",
    themes: ["Robotics", "Stategies", "Teamwork"],
    image: "/FTCPosts.jpg",
    description: (
      <>
        Working as a team throughout a competitive robotics season is hard, but there a few strategies to make it much easier. In this post, ShyGuy draws on his experience from working in his school&apos;s{" "}
        <a
          href="https://www.firstinspires.org/programs/ftc/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          FTC(First Tech Challenge)
        </a>{" "}
        team, breaks it down, and shares what worked for him and his team. From what to do when creating the team, to how to handle yourself at the actual competition, this post has strategies that apply to the entire season.
      </>
    ),
  },
  {
    title: "P5Play Game Jam Results",
    date: "June 2025",
    url: "https://q5js.substack.com/p/p5play-game-jam-2025-results",
    tag: "Media Mention",
    themes: ["Game design", "Puzzle", "Game Review"],
    image: "/malice_and_mercy-Picsart-AiImageEnhancer.png",
    description: (
      <>
        <a
          href="https://emptyconsole.github.io/Malice-and-Mercy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Malice and Mercy
        </a>
        , an Empty Console game, earned an &quot;honorable mention&quot; in the 2025{" "}
        <a
          href="https://q5play.org/jam/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5play game jam
        </a>
        , which is equivalent to winning 2nd place in the competition.{" "}
        <a
          href="https://www.linkedin.com/in/quinton-ashley/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Quinton Ashley
        </a>{" "}
        was the game jam judge, and is also the original designer and developer of{" "}
        <a
          href="https://p5js.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5.js
        </a>
        ,{" "}
        <a
          href="https://p5play.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5play
        </a>
        ,{" "}
        <a
          href="https://q5js.org/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          q5.js
        </a>
        , and{" "}
        <a
          href="https://q5play.org/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          q5play
        </a>
        . After the competition, he posted his review of{" "}
        <a
          href="https://emptyconsole.github.io/Malice-and-Mercy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Malice and Mercy
        </a>
        , where he highlighted the game&apos;s physics and functionality.
      </>
    ),
  },
  {
    title: "Engagement in Beginner Games",
    date: "March 2025",
    url: "https://shyguygamedev.substack.com/p/game-design-for-beginners",
    tag: "Post",
    themes: ["Game Design", "Strategies", "Engagement", "Beginner", "User Psychology"],
    image: "/EngagementPost2.png",
    description: (
      <>
        Every good game has one goal: Keep the player engaged. However, that&apos;s a lot easier said than done. In this post, ShyGuy shares his top 7 strategies for beginner game designers to use, all of which use the player&apos;s own psychology to their advantage. ShyGuy explains each of these strategies through providing details from one of his own first games,{" "}
        <a
          href="https://shyguygamedev.github.io/Dimensional-Rifter/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Dimensional Rifter
        </a>
        .
      </>
    ),
  },
  {
    title: "Game Jam Tips",
    date: "June 2025",
    url: "https://shyguygamedev.substack.com/p/five-strategies-to-win-a-game-jam",
    tag: "Post",
    themes: ["Game Design", "Game Jam", "Strategies"],
    image: "/JamPost.png",
    description: (
      <>
        Creating a game for a game jam is entirely different than creating a game for yourself to play. In this post, ShyGuy summarizes the top 5 lessons he learned from his experience competing in the 2025{" "}
        <a
          href="https://q5play.org/jam/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5play game jam
        </a>{" "}
        with Empty Console. Each of these strategies are broad enough to be applied to any game jam, but are specific enough to be actually useful in creating a better game and placing higher in the competition.
      </>
    ),
  },
]

// Sort newest first so the most recent post is top-left and the
// earliest ends up farthest down and farthest to the right.
const sortedMediaMentions = [...mediaMentions].sort(compareByDateThenTitle)

export function PostsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMediaMentions = useMemo(() => {
    return sortedMediaMentions.filter((mention) => {
      const haystack = [
        mention.title,
        mention.date,
        mention.tag ?? "",
        ...(mention.themes ?? []),
        getNodeText(mention.description),
      ].join(" ")
      return matchesSearch(haystack, searchQuery)
    })
  }, [searchQuery])

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
  }, [filteredMediaMentions])

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
          <p className="animate-on-scroll opacity-0 animate-delay-100 text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Subscribe to{" "}
            <a
              href="https://shyguygamedev.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              ShyGuy&apos;s Substack
            </a>
            !
          </p>
          <div className="animate-on-scroll opacity-0 animate-delay-200">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search posts & media mentions..."
            />
          </div>
        </div>

        {filteredMediaMentions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredMediaMentions.map((mention, index) => {
              const prevMention = filteredMediaMentions[index - 1]
              const yearBreak =
                prevMention &&
                getYearFromDate(prevMention.date) !== getYearFromDate(mention.date)

              return (
                <Fragment key={mention.title}>
                  {yearBreak ? (
                    <hr className="col-span-full border-0 border-t-2 border-border my-4" />
                  ) : null}
                  <div
                    className="animate-on-scroll opacity-0"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <PostCard {...mention} />
                  </div>
                </Fragment>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            {searchQuery.trim()
              ? `No posts or media mentions match "${searchQuery.trim()}".`
              : "No media mentions yet. Check back soon!"}
          </p>
        )}
      </div>
    </section>
  )
}
