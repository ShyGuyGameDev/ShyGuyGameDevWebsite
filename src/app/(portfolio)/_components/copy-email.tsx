"use client"

import { useEffect, useState } from "react"
import { Check, Mail } from "lucide-react"
import { contact } from "../data"

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" onClick={copy} className={className} aria-label={`Copy email ${contact.email}`}>
      {copied ? (
        <Check className="h-4 w-4 text-(--v2-accent)" aria-hidden="true" />
      ) : (
        <Mail className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Copied" : contact.email}</span>
    </button>
  )
}
