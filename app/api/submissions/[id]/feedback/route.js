import { requireUser } from '../../../../../lib/community/auth.js';
import { saveSubmissionFeedback } from '../../../../../lib/community/db.js';
import { apiError, assertSameOrigin, json, requestBody } from '../../../../../lib/community/http.js';
import { text } from '../../../../../lib/community/validation.js';

export const runtime = 'nodejs';

export async function POST(request, context) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const { id } = await context.params;
    const body = await requestBody(request);
    const note = text(body.note, 'Feedback', { max: 500 });
    return json({ submission: saveSubmissionFeedback(Number(id), user.id, note) });
  } catch (error) { return apiError(error); }
}
