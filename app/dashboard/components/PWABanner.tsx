'use client';

import { useState, useEffect } from 'react';

const C = {
  dark: '#1e2535', gold: '#c8a060', blue: '#2E5F8A',
  white: '#ffffff', textLight: '#6a7585',
};

export default function PWABanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('dadup_pwa_dismissed');
    if (isIOS && !isStandalone && !dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem('dadup_pwa_dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '16px', left: '16px', right: '16px',
      background: C.dark, borderRadius: '20px', padding: '16px 20px',
      display: 'flex', alignItems: 'flex-start', gap: '14px',
      zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      maxWidth: '480px', margin: '0 auto',
    }}>
      <svg viewBox="0 0 300 300" width="40" height="40" style={{ flexShrink: 0, marginTop: '2px' }}>
        <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
        <circle cx="150" cy="150" r="122" fill="#4a6080"/>
        <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
        <circle cx="150" cy="112" r="40" fill="#c8a060"/>
        <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
        <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
      </svg>

      <div style={{ flex: 1 }}>
        <p style={{ color: C.white, fontSize: '14px', fontWeight: 700, margin: '0 0 8px' }}>
          Installe DadUp sur ton iPhone
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[
            <>Clique sur <span style={{ color: C.gold }}>Partager</span> en bas de Safari</>,
            <><span style={{ color: C.gold }}>"Sur l'écran d'accueil"</span></>,
            <>Clique <span style={{ color: C.gold }}>"Ajouter"</span></>,
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%',
                background: C.blue, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '10px', fontWeight: 700,
                color: C.white, flexShrink: 0,
              }}>{i + 1}</div>
              <span style={{ color: C.textLight, fontSize: '12px', lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={dismiss}
        style={{
          background: 'none', border: 'none', color: C.textLight,
          fontSize: '18px', cursor: 'pointer', padding: '0', lineHeight: 1,
          flexShrink: 0,
        }}
      >✕</button>
    </div>
  );
}
