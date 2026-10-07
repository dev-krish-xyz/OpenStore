import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { CommandMenuProvider } from '@/components/site/command-menu';
import { HashRedirect } from '@/components/site/hash-redirect';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { themeScript } from '@/components/site/theme-toggle';
import { Toaster } from '@/components/ui/sonner';
import { searchEntries, snapshotDates } from '@/lib/catalog';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'OpenStore — The best of open source all in one place.', template: '%s — OpenStore' },
  description: 'Discover thoughtfully curated open-source alternatives to the apps you use every day.',
  verification: { google: 'nwGXZmd3ChjtA1lgLJD-pDexIkb5lH-P4QFoUviZuW8' },
  icons: {
    icon: [{ url: '/assets/favicon.svg?v=3', type: 'image/svg+xml', sizes: 'any' }],
    shortcut: ['/assets/favicon.svg?v=3'],
    apple: [{ url: '/assets/logo.png', type: 'image/png', sizes: '1254x1254' }],
  },
};

export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <CommandMenuProvider entries={searchEntries}>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter snapshotDate={snapshotDates.repositories} />
        </CommandMenuProvider>
        <Toaster />
        <HashRedirect />
      </body>
    </html>
  );
}
