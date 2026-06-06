import { Section, SectionHead, Kicker, Btn } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("The Platform Path Newsletter", "Platform Engineering Redefined for the AI Era: API strategy, golden paths, AI-native platforms, foundational excellence, and the operating model that lets teams move faster.", "/newsletters/platform-path");

export default function PlatformPath() {
  return (
    <Section>
      <SectionHead kicker="Newsletter" title="The Platform Path" sub="Platform Engineering Redefined for the AI Era. API strategy, golden paths, AI-native platforms, and the operating model that lets teams move faster." />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-gold/10 to-transparent p-8">
          <Kicker>Subscribe</Kicker>
          <p className="mt-3 text-muted">Get each edition in your inbox via LinkedIn.</p>
          <div className="mt-5">
            <Btn href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7275180080509673473">Subscribe on LinkedIn</Btn>
          </div>
        </div>
        <div>
          <Kicker>What you will get</Kicker>
          <ul className="mt-4 space-y-3 text-muted">
            <li>· API-first strategy and governance for enterprise scale</li>
            <li>· Foundational platform engineering excellence that enables innovation</li>
            <li>· Golden paths and the craft of frictionless developer experience</li>
            <li>· Building AI-native platforms and the SDLC that powers them</li>
            <li>· AI and agentic systems in your delivery pipeline</li>
            <li>· FinOps and cost discipline embedded into engineering culture</li>
            <li>· Platform as a product: adoption, not mandates</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
