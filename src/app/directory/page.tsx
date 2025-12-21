'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Hammer, PenTool, HardHat, Ruler, Paintbrush } from 'lucide-react';

const categories = [
  {
    title: 'Architects',
    description: 'Visionary practices specializing in heritage restoration and contemporary extensions.',
    icon: Ruler,
    href: '/directory/professionals?category=architects',
    image: '/images/directory-architects.jpg'
  },
  {
    title: 'Interior Designers',
    description: 'Curators of exceptional spaces, from classic English style to modern minimalism.',
    icon: Paintbrush,
    href: '/directory/professionals?category=interior-designers',
    image: '/images/directory-interiors.jpg'
  },
  {
    title: 'Builders & Contractors',
    description: 'Trusted firms with proven track records in high-value residential projects.',
    icon: HardHat,
    href: '/directory/professionals?category=builders',
    image: '/images/directory-builders.jpg'
  },
  {
    title: 'Specialist Craftsmen',
    description: 'Master artisans in joinery, stonemasonry, plasterwork, and metalwork.',
    icon: Hammer,
    href: '/directory/professionals?category=craftsmen',
    image: '/images/directory-craftsmen.jpg'
  },
  {
    title: 'Suppliers',
    description: 'Source the finest materials, fixtures, and fittings for your project.',
    icon: PenTool,
    href: '/suppliers',
    image: '/images/directory-suppliers.jpg'
  }
];

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream">
      {/* Hero */}
      <section className="bg-hampstead-black text-white py-20 md:py-32">
        <div className="editorial-container">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8">The Directory</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
            The definitive guide to the finest design professionals and suppliers in North West London. 
            Curated for excellence, reliability, and craftsmanship.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="editorial-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.title} 
              href={category.href}
              className="group block bg-white border border-hampstead-grey hover:border-hampstead-black transition-colors overflow-hidden"
            >
              <div className="aspect-[4/3] bg-hampstead-grey/20 relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-hampstead-charcoal/20">
                  <category.icon className="w-16 h-16" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl mb-3 group-hover:underline decoration-1 underline-offset-4">
                  {category.title}
                </h3>
                <p className="text-hampstead-charcoal/80 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-sm uppercase tracking-widest font-medium group-hover:translate-x-2 transition-transform">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-white border-t border-hampstead-grey py-20">
        <div className="editorial-container text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Are you a design professional?</h2>
          <p className="text-lg text-hampstead-charcoal/80 max-w-2xl mx-auto mb-10">
            Apply to join our curated directory of trusted partners. We review every application to ensure the highest standards.
          </p>
          <Link 
            href="/contact?subject=Directory%20Application" 
            className="inline-block bg-hampstead-black text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-hampstead-charcoal transition-colors"
          >
            Apply for Membership
          </Link>
        </div>
      </section>
    </div>
  );
}
