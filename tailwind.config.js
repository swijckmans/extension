const plugin = require("tailwindcss/plugin");
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: "var(--font-geist-sans)",
      mono: "var(--font-geist-mono)",
    },
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
    extend: {
      maxWidth: {
        most: "96rem",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        "3xl": "2000px",
      },
      boxShadow: {
        light: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      },
      colors: {
        /* This is essentially a copy of slate, but we have our own extends just in case we add/change anything to it. */
        main: {
          0: "#ffffff",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          10000: "#000",

          primary: "#2500DC",
          gradient: "linear-gradient(180deg, #2500DC 0%, #2563EB 100%)",
          success: "#16A34A",
          warning: "#FBBF24",
          error: "#DC2626",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    {
      handler: (tw) => {
        tw.matchComponents(
          {
            "bg-size": (value) => ({
              backgroundSize: `${value} ${value}`,
            }),
          },
          {
            values: flattenColorPalette(tw.theme("size")),
            type: "size",
          }
        );
      },
    },
    {
      handler: (tw) => {
        tw.matchComponents(
          {
            "bg-grid": (value) => ({
              backgroundSize: "3.5em 3.5em",
              backgroundImage: `
                linear-gradient(to right, ${value} 1.5px, transparent 1.5px),
                linear-gradient(to bottom, ${value} 1.5px, transparent 1.5px)
              `,
            }),
          },
          {
            values: flattenColorPalette(tw.theme("colors")),
            type: "color",
          }
        );
      },
    },
    plugin(function ({ addUtilities, config }) {
      const typography = {
        ".typography-quote": {
          fontSize: config("theme.fontSize.base"),
          fontWeight: 400,
        },
        ".typography-lead": {
          fontSize: config("theme.fontSize.base"),
          fontWeight: 400,
        },
        ".typography-large": {
          fontSize: config("theme.fontSize.lg"),
          fontWeight: 600,
        },
        ".typography-medium": {
          fontSize: config("theme.fontSize.sm"),
          fontWeight: 500,
          lineHeight: "14px",
        },
        ".typography-small": {
          fontSize: config("theme.fontSize.sm"),
          fontWeight: 400,
          lineHeight: "20px",
        },
      };

      addUtilities(typography);

      const links = {
        ".link": {
          color: config("theme.colors.main.primary"),
          textDecoration: "none",

          "&:hover": {
            cursor: "pointer",
          },
        },
        ".link-underline": {
          color: config("theme.colors.main.primary"),
          textDecoration: "underline",

          "&:hover": {
            cursor: "pointer",
          },
        },
      };

      addUtilities(links);
    }),
  ],
};
