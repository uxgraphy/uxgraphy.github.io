/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
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
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
