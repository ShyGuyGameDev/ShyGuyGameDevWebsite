/**
 * lib/utils.ts
 *
 * The site's shared helper functions and shared constants. Almost every component imports
 * something from here: `cn()` for class names, the comparator functions for ordering the
 * project and post grids, `matchesSearch` and `getNodeText` for the search boxes, and the
 * tag constants and colour lookup for the coloured tag pills.
 *
 * There is no `"use client"` here on purpose. This file is plain TypeScript with no hooks
 * and no browser APIs, so it can be imported by Server Components and Client Components
 * alike.
 *
 * Concepts to notice:
 *  - `cn()`, and why simply concatenating Tailwind classes is not enough.
 *  - Recursion: `getNodeText` walks a tree by calling itself.
 *  - Comparator functions, the little `(a, b) => number` functions that `Array.sort` uses,
 *    and the convention that a negative result means "a comes first".
 *  - A factory function: `createCompareByTagThenDateThenTitle` returns a *function*, so one
 *    implementation can be reused with different tag orders.
 *  - `as const` and the readonly tuple types it produces.
 *  - The `??` nullish-coalescing operator as a default-value fallback.
 */

// `clsx` joins class names together and knows how to handle conditionals, arrays, and
// objects. `ClassValue` is its type for anything it accepts.
import { clsx, type ClassValue } from 'clsx'
// `tailwind-merge` understands Tailwind's class groups and resolves conflicts between them.
import { twMerge } from 'tailwind-merge'
// Type-only import: the union type describing anything React can render.
import type { ReactNode } from 'react'

// The class-name helper used all over the codebase. The `...inputs` rest parameter means it
// takes any number of arguments of any clsx-friendly shape.
//
// Why two libraries instead of a template string? `clsx` does the flattening: it turns
// `cn('p-2', isActive && 'bg-blue-500', ['rounded', { hidden: !visible }])` into one string,
// quietly dropping the false and null entries.
//
// `twMerge` then fixes the problem plain concatenation cannot. In CSS, when two rules set
// the same property the winner is decided by the stylesheet, not by the order you wrote the
// classes in the attribute. So `cn('p-2', 'p-8')` written as plain text gives you
// `"p-2 p-8"`, and which padding actually applies is whichever Tailwind emitted later, which
// is not necessarily what you intended. `twMerge` knows `p-2` and `p-8` belong to the same
// group, keeps only the last one, and returns `"p-8"`. This is what makes the "pass a
// className prop to override a component's default styling" pattern work reliably.
export function cn(...inputs: ClassValue[]) {
  // Note the order: clsx runs first to build the string, then twMerge de-duplicates it.
  return twMerge(clsx(inputs))
}

// Recursively extract the plain text from a React node so it can be searched.
// The reason this is needed: project and post titles/descriptions in this site are not always
// plain strings. Some are JSX with <strong>, <a>, or <span> wrappers for formatting. A search
// box can only usefully compare *text*, so this function flattens a whole element tree down
// to the words inside it. It is recursive because JSX is a tree of unknown depth: an element
// contains children, which may themselves be elements containing more children.
export function getNodeText(node: ReactNode): string {
  // Base case 1: nothing to read. `node == null` with two equals signs matches both `null`
  // and `undefined`. Booleans are skipped because `{isActive && <span/>}` leaves a literal
  // `false` in the tree when the condition fails, and "false" is not text a user searched for.
  if (node == null || typeof node === 'boolean') return ''
  // Base case 2: an actual leaf of text. Numbers are valid React children too, so they are
  // converted to strings rather than ignored.
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  // Recursive case 1: a list of children (which is what JSX siblings and `.map()` produce).
  // Each entry is flattened by calling this same function, then joined with spaces so words
  // from adjacent elements do not run together into one unsearchable blob.
  if (Array.isArray(node)) return node.map(getNodeText).join(' ')
  // Recursive case 2: a single React element. Every element object has a `props` field, and
  // its text lives in `props.children`, so recurse one level down.
  if (typeof node === 'object' && 'props' in node) {
    // The inline cast tells TypeScript the shape being read. `ReactNode` is a broad union and
    // TypeScript cannot prove `props.children` exists on it, so this asserts it. Both `?.`
    // guards handle elements that have no props or no children, in which case `undefined` is
    // passed back in and caught by the first base case above.
    return getNodeText((node as { props?: { children?: ReactNode } }).props?.children)
  }
  // Anything else (a Fragment symbol, a Promise, an iterator) has no readable text.
  return ''
}

// Pulls just the year out of a date string like "2025-03-14", used for the year labels and
// groupings in the project and post lists.
export function getYearFromDate(date: string): number {
  // `new Date(...)` parses the string, and `getFullYear()` returns a four-digit number.
  return new Date(date).getFullYear()
}

