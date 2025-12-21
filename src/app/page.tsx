import type { Metadata } from 'next';
import Link from 'next/link';
import { allArticles } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { ArrowRight, MapPin, Building2, Compass, Star } from 'lucide-react';
import NewsletterSignup from '../components/layout/NewsletterSignup';
import CinematicHero from '../components/home/CinematicHero';
import MarketTicker from '../components/home/MarketTicker';
import EditorialSection from '../components/home/EditorialSection';
import MagazineGrid from '../components/home/MagazineGrid';

export const metadata: Metadata = {
  title: 'The Hampstead Design Journal | Architecture, Interiors, and Living in NW3',
  description: 'The authoritative voice on architecture, heritage restoration, and interior design in North West London. Expert insights on Hampstead\'s finest homes.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  // Helper to transform articles for components
  const transformArticle = (article: any) => ({
    _id: article._id,
    title: article.title,
    slug: article.slug,
    date: article.date,
    excerpt: article.excerpt,
    category: article.category,
    url: article.url,
    coverImage: article.coverImage,
    image: article.coverImage, // For EditorialSection compatibility
  });

  // 1. Latest Articles (for Magazine Grid)
  const latestArticles = allArticles
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 10)
    .map(transformArticle);

  // 2. Heritage Edit (Architecture focus)
  const heritageArticles = allArticles
    .filter(a => a.category === 'architecture' || a.category === 'heritage-architecture')
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)
    .map(transformArticle);

  // 3. Living Edit (Interiors focus)
  const livingArticles = allArticles
    .filter(a => a.category === 'interiors' || a.category === 'interiors-materials')
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)
    .map(transformArticle);

  return (
    <>
      <CinematicHero />
      
      <MarketTicker />

      {/* Quick Navigation Pillars */}
      <section className="py-16 bg-white border-b border-hampstead-grey">
        <div className="editorial-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Building2, label: 'Heritage Archive', href: '/archive', desc: 'Street-by-street history' },
              { icon: Compass, label: 'Planning Guide', href: '/guides', desc: 'Navigate regulations' },
              { icon: Star, label: 'Directory', href: '/directory', desc: 'Trusted professionals' },
              { icon: MapPin, label: 'Market Data', href: '/market', desc: 'Live NW3 prices' },
            ].map((item, idx) => (
              <Link 
                key={idx}
                href={item.href}
                className="group p-6 border border-hampstead-grey hover:border-hampstead-black hover:bg-hampstead-cream transition-all duration-300"
              >
                <item.icon className="w-6 h-6 mb-4 text-hampstead-charcoal/40 group-hover:text-hampstead-black transition-colors" />
                <h3 className="font-serif text-lg mb-1 group-hover:text-hampstead-black">{item.label}</h3>
                <p className="text-xs text-hampstead-charcoal/60">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Heritage Edit */}
      <EditorialSection 
        title="The Heritage Edit"
        subtitle="Architecture & History"
        description="A curated selection of architectural deep dives, exploring the structural DNA of North West London's most significant period properties."
        articles={heritageArticles.length > 0 ? heritageArticles : latestArticles.slice(0, 3)}
      />

      {/* Latest News Grid */}
      <MagazineGrid articles={latestArticles} />

      {/* The Living Edit */}
      <EditorialSection 
        title="The Living Edit"
        subtitle="Interiors & Lifestyle"
        description="Contemporary interior design meets historic preservation. Discover how modern families are reimagining life inside Hampstead's grandest homes."
        articles={livingArticles.length > 0 ? livingArticles : latestArticles.slice(3, 6)}
        align="right"
      />

      {/* Heritage Archive Feature - Premium Redesign */}
      <section className="py-28 md:py-36 bg-hampstead-black text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="editorial-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-white/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                  The Heritage Archive
                </span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 leading-[0.95] tracking-tight">
                A Digital Museum of NW3&apos;s Legacy
              </h2>
              
              <p className="text-xl text-white/60 leading-relaxed mb-10 font-light max-w-lg">
                Explore the history, construction DNA, and restoration techniques of Hampstead&apos;s 
                most prestigious streets. From Georgian townhouses to Arts & Crafts mansions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/archive"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-hampstead-black font-medium hover:bg-hampstead-cream transition-all duration-300"
                >
                  Explore The Archive
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Link>
                <Link
                  href="/archive/redington-road"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-medium hover:bg-white hover:text-hampstead-black transition-all duration-300"
                >
                  <MapPin className="w-4 h-4" />
                  Redington Road
                </Link>
              </div>
            </div>
            
            {/* Premium Archive Grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { href: '/archive/redington-road', style: 'Arts & Crafts', name: 'Redington Road', offset: false },
                { href: '/archive/frognal', style: 'Mixed Heritage', name: 'Frognal', offset: true },
                { href: '/archive/the-bishops-avenue', style: 'Edwardian', name: 'Bishops Avenue', offset: false },
                { href: '/archive/church-row', style: 'Georgian', name: 'Church Row', offset: true },
              ].map((item, idx) => (
                <Link 
                  key={idx}
                  href={item.href} 
                  className={`group block ${item.offset ? 'mt-10' : ''}`}
                >
                  <div className="aspect-[3/4] bg-white/10 relative overflow-hidden mb-4 border border-white/10 group-hover:border-white/30 transition-all duration-500">
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
                    
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] block mb-2">
                        {item.style}
                      </span>
                      <h4 className="font-serif text-xl group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </h4>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Credibility Section */}
      <section className="py-20 bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Projects Completed' },
              { value: '£2.1B', label: 'Property Value Managed' },
              { value: '48', label: 'Conservation Areas' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="font-serif text-5xl md:text-6xl text-hampstead-black tracking-tight">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-hampstead-charcoal/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}