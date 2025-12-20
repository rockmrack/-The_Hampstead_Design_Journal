import type { Metadata } from 'next';
import { getArticlesByCategory } from '@/lib/api';
import ArticleGrid from '@/components/articles/ArticleGrid';
import MaterialPalette from '@/components/interiors/MaterialPalette';

export const metadata: Metadata = {
  title: 'Interiors & Materials | The Hampstead Design Journal',
  description: 'Curated insights on interior design, finishes, and materials for North West London homes. From herringbone oak to bespoke joinery.',
  keywords: 'Hampstead interiors, luxury materials London, engineered oak flooring, bespoke joinery NW3',
};

const topics = [
  { title: 'Flooring', description: 'Engineered oak, natural stone, reclaimed timber' },
  { title: 'Kitchens', description: 'Design layouts, cabinetry, and material selection' },
  { title: 'Bathrooms', description: 'Finishes, fixtures, and spa-like sanctuaries' },
  { title: 'Joinery', description: 'Bespoke fitted furniture and storage solutions' },
  { title: 'Finishes', description: 'Paint, wallcoverings, and decorative plaster' },
  { title: 'Lighting', description: 'Architectural specification and decorative fixtures' },
];

export default function InteriorsMaterialsPage() {
  const articles = getArticlesByCategory('interiors-materials');

  return (
    <main className="min-h-screen">
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
              Design & Living
            </span>
            <h1 className="font-serif text-5xl md:text-6xl mb-8">Interiors & Materials</h1>
            <div className="w-24 h-px bg-hampstead-charcoal/20 mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-hampstead-charcoal/80 leading-relaxed font-serif">
              The selection of materials and finishes defines the character of a home. From
              selecting the perfect engineered oak flooring to specifying natural stone worktops
              or commissioning bespoke joinery, every detail matters.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <div key={topic.title} className="p-8 bg-stone-50 border border-stone-100 hover:border-hampstead-olive/30 transition-colors group">
                <h3 className="font-serif text-2xl mb-3 group-hover:text-hampstead-olive transition-colors">{topic.title}</h3>
                <p className="text-hampstead-charcoal/70 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
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
