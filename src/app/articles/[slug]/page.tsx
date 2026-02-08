import { notFound } from 'next/navigation';
import { allArticles } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, ChevronRight } from 'lucide-react';
import ArticleBody from '@/components/articles/ArticleBody';
import TableOfContents from '@/components/articles/TableOfContents';
import RelatedArticles from '@/components/articles/RelatedArticles';
import ReadingProgress from '@/components/articles/ReadingProgress';
import ArticleJsonLd from '@/components/seo/ArticleJsonLd';
import ShareButtons from '@/components/articles/ShareButtons';
import AuthorBio from '@/components/articles/AuthorBio';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = allArticles.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: `${article.title} | The Hampstead Design Journal`,
    description: article.excerpt,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `/articles/${params.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: article.coverImage ? [article.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
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

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = allArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd article={article} />

      <article className="min-h-screen">
        {/* Hero Section */}
        <header className="bg-hampstead-cream border-b border-hampstead-grey">
          <div className="editorial-container py-12 md:py-20">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-hampstead-charcoal/60 mb-8">
              <Link href="/journal" className="hover:text-hampstead-black transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link href="/journal/articles" className="hover:text-hampstead-black transition-colors">
                Articles
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link 
                href={`/journal/categories/${article.category}`} 
                className="hover:text-hampstead-black transition-colors"
              >
                {getCategoryLabel(article.category)}
              </Link>
            </nav>

            <div className="max-w-4xl">
              {/* Category Badge */}
              <Link 
                href={`/journal/categories/${article.category}`}
                className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-widest bg-hampstead-black text-hampstead-white mb-6 hover:bg-hampstead-charcoal transition-colors"
              >
                {getCategoryLabel(article.category)}
              </Link>

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl md:text-2xl text-hampstead-charcoal/80 leading-relaxed mb-10">
                {article.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-hampstead-charcoal/60 border-t border-hampstead-grey pt-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.date}>
                    {format(new Date(article.date), 'MMMM d, yyyy')}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readingTime.text}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="editorial-container py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <TableOfContents headings={article.headings} />
                <div className="mt-8 pt-8 border-t border-hampstead-grey">
                  <ShareButtons title={article.title} url={article.url} />
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-9">
              <div className="prose prose-lg prose-hampstead max-w-none">
                <ArticleBody code={article.body.code} />
              </div>

              {/* Author Bio - Trust Signal */}
              <AuthorBio />

              {/* Mobile Share Buttons */}
              <div className="lg:hidden mt-8 pt-8 border-t border-hampstead-grey">
                <ShareButtons title={article.title} url={article.url} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} currentCategory={article.category} />
        )}

        {/* Back Link */}
        <div className="editorial-container pb-16">
          <Link 
            href="/journal/articles" 
            className="inline-flex items-center text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Articles
          </Link>
        </div>
      </article>
    </>
  );
}