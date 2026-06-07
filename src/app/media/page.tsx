import { Section, SectionHead, Kicker, Btn } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { media } from "@/lib/data";
import { RequestForm } from "@/components/forms/RequestForm";
import { site } from "@/lib/site";
import Image from "next/image";

export const metadata = pageMeta("Media Kit", "Professional materials, biography, headshots, and media requests.", "/media");

const bioShort = "Rupali Gupta is Global Director of Platform Engineering at Dunnhumby, a two time LinkedIn Top Voice, and a keynote speaker on platform engineering and the governance of agentic AI.";
const bioLong = "Rupali Gupta is a global technology executive and enterprise architect with more than two decades of experience. As Global Director of Platform Engineering at Dunnhumby, a Tesco company, she leads global platforms, applications, and developer experience, and drives AI native platform engineering, AgentOps, and the governance of autonomous multi agent systems. Her foundation is deep FinTech and regulated financial services, across more than a decade at Fidelity International. She is a two time LinkedIn Top Voice, a multiple award winning engineering leader, a global keynote speaker, and an advocate for women in technology.";

export default function Media() {
  return (
    <>
      {/* Header */}
      <Section>
        <SectionHead kicker="Media Kit" title="Everything media teams and event organizers need." />
      </Section>

      {/* Executive Bio & Quick Links */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Kicker>Short Biography</Kicker>
              <p className="mt-3 text-text">{bioShort}</p>
            </div>
            <div>
              <Kicker>Full Biography</Kicker>
              <p className="mt-3 text-muted leading-relaxed">{bioLong}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Kicker>Quick Links</Kicker>
            <div className="space-y-2 text-sm">
              <a href="https://www.linkedin.com/in/rupaligupta24" target="_blank" rel="noopener" className="block p-3 rounded-lg border border-line-2 bg-panel hover:border-gold transition text-cream">LinkedIn Profile →</a>
              <a href="https://x.com/RupaliGupta24" target="_blank" rel="noopener" className="block p-3 rounded-lg border border-line-2 bg-panel hover:border-gold transition text-cream">X / Twitter →</a>
              <a href="https://instagram.com/RupaliGupta24" target="_blank" rel="noopener" className="block p-3 rounded-lg border border-line-2 bg-panel hover:border-gold transition text-cream">Instagram →</a>
              <a href="https://medium.com/@guptarupali" target="_blank" rel="noopener" className="block p-3 rounded-lg border border-line-2 bg-panel hover:border-gold transition text-cream">Medium →</a>
            </div>
          </div>
        </div>
      </Section>

      {/* Professional Headshots */}
      <Section className="bg-bg-2">
        <SectionHead kicker="Professional Headshots" title="High-resolution images available for press and publications." />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="space-y-3">
            <div className="rounded-2xl border border-line overflow-hidden bg-panel aspect-square">
              <Image
                src="/images/rupali-headshot-5.jpg"
                alt="Rupali Gupta"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-line overflow-hidden bg-panel aspect-square">
              <Image
                src="/images/rupali-headshot-3.png"
                alt="Rupali Gupta"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-line overflow-hidden bg-panel aspect-square">
              <Image
                src="/images/rupali-headshot.jpeg"
                alt="Rupali Gupta"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-panel border border-line-2">
          <p className="text-xs text-gold mb-2">Usage Rights</p>
          <p className="text-xs text-muted">Free to use for press, editorial, and publication purposes. Credit: Rupali Gupta</p>
        </div>
      </Section>

      {/* Key Credentials */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Speaking Topics</Kicker>
            <div className="mt-5 space-y-3">
              {[
                "Platform Engineering at Enterprise Scale",
                "Agentic AI: Governance, Observability, and Autonomous Systems",
                "Building AI-Native Organizations",
                "From DevOps to Platform Engineering",
                "Cloud-Native Transformation and Multi-Tenancy",
                "FinOps and Cost Intelligence in Platform Engineering",
                "Women in Technology Leadership"
              ].map((topic) => (
                <div key={topic} className="p-4 rounded-lg border border-line-2 bg-panel">
                  <p className="text-cream text-sm">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Kicker>Key Credentials</Kicker>
            <div className="mt-5 space-y-3">
              {[
                { label: "Current Role", value: "Global Director of Platform Engineering, Dunnhumby" },
                { label: "Experience", value: "20+ years in Enterprise Architecture, FinTech, Platform Engineering" },
                { label: "Leadership", value: "Led 300+ global engineering teams, £30M+ portfolio management" },
                { label: "Recognition", value: "Digital Renaissance Leader 2025, Multiple Award Winner" },
                { label: "Speaking", value: "17+ keynotes 2024-2025 at global forums" },
                { label: "Education", value: "B.Tech Computer Science, PG Data Science (UCD Dublin)" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-lg border border-line-2 bg-panel">
                  <p className="text-xs text-gold mb-1">{item.label}</p>
                  <p className="text-sm text-cream">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Media Coverage & Requests */}
      <Section className="bg-bg-2">
        <SectionHead kicker="In the Media" title="Recent interviews and features." />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Coverage</Kicker>
            <div className="mt-5 space-y-3">
              {media.map((m) => (
                <div key={m.id} className="rounded-xl border border-line-2 bg-panel p-5">
                  <span className="font-mono text-xs text-gold">{m.type}</span>
                  <h3 className="mt-1 text-lg text-cream">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted">{m.description}</p>
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
                  { name: "audience", label: "Audience / Reach" },
                  { name: "deadline", label: "Deadline", type: "date" },
                  { name: "topic", label: "Topic of Interest", required: true },
                  { name: "message", label: "Details", type: "textarea", required: true },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
