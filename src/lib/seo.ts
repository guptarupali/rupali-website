import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta(title: string, description?: string, pathname = "/"): Metadata {
  const url = site.url + pathname;
  const desc = description || site.description;
  const full = title === site.name ? title : `${title} · ${site.name}`;
  return {
    title: full,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title: full, description: desc, url, siteName: site.name, type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: full, description: desc, images: ["/og-image.png"] },
  };
}
