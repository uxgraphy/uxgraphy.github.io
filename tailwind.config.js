/** @type {import('tailwindcss').Config} */
module.exports = {
  // styleguide.html is gitignored (local-only, never deployed) but still
  // needs its Tailwind classes compiled — safe to list even when absent,
  // Tailwind just finds no content there (e.g. on a fresh clone/CI).
  content: ['./index.html', './writeups.html', './built-with-ai.html', './career-tidbits.html', './styleguide.html', './pdf-viewer.html', './assets/js/**/*.js'],
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
      // Major second (1.125) type scale, base 16px = 1rem; used by pdf-viewer.html
      fontSize: {
        'ms-n3': '0.75rem',
        'ms-n2': '0.75rem',
        'ms-0': '1.0rem',
        'ms-2': '1.25rem',
        'ms-3': '1.5rem',
        'ms-4': '1.75rem',
        'ms-5': '3rem',
        'ms-6': '2rem',
      },
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
