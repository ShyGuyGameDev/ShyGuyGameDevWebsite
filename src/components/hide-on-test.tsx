/**
 * hide-on-test.tsx
 *
 * Renders the previous site's navigation and footer only under `/old-view`. The portfolio
 * at the site root draws its own header and footer, so these stay out of the way there.
 */

"use client"

import type React from "react"
import { usePathname } from "next/navigation"

export function HideOnTest({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const onOldSite = pathname === "/old-view" || pathname?.startsWith("/old-view/")
  if (!onOldSite) return null
  return <>{children}</>
}
