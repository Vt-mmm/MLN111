/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        serif: ['"Noto Serif"', 'serif'],
      },
      colors: {
        primary: '#1a1a1a',
        secondary: '#4a4a4a',
        accent: '#6a6a6a',
        light: '#F5F5F5',
        dark: '#0A0A0A',
      },
      height: {
        '128': '32rem',
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/hero.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 