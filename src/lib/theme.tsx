'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// ============================================================================
// Design Tokens
// ============================================================================

export const colors = {
  // Brand Colors
  hampsteadGreen: {
    50: '#f0f7f4',
    100: '#d9ebe3',
    200: '#b6d9c8',
    300: '#8bc2a7',
    400: '#5fa684',
    500: '#2c5f41', // Primary
    600: '#244d35',
    700: '#1e3f2c',
    800: '#183224',
    900: '#12261b',
  },
  hampsteadGold: {
    50: '#fdfbf6',
    100: '#f9f3e8',
    200: '#f0e3c8',
    300: '#e6d0a0',
    400: '#d9b970',
    500: '#c9a050', // Primary
    600: '#b08940',
    700: '#8f6f33',
    800: '#705729',
    900: '#574321',
  },
  
  // Neutral Colors
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Semantic Colors
  success: {
    light: '#dcfce7',
    DEFAULT: '#22c55e',
    dark: '#166534',
  },
  warning: {
    light: '#fef3c7',
    DEFAULT: '#f59e0b',
    dark: '#92400e',
  },
  error: {
    light: '#fee2e2',
    DEFAULT: '#ef4444',
    dark: '#991b1b',
  },
  info: {
    light: '#dbeafe',
    DEFAULT: '#3b82f6',
    dark: '#1e40af',
  },
} as const;

export const typography = {
  fonts: {
    serif: 'Playfair Display, Georgia, serif',
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const;

export const radii = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

export const transitions = {
  durations: {
    fast: '150ms',
    DEFAULT: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easings: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  auto: 'auto',
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modalBackdrop: '1040',
  modal: '1050',
  popover: '1060',
  tooltip: '1070',
  toast: '1080',
} as const;

// ============================================================================
// Theme Types
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  mode: ThemeMode;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    input: string;
    ring: string;
  };
}

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    foreground: colors.slate[900],
    card: '#ffffff',
    cardForeground: colors.slate[900],
    primary: colors.hampsteadGreen[500],
    primaryForeground: '#ffffff',
    secondary: colors.hampsteadGold[500],
    secondaryForeground: colors.slate[900],
    muted: colors.slate[100],
    mutedForeground: colors.slate[500],
    accent: colors.hampsteadGold[100],
    accentForeground: colors.slate[900],
    border: colors.slate[200],
    input: colors.slate[200],
    ring: colors.hampsteadGreen[500],
  },
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: colors.slate[900],
    foreground: colors.slate[50],
    card: colors.slate[800],
    cardForeground: colors.slate[50],
    primary: colors.hampsteadGreen[400],
    primaryForeground: colors.slate[900],
    secondary: colors.hampsteadGold[400],
    secondaryForeground: colors.slate[900],
    muted: colors.slate[800],
    mutedForeground: colors.slate[400],
    accent: colors.slate[700],
    accentForeground: colors.slate[50],
    border: colors.slate[700],
    input: colors.slate[700],
    ring: colors.hampsteadGreen[400],
  },
};

// ============================================================================
// Theme Context
// ============================================================================

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'system',
  storageKey = 'hampstead-theme',
}) => {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');

  // Load saved theme on mount
  useEffect(() => {
    const savedMode = localStorage.getItem(storageKey) as ThemeMode | null;
    if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
      setModeState(savedMode);
    }
  }, [storageKey]);

  // Resolve system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateResolvedMode = () => {
      if (mode === 'system') {
        setResolvedMode(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedMode(mode);
      }
    };

    updateResolvedMode();
    mediaQuery.addEventListener('change', updateResolvedMode);
    
    return () => mediaQuery.removeEventListener('change', updateResolvedMode);
  }, [mode]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedMode);
    
    // Apply CSS variables
    const theme = resolvedMode === 'dark' ? darkTheme : lightTheme;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [resolvedMode]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(storageKey, newMode);
  }, [storageKey]);

  const toggleMode = useCallback(() => {
    const nextMode = resolvedMode === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
  }, [resolvedMode, setMode]);

  const value: ThemeContextValue = {
    theme: resolvedMode === 'dark' ? darkTheme : lightTheme,
    mode,
    setMode,
    toggleMode,
    isDark: resolvedMode === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// Theme Hook
// ============================================================================

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ============================================================================
// Theme Toggle Component
// ============================================================================

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { mode, setMode, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      className={`
        relative inline-flex h-10 w-10 items-center justify-center rounded-lg
        text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50
        hover:bg-slate-100 dark:hover:bg-slate-800
        transition-colors duration-200
        ${className || ''}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon */}
      <svg
        className={`h-5 w-5 transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      {/* Moon icon */}
      <svg
        className={`absolute h-5 w-5 transition-all ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};

// ============================================================================
// CSS-in-JS Helpers
// ============================================================================

export const getThemeValue = (path: string, theme: Theme): string => {
  const parts = path.split('.');
  let value: unknown = theme;
  
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return '';
    }
  }
  
  return typeof value === 'string' ? value : '';
};

export const cssVar = (name: string, fallback?: string): string => {
  return fallback ? `var(--${name}, ${fallback})` : `var(--${name})`;
};

// ============================================================================
// Exports
// ============================================================================

export const designTokens = {
  colors,
  typography,
  spacing,
  shadows,
  radii,
  transitions,
  breakpoints,
  zIndex,
};

export { lightTheme, darkTheme };
