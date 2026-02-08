'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ChevronRight,
  Search,
  MapPin,
  Phone,
  Globe,
  CheckCircle,
  Star,
  Filter,
  X,
  Award,
  Clock,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Supplier {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  location: string;
  phone: string;
  website?: string;
  specialties: string[];
  verified: boolean;
  recommended: boolean;
  leadTime?: string;
  minOrder?: string;
}

const suppliers: Supplier[] = [
  // Timber & Joinery
  {
    id: 'venables',
    name: 'Venables Brothers',
    category: 'Timber & Joinery',
    subcategory: 'Timber Merchants',
    description: 'Traditional timber merchants specialising in hardwoods for heritage joinery. Family business since 1892.',
    location: 'Park Royal, NW10',
    phone: '020 8965 3456',
    website: 'https://venablesbrothers.co.uk',
    specialties: ['Oak', 'Mahogany', 'Sapele', 'Period Mouldings'],
    verified: true,
    recommended: true,
    leadTime: '3-5 days',
    minOrder: 'None',
  },
  {
    id: 'sash-windows-london',
    name: 'London Sash Windows',
    category: 'Timber & Joinery',
    subcategory: 'Windows',
    description: 'Bespoke timber sash windows and doors. Conservation area approved designs with draught-proofing.',
    location: 'Cricklewood, NW2',
    phone: '020 8452 7890',
    website: 'https://londonsashwindows.com',
    specialties: ['Box Sash', 'Casements', 'French Doors', 'Conservation Grade'],
    verified: true,
    recommended: true,
    leadTime: '4-6 weeks',
    minOrder: 'Single window',
  },
  {
    id: 'heritage-doors',
    name: 'Heritage Door Company',
    category: 'Timber & Joinery',
    subcategory: 'Doors',
    description: 'Period front doors and internal doors. Victorian, Georgian and Edwardian styles.',
    location: 'Holloway, N7',
    phone: '020 7607 2345',
    website: 'https://heritagedoors.co.uk',
    specialties: ['Front Doors', 'Internal Doors', 'Fanlight Restoration', 'Ironmongery'],
    verified: true,
    recommended: false,
    leadTime: '3-4 weeks',
    minOrder: 'Single door',
  },

  // Stone & Masonry
  {
    id: 'portland-stone',
    name: 'Portland Stone Company',
    category: 'Stone & Masonry',
    subcategory: 'Natural Stone',
    description: 'Premium Portland stone suppliers. Approved for Grade I listed building repairs.',
    location: 'Portland, Dorset (London delivery)',
    phone: '01onal 820 456',
    website: 'https://portlandstone.co.uk',
    specialties: ['Portland Base Bed', 'Whitbed', 'Restoration Stone', 'New Carved Work'],
    verified: true,
    recommended: true,
    leadTime: '2-4 weeks',
    minOrder: '1 tonne',
  },
  {
    id: 'bath-stone-group',
    name: 'Bath Stone Group',
    category: 'Stone & Masonry',
    subcategory: 'Natural Stone',
    description: 'Bath stone from traditional quarries. Matching service for period property repairs.',
    location: 'Bath (London delivery)',
    phone: '01225 789 012',
    website: 'https://bathstonegroup.co.uk',
    specialties: ['Hartham Park', 'Stoke Ground', 'Corsham Down', 'Weathered Stone'],
    verified: true,
    recommended: true,
    leadTime: '3-5 weeks',
    minOrder: '500kg',
  },
  {
    id: 'uk-slate',
    name: 'UK Slate Company',
    category: 'Stone & Masonry',
    subcategory: 'Roofing',
    description: 'Welsh and Spanish slate for heritage roofing. Reclaimed and new supply.',
    location: 'Gwynedd (London delivery)',
    phone: '01onal 678 901',
    website: 'https://ukslate.com',
    specialties: ['Welsh Slate', 'Reclaimed Slate', 'Ridge Tiles', 'Lead Work'],
    verified: true,
    recommended: false,
    leadTime: '1-2 weeks',
    minOrder: 'Pallet (1000 tiles)',
  },

  // Lime & Plaster
  {
    id: 'lime-green',
    name: 'Lime Green Products',
    category: 'Lime & Plaster',
    subcategory: 'Lime Mortars',
    description: 'Ready-mixed lime mortars and plasters. Colour matching service available.',
    location: 'Derbyshire (London delivery)',
    phone: '01629 823 267',
    website: 'https://limegreen.co.uk',
    specialties: ['Lime Putty', 'NHL Mortars', 'Lime Wash', 'Pointing Mortars'],
    verified: true,
    recommended: true,
    leadTime: '3-5 days',
    minOrder: '25kg bag',
  },
  {
    id: 'ty-mawr',
    name: 'Ty-Mawr Lime',
    category: 'Lime & Plaster',
    subcategory: 'Lime Products',
    description: 'Comprehensive range of lime products for conservation. Technical support included.',
    location: 'Powys (London delivery)',
    phone: '01874 658 249',
    website: 'https://lime.org.uk',
    specialties: ['Lime Putty', 'Hydraulic Lime', 'Clay Plasters', 'Insulation'],
    verified: true,
    recommended: true,
    leadTime: '5-7 days',
    minOrder: 'None',
  },
  {
    id: 'stevensons',
    name: 'Stevensons of Norwich',
    category: 'Lime & Plaster',
    subcategory: 'Decorative Plaster',
    description: 'Traditional decorative plasterwork. Cornice, ceiling roses, and bespoke mouldings.',
    location: 'Norwich (London delivery)',
    phone: '01603 400 824',
    website: 'https://stevensons-norwich.co.uk',
    specialties: ['Cornices', 'Ceiling Roses', 'Panel Mouldings', 'Restoration Casts'],
    verified: true,
    recommended: true,
    leadTime: '2-4 weeks',
    minOrder: 'Single item',
  },

  // Ironmongery
  {
    id: 'from-the-anvil',
    name: 'From The Anvil',
    category: 'Ironmongery',
    subcategory: 'Door & Window Furniture',
    description: 'Hand-forged ironmongery in traditional styles. Beeswax, pewter, and brass finishes.',
    location: 'Suffolk (Trade counter London)',
    phone: '01onal 678 234',
    website: 'https://fromtheanvil.co.uk',
    specialties: ['Door Handles', 'Window Furniture', 'Cabinet Hardware', 'Hooks & Latches'],
    verified: true,
    recommended: true,
    leadTime: '1-3 days',
    minOrder: 'None',
  },
  {
    id: 'brass-foundry',
    name: 'The Brass Foundry',
    category: 'Ironmongery',
    subcategory: 'Bespoke Hardware',
    description: 'Bespoke brass casting and restoration. Museum-quality reproductions.',
    location: 'Hackney, E8',
    phone: '020 7249 1234',
    specialties: ['Castings', 'Restoration', 'Door Furniture', 'Light Fittings'],
    verified: true,
    recommended: false,
    leadTime: '4-8 weeks',
    minOrder: 'Quotation based',
  },

  // Glass & Glazing
  {
    id: 'glass-house',
    name: 'The Glasshouse',
    category: 'Glass & Glazing',
    subcategory: 'Period Glass',
    description: 'Hand-blown crown glass and cylinder glass for period property restoration.',
    location: 'Berkshire (London delivery)',
    phone: '01onal 234 567',
    website: 'https://theglasshouse.co.uk',
    specialties: ['Crown Glass', 'Cylinder Glass', 'Leaded Lights', 'Stained Glass'],
    verified: true,
    recommended: true,
    leadTime: '2-4 weeks',
    minOrder: 'Single pane',
  },
  {
    id: 'slim-glazing',
    name: 'Slim Double Glazing',
    category: 'Glass & Glazing',
    subcategory: 'Conservation Glazing',
    description: 'Slim profile double glazing for sash windows. Heritage Lottery approved.',
    location: 'London SW19',
    phone: '020 8946 5678',
    website: 'https://slimdoubleglazing.co.uk',
    specialties: ['Vacuum Glazing', 'Thin Double Glazing', 'Secondary Glazing'],
    verified: true,
    recommended: true,
    leadTime: '2-3 weeks',
    minOrder: 'Survey required',
  },

  // Flooring
  {
    id: 'havwoods',
    name: 'Havwoods',
    category: 'Flooring',
    subcategory: 'Wood Flooring',
    description: 'Premium engineered and solid wood flooring. Wide range of finishes and patterns.',
    location: 'Kings Cross, N1',
    phone: '020 7336 1881',
    website: 'https://havwoods.com',
    specialties: ['Engineered Oak', 'Herringbone', 'Chevron', 'Bespoke Finishes'],
    verified: true,
    recommended: true,
    leadTime: '1-2 weeks',
    minOrder: 'None',
  },
  {
    id: 'antique-floors',
    name: 'The Antique Floor Company',
    category: 'Flooring',
    subcategory: 'Reclaimed Flooring',
    description: 'Reclaimed parquet, boards, and tiles. Sourced from historic European buildings.',
    location: 'Battersea, SW11',
    phone: '020 7228 9911',
    website: 'https://antiquefloors.co.uk',
    specialties: ['Reclaimed Oak', 'Victorian Parquet', 'Encaustic Tiles', 'Stone Flags'],
    verified: true,
    recommended: true,
    leadTime: 'Stock dependent',
    minOrder: '10 sqm',
  },

  // Tiles
  {
    id: 'fired-earth',
    name: 'Fired Earth',
    category: 'Tiles & Ceramics',
    subcategory: 'Tiles',
    description: 'High-end tiles, kitchens, and bathrooms. Extensive period-appropriate range.',
    location: 'Multiple London showrooms',
    phone: '020 7589 0489',
    website: 'https://firedearth.com',
    specialties: ['Encaustic', 'Zellige', 'Victorian Geometric', 'Natural Stone'],
    verified: true,
    recommended: true,
    leadTime: '2-4 weeks',
    minOrder: 'None',
  },
  {
    id: 'original-style',
    name: 'Original Style',
    category: 'Tiles & Ceramics',
    subcategory: 'Victorian Tiles',
    description: 'Victorian geometric floor tiles manufactured in Britain using original techniques.',
    location: 'Devon (London stockists)',
    phone: '01onal 456 789',
    website: 'https://originalstyle.com',
    specialties: ['Geometric Floors', 'Hearth Tiles', 'Wall Tiles', 'Border Tiles'],
    verified: true,
    recommended: false,
    leadTime: '1-2 weeks',
    minOrder: 'Box quantities',
  },

  // Paint & Finishes
  {
    id: 'farrow-ball',
    name: 'Farrow & Ball',
    category: 'Paint & Finishes',
    subcategory: 'Paint',
    description: 'Heritage paint colours in eco-friendly formulations. Free colour consultancy.',
    location: 'Marylebone, W1',
    phone: '020 7935 8400',
    website: 'https://farrow-ball.com',
    specialties: ['Estate Emulsion', 'Full Gloss', 'Limewash', 'Colour Matching'],
    verified: true,
    recommended: true,
    leadTime: 'Same day',
    minOrder: 'Sample pot',
  },
  {
    id: 'little-greene',
    name: 'Little Greene',
    category: 'Paint & Finishes',
    subcategory: 'Paint',
    description: 'British heritage paint with National Trust colour range. High quality, traditional finishes.',
    location: 'Chelsea, SW3',
    phone: '020 7351 5555',
    website: 'https://littlegreene.com',
    specialties: ['Intelligent Matt', 'Absolute Matt', 'Oil Gloss', 'Limewash'],
    verified: true,
    recommended: true,
    leadTime: 'Same day',
    minOrder: 'Sample pot',
  },

  // Heating
  {
    id: 'cast-iron-radiators',
    name: 'Cast Iron Radiator Company',
    category: 'Heating & Plumbing',
    subcategory: 'Radiators',
    description: 'New and reconditioned cast iron radiators. Period-correct styles.',
    location: 'Birmingham (London showroom)',
    phone: '0121 450 2345',
    website: 'https://castironradiators.ltd.uk',
    specialties: ['Victorian Column', 'Rococo', 'Art Nouveau', 'School Style'],
    verified: true,
    recommended: true,
    leadTime: '2-4 weeks',
    minOrder: 'Single radiator',
  },
  {
    id: 'architectural-salvage',
    name: 'LASSCO',
    category: 'Architectural Salvage',
    subcategory: 'Reclaimed Items',
    description: 'Premier architectural salvage dealer. Fireplaces, doors, flooring, and fixtures.',
    location: 'Vauxhall, SE11',
    phone: '020 7394 2100',
    website: 'https://lassco.co.uk',
    specialties: ['Fireplaces', 'Doors', 'Flooring', 'Lighting', 'Bathroom Fittings'],
    verified: true,
    recommended: true,
    leadTime: 'Stock items',
    minOrder: 'None',
  },
];

