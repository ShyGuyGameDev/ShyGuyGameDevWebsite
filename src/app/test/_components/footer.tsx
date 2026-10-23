import Link from "next/link"
import { contact } from "../../(portfolio)/data"
import { BASE } from "../site"

export function Footer() {
  return (
    <footer className="t3-footer">
      <p>ShyGuy</p>
      <nav aria-label="Footer">
        <Link href={`${BASE}/work`} className="link">
          Work
        </Link>
        <Link href={`${BASE}/about`} className="link">
          About
        </Link>
        <a href={contact.emptyConsole} target="_blank" rel="noopener noreferrer" className="link">
          emptyconsole.com
        </a>
      </nav>
      <p>
        <a href={contact.substack} target="_blank" rel="noopener noreferrer" className="link">
          More on Substack
        </a>
      </p>
    </footer>
  )
}
