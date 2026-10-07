'use client';

import { useEffect } from 'react';

const githubUrl = 'https://github.com/dev-krish-xyz/OpenStore';
const twitterUrl = 'https://x.com/krishdotdev';
const legacyVersion = 'polish-20261008-2';

export default function HomePage() {
  useEffect(() => {
    if (window.__openstoreBooted === legacyVersion) return;
    if (window.__openstoreBooted) {
      window.location.reload();
      return;
    }
    window.__openstoreBooted = legacyVersion;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `/legacy/app.js?v=${legacyVersion}`;
    script.onerror = () => {
      const main = document.querySelector('#main');
      if (main) main.innerHTML = '<div class="empty-state"><h2>Let’s try that again.</h2><p>The collection couldn’t load. Refresh to try again.</p><button class="button button-primary" onclick="location.reload()">Refresh OpenStore</button></div>';
    };
    document.body.appendChild(script);
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar"><div className="nav-inner">
      <a className="brand" href="#/" aria-label="OpenStore home"><img className="brand-mark" src="/assets/logo.svg" alt="" width="32" height="32"/>OpenStore</a>
      <nav aria-label="Main navigation"><a href="#/" data-nav="discover"><svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/></svg>Discover</a><a href="#/categories" data-nav="categories"><svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>Categories</a><a href="#/trending" data-nav="trending"><svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 16 5-5 4 4 8-9"/><path d="M15 6h5v5"/></svg>Trending</a><a href="#/new" data-nav="new"><svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg>New<span className="nav-dot"/></a></nav>
      <div className="nav-actions"><a className="submit-nav" href="#/submit">Submit</a><button className="icon-button" id="search-shortcut" aria-label="Search apps"/><button className="icon-button" id="theme-toggle" aria-label="Switch to dark mode" title="Switch to dark mode"/><span className="nav-separator"/><a className="github-nav" href={githubUrl} target="_blank" rel="noopener noreferrer" id="github-nav">GitHub</a></div>
    </div></header>
    <main id="main" tabIndex="-1"><div className="loading"><img className="brand-mark" src="/assets/logo.svg" alt="" width="32" height="32"/><p>Loading the collection…</p></div></main>
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-identity">
          <a className="brand footer-brand" href="#/" aria-label="OpenStore home"><img className="brand-mark" src="/assets/logo.svg" alt="" width="32" height="32"/>OpenStore</a>
          <p>Thoughtful open-source alternatives for the software you use every day.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <div><span>Browse</span><a href="#/">Discover</a><a href="#/categories">Categories</a><a href="#/trending">Trending</a><a href="#/community">Community Finds</a></div>
          <div><span>Contribute</span><a href="#/submit">Submit an app</a><a href="#/wanted">Wanted alternatives</a><button id="about-button">About the collection</button><a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div>
        </nav>
      </div>
      <div className="footer-bottom"><p>Independently curated. Comparisons describe overlapping use cases.</p><p className="footer-credit">Built by <a href={twitterUrl} target="_blank" rel="noopener noreferrer">Krish</a></p></div>
    </footer>
    <dialog id="about-dialog" className="about-dialog"><button className="dialog-close icon-button" aria-label="Close about dialog">×</button><span className="eyebrow">About</span><h2>About the collection</h2><p>OpenStore is an independent collection of open-source software and a clearly marked source-available project. Each listing links to its official repository and project website.</p><p>Stars and forks are timestamped GitHub snapshots. Trending membership comes from GitHub’s weekly trending page; “recently popular” is an editorial selection, not a measured growth ranking. Alternative comparisons are editorial suggestions, not claims of feature parity.</p><p id="snapshot-info"/><a href="https://github.com/trending?since=weekly" target="_blank" rel="noopener noreferrer" className="button button-primary">View GitHub Trending ↗</a></dialog>
    <dialog id="image-dialog" className="image-dialog"><button className="dialog-close icon-button" aria-label="Close screenshot">×</button><img alt=""/><p/></dialog>
    <dialog id="filter-dialog" className="filter-dialog" aria-labelledby="filter-title"><button className="dialog-close icon-button" aria-label="Close filters">×</button><form id="filter-form"><h2 id="filter-title">Filters</h2><p className="filter-intro">Narrow the catalog by popularity, momentum, and reviews.</p><div id="filter-options"/><div className="filter-dialog-actions"><button type="button" id="clear-advanced-filters" className="text-link">Clear preferences</button><button type="submit" className="button button-primary">Apply filters</button></div></form></dialog>
    <div id="toast" role="status" className="toast"/>
  </>;
}
