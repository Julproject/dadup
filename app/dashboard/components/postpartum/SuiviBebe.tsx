'use client';
import { useState } from 'react';

type EntreeJour = {
  heure: string;
  seins: ('G' | 'D')[];   // allaitement : un ou deux seins
  ml: string;              // biberon
  urines: boolean;
  selles: boolean;
  note: string;
};

type JourData = {
  poids: string;
  entrees: EntreeJour[];
};

const JOURS_LABELS = ['Jour 1','Jour 2','Jour 3','Jour 4','Jour 5','Jour 6','Jour 7'];

function heureActuelle(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}

function entreeVide(): EntreeJour {
  return { heure: heureActuelle(), seins:[], ml:'', urines:false, selles:false, note:'' };
}

function jourVide(): JourData {
  return { poids:'', entrees:[] };
}

function entreeRemplie(e: EntreeJour): boolean {
  return !!(e.heure || e.seins.length || e.ml || e.urines || e.selles || e.note);
}

function resumeEntree(e: EntreeJour, mode: 'allaitement'|'biberon'): string {
  const parts: string[] = [];
  if (e.heure) parts.push(e.heure);
  if (mode === 'allaitement' && e.seins.length) parts.push(`Sein ${e.seins.join('+')} `);
  if (mode === 'biberon' && e.ml) parts.push(`${e.ml} ml`);
  if (e.urines) parts.push('Urines');
  if (e.selles) parts.push('Selles');
  if (e.note) parts.push(e.note);
  return parts.join(' · ');
}

