'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ExternalLink, Home } from 'lucide-react';
import Link from 'next/link';

interface BluePlaque {
  id: string;
  name: string;
  title: string;
  dates: string;
  address: string;
  coordinates: { lat: number; lng: number };
  architecturalNote: string;
  buildingStyle?: string;
  projectLink?: string;
}

const bluePlaques: BluePlaque[] = [
  {
    id: 'freud',
    name: 'Sigmund Freud',
    title: 'Founder of Psychoanalysis',
    dates: '1856-1939',
    address: '20 Maresfield Gardens, NW3',
    coordinates: { lat: 51.5493, lng: -0.1772 },
    architecturalNote: 'A classic Queen Anne Revival villa built in 1920. Note the distinctive red brick Dutch gables and the intricate brick porch with terracotta detailing—a feature we recently replicated for a client three doors down.',
    buildingStyle: 'Queen Anne Revival',
  },
  {
    id: 'keats',
    name: 'John Keats',
    title: 'Romantic Poet',
    dates: '1795-1821',
    address: "Keats' House, 10 Keats Grove, NW3",
    coordinates: { lat: 51.5553, lng: -0.1672 },
    architecturalNote: 'Built in 1814-16, this Regency villa features the characteristic stucco render and elegant proportions of the period. The original timber sash windows with their slender glazing bars are still intact—a rarity in Hampstead.',
    buildingStyle: 'Regency',
  },
  {
    id: 'constable',
    name: 'John Constable',
    title: 'Landscape Painter',
    dates: '1776-1837',
    address: '40 Well Walk, NW3',
    coordinates: { lat: 51.5583, lng: -0.1632 },
    architecturalNote: 'An early Georgian townhouse from circa 1720, featuring handmade red brick and original lime mortar pointing. The property retains its 6-over-6 sash windows with crown glass, though many on the street have been lost to replacement.',
    buildingStyle: 'Early Georgian',
  },
  {
    id: 'orwell',
    name: 'George Orwell',
    title: 'Author of 1984',
    dates: '1903-1950',
    address: '77 Parliament Hill, NW3',
    coordinates: { lat: 51.5553, lng: -0.1522 },
    architecturalNote: 'A substantial Victorian semi-detached villa from the 1870s. The yellow London stock brick with red brick dressings is typical of this era. Note the ornate carved stone lintels above the windows—a detail that defines the character of Parliament Hill.',
    buildingStyle: 'Victorian',
  },
  {
    id: 'hepworth',
    name: 'Barbara Hepworth',
    title: 'Sculptor',
    dates: '1903-1975',
    address: '7 Mall Studios, Tasker Road, NW3',
    coordinates: { lat: 51.5433, lng: -0.1802 },
    architecturalNote: 'One of the artist studios built in 1872 around a private garden. These buildings feature dramatic north-facing skylights for natural light—essential for artists. The original cast iron windows and industrial aesthetic have become highly desirable.',
    buildingStyle: 'Victorian Artists\' Studio',
  },
  {
    id: 'elgar',
    name: 'Edward Elgar',
    title: 'Composer',
    dates: '1857-1934',
    address: '42 Netherhall Gardens, NW3',
    coordinates: { lat: 51.5523, lng: -0.1842 },
    architecturalNote: 'An Arts & Crafts influenced house from 1895 with characteristic roughcast render over brick. The property features original leaded light windows and a distinctive half-timbered gable—hallmarks of the movement that define much of Hampstead\'s character.',
    buildingStyle: 'Arts & Crafts',
  },
];

interface BluePlaqueMapProps {
  className?: string;
}

