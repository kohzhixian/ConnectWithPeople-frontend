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
      },
      height: {
        "overlay-height": "calc(100% - 38px)",
      },
      margin: {
        "ml-19": "19px",
      },
      spacing: {
        "19px": "19px",
      },
      width: {
        "overlay-width": "calc(100% - 38px)",
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
