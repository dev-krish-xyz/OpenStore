'use client';

import { Toaster as Sonner } from 'sonner';

export { toast } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      offset={24}
      mobileOffset={{ bottom: 'calc(88px + env(safe-area-inset-bottom))' }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm text-on-primary shadow-panel',
        },
      }}
    />
  );
}
