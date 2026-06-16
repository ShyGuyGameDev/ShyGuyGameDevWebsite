import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const PRODUCTION_SITE_URL = "https://shy-guy-game-dev-website.vercel.app"

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return PRODUCTION_SITE_URL
}

const siteUrl = getSiteUrl()
const ogImage = `${siteUrl}/BetterShyGuyGameDevLogo.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ShyGuy",
  description:
    "Empty Console is a team of students who came together due to their love of programming. Explore our projects, meet the team, and see what we've built.",
  icons: {
    icon: "/BetterShyGuyGameDevLogo.png",
    shortcut: "/BetterShyGuyGameDevLogo.png",
    apple: "/BetterShyGuyGameDevLogo.png",
  },
  openGraph: {
    type: "website",
    siteName: "ShyGuy",
    title: "ShyGuy",
    description:
      "Empty Console is a team of students who came together due to their love of programming. Explore our projects, meet the team, and see what we've built.",
    images: [
      {
        url: ogImage,
        width: 576,
        height: 576,
        alt: "ShyGuy Game Dev logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShyGuy",
    description:
      "Empty Console is a team of students who came together due to their love of programming. Explore our projects, meet the team, and see what we've built.",
    images: [ogImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
