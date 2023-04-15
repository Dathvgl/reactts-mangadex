/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "3rem",
        lg: "6rem",
        xl: "8rem",
        "2xl": "9rem",
      },
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
