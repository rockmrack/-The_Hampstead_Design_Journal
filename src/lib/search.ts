/**
 * Advanced Search System with Fuse.js
 * Full-text search, fuzzy matching, filters, suggestions
 */

import Fuse, { IFuseOptions, FuseResult } from 'fuse.js';

export interface SearchableItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  tags?: string[];
  type: 'article' | 'archive' | 'page' | 'guide' | 'glossary';
  url: string;
  date?: string;
  author?: string;
  readingTime?: number;
  image?: string;
}

export interface SearchResult extends SearchableItem {
  score: number;
  matches?: Array<{
    key: string;
    value: string;
    indices: Array<[number, number]>;
  }>;
}

export interface SearchFilters {
  type?: SearchableItem['type'] | SearchableItem['type'][];
  category?: string | string[];
  dateFrom?: string;
  dateTo?: string;
  minReadingTime?: number;
  maxReadingTime?: number;
}

export interface SearchOptions {
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'date' | 'title';
  sortOrder?: 'asc' | 'desc';
  includeMatches?: boolean;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  filters: SearchFilters;
  suggestions: string[];
  facets: {
    types: Record<string, number>;
    categories: Record<string, number>;
  };
  timing: number;
}

// Fuse.js configuration optimized for content search
const fuseOptions: IFuseOptions<SearchableItem> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.2 },
    { name: 'content', weight: 0.2 },
    { name: 'tags', weight: 0.1 },
    { name: 'category', weight: 0.05 },
    { name: 'author', weight: 0.05 },
  ],
  threshold: 0.3, // 0 = exact match, 1 = match anything
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  useExtendedSearch: true,
};

// Recent searches storage
const RECENT_SEARCHES_KEY = 'hdj_recent_searches';
const MAX_RECENT_SEARCHES = 10;

class SearchEngine {
  private fuse: Fuse<SearchableItem> | null = null;
  private items: SearchableItem[] = [];
  private initialized = false;

