'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  TrendingUp, 
  MapPin, 
  Building2,
  ChevronRight,
  Search,
  CheckCircle,
  Info,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample comparable sales data
const comparableSales = [
  {
    address: '42 Redington Road, NW3',
    price: 4250000,
    date: '2024-09',
    sqft: 3200,
    bedrooms: 5,
    type: 'Detached',
    features: ['Garden', 'Garage', 'Period Features'],
    pricePerSqft: 1328,
  },
  {
    address: '15 Church Row, NW3',
    price: 3850000,
    date: '2024-08',
    sqft: 2800,
    bedrooms: 4,
    type: 'Terraced',
    features: ['Listed', 'Garden', 'Cellar'],
    pricePerSqft: 1375,
  },
  {
    address: '8 Fitzjohns Avenue, NW3',
    price: 5100000,
    date: '2024-07',
    sqft: 4100,
    bedrooms: 6,
    type: 'Semi-Detached',
    features: ['Garden', 'Basement', 'Off-street Parking'],
    pricePerSqft: 1244,
  },
  {
    address: '23 Well Walk, NW3',
    price: 2950000,
    date: '2024-10',
    sqft: 2100,
    bedrooms: 4,
    type: 'Terraced',
    features: ['Period Features', 'Garden'],
    pricePerSqft: 1405,
  },
  {
    address: '7 Oak Hill Way, NW3',
    price: 6200000,
    date: '2024-06',
    sqft: 4800,
    bedrooms: 6,
    type: 'Detached',
    features: ['Arts & Crafts', 'Large Garden', 'Garage'],
    pricePerSqft: 1292,
  },
];

// Street premium/discount data
const streetData: Record<string, { premium: number; trend: 'up' | 'down' | 'stable'; avgPrice: number }> = {
  'church row': { premium: 25, trend: 'up', avgPrice: 4200000 },
  'well walk': { premium: 20, trend: 'up', avgPrice: 3500000 },
  'flask walk': { premium: 18, trend: 'stable', avgPrice: 3200000 },
  'heath street': { premium: 15, trend: 'up', avgPrice: 2800000 },
  'redington road': { premium: 22, trend: 'up', avgPrice: 4500000 },
  'frognal': { premium: 12, trend: 'stable', avgPrice: 3800000 },
  'fitzjohns avenue': { premium: 15, trend: 'up', avgPrice: 4100000 },
  'belsize park': { premium: 10, trend: 'up', avgPrice: 2500000 },
  'oak hill way': { premium: 28, trend: 'up', avgPrice: 5500000 },
  'hampstead way': { premium: 30, trend: 'stable', avgPrice: 6000000 },
};

// Property type multipliers
const propertyTypes = {
  'flat': { label: 'Flat/Apartment', multiplier: 0.85 },
  'terraced': { label: 'Terraced House', multiplier: 1.0 },
  'semi-detached': { label: 'Semi-Detached', multiplier: 1.1 },
  'detached': { label: 'Detached House', multiplier: 1.25 },
  'mansion-flat': { label: 'Mansion Flat', multiplier: 0.95 },
};

// Feature adjustments
const featureAdjustments = {
  garden: { label: 'Private Garden', value: 150000 },
  parking: { label: 'Off-street Parking', value: 75000 },
  basement: { label: 'Basement/Cellar', value: 200000 },
  period: { label: 'Original Period Features', value: 100000 },
  listed: { label: 'Listed Building', value: -50000 },
  loft: { label: 'Loft Conversion', value: 125000 },
  extension: { label: 'Modern Extension', value: 175000 },
  views: { label: 'Heath Views', value: 250000 },
};

