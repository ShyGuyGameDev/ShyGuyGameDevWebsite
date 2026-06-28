"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  compact?: boolean
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  compact = false,
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
          compact ? "left-3 h-3.5 w-3.5" : "left-4 h-4 w-4",
        )}
        aria-hidden="true"
      />
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          "rounded-full",
          compact ? "h-9 pl-9 pr-9 text-sm" : "h-11 pl-11 pr-11 text-base",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
            compact ? "right-2" : "right-3",
          )}
        >
          <X className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </button>
      )}
    </div>
  )
}
