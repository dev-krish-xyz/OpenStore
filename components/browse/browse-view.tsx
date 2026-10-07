'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/icon';
import { CatalogCard } from '@/components/project/catalog-card';
import { SearchBox, takeSearchHandoff } from '@/components/search-box';
import {
  activeFilters, advancedFilterKeys, defaultSort, filterProjects, platforms, readFilters, sortOptions, sortProjects,
  type BrowseMode, type FilterKey,
} from '@/lib/catalog/filters';
import { formatDate, plural } from '@/lib/format';
import type { Category, ProjectSummary, SortKey } from '@/lib/catalog/types';
import { FilterDialog, type AdvancedFilters } from './filter-dialog';

const PAGE_SIZE = 24;

interface BrowseViewProps {
  mode: BrowseMode;
  projects: ProjectSummary[];
  categories: Category[];
  starsAsOf?: string;
  trendAsOf?: string;
}

export function BrowseView({ mode, projects, categories, starsAsOf, trendAsOf }: BrowseViewProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = readFilters(params, mode);
  const sort = (params.get('sort') as SortKey | null) || defaultSort(mode);
  const list = sortProjects(filterProjects(projects, filters), sort);
  const chips = activeFilters(filters, mode);
  const advancedCount = chips.filter(chip => advancedFilterKeys.includes(chip.key)).length;
  // On phones, platform, sort, and self-hosting live in the filter sheet, so the badge counts them too.
  const sheetCount = advancedCount + [filters.platform !== 'All', sort !== defaultSort(mode), filters.selfHosted].filter(Boolean).length;

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState(filters.query);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [resultKey, setResultKey] = useState(params.toString());
  const rail = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  // Reset paging whenever the result set changes, and follow the URL when it changes underneath the input.
  if (resultKey !== params.toString()) {
    setResultKey(params.toString());
    setLimit(PAGE_SIZE);
    if (filters.query !== query) setQuery(filters.query);
  }

  useEffect(() => {
    const typed = takeSearchHandoff();
    if (typed !== null && typed !== filters.query) {
      setQuery(typed);
      setParam('q', typed.trim() ? typed : null, true);
    }
    // Runs once: claims keystrokes typed on the previous page while this one loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rail.current?.querySelector('.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [filters.category]);

  // Shallow URL updates: Next syncs useSearchParams with the history API without a server round trip.
  function navigate(next: URLSearchParams, replace = false) {
    const url = `${pathname}${next.size ? `?${next}` : ''}`;
    if (replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
  }

  function setParam(key: FilterKey | 'sort', value: string | null, replace = false) {
    const next = new URLSearchParams(params);
    if (value === null || value === '' || value === 'All' || value === '0') next.delete(key);
    else next.set(key, value);
    navigate(next, replace);
  }

  function applyAdvanced(advanced: AdvancedFilters) {
    const next = new URLSearchParams(params);
    const values: Record<string, string | null> = {
      stars: advanced.minimumStars ? String(advanced.minimumStars) : null,
      selfHosted: advanced.selfHosted ? '1' : null,
      openOnly: advanced.openOnly ? '1' : null,
      reviewed: advanced.reviewed ? '1' : null,
      ...(mode === 'trending' ? {} : { trending: advanced.trending ? '1' : null }),
      platform: advanced.platform === 'All' ? null : advanced.platform,
      sort: advanced.sort === defaultSort(mode) ? null : advanced.sort,
    };
    for (const [key, value] of Object.entries(values)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setFiltersOpen(false);
    navigate(next);
  }

  function showMore() {
    const first = limit;
    setLimit(limit + PAGE_SIZE);
    requestAnimationFrame(() => grid.current?.querySelectorAll('.catalog-card')[first]?.querySelector('a')?.focus({ preventScroll: true }));
  }

  const title = filters.query ? `Results for “${filters.query}”`
    : filters.openOnly ? 'The Open family'
    : filters.reviewed ? 'Well reviewed'
    : mode === 'trending' ? 'Trending this week'
    : mode === 'new' ? 'Newest projects'
    : filters.category !== 'All' ? filters.category
    : 'All apps';
  const subtitle = mode === 'trending' ? `Real momentum from GitHub’s weekly Trending page. Snapshot ${formatDate(trendAsOf)}.`
    : mode === 'new' ? 'Sorted by repository creation date.'
    : 'Curated open-source alternatives to the software you already use.';

  return (
    <>
      <section className="explore-intro browse-intro">
        <div>
          <span className="eyebrow">{mode === 'trending' ? 'GitHub Trending' : mode === 'new' ? 'Newest' : 'Browse'}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      <section className="browse-controls" aria-label="Browse controls">
        <div className="browse-toolbar">
          <SearchBox value={query} onChange={value => { setQuery(value); setParam('q', value.trim() ? value : null, true); }} />
          <label className="filter-select platform-select">
            <select aria-label="Filter by platform" value={filters.platform} onChange={event => setParam('platform', event.target.value)}>
              {['All', ...platforms].map(value => <option key={value} value={value}>{value === 'All' ? 'All platforms' : value}</option>)}
            </select>
          </label>
          <button className={`filter-trigger${advancedCount ? ' has-filters' : ''}${sheetCount ? ' has-sheet-filters' : ''}`} onClick={() => setFiltersOpen(true)} aria-haspopup="dialog" aria-label={sheetCount ? `Filters, ${sheetCount} active` : 'Filters'}>
            <Icon name="sliders" /><span className="filter-trigger-label">Filters</span>
            {advancedCount > 0 && <span className="filter-count desktop-only" aria-hidden="true">{advancedCount}</span>}
            {sheetCount > 0 && <span className="filter-count mobile-only" aria-hidden="true">{sheetCount}</span>}
          </button>
          <label className="filter-select sort-select">
            <select aria-label="Sort projects" value={sort} onChange={event => setParam('sort', event.target.value === defaultSort(mode) ? null : event.target.value)}>
              {sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <div className="category-pills" aria-label="Filter by category" ref={rail}>
          {['All', ...categories.map(category => category.name)].map(name => (
            <button
              key={name}
              className={`category-pill${filters.category === name ? ' active' : ''}`}
              onClick={() => setParam('category', name)}
              aria-pressed={filters.category === name}
            >
              <Icon name={name === 'All' ? 'layers' : categories.find(category => category.name === name)!.icon} />
              {name === 'All' ? 'All apps' : name}
            </button>
          ))}
        </div>
      </section>

      <div className="results-heading">
        <div className="results-summary">
          <strong>{list.length} {plural(list.length, 'app')} to explore</strong>
          <button className="selfhost-toggle" onClick={() => setParam('selfHosted', filters.selfHosted ? null : '1')} aria-pressed={filters.selfHosted}>
            <Icon name="server" />Self-hosted
          </button>
        </div>
        {chips.length > 0 && <button className="text-link" onClick={() => navigate(new URLSearchParams())}>Reset filters</button>}
      </div>

      {chips.length > 0 && (
        <div className="active-filters" aria-label="Active filters">
          {chips.map(chip => (
            <button key={chip.key} onClick={() => setParam(chip.key, null)} aria-label={`Remove ${chip.label} filter`}>
              {chip.label}<span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      )}

      <div className="catalog-grid" id="results" ref={grid}>
        {list.length ? list.slice(0, limit).map(project => <CatalogCard key={project.id} project={project} />) : <EmptyResults query={filters.query} onReset={() => navigate(new URLSearchParams())} />}
      </div>

      {list.length > limit && (
        <div className="load-more">
          <p>Showing {Math.min(limit, list.length)} of {list.length} apps</p>
          <button className="button button-secondary" onClick={showMore}>Show more apps <Icon name="chevron" /></button>
        </div>
      )}

      <p className="detail-snapshot">
        Stars from GitHub · {formatDate(starsAsOf)}. {mode === 'new' ? 'Repository age does not imply product maturity.' : 'Comparisons describe overlapping use cases, not feature parity.'}
      </p>

      <FilterDialog key={String(filtersOpen)} open={filtersOpen} onOpenChange={setFiltersOpen} filters={filters} sort={sort} mode={mode} onApply={applyAdvanced} />
    </>
  );
}

function EmptyResults({ query, onReset }: { query: string; onReset: () => void }) {
  const value = encodeURIComponent(query);
  return (
    <div className="empty-state zero-results">
      <Icon name="search" />
      <h2>No curated match yet.</h2>
      <p>OpenStore’s catalog is reviewed by hand. Help the discovery pipeline without lowering that bar.</p>
      <div className="zero-result-actions">
        {query ? (
          <>
            <Link className="button button-primary" href={`/submit?alternative=${value}`}>Know an alternative? Submit it</Link>
            <Link className="button button-secondary" href={`/wanted?product=${value}`}>Looking for one too? Request an alternative</Link>
          </>
        ) : (
          <>
            <button className="button button-primary" onClick={onReset}>Clear all filters</button>
            <Link className="button button-secondary" href="/">Back to Discover</Link>
          </>
        )}
      </div>
    </div>
  );
}
