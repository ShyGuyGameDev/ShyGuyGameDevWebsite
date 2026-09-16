/**
 * SearchFilterBar - one row of controls that combines the text `SearchBar` with a multi-select
 * "topics" dropdown (a button that opens a list of checkboxes).
 *
 * Where it appears: reused by BOTH the projects page (`projects-section.tsx`) and the posts page
 * (`posts-section.tsx`). Each page passes in its own list of topics, so the same component filters
 * project tags on one page and post tags ("Post" / "Media Mention") on the other.
 *
 * Key concepts a learner should notice here:
 * 1. This component is also fully CONTROLLED: it stores no state of its own. Both the search text
 *    and the list of chosen topics live in the parent's `useState`, and this component only reports
 *    changes upward through the `onSearchChange` / `onTopicsChange` callback props.
 * 2. MULTI-SELECT STATE AS AN ARRAY OF STRINGS: `selectedTopics: string[]`. An empty array means
 *    "no filter, show everything". Checking a box adds a string to the array, unchecking removes it.
 * 3. IMMUTABLE UPDATES: we never `push` into the existing array. We build a NEW array with the
 *    spread operator `[...]` or with `.filter()`, because React only re-renders when it sees a new
 *    array reference. Mutating the old array in place would leave the screen stale.
 * 4. Composition: this component renders another of our components (`SearchBar`) plus shared UI
 *    pieces (`Button`, `DropdownMenu`) - small components stacked into a bigger one.
 */

// Needed because this component handles clicks and typing in the browser. See search-bar.tsx.
"use client"

// The little "v" arrow icon drawn on the right side of the dropdown trigger button.
import { ChevronDown } from "lucide-react"
// The text search box we just wrapped; this file supplies its value/onChange from its own props.
import { SearchBar } from "@/components/search-bar"
// Project-styled <button> component.
import { Button } from "@/components/ui/button"
// The dropdown menu family (built on the Radix UI library). Four related pieces:
import {
  // `DropdownMenu` is the outer wrapper that tracks whether the menu is open.
  DropdownMenu,
  // `DropdownMenuCheckboxItem` is one row with a checkmark - the multi-select rows.
  DropdownMenuCheckboxItem,
  // `DropdownMenuContent` is the floating panel that appears when the menu opens.
  DropdownMenuContent,
  // `DropdownMenuTrigger` is the thing you click to open the menu.
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// Tailwind class merging helper.
import { cn } from "@/lib/utils"

// The props contract for this component, written as a TypeScript interface.
interface SearchFilterBarProps {
  // Current search text (owned by the parent).
  searchQuery: string
  // Called with the new text on every keystroke; the parent updates its state with it.
  onSearchChange: (value: string) => void
  // Optional (`?`) grey hint text shown inside the empty search box.
  searchPlaceholder?: string
  // The topics the user has ticked. An array of strings; empty array = show all.
  selectedTopics: string[]
  // Called with the WHOLE new array whenever a checkbox is ticked or unticked.
  onTopicsChange: (topics: string[]) => void
  // The full list of topics to offer. `readonly string[]` accepts arrays declared `as const`
  // (like `POST_TAG_ORDER` in src/lib/utils.ts) and promises we will not modify the list.
  topics: readonly string[]
}

// A plain helper function (not a component - it returns a string, not JSX) that decides what text
// to print on the dropdown button, so the button summarises the current filter at a glance.
function getTopicFilterLabel(selectedTopics: string[]) {
  // Nothing ticked: the list is unfiltered.
  if (selectedTopics.length === 0) return "All topics"
  // Exactly one ticked: show its name, e.g. "Robotics".
  if (selectedTopics.length === 1) return selectedTopics[0]
  // Two or more: showing every name would overflow, so summarise as "3 topics".
  return `${selectedTopics.length} topics`
}

// Destructure the props, giving `searchPlaceholder` a default for callers that omit it.
export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  selectedTopics,
  onTopicsChange,
  topics,
}: SearchFilterBarProps) {
  // Turn "this one checkbox changed" into "here is the complete new array of selected topics".
  // `checked` is the checkbox's NEW state after the click.
  const toggleTopic = (topic: string, checked: boolean) => {
    onTopicsChange(
      checked
        // Just ticked: copy the old array with the spread operator and append this topic.
        ? [...selectedTopics, topic]
        // Just unticked: `.filter()` returns a new array containing everything except this topic.
        : selectedTopics.filter((value) => value !== topic),
    )
  }

  return (
    // Layout: stacked vertically on phones, side by side and vertically centred from `sm:` up.
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      {/* The search box. `compact` requests the smaller variant. We simply forward the parent's */}
      {/* value and change handler straight through - this file never stores the text itself. */}
      {/* `flex-1` makes the box grow to fill the leftover space beside the dropdown button. */}
      <SearchBar
        compact
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="flex-1"
      />
      {/* The dropdown wrapper handles open/closed state and keyboard navigation for us. */}
      <DropdownMenu>
        {/* `asChild` tells the trigger not to render its own <button>, but to attach its click and */}
        {/* accessibility behaviour to the single child element below (our styled `Button`). */}
        <DropdownMenuTrigger asChild>
          {/* The button that opens the menu: outline style, fixed 170px wide on larger screens, */}
          {/* label pushed left and chevron pushed right by `justify-between`. */}
          <Button
            variant="outline"
            aria-label="Filter by topic"
            className={cn(
              "h-9 w-full justify-between rounded-full px-3 font-normal sm:w-[170px]",
              "border-input bg-transparent shadow-xs dark:bg-input/30 dark:hover:bg-input/50",
            )}
          >
            {/* The summary text from the helper above; `truncate` adds "..." if it is too long. */}
            <span className="truncate">{getTopicFilterLabel(selectedTopics)}</span>
            {/* Decorative arrow, dimmed to 50% opacity. */}
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        {/* The floating panel. `align="end"` lines its right edge up with the button's right edge. */}
        {/* The CSS variable Radix provides makes the panel exactly as wide as the trigger button. */}
        <DropdownMenuContent
          align="end"
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          {/* Build one checkbox row per topic. `.map()` turns an array of strings into an array of */}
          {/* elements, which React renders in order. */}
          {topics.map((topic) => (
            // `key` must be a STABLE, unique identifier for each item in a list. React uses it to
            // match elements between renders so it can reuse DOM nodes instead of rebuilding them.
            // The topic name is perfect here: unique and unchanging. (Array indexes are a poor key
            // when a list can be reordered or filtered.)
            // `checked` is derived from the parent's array - the array is the single source of truth.
            // `onCheckedChange` gives us `true | false | "indeterminate"`, so `checked === true`
            // narrows it to a plain boolean before calling `toggleTopic`.
            // `onSelect` + `preventDefault()` stops the default "close the menu after choosing"
            // behaviour, which is what lets you tick several topics in one visit.
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
              {/* The topic's name, clipped with an ellipsis if it does not fit the panel width. */}
              <span className="truncate">{topic}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
