/**
 * PostCard - one clickable card representing a single Substack post or a "media mention" (an article
 * somebody else wrote about ShyGuy's work). It shows a preview image, the date, a coloured tag pill,
 * the linked title, a description, and a bulleted "Themes" list.
 *
 * Where it appears: rendered by `posts-section.tsx` (the Posts & Media Mentions page), two cards per
 * row inside `ExpandableCardRows`.
 *
 * Key concepts a learner should notice here:
 * 1. A TypeScript `interface` for props, with `?` marking the optional ones.
 * 2. `description: string | React.ReactNode` - a UNION type that lets a caller pass either plain
 *    text or real JSX. That is how the descriptions in posts-section.tsx can contain <a> links.
 * 3. `useState` for the collapsed/expanded toggle, and the "controlled OR uncontrolled" pattern:
 *    if the parent passes `expanded`/`onToggleExpanded`, the parent is in charge; otherwise the card
 *    falls back to its own internal state.
 * 4. Rendering that depends on state: the `!expanded && "line-clamp-3"` trick truncates text when
 *    collapsed and reveals it all when expanded.
 * 5. Nested clickable elements: the card's own onClick ignores clicks that landed on a link.
 * 6. Lists need a stable, unique `key` prop (see the themes `.map()` near the bottom).
 */

// Interactivity (useState + onClick) means this must be a Client Component, not a Server Component.
"use client"

// Next.js's optimised image component: it lazy-loads, resizes, and serves modern formats for you.
import Image from "next/image"
// The shared card shell and its inner padding wrapper.
import { Card, CardContent } from "@/components/ui/card"
// `cn` merges Tailwind classes; `getTagColorClasses` maps a tag name like "Post" to its colours.
import { cn, getTagColorClasses } from "@/lib/utils"
// `import type` brings in TYPES only - it vanishes at runtime. We need it for `React.ReactNode`.
import type React from "react"
// `useState` gives a component a piece of memory that survives between renders.
import { useState } from "react"

// The props this card accepts. Note how closely it mirrors the `MediaMention` interface in
// posts-section.tsx - that is why the parent can spread an entry straight in with `{...mention}`.
interface PostCardProps {
  // Headline text, also used as the link text.
  title: string
  // Human-written date string like "February 2025" (a string, not a Date object).
  date: string
  // Where the title and image link to (the Substack post or the external article).
  url: string
  // A UNION type: either a plain string OR any renderable React content. `React.ReactNode` covers
  // JSX elements, strings, numbers, arrays of those, null, etc. Accepting it here is what allows the
  // long descriptions with embedded <a> links written in posts-section.tsx.
  description: string | React.ReactNode
  // Optional (`?`) category shown in the coloured pill, e.g. "Post" or "Media Mention".
  tag?: string
  // Optional list of topic keywords rendered as bullets, and searched by the parent page.
  themes?: string[]
  // Optional preview image path; when missing we fall back to a "coming soon" placeholder below.
  image?: string
  // Optional extra Tailwind classes from whoever renders the card.
  className?: string
  // Optional CONTROLLED expansion state. If provided, the parent decides whether this card is open.
  expanded?: boolean
  // Optional callback telling the parent "the user clicked me, please flip my expanded state".
  onToggleExpanded?: () => void
}

