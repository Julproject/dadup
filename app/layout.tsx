import type { Metadata } from 'next';

export const metadata: Metadata = {
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
  },
  twitter: {
    card: 'summary_large_image',
    title: "DadUp : l'application grossesse pour les papas",
    description: "DadUp accompagne les futurs pères semaine par semaine pendant la grossesse et la première année de bébé.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e2535" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
