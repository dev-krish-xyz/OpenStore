'use client';

import { Icon } from '@/components/icon';
import { post, signIn } from '@/lib/community/client';
import type { Submission, User } from '@/lib/community/types';
import { compact, formatDate, plural } from '@/lib/format';
import { external } from '@/lib/routes';
import { FormFeedback, StatusBadge, useMutation } from './shared';

export function CommunityCard({ item, viewer }: { item: Submission; viewer: User | null }) {
  const meta = item.metadata || {};
  const vote = useMutation();
  const feedback = useMutation();

  return (
    <article className="community-card">
      <div className="community-card-head">
        {meta.ownerAvatarUrl
          ? <span className="app-icon image-icon"><img src={meta.ownerAvatarUrl} alt="" width={48} height={48} /></span>
          : <span className="app-icon"><Icon name="layers" /></span>}
        <div>
          <div className="community-card-label">
            <StatusBadge status={item.status} />
            <span>{item.category}</span>
            <span>Submitted {formatDate(item.createdAt)}</span>
          </div>
          <h2>{item.name}</h2>
          <p>{item.repo}</p>
        </div>
      </div>
      <p className="community-description">{item.description}</p>
      <div className="community-signals">
        <span><Icon name="star" /><strong>{compact(meta.stars)}</strong> stars</span>
        <span><Icon name="fork" /><strong>{compact(meta.forks)}</strong> forks</span>
        {meta.language && <span>{meta.language}</span>}
      </div>
      <div className="replacement-chip"><span>Suggested alternative to</span><b>{item.alternatives.join(' · ')}</b></div>
      <div className="community-card-foot">
        <button
          className="recommend-button"
          disabled={vote.pending}
          aria-pressed={item.recommendedByViewer}
          aria-label={`${item.recommendedByViewer ? 'Remove your vote from' : 'Vote for'} ${item.name}`}
          onClick={() => (viewer ? vote.run(() => post(`/api/submissions/${item.id}/recommend`), { toastErrors: true }) : signIn('/community'))}
        >
          <Icon name="thumbs" /><span>{item.recommendedByViewer ? 'Voted' : 'Vote'}</span><strong>{item.recommendationCount}</strong>
        </button>
        <div><a className="text-link" href={item.repoUrl} {...external}>GitHub <Icon name="external" /></a></div>
      </div>
      <details className="community-feedback">
        <summary>{item.feedbackCount} {plural(item.feedbackCount, 'note')} for editors · {item.feedbackByViewer ? 'Edit your note' : 'Share feedback'}</summary>
        {viewer ? (
          <form
            className="feedback-form"
            onSubmit={event => {
              event.preventDefault();
              const note = new FormData(event.currentTarget).get('note');
              feedback.run(() => post(`/api/submissions/${item.id}/feedback`, { note }), { success: 'Feedback sent to editors.' });
            }}
          >
            <label>
              <span>What should editors know?</span>
              <textarea name="note" maxLength={500} rows={3} required placeholder="Share what works well or what needs a closer look." defaultValue={item.feedbackByViewer} />
            </label>
            <FormFeedback message={feedback.error} />
            <button className="button button-secondary" type="submit" disabled={feedback.pending}>
              {feedback.pending ? 'Saving…' : item.feedbackByViewer ? 'Update note' : 'Send feedback'}
            </button>
          </form>
        ) : (
          <button className="text-link" onClick={() => signIn('/community')}>Sign in to share feedback</button>
        )}
      </details>
    </article>
  );
}
