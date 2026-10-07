import Link from 'next/link';
import { compact, exact, formatDate } from '@/lib/format';
import { appHref } from '@/lib/routes';
import type { ProjectSummary } from '@/lib/catalog/types';
import { AppIcon } from './app-icon';
import { GitHubLink } from './app-row';

export function Leaderboard({ projects, trendAsOf }: { projects: ProjectSummary[]; trendAsOf?: string }) {
  const max = Math.max(1, ...projects.map(p => p.weeklyStars || 0));
  return (
    <div className="leaderboard">
      <div className="leaderboard-head" aria-hidden="true"><span>#</span><span>Project</span><span>Category</span><span>This week</span><span>Stars</span><span /></div>
      <ol>
        {projects.map((project, index) => (
          <li className="leaderboard-row" key={project.id}>
            <span className="leaderboard-rank">{index + 1}</span>
            <Link className="leaderboard-app" href={appHref(project)}>
              <AppIcon project={project} />
              <span><strong>{project.name}</strong><small>{project.repo}</small></span>
            </Link>
            <span className="leaderboard-category">{project.category}</span>
            <span className="leaderboard-trend" title={`${exact(project.weeklyStars)} GitHub stars this week as of ${formatDate(trendAsOf)}`}>
              <span className="leaderboard-bar" aria-hidden="true"><span style={{ width: `${Math.max(4, Math.round(((project.weeklyStars || 0) / max) * 100))}%` }} /></span>
              <span className="leaderboard-value">+{compact(project.weeklyStars)}</span>
            </span>
            <span className="leaderboard-stars" title={`${exact(project.stars)} GitHub stars`}>{compact(project.stars)}</span>
            <GitHubLink project={project} />
          </li>
        ))}
      </ol>
    </div>
  );
}
