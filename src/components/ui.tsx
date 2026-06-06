import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-wrap px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="kicker mb-4">{children}</div>;
}

export function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <Kicker>{kicker}</Kicker>
      <h2 className="text-3xl md:text-4xl leading-tight text-cream">{title}</h2>
      {sub ? <p className="mt-4 text-muted text-lg leading-relaxed">{sub}</p> : null}
    </div>
  );
}

export function Btn({ href, children, variant = "solid" }: { href: string; children: React.ReactNode; variant?: "solid" | "ghost" }) {
  const cls = variant === "solid" ? "btn btn-solid" : "btn btn-ghost";
  if (href.startsWith("/")) return <Link href={href} className={cls}>{children}</Link>;
  return <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener">{children}</a>;
}
