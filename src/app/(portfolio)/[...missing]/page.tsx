import { notFound } from "next/navigation"

/** Sends unmatched URLs to the portfolio 404, inside this layout, instead of the root fallback. */
export default function V2CatchAll() {
  notFound()
}
