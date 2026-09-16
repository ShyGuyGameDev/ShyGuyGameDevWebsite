/**
 * TopicSwitcher
 *
 * What it renders: a single "topic" card on the site's home page. One topic is shown at a time
 * (Games, Apps, Robotics, MUN, Debate, Teaching, Design) as a big heading, two or three
 * paragraphs of prose about ShyGuy's work in that area, and four photos arranged as a 2x2
 * collage that wraps around the text (two images on the left, two on the right on wide screens).
 * Left/right chevron buttons step through the topics.
 *
 * Where it appears: rendered by `src/app/page.tsx` (the home page), below the hero area.
 *
 * Where the images come from: `page.tsx` runs on the server, reads the folder
 * `public/HomeTopics/<Topic>/`, sorts the filenames, and passes them down through the
 * `topicImages` prop. So the four images you see are simply the first four files
 * alphabetically in that folder. If a folder has fewer than four files, the leftover slots
 * render a grey "Image" placeholder box instead.
 *
 * Concepts to notice as a learner:
 *  - the `"use client"` directive, and why this file needs it
 *  - `useState` to remember which topic is showing
 *  - `useEffect` with an empty dependency array, and why the *random* starting topic must be
 *    chosen there instead of during render (hydration!)
 *  - modular arithmetic (`%`) to wrap the carousel index around at both ends
 *  - props with a default value, optional props, and the `Record<string, string[]>` index type
 *  - `next/image` with the `fill` prop plus a `sizes` hint
 */

// "use client" marks this whole file as a Client Component. By default, components in the
// Next.js App Router are Server Components: they run only on the server and ship no JavaScript
// to the browser. This component needs browser-side interactivity (useState, useEffect, and
// onClick handlers on the chevron buttons), so it must be a Client Component.
// The directive has to be the very first statement in the file.
"use client"

// React's two most common hooks. `useState` stores a value that survives re-renders;
// `useEffect` runs code *after* the component has rendered in the browser.
import { useEffect, useState } from "react"
// Next.js's Image component. It is a smarter <img>: it serves resized/optimized versions of
// the file and avoids layout shift while loading.
import Image from "next/image"
// Two ready-made chevron icons from the `lucide-react` icon library. They are just React
// components that render an <svg>.
import { ChevronLeft, ChevronRight } from "lucide-react"
// The project's own styled button component (from the shadcn/ui-style `components/ui` folder).
// The `@/` prefix is a TypeScript path alias that points at the `src/` directory.
import { Button } from "@/components/ui/button"

// How many photo slots the collage always shows: two on the left, two on the right.
// Pulling the number out into a named constant means the layout and the loop below can never
// disagree about it.
const IMAGE_SLOTS = 4

// Unused earlier draft: an older topic order that is kept around for reference only.
// const TOPICS = ["Robotics", "Apps", "MUN", "Debate", "Games", "Teaching"]

// The list of topics, in the order the chevron buttons walk through them. The array's *index*
// is the single piece of state this component tracks, so this order is what "next" and
// "previous" actually mean. Each string here must also be a key in TOPIC_CONTENT below.
const TOPICS = ["Games", "Apps", "Robotics", "MUN", "Debate", "Teaching", "Design"]

/**
 * The prose shown for each topic.
 *
 * `Record<string, string[]>` is a TypeScript "index type". It describes an object whose keys
 * are strings and whose values are arrays of strings. So TOPIC_CONTENT["Games"] is a
 * `string[]`, and each item in that array is one paragraph.
 *
 * How it is consumed: further down, `TOPIC_CONTENT[topic]` looks up the currently selected
 * topic's array, and `.map()` turns each string into its own <p> element. Adding a paragraph
 * is therefore as simple as adding another string to the right array.
 *
 * A caveat of `Record<string, string[]>`: TypeScript believes *any* string key exists, so a
 * typo like TOPIC_CONTENT["Gamez"] compiles fine but is `undefined` at runtime. That is why the
 * lookup below uses `?? []` as a safety net.
 *
 * Note that several entries also contain commented-out paragraphs. Those are earlier drafts
 * that are being kept for reference; commented-out lines inside an array are simply ignored.
 */
