'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/icon';
import { toast } from '@/components/ui/sonner';

const storageKey = 'openstore-saved';

function readSaved(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')); } catch { return new Set(); }
}

export function SaveButton({ id, name }: { id: string; name: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => setSaved(readSaved().has(id)), [id]);

  function toggle() {
    const all = readSaved();
    const next = !all.has(id);
    if (next) all.add(id);
    else all.delete(id);
    try { localStorage.setItem(storageKey, JSON.stringify([...all])); } catch {}
    setSaved(next);
    toast(next ? 'Saved to this browser.' : 'Removed from saved apps.');
  }

  return (
    <button
      className="icon-button save-button"
      onClick={toggle}
      aria-label={`${saved ? 'Unsave' : 'Save'} ${name}`}
      aria-pressed={saved}
      title={saved ? 'Saved to this browser' : 'Save to this browser'}
    >
      <Icon name="bookmark" />
    </button>
  );
}
