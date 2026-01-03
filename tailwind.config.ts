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
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: '#1a1a1a',
            lineHeight: '1.85',
            fontSize: '1.125rem',
            h1: {
              fontFamily: 'var(--font-playfair)',
              fontWeight: '400',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontFamily: 'var(--font-playfair)',
              fontWeight: '400',
              marginTop: '2.5em',
            },
            h3: {
              fontFamily: 'var(--font-playfair)',
              fontWeight: '400',
              marginTop: '2em',
            },
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            a: {
              color: '#1a1a1a',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              '&:hover': {
                textDecorationThickness: '2px',
              },
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: '#1a1a1a',
              borderLeftWidth: '4px',
              paddingLeft: '1.5em',
              marginTop: '2em',
              marginBottom: '2em',
            },
            strong: {
              color: '#1a1a1a',
              fontWeight: '600',
            },
            'ul > li::marker': {
              color: '#1a1a1a',
            },
            hr: {
              borderColor: '#E5E5E5',
              marginTop: '3em',
              marginBottom: '3em',
            },
            'figure figcaption': {
              color: '#666666',
              fontSize: '0.875rem',
              textAlign: 'center',
              marginTop: '0.5em',
              fontFamily: 'var(--font-sans)',
            },
          },
        },
        hampstead: {
          css: {
            '--tw-prose-body': '#333333',
            '--tw-prose-headings': '#1a1a1a',
            '--tw-prose-links': '#1a1a1a',
            '--tw-prose-bold': '#1a1a1a',
            '--tw-prose-quotes': '#333333',
            '--tw-prose-quote-borders': '#1a1a1a',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-up': 'scaleUp 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(26, 26, 26, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(26, 26, 26, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;