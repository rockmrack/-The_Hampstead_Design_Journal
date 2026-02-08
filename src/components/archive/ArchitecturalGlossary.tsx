'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, BookOpen, ArrowRight, ExternalLink } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  category: 'structural' | 'decorative' | 'materials' | 'windows' | 'roofing' | 'planning' | 'styles';
  definition: string;
  extendedDefinition?: string;
  relatedTerms?: string[];
  image?: string;
  seeAlso?: string[];
  localContext?: string; // Specific to Hampstead/NW3
}

const glossaryTerms: GlossaryTerm[] = [
  // STRUCTURAL TERMS
  {
    id: 'ashlar',
    term: 'Ashlar',
    category: 'structural',
    definition: 'Finely dressed stone blocks with precise edges, laid in regular courses with thin joints.',
    extendedDefinition: 'Ashlar masonry represents the highest quality of stone construction, with blocks cut to exact dimensions. In Hampstead, ashlar is typically seen in Portland stone porticos and window surrounds on Georgian and Victorian properties.',
    relatedTerms: ['Quoin', 'Portland Stone', 'Coursed Rubble'],
    localContext: 'Often seen on Belsize Park and Hampstead Hill properties for entrance surrounds and ground floor facing.'
  },
  {
    id: 'bond',
    term: 'Bond (Brickwork)',
    category: 'structural',
    definition: 'The pattern in which bricks are laid, with different bonds providing different structural and aesthetic effects.',
    extendedDefinition: 'Common bonds in Hampstead include Flemish bond (alternating headers and stretchers in each course, typical of Georgian and Victorian), English bond (alternating courses of headers and stretchers, seen in foundations), and stretcher bond (all stretchers, seen in cavity walls from 1920s onwards).',
    relatedTerms: ['Flemish Bond', 'English Bond', 'Header', 'Stretcher'],
    localContext: 'Georgian properties in Church Row show fine Flemish bond; Arts & Crafts houses often use English bond.'
  },
  {
    id: 'quoin',
    term: 'Quoin',
    category: 'structural',
    definition: 'Dressed stones or bricks at the external corners of a building, often projecting slightly from the wall face.',
    extendedDefinition: 'Quoins serve both structural and decorative purposes, reinforcing corners while also creating visual interest. In stucco buildings, quoins are often "ruled" (scored into the render) rather than actual stones.',
    relatedTerms: ['Ashlar', 'Stucco'],
    localContext: 'Prominent on Belsize Park stucco villas, where they\'re typically ruled into the render to imitate stone.'
  },
  {
    id: 'lintel',
    term: 'Lintel',
    category: 'structural',
    definition: 'A horizontal structural element spanning an opening (window or door), carrying the weight of the wall above.',
    extendedDefinition: 'Historic lintels in Hampstead include stone lintels (Georgian), brick arches and gauged brick flat arches (Victorian), and reinforced concrete (from 1920s). The type of lintel is crucial for understanding a building\'s load paths.',
    relatedTerms: ['Arch', 'Voussoir', 'Keystone'],
    localContext: 'Arts & Crafts houses feature distinctive moulded brick or terracotta lintels; Georgian houses have flat gauged brick arches.'
  },

  // DECORATIVE TERMS
  {
    id: 'cornice',
    term: 'Cornice',
    category: 'decorative',
    definition: 'A projecting horizontal moulding at the junction of wall and ceiling internally, or wall and roof externally.',
    extendedDefinition: 'Victorian cornices are typically elaborate with classical profiles (egg-and-dart, dentil, modillion). Arts & Crafts cornices are simpler, often just a coved profile. External cornices protect walls from rainwater.',
    relatedTerms: ['Coving', 'Dentil', 'Modillion'],
    localContext: 'The Lost Details Library holds moulds for original Hampstead cornice profiles including the distinctive "Frognal Profile".'
  },
  {
    id: 'ceiling-rose',
    term: 'Ceiling Rose',
    category: 'decorative',
    definition: 'A decorative circular plaster ornament on a ceiling, originally designed to conceal the hook for a gas or electric light fitting.',
    extendedDefinition: 'Victorian ceiling roses feature naturalistic designs (acanthus leaves, flowers, fruit). Arts & Crafts roses are more geometric. Many were removed in 1960s-70s modernizations but can be replicated from surviving examples.',
    relatedTerms: ['Plasterwork', 'Fibrous Plaster'],
    localContext: 'The "Redington Rose" is a documented Arts & Crafts pattern original to Redington Road.'
  },
  {
    id: 'dado-rail',
    term: 'Dado Rail',
    category: 'decorative',
    definition: 'A horizontal moulding fixed to the wall at approximately waist height, originally protecting the wall from chair backs.',
    extendedDefinition: 'The dado rail divides the wall into two decorative zones: the dado below (often painted a darker color or papered in a durable material) and the field above. Heights vary by period: higher in Georgian, lower in Victorian.',
    relatedTerms: ['Chair Rail', 'Picture Rail', 'Skirting'],
    localContext: 'The "Belsize Dado" profile is documented in our Lost Details Library.'
  },
  {
    id: 'terracotta',
    term: 'Terracotta',
    category: 'decorative',
    definition: 'Fired clay used for decorative architectural elements, typically with a warm red-orange color.',
    extendedDefinition: 'Terracotta was popular in the late Victorian and Arts & Crafts periods for decorative panels, string courses, and chimney pots. It\'s more durable than stone in polluted urban environments but can be damaged by frost if poorly maintained.',
    relatedTerms: ['Faience', 'Brick'],
    localContext: 'Redington Road houses feature extensive terracotta panels above windows—these are irreplaceable heritage assets.'
  },

  // MATERIALS TERMS
  {
    id: 'lime-mortar',
    term: 'Lime Mortar',
    category: 'materials',
    definition: 'Traditional mortar made from lime (calcium oxide) and sand, which allows buildings to "breathe" and move without cracking.',
    extendedDefinition: 'All pre-1920 buildings in Hampstead use lime mortar. It\'s softer than the masonry it joins, acting as a sacrificial layer that can be repointed without damaging original bricks. Cement mortar is incompatible and causes brick damage.',
    relatedTerms: ['Lime Putty', 'NHL', 'Pointing'],
    localContext: 'We maintain specific lime mortar recipes for different Hampstead streets to match original mortars exactly.'
  },
  {
    id: 'lime-stucco',
    term: 'Lime Stucco',
    category: 'materials',
    definition: 'External render made from lime, sand, and sometimes other additives, traditionally used to imitate stone.',
    extendedDefinition: 'The white and cream rendered facades of Belsize Park and Regent\'s Park are lime stucco. It\'s applied in multiple coats and can be "ruled" to imitate ashlar joints. Cement render is not compatible for repairs.',
    relatedTerms: ['Render', 'Roughcast', 'Pebbledash'],
    localContext: 'Belsize Park\'s stucco villas require specialist lime stucco repair—never cement.'
  },
  {
    id: 'london-stock',
    term: 'London Stock Brick',
    category: 'materials',
    definition: 'The characteristic yellow-brown brick of Georgian and early Victorian London, made from local clay with ash and clinker additions.',
    extendedDefinition: 'London stocks get their color from the ash content, which also created the dark patches typical of the brick. They\'re softer than modern bricks and must be laid in lime mortar. Original size is Imperial (9" × 4¼" × 2½").',
    relatedTerms: ['Imperial Brick', 'Facing Brick'],
    localContext: 'Found in Georgian Hampstead (Well Walk, Church Row) and behind the stucco of Victorian Belsize.'
  },
  {
    id: 'welsh-slate',
    term: 'Welsh Slate',
    category: 'materials',
    definition: 'High-quality roofing slate quarried in North Wales, characterized by its blue-grey color and durability.',
    extendedDefinition: 'Welsh slate became the standard roofing material for London from the Georgian period through the Victorian era, transported via canal and rail. Spanish and Chinese slates are visually incompatible substitutes.',
    relatedTerms: ['Slate', 'Countess', 'Duchess'],
    localContext: 'Conservation officers in Camden will typically refuse non-Welsh slate on visible roof slopes.'
  },

  // WINDOWS TERMS
  {
    id: 'sash-window',
    term: 'Sash Window',
    category: 'windows',
    definition: 'A window with one or more movable panels (sashes) that slide vertically, held in position by counterweights.',
    extendedDefinition: 'The sash window is the defining fenestration of Georgian and Victorian architecture. The proportions and glazing bar profiles are period-specific—Georgian bars are very slim (18-22mm), Victorian slightly wider (25-35mm).',
    relatedTerms: ['Box Frame', 'Glazing Bar', 'Counterweight'],
    localContext: 'Original sash windows should always be restored rather than replaced where possible.'
  },
  {
    id: 'glazing-bar',
    term: 'Glazing Bar',
    category: 'windows',
    definition: 'The slender timber bars that divide a window into multiple panes, also called astragals or muntins.',
    extendedDefinition: 'Glazing bar profiles are crucial for historic accuracy. Georgian bars are characteristically slender (for crown glass panes), widening through the Victorian period as glass technology improved. Modern bars are often too wide.',
    relatedTerms: ['Muntin', 'Astragal'],
    localContext: 'Window replacements in Conservation Areas must match original glazing bar profiles exactly.'
  },
  {
    id: 'leaded-lights',
    term: 'Leaded Lights',
    category: 'windows',
    definition: 'Small glass panes joined together with lead strips (cames) to form a window, often in diamond or rectangular patterns.',
    extendedDefinition: 'Leaded lights are characteristic of Arts & Crafts architecture and appear extensively in Hampstead Garden Suburb. The lead cames can be releaded while retaining original glass. Patterns are period-specific.',
    relatedTerms: ['Lead Cames', 'Diamond Pane', 'Casement'],
    localContext: 'Hampstead Garden Suburb has specific leaded light patterns designed by Parker & Unwin that must be matched.'
  },

  // ROOFING TERMS
  {
    id: 'clay-tiles',
    term: 'Clay Tiles (Hand-Made)',
    category: 'roofing',
    definition: 'Traditional roof covering made from local clay, hand-shaped and fired in a kiln, with natural color variation and slight camber.',
    extendedDefinition: 'Hand-made tiles have subtle variations in color and shape that give historic roofscapes their character. Machine-made and concrete tiles are visually incompatible. Traditional tiles are fixed with oak pegs.',
    relatedTerms: ['Plain Tile', 'Pantile', 'Ridge Tile'],
    localContext: 'Arts & Crafts houses in Redington Road use hand-made clay tiles, typically from Keymer or similar makers.'
  },
  {
    id: 'dormer',
    term: 'Dormer',
    category: 'roofing',
    definition: 'A structural element protruding from a sloped roof, containing a vertical window.',
    extendedDefinition: 'Dormers in Hampstead vary by period: Georgian dormers are typically small with triangular pediments; Victorian dormers may have ornate bargeboards; Arts & Crafts dormers have swept or catslide forms.',
    relatedTerms: ['Roof Light', 'Catslide'],
    localContext: 'New dormers require planning permission in Conservation Areas and must respect the area\'s character.'
  },

  // PLANNING TERMS
  {
    id: 'conservation-area',
    term: 'Conservation Area',
    category: 'planning',
    definition: 'An area of special architectural or historic interest, where additional planning controls apply to preserve its character.',
    extendedDefinition: 'Most of Hampstead and Belsize Park falls within Conservation Areas, which means that many alterations that would normally be "permitted development" require planning permission. Demolition is also controlled.',
    relatedTerms: ['Listed Building', 'Article 4', 'Permitted Development'],
    localContext: 'Camden has over 40 Conservation Areas; Hampstead was one of the first designated in 1967.'
  },
  {
    id: 'article-4',
    term: 'Article 4 Direction',
    category: 'planning',
    definition: 'A planning order that removes specified permitted development rights from properties in an area.',
    extendedDefinition: 'Article 4 Directions in Hampstead typically control alterations to windows, doors, roofing materials, chimneys, and boundary treatments that would otherwise not need permission. Painting exterior surfaces may also require consent.',
    relatedTerms: ['Conservation Area', 'Permitted Development'],
    localContext: 'Hampstead Garden Suburb has one of the strictest Article 4 Directions in London.'
  },
  {
    id: 'listed-building',
    term: 'Listed Building',
    category: 'planning',
    definition: 'A building officially recognized as being of special architectural or historic interest, with legal protection.',
    extendedDefinition: 'Listed buildings are graded I (exceptional), II* (particularly important), or II (nationally important). Works to listed buildings require Listed Building Consent, regardless of whether planning permission is needed.',
    relatedTerms: ['Grade I', 'Grade II', 'Listed Building Consent'],
    localContext: 'Notable listed buildings in NW3 include Kenwood House (I), 2 Willow Road (II*), and the Isokon Building (I).'
  },

  // ARCHITECTURAL STYLES
  {
    id: 'arts-crafts',
    term: 'Arts & Crafts',
    category: 'styles',
    definition: 'A design movement (c.1880-1920) emphasizing traditional craftsmanship, honest use of materials, and vernacular forms.',
    extendedDefinition: 'The Arts & Crafts movement was a reaction against industrialization, valuing handcraft over machine production. Hampstead became a center for the movement, with many architect-designed houses featuring hand-made details.',
    relatedTerms: ['Queen Anne Revival', 'Vernacular Revival'],
    localContext: 'Redington Road and Hampstead Garden Suburb are outstanding examples of Arts & Crafts architecture.'
  },
  {
    id: 'queen-anne',
    term: 'Queen Anne Revival',
    category: 'styles',
    definition: 'A late Victorian architectural style (c.1870-1900) characterized by red brick, Dutch gables, and classical details.',
    extendedDefinition: 'Queen Anne Revival drew on 17th and early 18th-century English and Dutch architecture, featuring asymmetric compositions, shaped gables, tall chimneys, and terracotta ornament. It influenced the later Arts & Crafts movement.',
    relatedTerms: ['Arts & Crafts', 'Dutch Gable'],
    localContext: 'Maresfield Gardens (including Freud\'s house) has excellent Queen Anne Revival examples.'
  },
  {
    id: 'italianate',
    term: 'Italianate',
    category: 'styles',
    definition: 'A Victorian architectural style inspired by Italian Renaissance buildings, featuring classical details and often stucco facades.',
    extendedDefinition: 'Italianate architecture dominated London\'s expansion in the 1840s-1860s, with white stucco villas featuring elaborate cornices, porticos, and window surrounds. It represented aspirational living for the Victorian middle class.',
    relatedTerms: ['Stucco', 'Classical'],
    localContext: 'Belsize Park is the finest concentration of Italianate architecture in Hampstead.'
  }
];

