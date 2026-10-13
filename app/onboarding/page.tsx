'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  dark: '#15263A',
  gold: '#B4593A',
  cream: '#F6F1E9',
  white: '#ffffff',
  border: '#E6E0D5',
  text: '#15263A',
  textLight: '#56616B',
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
    <main style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:'inherit'}}>
      <div style={{maxWidth:'480px', width:'100%'}}>

        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <svg viewBox="0 0 300 300" width="64" height="64" style={{margin:'0 auto 20px', display:'block'}}>
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
            <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
          </svg>
          <h1 style={{fontSize:'28px', fontWeight:800, color:C.dark, margin:'0 0 8px', fontFamily:'inherit'}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.text, fontSize:'15px', margin:0, lineHeight:1.6}}>Deux infos pour personnaliser<br/>ton espace.</p>
        </div>

        <div style={{background:C.white, borderRadius:'14px', padding:'36px', border:`1px solid ${C.border}`}}>

          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>

            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:700, marginBottom:'8px'}} htmlFor="ob-prenom">Ton prénom</label>
              <input
                type="text"
                placeholder="Thomas, Julien, Marc…"
                id="ob-prenom"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'14px 16px', fontSize:'15px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'inherit', outline:'none'}}
              />
            </div>

            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:700, marginBottom:'8px'}} htmlFor="ob-dpa">Date prévue d'accouchement (DPA)</label>
              <input
                id="ob-dpa"
                type="date"
                value={dpa}
                onChange={e => setDpa(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'14px 16px', fontSize:'15px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'inherit', outline:'none'}}
              />
              <p style={{color:C.textLight, fontSize:'12px', margin:'6px 0 0'}}>Cette date personnalise tout ton espace : calendrier des RDV, suivi de bébé, compte à rebours.</p>
            </div>

            <button
              onClick={save}
              disabled={!dpa || loading}
              style={{minHeight:'52px', background: dpa ? 'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)' : '#C9CDD1', color: dpa ? C.white : C.white, border:'none', borderRadius:'14px', padding:'16px', fontSize:'15px', fontWeight:700, cursor: dpa ? 'pointer' : 'not-allowed', fontFamily:'inherit', marginTop:'8px', transition:'background 0.2s'}}
            >
              {loading ? 'Enregistrement…' : 'Accéder à mon espace →'}
            </button>

          </div>

        </div>

        <div style={{marginTop:'24px', background:C.white, borderRadius:'16px', padding:'20px', border:`1px solid ${C.border}`, display:'flex', gap:'12px', alignItems:'flex-start'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F4F3E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink:0, marginTop:'1px'}}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
          <p style={{color:C.text, fontSize:'13px', margin:0, lineHeight:1.5}}>Tes données restent privées. On stocke uniquement ton prénom et ta DPA pour personnaliser ton expérience. Aucune revente, aucun spam.</p>
        </div>

        <p style={{textAlign:'center', color:C.textLight, fontSize:'12px', marginTop:'16px'}}>
          Tu pourras modifier ces informations depuis ton espace.
        </p>

      </div>
    </main>
  );
}
