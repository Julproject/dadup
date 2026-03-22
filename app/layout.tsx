import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DadUp — Checklist PDF pour futurs papas',
  description: 'Ta checklist PDF premium personnalisée. 15 pages. Générée en 10 secondes.',
  manifest: '/manifest.json',
  themeColor: '#0A0F1E',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DadUp',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    apple: '/icons/icon-192.png',
  },
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
      </head>
      <body>{children}</body>
    </html>
  )
}
