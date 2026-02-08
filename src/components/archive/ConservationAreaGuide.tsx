'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Building,
  TreePine,
  Home,
  ArrowRight
} from 'lucide-react';

interface ConservationArea {
  id: string;
  name: string;
  designation: string;
  borough: string;
  character: string;
  keyFeatures: string[];
  article4: boolean;
  article4Details?: string;
  restrictions: {
    permitted: string[];
    requiresPermission: string[];
    prohibited: string[];
  };
  streets: string[];
  documentLinks: {
    appraisal?: string;
    managementPlan?: string;
    article4Direction?: string;
  };
  tips: string[];
}

const conservationAreas: ConservationArea[] = [
  {
    id: 'hampstead',
    name: 'Hampstead',
    designation: '1967',
    borough: 'Camden',
    character: 'The historic village core of Hampstead, featuring a mix of Georgian, Victorian, and Edwardian properties set along winding streets. The area\'s character derives from its origins as a spa town and its literary and artistic associations.',
    keyFeatures: [
      'Historic village street pattern',
      'Mix of Georgian, Victorian and Edwardian architecture',
      'Intimate scale with narrow lanes',
      'Important views to and from Hampstead Heath',
      'Historic shop fronts on High Street',
      'Mature trees and green spaces'
    ],
    article4: true,
    article4Details: 'Covers alterations to windows, doors, roofing materials, chimneys, boundary treatments, painting of facades, satellite dishes, and solar panels on front elevations.',
    restrictions: {
      permitted: [
        'Internal alterations not affecting structure',
        'Like-for-like repairs using matching materials',
        'Redecoration in existing colors (non-Article 4 properties)',
        'Minor garden works under 0.5m height'
      ],
      requiresPermission: [
        'Window replacement (even like-for-like)',
        'Door replacement',
        'Roof alterations or material changes',
        'Chimney removal or alteration',
        'External painting in new colors',
        'Extensions of any size',
        'Basement excavations',
        'Front garden changes',
        'Solar panels on front elevation'
      ],
      prohibited: [
        'UPVC windows and doors',
        'Concrete roof tiles',
        'Satellite dishes on front elevations',
        'Removal of front boundary walls',
        'Paving over front gardens',
        'Cladding or rendering brick facades'
      ]
    },
    streets: [
      'Hampstead High Street',
      'Heath Street',
      'Flask Walk',
      'Well Walk',
      'Church Row',
      'Holly Walk',
      'Hampstead Grove',
      'Frognal Rise'
    ],
    documentLinks: {
      appraisal: 'https://www.camden.gov.uk/hampstead-conservation-area',
      managementPlan: 'https://www.camden.gov.uk/hampstead-management-plan',
      article4Direction: 'https://www.camden.gov.uk/article-4-directions'
    },
    tips: [
      'Always seek pre-application advice before any external works',
      'Document your property\'s original features photographically',
      'Check if your property is individually listed as well',
      'Historic England can advise on listed building works'
    ]
  },
  {
    id: 'redington-frognal',
    name: 'Redington Frognal',
    designation: '1970',
    borough: 'Camden',
    character: 'An area of substantial late Victorian and Edwardian houses, predominantly in Arts & Crafts and Queen Anne styles. Wide tree-lined streets with generous front gardens create a distinctive suburban villa character.',
    keyFeatures: [
      'Large detached and semi-detached villas',
      'Arts & Crafts architectural details',
      'Deep red brick with terracotta ornament',
      'Mature street trees',
      'Generous plot sizes',
      'Substantial front gardens'
    ],
    article4: true,
    article4Details: 'Restricts permitted development for alterations to windows, doors, roofs, chimneys, front boundaries, and satellite dishes.',
    restrictions: {
      permitted: [
        'Internal alterations',
        'Like-for-like repairs',
        'Rear garden landscaping',
        'Minor outbuildings under permitted development'
      ],
      requiresPermission: [
        'All external alterations',
        'Window and door replacement',
        'Front garden changes including paving',
        'Extensions',
        'Basement excavations',
        'Dormers and rooflights'
      ],
      prohibited: [
        'UPVC joinery',
        'Non-traditional roofing materials',
        'Rendering or cladding brick facades',
        'Front garden parking pads without permission',
        'Removing mature trees without consent'
      ]
    },
    streets: [
      'Redington Road',
      'Frognal',
      'Frognal Lane',
      'Oak Hill Way',
      'Oak Hill Park',
      'Langland Gardens',
      'Greenaway Gardens',
      'Lindfield Gardens'
    ],
    documentLinks: {
      appraisal: 'https://www.camden.gov.uk/redington-frognal'
    },
    tips: [
      'The original brick is irreplaceable - never paint or render',
      'Terracotta details should be repaired not replaced',
      'Lime mortar is essential for pointing repairs',
      'Window replacements must match original glazing patterns'
    ]
  },
  {
    id: 'belsize',
    name: 'Belsize',
    designation: '1973',
    borough: 'Camden',
    character: 'Grand Victorian stucco villas and terraces in the Italianate style. White or cream rendered facades with elaborate classical details create a cohesive and elegant townscape.',
    keyFeatures: [
      'White stucco-fronted villas',
      'Italianate classical details',
      'Elaborate door cases and window surrounds',
      'Iron balconies and railings',
      'Formal front gardens',
      'Slate roofs with decorative ridge tiles'
    ],
    article4: true,
    article4Details: 'Covers painting, windows, doors, porches, boundary treatments, and satellite dishes.',
    restrictions: {
      permitted: [
        'Internal works',
        'Rear garden works',
        'Like-for-like repairs in matching materials'
      ],
      requiresPermission: [
        'Any stucco repairs or repainting',
        'Window and door replacement',
        'Ironwork alterations',
        'Roof works',
        'Extensions',
        'Basement works',
        'Front boundary changes'
      ],
      prohibited: [
        'UPVC joinery',
        'Cement render repairs',
        'Modern ironwork designs',
        'Concrete roof tiles',
        'Removal of classical details'
      ]
    },
    streets: [
      'Belsize Park',
      'Belsize Square',
      'Belsize Crescent',
      'Belsize Park Gardens',
      'Belsize Avenue',
      'Eton Avenue',
      'Adamson Road'
    ],
    documentLinks: {
      appraisal: 'https://www.camden.gov.uk/belsize-conservation-area'
    },
    tips: [
      'Stucco must be repaired with lime, never cement',
      'Original sash window proportions are critical',
      'Iron railings require specialist restoration',
      'Color schemes should follow the approved palette'
    ]
  },
  {
    id: 'hampstead-garden-suburb',
    name: 'Hampstead Garden Suburb',
    designation: '1968 (Listed Buildings); 1969 (Conservation Area)',
    borough: 'Barnet',
    character: 'A planned Garden City suburb designed by Raymond Unwin and Barry Parker from 1907. The area is internationally significant for its pioneering town planning principles, Arts & Crafts architecture, and integration of housing with landscape.',
    keyFeatures: [
      'Unified Arts & Crafts design vision',
      'Grade I listed Central Square',
      'Lutyens churches and Free Church',
      'Carefully designed street scenes',
      'Integration with green spaces',
      'Hedgerow boundaries (not walls)',
      'Consistent roofing materials',
      'Unified architectural character by area'
    ],
    article4: true,
    article4Details: 'Extensive Article 4 Direction covering virtually all external alterations including painting, dormer windows, rooflights, aerials, gates, fences, hedges, and hard standing.',
    restrictions: {
      permitted: [
        'Very limited - most external works require consent',
        'Internal alterations to non-listed properties',
        'Garden planting within existing beds'
      ],
      requiresPermission: [
        'All external alterations',
        'Window and door changes',
        'Roofing alterations',
        'Painting in any color',
        'Fence or gate changes',
        'Satellite dishes anywhere',
        'Extensions of any type',
        'Hard standing',
        'Hedge removal'
      ],
      prohibited: [
        'UPVC windows and doors',
        'Concrete roof tiles',
        'Modern fence styles',
        'Satellite dishes (visible)',
        'Front boundary walls',
        'Non-traditional materials',
        'Anything not in keeping with Parker & Unwin vision'
      ]
    },
    streets: [
      'Central Square',
      'Meadway',
      'Heathgate',
      'Hampstead Way',
      'Willfield Way',
      'Asmuns Hill',
      'Bigwood Road',
      'Northway'
    ],
    documentLinks: {
      appraisal: 'https://www.barnet.gov.uk/planning-and-building/planning/conservation/hampstead-garden-suburb',
      managementPlan: 'https://hgstrust.org/character-appraisal'
    },
    tips: [
      'Consult the Hampstead Garden Suburb Trust before any works',
      'Original windows are very specifically detailed',
      'Even paint colors must be approved',
      'The Trust provides detailed guidance for all properties'
    ]
  },
  {
    id: 'fitzjohns-netherhall',
    name: 'Fitzjohns/Netherhall',
    designation: '1985',
    borough: 'Camden',
    character: 'An area of substantial High Victorian to Edwardian housing, with some notable Arts & Crafts houses. The dramatic topography creates distinctive street scenes with properties set at varying levels.',
    keyFeatures: [
      'Dramatic sloping topography',
      'Large Victorian and Edwardian villas',
      'Mix of brick and stucco',
      'Substantial mature gardens',
      'Important architect-designed houses',
      'Views to Hampstead Heath'
    ],
    article4: true,
    article4Details: 'Covers windows, doors, roofs, boundary treatments, and satellite dishes.',
    restrictions: {
      permitted: [
        'Internal alterations',
        'Like-for-like repairs',
        'Rear garden works (subject to tree protection)'
      ],
      requiresPermission: [
        'External alterations',
        'Extensions',
        'Basement excavations',
        'Changes to building frontages',
        'Tree works (many TPOs)'
      ],
      prohibited: [
        'UPVC joinery',
        'Modern roofing materials',
        'Inappropriate extensions'
      ]
    },
    streets: [
      'Fitzjohns Avenue',
      'Netherhall Gardens',
      'Maresfield Gardens',
      'Nutley Terrace',
      'Arkwright Road',
      'Lyndhurst Road'
    ],
    documentLinks: {
      appraisal: 'https://www.camden.gov.uk/fitzjohns-netherhall'
    },
    tips: [
      'Many properties have significant trees with TPOs',
      'Basement extensions are subject to specific policies',
      'The sloping sites create additional structural considerations',
      'Pre-application advice is strongly recommended'
    ]
  },
  {
    id: 'south-hill-park',
    name: 'South Hill Park',
    designation: '1977',
    borough: 'Camden',
    character: 'A varied area combining Victorian housing with notable 20th-century architectural set pieces including the Isokon Building (Grade I listed) and the important post-war Branch Hill housing estate.',
    keyFeatures: [
      'Isokon Building (Grade I)',
      'Branch Hill Estate by Camden Architects',
      '2 Willow Road (Erno Goldfinger)',
      'Victorian and Edwardian housing',
      'Important Modern Movement buildings',
      'Proximity to Hampstead Heath'
    ],
    article4: true,
    article4Details: 'Covers alterations to unlisted buildings in the conservation area.',
    restrictions: {
      permitted: [
        'Internal alterations to non-listed buildings',
        'Like-for-like repairs'
      ],
      requiresPermission: [
        'External alterations',
        'Works to listed buildings (Listed Building Consent)',
        'Extensions',
        'Changes affecting views of listed buildings'
      ],
      prohibited: [
        'Alterations harmful to listed building settings',
        'UPVC joinery',
        'Inappropriate materials'
      ]
    },
    streets: [
      'South Hill Park',
      'South Hill Park Gardens',
      'Lawn Road',
      'Willow Road',
      'Branch Hill'
    ],
    documentLinks: {
      appraisal: 'https://www.camden.gov.uk/south-hill-park'
    },
    tips: [
      'Some Modern Movement buildings have specific material requirements',
      'The Isokon building requires specialist conservation approaches',
      '2 Willow Road is managed by the National Trust',
      'Branch Hill has its own design guidelines'
    ]
  },
  {
    id: 'kenwood',
    name: 'Kenwood',
    designation: '1986',
    borough: 'Camden / Barnet (part)',
    character: 'The setting of Kenwood House (Grade I) and its grounds, including The Bishops Avenue and surrounding areas. The area includes grand Edwardian and Inter-War mansions set in substantial grounds.',
    keyFeatures: [
      'Kenwood House and grounds (English Heritage)',
      'Large mansion houses',
      'Substantial mature landscaping',
      'Important views to/from Kenwood',
      'Mix of periods and styles',
      'Large plot sizes'
    ],
    article4: true,
    article4Details: 'Various restrictions protecting the setting of Kenwood House.',
    restrictions: {
      permitted: [
        'Internal alterations',
        'Minor garden works'
      ],
      requiresPermission: [
        'Any external alterations',
        'Extensions',
        'Tree works',
        'Boundary changes',
        'New buildings'
      ],
      prohibited: [
        'Development harmful to Kenwood setting',
        'Removal of mature planting',
        'Inappropriate scale development'
      ]
    },
    streets: [
      'The Bishops Avenue',
      'Winnington Road',
      'Sheldon Avenue',
      'Stormont Road'
    ],
    documentLinks: {
      appraisal: 'https://www.camden.gov.uk/kenwood'
    },
    tips: [
      'Views to and from Kenwood House are protected',
      'English Heritage consultation may be required',
      'The setting of the registered park is a key consideration',
      'Mature landscaping is as important as buildings'
    ]
  }
];

