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

export const metadata: Metadata = {
  title: "Empty Console",
  description:
    "Empty Console is a team of students who came together due to their love of programming. Explore our projects, meet the team, and see what we've built.",
  icons: {
    icon: "/BetterEmptyConsoleLogo.png",
    shortcut: "/BetterEmptyConsoleLogo.png",
    apple: "/BetterEmptyConsoleLogo.png",
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
