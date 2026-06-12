"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const IMAGE_SLOTS = 4

// const TOPICS = ["Robotics", "Apps", "MUN", "Debate", "Games", "Teaching"]
const TOPICS = ["Games", "Apps", "Robotics", "MUN", "Debate", "Teaching"]

const TOPIC_CONTENT: Record<string, string[]> = {
  // Games: [
  //   "Video games are where it all began. Ever since he was old enough to hold an iPad, ShyGuy has been hooked, and that early love quickly grew into a fascination with how games are actually made.",
  //   "He taught himself game design from the ground up, learning how mechanics, art, sound, and story come together to create something a player can lose themselves in. Every project pushed him to pick up new tools and rethink ideas that looked good on paper.",
  //   "Today he designs and builds his own games, blending creative storytelling with the programming skills he has sharpened along the way. More than anything, games taught him how to finish what he starts.",
  //  ],
  Games: [
    "Video games hold a special place in ShyGuy's heart, as they started ShyGuy on his technical journey. Hooked on games ever since he could understand them, they propelled his curiosity into how technology works, operates, and evolves.",
    "As he grew older, he started to learn how to design and build his own games, working in Scratch, Python and Pygame, p5.js, Unity, Godot, and more. Along his video game development journey, he met HF_ang and Emey, which led to the founding of their startup, Empty Console.",
    "Even today, ShyGuy shows his love and appreciation for games through his name, which is a reference to the world famous Mario character, Shy Guy."
  ],
  // Apps: [
  //   "What started as curiosity about the software on his devices turned into a passion for building it himself. ShyGuy wanted to understand how the apps he used every day actually worked, and that question became a habit of making his own.",
  //   "He develops apps that are practical, polished, and genuinely useful, focusing on the small details that make a tool feel effortless to use. From the first sketch of an interface to the final round of testing, he cares about how each screen feels in someone's hands.",
  //   "From idea to interface to deployment, he enjoys owning the whole process and turning everyday problems into clean, intuitive tools that people actually want to use.",
  // ],
  Apps: [
    "Since 2025, ShyGuy has started to transition to building apps with real use cases instead of games. Planning to work both individually and with his startup called Empty Console, ShyGuy wants to help those around him with new innovative solutions.",
    "ShyGuy's first exposure to building real products was in 2025, with the Congressional App Challenge, which he managed to score 3rd place in with Empty Console. Their submission was called Open Stage, an app directly inspired by the story of his school's music teacher and how hard it is for him to manage and grow his local band. Though this app won't be deployed as a real product, it taught ShyGuy a lot about how to build real solutions by learning from those around him.",
    // "See the future. Build the future. Become the future."
  ],
  Robotics: [
    "Designing, building, and programming robots lets ShyGuy bring code into the physical world, a dream he's had ever since seeing Tony Stark's creations in Iron Man.",
    "ShyGuy's robotic interest started with the First Tech Challenge, where he led a team of 15 students from his school. Leading this team helped him learn how to deal with many opinions, low team engagement, and even failure in a competitive setting.",
    "Nowadays, ShyGuy spends most of his time in robotics learning about computer vision and spatial intelligence, which is AI's next frontier. With computer vision, AI will be able to understand the world around it, and science fiction creations like the Terminator finally become a possibility."
  ],
  MUN: [
    "Even with a name like his, ShyGuy is the opposite of shy. He has always been a naturally confident speaker and leader, skills that he has been able to hone throughout his Model United Nations journey.",
    "ShyGuy has attended many conferences around Silicon Valley, though his most notable conference was actually NHSMUN, or National High School Model United Nations, in New York. This is notable as NHSMUN is the most prestigious pre-collegiate MUN conference in the world, and ShyGuy learned so much attending it. During this conference, ShyGuy the delegate for China in the High-Level Advisory Body on Aritifical Intelligence, a committee tied to his other work in technology.",
  ],
  Debate: [
    "Parliamentary debate has shaped the way ShyGuy thinks and constructs arguments. In this format, ShyGuy and his debate partner, ZeedleDee, get the round's topic and their side 20 minutes before the round, leaving very little time for full preparation. Through this, ShyGuy's impromptu speaking skills have grown tremendously.",
    "Even though he started this format in 2026, ShyGuy quickly improved, winning his first novice tournament, the Georginia Hays Tournament, after only a few months. Now that he has moved past novice, ShyGuy is competing in the open division, and will continue to improve his speaking and debating skills throughout high school.",
  ],
  Teaching: [
    "Throughout ShyGuy's life, he has learned to appreciate the mentors he has, as they are the only way he has been able to become who he is. Wanting to fill that space for others like him, ShyGuy has started teaching whenever possible, always doing his best to support other curious students.",
    "ShyGuy's first experience teaching was in 2026, where he was asked to speak at a session of Cumberland Elementary's after-school robotics program. Here, he spoke about his experience experimenting with the idea of a robotic dog paired with computer vision during a recent project, the best way to tackle new problems, and how to communicate complex robotic ideas to non-technical audiences."
  ],
}

function ImageSlot({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="aspect-[4/3] w-[230px] rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm">
        Image
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/3] w-[230px] overflow-hidden rounded-xl border border-border">
      <Image src={src} alt={alt} fill sizes="230px" className="object-cover" />
    </div>
  )
}

export function TopicSwitcher({
  topicImages = {},
}: {
  topicImages?: Record<string, string[]>
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * TOPICS.length))
  }, [])

  const next = () => setIndex((i) => (i + 1) % TOPICS.length)
  const prev = () => setIndex((i) => (i - 1 + TOPICS.length) % TOPICS.length)

  const topic = TOPICS[index]
  const paragraphs = TOPIC_CONTENT[topic] ?? []
  const images = topicImages[topic] ?? []
  const slots = Array.from({ length: IMAGE_SLOTS }, (_, i) => images[i])

  return (
    <section className="flex flex-col items-center px-6 pt-12 pb-14">
      <div className="max-w-[1100px] mx-auto flex items-center justify-center gap-6 mb-8">
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

      <div className="flex items-stretch justify-center gap-10 max-w-[1200px] w-full">
        <div className="flex flex-col gap-6">
          <ImageSlot src={slots[0]} alt={`${topic} image 1`} />
          <ImageSlot src={slots[1]} alt={`${topic} image 2`} />
        </div>

        <div className="flex-1 max-w-[560px] text-center flex flex-col justify-start gap-3">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="hero-text text-base md:text-lg leading-relaxed text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <ImageSlot src={slots[2]} alt={`${topic} image 3`} />
          <ImageSlot src={slots[3]} alt={`${topic} image 4`} />
        </div>
      </div>
    </section>
  )
}
