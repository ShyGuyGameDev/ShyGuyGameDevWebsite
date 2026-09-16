/**
 * AchievementsSection - a two-column grid of cards, one per competition placement, each showing a
 * trophy/screenshot image on the left and the competition name plus the result on the right.
 *
 * Where it appears: on the HOME page, in the band directly beneath the hero.
 *
 * Key concepts a learner should notice here:
 * 1. "use client" - required because we use `useRef` and `useEffect`, which only run in the browser.
 * 2. A hard-coded data array (`achievements`) driving the UI: to add a placement you edit data, not
 *    JSX. The JSX below is written once and `.map()` repeats it for every entry.
 * 3. `useRef` to get a handle on a real DOM element, plus `useEffect` with an EMPTY dependency array
 *    so the setup code runs exactly once after the section first appears.
 * 4. `IntersectionObserver` for the scroll-triggered fade-in animation, and the effect's CLEANUP
 *    function that disconnects the observer so it does not leak.
 * 5. Staggered animation delays computed from the `.map()` index via an inline `style` object.
 */

// Opt this file into being a Client Component (see the top of search-bar.tsx for the full story).
// Hooks like useEffect/useRef need the browser, so a Server Component could not use them.
"use client"

// `useEffect` runs code AFTER React has painted the DOM (for "side effects" such as subscriptions).
// `useRef` gives us a mutable box whose `.current` survives re-renders - here, a pointer to a node.
import { useEffect, useRef } from "react"
// The project's styled card container (a <div> with border/background/rounded styling).
import { Card } from "@/components/ui/card"

/**
 * The data for this section. Each entry in the array is one object describing one placement, and
 * each object has exactly three fields:
 *   `competition` - the event's name. Rendered as the card's <h3> heading, and ALSO reused as the
 *                   `key` for the list item and as the image's `alt` text, so it must be unique.
 *   `placing`     - the result text shown under the heading (e.g. "3rd Place ...").
 *   `image`       - a path to a file inside the `public/` folder. Next.js serves `public/x.png` at
 *                   the URL "/x.png", which is why every path starts with a slash.
 * This array is declared at module scope (outside the component) so it is created once when the file
 * loads, not rebuilt on every render. To add an achievement, append another object in this shape;
 * cards appear in exactly this order, top-left to bottom-right.
 */
const achievements = [
  // Game jam placement: 17th of 474 entries.
  {
    competition: "Patch Notes Game Jam 2025",
    placing: "17th Out Of 474 Entries",
    image: "/achievement-patch-notes-jam.png",
  },
  // App-development contest run by members of Congress; district-level 3rd place.
  {
    competition: "Congressional App Challenge 2025",
    placing: "3rd Place In California District 15",
    image: "/achievement-congressional-app-challenge.png",
  },
  // Model United Nations conference at UC Berkeley; delegate "Outstanding" award.
  {
    competition: "Berkeley Model United Nations 2025",
    placing: "Outstanding Award",
    image: "/achievement-berkeley-mun.png",
  },
  // Speech-and-debate tournament; first in the novice parliamentary division.
  {
    competition: "Georgiana Hays Invitational 2026",
    placing: "1st Place In Novice Parliamentary Debate",
    image: "/HomeTopics/Debate/georgiana-hays-trophy.png",
  },
]

