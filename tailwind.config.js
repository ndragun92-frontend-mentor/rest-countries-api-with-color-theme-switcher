/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 */
module.exports = {
  content: [],
  darkMode: "class",
  theme: {
    screens: {
      touch: { raw: "hover: none" },
      "can-hover": { raw: "hover: hover" },
      xxs: "380px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      "5xl": "3840px",
    },
    extend: {
      colors: {
        primary: {
          darkEl: "hsl(209, 23%, 22%)",
          darkBg: "hsl(207, 26%, 17%)",
          darkText: "hsl(200, 15%, 8%)",
          darkInput: "hsl(0, 0%, 52%)",
          lightBg: "hsl(0, 0%, 98%)",
          darkTextLightEl: "hsl(0, 0%, 100%)",
        },
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
    },
  },
  variants: {
    backgroundColor: [
      "dark",
      "dark-hover",
      "dark-group-hover",
      "dark-even",
      "dark-odd",
    ],
    borderColor: ["dark", "dark-focus", "dark-focus-within"],
    textColor: ["dark", "dark-hover", "dark-active"],
  },
};
