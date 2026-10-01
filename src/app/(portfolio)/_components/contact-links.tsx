import { CopyDiscord } from "./copy-discord"
import { CopyEmail } from "./copy-email"
import { CopyGithub } from "./copy-github"

const pill =
  "inline-flex items-center gap-2 rounded-full border border-(--v2-border) bg-(--v2-surface) px-4 py-2 text-sm text-(--v2-text) transition-colors hover:border-(--v2-accent) hover:text-(--v2-accent)"

export function ContactLinks() {
  return (
    <ul className="flex flex-wrap gap-3">
      <li>
        <CopyEmail className={`${pill} cursor-pointer`} />
      </li>
      <li>
        <CopyGithub className={pill} />
      </li>
      <li>
        <CopyDiscord className={`${pill} cursor-pointer`} />
      </li>
    </ul>
  )
}
