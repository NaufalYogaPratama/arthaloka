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
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeOverlay: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        popIn: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.25s ease-in',
        'fade-overlay': 'fadeOverlay 0.2s ease',
        'confetti-fall': 'confettiFall 4s ease-in infinite',
        shimmer: 'shimmer 3s ease infinite',
      },
    },
  },
  plugins: [],
};
export default config;
