'use client';

export default function PostAccueil({C,moisBebe,dataBebe,joursRestants}:any) {
  if(!dataBebe) return null;
  const jours = Math.abs(joursRestants||0);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* HERO */}
      <div style={{background:'#1A3D5C',borderRadius:'24px',padding:'28px 32px'}}>
        <p style={{color:'rgba(200,220,240,0.55)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 8px'}}>Mois {moisBebe+1} · Post-naissance</p>
        <p style={{color:'#fff',fontSize:'22px',fontWeight:800,margin:'0 0 6px'}}>{dataBebe.titre}</p>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',margin:'0 0 16px'}}>{jours} jours de vie</p>
        <p style={{color:'rgba(255,255,255,0.7)',fontSize:'14px',lineHeight:1.7,margin:0}}>{dataBebe.intro}</p>
      </div>

      {/* POUR TOI CE MOIS */}
      <div>
        <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 14px'}}>Pour toi ce mois-ci</p>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {dataBebe.papa.map((item:any,i:number)=>(
            <div key={i} style={{background:'#FFF0E6',borderRadius:'18px',padding:'18px 20px'}}>
              <p style={{color:'#3D1A0A',fontSize:'15px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
              <p style={{color:'#7A3010',fontSize:'13px',lineHeight:1.75,margin:0}}>{item.contenu}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ALERTE */}
      {dataBebe.alerte&&(
        <div style={{background:'#FDECEA',borderRadius:'18px',padding:'16px 20px'}}>
          <p style={{color:'#8A0000',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 8px'}}>Quand consulter</p>
          <p style={{color:'#6A0000',fontSize:'13px',lineHeight:1.7,margin:0}}>{dataBebe.alerte}</p>
        </div>
      )}

      {/* RDV */}
      <div style={{background:'#FFF7E0',borderRadius:'18px',padding:'18px 20px'}}>
        <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 10px'}}>Rendez-vous ce mois-ci</p>
        <p style={{color:'#3A2800',fontSize:'13px',lineHeight:1.7,margin:'0 0 10px'}}>{dataBebe.rdv}</p>
        {dataBebe.vaccins&&(
          <>
            <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'6px 0'}}>Vaccins</p>
            <p style={{color:'#3A2800',fontSize:'13px',lineHeight:1.7,margin:0}}>{dataBebe.vaccins}</p>
          </>
        )}
      </div>

    </div>
  );
}
