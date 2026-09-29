import { ArrowUpRight } from "lucide-react"
import type { Post } from "../data"

export function PostRow({ post }: { post: Post }) {
  return (
    <li className="border-b border-(--v2-border) last:border-b-0">
      <a
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
      >
        <span className="mono w-20 shrink-0 text-xs text-(--v2-muted)">{post.date}</span>
        <span className="min-w-0">
          <span className="inline-flex items-center gap-1.5 font-medium transition-colors group-hover:text-(--v2-accent)">
            {post.title}
            <ArrowUpRight
              className="h-4 w-4 text-(--v2-muted) transition-colors group-hover:text-(--v2-accent)"
              aria-hidden="true"
            />
          </span>
          <span className="mt-0.5 block text-sm text-(--v2-muted)">{post.summary}</span>
        </span>
      </a>
    </li>
  )
}
