import Link from "next/link"
import { BASE } from "./data"

export default function V2NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-6 pb-24 pt-24">
      <p className="mono text-sm text-(--v2-accent)">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Nothing here.</h1>
      <p className="mt-3 text-(--v2-muted)">That page doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={BASE}
          className="inline-flex rounded-full bg-(--v2-accent) px-4 py-2 text-sm font-medium text-(--v2-bg) transition-opacity hover:opacity-90"
        >
          Home
        </Link>
        <Link
          href={`${BASE}/work`}
          className="inline-flex rounded-full border border-(--v2-border) px-4 py-2 text-sm transition-colors hover:border-(--v2-accent) hover:text-(--v2-accent)"
        >
          All work
        </Link>
      </div>
    </div>
  )
}
