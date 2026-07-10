/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        girlpink: "#ff6ec7",
        girlred: "#ff2b4e",
        girlyellow: "#ffe066",
        girlpurple: "#b565ff",
        girlblue: "#63d2ff",
      },
    },
  },
  plugins: [],
};