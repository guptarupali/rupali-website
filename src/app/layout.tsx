import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, url: site.url, siteName: site.name, type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image" },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  sameAs: [
    site.linkedin,
    "https://medium.com/@guptarupali",
    "https://x.com/RupaliGupta24",
    "https://www.instagram.com/rupali.gupta24/",
    "https://www.threads.com/@rupali.gupta24",
    "https://www.youtube.com/channel/UCDn4BbLqa7V2nFEnMfVhnEw",
  ],
  knowsAbout: ["Platform Engineering", "Agentic AI Governance", "Enterprise Architecture", "Developer Experience", "FinTech", "Cloud Native", "AI Native Platforms", "Kubernetes", "DevOps", "Financial Crime Technology"],
  description: "Global Director of Platform Engineering, keynote speaker on agentic AI governance, platform engineering, and engineering leadership.",
  worksFor: { "@type": "Organization", name: "Dunnhumby" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        {site.ga ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.ga}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.ga}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
