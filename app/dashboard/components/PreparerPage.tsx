'use client';

export default function PreparerPage({C,valiseChecked,toggleV}:any) {
  const valise = [
    {titre:'Pour toi', items:[
      {id:'v1',label:'Chargeur et batterie externe'},
      {id:'v2',label:'Vêtements confortables'},
      {id:'v3',label:'Nourriture et boissons'},
      {id:'v4',label:'Carte Vitale et carte mutuelle'},
      {id:'v5',label:'Pièce d\'identité'},
    ]},
    {titre:'Pour elle', items:[
      {id:'v6',label:'Robe de chambre'},
      {id:'v7',label:'Chaussons antidérapants'},
      {id:'v8',label:'Soutien-gorge d\'allaitement'},
      {id:'v9',label:'Coussin de grossesse ou d\'allaitement'},
      {id:'v10',label:'Affaires de toilette'},
      {id:'v11',label:'Téléphone chargé'},
    ]},
    {titre:'Pour bébé', items:[
      {id:'v12',label:'Bodies (3 à 5 pièces)'},
      {id:'v13',label:'Pyjamas (2 à 3 pièces)'},
      {id:'v14',label:'Bonnet et chaussettes'},
      {id:'v15',label:'Couverture'},
      {id:'v16',label:'Siège auto (obligatoire pour quitter la maternité)'},
    ]},
    {titre:'Documents', items:[
      {id:'v17',label:'Carnet de maternité'},
      {id:'v18',label:'Ordonnances en cours'},
      {id:'v19',label:'Plan de naissance'},
      {id:'v20',label:'Numéro de la maternité'},
    ]},
  ];

  const achats = [
    {label:'Poussette',p:'essentiel',prix:'200 à 1200€'},
    {label:'Siège auto groupe 0+',p:'essentiel',prix:'80 à 400€'},
    {label:'Lit cododo ou berceau',p:'essentiel',prix:'60 à 400€'},
    {label:'Baignoire bébé',p:'utile',prix:'20 à 60€'},
    {label:'Tire-lait électrique (si allaitement)',p:'utile',prix:'30 à 200€'},
    {label:'Thermomètre rectal',p:'essentiel',prix:'15 à 40€'},
    {label:'Humidificateur',p:'utile',prix:'30 à 80€'},
  ];

  const totalV = Object.values(valise).flatMap(g=>g.items).length;
  const doneV = Object.values(valiseChecked).filter(Boolean).length;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'32px'}}>
      <h2 style={{color:C.dark,fontSize:'22px',fontWeight:800,margin:0}}>À préparer</h2>

      {/* VALISE */}
      <div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
          <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:0}}>Valise maternité</p>
          <span style={{background:C.blue,color:C.white,fontSize:'11px',fontWeight:700,padding:'3px 12px',borderRadius:'12px'}}>{doneV}/{totalV}</span>
        </div>
        <div style={{background:C.border,borderRadius:'4px',height:'4px',marginBottom:'20px'}}>
          <div style={{background:C.gold,height:'4px',borderRadius:'4px',width:(doneV/totalV*100)+'%'}}/>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {valise.map(groupe=>(
            <div key={groupe.titre} style={{background:'#FFF0E6',borderRadius:'18px',padding:'18px 20px'}}>
              <p style={{color:'#C04A1A',fontSize:'12px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase' as const,margin:'0 0 12px'}}>{groupe.titre}</p>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {groupe.items.map(item=>{
                  const done=valiseChecked[item.id];
                  return(
                    <button key={item.id} onClick={()=>toggleV(item.id)} style={{display:'flex',alignItems:'center',gap:'10px',background:'none',border:'none',cursor:'pointer',textAlign:'left' as const,padding:'4px 0'}}>
                      <div style={{width:'20px',height:'20px',borderRadius:'6px',border:done?'none':`2px solid rgba(192,74,26,0.3)`,background:done?'#0D6B40':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        {done&&<span style={{color:'#fff',fontSize:'11px',fontWeight:700}}>✓</span>}
                      </div>
                      <p style={{color:done?'#0D6B40':'#7A3010',fontSize:'14px',margin:0,textDecoration:done?'line-through':'none',opacity:done?0.6:1}}>{item.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACHATS PRIORITAIRES */}
      <div>
        <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 16px'}}>Achats prioritaires</p>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {achats.map((a,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',background:'#E4F5EC',borderRadius:'14px'}}>
              <div>
                <p style={{color:'#0A2E1A',fontSize:'13px',fontWeight:600,margin:'0 0 4px'}}>{a.label}</p>
                <span style={{background:a.p==='essentiel'?'rgba(13,107,64,0.15)':'rgba(13,107,64,0.08)',color:a.p==='essentiel'?'#0D6B40':'#3A7A60',fontSize:'10px',fontWeight:700,padding:'2px 8px',borderRadius:'8px'}}>{a.p}</span>
              </div>
              <p style={{color:C.gold,fontSize:'13px',fontWeight:700,margin:0}}>{a.prix}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
