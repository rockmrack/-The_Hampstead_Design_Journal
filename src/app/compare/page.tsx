'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Check, 
  X, 
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Thermometer,
  Volume2,
  PoundSterling,
  Clock,
  Leaf,
  Shield,
  Star,
  Info
} from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

type ComparisonCategory = 'windows' | 'flooring' | 'heating' | 'insulation';

interface ComparisonItem {
  name: string;
  description: string;
  heritageRating: number;
  costRange: string;
  lifespan: string;
  maintenanceLevel: 'Low' | 'Medium' | 'High';
  thermalPerformance: number;
  bestFor: string[];
  considerations: string[];
  pros: string[];
  cons: string[];
}

interface ComparisonData {
  title: string;
  description: string;
  items: ComparisonItem[];
  factors: string[];
}

const comparisonData: Record<ComparisonCategory, ComparisonData> = {
  windows: {
    title: 'Window Options for Period Properties',
    description: 'Compare window solutions that balance thermal performance with heritage authenticity',
    factors: ['Heritage Authenticity', 'Thermal Performance', 'Cost', 'Lifespan', 'Maintenance'],
    items: [
      {
        name: 'Original Sash + Secondary Glazing',
        description: 'Keep original single-glazed sashes and add discreet secondary glazing internally',
        heritageRating: 5,
        costRange: '£400-800/window',
        lifespan: '25+ years (secondary)',
        maintenanceLevel: 'Medium',
        thermalPerformance: 4,
        bestFor: ['Listed buildings', 'Conservation areas', 'Those prioritising authenticity'],
        considerations: ['Slight reduction in internal reveal depth', 'Cleaning between panes required', 'Original windows need maintenance'],
        pros: ['Preserves original character', 'Reversible', 'Good acoustic performance', 'Maintains property value'],
        cons: ['Two sets of windows to maintain', 'Reduces reveal depth slightly', 'Not quite as thermally efficient as double glazing']
      },
      {
        name: 'Slim-Profile Double Glazed Sash',
        description: 'Purpose-made timber sashes with slim double-glazed units replicating original profiles',
        heritageRating: 3,
        costRange: '£1,200-2,500/window',
        lifespan: '30-40 years',
        maintenanceLevel: 'Low',
        thermalPerformance: 4,
        bestFor: ['Non-listed period properties', 'Where originals are beyond repair', 'Budget for premium solution'],
        considerations: ['Glazing bars slightly thicker than original', 'May require planning permission', 'Historic glass character lost'],
        pros: ['Best thermal performance', 'Low maintenance', 'Modern seals and mechanisms'],
        cons: ['Higher upfront cost', 'Not authentic to period', 'May not be approved for listed buildings']
      },
      {
        name: 'Restored Original Sash (Single Glazed)',
        description: 'Professional overhaul of original windows with draught-proofing',
        heritageRating: 5,
        costRange: '£300-600/window',
        lifespan: '50+ years (with maintenance)',
        maintenanceLevel: 'High',
        thermalPerformance: 2,
        bestFor: ['Budget-conscious', 'Mild climates', 'Purists prioritising authenticity'],
        considerations: ['Lower thermal performance', 'Regular painting required', 'Draught-proofing needs periodic replacement'],
        pros: ['Preserves originals', 'Lowest cost', 'Maintains character completely', 'Sustainable approach'],
        cons: ['Poorest thermal performance', 'Higher ongoing maintenance', 'Some draught even with seals']
      },
      {
        name: 'uPVC Replacement',
        description: 'Modern uPVC double-glazed windows styled to look like sashes',
        heritageRating: 1,
        costRange: '£500-900/window',
        lifespan: '20-25 years',
        maintenanceLevel: 'Low',
        thermalPerformance: 4,
        bestFor: ['Properties outside conservation areas', 'Budget priority', 'Maximum thermal performance'],
        considerations: ['Usually prohibited in conservation areas', 'Devalues period properties', 'Cannot replicate original profiles'],
        pros: ['Low cost', 'Good thermal performance', 'Minimal maintenance'],
        cons: ['Harms property character', 'Often prohibited', 'Reduces property value', 'Not recyclable']
      }
    ]
  },
  flooring: {
    title: 'Flooring Options for Period Properties',
    description: 'Compare flooring solutions suitable for Georgian, Victorian, and Edwardian homes',
    factors: ['Heritage Compatibility', 'Durability', 'Cost', 'Comfort', 'Maintenance'],
    items: [
      {
        name: 'Restored Original Floorboards',
        description: 'Professional restoration of existing pine or hardwood boards including sanding, repairs, and finishing',
        heritageRating: 5,
        costRange: '£35-60/sqm',
        lifespan: '100+ years',
        maintenanceLevel: 'Medium',
        thermalPerformance: 2,
        bestFor: ['Properties with salvageable originals', 'Period authenticity', 'Sustainable approach'],
        considerations: ['Gaps may allow draughts', 'Sound transmission between floors', 'Some boards may need replacement'],
        pros: ['Most authentic', 'Sustainable', 'Adds character', 'Can be re-finished multiple times'],
        cons: ['Can be draughty', 'May have imperfections', 'Requires careful furniture placement']
      },
      {
        name: 'Reclaimed Period Boards',
        description: 'Salvaged floorboards from similar period properties, typically Georgian pine or Victorian pitch pine',
        heritageRating: 5,
        costRange: '£60-120/sqm (supplied & fitted)',
        lifespan: '100+ years',
        maintenanceLevel: 'Medium',
        thermalPerformance: 2,
        bestFor: ['Replacing damaged sections', 'Extensions', 'Where originals missing'],
        considerations: ['Matching existing boards can be difficult', 'Variable quality', 'May need acclimatisation'],
        pros: ['Period appropriate', 'Sustainable', 'Instant patina and character'],
        cons: ['Expensive', 'Supply unpredictable', 'Matching can be challenging']
      },
      {
        name: 'Engineered Oak Parquet',
        description: 'Engineered wood parquet in herringbone or chevron patterns, popular in Victorian/Edwardian homes',
        heritageRating: 4,
        costRange: '£80-150/sqm (supplied & fitted)',
        lifespan: '25-50 years',
        maintenanceLevel: 'Low',
        thermalPerformance: 3,
        bestFor: ['Reception rooms', 'Underfloor heating compatibility', 'Victorian properties'],
        considerations: ['Not original to Georgian properties', 'Can look too uniform', 'Limited refinishing potential'],
        pros: ['Beautiful appearance', 'Stable with UFH', 'Period appropriate for Victorian+'],
        cons: ['Higher cost', 'Limited sanding capacity', 'May look too perfect']
      },
      {
        name: 'Encaustic/Geometric Tiles',
        description: 'Traditional clay tiles for hallways and wet areas, either original restoration or reproduction',
        heritageRating: 5,
        costRange: '£150-300/sqm (reproduction, fitted)',
        lifespan: '100+ years',
        maintenanceLevel: 'Low',
        thermalPerformance: 2,
        bestFor: ['Hallways', 'Bathrooms', 'Victorian properties'],
        considerations: ['Cold underfoot', 'Requires proper substrate', 'Installation is skilled work'],
        pros: ['Extremely durable', 'Period perfect', 'Easy to clean', 'Unique character'],
        cons: ['Cold and hard', 'Expensive', 'Specialist installation required']
      },
      {
        name: 'Natural Stone',
        description: 'Limestone, slate, or marble flagstones for hallways, kitchens, and utility areas',
        heritageRating: 4,
        costRange: '£100-250/sqm (supplied & fitted)',
        lifespan: '100+ years',
        maintenanceLevel: 'Medium',
        thermalPerformance: 2,
        bestFor: ['Georgian properties', 'Kitchens', 'Boot rooms'],
        considerations: ['Cold without UFH', 'Some stones require sealing', 'Heavy—check floor structure'],
        pros: ['Timeless', 'Extremely durable', 'Works with UFH', 'High-end appearance'],
        cons: ['Cold and hard', 'Can be slippery', 'Some varieties stain easily']
      }
    ]
  },
  heating: {
    title: 'Heating Systems for Period Properties',
    description: 'Compare heating solutions that work with solid walls, high ceilings, and heritage constraints',
    factors: ['Heritage Compatibility', 'Efficiency', 'Cost', 'Running Costs', 'Installation Disruption'],
    items: [
      {
        name: 'Gas Boiler + Radiators',
        description: 'Traditional wet central heating with modern condensing boiler and period-style radiators',
        heritageRating: 4,
        costRange: '£8,000-15,000 (full system)',
        lifespan: '15-20 years (boiler)',
        maintenanceLevel: 'Low',
        thermalPerformance: 4,
        bestFor: ['Properties with gas supply', 'Standard heating needs', 'Budget-conscious'],
        considerations: ['Gas boilers being phased out (2035)', 'Radiator placement affects furniture', 'Pipework routing can be disruptive'],
        pros: ['Proven technology', 'Lower upfront cost', 'Period radiators available', 'Responsive heat'],
        cons: ['Fossil fuel dependent', 'Future-proofing concerns', 'Visible pipework']
      },
      {
        name: 'Air Source Heat Pump',
        description: 'Electric heat pump extracting heat from outside air, typically with larger radiators or UFH',
        heritageRating: 3,
        costRange: '£12,000-20,000 (inc installation)',
        lifespan: '20-25 years',
        maintenanceLevel: 'Low',
        thermalPerformance: 4,
        bestFor: ['Future-proofing', 'Properties with space for external unit', 'Combining with UFH'],
        considerations: ['External unit placement in conservation areas', 'May need larger radiators', 'Lower flow temperatures'],
        pros: ['Low running costs', 'Future-proof', 'Grant available (BUS)', 'Low carbon'],
        cons: ['Higher upfront cost', 'External unit visibility', 'Works best with UFH or larger radiators']
      },
      {
        name: 'Ground Source Heat Pump',
        description: 'Heat pump using ground loops buried in garden, delivering consistent low-temperature heat',
        heritageRating: 4,
        costRange: '£20,000-35,000 (inc ground works)',
        lifespan: '25-30 years (50+ for ground loops)',
        maintenanceLevel: 'Low',
        thermalPerformance: 5,
        bestFor: ['Properties with garden space', 'Long-term ownership', 'Listed buildings (no visible equipment)'],
        considerations: ['Significant garden disruption', 'Higher upfront cost', 'Best combined with UFH'],
        pros: ['Most efficient heat pump', 'No visible external unit', 'Lowest running costs', 'Grants available'],
        cons: ['Highest upfront cost', 'Garden excavation required', 'Archaeology concerns possible']
      },
      {
        name: 'Underfloor Heating (Wet System)',
        description: 'Hot water pipes embedded in floor screed, providing even radiant heat',
        heritageRating: 4,
        costRange: '£80-120/sqm (inc screed)',
        lifespan: '50+ years',
        maintenanceLevel: 'Low',
        thermalPerformance: 5,
        bestFor: ['New extensions', 'Basement conversions', 'Properties being fully renovated'],
        considerations: ['Raises floor levels', 'Slow response time', 'Difficult to retrofit'],
        pros: ['Invisible', 'Even heat distribution', 'Frees wall space', 'Works with heat pumps'],
        cons: ['Expensive to retrofit', 'Slow to heat up', 'Floor level increase']
      },
      {
        name: 'Electric Panel Radiators',
        description: 'Modern electric radiators as supplementary or primary heating',
        heritageRating: 3,
        costRange: '£300-800 per room',
        lifespan: '15-20 years',
        maintenanceLevel: 'Low',
        thermalPerformance: 3,
        bestFor: ['Supplementary heating', 'Rooms without pipework', 'Listed buildings (minimal disruption)'],
        considerations: ['Higher running costs', 'Electric supply upgrades may be needed', 'Not suitable for whole-house primary heating'],
        pros: ['No pipework', 'Easy installation', 'Room-by-room control', 'Minimal disruption'],
        cons: ['Higher running costs', 'Less efficient than wet systems', 'May need electrical upgrades']
      }
    ]
  },
  insulation: {
    title: 'Insulation Options for Solid-Walled Properties',
    description: 'Compare insulation approaches that maintain breathability in traditional construction',
    factors: ['Heritage Compatibility', 'Thermal Performance', 'Cost', 'Moisture Safety', 'Space Loss'],
    items: [
      {
        name: 'Wood Fibre Internal Insulation',
        description: 'Breathable wood fibre boards applied to internal walls with lime plaster finish',
        heritageRating: 4,
        costRange: '£80-120/sqm (supplied & fitted)',
        lifespan: '50+ years',
        maintenanceLevel: 'Low',
        thermalPerformance: 3,
        bestFor: ['Most period properties', 'Walls with damp risk', 'Heritage-conscious approach'],
        considerations: ['Reduces room size', 'Requires lime plaster finish', 'Detailing around features important'],
        pros: ['Breathable', 'Good thermal mass', 'Sustainable material', 'Moisture buffering'],
        cons: ['Moderate thermal improvement', 'Loses room space', 'Higher cost than foam']
      },
      {
        name: 'Aerogel Insulation',
        description: 'Ultra-thin high-performance insulation for maximum performance in minimal thickness',
        heritageRating: 4,
        costRange: '£200-350/sqm',
        lifespan: '50+ years',
        maintenanceLevel: 'Low',
        thermalPerformance: 5,
        bestFor: ['Where space is critical', 'Listed buildings', 'Premium projects'],
        considerations: ['Very expensive', 'Requires careful detailing', 'Specialist installation'],
        pros: ['Minimal thickness', 'Excellent U-values', 'Vapour permeable options available'],
        cons: ['Very expensive', 'Specialist product', 'Limited availability']
      },
      {
        name: 'Hemp-Lime Render',
        description: 'Internal or external render combining hemp and lime for insulation and finish in one',
        heritageRating: 5,
        costRange: '£100-150/sqm',
        lifespan: '50+ years',
        maintenanceLevel: 'Low',
        thermalPerformance: 2,
        bestFor: ['Properties with uneven walls', 'Combined insulation + finish', 'External use'],
        considerations: ['Longer drying time', 'Moderate insulation value', 'Traditional application skills needed'],
        pros: ['Fully breathable', 'Regulates humidity', 'Carbon negative', 'Traditional finish'],
        cons: ['Lower thermal performance', 'Slow to dry', 'Specialist skills required']
      },
      {
        name: 'PIR/PUR Foam Boards',
        description: 'High-performance rigid foam insulation boards (NOT recommended for solid walls)',
        heritageRating: 1,
        costRange: '£40-70/sqm',
        lifespan: '30+ years',
        maintenanceLevel: 'Low',
        thermalPerformance: 5,
        bestFor: ['Modern extensions only', 'Cavity walls', 'NOT solid walls'],
        considerations: ['Traps moisture in solid walls', 'Can cause damp and decay', 'Not breathable'],
        pros: ['Cheapest option', 'Excellent thermal performance', 'Widely available'],
        cons: ['Causes damp in solid walls', 'Not breathable', 'Damages traditional construction']
      },
      {
        name: 'Loft Insulation (Mineral Wool)',
        description: 'Standard loft insulation between and over joists—low-risk, high-impact measure',
        heritageRating: 5,
        costRange: '£20-40/sqm',
        lifespan: '40+ years',
        maintenanceLevel: 'Low',
        thermalPerformance: 4,
        bestFor: ['All properties with accessible lofts', 'First upgrade priority', 'Budget-conscious'],
        considerations: ['Ensure ventilation maintained', 'Don\'t block eaves', 'Check for pipe insulation'],
        pros: ['Low cost, high impact', 'Easy DIY', 'No heritage concerns', 'Immediate savings'],
        cons: ['Cold loft space', 'Need to maintain ventilation', 'Won\'t help walls']
      }
    ]
  }
};

