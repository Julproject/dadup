import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DadUp, L\'app des futurs papas',
  description: 'Suivi semaine par semaine, guide accouchement, post-partum. Tout ce que personne n\'explique aux papas. Accès immédiat.',
  keywords: ['futur papa', 'grossesse papa', 'application papa', 'accouchement', 'post-partum', 'paternité', 'congé paternité'],
  authors: [{ name: 'DadUp' }],
  openGraph: {
    title: 'DadUp, L\'app des futurs papas',
    description: 'Suivi semaine par semaine, guide accouchement, post-partum. Tout ce que personne n\'explique aux papas.',
    url: 'https://dadup.fr',
    siteName: 'DadUp',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DadUp, L\'app des futurs papas',
    description: 'Suivi semaine par semaine, guide accouchement, post-partum.',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DadUp',
  },
  icons: {
    apple: '/icons/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1A3D5C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script async src="https://plausible.io/js/pa-U2q0xAP60M_HinI3KqUL9.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
