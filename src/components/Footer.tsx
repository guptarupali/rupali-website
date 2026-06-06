import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line-2 py-14">
      <div className="mx-auto grid max-w-wrap gap-8 px-5 md:grid-cols-3 md:px-8">
        <div>
          <div className="font-display text-lg text-cream">Rupali <span className="text-gold">Gupta</span></div>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.role}. Platform engineering and the governance of agentic AI at enterprise scale.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {site.nav.map((n) => <Link key={n.href} href={n.href} className="text-muted hover:text-cream">{n.label}</Link>)}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={site.linkedin} target="_blank" rel="noopener" className="text-muted hover:text-cream">LinkedIn</a>
          <Link href="/newsletters/ai-pulse" className="text-muted hover:text-cream">AI Pulse newsletter</Link>
          <Link href="/newsletters/platform-path" className="text-muted hover:text-cream">The Platform Path</Link>
          <Link href="/contact" className="text-muted hover:text-cream">Contact</Link>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-wrap px-5 text-xs text-muted md:px-8">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
