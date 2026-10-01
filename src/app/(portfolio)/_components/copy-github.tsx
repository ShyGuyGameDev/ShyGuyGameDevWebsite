"use client"

import { useEffect, useState } from "react"
import { Check, Github } from "lucide-react"
import { contact } from "../data"

const githubUser = contact.github.split("/").filter(Boolean).pop() ?? contact.github

export function CopyGithub({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  function onClick() {
    void navigator.clipboard.writeText(githubUser).then(
      () => setCopied(true),
      () => setCopied(false),
    )
  }

  return (
    <a
      href={contact.github}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
      aria-label={`Open GitHub profile ${githubUser} and copy the handle`}
    >
      {copied ? (
        <Check className="h-4 w-4 text-(--v2-accent)" aria-hidden="true" />
      ) : (
        <Github className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Copied" : githubUser}</span>
    </a>
  )
}
