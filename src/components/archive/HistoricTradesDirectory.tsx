'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Shield,
  Award,
  Clock,
  ExternalLink
} from 'lucide-react';

interface Tradesperson {
  id: string;
  name: string;
  trade: string;
  specialty: string[];
  description: string;
  experience: string;
  location: string;
  coverage: string[];
  accreditations: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  rating?: number;
  projectTypes: string[];
  verified: boolean;
}

const trades: { id: string; name: string; icon: string }[] = [
  { id: 'lime-specialists', name: 'Lime & Plaster Specialists', icon: '🏛️' },
  { id: 'joinery', name: 'Heritage Joinery', icon: '🪚' },
  { id: 'roofing', name: 'Traditional Roofing', icon: '🏠' },
  { id: 'stonework', name: 'Stone Masonry', icon: '🪨' },
  { id: 'metalwork', name: 'Architectural Metalwork', icon: '⚒️' },
  { id: 'glazing', name: 'Period Glazing', icon: '🪟' },
  { id: 'decorating', name: 'Heritage Decorating', icon: '🎨' },
  { id: 'brickwork', name: 'Traditional Brickwork', icon: '🧱' },
];

const tradespeople: Tradesperson[] = [
  // LIME SPECIALISTS
  {
    id: 'heritage-lime-works',
    name: 'Heritage Lime Works',
    trade: 'lime-specialists',
    specialty: ['Lime plastering', 'Lime pointing', 'Stucco repair', 'Roughcast render'],
    description: 'Fourth-generation lime plasterers specializing in historic London properties. We use only traditional lime putty mortars mixed on site to match original specifications.',
    experience: '40+ years (family business since 1985)',
    location: 'North London',
    coverage: ['Camden', 'Barnet', 'Haringey', 'Islington', 'Westminster'],
    accreditations: ['SPAB Scholars', 'Building Limes Forum members', 'Historic England approved'],
    contact: {
      phone: '020 7XXX XXXX',
      email: 'info@heritagelimeworks.co.uk',
      website: 'https://www.heritagelimeworks.co.uk'
    },
    rating: 5,
    projectTypes: ['Georgian townhouses', 'Victorian villas', 'Listed buildings', 'Conservation area properties'],
    verified: true
  },
  {
    id: 'traditional-plastering-co',
    name: 'The Traditional Plastering Company',
    trade: 'lime-specialists',
    specialty: ['Ornamental plasterwork', 'Ceiling roses', 'Cornicing', 'Fibrous plaster'],
    description: 'Specialist in decorative plasterwork restoration and reproduction. We can match any existing moulding profile or create new designs in the period style.',
    experience: '25 years',
    location: 'Central London',
    coverage: ['All London boroughs', 'Home Counties'],
    accreditations: ['Guild of Master Craftsmen', 'CITB registered'],
    contact: {
      phone: '020 7XXX XXXX',
      email: 'enquiries@traditionalplastering.co.uk'
    },
    rating: 5,
    projectTypes: ['Cornice repair', 'Ceiling rose restoration', 'Panel mouldings', 'New ornamental work'],
    verified: true
  },

  // HERITAGE JOINERY
  {
    id: 'hampstead-sash-windows',
    name: 'Hampstead Sash Window Specialists',
    trade: 'joinery',
    specialty: ['Sash window restoration', 'Sash window manufacture', 'Draught-proofing', 'Casement windows'],
    description: 'Dedicated sash window specialists working exclusively on period properties in NW3 and surrounding areas. We restore rather than replace wherever possible.',
    experience: '30 years',
    location: 'Hampstead, NW3',
    coverage: ['Hampstead', 'Belsize Park', 'Primrose Hill', 'St Johns Wood', 'Highgate'],
    accreditations: ['FENSA registered', 'TrustMark', 'Which? Trusted Trader'],
    contact: {
      phone: '020 7XXX XXXX',
      email: 'info@hampsteadsash.co.uk',
      website: 'https://www.hampsteadsash.co.uk'
    },
    rating: 5,
    projectTypes: ['Victorian sash restoration', 'Georgian sash repair', 'Secondary glazing', 'Draught-proofing'],
    verified: true
  },
  {
    id: 'bespoke-period-joinery',
    name: 'Bespoke Period Joinery',
    trade: 'joinery',
    specialty: ['Period doors', 'Panelling', 'Staircases', 'Built-in furniture'],
    description: 'Architectural joinery workshop producing doors, panelling, and bespoke furniture to match historic originals. All work made in our London workshop.',
    experience: '20 years',
    location: 'East London workshop',
    coverage: ['All London', 'South East England'],
    accreditations: ['BWF members', 'FSC certified'],
    contact: {
      phone: '020 8XXX XXXX',
      email: 'workshop@bespokeperiodjoinery.co.uk',
      website: 'https://www.bespokeperiodjoinery.co.uk'
    },
    rating: 4.5,
    projectTypes: ['Georgian panelled doors', 'Victorian six-panel doors', 'Edwardian internal joinery', 'Bespoke furniture'],
    verified: true
  },

  // TRADITIONAL ROOFING
  {
    id: 'heritage-roofing-london',
    name: 'Heritage Roofing London',
    trade: 'roofing',
    specialty: ['Welsh slate', 'Hand-made clay tiles', 'Lead work', 'Chimney repair'],
    description: 'Specialist heritage roofers working on listed buildings and conservation area properties. We source authentic materials including genuine Welsh slate and hand-made tiles.',
    experience: '35 years',
    location: 'North London',
    coverage: ['North London', 'Central London', 'Hertfordshire'],
    accreditations: ['NFRC members', 'Historic England approved', 'Lead Contractors Association'],
    contact: {
      phone: '020 7XXX XXXX',
      email: 'info@heritageroofing.london'
    },
    rating: 5,
    projectTypes: ['Slate roof repair', 'Clay tile roofing', 'Leadwork', 'Chimney restoration'],
    verified: true
  },

  // STONE MASONRY
  {
    id: 'london-stone-conservation',
    name: 'London Stone Conservation',
    trade: 'stonework',
    specialty: ['Stone cleaning', 'Stone repair', 'Stone carving', 'Conservation work'],
    description: 'PACR accredited stone conservators specializing in Portland stone and other building stones. We use only reversible, breathable repair methods.',
    experience: '28 years',
    location: 'London',
    coverage: ['Greater London', 'South East'],
    accreditations: ['PACR accredited', 'Stone Federation members', 'Historic England approved'],
    contact: {
      phone: '020 7XXX XXXX',
      email: 'enquiries@londonstoneconservation.co.uk',
      website: 'https://www.londonstoneconservation.co.uk'
    },
    rating: 5,
    projectTypes: ['Portland stone cleaning', 'Terracotta repair', 'Stone carving', 'Conservation surveys'],
    verified: true
  },

  // ARCHITECTURAL METALWORK
  {
    id: 'victorian-ironworks',
    name: 'Victorian Ironworks',
    trade: 'metalwork',
    specialty: ['Cast iron railings', 'Wrought iron gates', 'Balconies', 'Restoration'],
    description: 'Specialist in period ironwork restoration and reproduction. We can cast new components to match originals or fabricate bespoke designs in traditional styles.',
    experience: '22 years',
    location: 'South London',
    coverage: ['All London', 'Home Counties'],
    accreditations: ['NASC members', 'Guild of Master Craftsmen'],
    contact: {
      phone: '020 8XXX XXXX',
      email: 'info@victorianironworks.co.uk'
    },
    rating: 4.5,
    projectTypes: ['Railing restoration', 'Gate repair', 'Balcony restoration', 'New period ironwork'],
    verified: true
  },

  // PERIOD GLAZING
  {
    id: 'traditional-glass-studio',
    name: 'Traditional Glass Studio',
    trade: 'glazing',
    specialty: ['Leaded lights', 'Stained glass', 'Crown glass', 'Period glazing'],
    description: 'Studio specializing in leaded light restoration and reproduction. We can restore original panels or create new designs in authentic Arts & Crafts or Victorian styles.',
    experience: '18 years',
    location: 'West London',
    coverage: ['London', 'South East', 'Midlands'],
    accreditations: ['BSMGP members', 'ICON members'],
    contact: {
      phone: '020 8XXX XXXX',
      email: 'studio@traditionalglassstudio.co.uk',
      website: 'https://www.traditionalglassstudio.co.uk'
    },
    rating: 5,
    projectTypes: ['Leaded light restoration', 'New leaded lights', 'Stained glass repair', 'Period glass supply'],
    verified: true
  },

  // HERITAGE DECORATING
  {
    id: 'period-paint-specialists',
    name: 'Period Paint Specialists',
    trade: 'decorating',
    specialty: ['Limewash', 'Distemper', 'Oil-based paints', 'Gilding'],
    description: 'Traditional decorators using historic paint techniques including limewash, distemper, and traditional oil paints. We also undertake gilding and decorative painting.',
    experience: '25 years',
    location: 'Central London',
    coverage: ['Central and North London'],
    accreditations: ['PDA members', 'SPAB recommended'],
    contact: {
      phone: '020 7XXX XXXX',
      email: 'info@periodpaintspecialists.co.uk'
    },
    rating: 5,
    projectTypes: ['Historic paint analysis', 'Limewash application', 'Distemper work', 'Traditional decorating'],
    verified: true
  },

  // TRADITIONAL BRICKWORK
  {
    id: 'heritage-brickwork',
    name: 'Heritage Brickwork Ltd',
    trade: 'brickwork',
    specialty: ['Lime pointing', 'Brick repair', 'Tuck pointing', 'Brick cleaning'],
    description: 'Specialist brick restoration using traditional techniques. All pointing work in lime mortar to match original specifications. DOFF and TORC cleaning systems.',
    experience: '32 years',
    location: 'North London',
    coverage: ['London', 'Hertfordshire', 'Essex'],
    accreditations: ['FMB members', 'Historic England approved', 'TrustMark'],
    contact: {
      phone: '020 8XXX XXXX',
      email: 'info@heritagebrickwork.co.uk',
      website: 'https://www.heritagebrickwork.co.uk'
    },
    rating: 5,
    projectTypes: ['Lime repointing', 'Tuck pointing', 'Brick replacement', 'Facade cleaning'],
    verified: true
  }
];

