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
        chatMeta: "#667781",
        primaryStrong: "#111b21",
        secondaryStronger: "#3b4a54",
        backgroundDefaultActive: "#f0f2f5",
        panelBackgroundColor: "#008069",
      },
      flex: {
        CND_flex: "0 0 30%",
      },
      height: {
        "59px": "59px",
        h_pane_subheader: "49px",
        search_icon_div_height: "35px",
        h_full_header: "108px",
        drawerHeaderLineHeight: "23px",
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
        search_icon_div_width: "65px",
      },
    },
  },
  plugins: [],
};
