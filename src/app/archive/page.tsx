import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, BookOpen, Building, Paintbrush, Users, FileText, Landmark, Wrench, Library } from 'lucide-react';
import BluePlaqueMap from '@/components/archive/BluePlaqueMap';
import LostDetailsLibrary from '@/components/archive/LostDetailsLibrary';
import ArchitecturalTimeline from '@/components/archive/ArchitecturalTimeline';
import ConservationAreaGuide from '@/components/archive/ConservationAreaGuide';
import MaterialsLibrary from '@/components/archive/MaterialsLibrary';
import HistoricTradesDirectory from '@/components/archive/HistoricTradesDirectory';
import RestorationCaseStudies from '@/components/archive/RestorationCaseStudies';
import ArchitecturalGlossary from '@/components/archive/ArchitecturalGlossary';

export const metadata: Metadata = {
  title: 'The Heritage Archive | The Hampstead Design Journal',
  description: 'The definitive resource for preserving North West London\'s architectural legacy. Street profiles, conservation guides, materials library, historic trades, restoration case studies, and 300 years of architectural history.',
  keywords: 'Hampstead history, NW3 architecture, Victorian houses London, heritage restoration, conservation area, Arts and Crafts, Georgian, Edwardian, listed building, lime mortar, sash windows, heritage materials',
  alternates: {
    canonical: '/archive',
  },
};

