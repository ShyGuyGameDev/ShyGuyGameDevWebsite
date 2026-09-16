/**
 * src/app/layout.tsx  —  the ROOT LAYOUT
 *
 * WHAT THIS FILE IS
 * `layout.tsx` is a reserved filename in the Next.js App Router. A layout wraps every page beneath it in
 * the folder tree. Because this one sits directly in `src/app`, it wraps *every* page on the site, and as
 * the root layout it is the one place allowed (and required) to render the `<html>` and `<body>` tags.
 *
 * WHEN NEXT.JS RENDERS IT
 * On every request/render for every route. Next.js renders this component and passes the matching page
 * (for example `src/app/projects/page.tsx`) in as the `children` prop. A key benefit: when you navigate
 * from `/` to `/projects`, React swaps only the `children` — the layout itself does not re-mount, so the
 * navigation bar keeps its state and does not flicker.
 *
 * CONCEPTS TO NOTICE
 * 1. Server Component by default. There is no `"use client"` directive at the top of this file, so this
 *    code runs on the server. That is what lets it read `process.env` values (see `getSiteUrl` below)
 *    without leaking server secrets into the browser bundle. A file that *does* start with `"use client"`
 *    is instead sent to the browser so it can use `useState`, event handlers, and other browser APIs.
 * 2. The `metadata` export. Instead of hand-writing `<title>` and `<meta>` tags, you export a plain
 *    object and Next.js turns it into the correct `<head>` tags for you.
 * 3. `next/font` (`Inter` below) self-hosts the Google font at build time — no runtime request to Google,
 *    which is faster and better for privacy.
 * 4. Composition: `<Navigation />`, `{children}`, `<Footer />` is the shared page skeleton for the site.
 */

// `import type` tells TypeScript "I only need this for type checking". The compiler erases these imports
// entirely, so they add nothing to the shipped JavaScript. `React.ReactNode` is used in the props type.
import type React from "react"
// The `Metadata` type describes the shape of the `metadata` object below, so your editor autocompletes
// the valid fields and flags typos like `openGrap` instead of `openGraph`.
import type { Metadata } from "next"
// `next/font/google` downloads and self-hosts Google Fonts at build time. Importing `Inter` here gives a
// function that generates the CSS needed to use that font.
import { Inter } from "next/font/google"
// Vercel Analytics: a tiny script that records anonymous page-view counts when the site is deployed
// on Vercel. The `/next` entry point is the version built specifically for Next.js.
import { Analytics } from "@vercel/analytics/next"
// The site-wide navigation bar and footer. `@/` is a path alias for `src/`, configured in `tsconfig.json`.
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
// Importing a CSS file for its side effects. This global stylesheet (Tailwind's base layers plus custom
// CSS variables such as `--background` and `--border`) must be imported in the root layout so the styles
// apply everywhere. Global CSS can only be imported from a layout, not from an arbitrary component.
import "./globals.css"

// Configure the Inter font once, at module scope, so it is set up a single time rather than per render.
const inter = Inter({
  // Only bundle the Latin character set. Skipping Cyrillic/Greek/etc. keeps the font files small.
  subsets: ["latin"],
  // Instead of a class that sets `font-family` directly, expose the font through a CSS custom property
  // named `--font-inter`. `globals.css` / the Tailwind config point `font-sans` at that variable, which
  // is why the `<body>` below applies both `inter.variable` and `font-sans`.
  variable: "--font-inter",
})

// The deployed URL of the site, used as the last-resort fallback when no environment variable is set.
const PRODUCTION_SITE_URL = "https://shy-guy-game-dev-website.vercel.app"

// Work out the absolute base URL of the site. This matters because social-sharing previews need
// *absolute* URLs — Discord, Twitter/X, and iMessage cannot resolve a relative path like `/logo.png`.
// The checks are ordered most-specific-first, so an explicit setting always wins.
function getSiteUrl() {
  // Environment variables are values supplied from outside the code (a `.env.local` file locally, or the
  // project settings on Vercel). Any variable whose name starts with `NEXT_PUBLIC_` is intentionally
  // exposed to the browser too; all others are server-only. So this is the manual override you can set.
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    // Strip a trailing slash so later string concatenation cannot produce a double slash (`site.com//x`).
    // In the regex `/\/$/`, the `\/` is an escaped forward slash and `$` anchors it to the end of string.
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }

  // Vercel automatically injects this one: the stable production domain of the project. Preferring it
  // means preview deployments still advertise the real production URL in their metadata.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    // These values arrive without a protocol (just `example.com`), so prefix `https://` by hand.
    // Backticks make a template literal, where `${...}` splices a value into the string.
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Also injected by Vercel: the URL of *this specific deployment*, including preview deployments.
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Nothing was configured (for example when running `npm run dev` with no `.env.local`), so fall back
  // to the hard-coded production URL declared above.
  return PRODUCTION_SITE_URL
}

// Run the lookup once when the module first loads, rather than on every request.
const siteUrl = getSiteUrl()
// The absolute URL of the image used in link previews. It lives at `public/shyguy-gamedev-logo.png`;
// anything inside `public/` is served from the site root, so the file path maps to this URL path.
const ogImage = `${siteUrl}/shyguy-gamedev-logo.png`
// One shared description string, reused for the plain `<meta name="description">`, the Open Graph
// description, and the Twitter description below. Defining it once keeps the three copies in sync.
const siteDescription =
  "Student developer building games, apps, and robotics, speaking at debate tournaments, leading model United Nations conferences, teaching other students, and building his own startup."

