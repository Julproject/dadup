'use client';

export default function RDVPage({C,dpa,saReelle,rdvDates,saveRdvI,rdvOuvert,setRdvOuvert,RDV_LIST,nextRdv,saveRdv}:any) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      <div>
        <p style={{color:'#6a7585',fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 4px'}}>Calendrier</p>
        <h2 style={{color:C.dark,fontSize:'22px',fontWeight:800,margin:'0 0 4px'}}>Tes rendez-vous</h2>
        {dpa&&<p style={{color:C.muted,fontSize:'14px',margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</p>}
      </div>

      <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
        {RDV_LIST.map((r:any,i:number)=>{
          const s=!saReelle?'futur':r.sa<saReelle?'passe':r.sa<=saReelle+2?'prochain':'futur';
          const rd=dpa?new Date(new Date(dpa).getTime()-(40-r.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):null;
          const isOpen=rdvOuvert===i;

          const headerBg = s==='passe' ? '#f0ede8' : s==='prochain' ? 'linear-gradient(135deg,#0a1f32,#1A3D5C)' : '#fff';
          const headerBorder = s==='passe' ? '1px solid #e4e0da' : s==='prochain' ? 'none' : '1px solid #ede8e0';
          const titleColor = s==='prochain' ? '#fff' : s==='passe' ? '#9aa0a8' : C.dark;
          const metaColor = s==='prochain' ? 'rgba(255,255,255,0.5)' : '#b0b8c0';
          const badgeBg = s==='passe' ? 'rgba(13,107,64,0.12)' : s==='prochain' ? 'rgba(200,160,96,0.2)' : 'rgba(0,0,0,0.06)';
          const badgeColor = s==='passe' ? '#0D6B40' : s==='prochain' ? C.gold : '#6a7585';

          return(
            <div key={i} style={{borderRadius:'18px',overflow:'hidden',boxShadow:s==='prochain'?'0 6px 24px rgba(26,61,92,0.25)':'0 2px 10px rgba(0,0,0,0.06)'}}>

              {/* HEADER : cliquable, coloré */}
              <button onClick={()=>setRdvOuvert(isOpen?null:i)} style={{
                width:'100%',background:headerBg,padding:'14px 16px',
                border:headerBorder,borderBottom:'none',cursor:'pointer',textAlign:'left' as const,display:'block'
              }}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    {/* Badge SA */}
                    <div style={{width:'38px',height:'38px',borderRadius:'12px',background:badgeBg,display:'flex',flexDirection:'column' as const,alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      {s==='passe'
                        ? <span style={{color:'#0D6B40',fontSize:'16px',fontWeight:800}}>✓</span>
                        : <>
                            <span style={{color:badgeColor,fontSize:'12px',fontWeight:900,lineHeight:1}}>{r.sa}</span>
                            <span style={{color:badgeColor,fontSize:'8px',fontWeight:700,opacity:0.7}}>SA</span>
                          </>
                      }
                    </div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px'}}>
                        <p style={{color:titleColor,fontSize:'14px',fontWeight:800,margin:0}}>{r.titre}</p>
                        {r.oblig&&<span style={{background:s==='prochain'?'rgba(200,160,96,0.25)':'rgba(200,232,255,0.5)',color:s==='prochain'?C.gold:'#0A2847',fontSize:'10px',fontWeight:700,padding:'2px 8px',borderRadius:'8px'}}>Obligatoire</span>}
                      </div>
                      <p style={{color:metaColor,fontSize:'12px',margin:0}}>{rd||''}{rdvDates[r.sa]?' · '+new Date(rdvDates[r.sa]).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}):''}</p>
                    </div>
                  </div>
                  <span style={{color:metaColor,fontSize:'11px',fontWeight:700,marginLeft:'8px'}}>{isOpen?'▲':'▼'}</span>
                </div>
              </button>

              {/* BODY : fond crème quand ouvert */}
              {isOpen&&(
                <div style={{background:'#faf6f0',padding:'16px 18px',borderTop:'1px solid #ede8e0'}} onClick={e=>e.stopPropagation()}>
                  <p style={{color:C.text,fontSize:'14px',lineHeight:1.75,margin:'0 0 14px'}}>{r.desc}</p>
                  <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(200,232,255,0.4)',color:'#0A2847',padding:'9px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:700,textDecoration:'none',marginBottom:'14px',border:'1px solid rgba(46,95,138,0.15)'}}>
                    Prendre RDV sur Doctolib →
                  </a>
                  <div>
                    <p style={{color:'#6a7585',fontSize:'11px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase' as const,margin:'0 0 6px'}}>Ma date</p>
                    <input type="date" value={rdvDates[r.sa]||''} onChange={e=>{saveRdvI(r.sa,e.target.value);if(nextRdv&&nextRdv.sa===r.sa)saveRdv(e.target.value);}} style={{background:'#fff',border:'1px solid #e8e0d0',borderRadius:'10px',padding:'9px 14px',fontSize:'14px',color:C.dark,width:'100%',outline:'none'}}/>
                    {rdvDates[r.sa]&&<p style={{color:C.gold,fontSize:'12px',margin:'6px 0 0',fontWeight:700}}>Noté : {new Date(rdvDates[r.sa]).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
