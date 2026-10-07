'use client';

import { useCallback, useState, useTransition, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icon';
import { toast } from '@/components/ui/sonner';
import { ApiError, post, signIn } from '@/lib/community/client';
import type { SubmissionStatus, User } from '@/lib/community/types';

/**
 * Runs a community API call, then re-renders the server components so every list reflects the database.
 * Sends visitors to GitHub sign-in when the API says a session is required.
 */
export function useMutation() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [refreshing, startTransition] = useTransition();
  const [error, setError] = useState('');

  const run = useCallback(async (action: () => Promise<unknown>, { success, toastErrors = false }: { success?: string; toastErrors?: boolean } = {}) => {
    setBusy(true);
    setError('');
    try {
      await action();
      startTransition(() => router.refresh());
      if (success) toast(success);
      return true;
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : 'Something went wrong.';
      if (caught instanceof ApiError && caught.code === 'auth_required') signIn();
      else if (toastErrors) toast(message);
      else setError(message);
      return false;
    } finally {
      setBusy(false);
    }
  }, [router]);

  return { run, error, setError, pending: busy || refreshing };
}

export function Field({ label, help, children }: { label: ReactNode; help?: ReactNode; children: ReactNode }) {
  return <label className="form-field"><span>{label}</span>{children}{help && <small>{help}</small>}</label>;
}

export function FormFeedback({ message }: { message: string }) {
  return <div className="form-feedback" role="alert">{message}</div>;
}

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  const label = status === 'approved' ? 'Accepted for consideration' : status === 'rejected' ? 'Rejected' : 'Awaiting review';
  return <span className={`moderation-badge status-${status}`}>{label}</span>;
}

export function UserStrip({ user }: { user: User | null }) {
  const { run } = useMutation();
  if (!user) return null;
  return (
    <div className="user-strip">
      {user.avatarUrl ? <img src={user.avatarUrl} alt="" width={28} height={28} /> : <Icon name="user" />}
      <span>Signed in as <strong>{user.login}</strong></span>
      {user.isAdmin && <Link href="/admin">Review queue</Link>}
      <button className="text-link" onClick={() => run(() => post('/api/auth/logout'), { toastErrors: true })}>Sign out</button>
    </div>
  );
}

export function AuthNotice({ next, copy = 'Sign in with GitHub to vote.' }: { next: string; copy?: string }) {
  const { run } = useMutation();
  return (
    <div className="auth-notice">
      <Icon name="github" />
      <div>
        <strong>{copy}</strong>
        <p>Browsing and app submissions are open to everyone. Sign-in keeps votes to one per person.</p>
      </div>
      <button className="button button-primary" onClick={() => signIn(next)}>Sign in with GitHub</button>
      {process.env.NODE_ENV !== 'production' && (
        <button className="text-link" onClick={() => run(() => post('/api/auth/dev'), { toastErrors: true })}>
          Local admin sign-in
        </button>
      )}
    </div>
  );
}

export function LoadError({ title, message }: { title: string; message: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div className="inline-state error-state">
      <strong>{title}</strong>
      <p>{message}</p>
      <button className="button button-secondary" disabled={pending} onClick={() => startTransition(() => router.refresh())}>Try again</button>
    </div>
  );
}
