/**
 * Shared by the storefront and the catalog tests, so it stays plain JavaScript.
 * @template {import('./types').ProjectSummary} T
 * @param {T[]} projects
 * @param {Partial<import('./types').Filters>} [filters]
 * @returns {T[]}
 */
export function filterProjects(projects,{query='',category='All',platform='All',minimumStars=0,selfHosted=false,trending=false,openOnly=false,reviewed=false}={}) {
  const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return projects.filter(p => (category==='All'||p.category===category) && (platform==='All'||p.platforms.includes(platform)) && (p.stars||0)>=Number(minimumStars) && (!selfHosted||p.selfHosted) && (!trending||p.trending) && (!openOnly||p.name.toLowerCase().startsWith('open')) && (!reviewed||(p.review?.count??0)>0) && words.every(w=>[p.name,p.description,p.category,p.bestFor||'',...p.replaces].join(' ').toLowerCase().includes(w)));
}
