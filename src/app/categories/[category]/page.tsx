import { allArticles } from 'contentlayer/generated';
import { compareDesc, format } from 'date-fns';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: { category: string };
}

const categories = {
  'heritage-architecture': {
    title: 'Heritage & Architecture',
    description: 'The history, construction methods, and restoration techniques specific to Hampstead\'s Arts & Crafts, Victorian, and Edwardian buildings.',
  },
  'planning-regulations': {
    title: 'Planning & Regulations',
    description: 'Navigating Camden Council\'s planning policies, conservation area rules, and building regulations for your Hampstead project.',
  },
  'interiors-materials': {
    title: 'Interiors & Materials',
    description: 'Specification guidance for finishes, materials, and interior design appropriate to North West London\'s finest homes.',
  },
  'market-watch': {
    title: 'Market Watch',
    description: 'Data-driven analysis of property values, renovation ROI, and market trends across Hampstead and NW3.',
  },
};

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = categories[params.category as keyof typeof categories];
  if (!category) return {};

  return {
    title: `${category.title} | The Hampstead Design Journal`,
    description: category.description,
    alternates: {
      canonical: `/categories/${params.category}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryInfo = categories[params.category as keyof typeof categories];

  if (!categoryInfo) {
    notFound();
  }

  const articles = allArticles
    .filter((article) => article.category === params.category)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <Link 
            href="/journal/articles"
            className="inline-flex items-center text-sm uppercase tracking-widest text-hampstead-charcoal/60 hover:text-hampstead-black mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Articles
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              {categoryInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-hampstead-charcoal/80 leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>
          <div className="mt-8 text-sm text-hampstead-charcoal/60">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          </div>
        </div>
      </section>

      {articles.length === 0 ? (
        <section className="py-24">
          <div className="editorial-container text-center">
            <p className="text-xl text-hampstead-charcoal/60">
              No articles in this category yet.
            </p>
            <Link 
              href="/journal/articles"
              className="inline-flex items-center mt-6 text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors"
            >
              Browse All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Article */}
          {featuredArticle && (
            <section className="py-16 border-b border-hampstead-grey">
              <div className="editorial-container">
                <article className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="aspect-[4/3] bg-hampstead-grey/30 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-hampstead-charcoal/20 font-serif italic">
                      Featured Image
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/60 mb-3 block">
                      Latest
                    </span>
                    <Link href={`/journal/articles/${featuredArticle.slug}`} className="group">
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
                        href={`/journal/articles/${featuredArticle.slug}`}
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

          {/* More Articles */}
          {remainingArticles.length > 0 && (
            <section className="py-16">
              <div className="editorial-container">
                <h2 className="font-serif text-3xl mb-12">More Articles</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {remainingArticles.map((article) => (
                    <article key={article.slug} className="group">
                      <Link href={`/journal/articles/${article.slug}`} className="block">
                        <div className="aspect-[4/3] bg-hampstead-grey/30 mb-4 overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center text-hampstead-charcoal/20 font-serif italic group-hover:bg-hampstead-grey/50 transition-colors">
                            No Image
                          </div>
                        </div>
                        <time className="text-xs uppercase tracking-widest text-hampstead-charcoal/60 mb-2 block">
                          {format(new Date(article.date), 'MMMM d, yyyy')}
                        </time>
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
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
