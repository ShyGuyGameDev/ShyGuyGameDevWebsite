/**
 * ExpandableCardRows: the generic grid that both the Projects page and the Posts page use to lay
 * out cards three-per-row, keep every card in a row the same height, and let one card "expand"
 * (grow taller to show its full text) when it is clicked.
 *
 * Where you see it on the site: every group of project cards under a heading such as
 * "Featured Currently", "Games", or "MUN" is one of these grids.
 *
 * Key ideas a learner should notice in this file:
 *  - It is a GENERIC component (`<T>`): it does not know or care what an "item" is. The parent
 *    passes `items`, a `getItemKey` function, and a `renderCard` function that draws one card.
 *    That is called "render props" - passing a function that returns JSX instead of fixed markup.
 *  - Layout is done with COLUMNS, not rows: we build `cardsPerRow` vertical flex columns and drop
 *    each item into the right column. A card that grows taller therefore only pushes down the
 *    cards beneath it in its own column, instead of shoving the whole row around.
 *  - Heights are matched by MEASURING the real DOM (`getBoundingClientRect`) after paint, then
 *    writing an inline `height` back onto each collapsed slot.
 *  - Re-measuring is triggered by a `ResizeObserver`, the window `resize` event, and
 *    `document.fonts.ready`, because all three can change how tall text ends up being.
 */

// "use client" tells Next.js that this file is a Client Component. By default every component in
// the Next.js App Router runs only on the server, where there is no browser, no click handlers and
// no `useState`. Anything that uses hooks, event handlers, or browser APIs (all of which this file
// does) must opt in with this directive on the very first line.
"use client"

// React hooks and one type-only import. `type ReactNode` is erased at build time; it just describes
// "anything React can render": JSX, a string, a number, null, an array of those, etc.
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

// How many cards sit side by side in one row unless the caller asks for a different number.
// Pulling the magic number out into a named constant makes the maths below easier to read.
const DEFAULT_CARDS_PER_ROW = 3

// `useLayoutEffect` runs synchronously right AFTER React writes to the DOM but BEFORE the browser
// paints, which is exactly what you want for measuring and resizing elements: the user never sees
// the unadjusted layout flash. The catch is that during server-side rendering there is no DOM and
// no paint, so React logs a warning if you call `useLayoutEffect` on the server.
// The fix is this "isomorphic layout effect" pattern: on the server (`window` is undefined) fall
// back to `useEffect`, which React is happy to no-op; in the browser use the real thing.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

// The result of the placement maths: one original item plus where it should live in the grid.
// `<T>` is a generic type parameter - "whatever type the caller's items are" - so this same type
// works for project objects, post objects, or anything else.
type PlacedItem<T> = {
  item: T
  row: number
  column: number
  /** Leftover cards are nudged right by half a column so the row reads centered. */
  centered: boolean
}

