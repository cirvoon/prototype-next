import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          blue: "#007AFF",
          "blue-pressed": "#0051D5",
          green: "#34C759",
          orange: "#FF9500",
          red: "#FF3B30",
          gray: "#8E8E93",
          gray2: "#AEAEB2",
          gray3: "#C7C7CC",
          gray4: "#D1D1D6",
          gray5: "#E5E5EA",
          gray6: "#F2F2F7",
        },
        sport: {
          badminton: "#FF9500",
          "badminton-bg": "rgba(255, 149, 0, 0.12)",
          running: "#5AC8FA",
          "running-bg": "rgba(90, 200, 250, 0.12)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      fontSize: {
        "large-title": ["34px", { lineHeight: "1.2", fontWeight: "700" }],
        "title-1": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "title-2": ["22px", { lineHeight: "1.2", fontWeight: "700" }],
        "title-3": ["20px", { lineHeight: "1.2", fontWeight: "600" }],
        headline: ["17px", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["17px", { lineHeight: "1.4" }],
        callout: ["16px", { lineHeight: "1.4" }],
        subheadline: ["15px", { lineHeight: "1.4" }],
        footnote: ["13px", { lineHeight: "1.3" }],
        "caption-1": ["12px", { lineHeight: "1.3" }],
        "caption-2": ["11px", { lineHeight: "1.2" }],
      },
      borderRadius: {
        ios: "10px",
        "ios-lg": "12px",
        "ios-xl": "14px",
      },
      boxShadow: {
        ios: "0 1px 3px rgba(0, 0, 0, 0.04)",
        "ios-md": "0 2px 8px rgba(0, 0, 0, 0.06)",
        "ios-lg": "0 4px 16px rgba(0, 0, 0, 0.08)",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top, 0px)",
        "safe-bottom": "env(safe-area-inset-bottom, 0px)",
      },
    },
  },
  plugins: [],
};

export default config;
