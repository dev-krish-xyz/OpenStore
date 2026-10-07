import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { catalog } from '../../catalog.js';
import { openCatalog } from '../../open-catalog.js';
import { trendingCatalog } from '../../trending-catalog.js';
import { InputError } from './validation.js';

const allCatalogProjects = [...catalog, ...openCatalog, ...trendingCatalog];
const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
let database;

function db() {
  if (database) return database;
  const filename = process.env.OPENSTORE_DB_PATH || path.join(process.cwd(), '.data', 'openstore.sqlite');
  mkdirSync(path.dirname(filename), { recursive: true });
  database = new DatabaseSync(filename);
  database.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
  database.exec(readFileSync(schemaPath, 'utf8'));
  return database;
}

function parse(value, fallback) {
  try { return JSON.parse(value); } catch { return fallback; }
}

function publicUser(row) {
  if (!row) return null;
  return { id: row.id, login: row.login, name: row.name, avatarUrl: row.avatar_url, isAdmin: Boolean(row.is_admin) };
}

function submission(row) {
  const metadata = parse(row.metadata_json, {});
  return {
    id: row.id, repoUrl: row.repo_url, repo: `${row.repo_owner}/${row.repo_name}`,
    name: row.name, description: row.description, websiteUrl: row.website_url || '', docsUrl: row.docs_url || '',
    category: row.category, alternatives: parse(row.alternatives_json, []), platforms: parse(row.platforms_json, []),
    selfHosted: Boolean(row.self_hosted), bestFor: row.best_for || '', consideration: row.consideration || '',
    status: row.status, moderatorNote: row.moderator_note || '',
    recommendationCount: Number(row.recommendation_count || 0), recommendedByViewer: Boolean(row.viewer_recommended),
    feedbackCount: Number(row.feedback_count || 0), feedbackByViewer: row.viewer_feedback || '',
    metadata, submitter: { login: row.submitter_login, avatarUrl: row.submitter_avatar_url },
    createdAt: row.created_at, updatedAt: row.updated_at, reviewedAt: row.reviewed_at,
  };
}

function selectSubmissions(where, userId = 0) {
  return db().prepare(`
    SELECT s.*, u.login AS submitter_login, u.avatar_url AS submitter_avatar_url,
      (SELECT COUNT(*) FROM recommendations r WHERE r.submission_id = s.id) AS recommendation_count,
      EXISTS(SELECT 1 FROM recommendations r WHERE r.submission_id = s.id AND r.user_id = ?) AS viewer_recommended,
      (SELECT COUNT(*) FROM submission_feedback f WHERE f.submission_id = s.id) AS feedback_count,
      (SELECT note FROM submission_feedback f WHERE f.submission_id = s.id AND f.user_id = ?) AS viewer_feedback
    FROM submissions s JOIN users u ON u.id = s.submitter_id
    ${where}
  `).all(userId, userId).map(submission);
}

export function catalogRepoKeys() {
  return new Set(allCatalogProjects.map(project => project.repo.toLowerCase()));
}

export function catalogChoices() {
  return allCatalogProjects.map(project => ({ id: project.id, name: project.name, repo: project.repo }));
}

export function findUserBySession(tokenHash) {
  const row = db().prepare(`
    SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP
  `).get(tokenHash);
  return publicUser(row);
}

export function upsertUser(profile, isAdmin) {
  db().prepare(`
    INSERT INTO users (github_id, login, name, avatar_url, is_admin)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(github_id) DO UPDATE SET login=excluded.login, name=excluded.name,
      avatar_url=excluded.avatar_url, is_admin=excluded.is_admin, updated_at=CURRENT_TIMESTAMP
  `).run(String(profile.id), profile.login, profile.name || '', profile.avatar_url || '', isAdmin ? 1 : 0);
  return publicUser(db().prepare('SELECT * FROM users WHERE github_id = ?').get(String(profile.id)));
}

export function createSession(tokenHash, userId, expiresAt) {
  db().prepare('DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP').run();
  db().prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').run(tokenHash, userId, expiresAt);
}

export function deleteSession(tokenHash) {
  db().prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash);
}

export function communityData(userId = 0) {
  return { submissions: selectSubmissions("WHERE s.status IN ('pending','approved') ORDER BY s.created_at DESC, s.id DESC", userId) };
}

function guestSubmitterId() {
  db().prepare("INSERT INTO users (github_id, login, name) VALUES ('openstore-guest', 'Guest', 'Community member') ON CONFLICT(github_id) DO NOTHING").run();
  return db().prepare("SELECT id FROM users WHERE github_id = 'openstore-guest'").get().id;
}

