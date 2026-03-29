'use client';
import { useState } from 'react';

const C = {
  dark:'#1e2535', blue:'#2E5F8A', gold:'#c8a060',
  white:'#ffffff', border:'#f0ede8', text:'#1e2535',
  textLight:'#9aa0a8', cream:'#f7f5f0',
};

export default function Onboarding({onSave}:{onSave:(d:string,p:string)=>void}) {
  const [dpa,setDpa]=useState('');
  const [prenom,setPrenom]=useState('');
  return(
    <main style={{minHeight:'100vh',background:'#f7f5f0',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
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
              <input type="text" placeholder="Thomas, Julien, Marc..." value={prenom} onChange={e=>setPrenom(e.target.value)} style={{width:'100%',background:'#f7f5f0',border:`1px solid ${C.border}`,borderRadius:'10px',padding:'12px 14px',fontSize:'14px',color:C.dark,outline:'none'}}/>
            </div>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:600,marginBottom:'7px'}}>Date d'accouchement prévue</label>
              <input type="date" value={dpa} onChange={e=>setDpa(e.target.value)} style={{width:'100%',background:'#f7f5f0',border:`1px solid ${C.border}`,borderRadius:'10px',padding:'12px 14px',fontSize:'14px',color:C.dark,outline:'none'}}/>
            </div>
            <button onClick={()=>dpa&&onSave(dpa,prenom)} disabled={!dpa} style={{background:dpa?C.dark:'#ccc',color:C.white,border:'none',padding:'14px',borderRadius:'32px',fontSize:'15px',fontWeight:700,cursor:dpa?'pointer':'not-allowed',marginTop:'4px'}}>
              Accéder à mon espace
            </button>
          </div>
        </div>
        <p style={{textAlign:'center',color:C.textLight,fontSize:'11px',marginTop:'14px'}}>Aucune donnée personnelle stockée en ligne.</p>
      </div>
    </main>
  );
}
