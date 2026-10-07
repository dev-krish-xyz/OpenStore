import { requireAdmin } from '../../../../../lib/community/auth.js';
import { resolveWanted } from '../../../../../lib/community/db.js';
import { apiError, assertSameOrigin, json, requestBody } from '../../../../../lib/community/http.js';
import { InputError } from '../../../../../lib/community/validation.js';

export const runtime = 'nodejs';

export async function PATCH(request, context) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const body = await requestBody(request);
    const solutionId = Number(body.solutionId);
    if (!Number.isInteger(solutionId) || solutionId < 1) throw new InputError('Choose a suggested solution.');
    const { id } = await context.params;
    return json({ request: resolveWanted(Number(id), solutionId) });
  } catch (error) { return apiError(error); }
}
