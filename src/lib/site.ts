export const site = {
  name: 'Rupali Gupta',
  role: 'Global Director of Platform Engineering',
  title: 'Platform Engineering & AI Governance',
  description: 'Deep perspectives on AI, Platform Engineering, and Technology Leadership',
  url: 'https://rupaligupta.in',
  author: 'Rupali Gupta',
  email: 'guptarupali@gmail.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com/in/rupaligupta24',
  github: 'https://github.com',
  ga: 'G-PW3PYBXPPS',
  formspree: {
    speaking: 'xjgdgpdo',
    advisory: 'maqzqlzp',
    media: 'xqeoegog'
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Insights', href: '/insights' },
    { label: 'The Platform Path', href: '/newsletters/platform-path' },
    { label: 'AI Pulse', href: '/newsletters/ai-pulse' },
    { label: 'Speaking', href: '/speaking' },
    { label: 'Advisory', href: '/advisory' },
    { label: 'Media Kit', href: '/media' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' }
  ],
  navGroups: [
    { label: 'Home', href: '/' },
    { label: 'Insights', href: '/insights' },
    { label: 'Newsletters', children: [
      { label: 'The Platform Path', href: '/newsletters/platform-path' },
      { label: 'AI Pulse', href: '/newsletters/ai-pulse' },
    ]},
    { label: 'Speaking', href: '/speaking', children: [
      { label: 'Topics', href: '/speaking#topics' },
      { label: 'Recent Engagements', href: '/speaking#engagements' },
      { label: 'Request to Speak', href: '/speaking#request' },
    ]},
    { label: 'Advisory', href: '/advisory' },
    { label: 'About', href: '/about', children: [
      { label: 'About', href: '/about' },
      { label: 'Media Kit', href: '/media' },
      { label: 'Gallery', href: '/gallery' },
    ]},
  ],
  newsletters: {
    aiPulse: {
      slug: 'ai-pulse',
      name: 'AI Pulse',
      description: 'Weekly insights on AI governance, agentic systems, and enterprise AI',
      href: '/newsletters/ai-pulse'
    },
    platformPath: {
      slug: 'platform-path',
      name: 'The Platform Path',
      description: 'Platform engineering, developer experience, and engineering leadership',
      href: '/newsletters/platform-path'
    }
  }
}
