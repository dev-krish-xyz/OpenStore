import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/icon';

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  href?: string;
  linkLabel?: string;
}

export function SectionHeading({ title, subtitle, href, linkLabel = 'See all' }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {href && <Link className="text-link" href={href}>{linkLabel} <Icon name="chevron" /></Link>}
    </div>
  );
}
