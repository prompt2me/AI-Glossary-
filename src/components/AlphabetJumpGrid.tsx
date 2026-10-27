import React from 'react';

interface AlphabetJumpGridProps {
  letterCounts: Record<string, number>;
  totalLetterCounts: Record<string, number>;
  activeLetter?: string;
  hasActiveFilters: boolean;
  onSelectLetter: (letter: string, forceResetFilters?: boolean) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const AlphabetJumpGrid: React.FC<AlphabetJumpGridProps> = ({
  letterCounts,
  totalLetterCounts,
  activeLetter,
  hasActiveFilters,
  onSelectLetter,
}) => {
  return (
    <section id="alphabet-jump-grid" aria-label="Alphabet Quick-Jump Grid" className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full inline-block"></span>
              Alphabet Quick-Jump Grid (A–Z Index)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Click any letter to explore terms. If a letter is hidden by an active filter, clicking it will display and jump to its terms.
            </p>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
              <span>In View</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded border border-gray-300 bg-white"></span>
              <span>Available</span>
            </span>
            {hasActiveFilters && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-300"></span>
                <span className="text-amber-700">Click to reveal</span>
              </span>
            )}
          </div>
        </div>

        {/* Responsive Grid of Letters */}
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2 sm:gap-2.5">
          {ALPHABET.map((letter) => {
            const count = letterCounts[letter] || 0;
            const totalForLetter = totalLetterCounts[letter] || 0;
            const hasTermsInView = count > 0;
            const isActive = activeLetter === letter;

            return (
              <button
                key={letter}
                type="button"
                onClick={() => onSelectLetter(letter, !hasTermsInView)}
                title={
                  hasTermsInView
                    ? `Jump to letter ${letter} (${count} terms)`
                    : `No terms in current filter. Click to clear filter and explore letter ${letter} (${totalForLetter} terms)`
                }
                aria-label={`Jump to letter ${letter}, ${hasTermsInView ? count : totalForLetter} terms`}
                className={`
                  relative group flex flex-col items-center justify-center py-2 sm:py-2.5 px-1.5 rounded-xl border text-center transition-all duration-150 cursor-pointer
                  ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm ring-2 ring-blue-600/20 scale-[1.03]'
                      : hasTermsInView
                      ? 'bg-white border-gray-200 text-gray-900 hover:border-blue-500 hover:shadow-xs hover:bg-blue-50/50 active:scale-95'
                      : 'bg-amber-50/60 border-amber-200 text-amber-900 hover:bg-amber-100 hover:border-amber-400'
                  }
                `}
              >
                <span className={`text-base sm:text-lg font-bold leading-none ${isActive ? 'text-white' : hasTermsInView ? 'text-gray-900' : 'text-amber-900'}`}>
                  {letter}
                </span>
                <span
                  className={`text-[10px] font-semibold mt-1 transition-colors leading-none ${
                    isActive
                      ? 'text-blue-100'
                      : hasTermsInView
                      ? 'text-gray-400 group-hover:text-blue-600'
                      : 'text-amber-600'
                  }`}
                >
                  {hasTermsInView ? count : `${totalForLetter}*`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
