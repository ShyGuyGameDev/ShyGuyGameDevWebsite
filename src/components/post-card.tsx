"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type React from "react"

interface PostCardProps {
  title: string
  date: string
  url: string
  description: string | React.ReactNode
  tag?: string
  themes?: string[]
  image?: string
}

export function PostCard({ title, date, url, description, tag, themes, image }: PostCardProps) {
  return (
    <Card className="group bg-card rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full pt-0">
      {image && (
        <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={`Preview of ${title}`}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <CardContent className={`${image ? "pt-3" : "pt-6"} px-6 pb-6`}>
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-sm text-muted-foreground">{date}</p>
          {tag && (
            <span className="shrink-0 px-3 py-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 text-xs font-medium rounded-full">
              {tag}
            </span>
          )}
        </div>
        <h4 className="text-xl font-semibold text-primary mb-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {title}
          </a>
        </h4>
        <p className="text-base text-secondary leading-relaxed">{description}</p>

        {themes && themes.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Themes</p>
            <ul className="list-disc list-inside space-y-1">
              {themes.map((theme) => (
                <li key={theme} className="text-sm text-secondary">
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
