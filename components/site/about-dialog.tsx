'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { external } from '@/lib/routes';

export function AboutDialog({ snapshotNote }: { snapshotNote: string }) {
  return (
    <Dialog>
      <DialogTrigger>About the collection</DialogTrigger>
      <DialogContent className="about-dialog" closeLabel="Close about dialog">
        <span className="eyebrow">About</span>
        <DialogTitle>About the collection</DialogTitle>
        <DialogDescription asChild>
          <p>OpenStore is an independent collection of open-source software and a clearly marked source-available project. Each listing links to its official repository and project website.</p>
        </DialogDescription>
        <p>Stars and forks are timestamped GitHub snapshots. Trending membership comes from GitHub’s weekly trending page; “recently popular” is an editorial selection, not a measured growth ranking. Alternative comparisons are editorial suggestions, not claims of feature parity.</p>
        <p>{snapshotNote}</p>
        <a href="https://github.com/trending?since=weekly" {...external} className="button button-primary">View GitHub Trending ↗</a>
      </DialogContent>
    </Dialog>
  );
}
