'use client';

export default function BebePage({C,saReelle,sa,data,dataR,avance,setAvance,dpa}:any) {
  if(!data||!sa) return null;
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* EN-TÊTE */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'12px'}}>
        <div>
          <p style={{color:C.muted,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 4px'}}>Cette semaine</p>
          <h2 style={{color:C.dark,fontSize:'26px',fontWeight:800,margin:0}}>{sa} semaines</h2>
        </div>
        <button onClick={()=>setAvance(!avance)} style={{fontSize:'11px',padding:'8px 16px',borderRadius:'20px',cursor:'pointer',background:avance?C.dark:'#E6F0FA',color:avance?'#fff':'#1A4A7A',border:'none',fontWeight:700}}>
          {avance?'Revenir':'Aperçu +4 sem.'}
        </button>
      </div>

      {/* HERO BÉBÉ */}
      <div style={{background:C.blue,borderRadius:'22px',overflow:'hidden'}}>
        <div style={{padding:'28px',position:'relative'}}>
          <div style={{position:'absolute',top:0,right:0,bottom:0,width:'38%',display:'flex',alignItems:'center',justifyContent:'center',opacity:0.2}}>
            <div style={{fontSize:'120px',lineHeight:1}}>{data.emoji}</div>
          </div>
          <div style={{position:'relative'}}>
            <p style={{color:'rgba(200,160,96,0.7)',fontSize:'10px',letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px',fontWeight:700}}>{sa} SA</p>
            <p style={{color:C.white,fontSize:'18px',fontWeight:700,margin:'0 0 6px'}}>{data.titre}</p>
            <p style={{color:C.gold,fontSize:'44px',fontWeight:900,margin:0,lineHeight:1}}>{data.taille}</p>
            <p style={{color:'rgba(255,255,255,0.45)',fontSize:'14px',margin:'6px 0 0'}}>environ {data.poids}</p>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          {[['Taille',data.taille],['Poids',data.poids]].map(([l,v])=>(
            <div key={String(l)} style={{padding:'14px',textAlign:'center' as const,borderRight:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{color:'rgba(255,255,255,0.35)',fontSize:'9px',textTransform:'uppercase' as const,letterSpacing:'2px',margin:'0 0 4px',fontWeight:700}}>{String(l)}</p>
              <p style={{color:'#fff',fontSize:'15px',fontWeight:800,margin:0}}>{String(v)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INTRODUCTION */}
      <div style={{background:'#E4F5EC',borderRadius:'18px',padding:'20px 22px'}}>
        <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Introduction</p>
        <p style={{color:'#0A2E1A',fontSize:'14px',lineHeight:1.75,margin:0}}>{data.intro}</p>
      </div>

      {/* DÉVELOPPEMENT */}
      <div>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
          <div style={{width:'3px',height:'20px',background:C.gold,borderRadius:'2px',flexShrink:0}}></div>
          <p style={{color:C.dark,fontSize:'15px',fontWeight:800,margin:0}}>Développement cette semaine</p>
        </div>
        <p style={{color:C.text,fontSize:'14px',lineHeight:1.75,margin:0,paddingLeft:'13px'}}>{data.developpement}</p>
      </div>

      {/* ORGANES */}
      {data.organes?.length>0&&(
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
            <div style={{width:'3px',height:'20px',background:C.gold,borderRadius:'2px',flexShrink:0}}></div>
            <p style={{color:C.dark,fontSize:'15px',fontWeight:800,margin:0}}>Organes cette semaine</p>
          </div>
          <div style={{display:'flex',flexWrap:'wrap' as const,gap:'8px',paddingLeft:'13px'}}>
            {data.organes.map((o:string,i:number)=>(
              <span key={i} style={{background:'#E6F0FA',border:'none',borderRadius:'20px',padding:'6px 14px',fontSize:'13px',fontWeight:600,color:'#1A4A7A'}}>{o}</span>
            ))}
          </div>
        </div>
      )}

      {/* ANECDOTE */}
      <div style={{background:C.blueDark,borderRadius:'20px',padding:'22px 24px'}}>
        <p style={{color:'rgba(200,160,96,0.65)',fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px',fontWeight:700}}>Le savais-tu</p>
        <p style={{color:C.white,fontSize:'14px',fontWeight:600,lineHeight:1.7,margin:0}}>"{data.savistu}"</p>
      </div>

      {/* FAQ */}
      {data.faq?.length>0&&(
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}}>
            <div style={{width:'3px',height:'20px',background:C.gold,borderRadius:'2px',flexShrink:0}}></div>
            <p style={{color:C.dark,fontSize:'15px',fontWeight:800,margin:0}}>Questions fréquentes</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px',paddingLeft:'13px'}}>
            {data.faq.map((f:any,i:number)=>(
              <div key={i} style={{background:'#E6F0FA',borderRadius:'14px',padding:'16px 18px'}}>
                <p style={{color:'#1A3D5C',fontSize:'14px',fontWeight:700,margin:'0 0 6px'}}>{f.q}</p>
                <p style={{color:'#1A3A6A',fontSize:'13px',lineHeight:1.65,margin:0}}>{f.r}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
