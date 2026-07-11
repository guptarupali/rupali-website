import { Section, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = pageMeta("Awards & Recognition", "Awards and industry recognition for platform engineering and AI leadership.", "/awards");

export default async function Awards() {
  const supabase = createServerClient();
  const { data: awards } = await supabase.from("awards").select("*").order("sort_year", { ascending: false });

  return (
    <Section>
      <SectionHead kicker="Awards & Recognition" title="Recognized across the industry for platform and engineering leadership." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {(awards || []).map((a) => (
          <div key={a.id} className="rounded-2xl border border-line-2 bg-panel p-6">
            <div className="font-mono text-sm text-gold">{a.year}</div>
            <h3 className="mt-2 text-xl text-cream">{a.title}</h3>
            <p className="mt-2 text-sm text-muted">{a.subtitle}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
