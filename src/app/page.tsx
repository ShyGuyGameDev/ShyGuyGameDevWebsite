import Image from "next/image"
import { HeroSection } from "@/components/hero-section"
import { TopicSwitcher } from "@/components/topic-switcher"
import { SongQuoteSection } from "@/components/song-quote-section"

export default function Home() {
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
      <TopicSwitcher />
      <hr className="max-w-[1100px] mx-auto border-t-2 border-border" />
      <SongQuoteSection />
    </>
  )
}
