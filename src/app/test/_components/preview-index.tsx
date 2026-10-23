import Image from "next/image"
import Link from "next/link"

export type PreviewRow = {
  slug: string
  title: string
  href?: string
  summary: string
  meta: string
  still?: { src: string; alt: string; fit?: "cover" | "contain" }
  mention?: { label: string; href: string }
}

/**
 * Rows of project names, each with its still at the far side. On a fine pointer, pointing at a
 * row dims the others so the one under the cursor reads first.
 */
export function PreviewIndex({ rows }: { rows: PreviewRow[] }) {
  return (
    <ul className="preview-index">
      {rows.map((row, i) => (
        <li key={row.slug} className="preview-index__row" data-reveal style={{ "--i": i } as React.CSSProperties}>
          <h3 className="preview-index__name">
            {row.href ? (
              row.href.startsWith("/") ? (
                <Link href={row.href}>{row.title}</Link>
              ) : (
                <a href={row.href} target="_blank" rel="noopener noreferrer">
                  {row.title}
                </a>
              )
            ) : (
              row.title
            )}
          </h3>
          <p className="preview-index__summary">{row.summary}</p>
          <div className="preview-index__side">
            <p className="preview-index__meta">{row.meta}</p>
            {row.mention && (
              <a href={row.mention.href} target="_blank" rel="noopener noreferrer" className="preview-index__mention link">
                {row.mention.label}
              </a>
            )}
          </div>
          {row.still && (
            <div className={`preview-index__thumb frame${row.still.fit === "contain" ? " frame--contain" : ""}`}>
              <Image src={row.still.src} alt={row.still.alt} fill sizes="(min-width: 1024px) 25vw, 100vw" />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