export function createSubmission(input, repo, userId = null) {
  if (catalogRepoKeys().has(repo.parsed.key)) throw new InputError('That repository is already in the curated OpenStore catalog.', 409, 'already_curated');
  const duplicate = db().prepare('SELECT id, status FROM submissions WHERE repo_key = ?').get(repo.parsed.key);
  if (duplicate) throw new InputError(`That repository has already been submitted (${duplicate.status}).`, 409, 'duplicate_submission');
  const info = db().prepare(`
    INSERT INTO submissions (repo_url, repo_key, repo_owner, repo_name, name, description, website_url, docs_url,
      category, alternatives_json, platforms_json, self_hosted, best_for, consideration, metadata_json, submitter_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(repo.parsed.url, repo.parsed.key, repo.parsed.owner, repo.parsed.repo, input.name, input.description,
    input.websiteUrl, input.docsUrl, input.category, JSON.stringify(input.alternatives), JSON.stringify(input.platforms),
    input.selfHosted ? 1 : 0, input.bestFor, input.consideration, JSON.stringify(repo.metadata), userId || guestSubmitterId());
  return getSubmission(Number(info.lastInsertRowid), userId || 0);
}

export function getSubmission(id, userId = 0) {
  return selectSubmissions('WHERE s.id = ' + Number(id), userId)[0] || null;
}

export function toggleRecommendation(id, userId) {
  const target = db().prepare("SELECT id FROM submissions WHERE id = ? AND status IN ('pending','approved')").get(id);
  if (!target) throw new InputError('Submission not found.', 404, 'not_found');
  const current = db().prepare('SELECT 1 FROM recommendations WHERE submission_id = ? AND user_id = ?').get(id, userId);
  if (current) db().prepare('DELETE FROM recommendations WHERE submission_id = ? AND user_id = ?').run(id, userId);
  else db().prepare('INSERT INTO recommendations (submission_id, user_id) VALUES (?, ?)').run(id, userId);
  return getSubmission(id, userId);
}

export function saveSubmissionFeedback(id, userId, note) {
  const target = db().prepare("SELECT id FROM submissions WHERE id = ? AND status IN ('pending','approved')").get(id);
  if (!target) throw new InputError('Submission not found.', 404, 'not_found');
  db().prepare(`INSERT INTO submission_feedback (submission_id, user_id, note) VALUES (?, ?, ?)
    ON CONFLICT(submission_id, user_id) DO UPDATE SET note=excluded.note, updated_at=CURRENT_TIMESTAMP`).run(id, userId, note);
  return getSubmission(id, userId);
}

export function moderateSubmission(id, changes, adminId) {
  const current = db().prepare('SELECT * FROM submissions WHERE id = ?').get(id);
  if (!current) throw new InputError('Submission not found.', 404, 'not_found');
  const merged = {
    name: changes.name ?? current.name, description: changes.description ?? current.description,
    websiteUrl: changes.websiteUrl ?? current.website_url, docsUrl: changes.docsUrl ?? current.docs_url,
    category: changes.category ?? current.category,
    alternatives: changes.alternatives ?? parse(current.alternatives_json, []),
    platforms: changes.platforms ?? parse(current.platforms_json, []),
    selfHosted: changes.selfHosted ?? Boolean(current.self_hosted),
    bestFor: changes.bestFor ?? current.best_for, consideration: changes.consideration ?? current.consideration,
  };
  db().prepare(`
    UPDATE submissions SET name=?, description=?, website_url=?, docs_url=?, category=?, alternatives_json=?,
      platforms_json=?, self_hosted=?, best_for=?, consideration=?, status=?, moderator_note=?, reviewer_id=?,
      reviewed_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP WHERE id=?
  `).run(merged.name, merged.description, merged.websiteUrl, merged.docsUrl, merged.category,
    JSON.stringify(merged.alternatives), JSON.stringify(merged.platforms), merged.selfHosted ? 1 : 0,
    merged.bestFor, merged.consideration, changes.status, changes.moderatorNote, adminId, id);
  db().prepare('INSERT INTO moderation_events (submission_id, actor_id, action, note) VALUES (?, ?, ?, ?)')
    .run(id, adminId, changes.status, changes.moderatorNote);
  return getSubmission(id, adminId);
}

function wanted(row) {
  return {
    id: row.id, productName: row.product_name, description: row.description || '', status: row.status,
    voteCount: Number(row.vote_count || 0), votedByViewer: Boolean(row.viewer_voted),
    createdAt: row.created_at, submitter: { login: row.submitter_login },
    solutions: parse(row.solutions_json, []),
  };
}

export function wantedData(userId = 0) {
  return db().prepare(`
    SELECT w.*, u.login AS submitter_login,
      (SELECT COUNT(*) FROM wanted_votes v WHERE v.request_id=w.id) AS vote_count,
      EXISTS(SELECT 1 FROM wanted_votes v WHERE v.request_id=w.id AND v.user_id=?) AS viewer_voted,
      COALESCE((SELECT json_group_array(json_object('id', s.id, 'catalogId', s.catalog_id, 'githubUrl', s.github_url,
        'status', s.status, 'metadata', json(s.metadata_json))) FROM wanted_solutions s WHERE s.request_id=w.id), '[]') AS solutions_json
    FROM wanted_requests w JOIN users u ON u.id=w.submitter_id
    ORDER BY (w.status='open') DESC, vote_count DESC, w.created_at DESC
  `).all(userId).map(wanted);
}

export function createWanted(input, userId) {
  const current = db().prepare('SELECT id FROM wanted_requests WHERE normalized_name = ?').get(input.normalizedName);
  if (current) throw new InputError('A request for that product already exists. Add your vote instead.', 409, 'duplicate_request');
  const info = db().prepare('INSERT INTO wanted_requests (product_name, normalized_name, description, submitter_id) VALUES (?, ?, ?, ?)')
    .run(input.productName, input.normalizedName, input.description, userId);
  db().prepare('INSERT INTO wanted_votes (request_id, user_id) VALUES (?, ?)').run(Number(info.lastInsertRowid), userId);
  return wantedData(userId).find(item => item.id === Number(info.lastInsertRowid));
}

export function toggleWantedVote(id, userId) {
  if (!db().prepare("SELECT 1 FROM wanted_requests WHERE id=? AND status='open'").get(id)) throw new InputError('Open request not found.', 404, 'not_found');
  const current = db().prepare('SELECT 1 FROM wanted_votes WHERE request_id=? AND user_id=?').get(id, userId);
  if (current) db().prepare('DELETE FROM wanted_votes WHERE request_id=? AND user_id=?').run(id, userId);
  else db().prepare('INSERT INTO wanted_votes (request_id, user_id) VALUES (?, ?)').run(id, userId);
  return wantedData(userId).find(item => item.id === Number(id));
}

export function createSolution(requestId, solution, metadata, userId) {
  if (!db().prepare("SELECT 1 FROM wanted_requests WHERE id=? AND status='open'").get(requestId)) throw new InputError('Open request not found.', 404, 'not_found');
  if (solution.catalogId && !catalogChoices().some(project => project.id === solution.catalogId)) throw new InputError('Choose a valid OpenStore app.');
  try {
    db().prepare(`INSERT INTO wanted_solutions (request_id, suggester_id, catalog_id, github_url, repo_key, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?)`)
      .run(requestId, userId, solution.catalogId || null, solution.githubUrl || null, solution.repoKey || null, metadata ? JSON.stringify(metadata) : null);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') throw new InputError('That solution has already been suggested.', 409, 'duplicate_solution');
    throw error;
  }
  return wantedData(userId).find(item => item.id === Number(requestId));
}

export function resolveWanted(requestId, solutionId) {
  const solution = db().prepare('SELECT * FROM wanted_solutions WHERE id=? AND request_id=?').get(solutionId, requestId);
  if (!solution) throw new InputError('Suggested solution not found.', 404, 'not_found');
  db().exec('BEGIN IMMEDIATE');
  try {
    db().prepare("UPDATE wanted_solutions SET status='suggested' WHERE request_id=?").run(requestId);
    db().prepare("UPDATE wanted_solutions SET status='accepted' WHERE id=?").run(solutionId);
    db().prepare("UPDATE wanted_requests SET status='resolved', resolved_catalog_id=?, resolved_solution_id=?, updated_at=CURRENT_TIMESTAMP WHERE id=?")
      .run(solution.catalog_id, solutionId, requestId);
    db().exec('COMMIT');
  } catch (error) {
    db().exec('ROLLBACK');
    throw error;
  }
  return wantedData(0).find(item => item.id === Number(requestId));
}

export function adminSubmissions(userId) {
  const submissions = selectSubmissions('ORDER BY s.created_at DESC, s.id DESC', userId);
  const voters = db().prepare(`
    SELECT r.submission_id, u.login, r.created_at
    FROM recommendations r JOIN users u ON u.id = r.user_id
    ORDER BY r.created_at DESC
  `).all();
  const feedback = db().prepare(`
    SELECT f.submission_id, f.note, f.updated_at, u.login
    FROM submission_feedback f JOIN users u ON u.id = f.user_id
    ORDER BY f.updated_at DESC
  `).all();
  const bySubmission = new Map();
  for (const voter of voters) {
    const list = bySubmission.get(voter.submission_id) || [];
    list.push({ login: voter.login, votedAt: voter.created_at });
    bySubmission.set(voter.submission_id, list);
  }
  const feedbackBySubmission = new Map();
  for (const entry of feedback) {
    const list = feedbackBySubmission.get(entry.submission_id) || [];
    list.push({ login: entry.login, note: entry.note, updatedAt: entry.updated_at });
    feedbackBySubmission.set(entry.submission_id, list);
  }
  return submissions.map(item => ({ ...item, voters: bySubmission.get(item.id) || [], feedback: feedbackBySubmission.get(item.id) || [] }));
}
