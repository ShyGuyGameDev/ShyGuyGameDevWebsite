/**
 * ProjectCard: one single card on the Projects page - the screenshot, the date and tag row, the
 * linked title, the description paragraph, and the "Key Learnings" bullet list.
 *
 * Where you see it on the site: inside every grid rendered by `ExpandableCardRows`, which is what
 * `projects-section.tsx` uses under each heading ("Featured Currently", "Games", "MUN", ...).
 *
 * Key ideas a learner should notice in this file:
 *  - A CONTROLLED / UNCONTROLLED component. If the parent passes `expanded` and `onToggleExpanded`,
 *    the parent owns the open/closed state ("controlled"). If it does not, the card falls back to
 *    its own `useState` ("uncontrolled"). The `??` operator is what picks between them.
 *  - Conditional CSS classes with `cn(...)`: collapsed cards get `line-clamp-3` and `truncate` so
 *    long text is cut off; expanded cards drop those classes and show everything.
 *  - Next.js's `<Image>` component, which optimises images automatically and needs either explicit
 *    dimensions or - as here - `fill` plus a positioned parent.
 *  - Lots of commented-out code from an earlier version that played a hover video. It is kept for
 *    reference; nothing in it runs.
 */

// Marks this as a Client Component - required because it uses `useState` and an `onClick` handler,
// neither of which exists on the server. See the same note in expandable-card-rows.tsx.
"use client"

// Next.js's optimised image component: it resizes, lazy-loads and serves modern formats for you.
import Image from "next/image"
// Small presentational wrappers (a rounded, shadowed box and its padded body) from the UI kit.
import { Card, CardContent } from "@/components/ui/card"
// `cn` merges Tailwind class names and resolves conflicts; `getTagColorClasses` maps a tag such as
// "Games" or "MUN" to its pill colours. Both live in src/lib/utils.ts.
import { cn, getTagColorClasses } from "@/lib/utils"
// A type-only import, used purely for `React.ReactNode` in the props below. `import type` disappears
// completely once the code is compiled to JavaScript.
import type React from "react"
import { useState } from "react"
// import { useRef, useEffect } from "react"

// An `interface` describes the shape of the props this component accepts. TypeScript checks every
// use site against it, so a typo like `titel={...}` becomes an error instead of a silent bug.
interface ProjectCardProps {
  title: string
  // Either plain text or real JSX - the project descriptions contain <a> links, so they are JSX.
  description: string | React.ReactNode
  // The "Key Learnings" bullets.
  learnings: string[]
  // `?` means optional; a card with no screenshot falls back to a "coming soon" placeholder.
  image?: string
  // video?: string
  // If present, the screenshot and the title become links to the live project.
  url?: string
  date?: string
  tag?: string
  // Extra Tailwind classes the parent can pass in to tweak this one card.
  className?: string
  // The controlled open/closed flag, supplied by ExpandableCardRows.
  expanded?: boolean
  // The matching callback that asks the parent to flip that flag.
  onToggleExpanded?: () => void
}

