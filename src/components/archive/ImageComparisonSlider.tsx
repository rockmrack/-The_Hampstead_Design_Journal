'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeYear?: string;
  afterYear?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
  className?: string;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Then',
  afterLabel = 'Now',
  beforeYear,
  afterYear,
  aspectRatio = 'video',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectRatioClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  };

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={`relative ${className}`}>
      {/* Caption */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-hampstead-charcoal/30 rounded-full" />
          <span className="text-sm font-medium uppercase tracking-wide text-hampstead-charcoal">
            {beforeLabel} {beforeYear && <span className="text-hampstead-charcoal/60">({beforeYear})</span>}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium uppercase tracking-wide text-hampstead-charcoal">
            {afterLabel} {afterYear && <span className="text-hampstead-charcoal/60">({afterYear})</span>}
          </span>
          <span className="w-3 h-3 bg-hampstead-black rounded-full" />
        </div>
      </div>

      {/* Slider Container */}
      <div
        ref={containerRef}
        className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden cursor-ew-resize select-none bg-hampstead-grey border border-hampstead-grey`}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* After Image (Background - Full) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={`${afterLabel} - ${afterYear || 'Present'}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
          {/* Subtle color overlay for modern photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={`${beforeLabel} - ${beforeYear || 'Historical'}`}
            fill
            className="object-cover grayscale sepia-[0.2]"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
          {/* Vintage photo overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent mix-blend-multiply" />
        </div>

        {/* Slider Handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          animate={{ scale: isDragging ? 1.1 : 1 }}
        >
          {/* Handle Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-hampstead-black/10">
            <div className="flex items-center gap-1">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-hampstead-charcoal">
                <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-hampstead-charcoal">
                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Year Labels on Handle */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="px-2 py-1 bg-hampstead-black text-white text-xs font-medium rounded">
              Drag to compare
            </span>
          </div>
        </motion.div>

        {/* Corner Labels */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-sm font-medium">
          {beforeYear || beforeLabel}
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-hampstead-black text-white text-sm font-medium">
          {afterYear || afterLabel}
        </div>
      </div>

      {/* Instructions */}
      <p className="mt-3 text-center text-sm text-hampstead-charcoal/60">
        Drag the slider to see how this location has changed over time
      </p>
    </div>
  );
};

export default ImageComparisonSlider;
