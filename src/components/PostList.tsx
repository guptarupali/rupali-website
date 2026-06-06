"use client";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";

type Meta = Omit<Post, "content">;

export function PostList({ posts, categories }: { posts: Meta[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const used = useMemo(() => ["All", ...categories.filter((c) => posts.some((p) => p.category === c))], [categories, posts]);
  const filtered = posts.filter((p) => {
    const okCat = cat === "All" || p.category === cat;
    const text = (p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase();
    return okCat && text.includes(q.toLowerCase());
  });
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {used.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-xs transition ${cat === c ? "border-gold bg-gold/10 text-gold-2" : "border-line-2 text-muted hover:text-cream"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles..."
          className="w-full rounded-full border border-line-2 bg-panel px-4 py-2 text-sm text-cream outline-none focus:border-line md:w-64"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <PostCard key={p.slug} post={p as Post} />)}
      </div>
      {filtered.length === 0 ? <p className="mt-10 text-muted">No articles match that search.</p> : null}
    </div>
  );
}