export function AchievementsSection() {
  // `useRef<HTMLElement>(null)` creates a box that starts out holding `null`. We attach it to the
  // <section> below with `ref={sectionRef}`, and React fills in `sectionRef.current` with the real
  // DOM node after the element is mounted. Unlike state, changing a ref never triggers a re-render,
  // which makes it the right tool for "I just need to reach into the DOM".
  const sectionRef = useRef<HTMLElement>(null)

  // `useEffect(callback, deps)` runs `callback` after the component has rendered to the screen.
  // The dependency array at the very bottom is `[]` (empty), meaning "no dependencies, so run this
  // setup only once, after the first render" - exactly right for wiring up a scroll observer.
  useEffect(() => {
    // An IntersectionObserver is a browser API that watches elements and tells you when they scroll
    // into (or out of) view. It is far cheaper than listening to every scroll event yourself.
    const observer = new IntersectionObserver(
      // This callback fires with a list of `entries`, one per watched element whose visibility
      // just changed.
      (entries) => {
        entries.forEach((entry) => {
          // `isIntersecting` is true when the element has entered the viewport.
          if (entry.isIntersecting) {
            // Adding this CSS class starts the fade-in-and-slide-up keyframe animation defined in
            // the global stylesheet. The class is never removed, so each card animates once and
            // then stays visible. (The card starts at `opacity-0`, i.e. invisible.)
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      // Options: fire the callback once 10% of the element is visible, instead of waiting for it to
      // be fully on screen. That makes the animation feel responsive while scrolling.
      { threshold: 0.1 },
    )

    // Find every element inside this section that opted into the animation by having the
    // `.animate-on-scroll` class. `?.` is optional chaining: if `current` were still null we get
    // `undefined` instead of a crash.
    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    // Register each of those elements with the observer so it starts watching them.
    elements?.forEach((el) => observer.observe(el))

    // The function an effect RETURNS is its cleanup function. React calls it when the component is
    // removed from the page (and before re-running the effect). Disconnecting stops the observer
    // from watching now-dead DOM nodes, which would otherwise be a memory leak.
    return () => observer.disconnect()
  }, [])

  return (
    // `ref={sectionRef}` is what connects the ref box above to this actual DOM element.
    // Classes: full-width band with generous vertical padding (larger from the `md:` breakpoint up),
    // page background colour, and `overflow-hidden` so nothing spills outside the section.
    <section ref={sectionRef} className="relative overflow-hidden py-[64px] md:py-[100px] bg-background">
      {/* Centred content column, capped at 1100px wide, with 24px of side padding on small screens. */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        {/* Responsive grid: one card per row on phones, two per row from the `lg:` breakpoint up. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Turn the data array into cards. The second `.map()` argument, `index`, is the entry's */}
          {/* position (0, 1, 2, ...) and is used below to stagger the animation. */}
          {achievements.map((achievement, index) => (
            // A wrapper <div> exists so the animation classes and delay live OUTSIDE the Card,
            // leaving the Card free to own its own hover styling.
            // `key` must be stable and unique so React can track this item across re-renders; the
            // competition name works because no two entries share one.
            // `animate-on-scroll` is the marker class the observer above searches for, and
            // `opacity-0` hides the card until the observer adds `animate-fade-in-up`.
            // The inline `style` object sets a CSS animation delay of 100ms, 200ms, 300ms... so the
            // cards cascade in one after another rather than all at once. Inline styles in JSX are
            // objects with camelCased property names, hence `animationDelay`.
            <div
              key={achievement.competition}
              className="animate-on-scroll opacity-0"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* The card body laid out as a horizontal row: image, 20px gap, then the text block. */}
              {/* `group` lets children react to hovering the whole card; on hover the shadow grows */}
              {/* and the card lifts up 4px (`hover:-translate-y-1`) over a 300ms transition. */}
              <Card className="group flex flex-row items-center gap-5 bg-card rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full p-5">
                {/* Fixed-size square image frame: 96px on phones, 112px from `sm:` up. `shrink-0` */}
                {/* stops flexbox from squashing it, and `overflow-hidden` clips the image corners. */}
                <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted">
                  {/* A plain <img> tag (not Next.js's optimised <Image>), so no width/height or */}
                  {/* `fill` prop is needed. `object-cover` crops the picture to fill the square */}
                  {/* frame without distorting it. `alt` is the text screen readers announce. */}
                  <img
                    src={achievement.image}
                    alt={achievement.competition}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* `min-w-0` is the classic flexbox fix that allows this text column to shrink and */}
                {/* wrap instead of forcing the card wider than its grid cell. */}
                <div className="min-w-0">
                  {/* Competition name as the card's heading. */}
                  <h3 className="text-lg font-bold text-primary leading-snug">
                    {/* Curly braces switch from JSX markup back into JavaScript to read the value. */}
                    {achievement.competition}
                  </h3>
                  {/* The result line underneath, in the softer secondary text colour. */}
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
