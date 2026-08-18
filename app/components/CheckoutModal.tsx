'use client';

import { useState } from 'react';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', blueDark: '#1A3D5C',
};

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const goToStripe = async () => {
    if (!accepted) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        zIndex: 1000, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white, borderRadius: '24px', padding: '40px',
          width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <p style={{ color: C.textLight, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px' }}>Accès annuel complet</p>
            <p style={{ color: C.dark, fontSize: '36px', fontWeight: 800, margin: 0, lineHeight: 1 }}>35,99€</p>
            <p style={{ color: C.textLight, fontSize: '13px', margin: '4px 0 0' }}>par an · paiement unique</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textLight, fontSize: '20px', padding: '4px', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Ce qui est inclus */}
        <div style={{ background: C.cream, borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: C.dark, fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Inclus</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Suivi bébé de la SA 3 à la SA 41',
              'Calendrier des rendez-vous personnalisé',
              'Guide accouchement et valise maternité',
              'Mode post-partum et 1ère année bébé',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: C.gold, fontSize: '13px', flexShrink: 0 }}>✓</span>
                <p style={{ color: C.text, fontSize: '13px', margin: 0, lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case CGV */}
        <label
          style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer', marginBottom: '24px' }}
        >
          <input
            type="checkbox"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
            style={{ marginTop: '2px', width: '16px', height: '16px', flexShrink: 0, cursor: 'pointer', accentColor: C.dark }}
          />
          <span style={{ color: C.text, fontSize: '13px', lineHeight: 1.6 }}>
            J&apos;ai lu et j&apos;accepte les{' '}
            <a href="/cgv" target="_blank" style={{ color: C.blue, fontWeight: 600, textDecoration: 'none' }}>
              Conditions Générales de Vente
            </a>
            . Je comprends que l&apos;accès est valable 12 mois sans renouvellement automatique.
          </span>
        </label>

        {/* Bouton paiement */}
        <button
          onClick={goToStripe}
          disabled={!accepted || loading}
          style={{
            width: '100%', background: accepted ? C.gold : '#d0c8bc',
            color: accepted ? '#1c1510' : '#a09890',
            border: 'none', padding: '16px', borderRadius: '32px',
            fontSize: '15px', fontWeight: 800, cursor: accepted ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s', marginBottom: '12px',
          }}
        >
          {loading ? 'Redirection...' : 'Payer 35,99€'}
        </button>

        <p style={{ color: C.textLight, fontSize: '12px', textAlign: 'center', margin: 0 }}>
          Paiement sécurisé par Stripe
        </p>
        <p style={{ color: C.textLight, fontSize: '12px', textAlign: 'center', margin: '4px 0 0' }}>Satisfait ou remboursé sous 14 jours.</p>
      </div>
    </div>
  );
}