// The props are destructured in the parameter list. Note `expanded: expandedProp` - that is
// RENAMING while destructuring, so the raw prop does not clash with the computed `expanded` below.
export function ProjectCard({ title, description, learnings, image, /* video, */ url, date, tag, className, expanded: expandedProp, onToggleExpanded }: ProjectCardProps) {
  // The fallback state, used only when no parent is controlling this card.
  const [internalExpanded, setInternalExpanded] = useState(false)
  // `??` is the nullish-coalescing operator: use `expandedProp` unless it is null/undefined, in
  // which case fall back to the internal state. (Unlike `||`, it does NOT treat `false` as missing,
  // which matters here because `false` is a perfectly valid "collapsed" value.)
  const expanded = expandedProp ?? internalExpanded
  const toggleExpanded = () => {
    // Controlled mode: let the parent decide what happens, then stop.
    if (onToggleExpanded) {
      onToggleExpanded()
      return
    }
    // Uncontrolled mode: flip our own state. The updater function form receives the latest value.
    setInternalExpanded((current) => !current)
  }
  // ---------------------------------------------------------------------------------------------
  // Everything from here to the `return` is DISABLED code from an older version of the card, kept
  // around in case the hover-video feature comes back. None of it runs. If you ever revive it, the
  // ideas worth studying are: feature-detecting a desktop browser with `window.matchMedia`, using
  // an IntersectionObserver to autoplay only while the card is on screen, and fading the video in
  // and out by watching `timeupdate` events. Leave it exactly as it is unless you are reviving it.
  // ---------------------------------------------------------------------------------------------
  // const [isHovered, setIsHovered] = useState(false)
  // const [isDesktop, setIsDesktop] = useState(false)
  // const [isInView, setIsInView] = useState(false)
  // const videoRef = useRef<HTMLVideoElement>(null)
  // const cardRef = useRef<HTMLDivElement>(null)
  // const SKIP_START = 1.5 // seconds to skip at start
  // const SKIP_END = 1.5 // seconds to skip at end
  // const FADE_IN_DURATION = 0.25 // seconds for initial fade in (faster)
  // const CROSSFADE_DURATION = 0.6 // seconds for fade out transition (matches hero section)
  // const [videoOpacity, setVideoOpacity] = useState(0)

  // // Detect if device is desktop (not touch device and has hover capability)
  // useEffect(() => {
  //   const checkIsDesktop = () => {
  //     const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  //     const hasHover = window.matchMedia('(hover: hover)').matches
  //     const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches
  //     setIsDesktop(!hasTouch && hasHover && isLargeScreen)
  //   }

  //   checkIsDesktop()
  //   window.addEventListener('resize', checkIsDesktop)
  //   return () => window.removeEventListener('resize', checkIsDesktop)
  // }, [])

  // // Intersection Observer for mobile autoplay
  // useEffect(() => {
  //   if (isDesktop || !video) return

  //   const cardElement = cardRef.current
  //   if (!cardElement) return

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         setIsInView(entry.isIntersecting)
  //       })
  //     },
  //     { threshold: 0.5 } // Play when 50% of card is visible
  //   )

  //   observer.observe(cardElement)
  //   return () => observer.disconnect()
  // }, [isDesktop, video])

  // // Determine if video should play (desktop hover OR mobile in view)
  // const shouldPlayVideo = (isDesktop && isHovered) || (!isDesktop && isInView)

  // useEffect(() => {
  //   const videoElement = videoRef.current
  //   if (!videoElement || !video || !shouldPlayVideo) return
  //   setVideoOpacity(0)

  //   const updateVideoOpacity = () => {
  //     if (!videoElement.duration) {
  //       setVideoOpacity(0)
  //       return
  //     }

  //     const playableStart = SKIP_START
  //     const playableEnd = videoElement.duration - SKIP_END

  //     // If playable segment is too short, keep visible
  //     if (playableEnd - playableStart <= FADE_IN_DURATION + CROSSFADE_DURATION) {
  //       setVideoOpacity(1)
  //       return
  //     }

  //     const fadeInEnd = playableStart + FADE_IN_DURATION
  //     const fadeOutStart = playableEnd - CROSSFADE_DURATION
  //     const current = videoElement.currentTime

  //     let nextOpacity = 1

  //     if (current < playableStart) {
  //       nextOpacity = 0
  //     } else if (current <= fadeInEnd) {
  //       nextOpacity = Math.min(1, Math.max(0, (current - playableStart) / FADE_IN_DURATION))
  //     } else if (current >= fadeOutStart) {
  //       nextOpacity = Math.min(1, Math.max(0, (playableEnd - current) / CROSSFADE_DURATION))
  //     } else {
  //       nextOpacity = 1
  //     }

  //     setVideoOpacity((prev) => (Math.abs(prev - nextOpacity) > 0.01 ? nextOpacity : prev))
  //   }

  //   const handleTimeUpdate = () => {
  //     if (videoElement.duration) {
  //       const maxTime = videoElement.duration - SKIP_END
  //       if (videoElement.currentTime >= maxTime) {
  //         videoElement.currentTime = SKIP_START
  //       }
  //     }
  //     updateVideoOpacity()
  //   }

  //   const handleLoadedMetadata = () => {
  //     videoElement.currentTime = SKIP_START
  //     updateVideoOpacity()
  //     videoElement.play().catch(() => {
  //       // Ignore autoplay errors
  //     })
  //   }

  //   const handleCanPlay = () => {
  //     if (videoElement.currentTime < SKIP_START && videoElement.duration > SKIP_START + SKIP_END) {
  //       videoElement.currentTime = SKIP_START
  //     }
  //     updateVideoOpacity()
  //   }

  //   videoElement.addEventListener("timeupdate", handleTimeUpdate)
  //   videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
  //   videoElement.addEventListener("canplay", handleCanPlay)

  //   // Set initial time when video loads
  //   if (videoElement.readyState >= 1) {
  //     videoElement.currentTime = SKIP_START
  //     updateVideoOpacity()
  //     videoElement.play().catch(() => {
  //       // Ignore autoplay errors
  //     })
  //   }

  //   return () => {
  //     videoElement.removeEventListener("timeupdate", handleTimeUpdate)
  //     videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
  //     videoElement.removeEventListener("canplay", handleCanPlay)
  //   }
  // }, [shouldPlayVideo, video])

  // const handleMouseEnter = () => {
  //   if (video && isDesktop) {
  //     setIsHovered(true)
  //   }
  // }

  // const handleMouseLeave = () => {
  //   if (video && isDesktop) {
  //     setIsHovered(false)
  //     if (videoRef.current) {
  //       videoRef.current.pause()
  //       videoRef.current.currentTime = 0
  //     }
  //     setVideoOpacity(0)
  //   }
  // }

  // // Handle video pause when scrolling out of view on mobile
  // useEffect(() => {
  //   if (isDesktop || !video) return

  //   if (!isInView && videoRef.current) {
  //     videoRef.current.pause()
  //     videoRef.current.currentTime = 0
  //     setVideoOpacity(0)
  //   }
  // }, [isInView, isDesktop, video])

  return (
    // The card shell. Notes on the classes:
    //   group          - lets child elements react to hovering the CARD (see `group-hover:` below)
    //   h-full w-full  - fill the measured slot that ExpandableCardRows created
    //   cursor-pointer - hints that the whole card is clickable
    //   overflow-hidden - keeps the zooming screenshot inside the rounded corners
    // `cn(...)` merges these defaults with any `className` the parent passed.
    <Card 
      className={cn(
        "group bg-card rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden pt-0 min-w-0 cursor-pointer h-full w-full gap-0",
        className,
      )}
      onClick={(event) => {
        // `event.target` is the exact element that was clicked, which may be deep inside the card.
        const target = event.target
        // `closest("a")` walks up from that element looking for an enclosing link. If the user
        // clicked the title or a link in the description, let the browser follow the link and do
        // NOT also expand the card - otherwise every link click would toggle the layout too.
        if (target instanceof Element && target.closest("a")) return
        // Any other click anywhere on the card opens or closes it.
        toggleExpanded()
      }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      {/* The image frame. `relative` is required so the `fill` image below can position itself
          against this box; `aspect-[16/10]` reserves a fixed shape so the card does not jump
          around while the screenshot loads. */}
      <div className="relative w-full overflow-hidden rounded-t-2xl aspect-[16/10]">
        {/* {video && shouldPlayVideo ? (
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
        ) : ( */}
        {/* Two nearly identical branches: with a `url` the screenshot is wrapped in a link, without
            one it is shown plain. `cond ? a : b` is the ternary operator, the usual way to choose
            between two pieces of JSX, because a full `if` statement is not allowed inside JSX. */}
        {/* `target="_blank"` opens the project in a new tab; `rel="noopener noreferrer"` is the
            security habit that stops the new page from getting a handle on this one.
            `absolute inset-0` stretches the link over the whole image frame. */}
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="block absolute inset-0">
            {/* `src` falls back to a placeholder when the project has no screenshot yet.
                `alt` is the text screen readers announce, so it changes to match.
                `fill` makes the image expand to its positioned parent instead of needing width and
                height numbers. `group-hover:scale-105` zooms it slightly when the CARD is hovered,
                and `loading="lazy"` defers downloading it until it is near the viewport. */}
            <Image
              src={image || "/coming-soon.svg"}
              alt={image ? `Screenshot of ${title} project` : "Coming Soon"}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </a>
        ) : (
          // No link, so the same image is rendered on its own.
          <Image
            src={image || "/coming-soon.svg"}
            alt={image ? `Screenshot of ${title} project` : "Coming Soon"}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {/* )} */}
      </div>
      {/* The text half of the card. `flex-1 flex flex-col` makes it take up the remaining height
          and stack its children vertically. */}
      <CardContent className="pt-2 px-3 pb-3 flex-1 flex flex-col">
        {/* `condition && <jsx/>` renders the JSX only when the condition is true; when it is false
            React renders nothing. So this whole date/tag row disappears if neither exists. */}
        {(date || tag) && (
          // `justify-between` pushes the date to the left edge and the tag pill to the right.
          <div className="flex items-center justify-between gap-2 mb-2">
            {/* `truncate` clips overflowing text to one line with an ellipsis, but only while the
                card is collapsed - expanding it drops the class and shows everything. */}
            <p className={cn("text-xs text-muted-foreground", !expanded && "truncate")}>{date}</p>
            {tag && (
              // The coloured tag pill. `shrink-0` stops flexbox from squashing it, and
              // `getTagColorClasses(tag)` supplies the per-topic colours (Games purple, MUN
              // fuchsia, and so on) defined in src/lib/utils.ts.
              <span
                className={cn(
                  'shrink-0 px-2 py-0.5 text-xs font-medium rounded-full',
                  getTagColorClasses(tag),
                )}
              >
                {tag}
              </span>
            )}
          </div>
        )}
        {/* The project title. It is an <h4> because the page already uses <h1> and <h2> higher up;
            keeping heading levels in order matters for screen readers. */}
        <h4 className="text-base font-semibold text-primary mb-2 leading-snug">
          {/* Linked when there is a url, plain text otherwise. */}
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
        {/* The description, which is usually a JSX fragment of prose plus links. `line-clamp-3`
            limits it to three lines while collapsed; that is exactly what expanding releases. */}
        <p className={cn("text-sm text-secondary leading-relaxed mb-3", !expanded && "line-clamp-3")}>{description}</p>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Key Learnings</p>
          {/* `list-disc list-inside` draws the bullet points inside the list box. */}
          <ul className="list-disc list-inside space-y-0.5">
            {/* Render one <li> per learning string. */}
            {learnings.map((learning) => (
              // The learning text doubles as the React `key`, which works because the strings
              // within a single project are unique. Each bullet is also truncated while collapsed.
              <li key={learning} className={cn("text-xs text-secondary", !expanded && "truncate")}>
                {learning}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
