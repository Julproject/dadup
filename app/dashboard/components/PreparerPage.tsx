'use client';
import { useState, useEffect } from 'react';

// ── Données Valise ────────────────────────────────────────────────────────────
const VALISE = [
  {
    titre: 'Pour toi',
      couleur: '#E6F0FA',
    tc: '#1A4A7A',
    items: [
      { id:'v1',  label:`Chargeur de téléphone + batterie externe` },
      { id:'v2',  label:`Vêtements confortables (2 ou 3 tenues)` },
      { id:'v3',  label:`Collations (barres, fruits secs, boissons)` },
      { id:'v4',  label:`Pull ou gilet léger (les salles peuvent être fraîches)` },
      { id:'v5',  label:`Carte Vitale et carte mutuelle` },
      { id:'v6',  label:`Pièce d'identité` },
    ],
  },
  {
    titre: 'Pour elle',
      couleur: '#FFF0E6',
    tc: '#C04A1A',
    items: [
      { id:'v7',  label:`Robe de chambre et chaussons antidérapants` },
      { id:'v8',  label:`Soutien-gorge d'allaitement (2 pièces)` },
      { id:'v9',  label:`Serviettes hygiéniques post-partum ou culottes jetables` },
      { id:'v10', label:`Brumisateur ou petite bouteille d'eau` },
      { id:'v11', label:`Affaires de toilette complètes` },
      { id:'v12', label:`Téléphone chargé + chargeur` },
      { id:'v13', label:`Lingettes, coton ou eau nettoyante si la maternité ne fournit pas tout` },
    ],
  },
  {
    titre: 'Pour bébé',
      couleur: '#E4F5EC',
    tc: '#0D6B40',
    items: [
      { id:'v14', label:`Bodies (3 à 5 pièces, taille naissance et 1 mois)` },
      { id:'v15', label:`Pyjamas (2 à 3 pièces)` },
      { id:'v16', label:`Bonnet, chaussettes, moufles` },
      { id:'v17', label:`Couverture ou lange` },
      { id:'v18', label:`1 ou 2 tenues de sortie selon la saison` },
      { id:'v19', label:`Gigoteuse si la maternité n'en fournit pas` },
      { id:'v20', label:`Siège auto (obligatoire pour quitter la maternité)` },
    ],
  },
  {
    titre: 'Documents',
      couleur: '#FFF7E0',
    tc: '#8A6010',
    items: [
      { id:'v21', label:`Carnet de maternité` },
      { id:'v22', label:`Plan de naissance (vos souhaits pour l'accouchement)` },
      { id:'v23', label:`Ordonnances en cours` },
      { id:'v24', label:`Attestation de mutuelle` },
      { id:'v25', label:`Numéro direct de la maternité enregistré dans le téléphone` },
    ],
  },
];

