"use client"

import { useEffect, useRef } from "react"
import type React from "react"
import { ArrowUpRight, Newspaper } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MediaMention {
  title: string
  source: string
  date: string
  url: string
  description: string | React.ReactNode
  tag?: string
}

const mediaMentions: MediaMention[] = [
  {
    title: "p5Play Game Jam 2025 Results",
    source: "q5.js by Quinton Ashley",
    date: "June 2025",
    url: "https://q5js.substack.com/p/p5play-game-jam-2025-results",
    tag: "Article",
    description: (
      <>
        Empty Console&apos;s platformer{" "}
        <span className="font-medium text-primary">Malice and Mercy</span> earned an Honorable
        Mention in the p5Play Game Jam 2025 and was featured in the official results write-up by
        Quinton Ashley, the creator of{" "}
        <a
          href="https://p5play.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5Play
        </a>
        .
      </>
    ),
  },
]

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
    <section ref={sectionRef} className="py-[100px] pt-[172px] bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-[32px] font-semibold text-primary mb-4">
            Posts &amp; Media Mentions
          </h2>
          <p className="animate-on-scroll opacity-0 animate-delay-100 text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles, features, and write-ups where Empty Console and our projects have been
            mentioned
          </p>
        </div>

        {mediaMentions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mediaMentions.map((mention, index) => (
              <div
                key={mention.title}
                className="animate-on-scroll opacity-0"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <Card className="group bg-card rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="px-6 py-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Newspaper className="h-4 w-4" aria-hidden="true" />
                        <span>{mention.source}</span>
                      </div>
                      {mention.tag && (
                        <span className="px-3 py-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 text-xs font-medium rounded-full">
                          {mention.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{mention.date}</p>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      <a
                        href={mention.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1.5 text-primary hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
                      >
                        <span>{mention.title}</span>
                        <ArrowUpRight
                          className="h-5 w-5 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </h3>
                    <p className="text-base text-secondary leading-relaxed">
                      {mention.description}
                    </p>
                  </CardContent>
                </Card>
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
