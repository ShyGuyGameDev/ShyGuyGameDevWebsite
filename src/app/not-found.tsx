/**
 * src/app/not-found.tsx  —  the 404 PAGE
 *
 * WHAT THIS FILE IS
 * `not-found.tsx` is another reserved App Router filename. Unlike `page.tsx` it is not tied to a URL you
 * can type; Next.js renders it automatically as the fallback UI when no route matches, and also when
 * server code explicitly calls the `notFound()` function from `next/navigation`. Placed here in
 * `src/app`, it is the catch-all 404 for the whole site.
 *
 * WHEN NEXT.JS RENDERS IT
 * Any time a visitor lands on a URL that does not exist, such as `/projcts` (a typo) or an old link that
 * has been removed. Next.js also sends the correct HTTP 404 status code alongside it, which matters so
 * search engines do not index the mistyped URL as a real page.
 *
 * CONCEPTS TO NOTICE
 * 1. Still a **Server Component** (no `"use client"` directive), so it renders to static HTML. Nothing
 *    on this page needs browser state — it is just text and one link.
 * 2. `next/link` versus a plain `<a>`: `<Link>` performs a *client-side* navigation, swapping the page
 *    content in React without a full browser reload, and prefetches the destination when the link
 *    scrolls into view. That is why internal links on the site should always use `<Link>`.
 * 3. The `asChild` prop on `<Button>` (see below) is a composition trick worth understanding.
 * 4. WORTH KNOWING: this file renders `<Navigation />`, `<main>`, and `<Footer />` itself, but the root
 *    layout in `src/app/layout.tsx` already wraps everything in those. That means the 404 page ends up
 *    with two navigation bars, two footers, and nested `<main>` elements. It is left as-is here, but it
 *    is the kind of duplication worth looking at.
 */

// The Next.js link component for internal navigation (see concept 2 above).
import Link from "next/link"
// A reusable styled button from the local UI kit (this project uses shadcn/ui-style components that
// live in the repo rather than in `node_modules`, so you can read and edit them).
import { Button } from "@/components/ui/button"
// The shared navigation bar and footer components.
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

// The default export is the component Next.js renders for the not-found case.
export default function NotFound() {
  return (
    // `min-h-screen` makes this fill at least the full viewport height so the footer sits at the bottom
    // even though there is very little content; `bg-background` is the theme background color variable.
    <main className="min-h-screen bg-background">
      <Navigation />
      {/* The centering wrapper. `flex flex-col` stacks children vertically, then `items-center` centers
          them horizontally and `justify-center` centers them vertically within the available height.
          `min-h-[calc(100vh-200px)]` is Tailwind arbitrary-value syntax: full viewport height minus
          roughly the 200px taken by the nav and footer, so the message lands in the optical center.
          `px-6` adds horizontal padding so text never touches the screen edge on phones. */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Center the text and cap the line length at Tailwind's `2xl` width (42rem) so paragraphs stay
            comfortable to read on wide monitors. */}
        <div className="text-center max-w-2xl">
          {/* The big "404". The `md:` prefix is a responsive breakpoint: the text is `6xl` on small
              screens and jumps to `8xl` once the viewport is at least medium width. */}
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          {/* The human-readable explanation of the 404, again scaling up at the `md` breakpoint. */}
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Page Not Found</h2>
          {/* Supporting sentence, in the muted secondary text color with a larger bottom margin (`mb-8`)
              to separate it from the button. */}
          <p className="text-lg text-muted-foreground mb-8">
            {/* `&apos;` is the HTML entity for an apostrophe. It is used instead of a raw `'` because
                React's lint rules flag unescaped quotes in JSX text; the rendered output is identical. */}
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          {/* `asChild` tells `<Button>` not to render its own `<button>` element, and instead to apply
              its styling to the single child element it was given. The result is a real `<a>` tag from
              `<Link>` that *looks* like a button — which keeps it a proper, right-clickable,
              keyboard-accessible link rather than a button faking navigation. `size="lg"` picks the
              large size variant. */}
          <Button asChild size="lg">
            {/* `href="/"` sends the visitor back to the home page. */}
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}

