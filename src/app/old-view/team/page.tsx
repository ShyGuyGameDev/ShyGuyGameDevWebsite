/**
 * src/app/team/page.tsx
 *
 * WHAT THIS FILE IS
 * The page served at the `/team` URL. This is App Router file-based routing: the path of the folder
 * under `src/app` becomes the path in the browser's address bar, and the reserved filename `page.tsx`
 * marks that folder as a navigable page (as opposed to a folder that only holds helpers or components).
 *
 * WHEN NEXT.JS RENDERS IT
 * On any request to `/team`. Its output is injected into the `{children}` placeholder in
 * `src/app/layout.tsx`, which is why the navigation bar and footer show up here for free.
 *
 * CONCEPTS TO NOTICE
 * 1. This is a **Server Component** because the file does not begin with the `"use client"` directive.
 *    Server Components execute on the server, so they can do server-only work (read files, use secrets)
 *    but cannot use React hooks or respond to clicks. Interactive pieces live in client components.
 * 2. Note what is *absent*: there is no `export const metadata` here, so this page inherits the title,
 *    description, and social-sharing (Open Graph / Twitter) metadata defined in the root layout. Adding
 *    a `metadata` export to this file would let `/team` have its own tab title and link preview.
 */

// Bring in the component that renders the team page's content. `@/components/...` uses the `@/` alias
// (configured in `tsconfig.json` to point at `src/`) instead of a relative `../../` path.
import { TeamSection } from "@/components/team-section"

// The default export is the contract between this file and the Next.js router: whatever component you
// default-export from `page.tsx` is what gets rendered for the route.
export default function TeamPage() {
  // Delegate everything to `TeamSection`. Keeping the route file this thin makes it obvious at a glance
  // which component owns each URL on the site.
  return <TeamSection />
}
