'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight, BarChart2 } from 'lucide-react';

const MARKET_DATA = [
  { area: "Hampstead Village", price: "£3.2M", change: "+4.5%", trend: "up" },
  { area: "Belsize Park", price: "£2.1M", change: "+2.8%", trend: "up" },
  { area: "Primrose Hill", price: "£2.8M", change: "+3.1%", trend: "up" },
  { area: "West Hampstead", price: "£1.2M", change: "-0.5%", trend: "down" },
  { area: "Swiss Cottage", price: "£1.4M", change: "+1.9%", trend: "up" },
  { area: "Highgate", price: "£1.9M", change: "+2.2%", trend: "up" },
  { area: "South Hampstead", price: "£1.6M", change: "+3.1%", trend: "up" },
];

const MarketTicker = () => {
  return (
    <div className="bg-hampstead-black text-white py-4 overflow-hidden relative z-20">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-hampstead-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-hampstead-black to-transparent z-10" />
      
      <div className="flex items-center">
        {/* Fixed Label */}
        <Link 
          href="/market"
          className="group flex items-center gap-3 px-8 border-r border-white/10 z-20 bg-hampstead-black hover:bg-white/5 transition-colors"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block">Live Data</span>
            <span className="text-sm font-medium tracking-wide">Market Watch</span>
          </div>
        </Link>

        {/* Scrolling Ticker */}
        <motion.div 
          className="flex items-center gap-16 whitespace-nowrap pl-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 35 
          }}
        >
          {[...MARKET_DATA, ...MARKET_DATA].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="font-serif text-white/90">{item.area}</span>
              <span className="px-3 py-1 bg-white/10 font-mono text-sm">{item.price}</span>
              <span className={`flex items-center gap-1 text-sm font-medium ${
                item.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Button */}
      <Link
        href="/market"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-2 px-4 py-2 bg-white text-hampstead-black text-xs uppercase tracking-widest font-medium hover:bg-hampstead-cream transition-colors"
      >
        <BarChart2 className="w-3.5 h-3.5" />
        Full Report
      </Link>
    </div>
  );
};

export default MarketTicker;
