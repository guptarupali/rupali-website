import { Section, SectionHead, Kicker } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { speakingTopics } from "@/lib/data";
import { createServerClient } from "@/lib/supabase/server";
import { RequestForm } from "@/components/forms/RequestForm";
import { site } from "@/lib/site";

export const metadata = pageMeta("Speaking", "Keynotes and panels on agentic AI governance, platform engineering, and engineering leadership.", "/speaking");

export default async function Speaking() {
  const supabase = createServerClient();
  const { data: events } = await supabase.from("events").select("*").order("sort_order");
  const eventList = events || [];
  return (
    <Section>
      <SectionHead kicker="Speaking" title="Keynotes on agentic AI, platforms, and engineering at scale." sub="A global keynote speaker across India's leading technology forums, known for turning hard architecture into clear, actionable strategy." />
      <div className="grid gap-12 lg:grid-cols-2">
        <div id="topics" style={{ scrollMarginTop: "90px" }}>
          <Kicker>Signature Topics</Kicker>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {speakingTopics.map((t) => (
              <div key={t.h} className="rounded-xl border border-line-2 bg-panel p-5">
                <h3 className="text-base text-cream">{t.h}</h3>
                <p className="mt-2 text-sm text-muted">{t.p}</p>
              </div>
            ))}
          </div>

          <details id="engagements" className="mt-10 group" style={{ scrollMarginTop: "90px" }}>
            <summary className="cursor-pointer list-none flex items-center justify-between rounded-xl border border-line-2 bg-panel px-5 py-4 hover:border-gold transition">
              <span className="text-cream font-medium">Recent Engagements ({eventList.length})</span>
              <span className="text-gold text-sm group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 space-y-3">
              {eventList.map((e: any) => (
                <div key={e.id} className="rounded-lg border border-line-2 bg-panel p-4 hover:border-gold transition">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h4 className="text-cream font-medium text-sm">{e.name}</h4>
                      <p className="text-xs text-muted mt-1">{e.description}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-gold bg-panel px-2 py-1 rounded border border-line-2">{e.role}</span>
                  </div>
                  {e.linkedin_url && (
                    <a href={e.linkedin_url} target="_blank" rel="noopener noreferrer"
                       className="text-xs text-gold hover:text-gold-2 transition inline-flex items-center gap-1 mt-3">
                      View on LinkedIn →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </details>
        </div>

        <div id="request" style={{ scrollMarginTop: "90px" }}>
          <Kicker>Speaking Request</Kicker>
          <div className="mt-5">
            <RequestForm
              endpoint={site.formspree.speaking}
              subject="Speaking invitation"
              cta="Send speaking request"
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "company", label: "Company / Organization", required: true },
                { name: "event", label: "Event name", required: true },
                { name: "topic", label: "Topic of interest" },
                { name: "budget", label: "Budget", type: "select", options: ["To be discussed", "Under $5k", "$5k - $15k", "$15k+"] },
                { name: "date", label: "Event date", type: "date" },
                { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Audience, format, and timing." },
              ]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
