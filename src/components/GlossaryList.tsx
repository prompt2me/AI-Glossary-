import React from 'react';
import { GlossaryTerm, TopicCategory } from '../types';
import { TermCard } from './TermCard';
import { ChevronUp, HelpCircle, RefreshCw } from 'lucide-react';

interface GlossaryListProps {
  groupedTerms: Record<string, GlossaryTerm[]>;
  searchQuery: string;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  onSelectCategory: (category: TopicCategory) => void;
  onClearFilters: () => void;
  onScrollToTop: () => void;
}

export const GlossaryList: React.FC<GlossaryListProps> = ({
  groupedTerms,
  searchQuery,
  bookmarkedIds,
  onToggleBookmark,
  onSelectCategory,
  onClearFilters,
  onScrollToTop,
}) => {
  const letters = Object.keys(groupedTerms).sort();
  const totalCount = Object.values(groupedTerms).reduce((acc, curr) => acc + curr.length, 0);

  if (totalCount === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400 border border-gray-200">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No matching AI terms found</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
          We couldn&apos;t find any terms matching your current search query or active category filters.
        </p>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-xs transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Filters</span>
        </button>
      </section>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="space-y-16">
        {letters.map((letter) => {
          const terms = groupedTerms[letter] || [];
          if (terms.length === 0) return null;

          return (
            <section
              key={letter}
              id={`section-${letter}`}
              className="scroll-mt-48 sm:scroll-mt-52 pt-2"
              aria-labelledby={`heading-${letter}`}
            >
              {/* Section Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-gray-200 sticky top-32 bg-[#F9FAFB]/95 backdrop-blur-sm z-10 py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-extrabold text-xl shadow-xs">
                    {letter}
                  </div>
                  <div>
                    <h2 id={`heading-${letter}`} className="text-xl font-bold text-[#111827]">
                      Section {letter}
                    </h2>
                    <span className="text-xs text-gray-500 font-medium">
                      {terms.length} {terms.length === 1 ? 'term' : 'terms'} available
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onScrollToTop}
                  className="text-xs text-gray-500 hover:text-gray-900 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-2xs"
                  title="Back to Top"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Top</span>
                </button>
              </div>

              {/* Term Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {terms.map((term) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    searchQuery={searchQuery}
                    isBookmarked={bookmarkedIds.has(term.id)}
                    onToggleBookmark={onToggleBookmark}
                    onSelectCategory={onSelectCategory}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
