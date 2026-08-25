'use client';

import { useState, useEffect } from 'react';

const C = {
  dark: '#1e2535', gold: '#c8a060', blue: '#2E5F8A',
  white: '#ffffff', textLight: '#6a7585',
};

export default function PWABanner() {
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const isIOSDevice = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('dadup_pwa_dismissed');
    const visitCount = parseInt(localStorage.getItem('dadup_visit_count') || '0') + 1;
    localStorage.setItem('dadup_visit_count', String(visitCount));

    setIsIOS(isIOSDevice);

    // Afficher après la 2ème visite uniquement
    if (isStandalone || dismissed || visitCount < 2) return;

    if (isIOSDevice) {
      setVisible(true);
    }

    // Android : écouter l'event beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const dismiss = () => {
    localStorage.setItem('dadup_pwa_dismissed', '1');
    setVisible(false);
  };

  const installAndroid = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem('dadup_pwa_dismissed', '1');
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '80px', left: '16px', right: '16px',
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
        <p style={{ color: C.white, fontSize: '14px', fontWeight: 700, margin: '0 0 6px' }}>
          Ajoute DadUp à ton écran d&apos;accueil
        </p>
        <p style={{ color: C.textLight, fontSize: '12px', margin: '0 0 10px', lineHeight: 1.5 }}>
          Accède à DadUp en un tap, comme une vraie app.
        </p>

        {!isIOS && deferredPrompt ? (
          <button
            onClick={installAndroid}
            style={{ background: C.gold, color: '#1c1510', border: 'none', padding: '8px 20px', borderRadius: '32px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
          >
            Installer
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {[
              <>Appuie sur <span style={{ color: C.gold }}>Partager</span> en bas de Safari</>,
              <>Choisis <span style={{ color: C.gold }}>Sur l&apos;écran d&apos;accueil</span></>,
              <>Appuie sur <span style={{ color: C.gold }}>Ajouter</span></>,
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
        )}
      </div>

      <button
        onClick={dismiss}
        style={{ background: 'none', border: 'none', color: C.textLight, fontSize: '18px', cursor: 'pointer', padding: '0', lineHeight: 1, flexShrink: 0 }}
      >✕</button>
    </div>
  );
}
