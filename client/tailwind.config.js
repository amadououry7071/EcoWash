/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A154B',
          dark: '#3a1039',
          light: '#5a2560'
        },
        secondary: {
          DEFAULT: '#22C55E',
          dark: '#16a34a',
          light: '#4ade80'
        },
        accent: {
          DEFAULT: '#DB2777',
          dark: '#be185d',
          light: '#f472b6'
        },
        olive: {
          DEFAULT: '#4D5C2E',
          dark: '#3d4a24',
          light: '#6b7d3f'
        }
      }
    },
  },
  plugins: [],
}
