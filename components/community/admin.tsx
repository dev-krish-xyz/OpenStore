'use client';

import { useState } from 'react';
import { Icon } from '@/components/icon';
import { SectionHeading } from '@/components/section-heading';
import { patch } from '@/lib/community/client';
import { solutionLabel } from '@/lib/community/labels';
import type { AdminSubmission, CatalogChoice, SubmissionStatus, WantedRequest } from '@/lib/community/types';
import { compact, formatDate, plural } from '@/lib/format';
import { external } from '@/lib/routes';
import { Field, FormFeedback, StatusBadge, useMutation } from './shared';

type Filter = 'all' | SubmissionStatus;

const filters: [Filter, string][] = [['all', 'All submissions'], ['pending', 'Pending'], ['approved', 'Accepted'], ['rejected', 'Rejected']];
const overview: [Filter, string][] = [['pending', 'Awaiting review'], ['approved', 'Accepted for later'], ['rejected', 'Rejected'], ['all', 'Total submissions']];

interface AdminViewProps {
  queue: AdminSubmission[];
  wanted: WantedRequest[];
  categories: string[];
  choices: CatalogChoice[];
}

export function AdminView({ queue, wanted, categories, choices }: AdminViewProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const count = (status: Filter) => (status === 'all' ? queue.length : queue.filter(item => item.status === status).length);
  const selected = filter === 'all' ? queue : queue.filter(item => item.status === filter);
  const resolvable = wanted.filter(item => item.status === 'open' && item.solutions.length);

  return (
    <>
      <div className="admin-overview">
        {overview.map(([status, label]) => <div key={status}><strong>{count(status)}</strong><span>{label}</span></div>)}
      </div>
      <div className="admin-filter-row" aria-label="Filter submissions">
        {filters.map(([status, label]) => <button key={status} onClick={() => setFilter(status)} aria-pressed={filter === status}>{label}</button>)}
      </div>
      <div className="admin-list-heading">
        <h2>{filters.find(([status]) => status === filter)?.[1]}</h2>
        <span>{selected.length} shown · recent submissions first</span>
      </div>
      <div className="moderation-list">
        {selected.length ? selected.map(item => <ModerationCard key={item.id} item={item} categories={categories} />) : (
          <div className="inline-state"><strong>No submissions in this view.</strong><p>New projects will appear here after they are submitted.</p></div>
        )}
      </div>
      {resolvable.length > 0 && (
        <section className="section compact-section">
          <SectionHeading title="Wanted requests with solutions" subtitle="Choose a community suggestion to resolve each request." />
          <div className="moderation-list">{resolvable.map(item => <ResolveWantedCard key={item.id} item={item} choices={choices} />)}</div>
        </section>
      )}
    </>
  );
}

