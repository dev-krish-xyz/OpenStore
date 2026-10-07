import Link from 'next/link';
import { Icon } from '@/components/icon';
import { CategoryCard } from '@/components/category-card';
import { AppIcon } from '@/components/project/app-icon';
import { AppRow } from '@/components/project/app-row';
import { Leaderboard } from '@/components/project/leaderboard';
import { ReviewCard } from '@/components/project/review-card';
import { SearchBox } from '@/components/search-box';
import { SectionHeading } from '@/components/section-heading';
import { categories, openFamilyCount, pick, projects, snapshotDates, trendingProjects } from '@/lib/catalog';
import { formatDate } from '@/lib/format';
import { appHref, categoryHref, searchHref } from '@/lib/routes';

const heroCategories = ['AI', 'Developer Tools', 'Design', 'Productivity', 'Video', 'Privacy'];
const popularSearches = ['Photoshop', 'Notion', 'CapCut', 'ChatGPT'];

const editorsPicks = [
  { id: 'opencode', style: 'code', art: 'code', label: 'Coding', title: 'Your next coding companion.', tagline: 'Meet OpenCode. Make something great.' },
  { id: 'opencut', style: 'cut', art: 'video', label: 'Video', title: 'Your story. Your editor.', tagline: 'Create without the subscription.' },
  { id: 'penpot', style: 'design', art: 'design', label: 'Design', title: 'Good design. Open by design.', tagline: 'A canvas for your next idea.' },
];

const workspace: [id: string, role: string][] = [
  ['appflowy', 'Notes & docs'], ['openproject', 'Projects & teams'], ['openboard', 'Ideas & planning'], ['opentofu', 'Infrastructure'],
];

export default function HomePage() {
  const rowDates = { starsAsOf: snapshotDates.repositories, trendAsOf: snapshotDates.trending };
  return (
    <>
      <section className="intro hero-intro discovery-hero" aria-labelledby="discovery-title">
        <div className="hero-heading">
          <div className="hero-label">
            <span className="eyebrow">The open-source app store</span>
            <span className="hero-label-divider" aria-hidden="true" />
            <span className="hero-count">{projects.length} reviewed projects</span>
          </div>
          <h1 id="discovery-title">Find the best open-source alternative.</h1>
          <p>Curated alternatives to the software you already use.</p>
          <div className="hero-search-area"><SearchBox /></div>
          <nav className="hero-categories" aria-label="Discover apps by category">
            <Link href="/browse">All apps</Link>
            {heroCategories.map(name => <Link key={name} href={categoryHref(name)}>{name}</Link>)}
            <Link href="/categories">More…</Link>
          </nav>
        </div>
        <div className="popular-searches">
          <span>Popular:</span>
          <div className="replacement-suggestions">
            {popularSearches.map(name => <Link key={name} href={searchHref(name)}>{name}</Link>)}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading title="Editor’s picks" subtitle="Three standouts to start with." href="/browse" linkLabel="All apps" />
        <div className="feature-grid">
          {editorsPicks.map((feature, index) => {
            const project = pick(editorsPicks.map(item => item.id))[index];
            return (
              <Link key={feature.id} className={`feature feature-${feature.style}`} href={appHref(project)}>
                <div className="feature-art">
                  <span className="eyebrow">{feature.label}</span>
                  <h3>{feature.title}</h3>
                  <p className="feature-tagline">{feature.tagline}</p>
                  <div className="promo-visual" aria-hidden="true"><img src={`/assets/promo-${feature.art}.svg`} alt="" width={400} height={240} /></div>
                </div>
                <div className="feature-foot">
                  <AppIcon project={project} />
                  <div><h4>{project.name}</h4><p>Alternative to {project.replaces[0]}</p></div>
                  <Icon name="arrow" className="feature-arrow" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section open-family-section">
        <SectionHeading title="The Open family" subtitle="Projects that carry “Open” in their name." href="/browse?openOnly=1" linkLabel={`All ${openFamilyCount}`} />
        <div className="apps-grid">
          {pick(['open-notebook', 'openpencil', 'openwhispr', 'opencloud', 'opensign', 'opendesign']).map(project => <AppRow key={project.id} project={project} {...rowDates} />)}
        </div>
      </section>

      <section className="section">
        <SectionHeading title="Trending this week" subtitle="Catalog projects on GitHub’s weekly Trending page." href="/trending" />
        <Leaderboard projects={trendingProjects(6)} trendAsOf={snapshotDates.trending} />
        <p className="trend-note"><Icon name="info" /> From GitHub’s weekly Trending page · Snapshot {formatDate(snapshotDates.trending)}</p>
      </section>

      <section className="section categories-section">
        <SectionHeading title="Categories" href="/categories" linkLabel="All categories" />
        <div className="category-grid">
          {categories.slice(0, 9).map(category => <CategoryCard key={category.name} category={category} />)}
        </div>
      </section>

      <section className="section">
        <SectionHeading title="Popular" subtitle="Most-starred projects in the collection." href="/browse?sort=stars" />
        <div className="recent-grid">
          {pick(['appflowy', 'actual', 'openobserve']).map(project => (
            <article className="recent-card" key={project.id}>
              <Link className="recent-cover" href={appHref(project)}>
                <img src={`/assets/${project.screens[0][0]}`} alt={project.screens[0][1]} loading="lazy" width={500} height={280} />
              </Link>
              <AppRow project={project} {...rowDates} />
            </article>
          ))}
        </div>
      </section>

      <section className="section reader-section">
        <SectionHeading title="Well reviewed" subtitle="Established apps with published user ratings." href="/browse?reviewed=1&sort=reviews" />
        <div className="review-grid">
          {pick(['openproject', 'openshot', 'opencart']).map(project => <ReviewCard key={project.id} project={project} />)}
        </div>
        <p className="review-collection-note">Published ratings and review counts from Capterra · {formatDate(snapshotDates.reviews)} · Ratings cover each listed product, including its hosted or paid editions.</p>
      </section>

      <section className="community-entry">
        <div>
          <span className="eyebrow">Community</span>
          <h2>Know a project that belongs here?</h2>
          <p>Recommend promising finds while OpenStore’s editorial review keeps the primary catalog carefully curated.</p>
        </div>
        <div className="community-entry-actions">
          <Link className="button button-primary" href="/submit">Submit an app</Link>
          <Link className="button button-secondary" href="/community">Community Finds</Link>
          <Link className="button button-secondary" href="/wanted">Wanted</Link>
        </div>
      </section>

      <section className="collection-banner">
        <div className="collection-copy">
          <span className="eyebrow">Collection</span>
          <h2>An open workspace</h2>
          <p>Notes, projects, whiteboards, and infrastructure—an independent toolkit for work that stays in your hands.</p>
          <Link className="collection-action" href={categoryHref('Productivity')}>Explore productivity <Icon name="arrow" /></Link>
        </div>
        <div className="collection-panel">
          <div className="collection-apps">
            {workspace.map(([id, role]) => {
              const [project] = pick([id]);
              return (
                <Link key={id} className="collection-app" href={appHref(project)}>
                  <AppIcon project={project} />
                  <span className="collection-app-copy"><strong>{project.name}</strong><small>{role}</small></span>
                  <Icon name="arrow" className="collection-app-arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
