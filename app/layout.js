import '../styles.css';

export const metadata = {
  title: 'OpenStore — The best of open source all in one place.',
  description: 'Discover thoughtfully curated open-source alternatives to the apps you use every day.',
  icons: { icon: '/assets/favicon.svg' },
};

export default function RootLayout({ children }) {
  return <html lang="en" data-theme="light"><body>{children}</body></html>;
}
