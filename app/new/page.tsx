import type { Metadata } from 'next';
import { BrowsePage } from '@/components/browse/browse-page';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New', description: 'The newest open-source projects in the collection.' };

export default function Page() {
  return <BrowsePage mode="new" />;
}
