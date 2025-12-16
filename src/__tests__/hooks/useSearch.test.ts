/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSearch } from '@/hooks/useSearch';

// Mock the search service
jest.mock('@/lib/search', () => ({
  searchEngine: {
    search: jest.fn(),
    getSuggestions: jest.fn(),
    getRecentSearches: jest.fn(),
    addRecentSearch: jest.fn(),
    clearRecentSearches: jest.fn(),
  },
}));

import { searchEngine } from '@/lib/search';
const mockSearchEngine = searchEngine as jest.Mocked<typeof searchEngine>;

describe('useSearch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Default mock implementations
    mockSearchEngine.getRecentSearches.mockReturnValue([]);
    mockSearchEngine.search.mockResolvedValue({
      results: [],
      total: 0,
      facets: {},
      query: '',
    });
    mockSearchEngine.getSuggestions.mockResolvedValue([]);
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

    it('loads recent searches on mount', () => {
      const recentSearches = ['term1', 'term2'];
      mockSearchEngine.getRecentSearches.mockReturnValue(recentSearches);

      const { result } = renderHook(() => useSearch());

      expect(result.current.recentSearches).toEqual(recentSearches);
      expect(mockSearchEngine.getRecentSearches).toHaveBeenCalled();
    });
  });

  describe('Search Functionality', () => {
    it('updates query state', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setQuery('test');
      });

      expect(result.current.query).toBe('test');
    });

    it('performs search after debounce', async () => {
      const { result } = renderHook(() => useSearch({ debounceMs: 200 }));

      act(() => {
        result.current.setQuery('test');
      });

      // Should not search immediately
      expect(mockSearchEngine.search).not.toHaveBeenCalled();

      // Fast forward time
      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(mockSearchEngine.search).toHaveBeenCalledWith('test', expect.any(Object));
    });

    it('does not search if query is too short', () => {
      const { result } = renderHook(() => useSearch({ minQueryLength: 3 }));

      act(() => {
        result.current.setQuery('ab');
      });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(mockSearchEngine.search).not.toHaveBeenCalled();
    });
  });
});
