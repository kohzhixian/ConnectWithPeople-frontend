/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        overlayBoxShadow: "0px 6px 18px",
      },
      colors: {
        customDarkGreen: "#00a884",
        customLightGrey: "#eae6df",
        customWhite: "#f7f8fa",
        topPanelBgColor: "#F0F2F5",
        topPanelIconColor: "#54656f",
      },
      flex: {
        CND_flex: "0 0 30%",
      },
      height: {
        "overlay-height": "calc(100% - 38px)",
        "59px": "59px",
      },
      margin: {
        "19px": "19px",
      },
      maxWidth: {
        "30%": "30%",
      },
      spacing: {
        "19px": "19px",
      },
      width: {
        "overlay-width": "calc(100% - 38px)",
      },
    },
  },
  plugins: [],
};
