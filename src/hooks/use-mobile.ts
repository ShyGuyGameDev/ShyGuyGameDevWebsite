/**
 * use-mobile.ts
 *
 * A custom hook that reports whether the browser window is currently phone-sized
 * (narrower than 768px). Components can call it to change behaviour, not just styling,
 * on small screens, for example rendering a drawer instead of a sidebar.
 *
 * NOTE: nothing in this site's own components calls `useIsMobile` right now. It arrived as
 * part of the shadcn/ui component set (their sidebar component uses it), so treat it as a
 * useful reference implementation that happens to be unused rather than live site code.
 *
 * Concepts to notice:
 *  - What makes something a "custom hook": it is just a normal function, but its name
 *    starts with `use` and it calls other hooks inside. The `use` prefix is a real rule,
 *    not a style choice: React's linting and its internal bookkeeping rely on it to know
 *    that this function must be called from a component (or another hook), at the top
 *    level, and in the same order on every render, never inside an if or a loop.
 *  - `useState` for remembering a value between renders.
 *  - `useEffect` with an empty dependency array plus a cleanup function.
 *  - `window.matchMedia`, the JavaScript equivalent of a CSS media query, which lets code
 *    react to screen-size changes instead of only styling around them.
 */

// The React namespace import means every hook is reached as `React.useState`, `React.useEffect`,
// and so on. That is purely a style difference from `import { useState } from 'react'`.
import * as React from 'react'

// The cutoff, in CSS pixels, between "mobile" and everything larger. Pulling it out as a
// named constant keeps the number in one place and matches Tailwind's own `md` breakpoint.
const MOBILE_BREAKPOINT = 768

// The custom hook. It returns a single boolean, so calling code reads like
// `const isMobile = useIsMobile()`.
export function useIsMobile() {
  // `useState` gives this hook a piece of memory that survives re-renders, plus a setter
  // that tells React "this changed, please render again". The initial value is `undefined`
  // rather than `false` on purpose: on the server, and on the very first browser render,
  // the window size is genuinely unknown, and `undefined` records "not measured yet"
  // instead of pretending the screen is wide. The angle brackets are a TypeScript generic
  // saying the stored value is either a boolean or undefined.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // `useEffect` runs code *after* React has rendered and put things on the screen. It is
  // the right place for anything that touches the outside world: timers, network requests,
  // and browser APIs like `window`. Measuring the window inside the component body instead
  // would break server rendering, because there is no `window` on the server.
  React.useEffect(() => {
    // `matchMedia` builds a live media-query object. `(max-width: 767px)` is exactly the
    // query a CSS rule would use; subtracting 1 makes 768px itself count as "not mobile",
    // so this boundary matches Tailwind's min-width-based breakpoints instead of overlapping.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    // The handler that runs whenever the query starts or stops matching. Note it ignores the
    // event and re-measures `window.innerWidth` directly; `mql.matches` would work too.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    // Subscribe. From now on the browser calls `onChange` every time the window crosses the
    // breakpoint, for instance when the user resizes or rotates their phone.
    mql.addEventListener('change', onChange)
    // The listener only fires on *changes*, so take one reading immediately to establish the
    // starting value. This is the render that replaces the initial `undefined`.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    // Whatever an effect returns is its cleanup function, and React calls it when the
    // component unmounts (or before re-running the effect). Removing the listener here is
    // essential: without it, every mount would leave a dead subscription behind that keeps
    // calling `setState` on a component that no longer exists, which is a memory leak.
    return () => mql.removeEventListener('change', onChange)
    // The empty dependency array `[]` means "run this effect once after the first render and
    // never again". A non-empty array would re-run the effect whenever a listed value changed;
    // omitting the array entirely would re-run it after every single render.
  }, [])

  // `!!` is a double negation: it converts the `boolean | undefined` state into a plain
  // boolean, so the not-yet-measured `undefined` is reported to callers as `false`.
  return !!isMobile
}
