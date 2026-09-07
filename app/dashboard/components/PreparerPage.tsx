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
<title>Notre checklist · DadUp</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1e2535;background:#faf6f0;padding:0;max-width:720px;margin:0 auto;}
.hero{background:linear-gradient(135deg,#0a1f32 0%,#1A3D5C 100%);padding:40px 36px 32px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(200,160,96,0.15) 0%,transparent 65%);}
.logo{font-size:26px;font-weight:900;color:#fff;margin-bottom:4px;letter-spacing:-0.5px;}
.logo span{color:#c8a060;}
.hero-sub{font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:24px;}
.hero-date{font-size:12px;color:rgba(255,255,255,0.35);}
.stats{display:flex;gap:12px;padding:24px 36px;background:#fff;border-bottom:1px solid #ede8e0;}
.stat{flex:1;text-align:center;padding:16px;border-radius:16px;background:#faf6f0;}
.stat-n{font-size:28px;font-weight:900;color:#1A3D5C;line-height:1;}
.stat-l{font-size:12px;color:#9aa0a8;margin-top:4px;}
.section{padding:28px 36px;}
.section-title{font-size:14px;font-weight:800;color:#6a7585;letter-spacing:2px;text-transform:uppercase;margin:0 0 20px;display:flex;align-items:center;gap:10px;}
.section-title::after{content:'';flex:1;height:1px;background:#ede8e0;}
.groupe{margin-bottom:24px;}
.groupe-titre{font-size:16px;font-weight:800;color:#1e2535;margin-bottom:12px;}
.groupe-info{font-size:13px;color:#6a7585;line-height:1.7;margin:-4px 0 12px;font-style:italic;}
.items{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);}
.item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #f7f5f0;}
.item:last-child{border:none;}
.check{width:20px;height:20px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;}
.ck-done{background:#0D6B40;color:white;}
.ck-todo{border:2px solid #d8d0c8;}
.lbl-done{font-size:14px;color:#9aa0a8;text-decoration:line-through;}
.lbl-todo{font-size:14px;color:#1e2535;}
.footer{background:#1A3D5C;padding:24px 36px;text-align:center;}
.footer-text{color:rgba(255,255,255,0.4);font-size:12px;margin-bottom:4px;}
.footer-slogan{color:rgba(255,255,255,0.6);font-size:13px;font-style:italic;}
@media print{body{background:white;}.hero{-webkit-print-color-adjust:exact;print-color-adjust:exact;}.items{box-shadow:none;}}
</style></head><body>
  <div class="hero">
    <div class="logo">Dad<span>Up</span></div>
    <div class="hero-sub">Notre checklist pour accueillir bébé</div>
    <div class="hero-date">Préparée le ${new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</div>
  </div>
  <div class="stats">
    <div class="stat"><div class="stat-n">${doneV}<span style="font-size:16px;color:#9aa0a8">/${allValise.length}</span></div><div class="stat-l">Valise prête</div></div>
    <div class="stat"><div class="stat-n">${doneM}<span style="font-size:16px;color:#9aa0a8">/${allMaison.length}</span></div><div class="stat-l">Maison prête</div></div>
    <div class="stat"><div class="stat-n" style="font-size:20px;color:#c8a060">${doneV+doneM}<span style="font-size:14px;color:#9aa0a8">/${allValise.length+allMaison.length}</span></div><div class="stat-l">Total coché</div></div>
  </div>
  <div class="section">
    <div class="section-title">Valise maternité</div>
    ${VALISE.map(g => renderGroupe(g, valiseChecked)).join('')}
    <div class="section-title" style="margin-top:32px;">À préparer à la maison</div>
    ${MAISON.map(g => renderGroupe(g, maisonChecked)).join('')}
  </div>
  <div class="footer">
    <div class="footer-text">dadup.fr · Préparé avec amour</div>
    <div class="footer-slogan">À deux, dès le premier jour</div>
  </div>
</body></html>`;

  const blob = new Blob([html], {type:'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const w = window.open(url, '_blank');
  if (w) setTimeout(() => w.print(), 600);
}

// ── Données Congé Paternité ───────────────────────────────────────────────────
const CONGE_CARDS = [
  { id:'c1', cat:'Durée',            big:'28 jours',   desc:'25 jours de congé paternité + 3 jours de naissance. 32 jours pour des jumeaux.',                                                          bg:'rgba(200,232,255,0.3)', tc:'#0A2847', dc:'#1A3D5C', shadow:'rgba(46,95,138,0.15)' },
  { id:'c2', cat:'Obligatoire',      big:'4 jours',    desc:'Les 4 premiers jours après les 3 jours de naissance sont obligatoires.',                                                                    bg:'rgba(184,240,216,0.3)', tc:'#0A2E1A', dc:'#0D4A2E', shadow:'rgba(13,107,64,0.15)' },
  { id:'c3', cat:'Nouveauté 2026',   big:'+2 mois',    desc:'Depuis juillet 2026 : 1 à 2 mois supplémentaires indemnisés à 70% puis 60%.',                                                           bg:'rgba(255,232,160,0.3)', tc:'#3A2000', dc:'#6A4000', shadow:'rgba(200,160,96,0.15)' },
  { id:'c4', cat:'Délai',            big:'6 mois',     desc:'Les 21 jours restants sont à prendre dans les 6 mois suivant la naissance.',                                                              bg:'rgba(221,208,255,0.3)', tc:'#1A0A4A', dc:'#3D2E7A', shadow:'rgba(107,79,187,0.15)' },
  { id:'c5', cat:'Prévenir l\'employeur', big:'1 mois', desc:'Avant la date prévue. Email ou courrier, aucune forme imposée. La LRAR reste la plus sûre.',                                              bg:'rgba(255,212,232,0.3)', tc:'#4A0A2A', dc:'#7A2050', shadow:'rgba(176,64,112,0.12)' },
  { id:'c6', cat:'Fractionnement',   big:'2 périodes', desc:'Les 21 jours peuvent être fractionnés en 2 périodes minimum, simultanément ou en alternance avec maman.',                                   bg:'rgba(255,224,208,0.5)', tc:'#5A2000', dc:'#8A4020', shadow:'rgba(200,100,50,0.12)' },
  { id:'c7', cat:'Indemnisation',    big:'90%',        desc:'Du salaire journalier de base, versé par la CPAM. Plafonné à environ 56 euros par jour. Certains employeurs complètent à 100%.',           bg:'rgba(200,232,255,0.3)', tc:'#0A2847', dc:'#1A3D5C', shadow:'rgba(46,95,138,0.15)' },
  { id:'c8', cat:'Conditions',       big:'150 heures', desc:'Avoir travaillé au moins 150h sur les 3 derniers mois. Délai de carence : 1 jour non indemnisé.',                                        bg:'rgba(184,240,216,0.3)', tc:'#0A2E1A', dc:'#0D4A2E', shadow:'rgba(13,107,64,0.15)' },
  { id:'c9', cat:'Démarches',        big:'CPAM',       desc:'Fournir une copie du certificat de naissance à la CPAM. Les indemnités sont versées directement sur ton compte.',                          bg:'rgba(255,232,160,0.3)', tc:'#3A2000', dc:'#6A4000', shadow:'rgba(200,160,96,0.15)' },
  { id:'c10', cat:'Hospitalisation', big:'Report',     desc:'Si bébé est hospitalisé, le congé peut être reporté jusqu\'à sa sortie.',                                                                bg:'rgba(221,208,255,0.3)', tc:'#1A0A4A', dc:'#3D2E7A', shadow:'rgba(107,79,187,0.15)' },
  { id:'c11', cat:'Convention',      big:'À vérifier', desc:'Ta convention collective peut être plus avantageuse que la loi. Renseigne-toi auprès des RH.',                                            bg:'rgba(255,212,232,0.3)', tc:'#4A0A2A', dc:'#7A2050', shadow:'rgba(176,64,112,0.12)' },
  { id:'c12', cat:'Indépendant',     big:'Ta caisse',  desc:'Si tu es indépendant ou auto-entrepreneur, renseigne-toi auprès de ta caisse spécifique.',                                                bg:'rgba(255,224,208,0.5)', tc:'#5A2000', dc:'#8A4020', shadow:'rgba(200,100,50,0.12)' },
];
// ── Composant ─────────────────────────────────────────────────────────────────
export default function PreparerPage({C, valiseChecked, toggleV, achatChecked, toggleA}: any) {
  const [onglet, setOnglet] = useState<'valise'|'maison'|'conge'>('valise');
  const [congeArchives, setCongeArchives] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('dadup_conge_archives') || '[]'); } catch { return []; }
  });
  const [showArchives, setShowArchives] = useState(false);
  const archiverCarte = (id: string) => {
    const next = [...congeArchives, id];
    setCongeArchives(next);
    localStorage.setItem('dadup_conge_archives', JSON.stringify(next));
  };
  const restaurerCarte = (id: string) => {
    const next = congeArchives.filter(c => c !== id);
    setCongeArchives(next);
    localStorage.setItem('dadup_conge_archives', JSON.stringify(next));
  };
  const [maisonChecked, setMaisonChecked] = useState<Record<string,boolean>>({});
  const toggleM = (id: string) => setMaisonChecked(u => ({...u, [id]: !u[id]}));

  const allValise = VALISE.flatMap(g => g.items);
  const doneV = allValise.filter(i => valiseChecked[i.id]).length;
  const pctV  = Math.round((doneV / allValise.length) * 100);

  const allMaison = MAISON.flatMap(g => g.items);
  const doneM = allMaison.filter(i => maisonChecked[i.id]).length;
  const pctM  = Math.round((doneM / allMaison.length) * 100);

  const source = onglet === 'valise' ? VALISE : onglet === 'maison' ? MAISON : [];
  const checked = onglet === 'valise' ? valiseChecked : maisonChecked;
  const toggle  = onglet === 'valise' ? toggleV : toggleM;
  const done    = onglet === 'valise' ? doneV : doneM;
  const total   = onglet === 'valise' ? allValise.length : onglet === 'maison' ? allMaison.length : 0;
  const pct     = onglet === 'valise' ? pctV : onglet === 'maison' ? pctM : 0;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>

      {/* ONGLETS */}
      <div style={{display:'flex',gap:'8px'}}>
        {([
          {id:'valise', label:`Valise maternité`, done:doneV, total:allValise.length, inactiveBg:'rgba(200,232,255,0.3)', inactiveBorder:'rgba(46,95,138,0.15)', inactiveColor:'#0A2847'},
          {id:'maison', label:`À la maison`,      done:doneM, total:allMaison.length, inactiveBg:'rgba(184,240,216,0.3)', inactiveBorder:'rgba(13,107,64,0.15)', inactiveColor:'#0A2E1A'},
          {id:'conge',  label:`Congé paternité`,  done:0,     total:0, inactiveBg:'rgba(255,232,160,0.3)', inactiveBorder:'rgba(200,160,96,0.15)', inactiveColor:'#3A2000'},
        ] as const).map(t => (
          <button key={t.id} onClick={()=>setOnglet(t.id)} style={{
            flex:1, padding:'12px 8px', borderRadius:'16px', cursor:'pointer',
            background: onglet===t.id ? 'linear-gradient(135deg,#0a1f32,#1A3D5C)' : t.inactiveBg,
            color: onglet===t.id ? '#fff' : t.inactiveColor,
            fontWeight:700, fontSize:'14px', transition:'all 0.15s',
            boxShadow: onglet===t.id ? '0 4px 16px rgba(26,61,92,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
            border: onglet===t.id ? 'none' : `1px solid ${t.inactiveBorder}`,
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
      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
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
                  background:groupeDone===all?'rgba(184,240,216,0.3)':groupe.couleur.replace('#E6F0FA','rgba(200,232,255,0.3)').replace('#E4F5EC','rgba(184,240,216,0.3)').replace('#FFF7E0','rgba(255,232,160,0.3)').replace('#FFF0E6','rgba(255,220,200,0.5)').replace('#FDECEA','rgba(255,210,205,0.5)'),
                  color:groupeDone===all?'#0D6B40':groupe.tc,
                }}>{groupeDone}/{all}</span>
              </div>

              {/* Info contextuelle */}
              {'info' in groupe && (groupe as any).info && (
                <p style={{fontSize:'14px',color:'#6a7585',lineHeight:1.7,margin:'0 0 14px',paddingLeft:'0'}}>{(groupe as any).info}</p>
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

      {/* CARTES CONGÉ PATERNITÉ */}
      {onglet === 'conge' && (
        <div>
          <style>{`
            .conge-card{transition:transform .2s ease,box-shadow .2s ease;cursor:pointer;}
            .conge-card:hover{transform:translateY(-4px) rotate(-0.5deg);}
            .conge-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
            @media(max-width:640px){.conge-grid{grid-template-columns:1fr;}}
          `}</style>
          <div style={{marginBottom:'16px'}}>
            <p style={{color:C.muted,fontSize:'14px',margin:0}}>Clique sur une carte pour l&apos;archiver une fois lue.</p>
          </div>
          {CONGE_CARDS.filter(c => !congeArchives.includes(c.id)).length === 0 ? (
            <div style={{textAlign:'center' as const,padding:'40px 20px',background:'rgba(184,240,216,0.3)',borderRadius:'20px',border:'1px solid rgba(13,107,64,0.15)'}}>
              <p style={{color:'#0A2E1A',fontSize:'16px',fontWeight:800,margin:'0 0 6px'}}>Tout est lu</p>
              <p style={{color:'#0D6B40',fontSize:'14px',margin:0}}>Tu connais maintenant tes droits. Retrouve les cartes dans les archives.</p>
            </div>
          ) : (
            <div className="conge-grid">
              {CONGE_CARDS.filter(c => !congeArchives.includes(c.id)).map(card => (
                <div key={card.id} className="conge-card" onClick={() => archiverCarte(card.id)} style={{background:card.bg,borderRadius:'20px',padding:'22px 24px',boxShadow:`0 6px 24px ${card.shadow}`,position:'relative',overflow:'hidden',border:'1px solid rgba(0,0,0,0.04)'}}>
                  <div style={{position:'absolute',top:'-20px',right:'-20px',width:'80px',height:'80px',borderRadius:'50%',background:'rgba(255,255,255,0.35)',pointerEvents:'none'}}></div>
                  <p style={{color:card.tc,fontSize:'11px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase' as const,margin:'0 0 10px',position:'relative',zIndex:1}}>{card.cat}</p>
                  <p style={{color:card.tc,fontSize:'26px',fontWeight:900,margin:'0 0 6px',lineHeight:1,position:'relative',zIndex:1}}>{card.big}</p>
                  <p style={{color:card.dc,fontSize:'14px',lineHeight:1.65,margin:0,position:'relative',zIndex:1}}>{card.desc}</p>
                </div>
              ))}
            </div>
          )}

          {congeArchives.length > 0 && (
            <div style={{marginTop:'20px'}}>
              <button onClick={() => setShowArchives(!showArchives)} style={{width:'100%',background:'rgba(0,0,0,0.04)',border:'1px solid rgba(0,0,0,0.06)',borderRadius:'14px',padding:'14px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',opacity:0.75}}>
                <span style={{color:'#6a7585',fontSize:'14px',fontWeight:700}}>Cartes archivées ({congeArchives.length})</span>
                <span style={{color:'#9aa0a8',fontSize:'12px'}}>{showArchives?'Masquer':'Voir'} →</span>
              </button>
              {showArchives && (
                <div className="conge-grid" style={{marginTop:'12px',opacity:0.7}}>
                  {CONGE_CARDS.filter(c => congeArchives.includes(c.id)).map(card => (
                    <div key={card.id} className="conge-card" onClick={() => restaurerCarte(card.id)} style={{background:card.bg,borderRadius:'20px',padding:'22px 24px',position:'relative',overflow:'hidden',border:'1px dashed rgba(0,0,0,0.15)'}}>
                      <p style={{color:card.tc,fontSize:'11px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>{card.cat}</p>
                      <p style={{color:card.tc,fontSize:'26px',fontWeight:900,margin:'0 0 6px',lineHeight:1}}>{card.big}</p>
                      <p style={{color:card.dc,fontSize:'14px',lineHeight:1.65,margin:'0 0 8px'}}>{card.desc}</p>
                      <p style={{color:card.dc,fontSize:'12px',fontWeight:700,margin:0,opacity:0.6}}>Cliquer pour restaurer</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {onglet !== 'conge' && (
        <div style={{paddingTop:'8px',textAlign:'center' as const}}>
          <button
            onClick={() => genererPDF(valiseChecked, maisonChecked)}
            style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'linear-gradient(135deg,#c8a060,#e8c070)',color:'#1c1510',border:'none',padding:'14px 28px',borderRadius:'32px',fontSize:'14px',fontWeight:800,cursor:'pointer',boxShadow:'0 6px 20px rgba(200,160,96,0.4)'}}
          >
            Partager avec la maman
          </button>
          <p style={{color:C.muted,fontSize:'12px',marginTop:'8px'}}>Génère un PDF imprimable avec tout ce qui est coché</p>
        </div>
      )}


    </div>
  );
}

