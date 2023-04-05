/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#180933",
        tertiary: "#0D0933",
        quaternary: "#091C33",
      },
      fontFamily: {
        poppin: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
