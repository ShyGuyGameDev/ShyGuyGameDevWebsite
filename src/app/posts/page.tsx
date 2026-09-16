/**
 * src/app/posts/page.tsx
 *
 * WHAT THIS FILE IS
 * The page for the `/posts` route. In the App Router, the folder name (`posts`) becomes the URL segment
 * and the special filename `page.tsx` is what tells Next.js "this folder is a page people can visit".
 * Rename the folder and the URL changes with it — there is no separate routes/config file to update.
 *
 * WHEN NEXT.JS RENDERS IT
 * When a visitor lands on `/posts`. Whatever this component returns is placed into the `{children}`
 * slot of the root layout (`src/app/layout.tsx`), so the shared navigation bar and footer appear
 * around it without this file having to mention them.
 *
 * CONCEPTS TO NOTICE
 * 1. No `"use client"` at the top means this is a **Server Component** (the App Router default). It runs
 *    on the server and sends finished HTML to the browser instead of shipping its own JavaScript bundle.
 *    Only components that need browser-only features (`useState`, `useEffect`, click handlers, access to
 *    `window`) need the `"use client"` opt-in — and `PostsSection` can declare that for itself if needed.
 * 2. The pattern here mirrors `src/app/projects/page.tsx` and `src/app/team/page.tsx`: the route file is a
 *    thin shell that just names the section component responsible for the page's content.
 */

// Import the component that renders the actual list of posts. `@/` is a path alias meaning `src/`,
// set up in `tsconfig.json`, so this resolves to `src/components/posts-section.tsx`.
import { PostsSection } from "@/components/posts-section"

// Next.js renders the **default export** of a `page.tsx` file, so this must be `export default`.
// The function name is just documentation for humans reading the file.
export default function PostsPage() {
  // Hand the whole route over to `PostsSection`. Returning a single component with no extra wrapper is
  // fine — JSX only requires one root element, and the layout already supplies the page chrome.
  return <PostsSection />
}
