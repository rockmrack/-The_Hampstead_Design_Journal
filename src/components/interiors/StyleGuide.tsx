import React from 'react';
import Link from 'next/link';

const styles = [
  {
    title: 'Modern Georgian',
    description: 'Respecting heritage proportions while introducing contemporary minimalism.',
    color: 'bg-stone-100',
    slug: 'modern-georgian'
  },
  {
    title: 'Hampstead Arts & Crafts',
    description: 'Celebrating the handmade, natural materials, and the legacy of William Morris.',
    color: 'bg-amber-50',
    slug: 'arts-and-crafts'
  },
  {
    title: 'Mid-Century Modern',
    description: 'Clean lines and organic forms inspired by the Isokon Building heritage.',
    color: 'bg-orange-50',
    slug: 'mid-century'
  },
  {
    title: 'Eclectic Collector',
    description: 'Layered textures, antiques, and art for a home that tells a story.',
    color: 'bg-rose-50',
    slug: 'eclectic'
  }
];

export default function StyleGuide() {
  return (
    <section className="py-16 border-b border-hampstead-grey">
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
              Design Aesthetics
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-hampstead-black">
              Defining the NW3 Aesthetic
            </h2>
          </div>
          <Link href="/archive/styles" className="hidden md:block text-sm font-medium border-b border-hampstead-black pb-1 hover:text-hampstead-olive hover:border-hampstead-olive transition-colors">
            View All Styles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style) => (
            <div key={style.slug} className="group cursor-pointer">
              <div className={`aspect-[4/5] ${style.color} mb-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-hampstead-charcoal/20 font-serif text-6xl opacity-20">
                  {style.title.charAt(0)}
                </div>
              </div>
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-olive transition-colors">
                {style.title}
              </h3>
              <p className="text-sm text-hampstead-charcoal/70 leading-relaxed">
                {style.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
           <Link href="/archive/styles" className="text-sm font-medium border-b border-hampstead-black pb-1">
            View All Styles
          </Link>
        </div>
      </div>
    </section>
  );
}
