/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#AF3B6E",
          secondary: "#BA6790",
          accent: "#794160",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF"
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}