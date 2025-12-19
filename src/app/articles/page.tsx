import { allArticles } from 'contentlayer/generated';
import { compareDesc, format } from 'date-fns';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Articles | The Hampstead Design Journal',
  description: 'Expert insights on heritage restoration, planning policy, interior design, and property markets across Hampstead, Belsize Park, and NW3.',
  alternates: {
    canonical: '/articles',
  },
};

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'heritage-architecture': 'Heritage & Architecture',
    'planning-regulations': 'Planning & Regulations',
    'interiors-materials': 'Interiors & Materials',
    'market-watch': 'Market Watch',
  };
  return labels[category] || category;
}

export default function ArticlesPage() {
  const sortedArticles = allArticles.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const featuredArticle = sortedArticles.find((a) => a.featured) || sortedArticles[0];
  // Show first 47 articles on the listing page (48 total with featured)
  const remainingArticles = sortedArticles
    .filter((a) => a.slug !== featuredArticle?.slug)
    .slice(0, 47);
  const totalArticles = sortedArticles.length;

  return (
    <>
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              The Archive
            </h1>
            <p className="text-xl md:text-2xl text-hampstead-charcoal/80 leading-relaxed">
              Expert insights on heritage restoration, planning policy, interior design, 
              and property markets across Hampstead, Belsize Park, and NW3.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 border-b border-hampstead-grey">
          <div className="editorial-container">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/60 mb-6 block">
              Featured
            </span>
            <article className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] bg-hampstead-grey/30 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-hampstead-charcoal/20 font-serif italic">
                  Featured Image
                </div>
              </div>
              <div>
                <Link 
                  href={`/categories/${featuredArticle.category}`}
                  className="text-xs uppercase tracking-widest text-hampstead-charcoal/60 hover:text-hampstead-black mb-3 block"
                >
                  {getCategoryLabel(featuredArticle.category)}
                </Link>
                <Link href={`/articles/${featuredArticle.slug}`} className="group">
                  <h2 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-hampstead-charcoal transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                </Link>
                <p className="text-lg text-hampstead-charcoal/80 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-hampstead-charcoal/60">
                    {format(new Date(featuredArticle.date), 'MMMM d, yyyy')}
                  </time>
                  <Link 
                    href={`/articles/${featuredArticle.slug}`}
                    className="inline-flex items-center text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="py-16">
        <div className="editorial-container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl">Latest Articles</h2>
            <span className="text-sm text-hampstead-charcoal/60">
              Showing 48 of {totalArticles.toLocaleString()} articles
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {remainingArticles.map((article) => (
              <article key={article.slug} className="group">
                <Link href={`/articles/${article.slug}`} className="block">
                  <div className="aspect-[4/3] bg-hampstead-grey/30 mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-hampstead-charcoal/20 font-serif italic group-hover:bg-hampstead-grey/50 transition-colors">
                      No Image
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-hampstead-charcoal/60 mb-2">
                    <span>{getCategoryLabel(article.category)}</span>
                    <span>•</span>
                    <time>{format(new Date(article.date), 'MMM d, yyyy')}</time>
                  </div>
                  <h3 className="font-serif text-xl mb-2 group-hover:text-hampstead-charcoal transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-hampstead-charcoal/70 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>

          {/* Link to search for more */}
          <div className="mt-16 text-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-3 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors"
            >
              Browse all {totalArticles.toLocaleString()} articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}