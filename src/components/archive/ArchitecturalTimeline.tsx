'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Building, Paintbrush, Users } from 'lucide-react';

interface ArchitecturalEra {
  id: string;
  name: string;
  period: string;
  startYear: number;
  endYear: number;
  description: string;
  characteristics: string[];
  materials: string[];
  keyArchitects: string[];
  streetExamples: { name: string; slug: string }[];
  image: string;
  color: string;
}

const architecturalEras: ArchitecturalEra[] = [
  {
    id: 'georgian',
    name: 'Georgian',
    period: '1714-1830',
    startYear: 1714,
    endYear: 1830,
    description: 'The Georgian era brought classical proportions and elegant simplicity to Hampstead. These properties, built during the spa town period, feature symmetrical facades, sash windows with slim glazing bars, and refined decorative details drawn from ancient Greece and Rome.',
    characteristics: [
      'Symmetrical facades with balanced proportions',
      'Tall sash windows with slender glazing bars (6-over-6)',
      'Crown glass with characteristic slight waviness',
      'Fanlight windows above entrance doors',
      'Decorative door cases with columns or pilasters',
      'Simple cornices and string courses',
      'Red brick or stucco facades',
      'Slate or clay tile roofs with low pitch'
    ],
    materials: [
      'Handmade red brick (soft-fired)',
      'Lime mortar (non-hydraulic)',
      'Lime stucco and render',
      'Crown glass',
      'Welsh slate',
      'Portland stone for details',
      'Cast iron railings',
      'Lead for roofing details'
    ],
    keyArchitects: [
      'Unknown local builders',
      'Influenced by Palladio and Inigo Jones'
    ],
    streetExamples: [
      { name: 'Well Walk', slug: 'well-walk' },
      { name: 'Flask Walk', slug: 'flask-walk' },
      { name: 'Church Row', slug: 'church-row' },
      { name: 'Holly Walk', slug: 'holly-walk' }
    ],
    image: '/images/archive/eras/georgian.jpg',
    color: '#8B7355'
  },
  {
    id: 'regency',
    name: 'Regency',
    period: '1811-1830',
    startYear: 1811,
    endYear: 1830,
    description: 'A refined period of elegant stucco villas and terraces. The Regency style brought lighter, more decorative architecture to Hampstead, with curved bay windows, delicate ironwork balconies, and the characteristic white or cream painted stucco that still defines parts of NW3.',
    characteristics: [
      'White or cream painted stucco facades',
      'Curved bow windows',
      'Delicate wrought iron balconies',
      'Shallow pitched roofs behind parapets',
      'French windows opening onto balconies',
      'Elegant fanlights and sidelights',
      'Reeded or fluted door surrounds',
      'First floor piano nobile elevation'
    ],
    materials: [
      'Brick with stucco render',
      'Roman cement (Parker\'s cement)',
      'Wrought iron for balconies',
      'Large pane glass',
      'Welsh slate',
      'Coade stone ornaments',
      'Timber sash windows',
      'Lead-coated copper for roof details'
    ],
    keyArchitects: [
      'John Nash (influence)',
      'Local speculative builders'
    ],
    streetExamples: [
      { name: 'Downshire Hill', slug: 'downshire-hill' },
      { name: 'Keats Grove', slug: 'keats-grove' },
      { name: 'South End Road', slug: 'south-end-road' }
    ],
    image: '/images/archive/eras/regency.jpg',
    color: '#D4C4A8'
  },
  {
    id: 'early-victorian',
    name: 'Early Victorian',
    period: '1837-1860',
    startYear: 1837,
    endYear: 1860,
    description: 'The early Victorian period saw Hampstead expand rapidly with grand villas and terraces. This era combined Georgian restraint with emerging Victorian ornamentation, featuring Italianate influences, larger windows, and more elaborate decorative schemes.',
    characteristics: [
      'Italianate architectural influences',
      'Yellow London stock brick or stucco',
      'Elaborate stucco window surrounds',
      'Bay windows (canted or curved)',
      'Ornate cast iron railings and balconies',
      'Bracketed eaves cornices',
      'Decorative porticos and porches',
      'Taller ceiling heights than Georgian'
    ],
    materials: [
      'Yellow London stock brick',
      'Portland cement stucco',
      'Cast iron (railings, columns)',
      'Plate glass (larger panes)',
      'Welsh slate',
      'Encaustic floor tiles',
      'Mahogany joinery',
      'Marble fireplaces'
    ],
    keyArchitects: [
      'Speculative builders',
      'Estate architects'
    ],
    streetExamples: [
      { name: 'Belsize Park', slug: 'belsize-park' },
      { name: 'Belsize Square', slug: 'belsize-square' },
      { name: 'Eton Avenue', slug: 'eton-avenue' }
    ],
    image: '/images/archive/eras/early-victorian.jpg',
    color: '#C4A35A'
  },
  {
    id: 'high-victorian',
    name: 'High Victorian',
    period: '1860-1880',
    startYear: 1860,
    endYear: 1880,
    description: 'The High Victorian era brought exuberant decoration and Gothic Revival influences to Hampstead. Properties from this period feature polychromatic brickwork, elaborate terra cotta ornament, and rich interior detailing with heavily moulded cornices and ornate ceiling roses.',
    characteristics: [
      'Polychromatic brickwork patterns',
      'Gothic Revival pointed arches',
      'Elaborate terra cotta decoration',
      'Heavy ornamental cornices',
      'Decorative ridge tiles and finials',
      'Stained glass in hallway windows',
      'Complex rooflines with dormers',
      'Encaustic tile entrance halls'
    ],
    materials: [
      'Red and yellow brick in patterns',
      'Terra cotta ornamental panels',
      'Decorative ridge tiles',
      'Stained and painted glass',
      'Minton encaustic tiles',
      'Carved stone window heads',
      'Ornamental cast iron',
      'Pitch pine joinery'
    ],
    keyArchitects: [
      'George Gilbert Scott (influence)',
      'Various local practices'
    ],
    streetExamples: [
      { name: 'Fitzjohns Avenue', slug: 'fitzjohns-avenue' },
      { name: 'Arkwright Road', slug: 'arkwright-road' },
      { name: 'Lyndhurst Road', slug: 'lyndhurst-road' }
    ],
    image: '/images/archive/eras/high-victorian.jpg',
    color: '#8B4513'
  },
  {
    id: 'late-victorian',
    name: 'Late Victorian',
    period: '1880-1901',
    startYear: 1880,
    endYear: 1901,
    description: 'The late Victorian period introduced Queen Anne Revival and early Arts & Crafts influences. Red brick returned to prominence, with Dutch gables, terracotta panels, and a move towards more honest expression of materials and construction.',
    characteristics: [
      'Queen Anne Revival style',
      'Deep red "rubbed" facing brick',
      'Dutch and Flemish gables',
      'Terra cotta panels and string courses',
      'Oriel and bay windows',
      'Decorative tile hanging',
      'Tall chimneys as design features',
      'Leaded light windows'
    ],
    materials: [
      'Red rubber facing brick',
      'Moulded and carved terra cotta',
      'Timber casement windows',
      'Leaded light glazing',
      'Hand-made clay roof tiles',
      'Decorative tile hanging',
      'Ornamental plasterwork',
      'Art tiles for fireplaces'
    ],
    keyArchitects: [
      'Norman Shaw (influence)',
      'Ernest George',
      'Batterbury & Huxley'
    ],
    streetExamples: [
      { name: 'Redington Road', slug: 'redington-road' },
      { name: 'Frognal', slug: 'frognal' },
      { name: 'Platts Lane', slug: 'platts-lane' }
    ],
    image: '/images/archive/eras/late-victorian.jpg',
    color: '#A52A2A'
  },
  {
    id: 'arts-crafts',
    name: 'Arts & Crafts',
    period: '1890-1914',
    startYear: 1890,
    endYear: 1914,
    description: 'The Arts & Crafts movement brought a philosophy of honest craftsmanship and truth to materials. Hampstead became a center for this movement, with architect-designed houses featuring handcrafted details, vernacular influences, and integration with nature.',
    characteristics: [
      'Handcrafted details throughout',
      'Vernacular building forms',
      'Integration with garden settings',
      'Roughcast or pebbledash render',
      'Deep roof overhangs with exposed rafters',
      'Inglenook fireplaces',
      'Built-in furniture and joinery',
      'Simple geometric decorative patterns'
    ],
    materials: [
      'Local brick and stone',
      'Roughcast lime render',
      'Hand-made clay tiles',
      'Oak timber framing',
      'Hand-forged ironwork',
      'Art pottery tiles',
      'Leaded light windows',
      'Hand-planed timber'
    ],
    keyArchitects: [
      'C.F.A. Voysey',
      'M.H. Baillie Scott',
      'Parker & Unwin',
      'Charles Harrison Townsend'
    ],
    streetExamples: [
      { name: 'Hampstead Garden Suburb', slug: 'hampstead-garden-suburb' },
      { name: 'Wildwood Road', slug: 'wildwood-road' },
      { name: 'Templewood Avenue', slug: 'templewood-avenue' }
    ],
    image: '/images/archive/eras/arts-crafts.jpg',
    color: '#556B2F'
  },
  {
    id: 'edwardian',
    name: 'Edwardian',
    period: '1901-1914',
    startYear: 1901,
    endYear: 1914,
    description: 'The Edwardian era brought lighter, airier homes with larger windows and a blend of Arts & Crafts and classical influences. Bay windows, verandahs, and generous gardens characterize this optimistic pre-war period of house building.',
    characteristics: [
      'Larger windows for more light',
      'Wide entrance halls',
      'Mock Tudor half-timbering',
      'Bay windows on multiple floors',
      'Covered porches and verandahs',
      'Generous ceiling heights',
      'Picture rails and dado rails',
      'Parquet flooring in reception rooms'
    ],
    materials: [
      'Red brick with stone dressings',
      'Pebbledash render',
      'Timber framing (decorative)',
      'Clay roof tiles',
      'Leaded light and clear glass mix',
      'Oak and mahogany joinery',
      'Terrazzo and mosaic floors',
      'Decorative plasterwork'
    ],
    keyArchitects: [
      'Edwin Lutyens (influence)',
      'Parker & Unwin',
      'Michael Bunney'
    ],
    streetExamples: [
      { name: 'The Bishops Avenue', slug: 'the-bishops-avenue' },
      { name: 'Winnington Road', slug: 'winnington-road' },
      { name: 'Meadway', slug: 'meadway' }
    ],
    image: '/images/archive/eras/edwardian.jpg',
    color: '#CD853F'
  },
  {
    id: 'inter-war',
    name: 'Inter-War',
    period: '1918-1939',
    startYear: 1918,
    endYear: 1939,
    description: 'The Inter-War period brought diverse styles from Neo-Georgian to Art Deco and early Modernism. Hampstead embraced the Modern Movement, with pioneering concrete and steel-framed houses by émigré architects alongside more traditional suburban developments.',
    characteristics: [
      'Neo-Georgian revival homes',
      'Art Deco geometric ornament',
      'Early Modern flat roofs and white render',
      'Crittall steel windows',
      'Sun trap windows and balconies',
      'Garage provision as standard',
      'Smaller room sizes',
      'More compact gardens'
    ],
    materials: [
      'Fletton brick',
      'Cement render',
      'Crittall steel windows',
      'Concrete (structural)',
      'Interlocking roof tiles',
      'Vitrolite and chrome',
      'Parquet flooring',
      'Plywood and veneers'
    ],
    keyArchitects: [
      'Ernst Goldfinger',
      'Berthold Lubetkin',
      'Connell, Ward & Lucas',
      'Oliver Hill'
    ],
    streetExamples: [
      { name: 'Willow Road', slug: 'willow-road' },
      { name: 'Lawn Road (Isokon)', slug: 'lawn-road' },
      { name: 'Frognal Close', slug: 'frognal-close' }
    ],
    image: '/images/archive/eras/inter-war.jpg',
    color: '#4A4A4A'
  },
  {
    id: 'post-war',
    name: 'Post-War Modern',
    period: '1945-1970',
    startYear: 1945,
    endYear: 1970,
    description: 'Post-war Hampstead saw infill development with a mix of contextual and boldly Modern architecture. Listed building protection began in this era, alongside new purpose-built flats and some notable Brutalist interventions.',
    characteristics: [
      'Large picture windows',
      'Open plan interiors',
      'Flat or shallow pitched roofs',
      'Exposed concrete and brick',
      'Built-in furniture',
      'Carports and integral garages',
      'Split-level designs',
      'Integration with landscape'
    ],
    materials: [
      'Stock brick',
      'Exposed concrete',
      'Large format glass',
      'Timber cladding',
      'Copper roofing',
      'Thermoplastic flooring',
      'Steel structural frames',
      'Cork and vinyl finishes'
    ],
    keyArchitects: [
      'Howell, Killick, Partridge & Amis',
      'Patrick Gwynne',
      'Trevor Dannatt',
      'Erno Goldfinger'
    ],
    streetExamples: [
      { name: 'South Hill Park', slug: 'south-hill-park' },
      { name: 'Branch Hill', slug: 'branch-hill' }
    ],
    image: '/images/archive/eras/post-war.jpg',
    color: '#607D8B'
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    period: '1990-Present',
    startYear: 1990,
    endYear: 2025,
    description: 'Contemporary architecture in Hampstead navigates strict planning constraints with innovative design. New builds must respect conservation area character while modern basement extensions have transformed living spaces. Sustainable technologies are increasingly integrated.',
    characteristics: [
      'Contextual design responding to neighbors',
      'Large basement extensions',
      'High-performance glazing',
      'Sustainable technologies',
      'Smart home integration',
      'Indoor-outdoor living',
      'Natural material palettes',
      'Minimal detailing'
    ],
    materials: [
      'Brick to match context',
      'Zinc and copper cladding',
      'Triple-glazed windows',
      'Engineered timber',
      'Natural stone',
      'Photovoltaic panels',
      'Green roof systems',
      'Polished concrete'
    ],
    keyArchitects: [
      'Michaelis Boyd',
      'Alison Brooks',
      'Eldridge Smerin',
      'DSDHA'
    ],
    streetExamples: [
      { name: 'Various infill sites', slug: '' }
    ],
    image: '/images/archive/eras/contemporary.jpg',
    color: '#1A1A1A'
  }
];

