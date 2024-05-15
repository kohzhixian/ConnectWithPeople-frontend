/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customDarkGreen: "#00a884",
        customLightGrey: "#eae6df",
      },
      height: {
        "127px": "127px",
      },
    },
  },
  plugins: [],
};
