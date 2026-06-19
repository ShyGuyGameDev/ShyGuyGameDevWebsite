"use client"

import { ElementType, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v18" />
      <path d="m19 14-7 7-7-7" />
    </svg>
  )
}

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type TypewriterElement = ElementType

const HERO_HEADLINE = "Meet ShyGuy"
const HERO_DESCRIPTION =
  "Student developer building games, apps, and robotics, speaking at debate tournaments, leading model United Nations conferences, teaching other students, and building his own startup."

const HERO_BUTTON_TEXT = "LEARN MORE"

const HERO_TITLE_SPEED = 55
const HERO_TITLE_DELAY = 250

function useTypewriter(text: string, speed = 16, startDelay = 0) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    const effectiveSpeed = Math.max(speed, 4)
    const effectiveDelay = Math.max(startDelay, 0)
    setDisplayed("")

    let intervalId: ReturnType<typeof setInterval> | undefined
    const delayId = setTimeout(() => {
      let index = 0
      intervalId = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId)
        }
      }, effectiveSpeed)
    }, effectiveDelay)

    return () => {
      if (intervalId) clearInterval(intervalId)
      clearTimeout(delayId)
    }
  }, [text, speed, startDelay])

  return displayed
}

function Typewriter({
  text,
  speed,
  startDelay,
  className,
  as,
  showCursor = true,
  style,
}: {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  as?: TypewriterElement
  showCursor?: boolean
  style?: React.CSSProperties
}) {
  const Component: TypewriterElement = as ?? "span"
  const typedText = useTypewriter(text, speed, startDelay)
  const isComplete = typedText.length === text.length

  return (
    <Component className={className} style={style} aria-label={text}>
      {typedText}
      {showCursor && (
        <span
          className={`typewriter-caret${isComplete ? " typewriter-caret-done" : ""}`}
          aria-hidden
        />
      )}
    </Component>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [videoList, setVideoList] = useState<string[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const router = useRouter()
  // Fetch video list from API (automatically detects all videos in /public/Clips)
  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       const response = await fetch("/api/videos")
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch videos")
  //       }
  //       const data = await response.json()
  //       if (data.videos && data.videos.length > 0) {
  //         const shuffled = shuffleArray(data.videos as string[])
  //         setVideoList(shuffled)
  //         console.log("Videos loaded:", shuffled)
  //       } else {
  //         console.warn("No videos found in API response")
  //         useFallbackVideos()
  //       }
  //     } catch (error) {
  //       console.error("Error fetching videos:", error)
  //       useFallbackVideos()
  //     }
  //   }
  //
  //   const useFallbackVideos = () => {
  //     const fallbackVideos = [
  //       "/Clips/OpenStage.mp4",
  //       "/Clips/SpaceLooper.mp4",
  //       "/Clips/BuggedOut.mp4",
  //       "/Clips/MaliceAndMercy.mp4",
  //     ]
  //     const shuffled = shuffleArray(fallbackVideos)
  //     setVideoList(shuffled)
  //     console.log("Using fallback videos:", shuffled)
  //   }
  //
  //   fetchVideos()
  // }, [])

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = rect.height
      const scrollFromTop = -rect.top
      
      // Calculate progress: 0 at top, 1 when bottom of section is at top of viewport
      const progress = Math.max(0, Math.min(1, scrollFromTop / sectionHeight))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

  const handleScrollToProjects = () => {
    const divider = document.getElementById("hero-divider")
    if (!divider) return

    const header = document.querySelector("header")
    const headerHeight = header?.getBoundingClientRect().height ?? 0
    const dividerTop = divider.getBoundingClientRect().top + window.scrollY
    const target = dividerTop - headerHeight

    window.scrollTo({ top: target, behavior: "smooth" })
  }

  const handleVideoHover = (e: React.MouseEvent<HTMLDivElement>, isHovering: boolean) => {
    if (isHovering) {
      e.currentTarget.classList.add("hovered")
    } else {
      e.currentTarget.classList.remove("hovered")
    }
  }

  const handleVideoClick = () => {
    router.push("/projects")
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .typewriter-caret {
          display: inline-block;
          width: 0.18em;
          margin-left: 0.08em;
          border-left: 2px solid currentColor;
          animation: typewriter-caret-blink 1s steps(1) infinite;
        }
        .typewriter-caret-done {
          opacity: 0;
          animation: none;
        }
        @keyframes typewriter-caret-blink {
          50% { opacity: 0; }
        }

        .hero-placeholders {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero-placeholder {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 110px;
          height: 110px;
          border-radius: 18px;
          background: rgba(0, 0, 0, 0.04);
          border: 2px dashed rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0, 0, 0, 0.35);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transform-origin: center center;
          filter: grayscale(100%);
        }

        .hero-placeholder-image {
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          width: 150px;
          height: 150px;
        }

        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1200px;
        }

        .videos-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        }

        .video-box {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 300px;
          height: 225px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transform-origin: center center;
          transform-box: fill-box;
          transition: filter 0.3s ease-out, box-shadow 0.3s ease-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          pointer-events: auto;
          will-change: transform;
          touch-action: auto;
        }

        .video-box:hover {
          filter: brightness(1.1);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
        }

        .video-box.hovered {
          --hover-scale: 1.15;
        }

        .video-box:nth-child(1).hovered {
          transform: translate(calc(-50% - 400px - var(--spread-offset)), calc(-50% - 250px - var(--vertical-offset))) rotate(-15deg) scale(calc(var(--scale) * var(--hover-scale, 1)));
        }

        .video-box:nth-child(2).hovered {
          transform: translate(calc(-50% + 400px + var(--spread-offset)), calc(-50% - 250px - var(--vertical-offset))) rotate(15deg) scale(calc(var(--scale) * var(--hover-scale, 1)));
        }

        .video-box:nth-child(3).hovered {
          transform: translate(calc(-50% - 450px - var(--spread-offset) * 1.6), calc(-50% + 200px + var(--vertical-offset))) rotate(-20deg) scale(calc(var(--scale) * 1.12 * var(--hover-scale, 1)));
        }

        .video-box:nth-child(4).hovered {
          transform: translate(calc(-50% + 450px + var(--spread-offset) * 1.6), calc(-50% + 200px + var(--vertical-offset))) rotate(20deg) scale(calc(var(--scale) * 1.12 * var(--hover-scale, 1)));
        }

        .video-box video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-box:nth-child(1) {
          transform: translate(calc(-50% - 400px - var(--spread-offset)), calc(-50% - 250px - var(--vertical-offset))) rotate(-15deg) scale(var(--scale));
        }

        .video-box:nth-child(2) {
          transform: translate(calc(-50% + 400px + var(--spread-offset)), calc(-50% - 250px - var(--vertical-offset))) rotate(15deg) scale(var(--scale));
        }

        .video-box:nth-child(3) {
          transform: translate(calc(-50% - 450px - var(--spread-offset) * 1.6), calc(-50% + 200px + var(--vertical-offset))) rotate(-20deg) scale(calc(var(--scale) * 1.12));
        }

        .video-box:nth-child(4) {
          transform: translate(calc(-50% + 450px + var(--spread-offset) * 1.6), calc(-50% + 200px + var(--vertical-offset))) rotate(20deg) scale(calc(var(--scale) * 1.12));
        }

        @media (max-width: 768px) {
          .video-box {
            width: 200px;
            height: 150px;
          }

          .video-box:nth-child(1) {
            transform: translate(calc(-50% - 260px - var(--spread-offset)), calc(-50% - 160px - var(--vertical-offset))) rotate(-15deg) scale(var(--scale));
          }

          .video-box:nth-child(2) {
            transform: translate(calc(-50% + 260px + var(--spread-offset)), calc(-50% - 160px - var(--vertical-offset))) rotate(15deg) scale(var(--scale));
          }

          .video-box:nth-child(3) {
            transform: translate(calc(-50% - 280px - var(--spread-offset) * 1.6), calc(-50% + 130px + var(--vertical-offset))) rotate(-20deg) scale(calc(var(--scale) * 1.12));
          }

          .video-box:nth-child(4) {
            transform: translate(calc(-50% + 280px + var(--spread-offset) * 1.6), calc(-50% + 130px + var(--vertical-offset))) rotate(20deg) scale(calc(var(--scale) * 1.12));
          }
        }
      `}} />
      <section
        id="home"
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center pt-[144px] pb-[72px] overflow-hidden"
        style={{ background: 'transparent' }}
      >
        {/* Abstract gradient background overlay */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        {/* Video boxes container */}
        {/* <div className="absolute inset-0 hidden md:block" style={{ zIndex: 2 }}>
          <div className="video-container h-full">
            <div className="videos-orbit">
              {videoList.map((video, index) => (
                <div
                  key={`${video}-${index}`}
                  className="video-box"
                  onMouseEnter={(e) => handleVideoHover(e, true)}
                  onMouseLeave={(e) => handleVideoHover(e, false)}
                  onClick={handleVideoClick}
                  style={{
                    '--spread-offset': `${scrollProgress * 250}px`,
                    '--vertical-offset': `${scrollProgress * 150}px`,
                    '--scale': `${1 + scrollProgress * 0.25}`,
                  } as React.CSSProperties}
                >
                  <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Image placeholders framing the hero content (arc pattern, 3 per side) */}
        <div className="hero-placeholders hidden lg:block" style={{ zIndex: 5 }}>
          {[
            { transform: "translate(calc(-50% - min(12.5vw + 295px, 50vw - 85px)), calc(-50% - 250px)) rotate(-6deg)", label: "Image 1", src: "/HomeIcons/Gaming.png" },
            { transform: "translate(calc(-50% - min(12.5vw + 415px, 50vw - 70px)), -50%) rotate(-6deg)", label: "Image 2", src: "/HomeIcons/Robot-removebg-preview.png" },
            { transform: "translate(calc(-50% - min(12.5vw + 295px, 50vw - 85px)), calc(-50% + 250px)) rotate(-6deg)", label: "Image 3", src: "/HomeIcons/debate.png" },
            { transform: "translate(calc(-50% + min(12.5vw + 295px, 50vw - 85px)), calc(-50% - 250px)) rotate(6deg)", label: "Image 4", src: "/HomeIcons/Apps-removebg-preview.png", size: 160 },
            { transform: "translate(calc(-50% + min(12.5vw + 415px, 50vw - 70px)), -50%) rotate(6deg)", label: "Image 5", src: "/HomeIcons/UnitedNations.png", size: 207 },
            { transform: "translate(calc(-50% + min(12.5vw + 295px, 50vw - 85px)), calc(-50% + 250px)) rotate(6deg)", label: "Image 6", src: "/HomeIcons/teaching.png" },
          ].map((item) => (
            <div
              key={item.label}
              className={item.src ? "hero-placeholder hero-placeholder-image" : "hero-placeholder"}
              style={{
                transform: item.transform,
                ...(item.size ? { width: item.size, height: item.size } : {}),
              }}
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-contain"
                />
              ) : (
                item.label
              )}
            </div>
          ))}
        </div>

        <div className="max-w-[1100px] mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 10 }}>
          <h1
            className="animate-on-scroll max-w-3xl mx-auto mb-8 hero-text hero-text-h1"
            style={{ pointerEvents: 'none' }}
          >
            <Typewriter
              as="span"
              className="block text-5xl md:text-6xl lg:text-[48px] font-semibold mb-4 text-balance"
              text={HERO_HEADLINE}
              speed={HERO_TITLE_SPEED}
              startDelay={HERO_TITLE_DELAY}
            />
            <span className="block text-lg md:text-xl leading-relaxed text-pretty hero-text-p">
              {HERO_DESCRIPTION}
            </span>
          </h1>

          <div className="animate-on-scroll animate-delay-300">
            <Button
              onClick={handleScrollToProjects}
              className="bg-accent hover:bg-accent/95 active:bg-accent/92 text-accent-foreground font-medium uppercase tracking-wide px-10 py-7 text-base rounded-2xl shadow-lg hover:shadow-2xl active:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform inline-flex items-center gap-3"
            >
              <ArrowDown className="size-5 shrink-0" />
              <span className="inline-block">{HERO_BUTTON_TEXT}</span>
              <ArrowDown className="size-5 shrink-0" />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}