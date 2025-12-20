'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const HERO_STORIES = [
  {
    id: 1,
    title: "The Renaissance of Redington Road",
    subtitle: "Architecture",
    excerpt: "How a new generation of architects is reimagining Hampstead's most prestigious Arts & Crafts enclave while strictly adhering to conservation guidelines.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    link: "/archive/redington-road",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Modernist Secrets of Belsize Park",
    subtitle: "Heritage",
    excerpt: "Uncovering the forgotten Isokon experiments and the radical concrete structures that changed North London living forever.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    link: "/articles/modernist-secrets",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Victorian Tile Restoration",
    subtitle: "Interiors",
    excerpt: "From Minton to encaustic: a masterclass in preserving the geometric soul of your hallway.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    link: "/articles/victorian-tile-restoration",
    readTime: "12 min read"
  }
];

const CinematicHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_STORIES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-hampstead-black text-hampstead-cream">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_STORIES[currentIndex].image}
            alt={HERO_STORIES[currentIndex].title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32">
        <div className="editorial-container">
          <div className="max-w-4xl">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 border border-white/30 text-xs uppercase tracking-[0.2em] backdrop-blur-sm">
                  {HERO_STORIES[currentIndex].subtitle}
                </span>
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
                  <Clock className="w-3 h-3" />
                  {HERO_STORIES[currentIndex].readTime}
                </span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 tracking-tight">
                {HERO_STORIES[currentIndex].title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-light">
                {HERO_STORIES[currentIndex].excerpt}
              </p>

              <Link 
                href={HERO_STORIES[currentIndex].link}
                className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest border-b border-white pb-2 hover:text-white/80 hover:border-white/80 transition-all"
              >
                Read Full Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-0 right-0">
        <div className="editorial-container flex gap-4">
          {HERO_STORIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="group relative h-1 flex-1 bg-white/20 overflow-hidden rounded-full transition-all hover:h-2"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div 
                className={`absolute inset-0 bg-white transition-all duration-[8000ms] ease-linear ${
                  idx === currentIndex ? 'w-full' : 'w-0'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
