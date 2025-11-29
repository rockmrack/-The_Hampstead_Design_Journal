'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { searchEngine, SearchResult, SearchFilters, SearchOptions, SearchableItem } from '@/lib/search';

// ============================================================================
// useSearch Hook - Main search functionality
// ============================================================================

interface UseSearchOptions extends SearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  error: Error | null;
  suggestions: string[];
  recentSearches: string[];
  clearQuery: () => void;
  clearRecentSearches: () => void;
  search: (query: string, filters?: SearchFilters) => void;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const {
    debounceMs = 200,
    minQueryLength = 2,
    ...searchOptions
  } = options;

  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const filtersRef = useRef<SearchFilters>({});

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(searchEngine.getRecentSearches());
  }, []);

  // Perform search
  const performSearch = useCallback((searchQuery: string, filters: SearchFilters = {}) => {
    if (searchQuery.length < minQueryLength) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = searchEngine.search(searchQuery, { ...searchOptions, filters });
      setResults(response.results);
      setSuggestions(searchEngine.getSuggestions(searchQuery, 5));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Search failed'));
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [minQueryLength, searchOptions]);

  // Debounced query setter
  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(newQuery, filtersRef.current);
    }, debounceMs);
  }, [debounceMs, performSearch]);

  // Immediate search (bypasses debounce)
  const search = useCallback((searchQuery: string, filters?: SearchFilters) => {
    if (filters) {
      filtersRef.current = filters;
    }
    setQueryState(searchQuery);
    performSearch(searchQuery, filters || filtersRef.current);
  }, [performSearch]);

  // Clear query
  const clearQuery = useCallback(() => {
    setQueryState('');
    setResults([]);
    setSuggestions([]);
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    searchEngine.clearRecentSearches();
    setRecentSearches([]);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    error,
    suggestions,
    recentSearches,
    clearQuery,
    clearRecentSearches,
    search,
  };
}

// ============================================================================
// useSearchIndex Hook - Manage search index
// ============================================================================

interface UseSearchIndexOptions {
  items: SearchableItem[];
  autoIndex?: boolean;
}

export function useSearchIndex(options: UseSearchIndexOptions) {
  const { items, autoIndex = true } = options;
  const [isIndexed, setIsIndexed] = useState(false);

  useEffect(() => {
    if (autoIndex && items.length > 0) {
      searchEngine.initialize(items).then(() => {
        setIsIndexed(true);
      });
    }
  }, [items, autoIndex]);

  const reindex = useCallback(() => {
    searchEngine.initialize(items).then(() => {
      setIsIndexed(true);
    });
  }, [items]);

  const addItem = useCallback((_item: SearchableItem) => {
    // Re-initialize with updated items to add a new item
    // For dynamic updates, maintain a local items array
    console.warn('addItem: Re-index with updated items for dynamic updates');
  }, []);

  const removeItem = useCallback((_id: string) => {
    // Re-initialize with filtered items to remove an item
    console.warn('removeItem: Re-index with filtered items for dynamic updates');
  }, []);

  return {
    isIndexed,
    reindex,
    addItem,
    removeItem,
  };
}

// ============================================================================
// useSearchFilters Hook - Manage search filters
// ============================================================================

interface UseSearchFiltersReturn {
  filters: SearchFilters;
  setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  removeFilter: (key: keyof SearchFilters) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function useSearchFilters(initialFilters: SearchFilters = {}): UseSearchFiltersReturn {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const setFilter = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const removeFilter = useCallback((key: keyof SearchFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const activeFilterCount = Object.keys(filters).filter(
    key => filters[key as keyof SearchFilters] !== undefined
  ).length;

  return {
    filters,
    setFilter,
    removeFilter,
    clearFilters,
    hasActiveFilters: activeFilterCount > 0,
    activeFilterCount,
  };
}

// ============================================================================
// useSearchWithFilters Hook - Combined search and filters
// ============================================================================

interface UseSearchWithFiltersOptions extends UseSearchOptions {
  initialFilters?: SearchFilters;
}

export function useSearchWithFilters(options: UseSearchWithFiltersOptions = {}) {
  const { initialFilters, ...searchOptions } = options;
  
  const search = useSearch(searchOptions);
  const filterControls = useSearchFilters(initialFilters);

  // Re-search when filters change
  useEffect(() => {
    if (search.query) {
      search.search(search.query, filterControls.filters);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterControls.filters]);

  return {
    ...search,
    ...filterControls,
    searchWithFilters: (query: string) => {
      search.search(query, filterControls.filters);
    },
  };
}

// ============================================================================
// useSearchHighlight Hook - Highlight search terms in text
// ============================================================================

interface UseSearchHighlightOptions {
  highlightTag?: keyof JSX.IntrinsicElements;
  highlightClassName?: string;
}

export function useSearchHighlight(
  query: string,
  options: UseSearchHighlightOptions = {}
) {
  const { highlightTag = 'mark', highlightClassName = 'bg-yellow-200' } = options;

  const highlight = useCallback((text: string): React.ReactNode => {
    if (!query || !text) return text;

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return text;

    const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    const result = parts.map((part, index): React.ReactNode => {
      const isMatch = terms.some(term => part.toLowerCase() === term);
      if (isMatch) {
        return React.createElement(
          highlightTag,
          { key: index, className: highlightClassName },
          part
        );
      }
      return React.createElement(React.Fragment, { key: index }, part);
    });
    
    return React.createElement(React.Fragment, null, ...result);
  }, [query, highlightTag, highlightClassName]);

  return highlight;
}

// ============================================================================
// useSearchHistory Hook - Manage search history
// ============================================================================

interface UseSearchHistoryOptions {
  maxItems?: number;
  storageKey?: string;
}

export function useSearchHistory(options: UseSearchHistoryOptions = {}) {
  const { maxItems = 10, storageKey = 'search_history' } = options;
  const [history, setHistory] = useState<string[]>([]);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
  }, [storageKey]);

  // Save to storage
  const saveHistory = useCallback((newHistory: string[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
    } catch {
      // Ignore storage errors
    }
  }, [storageKey]);

  const addToHistory = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setHistory(prev => {
      const filtered = prev.filter(item => item !== trimmed);
      const newHistory = [trimmed, ...filtered].slice(0, maxItems);
      saveHistory(newHistory);
      return newHistory;
    });
  }, [maxItems, saveHistory]);

  const removeFromHistory = useCallback((query: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item !== query);
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, [saveHistory]);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}

// ============================================================================
// useSearchKeyboard Hook - Keyboard navigation for search
// ============================================================================

interface UseSearchKeyboardOptions {
  resultsCount: number;
  onSelect: (index: number) => void;
  onEscape?: () => void;
}

export function useSearchKeyboard(options: UseSearchKeyboardOptions) {
  const { resultsCount, onSelect, onEscape } = options;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [resultsCount]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < resultsCount - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : resultsCount - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(selectedIndex);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onEscape?.();
        break;
    }
  }, [resultsCount, selectedIndex, onSelect, onEscape]);

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
  };
}