// Comprehensive street profiles database - now 30+ streets
const streetProfiles = [
  // ARTS & CRAFTS
  {
    slug: 'redington-road',
    name: 'Redington Road',
    era: 'Arts & Crafts',
    period: '1890-1910',
    excerpt: 'The peak of the Arts & Crafts movement in Hampstead. Deep red brick and terracotta detailing define this prestigious address.',
    conservationArea: 'Redington Frognal',
    featured: true,
  },
  {
    slug: 'frognal',
    name: 'Frognal',
    era: 'Mixed Heritage',
    period: '1870-1920',
    excerpt: 'From grand Victorian villas to Arts & Crafts gems, Frognal charts the evolution of Hampstead architecture.',
    conservationArea: 'Redington Frognal',
    featured: false,
  },
  {
    slug: 'frognal-lane',
    name: 'Frognal Lane',
    era: 'Victorian/Edwardian',
    period: '1880-1910',
    excerpt: 'A quieter cousin to Frognal proper, featuring substantial family houses with generous gardens.',
    conservationArea: 'Redington Frognal',
    featured: false,
  },
  {
    slug: 'oak-hill-way',
    name: 'Oak Hill Way',
    era: 'Arts & Crafts',
    period: '1900-1914',
    excerpt: 'Architect-designed houses in mature woodland settings. Parker & Unwin influences throughout.',
    conservationArea: 'Redington Frognal',
    featured: false,
  },
  {
    slug: 'templewood-avenue',
    name: 'Templewood Avenue',
    era: 'Arts & Crafts',
    period: '1905-1914',
    excerpt: 'Substantial Arts & Crafts houses with distinctive roughcast render and leaded light windows.',
    conservationArea: 'Redington Frognal',
    featured: false,
  },
  {
    slug: 'wildwood-road',
    name: 'Wildwood Road',
    era: 'Arts & Crafts',
    period: '1900-1912',
    excerpt: 'Secluded woodland setting with architect-designed houses of exceptional character.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  
  // HAMPSTEAD GARDEN SUBURB
  {
    slug: 'hampstead-garden-suburb',
    name: 'Hampstead Garden Suburb',
    era: 'Garden City',
    period: '1907-1915',
    excerpt: 'A planned utopia designed by Parker & Unwin. The definitive example of Garden City architecture.',
    conservationArea: 'Hampstead Garden Suburb',
    featured: true,
  },
  {
    slug: 'meadway',
    name: 'Meadway',
    era: 'Garden City',
    period: '1908-1912',
    excerpt: 'One of the original roads of the Suburb, featuring carefully designed cottages and larger houses.',
    conservationArea: 'Hampstead Garden Suburb',
    featured: false,
  },
  {
    slug: 'heathgate',
    name: 'Heathgate',
    era: 'Garden City',
    period: '1910-1914',
    excerpt: 'Premium houses on the edge of the Heath Extension with views across the green spaces.',
    conservationArea: 'Hampstead Garden Suburb',
    featured: false,
  },
  {
    slug: 'hampstead-way',
    name: 'Hampstead Way',
    era: 'Garden City',
    period: '1907-1920',
    excerpt: 'The main thoroughfare of the Suburb, connecting Central Square to Hampstead Heath.',
    conservationArea: 'Hampstead Garden Suburb',
    featured: false,
  },
  
  // EDWARDIAN & INTER-WAR
  {
    slug: 'the-bishops-avenue',
    name: 'The Bishops Avenue',
    era: 'Edwardian & Inter-War',
    period: '1900-1935',
    excerpt: 'London\'s "Billionaires\' Row" began as Arts & Crafts mansions before embracing Inter-War grandeur.',
    conservationArea: 'Kenwood',
    featured: true,
  },
  {
    slug: 'winnington-road',
    name: 'Winnington Road',
    era: 'Edwardian',
    period: '1905-1914',
    excerpt: 'Large Edwardian houses in spacious grounds, adjacent to Kenwood House.',
    conservationArea: 'Kenwood',
    featured: false,
  },
  
  // VICTORIAN STUCCO
  {
    slug: 'belsize-park',
    name: 'Belsize Park',
    era: 'Victorian Stucco',
    period: '1850-1880',
    excerpt: 'The white stucco villas that define Victorian Belsize. Italianate grandeur meets London living.',
    conservationArea: 'Belsize',
    featured: true,
  },
  {
    slug: 'belsize-square',
    name: 'Belsize Square',
    era: 'Victorian',
    period: '1855-1865',
    excerpt: 'One of the finest Victorian garden squares in London, with mature plane trees and grand villas.',
    conservationArea: 'Belsize',
    featured: false,
  },
  {
    slug: 'belsize-park-gardens',
    name: 'Belsize Park Gardens',
    era: 'Victorian',
    period: '1860-1875',
    excerpt: 'Substantial Victorian terraces with elaborate stucco decoration and impressive entrance porticos.',
    conservationArea: 'Belsize',
    featured: false,
  },
  {
    slug: 'eton-avenue',
    name: 'Eton Avenue',
    era: 'Victorian',
    period: '1855-1875',
    excerpt: 'Wide tree-lined avenue with grand semi-detached stucco villas in the Italianate style.',
    conservationArea: 'Belsize',
    featured: false,
  },
  {
    slug: 'adamson-road',
    name: 'Adamson Road',
    era: 'Victorian',
    period: '1860-1880',
    excerpt: 'Impressive Victorian terraces with elaborate decorative features and generous proportions.',
    conservationArea: 'Belsize',
    featured: false,
  },
  
  // GEORGIAN
  {
    slug: 'well-walk',
    name: 'Well Walk',
    era: 'Georgian',
    period: '1700-1800',
    excerpt: 'The oldest residential street in our archive. Georgian elegance from Hampstead\'s spa town era.',
    conservationArea: 'Hampstead',
    featured: true,
  },
  {
    slug: 'church-row',
    name: 'Church Row',
    era: 'Georgian',
    period: '1720-1740',
    excerpt: 'Perhaps the finest Georgian street in London. Complete with original railings and lamp posts.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  {
    slug: 'flask-walk',
    name: 'Flask Walk',
    era: 'Georgian/Victorian',
    period: '1720-1850',
    excerpt: 'The ancient heart of Hampstead village, named for the flasks of chalybeate water sold here.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  {
    slug: 'holly-walk',
    name: 'Holly Walk',
    era: 'Georgian',
    period: '1750-1820',
    excerpt: 'A peaceful lane of modest Georgian cottages leading to the old burial ground.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  
  // HIGH VICTORIAN
  {
    slug: 'fitzjohns-avenue',
    name: 'Fitzjohns Avenue',
    era: 'High Victorian',
    period: '1870-1890',
    excerpt: 'Grand High Victorian villas on dramatic sloping terrain, with elaborate Gothic and Queen Anne details.',
    conservationArea: 'Fitzjohns/Netherhall',
    featured: false,
  },
  {
    slug: 'netherhall-gardens',
    name: 'Netherhall Gardens',
    era: 'Victorian',
    period: '1875-1895',
    excerpt: 'Substantial Victorian houses in a quiet cul-de-sac setting, including Elgar\'s former residence.',
    conservationArea: 'Fitzjohns/Netherhall',
    featured: false,
  },
  {
    slug: 'maresfield-gardens',
    name: 'Maresfield Gardens',
    era: 'Queen Anne Revival',
    period: '1885-1905',
    excerpt: 'Home to Sigmund Freud\'s house, with excellent Queen Anne Revival architecture throughout.',
    conservationArea: 'Fitzjohns/Netherhall',
    featured: false,
  },
  {
    slug: 'arkwright-road',
    name: 'Arkwright Road',
    era: 'High Victorian',
    period: '1875-1890',
    excerpt: 'Substantial brick-built Victorian houses with elaborate stone dressings and Gothic influences.',
    conservationArea: 'Fitzjohns/Netherhall',
    featured: false,
  },
  {
    slug: 'lyndhurst-road',
    name: 'Lyndhurst Road',
    era: 'Victorian',
    period: '1870-1890',
    excerpt: 'Imposing Victorian villas on the slopes leading to Hampstead Heath.',
    conservationArea: 'Fitzjohns/Netherhall',
    featured: false,
  },
  
  // REGENCY
  {
    slug: 'downshire-hill',
    name: 'Downshire Hill',
    era: 'Regency',
    period: '1815-1835',
    excerpt: 'Elegant Regency villas and cottages ornées on the southern slopes of Hampstead.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  {
    slug: 'keats-grove',
    name: 'Keats Grove',
    era: 'Regency',
    period: '1814-1820',
    excerpt: 'Home of Keats House, with fine Regency villas in generous gardens.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  
  // MODERN MOVEMENT
  {
    slug: 'willow-road',
    name: 'Willow Road',
    era: 'Modern Movement',
    period: '1938-1939',
    excerpt: 'Home to Erno Goldfinger\'s revolutionary modernist terrace, now National Trust property.',
    conservationArea: 'South Hill Park',
    featured: false,
  },
  {
    slug: 'lawn-road',
    name: 'Lawn Road (Isokon)',
    era: 'Modern Movement',
    period: '1934',
    excerpt: 'The Grade I listed Isokon Building - a pioneering modernist apartment block by Wells Coates.',
    conservationArea: 'South Hill Park',
    featured: false,
  },
  {
    slug: 'south-hill-park',
    name: 'South Hill Park',
    era: 'Mixed',
    period: '1850-1970',
    excerpt: 'Victorian and Edwardian houses alongside important Modern Movement buildings.',
    conservationArea: 'South Hill Park',
    featured: false,
  },
  
  // ADDITIONAL NOTABLE STREETS
  {
    slug: 'heath-street',
    name: 'Heath Street',
    era: 'Mixed Heritage',
    period: '1720-1900',
    excerpt: 'The main commercial artery of Hampstead village, with buildings from Georgian to Victorian.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  {
    slug: 'hampstead-high-street',
    name: 'Hampstead High Street',
    era: 'Georgian/Victorian',
    period: '1750-1890',
    excerpt: 'The historic high street with important shopfronts and upper floor residential.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  {
    slug: 'hampstead-grove',
    name: 'Hampstead Grove',
    era: 'Georgian/Victorian',
    period: '1750-1870',
    excerpt: 'Quiet residential enclave with a mix of Georgian cottages and Victorian houses.',
    conservationArea: 'Hampstead',
    featured: false,
  },
  {
    slug: 'platts-lane',
    name: 'Platts Lane',
    era: 'Victorian/Edwardian',
    period: '1880-1914',
    excerpt: 'Substantial late Victorian and Edwardian houses on the Childs Hill borders.',
    conservationArea: 'Various',
    featured: false,
  },
];

// Archive section navigation
const archiveSections = [
  { id: 'streets', name: 'Street Profiles', icon: MapPin, count: streetProfiles.length },
  { id: 'timeline', name: 'Timeline', icon: Clock, count: '10 eras' },
  { id: 'conservation', name: 'Conservation Areas', icon: Landmark, count: '7 areas' },
  { id: 'materials', name: 'Materials Library', icon: Paintbrush, count: '15+ materials' },
  { id: 'trades', name: 'Historic Trades', icon: Wrench, count: '8 trades' },
  { id: 'case-studies', name: 'Case Studies', icon: FileText, count: '5 projects' },
  { id: 'map', name: 'Blue Plaque Map', icon: Building, count: '6 plaques' },
  { id: 'details', name: 'Lost Details', icon: Library, count: '6 profiles' },
  { id: 'glossary', name: 'Glossary', icon: BookOpen, count: '30+ terms' },
];

export default function ArchivePage() {
  const featuredStreets = streetProfiles.filter(s => s.featured);
  const otherStreets = streetProfiles.filter(s => !s.featured);

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-16 md:py-24">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
              The Hampstead Heritage Archive
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              The Definitive Resource for NW3&apos;s Architectural Heritage
            </h1>
            <p className="text-xl md:text-2xl text-hampstead-charcoal/70 leading-relaxed max-w-2xl">
              A comprehensive digital archive documenting the construction DNA, materials, 
              history, and restoration techniques of North West London&apos;s finest properties.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            <div>
              <div className="text-3xl md:text-4xl font-serif">{streetProfiles.length}+</div>
              <div className="text-sm text-hampstead-charcoal/50 uppercase tracking-wide">Street Profiles</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif">300+</div>
              <div className="text-sm text-hampstead-charcoal/50 uppercase tracking-wide">Years of History</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif">7</div>
              <div className="text-sm text-hampstead-charcoal/50 uppercase tracking-wide">Conservation Areas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif">10</div>
              <div className="text-sm text-hampstead-charcoal/50 uppercase tracking-wide">Architectural Eras</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Navigation */}
      <section className="border-b border-hampstead-grey sticky top-[73px] bg-hampstead-white z-30">
        <div className="editorial-container">
          <nav className="flex overflow-x-auto gap-1 py-2 -mx-4 px-4 md:mx-0 md:px-0">
            {archiveSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-hampstead-cream transition-colors rounded"
              >
                <section.icon className="w-4 h-4 text-hampstead-charcoal/50" />
                <span>{section.name}</span>
                <span className="text-xs text-hampstead-charcoal/40">({section.count})</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Featured Streets */}
      <section className="section-spacing">
        <div className="editorial-container">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3 block">
              Featured Archives
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Explore Our Signature Streets</h2>
            <p className="text-lg text-hampstead-charcoal/70 max-w-2xl">
              These comprehensive profiles document the complete architectural DNA of 
              Hampstead&apos;s most significant addresses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStreets.map((street) => (
              <Link
                key={street.slug}
                href={`/archive/${street.slug}`}
                className="group bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors"
              >
                <div className="aspect-video bg-hampstead-cream relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-hampstead-charcoal/10 to-transparent flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-hampstead-charcoal/20" />
                  </div>
                  <div className="absolute top-4 left-4 px-2 py-1 bg-hampstead-black text-white text-xs font-medium uppercase tracking-wide">
                    Featured
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-hampstead-charcoal/50 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{street.period}</span>
                    <span>•</span>
                    <span className="uppercase tracking-wide">{street.era}</span>
                  </div>

                  <h3 className="font-serif text-2xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                    {street.name}
                  </h3>

                  <p className="text-sm text-hampstead-charcoal/70 mb-4">
                    {street.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-hampstead-charcoal/40">
                      {street.conservationArea} CA
                    </span>
                    <span className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Timeline */}
      <section id="timeline" className="section-spacing bg-hampstead-cream border-y border-hampstead-grey">
        <div className="editorial-container">
          <ArchitecturalTimeline />
        </div>
      </section>

      {/* All Street Profiles Grid */}
      <section id="streets" className="section-spacing">
        <div className="editorial-container">
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Browse All Street Profiles</h2>
            <p className="text-lg text-hampstead-charcoal/70">
              Each profile contains the history, construction details, materials specifications, 
              and restoration guidance specific to that address.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {otherStreets.map((street) => (
              <Link
                key={street.slug}
                href={`/archive/${street.slug}`}
                className="group p-4 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-hampstead-charcoal/50 mb-1">
                  <span>{street.period}</span>
                  <span>•</span>
                  <span className="uppercase tracking-wide">{street.era}</span>
                </div>

                <h3 className="font-serif text-lg mb-1 group-hover:text-hampstead-charcoal/80 transition-colors">
                  {street.name}
                </h3>

                <p className="text-xs text-hampstead-charcoal/50 line-clamp-2">
                  {street.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation Areas */}
      <section id="conservation" className="section-spacing bg-hampstead-cream border-y border-hampstead-grey">
        <div className="editorial-container">
          <ConservationAreaGuide />
        </div>
      </section>

      {/* Materials Library */}
      <section id="materials" className="section-spacing">
        <div className="editorial-container">
          <MaterialsLibrary />
        </div>
      </section>

      {/* Historic Trades Directory */}
      <section id="trades" className="section-spacing bg-hampstead-cream border-y border-hampstead-grey">
        <div className="editorial-container">
          <HistoricTradesDirectory />
        </div>
      </section>

      {/* Restoration Case Studies */}
      <section id="case-studies" className="section-spacing">
        <div className="editorial-container">
          <RestorationCaseStudies />
        </div>
      </section>

      {/* Blue Plaque Map */}
      <section id="map" className="section-spacing bg-hampstead-cream border-y border-hampstead-grey">
        <div className="editorial-container">
          <BluePlaqueMap />
        </div>
      </section>

      {/* Lost Details Library */}
      <section id="details" className="section-spacing">
        <div className="editorial-container">
          <LostDetailsLibrary />
        </div>
      </section>

      {/* Architectural Glossary */}
      <section id="glossary" className="section-spacing bg-hampstead-cream border-y border-hampstead-grey">
        <div className="editorial-container">
          <ArchitecturalGlossary />
        </div>
      </section>

      {/* Explore More */}
      <section className="section-spacing">
        <div className="editorial-container">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Dive Deeper</h2>
            <p className="text-lg text-hampstead-charcoal/70">
              Explore dedicated sections of our heritage archive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/archive/timeline"
              className="p-6 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors group"
            >
              <Clock className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                Architectural Timeline
              </h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Explore 300 years of NW3 architecture era by era
              </p>
            </Link>

            <Link
              href="/archive/conservation-areas"
              className="p-6 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors group"
            >
              <Landmark className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                Conservation Areas
              </h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Detailed guides to planning restrictions and permissions
              </p>
            </Link>

            <Link
              href="/archive/materials"
              className="p-6 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors group"
            >
              <Paintbrush className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                Materials Library
              </h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Authentic materials with sourcing information
              </p>
            </Link>

            <Link
              href="/archive/trades"
              className="p-6 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors group"
            >
              <Wrench className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                Historic Trades
              </h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Vetted craftspeople who understand heritage
              </p>
            </Link>

            <Link
              href="/archive/case-studies"
              className="p-6 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors group"
            >
              <FileText className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                Case Studies
              </h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Detailed restoration project documentation
              </p>
            </Link>

            <Link
              href="/archive/lost-details"
              className="p-6 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors group"
            >
              <Library className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                Lost Details Library
              </h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Original NW3 moulding profiles and cornicing
              </p>
            </Link>

            <Link
              href="/archive/glossary"
              className="p-6 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors group"
            >
              <BookOpen className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                Glossary
              </h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Architectural terminology explained
              </p>
            </Link>

            <Link
              href="/archive/blue-plaques"
              className="p-6 bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors group"
            >
              <Building className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                Blue Plaques
              </h3>
              <p className="text-sm text-hampstead-charcoal/60">
                Famous residents and their historic homes
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-hampstead-black text-white py-16 md:py-24">
        <div className="editorial-container text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            We Are the Guardians of NW3&apos;s Heritage
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Don&apos;t let a standard builder ruin your heritage asset. 
            We hold original material specifications for streets across Hampstead.
            Book a Heritage Survey before any work begins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?subject=heritage-survey"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-hampstead-black font-medium hover:bg-hampstead-cream transition-colors"
            >
              Book a Heritage Survey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
