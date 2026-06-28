"use client"

import { SearchBar } from "@/components/search-bar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchFilterBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  selectedTopic: string
  onTopicChange: (value: string) => void
  topics: readonly string[]
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  selectedTopic,
  onTopicChange,
  topics,
}: SearchFilterBarProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      <SearchBar
        compact
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="flex-1"
      />
      <Select value={selectedTopic} onValueChange={onTopicChange}>
        <SelectTrigger
          className="h-9 w-full rounded-full sm:w-[170px]"
          aria-label="Filter by topic"
        >
          <SelectValue placeholder="All topics" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All topics</SelectItem>
          {topics.map((topic) => (
            <SelectItem key={topic} value={topic}>
              {topic}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
