'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const C = {
  dark: '#1e2535',
  gold: '#c8a060',
  cream: '#faf6f0',
  white: '#ffffff',
  border: '#e8e0d0',
  text: '#4a5568',
  textLight: '#9aa0a8',
  darkHover: '#2e3848',
};

const SEMAINES_DATA: Record<number, {fruit:string;emoji:string;taille:string;poids:string;developpement:string;maman:string;conseil:string;}> = {
  6:{fruit:'grain de riz',emoji:'🌾',taille:'0.6 cm',poids:'< 1g',developpement:'Le coeur commence a battre. Les premieres cellules nerveuses se forment.',maman:'Fatigue intense, nausees matinales possibles.',conseil:'Accompagne-la sans jugement. Les nausees sont reelles et epuisantes.'},
  7:{fruit:'myrtille',emoji:'🫐',taille:'1 cm',poids:'1g',developpement:'Le visage commence a se former. Les bras et jambes apparaissent.',maman:'Nausees souvent au pic. Hypersensibilite aux odeurs.',conseil:'Prepare des en-cas legers a portee de main.'},
  8:{fruit:'myrtille',emoji:'🫐',taille:'1.6 cm',poids:'1g',developpement:'Les doigts commencent a se former. Le cerveau se developpe rapidement.',maman:'Fatigue extreme normale.',conseil:'Prends le relais sur les taches menageres sans quelle ait a demander.'},
  9:{fruit:'olive',emoji:'🫒',taille:'2.3 cm',poids:'2g',developpement:'Bebe bouge mais trop petit pour etre senti.',maman:'Humeurs changeantes dues aux hormones.',conseil:'Sois patient avec les sautes dhumeur. Ce nest pas contre toi.'},
  10:{fruit:'fraise',emoji:'🍓',taille:'3 cm',poids:'4g',developpement:'Les ongles apparaissent. Bebe peut faire des petits mouvements.',maman:'Nausees commencent souvent a diminuer.',conseil:'Planifiez ensemble la premiere echographie.'},
  11:{fruit:'citron vert',emoji:'🍋',taille:'4 cm',poids:'7g',developpement:'Les dents de lait se forment sous les gencives.',maman:'Le ventre commence a sarrondir.',conseil:'Accompagne-la chercher ses premiers vetements de grossesse.'},
  12:{fruit:'citron',emoji:'🍋',taille:'5.4 cm',poids:'14g',developpement:'Fin du 1er trimestre. Risque de fausse couche chute fortement.',maman:'Soulagement emotionnel souvent au passage des 12 SA.',conseil:'Premiere grande echographie. Filme, prends des photos.'},
  13:{fruit:'peche',emoji:'🍑',taille:'7.4 cm',poids:'23g',developpement:'Bebe peut sucer son pouce.',maman:'Debut du 2e trimestre. Souvent la periode la plus agreable.',conseil:'Cest le bon moment pour annoncer officiellement la grossesse.'},
  14:{fruit:'peche',emoji:'🍑',taille:'8.7 cm',poids:'43g',developpement:'Bebe fait des grimaces, fronce les sourcils.',maman:'Ventre qui sarrondit. Libido souvent revenue.',conseil:'Proposez un week-end en amoureux avant larrivee de bebe.'},
  15:{fruit:'pomme',emoji:'🍎',taille:'10 cm',poids:'70g',developpement:'Bebe entend les sons pour la premiere fois.',maman:'Prise de poids visible.',conseil:'Parle a bebe chaque soir. Il reconnaitra ta voix a la naissance.'},
  16:{fruit:'avocat',emoji:'🥑',taille:'11.6 cm',poids:'100g',developpement:'Le squelette se renforce.',maman:'Les premieres sensations de mouvements possibles.',conseil:'Pense a reserver les cours de preparation a laccouchement.'},
  17:{fruit:'poire',emoji:'🍐',taille:'13 cm',poids:'140g',developpement:'Une couche de graisse se forme sous la peau.',maman:'Mouvements de bebe parfois perceptibles.',conseil:'Pose ta main sur son ventre le soir.'},
  18:{fruit:'poivron',emoji:'🫑',taille:'14.2 cm',poids:'190g',developpement:'Les os se solidifient.',maman:'Douleurs ligamentaires possibles.',conseil:'Propose-lui des massages du dos.'},
  19:{fruit:'mangue',emoji:'🥭',taille:'15.3 cm',poids:'240g',developpement:'Les sens se developpent rapidement.',maman:'Ventre bien visible.',conseil:'Preparez la chambre de bebe ensemble.'},
  20:{fruit:'banane',emoji:'🍌',taille:'16.4 cm',poids:'300g',developpement:'Mi-grossesse ! Bebe recouvert dun enduit protecteur.',maman:'Grande echographie T2.',conseil:'Prends une demi-journee de conge pour cette echographie.'},
  21:{fruit:'carotte',emoji:'🥕',taille:'26.7 cm',poids:'360g',developpement:'Bebe dort et se reveille a intervalles reguliers.',maman:'Ventre tres visible.',conseil:'Installe une veilleuse dans la chambre de bebe.'},
  22:{fruit:'papaye',emoji:'🥭',taille:'27.8 cm',poids:'430g',developpement:'Les yeux sont formes mais encore fermes.',maman:'Vergetures possibles.',conseil:'Masse son ventre avec de lhuile.'},
  23:{fruit:'pamplemousse',emoji:'🍊',taille:'28.9 cm',poids:'500g',developpement:'Bebe a le hoquet regulierement.',maman:'Essoufflement possible.',conseil:'Prends en charge les corvees physiques.'},
  24:{fruit:'epi de mais',emoji:'🌽',taille:'30 cm',poids:'600g',developpement:'Visage presque forme.',maman:'Diabete gestationnel a tester.',conseil:'Test HGPO cette semaine. Reste avec elle, ca dure 2 heures.'},
  25:{fruit:'navet',emoji:'🥬',taille:'34.6 cm',poids:'660g',developpement:'Les poumons se developpent activement.',maman:'Jambes lourdes.',conseil:'Propose-lui un bain de pieds le soir.'},
  26:{fruit:'chou-fleur',emoji:'🥦',taille:'35.6 cm',poids:'760g',developpement:'Les yeux souvrent pour la premiere fois.',maman:'Inconfort croissant.',conseil:'Installe un coussin de grossesse.'},
  27:{fruit:'laitue',emoji:'🥬',taille:'36.6 cm',poids:'875g',developpement:'Bebe peut rever.',maman:'Fin du 2e trimestre.',conseil:'Planifiez votre plan de naissance ensemble.'},
  28:{fruit:'aubergine',emoji:'🍆',taille:'37.6 cm',poids:'1 kg',developpement:'Debut du 3e trimestre. Vision fonctionnelle.',maman:'Essoufflement, reflux.',conseil:'Commence a preparer ta valise maternite.'},
  29:{fruit:'butternut',emoji:'🎃',taille:'38.6 cm',poids:'1.15 kg',developpement:'Muscles et poumons se renforcent.',maman:'Contractions de Braxton Hicks normales.',conseil:'Apprends a reconnaitre les vraies contractions des fausses.'},
  30:{fruit:'chou',emoji:'🥬',taille:'39.9 cm',poids:'1.3 kg',developpement:'Cerveau en developpement rapide.',maman:'Fatigue intense de retour.',conseil:'Prends un conge paternite bien planifie.'},
  31:{fruit:'ananas',emoji:'🍍',taille:'41.1 cm',poids:'1.5 kg',developpement:'Tous les sens sont operationnels.',maman:'Difficultes a marcher longtemps.',conseil:'Propose des courtes promenades.'},
  32:{fruit:'mangue',emoji:'🥭',taille:'42.4 cm',poids:'1.7 kg',developpement:'Bebe se met en position tete en bas.',maman:'Grande echographie T3.',conseil:'Accompagne-la a lecho T3.'},
  33:{fruit:'ananas',emoji:'🍍',taille:'43.7 cm',poids:'1.9 kg',developpement:'Squelette presque complet.',maman:'Essoufflement maximal.',conseil:'Prends en charge les nuits difficiles.'},
  34:{fruit:'melon',emoji:'🍈',taille:'45 cm',poids:'2.15 kg',developpement:'Systeme nerveux central mature.',maman:'Descente du bebe dans le bassin.',conseil:'Commence les cours de preparation accouchement.'},
  35:{fruit:'melon',emoji:'🍈',taille:'46.2 cm',poids:'2.4 kg',developpement:'Reins et foie fonctionnels.',maman:'Envies frequentes duriner.',conseil:'Installe le siege auto maintenant.'},
  36:{fruit:'laitue romaine',emoji:'🥗',taille:'47.4 cm',poids:'2.6 kg',developpement:'Presque pret ! Poumons presque matures.',maman:'Envie intense de tout preparer.',conseil:'Valise maternite doit etre prete.'},
  37:{fruit:'bette',emoji:'🌿',taille:'48.6 cm',poids:'2.85 kg',developpement:'Bebe est considere a terme.',maman:'Contractions possibles a tout moment.',conseil:'Mode alerte active. Reste joignable en permanence.'},
  38:{fruit:'poireau',emoji:'🌿',taille:'49.8 cm',poids:'3.1 kg',developpement:'Bebe est pret.',maman:'Impatience et anxiete melees.',conseil:'Sois present, rassurant.'},
  39:{fruit:'petite pasteque',emoji:'🍉',taille:'50.7 cm',poids:'3.25 kg',developpement:'Pleinement developpe.',maman:'Chaque jour semble long.',conseil:'Organise une sortie douce.'},
  40:{fruit:'pasteque',emoji:'🍉',taille:'51.2 cm',poids:'3.4 kg',developpement:'Cest le jour J !',maman:'Stress et excitation maximaux.',conseil:'Contractions toutes les 5min pendant 1h = maternite.'},
  41:{fruit:'pasteque',emoji:'🍉',taille:'51.5 cm',poids:'3.6 kg',developpement:'Depassement de terme.',maman:'Inconfort majeur.',conseil:'Declenchement possible. Reste positif.'},
};

