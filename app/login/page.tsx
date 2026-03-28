'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  dark: '#1e2535', blue: '#2E5F8A', gold: '#c8a060',
  white: '#ffffff', border: '#f0ede8', text: '#4a5568',
  textLight: '#9aa0a8', cream: '#f7f5f0',
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent]   = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur de connexion.');
        return;
      }

      // Sauvegarder les données en localStorage pour accès rapide
      const u = data.user;
      if (u.prenom) localStorage.setItem('dadup_prenom', u.prenom);
      if (u.dpa)    localStorage.setItem('dadup_dpa', u.dpa);
      if (u.valise_checked)   localStorage.setItem('dadup_valise',      JSON.stringify(u.valise_checked));
      if (u.missions_checked) localStorage.setItem('dadup_missions',    JSON.stringify(u.missions_checked));
      if (u.rdv_dates)        localStorage.setItem('dadup_rdv_dates',   JSON.stringify(u.rdv_dates));
      if (u.next_rdv)         localStorage.setItem('dadup_next_rdv',    u.next_rdv);

      router.push('/dashboard');
    } catch {
      setError('Erreur de connexion. Réessaie.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      setForgotSent(true);
    } catch {
      setForgotSent(true); // Toujours afficher le succès pour ne pas révéler si l'email existe
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <main style={{minHeight:'100vh',background:C.cream,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <div style={{maxWidth:'400px',width:'100%'}}>

        {/* Logo */}
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
            <span style={{fontSize:'24px',fontWeight:900,color:C.dark}}>DadUp</span>
          </a>
        </div>

        {/* Carte principale */}
        <div style={{background:C.white,borderRadius:'24px',padding:'32px',border:`1px solid ${C.border}`,boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>

          {!showForgot ? (
            <>
              <h1 style={{fontSize:'22px',fontWeight:800,color:C.dark,margin:'0 0 6px',textAlign:'center'}}>Bon retour 👋</h1>
              <p style={{color:C.textLight,fontSize:'13px',textAlign:'center',margin:'0 0 28px'}}>Connecte-toi à ton espace DadUp</p>

              <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                <div>
                  <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:700,marginBottom:'7px',letterSpacing:'0.3px'}}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder="ton@email.fr"
                    required
                    style={{width:'100%',background:C.cream,border:`1.5px solid ${C.border}`,borderRadius:'12px',padding:'12px 16px',fontSize:'15px',color:C.dark,outline:'none',transition:'border 0.15s'}}
                    onFocus={e=>(e.target.style.borderColor=C.blue)}
                    onBlur={e=>(e.target.style.borderColor=C.border)}
                  />
                </div>
                <div>
                  <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:700,marginBottom:'7px',letterSpacing:'0.3px'}}>Mot de passe</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{width:'100%',background:C.cream,border:`1.5px solid ${C.border}`,borderRadius:'12px',padding:'12px 16px',fontSize:'15px',color:C.dark,outline:'none',transition:'border 0.15s'}}
                    onFocus={e=>(e.target.style.borderColor=C.blue)}
                    onBlur={e=>(e.target.style.borderColor=C.border)}
                  />
                </div>

                {error && (
                  <div style={{background:'#FDECEA',borderRadius:'10px',padding:'10px 14px',border:'1px solid rgba(160,48,48,0.2)'}}>
                    <p style={{color:'#A03030',fontSize:'13px',margin:0,fontWeight:600}}>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  style={{background:loading||!email||!password?'#ccc':C.dark,color:C.white,border:'none',padding:'14px',borderRadius:'32px',fontSize:'15px',fontWeight:700,cursor:loading||!email||!password?'not-allowed':'pointer',marginTop:'4px',transition:'background 0.15s'}}
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>

              <div style={{textAlign:'center',marginTop:'20px'}}>
                <button onClick={()=>setShowForgot(true)} style={{background:'none',border:'none',color:C.textLight,fontSize:'13px',cursor:'pointer',textDecoration:'underline'}}>
                  Mot de passe oublié ?
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={()=>{setShowForgot(false);setForgotSent(false);setForgotEmail('');}} style={{background:'none',border:'none',color:C.textLight,fontSize:'13px',cursor:'pointer',marginBottom:'20px',padding:0,display:'flex',alignItems:'center',gap:'6px'}}>
                ← Retour
              </button>

              {!forgotSent ? (
                <>
                  <h2 style={{fontSize:'20px',fontWeight:800,color:C.dark,margin:'0 0 8px'}}>Mot de passe oublié</h2>
                  <p style={{color:C.textLight,fontSize:'13px',margin:'0 0 24px',lineHeight:1.6}}>Entre ton email. Si un compte existe, tu recevras un lien de réinitialisation valable 1 heure.</p>
                  <form onSubmit={handleForgot} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={e=>setForgotEmail(e.target.value)}
                      placeholder="ton@email.fr"
                      required
                      style={{width:'100%',background:C.cream,border:`1.5px solid ${C.border}`,borderRadius:'12px',padding:'12px 16px',fontSize:'15px',color:C.dark,outline:'none'}}
                    />
                    <button
                      type="submit"
                      disabled={forgotLoading || !forgotEmail}
                      style={{background:forgotLoading||!forgotEmail?'#ccc':C.blue,color:C.white,border:'none',padding:'14px',borderRadius:'32px',fontSize:'15px',fontWeight:700,cursor:forgotLoading||!forgotEmail?'not-allowed':'pointer'}}
                    >
                      {forgotLoading ? 'Envoi...' : 'Envoyer le lien'}
                    </button>
                  </form>
                </>
              ) : (
                <div style={{textAlign:'center',padding:'16px 0'}}>
                  <p style={{fontSize:'36px',margin:'0 0 16px'}}>📬</p>
                  <h2 style={{fontSize:'18px',fontWeight:800,color:C.dark,margin:'0 0 10px'}}>Email envoyé !</h2>
                  <p style={{color:C.textLight,fontSize:'14px',lineHeight:1.6,margin:0}}>Si un compte existe avec cet email, tu recevras un lien dans quelques minutes. Vérifie tes spams.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Lien vers le site */}
        <p style={{textAlign:'center',marginTop:'20px',fontSize:'13px',color:C.textLight}}>
          Pas encore de compte ?{' '}
          <a href="/tarifs" style={{color:C.blue,fontWeight:700,textDecoration:'none'}}>Commencer — 29,99€/an</a>
        </p>
      </div>
    </main>
  );
}
