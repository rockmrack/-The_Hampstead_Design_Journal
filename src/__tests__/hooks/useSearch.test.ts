/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSearch } from '@/hooks/useSearch';

// Mock the search service
jest.mock('@/lib/search', () => ({
  searchContent: jest.fn(),
  getSearchSuggestions: jest.fn(),
}));

import { searchContent, getSearchSuggestions } from '@/lib/search';

const mockSearchContent = searchContent as jest.MockedFunction<typeof searchContent>;
const mockGetSuggestions = getSearchSuggestions as jest.MockedFunction<typeof getSearchSuggestions>;

describe('useSearch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    localStorage.clear();

    mockSearchContent.mockResolvedValue({
      results: [],
      total: 0,
      facets: {},
      query: '',
    });

    mockGetSuggestions.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Initial State', () => {
    it('starts with empty state', () => {
      const { result } = renderHook(() => useSearch());

      expect(result.current.query).toBe('');
      expect(result.current.results).toEqual([]);
      expect(result.current.isSearching).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('loads recent searches from localStorage', () => {
      const recentSearches = ['term1', 'term2'];
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

      const { result } = renderHook(() => useSearch());

      expect(result.current.recentSearches).toEqual(recentSearches);
    });
  });

  describe('Search Query', () => {
    it('updates query when setQuery is called', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setQuery('test query');
      });

      expect(result.current.query).toBe('test query');
    });

    it('debounces search requests', async () => {
      mockSearchContent.mockResolvedValueOnce({
        results: [{ id: '1', title: 'Result 1', slug: 'result-1', excerpt: 'Test' }],
        total: 1,
        facets: {},
        query: 'test',
      });

      const { result } = renderHook(() => useSearch({ debounceMs: 300 }));

      act(() => {
        result.current.setQuery('t');
        result.current.setQuery('te');
        result.current.setQuery('tes');
        result.current.setQuery('test');
      });

      // Should not have searched yet (debouncing)
      expect(mockSearchContent).not.toHaveBeenCalled();

      // Advance timers past debounce
      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      // Should have searched only once with final value
      await waitFor(() => {
        expect(mockSearchContent).toHaveBeenCalledTimes(1);
        expect(mockSearchContent).toHaveBeenCalledWith(expect.objectContaining({
          query: 'test',
        }));
      });
    });

    it('does not search for queries shorter than minQueryLength', async () => {
      const { result } = renderHook(() => useSearch({ minQueryLength: 3 }));

      act(() => {
        result.current.setQuery('ab');
      });

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      expect(mockSearchContent).not.toHaveBeenCalled();
    });
  });

  describe('Search Results', () => {
    it('updates results after successful search', async () => {
      const mockResults = [
        { id: '1', title: 'Test Article', slug: 'test-article', excerpt: 'Test excerpt' },
        { id: '2', title: 'Another Article', slug: 'another', excerpt: 'Another excerpt' },
      ];

      mockSearchContent.mockResolvedValueOnce({
        results: mockResults,
        total: 2,
        facets: { categories: { architecture: 1, interiors: 1 } },
        query: 'article',
      });

      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      act(() => {
        result.current.setQuery('article');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.results).toEqual(mockResults);
        expect(result.current.total).toBe(2);
      });
    });

    it('sets isSearching during search', async () => {
      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise((resolve) => {
        resolveSearch = resolve;
      });
      mockSearchContent.mockReturnValue(searchPromise as any);

      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      act(() => {
        result.current.setQuery('test');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.isSearching).toBe(true);
      });

      // Resolve search
      await act(async () => {
        resolveSearch!({ results: [], total: 0, facets: {}, query: 'test' });
      });

      await waitFor(() => {
        expect(result.current.isSearching).toBe(false);
      });
    });

    it('handles search errors', async () => {
      mockSearchContent.mockRejectedValueOnce(new Error('Search failed'));

      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      act(() => {
        result.current.setQuery('test');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.error).toBe('Search failed');
        expect(result.current.isSearching).toBe(false);
      });
    });
  });

  describe('Search Suggestions', () => {
    it('fetches suggestions for query', async () => {
      mockGetSuggestions.mockResolvedValueOnce([
        'victorian architecture',
        'victorian homes',
        'victorian design',
      ]);

      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      act(() => {
        result.current.setQuery('victorian');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.suggestions).toContain('victorian architecture');
      });
    });
  });

  describe('Filters', () => {
    it('applies category filter', async () => {
      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      act(() => {
        result.current.setFilters({ categories: ['architecture'] });
        result.current.setQuery('test');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(mockSearchContent).toHaveBeenCalledWith(expect.objectContaining({
          filters: { categories: ['architecture'] },
        }));
      });
    });

    it('applies date range filter', async () => {
      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      const dateRange = { start: '2024-01-01', end: '2024-12-31' };

      act(() => {
        result.current.setFilters({ dateRange });
        result.current.setQuery('test');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(mockSearchContent).toHaveBeenCalledWith(expect.objectContaining({
          filters: { dateRange },
        }));
      });
    });

    it('clears filters', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setFilters({ categories: ['architecture'] });
      });

      expect(result.current.filters.categories).toEqual(['architecture']);

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.filters).toEqual({});
    });
  });

  describe('Recent Searches', () => {
    it('adds search to recent searches', async () => {
      mockSearchContent.mockResolvedValueOnce({
        results: [{ id: '1', title: 'Result', slug: 'result', excerpt: 'Test' }],
        total: 1,
        facets: {},
        query: 'test search',
      });

      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      act(() => {
        result.current.setQuery('test search');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.recentSearches).toContain('test search');
      });
    });

    it('limits recent searches to max items', async () => {
      // Pre-populate with 10 items
      const existing = Array.from({ length: 10 }, (_, i) => `search ${i}`);
      localStorage.setItem('recentSearches', JSON.stringify(existing));

      mockSearchContent.mockResolvedValue({
        results: [{ id: '1', title: 'Result', slug: 'result', excerpt: 'Test' }],
        total: 1,
        facets: {},
        query: 'new search',
      });

      const { result } = renderHook(() => useSearch({ debounceMs: 0, maxRecentSearches: 10 }));

      act(() => {
        result.current.setQuery('new search');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.recentSearches).toHaveLength(10);
        expect(result.current.recentSearches[0]).toBe('new search');
      });
    });

    it('clears recent searches', () => {
      localStorage.setItem('recentSearches', JSON.stringify(['test1', 'test2']));

      const { result } = renderHook(() => useSearch());

      expect(result.current.recentSearches).toHaveLength(2);

      act(() => {
        result.current.clearRecentSearches();
      });

      expect(result.current.recentSearches).toHaveLength(0);
    });

    it('removes duplicate recent searches', async () => {
      localStorage.setItem('recentSearches', JSON.stringify(['existing']));

      mockSearchContent.mockResolvedValue({
        results: [],
        total: 0,
        facets: {},
        query: 'existing',
      });

      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      act(() => {
        result.current.setQuery('existing');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        // Should only have one entry, not duplicates
        const count = result.current.recentSearches.filter(s => s === 'existing').length;
        expect(count).toBe(1);
      });
    });
  });

  describe('Clear Search', () => {
    it('clears query and results', async () => {
      mockSearchContent.mockResolvedValueOnce({
        results: [{ id: '1', title: 'Result', slug: 'result', excerpt: 'Test' }],
        total: 1,
        facets: {},
        query: 'test',
      });

      const { result } = renderHook(() => useSearch({ debounceMs: 0 }));

      act(() => {
        result.current.setQuery('test');
      });

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.results).toHaveLength(1);
      });

      act(() => {
        result.current.clear();
      });

      expect(result.current.query).toBe('');
      expect(result.current.results).toEqual([]);
    });
  });
});
