import { createDevelopmentUser } from '../../../../lib/community/auth.js';
import { apiError, assertSameOrigin, json } from '../../../../lib/community/http.js';

export const runtime = 'nodejs';

export async function POST(request) {
  try { assertSameOrigin(request); return json({ user: await createDevelopmentUser() }); } catch (error) { return apiError(error); }
}
