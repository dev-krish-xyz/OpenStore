import type { Project } from '@/lib/catalog/types';

export const githubRepoUrl = 'https://github.com/dev-krish-xyz/OpenStore';
export const twitterUrl = 'https://x.com/krishdotdev';

export const appHref = (project: Pick<Project, 'id'>) => `/app/${project.id}`;
export const githubHref = (project: Pick<Project, 'repo'>) => `https://github.com/${project.repo}`;
export const categoryHref = (name: string) => `/browse?category=${encodeURIComponent(name)}`;
export const searchHref = (query: string) => `/browse?q=${encodeURIComponent(query)}`;
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
