'use client';

export default function BonsPlansPage({C}:any) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
      <h2 style={{color:C.dark,fontSize:'22px',fontWeight:800,margin:0}}>Bons plans</h2>
      <div style={{background:'#F0EEFF',borderRadius:'20px',padding:'40px 28px',textAlign:'center' as const,border:'1px solid rgba(80,80,176,0.12)'}}>
        <p style={{fontSize:'36px',margin:'0 0 16px'}}>🛍️</p>
        <p style={{color:'#26215C',fontSize:'17px',fontWeight:800,margin:'0 0 8px'}}>Pas de bon plan cette semaine</p>
        <p style={{color:'#5050B0',fontSize:'14px',margin:0,lineHeight:1.6}}>Des offres exclusives pour les futurs papas arrivent bientôt. Reviens la semaine prochaine !</p>
      </div>
    </div>
  );
}
