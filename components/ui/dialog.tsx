'use client';

import type { ComponentProps } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className, children, closeLabel = 'Close', ...props }: ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay data-slot="dialog-overlay" className="fixed inset-0 z-50 bg-overlay" />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-[calc(100%-32px)] max-w-[480px] max-h-[calc(100dvh-48px)] -translate-x-1/2 -translate-y-1/2 overflow-auto',
          'rounded-[14px] border border-border bg-surface p-7 text-foreground shadow-panel outline-none',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="icon-button absolute top-3 right-3 text-[22px] leading-none" aria-label={closeLabel}>×</DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn('mt-1 mb-2 text-xl leading-[1.3] font-semibold tracking-[-0.02em]', className)} {...props} />;
}

export function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn('text-sm text-muted', className)} {...props} />;
}
