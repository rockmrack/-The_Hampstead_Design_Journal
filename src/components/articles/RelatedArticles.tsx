import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  currentCategory: string;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'heritage-architecture': 'Heritage & Architecture',
    'planning-regulations': 'Planning & Regulations',
    'interiors-materials': 'Interiors & Materials',
    'market-watch': 'Market Watch',
  };
  return labels[category] || category;
}

export default function RelatedArticles({ articles, currentCategory }: RelatedArticlesProps) {
  return (
    <section className="bg-hampstead-cream border-t border-hampstead-grey py-16 md:py-20">
      <div className="editorial-container">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-3xl">
            More in {getCategoryLabel(currentCategory)}
          </h2>
          <Link 
            href={`/journal/categories/${currentCategory}`}
            className="hidden md:inline-flex items-center text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
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

        <div className="md:hidden mt-8 text-center">
          <Link 
            href={`/journal/categories/${currentCategory}`}
            className="inline-flex items-center text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
