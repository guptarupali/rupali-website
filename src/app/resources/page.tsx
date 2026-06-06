import { Section, SectionHead, Btn } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Resources", "A library of talks, frameworks, and guides on platform engineering and agentic AI.", "/resources");

const resources = [
  { h: "Golden Paths field guide", p: "The reference for building curated, opinionated developer fast lanes.", href: "/blog/golden-paths" },
  { h: "Internal Developer Portals", p: "A pragmatic approach to the developer cockpit, without boiling the ocean.", href: "/blog/internal-developer-portals" },
  { h: "Agentic AI Governance", p: "Guardrails, AgentOps, and the operating model for autonomous systems.", href: "/blog/governing-agentic-ai" },
  { h: "Platform as a Product", p: "Why adoption, not mandates, is the only metric that matters.", href: "/blog/platform-as-a-product" },
];

export default function Resources() {
  return (
    <Section>
      <SectionHead kicker="Resource Library" title="Talks, frameworks, and guides." sub="A growing library drawn from keynotes, newsletters, and platform transformations." />
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((r) => (
          <div key={r.h} className="rounded-2xl border border-line-2 bg-panel p-6">
            <h3 className="text-xl text-cream">{r.h}</h3>
            <p className="mt-2 text-sm text-muted">{r.p}</p>
            <div className="mt-4"><Btn href={r.href} variant="ghost">Open</Btn></div>
          </div>
        ))}
      </div>
    </Section>
  );
}