// Newest first; when month and year match, sort A–Z by title (top-left to bottom-right).
// This is a *comparator*: the function you hand to `array.sort()`. The contract is that it
// returns a negative number when `a` should come first, a positive number when `b` should
// come first, and 0 when their order does not matter. Everything else about sorting follows
// from that one rule, so all three comparators in this file obey it.
export function compareByDateThenTitle(
  // Only the fields actually compared are required in the parameter types, so this works on
  // any object that happens to have a `date` and a `title`. TypeScript calls this structural
  // typing: the shape matters, not the class or interface name.
  a: { date: string; title: string },
  b: { date: string; title: string },
): number {
  // `getTime()` turns each date into a millisecond number so they can be subtracted.
  // Note `b` minus `a`, not `a` minus `b`: that reversal is what makes newer dates sort
  // first, because a later `b` produces a positive result and pushes `b` ahead.
  const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime()
  // If the dates differ at all, the date decides and we are done.
  if (dateDiff !== 0) return dateDiff
  // Tie-break: `localeCompare` compares two strings alphabetically and already returns the
  // negative/zero/positive numbers a comparator needs, so it can be returned directly. It
  // also handles accents and non-English characters more correctly than `<` would.
  return a.title.localeCompare(b.title)
}

// The canonical display order of project tags. This array is the single source of truth for
// three things at once: which tags exist, what order the sections appear in on the projects
// page, and what order the nav links are listed in.
export const PROJECT_TAG_ORDER = [
  'Apps',
  'Robotics',
  'Design',
  'MUN',
  'Debate',
  'Games',
  'Teaching',
  // `as const` does two useful things here. At runtime it makes the array readonly, so no
  // stray code can push to it or reorder it. At compile time it turns the type from the loose
  // `string[]` into the exact readonly tuple
  // `readonly ['Apps', 'Robotics', ..., 'Teaching']`, which means the editor can autocomplete
  // the real tag names and the compiler can catch a misspelled tag elsewhere in the app.
] as const

// The heading used for the pinned "currently working on this" group, kept as a constant so
// the string is written once and cannot drift out of sync between the heading and the nav.
export const FEATURED_SECTION_LABEL = 'Featured Currently'

// The section list for the projects page navigation: the featured group first, then every
// tag in its canonical order. Spreading (`...`) copies the tag entries in rather than nesting
// the array, and because the source is `as const` the result stays a precise readonly tuple.
export const PROJECT_NAV_SECTIONS = [
  FEATURED_SECTION_LABEL,
  ...PROJECT_TAG_ORDER,
] as const

// The same idea for the posts page, which has only two kinds of entry. Media mentions are
// listed first, so they appear above ordinary posts.
export const POST_TAG_ORDER = ['Media Mention', 'Post'] as const

// Turns a human-readable tag into a URL-safe fragment, so the tag "Media Mention" becomes
// "media-mention" and can be used as an element id and linked to as `/posts#media-mention`.
// This is the "slugify" step that makes the anchor navigation (and `use-hash-scroll.ts`) work.
export function tagToSlug(tag: string): string {
  return tag
    // Fragments are case-insensitive in practice and lowercase looks tidier in a URL.
    .toLowerCase()
    // Drop surrounding whitespace before it can be turned into stray dashes.
    .trim()
    // Replace every run of characters that is *not* a letter or digit with a single dash.
    // The `+` matters: it collapses "Media  Mention" into one dash, not two. `/g` means
    // replace every match, not just the first.
    .replace(/[^a-z0-9]+/g, '-')
    // Tidy up: strip a dash at the very start (`^-`) or the very end (`-$`), which would
    // otherwise appear for a tag like "(Games)".
    .replace(/^-|-$/g, '')
}

// Compares two tags by their position in a given order list. Not exported: it is a private
// helper used only by the factory below.
function compareTags(
  // Both may be `undefined`, because an item is allowed to have no tag at all.
  aTag: string | undefined,
  bTag: string | undefined,
  // `readonly string[]` accepts the `as const` tuples above without complaining that they
  // cannot be mutated, and documents that this function will not modify the list.
  tagOrder: readonly string[],
): number {
  // `??` is nullish coalescing: use the left value unless it is null or undefined, in which
  // case fall back to the right. So a missing tag is treated as an empty string from here on.
  const a = aTag ?? ''
  const b = bTag ?? ''
  // `indexOf` gives each tag's rank in the canonical order, or -1 if the tag is not listed.
  // Turning a name into a number is the trick that lets an arbitrary custom order be sorted.
  const aIndex = tagOrder.indexOf(a)
  const bIndex = tagOrder.indexOf(b)

  // The happy path: both tags are known, so subtract their ranks. An earlier tag has a
  // smaller index, so the result is negative and it sorts first, exactly as intended.
  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
  // Only `a` is a known tag, so it wins. Negative means "a comes first".
  if (aIndex !== -1) return -1
  // Mirror image: only `b` is known, so the positive 1 means "b comes first".
  if (bIndex !== -1) return 1
  // From here neither tag is in the order list. Both empty means genuinely equal.
  if (!a && !b) return 0
  // One side has no tag at all: untagged items sink to the bottom. `!a` returns 1 to push
  // `a` down, and `!b` returns -1 to push `b` down.
  if (!a) return 1
  if (!b) return -1
  // Last resort: two unlisted-but-present tags are sorted alphabetically, so the ordering
  // stays stable and predictable even for a tag someone forgot to add to the list above.
  return a.localeCompare(b)
}

