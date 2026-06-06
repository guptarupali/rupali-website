import { Section, SectionHead, Kicker, Btn } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("AI Pulse Newsletter", "AI Pulse: agentic AI, governance, AgentOps, enterprise AI, and responsible AI.", "/newsletters/ai-pulse");

export default function AiPulse() {
  return (
    <Section>
      <SectionHead kicker="Newsletter" title="AI Pulse" sub="Agentic AI, governance, AgentOps, enterprise AI, and responsible AI. Written from the trenches of enterprise AI." />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-gold/10 to-transparent p-8">
          <Kicker>Subscribe</Kicker>
          <p className="mt-3 text-muted">Get each edition in your inbox via LinkedIn.</p>
          <div className="mt-5">
            <Btn href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7466541904743034880">Subscribe on LinkedIn</Btn>
          </div>
        </div>
        <div>
          <Kicker>What you will get</Kicker>
          <ul className="mt-4 space-y-3 text-muted">
            <li>· Field notes on governing autonomous, multi agent systems</li>
            <li>· AgentOps patterns: guardrails, traces, and cost control</li>
            <li>· How to read behavioural drift before dashboards turn red</li>
            <li>· Responsible AI, grounded in regulated industry experience</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
