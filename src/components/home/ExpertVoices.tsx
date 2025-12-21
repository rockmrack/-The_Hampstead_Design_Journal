'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const experts = [
  {
    name: "Sarah Miller",
    role: "Conservation Architect",
    quote: "The challenge in Hampstead isn't just preservation, it's about making these Victorian spaces breathe for modern life without losing their soul.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "James Sterling",
    role: "Property Analyst",
    quote: "We're seeing a shift away from open-plan basements towards more segmented, purposeful spaces. The 'broken-plan' layout is the new standard in NW3.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Elena Rossi",
    role: "Interior Designer",
    quote: "Texture is replacing colour as the primary driver of luxury. Limewash, tadelakt, and raw linens are defining the Hampstead aesthetic for 2025.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export default function ExpertVoices() {
  return (
    <section className="py-24 bg-hampstead-cream border-y border-hampstead-grey">
      <div className="editorial-container">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-hampstead-charcoal/50 block mb-4">
            Perspectives
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-hampstead-black">
            Voices of the Village
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {experts.map((expert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-hampstead-charcoal/10 relative z-10">
                  <Image 
                    src={expert.image} 
                    alt={expert.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full border border-hampstead-grey z-20">
                  <Quote className="w-3 h-3 text-hampstead-charcoal/60" />
                </div>
              </div>
              
              <blockquote className="font-serif text-xl leading-relaxed text-hampstead-charcoal/80 mb-6 italic">
                &ldquo;{expert.quote}&rdquo;
              </blockquote>
              
              <div>
                <cite className="not-italic font-medium text-hampstead-black block tracking-wide">
                  {expert.name}
                </cite>
                <span className="text-xs uppercase tracking-widest text-hampstead-charcoal/50 mt-1 block">
                  {expert.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
