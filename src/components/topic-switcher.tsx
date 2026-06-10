"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const TOPICS = ["Robotics", "Apps", "MUN", "Debate", "Games", "Teaching"]

export function TopicSwitcher() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % TOPICS.length)
  const prev = () => setIndex((i) => (i - 1 + TOPICS.length) % TOPICS.length)

  return (
    <section className="py-16 px-6">
      <div className="max-w-[1100px] mx-auto flex items-center justify-center gap-6">
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={prev}
          aria-label="Previous topic"
          className="text-3xl text-accent hover:bg-accent/10 cursor-pointer"
        >
          {"<"}
        </Button>

        <h2 className="hero-text text-4xl md:text-5xl font-semibold text-center min-w-[10ch]">
          {TOPICS[index]}
        </h2>

        <Button
          variant="ghost"
          size="icon-lg"
          onClick={next}
          aria-label="Next topic"
          className="text-3xl text-accent hover:bg-accent/10 cursor-pointer"
        >
          {">"}
        </Button>
      </div>
    </section>
  )
}
