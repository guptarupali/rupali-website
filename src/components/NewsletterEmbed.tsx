export function NewsletterEmbed({ embed, url, name }: { embed?: string; url?: string; name: string }) {
  if (embed) {
    return (
      <iframe
        src={embed}
        title={`Subscribe to ${name}`}
        scrolling="no"
        style={{ width: "100%", height: 110, border: "1px solid var(--line)", borderRadius: 12, background: "transparent" }}
      />
    );
  }
  return (
    <a href={url || "#"} target={url ? "_blank" : undefined} rel="noopener" className="btn btn-solid">
      Subscribe to {name}
    </a>
  );
}
