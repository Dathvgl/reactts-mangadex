/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      8: "2rem",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "3rem",
        lg: "6rem",
        xl: "8rem",
        "2xl": "9rem",
      },
    },
    extend: {
      gridTemplateColumns: {
        "fit-40": "repeat(auto-fit, minmax(10rem, 1fr))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
