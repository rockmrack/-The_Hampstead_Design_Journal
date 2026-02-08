'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-hampstead-cream">
      {/* Background Pattern/Texture could go here */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none" />

      <div className="editorial-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-hampstead-charcoal/30 rounded-full text-xs uppercase tracking-widest mb-8 text-hampstead-charcoal/60">
              Est. 2009 • North West London
            </span>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 text-balance leading-[1.1]">
              The Hampstead <br />
              <span className="italic text-hampstead-charcoal/80">Design Journal</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-hampstead-charcoal/80 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
              The authoritative voice on heritage restoration, planning policy, and design excellence in NW3.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/journal/articles" 
                className="group inline-flex items-center px-8 py-4 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-all duration-300"
              >
                <span className="uppercase tracking-widest text-sm">Read the Journal</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/journal/about" 
                className="group inline-flex items-center px-8 py-4 border border-hampstead-black text-hampstead-black hover:bg-hampstead-black hover:text-hampstead-white transition-all duration-300"
              >
                <span className="uppercase tracking-widest text-sm">Our Philosophy</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-hampstead-black/0 via-hampstead-black/20 to-hampstead-black/0" />
      </motion.div>
    </section>
  );
}
