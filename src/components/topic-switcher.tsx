"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// const TOPICS = ["Robotics", "Apps", "MUN", "Debate", "Games", "Teaching"]
const TOPICS = ["Games", "Apps", "Robotics", "MUN", "Debate", "Teaching"]

const TOPIC_CONTENT: Record<string, string[]> = {
  Games: [
    "Video games are where it all began. Ever since he was old enough to hold an iPad, ShyGuy has been hooked, and that early love quickly grew into a fascination with how games are actually made.",
    "He taught himself the fundamentals of game design from the ground up, learning how mechanics, art, sound, and story come together to create something a player can lose themselves in. Every project pushed him to pick up new tools and rethink ideas that looked great on paper but fell flat in practice.",
    "Today he designs and builds his own games, blending creative storytelling with the programming skills he has sharpened along the way. More than anything, games taught him how to finish what he starts.",
  ],
  Apps: [
    "What started as curiosity about the software on his devices turned into a passion for building it himself. ShyGuy wanted to understand how the apps he used every day actually worked, and that question became a habit of building his own.",
    "He develops apps that are practical, polished, and genuinely useful, focusing on the small details that make a tool feel effortless to use. From the first sketch of an interface to the final round of testing, he cares about how each screen feels in someone's hands.",
    "From idea to interface to deployment, he enjoys owning the whole process and turning everyday problems into clean, intuitive tools that people actually want to use.",
  ],
  Robotics: [
    "Robotics is where ShyGuy's love of hardware and software meet. Designing, building, and programming robots lets him bring code into the physical world, where an idea is only as good as the machine that carries it out.",
    "Through competitions and personal projects, he has developed a hands-on understanding of engineering, electronics, and the mechanics that make machines move. He has spent countless hours rewriting control logic until a stubborn prototype finally behaves.",
    "The work is rarely smooth, and that is exactly what draws him to it. Robotics has also been one of his greatest lessons in teamwork and communicating clearly under pressure.",
  ],
  MUN: [
    "In Model United Nations, ShyGuy steps into the role of a delegate, researching global issues and representing nations in fast-paced debate. Each conference asks him to understand a country's interests well enough to argue on its behalf.",
    "Preparing for a committee means hours of research, drafting position papers, and anticipating the arguments of dozens of other delegates. By the time he enters the room, he has thought through the many ways a debate might unfold.",
    "MUN has grown his skills in diplomacy, public speaking, and collaboration, teaching him to find common ground and stay composed when conversations shift unexpectedly.",
  ],
  Debate: [
    "Debate has shaped the way ShyGuy thinks and speaks. He thrives on constructing arguments, thinking on his feet, and responding to challenges in real time, treating every round as a puzzle to solve under the clock.",
    "He has learned to break down complex topics quickly, weigh competing perspectives, and build a case that holds up to scrutiny. The discipline of defending a position forces him to understand both sides of an issue.",
    "The impromptu format especially has built his confidence, quick reasoning, and ability to communicate clearly under any circumstance, habits that show up everywhere from group projects to everyday conversations.",
  ],
  Teaching: [
    "ShyGuy believes the best way to understand something is to teach it. Explaining an idea to someone else exposes the gaps in his own knowledge and pushes him to learn each topic more deeply than he otherwise would.",
    "He shares what he knows with others, breaking down complex ideas into approachable lessons that meet people where they are. He pays attention to how someone learns best and adjusts until the concept finally clicks for them.",
    "Whether it is technology, leadership, or teamwork, he finds purpose in helping others grow, and teaching continually shapes how he communicates, mentors, and leads in every part of his life.",
  ],
}

function ImagePlaceholder() {
  return (
    <div className="aspect-[4/3] w-[260px] rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm">
      Image
    </div>
  )
}

export function TopicSwitcher() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * TOPICS.length))
  }, [])

  const next = () => setIndex((i) => (i + 1) % TOPICS.length)
  const prev = () => setIndex((i) => (i - 1 + TOPICS.length) % TOPICS.length)

  const topic = TOPICS[index]
  const paragraphs = TOPIC_CONTENT[topic] ?? []

  return (
    <section className="flex flex-col items-center px-6 pt-18 pb-20">
      <div className="max-w-[1100px] mx-auto flex items-center justify-center gap-6 mb-12">
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={prev}
          aria-label="Previous topic"
          className="group size-14 rounded-full text-accent hover:text-accent hover:bg-accent/10 cursor-pointer"
        >
          <ChevronLeft className="size-7 transition-transform duration-200 group-hover:scale-150" />
        </Button>

        <h2 className="hero-text text-4xl md:text-5xl font-semibold text-center min-w-[10ch]">
          {topic}
        </h2>

        <Button
          variant="ghost"
          size="icon-lg"
          onClick={next}
          aria-label="Next topic"
          className="group size-14 rounded-full text-accent hover:text-accent hover:bg-accent/10 cursor-pointer"
        >
          <ChevronRight className="size-7 transition-transform duration-200 group-hover:scale-150" />
        </Button>
      </div>

      <div className="flex items-start justify-center gap-10 max-w-[1200px] w-full">
        <div className="flex flex-col gap-8">
          <ImagePlaceholder />
          <ImagePlaceholder />
        </div>

        <div className="flex-1 max-w-[560px] text-left">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="hero-text text-base md:text-lg leading-relaxed text-pretty mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <ImagePlaceholder />
          <ImagePlaceholder />
        </div>
      </div>
    </section>
  )
}
