'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, MapPin } from 'lucide-react';

const areas = ['Hampstead Village', 'Belsize Park', 'South Hampstead', 'West Hampstead', 'Swiss Cottage', 'Primrose Hill'];
const propertyTypes = ['Detached', 'Semi-Detached', 'Terraced', 'Flat', 'Mews House'];

const mockData = [
  { id: 1, address: 'Redington Road, NW3', price: 4250000, type: 'Detached', area: 'Hampstead Village', date: 'Nov 2024', sqft: 3200 },
  { id: 2, address: 'Belsize Park Gardens, NW3', price: 2100000, type: 'Flat', area: 'Belsize Park', date: 'Oct 2024', sqft: 1450 },
  { id: 3, address: 'Eton Avenue, NW3', price: 3800000, type: 'Semi-Detached', area: 'Belsize Park', date: 'Oct 2024', sqft: 2800 },
  { id: 4, address: 'Well Walk, NW3', price: 5500000, type: 'Terraced', area: 'Hampstead Village', date: 'Sep 2024', sqft: 3100 },
  { id: 5, address: 'Chalcot Square, NW1', price: 4100000, type: 'Terraced', area: 'Primrose Hill', date: 'Nov 2024', sqft: 2400 },
];

export default function PriceTrackerPage() {
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredData = mockData.filter(item => {
    if (selectedArea !== 'All' && item.area !== selectedArea) return false;
    if (selectedType !== 'All' && item.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-hampstead-cream">
      <div className="editorial-container py-12 md:py-20">
        <Link 
          href="/market" 
          className="inline-flex items-center text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Market Dashboard
        </Link>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Price Tracker</h1>
          <p className="text-xl text-hampstead-charcoal/80 max-w-2xl leading-relaxed">
            Track real-time sold prices and market movements across North West London's most prestigious postcodes.
          </p>
        </header>

        {/* Filters */}
        <div className="bg-white p-6 border border-hampstead-grey mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs uppercase tracking-widest text-hampstead-charcoal/60 mb-2">Area</label>
              <select 
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full p-3 bg-hampstead-cream border-none focus:ring-1 focus:ring-hampstead-black"
              >
                <option value="All">All Areas</option>
                {areas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs uppercase tracking-widest text-hampstead-charcoal/60 mb-2">Property Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 bg-hampstead-cream border-none focus:ring-1 focus:ring-hampstead-black"
              >
                <option value="All">All Types</option>
                {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <button className="w-full md:w-auto px-8 py-3 bg-hampstead-black text-white uppercase tracking-widest text-sm hover:bg-hampstead-charcoal transition-colors">
              Update View
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white border border-hampstead-grey overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-hampstead-cream border-b border-hampstead-grey">
                <tr>
                  <th className="p-6 font-serif text-lg font-normal">Address</th>
                  <th className="p-6 font-serif text-lg font-normal">Area</th>
                  <th className="p-6 font-serif text-lg font-normal">Type</th>
                  <th className="p-6 font-serif text-lg font-normal">Sq Ft</th>
                  <th className="p-6 font-serif text-lg font-normal">Sold Price</th>
                  <th className="p-6 font-serif text-lg font-normal">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hampstead-grey">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-hampstead-cream/50 transition-colors">
                    <td className="p-6 font-medium">{item.address}</td>
                    <td className="p-6 text-hampstead-charcoal/80">{item.area}</td>
                    <td className="p-6 text-hampstead-charcoal/80">{item.type}</td>
                    <td className="p-6 text-hampstead-charcoal/80">{item.sqft.toLocaleString()}</td>
                    <td className="p-6 font-medium">£{item.price.toLocaleString()}</td>
                    <td className="p-6 text-hampstead-charcoal/60 text-sm">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredData.length === 0 && (
            <div className="p-12 text-center text-hampstead-charcoal/60">
              No properties found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