const TOPIC_CONTENT: Record<string, string[]> = {
  // Unused earlier draft of the Games paragraphs, kept for reference.
  // Games: [
  //   "Video games are where it all began. Ever since he was old enough to hold an iPad, ShyGuy has been hooked, and that early love quickly grew into a fascination with how games are actually made.",
  //   "He taught himself game design from the ground up, learning how mechanics, art, sound, and story come together to create something a player can lose themselves in. Every project pushed him to pick up new tools and rethink ideas that looked good on paper.",
  //   "Today he designs and builds his own games, blending creative storytelling with the programming skills he has sharpened along the way. More than anything, games taught him how to finish what he starts.",
  //  ],
  // Games: three paragraphs - how games started ShyGuy's technical journey, the tools he learned,
  // and where the "ShyGuy" handle itself comes from.
  Games: [
    "Video games hold a special place in ShyGuy's heart, as they started ShyGuy on his technical journey. Hooked on games ever since he could understand them, they propelled his curiosity into how technology works, operates, and evolves.",
    "As he grew older, he started to learn how to design and build his own games, working in Scratch, Python and Pygame, p5.js, Unity, Godot, and more. Along his video game development journey, he met HF_ang and Emey, which led to the founding of their startup, Empty Console.",
    "Even today, ShyGuy shows his love and appreciation for games through his name, which is a reference to the world famous Mario character, Shy Guy."
  ],
  // Unused earlier draft of the Apps paragraphs, kept for reference.
  // Apps: [
  //   "What started as curiosity about the software on his devices turned into a passion for building it himself. ShyGuy wanted to understand how the apps he used every day actually worked, and that question became a habit of making his own.",
  //   "He develops apps that are practical, polished, and genuinely useful, focusing on the small details that make a tool feel effortless to use. From the first sketch of an interface to the final round of testing, he cares about how each screen feels in someone's hands.",
  //   "From idea to interface to deployment, he enjoys owning the whole process and turning everyday problems into clean, intuitive tools that people actually want to use.",
  // ],
  // Apps: the shift from games toward real-world software, plus the Congressional App Challenge
  // story. The third string here is commented out, so only two paragraphs render for this topic.
  Apps: [
    "Since 2025, ShyGuy has started to transition to building apps with real use cases instead of games. Planning to work both individually and with his startup called Empty Console, ShyGuy wants to help those around him with new innovative solutions.",
    "ShyGuy's first exposure to building real products was in 2025, with the Congressional App Challenge, which he managed to score 3rd place in with Empty Console. Their submission was called Open Stage, an app directly inspired by the story of his school's music teacher and how hard it is for him to manage and grow his local band. Though this app won't be deployed as a real product, it taught ShyGuy a lot about how to build real solutions by learning from those around him.",
    // "See the future. Build the future. Become the future."
  ],
  // Robotics: bringing code into the physical world - the Iron Man spark, leading an FTC team,
  // and current work in computer vision.
  Robotics: [
    "Designing, building, and programming robots lets ShyGuy bring code into the physical world, a dream he's had ever since seeing Tony Stark's creations in Iron Man.",
    "ShyGuy's robotic interest started with the First Tech Challenge, where he led a team of 15 students from his school. Leading this team helped him learn how to deal with many opinions, low team engagement, and even failure in a competitive setting.",
    "Nowadays, ShyGuy spends most of his time in robotics learning about computer vision and spatial intelligence, which is AI's next frontier. With computer vision, AI will be able to understand the world around it, and science fiction creations like the Terminator finally become a possibility."
  ],
  // MUN (Model United Nations): public speaking and leadership, capped by attending NHSMUN.
  // Only two paragraphs for this topic - the array length can differ per topic, and the
  // rendering code just maps over however many there are.
  MUN: [
    "Even with a name like his, ShyGuy is the opposite of shy. He has always been a naturally confident speaker and leader, skills that he has been able to hone throughout his Model United Nations journey.",
    "ShyGuy has attended many conferences around Silicon Valley, though his most notable conference was actually NHSMUN, or National High School Model United Nations, in New York. This is notable as NHSMUN is the most prestigious pre-collegiate MUN conference in the world, and ShyGuy learned so much attending it. During this conference, ShyGuy the delegate for China in the High-Level Advisory Body on Aritifical Intelligence, a committee tied to his other work in technology.",
  ],
  // Debate: the parliamentary format's 20-minute prep window, and winning a novice tournament.
  Debate: [
    "Parliamentary debate has shaped the way ShyGuy thinks and constructs arguments. In this format, ShyGuy and his debate partner, ZeedleDee, get the round's topic and their side 20 minutes before the round, leaving very little time for full preparation. Through this, ShyGuy's impromptu speaking skills have grown tremendously.",
    "Even though he started this format in 2026, ShyGuy quickly improved, winning his first novice tournament, the Georginia Hays Tournament, after only a few months. Now that he has moved past novice, ShyGuy is competing in the open division, and will continue to improve his speaking and debating skills throughout high school.",
  ],
  // Teaching: paying mentorship forward, including speaking at an elementary robotics program.
  Teaching: [
    "Throughout his life, ShyGuy has learned from many mentors, each being a valuable part of his journey. Wanting to fill that space for others like him, ShyGuy has started teaching whenever possible, always doing his best to support other curious students.",
    "ShyGuy's first experience teaching was in 2026, where he was asked to speak at a session of Cumberland Elementary's after-school robotics program. Here, he spoke about experimenting with the idea of a robotic dog paired with computer vision during a recent project, the best way to tackle new problems, and how to communicate complex robotic ideas to non-technical audiences."
  ],
  // Design: where technical skill meets creative instinct, illustrated by the Future City
  // competition. A third paragraph is commented out below and does not render.
  Design: [
    "Design is where ShyGuy's technical skills meet his creative instincts. Whether he is sketching a game level, laying out an app screen, or planning how a city might function a hundred years from now, he thinks about how form, function, and feeling work together.",
    "For example, in the Future City competition, he worked with five teammates to design a sustainable city of the future, write an essay defending its feasibility, and build a physical scale model of its layout. The project pushed him to research real engineering concepts, coordinate across different strengths, and explain complex ideas in a way anyone could understand.",
    // "Design thinking now shows up across everything ShyGuy builds. He cares about how things look, how they flow, and whether the final result actually solves the problem it was meant to — not just whether the code compiles.",
  ],
}

