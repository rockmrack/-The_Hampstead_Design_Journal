'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useScroll } from 'framer-motion';

interface ReadingProgressProps {
  showPercentage?: boolean;
}

export default function ReadingProgress({ showPercentage = false }: ReadingProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling past initial content
      setIsVisible(window.scrollY > 150);
    };

    const unsubscribe = scrollYProgress.on('change', (latest: number) => {
      setPercentage(Math.round(latest * 100));
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, [scrollYProgress]);

  if (!isVisible) return null;

  return (
    <>
      {/* Premium gradient progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Optional percentage indicator */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 px-3 py-1.5 bg-hampstead-black/90 text-white text-xs font-mono rounded-full backdrop-blur-sm z-[101]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {percentage}%
        </motion.div>
      )}
    </>
  );
}
