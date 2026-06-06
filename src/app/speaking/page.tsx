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
          <div className="mt-5 space-y-4">
            {speakingTopics.map((t) => (
              <div key={t.h} className="rounded-xl border border-line-2 bg-panel p-5">
                <h3 className="text-lg text-cream">{t.h}</h3>
                <p className="mt-2 text-sm text-muted">{t.p}</p>
              </div>
            ))}
          </div>
          <Kicker>Recent Engagements</Kicker>
          <div className="mt-5 space-y-3">
            {events.map((e) => (
              <div key={e.n} className="flex flex-col gap-1 border-b border-line-2 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-cream">{e.n}</span>
                  <span className="shrink-0 font-mono text-xs text-gold">{e.r}</span>
                </div>
                <span className="text-sm text-muted">{e.m}</span>
              </div>
            ))}
          </div>
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
