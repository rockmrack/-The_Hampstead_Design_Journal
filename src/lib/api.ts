/**
 * API utilities for The Hampstead Design Journal
 * Provides data fetching and content management functions
 */

import { allArticles, type Article as ContentlayerArticle } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

// Re-export the Article type from contentlayer
export type Article = ContentlayerArticle;

// Category definitions
export const categories = {
  'architecture': {
    name: 'Architecture',
    slug: 'architecture',
    description: 'Exploring the architectural heritage and contemporary design of North West London.',
  },
  'heritage-architecture': {
    name: 'Heritage Architecture',
    slug: 'heritage-architecture',
    description: 'In-depth analysis of historic buildings, conservation areas, and architectural preservation.',
  },
  'interiors': {
    name: 'Interiors',
    slug: 'interiors',
    description: 'Interior design inspiration and guidance for period properties.',
  },
  'interiors-materials': {
    name: 'Interiors & Materials',
    slug: 'interiors-materials',
    description: 'Specification guidance for finishes, materials, and interior design appropriate to heritage homes.',
  },
  'living': {
    name: 'Living',
    slug: 'living',
    description: 'Lifestyle and living in Hampstead and North West London.',
  },
  'market-watch': {
    name: 'Market Watch',
    slug: 'market-watch',
    description: 'Data-driven analysis of property values, renovation ROI, and market trends.',
  },
  'planning-regulations': {
    name: 'Planning & Regulations',
    slug: 'planning-regulations',
    description: 'Navigating Camden Council planning policies, conservation area rules, and building regulations.',
  },
} as const;

export type CategorySlug = keyof typeof categories;

/**
 * Get all articles sorted by date (newest first)
 */
export function getAllArticles(): Article[] {
  return [...allArticles].sort((a: Article, b: Article) => 
    compareDesc(new Date(a.date), new Date(b.date))
  );
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter(
    (article: Article) => article.category === categorySlug
  );
}

/**
 * Get featured articles
 */
export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((article: Article) => article.featured);
}

/**
 * Get a single article by slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((article: Article) => article.slug === slug);
}

/**
 * Get related articles (same category, excluding current)
 */
export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];
  
  return getAllArticles()
    .filter((article: Article) => 
      article.slug !== currentSlug && 
      article.category === current.category
    )
    .slice(0, limit);
}

/**
 * Get all unique categories from articles
 */
export function getAllCategories(): string[] {
  const categorySet = new Set(allArticles.map((article: Article) => article.category));
  return Array.from(categorySet);
}

/**
 * Get category info by slug
 */
export function getCategoryInfo(slug: string) {
  return categories[slug as CategorySlug] || null;
}

/**
 * Search articles by query
 */
export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return getAllArticles().filter((article: Article) => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.body.raw.toLowerCase().includes(lowerQuery) ||
    (article.keywords && article.keywords.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get article count by category
 */
export function getArticleCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  allArticles.forEach((article: Article) => {
    counts[article.category] = (counts[article.category] || 0) + 1;
  });
  return counts;
}

/**
 * Get recent articles
 */
export function getRecentArticles(limit: number = 5): Article[] {
  return getAllArticles().slice(0, limit);
}

/**
 * Fetch articles by category (async version for server components)
 */
export async function fetchArticlesByCategory(categorySlug: string): Promise<Article[]> {
  return getArticlesByCategory(categorySlug);
}
