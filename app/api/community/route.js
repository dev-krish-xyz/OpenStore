import { currentUser } from '../../../lib/community/auth.js';
import { communityData } from '../../../lib/community/db.js';
import { apiError, json } from '../../../lib/community/http.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await currentUser();
    return json(communityData(user?.id));
  } catch (error) { return apiError(error); }
}
