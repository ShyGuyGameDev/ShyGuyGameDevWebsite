import Image from "next/image"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <>
      <div className="absolute left-[-9999px] w-[1200px] h-[630px] opacity-0 pointer-events-none">
        <Image
          src="/BetterEmptyConsoleLogo.png"
          alt="Empty Console Logo"
          width={1200}
          height={630}
          priority
          unoptimized
        />
      </div>
      <HeroSection />
    </>
  )
}
