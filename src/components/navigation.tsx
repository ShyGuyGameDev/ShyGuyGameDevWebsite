/**
 * Navigation — the site-wide header bar, fixed to the top of every page (it is rendered once in the
 * root layout, so it appears above the content on the home page, /projects, /posts and /team).
 *
 * What it renders:
 *  - the "ShyGuy" logo on the left, which always links back to the home page,
 *  - on desktop, a row of top-level links; Projects and Posts each open a hover dropdown listing the
 *    sections on that page, built from the shared tag lists in src/lib/utils.ts,
 *  - on mobile, a hamburger button that toggles a stacked version of the same links, with each page's
 *    sections indented underneath it.
 *
 * Concepts a learner should notice in this file:
 *  - useState for the three independent pieces of UI state (mobile menu, scrolled flag, open dropdown),
 *  - useEffect with cleanup for the scroll and keyboard listeners, plus one effect that watches
 *    `pathname` so the menus close automatically after navigating,
 *  - useRef used here NOT for a DOM node but to remember a timeout id across renders,
 *  - usePathname to know which page is currently showing, so the active link can be highlighted,
 *  - next/link, which navigates without a full page reload,
 *  - deriving the nav from data (the navLinks array) instead of hard-coding each <li>,
 *  - accessibility attributes: aria-haspopup, aria-expanded, aria-hidden, aria-label, role="menu"
 *    and role="menuitem", which tell screen readers this is a menu and whether it is open.
 */

// Required because this component uses state, effects and browser APIs, so it must run in the browser.
"use client"

// `type MouseEvent` imports only a type. React's MouseEvent is its own synthetic-event type, distinct
// from the browser's global MouseEvent, and the `type` keyword makes clear nothing is imported at
// runtime — it disappears when TypeScript compiles.
import { useState, useEffect, useRef, type MouseEvent } from "react"
// usePathname returns the current URL path, e.g. "/projects".
import { usePathname } from "next/navigation"
// next/link renders an <a> but intercepts the click to do a fast client-side navigation, keeping React
// state alive and prefetching the target page. A plain <a href> would reload the whole document.
import Link from "next/link"
// lucide-react provides icons as React components: the dropdown chevron, and the hamburger/close icons.
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
// next/image optimises images (sizing, modern formats, lazy loading) instead of a raw <img>.
import Image from "next/image"
// The single source of truth for section names, shared with the Projects and Posts pages. Because both
// the pages and this menu read the same lists, the anchors can never drift out of sync.
import { PROJECT_NAV_SECTIONS, POST_TAG_ORDER, tagToSlug } from "@/lib/utils"

// The shape of one nav entry. `sections?` is optional, and `readonly string[]` matches the arrays in
// utils.ts, which are declared `as const` and therefore cannot be modified.
type NavLink = {
  href: string
  label: string
  sections?: readonly string[]
}

// The nav is described as data and rendered with .map below, so adding a page means adding one line
// here. Only entries with `sections` get a dropdown.
const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects", sections: PROJECT_NAV_SECTIONS },
  { href: "/posts", label: "Posts & Media Mentions", sections: POST_TAG_ORDER },
  { href: "/team", label: "Empty Console" },
]

// A helper that builds the class string for a top-level link. Sharing it means every link stays
// visually consistent, and the active one is highlighted in the accent colour.
// focus-visible:ring-* draws a focus ring only for keyboard users (not on mouse clicks), which is why
// removing the browser default with focus:outline-none is acceptable here.
// The negative margins (-mx-1, -my-4) paired with padding enlarge the clickable/hover area without
// pushing the neighbouring links apart.
const linkClassName = (isActive: boolean) =>
  `text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-3 -mx-1 -my-4 py-4 h-full block ${
    isActive
      ? "text-accent"
      : "text-secondary hover:bg-gray-200 dark:hover:bg-gray-800"
  }`

