import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Sting Energy Colors
        "sting-gold": "hsl(var(--sting-gold))",
        "sting-gold-bright": "hsl(var(--sting-gold-bright))",
        "sting-orange": "hsl(var(--sting-orange))",
        "sting-dark": "hsl(var(--sting-dark))",
        "sting-black": "hsl(var(--sting-black))",
        "sting-white": "hsl(var(--sting-white))",
        // Electric Colors
        "electric-blue": "hsl(var(--electric-blue))",
        "electric-cyan": "hsl(var(--electric-cyan))",
        "electric-purple": "hsl(var(--electric-purple))",
        "electric-yellow": "hsl(var(--electric-yellow))",
        "game-surface": "hsl(var(--game-surface))",
        "game-surface-dark": "hsl(var(--game-surface-dark))",
        // Glass Colors
        "glass-bg": "hsl(var(--glass-bg))",
        "glass-border": "hsl(var(--glass-border))",
        "glass-shadow": "hsl(var(--glass-shadow))",
        "revenue-low": "hsl(var(--revenue-low))",
        "revenue-medium": "hsl(var(--revenue-medium))",
        "revenue-high": "hsl(var(--revenue-high))",
        "revenue-max": "hsl(var(--revenue-max))",
        correct: "hsl(var(--correct))",
        incorrect: "hsl(var(--incorrect))",
        neutral: "hsl(var(--neutral))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
