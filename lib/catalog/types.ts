export type Platform = 'Web' | 'macOS' | 'Windows' | 'Linux' | 'iOS' | 'Android';

export interface Category {
  name: string;
  icon: string;
  color: string;
}

export interface Review {
  rating: number;
  count: number;
  provider: string;
  url: string;
  summary: string;
  useCase?: string;
  capturedAt: string;
  smallSample: boolean;
  feedbackUrl?: string;
  feedbackProvider?: string;
}

/** A project as written in the hand-curated catalog files. */
export interface CatalogEntry {
  id: string;
  name: string;
  repo: string;
  category: string;
  platforms: string[];
  selfHosted: boolean;
  replaces: string[];
  description: string;
  about: string;
  features: string[];
  website: string;
  docs: string;
  license: string;
  icon: string;
  color: string;
  screens: [file: string, alt: string][];
  popular: boolean;
  bestFor?: string;
  consideration?: string;
  note?: string;
  sourceAvailable?: boolean;
  licenseUrl?: string;
  iconUrl?: string;
  addedAt?: string;
  researchSource?: string;
}

/** A catalog entry enriched with GitHub, trending, review and asset snapshots. */
export interface Project extends CatalogEntry {
  iconSrc?: string;
  review?: Review;
  stars?: number;
  forks?: number;
  updatedAt?: string;
  createdAt?: string;
  trending: boolean;
  weeklyStars?: number;
}

/** The fields list views need; keeps long-form copy out of client payloads. */
export type ProjectSummary = Omit<Project, 'about' | 'features' | 'screens' | 'docs' | 'website' | 'note' | 'consideration' | 'researchSource' | 'licenseUrl' | 'iconUrl' | 'color' | 'popular' | 'addedAt'>;

export interface SnapshotDates {
  repositories?: string;
  trending?: string;
  reviews?: string;
}

/** The slim shape the client-side command menu searches over. */
export interface SearchEntry {
  id: string;
  name: string;
  category: string;
  replaces: string[];
  bestFor?: string;
  iconSrc?: string;
}

export interface Filters {
  query: string;
  category: string;
  platform: string;
  minimumStars: number;
  selfHosted: boolean;
  trending: boolean;
  openOnly: boolean;
  reviewed: boolean;
}

export type SortKey = 'featured' | 'stars' | 'reviews' | 'rating' | 'trending' | 'new' | 'name';
