import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowDownAZ, ArrowUpZA, SlidersHorizontal, Check } from 'lucide-react';
import { TopicCategory } from '../types';

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: TopicCategory | 'All';
  onClearFilters: () => void;
  filteredCount: number;
  totalTerms: number;
  searchInDefinitions: boolean;
  onToggleSearchInDefinitions: (val: boolean) => void;
  sortOrder: 'asc' | 'desc';
  onToggleSortOrder: () => void;
  bookmarkedOnly: boolean;
  onToggleBookmarkedOnly: () => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onClearFilters,
  filteredCount,
  totalTerms,
  searchInDefinitions,
  onToggleSearchInDefinitions,
  sortOrder,
  onToggleSortOrder,
  bookmarkedOnly,
  onToggleBookmarkedOnly,
  searchInputRef,
}) => {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All' || bookmarkedOnly;

  return (
    <section aria-label="Search and Filter Controls" className="sticky top-14 z-20 py-4 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          
          {/* Main High-Visibility Instant Search Bar */}
          <div className="relative flex-1">
            <div className="relative flex items-center bg-white rounded-xl border border-gray-300 shadow-xs transition-all duration-200 focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-100">
              <div className="pl-3.5 pr-2 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5 text-gray-500" />
              </div>

              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search terms or definitions..."
                className="w-full py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 bg-transparent border-0 focus:outline-hidden focus:ring-0"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="p-1.5 mr-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="hidden sm:flex items-center gap-1.5 pr-3 text-xs text-gray-400 border-l border-gray-200 pl-2">
                <kbd className="bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200 text-[11px] font-mono text-gray-500">
                  /
                </kbd>
                <span className="text-[11px]">to search</span>
              </div>
            </div>
          </div>

          {/* Quick Controls & Sort */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search in definition checkbox pill */}
            <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs select-none">
              <input
                type="checkbox"
                checked={searchInDefinitions}
                onChange={(e) => onToggleSearchInDefinitions(e.target.checked)}
                className="w-3.5 h-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-xs font-medium">Search descriptions</span>
            </label>

            {/* Sort Order Toggle */}
            <button
              type="button"
              onClick={onToggleSortOrder}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors"
              title={`Sorting: ${sortOrder === 'asc' ? 'A to Z' : 'Z to A'}`}
            >
              {sortOrder === 'asc' ? (
                <>
                  <ArrowDownAZ className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">A → Z</span>
                </>
              ) : (
                <>
                  <ArrowUpZA className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">Z → A</span>
                </>
              )}
            </button>

            {/* Bookmarked Filter Pill */}
            <button
              type="button"
              onClick={onToggleBookmarkedOnly}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-colors shadow-2xs ${
                bookmarkedOnly
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>Saved Only</span>
            </button>

            {/* Reset Filter Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2.5 pt-2 border-t border-gray-100">
          <div>
            Showing <strong className="font-bold text-gray-900">{filteredCount}</strong> of{' '}
            <strong className="font-bold text-gray-900">{totalTerms}</strong> terms
            {selectedCategory !== 'All' && (
              <span className="ml-1 text-gray-600">
                in <span className="font-semibold text-blue-700">{selectedCategory}</span>
              </span>
            )}
            {searchQuery.trim() && (
              <span className="ml-1 text-gray-600">
                matching &quot;<span className="font-semibold text-gray-900">{searchQuery}</span>&quot;
              </span>
            )}
            {bookmarkedOnly && (
              <span className="ml-1 text-amber-700 font-semibold">(bookmarked only)</span>
            )}
          </div>

          <div className="hidden sm:block text-[11px] text-gray-400">
            Real-time filter &amp; quick jumps active
          </div>
        </div>
      </div>
    </section>
  );
};
