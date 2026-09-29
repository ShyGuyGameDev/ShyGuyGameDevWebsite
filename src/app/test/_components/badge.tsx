import type React from "react"

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-(--v2-accent)/10 px-2.5 py-0.5 text-xs font-medium text-(--v2-accent) ring-1 ring-(--v2-accent)/25 ring-inset">
      {children}
    </span>
  )
}

export function TeamLabel() {
  return <span className="mono text-[11px] text-(--v2-muted)">with Empty Console</span>
}
