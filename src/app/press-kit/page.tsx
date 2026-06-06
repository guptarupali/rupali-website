import { Section, SectionHead, Kicker, Btn } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { stats } from "@/lib/data";

export const metadata = pageMeta("Press Kit", "Bio, headshots, fast facts, and speaker kit for media and event organizers.", "/press-kit");

const bioShort = "Rupali Gupta is Global Director of Platform Engineering at Dunnhumby, a two time LinkedIn Top Voice, and a keynote speaker on platform engineering and the governance of agentic AI.";
const bioLong = "Rupali Gupta is a global technology executive and enterprise architect with more than two decades of experience. As Global Director of Platform Engineering at Dunnhumby, a Tesco company, she leads global platforms, applications, and developer experience, and drives AI native platform engineering, AgentOps, and the governance of autonomous multi agent systems. Her foundation is deep FinTech and regulated financial services, across more than a decade at Fidelity International. She is a two time LinkedIn Top Voice, a multiple award winning engineering leader, a global keynote speaker, and an advocate for women in technology.";

export default function PressKit() {
  return (
    <Section>
      <SectionHead kicker="Press Kit" title="Everything media and event teams need." />
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <Kicker>Short Bio</Kicker>
            <p className="mt-3 text-text">{bioShort}</p>
          </div>
          <div>
            <Kicker>Full Bio</Kicker>
            <p className="mt-3 text-muted leading-relaxed">{bioLong}</p>
          </div>
          <div>
            <Kicker>Fast Facts</Kicker>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3">
              {stats.map((s) => (
                <div key={s.l} className="rounded-xl border border-line-2 bg-panel p-4">
                  <div className="font-display text-2xl text-gold-2">{s.v}</div>
                  <div className="text-xs text-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="rounded-2xl border border-line bg-panel p-6">
          <Kicker>Downloads</Kicker>
          <p className="mt-3 text-sm text-muted">Add headshots and a one page speaker kit to <code className="text-gold-2">/public/images</code> and link them here.</p>
          <div className="mt-5 flex flex-col gap-3">
            <Btn href="/contact">Request assets</Btn>
            <Btn href={site.linkedin} variant="ghost">LinkedIn profile</Btn>
          </div>
        </aside>
      </div>
    </Section>
  );
}
