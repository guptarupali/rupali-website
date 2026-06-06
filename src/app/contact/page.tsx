import { Section, SectionHead, Kicker } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { RequestForm } from "@/components/forms/RequestForm";
import { site } from "@/lib/site";

export const metadata = pageMeta("Contact", "Reach out for speaking, advisory, or media.", "/contact");

export default function Contact() {
  return (
    <Section>
      <SectionHead kicker="Contact" title="Let's build the next chapter." sub="For speaking, advisory, or media, send a note and Rupali will respond personally to relevant enquiries." />
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4 text-muted">
          <p>You can also reach Rupali directly:</p>
          <a href={`mailto:${site.email}`} className="block rounded-xl border border-line-2 bg-panel p-5 hover:border-line">
            <span className="font-mono text-xs text-gold">EMAIL</span>
            <div className="text-cream">{site.email}</div>
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener" className="block rounded-xl border border-line-2 bg-panel p-5 hover:border-line">
            <span className="font-mono text-xs text-gold">LINKEDIN</span>
            <div className="text-cream">Connect with Rupali Gupta</div>
          </a>
        </div>
        <div>
          <Kicker>Send a message</Kicker>
          <div className="mt-5">
            <RequestForm
              endpoint={site.formspree.speaking}
              subject="Website enquiry"
              cta="Send message"
              fields={[
                { name: "name", label: "Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "reason", label: "I'm reaching out about", type: "select", options: ["Speaking", "Advisory", "Media", "Something else"] },
                { name: "message", label: "Message", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
