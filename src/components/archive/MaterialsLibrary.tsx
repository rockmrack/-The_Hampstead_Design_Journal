'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle,
  Package,
  MapPin,
  Ruler
} from 'lucide-react';

interface Material {
  id: string;
  name: string;
  category: 'brick' | 'mortar' | 'render' | 'timber' | 'stone' | 'roofing' | 'metalwork' | 'glass';
  era: string[];
  description: string;
  specifications: {
    size?: string;
    composition?: string;
    finish?: string;
    color?: string;
    patterns?: string;
    thickness?: string;
    cames?: string;
  };
  sources: {
    name: string;
    location: string;
    website?: string;
    note?: string;
  }[];
  conservationNotes: string;
  incompatibleWith: string[];
  image: string;
}

const materials: Material[] = [
  // BRICKS
  {
    id: 'imperial-red-rubber',
    name: 'Imperial Red Rubber Brick',
    category: 'brick',
    era: ['Late Victorian', 'Arts & Crafts', 'Edwardian'],
    description: 'The definitive brick of Arts & Crafts Hampstead. Hand-pressed soft red bricks with a characteristic "rubbed" surface finish, made from iron-rich clay of the Home Counties.',
    specifications: {
      size: '9" × 4½" × 3" (229 × 114 × 76mm)',
      composition: 'Iron-rich clay, soft-fired',
      finish: 'Rubbed/gauged or standard facing',
      color: 'Deep red to orange-red'
    },
    sources: [
      {
        name: 'H.G. Matthews',
        location: 'Chesham, Buckinghamshire',
        website: 'https://www.hgmatthews.com',
        note: 'Still produces hand-made bricks using traditional methods'
      },
      {
        name: 'Northcot Brick',
        location: 'Blockley, Gloucestershire',
        website: 'https://www.northcotbrick.co.uk',
        note: 'Good match for darker red Victorian bricks'
      },
      {
        name: 'Reclamation Yards',
        location: 'Various',
        note: 'LASSCO, Retrouvius, and local yards often have period stock'
      }
    ],
    conservationNotes: 'These bricks are softer than modern equivalents. They MUST be laid in lime mortar, never cement, to allow moisture movement. Modern metric bricks will not fit Victorian bond patterns.',
    incompatibleWith: ['Cement mortar', 'Hard engineering bricks', 'Metric bricks', 'Waterproof sealants'],
    image: '/images/archive/materials/imperial-red-brick.jpg'
  },
  {
    id: 'london-stock',
    name: 'London Stock Brick',
    category: 'brick',
    era: ['Georgian', 'Regency', 'Early Victorian'],
    description: 'The quintessential Georgian and early Victorian brick. Yellow to brown in color with characteristic dark patches from ash content. The standard brick of London building from 1700-1860.',
    specifications: {
      size: '9" × 4¼" × 2½" (early) to 9" × 4½" × 3" (later)',
      composition: 'Clay with ash and cinder inclusions',
      finish: 'Wirecut or hand-molded',
      color: 'Yellow-brown with darker patches'
    },
    sources: [
      {
        name: 'Michelmersh Brick Holdings',
        location: 'Hampshire',
        website: 'https://www.mbhplc.co.uk',
        note: 'Produces "London Stock" range matching historic colors'
      },
      {
        name: 'Reclaimed Stock',
        location: 'Various London demolitions',
        note: 'Best match for repairs - original bricks from same period'
      }
    ],
    conservationNotes: 'Original London stocks had variable size and color, giving facades their characteristic texture. Modern "London Stock" bricks are more uniform. For repairs, source reclaimed bricks from the same period.',
    incompatibleWith: ['Cement mortar', 'Hard modern bricks', 'Waterproof renders'],
    image: '/images/archive/materials/london-stock.jpg'
  },
  
  // MORTARS
  {
    id: 'lime-putty-mortar',
    name: 'Lime Putty Mortar',
    category: 'mortar',
    era: ['Georgian', 'Regency', 'Victorian', 'Edwardian'],
    description: 'Traditional non-hydraulic lime mortar made from slaked lime and sharp sand. The ONLY mortar suitable for historic brickwork in NW3. Allows buildings to "breathe" and move.',
    specifications: {
      composition: '1:3 ratio (lime putty to sharp sand)',
      finish: 'Flush, weatherstruck, or ribbon pointing',
      color: 'Varies: cream, warm buff, or pink depending on sand'
    },
    sources: [
      {
        name: 'Mike Wye & Associates',
        location: 'Devon',
        website: 'https://www.mikewye.co.uk',
        note: 'Excellent range of lime products and technical advice'
      },
      {
        name: 'Lime Green Products',
        location: 'Derbyshire',
        website: 'https://www.lime-green.co.uk',
        note: 'Hot lime mortars and traditional products'
      },
      {
        name: 'Ty-Mawr Lime',
        location: 'Wales',
        website: 'https://www.lime.org.uk',
        note: 'Full range of lime mortars and renders'
      }
    ],
    conservationNotes: 'Cement mortars cause catastrophic damage to soft historic bricks. The cement traps moisture inside the brick, causing "spalling" (face blowing off). Lime mortar is sacrificial - it degrades before the brick.',
    incompatibleWith: ['Cement', 'PVA additives', 'Waterproofers', 'Modern pointing tools'],
    image: '/images/archive/materials/lime-mortar.jpg'
  },
  {
    id: 'hydraulic-lime',
    name: 'Natural Hydraulic Lime (NHL)',
    category: 'mortar',
    era: ['Victorian', 'Edwardian'],
    description: 'Lime that sets through hydraulic action (chemical reaction with water) rather than carbonation. Faster setting than lime putty, used for below-ground work and exposed situations.',
    specifications: {
      composition: 'NHL 2, 3.5, or 5 with sharp sand',
      finish: 'As lime putty mortar',
      color: 'Typically cream to grey'
    },
    sources: [
      {
        name: 'St. Astier',
        location: 'France (UK distributors)',
        website: 'https://www.stastier.co.uk',
        note: 'Market-leading NHL products'
      },
      {
        name: 'Singleton Birch',
        location: 'Lincolnshire',
        website: 'https://www.singletonbirch.co.uk',
        note: 'UK-produced natural hydraulic lime'
      }
    ],
    conservationNotes: 'Use NHL 2 for most above-ground restoration work. NHL 3.5 for more exposed situations. NHL 5 is usually too strong for heritage applications.',
    incompatibleWith: ['Cement', 'Soft historic bricks (use lime putty instead)', 'Modern additives'],
    image: '/images/archive/materials/hydraulic-lime.jpg'
  },

  // RENDERS & STUCCO
  {
    id: 'lime-stucco',
    name: 'Lime Stucco',
    category: 'render',
    era: ['Georgian', 'Regency', 'Early Victorian'],
    description: 'The white or cream rendered finish of Belsize Park and Regency Hampstead. Originally made with lime putty, sand, and sometimes animal hair for reinforcement.',
    specifications: {
      composition: 'Lime putty, sharp sand, sometimes goat hair fiber',
      finish: 'Smooth troweled, often "ruled" to imitate ashlar',
      color: 'Traditional: off-white, cream, stone colors'
    },
    sources: [
      {
        name: 'Cornish Lime',
        location: 'Cornwall',
        website: 'https://www.cornishlime.co.uk',
        note: 'Specialist in lime stucco systems'
      },
      {
        name: 'Traditional lime plasterers',
        location: 'Various',
        note: 'Contact the Building Limes Forum for specialists'
      }
    ],
    conservationNotes: 'Victorian stucco CANNOT be patched with cement render. The different expansion rates cause the patch to crack and fall off, often taking original material with it. Full sections should be cut out and replaced in matching lime.',
    incompatibleWith: ['Cement render', 'Modern acrylic renders', 'Masonry paint (traps moisture)'],
    image: '/images/archive/materials/lime-stucco.jpg'
  },
  {
    id: 'roughcast-render',
    name: 'Roughcast/Pebbledash',
    category: 'render',
    era: ['Arts & Crafts', 'Edwardian'],
    description: 'Textured render with small stones or pebbles thrown into the wet surface. A signature finish of Arts & Crafts and Edwardian houses, originally in lime.',
    specifications: {
      composition: 'Lime render with spar chippings or pea shingle',
      finish: 'Rough textured with visible aggregate',
      color: 'Often left natural or limewashed'
    },
    sources: [
      {
        name: 'Specialist lime renderers',
        location: 'Various',
        note: 'Must be applied by experienced lime craftspeople'
      }
    ],
    conservationNotes: 'Modern cement pebbledash is visually and technically different from original lime roughcast. Repairs should be in lime-based materials. Never paint original lime roughcast with masonry paint.',
    incompatibleWith: ['Cement render', 'Masonry paint', 'Waterproof coatings'],
    image: '/images/archive/materials/roughcast.jpg'
  },

  // TIMBER
  {
    id: 'softwood-sash',
    name: 'Softwood Sash Windows',
    category: 'timber',
    era: ['Georgian', 'Victorian', 'Edwardian'],
    description: 'Traditional timber sash windows in Baltic pine (Scots Pine) or, more rarely, Douglas Fir. The slender glazing bars and weighted sash mechanism define Georgian and Victorian fenestration.',
    specifications: {
      composition: 'Slow-grown softwood, typically Baltic pine',
      finish: 'Traditional putty glazing, linseed oil paint',
      size: 'Glazing bars: 18-25mm (Georgian), 25-35mm (Victorian)'
    },
    sources: [
      {
        name: 'Ventrolla',
        location: 'National network',
        website: 'https://www.ventrolla.co.uk',
        note: 'Specialists in sash window restoration and draught-proofing'
      },
      {
        name: 'The Sash Window Workshop',
        location: 'London',
        website: 'https://www.sashwindow.com',
        note: 'Bespoke sash window manufacture to match originals'
      },
      {
        name: 'Mumford & Wood',
        location: 'Essex',
        website: 'https://www.mumfordwood.com',
        note: 'High-end timber windows with slim profiles'
      }
    ],
    conservationNotes: 'Original windows should be restored where possible, not replaced. Draught-proofing and secondary glazing offer thermal improvement without losing heritage value. Replacements must match original profiles EXACTLY.',
    incompatibleWith: ['UPVC', 'Wide modern glazing bars', 'Foam sealants', 'Modern acrylic paints'],
    image: '/images/archive/materials/sash-window.jpg'
  },
  {
    id: 'oak-timber-frame',
    name: 'Oak Structural Timber',
    category: 'timber',
    era: ['Tudor Revival', 'Arts & Crafts'],
    description: 'Structural oak framing and decorative half-timbering. Used in genuine structure and as decorative mock-Tudor applied to brick buildings.',
    specifications: {
      composition: 'European oak, green or seasoned',
      finish: 'Natural, oiled, or limewashed infill',
      size: 'Structural members typically 6" × 6" or larger'
    },
    sources: [
      {
        name: 'Vastern Timber',
        location: 'Wiltshire',
        website: 'https://www.vastern.co.uk',
        note: 'Sustainable British oak specialists'
      },
      {
        name: 'English Oak Buildings',
        location: 'Various',
        note: 'Traditional oak framing specialists'
      }
    ],
    conservationNotes: 'Decorative half-timbering is often applied to brick and should not be confused with true timber frame. Repairs should use green oak which will season in situ, matching original movement patterns.',
    incompatibleWith: ['Kiln-dried timber (will not move naturally)', 'Modern preservatives', 'Cement render infill'],
    image: '/images/archive/materials/oak-timber.jpg'
  },

  // STONE
  {
    id: 'portland-stone',
    name: 'Portland Stone',
    category: 'stone',
    era: ['Georgian', 'Victorian', 'Edwardian'],
    description: 'The quintessential English building stone, from the Isle of Portland. Used for door surrounds, window heads, quoins, and decorative elements throughout NW3.',
    specifications: {
      composition: 'Oolitic limestone',
      finish: 'Ashlar (smooth), rubbed, carved',
      color: 'Cream-white, weathers to silver-grey'
    },
    sources: [
      {
        name: 'Albion Stone',
        location: 'Isle of Portland',
        website: 'https://www.albionstone.com',
        note: 'Working Portland quarries, various beds available'
      },
      {
        name: 'Purbeck Stone',
        location: 'Dorset',
        note: 'Alternative for some applications'
      }
    ],
    conservationNotes: 'Portland stone should never be cleaned with abrasive methods. Use DOFF superheated steam or nebulous water spray. Repairs require specialist stone conservation, not general building work.',
    incompatibleWith: ['Sandblasting', 'Acid cleaning', 'Cement repairs', 'Sealants'],
    image: '/images/archive/materials/portland-stone.jpg'
  },

  // ROOFING
  {
    id: 'welsh-slate',
    name: 'Welsh Slate',
    category: 'roofing',
    era: ['Georgian', 'Regency', 'Victorian'],
    description: 'Blue-grey slate from the quarries of North Wales, the default roofing material for London from the Georgian period through to the late Victorian era.',
    specifications: {
      size: 'Various: Countess, Duchess, Queens, etc.',
      composition: 'Metamorphic rock',
      finish: 'Riven natural surface',
      color: 'Blue-grey, sometimes with purple undertones'
    },
    sources: [
      {
        name: 'Welsh Slate',
        location: 'Penrhyn, North Wales',
        website: 'https://www.welshslate.com',
        note: 'Genuine Welsh slate from working quarries'
      },
      {
        name: 'Reclaimed Welsh slate',
        location: 'Various',
        note: 'Best visual match for repairs to existing roofs'
      }
    ],
    conservationNotes: 'Spanish and Chinese slates are NOT visually compatible with Welsh slate. They have different textures, thicknesses, and weathering characteristics. Always use genuine Welsh or reclaimed for Conservation Area repairs.',
    incompatibleWith: ['Spanish slate', 'Chinese slate', 'Artificial slate', 'Cement bedding on ridges'],
    image: '/images/archive/materials/welsh-slate.jpg'
  },
  {
    id: 'handmade-clay-tiles',
    name: 'Hand-Made Clay Tiles',
    category: 'roofing',
    era: ['Arts & Crafts', 'Edwardian'],
    description: 'Traditional hand-made clay roof tiles with natural variation in color and slight camber. The signature roofing of Arts & Crafts Hampstead.',
    specifications: {
      size: '10½" × 6½" plain tiles typically',
      composition: 'Local clay, hand-made',
      finish: 'Natural variation, slight camber',
      color: 'Orange-red to dark red, natural variation'
    },
    sources: [
      {
        name: 'Keymer Tiles',
        location: 'West Sussex',
        website: 'https://www.keymer.co.uk',
        note: 'The best-known hand-made tile manufacturer'
      },
      {
        name: 'Aldershaw Handmade Tiles',
        location: 'Kent',
        website: 'https://www.aldershaw.co.uk',
        note: 'Traditional Wealden tiles'
      },
      {
        name: 'Dreadnought Tiles',
        location: 'Staffordshire',
        website: 'https://www.dreadnought-tiles.co.uk',
        note: 'Good range of heritage tiles'
      }
    ],
    conservationNotes: 'Machine-made and concrete tiles are visually incompatible and will likely be refused in Conservation Areas. The subtle variation of hand-made tiles is essential to the character of Arts & Crafts roofscapes.',
    incompatibleWith: ['Machine-made tiles', 'Concrete tiles', 'Interlocking tiles'],
    image: '/images/archive/materials/clay-tiles.jpg'
  },

  // METALWORK
  {
    id: 'cast-iron-railings',
    name: 'Cast Iron Railings',
    category: 'metalwork',
    era: ['Georgian', 'Regency', 'Victorian'],
    description: 'Decorative cast iron railings and balconies, typically featuring classical or geometric patterns. Essential to the character of Georgian and Victorian streetscapes.',
    specifications: {
      composition: 'Grey cast iron',
      finish: 'Originally lead paint, now specialist iron paint',
      patterns: 'Period-specific: spearhead (Georgian), Gothic (Victorian), etc.'
    },
    sources: [
      {
        name: 'Lost Art Ltd',
        location: 'London',
        website: 'https://www.lost-art.co.uk',
        note: 'Specialists in period ironwork restoration and reproduction'
      },
      {
        name: 'Britannia Architectural',
        location: 'Yorkshire',
        note: 'Cast iron components and full assemblies'
      },
      {
        name: 'Architectural salvage',
        location: 'Various',
        note: 'For matching existing period patterns'
      }
    ],
    conservationNotes: 'Original ironwork should be retained and restored where possible. Repairs require specialist blacksmith work. Modern mild steel is not suitable for repairs to cast iron. Paint must be specialist formulations for iron.',
    incompatibleWith: ['Mild steel repairs', 'Welding to cast iron', 'Modern domestic paints'],
    image: '/images/archive/materials/cast-iron-railings.jpg'
  },

  // GLASS
  {
    id: 'crown-glass',
    name: 'Crown Glass',
    category: 'glass',
    era: ['Georgian'],
    description: 'Hand-blown glass with characteristic subtle distortions and variations. The slight waviness catches light differently from modern float glass, giving Georgian windows their unique character.',
    specifications: {
      composition: 'Hand-blown glass',
      finish: 'Natural variations, slight waviness',
      thickness: '2-3mm typically'
    },
    sources: [
      {
        name: 'Lamberts Glass',
        location: 'Germany',
        website: 'https://www.lamberts.de',
        note: 'High-quality mouth-blown restoration glass'
      },
      {
        name: 'The Glass Merchant',
        location: 'UK',
        note: 'Suppliers of heritage glass products'
      }
    ],
    conservationNotes: 'Original crown glass should be retained wherever possible. When replacement is necessary, use high-quality mouth-blown restoration glass to maintain character. Float glass is visually flat and lifeless by comparison.',
    incompatibleWith: ['Float glass', 'Toughened glass', 'Double glazing in original frames'],
    image: '/images/archive/materials/crown-glass.jpg'
  },
  {
    id: 'leaded-lights',
    name: 'Leaded Light Glazing',
    category: 'glass',
    era: ['Arts & Crafts', 'Edwardian'],
    description: 'Small panes of glass joined with lead cames (H-section lead strips). Characteristic of Arts & Crafts windows, often in geometric or nature-inspired patterns.',
    specifications: {
      composition: 'Clear, textured, or colored glass in lead cames',
      finish: 'Diamond, square, or bespoke patterns',
      cames: 'H-section lead, typically 6-8mm'
    },
    sources: [
      {
        name: 'Chapel Studios',
        location: 'Various UK locations',
        website: 'https://www.chapelstudios.co.uk',
        note: 'Leaded light restoration and reproduction'
      },
      {
        name: 'Specialist stained glass studios',
        location: 'Various',
        note: 'Look for studios experienced with domestic Arts & Crafts work'
      }
    ],
    conservationNotes: 'Leaded lights can usually be restored rather than replaced. The lead can be releaded using original glass. New panels should match original came profiles and patterns exactly.',
    incompatibleWith: ['Modern double-glazed sealed units', 'Zinc cames (for restoration)', 'Inappropriate patterns'],
    image: '/images/archive/materials/leaded-lights.jpg'
  }
];

