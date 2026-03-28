'use client';

export default function RDVPage({C,dpa,saReelle,rdvDates,saveRdvI,rdvOuvert,setRdvOuvert,RDV_LIST}:any) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      <div>
        <h2 style={{color:C.dark,fontSize:'22px',fontWeight:800,margin:'0 0 4px'}}>Calendrier des rendez-vous</h2>
        {dpa&&<p style={{color:C.muted,fontSize:'13px',margin:0}}>Date d'accouchement prévue : {new Date(dpa).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</p>}
      </div>

      <div style={{position:'relative'}}>
        <div style={{position:'absolute',left:'20px',top:0,bottom:0,width:'1px',background:C.border}}/>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {RDV_LIST.map((r:any,i:number)=>{
            const s=!saReelle?'futur':r.sa<saReelle?'passe':r.sa<=saReelle+2?'prochain':'futur';
            const rd=dpa?new Date(new Date(dpa).getTime()-(40-r.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):null;
            return(
              <div key={i} style={{position:'relative',paddingLeft:'50px'}}>
                <div style={{position:'absolute',left:'12px',top:'18px',width:'17px',height:'17px',borderRadius:'5px',
                  background:s==='passe'?'#0D6B40':s==='prochain'?C.gold:'#f0ede8',
                  display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {s==='passe'&&<span style={{color:'#fff',fontSize:'9px',fontWeight:700}}>✓</span>}
                </div>
                <button onClick={()=>setRdvOuvert(rdvOuvert===i?null:i)} style={{
                  width:'100%',background:s==='prochain'?C.blue:'#f7f5f0',
                  borderRadius:'16px',padding:'14px 16px',border:'none',cursor:'pointer',textAlign:'left' as const,
                }}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{fontSize:'16px'}}>{r.emoji}</span>
                      <div>
                        <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                          <p style={{color:s==='prochain'?C.white:C.dark,fontSize:'14px',fontWeight:700,margin:0}}>{r.titre}</p>
                          {r.oblig&&<span style={{background:s==='prochain'?'rgba(200,160,96,0.25)':'#E6F0FA',color:s==='prochain'?C.gold:'#1A4A7A',fontSize:'9px',fontWeight:700,padding:'2px 7px',borderRadius:'8px'}}>Obligatoire</span>}
                        </div>
                        <p style={{color:C.muted,fontSize:'11px',margin:0}}>{r.sa} SA{rd?' · '+rd:''}</p>
                      </div>
                    </div>
                    <span style={{color:C.muted,fontSize:'11px'}}>{rdvOuvert===i?'▲':'▼'}</span>
                  </div>
                  {rdvOuvert===i&&(
                    <div style={{marginTop:'12px',paddingTop:'12px',borderTop:`1px solid ${s==='prochain'?'rgba(255,255,255,0.1)':C.border}`}} onClick={e=>e.stopPropagation()}>
                      <p style={{color:s==='prochain'?'rgba(255,255,255,0.7)':C.text,fontSize:'13px',lineHeight:1.65,margin:'0 0 12px'}}>{r.desc}</p>
                      <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',background:s==='prochain'?'rgba(255,255,255,0.15)':'#E6F0FA',color:s==='prochain'?C.white:'#1A4A7A',padding:'8px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:700,textDecoration:'none',marginBottom:'12px'}}>
                        📅 Prendre RDV sur Doctolib
                      </a>
                      <div style={{marginTop:'4px'}}>
                        <p style={{color:s==='prochain'?'rgba(255,255,255,0.4)':C.muted,fontSize:'11px',fontWeight:600,margin:'0 0 6px'}}>Ma date :</p>
                        <input type="date" value={rdvDates[r.sa]||''} onChange={e=>saveRdvI(r.sa,e.target.value)} style={{background:s==='prochain'?'rgba(255,255,255,0.1)':'#E6F0FA',border:'none',borderRadius:'8px',padding:'8px 12px',fontSize:'13px',color:s==='prochain'?C.white:C.dark,width:'100%',outline:'none'}}/>
                        {rdvDates[r.sa]&&<p style={{color:C.gold,fontSize:'11px',margin:'5px 0 0',fontWeight:600}}>Noté le {new Date(rdvDates[r.sa]).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
