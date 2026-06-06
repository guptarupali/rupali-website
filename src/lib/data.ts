import adminData from './admin-data.json';

export const stats = [
  { v: "£50M+", l: "Portfolios led" },
  { v: "10M+", l: "Customer accounts migrated" },
  { v: "~60%", l: "Cloud cost reduction" },
  { v: "$15M+", l: "Annual savings delivered" },
  { v: "300+", l: "Engineers led globally" },
  { v: "21+", l: "Years in architecture & platforms" },
];

export const focusAreas = [
  "Enterprise Architecture", "Distributed Architecture", "Platform Engineering",
  "Agentic AI Governance", "AgentOps", "Autonomous Multi Agent Systems",
  "Ethical & Responsible AI", "AI Reliability", "Internal Developer Platforms",
  "Cloud Native", "Developer Experience", "FinOps", "API Strategy",
  "Observability", "FinTech & Regulated Services",
];

export const timeline = [
  { role: "Global Director of Platform Engineering", org: "Dunnhumby (a Tesco company)", yr: "2025 to Present",
    detail: [
      "Owns global platforms, applications, and developer experience strategy and architecture direction",
      "Drives AI powered platform engineering: Agentic AI, AgentOps, and AIOps at enterprise scale",
      "Builds invisible platforms, internal developer platforms, and self service golden paths",
      "Delivers first class observability and zero touch, autonomous CI/CD pipelines",
      "Embeds guardrails, ethical AI, and governance for autonomous, multi agent systems",
    ] },
  { role: "Head of Capability Architecture, Payments, Fincrime & Customer", org: "Fidelity International", yr: "2013 to 2025",
    detail: [
      "Senior technology and enterprise architecture leader across payments, customer, and risk platforms",
      "Led enterprise architecture, API strategy and governance, and large scale digital transformation",
      "Delivered in highly regulated financial services (AML, KYC, sanctions, GDPR, PCI DSS)",
      "Drove cloud, data, and platform modernization across distributed global teams",
    ] },
  { role: "Technical Specialist, Fidelity International Account", org: "Publicis Sapient", yr: "2010 to 2013",
    detail: [
      "Investment banking and FinTech domain expert on the Fidelity International account",
      "Delivered data and platform architecture for Tier one financial services",
    ] },
  { role: "Software Engineer, Early Career", org: "iSoft & Macmillan (MPS)", yr: "2006 to 2010",
    detail: [
      "Built core engineering foundations in publishing and enterprise software",
      "The grounding that shaped an architecture led, FinTech focused career",
    ] },
];

export const awards = adminData.awards.map((a: any) => ({
  y: a.year,
  h: a.title,
  s: a.subtitle,
}));

export const events = adminData.events.map((e: any) => ({
  n: e.name,
  m: e.description,
  r: e.role,
  linkedIn: e.linkedinUrl,
}));

export const speakingTopics = adminData.speakingTopics.map((t: any) => ({
  h: t.title,
  p: t.description,
}));

export const advisoryServices = adminData.advisoryServices.map((a: any) => ({
  h: a.title,
  p: a.description,
}));

export const media = adminData.media.map((m: any) => ({
  type: m.type,
  h: m.title,
  p: m.description,
}));

export const recommendations = adminData.recommendations.map((r: any) => ({
  t: r.text,
  n: r.name,
  w: r.title,
}));
