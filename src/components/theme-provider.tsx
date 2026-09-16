/**
 * theme-provider.tsx
 *
 * A very thin wrapper around the `next-themes` library's provider component.
 * It is mounted once near the top of the app (in the root layout) so that every
 * page underneath it can read and change the light/dark colour theme.
 *
 * Concepts to notice:
 *  - The `"use client"` directive, which marks this file as a Client Component.
 *  - `children`, the special prop that holds whatever JSX is nested inside a component.
 *  - Rest/spread (`...props` and `{...props}`), used here to forward every option
 *    straight through to the real provider without listing each one by hand.
 *  - Re-exporting a library component under your own name, so the rest of the app
 *    imports `ThemeProvider` from this file and never touches `next-themes` directly.
 */

// Next.js renders components on the server by default. `'use client'` opts this file
// (and anything it imports) into running in the browser as well, which is required here
// because next-themes uses React context, browser storage, and the DOM.
'use client'

// Import the whole React namespace. This file does not use React directly any more,
// but keeping the import means JSX types resolve and React APIs are one `React.` away.
import * as React from 'react'
import {
  // The library's provider is renamed on import so our own exported component can be
  // called `ThemeProvider` without the two names colliding inside this file.
  ThemeProvider as NextThemesProvider,
  // `type` in front of an import tells TypeScript this is only a type, not real runtime
  // code, so the bundler can drop it entirely from the JavaScript it ships.
  type ThemeProviderProps,
} from 'next-themes'

// Pull `children` out of the props object and collect every remaining prop into `props`.
// That rest-object trick is how this component stays future-proof: any new next-themes
// option (attribute, defaultTheme, enableSystem, ...) works with no change here.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Spread the forwarded options onto the real provider and render the nested tree inside
  // it. Wrapping rather than replacing means the theme context surrounds the whole app.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
