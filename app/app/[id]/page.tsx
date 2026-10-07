import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/icon';
import { SaveButton } from '@/components/detail/save-button';
import { ScreenshotGallery } from '@/components/detail/screenshot-gallery';
import { AppIcon } from '@/components/project/app-icon';
import { AppRow } from '@/components/project/app-row';
import { Rating } from '@/components/project/rating';
import { SectionHeading } from '@/components/section-heading';
import { getProject, projects, snapshotDates } from '@/lib/catalog';
import type { Project } from '@/lib/catalog/types';
import { compact, exact, formatDate } from '@/lib/format';
import { categoryHref, external, githubHref } from '@/lib/routes';

type Params = Promise<{ id: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(project => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const project = getProject((await params).id);
  if (!project) return {};
  const description = `${project.description} An open-source alternative to ${project.replaces.join(', ')}.`;
  return {
    title: project.name,
    description,
    openGraph: { title: `${project.name} — OpenStore`, description, type: 'website' },
  };
}

function lowerFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function BestFor({ project }: { project: Project }) {
  const fit = project.bestFor || project.description.replace(/\.$/, '');
  const review = project.review;
  return (
    <section className="selection-panel">
      <div className="selection-title">
        <span className="eyebrow">Best for</span>
        <h2>A good fit for {lowerFirst(fit)}.</h2>
      </div>
      {project.consideration && <p className="fit-consideration">{project.consideration}</p>}
      <div className="feedback-panel">
        <div>
          <h3>User feedback</h3>
          {review ? <Rating review={review} /> : <span className="unrated">No aggregate rating verified</span>}
        </div>
        <p>{review ? review.summary : 'Explore discussions, issues, and documentation to see how this project fits your workflow.'}</p>
        <div className="feedback-links">
          {review ? (
            <>
              <a className="text-link" href={review.url} {...external}>Read reviews <Icon name="external" /></a>
              <span>{review.smallSample ? 'Small sample · ' : ''}Captured {formatDate(review.capturedAt)}</span>
            </>
          ) : (
            <a className="text-link" href={`${githubHref(project)}/discussions`} {...external}>Community discussions <Icon name="external" /></a>
          )}
          {review?.feedbackUrl && <a className="text-link" href={review.feedbackUrl} {...external}>Feedback notes · {review.feedbackProvider} <Icon name="external" /></a>}
          <a className="text-link" href={`${githubHref(project)}/issues`} {...external}>Project issues <Icon name="external" /></a>
        </div>
        <p className="review-context">
          {review ? 'Product-level ratings can include hosted and paid editions. ' : ''}GitHub stars measure repository interest, not customer satisfaction.
        </p>
      </div>
    </section>
  );
}

export default async function AppDetailPage({ params }: { params: Params }) {
  const project = getProject((await params).id);
  if (!project) notFound();
  const related = projects.filter(other => other.id !== project.id && other.category === project.category).slice(0, 3);
  const github = githubHref(project);

  return (
    <>
      <div className="breadcrumbs">
        <Link href="/">Discover</Link><Icon name="chevron" />
        <Link href={categoryHref(project.category)}>{project.category}</Link><Icon name="chevron" />
        <span>{project.name}</span>
      </div>

      <section className="detail-hero">
        <AppIcon project={project} />
        <div>
          <span className="eyebrow">{project.category}</span>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <div className="detail-tags">
            <span>{project.sourceAvailable ? 'Source-available' : 'Open source'}</span><span>·</span>
            <span>{project.selfHosted ? 'Self-hosting available' : 'Runs on your device'}</span>
          </div>
        </div>
        <div className="detail-actions">
          <a className="button button-primary" href={project.website} {...external}>Get {project.name} <Icon name="external" /></a>
          <a className="button button-secondary" href={github} {...external}><Icon name="github" />GitHub</a>
          <SaveButton id={project.id} name={project.name} />
        </div>
      </section>

      <section className="detail-stats" aria-label="Project information">
        <div className="detail-stat"><span>GitHub stars</span><strong><Icon name="star" />{compact(project.stars)}</strong><small>{exact(project.stars)} stars</small></div>
        <div className="detail-stat"><span>Community forks</span><strong><Icon name="fork" />{compact(project.forks)}</strong><small>Open collaboration</small></div>
        <div className="detail-stat"><span>License</span><strong className="detail-stat-text">{project.license}</strong><small>{project.sourceAvailable ? 'Branding conditions apply' : 'Read the full license'}</small></div>
        <div className="detail-stat">
          <span>Platforms</span>
          <strong className="detail-stat-text">{project.platforms.slice(0, 3).join(' · ')}</strong>
          <small>{project.platforms.length > 3 ? `Also ${project.platforms.slice(3).join(', ')}` : 'Find your platform'}</small>
        </div>
        <div className="detail-stat">
          <span>{project.weeklyStars ? 'Weekly stars' : 'Last activity'}</span>
          <strong>{project.weeklyStars ? `↗ ${compact(project.weeklyStars)}` : formatDate(project.updatedAt).replace(', 2026', '')}</strong>
          <small>{project.weeklyStars ? 'GitHub trending snapshot' : 'Repository push date'}</small>
        </div>
      </section>

      {project.screens.length ? (
        <section className="screenshot-section">
          <div className="screenshot-heading"><h2>Screenshots</h2><span>Official project imagery</span></div>
          <ScreenshotGallery screens={project.screens} />
        </section>
      ) : (
        <section className="product-resource">
          <div><h3>See {project.name} in action.</h3><p>Explore the project’s official website and documentation.</p></div>
          <a className="button button-secondary" href={project.website} {...external}>Visit project <Icon name="external" /></a>
        </section>
      )}

      <BestFor project={project} />

      <div className="detail-body">
        <section>
          <h2>About {project.name}</h2>
          <p>{project.about}</p>
          <ul>{project.features.map(feature => <li key={feature}><Icon name="check" />{feature}</li>)}</ul>
          {project.note && <div className="license-note">{project.note} <a href={project.licenseUrl || github} {...external}>Read more ↗</a></div>}
          <h2 className="detail-subheading">Alternative to</h2>
          <div className="alternative-chips">{project.replaces.map(name => <span key={name}>{name}</span>)}</div>
          <p className="detail-snapshot">These tools share use cases. Features, costs, and deployment needs differ.</p>
        </section>
        <aside className="detail-info">
          <h3>Details</h3>
          <dl>
            <div><dt>Category</dt><dd><Link href={categoryHref(project.category)}>{project.category}</Link></dd></div>
            <div><dt>Available on</dt><dd>{project.platforms.join(', ')}</dd></div>
            <div><dt>License</dt><dd><a href={project.licenseUrl || `${github}#license`} {...external}>{project.license} ↗</a></dd></div>
            <div><dt>Self-hosted</dt><dd>{project.selfHosted ? 'Available' : 'Not a hosted server app'}</dd></div>
            <div><dt>Repository</dt><dd><a href={github} {...external}>{project.repo} ↗</a></dd></div>
            <div><dt>Created</dt><dd>{formatDate(project.createdAt)}</dd></div>
          </dl>
          <a className="text-link" href={project.docs} {...external}>Read the documentation <Icon name="external" /></a>
          <a className="text-link" href={`${github}/issues`} {...external}>Community & issues <Icon name="external" /></a>
          <p className="detail-snapshot">GitHub stats captured {formatDate(snapshotDates.repositories)}.</p>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section categories-section">
          <SectionHeading title={`More in ${project.category}`} href={categoryHref(project.category)} linkLabel="See category" />
          <div className="apps-grid">
            {related.map(other => <AppRow key={other.id} project={other} starsAsOf={snapshotDates.repositories} trendAsOf={snapshotDates.trending} />)}
          </div>
        </section>
      )}

      <Link className="back-button" href="/"><Icon name="back" />Back to Discover</Link>
    </>
  );
}
