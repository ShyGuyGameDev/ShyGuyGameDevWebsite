"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { TeamMemberCard } from "@/components/team-member-card"

const teamMembers = [
  {
    name: "HF_ang",
    role: "CTO & Co-Founder",
    // Hidden logo image before HF_ang's picture
    image: "/HF_ang PFP.png",
    // image: "/BetterEmptyConsoleLogo.png",
    // bio: "HF_ang discovered coding through video games and has since developed a passion for problem-solving, creating digital art, and experimenting with physics in code. Adding his video game skills of code and art, he brings easy to read UI and user engagement to the team’s creations. He also constantly experiments with new concepts in his work.",
    bio: "HF_ang originally discovered his passion for programming and problem solving through his love for video games. After starting to work with ShyGuy and Emey in 2024, his video game development skills have started to be applied to other projects, with him focusing on UI/UX design and user engagement.",
    hobbies: [
      { icon: "🎾", label: "Tennis" },
      { icon: "🏓", label: "Ping-pong" },
      { icon: "⛵", label: "Sailing" },
    ],
    discord: "hfanggamedev",
  },
  {
    name: "ShyGuy",
    role: "CEO & Co-Founder",
    image: "/images (1).jpeg",
    bio: "ShyGuy oversees marketing, communications, and product positioning, while also contributing to development. He discovered technology at a young age and has developed strong skills in leadership and strategy. He plays a central role in shaping product vision, aligning the team, and communicating complex ideas clearly.",
    hobbies: [
      { icon: "🎾", label: "Tennis" },
      { icon: "⛳", label: "Golf" },
      { icon: "⛵", label: "Sailing" },
      { icon: "🎹", label: "Piano" },
    ],
    discord: "shyguygamedev",
  },
  {
    name: "Emey",
    role: "Chief Creative Officer & Co-Founder",
    image: "/pixilart-1766028338678.png",
    bio: "Emey is the music composer and an artist on the team. He began coding later than the other members but learned extremely quickly. He enjoys exploring the intersection of music, art, and programming, bringing a unique audio-visual perspective to the team's projects. Through his view of everything, he consistently enhances user experience.",
    hobbies: [
      { icon: "🎾", label: "Tennis" },
      { icon: "🎹", label: "Piano" },
    ],
    discord: "qorachniuphorbia",
  },
]

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Preload BetterShyGuyGameDevLogo.png before HF_ang's picture
  useEffect(() => {
    const img = new window.Image()
    img.src = "/BetterShyGuyGameDevLogo.png"
  }, [])

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
    <section ref={sectionRef} className="relative overflow-hidden py-[100px] pt-[172px] bg-background">
      {/* Abstract gradient background overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      {/* Hidden logo image before HF_ang's picture - with proper dimensions for crawlers */}
      <div className="absolute left-[-9999px] w-[1200px] h-[630px] opacity-0 pointer-events-none">
        <Image
          src="/BetterShyGuyGameDevLogo.png"
          alt="Empty Console Logo"
          width={1200}
          height={630}
          priority
          unoptimized
        />
      </div>
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-[32px] font-semibold text-primary mb-4">
            Empty Console
          </h2>
          <p className="animate-on-scroll opacity-0 animate-delay-100 text-lg text-muted-foreground max-w-4xl mx-auto">
            Empty Console is a startup team cofounded by ShyGuy, HF_ang, and Emey. From a shared passion, the team has evolved into a collaborative space where each member can pursue their unique talents, contribute meaningfully to projects, and develop skills while learning from each other. Everyone on the team brings a unique perspective, balancing technical expertise, creativity, and teamwork to produce innovative projects and products, all while learning more about vibe coding and of the world's future. We started with games, though are now competing in hackathons and building real apps. The Empty Console website is available at{" "}
            <a
              href="https://www.emptyconsole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              www.emptyconsole.com
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`animate-on-scroll opacity-0 animate-delay-${(index + 1) * 100} flex`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <TeamMemberCard {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