// A *factory*: a function whose return value is itself a function. It takes a tag order and
// hands back a comparator that sorts by that order. This exists so the projects page and the
// posts page can share one sorting implementation while each using its own tag order,
// instead of copy-pasting the same three-level comparison twice. The returned function is a
// closure: it permanently remembers the `tagOrder` it was created with.
export function createCompareByTagThenDateThenTitle(tagOrder: readonly string[]) {
  return (
    // `tag?` is optional here, matching `compareTags`, so untagged items can still be sorted.
    a: { date: string; title: string; tag?: string },
    b: { date: string; title: string; tag?: string },
  ): number => {
    // Priority 1: the tag group. Items are grouped into sections before anything else.
    const tagDiff = compareTags(a.tag, b.tag, tagOrder)
    if (tagDiff !== 0) return tagDiff
    // Priority 2: within a tag group, newest first (again note the reversed b-minus-a).
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime()
    if (dateDiff !== 0) return dateDiff
    // Priority 3: identical dates fall back to alphabetical title order, which keeps the grid
    // layout stable between builds instead of shuffling on every deploy.
    return a.title.localeCompare(b.title)
  }
}

// The two ready-made comparators, each produced by calling the factory once at module load.
// Components import these directly and pass them to `.sort(...)`.
export const compareByProjectTagThenDateThenTitle =
  createCompareByTagThenDateThenTitle(PROJECT_TAG_ORDER)

export const compareByPostTagThenDateThenTitle =
  createCompareByTagThenDateThenTitle(POST_TAG_ORDER)

// Returns true when every whitespace-separated token in the query appears in the haystack.
// This is what powers the search boxes: it is an AND search over words, so typing
// "robot arm" matches text containing both words in any order and any position, rather than
// requiring the exact phrase "robot arm".
export function matchesSearch(haystack: string, query: string): boolean {
  // Normalise the query once: trimmed and lowercased so the comparison is case-insensitive.
  const trimmed = query.trim().toLowerCase()
  // An empty search box should show everything, not nothing, so return true immediately.
  if (!trimmed) return true
  // Lowercase the target too, so both sides of the comparison are in the same case.
  const text = haystack.toLowerCase()
  // Split on any run of whitespace (`\s+`) to get the individual words, then `.every(...)`
  // returns true only if *all* of them are found. `.some(...)` would give an OR search.
  return trimmed.split(/\s+/).every((token) => text.includes(token))
}

// The tag-to-colour lookup used by the tag pills. `Record<string, string>` is TypeScript's
// type for "an object used as a dictionary with string keys and string values".
const TAG_COLOR_CLASSES: Record<string, string> = {
  // One row per tag. Each value is a set of Tailwind classes giving a pale background with
  // matching darker text, plus `dark:` variants that swap to a translucent dark background
  // (the `/20` is an opacity modifier) with light text so the pills stay readable in dark
  // mode. Note several tags are listed in both singular and plural forms ("Post"/"Posts",
  // "Media Mention"/"Media Mentions") so either spelling used in the data still finds a
  // colour. Tags with the same colour, like those pairs, are intentional duplicates.
  Games: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
  Apps: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  Robotics: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300',
  MUN: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/20 dark:text-fuchsia-300',
  Debate: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
  Teaching: 'bg-lime-50 text-lime-700 dark:bg-lime-900/20 dark:text-lime-300',
  Design: 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
  Miscellaneous: 'bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300',
  Post: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300',
  Posts: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300',
  // Keys containing a space must be written in quotes, since they are not valid identifiers.
  'Media Mention': 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300',
  'Media Mentions': 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300',
}

// The fallback styling for any tag not listed above, in the site's accent yellow. Having a
// default means a brand-new tag renders as a sensible pill instead of an unstyled one.
const DEFAULT_TAG_COLOR_CLASSES =
  'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'

// The accessor the components actually call. Keeping the table private and exposing only
// this function means callers can never get `undefined` back by accident.
export function getTagColorClasses(tag: string): string {
  // `??` supplies the default when the lookup misses. Using `??` rather than `||` is the
  // right choice for a lookup like this, because `||` would also replace a legitimately
  // empty-string value.
  return TAG_COLOR_CLASSES[tag] ?? DEFAULT_TAG_COLOR_CLASSES
}
