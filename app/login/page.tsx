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
      if (data.success) router.push('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'480px', width:'100%'}}>

        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <svg viewBox="0 0 300 300" width="64" height="64" style={{margin:'0 auto 20px', display:'block'}}>
            <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
            <circle cx="150" cy="150" r="122" fill="#4a6080"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
            <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
          </svg>
          <h1 style={{fontSize:'28px', fontWeight:800, color:C.dark, margin:'0 0 8px', fontFamily:'Georgia,serif'}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.text, fontSize:'15px', margin:0, lineHeight:1.6}}>Deux infos pour personnaliser<br/>ton espace du papa.</p>
        </div>

        <div style={{background:C.white, borderRadius:'24px', padding:'36px', border:`1px solid ${C.border}`}}>

          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>

            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:700, marginBottom:'8px'}}>Ton prenom</label>
              <input
                type="text"
                placeholder="Thomas, Julien, Marc..."
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'14px 16px', fontSize:'15px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif', outline:'none'}}
              />
            </div>

            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:700, marginBottom:'8px'}}>Date prevue d'accouchement (DPA)</label>
              <input
                type="date"
                value={dpa}
                onChange={e => setDpa(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'14px 16px', fontSize:'15px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif', outline:'none'}}
              />
              <p style={{color:C.textLight, fontSize:'12px', margin:'6px 0 0'}}>Cette date personalise tout ton espace — calendrier RDV, suivi bebe, compte a rebours.</p>
            </div>

            <button
              onClick={save}
              disabled={!dpa || loading}
              style={{background: dpa ? C.dark : '#ccc', color: dpa ? C.white : C.white, border:'none', borderRadius:'24px', padding:'16px', fontSize:'15px', fontWeight:700, cursor: dpa ? 'pointer' : 'not-allowed', fontFamily:'sans-serif', marginTop:'8px', transition:'background 0.2s'}}
            >
              {loading ? 'Enregistrement...' : 'Acceder a mon espace →'}
            </button>

          </div>

        </div>

        <div style={{marginTop:'24px', background:C.white, borderRadius:'16px', padding:'20px', border:`1px solid ${C.border}`, display:'flex', gap:'12px', alignItems:'flex-start'}}>
          <span style={{fontSize:'20px', flexShrink:0}}>🔒</span>
          <p style={{color:C.text, fontSize:'13px', margin:0, lineHeight:1.5}}>Tes donnees restent privees. On stocke uniquement ton prenom et ta DPA pour personnaliser ton experience. Aucune revente, aucun spam.</p>
        </div>

        <p style={{textAlign:'center', color:C.textLight, fontSize:'11px', marginTop:'16px'}}>
          Tu pourras modifier ces informations depuis ton espace.
        </p>

      </div>
    </main>
  );
}
