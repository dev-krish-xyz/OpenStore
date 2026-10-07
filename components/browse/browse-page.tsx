import { Suspense } from 'react';
import { categories, projects, snapshotDates, summarize } from '@/lib/catalog';
import type { BrowseMode } from '@/lib/catalog/filters';
import { BrowseView } from './browse-view';

const summaries = projects.map(summarize);

export function BrowsePage({ mode }: { mode: BrowseMode }) {
  return (
    <Suspense>
      <BrowseView mode={mode} projects={summaries} categories={categories} starsAsOf={snapshotDates.repositories} trendAsOf={snapshotDates.trending} />
    </Suspense>
  );
}
