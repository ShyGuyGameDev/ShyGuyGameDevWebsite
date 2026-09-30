import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

type SectionHeaderProps = {
  title: string
  id: string
  action?: { label: string; href: string; external?: boolean }
}

export function SectionHeader({ title, id, action }: SectionHeaderProps) {
  const actionClass =
    "inline-flex items-center gap-1 text-sm text-(--v2-muted) transition-colors hover:text-(--v2-accent)"

  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {action &&
        (action.external ? (
          <a href={action.href} target="_blank" rel="noopener noreferrer" className={actionClass}>
            {action.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <Link href={action.href} className={actionClass}>
            {action.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ))}
    </div>
  )
}
