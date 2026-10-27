import React from 'react';
import { BookOpen, Sparkles, ChevronUp, CheckCircle2 } from 'lucide-react';
import { TopicCategory, TOPIC_CATEGORIES } from '../data/glossaryData';

interface FooterProps {
  onSelectCategory: (category: TopicCategory) => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onScrollToTop }) => {
  return (
    <footer className="border-t border-gray-200 bg-white mt-20 pt-12 pb-16 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 overflow-hidden flex items-center justify-center shadow-xs shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/grok_1792955260013_351a6e6b.jpg`}
                  alt="The AI Glossary Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-gray-900 tracking-tight text-lg">
                The AI Glossary
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-md leading-relaxed">
              A comprehensive, plain-English reference encyclopedia covering essential artificial
              intelligence terminology, foundation models, agents, RAG, machine learning math, web
              crawlers, and optimization protocols.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-medium text-gray-700 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> 349 Validated Definitions
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AEO &amp; GEO Structured
              </span>
            </div>
          </div>

          {/* Quick Categories Col 1 */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Core Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {TOPIC_CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onScrollToTop();
                    }}
                    className="hover:text-blue-600 hover:underline transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Categories Col 2 */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Advanced Domains
            </h4>
            <ul className="space-y-2 text-xs">
              {TOPIC_CATEGORIES.slice(8).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onScrollToTop();
                    }}
                    className="hover:text-blue-600 hover:underline transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} The AI Glossary. Built for students, engineers, and researchers.</p>

          <button
            onClick={onScrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-2xs font-medium"
          >
            <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
