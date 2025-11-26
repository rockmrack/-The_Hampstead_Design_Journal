import type { Metadata } from 'next';
import Link from 'next/link';
import { allArticles } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import NewsletterSignup from '../components/layout/NewsletterSignup';
import HeroSection from '../components/home/HeroSection';
import LatestArticles from '../components/home/LatestArticles';

export const metadata: Metadata = {
  title: 'The Hampstead Design Journal | Architecture, Interiors, and Living in NW3',
  description: 'The authoritative voice on architecture, heritage restoration, and interior design in North West London. Expert insights on Hampstead\'s finest homes.',
};

export default function HomePage() {
  const articles = allArticles.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <HeroSection />

      <LatestArticles articles={articles} />

      {/* Content Pillars */}
      <section className="section-spacing bg-hampstead-cream border-y border-hampstead-grey">
        <div className="editorial-container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Curated Collections</h2>
            <div className="editorial-divider" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-px bg-hampstead-charcoal/10 border border-hampstead-charcoal/10 overflow-hidden">
            <Link 
              href="/categories/heritage-architecture" 
              className="group relative bg-hampstead-white p-12 hover:bg-hampstead-cream transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/40 mb-4 block">01</span>
              <h3 className="font-serif text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                Heritage & Architecture
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal/80 mb-8">
                The history, construction methods, and restoration techniques specific to 
                Hampstead's Arts & Crafts, Victorian, and Edwardian buildings.
              </p>
              <span className="text-sm uppercase tracking-wide border-b border-hampstead-black pb-1">Explore Collection</span>
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
                Navigating Camden Council's planning policies, conservation area rules, 
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
                appropriate to North West London's finest homes.
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