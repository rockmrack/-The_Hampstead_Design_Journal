'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, MapPin, Star, CheckCircle } from 'lucide-react';

const professionals = [
  {
    id: 1,
    name: 'Studio Hampstead',
    category: 'Architects',
    location: 'Hampstead Village',
    description: 'Award-winning practice specializing in Grade II listed renovations and contemporary extensions.',
    tags: ['Heritage', 'Residential', 'Sustainable'],
    verified: true,
  },
  {
    id: 2,
    name: 'Belsize Interiors',
    category: 'Interior Designers',
    location: 'Belsize Park',
    description: 'Creating timeless, elegant interiors that blend classic English style with modern comfort.',
    tags: ['Luxury', 'Bespoke Furniture', 'Project Management'],
    verified: true,
  },
  {
    id: 3,
    name: 'NW3 Construction',
    category: 'Builders',
    location: 'West Hampstead',
    description: 'High-end residential contractors with 20 years of experience in North West London.',
    tags: ['Basements', 'Refurbishment', 'New Build'],
    verified: false,
  },
  {
    id: 4,
    name: 'Heritage Joinery Co.',
    category: 'Craftsmen',
    location: 'Kentish Town',
    description: 'Master joiners specializing in sash windows, staircases, and bespoke cabinetry.',
    tags: ['Joinery', 'Restoration', 'Bespoke'],
    verified: true,
  },
];

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPros = professionals.filter(pro => {
    const matchesSearch = pro.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pro.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pro.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-hampstead-cream">
      <div className="editorial-container py-12 md:py-20">
        <Link 
          href="/journal/directory" 
          className="inline-flex items-center text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Link>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Find a Professional</h1>
          <p className="text-xl text-hampstead-charcoal/80 max-w-2xl leading-relaxed">
            Connect with the best architects, designers, and builders in the area.
          </p>
        </header>

        {/* Search and Filter */}
        <div className="bg-white p-6 border border-hampstead-grey mb-12 sticky top-4 z-10 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/40" />
              <input 
                type="text" 
                placeholder="Search by name or keyword..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-hampstead-cream border-none focus:ring-1 focus:ring-hampstead-black"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-64 p-3 bg-hampstead-cream border-none focus:ring-1 focus:ring-hampstead-black"
            >
              <option value="All">All Categories</option>
              <option value="Architects">Architects</option>
              <option value="Interior Designers">Interior Designers</option>
              <option value="Builders">Builders</option>
              <option value="Craftsmen">Craftsmen</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPros.map((pro) => (
            <div key={pro.id} className="bg-white p-8 border border-hampstead-grey hover:border-hampstead-black transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-hampstead-charcoal/60">
                  {pro.category}
                </span>
                {pro.verified && (
                  <div className="flex items-center text-green-700 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                )}
              </div>
              <h3 className="font-serif text-2xl mb-2 group-hover:underline decoration-1 underline-offset-4">
                {pro.name}
              </h3>
              <div className="flex items-center text-sm text-hampstead-charcoal/60 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {pro.location}
              </div>
              <p className="text-hampstead-charcoal/80 mb-6 leading-relaxed">
                {pro.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {pro.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-hampstead-cream text-xs text-hampstead-charcoal/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
