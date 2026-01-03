'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
    articleId: string;
    articleTitle: string;
    variant?: 'icon' | 'button' | 'minimal';
    className?: string;
    onBookmarkChange?: (isBookmarked: boolean) => void;
}

const STORAGE_KEY = 'hampstead-bookmarks';

interface BookmarkedArticle {
    id: string;
    title: string;
    savedAt: string;
}

/**
 * Get all bookmarked articles from localStorage
 */
export function getBookmarkedArticles(): BookmarkedArticle[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

/**
 * Check if an article is bookmarked
 */
export function isArticleBookmarked(articleId: string): boolean {
    const bookmarks = getBookmarkedArticles();
    return bookmarks.some((b) => b.id === articleId);
}

/**
 * BookmarkButton - Save articles for later reading
 */
export function BookmarkButton({
    articleId,
    articleTitle,
    variant = 'icon',
    className = '',
    onBookmarkChange,
}: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Load initial state
    useEffect(() => {
        setIsBookmarked(isArticleBookmarked(articleId));
    }, [articleId]);

    const toggleBookmark = () => {
        const bookmarks = getBookmarkedArticles();

        if (isBookmarked) {
            // Remove bookmark
            const updated = bookmarks.filter((b) => b.id !== articleId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setIsBookmarked(false);
        } else {
            // Add bookmark
            const newBookmark: BookmarkedArticle = {
                id: articleId,
                title: articleTitle,
                savedAt: new Date().toISOString(),
            };
            const updated = [...bookmarks, newBookmark];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setIsBookmarked(true);

            // Show confirmation
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 2000);
        }

        onBookmarkChange?.(!isBookmarked);
    };

    if (variant === 'minimal') {
        return (
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleBookmark}
                className={cn(
                    'p-1 transition-colors',
                    isBookmarked
                        ? 'text-hampstead-black dark:text-white'
                        : 'text-hampstead-charcoal/40 dark:text-white/40 hover:text-hampstead-black dark:hover:text-white',
                    className
                )}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                aria-pressed={isBookmarked}
            >
                <motion.div
                    key={isBookmarked ? 'bookmarked' : 'not-bookmarked'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                    {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5 fill-current" />
                    ) : (
                        <Bookmark className="w-5 h-5" />
                    )}
                </motion.div>
            </motion.button>
        );
    }

    if (variant === 'icon') {
        return (
            <div className="relative">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleBookmark}
                    className={cn(
                        'p-2.5 rounded-full transition-all duration-200',
                        isBookmarked
                            ? 'bg-hampstead-black text-white dark:bg-white dark:text-hampstead-black'
                            : 'bg-hampstead-grey/50 dark:bg-white/10 text-hampstead-charcoal dark:text-white hover:bg-hampstead-black hover:text-white dark:hover:bg-white dark:hover:text-hampstead-black',
                        className
                    )}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                    aria-pressed={isBookmarked}
                >
                    <motion.div
                        key={isBookmarked ? 'bookmarked' : 'not-bookmarked'}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4" />
                        ) : (
                            <Bookmark className="w-4 h-4" />
                        )}
                    </motion.div>
                </motion.button>

                {/* Confirmation popup */}
                <AnimatePresence>
                    {showConfirmation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-hampstead-black dark:bg-white text-white dark:text-hampstead-black text-xs rounded-full whitespace-nowrap shadow-lg"
                        >
                            Saved!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Button variant
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={toggleBookmark}
            className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200',
                isBookmarked
                    ? 'bg-hampstead-black text-white border-hampstead-black dark:bg-white dark:text-hampstead-black dark:border-white'
                    : 'bg-transparent text-hampstead-black border-hampstead-grey hover:border-hampstead-black dark:text-white dark:border-white/20 dark:hover:border-white',
                className
            )}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            aria-pressed={isBookmarked}
        >
            <motion.div
                key={isBookmarked ? 'bookmarked' : 'not-bookmarked'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
                {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                ) : (
                    <Bookmark className="w-4 h-4" />
                )}
            </motion.div>
            <span className="text-sm font-medium">
                {isBookmarked ? 'Saved' : 'Save'}
            </span>
        </motion.button>
    );
}

/**
 * LikeButton - Heart/like button for articles
 */
interface LikeButtonProps {
    articleId: string;
    className?: string;
}

export function LikeButton({ articleId, className = '' }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 600);
        }
    };

    return (
        <div className="relative">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleLike}
                className={cn(
                    'p-2.5 rounded-full transition-all duration-200',
                    isLiked
                        ? 'text-red-500'
                        : 'text-hampstead-charcoal/40 dark:text-white/40 hover:text-red-500',
                    className
                )}
                aria-label={isLiked ? 'Unlike' : 'Like'}
                aria-pressed={isLiked}
            >
                <motion.div
                    animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                </motion.div>
            </motion.button>

            {/* Flying heart animation */}
            <AnimatePresence>
                {showHeart && (
                    <motion.div
                        initial={{ opacity: 1, scale: 0.5, y: 0 }}
                        animate={{ opacity: 0, scale: 1.5, y: -30 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default BookmarkButton;
