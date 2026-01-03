'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * AnimatedSection - Wrapper for homepage sections with fade-in animations
 */
export function AnimatedSection({
    children,
    className = '',
    delay = 0,
}: AnimatedSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.section>
    );
}

/**
 * AnimatedCard - Card wrapper with hover lift effect
 */
interface AnimatedCardProps {
    children: React.ReactNode;
    className?: string;
    index?: number;
}

export function AnimatedCard({
    children,
    className = '',
    index = 0,
}: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3 },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerList - Animated list container
 */
interface StaggerListProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerList({ children, className = '' }: StaggerListProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
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
 * StaggerItem - Individual item for StaggerList
 */
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedSection;
