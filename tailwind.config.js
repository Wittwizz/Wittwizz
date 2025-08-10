/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // cobalt
        surface: "#0B1426",
        ink: "#1A1A1A"
      },
      borderRadius: {
        '2xl': '1rem'
      },
      boxShadow: {
        card: '0 6px 24px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
}
