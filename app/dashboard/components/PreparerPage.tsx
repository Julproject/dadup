'use client';
import { useState } from 'react';

const VALISE = [
  { titre:'Pour toi', color:'#FFF0E6', tc:'#C04A1A', items:[
    {id:'v1', label:'Chargeur et batterie externe'},
    {id:'v2', label:'Vêtements confortables'},
    {id:'v3', label:'Nourriture et boissons'},
    {id:'v4', label:'Carte Vitale et carte mutuelle'},
    {id:'v5', label:"Pièce d'identité"},
  ]},
  { titre:'Pour elle', color:'#E4F5EC', tc:'#0D6B40', items:[
    {id:'v6', label:'Robe de chambre'},
    {id:'v7', label:'Chaussons antidérapants'},
    {id:'v8', label:"Soutien-gorge d'allaitement"},
    {id:'v9', label:"Coussin de grossesse ou d'allaitement"},
    {id:'v10', label:'Affaires de toilette'},
    {id:'v11', label:'Téléphone chargé'},
  ]},
  { titre:'Pour bébé', color:'#E6F0FA', tc:'#1A4A7A', items:[
    {id:'v12', label:'Bodies (3 à 5 pièces)'},
    {id:'v13', label:'Pyjamas (2 à 3 pièces)'},
    {id:'v14', label:'Bonnet et chaussettes'},
    {id:'v15', label:'Couverture'},
    {id:'v16', label:'Siège auto (obligatoire pour quitter la maternité)'},
  ]},
  { titre:'Documents', color:'#FFF7E0', tc:'#8A6010', items:[
    {id:'v17', label:'Carnet de maternité'},
    {id:'v18', label:'Ordonnances en cours'},
    {id:'v19', label:'Plan de naissance'},
    {id:'v20', label:'Numéro de la maternité'},
  ]},
];

const ACHATS = [
  {id:'a1', label:'Poussette', prix:'200 à 1200€', essentiel:true},
  {id:'a2', label:'Siège auto groupe 0+', prix:'80 à 400€', essentiel:true},
  {id:'a3', label:'Lit cododo ou berceau', prix:'60 à 400€', essentiel:true},
  {id:'a4', label:'Baignoire bébé', prix:'20 à 60€', essentiel:false},
  {id:'a5', label:'Tire-lait électrique (si allaitement)', prix:'30 à 200€', essentiel:false},
  {id:'a6', label:'Thermomètre rectal', prix:'15 à 40€', essentiel:true},
  {id:'a7', label:'Humidificateur', prix:'30 à 80€', essentiel:false},
];

