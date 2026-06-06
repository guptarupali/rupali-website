import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui";
import { getAllPosts, getPost } from "@/lib/posts";
import { ShareButtons } from "@/components/ShareButtons";
import { NewsletterEmbed } from "@/components/NewsletterEmbed";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return pageMeta("Article not found", undefined, `/blog/${slug}`);
  return pageMeta(post.title, post.excerpt, `/blog/${slug}`);
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const all = await getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const np = site.newsletters.platformPath;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <Container className="py-16 md:py-24">
      <JsonLd data={articleLd} />
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm text-gold-2">← All writing</Link>
        <div className="mt-6 flex items-center gap-3 text-xs">
          <span className="kicker !mb-0">{post.category}</span>
          <span className="text-muted">{post.date} · {post.readingTime}</span>
        </div>
        <h1 className="mt-4 text-4xl leading-tight text-cream md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
        <div className="mt-6 border-y border-line-2 py-4"><ShareButtons slug={post.slug} title={post.title} /></div>

        <div className="prose prose-rupali prose-invert mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-panel p-8">
          <div className="kicker mb-2">Subscribe</div>
          <h3 className="text-xl text-cream">Get essays like this in your inbox</h3>
          <p className="mt-2 text-sm text-muted">{np.name}: {np.focus}.</p>
          <div className="mt-5"><NewsletterEmbed embed={np.embed} url={np.url} name={np.name} /></div>
        </div>

        {related.length ? (
          <div className="mt-14">
            <div className="kicker mb-4">Related</div>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="rounded-xl border border-line-2 bg-panel p-5 hover:border-line">
                  <h4 className="text-cream">{r.title}</h4>
                  <p className="mt-2 text-sm text-muted">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </Container>
  );
}
