'use client';

import { useEffect } from 'react';

const githubUrl = 'https://github.com/dev-krish-xyz/OpenStore';

export default function HomePage() {
  useEffect(() => {
    if (window.__openstoreBooted) return;
    window.__openstoreBooted = true;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/legacy/app.js';
    script.onerror = () => {
      const main = document.querySelector('#main');
      if (main) main.innerHTML = '<div class="empty-state"><h2>Let’s try that again.</h2><p>The collection couldn’t load. Refresh to try again.</p><button class="button button-primary" onclick="location.reload()">Refresh OpenStore</button></div>';
    };
    document.body.appendChild(script);
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar"><div className="nav-inner">
      <a className="brand" href="#/" aria-label="OpenStore home"><span className="brand-mark"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M8 12h16l2 14H6l2-14Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M12 13V9a4 4 0 0 1 8 0v4M12 19l3 3 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>OpenStore<span className="brand-beta">BETA</span></a>
      <nav aria-label="Main navigation"><a href="#/" data-nav="discover">Discover</a><a href="#/categories" data-nav="categories">Categories</a><a href="#/trending" data-nav="trending">Trending</a><a href="#/new" data-nav="new">New<span className="nav-dot"/></a></nav>
      <div className="nav-actions"><button className="icon-button" id="search-shortcut" aria-label="Search apps"/><button className="icon-button" id="theme-toggle" aria-label="Switch to dark mode" title="Switch to dark mode"/><span className="nav-separator"/><a className="github-nav" href={githubUrl} target="_blank" rel="noopener noreferrer" id="github-nav">GitHub</a></div>
    </div></header>
    <main id="main" tabIndex="-1"><div className="loading"><span className="brand-mark">O</span><p>Opening a world of possibilities…</p></div></main>
    <footer className="footer"><div className="footer-inner"><a className="brand footer-brand" href="#/">OpenStore</a><p>Good software belongs to everyone.</p><div><button id="about-button">About this collection</button><a href={githubUrl} target="_blank" rel="noopener noreferrer">Explore on GitHub ↗</a></div></div><div className="footer-note">Independently curated. Not affiliated with the listed projects. Comparisons describe overlapping use cases.</div></footer>
    <dialog id="about-dialog" className="about-dialog"><button className="dialog-close icon-button" aria-label="Close about dialog">×</button><span className="eyebrow">A LITTLE MORE OPEN</span><h2>Find your next favorite app.</h2><p>OpenStore is an independent collection of open-source software and a clearly marked source-available project. Each listing links to its official repository and project website.</p><p>Stars and forks are timestamped GitHub snapshots. Trending membership comes from GitHub’s weekly trending page; “recently popular” is an editorial selection, not a measured growth ranking. Alternative comparisons are editorial suggestions, not claims of feature parity.</p><p id="snapshot-info"/><a href="https://github.com/trending?since=weekly" target="_blank" rel="noopener noreferrer" className="button button-primary">View GitHub Trending ↗</a></dialog>
    <dialog id="image-dialog" className="image-dialog"><button className="dialog-close icon-button" aria-label="Close screenshot">×</button><img alt=""/><p/></dialog>
    <dialog id="filter-dialog" className="filter-dialog" aria-labelledby="filter-title"><button className="dialog-close icon-button" aria-label="Close filters">×</button><form id="filter-form"><span className="eyebrow">MAKE IT YOURS</span><h2 id="filter-title">Refine your collection.</h2><p className="filter-intro">A few preferences. A better fit.</p><div id="filter-options"/><div className="filter-dialog-actions"><button type="button" id="clear-advanced-filters" className="text-link">Clear preferences</button><button type="submit" className="button button-primary">Apply filters <span aria-hidden="true">→</span></button></div></form></dialog>
    <div id="toast" role="status" className="toast"/>
  </>;
}
