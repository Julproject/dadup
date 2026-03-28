'use client';

export default function BonsPlansPage({C,PARTENAIRES}:any) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'28px'}}>
      <h2 style={{color:C.dark,fontSize:'22px',fontWeight:800,margin:0}}>Bons plans</h2>
      {PARTENAIRES.map((cat:any,ci:number)=>(
        <div key={cat.categorie}>
          <p style={{color:'#1A4A7A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 14px'}}>{cat.categorie}</p>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {cat.items.map((item:any,i:number)=>(
              <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 18px',background:'#E4F5EC',borderRadius:'18px'}}>
                <div>
                  <p style={{color:'#0A2E1A',fontSize:'14px',fontWeight:700,margin:'0 0 3px'}}>{item.nom}</p>
                  <p style={{color:'#0A4A28',fontSize:'12px',margin:0}}>{item.desc}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
                  <span style={{background:'#FFF7E0',color:'#8A6010',fontSize:'11px',fontWeight:700,padding:'4px 10px',borderRadius:'12px'}}>{item.remise}</span>
                  <a href={item.lien} target="_blank" rel="noopener noreferrer" style={{background:C.blue,color:'#fff',fontSize:'11px',fontWeight:700,padding:'7px 14px',borderRadius:'20px',textDecoration:'none'}}>Voir</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
