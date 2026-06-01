"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type React from "react"
import { useState, useRef, useEffect } from "react"

interface ProjectCardProps {
  title: string
  description: string | React.ReactNode
  learnings: string[]
  technologies: string[]
  image?: string
  video?: string
  url?: string
  date?: string
}

export function ProjectCard({ title, description, learnings, technologies, image, video, url, date }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const SKIP_START = 1.5 // seconds to skip at start
  const SKIP_END = 1.5 // seconds to skip at end
  const FADE_IN_DURATION = 0.25 // seconds for initial fade in (faster)
  const CROSSFADE_DURATION = 0.6 // seconds for fade out transition (matches hero section)
  const [videoOpacity, setVideoOpacity] = useState(0)

  // Detect if device is desktop (not touch device and has hover capability)
  useEffect(() => {
    const checkIsDesktop = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const hasHover = window.matchMedia('(hover: hover)').matches
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches
      setIsDesktop(!hasTouch && hasHover && isLargeScreen)
    }

    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  // Intersection Observer for mobile autoplay
  useEffect(() => {
    if (isDesktop || !video) return

    const cardElement = cardRef.current
    if (!cardElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      { threshold: 0.5 } // Play when 50% of card is visible
    )

    observer.observe(cardElement)
    return () => observer.disconnect()
  }, [isDesktop, video])

  // Determine if video should play (desktop hover OR mobile in view)
  const shouldPlayVideo = (isDesktop && isHovered) || (!isDesktop && isInView)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement || !video || !shouldPlayVideo) return
    setVideoOpacity(0)

    const updateVideoOpacity = () => {
      if (!videoElement.duration) {
        setVideoOpacity(0)
        return
      }

      const playableStart = SKIP_START
      const playableEnd = videoElement.duration - SKIP_END

      // If playable segment is too short, keep visible
      if (playableEnd - playableStart <= FADE_IN_DURATION + CROSSFADE_DURATION) {
        setVideoOpacity(1)
        return
      }

      const fadeInEnd = playableStart + FADE_IN_DURATION
      const fadeOutStart = playableEnd - CROSSFADE_DURATION
      const current = videoElement.currentTime

      let nextOpacity = 1

      if (current < playableStart) {
        nextOpacity = 0
      } else if (current <= fadeInEnd) {
        nextOpacity = Math.min(1, Math.max(0, (current - playableStart) / FADE_IN_DURATION))
      } else if (current >= fadeOutStart) {
        nextOpacity = Math.min(1, Math.max(0, (playableEnd - current) / CROSSFADE_DURATION))
      } else {
        nextOpacity = 1
      }

      setVideoOpacity((prev) => (Math.abs(prev - nextOpacity) > 0.01 ? nextOpacity : prev))
    }

    const handleTimeUpdate = () => {
      if (videoElement.duration) {
        const maxTime = videoElement.duration - SKIP_END
        if (videoElement.currentTime >= maxTime) {
          videoElement.currentTime = SKIP_START
        }
      }
      updateVideoOpacity()
    }

    const handleLoadedMetadata = () => {
      videoElement.currentTime = SKIP_START
      updateVideoOpacity()
      videoElement.play().catch(() => {
        // Ignore autoplay errors
      })
    }

    const handleCanPlay = () => {
      if (videoElement.currentTime < SKIP_START && videoElement.duration > SKIP_START + SKIP_END) {
        videoElement.currentTime = SKIP_START
      }
      updateVideoOpacity()
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    videoElement.addEventListener("canplay", handleCanPlay)

    // Set initial time when video loads
    if (videoElement.readyState >= 1) {
      videoElement.currentTime = SKIP_START
      updateVideoOpacity()
      videoElement.play().catch(() => {
        // Ignore autoplay errors
      })
    }

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      videoElement.removeEventListener("canplay", handleCanPlay)
    }
  }, [shouldPlayVideo, video])

  const handleMouseEnter = () => {
    if (video && isDesktop) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (video && isDesktop) {
      setIsHovered(false)
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      setVideoOpacity(0)
    }
  }

  // Handle video pause when scrolling out of view on mobile
  useEffect(() => {
    if (isDesktop || !video) return
    
    if (!isInView && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setVideoOpacity(0)
    }
  }, [isInView, isDesktop, video])

  return (
    <Card 
      ref={cardRef}
      className="group bg-card rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full pt-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
        {video && shouldPlayVideo ? (
          <video
            ref={videoRef}
            src={video}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              opacity: videoOpacity,
              transition: `opacity ${FADE_IN_DURATION}s linear`,
            }}
            muted
            playsInline
            loop={false}
          />
        ) : (
          <Image
            src={image || "/coming-soon.svg"}
            alt={image ? `Screenshot of ${title} project` : "Coming Soon"}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <CardContent className="pt-3 px-6 pb-6">
        {date && (
          <p className="text-sm text-muted-foreground mb-3">
            {date}
          </p>
        )}
        <h4 className="text-xl font-semibold text-primary mb-3">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h4>
        <p className="text-base text-secondary leading-relaxed mb-4">{description}</p>

        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Key Learnings</p>
          <ul className="list-disc list-inside space-y-1">
            {learnings.map((learning) => (
              <li key={learning} className="text-sm text-secondary">
                {learning}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => {
            const isP5js = tech === "p5.js"
            return (
              <span key={tech} className="px-3 py-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 text-xs font-medium rounded-full">
                {isP5js ? (
                  <a
                    href="https://p5js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-700 dark:text-yellow-300 hover:underline"
                  >
                    {tech}
                  </a>
                ) : (
                  tech
                )}
              </span>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