// ── Données Maison ────────────────────────────────────────────────────────────
const MAISON = [
  {
    titre: 'Sommeil de bébé',
      couleur: '#E6F0FA',
    tc: '#1A4A7A',
    info: `Bébé doit dormir sur le dos, dans son propre espace de sommeil, sans oreiller ni couette (recommandation HAS).`,
    items: [
      { id:'m1',  label:`Lit cododo, berceau ou couffin installé et prêt` },
      { id:'m2',  label:`Draps et protège-matelas adaptés (au moins 3 de rechange)` },
      { id:'m3',  label:`Gigoteuse (remplace la couette, plus sûre pour bébé)` },
      { id:'m4',  label:`Veilleuse pour les changes et tétées de nuit` },
    ],
  },
  {
    titre: 'Change et toilette',
      couleur: '#E4F5EC',
    tc: '#0D6B40',
    info: `Tout ce dont tu as besoin pour changer et laver bébé. Prévoir un coin change fixe évite de chercher partout à 3h du matin.`,
    items: [
      { id:'m5',  label:`Matelas à langer avec housse lavable` },
      { id:'m6',  label:`Couches nouveau-né (prévoir au moins 2 paquets)` },
      { id:'m7',  label:`Lingettes bébé sans parfum ou coton + eau nettoyante` },
      { id:'m8',  label:`Crème pour les fesses (érythème fessier = rougeur courante)` },
      { id:'m9',  label:`Produit lavant doux pour bébé` },
      { id:'m10', label:`Langes et bavoirs (prévoir en grande quantité)` },
      { id:'m11', label:`Cape de bain douce` },
      { id:'m12', label:`Poubelle à couches si vous voulez limiter les odeurs` },
    ],
  },
  {
    titre: 'Alimentation',
      couleur: '#FFF0E6',
    tc: '#C04A1A',
    info: `Que vous allaitiez ou non, avoir quelques biberons à la maison est utile. La décision peut évoluer après la naissance.`,
    items: [
      { id:'m13', label:`Biberons (2 à 3, même si allaitement prévu)` },
      { id:'m14', label:`Tire-lait manuel ou électrique (si allaitement)` },
      { id:'m15', label:`Coussin d'allaitement (facilite les tétées et le portage)` },
      { id:'m16', label:`Stock de repas simples préparés à l'avance ou au congélateur` },
      { id:'m17', label:`Courses de base pour les premiers jours (snacks, boissons, repas faciles)` },
    ],
  },
  {
    titre: 'Santé et suivi',
      couleur: '#FDECEA',
    tc: '#A03030',
    info: `Prenez rendez-vous chez le pédiatre maintenant. L'examen J8 (8 jours après la naissance) est obligatoire.`,
    items: [
      { id:'m18', label:`Thermomètre rectal (le plus fiable pour les nourrissons)` },
      { id:'m19', label:`Médicaments recommandés par le médecin (sérum physiologique, etc.)` },
      { id:'m20', label:`Pédiatre choisi et coordonnées enregistrées` },
      { id:'m21', label:`Sage-femme de ville contactée pour le suivi post-natal` },
      { id:'m22', label:`Numéros d'urgence notés (pédiatre, maternité, 15)` },
    ],
  },
  {
    titre: 'Organisation à la maison',
      couleur: '#FFF7E0',
    tc: '#8A6010',
    info: `Un espace organisé avant l'arrivée de bébé, c'est moins de stress après. Pense à un coin change fixe et une zone pour les affaires de bébé.`,
    items: [
      { id:'m23', label:`Coin change fixe et organisé` },
      { id:'m24', label:`Espace de rangement dédié aux affaires de bébé` },
      { id:'m25', label:`Linge de maison lavé et rangé (draps, serviettes)` },
      { id:'m26', label:`Maison nettoyée et prête pour le retour` },
    ],
  },
  {
    titre: 'Sorties et transport',
      couleur: '#E4F5EC',
    tc: '#0D6B40',
    info: `Le siège auto est obligatoire dès la sortie de maternité. Fais-le vérifier par un professionnel avant la naissance.`,
    items: [
      { id:'m27', label:`Siège auto installé et vérifié par un professionnel` },
      { id:'m28', label:`Poussette assemblée et testée` },
      { id:'m29', label:`Tenues de sortie adaptées à la saison` },
      { id:'m30', label:`Sac à langer avec l'essentiel pour les sorties` },
    ],
  },
];

