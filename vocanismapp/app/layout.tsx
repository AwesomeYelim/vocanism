import type { Metadata } from 'next';
import { DetectSound } from '~/components/detect-sound';
import Recoil from '~/components/recoil-comp';
import siteConfig from '~/libs/site-config';
import { Providers } from './providers';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | vocanism',
    default: 'vocanism',
  },
  description: 'Develop about something Soft and Simple.',
  openGraph: {
    images: [''],
    locale: 'ko_KR',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        {/* <Providers> */}
        <div className="blur-layer" aria-hidden="true"></div>
        <div className="container mx-auto max-w-page py-page">
          <div className="main-grid">
            <Recoil>
              <DetectSound>{children}</DetectSound>
            </Recoil>
          </div>
        </div>
        {/* </Providers> */}
      </body>
    </html>
  );
}
