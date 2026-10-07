import { NextResponse } from 'next/server';
import { beginOAuth } from '../../../../lib/community/auth.js';
import { apiError } from '../../../../lib/community/http.js';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const state = await beginOAuth(url.searchParams.get('next'));
    const callback = new URL('/api/auth/github/callback', url.origin);
    const target = new URL('https://github.com/login/oauth/authorize');
    target.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID);
    target.searchParams.set('redirect_uri', callback.toString());
    target.searchParams.set('scope', 'read:user');
    target.searchParams.set('state', state);
    return NextResponse.redirect(target);
  } catch (error) { return apiError(error); }
}
