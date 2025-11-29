'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView as useFramerInView } from 'framer-motion';

// ============================================================================
// Intersection Observer Animation Hook
// ============================================================================

interface UseAnimateOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useAnimateOnScroll = (options: UseAnimateOnScrollOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
};

// ============================================================================
// Animation Variants
// ============================================================================

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInFromBottom = {
  hidden: { y: '100%' },
  visible: { y: 0 },
};

export const slideInFromTop = {
  hidden: { y: '-100%' },
  visible: { y: 0 },
};

export const slideInFromLeft = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

export const slideInFromRight = {
  hidden: { x: '100%' },
  visible: { x: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

// ============================================================================
// Animated Components
// ============================================================================

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useFramerInView(ref, { once, amount: threshold });

  const variants = {
    fadeIn,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    scaleIn,
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

interface StaggeredListProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}) => {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useFramerInView(ref, { once, amount: 0.1 });

  return (
    <motion.ul
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
    </motion.ul>
  );
};

interface StaggeredItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggeredItem: React.FC<StaggeredItemProps> = ({ children, className }) => {
  return (
    <motion.li variants={staggerItem} className={className}>
      {children}
    </motion.li>
  );
};

// ============================================================================
// Page Transitions
// ============================================================================

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const PageTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
};

// ============================================================================
// Animated Text
// ============================================================================

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'word' | 'character';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  duration = 0.05,
  type = 'word',
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.5 });

  const items = type === 'word' ? text.split(' ') : text.split('');

  return (
    <motion.p ref={ref} className={className} aria-label={text}>
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.3,
            delay: delay + index * duration,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: 'inline-block', marginRight: type === 'word' ? '0.25em' : undefined }}
        >
          {item}
        </motion.span>
      ))}
    </motion.p>
  );
};

// ============================================================================
// Animated Counter
// ============================================================================

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  className,
  prefix = '',
  suffix = '',
  formatter = (value) => Math.round(value).toLocaleString(),
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(updateCount);
        return;
      }

      if (now >= endTime) {
        setCount(to);
        return;
      }

      const progress = (now - startTime) / (duration * 1000);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const currentValue = from + (to - from) * easedProgress;
      
      setCount(currentValue);
      requestAnimationFrame(updateCount);
    };

    requestAnimationFrame(updateCount);
  }, [isInView, from, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatter(count)}{suffix}
    </span>
  );
};

// ============================================================================
// Parallax Effect
// ============================================================================

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.5, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      // Calculate parallax offset
      const yOffset = (scrolled - elementTop + windowHeight) * speed;
      setOffset(yOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ''}`}>
      <div style={{ transform: `translateY(${offset}px)` }}>
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// Hover Effects
// ============================================================================

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

export const HoverScale: React.FC<HoverScaleProps> = ({ children, scale = 1.05, className }) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface HoverLiftProps {
  children: React.ReactNode;
  y?: number;
  className?: string;
}

export const HoverLift: React.FC<HoverLiftProps> = ({ children, y = -8, className }) => {
  return (
    <motion.div
      whileHover={{ y, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// Loading Animations
// ============================================================================

interface PulseProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Pulse: React.FC<PulseProps> = ({ className, size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`rounded-full bg-hampstead-green ${sizes[size]} ${className || ''}`}
    />
  );
};

interface BouncingDotsProps {
  className?: string;
}

export const BouncingDots: React.FC<BouncingDotsProps> = ({ className }) => {
  return (
    <div className={`flex space-x-1 ${className || ''}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
          className="h-2 w-2 rounded-full bg-hampstead-green"
        />
      ))}
    </div>
  );
};

// ============================================================================
// Scroll Progress Indicator
// ============================================================================

export const ScrollProgress: React.FC<{ className?: string }> = ({ className }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / totalHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 h-1 bg-hampstead-green z-50 ${className || ''}`}
      style={{ width: `${progress}%` }}
    />
  );
};

// ============================================================================
// Reveal on Scroll
// ============================================================================

interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.3 });

  const directionVariants = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionVariants[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionVariants[direction] }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
