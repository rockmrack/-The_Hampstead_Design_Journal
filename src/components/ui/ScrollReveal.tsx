'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

type AnimationVariant = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur';

interface ScrollRevealProps {
    children: React.ReactNode;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
    className?: string;
    distance?: number;
}

const getVariants = (variant: AnimationVariant, distance: number): { hidden: Variant; visible: Variant } => {
    const baseTransition = {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
    };

    const variants: Record<AnimationVariant, { hidden: Variant; visible: Variant }> = {
        fadeUp: {
            hidden: { opacity: 0, y: distance },
            visible: { opacity: 1, y: 0, transition: baseTransition },
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: baseTransition },
        },
        fadeLeft: {
            hidden: { opacity: 0, x: -distance },
            visible: { opacity: 1, x: 0, transition: baseTransition },
        },
        fadeRight: {
            hidden: { opacity: 0, x: distance },
            visible: { opacity: 1, x: 0, transition: baseTransition },
        },
        scale: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: baseTransition },
        },
        blur: {
            hidden: { opacity: 0, filter: 'blur(10px)' },
            visible: { opacity: 1, filter: 'blur(0px)', transition: baseTransition },
        },
    };

    return variants[variant];
};

/**
 * ScrollReveal - Animate elements when they enter the viewport.
 * Uses Intersection Observer for performance.
 */
export function ScrollReveal({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    once = true,
    className = '',
    distance = 40,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: threshold });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        } else if (!once) {
            controls.start('hidden');
        }
    }, [isInView, controls, once]);

    const variants = getVariants(variant, distance);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: variants.hidden,
                visible: {
                    ...variants.visible,
                    transition: {
                        ...(typeof variants.visible === 'object' && 'transition' in variants.visible
                            ? variants.visible.transition
                            : {}),
                        delay,
                        duration,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * ScrollRevealGroup - Container for staggered scroll reveal animations
 */
interface ScrollRevealGroupProps {
    children: React.ReactNode;
    staggerDelay?: number;
    threshold?: number;
    once?: boolean;
    className?: string;
}

export function ScrollRevealGroup({
    children,
    staggerDelay = 0.1,
    threshold = 0.1,
    once = true,
    className = '',
}: ScrollRevealGroupProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: threshold });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * ScrollRevealItem - Child item for ScrollRevealGroup
 */
interface ScrollRevealItemProps {
    children: React.ReactNode;
    variant?: AnimationVariant;
    className?: string;
    distance?: number;
}

export function ScrollRevealItem({
    children,
    variant = 'fadeUp',
    className = '',
    distance = 30,
}: ScrollRevealItemProps) {
    const variants = getVariants(variant, distance);

    return (
        <motion.div
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Parallax - Simple parallax effect on scroll
 */
interface ParallaxProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax({
    children,
    speed = 0.5,
    className = ''
}: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const scrolled = window.innerHeight - rect.top;
                setOffset(scrolled * speed * 0.1);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y: offset }}>
                {children}
            </motion.div>
        </div>
    );
}

export default ScrollReveal;
