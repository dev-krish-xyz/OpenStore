import Link from 'next/link';
import { Icon } from '@/components/icon';

export default function NotFound() {
  return (
    <div className="empty-state">
      <Icon name="layers" />
      <h1>That page isn’t in our collection.</h1>
      <p>There are plenty of other possibilities to explore.</p>
      <Link className="button button-primary" href="/">Back to Discover</Link>
    </div>
  );
}