/**
 * ImageSlot: one tile of the 2x2 photo collage.
 *
 * Props are destructured straight out of the single props object in the parameter list.
 * The type annotation says `src?: string` - the `?` makes `src` *optional*, so its type is
 * really `string | undefined`. That is deliberate: a topic folder may hold fewer than four
 * images, and this component is responsible for drawing a placeholder when its slot is empty.
 * `alt` has no `?`, so it is required (alt text matters for screen readers).
 */
function ImageSlot({ src, alt }: { src?: string; alt: string }) {
  // No image path for this slot, so bail out early and render a grey placeholder box instead.
  // Returning early like this keeps the "real" case below free of nesting.
  if (!src) {
    return (
      // The classes lock the tile to a 4:3 box, full width on small screens but a fixed 230px
      // on large ones (`lg:`), round the corners, and centre the word "Image" inside it. Using
      // the same aspect ratio as a real photo means the layout does not jump around.
      <div className="aspect-[4/3] w-full lg:w-[230px] rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm">
        {/* Literal placeholder label so an empty slot still reads as an intentional box. */}
        Image
      </div>
    )
  }

  return (
    // `relative` is essential here: the <Image fill> below positions itself absolutely, so it
    // needs a positioned ancestor to fill. `overflow-hidden` clips the photo to the rounded
    // corners, and the same 4:3 / 230px sizing keeps every tile identical.
    <div className="relative aspect-[4/3] w-full lg:w-[230px] overflow-hidden rounded-xl border border-border">
      {/* next/image with `fill`: instead of needing explicit width/height numbers, the image
          stretches to cover this parent box. `sizes` is a hint to the browser about how wide
          the image will actually be displayed, so it can download the right-sized version -
          230px once the viewport is at least 1024px wide, otherwise about half the viewport
          width (two tiles sit side by side in the mobile grid). `object-cover` crops rather
          than squashing, so photos of any shape still fill the 4:3 tile neatly. */}
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 230px, 50vw" className="object-cover" />
    </div>
  )
}

