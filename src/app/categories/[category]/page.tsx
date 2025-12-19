import { allArticles } from 'contentlayer/generated';
import { compareDesc, format } from 'date-fns';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

  const allCategoryArticles = allArticles
    .filter((article) => article.category === params.category)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const totalArticles = allCategoryArticles.length;
  const featuredArticle = allCategoryArticles[0];
  // Limit to 48 articles per category page
  const remainingArticles = allCategoryArticles.slice(1, 48);

  return (
    <>
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <Link 
            href="/articles"
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
            {totalArticles} {totalArticles === 1 ? 'article' : 'articles'}
          </div>
        </div>
      </section>

      {totalArticles === 0 ? (
        <section className="py-24">
          <div className="editorial-container text-center">
            <p className="text-xl text-hampstead-charcoal/60">
              No articles in this category yet.
            </p>
            <Link 
              href="/articles"
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
                  <div className="aspect-[4/3] bg-hampstead-grey/30 overflow-hidden relative">
                    {featuredArticle.coverImage ? (
                      <Image
                        src={featuredArticle.coverImage}
                        alt={featuredArticle.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-hampstead-charcoal/20 font-serif italic">
                        Featured Image
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/60 mb-3 block">
                      Latest
                    </span>
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

          {/* More Articles */}
          {remainingArticles.length > 0 && (
            <section className="py-16">
              <div className="editorial-container">
                <h2 className="font-serif text-3xl mb-12">More Articles</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {remainingArticles.map((article) => (
                    <article key={article.slug} className="group">
                      <Link href={`/articles/${article.slug}`} className="block">
                        <div className="aspect-[4/3] bg-hampstead-grey/30 mb-4 overflow-hidden relative">
                          {article.coverImage ? (
                            <Image
                              src={article.coverImage}
                              alt={article.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-hampstead-charcoal/20 font-serif italic group-hover:bg-hampstead-grey/50 transition-colors">
                              No Image
                            </div>
                          )}
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

                {/* Link to search for more if there are more articles */}
                {totalArticles > 48 && (
                  <div className="mt-16 text-center">
                    <Link
                      href={`/search?category=${params.category}`}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors"
                    >
                      Browse all {totalArticles.toLocaleString()} articles in {categoryInfo.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
