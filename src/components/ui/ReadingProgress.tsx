'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ReadingProgressProps {
    /**
     * Color of the progress bar (Tailwind class or CSS color)
     */
    color?: string;
    /**
     * Height of the progress bar in pixels
     */
    height?: number;
    /**
     * Whether to show the percentage label
     */
    showLabel?: boolean;
    /**
     * Z-index for the progress bar
     */
    zIndex?: number;
    /**
     * Whether to use gradient styling
     */
    gradient?: boolean;
}

/**
 * ReadingProgress - A premium reading progress indicator.
 * Shows a progress bar at the top of the viewport indicating scroll position.
 */
export function ReadingProgress({
    color = '#1a1a1a',
    height = 3,
    showLabel = false,
    zIndex = 100,
    gradient = true,
}: ReadingProgressProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth spring animation for the progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Only show after scrolling past initial viewport
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return scrollYProgress.on('change', (latest: number) => {
            setProgress(Math.round(latest * 100));
        });
    }, [scrollYProgress]);

    if (!isVisible) return null;

    return (
        <>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 origin-left"
                style={{
                    scaleX,
                    height,
                    zIndex,
                    background: gradient
                        ? 'linear-gradient(90deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%)'
                        : color,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Optional Percentage Label */}
            {showLabel && (
                <motion.div
                    className="fixed top-4 right-4 px-3 py-1.5 bg-hampstead-black/90 text-white text-xs font-mono rounded-full backdrop-blur-sm"
                    style={{ zIndex: zIndex + 1 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {progress}%
                </motion.div>
            )}
        </>
    );
}

/**
 * ReadingProgressMinimal - Ultra-thin progress indicator
 */
export function ReadingProgressMinimal() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-hampstead-charcoal via-hampstead-black to-hampstead-charcoal z-[100]"
            style={{ scaleX }}
        />
    );
}

/**
 * ReadingProgressCircular - Circular progress indicator (optional alternative)
 */
interface ReadingProgressCircularProps {
    size?: number;
    strokeWidth?: number;
}

export function ReadingProgressCircular({
    size = 48,
    strokeWidth = 3,
}: ReadingProgressCircularProps) {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
        >
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={(size - strokeWidth) / 2}
                    fill="none"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={(size - strokeWidth) / 2}
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: scrollYProgress.get()
                            ? circumference * (1 - scrollYProgress.get())
                            : circumference,
                    }}
                />
            </svg>
        </motion.div>
    );
}

export default ReadingProgress;