// Destructure the props. `expanded: expandedProp` RENAMES the incoming prop so the local variable
// name `expanded` stays free for the resolved value computed on the next few lines.
export function PostCard({ title, date, url, description, tag, themes, image, className, expanded: expandedProp, onToggleExpanded }: PostCardProps) {
  // `useState(false)` returns a pair: the current value, and a setter that re-renders on change.
  // This is the FALLBACK state, used only when no parent is controlling the card.
  const [internalExpanded, setInternalExpanded] = useState(false)
  // `??` is the nullish-coalescing operator: use `expandedProp` unless it is null/undefined, in
  // which case use our own state. This one line implements "controlled or uncontrolled".
  const expanded = expandedProp ?? internalExpanded
  // One handler that routes the toggle to whichever owner is in charge.
  const toggleExpanded = () => {
    // If the parent gave us a callback, let it own the change and stop here...
    if (onToggleExpanded) {
      onToggleExpanded()
      return
    }
    // ...otherwise flip our own state. Passing a FUNCTION to the setter is the safe way to update
    // based on the previous value, rather than reading a possibly-stale `internalExpanded`.
    setInternalExpanded((current) => !current)
  }

  return (
    // The card shell. The long class string does a lot at once: `group` so children can respond to
    // hovering the card, rounded corners, a soft shadow that grows on hover, a 4px lift on hover
    // over 300ms, hidden overflow so the image corners stay rounded, and a pointer cursor to hint
    // that the whole card is clickable. `className` is merged last so callers can override.
    <Card
      className={cn(
        "group bg-card rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden pt-0 min-w-0 cursor-pointer h-full w-full gap-0",
        className,
      )}
      onClick={(event) => {
        // `event.target` is the exact element that was clicked, which may be deep inside the card.
        const target = event.target
        // `closest("a")` walks up from that element looking for an ancestor link. If we find one,
        // the user meant to follow the link, so we return early and do NOT toggle the card. The
        // `instanceof Element` check is a TypeScript narrowing so `.closest` is known to exist.
        if (target instanceof Element && target.closest("a")) return
        // Any other click on the card body expands or collapses it.
        toggleExpanded()
      }}
    >
      {/* The image frame. `relative` anchors the absolutely positioned image, `aspect-video` keeps */}
      {/* a 16:9 shape at any width, and `rounded-t-2xl` rounds only the top corners. */}
      <div className="relative w-full shrink-0 overflow-hidden rounded-t-2xl aspect-video">
        {/* The whole picture is a link. `absolute inset-0` stretches it over the frame. */}
        {/* `target="_blank"` opens a new tab; `rel="noopener noreferrer"` is the security habit that */}
        {/* stops the new page from getting a handle on ours. */}
        <a href={url} target="_blank" rel="noopener noreferrer" className="block absolute inset-0">
          {/* `image || "/coming-soon.svg"` falls back to the placeholder when no image was given. */}
          {/* `alt` changes to match whichever image is actually shown. */}
          {/* `fill` makes the Next.js Image expand to fill its `relative` parent, which is why no */}
          {/* width/height numbers are needed. `object-cover object-top` crops from the top. */}
          {/* The image zooms 5% when the card (the `group`) is hovered. `loading="lazy"` defers */}
          {/* download until the card is near the viewport. */}
          <Image
            src={image || "/coming-soon.svg"}
            alt={image ? `Preview of ${title}` : "Coming Soon"}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </a>
      </div>
      {/* The text half of the card. `flex flex-col` stacks the rows; `flex-1` makes it take the */}
      {/* remaining height so cards in the same row line up. */}
      <CardContent className="pt-2 px-3 pb-3 flex-1 flex flex-col">
        {/* Top row: date on the left, tag pill pushed to the right by `justify-between`. */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Conditional classes: while COLLAPSED the date is `truncate`d to one line; expanding */}
          {/* drops that class so long text can wrap. `false` values are ignored by `cn`. */}
          <p className={cn("text-xs text-muted-foreground", !expanded && "truncate")}>{date}</p>
          {/* Only render the pill if a `tag` was supplied (the `&&` short-circuits to nothing). */}
          {tag && (
            // The pill: fully rounded, tiny bold text, and background/text colours looked up from
            // `getTagColorClasses(tag)` so "Post" and "Media Mention" get different colours.
            <span
              className={cn(
                'shrink-0 px-2 py-0.5 text-xs font-medium rounded-full',
                getTagColorClasses(tag),
              )}
            >
              {/* The tag's own text, e.g. "Media Mention". */}
              {tag}
            </span>
          )}
        </div>
        {/* The title, as an <h4> because the page already has bigger headings above it. */}
        <h4 className="text-base font-semibold text-primary mb-2 leading-snug">
          {/* Clicking the title opens the post in a new tab. Because this is an <a>, the card's */}
          {/* onClick handler above deliberately ignores clicks here. */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {title}
          </a>
        </h4>
        {/* The description. `line-clamp-3` shows only three lines while collapsed and is removed */}
        {/* when expanded, which is the whole point of the expand/collapse behaviour. Remember */}
        {/* `description` may be JSX containing links, and React renders it just fine either way. */}
        <p className={cn("text-sm text-secondary leading-relaxed mb-3", !expanded && "line-clamp-3")}>{description}</p>

        {/* Only show the Themes block when the optional array exists AND is not empty. Checking */}
        {/* `themes &&` first avoids reading `.length` of undefined. */}
        {themes && themes.length > 0 && (
          <div>
            {/* Small label above the bullets. */}
            <p className="text-xs font-medium text-muted-foreground mb-1">Themes</p>
            {/* `list-disc list-inside` restores the bullet dots that Tailwind's reset removes. */}
            <ul className="list-disc list-inside space-y-0.5">
              {/* One <li> per theme string. */}
              {themes.map((theme) => (
                // `key` gives React a stable identity for each list item so it can update the list
                // efficiently instead of re-creating every <li>. The theme text itself is unique
                // within a card, so it makes a good key.
                // Same collapsed-vs-expanded trick: truncate to one line until the card opens.
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
