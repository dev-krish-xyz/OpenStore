import { requireUser } from '../../../../../lib/community/auth.js';
import { toggleWantedVote } from '../../../../../lib/community/db.js';
import { apiError, assertSameOrigin, json } from '../../../../../lib/community/http.js';

export const runtime = 'nodejs';

export async function POST(request, context) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const { id } = await context.params;
    return json({ request: toggleWantedVote(Number(id), user.id) });
  } catch (error) { return apiError(error); }
}
