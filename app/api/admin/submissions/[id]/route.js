import { requireAdmin } from '../../../../../lib/community/auth.js';
import { moderateSubmission } from '../../../../../lib/community/db.js';
import { apiError, assertSameOrigin, json, requestBody } from '../../../../../lib/community/http.js';
import { moderationInput } from '../../../../../lib/community/validation.js';

export const runtime = 'nodejs';

export async function PATCH(request, context) {
  try {
    assertSameOrigin(request);
    const user = await requireAdmin();
    const body = moderationInput(await requestBody(request));
    const { id } = await context.params;
    return json({ submission: moderateSubmission(Number(id), body, user.id) });
  } catch (error) { return apiError(error); }
}
