'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Award
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  address: string;
  location: string;
  propertyType: string;
  era: string;
  year: string;
  duration: string;
  scope: string[];
  challenge: string;
  solution: string;
  outcome: string;
  beforeImages: string[];
  afterImages: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  awards?: string[];
  featured: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'redington-road-restoration',
    title: 'Arts & Crafts Villa Full Restoration',
    address: 'Redington Road, NW3',
    location: 'Hampstead',
    propertyType: 'Detached Villa',
    era: 'Arts & Crafts (1905)',
    year: '2023',
    duration: '18 months',
    scope: [
      'Full external brick repointing in lime mortar',
      'Terracotta panel restoration',
      'Original sash window restoration (32 windows)',
      'Hand-made clay tile roof replacement',
      'Chimney stack rebuild',
      'Lead work to dormers',
      'Heritage colour scheme restoration'
    ],
    challenge: 'A century of cement pointing had caused significant brick damage. Previous "repairs" with hard cement mortar had trapped moisture within the soft red brickwork, causing widespread spalling (face blow-off) to approximately 15% of the facade bricks. The original terracotta panels above windows were deteriorating, and the roof had been poorly patched with machine-made tiles.',
    solution: 'We carefully removed all cement pointing by hand to avoid further brick damage. Spalled bricks were cut out and replaced with matching reclaimed Imperial-sized bricks sourced from a contemporary demolition in Muswell Hill. New lime putty mortar was mixed on-site using local sharp sand to match the original warm cream color. Terracotta panels were consolidated using specialist lime-based repairs by a PACR-accredited conservator. The roof was stripped and relaid with new Keymer hand-made tiles to match the originals.',
    outcome: 'The property has been returned to its original appearance, with the facade now able to breathe properly for the first time in 50 years. The owners report noticeably improved internal conditions, with reduced condensation and a warmer feel to external walls. The work received commendation from Camden Conservation team.',
    beforeImages: [
      '/images/archive/case-studies/redington-before-1.jpg',
      '/images/archive/case-studies/redington-before-2.jpg',
      '/images/archive/case-studies/redington-before-3.jpg'
    ],
    afterImages: [
      '/images/archive/case-studies/redington-after-1.jpg',
      '/images/archive/case-studies/redington-after-2.jpg',
      '/images/archive/case-studies/redington-after-3.jpg'
    ],
    testimonial: {
      quote: 'We were horrified to learn that previous builders had caused so much damage with cement. The transformation is remarkable—our house looks as it must have done a century ago.',
      author: 'Dr. & Mrs. Thompson',
      role: 'Homeowners'
    },
    awards: ['Camden Conservation Award 2023 (Commended)'],
    featured: true
  },
  {
    id: 'belsize-stucco-restoration',
    title: 'Victorian Stucco Villa Revival',
    address: 'Belsize Park Gardens, NW3',
    location: 'Belsize Park',
    propertyType: 'Semi-Detached Villa',
    era: 'Victorian (1860)',
    year: '2022',
    duration: '12 months',
    scope: [
      'Complete stucco facade restoration',
      'Cornice and architectural detail repair',
      'Basement tanking and extension',
      'Sash window overhaul',
      'Front garden restoration',
      'Cast iron railing repair'
    ],
    challenge: 'Decades of cement-based repairs had left the stucco facade with a patchwork appearance, with different textures and colors across the frontage. Many decorative elements—including the elaborate window surrounds and entrance portico—had been lost or damaged. The basement suffered from chronic damp.',
    solution: 'All previous cement repairs were removed and the original lime stucco substrate assessed. Sound areas were retained; failing sections were cut out in clean geometric shapes and replaced with new lime stucco mixed to match the original texture and color. Lost architectural details were recast from surviving originals on neighboring properties. The basement was tanked using a breathable system compatible with the lime construction.',
    outcome: 'The villa has regained its Victorian elegance with a cohesive facade finish. The basement provides additional dry living space while maintaining the building\'s ability to manage moisture naturally.',
    beforeImages: [
      '/images/archive/case-studies/belsize-before-1.jpg',
      '/images/archive/case-studies/belsize-before-2.jpg'
    ],
    afterImages: [
      '/images/archive/case-studies/belsize-after-1.jpg',
      '/images/archive/case-studies/belsize-after-2.jpg'
    ],
    testimonial: {
      quote: 'The attention to detail was extraordinary. They even found the original stucco recipe in a Victorian builder\'s manual.',
      author: 'Anonymous',
      role: 'Belsize Park Homeowner'
    },
    featured: true
  },
  {
    id: 'garden-suburb-conservation',
    title: 'Hampstead Garden Suburb Window Project',
    address: 'Meadway, NW11',
    location: 'Hampstead Garden Suburb',
    propertyType: 'Arts & Crafts House',
    era: 'Edwardian (1911)',
    year: '2023',
    duration: '8 months',
    scope: [
      'Restoration of 28 leaded light casement windows',
      'Repair of original lead cames',
      'Replacement of degraded glass panels',
      'Window frame repairs',
      'Installation of discreet secondary glazing',
      'Redecoration in approved colors'
    ],
    challenge: 'The original Parker & Unwin designed leaded light windows were in poor condition, with failing lead cames and cracked glass. Previous owners had proposed replacement with double-glazed units, but this was refused by the Trust. The windows needed to be restored while improving thermal performance.',
    solution: 'Working with the Hampstead Garden Suburb Trust, we developed a restoration scheme that retained original glass where possible and releaded panels using matching lead came profiles. Thermal performance was improved through discreet internal secondary glazing with slim-profile aluminum frames, invisible from outside.',
    outcome: 'All 28 windows were restored to their original appearance while achieving significant thermal improvement. The Trust approved the scheme and has since recommended our approach to other homeowners.',
    beforeImages: [
      '/images/archive/case-studies/suburb-before-1.jpg'
    ],
    afterImages: [
      '/images/archive/case-studies/suburb-after-1.jpg'
    ],
    testimonial: {
      quote: 'They navigated the Trust\'s requirements expertly and delivered windows that look original but perform like modern units.',
      author: 'Mr. & Mrs. Chen',
      role: 'Homeowners'
    },
    awards: ['HGS Trust Best Practice Recognition 2023'],
    featured: false
  },
  {
    id: 'frognal-chimney-restoration',
    title: 'Listed Building Chimney Restoration',
    address: 'Frognal, NW3',
    location: 'Hampstead',
    propertyType: 'Grade II Listed Villa',
    era: 'Late Victorian (1895)',
    year: '2021',
    duration: '4 months',
    scope: [
      'Emergency stabilization',
      'Full chimney stack rebuild',
      'Decorative brick banding restoration',
      'Lead flashing renewal',
      'Listed Building Consent application'
    ],
    challenge: 'The main chimney stack had become structurally unstable due to water ingress and frost damage over many decades. As a Grade II listed building, all works required Listed Building Consent and had to restore the chimney exactly to its original design, including decorative brick banding.',
    solution: 'We carefully documented the original chimney design through historic photographs before emergency scaffolding was erected. The stack was taken down course by course, with bricks catalogued for reuse where sound. New bricks to match were sourced from reclamation yards. The stack was rebuilt using traditional lime mortar with matching decorative banding.',
    outcome: 'The chimney has been restored to its exact original appearance, with the decorative banding that distinguishes this particular street. Historic England expressed satisfaction with the quality of restoration.',
    beforeImages: [
      '/images/archive/case-studies/frognal-before-1.jpg'
    ],
    afterImages: [
      '/images/archive/case-studies/frognal-after-1.jpg'
    ],
    featured: false
  },
  {
    id: 'bishops-avenue-entrance',
    title: 'Edwardian Entrance Portico Restoration',
    address: 'The Bishops Avenue, N2',
    location: 'Bishops Avenue',
    propertyType: 'Mansion House',
    era: 'Edwardian (1908)',
    year: '2022',
    duration: '6 months',
    scope: [
      'Portland stone portico cleaning',
      'Stone repair and recarving',
      'Column restoration',
      'Steps replacement',
      'Bronze entrance door refurbishment'
    ],
    challenge: 'The impressive Portland stone entrance portico had suffered from decades of London pollution, with black crusting obscuring the carved details. Two columns had structural cracks, and several carved elements had eroded beyond recognition.',
    solution: 'The stonework was cleaned using the DOFF superheated steam system, which gently removes soiling without damaging the stone surface. Structural repairs were made using lime-based mortars with stone dust to match. Lost carved details were recarved by a master mason using historic photographs as reference.',
    outcome: 'The portico has been restored to its Edwardian grandeur, with crisp carved details visible for the first time in decades. The cleaning revealed original tool marks, adding to the historic character.',
    beforeImages: [
      '/images/archive/case-studies/bishops-before-1.jpg'
    ],
    afterImages: [
      '/images/archive/case-studies/bishops-after-1.jpg'
    ],
    featured: false
  }
];

