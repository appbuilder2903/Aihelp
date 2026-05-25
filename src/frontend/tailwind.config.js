import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gradient-shift": {
          "0%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(180deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        "color-cycle": {
          "0%":   { color: "oklch(0.75 0.22 210)" },
          "17%":  { color: "oklch(0.78 0.22 270)" },
          "33%":  { color: "oklch(0.72 0.25 320)" },
          "50%":  { color: "oklch(0.78 0.22 0)"   },
          "67%":  { color: "oklch(0.80 0.22 60)"  },
          "83%":  { color: "oklch(0.78 0.18 140)" },
          "100%": { color: "oklch(0.75 0.22 210)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 8px oklch(0.65 0.22 210 / 0.4), 0 0 20px oklch(0.65 0.22 210 / 0.2)",
          },
          "50%": {
            boxShadow: "0 0 16px oklch(0.65 0.25 320 / 0.6), 0 0 40px oklch(0.65 0.25 320 / 0.3)",
          },
        },
        "rainbow-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
        "aurora-drift": {
          "0%, 100%": { transform: "translateX(0%) translateY(0%) scale(1)" },
          "33%":      { transform: "translateX(4%) translateY(-3%) scale(1.05)" },
          "66%":      { transform: "translateX(-3%) translateY(4%) scale(0.97)" },
        },
        "bounce-dot": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        "color-cycle-user": {
          "0%":   { color: "oklch(0.82 0.18 210)" },
          "25%":  { color: "oklch(0.82 0.18 240)" },
          "50%":  { color: "oklch(0.82 0.18 190)" },
          "75%":  { color: "oklch(0.82 0.18 220)" },
          "100%": { color: "oklch(0.82 0.18 210)" },
        },
        "color-cycle-ai": {
          "0%":   { color: "oklch(0.80 0.20 320)" },
          "25%":  { color: "oklch(0.80 0.20 300)" },
          "50%":  { color: "oklch(0.80 0.20 340)" },
          "75%":  { color: "oklch(0.80 0.20 310)" },
          "100%": { color: "oklch(0.80 0.20 320)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-flow": "gradient-shift 8s linear infinite",
        "color-cycle": "color-cycle 6s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "rainbow-shift": "rainbow-shift 6s linear infinite",
        "aurora-drift": "aurora-drift 14s ease-in-out infinite",
        "bounce-dot": "bounce-dot 1.2s ease-in-out infinite",
        "color-cycle-user": "color-cycle-user 8s linear infinite",
        "color-cycle-ai": "color-cycle-ai 6s linear infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
