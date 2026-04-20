/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#800000", // Maroon
        primaryHover: "#600000",
        darkBg: "#F5F5DC",  // Beige
        panelBg: "#FFFFFF",
        panelBorder: "#E8E8D5", 
        neonRed: "#800000", // Reusing this name to avoid full refactor, but it's now Maroon
        neonOrange: "#8B4513", // Now Brown
        neonPurple: "#5C4033", // Dark Brown
      },
      boxShadow: {
        'neon-red': '0 4px 6px -1px rgba(128, 0, 0, 0.1)',
        'neon-red-glow': '0 10px 15px -3px rgba(128, 0, 0, 0.2)',
        'neon-purple': '0 4px 6px -1px rgba(92, 64, 51, 0.1)',
        'neon-purple-glow': '0 10px 15px -3px rgba(92, 64, 51, 0.2)',
        'neon-orange': '0 4px 6px -1px rgba(139, 69, 19, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-red': 'radial-gradient(circle, rgba(128,0,0,0.05) 0%, rgba(245,245,220,0) 70%)',
        'glow-purple': 'radial-gradient(circle, rgba(139,69,19,0.05) 0%, rgba(245,245,220,0) 70%)',
      }
    },
  },
  plugins: [],
}
