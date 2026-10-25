'use client';

import { useEffect, useRef, useState } from 'react';

const C = {
  dark: '#15263A', terra: '#B4593A', cream: '#F6F1E9', white: '#ffffff',
  border: '#E6E0D5', text: '#15263A', textLight: '#56616B',
  blue: '#1A3D5C', alerte: '#B42318',
};

const FOCUSABLES = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');
  const fenetre = useRef<HTMLDivElement>(null);
  const fermer = useRef<HTMLButtonElement>(null);

  // Ouverture : focus dans la fenêtre, page derrière figée. Fermeture : retour au bouton d'origine.
  useEffect(() => {
    const declencheur = document.activeElement as HTMLElement | null;
    const ancienOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    fermer.current?.focus();
    return () => {
      document.body.style.overflow = ancienOverflow;
      declencheur?.focus?.();
    };
  }, []);

  // Échap ferme ; Tab reste dans la fenêtre
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab' || !fenetre.current) return;
      const els = Array.from(fenetre.current.querySelectorAll<HTMLElement>(FOCUSABLES));
      if (els.length === 0) return;
      const premier = els[0], dernier = els[els.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const goToStripe = async () => {
    if (!accepted || loading) return;
    setLoading(true);
    setErreur('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) { window.location.href = data.url; return; }
      throw new Error('checkout');
    } catch {
      setErreur("Le paiement n'a pas pu démarrer. Réessaie dans un instant.");
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        zIndex: 1000, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '12px',
      }}
    >
      <style>{`
        .co-fenetre{padding:0 40px 32px;}
        .co-entete{padding:32px 0 20px;}
        @media(max-width:480px){.co-fenetre{padding:0 20px 20px;}.co-entete{padding:20px 0 16px;}}
      `}</style>
      <div
        ref={fenetre}
        role="dialog"
        aria-modal="true"
        aria-labelledby="co-titre"
        aria-describedby="co-prix"
        className="co-fenetre"
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white, borderRadius: '14px',
          width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          maxHeight: 'calc(100dvh - 24px)', overflowY: 'auto', overscrollBehavior: 'contain',
        }}
      >
        {/* En-tête : reste visible quand le contenu défile */}
        <div className="co-entete" style={{ position: 'sticky', top: 0, background: C.white, zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <div>
            <p id="co-titre" style={{ color: C.textLight, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px', lineHeight: 1.4 }}>Accès jusqu&apos;au 1er anniversaire de bébé</p>
            <p id="co-prix" style={{ color: C.dark, fontSize: '36px', fontWeight: 800, margin: 0, lineHeight: 1 }}>49,99€</p>
            <p style={{ color: C.textLight, fontSize: '13px', margin: '4px 0 0' }}>paiement unique · sans renouvellement</p>
          </div>
          <button
            ref={fermer}
            onClick={onClose}
            aria-label="Fermer"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textLight, fontSize: '20px', lineHeight: 1, width: '44px', height: '44px', margin: '-10px -12px 0 0', flexShrink: 0 }}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Ce qui est inclus */}
        <div style={{ background: C.cream, borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: C.dark, fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Inclus</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}>
            {[
              'Suivi bébé de la SA 3 à la SA 41',
              'Calendrier des rendez-vous personnalisé',
              'Guide accouchement et valise maternité',
              'Mode post-partum et 1ère année bébé',
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span aria-hidden="true" style={{ color: C.terra, fontSize: '13px', flexShrink: 0 }}>✓</span>
                <span style={{ color: C.text, fontSize: '13px', lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Case CGV */}
        <label style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer', marginBottom: '24px' }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
            style={{ marginTop: '2px', width: '18px', height: '18px', flexShrink: 0, cursor: 'pointer', accentColor: C.dark }}
          />
          <span style={{ color: C.text, fontSize: '13px', lineHeight: 1.6 }}>
            J&apos;ai lu et j&apos;accepte les{' '}
            <a href="/cgv" target="_blank" rel="noopener" style={{ color: C.blue, fontWeight: 600, textDecoration: 'none' }}>
              Conditions Générales de Vente
            </a>
            . Je comprends que l&apos;accès court jusqu&apos;au 1er anniversaire de bébé, sans renouvellement automatique.
          </span>
        </label>

        {/* Bouton paiement */}
        <button
          onClick={goToStripe}
          disabled={!accepted || loading}
          style={{
            width: '100%', background: accepted ? C.terra : '#d0c8bc',
            color: accepted ? '#ffffff' : '#6b6560',
            border: 'none', padding: '16px', borderRadius: '14px',
            fontSize: '15px', fontWeight: 800, cursor: accepted ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s', marginBottom: '12px', minHeight: '52px',
          }}
        >
          {loading ? 'Redirection...' : 'Payer 49,99€'}
        </button>

        {erreur && (
          <p role="alert" style={{ color: C.alerte, fontSize: '13px', fontWeight: 700, textAlign: 'center', margin: '0 0 10px', lineHeight: 1.5 }}>{erreur}</p>
        )}

        <p style={{ color: C.textLight, fontSize: '12px', textAlign: 'center', margin: 0 }}>
          Paiement sécurisé par Stripe
        </p>
        <p style={{ color: C.textLight, fontSize: '12px', textAlign: 'center', margin: '4px 0 0' }}>Satisfait ou remboursé sous 14 jours.</p>
      </div>
    </div>
  );
}
