import type { Metadata } from 'next';
import Link from 'next/link';
import { SubmitForm } from '@/components/community/submit-form';
import { UserStrip } from '@/components/community/shared';
import { categories } from '@/lib/catalog';
import { platforms } from '@/lib/catalog/filters';
import { getViewer } from '@/lib/community/server';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Submit an App', description: 'Suggest an open-source app for the OpenStore collection.' };

const steps: [title: string, copy: string][] = [
  ['Listed in Community Finds', 'Your project appears there as pending as soon as you submit.'],
  ['Community signal', 'Signed-in visitors can vote for it and leave notes for editors.'],
  ['Editorial review', 'Editors accept or decline it. Accepted projects join the curated catalog in a separate, manual update.'],
];

export default async function SubmitPage({ searchParams }: { searchParams: Promise<{ alternative?: string; repo?: string }> }) {
  const { alternative = '', repo = '' } = await searchParams;
  const viewer = await getViewer();
  return (
    <div className="submit-page">
      <header className="submit-head">
        <span className="eyebrow">Contribute</span>
        <h1>Submit a project</h1>
        <p>Suggest an open-source app for OpenStore. Paste its GitHub repository and we’ll fill in what we can. No account needed.</p>
      </header>
      <UserStrip user={viewer} />
      <div className="submit-layout">
        <SubmitForm categories={categories.map(category => category.name)} platforms={platforms} alternative={alternative} repo={repo} />
        <aside className="submit-aside" aria-label="How review works">
          <h2>What happens next</h2>
          <ol className="submit-steps">{steps.map(([title, copy]) => <li key={title}><strong>{title}</strong><p>{copy}</p></li>)}</ol>
          <div className="submit-aside-note">
            <h3>Good to know</h3>
            <ul>
              <li>Projects already in the catalog, or submitted before, can’t be added twice.</li>
              <li>Looking for an alternative rather than suggesting one? <Link href="/wanted">Request it</Link>.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
