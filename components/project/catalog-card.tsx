import Link from 'next/link';
import { Icon } from '@/components/icon';
import { PlatformIcons } from '@/components/platform-icon';
import { compact, exact, formatDate } from '@/lib/format';
import { appHref } from '@/lib/routes';
import type { ProjectSummary } from '@/lib/catalog/types';
import { AppIcon, SourceBadge } from './app-icon';
import { GitHubLink } from './app-row';

export function CatalogCard({ project }: { project: ProjectSummary }) {
  return (
    <article className="catalog-card">
      <div className="catalog-card-top">
        <AppIcon project={project} />
        <div className="catalog-identity">
          {/* The title link stretches over the whole card; the GitHub link sits above it. */}
          <h3><Link className="catalog-card-link" href={appHref(project)}>{project.name}</Link></h3>
          <p>
            {project.category}
            {project.selfHosted && <><span aria-hidden="true"> · </span>Self-hosted</>}
            <SourceBadge project={project} />
          </p>
        </div>
        <GitHubLink project={project} />
      </div>

      <p className="catalog-description" title={project.description}>{project.description}</p>
      <p className="card-replaces" title={project.replaces.join(', ')}>
        <span>Replaces</span>{project.replaces[0]}
      </p>

      <div className="card-meta">
        <span title={`${exact(project.stars)} GitHub stars`}><Icon name="github" />{compact(project.stars)}</span>
        {project.weeklyStars ? <span className="trend-badge" title={`${exact(project.weeklyStars)} stars this week`}>↗ {compact(project.weeklyStars)}/wk</span> : null}
        {project.review && (
          <span className="card-rating" title={`${project.review.provider} rating from ${exact(project.review.count)} reviews, captured ${formatDate(project.review.capturedAt)}`}>
            <Icon name="star" />{project.review.rating.toFixed(1)}
          </span>
        )}
        <PlatformIcons className="card-platforms" platforms={project.platforms} />
      </div>
    </article>
  );
}
