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
        // Module accent colors — CSS vars (RGB channels)
        scan:    { DEFAULT: 'rgb(var(--c-scan) / <alpha-value>)',    dim: 'var(--c-scan-dim)' },
        refine:  { DEFAULT: 'rgb(var(--c-refine) / <alpha-value>)',  dim: 'var(--c-refine-dim)' },
        reshape: { DEFAULT: 'rgb(var(--c-reshape) / <alpha-value>)', dim: 'var(--c-reshape-dim)' },
        elevate: { DEFAULT: 'rgb(var(--c-elevate) / <alpha-value>)', dim: 'var(--c-elevate-dim)' },
        dial:    { DEFAULT: 'rgb(var(--c-dial) / <alpha-value>)',    dim: 'var(--c-dial-dim)' },
        voice:   { DEFAULT: 'rgb(var(--c-voice) / <alpha-value>)',   dim: 'var(--c-voice-dim)' },
        learn:   { DEFAULT: 'rgb(var(--c-learn) / <alpha-value>)',   dim: 'var(--c-learn-dim)' },

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
