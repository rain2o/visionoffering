module.exports = {


  /*
   * More information: https://tailwindcss.com/blog/tailwindcss-v3
   */
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      /* How to Add custom Colors
       * Give your color a name, make it something that makes sense.
       * If you aren't going to use the colors below, delete them.
       *
       * Default is the normal base color.
       * Light / Dark are variants within the same palette
       * Classes are named text-CLASSNAME
       *
       * https://tailwindcss.com/docs/customizing-colors#custom-colors
       * */
      blue: {
        DEFAULT: "#234058", // text-blue
      },
      green: {
        DEFAULT: "#bdf1e7",
      },
      orange: {
        DEFAULT: "#e3682b",
      },
      white: {
        DEFAULT: "#eeeeee",
      },
      black: {
        DEFAULT: "#141414",
      },
      gray: {
        DEFAULT: "#D3D3D3",
      },
    },
  },
  plugins: [],
};