const RDV_LIST = [
  {sa:8,emoji:'🏥',titre:'1ere consultation',desc:'Confirmation grossesse, prise de sang, calcul DPA.',oblig:true},
  {sa:12,emoji:'🔬',titre:'Echo T1 + trisomie',desc:'Premier visage de bebe. Mesure clarte nucale.',oblig:true},
  {sa:16,emoji:'📋',titre:'Consultation mensuelle',desc:'Suivi tension, poids.',oblig:false},
  {sa:20,emoji:'📝',titre:'Declaration grossesse CPAM',desc:'A faire avant 15 SA.',oblig:true},
  {sa:22,emoji:'👶',titre:'Echo T2 morphologique',desc:'La plus importante. Organes, membres, visage. 45min.',oblig:true},
  {sa:24,emoji:'🩸',titre:'Test diabete gestationnel',desc:'Test HGPO — 3 prises de sang en 2h.',oblig:false},
  {sa:28,emoji:'💉',titre:'Debut T3 + vaccin',desc:'Vaccin coqueluche recommande pour le papa aussi.',oblig:false},
  {sa:32,emoji:'📏',titre:'Echo T3 croissance',desc:'Verification position bebe, poids estime.',oblig:true},
  {sa:34,emoji:'🎓',titre:'Preparation accouchement',desc:'3 a 8 seances remboursees.',oblig:false},
  {sa:36,emoji:'💬',titre:'Entretien prenatal',desc:'Bilan global, projet de naissance.',oblig:true},
  {sa:38,emoji:'🧳',titre:'Valise prete ?',desc:'Preparez la valise maintenant.',oblig:false},
  {sa:40,emoji:'🎉',titre:'Jour J',desc:'Contractions toutes les 5min pendant 1h = maternite !',oblig:true},
];

