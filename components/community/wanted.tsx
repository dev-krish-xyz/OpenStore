'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icon';
import { ApiError, post, signIn } from '@/lib/community/client';
import { solutionLabel } from '@/lib/community/labels';
import type { CatalogChoice, User, WantedRequest } from '@/lib/community/types';
import { plural } from '@/lib/format';
import { Field, FormFeedback, useMutation } from './shared';

export function WantedRequestForm({ product }: { product: string }) {
  const router = useRouter();
  const { run, error, pending } = useMutation();
  return (
    <form
      className="wanted-request-form"
      onSubmit={async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const ok = await run(() => post('/api/wanted', { productName: data.get('productName'), description: data.get('description') }), { success: 'Alternative request added.' });
        if (!ok) return;
        form.reset();
        if (product) router.replace('/wanted', { scroll: false });
      }}
    >
      <div>
        <Field label="Product to replace"><input required name="productName" maxLength={100} defaultValue={product} placeholder="Lightroom" /></Field>
        <Field label="What matters most?"><input name="description" maxLength={400} placeholder="Photo organization and non-destructive editing" /></Field>
      </div>
      <FormFeedback message={error} />
      <button className="button button-primary" type="submit" disabled={pending}>
        {pending ? 'Saving…' : <>Request an alternative <Icon name="arrow" /></>}
      </button>
    </form>
  );
}

export function WantedCard({ item, viewer, choices }: { item: WantedRequest; viewer: User | null; choices: CatalogChoice[] }) {
  const vote = useMutation();
  const suggest = useMutation();

  return (
    <article className="wanted-card">
      <div className="wanted-rank">
        <button
          disabled={vote.pending}
          aria-pressed={item.votedByViewer}
          aria-label={`${item.votedByViewer ? 'Remove vote from' : 'Vote for'} ${item.productName}`}
          onClick={() => (viewer ? vote.run(() => post(`/api/wanted/${item.id}/vote`), { toastErrors: true }) : signIn('/wanted'))}
        >
          <Icon name="chevron" /><strong>{item.voteCount}</strong><span>wanted</span>
        </button>
      </div>
      <div className="wanted-copy">
        <div>
          {item.status === 'resolved'
            ? <span className="moderation-badge status-approved">Resolved</span>
            : <span className="moderation-badge status-pending">Open request</span>}
          <span className="wanted-author">Requested by @{item.submitter.login}</span>
        </div>
        <h2>Alternative to {item.productName}</h2>
        {item.description && <p>{item.description}</p>}
        {item.solutions.length > 0 && (
          <div className="solution-list">
            <strong>{item.solutions.length} suggested {plural(item.solutions.length, 'solution')}</strong>
            {item.solutions.map(solution => <span key={solution.id}><Icon name="check" />{solutionLabel(solution, choices)}</span>)}
          </div>
        )}
        {item.status === 'open' && (
          <details className="solution-form-wrap">
            <summary>Suggest a solution</summary>
            <form
              className="solution-form"
              onSubmit={async event => {
                event.preventDefault();
                const form = event.currentTarget;
                const data = new FormData(form);
                const catalogId = data.get('catalogId'), githubUrl = data.get('githubUrl');
                const ok = await suggest.run(async () => {
                  if (!catalogId && !githubUrl) throw new ApiError('Choose an OpenStore app or enter a GitHub repository.');
                  return post(`/api/wanted/${item.id}/solutions`, { catalogId, githubUrl });
                }, { success: 'Solution suggested.' });
                if (ok) form.reset();
              }}
            >
              <label>
                <span>Existing OpenStore app</span>
                <select name="catalogId" defaultValue="">
                  <option value="">Choose an app</option>
                  {choices.map(app => <option key={app.id} value={app.id}>{app.name}</option>)}
                </select>
              </label>
              <span className="form-or">or</span>
              <label><span>GitHub repository</span><input type="url" name="githubUrl" placeholder="https://github.com/owner/project" /></label>
              <FormFeedback message={suggest.error} />
              <button className="button button-secondary" type="submit" disabled={suggest.pending}>{suggest.pending ? 'Saving…' : 'Suggest solution'}</button>
            </form>
          </details>
        )}
      </div>
    </article>
  );
}
