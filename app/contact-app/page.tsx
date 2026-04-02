'use client';

import { useState } from 'react';

const C = {
  dark: '#1e2535', gold: '#c8a060', cream: '#faf6f0', white: '#ffffff',
  border: '#e8e0d0', text: '#4a5568', textLight: '#9aa0a8',
  blue: '#2E5F8A', bluePale: '#E6F0FA', blueDark: '#1A3D5C',
  green: '#E4F5EC', greenDark: '#0D6B40',
};

const SUJETS = [
  'Mon accès ne fonctionne pas',
  'Je n\'arrive pas à me connecter',
  'Question sur le contenu',
  'Problème de paiement',
  'Suggestion ou retour',
  'Autre',
];

export default function ContactPage() {
  const [prenom, setPrenom]   = useState('');
  const [email, setEmail]     = useState('');
  const [sujet, setSujet]     = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !sujet || !message) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, email, sujet, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setSent(true);
    } catch (err: any) {
      setError('Une erreur est survenue. Réessaie ou écris-nous à hello@dadup.fr');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{minHeight:'100vh', background:C.cream, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", display:'flex', flexDirection:'column'}}>

      {/* NAV app — retour dashboard uniquement */}
      <nav style={{background:C.white, borderBottom:`1px solid ${C.border}`, padding:'0 28px', display:'flex', alignItems:'center', height:'60px'}}>
        <a href="/dashboard" style={{display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', color:C.textLight, fontSize:'14px', fontWeight:600}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Retour à mon espace
        </a>
      </nav>

      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 20px'}}>
        <div style={{width:'100%', maxWidth:'560px'}}>

          {sent ? (
            /* Message de confirmation */
            <div style={{background:C.white, borderRadius:'28px', padding:'48px 40px', textAlign:'center', border:`1px solid ${C.border}`, boxShadow:'0 4px 32px rgba(0,0,0,0.06)'}}>
              <div style={{width:'64px', height:'64px', borderRadius:'50%', background:C.green, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px'}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.greenDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h1 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:'0 0 12px'}}>Message envoyé !</h1>
              <p style={{color:C.text, fontSize:'15px', lineHeight:1.7, margin:'0 0 32px'}}>
                On te répond en général sous 24h, souvent bien moins. Tu recevras la réponse sur <strong>{email}</strong>.
              </p>
              <a href="/" style={{display:'inline-block', background:C.dark, color:C.white, padding:'13px 32px', borderRadius:'32px', fontSize:'14px', fontWeight:700, textDecoration:'none'}}>
                Retour à l'accueil
              </a>
            </div>

          ) : (
            /* Formulaire */
            <div>
              {/* En-tête */}
              <div style={{textAlign:'center', marginBottom:'32px'}}>
                <p style={{color:C.blue, fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px'}}>Support</p>
                <h1 style={{color:C.dark, fontSize:'32px', fontWeight:800, margin:'0 0 12px'}}>On est là.</h1>
                <p style={{color:C.textLight, fontSize:'15px', margin:0, lineHeight:1.6}}>
                  Un problème, une question, une idée. On répond sous 24h.
                </p>
              </div>



              {/* Formulaire */}
              <div style={{background:C.white, borderRadius:'24px', padding:'36px', border:`1px solid ${C.border}`, boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'18px'}}>

                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                    <div>
                      <label style={{display:'block', color:C.dark, fontSize:'12px', fontWeight:700, marginBottom:'7px', letterSpacing:'0.3px'}}>Prénom</label>
                      <input
                        type="text"
                        value={prenom}
                        onChange={e => setPrenom(e.target.value)}
                        placeholder="Thomas"
                        style={{width:'100%', background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:'12px', padding:'11px 14px', fontSize:'14px', color:C.dark, outline:'none', boxSizing:'border-box'}}
                        onFocus={e => e.target.style.borderColor = C.blue}
                        onBlur={e => e.target.style.borderColor = C.border}
                      />
                    </div>
                    <div>
                      <label style={{display:'block', color:C.dark, fontSize:'12px', fontWeight:700, marginBottom:'7px', letterSpacing:'0.3px'}}>Email <span style={{color:'#C04A1A'}}>*</span></label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="ton@email.fr"
                        required
                        style={{width:'100%', background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:'12px', padding:'11px 14px', fontSize:'14px', color:C.dark, outline:'none', boxSizing:'border-box'}}
                        onFocus={e => e.target.style.borderColor = C.blue}
                        onBlur={e => e.target.style.borderColor = C.border}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{display:'block', color:C.dark, fontSize:'12px', fontWeight:700, marginBottom:'7px', letterSpacing:'0.3px'}}>Sujet <span style={{color:'#C04A1A'}}>*</span></label>
                    <select
                      value={sujet}
                      onChange={e => setSujet(e.target.value)}
                      required
                      style={{width:'100%', background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:'12px', padding:'11px 14px', fontSize:'14px', color: sujet ? C.dark : C.textLight, outline:'none', cursor:'pointer', appearance:'none', boxSizing:'border-box'}}
                      onFocus={e => (e.target as HTMLSelectElement).style.borderColor = C.blue}
                      onBlur={e => (e.target as HTMLSelectElement).style.borderColor = C.border}
                    >
                      <option value="" disabled>Choisis un sujet...</option>
                      {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{display:'block', color:C.dark, fontSize:'12px', fontWeight:700, marginBottom:'7px', letterSpacing:'0.3px'}}>Message <span style={{color:'#C04A1A'}}>*</span></label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Décris ton problème ou ta question en détail..."
                      required
                      rows={5}
                      style={{width:'100%', background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:'12px', padding:'11px 14px', fontSize:'14px', color:C.dark, outline:'none', resize:'vertical', fontFamily:'inherit', lineHeight:1.6, boxSizing:'border-box'}}
                      onFocus={e => e.target.style.borderColor = C.blue}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  </div>

                  {error && (
                    <div style={{background:'#FDECEA', borderRadius:'10px', padding:'10px 14px', border:'1px solid rgba(160,48,48,0.2)'}}>
                      <p style={{color:'#A03030', fontSize:'13px', margin:0, fontWeight:600}}>{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email || !sujet || !message}
                    style={{
                      background: loading || !email || !sujet || !message ? '#ccc' : C.dark,
                      color: C.white, border:'none', padding:'14px',
                      borderRadius:'32px', fontSize:'15px', fontWeight:700,
                      cursor: loading || !email || !sujet || !message ? 'not-allowed' : 'pointer',
                      transition:'background 0.15s',
                    }}
                  >
                    {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>

                </form>
              </div>

              {/* Email direct */}
              <p style={{textAlign:'center', color:C.textLight, fontSize:'13px', margin:'20px 0 0'}}>
                Tu préfères écrire directement ?{' '}
                <a href="mailto:hello@dadup.fr" style={{color:C.blue, fontWeight:700, textDecoration:'none'}}>hello@dadup.fr</a>
              </p>

            </div>
          )}
        </div>
      </div>
    </main>
  );
}
