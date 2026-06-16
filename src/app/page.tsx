import fs from "fs"
import path from "path"
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
      <HeroSection />
      <hr id="hero-divider" className="max-w-[1100px] mx-auto border-t-2 border-border" />
      <TopicSwitcher topicImages={topicImages} />
      <hr className="max-w-[1100px] mx-auto border-t-2 border-border" />
      <SongQuoteSection />
    </>
  )
}
