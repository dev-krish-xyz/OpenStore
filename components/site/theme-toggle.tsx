'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/icon';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#000000' : '#ffffff');
    try { localStorage.setItem('openstore-theme', next); } catch {}
    setTheme(next);
  }

  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  return (
    <button className="icon-button" id="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
}

/** Runs before paint so a saved light preference never flashes dark. */
export const themeScript = `try{var t=localStorage.getItem('openstore-theme')==='light'?'light':'dark';document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#000000':'#ffffff'}catch(e){}`;