// Turn a flat list of items into `cardsPerRow` columns, deciding for every item which row and
// column it belongs to. The return type is an array of columns, each column an array of items
// stacked top to bottom. Reading order is still left-to-right: index 0 goes to column 0 row 0,
// index 1 to column 1 row 0, index 3 back to column 0 row 1, and so on.
function placeItems<T>(items: T[], cardsPerRow: number): PlacedItem<T>[][] {
  // How many completely full rows there are. With 8 items and 3 per row that is 2 full rows.
  const fullRows = Math.floor(items.length / cardsPerRow)
  // How many cards are stranded in the final, partly empty row. With 8 items and 3 per row: 2.
  const leftover = items.length % cardsPerRow
  // Start with one empty array per column. `Array.from({ length: n }, () => [])` is the safe way to
  // build n DIFFERENT empty arrays; `new Array(n).fill([])` would reuse the SAME array n times.
  const columns: PlacedItem<T>[][] = Array.from({ length: cardsPerRow }, () => [])
  // How far right the leftover cards should start so the short row looks centred under the full
  // ones. With 3 per row and 2 leftovers: (3 - 2) / 2 = 0.5 columns of empty space on each side.
  const leftoverOffset = leftover === 0 ? 0 : (cardsPerRow - leftover) / 2
  // Columns are whole numbers, so round the offset down to pick the real starting column.
  const leftoverStartColumn = Math.floor(leftoverOffset)
  // If the ideal offset had a fraction (0.5 above), rounding down left the row half a column too far
  // left. Remember that, so the renderer can nudge those cards right with a CSS transform.
  const leftoverCentered = leftover !== 0 && leftoverOffset !== leftoverStartColumn

  // Walk the items in order and file each one into its column.
  items.forEach((item, index) => {
    // Integer division gives the row: items 0-2 are row 0, items 3-5 are row 1, etc.
    const row = Math.floor(index / cardsPerRow)
    // The remainder gives the slot within that row: 0, 1, 2, 0, 1, 2, ...
    const positionInRow = index % cardsPerRow
    // Is this item in the final, partly filled row? Rows are zero-indexed, so the leftover row's
    // number equals the count of full rows above it.
    const isLeftoverRow = leftover !== 0 && row === fullRows
    // Leftover cards are shifted right by the starting column; everyone else sits where they fall.
    const column = isLeftoverRow ? leftoverStartColumn + positionInRow : positionInRow
    columns[column].push({
      item,
      row,
      column,
      // Only the stranded final row ever gets the half-column nudge.
      centered: isLeftoverRow && leftoverCentered,
    })
  })

  return columns
}