export function Navigation() {
  // Is the mobile hamburger menu expanded?
  const [isOpen, setIsOpen] = useState(false)
  // Has the user scrolled down at all? Used only to swap the header's shadow.
  const [isScrolled, setIsScrolled] = useState(false)
  // Which dropdown is open, stored as the href of its top-level link, or null for "none". Storing the
  // href rather than a boolean per menu means one piece of state can never show two menus at once.
  // The <string | null> type argument is needed because React cannot infer it from the initial null.
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  // A ref used as a plain instance variable, not for a DOM node: it remembers the pending "close the
  // dropdown" timeout so a later mouse-enter can cancel it. State would be wrong here, because storing
  // a timer id should never trigger a re-render.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // The current path, so the matching link can be highlighted and same-page clicks handled specially.
  const pathname = usePathname()

  // Effect: keep isScrolled in sync with the scroll position.
  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY is the pixels scrolled from the top; > 10 avoids flickering on tiny scrolls.
      // Passing the same boolean again is cheap: React skips the re-render if the value is unchanged.
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    // Cleanup: without removing the listener, every remount would add another one.
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
    // Runs once on mount, because the dependency array is empty.
  }, [])

  // Effect: close both menus whenever the URL path changes. Listing `pathname` as the dependency is
  // what makes this happen — the effect re-runs after each navigation. Without it, the mobile menu
  // would stay open covering the new page.
  useEffect(() => {
    setIsOpen(false)
    setOpenMenu(null)
  }, [pathname])

  // Effect: let the Escape key close an open dropdown, which keyboard users expect.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // event.key is the name of the key pressed, e.g. "Escape", "Enter", "a".
      if (event.key === "Escape") {
        setOpenMenu(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Effect: this one exists *only* for its cleanup. It sets nothing up on mount; on unmount it cancels
  // any pending close timer, so a timeout cannot fire and call setOpenMenu on a component that is gone.
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  // Cancel a scheduled close and forget the id. Resetting to null keeps the ref honest, so later checks
  // of closeTimer.current are not looking at a stale, already-fired timer.
  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  // Mouse entered a menu area: cancel any pending close first (the pointer may have re-entered during
  // the grace period), then open this menu.
  const handleMenuEnter = (href: string) => {
    clearCloseTimer()
    setOpenMenu(href)
  }

  // Mouse left the menu area: do NOT close immediately. The dropdown sits slightly below the link, so
  // an instant close would make it vanish while the pointer travels across the gap. A 150 ms delay
  // gives the pointer time to arrive, and handleMenuEnter cancels the timer when it does.
  const handleMenuLeave = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null)
    }, 150)
  }

  // Click on a top-level link (Home, Projects, ...).
  const handleTopLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpenMenu(null)
    // If this link points at the page already showing, navigating would be pointless.
    if (pathname === href) {
      // preventDefault stops the browser (and next/link) from handling the click at all...
      event.preventDefault()
      // ...and instead we just jump to the top of the current page.
      window.scrollTo({ top: 0 })
      // replaceState rewrites the address bar without navigating and without adding a history entry,
      // so the back button does not fill up with clicks that never actually changed the page.
      window.history.replaceState(null, "", href)
    }
  }

  // Click on a section link inside a dropdown, e.g. "Robotics" under Projects.
  // The parameters are split across lines purely for readability; `slug` is the id of the target
  // heading on that page, produced by tagToSlug (so "Media Mention" becomes "media-mention").
  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    slug: string,
  ) => {
    // Close the desktop dropdown and the mobile menu, since this handler serves both.
    setOpenMenu(null)
    setIsOpen(false)
    // Already on the right page, so scroll to the section instead of re-navigating to it.
    if (pathname === href) {
      event.preventDefault()
      // getElementById finds the section by its id; `?.` means nothing happens if no such id exists,
      // rather than crashing on null.
      document.getElementById(slug)?.scrollIntoView()
      // Keep the URL in step (e.g. /projects#robotics) so it can be copied and shared.
      window.history.replaceState(null, "", `${href}#${slug}`)
    }
  }

  return (
    // <header> and <nav> are semantic landmark elements: screen readers can jump straight to the
    // site navigation because of them. `fixed` with top/left/right 0 pins the bar to the top of the
    // window as the page scrolls, and z-50 keeps it above the page content.
    // The template literal adds a subtle shadow once scrolled, so the bar visually lifts off the page.
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card shadow-sm" : "bg-card"
      }`}
    >
      {/* Same 1100px max width as the page content, so the nav lines up with everything below it. */}
      <nav className="max-w-[1100px] mx-auto px-6 py-4">
        {/* Flexbox row: justify-between pushes the logo to the left edge and the links to the right. */}
        <div className="flex items-center justify-between">
          {/* The logo, which is both the picture and the word "ShyGuy" inside one link back home. */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-3 -mx-3 -my-4 py-4 h-full"
          >
            {/* next/image requires explicit width and height so the browser can reserve space and the
                page does not jump as the image loads. `unoptimized` opts this one out of Next.js's
                image pipeline and serves the file as-is. Files in /public are served from the site
                root, which is why the src starts with a single slash. */}
            <Image
              src="/shyguy-gamedev-logo.png"
              alt="Empty Console Logo"
              width={32}
              height={32}
              className="object-contain"
              unoptimized
            />
            ShyGuy
          </Link>

          {/* Desktop Navigation */}
          {/* Hidden on small screens, shown as a flex row from the md breakpoint up. A <ul> of <li>s is
              the correct markup for a list of navigation links. gap-8 spaces them evenly. */}
          <ul className="hidden md:flex items-center gap-8">
            {/* This .map callback uses a block body with `return`, rather than the short arrow form,
                because it needs local variables and two different return paths. */}
            {navLinks.map((link) => {
              // Is this the page currently being viewed?
              const isActive = pathname === link.href
              // Boolean(...) turns a possibly-undefined length into a real true/false. `?.length` is
              // undefined when there are no sections, and 0 is falsy, so an empty array counts as none.
              const hasSections = Boolean(link.sections?.length)
              // Compare the stored href against this link's href to see if its dropdown is the open one.
              const isMenuOpen = openMenu === link.href

              // Simple case: a link with no dropdown, so render just the link and stop here.
              if (!hasSections) {
                return (
                  // key is required on list items; the href is unique, so it makes a good key.
                  // The arrow wrapper is needed because the handler takes extra arguments: passing
                  // onClick={handleTopLinkClick} could not supply the href.
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={linkClassName(isActive)}
                      onClick={(event) => handleTopLinkClick(event, link.href)}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              }

              return (
                // `relative` makes this <li> the positioning context, so the absolutely positioned
                // dropdown below is placed relative to this link rather than the whole page.
                // The hover handlers live on the <li> — which contains both the link and the dropdown —
                // so moving the pointer down into the menu never counts as leaving.
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(link.href)}
                  onMouseLeave={handleMenuLeave}
                >
                  {/* The top-level link is still a real link to the page, so clicking "Projects" goes to
                      /projects even though hovering opens a menu.
                      aria-haspopup="menu" tells assistive tech that this control opens a menu, and
                      aria-expanded reports whether it is currently open — both are announced aloud. */}
                  <Link
                    href={link.href}
                    className={`${linkClassName(isActive)} inline-flex items-center gap-1`}
                    aria-haspopup="menu"
                    aria-expanded={isMenuOpen}
                    onClick={(event) => handleTopLinkClick(event, link.href)}
                  >
                    {link.label}
                    {/* The little arrow, flipped 180 degrees while the menu is open so it points up.
                        aria-hidden="true" hides it from screen readers: it is purely decorative, and
                        aria-expanded above already conveys the open/closed state. */}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Render the dropdown only while it is open; when false, React renders nothing and the
                      elements are removed from the page entirely. */}
                  {isMenuOpen && (
                    // top-full places this immediately below the link, left-0 aligns their left edges.
                    // The pt-4 padding is deliberate: it creates an *invisible but hoverable* bridge
                    // between the link and the visible panel, so the pointer never leaves the <li>.
                    <div className="absolute left-0 top-full pt-4">
                      {/* role="menu" tells assistive tech this list is a menu rather than ordinary
                          content, which changes how it is announced and navigated. */}
                      <ul
                        role="menu"
                        className="min-w-56 rounded-md border border-border bg-card shadow-lg py-2"
                      >
                        {/* The `!` is TypeScript's non-null assertion: it promises sections exists here.
                            That is true because hasSections was checked above, but the compiler cannot
                            follow that reasoning on its own. Use `!` sparingly — it silences the checker
                            rather than proving anything. */}
                        {link.sections!.map((section) => {
                          // Turn the display name into the matching element id on the target page.
                          const slug = tagToSlug(section)
                          return (
                            // role="none" strips the <li>'s default list semantics, because in a menu the
                            // announced item should be the link inside, not the list row around it.
                            <li key={section} role="none">
                              {/* The href is a real page-plus-anchor URL, so this still works if the user
                                  opens it in a new tab or lands on it from elsewhere; the click handler
                                  is only a smoother shortcut when already on that page.
                                  role="menuitem" marks it as one choice inside the role="menu" list;
                                  a menu is expected to contain menuitems, so the pair belong together. */}
                              <Link
                                href={`${link.href}#${slug}`}
                                role="menuitem"
                                className="block text-sm px-3 py-2 text-secondary hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                                onClick={(event) =>
                                  handleSectionClick(event, link.href, slug)
                                }
                              >
                                {section}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Mobile Menu Button */}
          {/* Visible only below the md breakpoint (md:hidden), the mirror image of the desktop <ul>.
              onClick flips isOpen with !isOpen. aria-label gives this icon-only button an accessible
              name, since there is no visible text to read, and aria-expanded reports whether the panel
              below is currently showing. */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {/* Swap the icon to match the action: an X to close, a hamburger to open. */}
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {/* Only mounted while the hamburger is open. md:hidden also hides it if the window is widened
            while it happens to be open. */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            {/* flex-col stacks the links vertically instead of in a row. */}
            <ul className="flex flex-col gap-4 pt-4">
              {/* The same navLinks array again, rendered a second way. This callback uses the concise
                  arrow form — `=> (` with no braces — because it returns one expression directly. */}
              {navLinks.map((link) => (
                <li key={link.href}>
                  {/* Bigger text than the desktop version for easier tapping; the active page is again
                      shown in the accent colour, computed inline here rather than via linkClassName. */}
                  <Link
                    href={link.href}
                    className={`block text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2 py-1 ${
                      pathname === link.href
                        ? "text-accent"
                        : "text-secondary hover:text-accent"
                    }`}
                    onClick={(event) => handleTopLinkClick(event, link.href)}
                  >
                    {link.label}
                  </Link>
                  {/* On mobile the sections are always shown indented under their page rather than in a
                      hover dropdown, since hovering does not exist on a touchscreen. Checking
                      `link.sections &&` first also narrows the type, so TypeScript knows it is defined
                      inside — no `!` needed here, unlike the desktop branch above. */}
                  {link.sections && link.sections.length > 0 && (
                    // The left border plus padding draws the vertical line that visually nests these
                    // items under their parent link.
                    <ul className="mt-2 ml-4 flex flex-col gap-2 border-l border-border pl-3">
                      {link.sections.map((section) => {
                        // Identical slug/href/handler logic to the desktop dropdown above. If you ever
                        // change how section links behave, remember to change it in both places.
                        const slug = tagToSlug(section)
                        return (
                          <li key={section}>
                            <Link
                              href={`${link.href}#${slug}`}
                              className="block text-sm text-secondary hover:text-accent transition-colors py-0.5"
                              onClick={(event) =>
                                handleSectionClick(event, link.href, slug)
                              }
                            >
                              {section}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
