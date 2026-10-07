import { NextResponse } from 'next/server';
import { InputError } from './validation.js';

export function json(data, init) { return NextResponse.json(data, init); }

export function apiError(error) {
  if (error instanceof InputError) return json({ error: error.message, code: error.code }, { status: error.status });
  if (error?.code === 'SQLITE_CONSTRAINT_UNIQUE') return json({ error: 'That item already exists.', code: 'duplicate' }, { status: 409 });
  console.error(error);
  return json({ error: 'Something went wrong. Please try again.', code: 'server_error' }, { status: 500 });
}

export function assertSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) throw new InputError('Invalid request origin.', 403, 'invalid_origin');
}

export async function requestBody(request) {
  let body;
  try { body = await request.json(); } catch { throw new InputError('Send a valid JSON request.'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new InputError('Send a valid JSON object.');
  return body;
}
