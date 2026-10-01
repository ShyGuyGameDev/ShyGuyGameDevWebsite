import { ContactLinks } from "./contact-links"

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-(--v2-border)">
      <div className="mx-auto flex max-w-[1040px] flex-col gap-6 px-6 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Get in touch</h2>
          <p className="mt-1 text-sm text-(--v2-muted)">Email is the fastest way to reach ShyGuy.</p>
        </div>
        <ContactLinks />
      </div>
    </footer>
  )
}
