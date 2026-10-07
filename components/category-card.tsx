import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/icon';
import { plural } from '@/lib/format';
import { categoryHref } from '@/lib/routes';
import type { Category } from '@/lib/catalog/types';

export function CategoryCard({ category, count }: { category: Category; count?: number }) {
  return (
    <Link className="category-card" href={categoryHref(category.name)} style={{ '--category-color': category.color } as CSSProperties}>
      <Icon name={category.icon} />
      <div>
        <span>{category.name}</span>
        {count !== undefined && <p>{count} curated {plural(count, 'app')} {count ? '→' : ''}</p>}
      </div>
    </Link>
  );
}
