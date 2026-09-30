/**
 * Shell for the portfolio. It sits inside the root layout, which still renders <html>, <body>,
 * and <main>. The previous site's navigation and footer stay on `/old-view` only. Everything
 * under `.v2` picks up the dark palette from v2.css.
 */

import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { TopBar } from "./_components/top-bar"
import { SiteFooter } from "./_components/site-footer"
import "./v2.css"

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-v2-mono",
})

export const metadata: Metadata = {
  title: {
    default: "ShyGuy",
    template: "%s · ShyGuy",
  },
  description: "ShyGuy is a student developer building games, apps, and robots.",
}

export default function V2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`v2 ${mono.variable} flex min-h-screen flex-col`}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-(--v2-accent) focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-(--v2-bg)"
      >
        Skip to content
      </a>
      <TopBar />
      <div id="content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}
