/**
 * team-section.tsx
 *
 * The Empty Console page: a heading with the team logo, a paragraph about the team, and a
 * row of three flip cards (one per cofounder) rendered by `TeamMemberCard`. It also has two
 * pieces of behaviour that are not visible on screen:
 *   1. A "fade in as you scroll" animation, wired up with an IntersectionObserver.
 *   2. A deliberately offscreen copy of the logo, plus a preload of the same file, so that
 *      link-preview crawlers (Discord, iMessage, Twitter, and so on) reliably find and
 *      fetch an image when someone pastes a link to this page.
 *
 * Concepts to notice:
 *  - `"use client"` and why this component needs it.
 *  - `useRef` as a way to hold on to a real DOM element, and how it differs from state.
 *  - `useEffect` with an empty dependency array, and returning a cleanup function.
 *  - `IntersectionObserver`, the browser API for "tell me when this element scrolls
 *    into view", which is far cheaper than listening to every scroll event.
 *  - An array of plain objects used as data, then turned into JSX with `.map()`, plus the
 *    `key` prop React needs to track list items.
 *  - `next/image` with the `priority` and `unoptimized` props.
 *  - Optional chaining (`?.`), which safely does nothing when the value is null.
 */

// This component uses refs, effects, and browser APIs, all of which are client-only,
// so the file is marked as a Client Component.
"use client"

// `useEffect` runs side effects after render; `useRef` holds a mutable value (here, a DOM
// node) that persists across renders without causing a re-render when it changes.
import { useEffect, useRef } from "react"
import Image from "next/image"
// The flip card component that renders one team member. The `@/` prefix is a path alias
// configured in tsconfig.json that points at the `src` folder, so imports do not need
// long chains of `../../`.
import { TeamMemberCard } from "@/components/team-member-card"

// The team data lives in a plain array of objects right next to the component that uses it.
// Separating data from markup like this means the JSX below stays short and adding a fourth
// member would be a data edit, not a layout edit. The array order is also the display order:
// Emey, then ShyGuy in the middle, then HF_ang.
const teamMembers = [
  {
    name: "Emey",
    role: "Cofounder",
    // Path relative to the /public folder, which Next.js serves at the site root.
    image: "/team-emey.png",
    bio: "Emey is the team's composer and lead artist, bringing a unique creative perspective to every project. He picked up coding after meeting ShyGuy and HF_ang and quickly mastered key software skills.",
    discord: "qorachniuphorbia",
    // `as const` narrows the type of this string from the general `string` to the literal
    // type `"left"`. Without it TypeScript would reject the object, because the card's
    // `tilt` prop only accepts exactly "left" or "right", not any old string.
    tilt: "left" as const,
  },
  {
    name: "ShyGuy",
    role: "Cofounder",
    image: "/team-shyguy.jpeg",
    bio: "ShyGuy leads marketing, communications, and product positioning while contributing to development. With a knack for leadership and strategy, he shapes product vision and keeps the team aligned.",
    discord: "shyguygamedev",
    // Only this entry has `featured`, which the JSX below uses to scale the middle card up
    // and lift it above its neighbours. The other two objects simply omit the key, so
    // `member.featured` reads as `undefined` (falsy) for them. Note this member also has no
    // `tilt`, which is why it stays upright while the outer two lean inward.
    featured: true,
  },
  {
    name: "HF_ang",
    role: "Cofounder",
    // Hidden logo image before HF_ang's picture
    image: "/team-hfang.png",
    // An alternative portrait and a longer bio, both kept commented out as a record of
    // earlier wording. Commented-out code like this is inert and safe to leave in place.
    // image: "/empty-console-logo.png",
    // bio: "HF_ang discovered coding through video games and has since developed a passion for problem-solving, creating digital art, and experimenting with physics in code. Adding his video game skills of code and art, he brings easy to read UI and user engagement to the team’s creations. He also constantly experiments with new concepts in his work.",
    bio: "HF_ang found his passion for programming through video games. Since teaming up with ShyGuy and Emey in 2024, he's focused on UI/UX design and user engagement.",
    discord: "hfanggamedev",
    tilt: "right" as const,
  },
]