interface HistoricTradesDirectoryProps {
  className?: string;
  tradeFilter?: string;
  limit?: number;
}

const HistoricTradesDirectory: React.FC<HistoricTradesDirectoryProps> = ({ 
  className = '',
  tradeFilter,
  limit 
}) => {
  const [selectedTrade, setSelectedTrade] = useState<string>(tradeFilter || 'all');
  const [selectedTradesperson, setSelectedTradesperson] = useState<Tradesperson | null>(null);

  const filteredTradespeople = selectedTrade === 'all'
    ? tradespeople
    : tradespeople.filter(t => t.trade === selectedTrade);

  const displayedTradespeople = limit ? filteredTradespeople.slice(0, limit) : filteredTradespeople;

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3 block">
          Historic Trades Directory
        </span>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">
          Craftspeople Who Understand Heritage
        </h3>
        <p className="text-lg text-hampstead-charcoal/70 max-w-2xl">
          Not all builders understand historic properties. These vetted craftspeople 
          specialize in traditional techniques essential for conservation area work.
        </p>
      </div>

      {/* Trade Filters */}
      {!tradeFilter && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedTrade('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTrade === 'all'
                ? 'bg-hampstead-black text-white'
                : 'bg-hampstead-cream hover:bg-hampstead-grey text-hampstead-charcoal'
            }`}
          >
            All Trades
          </button>
          {trades.map((trade) => (
            <button
              key={trade.id}
              onClick={() => setSelectedTrade(trade.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedTrade === trade.id
                  ? 'bg-hampstead-black text-white'
                  : 'bg-hampstead-cream hover:bg-hampstead-grey text-hampstead-charcoal'
              }`}
            >
              <span>{trade.icon}</span>
              {trade.name}
            </button>
          ))}
        </div>
      )}

      {/* Tradespeople List */}
      <div className="space-y-4">
        {displayedTradespeople.map((person, index) => {
          const trade = trades.find(t => t.id === person.trade);
          
          return (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-all"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{trade?.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-xl">{person.name}</h4>
                          {person.verified && (
                            <Shield className="w-4 h-4 text-green-700" />
                          )}
                        </div>
                        <p className="text-sm text-hampstead-charcoal/60">{trade?.name}</p>
                      </div>
                    </div>

                    <p className="text-hampstead-charcoal/70 mb-4 line-clamp-2">
                      {person.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {person.specialty.slice(0, 4).map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-hampstead-cream text-xs"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-hampstead-charcoal/60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {person.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {person.location}
                      </div>
                      {person.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          {person.rating}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact & Actions */}
                  <div className="flex flex-col gap-2 md:text-right">
                    {person.contact.phone && (
                      <a
                        href={`tel:${person.contact.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-sm hover:text-hampstead-charcoal/70 transition-colors md:justify-end"
                      >
                        <Phone className="w-4 h-4" />
                        {person.contact.phone}
                      </a>
                    )}
                    {person.contact.website && (
                      <a
                        href={person.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-hampstead-charcoal/70 transition-colors md:justify-end"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Website
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedTradesperson(person)}
                      className="mt-2 px-4 py-2 bg-hampstead-black text-white text-sm font-medium hover:bg-hampstead-charcoal transition-colors"
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Accreditations Bar */}
              <div className="px-6 py-3 bg-hampstead-cream border-t border-hampstead-grey">
                <div className="flex flex-wrap items-center gap-3 text-xs text-hampstead-charcoal/60">
                  <Award className="w-4 h-4" />
                  {person.accreditations.join(' • ')}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Link */}
      {limit && filteredTradespeople.length > limit && (
        <div className="mt-8 text-center">
          <Link
            href="/journal/archive/trades"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
          >
            View All Tradespeople
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-hampstead-cream border border-hampstead-grey text-sm text-hampstead-charcoal/70">
        <p>
          <strong>Note:</strong> The Hampstead Design Journal provides this directory as a resource for homeowners. 
          We recommend obtaining multiple quotes and verifying credentials before engaging any tradesperson. 
          Verified status indicates the tradesperson has demonstrated relevant experience to our team.
        </p>
      </div>

      {/* Tradesperson Detail Modal */}
      <AnimatePresence>
        {selectedTradesperson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTradesperson(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 bg-hampstead-black text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {trades.find(t => t.id === selectedTradesperson.trade)?.icon}
                    </span>
                    <div>
                      <h4 className="font-serif text-2xl">{selectedTradesperson.name}</h4>
                      <p className="text-sm text-white/70">
                        {trades.find(t => t.id === selectedTradesperson.trade)?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTradesperson(null)}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Description */}
                <p className="text-lg text-hampstead-charcoal/80 leading-relaxed mb-6">
                  {selectedTradesperson.description}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">Specialties</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedTradesperson.specialty.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-hampstead-cream text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Types */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">Typical Projects</h5>
                  <ul className="space-y-1">
                    {selectedTradesperson.projectTypes.map((type, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-hampstead-charcoal/70">
                        <span className="w-1.5 h-1.5 bg-hampstead-charcoal/30 rounded-full" />
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coverage */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">Coverage Area</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedTradesperson.coverage.map((area, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Accreditations */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">Accreditations</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedTradesperson.accreditations.map((acc, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-amber-100 text-amber-800 text-sm flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-hampstead-cream p-4 mb-6">
                  <h5 className="font-serif text-lg mb-3">Contact</h5>
                  <div className="space-y-2">
                    {selectedTradesperson.contact.phone && (
                      <a
                        href={`tel:${selectedTradesperson.contact.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-sm hover:text-hampstead-charcoal/70 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {selectedTradesperson.contact.phone}
                      </a>
                    )}
                    {selectedTradesperson.contact.email && (
                      <a
                        href={`mailto:${selectedTradesperson.contact.email}`}
                        className="flex items-center gap-2 text-sm hover:text-hampstead-charcoal/70 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {selectedTradesperson.contact.email}
                      </a>
                    )}
                    {selectedTradesperson.contact.website && (
                      <a
                        href={selectedTradesperson.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-hampstead-charcoal/70 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {selectedTradesperson.contact.website}
                      </a>
                    )}
                  </div>
                </div>

                {/* Request Intro */}
                <Link
                  href={`/journal/contact?subject=tradesperson-intro&tradesperson=${encodeURIComponent(selectedTradesperson.name)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                  onClick={() => setSelectedTradesperson(null)}
                >
                  Request Introduction
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoricTradesDirectory;
export { trades, tradespeople };
export type { Tradesperson };
