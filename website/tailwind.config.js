/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['"Instrument Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
    },
    extend: {
      colors: {
        // Command accent colors — CSS vars (RGB channels)
        review: { DEFAULT: 'rgb(var(--c-review) / <alpha-value>)', dim: 'var(--c-review-dim)' },
        fix:    { DEFAULT: 'rgb(var(--c-fix) / <alpha-value>)',    dim: 'var(--c-fix-dim)' },
        ship:   { DEFAULT: 'rgb(var(--c-ship) / <alpha-value>)',   dim: 'var(--c-ship-dim)' },
        style:  { DEFAULT: 'rgb(var(--c-style) / <alpha-value>)', dim: 'var(--c-style-dim)' },
        words:  { DEFAULT: 'rgb(var(--c-words) / <alpha-value>)', dim: 'var(--c-words-dim)' },

        // Semantic surfaces & text
        surface: {
          DEFAULT:  'rgb(var(--surface) / <alpha-value>)',
          raised:   'rgb(var(--surface-raised) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted:   'rgb(var(--ink-muted) / <alpha-value>)',
          faint:   'rgb(var(--ink-faint) / <alpha-value>)',
        },
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
