'use client';

export default function PostAccueil({C, moisBebe, dataBebe, joursRestants}: any) {
  if (!dataBebe) return null;
  const jours = Math.abs(joursRestants || 0);
  const papa = (dataBebe.papa || []).slice(0, 3);
  const activites = (dataBebe.activites || []).slice(0, 3);

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>

      {/* HERO */}
      <div style={{background:'#1A3D5C', borderRadius:'20px', padding:'24px 26px'}}>
        <p style={{color:'rgba(200,220,240,0.5)', fontSize:'10px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 6px'}}>
          Mois {moisBebe + 1}
        </p>
        <p style={{color:'#fff', fontSize:'22px', fontWeight:800, margin:'0 0 4px'}}>{dataBebe.titre}</p>
        <p style={{color:'rgba(255,255,255,0.45)', fontSize:'13px', margin:'0 0 14px'}}>{jours} jours de vie</p>
        <p style={{color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:1.7, margin:0}}>{dataBebe.intro}</p>
      </div>

      {/* POUR TOI */}
      {papa.length > 0 && (
        <div>
          <p style={{color:'#C04A1A', fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase' as const, margin:'0 0 12px'}}>Pour toi ce mois-ci</p>
          <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            {papa.map((item: any, i: number) => (
              <div key={i} style={{borderLeft:'3px solid #FFA07A', paddingLeft:'14px'}}>
                <p style={{color:'#1e2535', fontSize:'14px', fontWeight:700, margin:'0 0 4px'}}>{item.titre}</p>
                <p style={{color:'#5a6170', fontSize:'13px', lineHeight:1.65, margin:0}}>{item.contenu}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVITES */}
      {activites.length > 0 && (
        <div>
          <p style={{color:'#2E5F8A', fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase' as const, margin:'0 0 12px'}}>Activités avec bébé</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            {activites.map((item: any, i: number) => (
              <div key={i} style={{background:'#E6F0FA', borderRadius:'14px', padding:'14px 16px'}}>
                <p style={{color:'#1A3D5C', fontSize:'13px', fontWeight:700, margin:'0 0 5px'}}>{item.titre}</p>
                <p style={{color:'#2a5080', fontSize:'12px', lineHeight:1.6, margin:0}}>{item.contenu}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RDV */}
      {dataBebe.rdv && (
        <div style={{background:'#FFF7E0', borderRadius:'16px', padding:'16px 18px'}}>
          <p style={{color:'#8A6010', fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase' as const, margin:'0 0 8px'}}>Rendez-vous ce mois</p>
          <p style={{color:'#3A2800', fontSize:'13px', lineHeight:1.65, margin:0}}>{dataBebe.rdv}</p>
        </div>
      )}

    </div>
  );
}
