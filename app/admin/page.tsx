import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { AdminView } from '@/components/community/admin';
import { AuthNotice, LoadError, UserStrip } from '@/components/community/shared';
import { categories } from '@/lib/catalog';
import { getViewer, loadAdminQueue, loadCatalogChoices, loadWanted } from '@/lib/community/server';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Editorial Review', robots: { index: false } };

function Header({ intro }: { intro?: string }) {
  return (
    <section className="form-page-head">
      <span className="eyebrow">Editorial review</span>
      <h1>Submission review.</h1>
      {intro && <p>{intro}</p>}
    </section>
  );
}

export default async function AdminPage() {
  const viewer = await getViewer();
  if (!viewer) {
    return (
      <>
        <Header intro="See community votes, review every submission, and decide which projects deserve further consideration." />
        <AuthNotice next="/admin" copy="Sign in with your editor account to review submissions." />
      </>
    );
  }
  if (!viewer.isAdmin) {
    return (
      <div className="empty-state">
        <Icon name="shield" />
        <h2>Admin access required.</h2>
        <p>This panel is available to configured OpenStore editors.</p>
        <Link className="button button-secondary" href="/community">Back to Community Finds</Link>
      </div>
    );
  }

  const queue = loadAdminQueue(viewer);
  if (queue.error !== null) return <><Header /><LoadError title="Submissions couldn’t load." message={queue.error} /></>;

  return (
    <>
      <Header intro="Votes and GitHub signals help with evaluation. Accepting a project keeps it in Community Finds; you add it to the curated catalog manually later." />
      <UserStrip user={viewer} />
      <AdminView
        queue={queue.data}
        wanted={loadWanted(viewer).data ?? []}
        categories={categories.map(category => category.name)}
        choices={loadCatalogChoices().data ?? []}
      />
    </>
  );
}
