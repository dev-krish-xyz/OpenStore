import type { Metadata } from 'next';
import { AuthNotice, LoadError, UserStrip } from '@/components/community/shared';
import { WantedCard, WantedRequestForm } from '@/components/community/wanted';
import { SectionHeading } from '@/components/section-heading';
import { getViewer, loadCatalogChoices, loadWanted } from '@/lib/community/server';
import { plural } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Wanted Alternatives', description: 'Request open-source alternatives and vote on what the community needs next.' };

export default async function WantedPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const product = (await searchParams).product || '';
  const viewer = await getViewer();
  const wanted = loadWanted(viewer);
  const choices = loadCatalogChoices().data ?? [];
  const requests = wanted.data ?? [];
  const open = requests.filter(item => item.status === 'open');
  const resolved = requests.filter(item => item.status === 'resolved');

  return (
    <>
      <section className="community-hero wanted-hero">
        <div>
          <span className="eyebrow">Wanted alternatives</span>
          <h1>What should open source replace next?</h1>
          <p>Request an alternative, vote on existing needs, and connect requests with useful projects. Duplicate requests become votes so the strongest needs rise.</p>
        </div>
      </section>
      <UserStrip user={viewer} />
      {viewer
        ? <WantedRequestForm product={product} />
        : <AuthNotice next={`/wanted${product ? `?product=${encodeURIComponent(product)}` : ''}`} copy="Sign in to request or vote for an alternative." />}
      {wanted.error ? (
        <LoadError title="Wanted alternatives couldn’t load." message={wanted.error} />
      ) : open.length ? (
        <section className="section compact-section">
          <SectionHeading title="Most wanted, still open" subtitle={`${open.length} unresolved ${plural(open.length, 'request')}, ranked by community demand.`} />
          <div className="wanted-list">{open.map(item => <WantedCard key={item.id} item={item} viewer={viewer} choices={choices} />)}</div>
        </section>
      ) : (
        <div className="inline-state"><strong>No open requests yet.</strong><p>Start with a product you wish had an open alternative.</p></div>
      )}
      {resolved.length > 0 && (
        <section className="section compact-section">
          <SectionHeading title="Resolved by the community" subtitle="Requests with a suggested match." />
          <div className="wanted-list">{resolved.map(item => <WantedCard key={item.id} item={item} viewer={viewer} choices={choices} />)}</div>
        </section>
      )}
    </>
  );
}
