import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BASE, contact } from "../site"
import { CopyHandle } from "../_components/copy-handle"

export const metadata: Metadata = {
  title: "About",
  description: "Who ShyGuy is and what he works on.",
}

const githubUser = contact.github.split("/").filter(Boolean).pop() ?? contact.github

const team = [
  { name: "ShyGuy", src: "/team-shyguy.jpeg" },
  { name: "HF_ang", src: "/team-hfang.png" },
  { name: "Emey", src: "/team-emey.png" },
]

export default function TestAbout() {
  return (
    <div className="wrap t3-page-top">
      <h1 className="about-title display" data-reveal>
        About
      </h1>

      <div className="about-intro">
        <div className="about-intro__text">
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            ShyGuy is a high school student developer. Video games started it all: he got hooked on playing them,
            then taught himself to build them in Scratch, Pygame, p5.js, Unity, and Godot. The name is a nod to the
            Mario character.
          </p>
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            In 2025 he moved toward apps with real use cases, starting with{" "}
            <Link href={`${BASE}/work/open-stage`} className="link">
              Open Stage
            </Link>
            , and toward robotics, where he now spends most of his time on computer vision and spatial intelligence.
          </p>
          <p data-reveal style={{ "--i": 3 } as React.CSSProperties}>
            He also teaches when he can. In 2026 he spoke to Cumberland Elementary&apos;s after-school robotics
            program about building his{" "}
            <Link href={`${BASE}/work/robotic-dog`} className="link">
              computer vision robot
            </Link>
            , and now teaches at{" "}
            <a href="https://streetcode.org/" target="_blank" rel="noopener noreferrer" className="link">
              StreetCode
            </a>{" "}
            where he mentors students aged 13-70 yrs old on AI projects.
          </p>
        </div>
        <figure className="about-intro__picture">
          <div className="frame" data-shutter>
            <Image
              src="/evodyne-robotic-dog.png"
              alt="The legged robotic dog, version two"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </figure>
      </div>

      <section className="team" aria-labelledby="empty-console-title">
        <div className="team__title">
          <h2 id="empty-console-title" className="display" data-reveal>
            Empty Console
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            ShyGuy cofounded Empty Console with HF_ang and Emey. Later, automagicle also joined the team. They
            started by making games together and now compete in hackathons and develop apps. He leads product,
            strategy, marketing, and communications.
          </p>
          <a
            href={contact.emptyConsole}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
          >
            emptyconsole.com
          </a>
        </div>
        <ul className="team__people">
          {team.map((person) => (
            <li key={person.name} className="team__person" data-reveal>
              <div className="frame">
                <Image src={person.src} alt="" fill sizes="(min-width: 1024px) 440px, 72vw" />
              </div>
              <p className="team__name">{person.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Contact" className="say">
        <p className="say__line" data-reveal>
          Questions, collaborations, or just want to talk games and robots?
        </p>
        <div className="say__links" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <CopyHandle value={contact.email} label={`Copy email ${contact.email}`} className="say__email" />
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link">
            {githubUser}
          </a>
          <CopyHandle value={contact.discord} label={`Copy Discord handle ${contact.discord}`} />
        </div>
      </section>
    </div>
  )
}
