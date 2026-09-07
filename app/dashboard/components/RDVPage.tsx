'use client';

export default function RDVPage({C,dpa,saReelle,rdvDates,saveRdvI,rdvOuvert,setRdvOuvert,RDV_LIST,nextRdv,saveRdv}:any) {
  const LABEL = {fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const};

  // Identifier le prochain RDV (le premier non passé)
  const prochainIdx = saReelle ? RDV_LIST.findIndex((r:any) => r.sa >= saReelle) : 0;
  const prochain = prochainIdx >= 0 ? RDV_LIST[prochainIdx] : null;
  const prochainDate = prochain ? rdvDates[prochain.sa] : null;
  const prochainRd = prochain && dpa ? new Date(new Date(dpa).getTime()-(40-prochain.sa)*7*24*60*60*1000) : null;
  const joursAvant = prochainRd ? Math.max(0, Math.ceil((prochainRd.getTime()-new Date().getTime())/(1000*60*60*24))) : null;
  const urgent = prochain && !prochainDate && joursAvant !== null && joursAvant <= 21;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      <div>
        <p style={{...LABEL,color:'#6a7585',margin:'0 0 4px'}}>Calendrier</p>
        <h2 style={{color:C.dark,fontSize:'22px',fontWeight:800,margin:'0 0 4px'}}>Tes rendez-vous</h2>
        {dpa&&<p style={{color:C.muted,fontSize:'14px',margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</p>}
      </div>

      {/* PROCHAIN RDV — MIS EN AVANT */}
      {prochain && (
        <div style={{background:urgent?'linear-gradient(135deg,#7A2010,#C04A1A)':'linear-gradient(135deg,#0a1f32,#1A3D5C)',borderRadius:'22px',padding:'24px',position:'relative',overflow:'hidden',boxShadow:urgent?'0 8px 32px rgba(192,74,26,0.3)':'0 8px 32px rgba(26,61,92,0.3)'}}>
          <div style={{position:'absolute',top:'-30px',right:'-30px',width:'160px',height:'160px',borderRadius:'50%',background:urgent?'radial-gradient(circle,rgba(255,200,150,0.15) 0%,transparent 65%)':'radial-gradient(circle,rgba(200,160,96,0.2) 0%,transparent 65%)',pointerEvents:'none'}}></div>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
              <span style={{...LABEL,color:urgent?'rgba(255,220,200,0.8)':'#c8a060'}}>{urgent?'À prendre rapidement':'Prochain rendez-vous'}</span>
              {joursAvant !== null && <span style={{background:'rgba(255,255,255,0.12)',color:'#fff',fontSize:'13px',fontWeight:800,padding:'5px 12px',borderRadius:'20px'}}>J-{joursAvant}</span>}
            </div>
            <p style={{color:'#fff',fontSize:'20px',fontWeight:800,margin:'0 0 4px'}}>{prochain.titre}</p>
            <p style={{color:'rgba(255,255,255,0.55)',fontSize:'14px',margin:'0 0 16px'}}>{prochain.sa} SA{prochainRd?' · vers le '+prochainRd.toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):''}{prochain.oblig?' · Obligatoire':''}</p>

            {urgent && (
              <div style={{background:'rgba(255,255,255,0.1)',borderRadius:'12px',padding:'12px 14px',marginBottom:'16px',border:'1px solid rgba(255,255,255,0.15)'}}>
                <p style={{color:'#fff',fontSize:'14px',fontWeight:700,margin:'0 0 2px'}}>Pas encore de date fixée</p>
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px',margin:0}}>Ce rendez-vous approche. Prends-le dès maintenant.</p>
              </div>
            )}

            <p style={{color:'rgba(255,255,255,0.7)',fontSize:'14px',lineHeight:1.7,margin:'0 0 16px'}}>{prochain.desc}</p>

            <div style={{display:'flex',gap:'10px',flexWrap:'wrap' as const,alignItems:'center'}}>
              <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'linear-gradient(135deg,#c8a060,#e8c070)',color:'#1c1510',padding:'11px 20px',borderRadius:'24px',fontSize:'14px',fontWeight:800,textDecoration:'none',boxShadow:'0 4px 16px rgba(200,160,96,0.4)'}}>
                Prendre RDV sur Doctolib →
              </a>
              <div style={{flex:1,minWidth:'160px'}}>
                <input type="date" value={prochainDate||''} onChange={e=>{saveRdvI(prochain.sa,e.target.value);if(nextRdv&&nextRdv.sa===prochain.sa)saveRdv(e.target.value);}} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'12px',padding:'10px 14px',fontSize:'14px',color:'#fff',width:'100%',outline:'none'}}/>
              </div>
            </div>
            {prochainDate&&<p style={{color:'#e0b870',fontSize:'13px',margin:'10px 0 0',fontWeight:700}}>✓ Noté le {new Date(prochainDate).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
          </div>
        </div>
      )}

      {/* AUTRES RDV — compacts */}
      <div>
        <p style={{...LABEL,color:'#6a7585',margin:'0 0 12px'}}>Tous les rendez-vous</p>
        <div style={{display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {RDV_LIST.map((r:any,i:number)=>{
            if (i === prochainIdx) return null;
            const s=!saReelle?'futur':r.sa<saReelle?'passe':'futur';
            const rd=dpa?new Date(new Date(dpa).getTime()-(40-r.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}):null;
            const isOpen=rdvOuvert===i;
            const hasDate=!!rdvDates[r.sa];

            return(
              <div key={i} style={{borderRadius:'14px',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.05)',border:'1px solid #ede8e0'}}>
                <button onClick={()=>setRdvOuvert(isOpen?null:i)} style={{width:'100%',background:s==='passe'?'#f5f3ef':'#fff',padding:'12px 16px',border:'none',cursor:'pointer',textAlign:'left' as const,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    <div style={{width:'32px',height:'32px',borderRadius:'10px',background:s==='passe'?'rgba(13,107,64,0.12)':'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      {s==='passe'?<span style={{color:'#0D6B40',fontSize:'13px',fontWeight:800}}>✓</span>:<span style={{color:'#6a7585',fontSize:'11px',fontWeight:800}}>{r.sa}</span>}
                    </div>
                    <div>
                      <p style={{color:s==='passe'?'#9aa0a8':C.dark,fontSize:'14px',fontWeight:700,margin:0}}>{r.titre}</p>
                      <p style={{color:'#b0b8c0',fontSize:'12px',margin:0}}>{rd||''}{hasDate?' · noté':''}</p>
                    </div>
                  </div>
                  <span style={{color:'#b0b8c0',fontSize:'11px'}}>{isOpen?'▲':'▼'}</span>
                </button>
                {isOpen&&(
                  <div style={{background:'#faf6f0',padding:'14px 16px',borderTop:'1px solid #ede8e0'}} onClick={e=>e.stopPropagation()}>
                    <p style={{color:C.text,fontSize:'14px',lineHeight:1.7,margin:'0 0 12px'}}>{r.desc}</p>
                    <input type="date" value={rdvDates[r.sa]||''} onChange={e=>{saveRdvI(r.sa,e.target.value);if(nextRdv&&nextRdv.sa===r.sa)saveRdv(e.target.value);}} style={{background:'#fff',border:'1px solid #e8e0d0',borderRadius:'10px',padding:'9px 14px',fontSize:'14px',color:C.dark,width:'100%',outline:'none'}}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