export function TeamSection() {
  // A ref is a box with a `.current` property. Attaching it to an element below (via
  // `ref={sectionRef}`) makes React put that real DOM node into `.current` after mounting,
  // which is how the effects here get something concrete to query and observe. The generic
  // `<HTMLElement>` types what it will hold, and `null` is the value before mounting.
  // Unlike state, writing to a ref never triggers a re-render, which is exactly what you
  // want for a value that is plumbing rather than something the user sees.
  const sectionRef = useRef<HTMLElement>(null)

  // Preload shyguy-gamedev-logo.png before HF_ang's picture
  // This effect exists for link previews rather than for anything the visitor sees. Creating
  // an `Image` object and setting its `src` starts a download immediately, warming the
  // browser cache so the logo is already available by the time it is needed.
  // `new window.Image()` is the plain browser Image constructor, and the `window.` prefix is
  // necessary here to distinguish it from the `Image` component imported from `next/image`
  // at the top of the file, which would otherwise shadow it.
  useEffect(() => {
    const img = new window.Image()
    img.src = "/shyguy-gamedev-logo.png"
    // Empty dependency array: run once after the first render only.
  }, [])

  // The scroll-reveal effect. Everything marked `.animate-on-scroll` starts at `opacity-0`
  // and gets its animation class added the moment it scrolls into view.
  useEffect(() => {
    // An IntersectionObserver watches elements and calls back when their overlap with the
    // viewport changes. This is far more efficient than a scroll listener, because the
    // browser does the geometry work itself rather than running JavaScript on every pixel.
    const observer = new IntersectionObserver(
      // The callback receives a batch of entries, one per element whose visibility changed.
      (entries) => {
        entries.forEach((entry) => {
          // `isIntersecting` is true when the element has come into view.
          if (entry.isIntersecting) {
            // Adding the CSS class is what actually plays the animation; the keyframes live
            // in the global stylesheet. Note the class is never removed, so each element
            // fades in once and then stays visible even if you scroll back past it.
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      // Options: `threshold: 0.1` means "fire once 10% of the element is visible", so the
      // fade starts as the element is entering rather than only when fully on screen.
      { threshold: 0.1 },
    )

    // Find every element to animate *inside this section*. Scoping the query to the ref
    // rather than the whole `document` keeps this component from touching other parts of
    // the page. The `?.` is optional chaining: if `.current` is still null the whole
    // expression evaluates to `undefined` instead of throwing an error.
    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    // Register each element with the observer, again guarded with `?.` in case the query
    // returned nothing.
    elements?.forEach((el) => observer.observe(el))

    // Cleanup: when the component unmounts, `disconnect()` stops watching everything at
    // once. Skipping this would leak the observer and its references to detached DOM nodes.
    return () => observer.disconnect()
  }, [])

  return (
    // The section element, with the ref attached so the effect above can search inside it.
    // `relative` establishes a positioning context for the absolutely-positioned decorations
    // below; `overflow-hidden` clips the oversized blurred circles so they cannot create
    // horizontal scrollbars. The padding values use Tailwind arbitrary values and `md:`
    // variants to give the section more breathing room on wider screens.
    <section ref={sectionRef} className="relative overflow-hidden py-[64px] md:py-[100px] pt-[132px] md:pt-[172px] bg-background">
      {/* Abstract gradient background overlay */}
      {/* `absolute inset-0` stretches this layer over the whole section. The inline
          `zIndex: 1` keeps it behind the content wrapper further down, which sits at z-10. */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {/* Three big soft circles of accent colour, each pushed partly offscreen and blurred
            heavily (`blur-3xl`) so they read as a diffuse glow rather than as shapes. The
            `/10`, `/20`, and `/5` suffixes are Tailwind opacity modifiers on the colour. The
            last one is centred with the standard `left-1/2 top-1/2` plus negative-half
            translate trick. These are purely decorative and self-closing, with no children. */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      {/* Hidden logo image before HF_ang's picture - with proper dimensions for crawlers */}
      {/* This block is invisible to humans but present in the HTML for link-preview crawlers.
          It is parked at `left-[-9999px]`, far off the left edge, rather than being hidden
          with `display: none` or `hidden`, because a display-hidden image is often skipped
          entirely by the browser and by crawlers. `opacity-0` and `pointer-events-none`
          make doubly sure it cannot be seen or clicked. The 1200x630 size is the standard
          Open Graph preview aspect ratio that Discord, iMessage, and Twitter expect.
          Worth knowing: the proper way to do this in Next.js is the metadata API's
          `openGraph.images` in a layout or page file, which puts a real <meta> tag in the
          document head. This offscreen-image approach is a belt-and-braces workaround. */}
      <div className="absolute left-[-9999px] w-[1200px] h-[630px] opacity-0 pointer-events-none">
        {/* `priority` tells Next.js this image is important: it skips lazy loading and adds a
            preload hint to the page head so the file is fetched as early as possible.
            `unoptimized` bypasses Next's image-resizing service and serves the original file
            from /public, which matters here because a crawler should receive the real logo at
            its real dimensions rather than a rewritten, resized URL. */}
        <Image
          src="/shyguy-gamedev-logo.png"
          alt="Empty Console Logo"
          width={1200}
          height={630}
          priority
          unoptimized
        />
      </div>
      {/* The actual visible content. `relative z-10` lifts it above the z-1 decoration layer,
          and the max-width plus `mx-auto` centre it in a readable column. */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        {/* The header block: centred text with a large gap before the card grid. */}
        <div className="text-center mb-16">
          {/* The section heading. `animate-on-scroll opacity-0` is the pair of classes the
              IntersectionObserver effect above looks for: invisible until revealed. It is a
              flex row so the logo and the words sit on one line, centred, with a 12px gap. */}
          <h2 className="animate-on-scroll opacity-0 flex items-center justify-center gap-3 text-4xl md:text-[32px] font-semibold text-primary mb-4">
            {/* The inline team logo. `width`/`height` of 64 are the intrinsic size Next.js
                uses to reserve layout space, while `h-[1em] w-auto` then scales the rendered
                image to exactly one line-height tall so it always matches the heading text,
                whatever font size the breakpoint picks. `unoptimized` again serves the PNG
                straight from /public. */}
            <Image
              src="/empty-console-logo.png"
              alt="Empty Console Logo"
              width={64}
              height={64}
              className="h-[1em] w-auto"
              unoptimized
            />
            Empty Console
          </h2>
          {/* The intro paragraph. `animate-delay-100` staggers its fade so it arrives just
              after the heading rather than at the same instant. */}
          <p className="animate-on-scroll opacity-0 animate-delay-100 text-lg hero-text max-w-4xl mx-auto">
            <a
              href="https://www.emptyconsole.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Empty Console
            </a>{" "}
            is a startup team cofounded by ShyGuy, HF_ang, and Emey. From a shared passion, the team has evolved into a collaborative space where each member can pursue their unique talents, contribute meaningfully to projects, and develop skills while learning from each other. Everyone on the team brings a unique perspective, balancing technical expertise, creativity, and teamwork to produce innovative projects and products, all while learning more about vibe coding and of the world's future. We started with games, though are now competing in hackathons and building real apps.
          </p>
        </div>

        {/* The card grid: one column on phones, two at the `md` breakpoint, three at `lg`.
            `items-center` keeps the cards vertically centred on each other, which matters
            because the featured middle card is scaled up and therefore taller. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {/* `.map()` transforms the data array into an array of JSX elements, which React
              renders in order. This is the standard way to render a list in React: there is
              no special loop syntax, just ordinary JavaScript inside curly braces. */}
          {teamMembers.map((member, index) => (
            // A wrapper div around each card, holding the reveal animation and the featured
            // styling so the card component itself does not have to know about either.
            //
            // `key` is how React identifies list items between renders so it can reuse the
            // right DOM nodes instead of rebuilding the list. It must be stable and unique
            // among siblings; the name works here because no two members share one. Using
            // the array index would be the fallback, but it breaks if the list is reordered.
            //
            // `className` is built with a template literal. Caution: the
            // `animate-delay-${...}` part does not actually work, because Tailwind scans
            // source files for literal class names at build time and cannot see classes
            // assembled at runtime, so `animate-delay-100` and friends are never generated
            // here. That is precisely why the inline `style` below sets the delay directly,
            // which is what really produces the staggered effect.
            // The featured member (ShyGuy) additionally gets `relative z-10` to stack above
            // his neighbours and `lg:scale-[1.15]` to render 15% larger, but only on large
            // screens where the three cards actually sit side by side.
            //
            // `style` supplies the real stagger: card 1 waits 100ms, card 2 waits 200ms, and
            // card 3 waits 300ms before its fade-in animation begins, so they cascade instead
            // of popping in together. An inline style is used because the value is per item.
            <div
              key={member.name}
              className={`animate-on-scroll opacity-0 animate-delay-${(index + 1) * 100} ${
                member.featured ? "relative z-10 lg:scale-[1.15]" : ""
              }`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* `{...member}` spreads every key of the object into individual props, so this
                  one line is shorthand for name={member.name} role={member.role} and so on.
                  It is concise, but it also means `featured` is passed down to the card even
                  though `TeamMemberCardProps` does not declare it; React just ignores the
                  extra value since the card never forwards its props to a DOM element. */}
              <TeamMemberCard {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
