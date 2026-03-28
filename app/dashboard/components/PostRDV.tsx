'use client';

export default function PostRDV({C,moisBebe,dataBebe}:any) {
  if(!dataBebe) return null;
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* HERO */}
      <div style={{background:C.dark,borderRadius:'22px',padding:'24px 28px'}}>
        <p style={{color:'rgba(200,160,96,0.65)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Santé et RDV · {dataBebe.titre}</p>
        <p style={{color:C.white,fontSize:'20px',fontWeight:800,margin:0}}>Tout ce qu'il faut surveiller ce mois-ci</p>
      </div>

      {/* RDV MÉDICAL */}
      <div style={{background:'#FFF7E0',borderRadius:'18px',padding:'20px 22px'}}>
        <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 12px'}}>Rendez-vous médical</p>
        <p style={{color:'#3A2800',fontSize:'15px',lineHeight:1.75,margin:0}}>{dataBebe.rdv}</p>
      </div>

      {/* VACCINS */}
      <div style={{background:'#E4F5EC',borderRadius:'18px',padding:'20px 22px'}}>
        <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 12px'}}>Vaccins</p>
        <p style={{color:'#0A4A28',fontSize:'15px',lineHeight:1.75,margin:0}}>{dataBebe.vaccins}</p>
      </div>

      {/* SANTÉ */}
      <div>
        <p style={{color:'#1A4A7A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 14px'}}>Points de santé</p>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {dataBebe.sante.map((item:any,i:number)=>(
            <div key={i} style={{background:'#E6F0FA',borderRadius:'16px',padding:'16px 18px'}}>
              <p style={{color:'#0A1E3A',fontSize:'14px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
              <p style={{color:'#1A3A6A',fontSize:'13px',lineHeight:1.7,margin:0}}>{item.contenu}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ALERTE */}
      <div style={{background:'#FDECEA',borderRadius:'18px',padding:'20px 22px',borderLeft:'3px solid #A03030'}}>
        <p style={{color:'#A03030',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 12px'}}>Signes d'alerte urgents</p>
        <p style={{color:'#3D0A0A',fontSize:'15px',lineHeight:1.75,margin:0}}>{dataBebe.alerte}</p>
      </div>
    </div>
  );
}
