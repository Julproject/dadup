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
        <div style={{display:'flex',gap:'8px'}}>
          <button onClick={()=>setAvance((a:number)=>Math.max(-1,a-1))} disabled={avance<=-1} style={{fontSize:'11px',padding:'8px 14px',borderRadius:'20px',cursor:'pointer',background:'#C8E8FF',color:'#0A2847',border:'none',fontWeight:700,boxShadow:'0 2px 8px rgba(46,95,138,0.1)',opacity:avance<=-1?0.4:1}}>← Précédente</button>
          <button onClick={()=>setAvance((a:number)=>Math.min(1,a+1))} disabled={avance>=1} style={{fontSize:'11px',padding:'8px 14px',borderRadius:'20px',cursor:'pointer',background:'#C8E8FF',color:'#0A2847',border:'none',fontWeight:700,boxShadow:'0 2px 8px rgba(46,95,138,0.1)',opacity:avance>=1?0.4:1}}>Suivante →</button>
        </div>
      </div>

      {/* HERO BÉBÉ */}
      <div style={{background:'linear-gradient(135deg,#0a1f32 0%,#1A3D5C 50%,#1d4d72 100%)',borderRadius:'22px',overflow:'hidden',position:'relative'}}>
        <div style={{padding:'28px',position:'relative'}}>

          <div style={{position:'relative'}}>
            <p style={{color:'rgba(200,160,96,0.7)',fontSize:'10px',letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px',fontWeight:700}}>{sa} SA</p>
            <p style={{color:C.white,fontSize:'18px',fontWeight:700,margin:'0 0 6px'}}>{data.titre}</p>
            <p style={{color:C.gold,fontSize:'44px',fontWeight:900,margin:0,lineHeight:1}}>{data.taille}</p>
            <p style={{color:'rgba(255,255,255,0.45)',fontSize:'14px',margin:'6px 0 0'}}>environ {data.poids}</p>
          </div>
        </div>
        <div className="dd-stats" style={{borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          {[['Taille',data.taille],['Poids',data.poids]].map(([l,v])=>(
            <div key={String(l)} style={{padding:'14px',textAlign:'center' as const,borderRight:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{color:'rgba(255,255,255,0.35)',fontSize:'9px',textTransform:'uppercase' as const,letterSpacing:'2px',margin:'0 0 4px',fontWeight:700}}>{String(l)}</p>
              <p style={{color:'#fff',fontSize:'15px',fontWeight:800,margin:0}}>{String(v)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INTRODUCTION */}
      <div style={{background:'rgba(184,240,216,0.4)',borderRadius:'18px',padding:'20px 22px',border:'1px solid rgba(13,107,64,0.15)'}}>
        <p style={{color:'#0A2E1A',fontSize:'15px',lineHeight:1.75,margin:0,fontStyle:'italic' as const}}>{data.intro}</p>
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
              <span key={i} style={{background:'rgba(200,232,255,0.4)',border:'1px solid rgba(46,95,138,0.2)',borderRadius:'20px',padding:'6px 14px',fontSize:'13px',fontWeight:700,color:'#0A2847'}}>{o}</span>
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
              <div key={i} style={{background:'rgba(200,232,255,0.3)',borderRadius:'14px',padding:'16px 18px',border:'1px solid rgba(46,95,138,0.15)',boxShadow:'0 4px 16px rgba(46,95,138,0.08)'}}>
                <p style={{color:'#1A3D5C',fontSize:'14px',fontWeight:700,margin:'0 0 6px'}}>{f.q}</p>
                <p style={{color:'#1A3A6A',fontSize:'13px',lineHeight:1.65,margin:0}}>{f.r}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOUTON BÉBÉ EST NÉ - visible à partir de 35 SA */}
      {saReelle >= 35 && (
        <div style={{ background: '#EDE8FF', borderRadius: '16px', padding: '20px 24px', marginTop: '24px', textAlign: 'center' as const }}>
          <p style={{ color: '#6B4FBB', fontSize: '13px', margin: '0 0 12px', lineHeight: 1.6 }}>
            Bébé est là ? Bascule en mode post-partum pour accéder au contenu de la première année.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('dadup:declareNaissance'))}
            style={{ background: '#6B4FBB', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
          >
            Bébé est né !
          </button>
        </div>
      )}
    </div>
  );
}
