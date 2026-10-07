'use client';

import { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { defaultSort, platforms, sortOptions, starThresholds, type BrowseMode } from '@/lib/catalog/filters';
import type { Filters, SortKey } from '@/lib/catalog/types';

export type AdvancedFilters = Pick<Filters, 'minimumStars' | 'selfHosted' | 'trending' | 'openOnly' | 'reviewed' | 'platform'> & { sort: SortKey };

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  sort: SortKey;
  mode: BrowseMode;
  onApply: (filters: AdvancedFilters) => void;
}

export function FilterDialog({ open, onOpenChange, filters, sort, mode, onApply }: FilterDialogProps) {
  const form = useRef<HTMLFormElement>(null);
  const toggles = ([
    ['selfHosted', 'Self-hosted', 'Run it on infrastructure you control.'],
    ['trending', 'Recently trending', 'On GitHub’s weekly Trending page.'],
    ['openOnly', 'Open… apps', 'Projects with names that start with Open.'],
    ['reviewed', 'With user reviews', 'Published ratings with a verified source.'],
  ] as const).filter(([key]) => !(mode === 'trending' && key === 'trending'));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-sheet
        closeLabel="Close filters"
        className="w-[420px] max-w-[calc(100%-32px)] p-6 max-[760px]:top-auto max-[760px]:bottom-0 max-[760px]:left-0 max-[760px]:w-full max-[760px]:max-w-none max-[760px]:max-h-[85dvh] max-[760px]:translate-x-0 max-[760px]:translate-y-0 max-[760px]:rounded-t-2xl max-[760px]:rounded-b-none max-[760px]:px-5 max-[760px]:pb-[calc(20px+env(safe-area-inset-bottom))]"
      >
        <form
          ref={form}
          onSubmit={event => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            onApply({
              minimumStars: Number(data.get('stars')) || 0,
              selfHosted: data.has('selfHosted'),
              trending: mode === 'trending' || data.has('trending'),
              openOnly: data.has('openOnly'),
              reviewed: data.has('reviewed'),
              platform: String(data.get('platform') || 'All'),
              sort: (data.get('sort') as SortKey | null) || defaultSort(mode),
            });
          }}
        >
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription className="filter-intro">Narrow the catalog by popularity, momentum, and reviews.</DialogDescription>
          {/* Phones have no room for these in the toolbar; desktop keeps them there. */}
          <div className="sheet-mobile-only">
            <label className="sheet-select">
              <span>Sort by</span>
              <select name="sort" defaultValue={sort}>
                {sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="sheet-select">
              <span>Platform</span>
              <select name="platform" defaultValue={filters.platform}>
                {['All', ...platforms].map(value => <option key={value} value={value}>{value === 'All' ? 'All platforms' : value}</option>)}
              </select>
            </label>
          </div>
          <label className="sheet-select">
            <span>Minimum GitHub stars</span>
            <select name="stars" defaultValue={filters.minimumStars}>
              {starThresholds.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          {toggles.map(([key, label, help]) => (
            <label className="sheet-check" key={key}>
              <span><strong>{label}</strong><small>{help}</small></span>
              <input type="checkbox" name={key} defaultChecked={filters[key]} />
            </label>
          ))}
          <div className="filter-dialog-actions">
            <button
              type="button"
              className="text-link"
              onClick={() => {
                const element = form.current;
                if (!element) return;
                const select = (name: string) => element.querySelector<HTMLSelectElement>(`select[name="${name}"]`)!;
                select('stars').value = '0';
                // Sort and platform are hidden on desktop, where the toolbar owns them.
                if (select('sort').checkVisibility()) {
                  select('platform').value = 'All';
                  select('sort').value = defaultSort(mode);
                }
                element.querySelectorAll('input').forEach(input => { input.checked = false; });
              }}
            >
              Clear all
            </button>
            <button type="submit" className="button button-primary">Apply filters</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
