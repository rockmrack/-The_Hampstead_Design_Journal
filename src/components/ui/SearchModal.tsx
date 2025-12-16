'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { searchEngine, SearchResult, SearchFilters } from '@/lib/search';

import { toSafeInternalHref } from '@/lib/url';
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
                  {results.map((result, index) => {
                    const safeHref = toSafeInternalHref(result.url);
                    if (!safeHref) return null;

                    return (
                      <Link
                        key={result.id}
                        href={safeHref}
                        onClick={() => handleResultClick(result)}
                        data-search-item
                        className={cn(
                          'flex gap-4 p-4 hover:bg-hampstead-grey/10 transition-colors',
                          selectedIndex === index && 'bg-hampstead-grey/10'
                        )}
                        role="option"
                        aria-selected={selectedIndex === index}
                      >
  const trendingSearches = [
    'herringbone flooring',
    'sash windows',
    'basement extension',
    'conservation area',
    'Georgian restoration',
  ];

  const filters = [
    { id: 'article', label: 'Articles' },
    { id: 'guide', label: 'Guides' },
    { id: 'project', label: 'Projects' },
    { id: 'supplier', label: 'Suppliers' },
    { id: 'event', label: 'Events' },
  ];

  // Load recent searches on mount
  useEffect(() => {
    if (isOpen) {
      const recent = searchEngine.getRecentSearches();
      setRecentSearches(recent);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Perform search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
      
      const searchFilters: SearchFilters = activeFilter 
        ? { type: activeFilter as SearchFilters['type'] }
        : {};
      
      const searchResults = searchEngine.search(query, {
        filters: searchFilters,
        limit: 10,
        includeMatches: true,
      });
      
      setResults(searchResults.results);
      setSuggestions(searchEngine.getSuggestions(query, 5));
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, activeFilter]);

  const handleResultClick = useCallback((result: SearchResult) => {
    // Recent search is saved automatically by the search method
    onClose();
    // Navigation will be handled by the Link component
  }, [onClose]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const totalItems = results.length + suggestions.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (totalItems + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalItems : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex]);
        } else if (selectedIndex >= results.length && selectedIndex < totalItems) {
          const suggestionIndex = selectedIndex - results.length;
          setQuery(suggestions[suggestionIndex]);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  }, [results, suggestions, selectedIndex, onClose, handleResultClick]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    searchEngine.clearRecentSearches();
    setRecentSearches([]);
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll('[data-search-item]');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-2xl mx-auto mt-[10vh] bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="relative border-b border-hampstead-grey/30">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search articles, guides, projects..."
                className="w-full pl-12 pr-12 py-4 text-lg text-hampstead-charcoal placeholder:text-hampstead-charcoal/40 focus:outline-none"
                autoComplete="off"
                aria-label="Search"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-hampstead-grey/30 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-hampstead-charcoal/50" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="px-4 py-3 border-b border-hampstead-grey/30 flex gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveFilter(null)}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors',
                  !activeFilter
                    ? 'bg-hampstead-sage text-white'
                    : 'bg-hampstead-grey/30 text-hampstead-charcoal hover:bg-hampstead-grey/50'
                )}
              >
                All
              </button>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors',
                    activeFilter === filter.id
                      ? 'bg-hampstead-sage text-white'
                      : 'bg-hampstead-grey/30 text-hampstead-charcoal hover:bg-hampstead-grey/50'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Results Area */}
            <div
              ref={resultsRef}
              id="search-results"
              className="max-h-[60vh] overflow-y-auto"
              role="listbox"
            >
              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-hampstead-sage animate-spin" />
                </div>
              )}

              {/* No Query - Show Recent & Trending */}
              {!query && !isLoading && (
                <div className="p-4 space-y-6">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      </Link>
                    );
                  })}
                          <Clock className="w-4 h-4" />
                          Recent Searches
                        </h3>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-hampstead-sage hover:underline"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleRecentSearchClick(search)}
                            className="px-3 py-1.5 text-sm bg-hampstead-grey/20 text-hampstead-charcoal rounded-full hover:bg-hampstead-grey/40 transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div>
                    <h3 className="text-sm font-medium text-hampstead-charcoal/70 flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearchClick(search)}
                          className="px-3 py-1.5 text-sm bg-hampstead-sage/10 text-hampstead-sage rounded-full hover:bg-hampstead-sage/20 transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* No Results */}
              {query && !isLoading && results.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-hampstead-charcoal/70">
                    No results found for &ldquo;<span className="font-medium">{query}</span>&rdquo;
                  </p>
                  <p className="text-sm text-hampstead-charcoal/50 mt-2">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}

              {/* Search Results */}
              {!isLoading && results.length > 0 && (
                <div className="divide-y divide-hampstead-grey/20">
                  {results.map((result, index) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={() => handleResultClick(result)}
                      data-search-item
                      className={cn(
                        'flex gap-4 p-4 hover:bg-hampstead-grey/10 transition-colors',
                        selectedIndex === index && 'bg-hampstead-grey/10'
                      )}
                      role="option"
                      aria-selected={selectedIndex === index}
                    >
                      {/* Thumbnail */}
                      {result.image && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-hampstead-grey/20">
                          <Image
                            src={result.image}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs uppercase tracking-wider text-hampstead-sage font-medium">
                            {result.type}
                          </span>
                          {result.category && (
                            <>
                              <span className="text-hampstead-charcoal/30">•</span>
                              <span className="text-xs text-hampstead-charcoal/50">
                                {result.category}
                              </span>
                            </>
                          )}
                        </div>
                        <h4 className="font-medium text-hampstead-charcoal line-clamp-1">
                          {result.title}
                        </h4>
                        {result.description && (
                          <p className="text-sm text-hampstead-charcoal/60 line-clamp-2 mt-1">
                            {result.description}
                          </p>
                        )}
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-5 h-5 text-hampstead-charcoal/30 flex-shrink-0 self-center" />
                    </Link>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {!isLoading && suggestions.length > 0 && (
                <div className="border-t border-hampstead-grey/20 p-4">
                  <p className="text-xs text-hampstead-charcoal/50 mb-2">
                    Suggestions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        data-search-item
                        className={cn(
                          'px-3 py-1.5 text-sm bg-hampstead-grey/20 text-hampstead-charcoal rounded-full hover:bg-hampstead-grey/40 transition-colors',
                          selectedIndex === results.length + index && 'ring-2 ring-hampstead-sage'
                        )}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-hampstead-grey/30 bg-hampstead-grey/10 text-xs text-hampstead-charcoal/50 flex justify-between">
              <span>
                <kbd className="px-1.5 py-0.5 bg-white rounded border">↑↓</kbd> to navigate
                <kbd className="px-1.5 py-0.5 bg-white rounded border ml-2">Enter</kbd> to select
                <kbd className="px-1.5 py-0.5 bg-white rounded border ml-2">Esc</kbd> to close
              </span>
              {results.length > 0 && (
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// Search Trigger Button
// ============================================================================

interface SearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export function SearchTrigger({ onClick, className }: SearchTriggerProps) {
  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClick]);

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-2 bg-hampstead-grey/20 rounded-lg',
        'text-hampstead-charcoal/60 hover:bg-hampstead-grey/40 transition-colors',
        'border border-transparent hover:border-hampstead-grey/50',
        className
      )}
      aria-label="Open search"
    >
      <Search className="w-4 h-4" />
      <span className="text-sm hidden sm:inline">Search...</span>
      <kbd className="hidden sm:flex items-center gap-0.5 text-xs bg-white/50 px-1.5 py-0.5 rounded border border-hampstead-grey/30">
        <span>⌘</span>
        <span>K</span>
      </kbd>
    </button>
  );
}
