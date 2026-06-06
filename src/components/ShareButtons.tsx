"use client";
import { site } from "@/lib/site";

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = `${site.url}/blog/${slug}`;
  const enc = encodeURIComponent;
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
  ];
  function copy() {
    navigator.clipboard?.writeText(url);
  }
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener" className="text-sm text-gold-2 hover:text-gold">{l.label}</a>
      ))}
      <button onClick={copy} className="text-sm text-gold-2 hover:text-gold">Copy link</button>
    </div>
  );
}