const categories = [
  'All',
  'Timber & Joinery',
  'Stone & Masonry',
  'Lime & Plaster',
  'Ironmongery',
  'Glass & Glazing',
  'Flooring',
  'Tiles & Ceramics',
  'Paint & Finishes',
  'Heating & Plumbing',
  'Architectural Salvage',
];

export default function SuppliersPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRecommendedOnly, setShowRecommendedOnly] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchesSearch = search === '' || 
        supplier.name.toLowerCase().includes(search.toLowerCase()) ||
        supplier.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || supplier.category === selectedCategory;
      const matchesRecommended = !showRecommendedOnly || supplier.recommended;

      return matchesSearch && matchesCategory && matchesRecommended;
    });
  }, [search, selectedCategory, showRecommendedOnly]);

  const groupedSuppliers = useMemo(() => {
    const groups: Record<string, Supplier[]> = {};
    filteredSuppliers.forEach(supplier => {
      if (!groups[supplier.category]) {
        groups[supplier.category] = [];
      }
      groups[supplier.category].push(supplier);
    });
    return groups;
  }, [filteredSuppliers]);

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-12 md:py-16">
          <nav className="flex items-center text-sm text-hampstead-charcoal/60 mb-6">
            <Link href="/journal" className="hover:text-hampstead-black transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-hampstead-black">Suppliers Directory</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Heritage Suppliers Directory
            </h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed">
              Curated directory of materials suppliers and craftspeople for heritage renovation 
              projects in North London. Every supplier has been vetted for quality and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-hampstead-grey sticky top-0 bg-hampstead-white z-40">
        <div className="editorial-container py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/30" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search suppliers or materials..."
                className="w-full pl-10 pr-4 py-3 border border-hampstead-grey focus:border-hampstead-black focus:outline-none transition-colors"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showRecommendedOnly}
                onChange={e => setShowRecommendedOnly(e.target.checked)}
                className="w-4 h-4"
              />
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-sm">Recommended only</span>
            </label>
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm whitespace-nowrap border transition-colors ${
                  selectedCategory === category
                    ? 'border-hampstead-black bg-hampstead-black text-white'
                    : 'border-hampstead-grey hover:border-hampstead-charcoal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-spacing">
        <div className="editorial-container">
          <p className="text-sm text-hampstead-charcoal/60 mb-8">
            Showing {filteredSuppliers.length} supplier{filteredSuppliers.length !== 1 ? 's' : ''}
          </p>

          {Object.entries(groupedSuppliers).map(([category, categorySuppliers]) => (
            <div key={category} className="mb-12">
              <h2 className="font-serif text-xl mb-6 pb-2 border-b border-hampstead-grey">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySuppliers.map((supplier, index) => (
                  <motion.button
                    key={supplier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedSupplier(supplier)}
                    className="text-left p-6 bg-white border border-hampstead-grey hover:border-hampstead-black transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{supplier.name}</h3>
                        <p className="text-xs text-hampstead-charcoal/50">{supplier.subcategory}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {supplier.recommended && (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        )}
                        {supplier.verified && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-hampstead-charcoal/60 mb-4 line-clamp-2">
                      {supplier.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {supplier.specialties.slice(0, 3).map(spec => (
                        <span key={spec} className="px-2 py-0.5 bg-hampstead-cream text-xs">
                          {spec}
                        </span>
                      ))}
                      {supplier.specialties.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-hampstead-charcoal/50">
                          +{supplier.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-hampstead-charcoal/20 mx-auto mb-4" />
              <h3 className="font-medium mb-2">No suppliers found</h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Supplier Detail Modal */}
      <AnimatePresence>
        {selectedSupplier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-hampstead-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSupplier(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-hampstead-grey">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {selectedSupplier.recommended && (
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      )}
                      {selectedSupplier.verified && (
                        <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-2xl">{selectedSupplier.name}</h2>
                    <p className="text-sm text-hampstead-charcoal/50">
                      {selectedSupplier.category} · {selectedSupplier.subcategory}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSupplier(null)}
                    className="p-2 hover:bg-hampstead-grey/20 rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-hampstead-charcoal/70">{selectedSupplier.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {selectedSupplier.leadTime && (
                    <div className="p-3 bg-hampstead-cream">
                      <Clock className="w-4 h-4 text-hampstead-charcoal/30 mb-1" />
                      <p className="text-xs text-hampstead-charcoal/50">Lead Time</p>
                      <p className="text-sm font-medium">{selectedSupplier.leadTime}</p>
                    </div>
                  )}
                  {selectedSupplier.minOrder && (
                    <div className="p-3 bg-hampstead-cream">
                      <Truck className="w-4 h-4 text-hampstead-charcoal/30 mb-1" />
                      <p className="text-xs text-hampstead-charcoal/50">Min Order</p>
                      <p className="text-sm font-medium">{selectedSupplier.minOrder}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3">
                    Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.specialties.map(spec => (
                      <span key={spec} className="px-3 py-1 bg-hampstead-cream text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-hampstead-charcoal/30" />
                    <span>{selectedSupplier.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-hampstead-charcoal/30" />
                    <a href={`tel:${selectedSupplier.phone.replace(/\s/g, '')}`} className="hover:underline">
                      {selectedSupplier.phone}
                    </a>
                  </div>
                  {selectedSupplier.website && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-hampstead-charcoal/30" />
                      <a 
                        href={selectedSupplier.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Visit website
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-hampstead-grey flex gap-3">
                  <a
                    href={`tel:${selectedSupplier.phone.replace(/\s/g, '')}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  {selectedSupplier.website && (
                    <a
                      href={selectedSupplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-hampstead-grey hover:bg-hampstead-cream transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Supplier CTA */}
      <section className="section-spacing bg-hampstead-cream border-t border-hampstead-grey">
        <div className="editorial-container">
          <div className="max-w-2xl mx-auto text-center">
            <Award className="w-12 h-12 text-hampstead-charcoal/20 mx-auto mb-6" />
            <h2 className="font-serif text-3xl mb-4">Know a Great Supplier?</h2>
            <p className="text-hampstead-charcoal/70 mb-6">
              We&apos;re always looking to expand our directory with quality suppliers 
              who specialise in heritage and period property materials.
            </p>
            <Link
              href="/journal/contact?subject=supplier-submission"
              className="inline-flex items-center gap-2 px-8 py-4 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
            >
              Submit a Supplier
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
