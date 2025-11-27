import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, BookOpen } from 'lucide-react';
import BluePlaqueMap from '@/components/archive/BluePlaqueMap';
import LostDetailsLibrary from '@/components/archive/LostDetailsLibrary';

export const metadata: Metadata = {
  title: 'The Heritage Archive | The Hampstead Design Journal',
  description: 'Preserving the architectural legacy of North West London. Explore the history, construction methods, and restoration techniques of Hampstead\'s finest streets.',
  keywords: 'Hampstead history, NW3 architecture, Victorian houses London, heritage restoration, conservation area',
};

const streetProfiles = [
  {
    slug: 'redington-road',
    name: 'Redington Road',
    era: 'Arts & Crafts',
    period: '1890-1910',
    excerpt: 'The peak of the Arts & Crafts movement in Hampstead. Deep red brick and terracotta detailing define this prestigious address.',
    image: '/images/archive/streets/redington-road.jpg',
    featured: true,
  },
  {
    slug: 'frognal',
    name: 'Frognal',
    era: 'Mixed Heritage',
    period: '1870-1920',
    excerpt: 'From grand Victorian villas to Arts & Crafts gems, Frognal charts the evolution of Hampstead architecture.',
    image: '/images/archive/streets/frognal.jpg',
    featured: false,
  },
  {
    slug: 'the-bishops-avenue',
    name: 'The Bishops Avenue',
    era: 'Edwardian & Inter-War',
    period: '1900-1935',
    excerpt: 'London\'s "Billionaires\' Row" began as Arts & Crafts mansions before embracing Inter-War grandeur.',
    image: '/images/archive/streets/bishops-avenue.jpg',
    featured: false,
  },
  {
    slug: 'hampstead-garden-suburb',
    name: 'Hampstead Garden Suburb',
    era: 'Garden City',
    period: '1907-1915',
    excerpt: 'A planned utopia designed by Parker & Unwin. The definitive example of Garden City architecture.',
    image: '/images/archive/streets/garden-suburb.jpg',
    featured: false,
  },
  {
    slug: 'belsize-park',
    name: 'Belsize Park',
    era: 'Victorian Stucco',
    period: '1850-1880',
    excerpt: 'The white stucco villas that define Victorian Belsize. Italianate grandeur meets London living.',
    image: '/images/archive/streets/belsize-park.jpg',
    featured: false,
  },
  {
    slug: 'well-walk',
    name: 'Well Walk',
    era: 'Georgian',
    period: '1700-1800',
    excerpt: 'The oldest residential street in our archive. Georgian elegance from Hampstead\'s spa town era.',
    image: '/images/archive/streets/well-walk.jpg',
    featured: false,
  },
];

export default function ArchivePage() {
  const featuredStreet = streetProfiles.find(s => s.featured);
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
              Preserving the Architectural Legacy of North West London
            </h1>
            <p className="text-xl md:text-2xl text-hampstead-charcoal/70 leading-relaxed max-w-2xl">
              A digital museum documenting the construction DNA of NW3&apos;s finest streets. 
              History, materials, and the craftsmanship that defines Hampstead.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl">
            <div>
              <div className="text-3xl md:text-4xl font-serif">{streetProfiles.length}</div>
              <div className="text-sm text-hampstead-charcoal/50 uppercase tracking-wide">Street Profiles</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif">200+</div>
              <div className="text-sm text-hampstead-charcoal/50 uppercase tracking-wide">Years of History</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif">15+</div>
              <div className="text-sm text-hampstead-charcoal/50 uppercase tracking-wide">Moulding Profiles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b border-hampstead-grey sticky top-[73px] bg-hampstead-white z-30">
        <div className="editorial-container">
          <nav className="flex overflow-x-auto gap-8 py-4">
            <a href="#streets" className="text-sm uppercase tracking-widest font-medium whitespace-nowrap hover:text-hampstead-charcoal/70 transition-colors">
              Street Profiles
            </a>
            <a href="#map" className="text-sm uppercase tracking-widest font-medium whitespace-nowrap hover:text-hampstead-charcoal/70 transition-colors">
              Blue Plaque Map
            </a>
            <a href="#details" className="text-sm uppercase tracking-widest font-medium whitespace-nowrap hover:text-hampstead-charcoal/70 transition-colors">
              Lost Details Library
            </a>
          </nav>
        </div>
      </section>

      {/* Featured Street */}
      {featuredStreet && (
        <section className="section-spacing">
          <div className="editorial-container">
            <Link
              href={`/archive/${featuredStreet.slug}`}
              className="group grid md:grid-cols-2 gap-8 md:gap-12"
            >
              <div className="aspect-[4/3] bg-hampstead-grey relative overflow-hidden">
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-gradient-to-br from-hampstead-charcoal/20 to-hampstead-charcoal/5 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-hampstead-charcoal/30" />
                </div>
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-hampstead-black text-white text-xs font-medium uppercase tracking-wide">
                  Featured Profile
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm text-hampstead-charcoal/50 mb-4">
                  <span className="uppercase tracking-wide">{featuredStreet.era}</span>
                  <span>•</span>
                  <span>{featuredStreet.period}</span>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl mb-4 group-hover:text-hampstead-charcoal/80 transition-colors">
                  The {featuredStreet.name} Archive
                </h2>

                <p className="text-lg text-hampstead-charcoal/70 leading-relaxed mb-6">
                  {featuredStreet.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide group-hover:gap-3 transition-all">
                  Explore the Archive
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Street Profiles Grid */}
      <section id="streets" className="section-spacing bg-hampstead-cream border-y border-hampstead-grey">
        <div className="editorial-container">
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Browse by Street</h2>
            <p className="text-lg text-hampstead-charcoal/70">
              Each profile contains the history, construction details, and restoration guidance 
              specific to that address.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherStreets.map((street) => (
              <Link
                key={street.slug}
                href={`/archive/${street.slug}`}
                className="group bg-white border border-hampstead-grey hover:border-hampstead-charcoal/30 transition-colors"
              >
                <div className="aspect-video bg-hampstead-grey relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-hampstead-charcoal/10 to-transparent flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-hampstead-charcoal/20" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-hampstead-charcoal/50 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{street.period}</span>
                    <span>•</span>
                    <span className="uppercase tracking-wide">{street.era}</span>
                  </div>

                  <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                    {street.name}
                  </h3>

                  <p className="text-sm text-hampstead-charcoal/70 line-clamp-2">
                    {street.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                    <BookOpen className="w-4 h-4" />
                    Read Profile
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blue Plaque Map */}
      <section id="map" className="section-spacing">
        <div className="editorial-container">
          <BluePlaqueMap />
        </div>
      </section>

      {/* Lost Details Library */}
      <section id="details" className="section-spacing bg-hampstead-cream border-t border-hampstead-grey">
        <div className="editorial-container">
          <LostDetailsLibrary limit={6} />
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
            Book a Heritage Survey before any work begins.
          </p>
          <Link
            href="/contact?subject=heritage-survey"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-hampstead-black font-medium hover:bg-hampstead-cream transition-colors"
          >
            Book a Heritage Survey
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
