'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

/**
 * ThemeProvider - Provides dark/light mode theme management
 * with system preference detection and local storage persistence.
 */
export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'hampstead-theme',
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // Get system preference
    const getSystemTheme = (): 'light' | 'dark' => {
        if (typeof window === 'undefined') return 'light';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Resolve theme based on current setting
    const resolveTheme = (currentTheme: Theme): 'light' | 'dark' => {
        if (currentTheme === 'system') {
            return getSystemTheme();
        }
        return currentTheme;
    };

    // Apply theme to document
    const applyTheme = (resolvedValue: 'light' | 'dark') => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedValue);

        // Set color-scheme for native UI elements
        root.style.colorScheme = resolvedValue;
    };

    // Initialize from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(storageKey) as Theme | null;
        if (stored && ['light', 'dark', 'system'].includes(stored)) {
            setThemeState(stored);
        }
        setMounted(true);
    }, [storageKey]);

    // Apply theme when it changes
    useEffect(() => {
        if (!mounted) return;

        const resolved = resolveTheme(theme);
        setResolvedTheme(resolved);
        applyTheme(resolved);
        localStorage.setItem(storageKey, theme);
    }, [theme, mounted, storageKey]);

    // Listen for system preference changes
    useEffect(() => {
        if (!mounted || theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            const newTheme = e.matches ? 'dark' : 'light';
            setResolvedTheme(newTheme);
            applyTheme(newTheme);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, mounted]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState((prev) => {
            if (prev === 'light') return 'dark';
            if (prev === 'dark') return 'light';
            // If system, toggle to opposite of current resolved
            return resolvedTheme === 'light' ? 'dark' : 'light';
        });
    };

    // Prevent flash of unstyled content
    if (!mounted) {
        return (
            <div style={{ visibility: 'hidden' }}>
                {children}
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * useTheme - Hook to access theme context
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export default ThemeProvider;
