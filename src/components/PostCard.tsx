import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-line-2 bg-panel p-6 transition hover:border-line"
    >
      <div className="mb-3 flex items-center gap-3 text-xs">
        <span className="kicker !mb-0">{post.category}</span>
        <span className="text-muted">{post.readingTime}</span>
      </div>
      <h3 className="text-xl leading-snug text-cream transition group-hover:text-gold-2">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <span className="mt-5 text-sm text-gold-2">Read article →</span>
    </Link>
  );
}
