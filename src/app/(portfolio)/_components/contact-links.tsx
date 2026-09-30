import { Github, Mail } from "lucide-react"
import { contact } from "../data"
import { CopyDiscord } from "./copy-discord"

const pill =
  "inline-flex items-center gap-2 rounded-full border border-(--v2-border) bg-(--v2-surface) px-4 py-2 text-sm text-(--v2-text) transition-colors hover:border-(--v2-accent) hover:text-(--v2-accent)"

export function ContactLinks() {
  return (
    <ul className="flex flex-wrap gap-3">
      <li>
        <a href={`mailto:${contact.email}`} className={pill}>
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email
        </a>
      </li>
      <li>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className={pill}>
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
      </li>
      <li>
        <CopyDiscord className={`${pill} cursor-pointer`} />
      </li>
    </ul>
  )
}
