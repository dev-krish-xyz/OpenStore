import Link from 'next/link';
import { Icon } from '@/components/icon';
import { compact, exact } from '@/lib/format';
import { appHref } from '@/lib/routes';
import type { ProjectSummary } from '@/lib/catalog/types';
import { AppIcon, SourceBadge } from './app-icon';
import { GitHubLink } from './app-row';
import { Rating } from './rating';

export function CatalogCard({ project }: { project: ProjectSummary }) {
  return (
    <article className="catalog-card">
      <div className="catalog-card-top">
        <Link href={appHref(project)} aria-label={`Explore ${project.name}`}><AppIcon project={project} /></Link>
        <div className="catalog-identity">
          <h3><Link href={appHref(project)}>{project.name}</Link></h3>
          <p>{project.category}</p>
        </div>
        <GitHubLink project={project} />
      </div>
      <p className="catalog-description" title={project.description}>{project.description}</p>
      <div className="replacement-chip"><span>Alternative to</span><b>{project.replaces[0]}</b></div>
      <div className="card-fit"><span>Best for</span><p title={project.bestFor}>{project.bestFor}</p></div>
      <div className="card-evidence">
        <span className="github-stat" title={`${exact(project.stars)} GitHub stars`}>
          <Icon name="github" /><strong>{compact(project.stars)}</strong><span>GitHub stars</span>
          {project.weeklyStars ? <span className="trend-badge">↗ {compact(project.weeklyStars)} / week</span> : null}
        </span>
        <Rating review={project.review} />
      </div>
      <div className="card-platforms"><Icon name="globe" /><span>{project.platforms.join(' · ')}</span></div>
      <div className="catalog-card-bottom">
        <div className="card-badges">
          {project.selfHosted && <span className="selfhost-tag">Self-hosted</span>}
          <SourceBadge project={project} />
        </div>
        <Link href={appHref(project)} className="card-action">View app <Icon name="arrow" /></Link>
      </div>
    </article>
  );
}
