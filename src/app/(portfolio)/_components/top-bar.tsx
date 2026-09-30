import Link from "next/link"
import { BASE } from "../data"

const navLink = "rounded-md px-2 py-1 text-sm text-(--v2-muted) transition-colors hover:text-(--v2-text)"

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--v2-border) bg-(--v2-bg)/80 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-[1040px] items-center justify-between px-6"
      >
        <Link href={BASE || "/"} className="rounded-md text-[15px] font-semibold tracking-tight text-(--v2-text)">
          ShyGuy
        </Link>
        <ul className="flex items-center gap-2 sm:gap-4">
          <li>
            <Link href={`${BASE}/work`} className={navLink}>
              Work
            </Link>
          </li>
          <li>
            <Link href={`${BASE}/about`} className={navLink}>
              About
            </Link>
          </li>
          <li>
            <a href="#contact" className={`${navLink} text-(--v2-accent) hover:text-(--v2-accent)`}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
