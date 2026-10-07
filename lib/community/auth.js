import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { adminLogins } from './config.js';
import { createSession, deleteSession, findUserBySession, upsertUser } from './db.js';
import { InputError } from './validation.js';

const sessionCookie = 'openstore_session';
const oauthCookie = 'openstore_oauth';
const maxAge = 60 * 60 * 24 * 30;

/** Same-site return paths only. Legacy "#/route" values from the old single-page app map to "/route". */
export function safeReturnPath(value) {
  const path = String(value || '/').replace(/^#(?=\/)/, '');
  // Backslashes and control characters are rejected outright: URL parsers fold them into "//host".
  return /^\/(?!\/)/.test(path) && !/[\\\u0000-\u001f]/.test(path) ? path : '/';
}

function hash(value) { return crypto.createHash('sha256').update(value).digest('hex'); }

export async function currentUser() {
  const jar = await cookies();
  const token = jar.get(sessionCookie)?.value;
  return token ? findUserBySession(hash(token)) : null;
}

export async function requireUser() {
  const user = await currentUser();
  if (!user) throw new InputError('Sign in with GitHub to continue.', 401, 'auth_required');
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!user.isAdmin) throw new InputError('Admin access is required.', 403, 'admin_required');
  return user;
}

export async function beginOAuth(nextPath) {
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new InputError('GitHub sign-in has not been configured.', 503, 'auth_unconfigured');
  }
  const state = crypto.randomBytes(24).toString('base64url');
  const safeNext = safeReturnPath(nextPath);
  const jar = await cookies();
  jar.set(oauthCookie, JSON.stringify({ state, next: safeNext }), {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 600, path: '/',
  });
  return state;
}

export async function finishOAuth(code, state) {
  const jar = await cookies();
  let stored;
  try { stored = JSON.parse(jar.get(oauthCookie)?.value || '{}'); } catch { stored = {}; }
  jar.delete(oauthCookie);
  const incomingState = String(state || '');
  if (!stored.state || stored.state.length !== incomingState.length || !crypto.timingSafeEqual(Buffer.from(stored.state), Buffer.from(incomingState))) {
    throw new InputError('The sign-in request expired. Please try again.', 400, 'oauth_state');
  }
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code }),
  });
  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) throw new InputError('GitHub sign-in could not be completed.', 401, 'oauth_failed');
  const profileResponse = await fetch('https://api.github.com/user', {
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'OpenStore-community' },
    cache: 'no-store',
  });
  if (!profileResponse.ok) throw new InputError('GitHub profile could not be loaded.', 401, 'oauth_profile');
  const profile = await profileResponse.json();
  const user = upsertUser(profile, adminLogins().has(profile.login.toLowerCase()));
  const token = crypto.randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + maxAge * 1000);
  createSession(hash(token), user.id, expires.toISOString());
  jar.set(sessionCookie, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge, path: '/' });
  return safeReturnPath(stored.next);
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(sessionCookie)?.value;
  if (token) deleteSession(hash(token));
  jar.delete(sessionCookie);
}

export async function createDevelopmentUser() {
  if (process.env.NODE_ENV === 'production') throw new InputError('Development sign-in is unavailable.', 404, 'not_found');
  const login = process.env.OPENSTORE_DEV_LOGIN || 'local-admin';
  const user = upsertUser({ id: `dev-${login}`, login, name: 'Local OpenStore Admin', avatar_url: '' }, true);
  const jar = await cookies();
  const token = crypto.randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + maxAge * 1000);
  createSession(hash(token), user.id, expires.toISOString());
  jar.set(sessionCookie, token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge, path: '/' });
  return user;
}
