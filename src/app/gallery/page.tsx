import { Section, SectionHead } from "@/components/ui";
import { Gallery } from "@/components/Gallery";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Gallery",
  "Speaking engagements, award recognitions, and moments from conferences and industry events.",
  "/gallery"
);

export default function GalleryPage() {
  return (
    <Section>
      <SectionHead
        kicker="Gallery"
        title="Speaking engagements, awards, and industry moments."
        sub="A visual journey through keynotes, industry recognition, and transformation initiatives across global forums."
      />
      <Gallery />
    </Section>
  );
}
