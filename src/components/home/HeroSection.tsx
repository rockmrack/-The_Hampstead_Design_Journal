'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1600&fit=crop', // Classic London facade
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1600&fit=crop', // Period living room
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-hampstead-cream">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content - Spans 7 columns */}
          <div className="lg:col-span-7 pt-12 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="h-[1px] w-12 bg-hampstead-charcoal/30"></span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-hampstead-charcoal/60">
                  Est. 2009 • North West London
                </span>
              </div>
              
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 text-hampstead-black leading-[0.9] tracking-tight">
                The <br />
                <span className="italic font-light text-hampstead-charcoal/90">Hampstead</span> <br />
                Journal
              </h1>
              
              <p className="text-xl md:text-2xl text-hampstead-charcoal/70 leading-relaxed mb-12 max-w-xl font-light border-l-2 border-hampstead-charcoal/10 pl-6">
                Curating the finest in heritage architecture, interior design, and modern living in London&apos;s most historic village.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Link 
                  href="/articles" 
                  className="group inline-flex items-center px-10 py-5 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-all duration-300 shadow-xl shadow-hampstead-black/5"
                >
                  <span className="uppercase tracking-widest text-sm font-medium">Read the Journal</span>
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/about" 
                  className="group inline-flex items-center px-10 py-5 border border-hampstead-black/10 text-hampstead-black hover:border-hampstead-black transition-all duration-300"
                >
                  <span className="uppercase tracking-widest text-sm">Our Philosophy</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Image Content - Spans 5 columns */}
          <div className="lg:col-span-5 relative hidden lg:block h-[80vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full"
            >
              <div className="absolute inset-0 bg-hampstead-charcoal/5 transform translate-x-4 translate-y-4 z-0" />
              <div className="relative h-full w-full overflow-hidden z-10 shadow-2xl shadow-hampstead-black/10">
                <Image
                  src={HERO_IMAGES[0]}
                  alt="Hampstead Architecture"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 z-20 bg-white p-6 shadow-xl max-w-[200px]">
                <p className="font-serif text-2xl italic leading-none mb-2">&quot;Timeless&quot;</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Architecture & Design</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