const BluePlaqueMap: React.FC<BluePlaqueMapProps> = ({ className = '' }) => {
  const [selectedPlaque, setSelectedPlaque] = useState<BluePlaque | null>(null);
  const [hoveredPlaque, setHoveredPlaque] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Simplified map visualization (could be replaced with Leaflet/Mapbox)
  // Using a stylized representation of NW3

  const getMarkerPosition = (plaque: BluePlaque) => {
    // Normalize coordinates to map container (0-100%)
    // Hampstead area roughly: lat 51.54-51.56, lng -0.19 to -0.15
    const minLat = 51.542;
    const maxLat = 51.560;
    const minLng = -0.185;
    const maxLng = -0.150;

    const x = ((plaque.coordinates.lng - minLng) / (maxLng - minLng)) * 100;
    const y = (1 - (plaque.coordinates.lat - minLat) / (maxLat - minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map Header */}
      <div className="mb-6">
        <h3 className="font-serif text-2xl mb-2">The Literary Map of Hampstead</h3>
        <p className="text-hampstead-charcoal/70">
          Explore the blue plaques of NW3—and discover the architectural character of each historic residence.
        </p>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="relative aspect-[4/3] bg-hampstead-cream border-2 border-hampstead-grey overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26, 26, 26, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 26, 26, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        {/* Street Lines (Stylized) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main roads */}
          <path
            d="M 10 50 Q 30 45, 50 50 T 90 55"
            stroke="rgba(26, 26, 26, 0.15)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M 20 20 L 40 80"
            stroke="rgba(26, 26, 26, 0.15)"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M 60 15 L 70 85"
            stroke="rgba(26, 26, 26, 0.15)"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M 5 70 L 95 65"
            stroke="rgba(26, 26, 26, 0.15)"
            strokeWidth="0.6"
            fill="none"
          />
          {/* Heath representation */}
          <ellipse
            cx="75"
            cy="25"
            rx="20"
            ry="15"
            fill="rgba(34, 139, 34, 0.08)"
            stroke="rgba(34, 139, 34, 0.15)"
            strokeWidth="0.5"
          />
          <text x="75" y="25" textAnchor="middle" className="text-[3px] fill-green-800/30 uppercase tracking-widest">
            Hampstead Heath
          </text>
        </svg>

        {/* Area Labels */}
        <div className="absolute top-4 left-4 text-xs uppercase tracking-widest text-hampstead-charcoal/30 font-medium">
          Hampstead NW3
        </div>

        {/* Markers */}
        {bluePlaques.map((plaque) => {
          const pos = getMarkerPosition(plaque);
          const isSelected = selectedPlaque?.id === plaque.id;
          const isHovered = hoveredPlaque === plaque.id;

          return (
            <motion.button
              key={plaque.id}
              className="absolute z-10"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * bluePlaques.indexOf(plaque) }}
              onClick={() => setSelectedPlaque(plaque)}
              onMouseEnter={() => setHoveredPlaque(plaque.id)}
              onMouseLeave={() => setHoveredPlaque(null)}
            >
              <motion.div
                className={`
                  relative -translate-x-1/2 -translate-y-1/2
                  w-8 h-8 rounded-full flex items-center justify-center
                  transition-colors shadow-lg
                  ${isSelected || isHovered ? 'bg-hampstead-black' : 'bg-[#003399]'}
                `}
                animate={{ scale: isSelected || isHovered ? 1.2 : 1 }}
              >
                <MapPin className="w-4 h-4 text-white" />

                {/* Pulse effect */}
                {!isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#003399]"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Hover Label */}
              <AnimatePresence>
                {isHovered && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap bg-white px-3 py-1.5 shadow-lg text-sm font-medium z-20"
                  >
                    {plaque.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-3 text-xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#003399]" />
            <span>Blue Plaque Location</span>
          </div>
          <div className="text-hampstead-charcoal/50">
            Click a pin for architectural details
          </div>
        </div>
      </div>

      {/* Selected Plaque Detail Panel */}
      <AnimatePresence>
        {selectedPlaque && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 bg-white border border-hampstead-grey p-6 md:p-8"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-[#003399] text-white text-xs font-medium uppercase tracking-wide">
                    Blue Plaque
                  </span>
                  {selectedPlaque.buildingStyle && (
                    <span className="text-xs text-hampstead-charcoal/60 uppercase tracking-wide">
                      {selectedPlaque.buildingStyle}
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-2xl">{selectedPlaque.name}</h4>
                <p className="text-hampstead-charcoal/70">{selectedPlaque.title}</p>
                <p className="text-sm text-hampstead-charcoal/50">{selectedPlaque.dates}</p>
              </div>
              <button
                onClick={() => setSelectedPlaque(null)}
                className="p-2 hover:bg-hampstead-grey/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-start gap-2 mb-4 text-sm text-hampstead-charcoal/70">
              <Home className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{selectedPlaque.address}</span>
            </div>

            <div className="border-t border-hampstead-grey pt-4 mt-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3">
                The Builder&apos;s Analysis
              </h5>
              <p className="text-hampstead-charcoal leading-relaxed">
                {selectedPlaque.architecturalNote}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-hampstead-grey flex flex-wrap gap-4">
              <Link
                href="/journal/contact?subject=heritage-survey"
                className="inline-flex items-center gap-2 px-4 py-2 bg-hampstead-black text-white text-sm hover:bg-hampstead-charcoal transition-colors"
              >
                Book a Heritage Survey
                <ExternalLink className="w-4 h-4" />
              </Link>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedPlaque.coordinates.lat},${selectedPlaque.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-hampstead-black text-sm hover:bg-hampstead-grey/50 transition-colors"
              >
                View on Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BluePlaqueMap;
