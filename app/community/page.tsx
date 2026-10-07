import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { CommunityCard } from '@/components/community/community-card';
import { AuthNotice, LoadError, UserStrip } from '@/components/community/shared';
import { SectionHeading } from '@/components/section-heading';
import { getViewer, loadCommunity } from '@/lib/community/server';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Community Finds', description: 'Promising open-source projects submitted and voted on by the OpenStore community.' };

export default async function CommunityPage() {
  const viewer = await getViewer();
  const community = loadCommunity(viewer);
  const submissions = community.data ?? [];
  const pending = submissions.filter(item => item.status === 'pending');
  const approved = submissions.filter(item => item.status === 'approved');

  return (
    <>
      <section className="community-hero">
        <div>
          <span className="eyebrow">Community Finds</span>
          <h1>Promising projects, discovered together.</h1>
          <p>Recent submissions and community votes help you spot useful projects. OpenStore’s curated catalog changes only after a separate manual review.</p>
        </div>
        <div className="community-hero-actions">
          <Link className="button button-primary" href="/submit">Submit a project <Icon name="arrow" /></Link>
          <Link className="button button-secondary" href="/wanted">Wanted alternatives</Link>
        </div>
      </section>
      <UserStrip user={viewer} />
      {!viewer && <AuthNotice next="/community" copy="Sign in to vote or share feedback." />}
      {community.error ? (
        <LoadError title="Community Finds couldn’t load." message={community.error} />
      ) : pending.length ? (
        <section className="section compact-section">
          <SectionHeading title="Recent submissions" subtitle={`${pending.length} awaiting review · newest first`} />
          <div className="community-grid">{pending.map(item => <CommunityCard key={item.id} item={item} viewer={viewer} />)}</div>
        </section>
      ) : (
        <div className="inline-state">
          <Icon name="inbox" />
          <strong>No pending community finds.</strong>
          <p>Be the first to share a promising open-source project.</p>
          <Link className="button button-primary" href="/submit">Submit an app</Link>
        </div>
      )}
      {approved.length > 0 && (
        <section className="section compact-section">
          <SectionHeading title="Accepted for consideration" subtitle="Reviewed projects that may be added to the curated catalog later." />
          <div className="community-grid">{approved.map(item => <CommunityCard key={item.id} item={item} viewer={viewer} />)}</div>
        </section>
      )}
    </>
  );
}
