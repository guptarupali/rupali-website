import { Section, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { CATEGORIES } from "@/lib/site";

export const metadata = pageMeta("Writing", "Essays on agentic AI, platform engineering, developer experience, and engineering leadership.", "/blog");

export default async function Blog() {
  const posts = await getAllPosts();
  const meta = posts.map(({ content, ...m }) => m);
  return (
    <Section>
      <SectionHead kicker="Thought Leadership Hub" title="Writing on platforms, agentic AI, and the discipline of scale." />
      <PostList posts={meta} categories={[...CATEGORIES]} />
    </Section>
  );
}
