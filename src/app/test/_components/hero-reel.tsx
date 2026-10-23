"use client"

import { useEffect, useRef } from "react"

type Clip = { src: string; poster: string; label: string }

/**
 * The first screen: the sentence holds its two halves at the edges while a strip of footage
 * passes through the frame between them as the page scrolls. The reel's transform is written
 * straight to the element on each animation frame, so scrolling never re-renders React.
 */
export function HeroReel({ clips, lead, children }: { clips: Clip[]; lead: string; children: React.ReactNode }) {
  const rootRef = useRef<HTMLElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const reel = reelRef.current
    if (!root || !reel) return

    const wide = matchMedia("(min-width: 1024px)")
    const still = matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const update = () => {
      frame = 0
      if (!wide.matches || still.matches) {
        reel.style.transform = ""
        return
      }
      const frames = reel.children
      if (frames.length < 2) return
      const step = (frames[1] as HTMLElement).offsetTop - (frames[0] as HTMLElement).offsetTop
      const travel = root.offsetHeight - window.innerHeight
      const progress = travel > 0 ? Math.min(Math.max(-root.getBoundingClientRect().top / travel, 0), 1) : 0
      reel.style.transform = `translate3d(0, ${-progress * (frames.length - 1) * step}px, 0)`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    wide.addEventListener("change", schedule)
    still.addEventListener("change", schedule)

    const videos = Array.from(reel.querySelectorAll("video"))
    const playing = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting && !still.matches) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        }
      },
      { threshold: 0.6 },
    )
    videos.forEach((v) => playing.observe(v))

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      wide.removeEventListener("change", schedule)
      still.removeEventListener("change", schedule)
      playing.disconnect()
    }
  }, [])

  return (
    <section ref={rootRef} className="hero" aria-labelledby="hero-title" style={{ "--n": clips.length } as React.CSSProperties}>
      <div className="hero__stage">
        {children}
        <div ref={reelRef} className="hero__reel">
          {clips.map((clip, i) => (
            <div key={clip.src} className="hero__frame frame">
              <video
                src={clip.src}
                poster={clip.poster}
                muted
                loop
                playsInline
                preload={i === 0 ? "metadata" : "none"}
                aria-label={clip.label}
              />
            </div>
          ))}
        </div>
        <div className="hero__foot">
          <p className="hero__lead" data-load style={{ "--d": "420ms" } as React.CSSProperties}>
            {lead}
          </p>
        </div>
      </div>
    </section>
  )
}
