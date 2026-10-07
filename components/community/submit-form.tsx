'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icon';
import { toast } from '@/components/ui/sonner';
import { api, post } from '@/lib/community/client';
import type { RepositoryMetadata } from '@/lib/community/types';
import { exact } from '@/lib/format';
import { Field, FormFeedback } from './shared';

const DESCRIPTION_MAX = 320;
const githubRepoPattern = /^https?:\/\/(www\.)?github\.com\/[^/\s]+\/[^/\s]+/i;

type Preview = { state: 'idle' } | { state: 'loaded'; meta: RepositoryMetadata } | { state: 'error'; message: string };

export function SubmitForm({ categories, platforms, alternative, repo }: { categories: string[]; platforms: readonly string[]; alternative: string; repo: string }) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState<Preview>({ state: 'idle' });
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function fetchMetadata() {
    const elements = form.current?.elements as (HTMLFormControlsCollection & Record<string, HTMLInputElement>) | undefined;
    if (!elements) return;
    setFetching(true);
    try {
      const { metadata } = await api<{ metadata: RepositoryMetadata }>(`/api/github?repo=${encodeURIComponent(elements.repoUrl.value)}`);
      if (!elements.name.value) elements.name.value = metadata.name || '';
      if (!elements.websiteUrl.value) elements.websiteUrl.value = metadata.homepage || '';
      if (!description) setDescription(metadata.description || '');
      setPreview({ state: 'loaded', meta: metadata });
    } catch (caught) {
      setPreview({ state: 'error', message: caught instanceof Error ? caught.message : 'Repository details are unavailable.' });
    } finally {
      setFetching(false);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError('');
    setSubmitting(true);
    try {
      await post('/api/submissions', {
        repoUrl: data.get('repoUrl'), company: data.get('company'), name: data.get('name'), description: data.get('description'),
        websiteUrl: data.get('websiteUrl'), docsUrl: data.get('docsUrl'), category: data.get('category'), alternatives: data.get('alternatives'),
        platforms: data.getAll('platforms'), selfHosted: data.has('selfHosted'), bestFor: data.get('bestFor'), consideration: data.get('consideration'),
      });
      toast('Submitted for editorial review.');
      router.push('/community');
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong.');
      setSubmitting(false);
    }
  }

  return (
    <form className="submit-form" id="submission-form" ref={form} onSubmit={submit}>
      <div className="bot-field" aria-hidden="true"><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>

      <section className="submit-section">
        <SectionHead step="01" title="Repository">Public GitHub repositories only. Projects already listed or submitted can’t be added twice.</SectionHead>
        <div className="submit-section-body">
          <div className="form-field">
            <label htmlFor="submit-repo-url">GitHub repository URL</label>
            <div className="repo-field">
              <Icon name="github" />
              <input
                id="submit-repo-url" required type="url" name="repoUrl" defaultValue={repo}
                placeholder="github.com/owner/repo" autoComplete="url" spellCheck={false}
                onChange={event => { if (preview.state !== 'idle') setPreview({ state: 'idle' }); event.currentTarget.dataset.dirty = '1'; }}
                onBlur={event => { if (event.currentTarget.dataset.dirty && githubRepoPattern.test(event.currentTarget.value.trim())) { delete event.currentTarget.dataset.dirty; fetchMetadata(); } }}
              />
              <button type="button" className="button button-secondary" onClick={fetchMetadata} disabled={fetching}>{fetching ? 'Fetching…' : 'Fetch'}</button>
            </div>
            <small>Name, description, and website fill in from GitHub.</small>
          </div>
          {preview.state !== 'idle' && (
            <div className={`metadata-preview${preview.state === 'error' ? ' is-error' : ''}`} id="metadata-preview" aria-live="polite">
              {preview.state === 'error' ? (
                <><Icon name="info" /><span className="field-error">{preview.message}</span></>
              ) : (
                <>
                  {preview.meta.ownerAvatarUrl ? <img src={preview.meta.ownerAvatarUrl} alt="" width={32} height={32} /> : <Icon name="github" />}
                  <div>
                    <strong>{preview.meta.fullName}</strong>
                    <span>
                      {exact(preview.meta.stars)} stars · {exact(preview.meta.forks)} forks
                      {preview.meta.license ? ` · ${preview.meta.license}` : ''}{preview.meta.language ? ` · ${preview.meta.language}` : ''}
                    </span>
                  </div>
                  <span className="metadata-status"><Icon name="check" />Details filled</span>
                  {preview.meta.archived && <p className="metadata-warning">This repository is archived on GitHub, so it may no longer be maintained.</p>}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="submit-section">
        <SectionHead step="02" title="Project details">Where it fits and what it replaces.</SectionHead>
        <div className="submit-section-body submit-fields">
          <Field label="Project name"><input required name="name" maxLength={100} placeholder="e.g. AppFlowy" /></Field>
          <Field label="Category">
            <select required name="category" defaultValue="">
              <option value="">Choose a category</option>
              {categories.map(name => <option key={name}>{name}</option>)}
            </select>
          </Field>
          <Field label="Alternative to" help="Proprietary products it can replace, separated by commas.">
            <input required name="alternatives" maxLength={240} defaultValue={alternative} placeholder="e.g. Notion, Confluence" />
          </Field>
          <Field label="Short description" help={<><span>One or two plain sentences.</span><span className="char-count">{description.length} / {DESCRIPTION_MAX}</span></>}>
            <textarea required name="description" maxLength={DESCRIPTION_MAX} rows={3} placeholder="What does this project help people do?" value={description} onChange={event => setDescription(event.target.value)} />
          </Field>
          <fieldset className="submit-platforms">
            <legend>Available on <small>Choose at least one</small></legend>
            <div className="platform-options">
              {platforms.map(value => <label key={value}><input type="checkbox" name="platforms" value={value} /><Icon name="check" />{value}</label>)}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="submit-section">
        <SectionHead step="03" title="More details">Optional. Website, docs, audience, and self-hosting.</SectionHead>
        <details className="submit-section-body submit-optional">
          <summary className="submit-optional-toggle"><span className="when-closed">Add details</span><span className="when-open">Hide details</span><Icon name="chevron" /></summary>
          <div className="submit-fields">
            <Field label="Website"><input type="url" name="websiteUrl" placeholder="https://project.example" /></Field>
            <Field label="Documentation"><input type="url" name="docsUrl" placeholder="https://docs.project.example" /></Field>
            <Field label="Best for"><input name="bestFor" maxLength={160} placeholder="e.g. Small teams that want to own their notes" /></Field>
            <Field label="Important consideration"><textarea name="consideration" maxLength={400} rows={3} placeholder="A limitation or setup detail people should know" /></Field>
            <label className="check-field">
              <input type="checkbox" name="selfHosted" />
              <span><strong>Self-hosting available</strong><small>Users can deploy and operate the project themselves.</small></span>
            </label>
          </div>
        </details>
      </section>

      <FormFeedback message={error} />
      <div className="submit-footer">
        <p>Looking for an alternative instead? <Link href="/wanted">Request one</Link></p>
        <div>
          <Link className="text-link" href="/community">Cancel</Link>
          <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit project'}</button>
        </div>
      </div>
    </form>
  );
}

function SectionHead({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div className="submit-section-head">
      <span className="submit-step">{step}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}
