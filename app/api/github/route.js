import { fetchRepository } from '../../../lib/community/github.js';
import { apiError, json } from '../../../lib/community/http.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const repository = await fetchRepository(new URL(request.url).searchParams.get('repo'));
    return json(repository);
  } catch (error) { return apiError(error); }
}