export default function ValuationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    postcode: '',
    street: '',
    propertyType: '',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    features: [] as string[],
    condition: 'good' as 'poor' | 'fair' | 'good' | 'excellent',
  });
  const [valuation, setValuation] = useState<{
    estimated: number;
    low: number;
    high: number;
    pricePerSqft: number;
  } | null>(null);
  const [showComparables, setShowComparables] = useState(false);

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const calculateValuation = () => {
    // Base price per sqft for NW3
    let basePricePerSqft = 1300;

    // Street premium adjustment
    const streetKey = formData.street.toLowerCase();
    const streetInfo = Object.entries(streetData).find(([key]) => 
      streetKey.includes(key)
    );
    if (streetInfo) {
      basePricePerSqft *= (1 + streetInfo[1].premium / 100);
    }

    // Property type adjustment
    const typeMultiplier = propertyTypes[formData.propertyType as keyof typeof propertyTypes]?.multiplier || 1;
    basePricePerSqft *= typeMultiplier;

    // Condition adjustment
    const conditionMultipliers = {
      poor: 0.85,
      fair: 0.95,
      good: 1.0,
      excellent: 1.1,
    };
    basePricePerSqft *= conditionMultipliers[formData.condition];

    // Base value
    let baseValue = basePricePerSqft * formData.sqft;

    // Feature adjustments
    formData.features.forEach(feature => {
      const adjustment = featureAdjustments[feature as keyof typeof featureAdjustments];
      if (adjustment) {
        baseValue += adjustment.value;
      }
    });

    // Calculate range
    const estimated = Math.round(baseValue / 10000) * 10000;
    const low = Math.round(estimated * 0.92 / 10000) * 10000;
    const high = Math.round(estimated * 1.08 / 10000) * 10000;

    setValuation({
      estimated,
      low,
      high,
      pricePerSqft: Math.round(basePricePerSqft),
    });
    setStep(4);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-12 md:py-16">
          <nav className="flex items-center text-sm text-hampstead-charcoal/60 mb-6">
            <Link href="/" className="hover:text-hampstead-black transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-hampstead-black">Property Valuation</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Hampstead Property Valuation
            </h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed">
              Get an instant estimate of your property&apos;s value based on recent NW3 sales data, 
              street premiums, and property characteristics.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="border-b border-hampstead-grey">
        <div className="editorial-container py-4">
          <div className="flex items-center justify-between max-w-2xl">
            {['Location', 'Property', 'Features', 'Valuation'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step > index + 1 
                    ? 'bg-green-600 text-white' 
                    : step === index + 1 
                      ? 'bg-hampstead-black text-white' 
                      : 'bg-hampstead-grey/50 text-hampstead-charcoal/50'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  step >= index + 1 ? 'text-hampstead-black' : 'text-hampstead-charcoal/50'
                }`}>
                  {label}
                </span>
                {index < 3 && (
                  <div className={`w-12 md:w-24 h-0.5 mx-4 ${
                    step > index + 1 ? 'bg-green-600' : 'bg-hampstead-grey/50'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Steps */}
      <section className="section-spacing">
        <div className="editorial-container">
          <AnimatePresence mode="wait">
            {/* Step 1: Location */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-xl mx-auto"
              >
                <h2 className="font-serif text-2xl mb-6">Where is your property?</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium block mb-2">Postcode</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/30" />
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={e => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                        placeholder="NW3 1AA"
                        className="w-full pl-10 pr-4 py-3 border border-hampstead-grey focus:border-hampstead-black focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Street Name</label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={e => setFormData({ ...formData, street: e.target.value })}
                      placeholder="e.g., Church Row"
                      className="w-full px-4 py-3 border border-hampstead-grey focus:border-hampstead-black focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-hampstead-charcoal/50 mt-2">
                      Street name helps us apply location premiums
                    </p>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.postcode || !formData.street}
                    className="w-full px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Property Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-xl mx-auto"
              >
                <h2 className="font-serif text-2xl mb-6">Tell us about your property</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium block mb-2">Property Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(propertyTypes).map(([key, { label }]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, propertyType: key })}
                          className={`p-4 text-left border transition-colors ${
                            formData.propertyType === key
                              ? 'border-hampstead-black bg-hampstead-cream'
                              : 'border-hampstead-grey hover:border-hampstead-charcoal'
                          }`}
                        >
                          <Building2 className="w-5 h-5 mb-2 text-hampstead-charcoal/50" />
                          <span className="text-sm">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Bedrooms</label>
                      <select
                        value={formData.bedrooms}
                        onChange={e => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-hampstead-grey focus:border-hampstead-black focus:outline-none transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Bathrooms</label>
                      <select
                        value={formData.bathrooms}
                        onChange={e => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-hampstead-grey focus:border-hampstead-black focus:outline-none transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Size (sq ft)</label>
                      <input
                        type="number"
                        value={formData.sqft}
                        onChange={e => setFormData({ ...formData, sqft: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-hampstead-grey focus:border-hampstead-black focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Property Condition</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['poor', 'fair', 'good', 'excellent'] as const).map(condition => (
                        <button
                          key={condition}
                          onClick={() => setFormData({ ...formData, condition })}
                          className={`px-4 py-2 text-sm border capitalize transition-colors ${
                            formData.condition === condition
                              ? 'border-hampstead-black bg-hampstead-black text-white'
                              : 'border-hampstead-grey hover:border-hampstead-charcoal'
                          }`}
                        >
                          {condition}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-hampstead-grey hover:bg-hampstead-cream transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!formData.propertyType || !formData.sqft}
                      className="flex-1 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Features */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-xl mx-auto"
              >
                <h2 className="font-serif text-2xl mb-6">Select property features</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(featureAdjustments).map(([key, { label, value }]) => (
                      <button
                        key={key}
                        onClick={() => toggleFeature(key)}
                        className={`p-4 text-left border transition-colors ${
                          formData.features.includes(key)
                            ? 'border-hampstead-black bg-hampstead-cream'
                            : 'border-hampstead-grey hover:border-hampstead-charcoal'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{label}</span>
                          {formData.features.includes(key) && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <span className={`text-xs ${value >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {value >= 0 ? '+' : ''}{formatCurrency(value)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-hampstead-grey hover:bg-hampstead-cream transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={calculateValuation}
                      className="flex-1 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                    >
                      Get Valuation
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Results */}
            {step === 4 && valuation && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className="text-center mb-8">
                  <p className="text-sm text-hampstead-charcoal/60 mb-2">Estimated Value</p>
                  <h2 className="font-serif text-5xl md:text-6xl mb-2">{formatCurrency(valuation.estimated)}</h2>
                  <p className="text-hampstead-charcoal/60">
                    Range: {formatCurrency(valuation.low)} – {formatCurrency(valuation.high)}
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-6 bg-hampstead-cream border border-hampstead-grey mb-8">
                  <h3 className="font-medium mb-4">Property Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-hampstead-charcoal/50">Location:</span>
                      <span className="ml-2">{formData.street}, {formData.postcode}</span>
                    </div>
                    <div>
                      <span className="text-hampstead-charcoal/50">Type:</span>
                      <span className="ml-2">{propertyTypes[formData.propertyType as keyof typeof propertyTypes]?.label}</span>
                    </div>
                    <div>
                      <span className="text-hampstead-charcoal/50">Size:</span>
                      <span className="ml-2">{formData.sqft.toLocaleString()} sq ft</span>
                    </div>
                    <div>
                      <span className="text-hampstead-charcoal/50">Beds/Baths:</span>
                      <span className="ml-2">{formData.bedrooms} bed / {formData.bathrooms} bath</span>
                    </div>
                    <div>
                      <span className="text-hampstead-charcoal/50">Price per sq ft:</span>
                      <span className="ml-2">{formatCurrency(valuation.pricePerSqft)}</span>
                    </div>
                    <div>
                      <span className="text-hampstead-charcoal/50">Condition:</span>
                      <span className="ml-2 capitalize">{formData.condition}</span>
                    </div>
                  </div>

                  {formData.features.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-hampstead-grey">
                      <span className="text-sm text-hampstead-charcoal/50">Features included:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.features.map(f => (
                          <span key={f} className="px-2 py-1 bg-white text-xs">
                            {featureAdjustments[f as keyof typeof featureAdjustments]?.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Street Analysis */}
                {(() => {
                  const streetKey = formData.street.toLowerCase();
                  const streetInfo = Object.entries(streetData).find(([key]) => 
                    streetKey.includes(key)
                  );
                  if (streetInfo) {
                    const [, data] = streetInfo;
                    return (
                      <div className="p-6 bg-white border border-hampstead-grey mb-8">
                        <h3 className="font-medium mb-4">Street Analysis</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-hampstead-cream/50">
                            <p className="text-2xl font-serif mb-1">+{data.premium}%</p>
                            <p className="text-xs text-hampstead-charcoal/60">Street Premium</p>
                          </div>
                          <div className="text-center p-4 bg-hampstead-cream/50">
                            <p className="text-2xl font-serif mb-1">{formatCurrency(data.avgPrice)}</p>
                            <p className="text-xs text-hampstead-charcoal/60">Street Average</p>
                          </div>
                          <div className="text-center p-4 bg-hampstead-cream/50">
                            <p className="text-2xl font-serif mb-1 flex items-center justify-center gap-1">
                              {data.trend === 'up' && <ArrowUpRight className="w-5 h-5 text-green-600" />}
                              {data.trend === 'down' && <ArrowDownRight className="w-5 h-5 text-red-600" />}
                              {data.trend === 'stable' && <Minus className="w-5 h-5 text-amber-600" />}
                              {data.trend.charAt(0).toUpperCase() + data.trend.slice(1)}
                            </p>
                            <p className="text-xs text-hampstead-charcoal/60">12-Month Trend</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Comparable Sales */}
                <div className="mb-8">
                  <button
                    onClick={() => setShowComparables(!showComparables)}
                    className="flex items-center gap-2 text-sm font-medium mb-4"
                  >
                    <Search className="w-4 h-4" />
                    {showComparables ? 'Hide' : 'View'} Comparable Sales
                    <ChevronRight className={`w-4 h-4 transition-transform ${showComparables ? 'rotate-90' : ''}`} />
                  </button>

                  {showComparables && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      {comparableSales.map((sale, index) => (
                        <div key={index} className="p-4 bg-hampstead-cream border border-hampstead-grey">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{sale.address}</h4>
                              <p className="text-xs text-hampstead-charcoal/50">
                                {sale.type} · {sale.bedrooms} bed · {sale.sqft.toLocaleString()} sq ft
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-lg">{formatCurrency(sale.price)}</p>
                              <p className="text-xs text-hampstead-charcoal/50 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {sale.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {sale.features.map(f => (
                              <span key={f} className="px-2 py-0.5 bg-white text-xs">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-amber-50 border border-amber-200 text-sm text-amber-900 mb-8">
                  <p className="flex items-start gap-2">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    This is an automated estimate based on market data. For an accurate valuation, 
                    we recommend a professional appraisal. Values can vary based on condition, 
                    presentation, and market conditions.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact?subject=formal-valuation"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    Book Professional Valuation
                  </Link>
                  <button
                    onClick={() => {
                      setStep(1);
                      setValuation(null);
                      setFormData({
                        postcode: '',
                        street: '',
                        propertyType: '',
                        bedrooms: 3,
                        bathrooms: 2,
                        sqft: 1500,
                        features: [],
                        condition: 'good',
                      });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-hampstead-grey hover:bg-hampstead-cream transition-colors"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Value Another Property
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
