import { NextRequest, NextResponse } from 'next/server';
import { allArticles } from 'contentlayer/generated';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = Math.min(parseInt(searchParams.get('limit') || '24', 10), 50);

  // Get all unique categories
  const categories = Array.from(new Set(allArticles.map(a => a.category))).sort();

  // Filter articles
  let filtered = allArticles;

  if (category) {
    filtered = filtered.filter(a => a.category === category);
  }

  if (query) {
    const searchTerms = query.split(/\s+/);
    filtered = filtered.filter(article => {
      const searchableText = `${article.title} ${article.excerpt} ${article.keywords || ''}`.toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  // Sort by date (newest first)
  filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = filtered.slice(startIndex, endIndex);

  // Return only the fields needed for the search results (not full content)
  const articles = paginatedArticles.map(article => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    date: article.date,
    coverImage: article.coverImage,
  }));

  return NextResponse.json({
    articles,
    categories,
    total,
    page,
    hasMore: endIndex < total,
  });
}
