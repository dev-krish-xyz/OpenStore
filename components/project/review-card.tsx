import Link from 'next/link';
import { Icon } from '@/components/icon';
import { compact } from '@/lib/format';
import { appHref, external } from '@/lib/routes';
import type { Project } from '@/lib/catalog/types';
import { AppIcon } from './app-icon';
import { AppRow } from './app-row';
import { Rating } from './rating';

export function ReviewCard({ project }: { project: Project }) {
  const review = project.review;
  if (!review) return <AppRow project={project} />;
  return (
    <article className="review-card">
      <Link className="review-app" href={appHref(project)}>
        <AppIcon project={project} />
        <div><h3>{project.name}</h3><p>{project.bestFor || review.useCase}</p></div>
        <Icon name="chevron" />
      </Link>
      <Rating review={review} />
      <p className="review-summary">{review.summary}</p>
      {review.feedbackUrl && (
        <a className="text-link feedback-source" href={review.feedbackUrl} {...external}>Feedback notes · {review.feedbackProvider} <Icon name="external" /></a>
      )}
      <div className="review-card-foot">
        <span><Icon name="star" />{compact(project.stars)} GitHub stars</span>
        <Link href={appHref(project)} className="text-link">Explore app <Icon name="chevron" /></Link>
      </div>
    </article>
  );
}
