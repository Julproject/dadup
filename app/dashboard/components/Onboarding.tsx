'use client';
import { useState } from 'react';

const C = {
  dark:'#1e2535', blue:'#2E5F8A', gold:'#C9D8C4',
  white:'#ffffff', border:'#f0ede8', text:'#1e2535',
  textLight:'#56616B', cream:'#F6F1E9',
};

// Une DPA plausible : entre 1 mois dans le passé et 10 mois dans le futur
function iso(d: Date) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function decaler(mois: number) { const d = new Date(); d.setMonth(d.getMonth() + mois); return iso(d); }
const DPA_MIN = decaler(-1);
const DPA_MAX = decaler(10);

export default function Onboarding({onSave}:{onSave:(d:string,p:string)=>void}) {
  const [dpa,setDpa]=useState('');
  const [prenom,setPrenom]=useState('');
  const dpaValide = !!dpa && dpa >= DPA_MIN && dpa <= DPA_MAX;
  return(
    <main style={{minHeight:'100vh',background:'#F6F1E9',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:'inherit'}}>
      <div style={{maxWidth:'420px',width:'100%'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:'28px'}}>
          <svg viewBox="0 0 300 300" width="64" height="64">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
        </div>
        <div style={{background:C.white,borderRadius:'24px',padding:'28px',border:`1px solid ${C.border}`}}>
          <h1 style={{fontSize:'22px',fontWeight:800,color:C.dark,margin:'0 0 8px',textAlign:'center'}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.textLight,fontSize:'13px',textAlign:'center',margin:'0 0 24px'}}>Deux infos pour personnaliser ton espace</p>
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:600,marginBottom:'7px'}}>Ton prénom</label>
              <input type="text" aria-label="Ton prénom" placeholder="Thomas, Julien, Marc…" value={prenom} onChange={e=>setPrenom(e.target.value)} style={{width:'100%',background:'#F6F1E9',border:`1px solid ${C.border}`,borderRadius:'10px',padding:'12px 14px',fontSize:'14px',color:C.dark,outline:'none'}}/>
            </div>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:600,marginBottom:'7px'}}>Date d'accouchement prévue</label>
              <input type="date" aria-label="Date d'accouchement prévue" min={DPA_MIN} max={DPA_MAX} value={dpa} onChange={e=>setDpa(e.target.value)} style={{width:'100%',background:'#F6F1E9',border:`1px solid ${C.border}`,borderRadius:'10px',padding:'12px 14px',fontSize:'14px',color:C.dark,outline:'none'}}/>
            </div>
            {dpa && !dpaValide && <p role="alert" style={{color:'#B42318',fontSize:'13px',margin:'-4px 0 0',lineHeight:1.5}}>Cette date ne semble pas correcte : la DPA doit se situer dans les 10 prochains mois.</p>}
            <button onClick={()=>dpaValide&&onSave(dpa,prenom)} disabled={!dpaValide} style={{background:dpaValide?'linear-gradient(160deg,#0C1D2E,#1A3D5C 70%,#24507A)':'#C9CDD1',color:C.white,border:'none',minHeight:'52px',padding:'14px',borderRadius:'14px',fontSize:'15px',fontWeight:700,cursor:dpaValide?'pointer':'not-allowed',marginTop:'4px'}}>
              Accéder à mon espace
            </button>
          </div>
        </div>
        <p style={{textAlign:'center',color:C.textLight,fontSize:'12px',marginTop:'14px'}}>Tes données restent privées. Aucune revente, aucun spam.</p>
      </div>
    </main>
  );
}
