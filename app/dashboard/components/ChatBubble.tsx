'use client';
import { useState, useEffect, useRef } from 'react';

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [cache, setCache] = useState(false);
  const dernierY = useRef(0);

  // Se range quand on fait défiler vers le bas, revient quand on remonte
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - dernierY.current) < 8) return;
      setCache(y > dernierY.current && y > 120);
      dernierY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const send = async () => {
    if (!msg.trim()) return;
    setLoading(true);
    setErreur(false);
    try {
      let userEmail = typeof window !== 'undefined' ? localStorage.getItem('dadup_email') || '' : '';
      const prenom = typeof window !== 'undefined' ? localStorage.getItem('dadup_prenom') || '' : '';
      if (!userEmail) {
        const meRes = await fetch('/api/auth/me');
        const meData = await meRes.json();
        userEmail = meData?.user?.email || 'hello@dadup.fr';
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          sujet: prenom ? 'Message app de ' + prenom : 'Message app',
          message: msg,
        }),
      });
      if (res.ok) setSent(true);
      else setErreur(true);
    } catch {
      setErreur(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dd-chat" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999, fontFamily: 'inherit', transition: 'transform .25s ease, opacity .25s ease', transform: cache && !open ? 'translateY(140px)' : 'none', opacity: cache && !open ? 0 : 1, pointerEvents: cache && !open ? 'none' : 'auto' }}>
      <style>{`@media(max-width:860px){.dd-chat{bottom:calc(84px + env(safe-area-inset-bottom))!important;right:16px!important;}}`}</style>

      {/* Panneau ouvert */}
      {open && (
        <div style={{ marginBottom: '12px', background: '#fff', borderRadius: '16px', border: '1px solid #e8e0d0', width: '300px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>

          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#0a1f32,#1A3D5C)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: 700, margin: 0 }}>Une question ?</p>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '12px', margin: '2px 0 0' }}>On répond en moins de 24h</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fermer" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#56616B', fontSize: '22px', lineHeight: 1, padding: 0, width: '44px', height: '44px', margin: '-12px -12px -12px 0' }}>×</button>
          </div>

          {/* Corps */}
          <div style={{ padding: '16px 20px 20px' }}>
            {!sent ? (
              <>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Ton message…"
                  aria-label="Ton message"
                  rows={4}
                  style={{ width: '100%', background: '#F6F1E9', border: '1px solid #e8e0d0', borderRadius: '10px', padding: '10px 12px', fontSize: '16px', color: '#15263A', resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
                <button
                  onClick={send}
                  disabled={loading || !msg.trim()}
                  style={{ marginTop: '10px', width: '100%', background: '#B4593A', color: '#ffffff', border: 'none', minHeight: '48px', padding: '12px', borderRadius: '14px', fontSize: '14px', fontWeight: 700, cursor: msg.trim() ? 'pointer' : 'not-allowed', opacity: msg.trim() ? 1 : 0.5, boxShadow: '0 4px 12px rgba(157,176,154,0.35)' }}
                >
                  {loading ? 'Envoi…' : 'Envoyer'}
                </button>
                {erreur && <p role="alert" style={{ color: '#B42318', fontSize: '13px', lineHeight: 1.5, margin: '10px 0 0' }}>Le message n’est pas parti. Réessaie, ou écris-nous à hello@dadup.fr.</p>}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#0a1f32,#1A3D5C)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 4px 16px rgba(26,61,92,0.3)' }}>
                  <span style={{ color: '#C9D8C4', fontSize: '20px', fontWeight: 800 }}>✓</span>
                </div>
                <p style={{ color: '#1e2535', fontSize: '14px', fontWeight: 800, margin: '0 0 4px' }}>Message reçu</p>
                <p style={{ color: '#56616B', fontSize: '12px', margin: 0 }}>On te répond en moins de 24h</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulle */}
      <button
        onClick={() => { setOpen(!open); if (sent) { setSent(false); setMsg(''); } }}
        aria-label={open ? 'Fermer la discussion' : 'Nous écrire'}
        aria-expanded={open}
        style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg,#0a1f32,#1A3D5C)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(26,61,92,0.4), 0 0 0 3px rgba(157,176,154,0.2)', transition: 'transform 0.15s', marginLeft: 'auto' }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

    </div>
  );
}
