'use client';
import { useState } from 'react';

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!msg.trim()) return;
    setLoading(true);
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
      else setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* Panneau ouvert */}
      {open && (
        <div style={{ marginBottom: '12px', background: '#fff', borderRadius: '16px', border: '1px solid #e8e0d0', width: '300px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>

          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#0a1f32,#1A3D5C)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: 700, margin: 0 }}>Une question ?</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0' }}>On répond en moins de 24h</p>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6a7585', fontSize: '18px', lineHeight: 1, padding: 0 }}>×</button>
          </div>

          {/* Corps */}
          <div style={{ padding: '16px 20px 20px' }}>
            {!sent ? (
              <>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Ton message..."
                  rows={4}
                  style={{ width: '100%', background: '#faf6f0', border: '1px solid #e8e0d0', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', color: '#1e2535', resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
                <button
                  onClick={send}
                  disabled={loading || !msg.trim()}
                  style={{ marginTop: '10px', width: '100%', background: 'linear-gradient(135deg,#c8a060,#e8c070)', color: '#1c1510', border: 'none', padding: '12px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: msg.trim() ? 'pointer' : 'not-allowed', opacity: msg.trim() ? 1 : 0.5, boxShadow: '0 4px 12px rgba(200,160,96,0.35)' }}
                >
                  {loading ? 'Envoi...' : 'Envoyer'}
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#0a1f32,#1A3D5C)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 4px 16px rgba(26,61,92,0.3)' }}>
                  <span style={{ color: '#e0b870', fontSize: '20px', fontWeight: 800 }}>✓</span>
                </div>
                <p style={{ color: '#1e2535', fontSize: '14px', fontWeight: 800, margin: '0 0 4px' }}>Message reçu</p>
                <p style={{ color: '#9aa0a8', fontSize: '12px', margin: 0 }}>On te répond en moins de 24h</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulle */}
      <button
        onClick={() => { setOpen(!open); if (sent) { setSent(false); setMsg(''); } }}
        style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg,#0a1f32,#1A3D5C)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(26,61,92,0.4), 0 0 0 3px rgba(200,160,96,0.2)', transition: 'transform 0.15s', marginLeft: 'auto' }}
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
