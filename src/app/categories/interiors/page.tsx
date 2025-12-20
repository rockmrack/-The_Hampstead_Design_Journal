import type { Metadata } from 'next';
import { getArticlesByCategory } from '@/lib/api';
import ArticleGrid from '@/components/articles/ArticleGrid';
import StyleGuide from '@/components/interiors/StyleGuide';
import RoomNavigation from '@/components/interiors/RoomNavigation';
import MaterialPalette from '@/components/interiors/MaterialPalette';

export const metadata: Metadata = {
  title: 'Interiors | The Hampstead Design Journal',
  description: 'Explore the latest trends and insights in interior design in North West London, from period properties to contemporary spaces.',
};

export default async function InteriorsPage() {
  const articles = getArticlesByCategory('interiors');

  return (
    <main className="min-h-screen">
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
              Design & Living
            </span>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Interiors</h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed">
              Interior design inspiration and guidance for period properties in Hampstead and North West London.
              From restoring original features to contemporary interventions.
            </p>
          </div>
        </div>
      </section>

      <StyleGuide />
      <RoomNavigation />
      <MaterialPalette />
      
      <section className="py-16">
        <div className="editorial-container">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl">Latest Stories</h2>
            <div className="hidden md:block h-px bg-hampstead-grey flex-grow ml-8" />
          </div>
          
          {articles.length > 0 ? (
            <ArticleGrid articles={articles} />
          ) : (
            <p className="text-center text-hampstead-charcoal/60 py-12 bg-stone-50">
              No articles in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
