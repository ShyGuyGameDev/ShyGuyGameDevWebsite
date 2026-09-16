/**
 * HeroSection — the big "above the fold" banner at the very top of the home page ("/").
 *
 * What it renders, top to bottom:
 *  - an injected <style> block holding the CSS for the blinking typewriter caret and the
 *    floating topic icons (and the CSS for the currently disabled video-orbit feature),
 *  - three huge blurred circles that act as a soft gradient background,
 *  - six topic icons from /HomeIcons/*.png (games, robotics, debate, apps, mun, teaching)
 *    positioned in an arc, three on each side of the text,
 *  - the headline "Meet ShyGuy" typed out one character at a time, a paragraph about the
 *    site owner, and a "See My Work" button that routes to /projects.
 *
 * Concepts a learner should notice in this file:
 *  - the "use client" directive, which opts this component out of server-only rendering,
 *  - useState (remembering values between renders), useEffect (running side effects such as
 *    timers and event listeners) and useRef (holding a reference to a real DOM node),
 *  - a custom hook, useTypewriter, that shows how hooks are just functions calling other hooks,
 *  - IntersectionObserver for animating elements as they scroll into view,
 *  - a passive scroll listener, so scrolling stays smooth,
 *  - generics (shuffleArray<T>) and the polymorphic `as` prop built on React's ElementType,
 *  - dangerouslySetInnerHTML used to inject plain CSS, plus CSS custom properties (--scale etc.)
 *    so JavaScript can feed numbers into CSS animations without rewriting whole transforms.
 */

// "use client" marks this file as a Client Component. Next.js renders components on the server by
// default, but anything using state, effects, refs or browser APIs (window, IntersectionObserver)
// must run in the browser, so it needs this directive on the very first line.
"use client"

// ElementType is a *type* (not a value): it describes "any valid React element type", such as the
// string "h1" or a component function. The rest are React's built-in hooks.
import { ElementType, useEffect, useRef, useState } from "react"
// useRouter gives programmatic navigation (router.push) from the Next.js App Router.
import { useRouter } from "next/navigation"
// The project's shared button component, so every button looks and behaves the same.
import { Button } from "@/components/ui/button"

