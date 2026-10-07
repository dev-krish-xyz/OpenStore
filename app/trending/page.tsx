import type { Metadata } from 'next';
import { BrowsePage } from '@/components/browse/browse-page';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Trending', description: 'Open-source projects from the collection on GitHub’s weekly Trending page.' };

export default function Page() {
  return <BrowsePage mode="trending" />;
}
