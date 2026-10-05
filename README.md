# OpenStore

A curated marketplace for discovering open-source alternatives, built with native JavaScript modules, CSS, and HTML. No runtime or package dependencies.

## Run

```sh
npm run dev
```

Open http://localhost:5173. Requires Node.js for build/tests and Python 3 for the local server. Set `PORT` to change the development port.

```sh
npm test
npm run build
```

The build copies deployable files into `dist/`. Serve `dist/` with any static hosting provider. Hash routes work without a server rewrite configuration.

## Features

- Editorial Discover page, category browser, weekly Trending, newest repositories
- Search across app names, descriptions, categories, and proprietary alternatives
- Combined category, platform, minimum stars, self-hosted, and trending filters
- Sort by curated order, GitHub stars, published user-review count or rating, weekly momentum, repository age, or name
- Open-only and verified-review filters, plus incremental browsing of 24 apps at a time
- Use-case guidance, deployment considerations, and sourced review evidence on app details
- Shareable URLs that preserve filters; browser back and forward navigation
- App detail pages with official imagery, screenshot lightbox, metadata, licenses, and related apps
- Command/Ctrl-K search, accessible controls, responsive mobile layouts, reduced-motion support
- Local bookmarks saved in this browser

## Data and research

60 real projects, including 48 Open-prefixed names and all ten requested seeds. This update adds 38 apps after a broad GitHub discovery sweep and official documentation checks. [The research audit](research/catalog-audit.md) records design references, selected use cases, review evidence, excluded candidates, and original icon provenance. Repository metadata is saved in `assets/github-snapshot.json`. Observed weekly rankings and star gains come from `assets/trending-snapshot.json`; the fetch timestamp is shown in the interface. No growth figures are invented. “Recently popular” is an editorial collection.

Alternatives are editorial comparisons of overlapping use cases, not feature parity. Open WebUI is explicitly marked source-available due to its current branding-restricted license. OpenCut's ongoing rewrite and current browser editor are described separately. Some open-source products have commercial hosting, enterprise features, or paid model requirements.

All 60 project icons are unmodified official assets, with exact sources and SHA-256 hashes in `assets/official-icons.json`. No custom app glyphs are rendered. Screenshots and other assets are documented in `assets/asset-sources.json`. Six verified review aggregates are bundled in `assets/reviews-snapshot.json`; missing reviews stay unrated and small samples are identified. Readme files are research material and are excluded from the build. The source repositories and official websites are linked in each app detail page.

Design research: [macOS App Store](https://apps.apple.com/us/mac/discover), [Setapp](https://support.setapp.com/hc/en-us/articles/213587729-Discover-Setapp-apps), [Raycast Store](https://www.raycast.com/store), [Linear](https://linear.app/features). Inspired by editorial app discovery, compact information hierarchy, restrained typography, and category-first browsing.

`python3 scripts/research.py --refresh-metadata --refresh-trending` refreshes repository statistics, original local assets, and observed weekly trending. It uses authenticated `gh api` when available and retains prior data when a source fails. Customer reviews must be manually reverified. Repository snapshots are intentionally bundled so browsing remains available without API rate limits. Catalog changes live in `catalog.js`, `open-catalog.js`, and `trending-catalog.js`.
