"use client"

import { useEffect } from "react"

const SELECTOR = ".t3 [data-reveal]:not(.is-in), .t3 [data-shutter]:not(.is-in)"

/**
 * Plays each `[data-reveal]` and `[data-shutter]` entrance once, as its element enters the
 * viewport. Pages stream in after the layout mounts and change on client navigation, so new
 * elements are picked up as they are added to the document.
 */
export function Reveal() {
  useEffect(() => {
    const watched = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-in")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    )
    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (watched.has(el)) return
        watched.add(el)
        observer.observe(el)
      })
    }
    scan()
    const added = new MutationObserver(scan)
    added.observe(document.body, { childList: true, subtree: true })
    return () => {
      added.disconnect()
      observer.disconnect()
    }
  }, [])

  return null
}