  async initialize(items: SearchableItem[]): Promise<void> {
    this.items = items;
    this.fuse = new Fuse(items, fuseOptions);
    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  search(query: string, options: SearchOptions = {}): SearchResponse {
    const startTime = performance.now();

    if (!this.fuse || !query.trim()) {
      return this.emptyResponse(query, options.filters || {});
    }

    // Build extended search query for advanced syntax
    const searchQuery = this.buildSearchQuery(query);

    // Execute search
    let results = this.fuse.search(searchQuery);

    // Apply filters
    if (options.filters) {
      results = this.applyFilters(results, options.filters);
    }

    // Calculate facets
    const facets = this.calculateFacets(results);

    // Sort results
    results = this.sortResults(results, options.sortBy, options.sortOrder);

    // Apply pagination
    const total = results.length;
    const offset = options.offset || 0;
    const limit = options.limit || 20;
    results = results.slice(offset, offset + limit);

    // Generate suggestions
    const suggestions = this.generateSuggestions(query, results);

    // Transform results
    const searchResults: SearchResult[] = results.map((r) => ({
      ...r.item,
      score: r.score || 0,
      matches: options.includeMatches ? r.matches as SearchResult['matches'] : undefined,
    }));

    // Save to recent searches
    this.saveRecentSearch(query);

    return {
      results: searchResults,
      total,
      query,
      filters: options.filters || {},
      suggestions,
      facets,
      timing: performance.now() - startTime,
    };
  }

  private buildSearchQuery(query: string): string {
    // Support advanced search syntax
    // - Exact phrase: "exact match"
    // - Exclude: -word
    // - Required: +word
    // - Fuzzy: ~word
    
    const words = query.split(/\s+/);
    const processedWords = words.map((word) => {
      if (word.startsWith('"') && word.endsWith('"')) {
        return `="${word.slice(1, -1)}"`; // Exact match
      }
      if (word.startsWith('-')) {
        return `!${word.slice(1)}`; // Exclude
      }
      if (word.startsWith('+')) {
        return `'${word.slice(1)}`; // Include (required)
      }
      if (word.startsWith('~')) {
        return word.slice(1); // Fuzzy (default)
      }
      return word;
    });

    return processedWords.join(' ');
  }

  private applyFilters(
    results: FuseResult<SearchableItem>[],
    filters: SearchFilters
  ): FuseResult<SearchableItem>[] {
    return results.filter((r) => {
      const item = r.item;

      // Type filter
      if (filters.type) {
        const types = Array.isArray(filters.type) ? filters.type : [filters.type];
        if (!types.includes(item.type)) return false;
      }

      // Category filter
      if (filters.category) {
        const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
        if (!item.category || !categories.includes(item.category)) return false;
      }

      // Date filters
      if (item.date) {
        const itemDate = new Date(item.date);
        if (filters.dateFrom && itemDate < new Date(filters.dateFrom)) return false;
        if (filters.dateTo && itemDate > new Date(filters.dateTo)) return false;
      }

      // Reading time filters
      if (item.readingTime) {
        if (filters.minReadingTime && item.readingTime < filters.minReadingTime) return false;
        if (filters.maxReadingTime && item.readingTime > filters.maxReadingTime) return false;
      }

      return true;
    });
  }

  private sortResults(
    results: FuseResult<SearchableItem>[],
    sortBy: SearchOptions['sortBy'] = 'relevance',
    sortOrder: SearchOptions['sortOrder'] = 'desc'
  ): FuseResult<SearchableItem>[] {
    const multiplier = sortOrder === 'asc' ? 1 : -1;

    return [...results].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          const dateA = a.item.date ? new Date(a.item.date).getTime() : 0;
          const dateB = b.item.date ? new Date(b.item.date).getTime() : 0;
          return (dateA - dateB) * multiplier;
        case 'title':
          return a.item.title.localeCompare(b.item.title) * multiplier;
        case 'relevance':
        default:
          // Lower score is better in Fuse.js
          return ((a.score || 0) - (b.score || 0)) * multiplier * -1;
      }
    });
  }

  private calculateFacets(results: FuseResult<SearchableItem>[]): SearchResponse['facets'] {
    const types: Record<string, number> = {};
    const categories: Record<string, number> = {};

    results.forEach((r) => {
      // Count types
      types[r.item.type] = (types[r.item.type] || 0) + 1;

      // Count categories
      if (r.item.category) {
        categories[r.item.category] = (categories[r.item.category] || 0) + 1;
      }
    });

    return { types, categories };
  }

  private generateSuggestions(query: string, results: FuseResult<SearchableItem>[]): string[] {
    const suggestions = new Set<string>();

    // Add related terms from top results
    results.slice(0, 5).forEach((r) => {
      if (r.item.tags) {
        r.item.tags.forEach((tag) => {
          if (tag.toLowerCase() !== query.toLowerCase()) {
            suggestions.add(tag);
          }
        });
      }
    });

    // Add category suggestions
    results.slice(0, 3).forEach((r) => {
      if (r.item.category && r.item.category.toLowerCase() !== query.toLowerCase()) {
        suggestions.add(r.item.category);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }

  private emptyResponse(query: string, filters: SearchFilters): SearchResponse {
    return {
      results: [],
      total: 0,
      query,
      filters,
      suggestions: [],
      facets: { types: {}, categories: {} },
      timing: 0,
    };
  }

  // Recent searches management
  getRecentSearches(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveRecentSearch(query: string): void {
    if (typeof window === 'undefined') return;
    try {
      const recent = this.getRecentSearches().filter((s) => s !== query);
      recent.unshift(query);
      localStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(recent.slice(0, MAX_RECENT_SEARCHES))
      );
    } catch {
      // Ignore storage errors
    }
  }

  clearRecentSearches(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  }

  // Popular searches (would be populated from analytics)
  getPopularSearches(): string[] {
    return [
      'basement extension',
      'conservation area',
      'sash windows',
      'lime mortar',
      'Georgian restoration',
      'planning permission',
      'listed building',
      'Arts and Crafts',
    ];
  }

  // Auto-complete suggestions
  getSuggestions(partial: string, limit: number = 5): string[] {
    if (!partial.trim() || !this.fuse) return [];

    const results = this.fuse.search(partial, { limit: limit * 2 });
    const titles = results.map((r) => r.item.title);
    
    // Return unique suggestions
    return Array.from(new Set(titles)).slice(0, limit);
  }

  // Get all items for indexing
  getItems(): SearchableItem[] {
    return this.items;
  }
}

// Singleton instance
export const searchEngine = new SearchEngine();

export default searchEngine;
