import { Container, Section, SectionHead, Kicker } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { timeline, focusAreas, recommendations } from "@/lib/data";

export const metadata = pageMeta("About", "Rupali Gupta is a global technology executive and enterprise architect leading platform engineering and the governance of agentic AI.", "/about");

export default function About() {
  return (
    <Section>
      <SectionHead kicker="About" title="A platform leader at the frontier of AI native engineering." />
      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 text-muted leading-relaxed">
          <p className="text-lg text-text">Rupali Gupta is a global technology executive and enterprise architect with more than two decades of experience architecting highly scalable, resilient distributed platforms and leading full scale digital transformations. As Global Director of Platform Engineering at Dunnhumby, a Tesco company and a world leader in customer data science, she owns the global platforms, applications, and developer experience strategy that powers products for retailers and brands like Tesco, Walmart, Coca-Cola, Procter and Gamble, and L&apos;Oreal.</p>
          <p>Her foundation is deep FinTech and financial services. Across more than a decade at Fidelity International, and earlier at Publicis Sapient on the Fidelity International account, she led enterprise architecture and platform engineering across payments, customer, and risk in highly regulated environments, working hands on with frameworks such as AML, KYC, sanctions screening, GDPR, and PCI DSS. That grounding in regulation, resilience, and trust now shapes how she approaches AI: reliability and governance are not afterthoughts, they are the foundation.</p>
          <p>Today her signature work sits at the frontier of AI native engineering and the governance of agentic AI: guardrails, ethical AI, observability, and the AgentOps discipline that lets enterprises run autonomous, multi agent systems safely at scale. A recurring thread runs through everything she builds: great platforms win through product thinking and design, not mandates. She is also a committed advocate for women in technology and an active startup mentor.</p>
        </div>
        <aside className="rounded-2xl border border-line bg-panel p-6">
          <Kicker>Focus Areas</Kicker>
          <div className="mb-6 flex flex-wrap gap-2">
            {focusAreas.map((f) => <span key={f} className="rounded-full border border-line-2 px-3 py-1 text-xs text-text">{f}</span>)}
          </div>
          <Kicker>Education & Credentials</Kicker>
          <ul className="space-y-2 text-sm text-text">
            <li>PG Diploma in Data Analytics (Distinction), University College Dublin</li>
            <li>Bachelor of Technology, Computer Science (Distinction)</li>
            <li>Ongoing AI and industry led certifications</li>
          </ul>
        </aside>
      </div>

      <div className="mt-20">
        <Kicker>Executive Impact</Kicker>
        <div className="mt-6 space-y-8">
          {timeline.map((t) => (
            <div key={t.org} className="grid gap-4 border-t border-line-2 pt-8 md:grid-cols-4">
              <div className="md:col-span-1">
                <div className="font-mono text-xs text-gold">{t.yr}</div>
                <div className="mt-2 text-cream">{t.org}</div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl text-cream">{t.role}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {t.detail.map((d) => <li key={d}>· {d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Kicker>In Their Words</Kicker>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {recommendations.map((r) => (
            <blockquote key={r.n} className="rounded-2xl border border-line-2 bg-panel p-6">
              <p className="text-text">&ldquo;{r.t}&rdquo;</p>
              <footer className="mt-4 text-sm"><b className="text-cream">{r.n}</b><span className="block text-muted">{r.w}</span></footer>
            </blockquote>
          ))}
        </div>
      </div>
    </Section>
  );
}
