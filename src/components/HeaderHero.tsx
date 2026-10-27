import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Share2, 
  Bookmark, 
  Dice5, 
  Download, 
  Check, 
  Layers, 
  Search, 
  ShieldCheck 
} from 'lucide-react';

interface HeaderHeroProps {
  totalTerms: number;
  totalCategories: number;
  bookmarkedCount: number;
  onRandomTerm: () => void;
  onOpenBookmarks: () => void;
  onOpenExport: () => void;
  onFocusSearch: () => void;
  onJumpToIndex: () => void;
  onJumpToTopics: () => void;
  onJumpToTerms: () => void;
}

export const HeaderHero: React.FC<HeaderHeroProps> = ({
  totalTerms,
  totalCategories,
  bookmarkedCount,
  onRandomTerm,
  onOpenBookmarks,
  onOpenExport,
  onFocusSearch,
  onJumpToIndex,
  onJumpToTopics,
  onJumpToTerms,
}) => {
  const [copiedUrl, setCopiedUrl] = React.useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <header className="relative border-b border-gray-200 bg-white">
      {/* Top Utility Bar */}
      <div className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 overflow-hidden flex items-center justify-center shadow-xs shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/grok_1792955260013_351a6e6b.jpg`}
                alt="The AI Glossary Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-gray-900 tracking-tight text-base sm:text-lg">
              The AI Glossary
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-3 h-3" /> 2026 Edition
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onFocusSearch}
              className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors"
              title="Quick Search (Press / to search)"
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span>Search terms...</span>
              <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-400 font-mono">
                /
              </kbd>
            </button>

            <button
              onClick={onRandomTerm}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs transition-colors"
              title="Jump to a random term"
            >
              <Dice5 className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Random Term</span>
            </button>

            <button
              onClick={onOpenBookmarks}
              className="relative inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs transition-colors"
              title="View saved terms"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarkedCount > 0 ? 'fill-amber-400 text-amber-500' : 'text-gray-500'}`} />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkedCount > 0 && (
                <span className="inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenExport}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs transition-colors"
              title="Export as Markdown or JSON"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs transition-colors"
              title="Copy share link"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-gray-500" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 text-center">
        {/* Category Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700 mb-6 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Verified AI Knowledge Base &amp; Terminology Directory</span>
        </div>

        {/* Main Heading (Requirement: The AI Glossary) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
          The AI Glossary
        </h1>

        {/* Subtitle / Overview (Requirement paragraph) */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
          Explore the essential concepts, technologies, and terminology shaping artificial intelligence.
          This glossary organizes key AI terms into focused categories, from models and agents to retrieval systems,
          infrastructure, evaluation, and safety. Whether you&apos;re learning the fundamentals or exploring advanced
          techniques, use this guide to understand plain-English, practical definitions and navigate the rapidly
          evolving AI landscape.
        </p>

        {/* Stats Row */}
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <button
            type="button"
            onClick={onJumpToTerms}
            className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs text-left hover:border-blue-400 hover:shadow-sm hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Terms</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{totalTerms}</div>
            <div className="text-xs text-blue-600 font-medium mt-0.5 group-hover:underline">Explore glossary →</div>
          </button>

          <button
            type="button"
            onClick={onJumpToTopics}
            className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs text-left hover:border-purple-400 hover:shadow-sm hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <Layers className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Topics</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{totalCategories}</div>
            <div className="text-xs text-purple-600 font-medium mt-0.5 group-hover:underline">Browse topics →</div>
          </button>

          <button
            type="button"
            onClick={onJumpToIndex}
            className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs text-left hover:border-emerald-400 hover:shadow-sm hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Index</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">A – Z</div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5 group-hover:underline">Quick-jump index →</div>
          </button>

          <button
            type="button"
            onClick={onJumpToTerms}
            className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs text-left hover:border-amber-400 hover:shadow-sm hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Quality</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">100%</div>
            <div className="text-xs text-amber-600 font-medium mt-0.5 group-hover:underline">AEO verified →</div>
          </button>
        </div>
      </div>
    </header>
  );
};
