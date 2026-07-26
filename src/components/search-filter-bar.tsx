"use client"

import { ChevronDown } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface SearchFilterBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  selectedTopics: string[]
  onTopicsChange: (topics: string[]) => void
  topics: readonly string[]
}

function getTopicFilterLabel(selectedTopics: string[]) {
  if (selectedTopics.length === 0) return "All topics"
  if (selectedTopics.length === 1) return selectedTopics[0]
  return `${selectedTopics.length} topics`
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  selectedTopics,
  onTopicsChange,
  topics,
}: SearchFilterBarProps) {
  const toggleTopic = (topic: string, checked: boolean) => {
    onTopicsChange(
      checked
        ? [...selectedTopics, topic]
        : selectedTopics.filter((value) => value !== topic),
    )
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      <SearchBar
        compact
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="flex-1"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label="Filter by topic"
            className={cn(
              "h-9 w-full justify-between rounded-full px-3 font-normal sm:w-[170px]",
              "border-input bg-transparent shadow-xs dark:bg-input/30 dark:hover:bg-input/50",
            )}
          >
            <span className="truncate">{getTopicFilterLabel(selectedTopics)}</span>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          {topics.map((topic) => (
            <DropdownMenuCheckboxItem
              key={topic}
              checked={selectedTopics.includes(topic)}
              onCheckedChange={(checked) => toggleTopic(topic, checked === true)}
              onSelect={(event) => event.preventDefault()}
              className={cn(
                "cursor-pointer rounded-full py-2 pl-3 pr-9",
                // Move the check indicator from the default left gutter to the right edge.
                "[&>span:first-child]:left-auto [&>span:first-child]:right-3",
              )}
            >
              <span className="truncate">{topic}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
