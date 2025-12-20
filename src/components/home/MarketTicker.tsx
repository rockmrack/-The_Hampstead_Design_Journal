'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
    <div className="bg-hampstead-cream border-y border-hampstead-black/5 py-3 overflow-hidden flex items-center relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-hampstead-cream to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-hampstead-cream to-transparent z-10" />
      
      <div className="flex items-center px-6 border-r border-hampstead-black/10 z-20 bg-hampstead-cream">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-hampstead-black whitespace-nowrap">
          <TrendingUp className="w-4 h-4" />
          Market Watch
        </span>
      </div>

      <motion.div 
        className="flex items-center gap-12 whitespace-nowrap pl-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 30 
        }}
      >
        {[...MARKET_DATA, ...MARKET_DATA].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <span className="font-serif text-hampstead-charcoal">{item.area}</span>
            <span className="font-mono text-xs text-hampstead-black/60">{item.price}</span>
            <span className={`flex items-center text-xs font-medium ${
              item.trend === 'up' ? 'text-green-700' : 'text-red-700'
            }`}>
              {item.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarketTicker;
