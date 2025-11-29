import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Search request schema
const searchSchema = z.object({
  query: z.string().min(1).max(200),
  filters: z.object({
    type: z.enum(['article', 'guide', 'project', 'supplier', 'event']).optional(),
    category: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});

// Mock search data (in production, this would query a database or search service)
const mockSearchData = [
  {
    id: '1',
    type: 'article',
    title: 'Arts and Crafts Renovation Guide',
    excerpt: 'Comprehensive guide to renovating Arts and Crafts period properties in Hampstead...',
    category: 'Heritage Architecture',
    tags: ['renovation', 'arts-crafts', 'heritage'],
    date: '2024-01-15',
    url: '/articles/arts-and-crafts-renovation-guide',
    image: '/images/articles/arts-crafts-hero.jpg',
  },
  {
    id: '2',
    type: 'article',
    title: 'Herringbone Oak Flooring Guide',
    excerpt: 'Everything you need to know about herringbone oak flooring for period properties...',
    category: 'Interiors & Materials',
    tags: ['flooring', 'oak', 'herringbone', 'interiors'],
    date: '2024-01-10',
    url: '/articles/herringbone-oak-flooring-guide',
    image: '/images/articles/herringbone-hero.jpg',
  },
  {
    id: '3',
    type: 'guide',
    title: 'Camden Basement Planning Guide',
    excerpt: 'Navigate the complexities of basement extensions in the Camden planning district...',
    category: 'Planning & Regulations',
    tags: ['basement', 'planning', 'camden', 'extension'],
    date: '2024-01-05',
    url: '/articles/camden-basement-planning-guide',
    image: '/images/articles/basement-hero.jpg',
  },
  {
    id: '4',
    type: 'article',
    title: 'Smart Home Integration for Period Properties',
    excerpt: 'How to integrate modern smart home technology while preserving heritage features...',
    category: 'Living',
    tags: ['smart-home', 'technology', 'heritage'],
    date: '2024-01-01',
    url: '/articles/smart-home-integration-period-properties',
    image: '/images/articles/smart-home-hero.jpg',
  },
  {
    id: '5',
    type: 'article',
    title: 'Winter Maintenance Checklist for Hampstead Homes',
    excerpt: 'Essential winter maintenance tasks to protect your Hampstead property...',
    category: 'Living',
    tags: ['maintenance', 'winter', 'checklist'],
    date: '2023-12-20',
    url: '/articles/winter-maintenance-checklist-hampstead',
    image: '/images/articles/winter-maintenance-hero.jpg',
  },
];

// Simple search function (in production, use Elasticsearch, Algolia, etc.)
function performSearch(
  query: string,
  filters: z.infer<typeof searchSchema>['filters'],
  page: number,
  limit: number
) {
  const queryLower = query.toLowerCase();
  
  let results = mockSearchData.filter(item => {
    // Text match
    const textMatch = 
      item.title.toLowerCase().includes(queryLower) ||
      item.excerpt.toLowerCase().includes(queryLower) ||
      item.tags.some(tag => tag.toLowerCase().includes(queryLower));
    
    if (!textMatch) return false;

    // Apply filters
    if (filters?.type && item.type !== filters.type) return false;
    if (filters?.category && item.category !== filters.category) return false;
    if (filters?.tags?.length && !filters.tags.some(tag => item.tags.includes(tag))) return false;
    if (filters?.dateFrom && new Date(item.date) < new Date(filters.dateFrom)) return false;
    if (filters?.dateTo && new Date(item.date) > new Date(filters.dateTo)) return false;

    return true;
  });

  // Calculate pagination
  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  results = results.slice(offset, offset + limit);

  return {
    results,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

// Generate search suggestions
function getSuggestions(query: string): string[] {
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  mockSearchData.forEach(item => {
    // Add matching tags
    item.tags.forEach(tag => {
      if (tag.includes(queryLower)) {
        suggestions.add(tag);
      }
    });

    // Add matching words from titles
    item.title.split(' ').forEach(word => {
      const wordLower = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (wordLower.includes(queryLower) && wordLower.length > 3) {
        suggestions.add(wordLower);
      }
    });
  });

  return Array.from(suggestions).slice(0, 5);
}

// Get search facets
function getFacets() {
  const types = new Map<string, number>();
  const categories = new Map<string, number>();
  const tags = new Map<string, number>();

  mockSearchData.forEach(item => {
    types.set(item.type, (types.get(item.type) || 0) + 1);
    categories.set(item.category, (categories.get(item.category) || 0) + 1);
    item.tags.forEach(tag => {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    });
  });

  return {
    types: Array.from(types.entries()).map(([value, count]) => ({ value, count })),
    categories: Array.from(categories.entries()).map(([value, count]) => ({ value, count })),
    tags: Array.from(tags.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validate
    const result = searchSchema.safeParse({
      query,
      filters: {
        type: type as 'article' | 'guide' | 'project' | 'supplier' | 'event' | undefined,
        category: category || undefined,
      },
      page,
      limit,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid search parameters' },
        { status: 400 }
      );
    }

    // Perform search
    const { results, pagination } = performSearch(
      result.data.query,
      result.data.filters,
      result.data.page,
      result.data.limit
    );

    // Get suggestions and facets
    const suggestions = getSuggestions(result.data.query);
    const facets = getFacets();

    return NextResponse.json({
      success: true,
      query: result.data.query,
      results,
      pagination,
      suggestions,
      facets,
    });

  } catch (error) {
    console.error('Search error:', error);
    
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
