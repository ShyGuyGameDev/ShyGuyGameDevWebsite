import { notFound } from "next/navigation"

/** Keeps unknown `/old-view/*` URLs on the previous site's 404 instead of the portfolio one. */
export default function OldViewCatchAll() {
  notFound()
}
