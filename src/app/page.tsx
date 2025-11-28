import type { Metadata } from 'next';
import Link from 'next/link';
import { allArticles } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { ArrowRight, MapPin, BookOpen, Landmark } from 'lucide-react';
import NewsletterSignup from '../components/layout/NewsletterSignup';
import HeroSection from '../components/home/HeroSection';
import LatestArticles from '../components/home/LatestArticles';

export const metadata: Metadata = {
  title: 'The Hampstead Design Journal | Architecture, Interiors, and Living in NW3',
  description: 'The authoritative voice on architecture, heritage restoration, and interior design in North West London. Expert insights on Hampstead\'s finest homes.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const articles = allArticles.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <HeroSection />

      <LatestArticles articles={articles} />

      {/* Heritage Archive Feature */}
      <section className="section-spacing bg-hampstead-black text-white">
        <div className="editorial-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 block">
                The Heritage Archive
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                A Digital Museum of NW3&apos;s Architectural Legacy
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Explore the history, construction DNA, and restoration techniques of Hampstead&apos;s 
                most prestigious streets. From Georgian townhouses to Arts & Crafts mansions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/archive"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-hampstead-black font-medium hover:bg-hampstead-cream transition-colors"
                >
                  Explore The Archive
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/archive/redington-road"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Redington Road Profile
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link href="/archive/redington-road" className="group">
                <div className="aspect-[3/4] bg-white/10 relative overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/60 uppercase tracking-wide">Arts & Crafts</span>
                    <h4 className="font-serif text-lg">Redington Road</h4>
                  </div>
                </div>
              </Link>
              <Link href="/archive/frognal" className="group mt-8">
                <div className="aspect-[3/4] bg-white/10 relative overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/60 uppercase tracking-wide">Mixed Heritage</span>
                    <h4 className="font-serif text-lg">Frognal</h4>
                  </div>
                </div>
              </Link>
              <Link href="/archive/the-bishops-avenue" className="group">
                <div className="aspect-[3/4] bg-white/10 relative overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/60 uppercase tracking-wide">Edwardian</span>
                    <h4 className="font-serif text-lg">Bishops Avenue</h4>
                  </div>
                </div>
              </Link>
              <Link href="/archive" className="group mt-8">
                <div className="aspect-[3/4] bg-white/5 border border-white/20 relative overflow-hidden mb-3 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <div className="text-center">
                    <Landmark className="w-8 h-8 mx-auto mb-2 text-white/50" />
                    <span className="text-sm text-white/70">View All Streets</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="section-spacing bg-hampstead-cream border-y border-hampstead-grey">
        <div className="editorial-container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Curated Collections</h2>
            <div className="editorial-divider" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-px bg-hampstead-charcoal/10 border border-hampstead-charcoal/10 overflow-hidden">
            <Link 
              href="/archive" 
              className="group relative bg-hampstead-white p-12 hover:bg-hampstead-cream transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/40 mb-4 block">01</span>
              <h3 className="font-serif text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                The Heritage Archive
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal/80 mb-8">
                Street profiles, historical photographs, and the construction DNA 
                of NW3&apos;s most prestigious addresses. Our flagship column.
              </p>
              <span className="text-sm uppercase tracking-wide border-b border-hampstead-black pb-1">Explore Archive</span>
            </Link>

            <Link 
              href="/categories/planning-regulations" 
              className="group relative bg-hampstead-white p-12 hover:bg-hampstead-cream transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/40 mb-4 block">02</span>
              <h3 className="font-serif text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                Planning & Regulations
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal/80 mb-8">
                Navigating Camden Council&apos;s planning policies, conservation area rules, 
                and building regulations for your Hampstead project.
              </p>
              <span className="text-sm uppercase tracking-wide border-b border-hampstead-black pb-1">Explore Collection</span>
            </Link>

            <Link 
              href="/categories/interiors-materials" 
              className="group relative bg-hampstead-white p-12 hover:bg-hampstead-cream transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/40 mb-4 block">03</span>
              <h3 className="font-serif text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                Interiors & Materials
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal/80 mb-8">
                Specification guidance for finishes, materials, and interior design 
                appropriate to North West London&apos;s finest homes.
              </p>
              <span className="text-sm uppercase tracking-wide border-b border-hampstead-black pb-1">Explore Collection</span>
            </Link>

            <Link 
              href="/categories/market-watch" 
              className="group relative bg-hampstead-white p-12 hover:bg-hampstead-cream transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/40 mb-4 block">04</span>
              <h3 className="font-serif text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                Market Watch
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal/80 mb-8">
                Data-driven analysis of property values, renovation ROI, and market 
                trends across Hampstead and NW3.
              </p>
              <span className="text-sm uppercase tracking-wide border-b border-hampstead-black pb-1">Explore Collection</span>
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}