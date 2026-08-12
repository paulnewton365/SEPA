/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
      },
      colors: {
        // Warm editorial palette
        paper: "#F6F2E9",
        "paper-tint": "#EEE8DA",
        ink: "#15171A",
        "ink-soft": "#4A4D52",
        "ink-muted": "#85857F",
        rule: "#9C9079",
        "rule-soft": "#C7BFA8",
        accent: "#B85C3B",
        "accent-soft": "#E9C9B5",
      },
      maxWidth: {
        prose: "680px",
        wide: "820px",
      },
      letterSpacing: {
        tightish: "-0.015em",
      },
    },
  },
  plugins: [],
};
