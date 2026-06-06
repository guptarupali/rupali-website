import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,md,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0C10",
        "bg-2": "#0E1117",
        panel: "#11151C",
        cream: "#F4F0E6",
        text: "#E9E6DD",
        muted: "#9B9A93",
        line: "rgba(201,162,75,0.16)",
        "line-2": "rgba(255,255,255,0.07)",
        gold: "#C9A24B",
        "gold-2": "#E4C684",
        "gold-3": "#B89039",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: { wrap: "1180px" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