// The exported component. `topicImages` is an optional prop with a *default value* of `{}`:
// the `= {}` in the destructuring means that if the parent renders <TopicSwitcher /> with no
// prop at all, `topicImages` is an empty object rather than `undefined`. That matters because
// the code below immediately does `topicImages[topic]`, which would crash on `undefined`.
// The type is the same `Record<string, string[]>` index type used above: topic name -> list of
// image paths. `src/app/page.tsx` builds this object on the server by reading
// `public/HomeTopics/<Topic>/` and sorting the filenames.
export function TopicSwitcher({
  topicImages = {},
}: {
  topicImages?: Record<string, string[]>
}) {
  // The ONLY state this component keeps: which position in the TOPICS array is showing.
  // `useState(0)` returns a pair - the current value (`index`) and a setter (`setIndex`).
  // Calling the setter tells React to re-render this component with the new value.
  // Starting at 0 (i.e. "Games") is important; see the effect immediately below.
  const [index, setIndex] = useState(0)

  // Pick a RANDOM starting topic, but only after the first render, in the browser.
  //
  // Why not just `useState(Math.floor(Math.random() * TOPICS.length))`? Because this page is
  // pre-rendered on the server and then "hydrated" in the browser. The server would roll one
  // random number and send back HTML for, say, "Debate", while the browser would roll a
  // different number and expect "MUN". React compares the two, finds they disagree, and reports
  // a hydration mismatch. Render must therefore be deterministic.
  //
  // `useEffect` runs *after* the component has rendered on the client, which is past the point
  // where React compares server and client output - so randomness is safe here. The server and
  // the first client render both show index 0, then this effect swaps in a random topic.
  //
  // The `[]` at the end is the dependency array: an empty array means "run this once, after the
  // first render, and never again". (If it listed variables, the effect would re-run whenever
  // one of them changed. With no array at all, it would run after *every* render.)
  // This effect needs no cleanup function. When an effect starts something ongoing - a timer, an
  // event listener, a subscription - you `return` a function that tears it down, and React calls
  // it before re-running the effect and when the component unmounts. Here nothing is left
  // running, so there is nothing to clean up.
  useEffect(() => {
    setIndex(Math.floor(Math.random() * TOPICS.length))
  }, [])

  // Move forward one topic. `% TOPICS.length` (the modulo, or remainder, operator) wraps the
  // index back to 0 once it walks past the end: with 7 topics, 6 + 1 = 7, and 7 % 7 === 0.
  // Passing a *function* to the setter (`(i) => ...`) means React hands us the latest value of
  // the state rather than whatever `index` happened to be when this arrow function was created.
  const next = () => setIndex((i) => (i + 1) % TOPICS.length)
  // Move backward one topic. The `+ TOPICS.length` before the `%` is the trick that makes
  // wrapping work in reverse: at index 0, plain `(0 - 1) % 7` would be -1, since JavaScript's
  // `%` keeps the sign of the left operand. Adding the length first gives (0 - 1 + 7) % 7 === 6,
  // the last topic. For every other index the extra length is removed again by the remainder.
  const prev = () => setIndex((i) => (i - 1 + TOPICS.length) % TOPICS.length)

  // Everything below is *derived* from state during render rather than stored in its own
  // useState. Because these are recomputed on every render, they can never drift out of sync
  // with `index` - a good habit: keep the minimum in state, calculate the rest from it.
  //
  // The topic name for the current index, e.g. "Robotics".
  const topic = TOPICS[index]
  // Its paragraphs. `?? []` is the nullish-coalescing operator: if the lookup comes back
  // `undefined` (a topic with no entry in TOPIC_CONTENT), fall back to an empty array so the
  // `.map()` further down still works instead of throwing.
  const paragraphs = TOPIC_CONTENT[topic] ?? []
  // Its image paths, from the prop the server built. Same `?? []` fallback, which is what
  // happens for a topic whose `public/HomeTopics/<Topic>/` folder is missing or empty.
  const images = topicImages[topic] ?? []
  // Force the list to be exactly IMAGE_SLOTS (4) long, no matter how many files the folder had.
  // `Array.from({ length: 4 }, (_, i) => images[i])` builds a 4-item array by calling the second
  // argument for i = 0,1,2,3. The `_` is a throwaway name for the first argument we don't use.
  // Extra images beyond four are dropped; missing ones become `undefined`, which is exactly the
  // signal ImageSlot uses to draw its grey placeholder.
  const slots = Array.from({ length: IMAGE_SLOTS }, (_, i) => images[i])

  return (
    // <section> is the outer wrapper for this whole block of the page. The classes stack its
    // children vertically and centre them, with horizontal padding and vertical breathing room.
    <section className="flex flex-col items-center px-6 pt-12 pb-14">
      {/* The header row: previous button, topic title, next button, laid out side by side and
          centred, with a gap that grows on medium screens and margin below the row. */}
      <div className="max-w-[1100px] mx-auto flex items-center justify-center gap-3 md:gap-6 mb-8">
        {/* Previous-topic button. `variant`/`size` are the project's own Button props;
            `onClick={prev}` passes the function itself (no parentheses - calling it here would
            run it during render instead of on click); `aria-label` gives screen readers a name,
            since the button's only visible content is an icon with no text. The classes make it
            a round 48/56px accent-coloured target, and `group` lets the icon inside react to
            hovering the button rather than only itself. */}
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={prev}
          aria-label="Previous topic"
          className="group size-12 md:size-14 rounded-full text-accent hover:text-accent hover:bg-accent/10 cursor-pointer"
        >
          {/* The left chevron icon. `group-hover:scale-150` is the payoff of `group` above:
              the icon grows when the parent button is hovered, animated over 200ms. */}
          <ChevronLeft className="size-6 md:size-7 transition-transform duration-200 group-hover:scale-150" />
        </Button>

        {/* The topic title. The `min-w-[10ch]` floor reserves roughly ten characters of width so
            the chevrons do not shuffle left and right as topic names change length. */}
        <h2 className="hero-text text-3xl sm:text-4xl md:text-5xl font-semibold text-center min-w-0 sm:min-w-[10ch]">
          {/* Curly braces drop out of JSX back into JavaScript, printing the current topic
              name. Because this reads from state, changing `index` re-renders this text. */}
          {topic}
        </h2>

        {/* Next-topic button: identical to the previous one except it calls `next`. */}
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={next}
          aria-label="Next topic"
          className="group size-12 md:size-14 rounded-full text-accent hover:text-accent hover:bg-accent/10 cursor-pointer"
        >
          {/* Right chevron, with the same grow-on-hover treatment. */}
          <ChevronRight className="size-6 md:size-7 transition-transform duration-200 group-hover:scale-150" />
        </Button>
      </div>

      {/* The body row. On narrow screens this is a single vertical column; from `lg:` up it
          becomes three columns side by side: two images, the text, two more images. */}
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-10 max-w-[1200px] w-full">
        {/* Left-hand image pair. The `order-*` classes control visual order independently of
            source order: on mobile this block sits *after* the text (order-2), but on large
            screens it moves to the far left (lg:order-1). On mobile the two tiles sit in a
            2-column grid; on large screens they stack vertically. */}
        <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:gap-6">
          {/* Slots 0 and 1. A `slots[n]` of `undefined` makes ImageSlot draw a placeholder.
              The alt text is a template literal - backticks with `${...}` holes - producing
              strings like "Robotics image 1". */}
          <ImageSlot src={slots[0]} alt={`${topic} image 1`} />
          <ImageSlot src={slots[1]} alt={`${topic} image 2`} />
        </div>

        {/* The centre text column: first in the reading order on mobile (order-1), middle
            column on large screens, capped at 560px wide so the lines stay comfortable to read,
            centre-aligned, with a small gap between paragraphs. */}
        <div className="order-1 lg:order-2 flex-1 w-full max-w-[560px] mx-auto lg:mx-0 text-center flex flex-col justify-start gap-3">
          {/* Turn the array of paragraph strings into an array of <p> elements. React happily
              renders an array of elements as siblings. `.map` hands the callback each item
              (`paragraph`) plus its position (`i`). */}
          {paragraphs.map((paragraph, i) => (
            // `key` lets React tell list items apart between renders. The array index is only a
            // safe key because this list is static per topic - never reordered or filtered.
            <p
              key={i}
              className="hero-text text-base md:text-lg leading-relaxed text-pretty"
            >
              {/* The paragraph text itself. */}
              {paragraph}
            </p>
          ))}
        </div>

        {/* Right-hand image pair. It is last in the source and has order-3, so it stays last on
            every screen size - the right column on desktop, the bottom block on mobile. */}
        <div className="order-3 grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:gap-6">
          {/* Slots 2 and 3 - the third and fourth files from the topic's folder. */}
          <ImageSlot src={slots[2]} alt={`${topic} image 3`} />
          <ImageSlot src={slots[3]} alt={`${topic} image 4`} />
        </div>
      </div>
    </section>
  )
}
