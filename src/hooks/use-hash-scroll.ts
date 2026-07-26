"use client"

import { useEffect } from "react"

/**
 * Scrolls to the element matching `window.location.hash` after mount.
 * Needed because client-rendered grids may not have anchors in the DOM
 * when the browser's built-in hash jump fires on cross-page navigation.
 */
export function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    const scrollToHash = () => {
      const el = document.getElementById(decodeURIComponent(hash))
      if (el) {
        el.scrollIntoView()
        return true
      }
      return false
    }

    if (scrollToHash()) return

    // Retry once after paint in case the grid hasn't rendered yet.
    const frame = requestAnimationFrame(() => {
      if (!scrollToHash()) {
        // One more short retry for slower mounts.
        setTimeout(scrollToHash, 50)
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [])
}
