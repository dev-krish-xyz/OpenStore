'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icon';
import { searchHref } from '@/lib/routes';

// Typing on a page without results (home, categories) moves the query to /browse. Keystrokes
// that land while /browse is loading are kept here and claimed by the browse view on mount.
let handoff: string | null = null;

/** Returns text typed on another page that hasn't reached the browse URL yet. */
export function takeSearchHandoff() {
  const value = handoff;
  handoff = null;
  return value;
}

interface SearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState('');
  const navigated = useRef(false);
  const controlled = onChange !== undefined;
  const current = controlled ? value ?? '' : draft;

  useEffect(() => {
    if (controlled && handoff !== null) input.current?.focus();
  }, [controlled]);

  function change(next: string) {
    if (controlled) return onChange(next);
    setDraft(next);
    handoff = next;
    const href = searchHref(next);
    if (navigated.current) router.replace(href, { scroll: false });
    else router.push(href, { scroll: false });
    navigated.current = true;
  }

  return (
    <div className="search-box">
      <Icon name="search" />
      <input
        ref={input}
        type="search"
        id="app-search"
        aria-label="Search open-source alternatives"
        placeholder="Search open-source alternatives…"
        autoComplete="off"
        value={current}
        onChange={event => change(event.target.value)}
        onKeyDown={event => { if (event.key === 'Escape') event.currentTarget.blur(); }}
      />
      {current ? (
        <button className="search-clear" onClick={() => { change(''); input.current?.focus(); }} aria-label="Clear search">×</button>
      ) : (
        <kbd>⌘ K</kbd>
      )}
    </div>
  );
}
