'use client';
import { useState } from 'react';

const C = {
  dark:'#1e2535', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#c8a060',
  white:'#ffffff', border:'#f0ede8', muted:'#9aa0a8',
};

export default function Topbar({prenom,dpa,saReelle,tri,prog,isPost,moisBebe,activeTab,setActiveTab,onUpdateInfos,onDeclareNaissance}:{
  prenom:string;dpa:string;saReelle:number|null;tri:string;prog:number;
  isPost:boolean;moisBebe:number;
  activeTab:string;setActiveTab:(t:string)=>void;
  onUpdateInfos:(prenom:string,dpa:string)=>void;
  onDeclareNaissance:()=>void;
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [editPrenom, setEditPrenom] = useState(prenom);
  const [editDpa,    setEditDpa]    = useState(dpa);
  const [saving,     setSaving]     = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/auth/save', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({prenom:editPrenom, dpa:editDpa}),
    });
    onUpdateInfos(editPrenom, editDpa);
    setSaving(false);
    setShowEdit(false);
  };

  const navGrossesse = [
    {id:'home',     label:'Accueil',    bg:'#FFF0E6', tc:'#C04A1A'},
    {id:'bebe',     label:'Bébé',       bg:'#E4F5EC', tc:'#0D6B40'},
    {id:'rdv',      label:'RDV',        bg:'#E6F0FA', tc:'#1A4A7A'},
    {id:'pratique', label:'À préparer', bg:'#FFF7E0', tc:'#8A6010'},
    {id:'psycho',   label:'Psycho',     bg:'#F0EEFF', tc:'#5050B0'},
  ];
  const navPost = [
    {id:'home',  label:'Ce mois-ci', bg:'#E4F5EC', tc:'#0D6B40'},
    {id:'bebe',  label:'Mon bébé',   bg:'#E6F0FA', tc:'#2E5F8A'},
    {id:'rdv',   label:'Santé & RDV',bg:'#FFF0E6', tc:'#C04A1A'},
    {id:'suivi', label:'Suivi J7',   bg:'#F0EEFF', tc:'#5050B0'},
  ];
  const tabs = isPost ? navPost : navGrossesse;

  return (
    <>
    <div style={{background:C.white,borderBottom:`1.5px solid ${C.border}`,position:'sticky',top:0,zIndex:40}}>
      {/* Ligne 1 : logo + profil */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 28px',maxWidth:'1180px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <svg viewBox="0 0 300 300" width="34" height="34">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
          <span style={{fontSize:'20px',fontWeight:900,color:C.dark,letterSpacing:'-0.3px'}}>DadUp</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#f7f5f0',borderRadius:'24px',padding:'5px 8px 5px 14px'}}>
            <span style={{fontSize:'13px',fontWeight:800,color:C.dark}}>{prenom||'DadUp'}</span>
            {saReelle&&(
              <div style={{background:C.dark,color:C.white,fontSize:'11px',fontWeight:800,padding:'4px 10px',borderRadius:'14px',textAlign:'center' as const,lineHeight:1.2}}>
                <span style={{display:'block'}}>{isPost?`Mois ${moisBebe+1}`:`${saReelle} SA`}</span>
                <small style={{display:'block',fontSize:'8px',color:'rgba(255,255,255,0.55)',fontWeight:600,letterSpacing:'0.5px'}}>{isPost?'Post-naissance':tri}</small>
              </div>
            )}
          </div>
          <button onClick={()=>{setEditPrenom(prenom);setEditDpa(dpa);setShowEdit(true);}} style={{background:'none',border:'none',padding:'4px',cursor:'pointer',opacity:0.35,display:'flex',alignItems:'center',marginRight:'2px'}} title="Modifier mes infos">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
          <button onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});localStorage.clear();window.location.href='/login';}} style={{background:'none',border:'none',padding:'4px',cursor:'pointer',opacity:0.35,display:'flex',alignItems:'center'}} title="Se déconnecter">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
      {/* Ligne 2 : onglets */}
      <div style={{display:'flex',gap:'6px',padding:'0 24px 12px',overflowX:'auto' as const,maxWidth:'1180px',margin:'0 auto'}}>
        {tabs.map(n=>{
          const on = activeTab===n.id;
          return(
            <button key={n.id} onClick={()=>setActiveTab(n.id)} style={{
              padding:'8px 20px',fontSize:'13px',fontWeight:800,border:'none',
              borderRadius:'24px',cursor:'pointer',whiteSpace:'nowrap' as const,flexShrink:0,
              background:on?C.dark:n.bg,color:on?C.white:n.tc,
            }}>{n.label}</button>
          );
        })}
      </div>
    </div>
      {/* MODALE MODIFIER INFOS */}
      {showEdit && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}} onClick={()=>setShowEdit(false)}>
          <div style={{background:'#fff',borderRadius:'24px',padding:'28px',width:'100%',maxWidth:'380px',boxShadow:'0 8px 40px rgba(0,0,0,0.15)'}} onClick={e=>e.stopPropagation()}>
            <h3 style={{color:C.dark,fontSize:'18px',fontWeight:800,margin:'0 0 6px'}}>Mes informations</h3>
            <p style={{color:C.muted,fontSize:'13px',margin:'0 0 24px'}}>Modifie ton prénom et ta date prévue d'accouchement.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div>
                <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:700,marginBottom:'7px',letterSpacing:'0.3px'}}>Ton prénom</label>
                <input type="text" value={editPrenom} onChange={e=>setEditPrenom(e.target.value)} placeholder="Ton prénom" style={{width:'100%',background:'#f7f5f0',border:'1.5px solid #f0ede8',borderRadius:'12px',padding:'11px 14px',fontSize:'15px',color:C.dark,outline:'none'}} onFocus={e=>e.target.style.borderColor=C.blue} onBlur={e=>e.target.style.borderColor='#f0ede8'}/>
              </div>
              <div>
                <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:700,marginBottom:'7px',letterSpacing:'0.3px'}}>Date prévue d'accouchement</label>
                <input type="date" value={editDpa} onChange={e=>setEditDpa(e.target.value)} style={{width:'100%',background:'#f7f5f0',border:'1.5px solid #f0ede8',borderRadius:'12px',padding:'11px 14px',fontSize:'15px',color:C.dark,outline:'none'}} onFocus={e=>e.target.style.borderColor=C.blue} onBlur={e=>e.target.style.borderColor='#f0ede8'}/>
              </div>
              <div style={{display:'flex',gap:'10px',marginTop:'4px'}}>
                <button onClick={()=>setShowEdit(false)} style={{flex:1,padding:'12px',background:'#f7f5f0',border:'none',borderRadius:'32px',fontSize:'14px',fontWeight:700,color:C.muted,cursor:'pointer'}}>Annuler</button>
                <button onClick={handleSave} disabled={saving||!editPrenom||!editDpa} style={{flex:2,padding:'12px',background:saving||!editPrenom||!editDpa?'#ccc':C.dark,border:'none',borderRadius:'32px',fontSize:'14px',fontWeight:700,color:'#fff',cursor:'pointer'}}>{saving?'Sauvegarde...':'Enregistrer'}</button>
              </div>
              <div style={{borderTop:'1px solid #f0ede8',marginTop:'16px',paddingTop:'16px'}}>
                <button onClick={()=>{setShowEdit(false);onDeclareNaissance();}} style={{width:'100%',padding:'12px',background:'#E4F5EC',border:'none',borderRadius:'32px',fontSize:'14px',fontWeight:700,color:'#0D6B40',cursor:'pointer'}}>
                  Bébé est né !
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

