import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/manrope';
import './globals.css';

// viewport-fit=cover : indispensable sur iPhone pour que env(safe-area-inset-*) renvoie la vraie
// hauteur de la barre d'accueil (sinon 0, et la barre du bas de l'app passe dessous).
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F6F1E9',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dadup.fr'),
  applicationName: 'DadUp',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'DadUp', statusBarStyle: 'default' },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/favicon-96.png?v=2', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=2', sizes: '180x180' }],
    shortcut: [{ url: '/favicon.ico?v=2' }],
  },
  verification: {
    google: 'UYNGp5GswFiXJc6l-VEwhnLifvDt-60HZMmU7mv_Nns',
  },
  title: "DadUp : l'application grossesse pour les papas",
  description: "DadUp accompagne les futurs pères semaine par semaine pendant la grossesse et la première année de bébé. Contenu médical, guide accouchement, congé paternité. 49,99€ accès complet.",
  keywords: [
    'dadup',
    'futur papa',
    'papa grossesse',
    'application papa grossesse',
    'app futur papa',
    'grossesse semaine par semaine',
    'guide accouchement papa',
    'congé paternité',
    'post-partum papa',
    'devenir papa',
    'préparation naissance papa',
    'suivi grossesse père',
    'premier mois bébé papa',
    'baby blues papa',
    'paternité',
    'cours accouchement papa',
    'première année bébé',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.dadup.fr' },
  authors: [{ name: 'DadUp' }],
  openGraph: {
    title: "DadUp : l'application grossesse pour les papas",
    description: "DadUp accompagne les futurs pères semaine par semaine pendant la grossesse et la première année de bébé.",
    url: 'https://www.dadup.fr',
    siteName: 'DadUp',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DadUp, à deux dès le premier jour' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
    title: "DadUp : l'application grossesse pour les papas",
    description: "DadUp accompagne les futurs pères semaine par semaine pendant la grossesse et la première année de bébé.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
