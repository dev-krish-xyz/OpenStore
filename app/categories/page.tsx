import type { Metadata } from 'next';
import { CategoryCard } from '@/components/category-card';
import { AppRow } from '@/components/project/app-row';
import { SearchBox } from '@/components/search-box';
import { SectionHeading } from '@/components/section-heading';
import { categories, categoryCount, pick, snapshotDates } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Categories', description: 'Every app in the collection, grouped by what it helps you do.' };

export default function CategoriesPage() {
  return (
    <>
      <section className="explore-intro">
        <div>
          <h1>Categories</h1>
          <p>Every app in the collection, grouped by what it helps you do.</p>
        </div>
        <SearchBox />
      </section>
      <div className="category-directory">
        {categories.map(category => <CategoryCard key={category.name} category={category} count={categoryCount(category.name)} />)}
      </div>
      <SectionHeading title="Good places to start" href="/browse" linkLabel="All apps" />
      <div className="apps-grid">
        {pick(['opencode', 'open-webui', 'appflowy', 'actual', 'penpot', 'openproject']).map(project => (
          <AppRow key={project.id} project={project} starsAsOf={snapshotDates.repositories} trendAsOf={snapshotDates.trending} />
        ))}
      </div>
    </>
  );
}
