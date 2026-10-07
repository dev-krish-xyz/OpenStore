import { requireUser } from '../../../../../lib/community/auth.js';
import { catalogChoices, createSolution } from '../../../../../lib/community/db.js';
import { fetchRepository } from '../../../../../lib/community/github.js';
import { apiError, assertSameOrigin, json, requestBody } from '../../../../../lib/community/http.js';
import { InputError, text } from '../../../../../lib/community/validation.js';

export const runtime = 'nodejs';

export async function POST(request, context) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const body = await requestBody(request);
    const { id } = await context.params;
    const catalogId = text(body.catalogId, 'OpenStore app', { required: false, max: 100 });
    let solution = { catalogId }, metadata = null;
    if (!catalogId) {
      const repository = await fetchRepository(body.githubUrl);
      const existing = catalogChoices().find(app => app.repo.toLowerCase() === repository.parsed.key);
      if (existing) solution = { catalogId: existing.id };
      else {
        solution = { githubUrl: repository.parsed.url, repoKey: repository.parsed.key };
        metadata = repository.metadata;
      }
    }
    if (!solution.catalogId && !solution.githubUrl) throw new InputError('Choose an OpenStore app or enter a GitHub repository.');
    return json({ request: createSolution(Number(id), solution, metadata, user.id) }, { status: 201 });
  } catch (error) { return apiError(error); }
}
