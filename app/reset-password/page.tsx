'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const C = {
  dark: '#1e2535', blue: '#2E5F8A', gold: '#c8a060',
  white: '#ffffff', border: '#f0ede8', textLight: '#9aa0a8', cream: '#f7f5f0',
};

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit faire au moins 8 caractères.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur.');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch {
      setError('Erreur serveur. Réessaie.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div style={{textAlign:'center'}}>
        <p style={{fontSize:'36px',margin:'0 0 16px'}}>❌</p>
        <p style={{color:C.dark,fontSize:'16px',fontWeight:700}}>Lien invalide.</p>
        <a href="/login" style={{color:C.blue,fontSize:'14px'}}>Retour à la connexion</a>
      </div>
    );
  }

  return (
    <div style={{background:C.white,borderRadius:'24px',padding:'32px',border:`1px solid ${C.border}`,boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
      {success ? (
        <div style={{textAlign:'center',padding:'16px 0'}}>
          <p style={{fontSize:'36px',margin:'0 0 16px'}}>✅</p>
          <h2 style={{fontSize:'20px',fontWeight:800,color:C.dark,margin:'0 0 10px'}}>Mot de passe mis à jour !</h2>
          <p style={{color:C.textLight,fontSize:'14px',margin:0}}>Redirection vers la connexion...</p>
        </div>
      ) : (
        <>
          <h1 style={{fontSize:'22px',fontWeight:800,color:C.dark,margin:'0 0 8px'}}>Nouveau mot de passe</h1>
          <p style={{color:C.textLight,fontSize:'13px',margin:'0 0 24px'}}>Choisis un mot de passe d'au moins 8 caractères.</p>
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:700,marginBottom:'7px'}}>Nouveau mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                style={{width:'100%',background:C.cream,border:`1.5px solid ${C.border}`,borderRadius:'12px',padding:'12px 16px',fontSize:'15px',color:C.dark,outline:'none'}}
              />
            </div>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:700,marginBottom:'7px'}}>Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirm}
                onChange={e=>setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                style={{width:'100%',background:C.cream,border:`1.5px solid ${C.border}`,borderRadius:'12px',padding:'12px 16px',fontSize:'15px',color:C.dark,outline:'none'}}
              />
            </div>
            {error && (
              <div style={{background:'#FDECEA',borderRadius:'10px',padding:'10px 14px'}}>
                <p style={{color:'#A03030',fontSize:'13px',margin:0,fontWeight:600}}>{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !password || !confirm}
              style={{background:loading||!password||!confirm?'#ccc':C.dark,color:C.white,border:'none',padding:'14px',borderRadius:'32px',fontSize:'15px',fontWeight:700,cursor:'pointer',marginTop:'4px'}}
            >
              {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main style={{minHeight:'100vh',background:'#f7f5f0',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <div style={{maxWidth:'400px',width:'100%'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:'32px'}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="48" height="48">
              <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
              <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
              <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
            </svg>
            <span style={{fontSize:'24px',fontWeight:900,color:'#1e2535'}}>DadUp</span>
          </a>
        </div>
        <Suspense fallback={<div/>}>
          <ResetForm/>
        </Suspense>
      </div>
    </main>
  );
}
