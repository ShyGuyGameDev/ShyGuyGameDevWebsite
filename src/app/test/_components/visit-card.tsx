import Image from "next/image"
import { contact } from "../../(portfolio)/data"
import { CopyHandle } from "./copy-handle"

const githubUser = contact.github.split("/").filter(Boolean).pop() ?? contact.github

export function VisitCard() {
  return (
    <section id="contact" className="visit" aria-labelledby="contact-title">
      <div className="visit__photo frame">
        <Image
          src="/computer-vision-robot.png"
          alt="ShyGuy's computer vision robot"
          fill
          sizes="100vw"
        />
      </div>
      <div className="visit__card" data-reveal>
        <h2 id="contact-title" className="visit__title">
          Get in touch
        </h2>
        <p className="visit__line">Discord is the fastest way to reach ShyGuy.</p>
        <ul className="visit__rows">
          <li>
            <CopyHandle value={contact.email} label={`Copy email ${contact.email}`} />
          </li>
          <li>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link">
              {githubUser}
            </a>
          </li>
        </ul>
        <CopyHandle
          value={contact.discord}
          label={`Copy Discord handle ${contact.discord}`}
          className="button visit__button"
        />
      </div>
    </section>
  )
}
