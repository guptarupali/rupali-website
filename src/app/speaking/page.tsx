import { Section, SectionHead, Kicker } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { speakingTopics, events } from "@/lib/data";
import { RequestForm } from "@/components/forms/RequestForm";
import { site } from "@/lib/site";

export const metadata = pageMeta("Speaking", "Keynotes and panels on agentic AI governance, platform engineering, and engineering leadership.", "/speaking");

export default function Speaking() {
  return (
    <Section>
      <SectionHead kicker="Speaking" title="Keynotes on agentic AI, platforms, and engineering at scale." sub="A global keynote speaker across India's leading technology forums, known for turning hard architecture into clear, actionable strategy." />
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Kicker>Signature Topics</Kicker>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {speakingTopics.map((t) => (
              <div key={t.h} className="rounded-xl border border-line-2 bg-panel p-5">
                <h3 className="text-base text-cream">{t.h}</h3>
                <p className="mt-2 text-sm text-muted">{t.p}</p>
              </div>
            ))}
          </div>

          <details className="mt-10 group">
            <summary className="cursor-pointer list-none flex items-center justify-between rounded-xl border border-line-2 bg-panel px-5 py-4 hover:border-gold transition">
              <span className="text-cream font-medium">Recent Engagements ({events.length})</span>
              <span className="text-gold text-sm group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 space-y-3">
              {events.map((e) => (
                <div key={e.n} className="rounded-lg border border-line-2 bg-panel p-4 hover:border-gold transition">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h4 className="text-cream font-medium text-sm">{e.n}</h4>
                      <p className="text-xs text-muted mt-1">{e.m}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-gold bg-panel px-2 py-1 rounded border border-line-2">{e.r}</span>
                  </div>
                  {e.linkedIn && (
                    <a href={e.linkedIn} target="_blank" rel="noopener noreferrer"
                       className="text-xs text-gold hover:text-gold-2 transition inline-flex items-center gap-1 mt-3">
                      View on LinkedIn →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </details>
        </div>

        <div>
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