const categoryLabels: Record<GlossaryTerm['category'], string> = {
  structural: 'Structural',
  decorative: 'Decorative',
  materials: 'Materials',
  windows: 'Windows & Glazing',
  roofing: 'Roofing',
  planning: 'Planning & Heritage',
  styles: 'Architectural Styles'
};

interface ArchitecturalGlossaryProps {
  className?: string;
  limit?: number;
  searchable?: boolean;
}

const ArchitecturalGlossary: React.FC<ArchitecturalGlossaryProps> = ({ 
  className = '',
  limit,
  searchable = true 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryTerm['category'] | 'all'>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const categories = Array.from(new Set(glossaryTerms.map(t => t.category)));

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;
    
    if (selectedCategory !== 'all') {
      terms = terms.filter(t => t.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      terms = terms.filter(t => 
        t.term.toLowerCase().includes(query) || 
        t.definition.toLowerCase().includes(query)
      );
    }

    terms = terms.sort((a, b) => a.term.localeCompare(b.term));
    
    return limit ? terms.slice(0, limit) : terms;
  }, [selectedCategory, searchQuery, limit]);

  // Group terms by first letter for alphabetical navigation
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3 block">
          Architectural Glossary
        </span>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">
          The Language of Heritage
        </h3>
        <p className="text-lg text-hampstead-charcoal/70 max-w-2xl">
          Understanding architectural terminology is essential for discussing your heritage 
          property with builders, planners, and conservation officers.
        </p>
      </div>

      {/* Search and Filters */}
      {searchable && (
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/40" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-hampstead-grey focus:border-hampstead-charcoal outline-none transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-hampstead-black text-white'
                  : 'bg-hampstead-cream hover:bg-hampstead-grey text-hampstead-charcoal'
              }`}
            >
              All Terms
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
        </div>
      )}

      {/* Terms List */}
      {Object.keys(groupedTerms).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedTerms).map(([letter, terms]) => (
            <div key={letter}>
              {/* Letter Header */}
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 bg-hampstead-black text-white flex items-center justify-center font-serif text-xl">
                  {letter}
                </span>
                <div className="flex-1 h-px bg-hampstead-grey" />
              </div>

              {/* Terms */}
              <div className="grid md:grid-cols-2 gap-4">
                {terms.map((term) => (
                  <motion.button
                    key={term.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedTerm(term)}
                    className="text-left p-4 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs text-hampstead-charcoal/50 uppercase tracking-wide">
                          {categoryLabels[term.category]}
                        </span>
                        <h4 className="font-serif text-lg group-hover:text-hampstead-charcoal/80 transition-colors">
                          {term.term}
                        </h4>
                      </div>
                      <BookOpen className="w-4 h-4 text-hampstead-charcoal/30" />
                    </div>
                    <p className="text-sm text-hampstead-charcoal/70 mt-2 line-clamp-2">
                      {term.definition}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-hampstead-cream">
          <p className="text-hampstead-charcoal/50">No terms found matching your search.</p>
        </div>
      )}

      {/* View All Link */}
      {limit && glossaryTerms.length > limit && (
        <div className="mt-8 text-center">
          <Link
            href="/archive/glossary"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
          >
            View Full Glossary
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Term Detail Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTerm(null)}
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
                  <span className="text-xs uppercase tracking-widest text-white/60">
                    {categoryLabels[selectedTerm.category]}
                  </span>
                  <button
                    onClick={() => setSelectedTerm(null)}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h4 className="font-serif text-3xl mt-2">{selectedTerm.term}</h4>
              </div>

              <div className="p-6">
                {/* Definition */}
                <div className="mb-6">
                  <p className="text-lg text-hampstead-charcoal/80 leading-relaxed">
                    {selectedTerm.definition}
                  </p>
                </div>

                {/* Extended Definition */}
                {selectedTerm.extendedDefinition && (
                  <div className="mb-6">
                    <h5 className="font-serif text-lg mb-3">In Detail</h5>
                    <p className="text-hampstead-charcoal/70 leading-relaxed">
                      {selectedTerm.extendedDefinition}
                    </p>
                  </div>
                )}

                {/* Local Context */}
                {selectedTerm.localContext && (
                  <div className="mb-6 p-4 bg-hampstead-cream">
                    <h5 className="font-serif text-lg mb-2">In Hampstead</h5>
                    <p className="text-hampstead-charcoal/70">
                      {selectedTerm.localContext}
                    </p>
                  </div>
                )}

                {/* Related Terms */}
                {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                  <div className="mb-6">
                    <h5 className="font-serif text-lg mb-3">Related Terms</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.relatedTerms.map((related, i) => {
                        const relatedTerm = glossaryTerms.find(
                          t => t.term.toLowerCase() === related.toLowerCase()
                        );
                        return relatedTerm ? (
                          <button
                            key={i}
                            onClick={() => setSelectedTerm(relatedTerm)}
                            className="px-3 py-1 bg-hampstead-cream hover:bg-hampstead-grey text-sm transition-colors"
                          >
                            {related}
                          </button>
                        ) : (
                          <span key={i} className="px-3 py-1 bg-hampstead-cream text-sm">
                            {related}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action */}
                <div className="pt-4 border-t border-hampstead-grey">
                  <Link
                    href={`/archive/materials?search=${encodeURIComponent(selectedTerm.term)}`}
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-hampstead-charcoal/70 transition-colors"
                    onClick={() => setSelectedTerm(null)}
                  >
                    Find related materials
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

export default ArchitecturalGlossary;
export { glossaryTerms, categoryLabels };
export type { GlossaryTerm };
