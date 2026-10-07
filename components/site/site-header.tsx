'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandMark } from '@/components/brand-mark';
import { Icon } from '@/components/icon';
import { githubRepoUrl } from '@/lib/routes';
import { useCommandMenu } from './command-menu';
import { ThemeToggle } from './theme-toggle';

const navIconProps = { className: 'nav-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

const links = [
  { href: '/', label: 'Discover', icon: <svg {...navIconProps}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" /></svg> },
  { href: '/categories', label: 'Categories', icon: <svg {...navIconProps}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg> },
  { href: '/trending', label: 'Trending', icon: <svg {...navIconProps}><path d="m3 16 5-5 4 4 8-9" /><path d="M15 6h5v5" /></svg> },
  { href: '/new', label: 'New', icon: <svg {...navIconProps}><path d="M12 4v16M4 12h16" /></svg>, dot: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const openCommandMenu = useCommandMenu();
  return (
    <header className="topbar">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="OpenStore home">
          <BrandMark />OpenStore
        </Link>
        <nav aria-label="Main navigation">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : undefined} aria-current={pathname === link.href ? 'page' : undefined}>
              {link.icon}{link.label}{link.dot && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className={`submit-nav${pathname === '/submit' ? ' active' : ''}`} href="/submit">Submit</Link>
          <button className="icon-button" id="search-shortcut" onClick={openCommandMenu} aria-label="Search apps" title="Search apps (⌘K)">
            <Icon name="search" />
          </button>
          <ThemeToggle />
          <span className="nav-separator" />
          <a className="icon-button github-nav" href={githubRepoUrl} target="_blank" rel="noopener noreferrer" aria-label="OpenStore on GitHub" title="OpenStore on GitHub"><Icon name="github" /></a>
        </div>
      </div>
    </header>
  );
}
