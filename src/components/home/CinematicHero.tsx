'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_STORIES = [
  {
    id: 1,
    title: "The Renaissance of Redington Road",
    subtitle: "Architecture",
    excerpt: "How a new generation of architects is reimagining Hampstead's most prestigious Arts & Crafts enclave while strictly adhering to conservation guidelines.",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop",
    link: "/archive/redington-road",
    readTime: "8 min read",
    issue: "Winter 2024"
  },
  {
    id: 2,
    title: "Modernist Secrets of Belsize Park",
    subtitle: "Heritage",
    excerpt: "Uncovering the forgotten Isokon experiments and the radical concrete structures that changed North London living forever.",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065&auto=format&fit=crop",
    link: "/articles/modernist-secrets",
    readTime: "6 min read",
    issue: "Winter 2024"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Victorian Tile Restoration",
    subtitle: "Interiors",
    excerpt: "From Minton to encaustic: a masterclass in preserving the geometric soul of your hallway.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    link: "/articles/victorian-tile-restoration",
    readTime: "12 min read",
    issue: "Winter 2024"
  }
];

const CinematicHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_STORIES.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_STORIES.length) % HERO_STORIES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 1.25;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, goToNext]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-hampstead-black text-hampstead-cream">
      {/* Background Images with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_STORIES[currentIndex].image}
              alt={HERO_STORIES[currentIndex].title}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </motion.div>
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent z-10" />
      <div className="absolute top-1/2 left-0 w-px h-32 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block ml-8" />

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="editorial-container w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 xl:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Issue Badge */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <span className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/60">
                      <span className="w-8 h-px bg-white/40" />
                      {HERO_STORIES[currentIndex].issue}
                    </span>
                  </motion.div>

                  {/* Category & Reading Time */}
                  <div className="flex items-center gap-6 mb-6">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-xs uppercase tracking-[0.2em] border border-white/20">
                      {HERO_STORIES[currentIndex].subtitle}
                    </span>
                    <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                      <Clock className="w-3.5 h-3.5" />
                      {HERO_STORIES[currentIndex].readTime}
                    </span>
                  </div>
                  
                  {/* Title with staggered animation */}
                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-8 tracking-tight">
                    {HERO_STORIES[currentIndex].title.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="inline-block mr-[0.25em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed font-light"
                  >
                    {HERO_STORIES[currentIndex].excerpt}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <Link 
                      href={HERO_STORIES[currentIndex].link}
                      className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-hampstead-black text-sm uppercase tracking-widest font-medium hover:bg-hampstead-cream transition-all duration-300"
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Story Previews - Desktop Only */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-end">
              <div className="flex flex-col gap-4 w-80">
                {HERO_STORIES.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                    className={`group text-left p-4 transition-all duration-500 border ${
                      idx === currentIndex 
                        ? 'bg-white/10 border-white/30 backdrop-blur-sm' 
                        : 'bg-transparent border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1 block">
                      {story.subtitle}
                    </span>
                    <span className={`font-serif text-base leading-tight transition-colors ${
                      idx === currentIndex ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                    }`}>
                      {story.title}
                    </span>
                    {idx === currentIndex && (
                      <div className="mt-3 h-0.5 bg-white/20 overflow-hidden">
                        <motion.div 
                          className="h-full bg-white"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="editorial-container py-8">
          <div className="flex items-center justify-between">
            {/* Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button 
                onClick={goToPrev}
                className="w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:bg-white hover:text-black transition-all"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={goToNext}
                className="w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:bg-white hover:text-black transition-all"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:bg-white hover:text-black transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            {/* Progress Dots - Mobile */}
            <div className="flex lg:hidden items-center gap-2">
              {HERO_STORIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-white w-6' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="hidden md:flex items-center gap-4 text-sm text-white/60">
              <span className="font-mono">
                {String(currentIndex + 1).padStart(2, '0')} / {String(HERO_STORIES.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
