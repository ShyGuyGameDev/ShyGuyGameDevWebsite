"use client"

import { useState } from "react"
import Image from "next/image"

interface TeamMemberCardProps {
  name: string
  role: string
  image: string
  bio: string
  discord: string
  tilt?: "left" | "right"
}

export function TeamMemberCard({ name, role, image, bio, discord, tilt }: TeamMemberCardProps) {
  const [flipped, setFlipped] = useState(false)

  const handleClick = () => {
    setFlipped((prev) => !prev)
  }

  const restingTransform =
    tilt === "left"
      ? "translateX(35%) translateY(8%) rotate(-14deg)"
      : tilt === "right"
        ? "translateX(-35%) translateY(8%) rotate(14deg)"
        : "none"

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={flipped}
      aria-label={`Show ${name}'s bio`}
      className="group block w-full aspect-square [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl transition-transform duration-700 ease-out"
      style={{
        transformOrigin: "bottom center",
        transform: flipped ? "none" : restingTransform,
      }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-background shadow-[0_4px_8px_rgba(0,0,0,0.04)] group-hover:shadow-lg transition-shadow duration-300">
          <div className="flex h-full w-full flex-col items-center justify-center text-center p-6">
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden shadow-md">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Portrait of ${name}, ${role} at Empty Console`}
                fill
                className="object-cover object-center"
                loading="lazy"
                unoptimized
              />
            </div>

            <h3 className="text-2xl font-semibold text-primary mb-1">{name}</h3>
            <p className="text-sm font-medium text-yellow-600 mb-4">{role}</p>

            <div className="flex items-center justify-center gap-2 text-sm">
              <svg className="h-4 w-4 text-yellow-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="text-primary">{discord}</span>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">Click to read bio</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl bg-background shadow-[0_4px_8px_rgba(0,0,0,0.04)] group-hover:shadow-lg transition-shadow duration-300">
          <div className="flex h-full w-full flex-col items-center justify-center text-center p-6">
            <h3 className="text-xl font-semibold text-primary mb-3">{name}</h3>
            <p className="text-sm text-secondary leading-relaxed overflow-y-auto">{bio}</p>
            <p className="mt-4 text-xs text-muted-foreground">Click to flip back</p>
          </div>
        </div>
      </div>
    </button>
  )
}
