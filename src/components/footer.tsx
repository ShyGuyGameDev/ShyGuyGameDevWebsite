/**
 * footer.tsx
 *
 * The dark bar at the very bottom of every page. It shows the Empty Console logo next to
 * the "ShyGuy" handle on the left, and two contact details on the right: the email address
 * shyguygamedev@gmail.com (a real clickable mail link) and the Discord handle shyguygamedev
 * (plain text, since Discord usernames are not links).
 *
 * This component is rendered once per page, usually as the last child of the page layout.
 *
 * Concepts to notice:
 *  - There is no `"use client"` at the top. Nothing here uses state, effects, or event
 *    handlers, so it stays a Server Component: Next.js renders it to HTML on the server
 *    and ships zero JavaScript for it. Keeping components server-side when possible is
 *    what makes a Next.js site fast.
 *  - `next/image` and its `unoptimized` prop.
 *  - JSX comments, which must be wrapped in braces and slash-star when they sit among JSX
 *    children, because bare double-slash comments would be rendered as literal text.
 *  - Accessibility: `aria-hidden="true"` on purely decorative icons, and `focus-visible`
 *    styles so keyboard users can see where they are.
 *  - Tailwind's responsive prefixes (`md:`, `sm:`) which apply a style only at or above a
 *    given screen width, which is how this footer restacks itself on phones.
 */

// `lucide-react` is an icon library. Each icon is just a React component that renders an
// <svg>, so it inherits text colour and can be sized with Tailwind height/width classes.
import { Mail } from "lucide-react"
// Next.js's own image component. It renders an <img> but adds automatic sizing, lazy
// loading, and (normally) on-the-fly resizing/format conversion of the source file.
import Image from "next/image"

// A plain function component: no props, no state, it just returns JSX.
// `export` (not `export default`) means it is imported by name: `import { Footer } from ...`.
export function Footer() {
  return (
    // The semantic <footer> element tells screen readers and search engines this is
    // page-footer content. `py-12` is vertical padding; `bg-primary`/`text-primary-foreground`
    // are theme colour tokens defined in the project's Tailwind/CSS variables, so the footer
    // automatically flips colours in dark mode instead of hard-coding black and white.
    <footer className="py-12 bg-primary text-primary-foreground">
      {/* Centering wrapper: cap the content at 1100px wide, centre it with `mx-auto`,
          and keep 1.5rem of side padding so text never touches the screen edge. */}
      <div className="max-w-[1100px] mx-auto px-6">
        {/* The main row. On small screens `flex-col` stacks the two groups vertically and
            centres them; at the `md` breakpoint and up `md:flex-row` puts them side by side
            with `justify-between` pushing them to opposite ends. `gap-6` spaces them. */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* An old copyright line, kept commented out in case it is wanted again later.
              Commented-out JSX like this is inert: React never sees it. */}
          {/* <p className="text-sm">© 2025 Empty Console</p> */}
          {/* Left-hand group: the small logo and the handle, laid out in a row with an
              8px gap and vertically centred on each other. */}
          <div className="flex items-center gap-2">
            {/* The logo. `width`/`height` of 24 are required by next/image so it can reserve
                space in the layout before the file loads, which prevents the page from
                jumping around as images arrive. `object-contain` keeps the whole logo
                visible inside that box instead of cropping it. `unoptimized` skips Next's
                image-optimization pipeline and serves the file from /public exactly as-is,
                which is what you want for a tiny already-optimized PNG (and it is required
                when a site is exported statically, where no image server exists). */}
            <Image
              src="/shyguy-gamedev-logo.png"
              alt="Empty Console Logo"
              width={24}
              height={24}
              className="object-contain"
              unoptimized
            />
            {/* The site owner's handle. `text-sm` is Tailwind's 0.875rem font size. */}
            <p className="text-sm">ShyGuy</p>
          </div>

          {/* Right-hand group: the two contact items. Stacked on the narrowest phones,
              side by side from the `sm` breakpoint up, with a wider gap once horizontal. */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {/* The email link. A `mailto:` href tells the browser to open the visitor's
                mail app with a new message to that address. The classes give it a hover
                colour change, and `focus:outline-none` plus `focus-visible:ring-2` swap the
                browser's default focus outline for a custom ring that only appears for
                keyboard focus, never on mouse clicks. Never remove a focus style without
                adding a replacement, or keyboard users lose track of where they are. */}
            <a
              href="mailto:shyguygamedev@gmail.com"
              className="flex items-center gap-2 text-sm hover:text-accent-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light rounded-sm px-1"
            >
              {/* The envelope icon, sized to 1rem square. `aria-hidden="true"` hides it from
                  screen readers because the address text right next to it already says
                  everything; announcing the icon too would just be noise. */}
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>shyguygamedev@gmail.com</span>
            </a>

            {/* The Discord handle. Deliberately a <div>, not an <a>, because a Discord
                username is not something you can link to directly. */}
            <div className="flex items-center gap-2 text-sm">
              {/* The Discord logo, hand-written as inline SVG rather than imported from an
                  icon library. `viewBox="0 0 24 24"` defines the drawing's internal
                  coordinate system, and `fill="currentColor"` makes the shape take on the
                  surrounding text colour so it matches the footer automatically.
                  The `d` attribute on the <path> below is the actual outline of the logo,
                  written in SVG path syntax as a long list of move/curve commands. It is
                  machine-generated: never hand-edit it, and never insert anything inside it. */}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              {/* The visible handle text, which is also what a screen reader reads out. */}
              <span>shyguygamedev</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
