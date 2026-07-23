module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0D0E13",
        surface: "#171922",
        surfaceHover: "#20232E",
        accent: "#C8603D",
        accentSoft: "#ECFDAD",
        text: "#EAE9E6",
        muted: "#A6ABB8",
        border: "#272A35",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(200, 96, 61, 0.16)",
        card: "0 24px 80px rgba(0, 0, 0, 0.28)",
        soft: "0 18px 46px rgba(0, 0, 0, 0.18)",
      },
      borderRadius: {
        xl: "28px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
