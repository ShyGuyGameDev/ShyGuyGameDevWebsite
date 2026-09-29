/**
 * hide-on-test.tsx
 *
 * Renders its children everywhere except under `/test`, where the v2 portfolio draws its own
 * header and footer. The root layout wraps the old `<Navigation />` and `<Footer />` in this so
 * they do not stack on top of the new design.
 */

"use client"

import type React from "react"
import { usePathname } from "next/navigation"

export function HideOnTest({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === "/test" || pathname?.startsWith("/test/")) return null
  return <>{children}</>
}
