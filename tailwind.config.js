/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './writeups.html', './assets/js/**/*.js'],
  theme: {
    // Match Bootstrap 5 breakpoints so responsive behavior stays identical
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
    extend: {
      fontFamily: {
        sans: ['Google Sans Flex', 'sans-serif'],
      },
      keyframes: {
        nudge: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(3px, -3px)' },
        },
      },
      animation: {
        nudge: 'nudge 0.7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
