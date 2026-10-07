'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Keeps links from the old single-page app (/#/app/opencode) working after the move to real routes. */
export function HashRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (window.location.hash.startsWith('#/')) router.replace(window.location.hash.slice(1));
  }, [router]);
  return null;
}
