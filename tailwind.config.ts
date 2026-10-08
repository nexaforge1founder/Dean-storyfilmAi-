import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        forge: {
          bg: "#0b0b0f",
          panel: "#141419",
          panelAlt: "#191922",
          border: "#232330",
          purple: "#8b5cf6",
          neon: "#4cc9f0",
          emerald: "#34d399",
          crimson: "#f43f5e",
          emberGold: "#f5c542",
          emberEnd: "#e0562f",
        },
      },
      fontFamily: {
        display: ["'Chakra Petch'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