// Shuffle array function
// <T> makes this function generic: T stands in for whatever element type the caller passes.
// Give it string[] and you get string[] back; give it number[] and you get number[] back. That is
// stricter and more useful than typing the parameter as any[], which would lose the element type.
function shuffleArray<T>(array: T[]): T[] {
  // Copy the array with the spread operator first, so the caller's array is never mutated.
  const shuffled = [...array]
  // Fisher-Yates shuffle: walk backwards and swap each item with a random earlier (or same) item.
  for (let i = shuffled.length - 1; i > 0; i--) {
    // A random index from 0 up to and including i.
    const j = Math.floor(Math.random() * (i + 1))
    // Swap the two items using array destructuring. The leading semicolon protects the line: without
    // it, JavaScript would read the previous line and this `[` as an index lookup instead.
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// A type alias, purely for readability: the `as` prop below accepts any element type, e.g. "span",
// "h1", or a component. Naming it makes the Typewriter props easier to read.
type TypewriterElement = ElementType

// The hero copy lives in constants at the top of the file instead of being buried in the JSX, so the
// wording is easy to find and change in one place.
const HERO_HEADLINE = "Meet ShyGuy"
const HERO_DESCRIPTION =
  "He is a student developer building games, apps, and robots; speaking at debate tournaments; leading model United Nations conferences; teaching other students; and building his own startup."

const HERO_BUTTON_TEXT = "See My Work"

// Tuning numbers for the typewriter: 55 milliseconds between characters, and a 250 ms pause before
// typing starts so the page has settled before the animation begins.
const HERO_TITLE_SPEED = 55
const HERO_TITLE_DELAY = 250

// A *custom hook*: any function whose name starts with "use" and which calls other hooks. It lets you
// package stateful behaviour so components can reuse it. This one takes the full text and returns
// however much of it should be visible right now, growing one character at a time.
// `speed = 16` and `startDelay = 0` are default parameter values used when the caller omits them.
function useTypewriter(text: string, speed = 16, startDelay = 0) {
  // useState returns a pair: the current value, and a setter that re-renders the component with a new
  // value. Every time setDisplayed runs, React renders again and shows one more character.
  const [displayed, setDisplayed] = useState("")

  // useEffect runs code *after* rendering, for things that reach outside React: timers, listeners,
  // network calls. Timers are exactly this kind of "side effect".
  useEffect(() => {
    // Guard against silly inputs: never type faster than one character per 4 ms, and never a negative
    // delay. Math.max is a compact way to enforce a floor.
    const effectiveSpeed = Math.max(speed, 4)
    const effectiveDelay = Math.max(startDelay, 0)
    // Restart from an empty string whenever the effect (re)runs, e.g. if the text prop changes.
    setDisplayed("")

    // Declared with `let` outside the timeout because the cleanup function below needs to reach it.
    // ReturnType<typeof setInterval> is a portable way to say "whatever setInterval hands back",
    // which is a number in browsers but a Timeout object in Node.
    let intervalId: ReturnType<typeof setInterval> | undefined
    // setTimeout waits once, for the start delay, before any typing happens.
    const delayId = setTimeout(() => {
      // How many characters are currently revealed.
      let index = 0
      // setInterval then repeats forever, every `effectiveSpeed` ms, until something clears it.
      intervalId = setInterval(() => {
        index += 1
        // slice(0, index) is the trick that makes the typing effect: take the first `index`
        // characters of the finished string rather than concatenating characters by hand.
        setDisplayed(text.slice(0, index))
        // Once the whole string is shown, stop the repeating timer so it does not keep firing.
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId)
        }
      }, effectiveSpeed)
    }, effectiveDelay)

    // The function an effect returns is its *cleanup*. React runs it before re-running the effect and
    // when the component unmounts (leaves the screen). Without it, a timer would keep ticking and try
    // to update state on a component that no longer exists — a classic memory leak.
    return () => {
      if (intervalId) clearInterval(intervalId)
      clearTimeout(delayId)
    }
    // The dependency array tells React which values the effect depends on. The effect re-runs only
    // when one of these changes. An empty array would mean "run once"; leaving it out entirely would
    // re-run the effect after every single render, restarting the animation endlessly.
  }, [text, speed, startDelay])

  // A hook returns plain values, just like any other function. The component using it re-renders
  // whenever the internal state changes.
  return displayed
}

// A small presentational component that wraps the hook above. The props are destructured right in the
// parameter list, so `text` below means `props.text`.
function Typewriter({
  text,
  speed,
  startDelay,
  className,
  as,
  showCursor = true,
  style,
}: {
  // This object literal after the colon is the props *type*. A `?` means the prop is optional.
  text: string
  speed?: number
  startDelay?: number
  className?: string
  // The polymorphic "as" prop: the caller decides which HTML tag or component gets rendered, so this
  // one component can be a <span> here and an <h2> somewhere else without duplicating any logic.
  as?: TypewriterElement
  showCursor?: boolean
  style?: React.CSSProperties
}) {
  // `??` is the nullish coalescing operator: use `as` unless it is null/undefined, then fall back to
  // "span". The variable is capitalised deliberately — JSX treats lowercase names as literal HTML
  // tags and capitalised names as components/variables, so `<Component>` reads the variable.
  const Component: TypewriterElement = as ?? "span"
  // Call the custom hook to get the partially typed string for this render.
  const typedText = useTypewriter(text, speed, startDelay)
  // Once the typed text is as long as the target text, the animation has finished.
  const isComplete = typedText.length === text.length

  return (
    // aria-label carries the complete text, so a screen reader announces the whole headline at once
    // instead of reading a half-typed string.
    <Component className={className} style={style} aria-label={text}>
      {/* Curly braces switch from JSX markup into a JavaScript expression. */}
      {typedText}
      {/* `condition && <jsx/>` renders the element only when the condition is true; false renders
          nothing. This is the usual way to do "if" inside JSX. */}
      {showCursor && (
        // A template literal builds the class name, appending the "done" class only when typing has
        // finished so the caret stops blinking. aria-hidden keeps this decorative bar out of the
        // accessibility tree, since it carries no meaning for screen-reader users.
        <span
          className={`typewriter-caret${isComplete ? " typewriter-caret-done" : ""}`}
          aria-hidden
        />
      )}
    </Component>
  )
}

