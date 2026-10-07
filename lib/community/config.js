import { categories } from '../../catalog.js';

export const categoryNames = categories.map(category => category.name);
export const platformNames = ['Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android'];
export const submissionStatuses = ['pending', 'approved', 'rejected'];

export function adminLogins() {
  return new Set((process.env.ADMIN_GITHUB_LOGINS || '')
    .split(',')
    .map(login => login.trim().toLowerCase())
    .filter(Boolean));
}
