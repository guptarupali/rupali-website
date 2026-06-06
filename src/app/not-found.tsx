import { Section, Btn } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="text-center">
      <h1 className="text-5xl text-cream">404</h1>
      <p className="mt-4 text-muted">That page could not be found.</p>
      <div className="mt-8 flex justify-center"><Btn href="/">Back home</Btn></div>
    </Section>
  );
}