export default function ComparePage() {
  const [selectedCategory, setSelectedCategory] = useState<ComparisonCategory>('windows');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const currentData = comparisonData[selectedCategory];

  const renderStars = (rating: number, max: number = 5) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(max)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hampstead-black text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-hampstead-black via-hampstead-black/95 to-hampstead-charcoal/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[{ label: 'Compare' }]} 
            className="mb-8 opacity-60"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Material Comparison Tool
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Compare windows, flooring, heating, and insulation options for 
              period properties—balancing heritage authenticity with modern performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Selector */}
      <section className="bg-hampstead-cream border-b border-hampstead-charcoal/10 sticky top-20 md:top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {(Object.keys(comparisonData) as ComparisonCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedItem(null);
                }}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-hampstead-black text-white'
                    : 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              {currentData.title}
            </h2>
            <p className="text-hampstead-charcoal/70 text-lg max-w-3xl">
              {currentData.description}
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="space-y-6">
            {currentData.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-hampstead-cream rounded-xl overflow-hidden"
              >
                {/* Main Row */}
                <div 
                  className="p-5 md:p-6 cursor-pointer hover:bg-hampstead-cream/80 transition-colors"
                  onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                    {/* Name & Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-playfair text-lg font-bold mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-hampstead-charcoal/70 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <ChevronDown 
                          className={`w-5 h-5 text-hampstead-charcoal/40 flex-shrink-0 transition-transform ${
                            expandedItem === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="flex flex-wrap gap-4 lg:gap-6 text-sm">
                      <div className="min-w-[100px]">
                        <div className="text-hampstead-charcoal/60 text-xs mb-1">Heritage Rating</div>
                        {renderStars(item.heritageRating)}
                      </div>
                      <div className="min-w-[100px]">
                        <div className="text-hampstead-charcoal/60 text-xs mb-1">Performance</div>
                        {renderStars(item.thermalPerformance)}
                      </div>
                      <div className="min-w-[100px]">
                        <div className="text-hampstead-charcoal/60 text-xs mb-1">Cost</div>
                        <div className="font-medium">{item.costRange}</div>
                      </div>
                      <div className="min-w-[80px]">
                        <div className="text-hampstead-charcoal/60 text-xs mb-1">Maintenance</div>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          item.maintenanceLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                          item.maintenanceLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {item.maintenanceLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedItem === item.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-hampstead-charcoal/10 bg-white p-5 md:p-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Pros */}
                      <div>
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2 text-emerald-700">
                          <Check className="w-4 h-4" />
                          Advantages
                        </h4>
                        <ul className="space-y-2">
                          {item.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/80">
                              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div>
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2 text-rose-700">
                          <X className="w-4 h-4" />
                          Disadvantages
                        </h4>
                        <ul className="space-y-2">
                          {item.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/80">
                              <X className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Best For */}
                      <div>
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          Best For
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.bestFor.map((use, i) => (
                            <span key={i} className="px-3 py-1 bg-hampstead-cream rounded-full text-xs">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Considerations */}
                      <div>
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4 text-blue-500" />
                          Key Considerations
                        </h4>
                        <ul className="space-y-1">
                          {item.considerations.map((consideration, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/70">
                              <span className="text-hampstead-charcoal/40">•</span>
                              {consideration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 pt-6 border-t border-hampstead-charcoal/10 flex flex-wrap gap-6 text-sm">
                      <div>
                        <span className="text-hampstead-charcoal/60">Expected Lifespan: </span>
                        <span className="font-medium">{item.lifespan}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-hampstead-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-sm text-hampstead-charcoal/70">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              Costs are indicative for NW3/North London as of 2024 and will vary based on 
              specification, access, and project complexity. Heritage ratings reflect 
              general suitability for listed/conservation area properties but specific 
              approval depends on individual circumstances. Always consult your conservation 
              officer for listed buildings.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-hampstead-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Need Specific Advice?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Every heritage property is unique. Book a consultation and we'll 
            recommend the best solutions for your specific building and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-hampstead-black px-8 py-4 rounded-lg font-medium hover:bg-hampstead-cream transition-colors"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors border border-white/30"
            >
              Cost Calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
