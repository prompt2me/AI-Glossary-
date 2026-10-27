import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GLOSSARY_TERMS, TOPIC_CATEGORIES, GlossaryTerm, TopicCategory } from './data/glossaryData';
import { HeaderHero } from './components/HeaderHero';
import { AlphabetJumpGrid } from './components/AlphabetJumpGrid';
import { TopicNavigation } from './components/TopicNavigation';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { GlossaryList } from './components/GlossaryList';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';

const BookmarksDrawer = React.lazy(() => import('./components/BookmarksDrawer').then(m => ({ default: m.BookmarksDrawer })));
const ExportModal = React.lazy(() => import('./components/ExportModal').then(m => ({ default: m.ExportModal })));

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | 'All'>('All');
  const [searchInDefinitions, setSearchInDefinitions] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('ai_glossary_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string>('A');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai_glossary_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    } catch {
      // Ignore localStorage write error
    }
  }, [bookmarkedIds]);

  // Handle keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Deep-link anchor scroll on load if URL has hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-blue-600', 'ring-offset-2');
          setTimeout(() => {
            el.classList.remove('ring-2', 'ring-blue-600', 'ring-offset-2');
          }, 3000);
        }
      }, 500);
    }
  }, []);

  // Inject JSON-LD Schema for DefinedTermSet
  useEffect(() => {
    const scriptId = 'ai-glossary-jsonld';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'The AI Glossary',
        description: 'Comprehensive plain-English artificial intelligence terms and definitions.',
        hasDefinedTerm: GLOSSARY_TERMS.slice(0, 50).map((t) => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.definition,
          inDefinedTermSet: 'The AI Glossary',
        })),
      });
      document.head.appendChild(script);
    }
  }, []);

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds(new Set());
  };

  // Category counts across entire dataset
  const categoryCounts = useMemo(() => {
    const counts = {} as Record<TopicCategory, number>;
    for (const cat of TOPIC_CATEGORIES) {
      counts[cat] = 0;
    }
    for (const term of GLOSSARY_TERMS) {
      if (counts[term.category] !== undefined) {
        counts[term.category]++;
      }
    }
    return counts;
  }, []);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return GLOSSARY_TERMS.filter((t) => {
      // Category filter
      if (selectedCategory !== 'All' && t.category !== selectedCategory) {
        return false;
      }

      // Bookmarked filter
      if (bookmarkedOnly && !bookmarkedIds.has(t.id)) {
        return false;
      }

      // Query filter
      if (q) {
        const matchesTitle = t.term.toLowerCase().includes(q);
        const matchesCategory = t.category.toLowerCase().includes(q);
        const matchesDef = searchInDefinitions && t.definition.toLowerCase().includes(q);
        return matchesTitle || matchesCategory || matchesDef;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.term.localeCompare(b.term);
      } else {
        return b.term.localeCompare(a.term);
      }
    });
  }, [searchQuery, selectedCategory, bookmarkedOnly, bookmarkedIds, searchInDefinitions, sortOrder]);

  // Group terms by first letter for the filtered view
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of filteredTerms) {
      const letter = term.letter || term.term.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    }
    return groups;
  }, [filteredTerms]);

  // Overall letter counts across the full glossary
  const totalLetterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (let charCode = 65; charCode <= 90; charCode++) {
      counts[String.fromCharCode(charCode)] = 0;
    }
    for (const term of GLOSSARY_TERMS) {
      const letter = (term.letter || term.term.charAt(0)).toUpperCase();
      counts[letter] = (counts[letter] || 0) + 1;
    }
    return counts;
  }, []);

  // Letter counts based on currently filtered terms
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (let charCode = 65; charCode <= 90; charCode++) {
      const char = String.fromCharCode(charCode);
      counts[char] = 0;
    }
    for (const term of filteredTerms) {
      const letter = (term.letter || term.term.charAt(0)).toUpperCase();
      if (counts[letter] !== undefined) {
        counts[letter]++;
      } else {
        counts[letter] = 1;
      }
    }
    return counts;
  }, [filteredTerms]);

  const performScrollToLetter = (letter: string) => {
    const target = document.getElementById(`section-${letter}`);
    if (target) {
      const yOffset = -180;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  // Scroll to a letter section with filter unlocking
  const scrollToLetter = (letter: string, forceResetFilters = false) => {
    setActiveLetter(letter);
    if (forceResetFilters) {
      setSearchQuery('');
      setSelectedCategory('All');
      setBookmarkedOnly(false);
      setTimeout(() => {
        performScrollToLetter(letter);
      }, 80);
    } else {
      performScrollToLetter(letter);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation jump helpers for stats cards
  const handleJumpToIndex = () => {
    const el = document.getElementById('alphabet-jump-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToTopics = () => {
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleJumpToTerms = () => {
    const firstSection = document.querySelector('section[id^="section-"]');
    if (firstSection) {
      const yOffset = -180;
      const y = firstSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  // Jump to random term
  const handleRandomTerm = () => {
    const randomIndex = Math.floor(Math.random() * GLOSSARY_TERMS.length);
    const randomTerm = GLOSSARY_TERMS[randomIndex];

    // Ensure it is visible by clearing query and setting category if needed
    setSearchQuery('');
    setBookmarkedOnly(false);
    if (selectedCategory !== 'All' && selectedCategory !== randomTerm.category) {
      setSelectedCategory('All');
    }

    setTimeout(() => {
      const el = document.getElementById(randomTerm.slug);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-blue-500', 'ring-offset-2');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-blue-500', 'ring-offset-2');
        }, 2500);
      }
    }, 200);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setBookmarkedOnly(false);
    searchInputRef.current?.focus();
  };

  // Bookmarked terms list
  const bookmarkedTermsList = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => bookmarkedIds.has(t.id));
  }, [bookmarkedIds]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Header / Hero Section */}
      <HeaderHero
        totalTerms={GLOSSARY_TERMS.length}
        totalCategories={TOPIC_CATEGORIES.length}
        bookmarkedCount={bookmarkedIds.size}
        onRandomTerm={handleRandomTerm}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onFocusSearch={() => searchInputRef.current?.focus()}
        onJumpToIndex={handleJumpToIndex}
        onJumpToTopics={handleJumpToTopics}
        onJumpToTerms={handleJumpToTerms}
      />

      <main className="flex-1">
        {/* 2. Alphabet Quick-Jump Grid (A–Z) */}
        <AlphabetJumpGrid
          letterCounts={letterCounts}
          totalLetterCounts={totalLetterCounts}
          activeLetter={activeLetter}
          hasActiveFilters={Boolean(searchQuery.trim() || selectedCategory !== 'All' || bookmarkedOnly)}
          onSelectLetter={scrollToLetter}
        />

        {/* 3. "Navigate by Topic" / "Browse by Topic" Section */}
        <TopicNavigation
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
          totalAllTerms={GLOSSARY_TERMS.length}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 4. Search & Filter Controls */}
        <SearchAndFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onClearFilters={handleClearFilters}
          filteredCount={filteredTerms.length}
          totalTerms={GLOSSARY_TERMS.length}
          searchInDefinitions={searchInDefinitions}
          onToggleSearchInDefinitions={setSearchInDefinitions}
          sortOrder={sortOrder}
          onToggleSortOrder={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          bookmarkedOnly={bookmarkedOnly}
          onToggleBookmarkedOnly={() => setBookmarkedOnly((prev) => !prev)}
          searchInputRef={searchInputRef}
        />

        {/* 5. Glossary Terms List / Cards Container */}
        <GlossaryList
          groupedTerms={groupedTerms}
          searchQuery={searchQuery}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={toggleBookmark}
          onSelectCategory={(cat: TopicCategory) => {
            setSelectedCategory(cat);
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
          onClearFilters={handleClearFilters}
          onScrollToTop={scrollToTop}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        onScrollToTop={scrollToTop}
      />

      {/* Slide-over Bookmarks Drawer */}
      {isBookmarksOpen && (
        <React.Suspense fallback={null}>
          <BookmarksDrawer
            isOpen={isBookmarksOpen}
            onClose={() => setIsBookmarksOpen(false)}
            bookmarkedTerms={bookmarkedTermsList}
            onRemoveBookmark={toggleBookmark}
            onClearAllBookmarks={clearAllBookmarks}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        </React.Suspense>
      )}

      {/* Export Modal */}
      {isExportOpen && (
        <React.Suspense fallback={null}>
          <ExportModal
            isOpen={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            terms={filteredTerms}
          />
        </React.Suspense>
      )}

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-150 border border-gray-700"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
