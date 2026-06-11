import fs from "fs"
import path from "path"
import Image from "next/image"
import { HeroSection } from "@/components/hero-section"
import { TopicSwitcher } from "@/components/topic-switcher"
import { SongQuoteSection } from "@/components/song-quote-section"

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|avif|svg)$/i

function getTopicImages(): Record<string, string[]> {
  const baseDir = path.join(process.cwd(), "public", "HomeTopics")
  const result: Record<string, string[]> = {}

  try {
    const topicDirs = fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())

    for (const topicDir of topicDirs) {
      const topicPath = path.join(baseDir, topicDir.name)
      const files = fs
        .readdirSync(topicPath)
        .filter((file) => IMAGE_EXTENSIONS.test(file))
        .sort()
      result[topicDir.name] = files.map(
        (file) => `/HomeTopics/${topicDir.name}/${file}`
      )
    }
  } catch {
    // No images available yet; topic switcher falls back to placeholders.
  }

  return result
}

export default function Home() {
  const topicImages = getTopicImages()

  return (
    <>
      <div className="absolute left-[-9999px] w-[1200px] h-[630px] opacity-0 pointer-events-none">
        <Image
          src="/BetterShyGuyGameDevLogo.png"
          alt="Empty Console Logo"
          width={1200}
          height={630}
          priority
          unoptimized
        />
      </div>
      <HeroSection />
      <hr id="hero-divider" className="max-w-[1100px] mx-auto border-t-2 border-border" />
      <TopicSwitcher topicImages={topicImages} />
      <hr className="max-w-[1100px] mx-auto border-t-2 border-border" />
      <SongQuoteSection />
    </>
  )
}
