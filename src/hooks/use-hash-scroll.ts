/**
 * use-hash-scroll.ts
 *
 * A custom hook that jumps the page down to an in-page anchor after the component has
 * mounted. It exists because the site's navigation links to section anchors on other
 * pages, such as `/projects#games`: the browser normally handles the `#games` part itself,
 * but it does that the instant the HTML arrives, which on this site is *before* React has
 * finished rendering the project grid that contains the `id="games"` element. By then the
 * browser has already given up, so this hook re-attempts the scroll once the element
 * really exists.
 *
 * Used by the pages that own anchored sections (the projects and posts pages) by simply
 * calling `useHashScroll()` at the top of the component.
 *
 * Concepts to notice:
 *  - Custom hooks and the `use` naming rule (see the comment on the function below).
 *  - `useEffect` with an empty dependency array and a cleanup function.
 *  - Reading `window.location.hash` to find out what the URL asked for.
 *  - `requestAnimationFrame` and `setTimeout` as two different ways to say "try again a
 *    moment from now", and why retrying is needed at all.
 */

// This hook reaches for `window` and `document`, which only exist in the browser, so the
// file must run on the client. `"use client"` marks it (and its importers' boundary) as
// client-side; without it Next.js would try to run this on the server and crash.
"use client"

// Only `useEffect` is needed here, so it is imported by name rather than as `React.useEffect`.
import { useEffect } from "react"

/**
 * Scrolls to the element matching `window.location.hash` after mount.
 * Needed because client-rendered grids may not have anchors in the DOM
 * when the browser's built-in hash jump fires on cross-page navigation.
 */
// The `use` prefix marks this as a hook, which tells React (and the ESLint rules) that it
// must be called from a component at the top level, never conditionally. This one returns
// nothing at all: it exists purely for its side effect of scrolling the page.
export function useHashScroll() {
  // Run after the component has rendered and the DOM is in place, which is the earliest
  // moment the target element could possibly exist.
  useEffect(() => {
    // `window.location.hash` includes the leading `#` (for example "#games"), so `.slice(1)`
    // trims that character off to leave the bare element id.
    const hash = window.location.hash.slice(1)
    // No hash in the URL means there is nothing to scroll to, so bail out early. Returning
    // `undefined` here also means this run of the effect registers no cleanup function.
    if (!hash) return

    // A small helper that attempts the scroll once and reports whether it worked. Defining
    // it as a local function lets the code below call it several times without duplication.
    const scrollToHash = () => {
      // `decodeURIComponent` undoes URL escaping, so a hash like `#media%20mention` becomes
      // the literal id "media mention" that `getElementById` can actually find.
      const el = document.getElementById(decodeURIComponent(hash))
      if (el) {
        // `scrollIntoView()` with no arguments scrolls instantly (no smooth animation) and
        // brings the top of the element to the top of the viewport.
        el.scrollIntoView()
        // Report success so the caller knows it does not need to retry.
        return true
      }
      // The element is not in the DOM yet. Report failure and let the caller retry.
      return false
    }

    // Best case: the anchor already rendered, the scroll worked, and there is nothing more
    // to do. Returning early again means no cleanup function is registered on this path.
    if (scrollToHash()) return

    // Retry once after paint in case the grid hasn't rendered yet.
    // `requestAnimationFrame` asks the browser to run this callback just before its next
    // repaint, which is the natural "one frame later" delay. The returned id is saved so the
    // pending frame can be cancelled if the component unmounts first.
    const frame = requestAnimationFrame(() => {
      if (!scrollToHash()) {
        // One more short retry for slower mounts.
        // A 50ms `setTimeout` as a final fallback for components that take longer than a
        // single frame to appear. Note this last timer is deliberately *not* tracked or
        // cancelled, so on a fast unmount it can still fire harmlessly.
        setTimeout(scrollToHash, 50)
      }
    })

    // The effect's cleanup function. React calls it when the component unmounts, cancelling
    // the queued animation frame so the callback never runs against a torn-down page.
    return () => cancelAnimationFrame(frame)
    // `[]` means run this once on mount only. That is intentional: the hook is about the
    // initial arrival at a URL, not about reacting to later hash changes.
  }, [])
}
