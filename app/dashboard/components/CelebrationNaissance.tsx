'use client';
import { useEffect } from 'react';

interface Props {
  prenom: string;
  onClose: () => void;
}

export default function CelebrationNaissance({ prenom, onClose }: Props) {

  useEffect(() => {
    localStorage.setItem('dadup_celebration_vue', '1');
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      padding: '20px',
    }}>
      <div style={{
        background: '#faf6f0', borderRadius: '20px',
        padding: '48px 40px', maxWidth: '420px', width: '100%',
        textAlign: 'center', border: '1px solid #e8e0d0',
      }}>

        <p style={{ color: '#9aa0a8', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>
          Félicitations
        </p>

        <h2 style={{ color: '#c8a060', fontSize: '42px', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.15 }}>
          Tu es papa !
        </h2>

        <p style={{ color: '#1e2535', fontSize: '18px', fontWeight: 700, margin: '0 0 20px', lineHeight: 1.5 }}>
          Bienvenue dans la plus belle aventure de ta vie.
        </p>

        <p style={{ color: '#6a7585', fontSize: '14px', lineHeight: 1.8, margin: '0 0 32px' }}>
          Tout ce que tu as préparé ces derniers mois, c&apos;était pour ce moment. Tu es prêt, même si tu ne le sens pas encore.
        </p>

        <div style={{ background: '#E6F0FA', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
          <p style={{ color: '#2E5F8A', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>
            Ce qui t&apos;attend
          </p>
          <p style={{ color: '#1A3D5C', fontSize: '16px', fontWeight: 700, margin: 0 }}>
            La première année de bébé
          </p>
        </div>

        <button
          onClick={onClose}
          style={{ background: '#1e2535', color: '#ffffff', border: 'none', padding: '16px 40px', borderRadius: '32px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', width: '100%' }}
        >
          Découvrir le premier mois
        </button>

      </div>
    </div>
  );
}
