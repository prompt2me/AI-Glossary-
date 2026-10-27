import React, { useState } from 'react';
import { GlossaryTerm, TopicCategory } from '../types';
import { CATEGORY_STYLES } from '../utils/categoryStyles';
import { Copy, Check, Link2, Bookmark, BookmarkCheck } from 'lucide-react';

interface TermCardProps {
  term: GlossaryTerm;
  searchQuery: string;
  isBookmarked: boolean;
  onToggleBookmark: (termId: string) => void;
  onSelectCategory: (category: TopicCategory) => void;
}

// Helper to highlight matching text cleanly
function highlightMatch(text: string, query: string) {
  if (!query || !query.trim()) return text;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.trim().toLowerCase() ? (
      <mark key={index} className="bg-amber-100 text-amber-950 font-medium px-0.5 rounded-xs">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export const TermCard: React.FC<TermCardProps> = ({
  term,
  searchQuery,
  isBookmarked,
  onToggleBookmark,
  onSelectCategory,
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const style = CATEGORY_STYLES[term.category] || {
    badgeBg: 'bg-gray-100',
    badgeText: 'text-gray-800',
    badgeBorder: 'border-gray-200',
    dotColor: 'bg-gray-500',
  };

  const copyDefinition = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${term.term}: ${term.definition}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  const copyAnchorLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${term.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <article
      id={term.slug}
      className="term-card group relative flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-[#E5E7EB] hover:border-gray-300 hover:shadow-md transition-all duration-200"
    >
      <div>
        {/* Top Header: Term Name & Category Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight leading-snug group-hover:text-blue-900 transition-colors">
            <a href={`#${term.slug}`} className="hover:underline focus:outline-hidden focus:text-blue-600">
              {highlightMatch(term.term, searchQuery)}
            </a>
          </h3>

          {/* Category Pill Tag */}
          <button
            type="button"
            onClick={() => onSelectCategory(term.category)}
            title={`Filter by ${term.category}`}
            className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${style.badgeBg} ${style.badgeText} ${style.badgeBorder} hover:opacity-85`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dotColor}`}></span>
            <span className="truncate max-w-[130px] sm:max-w-[170px]">{term.category}</span>
          </button>
        </div>

        {/* Plain-English Definition */}
        <p className="text-sm sm:text-[15px] text-[#374151] leading-relaxed mb-4">
          {highlightMatch(term.definition, searchQuery)}
        </p>
      </div>

      {/* Card Utilities Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span className="text-[11px] font-mono text-gray-400">
          #{term.slug}
        </span>

        <div className="flex items-center gap-1">
          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => onToggleBookmark(term.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this term'}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-700'
            }`}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-3.5 h-3.5 fill-amber-500" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Copy Direct Link */}
          <button
            type="button"
            onClick={copyAnchorLink}
            title="Copy link to this definition"
            className="p-1.5 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-colors"
          >
            {copiedLink ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Link2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Copy Definition */}
          <button
            type="button"
            onClick={copyDefinition}
            title="Copy plain-text definition"
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors"
          >
            {copiedText ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
