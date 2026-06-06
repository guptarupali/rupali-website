import Link from "next/link";
import Image from "next/image";
import { Container, Section, SectionHead, Btn, Kicker } from "@/components/ui";
import { PostCard } from "@/components/PostCard";
import { stats, awards } from "@/lib/data";
import { site } from "@/lib/site";
import { getAllPosts, getFeatured } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();
  const featured = await getFeatured();
  const latest = posts.filter((p) => p.slug !== featured?.slug).slice(0, 3);

  return (
    <>
      <Container className="pt-20 pb-10 md:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Kicker>Technology Executive · AI Transformation Leader</Kicker>
            <h1 className="text-5xl leading-[1.05] text-cream md:text-6xl">Rupali Gupta</h1>
            <p className="mt-5 font-mono text-sm uppercase tracking-wider text-gold-2">{site.tagline}</p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Building the future of agentic AI, platform engineering, and enterprise technology at scale. I help organizations
              move from talking about AI to operationalizing it safely, through governed platforms and intelligent engineering.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/contact">Invite to speak</Btn>
              <Btn href="/blog" variant="ghost">Read the writing</Btn>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {/* Professional Headshot */}
            <div className="rounded-2xl border border-line overflow-hidden bg-panel">
              <Image
                src="/images/rupali-headshot.jpeg"
                alt="Rupali Gupta"
                width={500}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Key Stats */}
            <div className="rounded-2xl border border-line-2 bg-panel p-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {stats.map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-2xl text-gold-2">{s.v}</div>
                    <div className="mt-1 text-xs text-muted">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Section>
        <SectionHead kicker="Thought Leadership" title="Writing on platforms, agentic AI, and the discipline of scale." />
        {featured ? (
          <Link href={`/blog/${featured.slug}`} className="group mb-8 block rounded-2xl border border-line bg-gradient-to-br from-gold/10 to-transparent p-8 md:p-10">
            <div className="kicker mb-3">Featured · {featured.category}</div>
            <h3 className="max-w-3xl text-2xl text-cream group-hover:text-gold-2 md:text-3xl">{featured.title}</h3>
            <p className="mt-4 max-w-2xl text-muted">{featured.excerpt}</p>
            <span className="mt-5 inline-block text-sm text-gold-2">{featured.readingTime} · Read article →</span>
          </Link>
        ) : null}
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      </Section>

      <Section className="bg-bg-2">
        <div className="grid gap-6 md:grid-cols-2">
          {[site.newsletters.aiPulse, site.newsletters.platformPath].map((n) => (
            <div key={n.slug} className="rounded-2xl border border-line-2 bg-panel p-8">
              <div className="kicker mb-3">Newsletter</div>
              <h3 className="text-2xl text-cream">{n.name}</h3>
              <p className="mt-3 text-sm text-muted">{n.focus}.</p>
              <Link href={`/newsletters/${n.slug}`} className="mt-5 inline-block text-sm text-gold-2">Subscribe and read archive →</Link>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead kicker="Recognition" title="Recognized across the industry for platform and engineering leadership." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {awards.slice(0, 8).map((a) => (
            <div key={a.h} className="rounded-xl border border-line-2 bg-panel p-5">
              <div className="font-mono text-xs text-gold">{a.y}</div>
              <div className="mt-2 text-cream">{a.h}</div>
              <div className="mt-1 text-xs text-muted">{a.s}</div>
            </div>
          ))}
        </div>
        <div className="mt-10"><Btn href="/awards" variant="ghost">All awards and recognition</Btn></div>
      </Section>
    </>
  );
}
