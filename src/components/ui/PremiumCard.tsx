'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookmarkButton } from '../articles/BookmarkButton';

interface PremiumCardProps {
    title: string;
    excerpt?: string;
    image?: string;
    category?: string;
    readTime?: string;
    href: string;
    className?: string;
    variant?: 'default' | 'featured' | 'minimal' | 'overlay';
    showBookmark?: boolean;
    articleId?: string;
}

/**
 * PremiumCard - Enhanced article card with hover effects and animations
 */
export function PremiumCard({
    title,
    excerpt,
    image,
    category,
    readTime,
    href,
    className = '',
    variant = 'default',
    showBookmark = true,
    articleId,
}: PremiumCardProps) {

    if (variant === 'overlay') {
        return (
            <Link href={href} className={cn('group block relative', className)}>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[4/5] overflow-hidden"
                >
                    {image && (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Category badge */}
                    {category && (
                        <span className="absolute top-4 left-4 px-3 py-1. text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-sm text-white border border-white/20">
                            {category}
                        </span>
                    )}

                    {/* Bookmark button */}
                    {showBookmark && articleId && (
                        <div className="absolute top-4 right-4 z-10" onClick={(e) => e.preventDefault()}>
                            <BookmarkButton articleId={articleId} articleTitle={title} variant="minimal" className="text-white" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                            {title}
                        </h3>
                        {excerpt && (
                            <p className="text-white/70 text-sm line-clamp-2 mb-4">{excerpt}</p>
                        )}
                        <div className="flex items-center gap-4 text-white/50 text-xs uppercase tracking-wider">
                            {readTime && (
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {readTime}
                                </span>
                            )}
                            <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read More
                                <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        );
    }

    if (variant === 'featured') {
        return (
            <Link href={href} className={cn('group block', className)}>
                <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-white dark:bg-hampstead-black border border-hampstead-grey/20 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                >
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                        {image && (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Category badge */}
                        {category && (
                            <span className="absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-widest bg-hampstead-black text-white">
                                {category}
                            </span>
                        )}

                        {/* Bookmark */}
                        {showBookmark && articleId && (
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.preventDefault()}>
                                <BookmarkButton articleId={articleId} articleTitle={title} variant="icon" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="font-serif text-2xl md:text-3xl mb-3 text-hampstead-black dark:text-white group-hover:text-hampstead-charcoal dark:group-hover:text-white/80 transition-colors">
                            {title}
                        </h3>
                        {excerpt && (
                            <p className="text-hampstead-charcoal/70 dark:text-white/60 line-clamp-2 mb-4">{excerpt}</p>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-widest text-hampstead-charcoal/50 dark:text-white/40">
                                {readTime}
                            </span>
                            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-hampstead-black dark:text-white group-hover:gap-3 transition-all">
                                Read
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-hampstead-black via-hampstead-charcoal to-hampstead-black dark:from-white dark:via-white/50 dark:to-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
            </Link>
        );
    }

    if (variant === 'minimal') {
        return (
            <Link href={href} className={cn('group block py-4 border-b border-hampstead-grey/20 dark:border-white/10 hover:border-hampstead-black dark:hover:border-white transition-colors', className)}>
                <div className="flex items-start gap-4">
                    <div className="flex-1">
                        {category && (
                            <span className="text-[10px] uppercase tracking-widest text-hampstead-charcoal/50 dark:text-white/40 mb-1 block">
                                {category}
                            </span>
                        )}
                        <h3 className="font-serif text-lg text-hampstead-black dark:text-white group-hover:text-hampstead-charcoal dark:group-hover:text-white/80 transition-colors">
                            {title}
                        </h3>
                        {readTime && (
                            <span className="text-xs text-hampstead-charcoal/50 dark:text-white/40 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {readTime}
                            </span>
                        )}
                    </div>
                    <ArrowRight className="w-4 h-4 mt-1 text-hampstead-charcoal/30 dark:text-white/30 group-hover:text-hampstead-black dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
            </Link>
        );
    }

    // Default variant
    return (
        <Link href={href} className={cn('group block', className)}>
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white dark:bg-hampstead-black border border-hampstead-grey/20 dark:border-white/10 overflow-hidden transition-shadow duration-300 hover:shadow-lg"
            >
                {/* Image */}
                {image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Bookmark */}
                        {showBookmark && articleId && (
                            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.preventDefault()}>
                                <BookmarkButton articleId={articleId} articleTitle={title} variant="minimal" />
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-5">
                    {category && (
                        <span className="text-[10px] uppercase tracking-widest text-hampstead-charcoal/50 dark:text-white/40 mb-2 block">
                            {category}
                        </span>
                    )}
                    <h3 className="font-serif text-xl mb-2 text-hampstead-black dark:text-white group-hover:text-hampstead-charcoal dark:group-hover:text-white/80 transition-colors">
                        {title}
                    </h3>
                    {excerpt && (
                        <p className="text-hampstead-charcoal/60 dark:text-white/50 text-sm line-clamp-2">{excerpt}</p>
                    )}
                    {readTime && (
                        <span className="text-xs text-hampstead-charcoal/40 dark:text-white/30 mt-3 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime}
                        </span>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}

export default PremiumCard;
