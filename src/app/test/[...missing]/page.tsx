import { notFound } from "next/navigation"

/** Sends unmatched `/test/*` URLs to the dark v2 404 instead of the site-wide light one. */
export default function V2CatchAll() {
  notFound()
}
