/**
 * team-member-card.tsx
 *
 * One flip card for a single Empty Console team member. The front shows a round portrait,
 * the person's name, their role, and their Discord handle; clicking the card flips it over
 * in 3D to reveal their bio, and clicking again flips it back. Rendered three times by
 * `team-section.tsx`, once each for Emey, ShyGuy, and HF_ang.
 *
 * Concepts to notice:
 *  - `"use client"`, required because this component has state and a click handler.
 *  - `useState`, and the safe "updater function" form of a setter (`setFlipped(prev => !prev)`).
 *  - A TypeScript `interface` describing the component's props, including an optional prop
 *    (`tilt?`) and a union type that restricts it to exactly two allowed strings.
 *  - CSS 3D transforms driven by React state: `perspective`, `transform-style: preserve-3d`,
 *    `backface-visibility: hidden`, and `rotateY`. This is the whole flip trick, and it is
 *    done in CSS rather than JavaScript animation, so the browser can run it on the GPU.
 *  - Using a CSS custom property (`--tilt-transform`) as a bridge between React state and a
 *    Tailwind class, so a responsive `lg:` variant can use a value computed in JavaScript.
 *  - Accessibility: a real `<button>` so it is keyboard- and screen-reader-operable, plus
 *    `aria-pressed` to announce the flipped state and `aria-label` to describe the action.
 */

// State and event handlers only work in the browser, so this must be a Client Component.
"use client"

// `useState` is the hook that gives a function component its own memory.
import { useState } from "react"
// Next.js's image component: it renders an <img> but also reserves layout space and
// handles lazy loading for you.
import Image from "next/image"

// A TypeScript `interface` is a description of the shape of an object: it only exists at
// compile time and disappears from the shipped JavaScript. Declaring the props this way
// means the editor autocompletes them and the compiler complains if a caller forgets one.
interface TeamMemberCardProps {
  name: string
  role: string
  // A path into the /public folder, for example "/team-emey.png".
  image: string
  bio: string
  discord: string
  // The `?` marks this prop as optional, so it may be missing (`undefined`). The
  // `"left" | "right"` union type means that if it *is* provided, only those two exact
  // strings are allowed; a typo like "Left" is caught before the code ever runs.
  tilt?: "left" | "right"
}

