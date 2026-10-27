import { GlossaryTerm, TopicCategory } from './data/glossaryData';

export type { GlossaryTerm, TopicCategory };

export interface FilterState {
  searchQuery: string;
  selectedCategory: TopicCategory | 'All';
  searchInDefinitions: boolean;
  sortBy: 'asc' | 'desc';
  bookmarkedOnly: boolean;
}
