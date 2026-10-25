import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080E1A",
        card: "rgba(15, 23, 42, 0.75)",
        surface: "#0F172A",
        "surface-light": "#1E293B",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        primary: {
          DEFAULT: "#0D6832",
          hover: "#094D25",
          glow: "rgba(13, 104, 50, 0.25)",
        },
        accent: {
          teal: "#14B8A6",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
          indigo: "#6366F1",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
