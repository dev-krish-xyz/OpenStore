import { catalog, categories as rawCategories } from '@/catalog.js';
import { openCatalog } from '@/open-catalog.js';
import { trendingCatalog } from '@/trending-catalog.js';
import repositorySnapshot from '@/public/assets/github-snapshot.json';
import trendingSnapshot from '@/public/assets/trending-snapshot.json';
import assetSources from '@/public/assets/asset-sources.json';
import officialIcons from '@/public/assets/official-icons.json';
import reviewSnapshot from '@/public/assets/reviews-snapshot.json';
import type { CatalogEntry, Category, Project, ProjectSummary, Review, SearchEntry, SnapshotDates } from './types';

interface RepositoryStats { stargazers_count?: number; forks_count?: number; pushed_at?: string; created_at?: string }

const repositories = repositorySnapshot.repositories as Record<string, RepositoryStats>;
const trend = trendingSnapshot.repositories as { repo: string; weeklyStars: number }[];
const sources = assetSources as Record<string, { error?: string }>;
const icons = officialIcons as Record<string, { file?: string }>;
const reviews = reviewSnapshot.projects as Record<string, Review>;

export const categories = rawCategories as Category[];

export const snapshotDates: SnapshotDates = {
  repositories: repositorySnapshot.fetchedAt,
  trending: trendingSnapshot.fetchedAt,
  reviews: reviewSnapshot.fetchedAt,
};

function enrich(entry: CatalogEntry): Project {
  const stats = repositories[entry.repo];
  const weekly = trend.find(t => t.repo.toLowerCase() === entry.repo.toLowerCase());
  const review = reviews[entry.id];
  const iconFile = icons[entry.id]?.file;
  return {
    ...entry,
    iconSrc: entry.iconUrl || (iconFile ? `/assets/${iconFile}` : undefined),
    review,
    bestFor: entry.bestFor || review?.useCase,
    stars: stats?.stargazers_count,
    forks: stats?.forks_count,
    updatedAt: stats?.pushed_at,
    createdAt: stats?.created_at,
    trending: Boolean(weekly),
    weeklyStars: weekly?.weeklyStars,
    screens: entry.screens.filter(([file]) => sources[file] && !sources[file].error),
  };
}

export const projects: Project[] = ([...catalog, ...openCatalog, ...trendingCatalog] as CatalogEntry[]).map(enrich);

export function getProject(id: string) {
  return projects.find(project => project.id === id);
}

/** Looks up hand-picked projects for editorial sections, failing loudly if an id goes stale. */
export function pick(ids: string[]) {
  return ids.map(id => {
    const project = getProject(id);
    if (!project) throw new Error(`Unknown catalog project: ${id}`);
    return project;
  });
}

export function categoryCount(name: string) {
  return projects.filter(project => project.category === name).length;
}

export const openFamilyCount = projects.filter(project => project.name.toLowerCase().startsWith('open')).length;

export function trendingProjects(limit?: number) {
  const list = projects.filter(project => project.trending).sort((a, b) => (b.weeklyStars || 0) - (a.weeklyStars || 0));
  return limit ? list.slice(0, limit) : list;
}

export const searchEntries: SearchEntry[] = projects.map(({ id, name, category, replaces, bestFor, iconSrc }) => ({ id, name, category, replaces, bestFor, iconSrc }));

export function summarize(project: Project): ProjectSummary {
  const { about, features, screens, docs, website, note, consideration, researchSource, licenseUrl, iconUrl, color, popular, addedAt, ...summary } = project;
  return summary;
}
