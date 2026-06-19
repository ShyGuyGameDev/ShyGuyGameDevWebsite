"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

const achievements = [
  {
    competition: "Patch Notes Game Jam 2025",
    placing: "17th Out Of 474 Entries",
    image: "/images.png",
  },
  {
    competition: "Congressional App Challenge 2025",
    placing: "3rd Place In California District 15",
    image: "/images (1).png",
  },
  {
    competition: "Berkeley Model United Nations 2025",
    placing: "Outstanding Award",
    image: "/images (2).png",
  },
  {
    competition: "Georgiana Hays Invitational 2026",
    placing: "1st Place In Novice Parliamentary Debate",
    image: "/HomeTopics/Debate/l.png",
  },
]

export function AchievementsSection() {
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
    <section ref={sectionRef} className="relative overflow-hidden py-[100px] bg-background">
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.competition}
              className="animate-on-scroll opacity-0"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <Card className="group flex flex-row items-center gap-5 bg-card rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full p-5">
                <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted">
                  <img
                    src={achievement.image}
                    alt={achievement.competition}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-primary leading-snug">
                    {achievement.competition}
                  </h3>
                  <p className="mt-1 text-base text-secondary leading-relaxed">
                    {achievement.placing}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
