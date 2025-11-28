import type { Metadata } from 'next';
import { getArticlesByCategory } from '@/lib/api';
import ArticleGrid from '@/components/articles/ArticleGrid';

export const metadata: Metadata = {
  title: 'Living | The Hampstead Design Journal',
  description: 'Explore articles on living in North West London, featuring design insights and lifestyle tips for Hampstead residents.',
};

export default async function LivingPage() {
  const articles = getArticlesByCategory('living');

  return (
    <main className="min-h-screen">
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Living</h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed">
              Lifestyle and living in Hampstead and North West London.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="editorial-container">
          {articles.length > 0 ? (
            <ArticleGrid articles={articles} />
          ) : (
            <p className="text-center text-hampstead-charcoal/60">
              No articles in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}