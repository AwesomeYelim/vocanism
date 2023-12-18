import { DetectSound } from './detect-sound'

// export const metadata: Metadata = {
//   title: {
//     template: '%s | vocanism',
//     default: 'vocanism',
//   },
//   description: 'Develop about something Soft and Simple.',
//   openGraph: {
//     images: [
//       'https://user-images.githubusercontent.com/65283190/262039301-7ca908de-e523-478e-b0af-b70665dd7703.jpg',
//     ],
//     locale: 'ko_KR',
//   },
//   icons: {
//     shortcut: '/favicon.ico',
//   },
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: '#ffffff' },
//     { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
//   ],
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//     },
//   },
//   alternates: {
//     canonical: siteConfig.url,
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <DetectSound>{children}</DetectSound>
      </body>
    </html>
  )
}