// The main exported component. `export` (without `default`) means other files import it by name:
// `import { HeroSection } from "@/components/hero-section"`.
export function HeroSection() {
  // useRef holds a mutable box that survives re-renders. Passing it to an element's `ref` attribute
  // makes React store the real DOM node in `sectionRef.current`, which is how the effects below can
  // measure the section and search inside it. Changing a ref does *not* trigger a re-render, which is
  // the main difference from useState.
  const sectionRef = useRef<HTMLElement>(null)
  // State for the (currently disabled) video orbit: the list of video file paths to show.
  const [videoList, setVideoList] = useState<string[]>([])
  // How far the user has scrolled through this section, as a number from 0 to 1.
  const [scrollProgress, setScrollProgress] = useState(0)
  // The router object used by the button handlers to navigate to /projects.
  const router = useRouter()
  // NOTE: the whole video-orbit feature below is commented out and therefore disabled. It fetched a
  // list of clips from an API route and fell back to a hard-coded list on failure. It is kept here as
  // a reference; leave it untouched unless you are reviving the feature.
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

  // Effect 1: track scroll position and store it as a 0-to-1 progress value.
  useEffect(() => {
    const handleScroll = () => {
      // Read the DOM node out of the ref. It is null before the first render finishes, or if the
      // element is gone, so bail out early rather than crashing.
      const section = sectionRef.current
      if (!section) return

      // getBoundingClientRect measures the element relative to the viewport: rect.top is how far the
      // top of the section is below the top of the window (negative once it scrolls past).
      const rect = section.getBoundingClientRect()
      // Total height of the section, and how many pixels of it have scrolled above the viewport.
      const sectionHeight = rect.height
      const scrollFromTop = -rect.top
      
      // Calculate progress: 0 at top, 1 when bottom of section is at top of viewport
      // Math.min/Math.max together "clamp" the ratio into the 0..1 range, so values never go negative
      // (before the section is reached) or above 1 (after it has fully scrolled past).
      const progress = Math.max(0, Math.min(1, scrollFromTop / sectionHeight))
      // Saving it in state re-renders the component, which feeds the new number into the CSS custom
      // properties on the video boxes below.
      setScrollProgress(progress)
    }

    // { passive: true } promises the browser that this handler never calls preventDefault, so it can
    // keep scrolling smoothly instead of waiting for our JavaScript to finish. Always use it for
    // scroll and touch listeners you only read from.
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Cleanup: remove the listener when the component unmounts. Note the exact same function
    // reference must be passed, which is why handleScroll is a named variable.
    return () => window.removeEventListener('scroll', handleScroll)
    // Empty dependency array = set this up once when the component mounts, never again.
  }, [])

  // Effect 2: reveal elements as they scroll into view.
  useEffect(() => {
    // IntersectionObserver is a browser API that tells you when an element enters or leaves the
    // viewport. It is far cheaper than checking positions on every scroll event.
    const observer = new IntersectionObserver(
      // This callback receives an array of entries, one per watched element whose visibility changed.
      (entries) => {
        entries.forEach((entry) => {
          // isIntersecting is true when the element is currently visible enough.
          if (entry.isIntersecting) {
            // Adding the CSS class starts the fade-in-up animation. Note the class is never removed,
            // so each element animates once and then stays visible.
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      // threshold: 0.1 means "fire once 10% of the element is visible".
      { threshold: 0.1 },
    )

    // `?.` is optional chaining: if sectionRef.current is null, the whole expression is undefined
    // instead of throwing. querySelectorAll finds every element inside the section with this class.
    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    // Ask the observer to watch each one.
    elements?.forEach((el) => observer.observe(el))

    // Cleanup: disconnect stops watching everything at once, so the observer can be garbage collected.
    return () => observer.disconnect()
  }, [])

  // NOTE for the owner: this next effect is an exact duplicate of the one above — same observer, same
  // selector, same class. It means every matching element is observed twice, which is harmless here
  // (adding a class twice does nothing) but is dead code that could safely be deleted.
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

  // Used by the disabled video orbit: toggles a "hovered" class on the box the mouse is over.
  // `e.currentTarget` is the element the handler is attached to (as opposed to e.target, which is
  // whatever was actually under the pointer, possibly a child). Toggling a class instead of setting
  // state keeps the hover purely in CSS, so no re-render is needed.
  const handleVideoHover = (e: React.MouseEvent<HTMLDivElement>, isHovering: boolean) => {
    if (isHovering) {
      e.currentTarget.classList.add("hovered")
    } else {
      e.currentTarget.classList.remove("hovered")
    }
  }

  // Click handler for the "See My Work" button. router.push navigates client-side to /projects:
  // no full page reload, and the URL updates so the back button still works.
  const handleSeeMyWork = () => {
    router.push("/projects")
  }

  // Same destination for a click on one of the (disabled) video boxes.
  const handleVideoClick = () => {
    router.push("/projects")
  }

  return (
    // <> ... </> is a Fragment: a wrapper that groups siblings without adding a real DOM element,
    // needed because a component must return a single root node.
    <>
      {/* dangerouslySetInnerHTML injects raw markup as-is. React normally escapes everything you
          render to prevent injection attacks, so bypassing that escaping is "dangerous" — the name is
          a deliberate warning. It is safe here only because the string is a hard-coded CSS literal
          with no user input in it. This is how the component ships its own CSS instead of using a
          separate stylesheet or Tailwind classes for these animations. */}
      <style dangerouslySetInnerHTML={{__html: `
        /* The blinking bar after the typed text. A narrow inline-block with only a left border, so it
           looks like a text cursor; currentColor makes it match the surrounding text colour. */
        .typewriter-caret {
          display: inline-block;
          width: 0.18em;
          margin-left: 0.08em;
          border-left: 2px solid currentColor;
          animation: typewriter-caret-blink 1s steps(1) infinite;
        }
        /* Added by the Typewriter component once typing finishes: hide the caret and stop animating. */
        .typewriter-caret-done {
          opacity: 0;
          animation: none;
        }
        /* The blink itself: invisible for the middle of each 1s cycle. steps(1) makes it snap on and
           off instead of fading. */
        @keyframes typewriter-caret-blink {
          50% { opacity: 0; }
        }

        /* The full-size layer that the six topic icons are absolutely positioned inside.
           pointer-events: none lets clicks pass straight through to the content underneath. */
        .hero-placeholders {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Base look for one icon slot: pinned to the centre of the layer (left/top 50%) so each item's
           own transform can push it out into the arc. The dashed border, grey background and uppercase
           label are the "empty placeholder" styling used when no image is supplied. */
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

        /* Added on top of .hero-placeholder when there IS an image: strip away the box styling so only
           the PNG shows, and use a slightly larger square. */
        .hero-placeholder-image {
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          width: 150px;
          height: 150px;
        }

        /* --- Everything from here down styles the video-orbit feature, whose JSX is commented out
           below, so these rules currently match nothing. --- */

        /* perspective gives child transforms a 3D vanishing point. */
        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1200px;
        }

        /* Centred layer holding the video boxes; translate(-50%, -50%) is the classic trick for
           centring an absolutely positioned element on its own midpoint. */
        .videos-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        }

        /* One video card: rounded, clipped, shadowed, and animated smoothly. will-change: transform
           hints to the browser to put it on the GPU, since its transform changes as you scroll. */
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

        /* Plain CSS hover: brighten the clip and deepen its shadow. */
        .video-box:hover {
          filter: brightness(1.1);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
        }

        /* The "hovered" class added by handleVideoHover only sets a CSS *custom property* (a variable).
           The transform rules below read it, so one small variable change resizes the card without
           having to rewrite the whole multi-part transform in JavaScript. */
        .video-box.hovered {
          --hover-scale: 1.15;
        }

        /* Hovered positions for cards 1-4. Each is the same transform as the non-hovered rule further
           down, multiplied by --hover-scale. The var(--name, fallback) form supplies a default of 1 so
           the maths still works when the variable is absent. */
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

        /* Make the <video> fill its card; object-fit: cover crops rather than squashes. */
        .video-box video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Resting positions for the four cards: two above (rotated slightly outwards) and two below,
           further out. --spread-offset, --vertical-offset and --scale are the custom properties the
           component sets inline from scrollProgress, so the cards drift apart and grow as you scroll.
           calc() lets fixed pixel values and those variables be combined inside one transform. */
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

        /* A media query: on screens 768px wide or less (phones), use smaller cards pulled closer to the
           centre so they still fit. The four rules inside mirror the four above with smaller numbers. */
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
      {/* The hero itself. id="home" makes it an anchor target (e.g. /#home); ref connects it to
          sectionRef so the effects above can measure it and query inside it; min-h-screen makes it at
          least as tall as the viewport, and the pt/pb padding keeps content clear of the fixed nav. */}
      <section
        id="home"
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center pt-[144px] pb-[72px] overflow-hidden"
        style={{ background: 'transparent' }}
      >
        {/* Abstract gradient background overlay */}
        {/* zIndex: 1 puts this layer at the very back. The three children are just big circles
            (rounded-full) filled with the theme accent colour at low opacity and heavily blurred
            (blur-3xl) — that soft glow is the whole background. Two sit off-screen at the sides
            (-left-1/4, -right-1/4) and one is centred behind the text. */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        {/* The block below is commented out, so the video orbit does not render at all. If it were
            enabled it would map over videoList and set the CSS custom properties from scrollProgress
            inline, letting the CSS above animate the cards. Leave it exactly as it is. */}
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
        {/* "hidden lg:block" is Tailwind's mobile-first responsive syntax: hidden by default, shown
            only from the large breakpoint up, because these icons need a wide screen. zIndex 5 places
            them above the background glow but below the text (zIndex 10). */}
        <div className="hero-placeholders hidden lg:block" style={{ zIndex: 5 }}>
          {/* An array literal defined inline and immediately mapped over. Describing the six icons as
              data, rather than writing six near-identical <div>s, keeps the markup short and means a
              new icon is one more line here. Each transform pushes the item out from the centre: the
              first three go left (negative X) and the last three right, with the middle one of each
              trio further out and the outer two offset 250px up/down — that is what forms the arc.
              min(12.5vw + 295px, 50vw - 85px) caps the distance on narrower screens so icons never
              slide off the edge, and the small rotate tilts each trio away from the text.
              `size` is optional and only present where an icon needs to be bigger. */}
          {[
            { transform: "translate(calc(-50% - min(12.5vw + 295px, 50vw - 85px)), calc(-50% - 250px)) rotate(-6deg)", label: "Image 1", src: "/HomeIcons/games.png" },
            { transform: "translate(calc(-50% - min(12.5vw + 415px, 50vw - 70px)), -50%) rotate(-6deg)", label: "Image 2", src: "/HomeIcons/robotics.png" },
            { transform: "translate(calc(-50% - min(12.5vw + 295px, 50vw - 85px)), calc(-50% + 250px)) rotate(-6deg)", label: "Image 3", src: "/HomeIcons/debate.png" },
            { transform: "translate(calc(-50% + min(12.5vw + 295px, 50vw - 85px)), calc(-50% - 250px)) rotate(6deg)", label: "Image 4", src: "/HomeIcons/apps.png", size: 160 },
            { transform: "translate(calc(-50% + min(12.5vw + 415px, 50vw - 70px)), -50%) rotate(6deg)", label: "Image 5", src: "/HomeIcons/mun.png", size: 207 },
            { transform: "translate(calc(-50% + min(12.5vw + 295px, 50vw - 85px)), calc(-50% + 250px)) rotate(6deg)", label: "Image 6", src: "/HomeIcons/teaching.png" },
          // .map turns each data object into a JSX element. React needs a unique `key` on every item
          // in a list so it can tell which element is which between renders and avoid re-creating
          // them all; the label works as a key because the six labels are distinct.
          ].map((item) => (
            // Add the image-specific class only when this item has a picture, and set the position via
            // an inline style because the transform string is per-item data.
            // The spread with a ternary is a common idiom for "add these keys only if a condition
            // holds": when item.size is undefined it spreads an empty object, adding nothing.
            <div
              key={item.label}
              className={item.src ? "hero-placeholder hero-placeholder-image" : "hero-placeholder"}
              style={{
                transform: item.transform,
                ...(item.size ? { width: item.size, height: item.size } : {}),
              }}
            >
              {/* A ternary inside JSX chooses between two pieces of output: the image if there is one,
                  otherwise just the text label as a visible placeholder. This uses a plain <img> rather
                  than next/image, so it skips Next.js's automatic optimisation — fine for small PNGs.
                  object-contain fits the whole image inside the box without cropping, and `alt` is the
                  text a screen reader announces (and what shows if the file fails to load). */}
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

        {/* The text column: capped at 1100px wide, centred with mx-auto, with horizontal padding so it
            never touches the screen edge. position relative + zIndex 10 lifts it above every
            decorative layer. */}
        <div className="max-w-[1100px] mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 10 }}>
          {/* animate-on-scroll is the class the IntersectionObserver looks for, so this heading fades in
              once it is visible. pointerEvents 'none' means the mouse ignores the heading entirely,
              so it can never block clicks on anything behind it. */}
          <h1
            className="animate-on-scroll max-w-3xl mx-auto mb-8 hero-text hero-text-h1"
            style={{ pointerEvents: 'none' }}
          >
            {/* The typewriter headline. as="span" is required because a <div> or another heading cannot
                legally sit inside an <h1>. The responsive text sizes (text-4xl up to lg:text-[48px])
                grow the type on bigger screens, and text-balance evens out the line lengths. */}
            <Typewriter
              as="span"
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-semibold mb-4 text-balance"
              text={HERO_HEADLINE}
              speed={HERO_TITLE_SPEED}
              startDelay={HERO_TITLE_DELAY}
            />
            {/* The supporting paragraph. It appears instantly rather than being typed, and is a <span>
                with `block` (not a <p>) because <p> is not valid inside an <h1>. */}
            <span className="block text-lg md:text-xl leading-relaxed text-pretty hero-text-p">
              {HERO_DESCRIPTION}
            </span>
          </h1>

          {/* animate-delay-300 staggers this fade-in 300ms after the heading's, so the button arrives
              second instead of everything appearing at once. */}
          <div className="animate-on-scroll animate-delay-300">
            {/* The call-to-action. onClick receives the handler *function itself* — writing
                onClick={handleSeeMyWork()} with parentheses would call it during render instead.
                The long class string is mostly hover/active feedback: a slightly darker background, a
                bigger shadow, and a 5% scale up on hover with a small squash on click. */}
            <Button
              onClick={handleSeeMyWork}
              className="bg-accent hover:bg-accent/95 active:bg-accent/92 text-accent-foreground font-medium tracking-wide px-10 py-7 text-lg rounded-2xl shadow-lg hover:shadow-2xl active:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform inline-flex items-center"
            >
              {/* Wrapping the label in a span keeps the text as one inline block, so the scale
                  animation on the button transforms it as a single unit. */}
              <span className="inline-block">{HERO_BUTTON_TEXT}</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}