import type { CatalogChoice, Solution } from './types';

export function solutionLabel(solution: Solution, choices: CatalogChoice[]) {
  if (solution.catalogId) {
    const app = choices.find(item => item.id === solution.catalogId);
    return app ? `OpenStore · ${app.name}` : solution.catalogId;
  }
  return solution.metadata?.fullName || solution.githubUrl || 'GitHub project';
}