interface ConservationAreaGuideProps {
  className?: string;
  featured?: boolean;
  limit?: number;
}

const ConservationAreaGuide: React.FC<ConservationAreaGuideProps> = ({ 
  className = '',
  featured = false,
  limit
}) => {
  const [selectedArea, setSelectedArea] = useState<ConservationArea | null>(
    featured ? conservationAreas[0] : null
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'restrictions' | 'streets'>('overview');

  const displayedAreas = limit ? conservationAreas.slice(0, limit) : conservationAreas;

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3 block">
          Conservation Area Guides
        </span>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">
          Understanding Planning Restrictions in NW3
        </h3>
        <p className="text-lg text-hampstead-charcoal/70 max-w-2xl">
          Most of Hampstead falls within Conservation Areas with strict planning controls. 
          Understanding your area&apos;s restrictions is essential before any building work.
        </p>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        {/* Area List */}
        <div className="space-y-2">
          {displayedAreas.map((area) => (
            <button
              key={area.id}
              onClick={() => {
                setSelectedArea(area);
                setActiveTab('overview');
              }}
              className={`w-full text-left p-4 border transition-all ${
                selectedArea?.id === area.id
                  ? 'bg-hampstead-black text-white border-hampstead-black'
                  : 'bg-white border-hampstead-grey hover:border-hampstead-charcoal/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif text-lg">{area.name}</h4>
                  <p className={`text-xs ${
                    selectedArea?.id === area.id ? 'text-white/60' : 'text-hampstead-charcoal/50'
                  }`}>
                    {area.borough} • Designated {area.designation}
                  </p>
                </div>
                {area.article4 && (
                  <span className={`px-2 py-0.5 text-xs font-medium ${
                    selectedArea?.id === area.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    Article 4
                  </span>
                )}
              </div>
            </button>
          ))}

          {limit && conservationAreas.length > limit && (
            <Link
              href="/journal/archive/conservation-areas"
              className="block text-center py-3 text-sm font-medium hover:text-hampstead-charcoal/70 transition-colors"
            >
              View all conservation areas →
            </Link>
          )}
        </div>

        {/* Area Detail */}
        {selectedArea ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArea.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-hampstead-grey"
            >
              {/* Tabs */}
              <div className="flex border-b border-hampstead-grey">
                {(['overview', 'restrictions', 'streets'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-medium uppercase tracking-wide transition-colors ${
                      activeTab === tab
                        ? 'bg-hampstead-cream text-hampstead-black'
                        : 'text-hampstead-charcoal/60 hover:text-hampstead-black'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-hampstead-charcoal/50" />
                      <span className="text-sm text-hampstead-charcoal/60">
                        {selectedArea.borough} Council
                      </span>
                    </div>

                    <p className="text-lg text-hampstead-charcoal/80 leading-relaxed mb-6">
                      {selectedArea.character}
                    </p>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h5 className="font-serif text-lg mb-3">Key Features</h5>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {selectedArea.keyFeatures.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/70">
                            <Building className="w-4 h-4 mt-0.5 flex-shrink-0 text-hampstead-charcoal/40" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Article 4 Warning */}
                    {selectedArea.article4 && (
                      <div className="p-4 bg-amber-50 border border-amber-200 mb-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-amber-900 mb-1">Article 4 Direction Applies</h5>
                            <p className="text-sm text-amber-800">
                              {selectedArea.article4Details}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    <div className="bg-hampstead-cream p-4">
                      <h5 className="font-serif text-lg mb-3">Our Tips</h5>
                      <ul className="space-y-2">
                        {selectedArea.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/80">
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-700" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Document Links */}
                    {Object.keys(selectedArea.documentLinks).length > 0 && (
                      <div className="mt-6 pt-6 border-t border-hampstead-grey">
                        <h5 className="font-serif text-lg mb-3">Official Documents</h5>
                        <div className="flex flex-wrap gap-3">
                          {selectedArea.documentLinks.appraisal && (
                            <a
                              href={selectedArea.documentLinks.appraisal}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-hampstead-grey text-sm hover:border-hampstead-charcoal/30 transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              Character Appraisal
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {selectedArea.documentLinks.managementPlan && (
                            <a
                              href={selectedArea.documentLinks.managementPlan}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-hampstead-grey text-sm hover:border-hampstead-charcoal/30 transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              Management Plan
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Restrictions Tab */}
                {activeTab === 'restrictions' && (
                  <div className="space-y-6">
                    {/* Permitted */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-700" />
                        <h5 className="font-serif text-lg">Generally Permitted</h5>
                      </div>
                      <ul className="space-y-2 pl-7">
                        {selectedArea.restrictions.permitted.map((item, i) => (
                          <li key={i} className="text-sm text-hampstead-charcoal/70 list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requires Permission */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        <h5 className="font-serif text-lg">Requires Planning Permission</h5>
                      </div>
                      <ul className="space-y-2 pl-7">
                        {selectedArea.restrictions.requiresPermission.map((item, i) => (
                          <li key={i} className="text-sm text-hampstead-charcoal/70 list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prohibited */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="w-5 h-5 text-red-700" />
                        <h5 className="font-serif text-lg">Generally Prohibited</h5>
                      </div>
                      <ul className="space-y-2 pl-7">
                        {selectedArea.restrictions.prohibited.map((item, i) => (
                          <li key={i} className="text-sm text-hampstead-charcoal/70 list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 p-4 bg-hampstead-black text-white">
                      <p className="text-sm text-white/80 mb-3">
                        Need help navigating {selectedArea.name} Conservation Area requirements?
                      </p>
                      <Link
                        href={`/journal/contact?subject=planning-advice&area=${encodeURIComponent(selectedArea.name)}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-hampstead-black text-sm font-medium hover:bg-hampstead-cream transition-colors"
                      >
                        Get Planning Advice
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Streets Tab */}
                {activeTab === 'streets' && (
                  <div>
                    <p className="text-sm text-hampstead-charcoal/60 mb-6">
                      Properties on these streets fall within the {selectedArea.name} Conservation Area.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedArea.streets.map((street, i) => (
                        <Link
                          key={i}
                          href={`/journal/archive/${street.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center justify-between p-3 bg-hampstead-cream hover:bg-hampstead-grey/50 transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-hampstead-charcoal/40" />
                            <span>{street}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="bg-hampstead-cream border border-hampstead-grey p-12 flex items-center justify-center">
            <p className="text-hampstead-charcoal/50 text-center">
              Select a conservation area to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConservationAreaGuide;
export { conservationAreas };
export type { ConservationArea };
