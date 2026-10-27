import { TopicCategory } from '../types';

export interface CategoryTheme {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  iconName?: string;
}

export const CATEGORY_STYLES: Record<TopicCategory, CategoryTheme> = {
  'Models & Architectures': {
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-200',
    dotColor: 'bg-blue-500',
  },
  'Agents & AI Assistants': {
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    badgeBorder: 'border-purple-200',
    dotColor: 'bg-purple-500',
  },
  'RAG & Retrieval': {
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200',
    dotColor: 'bg-emerald-500',
  },
  'AI Search & Discovery': {
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-700',
    badgeBorder: 'border-sky-200',
    dotColor: 'bg-sky-500',
  },
  'AI Visibility & Optimization (AEO/GEO)': {
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    badgeBorder: 'border-amber-200',
    dotColor: 'bg-amber-500',
  },
  'Infrastructure & Deployment': {
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    badgeBorder: 'border-slate-300',
    dotColor: 'bg-slate-500',
  },
  'Evaluation & Metrics': {
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    badgeBorder: 'border-teal-200',
    dotColor: 'bg-teal-500',
  },
  'Safety, Security & Trust': {
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-200',
    dotColor: 'bg-rose-500',
  },
  'Data & Knowledge Management': {
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    badgeBorder: 'border-indigo-200',
    dotColor: 'bg-indigo-500',
  },
  'Training & Optimization': {
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-700',
    badgeBorder: 'border-violet-200',
    dotColor: 'bg-violet-500',
  },
  'Language Models & NLP': {
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-800',
    badgeBorder: 'border-cyan-200',
    dotColor: 'bg-cyan-500',
  },
  'Generative & Multimodal AI': {
    badgeBg: 'bg-fuchsia-50',
    badgeText: 'text-fuchsia-700',
    badgeBorder: 'border-fuchsia-200',
    dotColor: 'bg-fuchsia-500',
  },
  'Web Crawling & Indexing': {
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-800',
    badgeBorder: 'border-orange-200',
    dotColor: 'bg-orange-500',
  },
  'Content Structure & Citability': {
    badgeBg: 'bg-lime-50',
    badgeText: 'text-lime-800',
    badgeBorder: 'border-lime-200',
    dotColor: 'bg-lime-600',
  },
  'AI Commerce & Payments': {
    badgeBg: 'bg-green-50',
    badgeText: 'text-green-800',
    badgeBorder: 'border-green-200',
    dotColor: 'bg-green-600',
  },
  'AI Platforms & Tools': {
    badgeBg: 'bg-zinc-100',
    badgeText: 'text-zinc-800',
    badgeBorder: 'border-zinc-300',
    dotColor: 'bg-zinc-600',
  },
};
