import { compact } from '@/lib/format';
import { filterProjects } from './filter.js';
import type { Filters, ProjectSummary, SortKey } from './types';

export { filterProjects };

export type BrowseMode = 'browse' | 'trending' | 'new';

export const platforms = ['Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android'] as const;

export const sortOptions: [SortKey, string][] = [
  ['featured', 'Curated'], ['stars', 'Most stars'], ['reviews', 'Most reviews'], ['rating', 'Top rated'],
  ['trending', 'Momentum'], ['new', 'Newest'], ['name', 'Name A–Z'],
];

export const starThresholds: [number, string][] = [
  [0, 'Any stars'], [1000, '1,000+ stars'], [10000, '10,000+ stars'], [50000, '50,000+ stars'], [100000, '100,000+ stars'],
];

export function readFilters(params: URLSearchParams, mode: BrowseMode = 'browse'): Filters {
  return {
    query: params.get('q') || '',
    category: params.get('category') || 'All',
    platform: params.get('platform') || 'All',
    minimumStars: Number(params.get('stars')) || 0,
    selfHosted: params.get('selfHosted') === '1',
    trending: mode === 'trending' || params.get('trending') === '1',
    openOnly: params.get('openOnly') === '1',
    reviewed: params.get('reviewed') === '1',
  };
}

export function defaultSort(mode: BrowseMode): SortKey {
  return mode === 'trending' ? 'trending' : mode === 'new' ? 'new' : 'featured';
}

export function sortProjects<T extends ProjectSummary>(list: T[], sort: SortKey): T[] {
  const time = (value?: string) => (value ? new Date(value).getTime() : 0);
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'stars': return (b.stars || 0) - (a.stars || 0);
      case 'new': return time(b.createdAt) - time(a.createdAt);
      case 'trending': return (b.weeklyStars || 0) - (a.weeklyStars || 0);
      case 'reviews': return (b.review?.count || 0) - (a.review?.count || 0);
      case 'rating': return (b.review?.rating || 0) - (a.review?.rating || 0) || (b.review?.count || 0) - (a.review?.count || 0);
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });
}

export type FilterKey = 'q' | 'category' | 'platform' | 'stars' | 'selfHosted' | 'trending' | 'openOnly' | 'reviewed';

export function activeFilters(f: Filters, mode: BrowseMode): { key: FilterKey; label: string }[] {
  const chips: ({ key: FilterKey; label: string } | false)[] = [
    !!f.query && { key: 'q', label: `Search: ${f.query}` },
    f.category !== 'All' && { key: 'category', label: f.category },
    f.platform !== 'All' && { key: 'platform', label: f.platform },
    f.minimumStars > 0 && { key: 'stars', label: `${compact(f.minimumStars)}+ stars` },
    f.selfHosted && { key: 'selfHosted', label: 'Self-hosted' },
    mode !== 'trending' && f.trending && { key: 'trending', label: 'Recently trending' },
    f.openOnly && { key: 'openOnly', label: 'Open… apps' },
    f.reviewed && { key: 'reviewed', label: 'With user reviews' },
  ];
  return chips.filter(chip => chip !== false);
}

export const advancedFilterKeys: FilterKey[] = ['stars', 'trending', 'openOnly', 'reviewed'];
