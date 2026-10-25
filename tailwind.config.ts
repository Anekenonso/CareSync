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
        background: "#FAFBF8",
        dark: {
          bg: "#000000",
          surface: "#181818",
          elevated: "#1F1F1F",
          border: "#272727",
          muted: "#313131",
          subtle: "#131209",
        },
        surface: {
          light: "#FFFFFF",
          subtle: "#F4F6F2",
          border: "#E2E7DE",
        },
        primary: {
          DEFAULT: "#0E6238",
          hover: "#0B4E2D",
          subtle: "#EBF7F0",
          dark: "#199A59",
          darkHover: "#22B56C",
        },
        clinical: {
          amber: "#D97706",
          amberSubtle: "#FEF3C7",
          amberDark: "#F59E0B",
          rose: "#BE123C",
          roseSubtle: "#FFF1F2",
          roseDark: "#F43F5E",
        },
      },
      fontFamily: {
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionDuration: {
        smooth: "700ms",
      },
    },
  },
  plugins: [],
};
export default config;
