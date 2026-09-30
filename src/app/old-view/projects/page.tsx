/**
 * src/app/projects/page.tsx
 *
 * WHAT THIS FILE IS
 * In the Next.js App Router, the folder structure inside `src/app` *is* the URL structure, and a file
 * named `page.tsx` is what makes a folder into a real, visitable page. Because this file lives in
 * `src/app/projects/`, Next.js serves it at the URL `/projects`.
 *
 * WHEN NEXT.JS RENDERS IT
 * Whenever someone navigates to `/projects` (by typing the URL, or by clicking a `<Link href="/projects">`
 * in the navigation bar). The rendered output gets slotted into the `{children}` hole inside
 * `src/app/layout.tsx`, so the site-wide navigation bar and footer wrap around it automatically.
 *
 * CONCEPTS TO NOTICE
 * 1. There is no `"use client"` directive at the top of this file, so this is a **Server Component**.
 *    Server Components render into HTML on the server (or at build time) and ship zero JavaScript for
 *    themselves to the browser. That is the default in the App Router; you only opt out with `"use client"`.
 * 2. This page is deliberately tiny. It is a "route shell": its only job is to say *which* component
 *    represents this route. All the real markup, data, and interactivity live in `ProjectsSection`.
 *    Keeping routes thin like this means the same section component could be reused elsewhere, and it
 *    keeps routing concerns separate from UI concerns.
 */

// Pull in the component that draws the entire projects page UI (cards, filters, layout, and so on).
// The `@/` prefix is a TypeScript path alias configured in `tsconfig.json`; it means "start at `src/`",
// which saves you from writing fragile relative paths like `../../components/projects-section`.
import { ProjectsSection } from "@/components/projects-section"

// A `page.tsx` file must have a **default export** that is a React component. Next.js looks specifically
// for the default export to decide what to render for this route, so the function's name is only for
// your own readability — `ProjectsPage` is a convention, not a requirement.
export default function ProjectsPage() {
  // Render the section component and nothing else. No wrapper `<div>` is needed because `layout.tsx`
  // already provides the surrounding `<main>` element, the page background, and the min-height.
  return <ProjectsSection />
}
