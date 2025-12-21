'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const items = [
  {
    title: "Unlacquered Brass",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600&h=800"
  },
  {
    title: "Calacatta Viola",
    category: "Stone",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=600&h=800"
  },
  {
    title: "Reclaimed Oak",
    category: "Flooring",
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=600&h=800"
  },
  {
    title: "Belgian Linen",
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?auto=format&fit=crop&q=80&w=600&h=800"
  }
];

export default function CuratedCollection() {
  return (
    <section className="py-24 border-b border-hampstead-grey overflow-hidden">
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-hampstead-charcoal/50 block mb-4">
              The Material Edit
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-hampstead-black">
              Essential Elements
            </h2>
          </div>
          <Link 
            href="/categories/interiors-materials" 
            className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-medium hover:text-hampstead-charcoal/60 transition-colors mt-6 md:mt-0"
          >
            View All Materials
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-hampstead-grey/20 relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-hampstead-charcoal/5 group-hover:bg-transparent transition-colors duration-500" />
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 border border-hampstead-black/0 group-hover:border-hampstead-black/10 transition-colors duration-500" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-hampstead-charcoal/50 block mb-1">
                {item.category}
              </span>
              <h3 className="font-serif text-xl group-hover:text-hampstead-charcoal/70 transition-colors">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
          <Link 
            href="/categories/interiors-materials" 
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-medium"
          >
            View All Materials
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