// Exporting a variable named exactly `metadata` from a layout or page is a Next.js convention: the
// framework reads this object and generates the matching `<title>`, `<meta>`, and `<link>` tags in
// `<head>`. Defined in the root layout, these values become the defaults for every page, and an
// individual `page.tsx` can export its own `metadata` to override them.
export const metadata: Metadata = {
  // `metadataBase` is the base URL Next.js uses to turn any *relative* metadata path into an absolute
  // one. Without it, Next.js warns during the build and social crawlers may fail to load the preview
  // image. `new URL(...)` is the built-in browser/Node class for parsing a URL string.
  metadataBase: new URL(siteUrl),
  // The browser tab title, and the default title for search results.
  title: "ShyGuy",
  // The one- or two-sentence summary search engines show under the title.
  description: siteDescription,
  // Favicons. All three point at the same logo file: `icon` is the browser tab icon, `shortcut` is the
  // legacy `.ico`-style hint for older browsers, and `apple` is the icon iOS uses when someone adds the
  // site to their home screen. These paths are relative to `public/`.
  icons: {
    icon: "/shyguy-gamedev-logo.png",
    shortcut: "/shyguy-gamedev-logo.png",
    apple: "/shyguy-gamedev-logo.png",
  },
  // OPEN GRAPH: the shared standard (originally from Facebook) that decides what a link to this site
  // looks like when pasted into Discord, Slack, iMessage, LinkedIn, and so on — the little card with a
  // title, blurb, and thumbnail. Each key here becomes an `<meta property="og:...">` tag.
  openGraph: {
    // `og:type` describes the kind of content. "website" is right for a portfolio; a blog post would
    // use "article" instead.
    type: "website",
    // The name of the overall site, which chat apps often show above or beside the card title.
    siteName: "ShyGuy",
    // The headline and blurb shown on the preview card.
    title: "ShyGuy",
    description: siteDescription,
    // The preview thumbnail(s). This is an array because you are allowed to offer several images and
    // let the crawler pick; here there is just one.
    images: [
      {
        // Must be an absolute URL, which is exactly why `ogImage` was built from `siteUrl` above.
        url: ogImage,
        // Telling crawlers the exact pixel dimensions up front lets them lay out the card without
        // downloading the image first. 576x576 is square, so most apps render a small square thumbnail.
        width: 576,
        height: 576,
        // Alt text, used by screen readers and shown if the image fails to load.
        alt: "ShyGuy Game Dev logo",
      },
    ],
  },
  // TWITTER CARDS: Twitter/X's own variant of the same idea. It falls back to the Open Graph tags when
  // these are missing, but specifying them lets you control the card layout explicitly.
  twitter: {
    // "summary_large_image" requests the big banner-style card instead of the small thumbnail one.
    // Worth knowing: a large-image card is designed for a wide (roughly 2:1) picture, while the logo
    // referenced below is square, so X may crop or letterbox it.
    card: "summary_large_image",
    title: "ShyGuy",
    description: siteDescription,
    // The Twitter variant takes a simple array of URL strings rather than objects.
    images: [ogImage],
  },
}

// The root layout component itself. Next.js calls it with a props object and destructures-friendly
// shape; here `{ children }` is pulled straight out of that object in the parameter list.
export default function RootLayout({
  children,
  // `Readonly<{...}>` is a TypeScript utility type that marks every property as read-only, documenting
  // that the layout should never reassign its props. `React.ReactNode` means "anything React can
  // render": JSX elements, strings, numbers, arrays of those, `null`, and so on.
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // The root layout is the only file that renders `<html>` and `<body>`. `lang="en"` tells browsers,
    // screen readers, and translation tools the page is in English. Tailwind's `scroll-smooth` sets
    // `scroll-behavior: smooth`, so jumping to an anchor such as `#hero-divider` animates instead of
    // snapping instantly.
    <html lang="en" className="scroll-smooth">
      {/*
        `suppressHydrationWarning` silences React's warning when the server-rendered HTML and the first
        client render of this element differ slightly. Hydration is the step where React attaches its
        event listeners to the already-delivered HTML; browser extensions and theme scripts commonly
        tweak `<body>` before that happens, and this flag stops the resulting noise in the console.

        The `className` uses a template literal so two things combine: `inter.variable` (the class that
        defines the `--font-inter` CSS variable), `font-sans` (the Tailwind utility that *consumes* that
        variable), and `antialiased` (smoother font rendering).
      */}
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased`}>
        {/* Shared header/nav, rendered above every page because it lives in the layout. */}
        <Navigation />
        {/* `<main>` is the semantic landmark for a page's primary content, which helps screen readers.
            `min-h-screen` keeps it at least as tall as the viewport so the footer never floats up on
            short pages; `bg-background` uses the theme color variable from `globals.css`. */}
        <main className="min-h-screen bg-background">
          {/* THE SLOT: whichever `page.tsx` matched the current URL gets rendered right here. */}
          {children}
        </main>
        {/* Shared footer, likewise present on every route. */}
        <Footer />
        {/* Mounts the Vercel Analytics tracking script. It renders no visible markup. */}
        <Analytics />
      </body>
    </html>
  )
}
