'use client';

export default function PostBebe({C,moisBebe,dataBebe,joursRestants}:any) {
  if(!dataBebe) return null;
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* HERO */}
      <div style={{background:C.blue,borderRadius:'22px',padding:'24px 28px'}}>
        <p style={{color:'rgba(200,220,240,0.65)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Mon bébé · {dataBebe.titre}</p>
        <p style={{color:C.white,fontSize:'20px',fontWeight:800,margin:'0 0 6px'}}>{dataBebe.intro}</p>
      </div>

      {/* DÉVELOPPEMENT */}
      <div>
        <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 14px'}}>Développement</p>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {dataBebe.developpement.map((item:any,i:number)=>(
            <div key={i} style={{background:'#E4F5EC',borderRadius:'18px',padding:'18px 20px'}}>
              <p style={{color:'#0A2E1A',fontSize:'15px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
              <p style={{color:'#0A4A28',fontSize:'13px',lineHeight:1.75,margin:0}}>{item.contenu}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SANTÉ */}
      <div>
        <p style={{color:'#1A4A7A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 14px'}}>Santé et soins</p>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {dataBebe.sante.map((item:any,i:number)=>(
            <div key={i} style={{background:'#E6F0FA',borderRadius:'18px',padding:'18px 20px'}}>
              <p style={{color:'#0A1E3A',fontSize:'15px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
              <p style={{color:'#1A3A6A',fontSize:'13px',lineHeight:1.75,margin:0}}>{item.contenu}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
