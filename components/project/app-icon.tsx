import { Icon } from '@/components/icon';
import type { ProjectSummary } from '@/lib/catalog/types';

export function AppIcon({ project, size = 53 }: { project: Pick<ProjectSummary, 'iconSrc' | 'icon'>; size?: number }) {
  return (
    <span className="app-icon image-icon" title="Project icon">
      {project.iconSrc ? <img src={project.iconSrc} alt="" loading="lazy" width={size} height={size} /> : <Icon name={project.icon || 'layers'} />}
    </span>
  );
}

export function SourceBadge({ project }: { project: Pick<ProjectSummary, 'sourceAvailable'> }) {
  return project.sourceAvailable ? <span className="source-badge">Source-available</span> : null;
}