// ── Générateur PDF ────────────────────────────────────────────────────────────
function genererPDF(valiseChecked: Record<string,boolean>, maisonChecked: Record<string,boolean>) {
  const allValise = VALISE.flatMap(g => g.items);
  const doneV = allValise.filter(i => valiseChecked[i.id]).length;
  const allMaison = MAISON.flatMap(g => g.items);
  const doneM = allMaison.filter(i => maisonChecked[i.id]).length;

  const renderGroupe = (groupe: typeof VALISE[0], checked: Record<string,boolean>) => {
    const itemsHtml = groupe.items.map(i =>
      '<div class="item">' +
      '<div class="check ' + (checked[i.id] ? 'ck-done' : 'ck-todo') + '">' + (checked[i.id] ? '✓' : '') + '</div>' +
      '<span class="' + (checked[i.id] ? 'lbl-done' : 'lbl-todo') + '">' + i.label + '</span>' +
      '</div>'
    ).join('');
    return '<div class="groupe">' +
      '<div class="groupe-titre">' + groupe.titre + '</div>' +
      itemsHtml +
      '</div>';
  };

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/>
<title>Checklist DadUp</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1e2535;padding:36px;max-width:680px;margin:0 auto;}
.header{text-align:center;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid #f0ede8;}
.logo{font-size:22px;font-weight:900;margin-bottom:4px;}
.sub{font-size:13px;color:#9aa0a8;}
.date{font-size:11px;color:#c8c0b8;margin-top:3px;}
.stats{display:flex;gap:10px;margin-bottom:24px;}
.stat{flex:1;text-align:center;padding:12px;border-radius:10px;background:#f7f5f0;}
.stat-n{font-size:22px;font-weight:800;color:#2E5F8A;}
.stat-l{font-size:11px;color:#9aa0a8;margin-top:2px;}
.section-title{font-size:13px;font-weight:800;color:#1e2535;margin:20px 0 12px;padding-bottom:6px;border-bottom:2px solid #f0ede8;}
.groupe{margin-bottom:16px;}
.groupe-titre{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9aa0a8;margin-bottom:8px;}
.item{display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:1px solid #fafafa;}
.item:last-child{border:none;}
.check{width:16px;height:16px;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;}
.ck-done{background:#0D6B40;color:white;}
.ck-todo{border:1.5px solid #ccc;}
.lbl-done{font-size:13px;color:#0D6B40;text-decoration:line-through;opacity:0.6;}
.lbl-todo{font-size:13px;color:#1e2535;}
.footer{margin-top:28px;padding-top:14px;border-top:1px solid #f0ede8;text-align:center;color:#c8c0b8;font-size:10px;}
@media print{body{padding:16px;}}
</style></head><body>
  <div class="header">
    <div class="logo">DadUp</div>
    <div class="sub">Checklist - Valise & Maison</div>
    <div class="date">Générée le ${new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
  </div>
  <div class="stats">
    <div class="stat"><div class="stat-n">${doneV}/${allValise.length}</div><div class="stat-l">Valise prête</div></div>
    <div class="stat"><div class="stat-n">${doneM}/${allMaison.length}</div><div class="stat-l">Maison prête</div></div>
  </div>
  <div class="section-title">Valise maternité</div>
  ${VALISE.map(g => renderGroupe(g, valiseChecked)).join('')}
  <div class="section-title">À préparer à la maison</div>
  ${MAISON.map(g => renderGroupe(g, maisonChecked)).join('')}
  <div class="footer">DadUp · dadup.fr</div>
</body></html>`;

  const blob = new Blob([html], {type:'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const w = window.open(url, '_blank');
  if (w) setTimeout(() => w.print(), 600);
}

// ── Données Congé Paternité ───────────────────────────────────────────────────
const CONGE = [
  {
    titre: "Ce que dit la loi",
    couleur: "#E6F0FA", tc: "#1A4A7A",
    items: [
      { id:"c1",  label: "28 jours calendaires au total, week-ends et jours fériés inclus" },
      { id:"c2",  label: "7 premiers jours obligatoires, consécutifs, à prendre dès la naissance" },
      { id:"c3",  label: "21 jours restants à prendre dans les 6 mois suivant la naissance" },
      { id:"c4",  label: "Les 21 jours peuvent être fractionnés en 2 périodes minimum" },
      { id:"c5",  label: "En cas de jumeaux : 35 jours au total" },
    ],
  },
  {
    titre: "L'indemnisation",
    couleur: "#E4F5EC", tc: "#0D6B40",
    items: [
      { id:"c6",  label: "Indemnité journalière versée par la CPAM (Assurance Maladie)" },
      { id:"c7",  label: "90% du salaire journalier de base, plafonné à environ 56 euros par jour (2024)" },
      { id:"c8",  label: "Conditions : avoir travaillé au moins 150h sur les 3 derniers mois" },
      { id:"c9",  label: "Délai de carence : 1 jour non indemnisé" },
      { id:"c10", label: "Certains employeurs complètent jusqu'à 100% selon la convention collective" },
    ],
  },
  {
    titre: "Les démarches",
    couleur: "#FFF7E0", tc: "#8A6010",
    items: [
      { id:"c11", label: "Prévenir ton employeur au moins 15 jours avant la date souhaitée" },
      { id:"c12", label: "Envoyer un courrier ou email à ton employeur avec les dates exactes" },
      { id:"c13", label: "Fournir une copie du certificat de naissance à la CPAM" },
      { id:"c14", label: "La CPAM verse les indemnités directement sur ton compte bancaire" },
      { id:"c15", label: "Vérifier ta convention collective : certaines sont plus avantageuses" },
    ],
  },
  {
    titre: "À savoir en plus",
    couleur: "#FFF0E6", tc: "#C04A1A",
    items: [
      { id:"c16", label: "Le congé peut démarrer le jour de la naissance ou dans les jours suivants" },
      { id:"c17", label: "Si bébé est hospitalisé, le congé peut être reporté jusqu'à sa sortie" },
      { id:"c18", label: "Ce congé est cumulable avec le congé de naissance de 3 jours" },
      { id:"c19", label: "Si tu es indépendant, renseigne-toi auprès de ta caisse spécifique" },
    ],
  },
];

// ── Composant ─────────────────────────────────────────────────────────────────
export default function PreparerPage({C, valiseChecked, toggleV, achatChecked, toggleA}: any) {
  const [onglet, setOnglet] = useState<'valise'|'maison'|'conge'>('valise');
  const [maisonChecked, setMaisonChecked] = useState<Record<string,boolean>>({});
  const toggleM = (id: string) => setMaisonChecked(u => ({...u, [id]: !u[id]}));

  const allValise = VALISE.flatMap(g => g.items);
  const doneV = allValise.filter(i => valiseChecked[i.id]).length;
  const pctV  = Math.round((doneV / allValise.length) * 100);

  const allMaison = MAISON.flatMap(g => g.items);
  const doneM = allMaison.filter(i => maisonChecked[i.id]).length;
  const pctM  = Math.round((doneM / allMaison.length) * 100);

  const source = onglet === 'valise' ? VALISE : onglet === 'maison' ? MAISON : CONGE;
  const checked = onglet === 'valise' ? valiseChecked : maisonChecked;
  const toggle  = onglet === 'valise' ? toggleV : toggleM;
  const done    = onglet === 'valise' ? doneV : doneM;
  const total   = onglet === 'valise' ? allValise.length : onglet === 'maison' ? allMaison.length : 0;
  const pct     = onglet === 'valise' ? pctV : onglet === 'maison' ? pctM : 0;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>

      {/* ONGLETS */}
      <div style={{display:'flex',gap:'8px'}}>
        {([
          {id:'valise', label:`Valise maternité`, done:doneV, total:allValise.length},
          {id:'maison', label:`À la maison`,      done:doneM, total:allMaison.length},
          {id:'conge',  label:`Congé paternité`,  done:0,     total:0},
        ] as const).map(t => (
          <button key={t.id} onClick={()=>setOnglet(t.id)} style={{
            flex:1, padding:'12px 8px', border:'none', borderRadius:'16px', cursor:'pointer',
            background: onglet===t.id ? 'linear-gradient(135deg,#0a1f32,#1A3D5C)' : '#fff',
            color: onglet===t.id ? '#fff' : C.dark,
            fontWeight:700, fontSize:'13px', transition:'all 0.15s',
            boxShadow: onglet===t.id ? '0 4px 16px rgba(26,61,92,0.25)' : '0 2px 8px rgba(0,0,0,0.05)',
            border: onglet===t.id ? 'none' : '1px solid #ede8e0',
          }}>
            {t.label}
            <span style={{display:'block',fontSize:'11px',fontWeight:500,marginTop:'2px',opacity:0.65}}>
              {t.done}/{t.total} cochés
            </span>
          </button>
        ))}
      </div>

      {/* PROGRESSION */}
      {onglet !== 'conge' && (
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{flex:1,background:'#f0ede8',borderRadius:'6px',height:'8px'}}>
            <div style={{background:pct===100?'#0D6B40':'linear-gradient(to right,#c8a060,#e8c070)',height:'8px',borderRadius:'6px',width:pct+'%',transition:'width 0.4s'}}/>
          </div>
          <span style={{fontSize:'12px',fontWeight:800,color:pct===100?'#0D6B40':C.gold,flexShrink:0}}>{done}/{total}</span>
        </div>
      )}

      {/* CONTENU */}
      <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
        {source.map(groupe => {
          const groupeDone = groupe.items.filter(i => checked[i.id]).length;
          const all = groupe.items.length;
          return (
            <div key={groupe.titre}>
              {/* En-tête groupe */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
<span style={{fontSize:'16px',fontWeight:800,color:C.dark}}>{groupe.titre}</span>
                </div>
                <span style={{
                  fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'20px',
                  background:groupeDone===all?'rgba(184,240,216,0.5)':groupe.couleur.replace('#E6F0FA','rgba(200,232,255,0.5)').replace('#E4F5EC','rgba(184,240,216,0.5)').replace('#FFF7E0','rgba(255,232,160,0.5)').replace('#FFF0E6','rgba(255,220,200,0.5)').replace('#FDECEA','rgba(255,210,205,0.5)'),
                  color:groupeDone===all?'#0D6B40':groupe.tc,
                }}>{groupeDone}/{all}</span>
              </div>

              {/* Info contextuelle */}
              {'info' in groupe && (groupe as any).info && (
                <p style={{fontSize:'13px',color:'#6a7585',lineHeight:1.7,margin:'0 0 14px',paddingLeft:'0'}}>{(groupe as any).info}</p>
              )}

              {/* Items */}
              <div style={{display:'flex',flexDirection:'column',gap:'0',paddingLeft:'0',background:'#fff',borderRadius:'16px',overflow:'hidden',boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
                {groupe.items.map((item, idx) => {
                  const isChecked = checked[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      style={{
                        display:'flex',alignItems:'center',gap:'12px',
                        padding:'11px 14px',
                        background:isChecked?'rgba(13,107,64,0.06)':'transparent',
                        border:'none',borderBottom: idx < groupe.items.length-1 ? '1px solid #f7f5f0' : 'none',
                        cursor:'pointer',textAlign:'left' as const,width:'100%',
                        borderRadius: idx===0?'12px 12px 0 0' : idx===groupe.items.length-1?'0 0 12px 12px':'0',
                      }}
                    >
                      <div style={{
                        width:'22px',height:'22px',borderRadius:'7px',flexShrink:0,
                        background:isChecked?'#0D6B40':'transparent',
                        border:isChecked?'none':'2px solid #d8d0c8',
                        display:'flex',alignItems:'center',justifyContent:'center',
                        transition:'all 0.15s',
                      }}>
                        {isChecked && <span style={{color:'#fff',fontSize:'12px',fontWeight:700}}>✓</span>}
                      </div>
                      <span style={{
                        fontSize:'14px',lineHeight:1.5,
                        color:isChecked?'#0D6B40':C.dark,
                        textDecoration:isChecked?'line-through':'none',
                        opacity:isChecked?0.55:1,
                        transition:'all 0.15s',
                      }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {onglet !== 'conge' && (
        <div style={{paddingTop:'8px',textAlign:'center' as const}}>
          <button
            onClick={() => genererPDF(valiseChecked, maisonChecked)}
            style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'linear-gradient(135deg,#c8a060,#e8c070)',color:'#1c1510',border:'none',padding:'14px 28px',borderRadius:'32px',fontSize:'14px',fontWeight:800,cursor:'pointer',boxShadow:'0 6px 20px rgba(200,160,96,0.4)'}}
          >
            Partager la checklist avec la maman
          </button>
          <p style={{color:C.muted,fontSize:'12px',marginTop:'8px'}}>Génère un PDF imprimable avec tout ce qui est coché</p>
        </div>
      )}


    </div>
  );
}