interface RestorationCaseStudiesProps {
  className?: string;
  limit?: number;
  featured?: boolean;
}

const RestorationCaseStudies: React.FC<RestorationCaseStudiesProps> = ({ 
  className = '',
  limit,
  featured = false 
}) => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showingAfter, setShowingAfter] = useState(false);

  const displayedStudies = featured 
    ? caseStudies.filter(s => s.featured)
    : limit 
      ? caseStudies.slice(0, limit)
      : caseStudies;

  const currentImages = selectedStudy 
    ? (showingAfter ? selectedStudy.afterImages : selectedStudy.beforeImages)
    : [];

  const nextImage = () => {
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3 block">
          Restoration Case Studies
        </span>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">
          Heritage Restorations in NW3
        </h3>
        <p className="text-lg text-hampstead-charcoal/70 max-w-2xl">
          Detailed documentation of restoration projects across Hampstead, showing the 
          techniques and materials used to preserve architectural heritage.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {displayedStudies.map((study, index) => (
          <motion.button
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => {
              setSelectedStudy(study);
              setCurrentImageIndex(0);
              setShowingAfter(false);
            }}
            className="text-left bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-all group"
          >
            {/* Image Placeholder */}
            <div className="aspect-video bg-hampstead-cream relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-hampstead-grey/50 flex items-center justify-center">
                    <ChevronRight className="w-8 h-8 text-hampstead-charcoal/30" />
                  </div>
                  <span className="text-sm text-hampstead-charcoal/40">View Before & After</span>
                </div>
              </div>
              {study.featured && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-hampstead-black text-white text-xs font-medium">
                  Featured Project
                </div>
              )}
              {study.awards && study.awards.length > 0 && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-white text-xs font-medium flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Award Winner
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-hampstead-charcoal/50 mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {study.location}
                </span>
                <span>•</span>
                <span>{study.era}</span>
                <span>•</span>
                <span>{study.year}</span>
              </div>

              <h4 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                {study.title}
              </h4>

              <p className="text-sm text-hampstead-charcoal/70 line-clamp-2 mb-4">
                {study.challenge}
              </p>

              {/* Scope Preview */}
              <div className="flex flex-wrap gap-2">
                {study.scope.slice(0, 3).map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-hampstead-cream text-xs">
                    {item.length > 30 ? item.substring(0, 30) + '...' : item}
                  </span>
                ))}
                {study.scope.length > 3 && (
                  <span className="px-2 py-1 bg-hampstead-cream text-xs">
                    +{study.scope.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* View All Link */}
      {(limit && caseStudies.length > limit) || featured && (
        <div className="mt-8 text-center">
          <Link
            href="/archive/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 bg-hampstead-black text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <MapPin className="w-4 h-4" />
                    {selectedStudy.address}
                    <span>•</span>
                    <Calendar className="w-4 h-4" />
                    {selectedStudy.year}
                  </div>
                  <button
                    onClick={() => setSelectedStudy(null)}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h4 className="font-serif text-2xl md:text-3xl">{selectedStudy.title}</h4>
                <p className="text-sm text-white/60 mt-2">
                  {selectedStudy.propertyType} • {selectedStudy.era} • {selectedStudy.duration}
                </p>
              </div>

              {/* Image Gallery */}
              <div className="relative bg-hampstead-cream">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-hampstead-charcoal/50">
                      {showingAfter ? 'After' : 'Before'} Images ({currentImageIndex + 1}/{currentImages.length})
                    </p>
                  </div>
                </div>

                {/* Gallery Controls */}
                {currentImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center disabled:opacity-30"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      disabled={currentImageIndex === currentImages.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center disabled:opacity-30"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Before/After Toggle */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex bg-white rounded-full p-1 shadow-lg">
                  <button
                    onClick={() => {
                      setShowingAfter(false);
                      setCurrentImageIndex(0);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      !showingAfter ? 'bg-hampstead-black text-white' : 'text-hampstead-charcoal'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => {
                      setShowingAfter(true);
                      setCurrentImageIndex(0);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      showingAfter ? 'bg-hampstead-black text-white' : 'text-hampstead-charcoal'
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Awards */}
                {selectedStudy.awards && selectedStudy.awards.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {selectedStudy.awards.map((award, i) => (
                      <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 text-sm flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {award}
                      </span>
                    ))}
                  </div>
                )}

                {/* Scope */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">Scope of Works</h5>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedStudy.scope.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/70">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-700" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenge */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">The Challenge</h5>
                  <p className="text-hampstead-charcoal/80 leading-relaxed">
                    {selectedStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h5 className="font-serif text-lg mb-3">Our Solution</h5>
                  <p className="text-hampstead-charcoal/80 leading-relaxed">
                    {selectedStudy.solution}
                  </p>
                </div>

                {/* Outcome */}
                <div className="mb-6 p-4 bg-green-50 border border-green-200">
                  <h5 className="font-serif text-lg mb-3 text-green-900">The Outcome</h5>
                  <p className="text-green-800 leading-relaxed">
                    {selectedStudy.outcome}
                  </p>
                </div>

                {/* Testimonial */}
                {selectedStudy.testimonial && (
                  <div className="bg-hampstead-cream p-6 mb-6">
                    <blockquote className="text-lg italic text-hampstead-charcoal/80 mb-4">
                      &ldquo;{selectedStudy.testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="text-sm">
                      <span className="font-medium">{selectedStudy.testimonial.author}</span>
                      <span className="text-hampstead-charcoal/60"> — {selectedStudy.testimonial.role}</span>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={`/contact?subject=restoration-enquiry&project=${encodeURIComponent(selectedStudy.title)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                  onClick={() => setSelectedStudy(null)}
                >
                  Discuss Your Project
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

export default RestorationCaseStudies;
export { caseStudies };
export type { CaseStudy };
