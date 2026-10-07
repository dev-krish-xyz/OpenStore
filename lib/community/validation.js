import { categoryNames, platformNames, submissionStatuses } from './config.js';

export class InputError extends Error {
  constructor(message, status = 400, code = 'invalid_input') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function text(value, label, { required = true, max = 500 } = {}) {
  const result = String(value ?? '').trim();
  if (required && !result) throw new InputError(`${label} is required.`);
  if (result.length > max) throw new InputError(`${label} must be ${max} characters or fewer.`);
  return result;
}

export function parseGitHubRepository(value) {
  const raw = text(value, 'GitHub repository URL', { max: 300 });
  let url;
  try { url = new URL(raw.includes('://') ? raw : `https://${raw}`); }
  catch { throw new InputError('Enter a valid GitHub repository URL.'); }
  if (url.hostname.toLowerCase() !== 'github.com') throw new InputError('The repository must be hosted on github.com.');
  const parts = url.pathname.replace(/^\/+|\/+$/g, '').split('/');
  if (parts.length !== 2 || !parts.every(part => /^[A-Za-z0-9_.-]+$/.test(part))) {
    throw new InputError('Use a repository URL such as https://github.com/owner/project.');
  }
  const owner = parts[0];
  const repo = parts[1].replace(/\.git$/i, '');
  if (!repo) throw new InputError('Enter a complete GitHub repository URL.');
  return { owner, repo, key: `${owner}/${repo}`.toLowerCase(), url: `https://github.com/${owner}/${repo}` };
}

export function parseUrl(value, label, { required = false } = {}) {
  const result = text(value, label, { required, max: 500 });
  if (!result) return '';
  let url;
  try { url = new URL(result); } catch { throw new InputError(`${label} must be a valid URL.`); }
  if (!['http:', 'https:'].includes(url.protocol)) throw new InputError(`${label} must use http or https.`);
  return url.toString();
}

export function stringList(value, label, { allowed, min = 1, max = 8 } = {}) {
  const values = Array.isArray(value) ? value : String(value ?? '').split(',');
  const clean = [...new Set(values.map(item => String(item).trim()).filter(Boolean))];
  if (clean.length < min) throw new InputError(`Add at least ${min} ${label.toLowerCase()}.`);
  if (clean.length > max) throw new InputError(`Use no more than ${max} ${label.toLowerCase()}.`);
  if (allowed && clean.some(item => !allowed.includes(item))) throw new InputError(`${label} contains an unsupported value.`);
  return clean;
}

export function submissionInput(body, metadata = {}, { partial = false } = {}) {
  const result = {};
  const include = key => !partial || Object.prototype.hasOwnProperty.call(body, key);
  if (include('name')) result.name = text(body.name || metadata.name, 'Project name', { max: 100 });
  if (include('description')) result.description = text(body.description || metadata.description, 'Description', { max: 320 });
  if (include('websiteUrl')) result.websiteUrl = parseUrl(body.websiteUrl || metadata.homepage || '', 'Website URL');
  if (include('docsUrl')) result.docsUrl = parseUrl(body.docsUrl || '', 'Documentation URL');
  if (include('category')) {
    result.category = text(body.category, 'Category', { max: 60 });
    if (!categoryNames.includes(result.category)) throw new InputError('Choose a valid category.');
  }
  if (include('alternatives')) result.alternatives = stringList(body.alternatives, 'Alternatives', { min: 1, max: 8 });
  if (include('platforms')) result.platforms = stringList(body.platforms, 'Platforms', { allowed: platformNames, min: 1, max: 6 });
  if (include('selfHosted')) result.selfHosted = body.selfHosted === true;
  if (include('bestFor')) result.bestFor = text(body.bestFor, 'Best for', { required: false, max: 160 });
  if (include('consideration')) result.consideration = text(body.consideration, 'Consideration', { required: false, max: 400 });
  return result;
}

export function moderationInput(body) {
  const status = text(body.status, 'Status', { max: 20 });
  if (!submissionStatuses.includes(status)) throw new InputError('Choose a valid moderation status.');
  return {
    ...submissionInput(body, {}, { partial: true }),
    status,
    moderatorNote: text(body.moderatorNote, 'Moderator note', { required: false, max: 500 }),
  };
}

export function normalizeWantedName(value) {
  return text(value, 'Product name', { max: 100 }).normalize('NFKC').toLocaleLowerCase('en').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
