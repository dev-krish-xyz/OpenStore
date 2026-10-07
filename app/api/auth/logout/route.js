import { signOut } from '../../../../lib/community/auth.js';
import { apiError, assertSameOrigin, json } from '../../../../lib/community/http.js';

export const runtime = 'nodejs';

export async function POST(request) {
  try { assertSameOrigin(request); await signOut(); return json({ ok: true }); } catch (error) { return apiError(error); }
}