function genererPDF(valiseChecked: Record<string,boolean>, achatChecked: Record<string,boolean>) {
  const items_faits = VALISE.flatMap(g => g.items).filter(i => valiseChecked[i.id]);
  const items_manquants = VALISE.flatMap(g => g.items).filter(i => !valiseChecked[i.id]);

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<title>Valise maternité DadUp</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1e2535;padding:40px;max-width:680px;margin:0 auto;}
  .header{text-align:center;margin-bottom:36px;padding-bottom:20px;border-bottom:2px solid #f0ede8;}
  .logo{font-size:26px;font-weight:900;color:#1e2535;margin-bottom:4px;}
  .subtitle{font-size:14px;color:#9aa0a8;}
  .date{font-size:11px;color:#c8c0b8;margin-top:4px;}
  .stats{display:flex;gap:12px;margin-bottom:28px;}
  .stat{flex:1;text-align:center;padding:14px;border-radius:12px;}
  .stat-done{background:#E4F5EC;}
  .stat-todo{background:#FDECEA;}
  .stat-n{font-size:26px;font-weight:800;}
  .stat-n-done{color:#0D6B40;}
  .stat-n-todo{color:#A03030;}
  .stat-l{font-size:11px;color:#6a7585;margin-top:2px;}
  .section{margin-bottom:24px;}
  .section-title{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;padding:6px 12px;border-radius:8px;display:inline-block;}
  .done-title{background:#E4F5EC;color:#0D6B40;}
  .todo-title{background:#FDECEA;color:#A03030;}
  .achat-title{background:#E6F0FA;color:#1A4A7A;}
  .item{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f7f5f0;}
  .item:last-child{border:none;}
  .check{width:18px;height:18px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;font-weight:700;}
  .ck-done{background:#0D6B40;color:white;}
  .ck-todo{border:1.5px solid #A03030;color:#A03030;}
  .lbl{font-size:13px;flex:1;}
  .lbl-done{color:#0D6B40;text-decoration:line-through;opacity:0.65;}
  .lbl-todo{color:#1e2535;}
  .prix{font-size:11px;color:#c8a060;font-weight:700;}
  .footer{margin-top:32px;padding-top:16px;border-top:1px solid #f0ede8;text-align:center;color:#c8c0b8;font-size:10px;}
  @media print{body{padding:20px;}}
</style>
</head>
<body>
  <div class="header">
    <div class="logo">👶 DadUp</div>
    <div class="subtitle">Valise maternité — Checklist partagée</div>
    <div class="date">Générée le ${new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
  </div>

  <div class="stats">
    <div class="stat stat-done">
      <div class="stat-n stat-n-done">${items_faits.length}</div>
      <div class="stat-l">articles prêts ✓</div>
    </div>
    <div class="stat stat-todo">
      <div class="stat-n stat-n-todo">${items_manquants.length}</div>
      <div class="stat-l">articles restants</div>
    </div>
  </div>

  ${items_faits.length > 0 ? `
  <div class="section">
    <div class="section-title done-title">✓ Déjà prêt (${items_faits.length})</div>
    ${items_faits.map(i=>`<div class="item"><div class="check ck-done">✓</div><span class="lbl lbl-done">${i.label}</span></div>`).join('')}
  </div>` : ''}

  ${items_manquants.length > 0 ? `
  <div class="section">
    <div class="section-title todo-title">À préparer (${items_manquants.length})</div>
    ${items_manquants.map(i=>`<div class="item"><div class="check ck-todo">✗</div><span class="lbl lbl-todo">${i.label}</span></div>`).join('')}
  </div>` : ''}

  <div class="section">
    <div class="section-title achat-title">Achats prioritaires</div>
    ${ACHATS.map(a=>`<div class="item"><div class="check ${achatChecked[a.id]?'ck-done':'ck-todo'}">${achatChecked[a.id]?'✓':'✗'}</div><span class="lbl ${achatChecked[a.id]?'lbl-done':'lbl-todo'}">${a.label}${a.essentiel?' ⭐':''}</span><span class="prix">${a.prix}</span></div>`).join('')}
  </div>

  <div class="footer">DadUp · dadup.fr · ⭐ = essentiel</div>
</body>
</html>`;

  const blob = new Blob([html], {type:'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const w = window.open(url, '_blank');
  if (w) setTimeout(() => w.print(), 600);
}

export default function PreparerPage({C, valiseChecked, toggleV}:any) {
  const [achatChecked, setAchatChecked] = useState<Record<string,boolean>>({});
  const toggleA = (id:string) => setAchatChecked(u => ({...u, [id]: !u[id]}));

  const allItems = VALISE.flatMap(g => g.items);
  const totalV = allItems.length;
  const doneV  = allItems.filter(i => valiseChecked[i.id]).length;
  const pct    = Math.round((doneV / totalV) * 100);

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'12px'}}>
        <h2 style={{color:C.dark,fontSize:'22px',fontWeight:800,margin:0}}>À préparer</h2>
        <button onClick={()=>genererPDF(valiseChecked,achatChecked)} style={{display:'flex',alignItems:'center',gap:'8px',background:C.blue,color:'#fff',border:'none',padding:'10px 18px',borderRadius:'20px',fontSize:'13px',fontWeight:700,cursor:'pointer'}}>
          📄 Partager avec la maman
        </button>
      </div>

      {/* PROGRESSION */}
      <div style={{background:'#f7f5f0',borderRadius:'16px',padding:'16px 20px'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
          <span style={{fontSize:'13px',fontWeight:700,color:C.dark}}>Valise maternité</span>
          <span style={{fontSize:'13px',fontWeight:800,color:pct===100?'#0D6B40':C.gold}}>{doneV}/{totalV} · {pct}%</span>
        </div>
        <div style={{background:'#e8e0d0',borderRadius:'4px',height:'6px'}}>
          <div style={{background:pct===100?'#0D6B40':C.gold,height:'6px',borderRadius:'4px',width:pct+'%',transition:'width 0.3s'}}/>
        </div>
      </div>

      {/* VALISE PAR GROUPE */}
      {VALISE.map(groupe=>{
        const done = groupe.items.filter(i=>valiseChecked[i.id]).length;
        return (
          <div key={groupe.titre} style={{background:groupe.color,borderRadius:'18px',padding:'18px 20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
              <p style={{color:groupe.tc,fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:0}}>{groupe.titre}</p>
              <span style={{background:'rgba(255,255,255,0.6)',color:groupe.tc,fontSize:'11px',fontWeight:700,padding:'2px 10px',borderRadius:'10px'}}>{done}/{groupe.items.length}</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {groupe.items.map(item=>{
                const checked = valiseChecked[item.id];
                return (
                  <button key={item.id} onClick={()=>toggleV(item.id)} style={{display:'flex',alignItems:'center',gap:'10px',background:'none',border:'none',cursor:'pointer',textAlign:'left' as const,padding:'4px 0'}}>
                    <div style={{width:'20px',height:'20px',borderRadius:'6px',background:checked?'#0D6B40':'rgba(255,255,255,0.7)',border:checked?'none':'1.5px solid rgba(0,0,0,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      {checked&&<span style={{color:'#fff',fontSize:'11px',fontWeight:700}}>✓</span>}
                    </div>
                    <p style={{color:checked?'#0D6B40':C.dark,fontSize:'14px',margin:0,textDecoration:checked?'line-through':'none',opacity:checked?0.6:1}}>{item.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ACHATS */}
      <div>
        <p style={{color:'#1A4A7A',fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 14px'}}>Achats prioritaires</p>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {ACHATS.map(a=>{
            const checked = achatChecked[a.id];
            return (
              <button key={a.id} onClick={()=>toggleA(a.id)} style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px',background:checked?'#E4F5EC':'#f7f5f0',borderRadius:'14px',border:'none',cursor:'pointer',textAlign:'left' as const,width:'100%'}}>
                <div style={{width:'20px',height:'20px',borderRadius:'6px',background:checked?'#0D6B40':'transparent',border:checked?'none':'1.5px solid #ccc',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {checked&&<span style={{color:'#fff',fontSize:'11px',fontWeight:700}}>✓</span>}
                </div>
                <p style={{color:checked?'#0D6B40':C.dark,fontSize:'14px',margin:0,flex:1,textDecoration:checked?'line-through':'none',opacity:checked?0.6:1}}>{a.label}{a.essentiel?' ⭐':''}</p>
                <span style={{color:C.gold,fontSize:'12px',fontWeight:700,flexShrink:0}}>{a.prix}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOUTON BAS */}
      <div style={{textAlign:'center' as const,paddingTop:'8px'}}>
        <button onClick={()=>genererPDF(valiseChecked,achatChecked)} style={{display:'inline-flex',alignItems:'center',gap:'8px',background:C.dark,color:'#fff',border:'none',padding:'14px 28px',borderRadius:'32px',fontSize:'14px',fontWeight:700,cursor:'pointer'}}>
          📄 Générer le PDF à partager
        </button>
        <p style={{color:C.muted,fontSize:'12px',marginTop:'8px'}}>S'ouvre dans un nouvel onglet · Imprimable et partageable</p>
      </div>

    </div>
  );
}
