'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { Icon, type IconName } from '@/components/icon';
import { appHref, searchHref } from '@/lib/routes';
import type { SearchEntry } from '@/lib/catalog/types';

const CommandMenuContext = createContext<() => void>(() => {});

/** Opens the ⌘K command menu from anywhere in the storefront. */
export const useCommandMenu = () => useContext(CommandMenuContext);

const pages: [label: string, href: string, icon: IconName][] = [
  ['Discover', '/', 'sparkles'],
  ['Browse all apps', '/browse', 'layers'],
  ['Categories', '/categories', 'project'],
  ['Trending this week', '/trending', 'flow'],
  ['Newest projects', '/new', 'download'],
  ['Community Finds', '/community', 'thumbs'],
  ['Wanted alternatives', '/wanted', 'inbox'],
  ['Submit an app', '/submit', 'upload'],
];

/**
 * Word-prefix matching instead of cmdk's default fuzzy scoring, which matched "figma" against
 * unrelated apps letter by letter. Name matches outrank alternative and category matches.
 */
function rank(value: string, search: string, keywords: string[] = []) {
  const words = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 1;
  const name = value.toLowerCase();
  const rest = keywords.join(' ').toLowerCase();
  if (!words.every(word => name.includes(word) || rest.includes(word))) return 0;
  if (name.startsWith(words[0])) return 1;
  if (words.every(word => name.includes(word))) return 0.8;
  return 0.5;
}

const itemClass = 'flex h-11 cursor-pointer items-center gap-3 rounded-md px-2.5 text-sm text-body select-none data-[selected=true]:bg-hover data-[selected=true]:text-foreground';
const groupClass = '[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-[.02em] [&_[cmdk-group-heading]]:text-faint [&_[cmdk-group-heading]]:uppercase';

export function CommandMenuProvider({ entries, children }: { entries: SearchEntry[]; children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(value => !value);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const go = useCallback((href: string) => {
    setOpen(false);
    setQuery('');
    router.push(href);
  }, [router]);

  const trimmed = query.trim();

  return (
    <CommandMenuContext.Provider value={show}>
      {children}
      <DialogPrimitive.Root open={open} onOpenChange={value => { setOpen(value); if (!value) setQuery(''); }}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay data-slot="dialog-overlay" className="fixed inset-0 z-50 bg-overlay" />
          <DialogPrimitive.Content
            data-slot="dialog-content"
            aria-describedby={undefined}
            className="fixed top-[12vh] left-1/2 z-50 w-[calc(100%-24px)] max-w-[600px] -translate-x-1/2 overflow-hidden rounded-[14px] border border-border bg-surface text-foreground shadow-panel outline-none"
          >
            <DialogPrimitive.Title className="sr-only">Search OpenStore</DialogPrimitive.Title>
            <Command label="Search OpenStore" loop filter={rank} className="flex flex-col">
              <div className="flex h-[52px] items-center gap-2.5 border-b border-border px-4 text-muted">
                <Icon name="search" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search apps, alternatives, and pages…"
                  className="h-full min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-[15px] text-foreground outline-none placeholder:text-faint"
                />
                <kbd className="rounded-sm border border-border px-1.5 py-0.5 text-[11px] text-faint">esc</kbd>
              </div>
              <Command.List className="max-h-[min(420px,60vh)] scroll-py-2 overflow-y-auto p-2">
                <Command.Empty className="px-3 py-10 text-center text-sm text-muted">
                  No apps match “{trimmed}”.
                </Command.Empty>
                {trimmed && (
                  <Command.Group heading="Search" className={groupClass} forceMount>
                    <Command.Item value={`search-all ${trimmed}`} onSelect={() => go(searchHref(trimmed))} className={itemClass} forceMount>
                      <span className="grid size-7 place-items-center rounded-md border border-border text-muted"><Icon name="search" className="size-3.5" /></span>
                      <span className="truncate">Search all apps for “<span className="text-foreground">{trimmed}</span>”</span>
                    </Command.Item>
                  </Command.Group>
                )}
                <Command.Group heading="Apps" className={groupClass}>
                  {entries.map(app => (
                    <Command.Item
                      key={app.id}
                      value={`${app.name} ${app.id}`}
                      keywords={[...app.replaces, app.category, app.bestFor || '']}
                      onSelect={() => go(appHref(app))}
                      className={itemClass}
                    >
                      <span className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-soft">
                        {app.iconSrc ? <img src={app.iconSrc} alt="" width={20} height={20} className="size-5 object-contain" /> : <Icon name="layers" className="size-3.5" />}
                      </span>
                      <span className="min-w-0 flex-1 truncate">
                        <span className="font-medium text-foreground">{app.name}</span>
                        <span className="text-muted"> · Alternative to {app.replaces[0]}</span>
                      </span>
                      <span className="hidden shrink-0 font-mono text-xs text-faint sm:block">{app.category}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Pages" className={groupClass}>
                  {pages.map(([label, href, icon]) => (
                    <Command.Item key={href} value={`page ${label}`} onSelect={() => go(href)} className={itemClass}>
                      <span className="grid size-7 place-items-center rounded-md border border-border text-muted"><Icon name={icon} className="size-3.5" /></span>
                      {label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
              <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[11px] text-faint">
                <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
                <span><kbd>↵</kbd> to open</span>
                <span className="ml-auto"><kbd>⌘K</kbd> to toggle</span>
              </div>
            </Command>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </CommandMenuContext.Provider>
  );
}
