'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
    /**
     * Show a blur placeholder while loading
     */
    showBlur?: boolean;
    /**
     * Custom skeleton component while loading
     */
    skeleton?: React.ReactNode;
    /**
     * Aspect ratio for the container (e.g., '16/9', '4/3', '1/1')
     */
    aspectRatio?: string;
    /**
     * Fade-in animation duration in seconds
     */
    fadeDuration?: number;
    /**
     * Container className
     */
    containerClassName?: string;
}

/**
 * OptimizedImage - Enhanced Next.js Image with smooth loading transitions
 */
export function OptimizedImage({
    src,
    alt,
    className,
    containerClassName,
    showBlur = true,
    skeleton,
    aspectRatio,
    fadeDuration = 0.5,
    ...props
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setError(true);
        setIsLoading(false);
    };

    return (
        <div
            className={cn(
                'relative overflow-hidden bg-hampstead-grey/30 dark:bg-white/5',
                aspectRatio && `aspect-[${aspectRatio}]`,
                containerClassName
            )}
            style={aspectRatio ? { aspectRatio } : undefined}
        >
            {/* Skeleton/Placeholder */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: fadeDuration / 2 }}
                        className="absolute inset-0 z-10"
                    >
                        {skeleton || (
                            <div className="absolute inset-0 bg-gradient-to-r from-hampstead-grey/30 via-hampstead-grey/50 to-hampstead-grey/30 dark:from-white/5 dark:via-white/10 dark:to-white/5 animate-shimmer bg-[length:200%_100%]" />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error State */}
            {error ? (
                <div className="absolute inset-0 flex items-center justify-center bg-hampstead-grey/20 dark:bg-white/5">
                    <div className="text-center text-hampstead-charcoal/50 dark:text-white/30">
                        <svg
                            className="w-12 h-12 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-xs">Image unavailable</span>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    transition={{ duration: fadeDuration }}
                    className="h-full w-full"
                >
                    <Image
                        src={src}
                        alt={alt}
                        className={cn(
                            'transition-all duration-300',
                            showBlur && isLoading && 'blur-sm scale-105',
                            className
                        )}
                        onLoad={handleLoad}
                        onError={handleError}
                        {...props}
                    />
                </motion.div>
            )}
        </div>
    );
}

/**
 * ImageWithZoom - Image that zooms on hover
 */
interface ImageWithZoomProps extends OptimizedImageProps {
    zoomScale?: number;
}

export function ImageWithZoom({
    zoomScale = 1.05,
    className,
    containerClassName,
    ...props
}: ImageWithZoomProps) {
    return (
        <div className={cn('overflow-hidden', containerClassName)}>
            <OptimizedImage
                {...props}
                containerClassName="transition-transform duration-500 ease-out hover:scale-[1.05]"
                className={className}
                style={{ transform: `scale(1)` }}
            />
        </div>
    );
}

/**
 * BlurImage - Image with premium blur-up loading effect
 */
export function BlurImage(props: OptimizedImageProps) {
    return (
        <OptimizedImage
            {...props}
            showBlur={true}
            fadeDuration={0.6}
        />
    );
}

export default OptimizedImage;
