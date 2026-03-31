'use client';

export default function PostBebe({C, moisBebe, dataBebe, joursRestants}: any) {
  if (!dataBebe) return null;
  const jours = Math.abs(joursRestants || 0);
  const developpement = (dataBebe.developpement || []).slice(0, 4);

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>

      {/* HERO */}
      <div style={{background:'#1A3D5C', borderRadius:'20px', padding:'24px 26px'}}>
        <p style={{color:'rgba(200,220,240,0.5)', fontSize:'10px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 6px'}}>
          Mon bébé · {jours} jours
        </p>
        <p style={{color:'#fff', fontSize:'22px', fontWeight:800, margin:0}}>{dataBebe.titre}</p>
      </div>

      {/* DÉVELOPPEMENT */}
      {developpement.length > 0 && (
        <div>
          <p style={{color:'#0D6B40', fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase' as const, margin:'0 0 12px'}}>Développement</p>
          <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            {developpement.map((item: any, i: number) => (
              <div key={i} style={{borderLeft:'3px solid #4CAF80', paddingLeft:'14px'}}>
                <p style={{color:'#1e2535', fontSize:'14px', fontWeight:700, margin:'0 0 4px'}}>{item.titre}</p>
                <p style={{color:'#5a6170', fontSize:'13px', lineHeight:1.65, margin:0}}>{item.contenu}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