const PARTENAIRES = [
  {categorie:'Pour elle',items:[
    {nom:'Mothercare',desc:'Vetements grossesse & allaitement',remise:'-15%',lien:'#'},
    {nom:'Soin & Bien-etre',desc:'Massage prenatal a domicile',remise:'-20%',lien:'#'},
    {nom:'Jolimoi',desc:'Cosmetiques naturels grossesse safe',remise:'-10%',lien:'#'},
  ]},
  {categorie:'Pour bebe',items:[
    {nom:'Cybex',desc:'Sieges auto & poussettes premium',remise:'-12%',lien:'#'},
    {nom:'Monbebe',desc:'Vetements bebe bio & doux',remise:'-15%',lien:'#'},
    {nom:'Babymoov',desc:'Babyphone & accessoires',remise:'-10%',lien:'#'},
  ]},
  {categorie:'Pour toi',items:[
    {nom:'Box Papa',desc:'Box mensuelle future paternite',remise:'-25%',lien:'#'},
    {nom:'Cultura',desc:'Livres paternite & eveil bebe',remise:'-10%',lien:'#'},
    {nom:'Firstcry',desc:'Tout pour bebe a prix reduit',remise:'-15%',lien:'#'},
  ]},
];

const IDEES_MOIS: Record<number,string> = {
  1:'Encadre la premiere echographie et offre-lui le cadre.',
  2:'Reserve un diner dans son restaurant prefere.',
  3:'Offre-lui un soin prenatal ou massage a domicile.',
  4:'Cree un album photo numerique de la grossesse.',
  5:'Organise un week-end detente avant larrivee de bebe.',
  6:'Preparez la chambre de bebe ensemble un dimanche.',
  7:'Offre-lui un coussin de grossesse premium.',
  8:'Planifie un petit road trip doux avant la fin.',
  9:'Ecris-lui une lettre sur ce que represente cette grossesse pour toi.',
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [rdvOuvert, setRdvOuvert] = useState<number|null>(null);
  const [valiseChecked, setValiseChecked] = useState<Record<string,boolean>>({});
  const [avance, setAvance] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    const d = searchParams.get('dpa') || localStorage.getItem('dadup_dpa') || '';
    const p = localStorage.getItem('dadup_prenom') || '';
    const n = JSON.parse(localStorage.getItem('dadup_notes') || '[]');
    const v = JSON.parse(localStorage.getItem('dadup_valise') || '{}');
    if (!d) { setShowOnboarding(true); } else { setDpa(d); }
    setPrenom(p);
    setNotes(n);
    setValiseChecked(v);
  }, []);

  const getSA = (offset = 0) => {
    if (!dpa) return null;
    const conception = new Date(new Date(dpa).getTime() - 40 * 7 * 24 * 60 * 60 * 1000);
    const diff = new Date().getTime() - conception.getTime();
    return Math.max(1, Math.min(42, Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + offset));
  };

  const sa = getSA(avance ? 4 : 0);
  const saReelle = getSA();
  const data = sa ? (SEMAINES_DATA[sa] || SEMAINES_DATA[40]) : null;
  const dpaDate = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.ceil((dpaDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
  const moisGrossesse = sa ? Math.ceil(sa / 4.3) : 1;
  const ideesMois = IDEES_MOIS[Math.min(moisGrossesse, 9)] || IDEES_MOIS[9];
  const isPostPartum = joursRestants !== null && joursRestants < 0;
  const progression = Math.min(100, Math.round(((saReelle || 0) / 40) * 100));
  const trimestre = (saReelle || 0) <= 14 ? 'T1' : (saReelle || 0) <= 27 ? 'T2' : 'T3';

  const saveNote = () => {
    if (!noteText.trim()) return;
    const newNotes = [...notes, new Date().toLocaleDateString('fr-FR') + ' — ' + noteText];
    setNotes(newNotes);
    localStorage.setItem('dadup_notes', JSON.stringify(newNotes));
    setNoteText('');
  };

  const toggleValise = (id: string) => {
    const updated = {...valiseChecked, [id]: !valiseChecked[id]};
    setValiseChecked(updated);
    localStorage.setItem('dadup_valise', JSON.stringify(updated));
  };

  const saveOnboarding = (d: string, p: string) => {
    localStorage.setItem('dadup_dpa', d);
    localStorage.setItem('dadup_prenom', p);
    setDpa(d);
    setPrenom(p);
    setShowOnboarding(false);
  };

  const tabs = [
    {id:'home',label:'Accueil'},
    {id:'bebe',label:'Bebe'},
    {id:'rdv',label:'RDV'},
    {id:'pratique',label:'Pratique'},
    {id:'cadeaux',label:'Cadeaux'},
  ];

  if (showOnboarding) return <Onboarding onSave={saveOnboarding}/>;

  return (
    <div style={{minHeight:'100vh', background:C.cream, paddingBottom:'24px', fontFamily:'sans-serif'}}>

      <div style={{background:C.dark, position:'sticky', top:0, zIndex:40}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px', borderBottom:'1px solid #2e3848'}}>
          <a href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="30" height="30">
              <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
              <circle cx="150" cy="150" r="122" fill="#4a6080"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
              <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
            </svg>
            <div>
              <p style={{color:C.white, fontSize:'14px', fontWeight:700, margin:0, fontFamily:'Georgia,serif'}}>
                {prenom ? 'Bonjour ' + prenom : 'DadUp'}
              </p>
              <p style={{color:C.gold, fontSize:'10px', margin:0}}>← Retour accueil</p>
            </div>
          </a>
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
            {isPostPartum ? (
              <span style={{background:C.gold, color:C.dark, fontSize:'11px', fontWeight:700, padding:'4px 12px', borderRadius:'20px'}}>Post-partum</span>
            ) : saReelle && (
              <>
                <span style={{background:C.gold, color:C.dark, fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'20px'}}>SA {saReelle}</span>
                <span style={{background:'#2e3848', color:C.textLight, fontSize:'11px', fontWeight:600, padding:'4px 10px', borderRadius:'20px'}}>{trimestre}</span>
              </>
            )}
          </div>
        </div>
        <div style={{display:'flex', overflowX:'auto', padding:'0 8px'}}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              flexShrink:0, padding:'10px 16px', fontSize:'12px', fontWeight: activeTab === t.id ? 700 : 400,
              color: activeTab === t.id ? C.gold : '#6a7585',
              background:'none', border:'none', borderBottom: activeTab === t.id ? `2px solid ${C.gold}` : '2px solid transparent',
              cursor:'pointer',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'16px', maxWidth:'800px', margin:'0 auto'}}>

        {activeTab === 'home' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>

            {isPostPartum ? (
              <div style={{background:C.dark, borderRadius:'20px', padding:'24px', textAlign:'center'}}>
                <p style={{fontSize:'48px', margin:'0 0 8px'}}>👶</p>
                <p style={{color:C.white, fontSize:'22px', fontWeight:700, margin:0, fontFamily:'Georgia,serif'}}>Bebe est la !</p>
                <p style={{color:C.gold, fontSize:'13px', margin:'4px 0 0'}}>Mode post-partum active</p>
              </div>
            ) : data && saReelle && (
              <div style={{background:C.dark, borderRadius:'20px', padding:'20px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'16px'}}>
                  <span style={{fontSize:'52px', lineHeight:1}}>{data.emoji}</span>
                  <div style={{flex:1}}>
                    <p style={{color:C.gold, fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 4px'}}>Semaine {saReelle} · {trimestre}</p>
                    <p style={{color:C.white, fontSize:'18px', fontWeight:700, margin:'0 0 2px', fontFamily:'Georgia,serif'}}>Bebe = une {data.fruit}</p>
                    <p style={{color:'#4a6080', fontSize:'12px', margin:0}}>{data.taille} · {data.poids}{joursRestants && joursRestants > 0 ? ' · ' + joursRestants + 'j restants' : ''}</p>
                  </div>
                </div>
                <div style={{background:'#2e3848', borderRadius:'8px', height:'8px', marginBottom:'8px'}}>
                  <div style={{background:C.gold, height:'8px', borderRadius:'8px', width:progression+'%', transition:'width 0.5s'}}/>
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  {['T1','T2','T3'].map((t, i) => {
                    const actif = (saReelle||0) > (i === 0 ? 0 : [12,27][i-1]);
                    return <span key={t} style={{background: actif ? C.gold : '#2e3848', color: actif ? C.dark : '#4a6080', fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'20px'}}>{t}{actif && i < 2 ? ' ✓' : ''}</span>;
                  })}
                </div>
              </div>
            )}

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              {data && (
                <div style={{background:C.dark, borderRadius:'16px', padding:'16px'}}>
                  <p style={{color:C.gold, fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 8px'}}>Conseil</p>
                  <p style={{color:C.white, fontSize:'13px', lineHeight:1.5, margin:0}}>{data.conseil}</p>
                </div>
              )}
              <div style={{background:C.gold, borderRadius:'16px', padding:'16px'}}>
                <p style={{color:'#a07830', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 8px'}}>Idee du mois</p>
                <p style={{color:C.dark, fontSize:'13px', lineHeight:1.5, margin:0, fontWeight:600}}>{ideesMois}</p>
              </div>
            </div>

            {RDV_LIST.filter(r => saReelle && r.sa >= saReelle).slice(0,1).map((r, i) => (
              <div key={i} style={{background:C.white, borderRadius:'16px', padding:'16px', borderLeft:`4px solid ${C.gold}`, border:`1px solid ${C.border}`, borderLeftWidth:'4px', borderLeftColor:C.gold}}>
                <p style={{color:C.gold, fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 10px'}}>Prochain RDV</p>
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                  <div style={{background:C.cream, width:'44px', height:'44px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>{r.emoji}</div>
                  <div style={{flex:1}}>
                    <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:0}}>{r.titre}</p>
                    <p style={{color:C.textLight, fontSize:'12px', margin:0}}>SA {r.sa}{dpa ? ' · ' + new Date(new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'long'}) : ''}</p>
                  </div>
                </div>
              </div>
            ))}

            {data && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                  <p style={{color:C.gold, fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 8px'}}>Developpement</p>
                  <p style={{color:C.dark, fontSize:'12px', lineHeight:1.5, margin:0}}>{data.developpement}</p>
                </div>
                <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                  <p style={{color:C.gold, fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 8px'}}>Ce que vit maman</p>
                  <p style={{color:C.dark, fontSize:'12px', lineHeight:1.5, margin:0}}>{data.maman}</p>
                </div>
              </div>
            )}

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              {[
                {id:'bebe',label:'Suivi bebe',sub:'SA ' + saReelle + ' en detail'},
                {id:'rdv',label:'Mes RDV',sub:'Calendrier complet'},
                {id:'pratique',label:'Pratique',sub:'Valise & achats'},
                {id:'cadeaux',label:'Cadeaux',sub:'Bons plans partenaires'},
              ].map(m => (
                <button key={m.id} onClick={() => setActiveTab(m.id)} style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left'}}>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 4px'}}>{m.label}</p>
                  <p style={{color:C.textLight, fontSize:'11px', margin:0}}>{m.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bebe' && data && sa && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <h2 style={{color:C.dark, fontSize:'22px', fontWeight:700, margin:0, fontFamily:'Georgia,serif'}}>
                {avance ? 'Dans 4 semaines' : 'Semaine ' + saReelle}
              </h2>
              <button onClick={() => setAvance(!avance)} style={{fontSize:'11px', padding:'6px 14px', borderRadius:'20px', cursor:'pointer', fontWeight:700, border:'none', background: avance ? C.dark : C.cream, color: avance ? C.gold : C.text}}>
                {avance ? 'Revenir' : "S'avancer +4 SA"}
              </button>
            </div>
            <div style={{background:C.dark, borderRadius:'20px', padding:'20px', display:'flex', alignItems:'center', gap:'16px'}}>
              <span style={{fontSize:'56px', lineHeight:1}}>{data.emoji}</span>
              <div>
                <p style={{color:C.gold, fontSize:'10px', letterSpacing:'2px', margin:'0 0 4px'}}>TAILLE DE BEBE</p>
                <p style={{color:C.white, fontSize:'20px', fontWeight:700, margin:'0 0 2px', fontFamily:'Georgia,serif'}}>{data.fruit}</p>
                <p style={{color:'#4a6080', fontSize:'13px', margin:0}}>{data.taille} · {data.poids}</p>
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`, gridColumn:'span 2'}}>
                <p style={{color:C.gold, fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 8px'}}>Developpement</p>
                <p style={{color:C.dark, fontSize:'13px', lineHeight:1.6, margin:0}}>{data.developpement}</p>
              </div>
              <div style={{background:C.cream, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                <p style={{color:C.gold, fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 8px'}}>Ce que vit maman</p>
                <p style={{color:C.dark, fontSize:'12px', lineHeight:1.5, margin:0}}>{data.maman}</p>
              </div>
              <div style={{background:C.dark, borderRadius:'16px', padding:'16px'}}>
                <p style={{color:C.gold, fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 8px'}}>Ton role</p>
                <p style={{color:C.white, fontSize:'12px', lineHeight:1.5, margin:0, fontWeight:600}}>{data.conseil}</p>
              </div>
            </div>
            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 12px'}}>Journal</p>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Ce que j'ai ressenti cette semaine..." style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px', fontSize:'13px', color:C.dark, resize:'none', boxSizing:'border-box' as const, fontFamily:'sans-serif'}} rows={3}/>
              <button onClick={saveNote} style={{marginTop:'8px', background:C.dark, color:C.gold, fontSize:'12px', fontWeight:700, padding:'8px 20px', borderRadius:'20px', border:'none', cursor:'pointer'}}>Enregistrer</button>
              {notes.length > 0 && (
                <div style={{marginTop:'12px', display:'flex', flexDirection:'column', gap:'8px'}}>
                  {notes.slice(-3).reverse().map((n, i) => (
                    <p key={i} style={{color:C.textLight, fontSize:'12px', background:C.cream, borderRadius:'10px', padding:'10px', margin:0, lineHeight:1.5}}>{n}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rdv' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:700, margin:0, fontFamily:'Georgia,serif'}}>Calendrier RDV</h2>
            {dpa && <p style={{color:C.textLight, fontSize:'13px', margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'})}</p>}
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:'20px', top:0, bottom:0, width:'2px', background:C.border}}/>
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                {RDV_LIST.map((r, i) => {
                  const statut = !saReelle ? 'futur' : r.sa < saReelle ? 'passe' : r.sa <= saReelle + 2 ? 'prochain' : 'futur';
                  return (
                    <div key={i} style={{position:'relative', paddingLeft:'52px'}}>
                      <div style={{position:'absolute', left:'12px', top:'16px', width:'18px', height:'18px', borderRadius:'50%', border:`2px solid ${statut === 'passe' ? C.gold : statut === 'prochain' ? C.gold : C.border}`, background: statut === 'passe' ? C.gold : statut === 'prochain' ? C.gold : C.white, display:'flex', alignItems:'center', justifyContent:'center', transform: statut === 'prochain' ? 'scale(1.2)' : 'scale(1)'}}>
                        {statut === 'passe' && <span style={{color:C.dark, fontSize:'10px'}}>✓</span>}
                      </div>
                      <button onClick={() => setRdvOuvert(rdvOuvert === i ? null : i)} style={{width:'100%', textAlign:'left', borderRadius:'16px', padding:'14px 16px', border:'none', cursor:'pointer', background: statut === 'prochain' ? C.dark : C.white, borderLeft: statut === 'prochain' ? `3px solid ${C.gold}` : `1px solid ${C.border}`, opacity: statut === 'passe' ? 0.6 : 1}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <span style={{fontSize:'18px'}}>{r.emoji}</span>
                            <div>
                              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                <p style={{color: statut === 'prochain' ? C.white : C.dark, fontSize:'13px', fontWeight:700, margin:0}}>{r.titre}</p>
                                {r.oblig && <span style={{background: statut === 'prochain' ? C.gold : C.cream, color:C.dark, fontSize:'9px', fontWeight:700, padding:'2px 6px', borderRadius:'10px'}}>obligatoire</span>}
                              </div>
                              <p style={{color: statut === 'prochain' ? C.textLight : C.textLight, fontSize:'11px', margin:0}}>SA {r.sa}{dpa ? ' · ' + new Date(new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'short'}) : ''}</p>
                            </div>
                          </div>
                          <span style={{color: statut === 'prochain' ? C.gold : C.textLight, fontSize:'11px'}}>{rdvOuvert === i ? '▲' : '▼'}</span>
                        </div>
                        {rdvOuvert === i && <p style={{color: statut === 'prochain' ? C.textLight : C.text, fontSize:'12px', lineHeight:1.5, margin:'10px 0 0', paddingTop:'10px', borderTop:`1px solid ${statut === 'prochain' ? '#2e3848' : C.border}`}}>{r.desc}</p>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pratique' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:700, margin:0, fontFamily:'Georgia,serif'}}>Pratique</h2>
            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px'}}>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:0}}>Valise maternite</p>
                <span style={{background:C.gold, color:C.dark, fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'20px'}}>{Object.values(valiseChecked).filter(Boolean).length}/21</span>
              </div>
              <div style={{background:C.cream, borderRadius:'8px', height:'6px', marginBottom:'16px'}}>
                <div style={{background:C.gold, height:'6px', borderRadius:'8px', width:(Object.values(valiseChecked).filter(Boolean).length/21*100)+'%'}}/>
              </div>
              {[
                {titre:'Pour toi', items:[{id:'v1',label:'Chargeur + batterie externe'},{id:'v2',label:'Vetements confort (2 jours)'},{id:'v3',label:'Snacks & eau'},{id:'v4',label:'Ecouteurs'},{id:'v5',label:'Documents hospitaliers'},{id:'v6',label:'Appareil photo charge'}]},
                {titre:'Pour elle', items:[{id:'v7',label:'Chemise de nuit accouchement'},{id:'v8',label:'Robe de chambre + chaussons'},{id:'v9',label:'Sous-vetements post-partum'},{id:'v10',label:'Produits de toilette'},{id:'v11',label:'Soutien-gorge allaitement x2'}]},
                {titre:'Pour bebe', items:[{id:'v12',label:'Body naissance x3'},{id:'v13',label:'Pyjama naissance x2'},{id:'v14',label:'Bonnet naissance x2'},{id:'v15',label:'Gigoteuse naissance'},{id:'v16',label:'Siege auto installe'},{id:'v17',label:'Couches nouveau-ne'}]},
                {titre:'Documents', items:[{id:'v18',label:'Carte vitale + mutuelle'},{id:'v19',label:'Carnet de maternite'},{id:'v20',label:'Pieces didentite'},{id:'v21',label:'Plan acces maternite'}]},
              ].map(s => (
                <div key={s.titre} style={{marginBottom:'16px'}}>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'2px', margin:'0 0 8px'}}>{s.titre}</p>
                  <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                    {s.items.map(item => (
                      <button key={item.id} onClick={() => toggleValise(item.id)} style={{display:'flex', alignItems:'center', gap:'10px', background:'none', border:'none', cursor:'pointer', textAlign:'left', padding:0}}>
                        <div style={{width:'20px', height:'20px', borderRadius:'6px', border:`2px solid ${valiseChecked[item.id] ? C.gold : C.border}`, background: valiseChecked[item.id] ? C.gold : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                          {valiseChecked[item.id] && <span style={{color:C.dark, fontSize:'11px'}}>✓</span>}
                        </div>
                        <span style={{fontSize:'13px', color: valiseChecked[item.id] ? C.textLight : C.dark, textDecoration: valiseChecked[item.id] ? 'line-through' : 'none'}}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:'0 0 14px'}}>Liste achats prioritaires</p>
              <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                {[
                  {label:'Siege auto groupe 0+',priorite:'urgent',prix:'80-300€'},
                  {label:'Babyphone video',priorite:'urgent',prix:'40-150€'},
                  {label:'Lit cododo / berceau',priorite:'urgent',prix:'60-400€'},
                  {label:'Poussette combinee',priorite:'avant naissance',prix:'200-1200€'},
                  {label:'Tire-lait electrique',priorite:'si allaitement',prix:'30-200€'},
                  {label:'Thermometre rectal',priorite:'urgent',prix:'15-40€'},
                  {label:'Humidificateur',priorite:'utile',prix:'30-80€'},
                ].map((a, i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <div>
                      <p style={{color:C.dark, fontSize:'13px', fontWeight:600, margin:'0 0 3px'}}>{a.label}</p>
                      <span style={{background: a.priorite === 'urgent' ? '#fff0f0' : C.cream, color: a.priorite === 'urgent' ? '#cc4444' : C.textLight, fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'10px'}}>{a.priorite}</span>
                    </div>
                    <p style={{color:C.gold, fontSize:'13px', fontWeight:700, margin:0}}>{a.prix}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:'0 0 14px'}}>Survie 1er mois</p>
              {[
                {titre:'Emmaillotage', contenu:'Etendre la couverture en losange. Replier le coin superieur. Poser bebe, epaules sur le bord. Ramener les cotes un par un, bien serre mais pas trop.'},
                {titre:'Bebe pleure — que faire ?', contenu:'1. Faim ? (toutes les 2-3h) 2. Couche sale ? 3. Trop chaud/froid ? (nuque = thermometre) 4. Besoin de contact ? (peau a peau) 5. Coliques ? (velo avec les jambes)'},
                {titre:'Sommeil de bebe', contenu:'Nouveau-ne dort 16-18h/24. Sur le dos, dans son propre espace. Pas doreiller. Temperature chambre 18-20 C.'},
              ].map((s, i) => (
                <div key={i} style={{marginBottom:'12px', paddingBottom:'12px', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none'}}>
                  <p style={{color:C.gold, fontSize:'12px', fontWeight:700, margin:'0 0 4px'}}>{s.titre}</p>
                  <p style={{color:C.text, fontSize:'12px', lineHeight:1.5, margin:0}}>{s.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cadeaux' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:700, margin:0, fontFamily:'Georgia,serif'}}>Cadeaux & Bons plans</h2>
            <div style={{background:C.gold, borderRadius:'16px', padding:'16px'}}>
              <p style={{color:'#a07830', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 6px'}}>Idee du mois</p>
              <p style={{color:C.dark, fontSize:'13px', fontWeight:600, margin:0, lineHeight:1.5}}>{ideesMois}</p>
            </div>
            {PARTENAIRES.map(cat => (
              <div key={cat.categorie} style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                <p style={{color:C.gold, fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:700, margin:'0 0 12px'}}>{cat.categorie}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px', background:C.cream, borderRadius:'12px'}}>
                      <div>
                        <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 2px'}}>{item.nom}</p>
                        <p style={{color:C.textLight, fontSize:'11px', margin:0}}>{item.desc}</p>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:'8px', flexShrink:0}}>
                        <span style={{background:C.gold, color:C.dark, fontSize:'11px', fontWeight:700, padding:'4px 8px', borderRadius:'20px'}}>{item.remise}</span>
                        <a href={item.lien} style={{background:C.dark, color:C.gold, fontSize:'11px', fontWeight:700, padding:'6px 12px', borderRadius:'20px', textDecoration:'none'}}>Voir</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

function Onboarding({onSave}: {onSave: (dpa: string, prenom: string) => void}) {
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');

  return (
    <main style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'420px', width:'100%'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:'32px'}}>
          <svg viewBox="0 0 300 300" width="72" height="72">
            <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
            <circle cx="150" cy="150" r="122" fill="#4a6080"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
            <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
          </svg>
        </div>
        <div style={{background:C.white, borderRadius:'24px', padding:'32px', border:`1px solid ${C.border}`}}>
          <h1 style={{fontSize:'24px', fontWeight:700, color:C.dark, margin:'0 0 8px', textAlign:'center', fontFamily:'Georgia,serif'}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.text, fontSize:'14px', textAlign:'center', margin:'0 0 28px'}}>Deux infos pour personnaliser ton espace.</p>
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Ton prenom</label>
              <input type="text" placeholder="Thomas, Julien, Marc..." value={prenom} onChange={e => setPrenom(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif'}}/>
            </div>
            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Date prevue d'accouchement</label>
              <input type="date" value={dpa} onChange={e => setDpa(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif'}}/>
            </div>
            <button onClick={() => dpa && onSave(dpa, prenom)} disabled={!dpa} style={{background: dpa ? C.dark : '#ccc', color:C.white, border:'none', borderRadius:'24px', padding:'14px', fontSize:'14px', fontWeight:700, cursor: dpa ? 'pointer' : 'not-allowed', fontFamily:'sans-serif', marginTop:'8px'}}>
              Acceder a mon espace
            </button>
          </div>
        </div>
        <p style={{textAlign:'center', color:C.textLight, fontSize:'11px', marginTop:'16px'}}>Aucune donnee personnelle stockee en ligne.</p>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <p style={{color:C.textLight}}>Chargement...</p>
      </div>
    }>
      <DashboardContent/>
    </Suspense>
  );
}
