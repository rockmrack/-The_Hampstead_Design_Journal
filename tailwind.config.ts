import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hampstead: {
          black: '#1a1a1a',
          white: '#FFFFFF',
          cream: '#F8F7F4',
          grey: '#E5E5E5',
          charcoal: '#333333',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Times New Roman', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: '#1a1a1a',
            lineHeight: '1.75',
            fontSize: '1.125rem',
            h1: {
              fontFamily: 'var(--font-playfair)',
              fontWeight: '400',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontFamily: 'var(--font-playfair)',
              fontWeight: '400',
            },
            h3: {
              fontFamily: 'var(--font-playfair)',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;