/**
 * src/app/page.tsx  —  the HOME PAGE
 *
 * WHAT THIS FILE IS
 * `page.tsx` is a reserved App Router filename meaning "this folder is a visitable page". Because this
 * file sits directly in `src/app` (the root of the routing tree), it is served at `/` — the home page
 * of the portfolio.
 *
 * WHEN NEXT.JS RENDERS IT
 * When someone visits the site root. The JSX returned here is dropped into the `{children}` slot of
 * `src/app/layout.tsx`, so the navigation bar and footer surround it automatically.
 *
 * CONCEPTS TO NOTICE
 * 1. This is a **Server Component**. There is no `"use client"` directive at the top, which is the App
 *    Router default, and it is what makes the rest of this file possible: Server Components run in
 *    Node.js on the server, so they may import Node built-ins like `fs` (file system) and `path`.
 *    A client component could never do this — there is no file system in a browser.
 * 2. Reading from disk to build props. `getTopicImages()` scans `public/HomeTopics/<Topic>/` for image
 *    files and returns a map of topic name to image URLs, which is handed to `<TopicSwitcher />`. This
 *    means new artwork can be added by dropping files into that folder — no code change needed.
 * 3. Anything inside `public/` is served from the site root, so the file
 *    `public/HomeTopics/Robotics/arm.png` is reachable in the browser at `/HomeTopics/Robotics/arm.png`.
 *    That correspondence is why the paths built below start with a single leading slash. Those URL
 *    strings are what a component feeds to `next/image`'s `<Image src=... />`, which is Next.js's
 *    drop-in replacement for `<img>`: it resizes and re-encodes the file, serves modern formats like
 *    WebP, and lazy-loads off-screen images, but it requires width/height (or `fill`) so the browser can
 *    reserve space and avoid the page jumping around as pictures load.
 * 4. Composition: the page itself has almost no markup. It just stacks section components separated by
 *    horizontal rules.
 */

// Node's built-in file-system module, used here to list directory contents. Importing it is only legal
// because this file is a Server Component; it would fail to bundle inside a `"use client"` file.
import fs from "fs"
// Node's path helper. Use it instead of gluing strings with "/" so the code is correct on Windows,
// macOS, and Linux, and so `..` segments are resolved safely.
import path from "path"
// The three visible sections of the home page. `@/` is the TypeScript path alias for `src/`.
import { HeroSection } from "@/components/hero-section"
import { AchievementsSection } from "@/components/achievements-section"
import { TopicSwitcher } from "@/components/topic-switcher"
// DISABLED: this import is commented out along with the `<SongQuoteSection />` usage further down, so
// that section is currently switched off. Uncomment both together to bring it back.
// import { SongQuoteSection } from "@/components/song-quote-section"

// A regular expression matching filenames that end in a known image extension. Reading it piece by
// piece: `\.` a literal dot, `(png|jpe?g|...)` one of the listed extensions where `e?` makes the "e" in
// "jpeg" optional so both `.jpg` and `.jpeg` match, `$` anchors it to the end of the name, and the
// trailing `i` flag makes the whole test case-insensitive so `.PNG` matches too.
const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|avif|svg)$/i

// Scan `public/HomeTopics` and build a lookup of topic folder name to the list of image URLs inside it.
// The TypeScript return type `Record<string, string[]>` means "an object whose keys are strings and
// whose values are arrays of strings" — e.g. `{ Robotics: ["/HomeTopics/Robotics/arm.png"] }`.
function getTopicImages(): Record<string, string[]> {
  // `process.cwd()` is the directory the Node process was started from, which for Next.js is the project
  // root. Joining from there gives an absolute path to the folder on disk.
  const baseDir = path.join(process.cwd(), "public", "HomeTopics")
  // Start with an empty object and fill it in as each topic folder is processed.
  const result: Record<string, string[]> = {}

  // Wrap all the disk access in a `try` so a missing or unreadable folder cannot crash the page render.
  try {
    // List the entries in `HomeTopics`. `withFileTypes: true` makes `readdirSync` return `Dirent`
    // objects (which know whether they are a file or a folder) instead of plain name strings.
    const topicDirs = fs
      .readdirSync(baseDir, { withFileTypes: true })
      // Keep only the sub-folders; each folder is one topic. Stray files like `.DS_Store` are dropped.
      .filter((entry) => entry.isDirectory())

    // Visit each topic folder in turn.
    for (const topicDir of topicDirs) {
      // Absolute path to this one topic's folder, e.g. `<project>/public/HomeTopics/Robotics`.
      const topicPath = path.join(baseDir, topicDir.name)
      // Read the filenames inside it, keep only images, and sort alphabetically so the order shown in
      // the UI is stable and predictable rather than whatever order the file system happens to return.
      const files = fs
        .readdirSync(topicPath)
        .filter((file) => IMAGE_EXTENSIONS.test(file))
        .sort()
      // Convert each filename into the public URL the browser can actually request, and store the list
      // under the topic's folder name. Note the folder name doubles as the key, so renaming a folder
      // renames the topic in the UI.
      result[topicDir.name] = files.map(
        (file) => `/HomeTopics/${topicDir.name}/${file}`
      )
    }
    // A `catch` with no parameter (allowed in modern JavaScript) means "handle the error but ignore its
    // details". Here the recovery is simply to leave `result` as-is.
  } catch {
    // No images available yet; topic switcher falls back to placeholders.
  }

  // Either the populated map, or an empty object if the scan failed.
  return result
}

// The default export is what Next.js renders for the `/` route. The name `Home` is only for humans.
export default function Home() {
  // Because this component runs on the server, it can call the disk-reading helper directly — no
  // `useEffect`, no loading spinner, no API round-trip. The scan happens while the HTML is being built,
  // so the browser receives a page that already knows the image list.
  const topicImages = getTopicImages()

  return (
    // `<>...</>` is a **Fragment**: a wrapper that satisfies JSX's "return exactly one root element"
    // rule without adding a real `<div>` to the DOM. Useful here because the layout already provides
    // the surrounding `<main>`, and an extra div could interfere with spacing.
    <>
      {/* Top-of-page hero. Note that the video-clip hero variant that used `/api/videos` is currently
          commented out inside the hero component itself. */}
      <HeroSection />
      {/* A divider line. The `id` gives it an anchor target so links like `/#hero-divider` can scroll
          here, which works smoothly thanks to `scroll-smooth` on `<html>` in the layout. The Tailwind
          classes cap the width at 1100px, center it with automatic side margins, and draw a 2px top
          border in the theme's border color. */}
      <hr id="hero-divider" className="max-w-[1100px] mx-auto border-t-2 border-border" />
      {/* The awards / accomplishments section. */}
      <AchievementsSection />
      {/* Same divider styling as above, this one without an anchor id. */}
      <hr className="max-w-[1100px] mx-auto border-t-2 border-border" />
      {/* Pass the disk-scan results down as a prop. Server Components can hand plain, serializable data
          (strings, numbers, arrays, plain objects) like this to client components; functions and class
          instances cannot cross that boundary. */}
      <TopicSwitcher topicImages={topicImages} />
      {/* DISABLED BELOW: the next two lines are an existing JSX comment, so the divider and the song
          quote section are not rendered. Leave them as they are unless you want that section back —
          re-enabling it also requires uncommenting the `SongQuoteSection` import at the top. */}
      {/* <hr className="max-w-[1100px] mx-auto border-t-2 border-border" />
      <SongQuoteSection /> */}
    </>
  )
}
