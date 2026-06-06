# Rupali Gupta — Executive Platform (Next.js 15)

A production-ready thought leadership platform: blog, two newsletters, speaking/advisory/media request forms, awards, press kit, and full SEO. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

It runs out of the box with local Markdown posts, and progressively lights up as you connect Notion, Formspree, beehiiv, and Google Analytics.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything has a safe fallback
npm run dev                  # http://localhost:3000
```

## What works with zero config
- The full site, all pages, and the blog (reads Markdown from `content/posts/`).
- Forms: if a Formspree id is missing, the form falls back to opening an email to you, so nothing is ever lost.
- Newsletter blocks: if a beehiiv embed is missing, they show a Subscribe button to the newsletter URL.

## Connect the services (all free tiers)

**Forms — Formspree** (free: 50 submissions/month, unlimited forms). Create 3 forms at https://formspree.io, then set `NEXT_PUBLIC_FORMSPREE_SPEAKING/ADVISORY/MEDIA` to the id after `/f/`.

**Newsletters — beehiiv** (free Launch: up to 2,500 subscribers, up to 3 publications). Create AI Pulse and The Platform Path, then set the publication URLs and the embed form URLs (Publication → Settings → Embed) in `.env.local`.

**Analytics — GA4**: set `NEXT_PUBLIC_GA_ID` to your `G-XXXX` id.

**Blog authoring — two options**
1. Local Markdown (default): add a `.md` file to `content/posts/`. Each file has frontmatter: `title, date, category, tags, excerpt, featured`. Commit and redeploy.
2. Notion CMS (write without code): `npm i @notionhq/client notion-to-md`, create a Notion database with properties `Title (title)`, `Slug (text)`, `Date (date)`, `Category (select)`, `Tags (multi-select)`, `Excerpt (text)`, `Featured (checkbox)`, `Published (checkbox)`, share it with your integration, then set `NOTION_TOKEN` and `NOTION_DATABASE_ID`. The blog switches to Notion automatically and falls back to local content on any error. Trigger a redeploy (or a scheduled daily build) to publish new posts.

## Categories
Agentic AI · AI Governance · Platform Engineering · Developer Experience · Internal Developer Platforms · FinOps · Engineering Leadership · Architecture · Women in Technology.

## Deploy (free, commercial use allowed)
Recommended: **Cloudflare Pages** (free tier allows commercial use). Push to GitHub, connect the repo, build command `npm run build`. For a fully static deploy, uncomment `output: 'export'` in `next.config.mjs` (forms post directly to Formspree, so no server is needed). Netlify works the same way. Vercel works too, but its free Hobby tier is non-commercial only, so use Vercel Pro for a business site.

## SEO included
Per-page metadata + Open Graph, `sitemap.xml`, `robots.txt`, an RSS feed at `/feed.xml`, JSON-LD Person (site-wide) and Article (per post).

## Structure
```
content/posts/         Markdown blog posts (default content source)
src/app/               Routes: home, about, blog, blog/[slug], speaking,
                       advisory, media, awards, resources, press-kit,
                       contact, newsletters/ai-pulse, newsletters/platform-path,
                       sitemap.ts, robots.ts, feed.xml/route.ts
src/components/        Nav, Footer, UI, PostList (search/filter), forms/RequestForm
src/lib/               site.ts (config), data.ts (awards/events/etc),
                       posts.ts (local + optional Notion), seo.ts
```

## Customize
- Brand tokens (colours, fonts) live in `tailwind.config.ts` and `src/app/globals.css`.
- All content data (awards, events, recommendations, topics) lives in `src/lib/data.ts`.
- Site config (name, email, nav, newsletter + form ids) lives in `src/lib/site.ts`.
