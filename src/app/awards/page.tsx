import { Section, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { awards } from "@/lib/data";

export const metadata = pageMeta("Awards & Recognition", "Awards and industry recognition for platform engineering and AI leadership.", "/awards");

export default function Awards() {
  return (
    <Section>
      <SectionHead kicker="Awards & Recognition" title="Recognized across the industry for platform and engineering leadership." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {awards.map((a) => (
          <div key={a.h} className="rounded-2xl border border-line-2 bg-panel p-6">
            <div className="font-mono text-sm text-gold">{a.y}</div>
            <h3 className="mt-2 text-xl text-cream">{a.h}</h3>
            <p className="mt-2 text-sm text-muted">{a.s}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
