'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Home,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Building2,
  BarChart2,
  PieChart,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

// Market data - in production this would come from an API
const marketStats = {
  avgPrice: 2450000,
  avgPriceChange: 3.2,
  avgPriceSqft: 1285,
  avgPriceSqftChange: 2.8,
  salesVolume: 127,
  salesVolumeChange: -8,
  avgDaysOnMarket: 68,
  avgDaysOnMarketChange: 12,
  lastUpdated: '2024-11-25',
};

const priceByType = [
  { type: 'Detached', avg: 4850000, change: 4.1, volume: 18 },
  { type: 'Semi-Detached', avg: 3200000, change: 2.9, volume: 34 },
  { type: 'Terraced', avg: 2100000, change: 3.5, volume: 42 },
  { type: 'Flat', avg: 875000, change: 1.2, volume: 33 },
];

const priceByArea = [
  { area: 'Hampstead Village', postcode: 'NW3 1', avg: 3200000, change: 4.5 },
  { area: 'Belsize Park', postcode: 'NW3 4', avg: 2100000, change: 2.8 },
  { area: 'South Hampstead', postcode: 'NW6 3', avg: 1650000, change: 3.1 },
  { area: 'West Hampstead', postcode: 'NW6 1', avg: 1200000, change: 2.2 },
  { area: 'Swiss Cottage', postcode: 'NW3 6', avg: 1450000, change: 1.9 },
  { area: 'Finchley Road', postcode: 'NW3 7', avg: 1100000, change: 2.5 },
];

const premiumStreets = [
  { street: 'The Bishops Avenue', avg: 12500000, change: -2.1 },
  { street: 'Hampstead Way', avg: 8200000, change: 5.2 },
  { street: 'Oak Hill Way', avg: 6800000, change: 3.8 },
  { street: 'Redington Road', avg: 5200000, change: 4.1 },
  { street: 'Church Row', avg: 4800000, change: 6.2 },
  { street: 'Well Walk', avg: 4200000, change: 3.5 },
  { street: 'Fitzjohns Avenue', avg: 3900000, change: 2.9 },
  { street: 'Frognal', avg: 3600000, change: 2.1 },
];

const recentSales = [
  { address: '42 Redington Road', price: 4250000, date: '2024-11', type: 'Detached', beds: 5 },
  { address: '15 Church Row', price: 3850000, date: '2024-10', type: 'Terraced', beds: 4 },
  { address: '28 Fitzjohns Avenue', price: 2950000, date: '2024-10', type: 'Semi-Detached', beds: 4 },
  { address: '7 Belsize Square', price: 1850000, date: '2024-11', type: 'Flat', beds: 3 },
  { address: '92 Frognal', price: 3200000, date: '2024-10', type: 'Semi-Detached', beds: 5 },
  { address: '5 Well Walk', price: 4500000, date: '2024-09', type: 'Terraced', beds: 5 },
];

const marketInsights = [
  {
    title: 'Conservation Areas Outperform',
    summary: 'Properties in conservation areas show 15% premium vs non-conservation equivalents.',
    date: '2024-11-20',
  },
  {
    title: 'Basement Extensions Add 18% Value',
    summary: 'Completed basement projects in NW3 showing consistent value uplift above construction cost.',
    date: '2024-11-15',
  },
  {
    title: 'Family Homes in Demand',
    summary: '4+ bed houses selling 25% faster than flats. School catchment areas particularly strong.',
    date: '2024-11-10',
  },
  {
    title: 'Article 4 No Barrier to Sales',
    summary: 'Buyers increasingly value heritage protections. Premium of 8-12% for Article 4 properties.',
    date: '2024-11-05',
  },
];

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `£${(amount / 1000000).toFixed(2)}m`;
  }
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
};

