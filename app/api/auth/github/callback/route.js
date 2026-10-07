import { NextResponse } from 'next/server';
import { finishOAuth } from '../../../../../lib/community/auth.js';

export const runtime = 'nodejs';

export async function GET(request) {
  const url = new URL(request.url);
  try {
    const next = await finishOAuth(url.searchParams.get('code'), url.searchParams.get('state'));
    return NextResponse.redirect(new URL(`/${next}`, url.origin));
  } catch (error) {
    const target = new URL('/', url.origin);
    target.hash = `/auth-error?message=${encodeURIComponent(error.message || 'Sign-in failed.')}`;
    return NextResponse.redirect(target);
  }
}
