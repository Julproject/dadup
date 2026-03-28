'use client';

export default function PostAccueil({C,moisBebe,dataBebe,joursRestants,missions,missionsChecked,toggleM,saReelle}:any) {
  if(!dataBebe) return null;
  const jours = Math.abs(joursRestants||0);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* HERO POST-NAISSANCE */}
      <div style={{background:C.blue,borderRadius:'24px',padding:'28px 32px'}}>
        <p style={{color:'rgba(200,220,240,0.65)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Mois {moisBebe+1} · Post-naissance</p>
        <p style={{color:C.white,fontSize:'26px',fontWeight:800,margin:'0 0 4px'}}>Bébé grandit 🌱</p>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',margin:'0 0 20px'}}>{jours} jours · {dataBebe.titre}</p>
        <p style={{color:'rgba(255,255,255,0.75)',fontSize:'14px',lineHeight:1.6,margin:0}}>{dataBebe.intro}</p>
      </div>

      {/* CONSEILS PAPA */}
      <div>
        <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 14px'}}>Pour toi ce mois-ci</p>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {dataBebe.papa.map((item:any,i:number)=>(
            <div key={i} style={{background:'#FFF0E6',borderRadius:'18px',padding:'18px 20px'}}>
              <p style={{color:'#3D1A0A',fontSize:'15px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
              <p style={{color:'#7A3010',fontSize:'13px',lineHeight:1.75,margin:0}}>{item.contenu}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RDV */}
      <div style={{background:'#FFF7E0',borderRadius:'18px',padding:'18px 20px'}}>
        <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Rendez-vous médical ce mois-ci</p>
        <p style={{color:'#3A2800',fontSize:'14px',lineHeight:1.7,margin:0}}>{dataBebe.rdv}</p>
      </div>

      {/* MISSIONS */}
      {missions.length>0&&(
        <div>
          <p style={{color:C.muted,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 14px'}}>Tes missions cette semaine</p>
          <div className="dd-mg" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
            {missions.map((m:string,i:number)=>{
              const id=`m${saReelle}_${i}`;
              const done=missionsChecked[id];
              return(
                <button key={id} onClick={()=>toggleM&&toggleM(id)} style={{display:'flex',alignItems:'flex-start',gap:'10px',background:done?'#E4F5EC':'#f7f5f0',borderRadius:'14px',padding:'12px 14px',border:'none',cursor:'pointer',textAlign:'left' as const,width:'100%'}}>
                  <div style={{width:'18px',height:'18px',borderRadius:'50%',border:done?'none':`2px solid ${C.border}`,background:done?'#0D6B40':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}>
                    {done&&<span style={{color:'#fff',fontSize:'10px',fontWeight:700}}>✓</span>}
                  </div>
                  <p style={{color:done?'#0D6B40':C.dark,fontSize:'13px',lineHeight:1.5,margin:0,textDecoration:done?'line-through':'none',opacity:done?0.7:1}}>{m}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
