'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

interface MouldingProfile {
  id: string;
  name: string;
  period: string;
  era: string;
  description: string;
  image: string;
  originalLocation: string;
  dimensions?: string;
  availability: 'in-stock' | 'cast-to-order' | 'research';
}

const profiles: MouldingProfile[] = [
  {
    id: 'frognal-cornice',
    name: 'The Frognal Profile',
    period: '1890-1905',
    era: 'Late Victorian',
    description: 'Heavy, floral, with deep projection. This ornate cornice features acanthus leaves and egg-and-dart moulding. Found throughout the original Frognal Estate houses.',
    image: '/images/archive/mouldings/frognal-cornice.svg',
    originalLocation: 'Frognal Lane drawing rooms',
    dimensions: '185mm drop × 210mm projection',
    availability: 'in-stock',
  },
  {
    id: 'redington-rose',
    name: 'The Redington Rose',
    period: '1895-1910',
    era: 'Arts & Crafts',
    description: 'A simpler ceiling rose reflecting Arts & Crafts principles. Geometric petal arrangement with subtle foliage border. Less ornate than Victorian predecessors.',
    image: '/images/archive/mouldings/redington-rose.svg',
    originalLocation: 'Redington Road reception rooms',
    dimensions: '450mm diameter',
    availability: 'cast-to-order',
  },
  {
    id: 'belsize-dado',
    name: 'The Belsize Dado',
    period: '1870-1885',
    era: 'High Victorian',
    description: 'Classic dado rail profile found throughout Belsize Park\'s stucco villas. The gentle ogee curve with bead detail is quintessentially Victorian.',
    image: '/images/archive/mouldings/belsize-dado.svg',
    originalLocation: 'Belsize Park hallways',
    dimensions: '75mm height × 25mm depth',
    availability: 'in-stock',
  },
  {
    id: 'garden-suburb-skirting',
    name: 'The Garden Suburb Skirting',
    period: '1907-1915',
    era: 'Edwardian',
    description: 'The distinctive tall skirting board of Hampstead Garden Suburb. Features a torus moulding above simple chamfered base, designed by Parker & Unwin.',
    image: '/images/archive/mouldings/suburb-skirting.svg',
    originalLocation: 'Hampstead Garden Suburb throughout',
    dimensions: '225mm height × 22mm thickness',
    availability: 'in-stock',
  },
  {
    id: 'bishops-cornice',
    name: 'The Bishops Avenue Cornice',
    period: '1925-1935',
    era: 'Inter-War',
    description: 'Art Deco influenced cornice with stepped geometric pattern. Found in the grand mansion houses of The Bishops Avenue during its golden era.',
    image: '/images/archive/mouldings/bishops-cornice.svg',
    originalLocation: 'The Bishops Avenue formal rooms',
    dimensions: '140mm drop × 165mm projection',
    availability: 'cast-to-order',
  },
  {
    id: 'well-walk-panel',
    name: 'The Well Walk Panel Mould',
    period: '1710-1730',
    era: 'Georgian',
    description: 'The earliest profile in our collection. Simple bolection mould for wall panelling from the spa-era houses of Well Walk.',
    image: '/images/archive/mouldings/well-walk-panel.svg',
    originalLocation: 'Well Walk historic properties',
    dimensions: '45mm width × 18mm depth',
    availability: 'research',
  },
];

const availabilityLabels = {
  'in-stock': { text: 'Mould in Stock', className: 'bg-green-800 text-white' },
  'cast-to-order': { text: 'Cast to Order', className: 'bg-amber-700 text-white' },
  'research': { text: 'Research Archive', className: 'bg-hampstead-charcoal text-white' },
};

interface LostDetailsLibraryProps {
  className?: string;
  limit?: number;
}

const LostDetailsLibrary: React.FC<LostDetailsLibraryProps> = ({ className = '', limit }) => {
  const displayedProfiles = limit ? profiles.slice(0, limit) : profiles;

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3 block">
          The Lost Details Library
        </span>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">Original NW3 Profiles</h3>
        <p className="text-lg text-hampstead-charcoal/70 max-w-2xl">
          Over the last 100 years, many Hampstead homes lost their original cornicing and 
          ceiling roses to unfortunate 1970s renovations. We have taken moulds of the originals.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors"
          >
            {/* Profile Illustration */}
            <div className="aspect-[4/3] bg-hampstead-cream border-b border-hampstead-grey p-8 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder SVG - In production, use actual moulding profile images */}
              <div className="w-full h-full flex items-center justify-center">
                <svg 
                  viewBox="0 0 200 60" 
                  className="w-full max-w-[180px] h-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  {/* Generic moulding profile shape */}
                  <path 
                    d="M 0 60 L 0 50 Q 10 50, 15 45 Q 20 40, 20 35 L 20 30 Q 20 25, 25 22 Q 30 20, 35 20 L 165 20 Q 170 20, 175 22 Q 180 25, 180 30 L 180 35 Q 180 40, 185 45 Q 190 50, 200 50 L 200 60 Z"
                    fill="rgba(26, 26, 26, 0.05)"
                    stroke="rgba(26, 26, 26, 0.3)"
                  />
                  {/* Detail lines */}
                  <path d="M 30 25 L 170 25" strokeDasharray="3 3" opacity="0.3" />
                  <path d="M 25 35 L 175 35" strokeDasharray="3 3" opacity="0.3" />
                </svg>
              </div>

              {/* Era Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 text-xs font-medium ${availabilityLabels[profile.availability].className}`}>
                  {availabilityLabels[profile.availability].text}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-hampstead-charcoal/50 mb-2">
                <Calendar className="w-3 h-3" />
                <span>{profile.era}</span>
                <span>•</span>
                <span>{profile.period}</span>
              </div>

              <h4 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                {profile.name}
              </h4>

              <p className="text-sm text-hampstead-charcoal/70 leading-relaxed mb-4">
                {profile.description}
              </p>

              <div className="text-xs text-hampstead-charcoal/50 space-y-1">
                <p><strong>Origin:</strong> {profile.originalLocation}</p>
                {profile.dimensions && (
                  <p><strong>Dimensions:</strong> {profile.dimensions}</p>
                )}
              </div>

              {profile.availability !== 'research' && (
                <Link
                  href={`/contact?subject=moulding-enquiry&profile=${profile.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:text-hampstead-charcoal/70 transition-colors"
                >
                  Enquire about this profile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      {limit && profiles.length > limit && (
        <div className="mt-8 text-center">
          <Link
            href="/archive/lost-details"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
          >
            View Full Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Restoration CTA */}
      <div className="mt-12 bg-hampstead-cream border border-hampstead-grey p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h4 className="font-serif text-2xl md:text-3xl mb-4">
            Restore Your Heritage Details
          </h4>
          <p className="text-hampstead-charcoal/70 mb-6">
            We can cast and reinstall these exact heritage profiles in your home. 
            Each piece is hand-finished by craftsmen who understand the weight and 
            proportion of original Victorian and Edwardian plasterwork.
          </p>
          <Link
            href="/contact?subject=heritage-restoration"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
          >
            Book a Heritage Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LostDetailsLibrary;
