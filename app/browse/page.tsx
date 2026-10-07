import type { Metadata } from 'next';
import { BrowsePage } from '@/components/browse/browse-page';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Browse apps', description: 'Curated open-source alternatives to the software you already use.' };

export default function Page() {
  return <BrowsePage mode="browse" />;
}
