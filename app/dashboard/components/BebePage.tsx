'use client';

export default function BebePage({C,saReelle,sa,data,dataR,avance,setAvance,dpa}:any) {
  if(!data||!sa) return null;
  
  const TITRE_STYLE = {color:C.dark, fontSize:'16px', fontWeight:800, margin:0};
  const TEXTE_STYLE = {color:C.text, fontSize:'14px', lineHeight:1.75, margin:0};
  const LABEL_STYLE = {color:'#6a7585', fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 6px'};

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* EN-TÊTE */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'12px'}}>
        <div>
          <p style={LABEL_STYLE}>Cette semaine</p>
          <h2 style={{color:C.dark,fontSize:'26px',fontWeight:800,margin:0}}>{sa} semaines</h2>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={()=>setAvance((a:number)=>Math.max(-1,a-1))} disabled={avance<=-1} style={{fontSize:'12px',padding:'8px 16px',borderRadius:'20px',cursor:'pointer',background:'rgba(200,232,255,0.4)',color:'#0A2847',border:'1px solid rgba(46,95,138,0.2)',fontWeight:700,opacity:avance<=-1?0.4:1}}>← Précédente</button>
          <button onClick={()=>setAvance((a:number)=>Math.min(1,a+1))} disabled={avance>=1} style={{fontSize:'12px',padding:'8px 16px',borderRadius:'20px',cursor:'pointer',background:'rgba(200,232,255,0.4)',color:'#0A2847',border:'1px solid rgba(46,95,138,0.2)',fontWeight:700,opacity:avance>=1?0.4:1}}>Suivante →</button>
        </div>
      </div>

      {/* HERO BÉBÉ */}
      <div style={{background:'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)',borderRadius:'22px',overflow:'hidden',position:'relative'}}>
        <div style={{padding:'28px',position:'relative'}}>
          <p style={{color:'rgba(200,160,96,0.7)',fontSize:'10px',letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px',fontWeight:700}}>{sa} SA</p>
          <p style={{color:C.white,fontSize:'18px',fontWeight:800,margin:'0 0 6px'}}>{data.titre}</p>
          <p style={{color:C.gold,fontSize:'44px',fontWeight:900,margin:0,lineHeight:1}}>{data.taille}</p>
          <p style={{color:'rgba(255,255,255,0.45)',fontSize:'14px',margin:'6px 0 0'}}>environ {data.poids}</p>
        </div>
      </div>

      {/* INTRODUCTION */}
      <div style={{background:'rgba(184,240,216,0.3)',borderRadius:'18px',padding:'20px 22px',border:'1px solid rgba(13,107,64,0.15)'}}>
        <p style={{...TEXTE_STYLE, color:'#0A2E1A'}}>{data.intro}</p>
      </div>

      {/* DÉVELOPPEMENT */}
      <div style={{background:'#fff',borderRadius:'18px',padding:'20px 22px',boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
        <p style={{...LABEL_STYLE, marginBottom:'10px'}}>Développement</p>
        <p style={{color:C.dark,fontSize:'14px',fontWeight:700,margin:'0 0 10px'}}>{data.titre}</p>
        <p style={TEXTE_STYLE}>{data.developpement}</p>
      </div>

      {/* ORGANES */}
      {data.organes?.length>0&&(
        <div style={{background:'rgba(200,232,255,0.2)',borderRadius:'18px',padding:'20px 22px',border:'1px solid rgba(46,95,138,0.12)'}}>
          <p style={{...LABEL_STYLE, marginBottom:'12px'}}>Organes cette semaine</p>
          <div style={{display:'flex',flexWrap:'wrap' as const,gap:'8px'}}>
            {data.organes.map((o:string,i:number)=>(
              <span key={i} style={{background:'rgba(200,232,255,0.5)',border:'1px solid rgba(46,95,138,0.2)',borderRadius:'20px',padding:'6px 14px',fontSize:'14px',fontWeight:700,color:'#0A2847'}}>{o}</span>
            ))}
          </div>
        </div>
      )}

      {/* LE SAVAIS-TU */}
      <div style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)',borderRadius:'20px',padding:'22px 24px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-20px',right:'-20px',width:'100px',height:'100px',borderRadius:'50%',background:'radial-gradient(circle,rgba(200,160,96,0.15) 0%,transparent 65%)'}}></div>
        <p style={{...LABEL_STYLE, color:'rgba(200,160,96,0.7)', marginBottom:'10px'}}>Le savais-tu</p>
        <p style={{color:C.white,fontSize:'14px',fontWeight:600,lineHeight:1.75,margin:0}}>{data.savistu}</p>
      </div>

      {/* FAQ */}
      {data.faq?.length>0&&(
        <div>
          <p style={{...LABEL_STYLE, marginBottom:'12px'}}>Questions fréquentes</p>
          <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
            {data.faq.map((f:any,i:number)=>(
              <div key={i} style={{background:'rgba(200,232,255,0.25)',borderRadius:'14px',padding:'16px 18px',border:'1px solid rgba(46,95,138,0.12)'}}>
                <p style={{color:'#0A2847',fontSize:'14px',fontWeight:800,margin:'0 0 8px'}}>{f.q}</p>
                <p style={{...TEXTE_STYLE, color:'#1A3D5C'}}>{f.r}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BÉBÉ EST NÉ */}
      {saReelle >= 35 && (
        <div style={{background:'rgba(221,208,255,0.35)',borderRadius:'16px',padding:'20px 24px',border:'1px solid rgba(107,79,187,0.15)',textAlign:'center' as const}}>
          <p style={{color:'#3D2E7A',fontSize:'14px',margin:'0 0 14px',lineHeight:1.6,fontWeight:600}}>
            Bébé est là ? Bascule en mode post-partum pour accéder au contenu de la première année.
          </p>
          <button onClick={() => window.dispatchEvent(new CustomEvent('dadup:declareNaissance'))} style={{background:'linear-gradient(135deg,#6B4FBB,#8B6FDB)',color:'#fff',border:'none',padding:'12px 28px',borderRadius:'32px',fontSize:'14px',fontWeight:700,cursor:'pointer',boxShadow:'0 4px 16px rgba(107,79,187,0.3)'}}>
            Bébé est né !
          </button>
        </div>
      )}
    </div>
  );
}
