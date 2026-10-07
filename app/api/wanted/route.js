import { currentUser, requireUser } from '../../../lib/community/auth.js';
import { createWanted, wantedData } from '../../../lib/community/db.js';
import { apiError, assertSameOrigin, json, requestBody } from '../../../lib/community/http.js';
import { normalizeWantedName, text } from '../../../lib/community/validation.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try { const user = await currentUser(); return json({ requests: wantedData(user?.id) }); }
  catch (error) { return apiError(error); }
}

export async function POST(request) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const body = await requestBody(request);
    const productName = text(body.productName, 'Product name', { max: 100 });
    const input = { productName, normalizedName: normalizeWantedName(productName), description: text(body.description, 'Description', { required: false, max: 400 }) };
    return json({ request: createWanted(input, user.id) }, { status: 201 });
  } catch (error) { return apiError(error); }
}
