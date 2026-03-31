'use client';
import { useState } from 'react';
import PrepaNaissance from './PrepaNaissance';

export default function Accueil({C,dpa,saReelle,joursRestants,prog,tri,idee,missions,missionsChecked,toggleM,nextRdv,nextRdvDate,saveRdv,saveRdvI,dataR,sa,data}:any) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* HERO */}
      {dataR && saReelle && (
        <div style={{background:C.blue,borderRadius:'24px'}}>
          <div style={{padding:'32px 28px 24px',position:'relative'}}>
            <div style={{position:'absolute',top:0,right:0,bottom:0,width:'40%',display:'flex',alignItems:'center',justifyContent:'center',opacity:0.15}}>
              <div style={{fontSize:'140px',lineHeight:1}}>{dataR.emoji}</div>
            </div>
            <div style={{position:'relative'}}>
              <p style={{color:'rgba(200,160,96,0.7)',fontSize:'10px',letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 10px',fontWeight:700}}>{saReelle} SA · {tri}</p>
              <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',fontWeight:600,margin:'0 0 4px'}}>Bébé fait</p>
              <p style={{color:C.gold,fontSize:'52px',fontWeight:900,margin:0,lineHeight:1}}>{dataR.taille}</p>
              <p style={{color:'rgba(255,255,255,0.45)',fontSize:'14px',margin:'6px 0 0'}}>et pèse environ {dataR.poids}</p>
              {joursRestants&&joursRestants>0&&<p style={{color:'rgba(255,255,255,0.25)',fontSize:'13px',margin:'8px 0 0'}}>{joursRestants} jours avant le grand jour</p>}
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            {[['Taille',dataR.taille,false],['Poids',dataR.poids,false],['Progression',prog+'%',true]].map(([l,v,g])=>(
              <div key={String(l)} style={{padding:'16px',textAlign:'center' as const,borderRight:'1px solid rgba(255,255,255,0.08)'}}>
                <p style={{color:'rgba(255,255,255,0.35)',fontSize:'9px',textTransform:'uppercase' as const,letterSpacing:'2px',margin:'0 0 4px',fontWeight:700}}>{String(l)}</p>
                <p style={{color:g?C.gold:'#fff',fontSize:'16px',fontWeight:800,margin:0}}>{String(v)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROCHAIN RDV */}
      {nextRdv&&(
        <div>
          <p style={{color:C.muted,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 12px'}}>Prochain rendez-vous</p>
          <div style={{display:'flex',alignItems:'center',gap:'16px',paddingBottom:'20px',borderBottom:`1px solid ${C.border}`}}>
            <div style={{width:'52px',height:'52px',borderRadius:'16px',background:'#E6F0FA',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'22px'}}>{nextRdv.emoji}</div>
            <div style={{flex:1}}>
              <p style={{color:C.dark,fontSize:'17px',fontWeight:800,margin:'0 0 2px'}}>{nextRdv.titre}</p>
              <p style={{color:C.muted,fontSize:'13px',margin:0}}>{nextRdv.sa} SA{dpa?' · '+new Date(new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):''}</p>
            </div>
            {dpa&&joursRestants&&<div style={{background:'rgba(200,160,96,0.12)',borderRadius:'12px',padding:'8px 12px',textAlign:'center' as const,flexShrink:0}}>
              <p style={{color:C.gold,fontSize:'20px',fontWeight:800,margin:0,lineHeight:1}}>{Math.max(0,Math.ceil((new Date(new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000).getTime()-new Date().getTime())/(1000*60*60*24)))}j</p>
            </div>}
          </div>
          <div style={{paddingTop:'16px'}}>
            <p style={{color:C.muted,fontSize:'11px',fontWeight:600,margin:'0 0 8px'}}>Ma date de RDV :</p>
            <input type="date" value={nextRdvDate} onChange={e=>{saveRdv(e.target.value);if(nextRdv)saveRdvI(nextRdv.sa,e.target.value);}} style={{background:'#E6F0FA',border:'none',borderRadius:'10px',padding:'10px 14px',fontSize:'14px',color:C.dark,width:'100%',outline:'none'}}/>
            {nextRdvDate&&<p style={{color:C.gold,fontSize:'12px',margin:'6px 0 0',fontWeight:600}}>RDV noté le {new Date(nextRdvDate).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
          </div>
        </div>
      )}

      {/* CE QUE VIT MAMAN */}
      {dataR&&(
        <div style={{background:'#FFF0E6',borderRadius:'20px',padding:'22px 24px'}}>
          <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Ce que vit maman</p>
          <p style={{color:'#3D1A0A',fontSize:'15px',fontWeight:800,margin:'0 0 8px'}}>{dataR.maman_titre}</p>
          <p style={{color:'#7A3010',fontSize:'13px',lineHeight:1.75,margin:'0 0 12px'}}>{dataR.maman}</p>
          <div style={{background:'rgba(192,74,26,0.08)',borderRadius:'12px',padding:'10px 14px'}}>
            <p style={{color:'#C04A1A',fontSize:'12px',fontWeight:700,margin:'0 0 2px'}}>Ton rôle cette semaine</p>
            <p style={{color:'#7A3010',fontSize:'13px',margin:0}}>{dataR.maman_aide}</p>
          </div>
        </div>
      )}

      {/* LE SAVAIS-TU */}
      {dataR&&(
        <div style={{background:C.blueDark,borderRadius:'20px',padding:'22px 24px'}}>
          <p style={{color:'rgba(200,160,96,0.65)',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Le savais-tu</p>
          <p style={{color:C.white,fontSize:'15px',lineHeight:1.75,margin:0}}>"{dataR.savistu}"</p>
        </div>
      )}

      {/* À SAVOIR */}
      {dataR&&(
        <div style={{background:'#E0F5F0',borderRadius:'20px',padding:'22px 24px'}}>
          <p style={{color:'#0A6050',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>À savoir cette semaine</p>
          <p style={{color:'#0A2A24',fontSize:'15px',fontWeight:800,margin:'0 0 8px'}}>{dataR.doc_titre}</p>
          <p style={{color:'#0A4A3C',fontSize:'13px',lineHeight:1.75,margin:0}}>{dataR.doc}</p>
        </div>
      )}

      {/* CONSEIL + IDÉE */}
      <div className="dd-g2col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
        {dataR&&(
          <div style={{background:'#FDECEA',borderRadius:'18px',padding:'18px 20px'}}>
            <p style={{color:'#A03030',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Conseil</p>
            <p style={{color:'#3D0A0A',fontSize:'13px',lineHeight:1.7,margin:0}}>{dataR.conseil}</p>
          </div>
        )}
        <div style={{background:'#FFF7E0',borderRadius:'18px',padding:'18px 20px'}}>
          <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Idée du mois</p>
          <p style={{color:'#3A2800',fontSize:'13px',lineHeight:1.7,margin:0}}>{idee}</p>
        </div>
      </div>

      {/* MISSIONS */}
      {missions.length>0&&(
        <div>
          <p style={{color:C.muted,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 14px'}}>Tes missions cette semaine</p>
          <div className="dd-mg" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
            {missions.map((m:string,i:number)=>{
              const id=`m${saReelle}_${i}`;
              const done=missionsChecked[id];
              return(
                <button key={id} onClick={()=>toggleM(id)} style={{display:'flex',alignItems:'flex-start',gap:'10px',background:done?'#E4F5EC':'#f7f5f0',borderRadius:'14px',padding:'12px 14px',border:'none',cursor:'pointer',textAlign:'left' as const,width:'100%'}}>
                  <div style={{width:'18px',height:'18px',borderRadius:'50%',border:done?'none':`2px solid ${C.border}`,background:done?'#0D6B40':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}>
                    {done&&<span style={{color:'#fff',fontSize:'10px',fontWeight:700}}>✓</span>}
                  </div>
                  <p style={{color:done?'#0D6B40':C.dark,fontSize:'13px',lineHeight:1.5,margin:0,textDecoration:done?'line-through':'none',opacity:done?0.7:1}}>{m}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}


      {/* PRÉPARATION À L'ACCOUCHEMENT — SA 37+ */}
      {(saReelle||0) >= 37 && <PrepaNaissance C={C} saReelle={saReelle||37}/>}


    </div>
  );
}