export default function SuiviBebe({C}: any) {
  const [jours, setJours]           = useState<JourData[]>(Array.from({length:7}, ()=>jourVide()));
  const [jourActif, setJourActif]   = useState(0);
  const [modeAllaitement, setMode]  = useState<'allaitement'|'biberon'>('allaitement');
  const [entreeOuverte, setOuverte] = useState<number|null>(null);

  const jour = jours[jourActif];

  const updateJour = (fn:(j:JourData)=>JourData) => {
    setJours(prev => {
      const next = [...prev];
      next[jourActif] = fn(next[jourActif]);
      return next;
    });
  };

  const updateEntree = (idx: number, fn:(e:EntreeJour)=>EntreeJour) => {
    updateJour(j => {
      const entrees = [...j.entrees];
      entrees[idx] = fn(entrees[idx]);
      return {...j, entrees};
    });
  };

  const toggleSein = (idx: number, sein: 'G'|'D') => {
    updateEntree(idx, e => {
      const seins = e.seins.includes(sein)
        ? e.seins.filter(s => s !== sein)
        : [...e.seins, sein];
      return {...e, seins};
    });
  };

  const ajouterEntree = () => {
    const nouvelIdx = jour.entrees.length;
    updateJour(j => ({...j, entrees:[...j.entrees, entreeVide()]}));
    setOuverte(nouvelIdx);
  };

  const totalUrines = jour.entrees.filter(e => e.urines).length;
  const totalSelles = jour.entrees.filter(e => e.selles).length;
  const totalTetees = jour.entrees.filter(e => e.seins.length > 0 || e.ml).length;

  const inputStyle = {
    background:'#f7f5f0', border:'1.5px solid #f0ede8', borderRadius:'10px',
    padding:'8px 12px', fontSize:'14px', color:'#1e2535', outline:'none',
    width:'100%', fontFamily:'inherit',
  };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* EN-TÊTE */}
      <div style={{background:'#1A3D5C',borderRadius:'22px',padding:'22px 24px'}}>
        <p style={{color:'rgba(200,220,240,0.55)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 6px'}}>Suivi des 7 premiers jours</p>
        <p style={{color:'#fff',fontSize:'18px',fontWeight:800,margin:'0 0 4px'}}>Carnet de bord de bébé</p>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',margin:0}}>Tétées, urines, selles et notes.</p>
      </div>

      {/* MODE */}
      <div style={{display:'flex',gap:'8px'}}>
        {(['allaitement','biberon'] as const).map(m=>(
          <button key={m} onClick={()=>setMode(m)} style={{
            flex:1, padding:'10px', border:'none', borderRadius:'14px', cursor:'pointer',
            background: modeAllaitement===m ? '#1e2535' : '#f7f5f0',
            color: modeAllaitement===m ? '#fff' : '#1e2535',
            fontSize:'13px', fontWeight:700,
          }}>
            {m==='allaitement' ? 'Allaitement' : 'Biberon'}
          </button>
        ))}
      </div>

      {/* NAVIGATION JOURS */}
      <div style={{display:'flex',gap:'6px',overflowX:'auto' as const}}>
        {JOURS_LABELS.map((label,i)=>{
          const j = jours[i];
          const hasData = j.entrees.some(e => entreeRemplie(e));
          return (
            <button key={i} onClick={()=>setJourActif(i)} style={{
              flexShrink:0, padding:'8px 14px', border:'none', borderRadius:'20px', cursor:'pointer',
              background: jourActif===i ? '#1e2535' : hasData ? '#E4F5EC' : '#f7f5f0',
              color: jourActif===i ? '#fff' : hasData ? '#0D6B40' : '#9aa0a8',
              fontSize:'12px', fontWeight:700,
            }}>
              {label}
              {hasData && jourActif!==i && <span style={{display:'block',fontSize:'9px',marginTop:'1px'}}>✓</span>}
            </button>
          );
        })}
      </div>

      {/* POIDS */}
      <div style={{display:'flex',alignItems:'center',gap:'12px',background:'#f7f5f0',borderRadius:'16px',padding:'14px 18px'}}>
        <span style={{fontSize:'13px',fontWeight:700,color:'#1e2535',flexShrink:0}}>Poids ce jour</span>
        <input
          type="number"
          placeholder="ex: 3420"
          value={jour.poids}
          onChange={e=>updateJour(j=>({...j,poids:e.target.value}))}
          style={{...inputStyle,width:'120px'}}
        />
        <span style={{fontSize:'13px',color:'#9aa0a8'}}>g</span>
      </div>

      {/* RÉSUMÉ DU JOUR */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
        {[
          {label:'Tétées',  val:totalTetees, color:'#E6F0FA', tc:'#1A4A7A'},
          {label:'Urines',  val:totalUrines, color:'#E4F5EC', tc:'#0D6B40'},
          {label:'Selles',  val:totalSelles, color:'#FFF7E0', tc:'#8A6010'},
        ].map(s=>(
          <div key={s.label} style={{background:s.color,borderRadius:'14px',padding:'12px',textAlign:'center' as const}}>
            <p style={{color:s.tc,fontSize:'22px',fontWeight:800,margin:'0 0 3px'}}>{s.val}</p>
            <p style={{color:s.tc,fontSize:'11px',fontWeight:600,margin:0}}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* LISTE DES ENTRÉES */}
      <div>
        <p style={{color:'#1e2535',fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 12px'}}>
          Enregistrements {jour.entrees.length > 0 ? `(${jour.entrees.length})` : ''}
        </p>

        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {jour.entrees.map((entree, idx) => {
            const isOpen = entreeOuverte === idx;
            const remplie = entreeRemplie(entree);

            return (
              <div key={idx}>
                {/* LIGNE RÉSUMÉE (fermée) */}
                {!isOpen ? (
                  <button
                    onClick={()=>setOuverte(idx)}
                    style={{
                      width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                      background: remplie ? '#f7f5f0' : '#fff',
                      border:'1px solid #f0ede8', borderRadius:'14px',
                      padding:'12px 16px', cursor:'pointer', textAlign:'left' as const,
                    }}
                  >
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{
                        width:'28px',height:'28px',borderRadius:'50%',
                        background: remplie ? '#1e2535' : '#f0ede8',
                        color: remplie ? '#fff' : '#9aa0a8',
                        display:'flex',alignItems:'center',justifyContent:'center',
                        fontSize:'11px',fontWeight:700,flexShrink:0,
                      }}>{idx+1}</span>
                      <span style={{color: remplie ? '#1e2535' : '#9aa0a8', fontSize:'13px', fontWeight: remplie ? 600 : 400}}>
                        {remplie ? resumeEntree(entree, modeAllaitement) : 'Nouvelle entrée...'}
                      </span>
                    </div>
                    <span style={{color:'#9aa0a8',fontSize:'16px'}}>✎</span>
                  </button>
                ) : (
                  /* FORMULAIRE OUVERT */
                  <div style={{background:'#fff',borderRadius:'18px',padding:'16px',border:'1.5px solid #1e2535'}}>

                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                      <span style={{fontSize:'13px',fontWeight:700,color:'#1e2535'}}>Entrée {idx+1}</span>
                      <button onClick={()=>setOuverte(null)} style={{
                        background:'#1e2535',border:'none',color:'#fff',
                        borderRadius:'20px',padding:'4px 12px',fontSize:'12px',
                        fontWeight:700,cursor:'pointer',
                      }}>Fermer</button>
                    </div>

                    {/* HEURE */}
                    <div style={{marginBottom:'12px'}}>
                      <label style={{display:'block',fontSize:'11px',fontWeight:700,color:'#9aa0a8',marginBottom:'5px'}}>Heure</label>
                      <input
                        type="time"
                        value={entree.heure}
                        onChange={e=>updateEntree(idx,e2=>({...e2,heure:e.target.value}))}
                        style={{...inputStyle,width:'140px'}}
                      />
                    </div>

                    {/* ALLAITEMENT ou BIBERON */}
                    {modeAllaitement==='allaitement' ? (
                      <div style={{marginBottom:'12px'}}>
                        <label style={{display:'block',fontSize:'11px',fontWeight:700,color:'#9aa0a8',marginBottom:'7px'}}>Sein(s)</label>
                        <div style={{display:'flex',gap:'8px'}}>
                          {(['G','D'] as const).map(s=>{
                            const active = entree.seins.includes(s);
                            return (
                              <button key={s} onClick={()=>toggleSein(idx,s)} style={{
                                flex:1, padding:'10px', border:'none', borderRadius:'12px', cursor:'pointer',
                                fontWeight:800, fontSize:'16px',
                                background: active ? '#1e2535' : '#f7f5f0',
                                color: active ? '#fff' : '#9aa0a8',
                              }}>
                                {s}
                                {active && <span style={{fontSize:'11px',display:'block',fontWeight:600,marginTop:'2px'}}>{s==='G'?'Gauche':'Droit'}</span>}
                              </button>
                            );
                          })}
                        </div>
                        {entree.seins.length === 2 && (
                          <p style={{color:'#0D6B40',fontSize:'12px',marginTop:'6px',fontWeight:600}}>Les deux seins</p>
                        )}
                      </div>
                    ) : (
                      <div style={{marginBottom:'12px'}}>
                        <label style={{display:'block',fontSize:'11px',fontWeight:700,color:'#9aa0a8',marginBottom:'5px'}}>Quantité (ml)</label>
                        <input
                          type="number"
                          placeholder="ex: 60"
                          value={entree.ml}
                          onChange={e=>updateEntree(idx,e2=>({...e2,ml:e.target.value}))}
                          style={{...inputStyle,width:'120px'}}
                        />
                      </div>
                    )}

                    {/* URINES + SELLES */}
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'12px'}}>
                      {[
                        {key:'urines' as const, label:'Urines',  color:'#E4F5EC', tc:'#0D6B40'},
                        {key:'selles' as const, label:'Selles',  color:'#FFF7E0', tc:'#8A6010'},
                      ].map(btn=>(
                        <button key={btn.key} onClick={()=>updateEntree(idx,e=>({...e,[btn.key]:!e[btn.key]}))} style={{
                          padding:'10px', border:'none', borderRadius:'12px', cursor:'pointer',
                          background: entree[btn.key] ? btn.color : '#f7f5f0',
                          color: entree[btn.key] ? btn.tc : '#9aa0a8',
                          fontWeight:700, fontSize:'13px',
                        }}>
                          {entree[btn.key] ? '✓ ' : ''}{btn.label}
                        </button>
                      ))}
                    </div>

                    {/* NOTE */}
                    <div>
                      <label style={{display:'block',fontSize:'11px',fontWeight:700,color:'#9aa0a8',marginBottom:'5px'}}>Note (facultatif)</label>
                      <input
                        type="text"
                        placeholder="Coliques, régurgitation, peau à peau..."
                        value={entree.note}
                        onChange={e=>updateEntree(idx,e2=>({...e2,note:e.target.value}))}
                        style={inputStyle}
                      />
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AJOUTER */}
        <button onClick={ajouterEntree} style={{
          width:'100%', marginTop:'10px', padding:'13px',
          background:'none', border:'2px dashed #f0ede8',
          borderRadius:'16px', cursor:'pointer',
          color:'#9aa0a8', fontSize:'13px', fontWeight:700,
        }}>
          + Ajouter une entrée
        </button>
      </div>

      {/* INFO */}
      <div style={{background:'#f7f5f0',borderRadius:'16px',padding:'16px 18px'}}>
        <p style={{color:'#9aa0a8',fontSize:'12px',lineHeight:1.7,margin:0}}>
          Un nouveau-né mouille en moyenne 6 couches par jour et a 3 à 4 selles les premiers jours. Ces chiffres permettent de vérifier que bébé s'hydrate et s'alimente correctement. En cas de doute, appelle la sage-femme ou le pédiatre.
        </p>
      </div>

    </div>
  );
}
