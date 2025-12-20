import type { Metadata } from 'next';
import { getArticlesByCategory } from '@/lib/api';
import ArticleGrid from '@/components/articles/ArticleGrid';
import MaterialPalette from '@/components/interiors/MaterialPalette';

export const metadata: Metadata = {
  title: 'Interiors & Materials | The Hampstead Design Journal',
  description: 'Curated insights on interior design, finishes, and materials for North West London homes. From herringbone oak to bespoke joinery.',
  keywords: 'Hampstead interiors, luxury materials London, engineered oak flooring, bespoke joinery NW3',
};

export default function InteriorsMaterialsPage() {
  const articles = getArticlesByCategory('interiors-materials');

  return (
    <main className="min-h-screen">
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
              Design & Living
            </span>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Interiors & Materials</h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed">
              A curated exploration of finishes, materials, and interior design for
              discerning Hampstead homeowners. From selecting the perfect engineered oak flooring to specifying natural stone worktops.
            </p>
          </div>
        </div>
      </section>

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
