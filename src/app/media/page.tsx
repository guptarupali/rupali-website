import { Section, SectionHead, Kicker } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { media } from "@/lib/data";
import { RequestForm } from "@/components/forms/RequestForm";
import { site } from "@/lib/site";

export const metadata = pageMeta("Media", "Interviews, features, and publications, plus media request.", "/media");

export default function Media() {
  return (
    <Section>
      <SectionHead kicker="Media" title="Interviews, features, and publications." />
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Kicker>Coverage</Kicker>
          <div className="mt-5 space-y-3">
            {media.map((m) => (
              <div key={m.h} className="rounded-xl border border-line-2 bg-panel p-5">
                <span className="font-mono text-xs text-gold">{m.type}</span>
                <h3 className="mt-1 text-lg text-cream">{m.h}</h3>
                <p className="mt-1 text-sm text-muted">{m.p}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Kicker>Media Request</Kicker>
          <div className="mt-5">
            <RequestForm
              endpoint={site.formspree.media}
              subject="Media request"
              cta="Send media request"
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "publication", label: "Publication / Outlet", required: true },
                { name: "audience", label: "Audience" },
                { name: "deadline", label: "Deadline", type: "date" },
                { name: "topic", label: "Topic", required: true },
                { name: "message", label: "Details", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
