import { currentUser } from './auth.js';
import { adminSubmissions, catalogChoices, communityData, wantedData } from './db.js';
import type { AdminSubmission, CatalogChoice, Submission, User, WantedRequest } from './types';

// Typed boundary over the JavaScript data layer for server components.
// Each loader returns an error message instead of throwing so pages can render an inline state.

type Loaded<T> = { data: T; error: null } | { data: null; error: string };

function load<T>(read: () => T, message: string): Loaded<T> {
  try { return { data: read(), error: null }; }
  catch (error) { console.error(error); return { data: null, error: message }; }
}

export async function getViewer(): Promise<User | null> {
  try { return (await currentUser()) as User | null; } catch (error) { console.error(error); return null; }
}

export const loadCommunity = (viewer: User | null) =>
  load(() => communityData(viewer?.id).submissions as Submission[], 'The community service is unavailable.');

export const loadWanted = (viewer: User | null) =>
  load(() => wantedData(viewer?.id) as WantedRequest[], 'The request board is unavailable.');

export const loadAdminQueue = (viewer: User) =>
  load(() => adminSubmissions(viewer.id) as AdminSubmission[], 'Submissions couldn’t be loaded.');

export const loadCatalogChoices = () => load(() => catalogChoices() as CatalogChoice[], 'Catalog choices are unavailable.');
