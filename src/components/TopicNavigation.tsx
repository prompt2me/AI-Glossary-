import React from 'react';
import { TopicCategory, TOPIC_CATEGORIES } from '../data/glossaryData';
import { CATEGORY_STYLES } from '../utils/categoryStyles';
import { Filter, X } from 'lucide-react';

interface TopicNavigationProps {
  selectedCategory: TopicCategory | 'All';
  categoryCounts: Record<TopicCategory, number>;
  totalAllTerms: number;
  onSelectCategory: (category: TopicCategory | 'All') => void;
}

export const TopicNavigation: React.FC<TopicNavigationProps> = ({
  selectedCategory,
  categoryCounts,
  totalAllTerms,
  onSelectCategory,
}) => {
  return (
    <section aria-label="Navigate by Topic" className="py-8 bg-gray-50/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-purple-600 rounded-full inline-block"></span>
              Navigate by Topic
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Filter glossary terms by core subject domain (click any topic pill below)
            </p>
          </div>

          {selectedCategory !== 'All' && (
            <button
              onClick={() => onSelectCategory('All')}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset topic filter</span>
            </button>
          )}
        </div>

        {/* Topic Pills Grid */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {/* All Topics Pill */}
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className={`
              inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 border
              ${
                selectedCategory === 'All'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-2xs'
              }
            `}
          >
            <Filter className="w-3.5 h-3.5 opacity-70" />
            <span>All Topics</span>
            <span
              className={`text-[11px] font-semibold px-1.5 py-0.2 rounded-full ${
                selectedCategory === 'All'
                  ? 'bg-gray-800 text-gray-200'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {totalAllTerms}
            </span>
          </button>

          {/* Individual Topic Pills */}
          {TOPIC_CATEGORIES.map((category) => {
            const count = categoryCounts[category] || 0;
            const isSelected = selectedCategory === category;
            const style = CATEGORY_STYLES[category];

            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(isSelected ? 'All' : category)}
                aria-pressed={isSelected}
                className={`
                  inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 border
                  ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-[1.02]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 shadow-2xs'
                  }
                `}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white' : style.dotColor
                  }`}
                />
                <span className="font-semibold">{category}</span>
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-blue-700 text-blue-100'
                      : `${style.badgeBg} ${style.badgeText} border ${style.badgeBorder}`
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
