import Link from "next/link"
import { BASE } from "../site"

export function Header() {
  return (
    <header className="t3-header">
      <Link href={BASE} className="t3-header__mark">
        ShyGuy
      </Link>
      <nav aria-label="Main">
        <Link href={`${BASE}/work`} className="link">
          Work
        </Link>
        <Link href={`${BASE}/about`} className="link">
          About
        </Link>
        <a href="#contact" className="button">
          Contact
        </a>
      </nav>
    </header>
  )
}
