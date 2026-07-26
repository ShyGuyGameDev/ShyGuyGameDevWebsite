"use client"

import { useState, useEffect, useRef, type MouseEvent } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PROJECT_TAG_ORDER, POST_TAG_ORDER, tagToSlug } from "@/lib/utils"

type NavLink = {
  href: string
  label: string
  sections?: readonly string[]
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects", sections: PROJECT_TAG_ORDER },
  { href: "/posts", label: "Posts & Media Mentions", sections: POST_TAG_ORDER },
  { href: "/team", label: "Empty Console" },
]

const linkClassName = (isActive: boolean) =>
  `text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-3 -mx-1 -my-4 py-4 h-full block ${
    isActive
      ? "text-accent"
      : "text-secondary hover:bg-gray-200 dark:hover:bg-gray-800"
  }`

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const handleMenuEnter = (href: string) => {
    clearCloseTimer()
    setOpenMenu(href)
  }

  const handleMenuLeave = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null)
    }, 150)
  }

  const handleTopLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpenMenu(null)
    if (pathname === href) {
      event.preventDefault()
      window.scrollTo({ top: 0 })
      window.history.replaceState(null, "", href)
    }
  }

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    slug: string,
  ) => {
    setOpenMenu(null)
    setIsOpen(false)
    if (pathname === href) {
      event.preventDefault()
      document.getElementById(slug)?.scrollIntoView()
      window.history.replaceState(null, "", `${href}#${slug}`)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card shadow-sm" : "bg-card"
      }`}
    >
      <nav className="max-w-[1100px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-3 -mx-3 -my-4 py-4 h-full"
          >
            <Image
              src="/BetterShyGuyGameDevLogo.png"
              alt="Empty Console Logo"
              width={32}
              height={32}
              className="object-contain"
              unoptimized
            />
            ShyGuy
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const hasSections = Boolean(link.sections?.length)
              const isMenuOpen = openMenu === link.href

              if (!hasSections) {
                return (
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
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(link.href)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={link.href}
                    className={`${linkClassName(isActive)} inline-flex items-center gap-1`}
                    aria-haspopup="menu"
                    aria-expanded={isMenuOpen}
                    onClick={(event) => handleTopLinkClick(event, link.href)}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </Link>

                  {isMenuOpen && (
                    <div className="absolute left-0 top-full pt-4">
                      <ul
                        role="menu"
                        className="min-w-56 rounded-md border border-border bg-card shadow-lg py-2"
                      >
                        {link.sections!.map((section) => {
                          const slug = tagToSlug(section)
                          return (
                            <li key={section} role="none">
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
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <ul className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <li key={link.href}>
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
                  {link.sections && link.sections.length > 0 && (
                    <ul className="mt-2 ml-4 flex flex-col gap-2 border-l border-border pl-3">
                      {link.sections.map((section) => {
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
