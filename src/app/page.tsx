import type { Metadata } from 'next';
import Link from 'next/link';
import { allArticles } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { ArrowRight, MapPin } from 'lucide-react';
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

      {/* The Heritage Edit */}
      <EditorialSection 
        title="The Heritage Edit"
        subtitle="Architecture & History"
        description="A curated selection of architectural deep dives, exploring the structural DNA of North West London's most significant period properties."
        articles={heritageArticles.length > 0 ? heritageArticles : latestArticles.slice(0, 3)}
      />

      {/* Latest News Grid */}
      <section className="section-spacing bg-hampstead-cream">
        <div className="editorial-container mb-12">
          <div className="flex items-end justify-between border-b border-hampstead-black/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-2 block">
                Latest Stories
              </span>
              <h2 className="font-serif text-3xl md:text-4xl">
                Journal Entries
              </h2>
            </div>
            <Link 
              href="/articles"
              className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-hampstead-charcoal/60 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <MagazineGrid articles={latestArticles} />
      </section>

      {/* The Living Edit */}
      <EditorialSection 
        title="The Living Edit"
        subtitle="Interiors & Lifestyle"
        description="Contemporary interior design meets historic preservation. Discover how modern families are reimagining life inside Hampstead's grandest homes."
        articles={livingArticles.length > 0 ? livingArticles : latestArticles.slice(3, 6)}
        align="right"
      />

      {/* Heritage Archive Feature (Preserved from original) */}
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
              <Link href="/archive/church-row" className="group mt-8">
                <div className="aspect-[3/4] bg-white/10 relative overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/60 uppercase tracking-wide">Georgian</span>
                    <h4 className="font-serif text-lg">Church Row</h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}