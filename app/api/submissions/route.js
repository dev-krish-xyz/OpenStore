import { currentUser } from '../../../lib/community/auth.js';
import { createSubmission } from '../../../lib/community/db.js';
import { fetchRepository } from '../../../lib/community/github.js';
import { apiError, assertSameOrigin, json, requestBody } from '../../../lib/community/http.js';
import { InputError, submissionInput } from '../../../lib/community/validation.js';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    assertSameOrigin(request);
    const body = await requestBody(request);
    if (body.company) throw new InputError('Submission could not be accepted.');
    const user = await currentUser();
    const repository = await fetchRepository(body.repoUrl);
    const input = submissionInput(body, repository.metadata);
    return json({ submission: createSubmission(input, repository, user?.id) }, { status: 201 });
  } catch (error) { return apiError(error); }
}
