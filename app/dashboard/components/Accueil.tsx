'use client';
import { useState } from 'react';


export default function Accueil({C,dpa,saReelle,joursRestants,prog,tri,idee,missions,missionsChecked,toggleM,nextRdv,nextRdvDate,saveRdv,saveRdvI,dataR,sa,data}:any) {
  const [open, setOpen] = useState<string|null>(null);
  const toggle = (id: string) => setOpen(open === id ? null : id);

  const missionsDone = missions.filter((_:string, i:number) => missionsChecked[`m${saReelle}_${i}`]).length;

  return (
    <div className="acc-wrap" style={{background:'linear-gradient(180deg,#0a1f32 0%,#1A3D5C 30%,#faf6f0 38%)', paddingBottom:'24px', borderRadius:'24px'}}>
      <style>{`
        @keyframes floatbebe{
          0%{transform:translateY(0) rotate(-3deg) scale(1);}
          25%{transform:translateY(-6px) rotate(1deg) scale(1.02);}
          50%{transform:translateY(-2px) rotate(3deg) scale(1);}
          75%{transform:translateY(-8px) rotate(-1deg) scale(1.01);}
          100%{transform:translateY(0) rotate(-3deg) scale(1);}
        }
        @keyframes spin360{from{transform:rotateY(0deg);}to{transform:rotateY(360deg);}}
        .hero-emoji{animation:floatbebe 6s ease-in-out infinite;transition:transform .3s ease;perspective:600px;}
        .hero-emoji img{transition:transform .6s ease;transform-style:preserve-3d;}
        .hero-emoji:hover img{animation:spin360 1.8s ease-in-out;}

        .acc-card{transition:transform .15s ease,box-shadow .15s ease;}
        .acc-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.08)!important;}
        .acc-wrap{margin:-32px -36px 0;}
        .acc-inner{padding:0 36px;}
        @media(max-width:640px){.acc-inner{padding:0 16px;}}
        @media(max-width:640px){.acc-wrap{margin:-16px -16px 0;border-radius:0;}}
      `}</style>

      {/* HERO BÉBÉ */}
      {dataR && saReelle && (
        <div style={{textAlign:'center' as const, padding:'24px 24px 36px'}}>
          <div className="hero-emoji" style={{width:'180px', height:'220px', margin:'0 auto 16px', position:'relative', cursor:'pointer'}}>
            <div style={{position:'absolute', inset:'-20px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,160,96,0.25) 0%,transparent 65%)', pointerEvents:'none'}}></div>
            <img src={`/sa-${saReelle}.png`} alt={`Bébé à ${saReelle} semaines`} onError={(e:any) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} style={{width:'100%', height:'100%', objectFit:'contain', position:'relative', zIndex:1, filter:'drop-shadow(0 12px 24px rgba(0,0,0,0.4))'}}/>
            <div style={{display:'none', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1}}>
              <svg viewBox="0 0 100 100" style={{width:'90px', height:'90px'}}>
                <path d="M50 22 C68 22 76 36 74 50 C72 64 62 72 52 75 C42 78 34 74 32 66 C30 58 36 52 42 50" stroke="#e0b870" strokeWidth="11" strokeLinecap="round" fill="none"/>
                <circle cx="52" cy="28" r="13" fill="#e0b870"/>
              </svg>
            </div>
          </div>
          <p style={{color:'#e0b870', fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 8px'}}>Semaine {saReelle} · {tri}</p>
          <p style={{color:'#fff', fontSize:'24px', fontWeight:900, margin:'0 0 6px', lineHeight:1.2}}>{dataR.titre}</p>
          <p style={{color:'rgba(255,255,255,0.55)', fontSize:'14px', margin:'0 0 18px'}}>{dataR.taille} · {dataR.poids}{joursRestants&&joursRestants>0?` · J-${joursRestants}`:''}</p>
          <div style={{maxWidth:'220px', margin:'0 auto'}}>
            <div style={{background:'rgba(255,255,255,0.12)', borderRadius:'99px', height:'6px'}}>
              <div style={{background:'linear-gradient(to right,#c8a060,#e8c070)', width:`${prog}%`, height:'6px', borderRadius:'99px', transition:'width .5s'}}></div>
            </div>
            <p style={{color:'rgba(255,255,255,0.4)', fontSize:'11px', margin:'6px 0 0'}}>{prog}% du chemin parcouru</p>
          </div>
        </div>
      )}

      <div className="acc-inner" style={{display:'flex', flexDirection:'column' as const, gap:'12px'}}>

        {/* MISSION DU JOUR — carte focus */}
        {dataR && (
          <div style={{background:'#fff', borderRadius:'22px', padding:'22px', boxShadow:'0 12px 40px rgba(0,0,0,0.15)', marginTop:'-20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px'}}>
              <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#c8a060', boxShadow:'0 0 8px rgba(200,160,96,0.6)'}}></div>
              <p style={{color:'#c8a060', fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:0}}>Ton rôle cette semaine</p>
            </div>
            <p style={{color:C.dark, fontSize:'17px', fontWeight:700, lineHeight:1.5, margin:'0 0 16px'}}>{dataR.maman_aide}</p>
            {missions.length > 0 && (
              <div style={{borderTop:'1px solid #ede8e0', paddingTop:'14px'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px'}}>
                  <p style={{color:'#6a7585', fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:0}}>Tes missions</p>
                  <span style={{background:missionsDone===missions.length?'rgba(184,240,216,0.5)':'rgba(0,0,0,0.05)', color:missionsDone===missions.length?'#0D6B40':'#6a7585', fontSize:'12px', fontWeight:800, padding:'3px 10px', borderRadius:'12px'}}>{missionsDone}/{missions.length}</span>
                </div>
                <div style={{display:'flex', flexDirection:'column' as const, gap:'6px'}}>
                  {missions.map((m:string, i:number) => {
                    const id = `m${saReelle}_${i}`;
                    const done = missionsChecked[id];
                    return (
                      <button key={id} onClick={() => toggleM(id)} style={{display:'flex', alignItems:'flex-start', gap:'10px', background:done?'rgba(184,240,216,0.3)':'#faf6f0', borderRadius:'12px', padding:'10px 12px', border:'none', cursor:'pointer', textAlign:'left' as const, width:'100%'}}>
                        <div style={{width:'20px', height:'20px', borderRadius:'50%', border:done?'none':'2px solid #d0c8c0', background:done?'#0D6B40':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px'}}>
                          {done && <span style={{color:'#fff', fontSize:'11px', fontWeight:700}}>✓</span>}
                        </div>
                        <p style={{color:done?'#0D6B40':C.dark, fontSize:'14px', lineHeight:1.5, margin:0, textDecoration:done?'line-through':'none', opacity:done?0.7:1}}>{m}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROCHAIN RDV */}
        {nextRdv && (
          <div className="acc-card" style={{background:'#fff', borderRadius:'18px', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
            <button onClick={() => toggle('rdv')} style={{width:'100%', background:'none', border:'none', padding:'16px 18px', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', textAlign:'left' as const}}>
              <div style={{width:'44px', height:'44px', borderRadius:'14px', background:'rgba(200,232,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>{nextRdv.emoji}</div>
              <div style={{flex:1, minWidth:0}}>
                <p style={{color:'#9aa0a8', fontSize:'10px', fontWeight:700, letterSpacing:'1px', margin:'0 0 2px'}}>PROCHAIN RDV{dpa && joursRestants ? ` · J-${Math.max(0,Math.ceil((new Date(new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000).getTime()-new Date().getTime())/(1000*60*60*24)))}` : ''}</p>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:0}}>{nextRdv.titre}</p>
              </div>
              <span style={{color:'#c8c0b8', fontSize:'12px', flexShrink:0}}>{open==='rdv'?'▲':'▼'}</span>
            </button>
            {open === 'rdv' && (
              <div style={{padding:'0 18px 18px', borderTop:'1px solid #ede8e0'}}>
                <p style={{color:C.text, fontSize:'14px', lineHeight:1.7, margin:'14px 0 12px'}}>{nextRdv.desc}</p>
                <p style={{color:'#6a7585', fontSize:'11px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase' as const, margin:'0 0 6px'}}>Ma date de RDV</p>
                <input type="date" value={nextRdvDate} onChange={e=>{saveRdv(e.target.value);saveRdvI(nextRdv.sa,e.target.value);}} style={{background:'#faf6f0', border:'1px solid #e8e0d0', borderRadius:'10px', padding:'10px 14px', fontSize:'14px', color:C.dark, width:'100%', outline:'none'}}/>
                {nextRdvDate && <p style={{color:'#c8a060', fontSize:'12px', margin:'6px 0 0', fontWeight:700}}>✓ Noté le {new Date(nextRdvDate).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
              </div>
            )}
          </div>
        )}

        {/* CE QUE VIT MAMAN */}
        {dataR && (
          <div className="acc-card" style={{background:'#fff', borderRadius:'18px', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
            <button onClick={() => toggle('maman')} style={{width:'100%', background:'none', border:'none', padding:'16px 18px', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', textAlign:'left' as const}}>
              <div style={{width:'44px', height:'44px', borderRadius:'14px', background:'rgba(184,240,216,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>💚</div>
              <div style={{flex:1, minWidth:0}}>
                <p style={{color:'#9aa0a8', fontSize:'10px', fontWeight:700, letterSpacing:'1px', margin:'0 0 2px'}}>CE QUE VIT MAMAN</p>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:0}}>{dataR.maman_titre}</p>
              </div>
              <span style={{color:'#c8c0b8', fontSize:'12px', flexShrink:0}}>{open==='maman'?'▲':'▼'}</span>
            </button>
            {open === 'maman' && (
              <div style={{padding:'0 18px 18px', borderTop:'1px solid #ede8e0'}}>
                <p style={{color:C.text, fontSize:'14px', lineHeight:1.7, margin:'14px 0 14px'}}>{dataR.maman}</p>
                <div style={{background:'rgba(184,240,216,0.3)', borderRadius:'12px', padding:'12px 14px', borderLeft:'3px solid #0D6B40'}}>
                  <p style={{color:'#0D6B40', fontSize:'11px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase' as const, margin:'0 0 4px'}}>Conseil</p>
                  <p style={{color:'#0A2E1A', fontSize:'14px', lineHeight:1.6, margin:0}}>{dataR.conseil}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* À SAVOIR */}
        {dataR && (
          <div className="acc-card" style={{background:'#fff', borderRadius:'18px', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
            <button onClick={() => toggle('savoir')} style={{width:'100%', background:'none', border:'none', padding:'16px 18px', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', textAlign:'left' as const}}>
              <div style={{width:'44px', height:'44px', borderRadius:'14px', background:'rgba(200,232,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>📋</div>
              <div style={{flex:1, minWidth:0}}>
                <p style={{color:'#9aa0a8', fontSize:'10px', fontWeight:700, letterSpacing:'1px', margin:'0 0 2px'}}>À SAVOIR CETTE SEMAINE</p>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:0}}>{dataR.doc_titre}</p>
              </div>
              <span style={{color:'#c8c0b8', fontSize:'12px', flexShrink:0}}>{open==='savoir'?'▲':'▼'}</span>
            </button>
            {open === 'savoir' && (
              <div style={{padding:'0 18px 18px', borderTop:'1px solid #ede8e0'}}>
                <p style={{color:C.text, fontSize:'14px', lineHeight:1.7, margin:'14px 0 14px'}}>{dataR.doc}</p>
                <div style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)', borderRadius:'12px', padding:'14px 16px'}}>
                  <p style={{color:'rgba(200,160,96,0.7)', fontSize:'11px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase' as const, margin:'0 0 6px'}}>Le savais-tu</p>
                  <p style={{color:'rgba(255,255,255,0.9)', fontSize:'14px', lineHeight:1.7, margin:0}}>{dataR.savistu}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* IDÉE DU MOIS */}
        <div className="acc-card" style={{background:'#fff', borderRadius:'18px', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
          <button onClick={() => toggle('idee')} style={{width:'100%', background:'none', border:'none', padding:'16px 18px', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', textAlign:'left' as const}}>
            <div style={{width:'44px', height:'44px', borderRadius:'14px', background:'rgba(255,232,160,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>💡</div>
            <div style={{flex:1, minWidth:0}}>
              <p style={{color:'#9aa0a8', fontSize:'10px', fontWeight:700, letterSpacing:'1px', margin:'0 0 2px'}}>IDÉE DU MOIS</p>
              <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const}}>{idee}</p>
            </div>
            <span style={{color:'#c8c0b8', fontSize:'12px', flexShrink:0}}>{open==='idee'?'▲':'▼'}</span>
          </button>
          {open === 'idee' && (
            <div style={{padding:'0 18px 18px', borderTop:'1px solid #ede8e0'}}>
              <p style={{color:C.text, fontSize:'14px', lineHeight:1.7, margin:'14px 0 0'}}>{idee}</p>
            </div>
          )}
        </div>

        {/* MENTION MÉDICALE */}
        <div style={{background:'rgba(200,232,255,0.2)', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'10px', border:'1px solid rgba(46,95,138,0.15)'}}>
          <span style={{fontSize:'16px', flexShrink:0}}>⚕️</span>
          <p style={{color:'#2E5F8A', fontSize:'13px', lineHeight:1.6, margin:0}}>DadUp ne remplace pas l&apos;avis d&apos;un médecin. En cas de doute, appelle ta sage-femme ou ton médecin.</p>
        </div>

      </div>
    </div>
  );
}
