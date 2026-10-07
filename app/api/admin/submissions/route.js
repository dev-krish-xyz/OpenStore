import { requireAdmin } from '../../../../lib/community/auth.js';
import { adminSubmissions } from '../../../../lib/community/db.js';
import { apiError, json } from '../../../../lib/community/http.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await requireAdmin();
    return json({ submissions: adminSubmissions(user.id) });
  } catch (error) { return apiError(error); }
}
