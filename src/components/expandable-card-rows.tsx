"use client"

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

const DEFAULT_CARDS_PER_ROW = 3

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

type PlacedItem<T> = {
  item: T
  row: number
  column: number
  /** Leftover cards are nudged right by half a column so the row reads centered. */
  centered: boolean
}

function placeItems<T>(items: T[], cardsPerRow: number): PlacedItem<T>[][] {
  const fullRows = Math.floor(items.length / cardsPerRow)
  const leftover = items.length % cardsPerRow
  const columns: PlacedItem<T>[][] = Array.from({ length: cardsPerRow }, () => [])
  const leftoverOffset = leftover === 0 ? 0 : (cardsPerRow - leftover) / 2
  const leftoverStartColumn = Math.floor(leftoverOffset)
  const leftoverCentered = leftover !== 0 && leftoverOffset !== leftoverStartColumn

  items.forEach((item, index) => {
    const row = Math.floor(index / cardsPerRow)
    const positionInRow = index % cardsPerRow
    const isLeftoverRow = leftover !== 0 && row === fullRows
    const column = isLeftoverRow ? leftoverStartColumn + positionInRow : positionInRow
    columns[column].push({
      item,
      row,
      column,
      centered: isLeftoverRow && leftoverCentered,
    })
  })

  return columns
}

export function ExpandableCardRows<T>({
  items,
  getItemKey,
  keyPrefix = "",
  cardsPerRow = DEFAULT_CARDS_PER_ROW,
  renderCard,
}: {
  items: T[]
  getItemKey: (item: T) => string
  keyPrefix?: string
  cardsPerRow?: number
  renderCard: (
    item: T,
    expanded: boolean,
    onToggleExpanded: () => void,
  ) => ReactNode
}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [rowHeights, setRowHeights] = useState<number[]>([])
  const itemKey = items.map(getItemKey).join("|")
  const rowCount = Math.ceil(items.length / cardsPerRow)
  const columns = useMemo(
    () => placeItems(items, cardsPerRow),
    [items, cardsPerRow],
  )
  const columnWidth = `calc((100% - ${cardsPerRow - 1}rem) / ${cardsPerRow})`

  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const measure = () => {
      const slots = Array.from(
        grid.querySelectorAll<HTMLElement>("[data-card-slot]"),
      )
      const expandedRows = new Set(
        slots
          .filter((slot) => slot.dataset.expanded === "true")
          .map((slot) => Number(slot.dataset.row)),
      )
      const collapsed = slots.filter(
        (slot) =>
          slot.dataset.expanded !== "true" &&
          !expandedRows.has(Number(slot.dataset.row)),
      )

      // Drop the shared height before reading so a row can shrink again.
      const applied = collapsed.map((slot) => slot.style.height)
      collapsed.forEach((slot) => {
        slot.style.height = ""
      })
      const measured = new Map<number, number>()
      collapsed.forEach((slot) => {
        const row = Number(slot.dataset.row)
        const height = slot.getBoundingClientRect().height
        measured.set(row, Math.max(measured.get(row) ?? 0, height))
      })
      collapsed.forEach((slot, index) => {
        slot.style.height = applied[index]
      })

      setRowHeights((current) => {
        const next = current.slice(0, rowCount)
        measured.forEach((height, row) => {
          next[row] = height
        })
        const unchanged =
          next.length === current.length &&
          next.every((height, index) => height === current[index])
        return unchanged ? current : next
      })
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    window.addEventListener("resize", measure)
    // Late-loading fonts change how much room the text needs.
    document.fonts?.ready.then(measure)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [itemKey, rowCount, expandedKeys])

  return (
    <div ref={gridRef} className="flex items-start justify-center gap-4">
      {columns.map((column, columnIndex) => (
        <div
          key={`${keyPrefix}column-${columnIndex}`}
          className="flex min-w-0 flex-col gap-4"
          style={{ width: columnWidth }}
        >
          {column.map(({ item, row, centered }) => {
            const key = getItemKey(item)
            const expanded = expandedKeys.includes(key)
            const collapsedHeight = rowHeights[row]
            return (
              <div
                key={`${keyPrefix}${key}`}
                data-card-slot
                data-row={row}
                data-expanded={expanded ? "true" : "false"}
                className="flex w-full"
                style={{
                  ...(centered
                    ? { transform: "translateX(calc(50% + 0.5rem))" }
                    : null),
                  ...(!expanded && collapsedHeight
                    ? { height: collapsedHeight }
                    : null),
                }}
              >
                {renderCard(item, expanded, () => {
                  setExpandedKeys((current) =>
                    current.includes(key)
                      ? current.filter((expandedKey) => expandedKey !== key)
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
