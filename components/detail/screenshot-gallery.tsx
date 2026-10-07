'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export function ScreenshotGallery({ screens }: { screens: [file: string, alt: string][] }) {
  const [active, setActive] = useState<[string, string] | null>(null);
  return (
    <>
      <div className="screenshot-gallery">
        {screens.map(([file, alt]) => (
          <button key={file} className="screenshot-button" onClick={() => setActive([file, alt])} aria-label={`Expand ${alt}`}>
            <img src={`/assets/${file}`} alt={alt} width={1000} height={550} />
          </button>
        ))}
      </div>
      <Dialog open={active !== null} onOpenChange={open => { if (!open) setActive(null); }}>
        <DialogContent closeLabel="Close screenshot" aria-describedby={undefined} className="max-w-[1100px] p-5">
          <DialogTitle className="sr-only">{active?.[1]}</DialogTitle>
          {active && (
            <>
              <img src={`/assets/${active[0]}`} alt={active[1]} className="mt-5 max-h-[78vh] w-full object-contain" />
              <p className="pt-3 text-center text-xs text-muted">{active[1]}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