const categoryLabels: Record<Material['category'], string> = {
  brick: 'Bricks',
  mortar: 'Mortars',
  render: 'Renders & Stucco',
  timber: 'Timber',
  stone: 'Stone',
  roofing: 'Roofing',
  metalwork: 'Metalwork',
  glass: 'Glass'
};

const categoryColors: Record<Material['category'], string> = {
  brick: 'bg-red-800',
  mortar: 'bg-amber-700',
  render: 'bg-stone-600',
  timber: 'bg-amber-900',
  stone: 'bg-gray-500',
  roofing: 'bg-slate-700',
  metalwork: 'bg-zinc-800',
  glass: 'bg-sky-700'
};

interface MaterialsLibraryProps {
  className?: string;
  category?: Material['category'];
  limit?: number;
}

const MaterialsLibrary: React.FC<MaterialsLibraryProps> = ({ 
  className = '',
  category,
  limit 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Material['category'] | 'all'>(category || 'all');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const categories = Array.from(new Set(materials.map(m => m.category)));
  
  const filteredMaterials = selectedCategory === 'all' 
    ? materials 
    : materials.filter(m => m.category === selectedCategory);

  const displayedMaterials = limit ? filteredMaterials.slice(0, limit) : filteredMaterials;

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3 block">
          Heritage Materials Library
        </span>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">
          The Authentic Materials of NW3
        </h3>
        <p className="text-lg text-hampstead-charcoal/70 max-w-2xl">
          Using the wrong materials will damage your heritage property. This library documents 
          the authentic materials used across Hampstead, with sourcing information for restoration.
        </p>
      </div>

      {/* Category Filters */}
      {!category && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-hampstead-black text-white'
                : 'bg-hampstead-cream hover:bg-hampstead-grey text-hampstead-charcoal'
            }`}
          >
            All Materials
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-hampstead-black text-white'
                  : 'bg-hampstead-cream hover:bg-hampstead-grey text-hampstead-charcoal'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      )}

      {/* Materials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMaterials.map((material, index) => (
          <motion.button
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            onClick={() => setSelectedMaterial(material)}
            className="text-left bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-all group"
          >
            {/* Material Visual */}
            <div className="aspect-[3/2] bg-hampstead-cream relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-12 h-12 text-hampstead-charcoal/20" />
              </div>
              <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white ${categoryColors[material.category]}`}>
                {categoryLabels[material.category]}
              </div>
            </div>

            {/* Material Info */}
            <div className="p-5">
              <div className="text-xs text-hampstead-charcoal/50 mb-1">
                {material.era.join(' • ')}
              </div>
              <h4 className="font-serif text-lg mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                {material.name}
              </h4>
              <p className="text-sm text-hampstead-charcoal/70 line-clamp-2">
                {material.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm font-medium">
                <Ruler className="w-4 h-4" />
                View Specifications
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* View All Link */}
      {limit && filteredMaterials.length > limit && (
        <div className="mt-8 text-center">
          <Link
            href="/journal/archive/materials"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
          >
            View Full Materials Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Material Detail Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMaterial(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className={`p-6 text-white ${categoryColors[selectedMaterial.category]}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest opacity-80">
                    {categoryLabels[selectedMaterial.category]}
                  </span>
                  <button
                    onClick={() => setSelectedMaterial(null)}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h4 className="font-serif text-2xl md:text-3xl mt-2">{selectedMaterial.name}</h4>
                <p className="text-sm opacity-80 mt-1">{selectedMaterial.era.join(' • ')}</p>
              </div>

              <div className="p-6">
                {/* Description */}
                <p className="text-lg text-hampstead-charcoal/80 leading-relaxed mb-6">
                  {selectedMaterial.description}
                </p>

                {/* Specifications */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">Specifications</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedMaterial.specifications).map(([key, value]) => (
                      value && (
                        <div key={key} className="bg-hampstead-cream p-3">
                          <span className="text-xs text-hampstead-charcoal/50 uppercase tracking-wide">
                            {key}
                          </span>
                          <p className="text-sm font-medium mt-1">{value}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Conservation Notes */}
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-amber-900 mb-1">Conservation Notes</h5>
                      <p className="text-sm text-amber-800">
                        {selectedMaterial.conservationNotes}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Incompatible With */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">Incompatible With</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedMaterial.incompatibleWith.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-red-100 text-red-800 text-sm"
                      >
                        ✗ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sources */}
                <div>
                  <h5 className="font-serif text-lg mb-3">Where to Source</h5>
                  <div className="space-y-3">
                    {selectedMaterial.sources.map((source, i) => (
                      <div key={i} className="flex items-start justify-between p-4 bg-hampstead-cream">
                        <div>
                          <div className="font-medium">{source.name}</div>
                          <div className="flex items-center gap-2 text-sm text-hampstead-charcoal/60 mt-1">
                            <MapPin className="w-3 h-3" />
                            {source.location}
                          </div>
                          {source.note && (
                            <p className="text-sm text-hampstead-charcoal/70 mt-2">
                              {source.note}
                            </p>
                          )}
                        </div>
                        {source.website && (
                          <a
                            href={source.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-hampstead-charcoal hover:text-hampstead-charcoal/70 transition-colors"
                          >
                            Visit
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-hampstead-grey">
                  <Link
                    href={`/journal/contact?subject=material-enquiry&material=${encodeURIComponent(selectedMaterial.name)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                    onClick={() => setSelectedMaterial(null)}
                  >
                    Enquire About This Material
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MaterialsLibrary;
export { materials, categoryLabels };
export type { Material };
