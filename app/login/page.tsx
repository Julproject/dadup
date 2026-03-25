'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <main style={{minHeight:'100vh', background:'#f8f8f5', display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'420px', width:'100%'}}>

        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <svg viewBox="0 0 300 300" width="64" height="64" style={{margin:'0 auto 16px'}}>
            <circle cx="150" cy="150" r="145" fill="#1e2820"/>
            <circle cx="150" cy="150" r="122" fill="#2d3d2f"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#4a8c6f"/>
            <circle cx="150" cy="112" r="40" fill="#4a8c6f"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#a8d4bc"/>
            <circle cx="150" cy="128" r="26" fill="#a8d4bc"/>
          </svg>
          <h1 style={{fontSize:'26px', fontWeight:700, color:'#1e2820', margin:'0 0 8px', fontFamily:'Georgia,serif'}}>
            {step === 'email' ? 'Se connecter' : 'Vérifie tes emails'}
          </h1>
          <p style={{color:'#888', fontSize:'14px', margin:0}}>
            {step === 'email'
              ? 'Entre ton email pour recevoir un code de connexion.'
              : `Code envoyé à ${email}. Valable 10 minutes.`}
          </p>
        </div>

        <div style={{background:'#fff', borderRadius:'24px', padding:'32px', border:'1px solid #eee'}}>

          {step === 'email' ? (
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
              <div>
                <label style={{display:'block', color:'#1e2820', fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Ton adresse email</label>
                <input
                  type="email"
                  placeholder="thomas@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendCode()}
                  style={{width:'100%', background:'#f8f8f5', border:'1px solid #eee', borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:'#1e2820', boxSizing:'border-box'}}
                />
              </div>
              {error && <p style={{color:'#cc4444', fontSize:'13px', margin:0}}>{error}</p>}
              <button
                onClick={sendCode}
                disabled={loading || !email}
                style={{background: email ? '#1e2820' : '#ccc', color: email ? '#f5c842' : '#fff', border:'none', borderRadius:'24px', padding:'14px', fontSize:'14px', fontWeight:700, cursor: email ? 'pointer' : 'not-allowed'}}
              >
                {loading ? 'Envoi en cours...' : 'Recevoir mon code'}
              </button>
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
              <div>
                <label style={{display:'block', color:'#1e2820', fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Code a 6 chiffres</label>
                <input
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={e => e.key === 'Enter' && verifyCode()}
                  maxLength={6}
                  style={{width:'100%', background:'#f8f8f5', border:'1px solid #eee', borderRadius:'12px', padding:'16px', fontSize:'28px', fontWeight:700, color:'#1e2820', boxSizing:'border-box', textAlign:'center', letterSpacing:'12px'}}
                />
              </div>
              {error && <p style={{color:'#cc4444', fontSize:'13px', margin:0}}>{error}</p>}
              <button
                onClick={verifyCode}
                disabled={loading || code.length !== 6}
                style={{background: code.length === 6 ? '#1e2820' : '#ccc', color: code.length === 6 ? '#f5c842' : '#fff', border:'none', borderRadius:'24px', padding:'14px', fontSize:'14px', fontWeight:700, cursor: code.length === 6 ? 'pointer' : 'not-allowed'}}
              >
                {loading ? 'Verification...' : 'Acceder a mon espace'}
              </button>
              <button
                onClick={() => { setStep('email'); setCode(''); setError(''); }}
                style={{background:'none', border:'none', color:'#888', fontSize:'13px', cursor:'pointer', padding:'4px'}}
              >
                Changer d'email
              </button>
            </div>
          )}

        </div>

        <p style={{textAlign:'center', color:'#aaa', fontSize:'11px', marginTop:'16px', lineHeight:1.5}}>
          Aucun mot de passe. Aucune donnee stockee sans ton consentement.
        </p>

        <div style={{textAlign:'center', marginTop:'16px'}}>
          <a href="/" style={{color:'#4a8c6f', fontSize:'13px', textDecoration:'none'}}>← Retour a l'accueil</a>
        </div>

      </div>
    </main>
  );
}
