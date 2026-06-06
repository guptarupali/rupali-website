"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line-2 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-wrap items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-display text-lg text-cream">
          Rupali <span className="text-gold">Gupta</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-muted transition hover:text-cream">{n.label}</Link>
          ))}
          <Link href="/contact" className="btn btn-solid !px-5 !py-2 text-sm">Get in touch</Link>
        </nav>
        <button aria-label="Menu" className="md:hidden text-cream" onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-1 border-t border-line-2 px-5 py-3 md:hidden">
          {[...site.nav, { label: "Get in touch", href: "/contact" }].map((n) => (
            <Link key={n.href} href={n.href} className="py-2 text-muted" onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
