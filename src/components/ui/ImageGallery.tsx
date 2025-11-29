'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Share2,
  Maximize2,
  Grid3X3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  category?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  aspectRatio?: 'square' | '4:3' | '16:9' | 'auto';
  enableLightbox?: boolean;
  enableZoom?: boolean;
  enableDownload?: boolean;
  enableShare?: boolean;
  showCaptions?: boolean;
  lazyLoad?: boolean;
}

export default function ImageGallery({
  images,
  className,
  columns = 3,
  gap = 'md',
  aspectRatio = '4:3',
  enableLightbox = true,
  enableZoom = true,
  enableDownload = false,
  enableShare = true,
  showCaptions = true,
  lazyLoad = true,
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isGridView, setIsGridView] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  const aspectClasses = {
    'square': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    'auto': '',
  };

  const openLightbox = (index: number) => {
    if (!enableLightbox) return;
    setCurrentIndex(index);
    setLightboxOpen(true);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = '';
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoomLevel(1);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoomLevel(1);
  }, [images.length]);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel((prev) => {
      if (direction === 'in') return Math.min(prev + 0.5, 3);
      return Math.max(prev - 0.5, 1);
    });
  };

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.alt,
          text: image.caption || '',
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownload = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = image.alt.replace(/\s+/g, '-').toLowerCase() + '.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Handle error
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'Escape':
          closeLightbox();
          break;
        case '+':
        case '=':
          handleZoom('in');
          break;
        case '-':
          handleZoom('out');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToNext, goToPrev]);

  // Touch gestures
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  const currentImage = images[currentIndex];

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={cn(
          'grid',
          columnClasses[columns],
          gapClasses[gap],
          className
        )}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
          >
            <button
              onClick={() => openLightbox(index)}
              className={cn(
                'relative overflow-hidden rounded-lg w-full bg-hampstead-grey/20',
                aspectClasses[aspectRatio],
                enableLightbox && 'cursor-zoom-in'
              )}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${100 / columns}vw`}
                loading={lazyLoad ? 'lazy' : 'eager'}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>

            {/* Caption */}
            {showCaptions && image.caption && (
              <p className="mt-2 text-sm text-hampstead-charcoal/70 line-clamp-2">
                {image.caption}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white">
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/70">
                  {currentIndex + 1} / {images.length}
                </span>
                {currentImage.category && (
                  <span className="text-xs uppercase tracking-wider bg-white/20 px-2 py-1 rounded">
                    {currentImage.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {enableZoom && (
                  <>
                    <button
                      onClick={() => handleZoom('out')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                      disabled={zoomLevel <= 1}
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleZoom('in')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                      disabled={zoomLevel >= 3}
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => setIsGridView(!isGridView)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Toggle grid view"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>

                {enableShare && (
                  <button
                    onClick={() => handleShare(currentImage)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Share image"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                )}

                {enableDownload && (
                  <button
                    onClick={() => handleDownload(currentImage)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Download image"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={closeLightbox}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main content */}
            {isGridView ? (
              /* Grid view */
              <div className="flex-1 overflow-auto p-4">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={image.src}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsGridView(false);
                      }}
                      className={cn(
                        'relative aspect-square rounded overflow-hidden',
                        index === currentIndex && 'ring-2 ring-white'
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Single image view */
              <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                {/* Navigation buttons */}
                <button
                  onClick={goToPrev}
                  className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Image */}
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative max-w-full max-h-full"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={currentImage.width}
                    height={currentImage.height}
                    className="max-h-[80vh] w-auto object-contain"
                    priority
                  />
                </motion.div>
              </div>
            )}

            {/* Footer with caption */}
            {!isGridView && (currentImage.caption || currentImage.credit) && (
              <div className="p-4 text-center text-white">
                {currentImage.caption && (
                  <p className="text-sm mb-1">{currentImage.caption}</p>
                )}
                {currentImage.credit && (
                  <p className="text-xs text-white/60">Photo: {currentImage.credit}</p>
                )}
              </div>
            )}

            {/* Thumbnail strip */}
            {!isGridView && images.length > 1 && (
              <div className="flex justify-center gap-1 p-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'relative w-16 h-16 rounded overflow-hidden flex-shrink-0 transition-all',
                      index === currentIndex
                        ? 'ring-2 ring-white'
                        : 'opacity-50 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