function ModerationCard({ item, categories }: { item: AdminSubmission; categories: string[] }) {
  const meta = item.metadata || {};
  const { run, error, pending } = useMutation();
  const [action, setAction] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const status = submitter?.value as SubmissionStatus;
    const isEdit = submitter?.dataset.edit === '1';
    const data = new FormData(event.currentTarget);
    const payload = status === 'rejected'
      ? { status, moderatorNote: data.get('moderatorNote') }
      : {
          status, name: data.get('name'), description: data.get('description'), websiteUrl: data.get('websiteUrl'), category: data.get('category'),
          alternatives: data.get('alternatives'), platforms: data.get('platforms'), selfHosted: data.has('selfHosted'), bestFor: data.get('bestFor'),
          consideration: data.get('consideration'), moderatorNote: data.get('moderatorNote'),
        };
    setAction(submitter?.textContent ?? null);
    await run(() => patch(`/api/admin/submissions/${item.id}`, payload), {
      success: isEdit ? 'Edits saved.' : status === 'approved' ? 'Accepted for later curation.' : 'Submission rejected.',
    });
    setAction(null);
  }

  const label = (text: string) => (pending && action === text ? 'Saving…' : text);

  return (
    <form className="moderation-card moderation-form" onSubmit={submit}>
      <div className="moderation-head">
        <div>
          <StatusBadge status={item.status} />
          <h2>{item.name}</h2>
          <a href={item.repoUrl} {...external}>{item.repo} <Icon name="external" /></a>
          <p className="admin-submitted">Submitted {formatDate(item.createdAt)} · {item.submitter.login === 'Guest' ? 'Guest submission' : `@${item.submitter.login}`}</p>
        </div>
        <div className="admin-signals">
          <span><Icon name="thumbs" /><strong>{item.recommendationCount}</strong> community {plural(item.recommendationCount, 'vote')}</span>
          <span><Icon name="star" /> {compact(meta.stars)} GitHub stars</span>
        </div>
      </div>
      <p className="admin-description">{item.description}</p>
      <p className="admin-alternatives">Alternative to {item.alternatives.join(', ')}</p>
      <div className="admin-repo-facts">
        <span>{meta.license || 'License unverified'}</span>
        <span>Last push {formatDate(meta.pushedAt)}</span>
        {meta.archived && <span className="admin-archived">Archived repository</span>}
      </div>
      {item.voters.length ? (
        <details className="admin-voters">
          <summary>See {item.voters.length} {plural(item.voters.length, 'voter')}</summary>
          <div>{item.voters.map(voter => <span key={voter.login}>@{voter.login} · {formatDate(voter.votedAt)}</span>)}</div>
        </details>
      ) : <p className="admin-no-votes">No community votes yet.</p>}
      <div className="admin-feedback">
        <strong>Community feedback · {item.feedback.length}</strong>
        {item.feedback.length
          ? item.feedback.map(entry => <p key={entry.login}><span>@{entry.login} · {formatDate(entry.updatedAt)}</span>{entry.note}</p>)
          : <p>No feedback notes yet.</p>}
      </div>
      <details className="admin-editor">
        <summary>Review details and edit</summary>
        <div className="admin-fields">
          <Field label="Name"><input name="name" defaultValue={item.name} required /></Field>
          <Field label="Category">
            <select name="category" defaultValue={item.category}>{categories.map(name => <option key={name}>{name}</option>)}</select>
          </Field>
          <Field label="Description"><textarea name="description" rows={3} required defaultValue={item.description} /></Field>
          <Field label="Alternative to"><input name="alternatives" defaultValue={item.alternatives.join(', ')} required /></Field>
          <Field label="Platforms"><input name="platforms" defaultValue={item.platforms.join(', ')} required /></Field>
          <Field label="Website"><input type="url" name="websiteUrl" defaultValue={item.websiteUrl} /></Field>
          <Field label="Best for"><input name="bestFor" defaultValue={item.bestFor} /></Field>
          <Field label="Consideration"><textarea name="consideration" rows={2} defaultValue={item.consideration} /></Field>
          <Field label="Moderator note"><textarea name="moderatorNote" rows={2} defaultValue={item.moderatorNote} /></Field>
          <label className="check-field"><input type="checkbox" name="selfHosted" defaultChecked={item.selfHosted} /><span><strong>Self-hosted</strong></span></label>
        </div>
        <FormFeedback message={error} />
        <div className="moderation-actions">
          <button className="button button-secondary reject-action" type="submit" name="status" value="rejected" formNoValidate disabled={pending}>{label('Reject')}</button>
          <button className="button button-secondary" type="submit" name="status" value={item.status} data-edit="1" disabled={pending}>{label('Save edits')}</button>
          <button className="button button-primary" type="submit" name="status" value="approved" disabled={pending}>{label('Accept for consideration')}</button>
        </div>
      </details>
    </form>
  );
}

function ResolveWantedCard({ item, choices }: { item: WantedRequest; choices: CatalogChoice[] }) {
  const { run, error, pending } = useMutation();
  return (
    <form
      className="moderation-card wanted-resolution-form"
      onSubmit={event => {
        event.preventDefault();
        const solutionId = new FormData(event.currentTarget).get('solutionId');
        run(() => patch(`/api/admin/wanted/${item.id}`, { solutionId }), { success: 'Wanted request resolved.' });
      }}
    >
      <div className="moderation-head">
        <div>
          <span className="moderation-badge status-pending">{item.voteCount} wanted</span>
          <h2>Alternative to {item.productName}</h2>
          <p>{item.description}</p>
        </div>
      </div>
      <Field label="Accepted solution">
        <select name="solutionId" required defaultValue="">
          <option value="">Choose a community suggestion</option>
          {item.solutions.map(solution => <option key={solution.id} value={solution.id}>{solutionLabel(solution, choices)}</option>)}
        </select>
      </Field>
      <FormFeedback message={error} />
      <div className="moderation-actions"><button className="button button-primary" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Mark resolved'}</button></div>
    </form>
  );
}