// Destructuring the props in the parameter list pulls each field into its own local
// variable, so the body can write `name` instead of `props.name`.
export function TeamMemberCard({ name, role, image, bio, discord, tilt }: TeamMemberCardProps) {
  // The card's only piece of state: is it currently showing the back (the bio) or not?
  // `useState(false)` returns a pair: the current value, and a setter that both updates the
  // value and asks React to re-render this component so the new value reaches the screen.
  // Each rendered card gets its own independent copy of this state, which is why flipping
  // one card does not flip the other two.
  const [flipped, setFlipped] = useState(false)

  const handleClick = () => {
    // Passing a *function* to the setter is the safe pattern: React hands the function the
    // latest value (`prev`) and stores whatever it returns. Writing `setFlipped(!flipped)`
    // would read `flipped` as captured by this render, which can be stale if several updates
    // are batched together. Toggling with `prev` is always correct.
    setFlipped((prev) => !prev)
  }

  // The card's idle pose. The outer two cards are deliberately slid inward, nudged down,
  // and rotated so the three cards fan out like a hand of playing cards, with ShyGuy's
  // untilted featured card in the middle. A nested ternary picks the right transform:
  // "left" leans anticlockwise, "right" leans clockwise, and anything else (the middle
  // card, which passes no `tilt` prop at all) gets the CSS keyword "none" for no transform.
  const restingTransform =
    tilt === "left"
      ? "translateX(35%) translateY(8%) rotate(-14deg)"
      : tilt === "right"
        ? "translateX(-35%) translateY(8%) rotate(14deg)"
        : "none"

  return (
    // The whole card is a real <button>, not a clickable <div>. That single choice gives it
    // keyboard focus, Enter/Space activation, and the correct screen-reader role for free.
    // `type="button"` stops it from submitting a form if one ever wraps it.
    // `aria-pressed={flipped}` turns it into a toggle button, so assistive technology
    // announces whether the bio is currently showing. `aria-label` replaces the button's
    // visible text for screen readers with a clear description of what clicking will do.
    // In the classes: `aspect-square` keeps the card a perfect square at any width;
    // `[perspective:1200px]` is Tailwind's arbitrary-value syntax for the CSS `perspective`
    // property, which is what makes child rotations look like real depth instead of a flat
    // squash. The `focus-visible:ring-*` classes restore a visible keyboard focus ring after
    // `focus:outline-none` removes the browser default.
    // `lg:[transform:var(--tilt-transform)]` applies the fanned-out tilt only on large
    // screens, because on a phone the cards stack in one column and leaning them would
    // just look broken.
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={flipped}
      aria-label={`Show ${name}'s bio`}
      className="group block w-full aspect-square [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl transition-transform duration-700 ease-out lg:[transform:var(--tilt-transform)]"
      style={{
        // Rotate around the bottom edge rather than the centre, so the tilted cards pivot
        // like they are resting on a surface instead of spinning in mid-air.
        transformOrigin: "bottom center",
        // React state is written into a CSS custom property here. The Tailwind class above
        // reads it back with `var(--tilt-transform)`, which is the trick that lets a
        // JavaScript-computed value participate in a responsive `lg:` variant. When the card
        // is flipped the tilt is dropped ("none") so the bio faces the reader straight on.
        "--tilt-transform": flipped ? "none" : restingTransform,
        // TypeScript's type for `style` does not know about custom properties, so the object
        // is cast with `as React.CSSProperties` to reassure the compiler.
      } as React.CSSProperties}
    >
      {/* The rotating panel that holds both faces. `[transform-style:preserve-3d]` tells the
          browser to keep its children in real 3D space rather than flattening them, which is
          what allows one face to genuinely sit behind the other. The rotation itself is set
          from state below, and `transition-transform duration-500` animates the half turn
          over half a second. */}
      <div
        className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        {/* Both faces are `absolute inset-0`, so they stack exactly on top of each other and
            fill the card. `[backface-visibility:hidden]` is the key: it hides a face whenever
            it is turned away from the viewer, so only one of the two is ever visible.
            `group-hover:shadow-lg` works with the `group` class on the button: hovering
            anywhere on the button lifts the shadow on this child. */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-background shadow-[0_4px_8px_rgba(0,0,0,0.04)] group-hover:shadow-lg transition-shadow duration-300">
          {/* A vertical flex column that centres all the front content both ways. */}
          <div className="flex h-full w-full flex-col items-center justify-center text-center p-6">
            {/* The portrait frame: a fixed 8rem circle (`rounded-full` plus
                `overflow-hidden` clips the image into the circle). It is `relative` because
                the image below uses `fill`, which positions itself against the nearest
                positioned ancestor. */}
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden shadow-md">
              {/* The portrait. `image || "/placeholder.svg"` is a fallback: if `image` is an
                  empty string the placeholder is used instead of a broken picture.
                  `fill` makes the image stretch to its positioned parent instead of needing
                  explicit width/height numbers. `object-cover object-center` then crops it to
                  fill the circle without distorting the aspect ratio. `loading="lazy"` lets
                  the browser skip downloading it until it is near the viewport, and
                  `unoptimized` serves the file from /public untouched rather than running it
                  through Next.js's image-resizing service. */}
              <Image
                src={image || "/placeholder.svg"}
                alt={`Portrait of ${name}, ${role} at Empty Console`}
                fill
                className="object-cover object-center"
                loading="lazy"
                unoptimized
              />
            </div>

            {/* The person's name as an <h3>, which keeps the page's heading outline sensible
                underneath the <h2> that `team-section.tsx` renders. Curly braces switch from
                JSX markup back into JavaScript so the prop's value can be printed. */}
            <h3 className="text-2xl font-semibold text-primary mb-1">{name}</h3>
            {/* Their role, in the site's accent yellow. */}
            <p className="text-sm font-medium text-yellow-600 mb-4">{role}</p>

            {/* The Discord row: icon and handle side by side, centred. */}
            <div className="flex items-center justify-center gap-2 text-sm">
              {/* The Discord logo as inline SVG. `fill="currentColor"` makes it inherit the
                  yellow text colour set by the class, and `aria-hidden="true"` keeps screen
                  readers from announcing a decorative shape that the text already covers.
                  The <path> below holds the logo's outline as generated SVG path data: do not
                  edit it, reformat it, or insert anything inside its `d` attribute. */}
              <svg className="h-4 w-4 text-yellow-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              {/* The handle itself, for example "shyguygamedev". */}
              <span className="text-primary">{discord}</span>
            </div>

            {/* A small hint, since a card that flips is not obviously clickable on its own. */}
            <p className="mt-4 text-xs text-muted-foreground">Click to read bio</p>
          </div>
        </div>

        {/* Back */}
        {/* The back face is pre-rotated by 180 degrees so that when the parent panel also
            rotates 180 degrees the two cancel out and this face ends up facing the reader the
            right way round. It too hides its backface, so it stays invisible until the flip. */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl bg-background shadow-[0_4px_8px_rgba(0,0,0,0.04)] group-hover:shadow-lg transition-shadow duration-300">
          {/* Same centring column as the front, for a consistent layout. */}
          <div className="flex h-full w-full flex-col items-center justify-center text-center p-6">
            {/* The name is repeated on the back so the reader still knows whose bio this is. */}
            <h3 className="text-xl font-semibold text-primary mb-3">{name}</h3>
            {/* The bio text. `leading-relaxed` widens the line spacing for readability, and
                `overflow-y-auto` adds a scrollbar if a long bio outgrows the square card. */}
            <p className="text-sm text-secondary leading-relaxed overflow-y-auto">{bio}</p>
            {/* The matching hint for getting back to the front face. */}
            <p className="mt-4 text-xs text-muted-foreground">Click to flip back</p>
          </div>
        </div>
      </div>
    </button>
  )
}
