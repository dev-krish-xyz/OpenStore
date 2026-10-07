import { Geist, Geist_Mono } from 'next/font/google';
import '../styles.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  title: 'OpenStore — The best of open source all in one place.',
  description: 'Discover thoughtfully curated open-source alternatives to the apps you use every day.',
  verification: {
    google: 'nwGXZmd3ChjtA1lgLJD-pDexIkb5lH-P4QFoUviZuW8',
  },
  icons: {
    icon: [{ url: '/assets/favicon.svg?v=2', type: 'image/svg+xml', sizes: 'any' }],
    shortcut: ['/assets/favicon.svg?v=2'],
    apple: [{ url: '/assets/logo.png', type: 'image/png', sizes: '1254x1254' }],
  },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return <html lang="en" data-theme="dark" className={`${sans.variable} ${mono.variable}`}><body>{children}</body></html>;
}
