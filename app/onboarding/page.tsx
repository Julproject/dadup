'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!dpa) return;
    setLoading(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dpa, prenom }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
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
          <h1 style={{fontSize:'26px', fontWeight:700, color:'#1e2820', margin:'0 0 8px', fontFamily:'Georgia,serif'}}>Bienvenue sur DadUp</h1>
          <p style={{color:'#888', fontSize:'14px', margin:0}}>Deux infos pour personnaliser ton espace.</p>
        </div>

        <div style={{background:'#fff', borderRadius:'24px', padding:'32px', border:'1px solid #eee'}}>
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            <div>
              <label style={{display:'block', color:'#1e2820', fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Ton prenom</label>
              <input
                type="text"
                placeholder="Thomas, Julien, Marc..."
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                style={{width:'100%', background:'#f8f8f5', border:'1px solid #eee', borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:'#1e2820', boxSizing:'border-box'}}
              />
            </div>
            <div>
              <label style={{display:'block', color:'#1e2820', fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Date prevue d'accouchement</label>
              <input
                type="date"
                value={dpa}
                onChange={e => setDpa(e.target.value)}
                style={{width:'100%', background:'#f8f8f5', border:'1px solid #eee', borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:'#1e2820', boxSizing:'border-box'}}
              />
            </div>
            <button
              onClick={save}
              disabled={!dpa || loading}
              style={{background: dpa ? '#1e2820' : '#ccc', color: dpa ? '#f5c842' : '#fff', border:'none', borderRadius:'24px', padding:'14px', fontSize:'14px', fontWeight:700, cursor: dpa ? 'pointer' : 'not-allowed', marginTop:'8px'}}
            >
              {loading ? 'Enregistrement...' : 'Acceder a mon espace'}
            </button>
          </div>
        </div>

        <p style={{textAlign:'center', color:'#aaa', fontSize:'11px', marginTop:'16px'}}>
          Aucune donnee personnelle stockee sans ton consentement.
        </p>
      </div>
    </main>
  );
}
