"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const groups = (site as any).navGroups || site.nav;

  return (
    <header className="sticky top-0 z-50 border-b border-line-2 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-wrap items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-display text-lg text-cream">
          Rupali <span className="text-gold">Gupta</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {groups.map((n: any) => (
            n.children ? (
              <div key={n.label} className="relative group">
                {n.href ? (
                  <Link href={n.href} className="flex items-center gap-1 text-sm text-muted transition hover:text-cream">
                    {n.label}
                    <span className="text-[10px] opacity-70">▼</span>
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 text-sm text-muted transition hover:text-cream">
                    {n.label}
                    <span className="text-[10px] opacity-70">▼</span>
                  </button>
                )}
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[200px] rounded-xl border border-line-2 bg-panel p-2 shadow-xl">
                    {n.children.map((c: any) => (
                      <Link key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-bg hover:text-cream">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={n.href} href={n.href} className="text-sm text-muted transition hover:text-cream">{n.label}</Link>
            )
          ))}
          <Link href="/contact" className="btn btn-solid !px-5 !py-2 text-sm">Get in touch</Link>
        </nav>

        {/* Mobile toggle */}
        <button aria-label="Menu" className="md:hidden text-cream" onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>

      {/* Mobile nav */}
      {open ? (
        <nav className="flex flex-col gap-1 border-t border-line-2 px-5 py-3 md:hidden">
          {groups.map((n: any) => (
            n.children ? (
              <div key={n.label}>
                <button
                  className="flex w-full items-center justify-between py-2 text-muted"
                  onClick={() => setMobileExpanded(mobileExpanded === n.label ? null : n.label)}
                >
                  {n.label}
                  <span className="text-xs">{mobileExpanded === n.label ? "−" : "+"}</span>
                </button>
                {mobileExpanded === n.label && (
                  <div className="ml-4 flex flex-col gap-1 border-l border-line-2 pl-3">
                    {n.children.map((c: any) => (
                      <Link key={c.href} href={c.href} className="py-2 text-sm text-muted" onClick={() => setOpen(false)}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={n.href} href={n.href} className="py-2 text-muted" onClick={() => setOpen(false)}>{n.label}</Link>
            )
          ))}
          <Link href="/contact" className="py-2 text-gold" onClick={() => setOpen(false)}>Get in touch</Link>
        </nav>
      ) : null}
    </header>
  );
}
