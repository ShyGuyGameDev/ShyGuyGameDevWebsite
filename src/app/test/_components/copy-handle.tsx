"use client"

import { useEffect, useRef, useState } from "react"

/** Copies a handle to the clipboard; the label swaps to "Copied" with a short blur crossfade. */
export function CopyHandle({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" className={`copy ${className ?? ""}`} onClick={copy} aria-label={label}>
      <span data-hidden={copied}>{value}</span>
      <span data-hidden={!copied} aria-hidden={!copied}>
        Copied
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  )
}
