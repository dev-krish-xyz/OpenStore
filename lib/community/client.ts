export class ApiError extends Error {
  constructor(message: string, readonly code?: string, readonly status?: number) {
    super(message);
  }
}

/** JSON fetch against the community API routes, surfacing the server's error message. */
export async function api<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(data.error || 'Something went wrong.', data.code, response.status);
  return data as T;
}

export const post = <T = unknown>(path: string, body?: unknown) =>
  api<T>(path, { method: 'POST', body: body === undefined ? undefined : JSON.stringify(body) });

export const patch = <T = unknown>(path: string, body: unknown) => api<T>(path, { method: 'PATCH', body: JSON.stringify(body) });

/** Starts GitHub sign-in and returns the visitor to `next` (a same-site path) afterwards. */
export function signIn(next = window.location.pathname + window.location.search) {
  window.location.href = `/api/auth/github?next=${encodeURIComponent(next)}`;
}
