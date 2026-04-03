'use client';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', blueDark: '#1A3D5C',
  orange: '#FFF0E6', orangeDark: '#C04A1A',
};

export default function PaiementAnnulePage() {

  const goToStripe = async () => {
    try {
      const res  = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      window.location.href = '/tarifs';
    }
  };

  return (
    <main style={{
      minHeight: '100vh', background: C.cream,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>

        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <svg viewBox="0 0 300 300" width="56" height="56" style={{ margin: '0 auto', display: 'block' }}>
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
        </div>

        <div style={{ background: C.white, borderRadius: '28px', padding: '40px 36px', border: `1px solid ${C.border}`, boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>

          {/* Icone */}
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.orangeDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>

          <h1 style={{ color: C.dark, fontSize: '22px', fontWeight: 900, margin: '0 0 12px' }}>
            Paiement non finalisé
          </h1>

          <p style={{ color: C.text, fontSize: '15px', lineHeight: 1.7, margin: '0 0 28px' }}>
            Ton paiement n'a pas abouti. Aucun montant n'a été débité. Tu peux réessayer quand tu veux.
          </p>

          {/* Causes fréquentes */}
          <div style={{ background: C.cream, borderRadius: '16px', padding: '20px', marginBottom: '28px', textAlign: 'left' }}>
            <p style={{ color: C.dark, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px' }}>Causes fréquentes</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Fonds insuffisants sur la carte',
                'Carte expirée ou informations incorrectes',
                'Paiement bloqué par ta banque (3D Secure)',
                'Session expirée',
              ].map((cause, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.textLight, flexShrink: 0 }} />
                  <p style={{ color: C.text, fontSize: '13px', margin: 0 }}>{cause}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA principal */}
          <button
            onClick={goToStripe}
            style={{ display: 'block', width: '100%', background: C.dark, color: C.white, border: 'none', padding: '15px', borderRadius: '32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', marginBottom: '12px' }}
          >
            Réessayer le paiement
          </button>

          <a
            href="/tarifs"
            style={{ display: 'block', color: C.textLight, fontSize: '13px', textDecoration: 'none', padding: '8px' }}
          >
            Retour aux tarifs
          </a>

        </div>

        <p style={{ color: C.textLight, fontSize: '13px', marginTop: '20px', lineHeight: 1.6 }}>
          Un problème persistant ?{' '}
          <a href="/contact" style={{ color: C.blue, fontWeight: 600, textDecoration: 'none' }}>Contacte-nous</a>
        </p>

      </div>
    </main>
  );
}
