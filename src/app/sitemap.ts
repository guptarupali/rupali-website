import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/blog", "/speaking", "/advisory", "/media", "/awards", "/resources", "/press-kit", "/contact", "/newsletters/ai-pulse", "/newsletters/platform-path"];
  const staticUrls = routes.map((r) => ({ url: site.url + r, lastModified: new Date() }));
  const posts = await getAllPosts();
  const postUrls = posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date ? new Date(p.date) : new Date() }));
  return [...staticUrls, ...postUrls];
}