const TrendIndicator = ({ value }: { value: number }) => {
  if (value > 0) {
    return (
      <span className="flex items-center gap-1 text-green-700">
        <TrendingUp className="w-4 h-4" />
        +{value.toFixed(1)}%
      </span>
    );
  }
  if (value < 0) {
    return (
      <span className="flex items-center gap-1 text-red-700">
        <TrendingDown className="w-4 h-4" />
        {value.toFixed(1)}%
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-amber-700">
      <Minus className="w-4 h-4" />
      0%
    </span>
  );
};

export default function MarketDashboardPage() {
  const [timeframe, setTimeframe] = useState<'3m' | '6m' | '12m'>('12m');

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Hero */}
      <section className="bg-hampstead-black text-white">
        <div className="editorial-container py-12 md:py-16">
          <nav className="flex items-center text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Market Dashboard</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              NW3 Market Dashboard
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Real-time property market data for Hampstead, Belsize Park, and surrounding areas. 
              Updated monthly from Land Registry and local agent data.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link 
              href="/market/pulse" 
              className="inline-flex items-center px-6 py-3 bg-white text-hampstead-black font-medium hover:bg-hampstead-grey transition-colors"
            >
              <Activity className="w-4 h-4 mr-2" />
              Market Pulse
            </Link>
            <Link 
              href="/market/tracker" 
              className="inline-flex items-center px-6 py-3 border border-white text-white font-medium hover:bg-white hover:text-hampstead-black transition-colors"
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              Price Tracker
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-hampstead-charcoal text-white py-8 border-b border-white/10">
        <div className="editorial-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-white/50 mb-1">Average Price</p>
              <p className="font-serif text-2xl md:text-3xl mb-1">{formatCurrency(marketStats.avgPrice)}</p>
              <TrendIndicator value={marketStats.avgPriceChange} />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1">Price per Sq Ft</p>
              <p className="font-serif text-2xl md:text-3xl mb-1">£{marketStats.avgPriceSqft}</p>
              <TrendIndicator value={marketStats.avgPriceSqftChange} />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1">Sales Volume (12m)</p>
              <p className="font-serif text-2xl md:text-3xl mb-1">{marketStats.salesVolume}</p>
              <TrendIndicator value={marketStats.salesVolumeChange} />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1">Avg Days on Market</p>
              <p className="font-serif text-2xl md:text-3xl mb-1">{marketStats.avgDaysOnMarket}</p>
              <TrendIndicator value={marketStats.avgDaysOnMarketChange} />
            </div>
          </div>
          <p className="text-xs text-white/30 mt-4">
            <Clock className="w-3 h-3 inline mr-1" />
            Last updated: {marketStats.lastUpdated} | 12-month rolling data
          </p>
        </div>
      </section>

      {/* Timeframe Selector */}
      <section className="border-b border-hampstead-grey sticky top-0 bg-hampstead-white z-40">
        <div className="editorial-container py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-hampstead-charcoal/60">Timeframe:</span>
            <div className="flex gap-2">
              {(['3m', '6m', '12m'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    timeframe === t
                      ? 'border-hampstead-black bg-hampstead-black text-white'
                      : 'border-hampstead-grey hover:border-hampstead-charcoal'
                  }`}
                >
                  {t === '3m' ? '3 Months' : t === '6m' ? '6 Months' : '12 Months'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="editorial-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Price by Type & Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price by Property Type */}
              <div className="p-6 bg-white border border-hampstead-grey">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="w-5 h-5 text-hampstead-charcoal/30" />
                  <h2 className="font-serif text-xl">Price by Property Type</h2>
                </div>
                <div className="space-y-4">
                  {priceByType.map((item) => (
                    <div key={item.type} className="flex items-center justify-between py-3 border-b border-hampstead-grey/50 last:border-0">
                      <div>
                        <h3 className="font-medium">{item.type}</h3>
                        <p className="text-xs text-hampstead-charcoal/50">{item.volume} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-lg">{formatCurrency(item.avg)}</p>
                        <TrendIndicator value={item.change} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price by Area */}
              <div className="p-6 bg-white border border-hampstead-grey">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-hampstead-charcoal/30" />
                  <h2 className="font-serif text-xl">Price by Area</h2>
                </div>
                <div className="space-y-4">
                  {priceByArea.map((item) => (
                    <div key={item.area} className="flex items-center justify-between py-3 border-b border-hampstead-grey/50 last:border-0">
                      <div>
                        <h3 className="font-medium">{item.area}</h3>
                        <p className="text-xs text-hampstead-charcoal/50">{item.postcode}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-lg">{formatCurrency(item.avg)}</p>
                        <TrendIndicator value={item.change} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Streets */}
              <div className="p-6 bg-white border border-hampstead-grey">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart2 className="w-5 h-5 text-hampstead-charcoal/30" />
                  <h2 className="font-serif text-xl">Premium Streets</h2>
                </div>
                <div className="space-y-3">
                  {premiumStreets.map((item, index) => (
                    <div 
                      key={item.street} 
                      className="flex items-center gap-4 py-2"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-hampstead-cream text-xs font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.street}</h3>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.avg)}</p>
                        <span className="text-xs">
                          <TrendIndicator value={item.change} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Recent Sales & Insights */}
            <div className="space-y-8">
              {/* Recent Sales */}
              <div className="p-6 bg-white border border-hampstead-grey">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-hampstead-charcoal/30" />
                    <h2 className="font-serif text-xl">Recent Sales</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {recentSales.map((sale, index) => (
                    <motion.div
                      key={sale.address}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="pb-4 border-b border-hampstead-grey/50 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-medium">{sale.address}</h3>
                        <span className="font-serif">{formatCurrency(sale.price)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-hampstead-charcoal/50">
                        <span>{sale.type}</span>
                        <span>·</span>
                        <span>{sale.beds} bed</span>
                        <span>·</span>
                        <span>{sale.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link
                  href="/archive"
                  className="flex items-center gap-1 text-sm font-medium mt-4 hover:gap-2 transition-all"
                >
                  View all streets
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Market Insights */}
              <div className="p-6 bg-hampstead-cream border border-hampstead-grey">
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="w-5 h-5 text-hampstead-charcoal/30" />
                  <h2 className="font-serif text-xl">Market Insights</h2>
                </div>
                <div className="space-y-4">
                  {marketInsights.map((insight, index) => (
                    <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="pb-4 border-b border-hampstead-grey/50 last:border-0 last:pb-0"
                    >
                      <h3 className="text-sm font-medium mb-1">{insight.title}</h3>
                      <p className="text-xs text-hampstead-charcoal/60 mb-2">{insight.summary}</p>
                      <span className="text-xs text-hampstead-charcoal/40">{insight.date}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 bg-hampstead-black text-white">
                <Home className="w-8 h-8 text-white/30 mb-4" />
                <h3 className="font-serif text-xl mb-2">Know Your Property&apos;s Value</h3>
                <p className="text-sm text-white/70 mb-4">
                  Get an instant estimate based on this market data and your property&apos;s specific features.
                </p>
                <Link
                  href="/valuation"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-hampstead-black hover:bg-hampstead-cream transition-colors"
                >
                  Get Valuation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="section-spacing bg-hampstead-cream border-t border-hampstead-grey">
        <div className="editorial-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl mb-4">About This Data</h2>
            <p className="text-sm text-hampstead-charcoal/70 mb-6">
              Market data is compiled from HM Land Registry price paid data, local estate agent 
              listings, and our own transaction database. Updated monthly with a 6-8 week lag 
              for completed sales registration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-hampstead-charcoal/50">
              <span>Sources: Land Registry</span>
              <span>·</span>
              <span>Local Agent Data</span>
              <span>·</span>
              <span>Hampstead Renovations Database</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
