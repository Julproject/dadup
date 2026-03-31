'use client';

export default function PostRDV({C, moisBebe, dataBebe}: any) {
  if (!dataBebe) return null;
  const sante = (dataBebe.sante || []).slice(0, 3);

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>

      {/* HERO */}
      <div style={{background:'#1A3D5C', borderRadius:'20px', padding:'24px 26px'}}>
        <p style={{color:'rgba(200,220,240,0.5)', fontSize:'10px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 6px'}}>
          Santé & RDV · Mois {moisBebe + 1}
        </p>
        <p style={{color:'#fff', fontSize:'22px', fontWeight:800, margin:0}}>Ce mois-ci côté santé</p>
      </div>

      {/* RDV */}
      {dataBebe.rdv && (
        <div style={{background:'#FFF7E0', borderRadius:'16px', padding:'18px 20px'}}>
          <p style={{color:'#8A6010', fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase' as const, margin:'0 0 8px'}}>Rendez-vous médical</p>
          <p style={{color:'#3A2800', fontSize:'14px', lineHeight:1.7, margin:0}}>{dataBebe.rdv}</p>
        </div>
      )}

      {/* VACCINS */}
      {dataBebe.vaccins && (
        <div style={{background:'#E6F0FA', borderRadius:'16px', padding:'18px 20px'}}>
          <p style={{color:'#1A4A7A', fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase' as const, margin:'0 0 8px'}}>Vaccins</p>
          <p style={{color:'#0A2A5A', fontSize:'14px', lineHeight:1.7, margin:0}}>{dataBebe.vaccins}</p>
        </div>
      )}

      {/* SANTÉ MAMAN */}
      {sante.length > 0 && (
        <div>
          <p style={{color:'#C04A1A', fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase' as const, margin:'0 0 12px'}}>Points de santé</p>
          <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            {sante.map((item: any, i: number) => (
              <div key={i} style={{borderLeft:'3px solid #FFA07A', paddingLeft:'14px'}}>
                <p style={{color:'#1e2535', fontSize:'14px', fontWeight:700, margin:'0 0 4px'}}>{item.titre}</p>
                <p style={{color:'#5a6170', fontSize:'13px', lineHeight:1.65, margin:0}}>{item.contenu}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUAND CONSULTER */}
      {dataBebe.alerte && (
        <div style={{background:'#f7f5f0', borderRadius:'16px', padding:'16px 18px'}}>
          <p style={{color:'#8A6010', fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase' as const, margin:'0 0 8px'}}>Quand consulter</p>
          <p style={{color:'#3a4a5a', fontSize:'13px', lineHeight:1.7, margin:0}}>{dataBebe.alerte}</p>
        </div>
      )}

    </div>
  );
}
