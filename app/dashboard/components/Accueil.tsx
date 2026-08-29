'use client';
import { useState } from 'react';

export default function Accueil({C,dpa,saReelle,joursRestants,prog,tri,idee,missions,missionsChecked,toggleM,nextRdv,nextRdvDate,saveRdv,saveRdvI,dataR,sa,data}:any) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>

      {/* HERO SEMAINE */}
      {dataR && saReelle && (
        <div style={{background:'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)',borderRadius:'24px',overflow:'hidden',position:'relative'}}>
          <div style={{position:'absolute',top:'-40px',right:'-20px',width:'180px',height:'180px',borderRadius:'50%',background:'radial-gradient(circle,rgba(200,160,96,0.2) 0%,transparent 65%)',pointerEvents:'none'}}></div>
          <div style={{padding:'28px 28px 20px',position:'relative',zIndex:1}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(200,160,96,0.18)',border:'1px solid rgba(200,160,96,0.4)',borderRadius:'20px',padding:'4px 12px',marginBottom:'16px'}}>
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#c8a060',boxShadow:'0 0 6px rgba(200,160,96,0.8)'}}></div>
              <span style={{color:'#e0b870',fontSize:'10px',fontWeight:700,letterSpacing:'1px'}}>{saReelle} SA · {tri}</span>
            </div>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',fontWeight:600,margin:'0 0 4px'}}>Bébé fait</p>
            <p style={{color:'#e0b870',fontSize:'56px',fontWeight:900,margin:0,lineHeight:1}}>{dataR.taille}</p>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',margin:'6px 0 0'}}>et pèse environ {dataR.poids}</p>
            {joursRestants&&joursRestants>0&&(
              <div style={{marginTop:'16px',background:'rgba(255,255,255,0.06)',borderRadius:'12px',padding:'10px 14px',display:'inline-block'}}>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',margin:0}}>{joursRestants} jours avant le grand jour</p>
              </div>
            )}
          </div>
          {/* Barre de progression */}
          <div style={{padding:'0 28px 20px',position:'relative',zIndex:1}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
              <span style={{color:'rgba(255,255,255,0.35)',fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase' as const}}>Progression</span>
              <span style={{color:'#e0b870',fontSize:'10px',fontWeight:800}}>{prog}%</span>
            </div>
            <div style={{background:'rgba(255,255,255,0.1)',borderRadius:'99px',height:'6px'}}>
              <div style={{background:'linear-gradient(to right,#c8a060,#e8c070)',borderRadius:'99px',height:'6px',width:`${prog}%`,transition:'width 0.5s ease'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* PROCHAIN RDV */}
      {nextRdv&&(
        <div style={{background:'rgba(200,232,255,0.3)',borderRadius:'20px',padding:'20px 22px',border:'1px solid rgba(46,95,138,0.15)'}}>
          <p style={{color:'#2E5F8A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 12px'}}>Prochain rendez-vous</p>
          <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'14px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'#C8E8FF',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'22px',boxShadow:'0 4px 12px rgba(46,95,138,0.15)'}}>{nextRdv.emoji}</div>
            <div style={{flex:1}}>
              <p style={{color:'#0A2847',fontSize:'16px',fontWeight:800,margin:'0 0 2px'}}>{nextRdv.titre}</p>
              <p style={{color:'#2E5F8A',fontSize:'13px',margin:0}}>{nextRdv.sa} SA{dpa?' · '+new Date(new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):''}</p>
            </div>
            {dpa&&joursRestants&&<div style={{background:'#C8E8FF',borderRadius:'12px',padding:'8px 14px',textAlign:'center' as const,flexShrink:0,boxShadow:'0 4px 12px rgba(46,95,138,0.15)'}}>
              <p style={{color:'#0A2847',fontSize:'20px',fontWeight:800,margin:0,lineHeight:1}}>{Math.max(0,Math.ceil((new Date(new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000).getTime()-new Date().getTime())/(1000*60*60*24)))}j</p>
            </div>}
          </div>
          <p style={{color:'#2E5F8A',fontSize:'11px',fontWeight:600,margin:'0 0 6px'}}>Ma date de RDV</p>
          <input type="date" value={nextRdvDate} onChange={e=>{saveRdv(e.target.value);if(nextRdv)saveRdvI(nextRdv.sa,e.target.value);}} style={{background:'#fff',border:'1px solid rgba(46,95,138,0.2)',borderRadius:'10px',padding:'10px 14px',fontSize:'14px',color:'#0A2847',width:'100%',outline:'none'}}/>
          {nextRdvDate&&<p style={{color:'#2E5F8A',fontSize:'12px',margin:'6px 0 0',fontWeight:600}}>RDV noté le {new Date(nextRdvDate).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
        </div>
      )}

      {/* CE QUE VIT MAMAN */}
      {dataR&&(
        <div style={{background:'rgba(184,240,216,0.3)',borderRadius:'20px',padding:'20px 22px',border:'1px solid rgba(13,107,64,0.15)'}}>
          <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Ce que vit maman</p>
          <p style={{color:'#0A2E1A',fontSize:'16px',fontWeight:800,margin:'0 0 8px'}}>{dataR.maman_titre}</p>
          <p style={{color:'#0D4A2E',fontSize:'14px',lineHeight:1.75,margin:'0 0 12px'}}>{dataR.maman}</p>
          <div style={{background:'rgba(184,240,216,0.5)',borderRadius:'12px',padding:'12px 14px',borderLeft:'3px solid #0D6B40'}}>
            <p style={{color:'#0D6B40',fontSize:'11px',fontWeight:700,margin:'0 0 4px',textTransform:'uppercase' as const,letterSpacing:'1px'}}>Ton rôle cette semaine</p>
            <p style={{color:'#0A2E1A',fontSize:'13px',margin:0,lineHeight:1.6}}>{dataR.maman_aide}</p>
          </div>
        </div>
      )}

      {/* LE SAVAIS-TU */}
      {dataR&&(
        <div style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)',borderRadius:'20px',padding:'20px 22px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-20px',right:'-20px',width:'100px',height:'100px',borderRadius:'50%',background:'radial-gradient(circle,rgba(200,160,96,0.15) 0%,transparent 65%)'}}></div>
          <p style={{color:'rgba(200,160,96,0.7)',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 12px',position:'relative',zIndex:1}}>Le savais-tu</p>
          <p style={{color:'rgba(255,255,255,0.9)',fontSize:'15px',lineHeight:1.75,margin:0,fontStyle:'italic' as const,position:'relative',zIndex:1}}>{dataR.savistu}</p>
        </div>
      )}

      {/* À SAVOIR */}
      {dataR&&(
        <div style={{background:'rgba(184,240,216,0.3)',borderRadius:'20px',padding:'20px 22px',border:'1px solid rgba(13,107,64,0.15)'}}>
          <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>À savoir cette semaine</p>
          <p style={{color:'#0A2847',fontSize:'16px',fontWeight:800,margin:'0 0 8px'}}>{dataR.doc_titre}</p>
          <p style={{color:'#1A3D5C',fontSize:'14px',lineHeight:1.75,margin:0}}>{dataR.doc}</p>
        </div>
      )}

      {/* CONSEIL + IDÉE */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
        {dataR&&(
          <div style={{background:'rgba(221,208,255,0.35)',borderRadius:'18px',padding:'18px 20px',border:'1px solid rgba(107,79,187,0.15)'}}>
            <p style={{color:'#6B4FBB',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Conseil</p>
            <p style={{color:'#1A0A4A',fontSize:'13px',lineHeight:1.7,margin:0}}>{dataR.conseil}</p>
          </div>
        )}
        <div style={{background:'rgba(255,232,160,0.35)',borderRadius:'18px',padding:'18px 20px',border:'1px solid rgba(200,160,96,0.2)'}}>
          <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Idée du mois</p>
          <p style={{color:'#3A2000',fontSize:'13px',lineHeight:1.7,margin:0}}>{idee}</p>
        </div>
      </div>

      {/* MISSIONS */}
      {missions.length>0&&(
        <div>
          <p style={{color:C.muted,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 12px'}}>Tes missions cette semaine</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
            {missions.map((m:string,i:number)=>{
              const id=`m${saReelle}_${i}`;
              const done=missionsChecked[id];
              return(
                <button key={id} onClick={()=>toggleM(id)} style={{display:'flex',alignItems:'flex-start',gap:'10px',background:done?'rgba(184,240,216,0.4)':'rgba(255,255,255,0.7)',borderRadius:'14px',padding:'14px',border:done?'1px solid rgba(13,107,64,0.2)':'1px solid rgba(0,0,0,0.06)',cursor:'pointer',textAlign:'left' as const,width:'100%',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'50%',border:done?'none':'2px solid #d0c8c0',background:done?'#0D6B40':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px',boxShadow:done?'0 0 8px rgba(13,107,64,0.3)':'none'}}>
                    {done&&<span style={{color:'#fff',fontSize:'11px',fontWeight:700}}>✓</span>}
                  </div>
                  <p style={{color:done?'#0D6B40':C.dark,fontSize:'13px',lineHeight:1.5,margin:0,textDecoration:done?'line-through':'none',opacity:done?0.7:1}}>{m}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* MENTION MÉDICALE */}
      <div style={{background:'rgba(200,232,255,0.2)',borderRadius:'12px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'10px',border:'1px solid rgba(46,95,138,0.1)'}}>
        <span style={{fontSize:'16px',flexShrink:0}}>⚕️</span>
        <p style={{color:'#2E5F8A',fontSize:'12px',lineHeight:1.6,margin:0}}>
          DadUp ne remplace pas l&apos;avis d&apos;un médecin. En cas de doute, appelle ta sage-femme ou ton médecin.
        </p>
      </div>

    </div>
  );
}
