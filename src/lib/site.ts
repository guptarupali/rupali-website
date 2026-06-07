export const site = {
  name: "Rupali Gupta",
  role: "Global Director of Platform Engineering",
  tagline:
    "Enterprise Architecture / Platform Engineering / Agentic AI Governance / AI Native Engineering",
  description:
    "Rupali Gupta is a global technology executive and enterprise architect leading platform engineering and the governance of agentic AI at enterprise scale.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rupaligupta.com",
  email: "guptarupali@gmail.com",
  linkedin: "https://www.linkedin.com/in/rupaligupta24",
  nav: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Insights", href: "/insights" },
    { label: "Speaking", href: "/speaking" },
    { label: "Advisory", href: "/advisory" },
    { label: "Media Kit", href: "/media" },
    { label: "Awards", href: "/awards" },
    { label: "Gallery", href: "/gallery" },
  ],
  newsletters: {
    aiPulse: {
      name: "AI Pulse",
      slug: "ai-pulse",
      focus: "Agentic AI, governance, AgentOps, enterprise AI, responsible AI",
      url: process.env.NEXT_PUBLIC_BEEHIIV_AIPULSE_URL || "",
      embed: process.env.NEXT_PUBLIC_BEEHIIV_AIPULSE_EMBED || "",
    },
    platformPath: {
      name: "The Platform Path",
      slug: "platform-path",
      focus:
        "Platform engineering, internal developer platforms, developer productivity, FinOps, cloud engineering",
      url: process.env.NEXT_PUBLIC_BEEHIIV_PLATFORMPATH_URL || "",
      embed: process.env.NEXT_PUBLIC_BEEHIIV_PLATFORMPATH_EMBED || "",
    },
  },
  formspree: {
    speaking: process.env.NEXT_PUBLIC_FORMSPREE_SPEAKING || "",
    advisory: process.env.NEXT_PUBLIC_FORMSPREE_ADVISORY || "",
    media: process.env.NEXT_PUBLIC_FORMSPREE_MEDIA || "",
  },
  ga: process.env.NEXT_PUBLIC_GA_ID || "",
};

export const CATEGORIES = [
  "Agentic AI",
  "AI Governance",
  "Platform Engineering",
  "Developer Experience",
  "Internal Developer Platforms",
  "FinOps",
  "Engineering Leadership",
  "Architecture",
  "Women in Technology",
] as const;
export type Category = (typeof CATEGORIES)[number];
