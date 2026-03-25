import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "Nunito", "sans-serif"],
        fredoka: ["var(--font-fredoka)", "Fredoka", "cursive"],
      },
      colors: {
        easy: "#16a34a",
        medium: "#2563eb",
        hard: "#dc2626",
        "bg-main": "#f0fdf4",
        accent: "#fbbf24",
        mascot: "#f97316",
      },
    },
  },
  plugins: [],
};
export default config;
