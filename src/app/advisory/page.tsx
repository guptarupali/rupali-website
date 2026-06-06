import { Section, SectionHead, Kicker } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { advisoryServices } from "@/lib/data";
import { RequestForm } from "@/components/forms/RequestForm";
import { site } from "@/lib/site";

export const metadata = pageMeta("Advisory", "Advisory on platform strategy, agentic AI governance, and engineering operating models.", "/advisory");

export default function Advisory() {
  return (
    <Section>
      <SectionHead kicker="Advisory" title="Advisory for platform strategy and agentic AI governance." sub="Selective engagements with leadership teams building governed, AI native engineering organizations." />
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Kicker>How I Help</Kicker>
          <div className="mt-5 space-y-4">
            {advisoryServices.map((s) => (
              <div key={s.h} className="rounded-xl border border-line-2 bg-panel p-5">
                <h3 className="text-lg text-cream">{s.h}</h3>
                <p className="mt-2 text-sm text-muted">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Kicker>Advisory Request</Kicker>
          <div className="mt-5">
            <RequestForm
              endpoint={site.formspree.advisory}
              subject="Advisory engagement"
              cta="Send advisory request"
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "company", label: "Company", required: true },
                { name: "challenge", label: "The challenge", type: "textarea", required: true, placeholder: "What are you trying to solve?" },
                { name: "timeline", label: "Timeline", type: "select", options: ["Exploring", "This quarter", "Next quarter", "Ongoing"] },
                { name: "budget", label: "Budget", type: "select", options: ["To be discussed", "Project based", "Retainer"] },
                { name: "message", label: "Anything else", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
