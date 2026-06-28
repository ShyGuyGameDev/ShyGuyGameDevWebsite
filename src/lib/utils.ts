import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ReactNode } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Recursively extract the plain text from a React node so it can be searched.
export function getNodeText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join(' ')
  if (typeof node === 'object' && 'props' in node) {
    return getNodeText((node as { props?: { children?: ReactNode } }).props?.children)
  }
  return ''
}

export function getYearFromDate(date: string): number {
  return new Date(date).getFullYear()
}

// Newest first; when month and year match, sort A–Z by title (top-left to bottom-right).
export function compareByDateThenTitle(
  a: { date: string; title: string },
  b: { date: string; title: string },
): number {
  const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime()
  if (dateDiff !== 0) return dateDiff
  return a.title.localeCompare(b.title)
}

// Returns true when every whitespace-separated token in the query appears in the haystack.
export function matchesSearch(haystack: string, query: string): boolean {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return true
  const text = haystack.toLowerCase()
  return trimmed.split(/\s+/).every((token) => text.includes(token))
}

const TAG_COLOR_CLASSES: Record<string, string> = {
  Games: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
  Apps: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  Robotics: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300',
  MUN: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/20 dark:text-fuchsia-300',
  Debate: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
  Teaching: 'bg-lime-50 text-lime-700 dark:bg-lime-900/20 dark:text-lime-300',
  Miscellaneous: 'bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300',
  Post: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300',
  Posts: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300',
  'Media Mention': 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300',
  'Media Mentions': 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300',
}

const DEFAULT_TAG_COLOR_CLASSES =
  'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'

export function getTagColorClasses(tag: string): string {
  return TAG_COLOR_CLASSES[tag] ?? DEFAULT_TAG_COLOR_CLASSES
}
