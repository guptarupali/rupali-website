import { Section, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = pageMeta(
  "Gallery",
  "Speaking engagements, award recognitions, and moments from conferences and industry events.",
  "/gallery"
);

export default async function GalleryPage() {
  const supabase = createServerClient();
  const { data: images } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <Section>
      <SectionHead
        kicker="Gallery"
        title="Speaking engagements, awards, and industry moments."
        sub="A visual journey through keynotes, industry recognition, and transformation initiatives across global forums."
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {(images || []).map((img) => (
          <div key={img.id} className="overflow-hidden rounded-xl border border-line-2 bg-panel">
            <img
              src={img.image_url}
              alt={img.alt || "Event photo"}
              className="h-48 w-full object-cover transition hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {(!images || images.length === 0) && (
        <p className="text-muted">Gallery photos coming soon.</p>
      )}
    </Section>
  );
}
