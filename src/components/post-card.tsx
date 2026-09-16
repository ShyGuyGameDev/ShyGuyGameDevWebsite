"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn, getTagColorClasses } from "@/lib/utils"
import type React from "react"
import { useState } from "react"

interface PostCardProps {
  title: string
  date: string
  url: string
  description: string | React.ReactNode
  tag?: string
  themes?: string[]
  image?: string
  className?: string
  expanded?: boolean
  onToggleExpanded?: () => void
}

export function PostCard({ title, date, url, description, tag, themes, image, className, expanded: expandedProp, onToggleExpanded }: PostCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const expanded = expandedProp ?? internalExpanded
  const toggleExpanded = () => {
    if (onToggleExpanded) {
      onToggleExpanded()
      return
    }
    setInternalExpanded((current) => !current)
  }

  return (
    <Card
      className={cn(
        "group bg-card rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden pt-0 min-w-0 cursor-pointer h-full w-full gap-0",
        className,
      )}
      onClick={(event) => {
        const target = event.target
        if (target instanceof Element && target.closest("a")) return
        toggleExpanded()
      }}
    >
      <div className="relative w-full shrink-0 overflow-hidden rounded-t-2xl aspect-video">
        <a href={url} target="_blank" rel="noopener noreferrer" className="block absolute inset-0">
          <Image
            src={image || "/coming-soon.svg"}
            alt={image ? `Preview of ${title}` : "Coming Soon"}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </a>
      </div>
      <CardContent className="pt-2 px-3 pb-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className={cn("text-xs text-muted-foreground", !expanded && "truncate")}>{date}</p>
          {tag && (
            <span
              className={cn(
                'shrink-0 px-2 py-0.5 text-xs font-medium rounded-full',
                getTagColorClasses(tag),
              )}
            >
              {tag}
            </span>
          )}
        </div>
        <h4 className="text-base font-semibold text-primary mb-2 leading-snug">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {title}
          </a>
        </h4>
        <p className={cn("text-sm text-secondary leading-relaxed mb-3", !expanded && "line-clamp-3")}>{description}</p>

        {themes && themes.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Themes</p>
            <ul className="list-disc list-inside space-y-0.5">
              {themes.map((theme) => (
                <li key={theme} className={cn("text-xs text-secondary", !expanded && "truncate")}>
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
