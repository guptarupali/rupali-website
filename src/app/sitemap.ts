import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { createServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/insights", "/speaking", "/advisory", "/media", "/awards", "/gallery", "/contact", "/newsletters/ai-pulse", "/newsletters/platform-path"];
  const staticUrls = routes.map((r) => ({ url: site.url + r, lastModified: new Date() }));

  let articleUrls: { url: string; lastModified: Date }[] = [];
  try {
    const supabase = createServerClient();
    const { data: articles } = await supabase
      .from("content")
      .select("slug, published_at")
      .eq("published", true);
    articleUrls = (articles || []).map((a: any) => ({
      url: `${site.url}/insights/${a.slug}`,
      lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    }));
  } catch (e) {
    // If Supabase is unreachable at build time, still return static routes
  }

  return [...staticUrls, ...articleUrls];
}
