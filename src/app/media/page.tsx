import { Section, SectionHead, Kicker, Btn } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { media } from "@/lib/data";
import { RequestForm } from "@/components/forms/RequestForm";
import { site } from "@/lib/site";
import Image from "next/image";

export const metadata = pageMeta("Media", "Professional media kit, headshots, biography, and media requests.", "/media");

export default function Media() {
  return (
    <>
      {/* Press Kit Header */}
      <Section>
        <SectionHead kicker="Media & Press Kit" title="Professional materials, biography, and media inquiries." />
        
        {/* Bio & Quick Links */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          <div className="lg:col-span-2">
            <Kicker>Executive Biography</Kicker>
            <div className="mt-5 space-y-4 text-muted leading-relaxed">
              <p>
                Rupali Gupta is Global Director of Platform Engineering at dunnhumby, leading enterprise-scale platform transformation and the governance of agentic AI. With 20+ years across financial services, platform engineering, and enterprise architecture, she designs intelligent, resilient platforms that power mission-critical systems at scale.
              </p>
              <p>
                Known for visionary thought leadership, Rupali builds high-performing global teams, champions AI-native engineering practices, and helps organizations move from AI experimentation to operationalized, governed systems. Her expertise spans platform engineering, internal developer platforms, GenAI governance, multi-tenancy architecture, FinOps, and cloud-native transformation.
              </p>
              <p>
                A keynote speaker at industry forums, Rupali has presented at KubeCon, Dine with DevOps, New Relic Executive Connect, Technophiles India, and global AI conferences, reaching CXOs, CTOs, and engineering leaders worldwide.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Kicker>Quick Links</Kicker>
            <div className="space-y-2 text-sm">
              <a href="https://www.linkedin.com/in/rupaligupta24" target="_blank" rel="noopener" className="block p-3 rounded-lg border border-line-2 bg-panel hover:border-gold transition text-cream">LinkedIn Profile →</a>
              <a href="https://x.com/RupaliGupta24" target="_blank" rel="noopener" className="block p-3 rounded-lg border border-line-2 bg-panel hover:border-gold transition text-cream">Twitter / X →</a>
              <a href="https://medium.com/@guptarupali" target="_blank" rel="noopener" className="block p-3 rounded-lg border border-line-2 bg-panel hover:border-gold transition text-cream">Medium Blog →</a>
              <a href="https://rupaligupta.in/speaking" className="block p-3 rounded-lg border border-line-2 bg-panel hover:border-gold transition text-cream">Speaking Topics →</a>
            </div>
          </div>
        </div>
      </Section>

      {/* Headshots */}
      <Section className="bg-bg-2">
        <SectionHead kicker="Professional Headshots" title="Available for press, articles, and publications." />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="space-y-3">
            <div className="rounded-2xl border border-line overflow-hidden bg-panel aspect-square">
              <Image
                src="/images/rupali-headshot-2.jpg"
                alt="Rupali Gupta - Professional Headshot 1"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-muted text-center">Urban Evening · Casual Professional</p>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-line overflow-hidden bg-panel aspect-square">
              <Image
                src="/images/rupali-headshot-4.jpg"
                alt="Rupali Gupta - Professional Headshot 2"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-muted text-center">Urban Lights · Modern Professional</p>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-line overflow-hidden bg-panel aspect-square">
              <Image
                src="/images/rupali-headshot-5.jpg"
                alt="Rupali Gupta - Professional Headshot 3"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-muted text-center">Office Setting · Business Professional</p>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-line overflow-hidden bg-panel aspect-square">
              <Image
                src="/images/rupali-headshot.jpeg"
                alt="Rupali Gupta - Professional Headshot 4"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-muted text-center">Studio Professional · High Resolution</p>
          </div>
        </div>

        {/* Interview & Speaking Photo */}
        <div className="mt-12 mb-8">
          <Kicker>Interview & Speaking Events</Kicker>
          <div className="mt-5 rounded-2xl border border-line overflow-hidden bg-panel">
            <Image
              src="/images/rupali-interview-event.jpg"
              alt="Rupali Gupta - Speaking at Industry Event"
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>
          <p className="text-sm text-muted mt-3">Speaking engagement and industry event coverage</p>
        </div>

        <div className="p-4 rounded-lg bg-panel border border-line-2">
          <p className="text-xs text-gold mb-2">Usage Rights</p>
          <p className="text-xs text-muted">All photographs are free to use for press, editorial, and publication purposes. Photo credit: Rupali Gupta</p>
        </div>
      </Section>

      {/* Speaking & Expertise */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Speaking Topics</Kicker>
            <div className="mt-5 space-y-3">
              {[
                "Platform Engineering at Enterprise Scale",
                "Agentic AI: Governance, Observability, and Autonomous Systems",
                "Building AI-Native Organizations",
                "From DevOps to Platform Engineering: The Evolution of Engineering Practices",
                "Cloud-Native Transformation and Multi-Tenancy Architecture",
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
                { label: "Current Role", value: "Global Director of Platform Engineering, dunnhumby" },
                { label: "Experience", value: "20+ years in Enterprise Architecture, FinTech, Platform Engineering" },
                { label: "Leadership", value: "Led 300+ global engineering teams, $30M+ portfolio management" },
                { label: "Recognition", value: "Digital Renaissance Leader 2025, Platform Leadership Award" },
                { label: "Speaking", value: "17+ keynotes 2024-2025 across global forums" },
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

      {/* Coverage & Media Requests */}
      <Section className="bg-bg-2">
        <SectionHead kicker="In the Media" title="Recent interviews, features, and publications." />
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
