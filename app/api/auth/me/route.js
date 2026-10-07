import { currentUser, signOut } from '../../../../lib/community/auth.js';
import { apiError, assertSameOrigin, json } from '../../../../lib/community/http.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try { return json({ user: await currentUser() }); } catch (error) { return apiError(error); }
}

export async function DELETE(request) {
  try { assertSameOrigin(request); await signOut(); return json({ ok: true }); } catch (error) { return apiError(error); }
}
