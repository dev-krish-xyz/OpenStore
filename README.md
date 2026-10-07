# OpenStore

OpenStore is a curated directory for discovering well-made open-source alternatives to proprietary software. Live at [openstore.site](https://www.openstore.site).

![OpenStore Discover page](docs/openstore-preview.png)

Every listing is reviewed by hand and shows what a project replaces, where it runs, how active it is on GitHub, its license, official links, screenshots, and related projects.

## Highlights

- Browse 64 curated projects across 14 categories, from AI and developer tools to design, video, privacy, finance, home and network, and games.
- Search by app name, category, description, or the proprietary tool a project replaces, or jump anywhere with the ⌘K command menu.
- Filter by category, platform, GitHub stars, weekly trending, self-hosting, and user reviews. Every filter lives in the URL, so results are shareable.
- Follow GitHub momentum on the Trending page and see recently created projects on New.
- Suggest a project, vote on community finds, and request alternatives that don’t exist yet; editors review everything before it joins the catalog.
- Use it comfortably on any device, in light or dark mode.

## Built with

Next.js App Router, React 19, and TypeScript, styled with Tailwind CSS v4 and shadcn/Radix primitives. App pages are statically generated; community features run on SQLite with GitHub OAuth.

## Run locally

OpenStore requires a current Node.js LTS release.

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm test` | Validate catalog data, metadata, assets, and filtering behavior. |
| `npm run build` | Create and validate the production build. |
| `npm start` | Serve a completed production build. |
| `npm run typecheck` | Type-check the application with TypeScript. |

## Community discovery setup

Guest app submissions use a public GitHub repository URL and do not require sign-in. Voting, private feedback for editors, wanted alternatives, and moderation use GitHub OAuth and SQLite. To enable those account features, copy `.env.example` to `.env.local`, create a GitHub OAuth app, and configure its callback as `http://localhost:3000/api/auth/github/callback` for local development. Set `ADMIN_GITHUB_LOGINS` to the comma-separated GitHub logins that may review submissions.

The default database is `.data/openstore.sqlite`. Set `OPENSTORE_DB_PATH` to a file on persistent storage in production; ephemeral serverless filesystems will not retain community data. The schema is initialized from [`db/schema.sql`](db/schema.sql). A local admin sign-in is shown only during development so the full moderation flow can be used without an OAuth app.

The community pipeline keeps editorial ownership explicit:

1. Anyone submits a public GitHub repository. OpenStore fetches its public metadata and prevents duplicate catalog entries or submissions.
2. The project appears in recent Community Finds as pending, where signed-in users can vote once, see whether they voted, and leave one editable feedback note for editors.
3. An editor sees every submission, its vote count and voters, feedback notes, and repository details in the admin panel, then edits, accepts for later consideration, or rejects it.
4. Acceptance does not publish a catalog listing. An editor adds selected apps to the hand-maintained curated source catalogs separately.
5. Wanted requests consolidate duplicate product names into votes and accept either an existing OpenStore app or a public GitHub repository as a suggested solution.

## Project structure

```text
app/                  Next.js App Router pages (server-rendered, one route per page)
app/api/              Community, auth, GitHub metadata, and moderation endpoints
components/           React components; components/ui holds shadcn/Radix primitives
db/                   SQLite schema for users, submissions, votes, and requests
lib/catalog/          Typed catalog loading, enrichment, filtering, and sorting
lib/community/        Persistence, GitHub OAuth, validation, and API helpers
styles.css            Design tokens and component styles, layered beneath Tailwind utilities
catalog.js            Core curated projects
open-catalog.js       Open-prefixed projects
trending-catalog.js   Projects observed in weekly GitHub trending data
public/assets/        App icons, screenshots, and the snapshot data the site serves
assets/               Repository snapshots, official icons, and asset sources used by tests and research
research/             Catalog audit and research notes
tests/                Catalog integrity tests
```

## Catalog data

OpenStore stores repository metadata, trending observations, verified review snapshots, and icon provenance in the repository so the directory can browse quickly without calling third-party APIs at runtime.

- GitHub metadata: [`assets/github-snapshot.json`](assets/github-snapshot.json)
- Trending observations: [`assets/trending-snapshot.json`](assets/trending-snapshot.json)
- Official icon provenance: [`assets/official-icons.json`](assets/official-icons.json)
- Image and screenshot sources: [`assets/asset-sources.json`](assets/asset-sources.json)
- Editorial and research audit: [`research/catalog-audit.md`](research/catalog-audit.md)

Star counts and trending positions are point-in-time snapshots. Alternatives describe overlapping use cases, not guaranteed feature parity.

## Contributing

Issues and pull requests are welcome. When adding or updating a project, keep the catalog useful and verifiable:

1. Use the project’s official repository and website.
2. Add a concise use case, proprietary alternatives, supported platforms, and an honest consideration.
3. Use the official project icon and record its source plus checksum in the asset manifests.
4. Run `npm test`, `npm run typecheck`, and `npm run build` before opening a pull request.

The data refresh script, `python3 scripts/research.py --refresh-metadata --refresh-trending`, updates repository metadata, official assets, and observed weekly trending data. Customer-review evidence is intentionally rechecked manually.

## License

OpenStore’s source code is available under the [MIT License](LICENSE). App names, trademarks, icons, screenshots, and other third-party project material remain subject to their respective owners’ terms.