// The component itself. It is generic over `T`, and the props are destructured straight out of the
// props object in the parameter list. `keyPrefix = ""` and `cardsPerRow = DEFAULT_CARDS_PER_ROW`
// are DEFAULT VALUES, used whenever the caller leaves those props out.
export function ExpandableCardRows<T>({
  items,
  getItemKey,
  keyPrefix = "",
  cardsPerRow = DEFAULT_CARDS_PER_ROW,
  renderCard,
}: {
  // The raw list to lay out; the component never inspects what is inside an item.
  items: T[]
  // Turns one item into a stable, unique string. React needs such a `key` per list element, and
  // this component also uses it to remember which cards are expanded.
  getItemKey: (item: T) => string
  // Optional text glued onto the front of every key, so two grids on the same page (for example the
  // "Featured Currently" grid and the "Games" grid) cannot accidentally produce identical keys.
  keyPrefix?: string
  // `?` marks a prop as optional. Omit it and the default above applies.
  cardsPerRow?: number
  // The render prop: given an item, whether it is currently expanded, and a callback to flip that,
  // return the JSX for one card. This is what keeps the component reusable.
  renderCard: (
    item: T,
    expanded: boolean,
    onToggleExpanded: () => void,
  ) => ReactNode
}) {
  // `useRef` creates a mutable box that survives re-renders. Attaching it to an element via
  // `ref={gridRef}` lets React store the real DOM node in `gridRef.current`, which is how the
  // measuring code below gets its hands on the actual HTML. Changing a ref does NOT re-render.
  const gridRef = useRef<HTMLDivElement>(null)
  // `useState` gives a value plus a setter; calling the setter re-renders the component with the new
  // value. Here it remembers the keys of every card the user has opened.
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  // The measured height (in pixels) of the tallest collapsed card in each row, indexed by row.
  const [rowHeights, setRowHeights] = useState<number[]>([])
  // A single string summarising the current list, e.g. "Open Stage|News Digest|...". Effects compare
  // dependencies with `===`, and a fresh `items` array would look "different" on every render, so
  // collapsing the list into one string gives a dependency that only changes when the items do.
  const itemKey = items.map(getItemKey).join("|")
  // Round UP: 8 items at 3 per row still needs 3 rows, because the last row is partly empty.
  const rowCount = Math.ceil(items.length / cardsPerRow)
  // `useMemo` caches the result of a calculation between renders and only re-runs it when one of the
  // dependencies changes. The placement maths is cheap, but memoising also keeps the returned array
  // IDENTICAL (same object in memory) across unrelated re-renders, which avoids pointless work.
  const columns = useMemo(
    () => placeItems(items, cardsPerRow),
    [items, cardsPerRow],
  )
  // CSS width for one column: take the full width, subtract the gaps between columns (there are
  // `cardsPerRow - 1` gaps of 1rem each), then split what is left evenly. `calc()` lets CSS mix
  // percentages and rem units, which plain arithmetic in JavaScript could not do.
  const columnWidth = `calc((100% - ${cardsPerRow - 1}rem) / ${cardsPerRow})`

  // This effect is the height-matching engine. It runs after React has rendered the cards, measures
  // how tall each collapsed card actually is, and records the tallest one per row so every card in
  // that row can be stretched to match.
  useIsomorphicLayoutEffect(() => {
    // `.current` is the real <div> once React has attached it.
    const grid = gridRef.current
    // On the very first pass (or if the element vanished) there is nothing to measure, so bail out.
    if (!grid) return

    // Defined as an inner function so the same logic can be reused by every trigger below.
    const measure = () => {
      // `querySelectorAll` finds every element carrying the `data-card-slot` attribute. Data
      // attributes are custom `data-*` HTML attributes; they are used here purely as measurement
      // hooks, so the JavaScript can find and label elements without relying on CSS class names.
      // `querySelectorAll` returns a NodeList, and `Array.from` converts it into a real array so
      // `.filter` and `.map` are available.
      const slots = Array.from(
        grid.querySelectorAll<HTMLElement>("[data-card-slot]"),
      )
      // Collect the row numbers that contain an open card. A `Set` stores unique values and answers
      // "does it contain X?" quickly. `slot.dataset.expanded` reads the `data-expanded` attribute;
      // HTML attributes are always strings, hence comparing against the string "true".
      const expandedRows = new Set(
        slots
          .filter((slot) => slot.dataset.expanded === "true")
          .map((slot) => Number(slot.dataset.row)),
      )
      // The slots worth measuring: closed cards that are NOT in a row containing an open card.
      // Once a row has an expanded card, that row is allowed to be whatever height it likes, so
      // measuring it would record a misleading, inflated height.
      const collapsed = slots.filter(
        (slot) =>
          slot.dataset.expanded !== "true" &&
          !expandedRows.has(Number(slot.dataset.row)),
      )

      // Drop the shared height before reading so a row can shrink again.
      // (Without this, a previously applied tall height would be re-measured as the "natural"
      // height forever and the row could only ever grow.) First remember what was applied...
      const applied = collapsed.map((slot) => slot.style.height)
      // ...then clear it so each card falls back to its natural content height.
      collapsed.forEach((slot) => {
        slot.style.height = ""
      })
      // A Map from row number -> tallest height seen so far in that row.
      const measured = new Map<number, number>()
      collapsed.forEach((slot) => {
        const row = Number(slot.dataset.row)
        // `getBoundingClientRect()` asks the browser for the element's real on-screen box, in CSS
        // pixels, including any fractional part. `.height` is what we care about here.
        const height = slot.getBoundingClientRect().height
        // Keep the larger of "what we already recorded for this row" and "this card".
        // `?? 0` supplies 0 the first time a row is seen, since `Map.get` returns undefined then.
        measured.set(row, Math.max(measured.get(row) ?? 0, height))
      })
      // Put the old inline heights back immediately, before the browser paints, so the user never
      // sees the cards collapse to their natural size and snap back.
      collapsed.forEach((slot, index) => {
        slot.style.height = applied[index]
      })

      // Save the measurements. Passing a FUNCTION to a state setter gives you the latest state as
      // `current`, which is safer than closing over a possibly stale value.
      setRowHeights((current) => {
        // Trim away rows that no longer exist (for example after filtering shrinks the list).
        const next = current.slice(0, rowCount)
        // Overwrite each row we just measured. Rows skipped because they contain an expanded card
        // keep whatever height they had.
        measured.forEach((height, row) => {
          next[row] = height
        })
        // Compare old and new element by element.
        const unchanged =
          next.length === current.length &&
          next.every((height, index) => height === current[index])
        // Returning the exact same object tells React "nothing changed", so it skips the re-render.
        // Returning a new array every time would re-render, re-measure, re-render... forever.
        return unchanged ? current : next
      })
    }

    // Measure once straight away, for the initial layout.
    measure()

    // A `ResizeObserver` calls back whenever the observed element changes size - far more reliable
    // than the window resize event alone, because the grid can also change size when a sidebar
    // opens, a font swaps in, or a card expands.
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    // Window resizes change the column width, which changes how many lines the text wraps onto.
    window.addEventListener("resize", measure)
    // Late-loading fonts change how much room the text needs.
    // `document.fonts.ready` is a Promise that resolves once all web fonts have finished loading.
    // The `?.` guards against browsers that do not expose the Font Loading API at all.
    document.fonts?.ready.then(measure)

    // The cleanup function. React runs it before re-running the effect and when the component is
    // removed, so listeners and observers do not pile up and leak memory.
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
    // Re-measure whenever the list changes, the number of rows changes, or a card is opened/closed.
  }, [itemKey, rowCount, expandedKeys])

  return (
    // The outer flex row holds the columns side by side. `ref={gridRef}` hands this DOM node to the
    // effect above; `items-start` stops short columns from stretching; `gap-4` is the 1rem gap the
    // `columnWidth` calculation subtracted.
    <div ref={gridRef} className="flex items-start justify-center gap-4">
      {/* One <div> per column. `.map` over an array inside JSX is how React renders lists. */}
      {columns.map((column, columnIndex) => (
        // `key` must be unique among siblings so React can tell the columns apart between renders.
        // `flex-col` stacks this column's cards vertically; `min-w-0` lets the column shrink below
        // its content width so long words cannot blow the layout out sideways.
        <div
          key={`${keyPrefix}column-${columnIndex}`}
          className="flex min-w-0 flex-col gap-4"
          style={{ width: columnWidth }}
        >
          {/* Now render the cards inside this column. The parameter is destructured, pulling
              `item`, `row` and `centered` straight out of each PlacedItem object. */}
          {column.map(({ item, row, centered }) => {
            // The card's stable identity, used both as the React key and as the "am I open?" token.
            const key = getItemKey(item)
            // A card is expanded if its key is in the state array.
            const expanded = expandedKeys.includes(key)
            // The shared height measured for this row, or undefined before the first measurement.
            const collapsedHeight = rowHeights[row]
            return (
              // The "slot": a wrapper around the card that owns the measured height and the nudge.
              // The three `data-*` attributes are the hooks the measuring effect searches for:
              //   data-card-slot -> "this element is measurable"
              //   data-row       -> which row it belongs to
              //   data-expanded  -> whether it is currently open ("true"/"false" as strings)
              <div
                key={`${keyPrefix}${key}`}
                data-card-slot
                data-row={row}
                data-expanded={expanded ? "true" : "false"}
                className="flex w-full"
                style={{
                  // Spreading an object or `null` into `style` is a neat way to add properties
                  // conditionally: `...null` contributes nothing at all.
                  // Half a column plus half a gap right, so the short final row looks centred.
                  ...(centered
                    ? { transform: "translateX(calc(50% + 0.5rem))" }
                    : null),
                  // Only closed cards get the forced shared height. Expanding a card removes the
                  // height entirely, which is what lets it grow to fit its full text.
                  ...(!expanded && collapsedHeight
                    ? { height: collapsedHeight }
                    : null),
                }}
              >
                {/* Hand control back to the parent: it decides what a card looks like. The third
                    argument is the toggle callback wired to the card's click handler. */}
                {renderCard(item, expanded, () => {
                  setExpandedKeys((current) =>
                    // Already open -> remove the key (close it). `.filter` returns a NEW array
                    // rather than mutating the old one, which is what React expects of state.
                    current.includes(key)
                      ? current.filter((expandedKey) => expandedKey !== key)
                      // Not open yet -> copy the existing keys and append this one.
                      : [...current, key],
                  )
                })}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
