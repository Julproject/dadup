'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  dark: '#1e2535',
  gold: '#c8a060',
  cream: '#faf6f0',
  white: '#ffffff',
  border: '#e8e0d0',
  text: '#4a5568',
  textLight: '#9aa0a8',
};

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendCode = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('code');
      } else {
        setError(data.error || 'Erreur envoi email');
      }
    } catch {
      setError('Erreur connexion');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!code) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.user?.dpa) {
          router.push('/dashboard');
        } else {
          router.push('/onboarding');
        }
      } else {
        setError(data.error || 'Code invalide');
      }
    } catch {
      setError('Erreur connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'420px', width:'100%'}}>

        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <a href="/" style={{textDecoration:'none', display:'inline-block', marginBottom:'24px'}}>
            <svg viewBox="0 0 300 300" width="64" height="64">
              <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
              <circle cx="150" cy="150" r="122" fill="#4a6080"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
              <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
            </svg>
          </a>
          <h1 style={{fontSize:'26px', fontWeight:800, color:C.dark, margin:'0 0 8px', fontFamily:'Georgia,serif'}}>
            {step === 'email' ? 'Se connecter' : 'Verifie tes emails'}
          </h1>
          <p style={{color:C.text, fontSize:'14px', margin:0}}>
            {step === 'email'
              ? 'Entre ton email pour recevoir un code de connexion.'
              : `Code envoye a ${email}. Valable 10 minutes.`}
          </p>
        </div>

        <div style={{background:C.white, borderRadius:'24px', padding:'32px', border:`1px solid ${C.border}`}}>
          {step === 'email' ? (
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
              <div>
                <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Ton adresse email</label>
                <input
                  type="email"
                  placeholder="thomas@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendCode()}
                  style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif'}}
                />
              </div>
              {error && <p style={{color:'#cc4444', fontSize:'13px', margin:0}}>{error}</p>}
              <button onClick={sendCode} disabled={loading || !email} style={{background: email ? C.dark : '#ccc', color: email ? C.white : C.white, border:'none', borderRadius:'24px', padding:'14px', fontSize:'14px', fontWeight:700, cursor: email ? 'pointer' : 'not-allowed', fontFamily:'sans-serif'}}>
                {loading ? 'Envoi en cours...' : 'Recevoir mon code'}
              </button>
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
              <div>
                <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Code a 6 chiffres</label>
                <input
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={e => e.key === 'Enter' && verifyCode()}
                  maxLength={6}
                  style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'16px', fontSize:'28px', fontWeight:700, color:C.dark, boxSizing:'border-box' as const, textAlign:'center', letterSpacing:'12px', fontFamily:'sans-serif'}}
                />
              </div>
              {error && <p style={{color:'#cc4444', fontSize:'13px', margin:0}}>{error}</p>}
              <button onClick={verifyCode} disabled={loading || code.length !== 6} style={{background: code.length === 6 ? C.dark : '#ccc', color:C.white, border:'none', borderRadius:'24px', padding:'14px', fontSize:'14px', fontWeight:700, cursor: code.length === 6 ? 'pointer' : 'not-allowed', fontFamily:'sans-serif'}}>
                {loading ? 'Verification...' : 'Acceder a mon espace'}
              </button>
              <button onClick={() => { setStep('email'); setCode(''); setError(''); }} style={{background:'none', border:'none', color:C.textLight, fontSize:'13px', cursor:'pointer', padding:'4px', fontFamily:'sans-serif'}}>
                Changer d'email
              </button>
            </div>
          )}
        </div>

        <p style={{textAlign:'center', color:C.textLight, fontSize:'11px', marginTop:'16px', lineHeight:1.5}}>
          Aucun mot de passe. Aucune donnee stockee sans ton consentement.
        </p>
        <div style={{textAlign:'center', marginTop:'16px'}}>
          <a href="/" style={{color:C.gold, fontSize:'13px', textDecoration:'none'}}>← Retour a l'accueil</a>
        </div>
      </div>
    </main>
  );
}
