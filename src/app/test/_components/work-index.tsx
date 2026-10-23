"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export type IndexItem = {
  slug: string
  title: string
  href: string
  kind: string
  date: string
  still: { src: string; alt: string; fit?: "cover" | "contain" }
}

/**
 * Names pass a held square. Whichever name crosses the middle of the viewport is current, and the
 * frame behind the list shows its still with its kind and year beside it. Pointing at or tabbing
 * to a name makes it current too.
 */
export function WorkIndex({ items, more }: { items: IndexItem[]; more: { label: string; href: string } }) {
  const [current, setCurrent] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const rows = Array.from(list.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(rows.indexOf(entry.target as HTMLElement))
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  const item = items[current]

  return (
    <section id="work" className="index wrap" aria-labelledby="work-title">
      <h2 id="work-title" className="index__heading display" data-reveal>
        Select Work
      </h2>
      <div className="index__body">
        <div className="index__stage" aria-hidden="true">
          <div className="index__frame frame">
            {items.map((it, i) => (
              <div key={it.slug} data-current={i === current} className={it.still.fit === "contain" ? "frame--contain" : undefined}>
                <Image src={it.still.src} alt="" fill sizes="(min-width: 768px) 450px, 60vw" />
              </div>
            ))}
          </div>
          <span className="index__fact index__fact--kind">{item.kind}</span>
          <span className="index__fact index__fact--year">{item.date}</span>
        </div>
        <ul ref={listRef} className="index__list display">
          {items.map((it, i) => {
            const external = !it.href.startsWith("/")
            const props = {
              "data-current": i === current,
              onPointerEnter: () => setCurrent(i),
              onFocus: () => setCurrent(i),
            }
            return (
              <li key={it.slug} data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
                {external ? (
                  <a href={it.href} target="_blank" rel="noopener noreferrer" {...props}>
                    {it.title}
                  </a>
                ) : (
                  <Link href={it.href} {...props}>
                    {it.title}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <Link href={more.href} className="index__more link" data-reveal>
        {more.label}
      </Link>
    </section>
  )
}
