'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, BarChart2 } from 'lucide-react';

const trends = [
  {
    id: 1,
    title: 'Conservation Area Premium',
    description: 'Properties within Hampstead Conservation Area continue to command significant premiums over adjacent non-designated streets.',
    value: '+15%',
    trend: 'up',
    data: [10, 12, 11, 13, 14, 15],
  },
  {
    id: 2,
    title: 'Basement Extension ROI',
    description: 'Return on investment for basement excavations has stabilized, with highest returns seen in NW3 4 and NW3 5 postcodes.',
    value: '+18%',
    trend: 'stable',
    data: [15, 16, 18, 18, 17, 18],
  },
  {
    id: 3,
    title: 'Sustainable Retrofit Demand',
    description: 'Buyers are increasingly prioritizing energy efficiency, with retrofitted period properties selling 20% faster.',
    value: '+20%',
    trend: 'up',
    data: [5, 8, 12, 15, 18, 20],
  },
];

export default function MarketPulsePage() {
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

        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Market Pulse</h1>
          <p className="text-xl text-hampstead-charcoal/80 max-w-2xl leading-relaxed">
            Deep dive into the trends shaping the North West London property market. 
            Our analysis combines transaction data with planning applications and buyer sentiment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {trends.map((trend) => (
            <div key={trend.id} className="bg-white p-8 border border-hampstead-grey hover:border-hampstead-black transition-colors group">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-hampstead-cream rounded-full group-hover:bg-hampstead-black group-hover:text-white transition-colors">
                  <Activity className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  trend.trend === 'up' ? 'text-green-600' : 'text-hampstead-charcoal'
                }`}>
                  {trend.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {trend.value}
                </div>
              </div>
              <h3 className="font-serif text-2xl mb-4">{trend.title}</h3>
              <p className="text-hampstead-charcoal/80 mb-8 leading-relaxed">
                {trend.description}
              </p>
              
              {/* Simple Bar Chart Visualization */}
              <div className="flex items-end gap-2 h-24 mt-auto">
                {trend.data.map((val, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 bg-hampstead-grey/40 hover:bg-hampstead-black transition-colors relative group/bar"
                    style={{ height: `${(val / 25) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                      {val}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="bg-hampstead-black text-white p-12 md:p-20 text-center">
          <BarChart2 className="w-12 h-12 mx-auto mb-6 text-hampstead-grey" />
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Quarterly Market Report</h2>
          <p className="text-lg text-hampstead-grey/80 max-w-2xl mx-auto mb-10">
            Download our comprehensive analysis of Q4 2024, featuring exclusive data on off-market transactions and planning approvals.
          </p>
          <button className="bg-white text-hampstead-black px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-hampstead-grey transition-colors">
            Download Report (PDF)
          </button>
        </section>
      </div>
    </div>
  );
}
