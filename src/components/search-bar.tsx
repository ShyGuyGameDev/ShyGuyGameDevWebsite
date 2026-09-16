/**
 * SearchBar - a small, reusable text input with a magnifying-glass icon and a "clear" (X) button.
 *
 * Where it appears: it is not used directly by a page. Instead `search-filter-bar.tsx` wraps it,
 * and that wrapper is used on the projects page and the posts page. So editing this file changes
 * the search box everywhere on the site.
 *
 * Key concepts a learner should notice here:
 * 1. "use client" - this component runs in the browser because it responds to typing/clicking.
 * 2. A CONTROLLED INPUT + LIFTING STATE UP: this component does NOT remember what you typed.
 *    It receives the current text as the `value` prop and reports every keystroke back up through
 *    the `onChange` callback prop. The parent component owns the `useState` that holds the text.
 *    That pattern is called "lifting state up", and it lets the parent filter its list of cards
 *    using the same string the input is showing.
 * 3. A TypeScript `interface` to describe the props, with `?` marking optional props.
 * 4. Accessibility: `aria-label` and `aria-hidden` so screen readers describe the control sensibly.
 */

// "use client" must be the very first thing in the file. Next.js components are Server Components
// by default (rendered once on the server, no interactivity). This directive opts the file into
// being a Client Component so it can use browser features like event handlers and React state.
"use client"

// `lucide-react` is an icon library. Each icon is just a React component that renders an <svg>.
// `Search` is the magnifying glass; `X` is the little cross used for the clear button.
import { Search, X } from "lucide-react"
// The project's own styled wrapper around the plain HTML <input> element (shared UI building block).
import { Input } from "@/components/ui/input"
// `cn` merges Tailwind class strings together and resolves conflicts (see src/lib/utils.ts).
import { cn } from "@/lib/utils"

// A TypeScript `interface` describes the shape of the props object this component accepts.
// It is compile-time only: it disappears when the code runs, but while you are editing it gives
// you autocomplete and errors if a caller forgets a prop or passes the wrong type.
interface SearchBarProps {
  // The text currently shown in the box. Required, because the parent owns this state.
  value: string
  // Callback the parent passes down. `(value: string) => void` means "a function that takes a
  // string and returns nothing". We call it on every keystroke so the parent can update its state.
  onChange: (value: string) => void
  // The `?` means OPTIONAL: a caller may leave these out, so inside the component their type is
  // `string | undefined`. We give them default values in the parameter list below.
  placeholder?: string
  // When true, render a smaller version of the bar (shorter height, smaller icons and padding).
  compact?: boolean
  // Extra Tailwind classes from the parent, so the same component can be sized differently.
  className?: string
}

// `export function` makes this component importable elsewhere. The `{ ... }` in the parameter list
// is destructuring: it pulls each named prop out of the single props object React passes in.
export function SearchBar({
  value,
  onChange,
  // Default values used only when the prop is `undefined` (i.e. the caller omitted it).
  placeholder = "Search...",
  compact = false,
  className,
}: SearchBarProps) {
  return (
    // `relative` makes this wrapper the positioning context, so the icon and clear button below
    // can be absolutely positioned inside it (on top of the input) instead of next to it.
    <div className={cn("relative w-full", className)}>
      {/* The magnifying-glass icon, floated on top of the left edge of the input. */}
      {/* `top-1/2 -translate-y-1/2` is the standard trick for vertical centering; */}
      {/* `pointer-events-none` lets clicks pass through to the input underneath; */}
      {/* the `compact ? ... : ...` ternary picks smaller offsets/sizes in compact mode; */}
      {/* `aria-hidden` hides the purely decorative icon from screen readers. */}
      <Search
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
          compact ? "left-3 h-3.5 w-3.5" : "left-4 h-4 w-4",
        )}
        aria-hidden="true"
      />
      {/* The controlled input itself. Because `value` comes from the parent's state and every */}
      {/* keystroke goes back up via `onChange`, React is the single source of truth for the text. */}
      {/* If you passed `value` but forgot `onChange`, the box would appear frozen while typing. */}
      {/* `event.target.value` is the input's new text; we hand just that string to the parent. */}
      {/* The left padding (`pl-9`/`pl-11`) leaves room for the icon; the right padding leaves */}
      {/* room for the clear button. `aria-label` reuses the placeholder as the accessible name. */}
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
      {/* CONDITIONAL RENDERING with `&&`: when `value` is the empty string (falsy) React renders */}
      {/* nothing, so the clear button only exists while there is text to clear. */}
      {value && (
        // `type="button"` stops the browser from treating this as a form-submit button.
        // Clicking it calls the parent's `onChange` with "" - clearing state, which clears the box.
        // The long class string: absolutely positioned and vertically centred on the right edge,
        // round hover/focus styling, and a visible focus ring for keyboard users.
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
            compact ? "right-2" : "right-3",
          )}
        >
          {/* The X icon, again sized down when `compact` is true. */}
          <X className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </button>
      )}
    </div>
  )
}
