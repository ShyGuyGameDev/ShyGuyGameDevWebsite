/**
 * Shell for the `/test` redesign. It reuses the live portfolio's content and sits inside the root
 * layout like `(portfolio)` does, but carries its own type, palette, header and footer under `.t3`.
 */

import type React from "react"
import type { Metadata } from "next"
import { TikTok_Sans } from "next/font/google"
import { Header } from "./_components/header"
import { Footer } from "./_components/footer"
import { Reveal } from "./_components/reveal"
import { VisitCard } from "./_components/visit-card"
import "./test.css"

const tiktok = TikTok_Sans({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--font-t3",
})

const noScript =
  ".t3 [data-reveal], .t3 [data-shutter] img, .t3 [data-load], .t3 .hero__half > span, .t3 .hero__frame { opacity: 1 !important; transform: none !important; clip-path: none !important; animation: none !important; }"

export const metadata: Metadata = {
  title: {
    default: "ShyGuy",
    template: "%s · ShyGuy",
  },
  description:
    "Student developer building games, apps, and robots. Currently exploring spatial intelligence and computer vision.",
  robots: { index: false, follow: false },
}

export default function TestLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`t3 ${tiktok.variable} relative flex min-h-screen flex-col`}>
      <noscript>
        <style>{noScript}</style>
      </noscript>
      <Header />
      <div className="flex-1">{children}</div>
      <VisitCard />
      <Footer />
      <Reveal />
    </div>
  )
}
