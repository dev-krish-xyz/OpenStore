import Link from 'next/link';
import { Icon } from '@/components/icon';
import { compact, exact, formatDate } from '@/lib/format';
import { appHref, categoryHref, external, githubHref } from '@/lib/routes';
import type { ProjectSummary } from '@/lib/catalog/types';
import { AppIcon, SourceBadge } from './app-icon';

export function GitHubLink({ project }: { project: ProjectSummary }) {
  return (
    <a className="app-github" href={githubHref(project)} {...external} aria-label={`${project.name} on GitHub`}>
      <Icon name="github" />
    </a>
  );
}

export function AppRow({ project, starsAsOf, trendAsOf }: { project: ProjectSummary; starsAsOf?: string; trendAsOf?: string }) {
  return (
    <article className="app-row">
      <Link href={appHref(project)} aria-label={`Explore ${project.name}`}><AppIcon project={project} /></Link>
      <div className="app-copy">
        <h3><Link href={appHref(project)}>{project.name}</Link><SourceBadge project={project} /></h3>
        <p>{project.description}</p>
        <div className="replace-label">Alternative to <b>{project.replaces[0]}</b></div>
        <div className="app-meta">
          <span className="stars" title={`${exact(project.stars)} GitHub stars as of ${formatDate(starsAsOf)}`}><Icon name="star" />{compact(project.stars)}</span>
          <span className="divider">·</span>
          <Link href={categoryHref(project.category)}>{project.category}</Link>
          <span className="divider">·</span>
          <span className="platform">{project.platforms.includes('Web') ? 'Web' : project.platforms[0]}</span>
          {project.weeklyStars ? <span className="trend-badge" title={`GitHub weekly stars as of ${formatDate(trendAsOf)}`}>↗ {compact(project.weeklyStars)} this week</span> : null}
        </div>
      </div>
      <GitHubLink project={project} />
    </article>
  );
}
