/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  media: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      nav: ["Satoshi", "sans-serif"],
      body: ["Satoshi", "sans-serif"],
    },
    extend: {
      textColor: {
        "primary-blue": "#3B82F6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    {
      strategy: "base", // only generate global styles
    },
  ],
};
