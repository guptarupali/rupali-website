import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime } from "./reading-time";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  featured: boolean;
  readingTime: string;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function fromLocal(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        category: data.category ?? "Platform Engineering",
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
        featured: Boolean(data.featured),
        readingTime: readingTime(content),
        content,
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Notion is optional. When NOTION_TOKEN + NOTION_DATABASE_ID are set and the
// optional packages are installed, posts are read from Notion instead.
// See README "Switching to Notion CMS". Falls back to local content on any error.
async function fromNotion(): Promise<Post[] | null> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) return null;
  try {
    const { Client } = await import(/* webpackIgnore: true */ "@notionhq/client");
    const { NotionToMarkdown } = await import(/* webpackIgnore: true */ "notion-to-md");
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const n2m = new NotionToMarkdown({ notionClient: notion });
    const db = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
    });
    const posts: Post[] = [];
    for (const page of db.results as any[]) {
      const p = page.properties;
      const mdblocks = await n2m.pageToMarkdown(page.id);
      const content = n2m.toMarkdownString(mdblocks).parent ?? "";
      posts.push({
        slug: p.Slug?.rich_text?.[0]?.plain_text ?? page.id,
        title: p.Title?.title?.[0]?.plain_text ?? "Untitled",
        date: p.Date?.date?.start ?? "",
        category: p.Category?.select?.name ?? "Platform Engineering",
        tags: (p.Tags?.multi_select ?? []).map((t: any) => t.name),
        excerpt: p.Excerpt?.rich_text?.[0]?.plain_text ?? "",
        featured: Boolean(p.Featured?.checkbox),
        readingTime: readingTime(content),
        content,
      });
    }
    return posts;
  } catch (e) {
    console.warn("Notion source failed, using local content.", e);
    return null;
  }
}

let cache: Post[] | null = null;
export async function getAllPosts(): Promise<Post[]> {
  if (cache) return cache;
  cache = (await fromNotion()) ?? fromLocal();
  return cache;
}
export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug);
}
export async function getFeatured(): Promise<Post | undefined> {
  const all = await getAllPosts();
  return all.find((p) => p.featured) ?? all[0];
}
