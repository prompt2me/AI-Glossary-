import React from 'react';
import { GlossaryTerm, TopicCategory } from '../types';
import { X, Bookmark, Trash2, ExternalLink } from 'lucide-react';
import { CATEGORY_STYLES } from '../utils/categoryStyles';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedTerms: GlossaryTerm[];
  onRemoveBookmark: (id: string) => void;
  onClearAllBookmarks: () => void;
  onSelectCategory: (category: TopicCategory) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedTerms,
  onRemoveBookmark,
  onClearAllBookmarks,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Saved Terms</h3>
                <p className="text-xs text-gray-500">
                  {bookmarkedTerms.length} {bookmarkedTerms.length === 1 ? 'definition' : 'definitions'} saved for quick reference
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of bookmarks */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {bookmarkedTerms.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                <Bookmark className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                <p className="text-sm font-semibold text-gray-700">No saved terms yet</p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Click the bookmark icon on any term card in the glossary to save it here for fast study or review.
                </p>
              </div>
            ) : (
              bookmarkedTerms.map((term) => {
                const style = CATEGORY_STYLES[term.category] || {
                  badgeBg: 'bg-gray-100',
                  badgeText: 'text-gray-800',
                  badgeBorder: 'border-gray-200',
                };

                return (
                  <div
                    key={term.id}
                    className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 shadow-2xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <a
                        href={`#${term.slug}`}
                        onClick={onClose}
                        className="font-bold text-gray-900 text-base hover:text-blue-600 transition-colors flex items-center gap-1.5"
                      >
                        <span>{term.term}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-40" />
                      </a>
                      <button
                        onClick={() => onRemoveBookmark(term.id)}
                        title="Remove from saved"
                        className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        onClick={() => {
                          onSelectCategory(term.category);
                          onClose();
                        }}
                        className={`cursor-pointer inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${style.badgeBg} ${style.badgeText} ${style.badgeBorder}`}
                      >
                        {term.category}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {term.definition}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {bookmarkedTerms.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <button
                onClick={onClearAllBookmarks}
                className="text-xs text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Saved</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