interface ArchitecturalTimelineProps {
  className?: string;
  compact?: boolean;
}

const ArchitecturalTimeline: React.FC<ArchitecturalTimelineProps> = ({ 
  className = '',
  compact = false 
}) => {
  const [selectedEra, setSelectedEra] = useState<ArchitecturalEra>(architecturalEras[5]); // Default to Arts & Crafts
  const [hoveredEra, setHoveredEra] = useState<string | null>(null);

  const timelineStart = 1700;
  const timelineEnd = 2030;
  const timelineRange = timelineEnd - timelineStart;

  const getPosition = (year: number) => {
    return ((year - timelineStart) / timelineRange) * 100;
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3 block">
          Architectural Timeline
        </span>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">
          300 Years of NW3 Architecture
        </h3>
        <p className="text-lg text-hampstead-charcoal/70 max-w-2xl">
          From Georgian spa town elegance to contemporary innovation, explore the architectural 
          evolution of Hampstead through the ages.
        </p>
      </div>

      {/* Timeline Bar */}
      <div className="relative mb-8">
        {/* Background Track */}
        <div className="h-16 bg-hampstead-cream border border-hampstead-grey relative overflow-hidden">
          {/* Era Blocks */}
          {architecturalEras.map((era) => {
            const left = getPosition(era.startYear);
            const width = getPosition(era.endYear) - left;
            const isSelected = selectedEra.id === era.id;
            const isHovered = hoveredEra === era.id;

            return (
              <motion.button
                key={era.id}
                className="absolute h-full transition-all cursor-pointer"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: era.color,
                  opacity: isSelected ? 1 : isHovered ? 0.9 : 0.6,
                }}
                onClick={() => setSelectedEra(era)}
                onMouseEnter={() => setHoveredEra(era.id)}
                onMouseLeave={() => setHoveredEra(null)}
                whileHover={{ scale: 1.02 }}
                animate={{ 
                  y: isSelected ? -4 : 0,
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                {/* Era Label (visible on larger eras) */}
                {width > 8 && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium uppercase tracking-wide opacity-90">
                    {era.name}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Year Markers */}
        <div className="relative h-6 mt-2">
          {[1750, 1800, 1850, 1900, 1950, 2000].map((year) => (
            <div
              key={year}
              className="absolute transform -translate-x-1/2 text-xs text-hampstead-charcoal/50"
              style={{ left: `${getPosition(year)}%` }}
            >
              {year}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Era Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEra.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-hampstead-grey"
        >
          {/* Era Header */}
          <div 
            className="p-6 md:p-8 text-white"
            style={{ backgroundColor: selectedEra.color }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 opacity-80" />
              <span className="text-sm uppercase tracking-widest opacity-80">
                {selectedEra.period}
              </span>
            </div>
            <h4 className="font-serif text-3xl md:text-4xl">
              {selectedEra.name} Era
            </h4>
          </div>

          <div className="p-6 md:p-8">
            {/* Description */}
            <p className="text-lg text-hampstead-charcoal/80 leading-relaxed mb-8">
              {selectedEra.description}
            </p>

            {!compact && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Characteristics */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="w-5 h-5 text-hampstead-charcoal/50" />
                    <h5 className="font-serif text-xl">Key Characteristics</h5>
                  </div>
                  <ul className="space-y-2">
                    {selectedEra.characteristics.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/70">
                        <span className="w-1.5 h-1.5 bg-hampstead-charcoal/30 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Paintbrush className="w-5 h-5 text-hampstead-charcoal/50" />
                    <h5 className="font-serif text-xl">Materials & Techniques</h5>
                  </div>
                  <ul className="space-y-2">
                    {selectedEra.materials.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/70">
                        <span className="w-1.5 h-1.5 bg-hampstead-charcoal/30 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Architects & Streets */}
            {!compact && (
              <div className="mt-8 pt-8 border-t border-hampstead-grey grid md:grid-cols-2 gap-8">
                {/* Key Architects */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-hampstead-charcoal/50" />
                    <h5 className="font-serif text-xl">Key Architects</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEra.keyArchitects.map((architect, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-hampstead-cream text-sm"
                      >
                        {architect}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Street Examples */}
                <div>
                  <h5 className="font-serif text-xl mb-4">Explore {selectedEra.name} Streets</h5>
                  <div className="space-y-2">
                    {selectedEra.streetExamples.filter(s => s.slug).map((street, i) => (
                      <Link
                        key={i}
                        href={`/archive/${street.slug}`}
                        className="flex items-center justify-between group py-2 border-b border-hampstead-grey/50 last:border-0"
                      >
                        <span className="group-hover:text-hampstead-charcoal/70 transition-colors">
                          {street.name}
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {compact && (
              <Link
                href={`/archive/timeline#${selectedEra.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-hampstead-charcoal/70 transition-colors"
              >
                Explore {selectedEra.name} architecture
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Era Quick Navigation */}
      <div className="mt-6 flex flex-wrap gap-2">
        {architecturalEras.map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era)}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
              selectedEra.id === era.id
                ? 'bg-hampstead-black text-white'
                : 'bg-hampstead-cream hover:bg-hampstead-grey text-hampstead-charcoal'
            }`}
          >
            {era.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArchitecturalTimeline;
export { architecturalEras };
export type { ArchitecturalEra };
