import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf6f0', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <svg viewBox="0 0 300 300" width="64" height="64">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
        </div>

        <p style={{ color: '#2E5F8A', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>Erreur 404</p>
        <h1 style={{ color: '#1e2535', fontSize: '36px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>Cette page n'existe pas.</h1>
        <p style={{ color: '#9aa0a8', fontSize: '16px', lineHeight: 1.7, margin: '0 0 40px' }}>Tu t'es perdu en chemin. Pas de panique, retourne à l'accueil.</p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{ background: '#1e2535', color: '#ffffff', padding: '14px 28px', borderRadius: '32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/login"
            style={{ background: 'transparent', color: '#1e2535', padding: '14px 28px', borderRadius: '32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', border: '1px solid #e8e0d0', display: 'inline-block' }}
          >
            Se connecter
          </Link>
        </div>

      </div>
    </main>
  );
}
