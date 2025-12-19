'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface ArticleResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

interface SearchResponse {
  articles: ArticleResult[];
  categories: string[];
  total: number;
  page: number;
  hasMore: boolean;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'heritage-architecture': 'Heritage & Architecture',
    'planning-regulations': 'Planning & Regulations',
    'interiors-materials': 'Interiors & Materials',
    'market-watch': 'Market Watch',
    'architecture': 'Architecture',
    'interiors': 'Interiors',
    'living': 'Living',
  };
  return labels[category] || category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const ITEMS_PER_PAGE = 24;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articles, setArticles] = useState<ArticleResult[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchArticles = useCallback(async (searchQuery: string, category: string | null, pageNum: number, append: boolean = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      });
      if (searchQuery.trim()) {
        params.set('q', searchQuery.trim());
      }
      if (category) {
        params.set('category', category);
      }

      const res = await fetch(`/api/articles/search?${params}`);
      if (!res.ok) throw new Error('Search failed');
      
      const data: SearchResponse = await res.json();
      
      if (append) {
        setArticles(prev => [...prev, ...data.articles]);
      } else {
        setArticles(data.articles);
      }
      setCategories(data.categories);
      setTotal(data.total);
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  // Initial load and when filters change
  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchArticles(query, selectedCategory, 1, false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [query, selectedCategory, fetchArticles]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchArticles(query, selectedCategory, page + 1, true);
    }
  }, [loading, hasMore, query, selectedCategory, page, fetchArticles]);

  const clearFilters = useCallback(() => {
    setQuery('');
    setSelectedCategory(null);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl mb-6">
              Search the Archive
            </h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed mb-10">
              Explore our collection of {total.toLocaleString()} articles on heritage, planning, interiors, and market insights.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-14 pr-12 py-4 border border-hampstead-charcoal/20 text-lg focus:outline-none focus:border-hampstead-black transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-hampstead-charcoal/40 hover:text-hampstead-black"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12">
        <div className="editorial-container">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-sm text-hampstead-charcoal/60 mr-2">Filter:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-hampstead-black text-hampstead-white'
                  : 'bg-hampstead-grey/50 text-hampstead-charcoal hover:bg-hampstead-grey'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className={`px-4 py-2 text-sm transition-colors ${
                  selectedCategory === cat
                    ? 'bg-hampstead-black text-hampstead-white'
                    : 'bg-hampstead-grey/50 text-hampstead-charcoal hover:bg-hampstead-grey'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
            {(query || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-hampstead-charcoal/60 hover:text-hampstead-black transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-8 text-sm text-hampstead-charcoal/60">
            {loading && initialLoad ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </span>
            ) : (
              <>
                {total.toLocaleString()} {total === 1 ? 'result' : 'results'}
                {query && ` for "${query}"`}
              </>
            )}
          </div>

          {/* Results Grid */}
          <AnimatePresence mode="wait">
            {articles.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {articles.map((article, index) => (
                    <motion.article
                      key={`${article.slug}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.02, 0.5) }}
                      className="group"
                    >
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
                    </motion.article>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Load more articles
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : !loading && !initialLoad ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className="text-xl text-hampstead-charcoal/60 mb-4">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors"
                >
                  Clear filters
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
