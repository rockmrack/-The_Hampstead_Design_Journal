// Font configuration for The Hampstead Design Journal
// Using Next.js font optimization with Playfair Display
// Configuration is handled in app/layout.tsx

export const fontConfig = {
  heading: 'var(--font-playfair)',
  body: 'system-ui, -apple-system, sans-serif',
  sizes: {
    h1: 'clamp(2.5rem, 5vw, 4rem)',
    h2: 'clamp(2rem, 4vw, 3rem)',
    h3: 'clamp(1.5rem, 3vw, 2rem)',
    body: '1.125rem',
    small: '0.875rem',
  },
  lineHeights: {
    tight: '1.2',
    normal: '1.75',
    loose: '2',
  },
};