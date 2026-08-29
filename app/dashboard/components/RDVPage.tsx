'use client';

export default function RDVPage({C,dpa,saReelle,rdvDates,saveRdvI,rdvOuvert,setRdvOuvert,RDV_LIST,nextRdv,saveRdv}:any) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* EN-TÊTE */}
      <div>
        <p style={{color:'#6a7585',fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 4px'}}>Calendrier</p>
        <h2 style={{color:C.dark,fontSize:'22px',fontWeight:800,margin:'0 0 4px'}}>Tes rendez-vous</h2>
        {dpa&&<p style={{color:C.muted,fontSize:'14px',margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</p>}
      </div>

      {/* LISTE RDV */}
      <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
        {RDV_LIST.map((r:any,i:number)=>{
          const s=!saReelle?'futur':r.sa<saReelle?'passe':r.sa<=saReelle+2?'prochain':'futur';
          const rd=dpa?new Date(new Date(dpa).getTime()-(40-r.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):null;
          const isOpen=rdvOuvert===i;

          const bg = s==='passe' ? 'rgba(184,240,216,0.3)' : s==='prochain' ? 'linear-gradient(135deg,#0a1f32,#1A3D5C)' : '#fff';
          const border = s==='passe' ? '1px solid #e8e4de' : s==='prochain' ? 'none' : '1px solid #ede8e0';
          const titleColor = s==='prochain' ? '#fff' : s==='passe' ? '#9aa0a8' : C.dark;
          const metaColor = s==='prochain' ? 'rgba(255,255,255,0.5)' : '#b0b8c0';
          const textColor = s==='prochain' ? 'rgba(255,255,255,0.75)' : C.text;

          return(
            <div key={i}>
              <button onClick={()=>setRdvOuvert(isOpen?null:i)} style={{
                width:'100%', background:bg, borderRadius:'18px', padding:'16px 18px',
                border, cursor:'pointer', textAlign:'left' as const,
                boxShadow: s==='prochain' ? '0 4px 20px rgba(26,61,92,0.25)' : '0 2px 10px rgba(0,0,0,0.06)',
              }}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    {/* Indicateur statut */}
                    <div style={{width:'36px',height:'36px',borderRadius:'12px',flexShrink:0,
                      background: s==='passe' ? '#f0ede8' : s==='prochain' ? 'rgba(200,160,96,0.2)' : '#f0ede8',
                      display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'
                    }}>
                      {s==='passe' ? <span style={{color:'#0D6B40',fontSize:'14px',fontWeight:800}}>✓</span> : <span style={{fontSize:'18px'}}>{r.emoji}</span>}
                    </div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px'}}>
                        <p style={{color:titleColor,fontSize:'14px',fontWeight:800,margin:0}}>{r.titre}</p>
                        {r.oblig&&<span style={{background:s==='prochain'?'rgba(200,160,96,0.25)':'rgba(200,232,255,0.5)',color:s==='prochain'?C.gold:'#0A2847',fontSize:'10px',fontWeight:700,padding:'2px 8px',borderRadius:'8px'}}>Obligatoire</span>}
                      </div>
                      <p style={{color:metaColor,fontSize:'12px',margin:0}}>{r.sa} SA{rd?' · '+rd:''}{rdvDates[r.sa]?' · '+new Date(rdvDates[r.sa]).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}):''}</p>
                    </div>
                  </div>
                  <span style={{color:metaColor,fontSize:'12px',fontWeight:700}}>{isOpen?'▲':'▼'}</span>
                </div>

                {isOpen&&(
                  <div style={{marginTop:'14px',paddingTop:'14px',borderTop:`1px solid ${s==='prochain'?'rgba(255,255,255,0.1)':'#ede8e0'}`}} onClick={e=>e.stopPropagation()}>
                    <p style={{color:textColor,fontSize:'14px',lineHeight:1.75,margin:'0 0 14px'}}>{r.desc}</p>
                    <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'6px',background:s==='prochain'?'rgba(255,255,255,0.12)':'rgba(200,232,255,0.4)',color:s==='prochain'?C.white:'#0A2847',padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:700,textDecoration:'none',marginBottom:'14px',border:s==='prochain'?'1px solid rgba(255,255,255,0.15)':'1px solid rgba(46,95,138,0.15)'}}>
                      📅 Prendre RDV sur Doctolib
                    </a>
                    <div>
                      <p style={{color:metaColor,fontSize:'11px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase' as const,margin:'0 0 6px'}}>Ma date</p>
                      <input type="date" value={rdvDates[r.sa]||''} onChange={e=>{saveRdvI(r.sa,e.target.value);if(nextRdv&&nextRdv.sa===r.sa)saveRdv(e.target.value);}} style={{background:s==='prochain'?'rgba(255,255,255,0.1)':'rgba(200,232,255,0.25)',border:s==='prochain'?'1px solid rgba(255,255,255,0.15)':'1px solid rgba(46,95,138,0.15)',borderRadius:'10px',padding:'9px 14px',fontSize:'14px',color:s==='prochain'?C.white:C.dark,width:'100%',outline:'none'}}/>
                      {rdvDates[r.sa]&&<p style={{color:C.gold,fontSize:'12px',margin:'6px 0 0',fontWeight:700}}>Noté : {new Date(rdvDates[r.sa]).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
                    </div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
