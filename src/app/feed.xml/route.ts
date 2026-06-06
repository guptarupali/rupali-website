import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${site.url}/blog/${p.slug}</link>
  <guid>${site.url}/blog/${p.slug}</guid>
  <pubDate>${p.date ? new Date(p.date).toUTCString() : ""}</pubDate>
  <description>${esc(p.excerpt)}</description>
</item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(site.name)} · Writing</title>
<link>${site.url}/blog</link>
<description>${esc(site.description)}</description>
${items}
</channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
