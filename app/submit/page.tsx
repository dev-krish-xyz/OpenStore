import type { Metadata } from 'next';
import { SubmitForm } from '@/components/community/submit-form';
import { UserStrip } from '@/components/community/shared';
import { categories } from '@/lib/catalog';
import { platforms } from '@/lib/catalog/filters';
import { getViewer } from '@/lib/community/server';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Submit an App', description: 'Suggest an open-source app for the OpenStore collection.' };

const steps = ['Listed in Community Finds', 'Community votes', 'Editorial review'];

export default async function SubmitPage({ searchParams }: { searchParams: Promise<{ alternative?: string; repo?: string }> }) {
  const { alternative = '', repo = '' } = await searchParams;
  const viewer = await getViewer();
  return (
    <div className="submit-page">
      <header className="submit-head">
        <span className="eyebrow">Contribute</span>
        <h1>Submit a project</h1>
        <p>Suggest an open-source app for OpenStore. Paste its GitHub repository and we’ll fill in what we can. No account needed.</p>
        <ol className="submit-flow" aria-label="What happens after you submit">
          {steps.map(step => <li key={step}>{step}</li>)}
        </ol>
      </header>
      <UserStrip user={viewer} />
      <SubmitForm categories={categories.map(category => category.name)} platforms={platforms} alternative={alternative} repo={repo} />
    </div>
  );
}
