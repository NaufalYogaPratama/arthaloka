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
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.7)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        popIn: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
};
export default config;
