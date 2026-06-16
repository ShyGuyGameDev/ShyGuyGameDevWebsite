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

// Returns true when every whitespace-separated token in the query appears in the haystack.
export function matchesSearch(haystack: string, query: string): boolean {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return true
  const text = haystack.toLowerCase()
  return trimmed.split(/\s+/).every((token) => text.includes(token))
}
