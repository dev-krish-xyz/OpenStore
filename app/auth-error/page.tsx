import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';

export const metadata: Metadata = { title: 'Sign-in didn’t finish', robots: { index: false } };

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;
  return (
    <div className="empty-state">
      <Icon name="info" />
      <h2>Sign-in didn’t finish.</h2>
      <p>{message || 'Try signing in again.'}</p>
      <Link className="button button-primary" href="/community">Back to Community Finds</Link>
    </div>
  );
}
