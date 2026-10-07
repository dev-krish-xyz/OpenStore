import { Icon } from '@/components/icon';
import { exact, formatDate } from '@/lib/format';
import { external } from '@/lib/routes';
import type { Review } from '@/lib/catalog/types';

export function Rating({ review }: { review?: Review }) {
  if (!review) return null;
  return (
    <a className="review-rating" href={review.url} {...external} title={`${review.provider} user rating, captured ${formatDate(review.capturedAt)}`}>
      <Icon name="star" />
      <strong>{review.rating.toFixed(1)}</strong>
      <span>{exact(review.count)} reviews · {review.provider}</span>
    </a>
  );
}
