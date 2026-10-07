import { InputError, parseGitHubRepository } from './validation.js';

function githubHeaders() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'OpenStore-community' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

export async function fetchRepository(value) {
  const parsed = parseGitHubRepository(value);
  const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(parsed.owner)}/${encodeURIComponent(parsed.repo)}`, {
    headers: githubHeaders(), cache: 'no-store', signal: AbortSignal.timeout(8000),
  });
  if (response.status === 404) throw new InputError('That public GitHub repository could not be found.', 404, 'repository_not_found');
  if (!response.ok) throw new InputError('GitHub metadata is temporarily unavailable. Try again shortly.', 503, 'github_unavailable');
  const repo = await response.json();
  if (repo.private) throw new InputError('OpenStore only accepts public repositories.');
  return {
    parsed,
    metadata: {
      githubId: String(repo.id), name: repo.name, fullName: repo.full_name,
      description: repo.description || '', homepage: repo.homepage || '',
      stars: repo.stargazers_count || 0, forks: repo.forks_count || 0,
      openIssues: repo.open_issues_count || 0, language: repo.language || '',
      license: repo.license?.spdx_id || repo.license?.name || '',
      topics: repo.topics || [], ownerAvatarUrl: repo.owner?.avatar_url || '',
      defaultBranch: repo.default_branch || 'main', archived: Boolean(repo.archived),
      createdAt: repo.created_at, updatedAt: repo.updated_at, pushedAt: repo.pushed_at,
    },
  };
}
