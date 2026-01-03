'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
    className?: string;
    showLabel?: boolean;
    variant?: 'icon' | 'pill' | 'switch';
}

/**
 * ThemeToggle - Elegant theme switching component
 */
export function ThemeToggle({
    className = '',
    showLabel = false,
    variant = 'icon',
}: ThemeToggleProps) {
    const [mounted, setMounted] = useState(false);
    const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

    // Only render after hydration to avoid SSR mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a placeholder with the same dimensions during SSR
        return (
            <div className={cn(
                variant === 'icon' ? 'w-9 h-9' : variant === 'switch' ? 'w-14 h-7' : 'w-auto h-9',
                className
            )} />
        );
    }

    if (variant === 'icon') {
        return (
            <button
                onClick={toggleTheme}
                className={cn(
                    'relative p-2 rounded-full transition-colors duration-300',
                    'hover:bg-hampstead-grey/50 dark:hover:bg-white/10',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-hampstead-black dark:focus-visible:ring-white',
                    className
                )}
                aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={resolvedTheme}
                        initial={{ opacity: 0, rotate: -90, scale: 0 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        {resolvedTheme === 'light' ? (
                            <Sun className="w-5 h-5 text-hampstead-black" />
                        ) : (
                            <Moon className="w-5 h-5 text-white" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </button>
        );
    }

    if (variant === 'pill') {
        return (
            <div className={cn(
                'flex items-center gap-1 p-1 rounded-full bg-hampstead-grey/50 dark:bg-white/10',
                className
            )}>
                {[
                    { value: 'light' as const, icon: Sun, label: 'Light' },
                    { value: 'dark' as const, icon: Moon, label: 'Dark' },
                    { value: 'system' as const, icon: Monitor, label: 'System' },
                ].map(({ value, icon: Icon, label }) => (
                    <button
                        key={value}
                        onClick={() => setTheme(value)}
                        className={cn(
                            'relative p-2 rounded-full transition-colors duration-200',
                            theme === value
                                ? 'bg-white dark:bg-hampstead-black shadow-sm'
                                : 'hover:bg-white/50 dark:hover:bg-white/5'
                        )}
                        aria-label={`Set theme to ${label}`}
                        title={label}
                    >
                        <Icon className={cn(
                            'w-4 h-4 transition-colors',
                            theme === value
                                ? 'text-hampstead-black dark:text-white'
                                : 'text-hampstead-charcoal/60 dark:text-white/60'
                        )} />
                    </button>
                ))}
            </div>
        );
    }

    // Switch variant
    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'relative w-14 h-7 rounded-full transition-colors duration-300',
                'bg-hampstead-grey dark:bg-hampstead-charcoal',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                className
            )}
            role="switch"
            aria-checked={resolvedTheme === 'dark'}
            aria-label="Toggle dark mode"
        >
            <motion.div
                className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
                animate={{ x: resolvedTheme === 'dark' ? 26 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={resolvedTheme}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {resolvedTheme === 'light' ? (
                            <Sun className="w-3 h-3 text-amber-500" />
                        ) : (
                            <Moon className="w-3 h-3 text-indigo-600" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            {showLabel && (
                <span className="sr-only">
                    {resolvedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                </span>
            )}
        </button>
    );
}

export default ThemeToggle;
