import { catalogChoices } from '../../../lib/community/db.js';
import { json } from '../../../lib/community/http.js';

export const runtime = 'nodejs';

export async function GET() { return json({ apps: catalogChoices() }); }
