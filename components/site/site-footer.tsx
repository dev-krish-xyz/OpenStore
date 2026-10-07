import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { formatDate } from '@/lib/format';
import { githubRepoUrl, twitterUrl } from '@/lib/routes';
import { AboutDialog } from './about-dialog';

export function SiteFooter({ snapshotDate }: { snapshotDate?: string }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-identity">
          <Link className="brand footer-brand" href="/" aria-label="OpenStore home">
            <BrandMark />OpenStore
          </Link>
          <p>Thoughtful open-source alternatives for the software you use every day.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <div>
            <span>Browse</span>
            <Link href="/">Discover</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/trending">Trending</Link>
            <Link href="/community">Community Finds</Link>
          </div>
          <div>
            <span>Contribute</span>
            <Link href="/submit">Submit an app</Link>
            <Link href="/wanted">Wanted alternatives</Link>
            <AboutDialog snapshotNote={`Repository metadata: ${formatDate(snapshotDate)}. Curated source listings use verified official project icons. Screenshots are sourced from official repositories and websites.`} />
            <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>Independently curated. Comparisons describe overlapping use cases.</p>
        <p className="footer-credit">Built by <a href={twitterUrl} target="_blank" rel="noopener noreferrer">Krish</a></p>
      </div>
    </footer>
  );
}
