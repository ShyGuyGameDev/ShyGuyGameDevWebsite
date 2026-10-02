import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BASE, contact } from "../data"
import { ContactLinks } from "../_components/contact-links"

export const metadata: Metadata = {
  title: "About",
  description: "Who ShyGuy is and what he works on.",
}

const inlineLink =
  "text-(--v2-text) underline decoration-(--v2-accent)/50 underline-offset-4 transition-colors hover:text-(--v2-accent) hover:decoration-(--v2-accent)"

export default function V2About() {
  return (
    <div className="mx-auto max-w-[720px] px-6 pb-24 pt-16 sm:pt-20">
      <h1 className="text-4xl font-semibold tracking-tight">About</h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-(--v2-text)/80">
        <p>
          ShyGuy is a high school student developer. Video games started it all: he got hooked on playing them,
          then taught himself to build them in Scratch, Pygame, p5.js, Unity, and Godot. The name is a nod to the
          Mario character.
        </p>
        <p>
          In 2025 he moved toward apps with real use cases, starting with{" "}
          <Link href={`${BASE}/work/open-stage`} className={inlineLink}>
            Open Stage
          </Link>
          , and toward robotics, where he now spends most of his time on computer vision and spatial intelligence.
        </p>
        <p>
          He also teaches when he can. In 2026 he spoke to Cumberland Elementary&apos;s after-school robotics
          program about building his{" "}
          <Link href={`${BASE}/work/robotic-dog`} className={inlineLink}>
            computer vision robot
          </Link>
          , and now teaches at{" "}
          <a href="https://streetcode.org/" target="_blank" rel="noopener noreferrer" className={inlineLink}>
            StreetCode
          </a>{" "}
          where he mentors students aged 13-70 yrs old on AI projects.
        </p>
      </div>

      <section
        aria-labelledby="empty-console-title"
        className="mt-14 rounded-2xl border border-(--v2-border) bg-(--v2-surface) p-6"
      >
        <h2 id="empty-console-title" className="text-lg font-semibold tracking-tight">
          Empty Console
        </h2>
        <p className="mt-2 leading-relaxed text-(--v2-muted)">
          ShyGuy cofounded Empty Console with HF_ang and Emey. They started by making games together and now
          compete in hackathons and ship apps. He leads product, strategy, marketing, and communications.
        </p>
        <a
          href={contact.emptyConsole}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-(--v2-accent) hover:underline hover:underline-offset-4"
        >
          emptyconsole.com
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </section>

      <section aria-label="Contact" className="mt-14">
        <p className="text-(--v2-muted)">Questions, collaborations, or just want to talk games and robots?</p>
        <div className="mt-5">
          <ContactLinks />
        </div>
      </section>
    </div>
  )
}
