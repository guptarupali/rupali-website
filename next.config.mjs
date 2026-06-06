/** @type {import('next').NextConfig} */
const nextConfig = {
  // To deploy as a fully static site (Cloudflare Pages, GitHub Pages, Netlify),
  // uncomment the next line. Forms post directly to Formspree, so no server is required.
  // output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
