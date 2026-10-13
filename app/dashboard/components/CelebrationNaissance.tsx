'use client';
import { useEffect } from 'react';

interface Props {
  prenom: string;
  onClose: () => void;
}

const NAVY = '#15263A';
const NAVY_GRAD = 'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)';

export default function CelebrationNaissance({ prenom, onClose }: Props) {

  useEffect(() => {
    try { localStorage.setItem('dadup_celebration_vue', '1'); } catch {}
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="celebration-titre" style={{
      position: 'fixed', inset: 0, zIndex: 1600,
      background: 'rgba(12,29,46,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: '#F6F1E9', borderRadius: '24px', overflow: 'hidden',
        maxWidth: '420px', width: '100%', textAlign: 'center',
        boxShadow: '0 20px 60px rgba(12,29,46,0.35)',
      }}>

        {/* BANDEAU BLEU NUIT */}
        <div style={{ background: NAVY_GRAD, padding: '36px 28px 30px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DCE5D7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
            </svg>
          </div>
          <p style={{ color: '#C9D8C4', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>
            Félicitations{prenom ? ` ${prenom}` : ''}
          </p>
          <h2 id="celebration-titre" style={{ color: '#ffffff', fontSize: '38px', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-1px' }}>
            Tu es papa
          </h2>
        </div>

        <div style={{ padding: '28px' }}>
          <p style={{ color: NAVY, fontSize: '18px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.4 }}>
            Bienvenue dans la plus belle aventure de ta vie.
          </p>
          <p style={{ color: '#56616B', fontSize: '14px', lineHeight: 1.8, margin: '0 0 24px' }}>
            Tout ce que tu as préparé ces derniers mois, c&apos;était pour ce moment. Tu es prêt, même si tu ne le sens pas encore.
          </p>

          <div style={{ background: '#DCE5D7', border: '1px solid #C9D8C4', borderRadius: '16px', padding: '16px', marginBottom: '22px' }}>
            <p style={{ color: '#2F4F3E', fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: '0 0 6px' }}>
              Ce qui t&apos;attend
            </p>
            <p style={{ color: NAVY, fontSize: '16px', fontWeight: 800, margin: 0 }}>
              La première année de bébé, mois par mois
            </p>
          </div>

          <button
            onClick={onClose}
            autoFocus
            style={{ background: NAVY_GRAD, color: '#ffffff', border: 'none', minHeight: '52px', padding: '14px 24px', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', width: '100%' }}
          >
            Découvrir le premier mois
          </button>
        </div>

      </div>
    </div>
  );
}
