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
};

const SEMAINES_DATA: Record<number, {
  emoji:string;taille:string;poids:string;objet:string;
  developpement:string;maman:string;conseil:string;savistu:string;
}> = {
  6:{emoji:'🌾',taille:'0.6 cm',poids:'< 1g',objet:'un grain de riz',developpement:'Le coeur commence a battre. Les premieres cellules nerveuses se forment.',maman:'Fatigue intense, nausees matinales possibles.',conseil:'Accompagne-la sans jugement. Les nausees sont reelles et epuisantes.',savistu:'Le coeur de bebe bat deja 110 fois par minute a SA 6.'},
  7:{emoji:'🫐',taille:'1 cm',poids:'1g',objet:'une pile bouton',developpement:'Le visage commence a se former. Les bras et jambes apparaissent.',maman:'Nausees souvent au pic. Hypersensibilite aux odeurs.',conseil:'Prepare des en-cas legers a portee de main.',savistu:'Bebe a deja ses propres empreintes digitales uniques, formees des SA 7.'},
  8:{emoji:'🫐',taille:'1.6 cm',poids:'1g',objet:'une pile AA',developpement:'Les doigts commencent a se former. Le cerveau se developpe rapidement.',maman:'Fatigue extreme normale.',conseil:'Prends le relais sur les taches menageres sans quelle ait a demander.',savistu:'Le cerveau de bebe produit 100 nouvelles cellules nerveuses par minute a ce stade.'},
  9:{emoji:'🫒',taille:'2.3 cm',poids:'2g',objet:'un bouchon de liege',developpement:'Bebe bouge mais trop petit pour etre senti.',maman:'Humeurs changeantes dues aux hormones.',conseil:'Sois patient avec les sautes dhumeur. Ce nest pas contre toi.',savistu:'Le coeur de bebe bat deja a 170 battements par minute, deux fois plus vite que le tien.'},
  10:{emoji:'🍓',taille:'3 cm',poids:'4g',objet:'une balle de ping-pong',developpement:'Les ongles apparaissent. Bebe peut faire des petits mouvements.',maman:'Nausees commencent souvent a diminuer.',conseil:'Planifiez ensemble la premiere echographie.',savistu:'A SA 10, bebe peut deja froncer les sourcils et faire des grimaces.'},
  11:{emoji:'🍋',taille:'4 cm',poids:'7g',objet:'un bouchon de vin',developpement:'Les dents de lait se forment sous les gencives.',maman:'Le ventre commence a sarrondir.',conseil:'Accompagne-la chercher ses premiers vetements de grossesse.',savistu:'Les dents de lait de bebe sont deja en train de se former, meme si elles ne perceron que dans 6 mois apres la naissance.'},
  12:{emoji:'🍋',taille:'5.4 cm',poids:'14g',objet:'une balle de golf',developpement:'Fin du 1er trimestre. Risque de fausse couche chute fortement.',maman:'Soulagement emotionnel souvent au passage des 12 SA.',conseil:'Premiere grande echographie. Filme, prends des photos.',savistu:'A SA 12, le risque de fausse couche chute de 80%. C\'est le vrai debut de la grossesse sereine.'},
  13:{emoji:'🍑',taille:'7.4 cm',poids:'23g',objet:'un marqueur',developpement:'Bebe peut sucer son pouce.',maman:'Debut du 2e trimestre. Souvent la periode la plus agreable.',conseil:'Cest le bon moment pour annoncer officiellement la grossesse.',savistu:'Bebe peut deja sucer son pouce a SA 13. Le reflexe de succion est entraine bien avant la naissance.'},
  14:{emoji:'🍑',taille:'8.7 cm',poids:'43g',objet:'un crayon',developpement:'Bebe fait des grimaces, fronce les sourcils.',maman:'Ventre qui sarrondit. Libido souvent revenue.',conseil:'Proposez un week-end en amoureux avant larrivee de bebe.',savistu:'Le visage de bebe peut faire 30 expressions differentes a SA 14.'},
  15:{emoji:'🍎',taille:'10 cm',poids:'70g',objet:'une balle de squash',developpement:'Bebe entend les sons pour la premiere fois.',maman:'Prise de poids visible.',conseil:'Parle a bebe chaque soir. Il reconnaitra ta voix a la naissance.',savistu:'Bebe peut entendre ta voix depuis le ventre. Les recherches montrent qu\'il la reconnait des la naissance.'},
  16:{emoji:'🥑',taille:'11.6 cm',poids:'100g',objet:'une telecommande',developpement:'Le squelette se renforce.',maman:'Les premieres sensations de mouvements possibles.',conseil:'Pense a reserver les cours de preparation a laccouchement.',savistu:'Le squelette de bebe passe du cartilage a l\'os a partir de SA 16.'},
  17:{emoji:'🍐',taille:'13 cm',poids:'140g',objet:'un iPhone',developpement:'Une couche de graisse se forme sous la peau.',maman:'Mouvements de bebe parfois perceptibles.',conseil:'Pose ta main sur son ventre le soir.',savistu:'Les empreintes de la paume de bebe se forment a SA 17, uniques comme les tiennes.'},
  18:{emoji:'🫑',taille:'14.2 cm',poids:'190g',objet:'un stylo bille',developpement:'Les os se solidifient.',maman:'Douleurs ligamentaires possibles.',conseil:'Propose-lui des massages du dos.',savistu:'Bebe peut maintenant entendre la musique et les voix de l\'exterieur. Il reagi aux sons forts.'},
  19:{emoji:'🥭',taille:'15.3 cm',poids:'240g',objet:'une canette de soda',developpement:'Les sens se developpent rapidement.',maman:'Ventre bien visible.',conseil:'Preparez la chambre de bebe ensemble.',savistu:'Les cellules cerebrales de bebe se developpent a un rythme de 250 000 par minute a ce stade.'},
  20:{emoji:'🍌',taille:'16.4 cm',poids:'300g',objet:'un livre de poche',developpement:'Mi-grossesse ! Bebe recouvert dun enduit protecteur.',maman:'Grande echographie T2.',conseil:'Prends une demi-journee de conge pour cette echographie.',savistu:'C\'est la mi-grossesse. Bebe a deja parcouru la moitie du chemin.'},
  21:{emoji:'🥕',taille:'26.7 cm',poids:'360g',objet:'une bouteille de soda 33cl',developpement:'Bebe dort et se reveille a intervalles reguliers.',maman:'Ventre tres visible.',conseil:'Installe une veilleuse dans la chambre de bebe.',savistu:'Bebe a maintenant un cycle sommeil-eveil distinct. Il dort environ 12 heures par jour dans le ventre.'},
  22:{emoji:'🥭',taille:'27.8 cm',poids:'430g',objet:'un ballon de handball',developpement:'Les yeux sont formes mais encore fermes.',maman:'Vergetures possibles.',conseil:'Masse son ventre avec de lhuile.',savistu:'Les sourcils et les cils de bebe sont maintenant completement formes a SA 22.'},
  23:{emoji:'🍊',taille:'28.9 cm',poids:'500g',objet:'une bouteille d\'eau 50cl',developpement:'Bebe a le hoquet regulierement.',maman:'Essoufflement possible.',conseil:'Prends en charge les corvees physiques.',savistu:'Bebe pese maintenant exactement 500g — soit autant qu\'un grand steak.'},
  24:{emoji:'🌽',taille:'30 cm',poids:'600g',objet:'une regle 30cm',developpement:'Visage presque forme.',maman:'Diabete gestationnel a tester.',conseil:'Test HGPO cette semaine. Reste avec elle, ca dure 2 heures.',savistu:'Les poumons de bebe commencent a produire du surfactant, indispensable pour respirer apres la naissance.'},
  25:{emoji:'🥬',taille:'34.6 cm',poids:'660g',objet:'un rouleau de papier',developpement:'Les poumons se developpent activement.',maman:'Jambes lourdes.',conseil:'Propose-lui un bain de pieds le soir.',savistu:'Bebe commence a accumuler de la graisse sous la peau pour se preparer au monde exterieur.'},
  26:{emoji:'🥦',taille:'35.6 cm',poids:'760g',objet:'une raquette de ping-pong',developpement:'Les yeux souvrent pour la premiere fois.',maman:'Inconfort croissant.',conseil:'Installe un coussin de grossesse.',savistu:'Bebe ouvre les yeux pour la premiere fois a SA 26. Ils sont bleus pour tous les bebes, quelle que soit leur origine.'},
  27:{emoji:'🥬',taille:'36.6 cm',poids:'875g',objet:'une bouteille de vin',developpement:'Bebe peut rever.',maman:'Fin du 2e trimestre.',conseil:'Planifiez votre plan de naissance ensemble.',savistu:'Les recherches montrent que bebe peut rever a partir de SA 27. Son cerveau est actif meme pendant le sommeil.'},
  28:{emoji:'🍆',taille:'37.6 cm',poids:'1 kg',objet:'un kilo de farine',developpement:'Debut du 3e trimestre. Vision fonctionnelle.',maman:'Essoufflement, reflux.',conseil:'Commence a preparer ta valise maternite.',savistu:'A SA 28, bebe peut voir la lumiere qui filtre a travers la paroi de l\'uterus.'},
  29:{emoji:'🎃',taille:'38.6 cm',poids:'1.15 kg',objet:'un casque audio',developpement:'Muscles et poumons se renforcent.',maman:'Contractions de Braxton Hicks normales.',conseil:'Apprends a reconnaitre les vraies contractions des fausses.',savistu:'Les mouvements de bebe sont maintenant si forts qu\'ils peuvent etre visibles de l\'exterieur du ventre.'},
  30:{emoji:'🥬',taille:'39.9 cm',poids:'1.3 kg',objet:'un livre de 300 pages',developpement:'Cerveau en developpement rapide.',maman:'Fatigue intense de retour.',conseil:'Prends un conge paternite bien planifie.',savistu:'Le cerveau de bebe se plisse pour creer plus de surface. C\'est ce qui le rend si intelligent.'},
  31:{emoji:'🍍',taille:'41.1 cm',poids:'1.5 kg',objet:'un fer a repasser',developpement:'Tous les sens sont operationnels.',maman:'Difficultes a marcher longtemps.',conseil:'Propose des courtes promenades.',savistu:'Bebe peut maintenant distinguer le gout sucre du gout amer dans le liquide amniotique.'},
  32:{emoji:'🥭',taille:'42.4 cm',poids:'1.7 kg',objet:'un ballon de foot taille 1',developpement:'Bebe se met en position tete en bas.',maman:'Grande echographie T3.',conseil:'Accompagne-la a lecho T3.',savistu:'A SA 32, bebe peut reconnaitre la voix de ses deux parents. Il reagit differemment a chacune.'},
  33:{emoji:'🍍',taille:'43.7 cm',poids:'1.9 kg',objet:'un sac a dos petit format',developpement:'Squelette presque complet.',maman:'Essoufflement maximal.',conseil:'Prends en charge les nuits difficiles.',savistu:'Les ongles de bebe sont maintenant si longs qu\'il peut se griffer en bougeant dans le ventre.'},
  34:{emoji:'🍈',taille:'45 cm',poids:'2.15 kg',objet:'un club de golf',developpement:'Systeme nerveux central mature.',maman:'Descente du bebe dans le bassin.',conseil:'Commence les cours de preparation accouchement.',savistu:'A SA 34, les poumons de bebe sont presque matures. Un bebe ne a cet age a 99% de chances de survie.'},
  35:{emoji:'🍈',taille:'46.2 cm',poids:'2.4 kg',objet:'une raquette de badminton',developpement:'Reins et foie fonctionnels.',maman:'Envies frequentes duriner.',conseil:'Installe le siege auto maintenant.',savistu:'Bebe prend maintenant 250g par semaine. Il grossit plus vite que jamais.'},
  36:{emoji:'🥗',taille:'47.4 cm',poids:'2.6 kg',objet:'un ballon de basket junior',developpement:'Presque pret ! Poumons presque matures.',maman:'Envie intense de tout preparer.',conseil:'Valise maternite doit etre prete.',savistu:'L\'instinct de "nidification" que ressent maman est reel et documenté. C\'est un signal biologique.'},
  37:{emoji:'🌿',taille:'48.6 cm',poids:'2.85 kg',objet:'une batte de baseball',developpement:'Bebe est considere a terme.',maman:'Contractions possibles a tout moment.',conseil:'Mode alerte active. Reste joignable en permanence.',savistu:'Bebe est maintenant considere a terme. Il pourrait naitre a tout moment sans risque majeur.'},
  38:{emoji:'🌿',taille:'49.8 cm',poids:'3.1 kg',objet:'un haltere 3kg',developpement:'Bebe est pret.',maman:'Impatience et anxiete melees.',conseil:'Sois present, rassurant.',savistu:'La tete de bebe est maintenant engagee dans le bassin. Le corps se prepare activement a la naissance.'},
  39:{emoji:'🍉',taille:'50.7 cm',poids:'3.25 kg',objet:'un ballon de foot taille 3',developpement:'Pleinement developpe.',maman:'Chaque jour semble long.',conseil:'Organise une sortie douce.',savistu:'Bebe produit maintenant ses propres hormones de stress pour se preparer a l\'accouchement.'},
  40:{emoji:'🍉',taille:'51.2 cm',poids:'3.4 kg',objet:'un ballon de foot taille 4',developpement:'Cest le jour J !',maman:'Stress et excitation maximaux.',conseil:'Contractions toutes les 5min pendant 1h = maternite.',savistu:'Le jour J est arrive ! Bebe a attendu 280 jours pour te rencontrer.'},
  41:{emoji:'🍉',taille:'51.5 cm',poids:'3.6 kg',objet:'un ballon de foot taille 5',developpement:'Depassement de terme.',maman:'Inconfort majeur.',conseil:'Declenchement possible. Reste positif.',savistu:'Seulement 5% des bebes naissent exactement a la DPA. Le depassement est tres courant.'},
};

const MISSIONS: Record<number, string[]> = {
  6:['Dire a ta partenaire que tu es la pour elle','Faire les courses sans quelle demande','Chercher un gynecologue ou sage-femme si pas encore fait'],
  7:['Preparer des en-cas anti-nausees','Eviter les odeurs fortes a la maison','Commencer a lire sur la grossesse'],
  8:['Prendre le relais sur les taches menageres','Accompagner ta partenaire a sa consultation','Informer ton employeur discreetement si besoin'],
  9:['Etre patient avec les sautes dhumeur','Proposer un massage des pieds ou du dos','Reduire le stress de la maison'],
  10:['Planifier la premiere echographie ensemble','Lire le guide accouchement du module','Preparer une liste de questions pour le medecin'],
  11:['Accompagner acheter des vetements de grossesse','Commencer a penser aux finances bebe','Declarer la grossesse a la mutuelle'],
  12:['Etre present pour lecho T1 — ne pas manquer ca','Filmer et prendre des photos de lechographie','Annoncer la grossesse a la famille si vous le souhaitez'],
  13:['Annoncer officiellement la grossesse','Commencer a penser au prenom','Lire le module post-partum pour anticiper'],
  14:['Planifier un week-end en amoureux','Commencer a regarder les poussettes','Verifier les aides financieres auxquelles vous avez droit'],
  15:['Parler a bebe chaque soir','Reserver les cours de preparation accouchement','Faire un album photo de la grossesse'],
  16:['Reserver les cours de preparation accouchement','Commencer la liste des achats prioritaires','Penser a la chambre de bebe'],
  17:['Poser ta main sur son ventre le soir','Commander le coussin de grossesse','Commencer le module valise maternite'],
  18:['Proposer des massages du dos','Preparer la chambre de bebe ensemble','Regarder les contrats de creche de ta ville'],
  19:['Preparer la chambre de bebe','Faire une liste des cadeaux de naissance','Commencer les conges paternite avec ton RH'],
  20:['Prendre demi-journee pour echo T2','Preparer les questions pour lechographe','Celebrer la mi-grossesse'],
  21:['Installer la veilleuse','Commencer a assembler les meubles bebe','Choisir la maternite si pas encore fait'],
  22:['Masser son ventre avec de lhuile','Visiter la maternite','Preparer le plan de naissance'],
  23:['Prendre en charge les corvees physiques','Preparer le sac de maternite','Lire le guide accouchement en entier'],
  24:['Laccompagner au test HGPO — ca dure 2h','Commencer la valise maternite','Installer le siege auto'],
  25:['Bain de pieds le soir','Finaliser la chambre de bebe','Verifier ton conge paternite'],
  26:['Commander le coussin de grossesse','Finaliser le plan de naissance','Preparer une playlist pour la salle de naissance'],
  27:['Rediger le plan de naissance ensemble','Preparer les docs administratifs maternite','Tester le chemin vers la maternite'],
  28:['Commencer la valise maintenant','Preparer les numeros utiles sur ton tel','Lire le module accouchement'],
  29:['Apprendre a reconnaitre les vraies contractions','Avoir le numero de la maternite en favori','Rester joignable en permanence'],
  30:['Planifier ton conge paternite avec ton employeur','Finaliser la valise','Preparer la maison pour le retour'],
  31:['Valise presque prete — verifier la liste','Preparer les repas a lavance congelables','Installer le berceau ou lit cododo'],
  32:['Accompagner a lecho T3','Verifier position bebe avec le medecin','Finaliser les achats prioritaires'],
  33:['Prendre en charge les nuits difficiles','Preparer un plan B si accouchement rapide','Confirmer les conges paternite'],
  34:['Commencer la preparation accouchement','Tester 2 fois le chemin maternite','Avoir la valise dans le coffre'],
  35:['Installer le siege auto — verifier installation','Finaliser tous les achats','Preparer la maison'],
  36:['Valise dans la voiture maintenant','Telephone charge 24h/24','Rester joignable en permanence'],
  37:['Mode alerte maximum — rester joignable','Relire le guide accouchement','Verifier que la valise est complete'],
  38:['Etre present et rassurant','Preparer les repas pour les premiers jours','Prevenir famille et amis proches'],
  39:['Organiser une sortie douce','Etre present emotionnellement','Garder son calme — le moment approche'],
  40:['Contractions 5min/1h = maternite','Garder son calme — tu es pret','Appeler la maternite si le moindre doute'],
  41:['Rester positif et patient','Soutien emotionnel maximum','Suivre les instructions de la maternite'],
};

const RDV_LIST = [
  {sa:8,emoji:'🏥',titre:'1ere consultation',desc:'Confirmation grossesse, prise de sang, calcul DPA. Sois la, prends des notes.',oblig:true},
  {sa:12,emoji:'🔬',titre:'Echo T1 + trisomie',desc:'Premier visage de bebe ! Mesure clarte nucale. Apporte ton telephone.',oblig:true},
  {sa:16,emoji:'📋',titre:'Consultation mensuelle',desc:'Suivi tension, poids. Bonne occasion de poser vos questions.',oblig:false},
  {sa:20,emoji:'📝',titre:'Declaration grossesse CPAM',desc:'A faire avant 15 SA. Declarer a la caisse et a l\'employeur.',oblig:true},
  {sa:22,emoji:'👶',titre:'Echo T2 morphologique',desc:'La plus importante. Organes, membres, visage. Duree 45min.',oblig:true},
  {sa:24,emoji:'🩸',titre:'Test diabete gestationnel',desc:'Test HGPO — 3 prises de sang en 2h. Accompagne-la.',oblig:false},
  {sa:28,emoji:'💉',titre:'Debut T3 + vaccin coqueluche',desc:'Vaccin recommande pour le papa aussi. Parler du projet de naissance.',oblig:false},
  {sa:32,emoji:'📏',titre:'Echo T3 croissance',desc:'Verification position bebe, poids estime. Si siege, on en parle.',oblig:true},
  {sa:34,emoji:'🎓',titre:'Preparation accouchement',desc:'3 a 8 seances remboursees. Les cours pour papas existent !',oblig:false},
  {sa:36,emoji:'💬',titre:'Entretien prenatal',desc:'Bilan global, projet de naissance. Viens absolument.',oblig:true},
  {sa:38,emoji:'🧳',titre:'Valise prete ?',desc:'Preparez la valise maintenant. Documents, vetements, chargeurs.',oblig:false},
  {sa:40,emoji:'🎉',titre:'Jour J',desc:'Contractions toutes les 5min pendant 1h = direction maternite !',oblig:true},
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
  const [missionsChecked, setMissionsChecked] = useState<Record<string,boolean>>({});
  const [avance, setAvance] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    const d = searchParams.get('dpa') || localStorage.getItem('dadup_dpa') || '';
    const p = localStorage.getItem('dadup_prenom') || '';
    const n = JSON.parse(localStorage.getItem('dadup_notes') || '[]');
    const v = JSON.parse(localStorage.getItem('dadup_valise') || '{}');
    const m = JSON.parse(localStorage.getItem('dadup_missions') || '{}');
    if (!d) { setShowOnboarding(true); } else { setDpa(d); }
    setPrenom(p);
    setNotes(n);
    setValiseChecked(v);
    setMissionsChecked(m);
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
  const dataReelle = saReelle ? (SEMAINES_DATA[saReelle] || SEMAINES_DATA[40]) : null;
  const dpaDate = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.ceil((dpaDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
  const moisGrossesse = saReelle ? Math.ceil(saReelle / 4.3) : 1;
  const ideesMois = IDEES_MOIS[Math.min(moisGrossesse, 9)] || IDEES_MOIS[9];
  const isPostPartum = joursRestants !== null && joursRestants < 0;
  const progression = Math.min(100, Math.round(((saReelle || 0) / 40) * 100));
  const trimestre = (saReelle || 0) <= 14 ? 'T1' : (saReelle || 0) <= 27 ? 'T2' : 'T3';
  const missions = saReelle ? (MISSIONS[saReelle] || MISSIONS[40]) : [];

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

  const toggleMission = (id: string) => {
    const updated = {...missionsChecked, [id]: !missionsChecked[id]};
    setMissionsChecked(updated);
    localStorage.setItem('dadup_missions', JSON.stringify(updated));
  };

  const saveOnboarding = (d: string, p: string) => {
    localStorage.setItem('dadup_dpa', d);
    localStorage.setItem('dadup_prenom', p);
    setDpa(d);
    setPrenom(p);
    setShowOnboarding(false);
  };

  const tabs = [
    {id:'home', label:'Accueil'},
    {id:'bebe', label:'Bebe'},
    {id:'rdv', label:'RDV'},
    {id:'pratique', label:'Pratique'},
    {id:'cadeaux', label:'Cadeaux'},
  ];

  if (showOnboarding) return <Onboarding onSave={saveOnboarding}/>;

  return (
    <div style={{minHeight:'100vh', background:'#f8f7f4', paddingBottom:'32px', fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif'}}>

      {/* HEADER */}
      <div style={{background:C.cream, position:'sticky', top:0, zIndex:40, borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px'}}>
          <a href="/dashboard" onClick={() => setActiveTab('home')} style={{textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="40" height="40">
              <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
              <circle cx="150" cy="150" r="122" fill="#4a6080"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
              <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
            </svg>
          </a>
          <a href="/dashboard" onClick={() => setActiveTab('home')} style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
            <div style={{textAlign:'right'}}>
              <p style={{color:C.dark, fontSize:'17px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>
                {prenom || 'DadUp'}
              </p>
              <p style={{color:C.gold, fontSize:'11px', margin:0, fontWeight:500}}>
                {isPostPartum ? 'Post-partum' : saReelle ? 'Semaine ' + saReelle + ' · ' + trimestre : 'Mon espace'}
              </p>
            </div>
            {saReelle && (
              <span style={{background:C.dark, color:C.gold, fontSize:'12px', fontWeight:700, padding:'7px 14px', borderRadius:'20px', flexShrink:0}}>
                SA {saReelle}
              </span>
            )}
          </a>
        </div>
        <div style={{padding:'0 16px 12px', display:'flex', gap:'6px', overflowX:'auto'}}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding:'8px 16px', fontSize:'12px',
              fontWeight: activeTab === t.id ? 700 : 400,
              color: activeTab === t.id ? C.gold : C.textLight,
              background: activeTab === t.id ? C.dark : C.white,
              border: activeTab === t.id ? 'none' : `1px solid ${C.border}`,
              borderRadius:'20px', cursor:'pointer',
              whiteSpace:'nowrap' as const, flexShrink:0,
              transition:'all 0.15s',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'16px 20px', maxWidth:'100%'}}>

        {/* ========== ACCUEIL ========== */}
        {activeTab === 'home' && (
          <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>

            {isPostPartum ? (
              <div style={{background:C.dark, borderRadius:'20px', padding:'32px', textAlign:'center'}}>
                <p style={{fontSize:'48px', margin:'0 0 8px'}}>👶</p>
                <p style={{color:C.white, fontSize:'24px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Bebe est la !</p>
                <p style={{color:C.gold, fontSize:'13px', margin:'4px 0 0'}}>Mode post-partum active</p>
              </div>
            ) : dataReelle && saReelle && (
              <div style={{background:C.dark, borderRadius:'20px', padding:'24px', display:'flex', alignItems:'center', gap:'20px'}}>
                <div style={{flex:1}}>
                  <p style={{color:'rgba(200,160,96,0.7)', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 8px', fontWeight:600}}>SA {saReelle} · {trimestre}</p>
                  <p style={{color:C.white, fontSize:'24px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1.2}}>
                    Bebe fait {dataReelle.taille}<br/>et pese {dataReelle.poids}
                  </p>
                  <p style={{color:'rgba(255,255,255,0.35)', fontSize:'13px', margin:'0 0 20px'}}>
                    {joursRestants && joursRestants > 0 ? joursRestants + ' jours avant le grand jour' : 'Le grand jour approche !'}
                  </p>
                  <div style={{background:'rgba(255,255,255,0.1)', borderRadius:'6px', height:'4px', marginBottom:'8px'}}>
                    <div style={{background:C.gold, height:'4px', borderRadius:'6px', width:progression+'%'}}/>
                  </div>
                  <div style={{display:'flex', gap:'6px'}}>
                    {['T1','T2','T3'].map((t, i) => {
                      const seuils = [14, 27, 40];
                      const actif = (saReelle||0) > (i === 0 ? 0 : seuils[i-1]);
                      const enCours = trimestre === t;
                      return (
                        <span key={t} style={{
                          background: enCours ? 'rgba(200,160,96,0.2)' : actif ? C.gold : 'rgba(255,255,255,0.06)',
                          color: enCours ? C.gold : actif ? C.dark : 'rgba(255,255,255,0.25)',
                          fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'20px'
                        }}>{t}{actif && !enCours ? ' ✓' : enCours ? ' →' : ''}</span>
                      );
                    })}
                    <span style={{color:'rgba(255,255,255,0.3)', fontSize:'12px', marginLeft:'auto', alignSelf:'center'}}>{progression}%</span>
                  </div>
                </div>
                <div style={{fontSize:'64px', lineHeight:1, flexShrink:0}}>{dataReelle.emoji}</div>
              </div>
            )}

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              {dataReelle && (
                <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:'18px', marginBottom:'10px'}}>💡</div>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 6px'}}>Conseil</p>
                  <p style={{color:C.dark, fontSize:'13px', lineHeight:1.5, margin:0, fontWeight:500}}>{dataReelle.conseil}</p>
                </div>
              )}
              <div style={{background:C.gold, borderRadius:'16px', padding:'18px'}}>
                <div style={{fontSize:'18px', marginBottom:'10px'}}>🎁</div>
                <p style={{color:'rgba(30,37,53,0.55)', fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 6px'}}>Idee du mois</p>
                <p style={{color:C.dark, fontSize:'13px', lineHeight:1.5, margin:0, fontWeight:600}}>{ideesMois}</p>
              </div>
            </div>

            {/* MISSION DE LA SEMAINE */}
            {missions.length > 0 && (
              <div style={{background:C.white, borderRadius:'16px', padding:'20px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'10px', background:'#f8f7f4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px'}}>🎯</div>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:0}}>Ta mission cette semaine</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {missions.map((m, i) => {
                    const id = 'mission_' + saReelle + '_' + i;
                    const done = missionsChecked[id];
                    return (
                      <button key={id} onClick={() => toggleMission(id)} style={{display:'flex', gap:'12px', alignItems:'flex-start', background:'none', border:'none', cursor:'pointer', textAlign:'left', padding:'4px 0'}}>
                        <div style={{width:'22px', height:'22px', borderRadius:'6px', border:`2px solid ${done ? C.gold : C.border}`, background: done ? C.gold : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px', transition:'all 0.15s'}}>
                          {done && <span style={{color:C.dark, fontSize:'12px', fontWeight:700}}>✓</span>}
                        </div>
                        <p style={{color: done ? C.textLight : C.dark, fontSize:'13px', margin:0, lineHeight:1.5, textDecoration: done ? 'line-through' : 'none'}}>{m}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PROCHAIN RDV */}
            {RDV_LIST.filter(r => saReelle && r.sa >= saReelle).slice(0,1).map((r, i) => (
              <div key={i} style={{background:C.white, borderRadius:'16px', padding:'20px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px'}}>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:0}}>Prochain RDV</p>
                  {dpa && (
                    <span style={{background:'#f8f7f4', color:C.gold, fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'20px', border:`1px solid ${C.border}`}}>
                      {Math.max(0, Math.round((new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000 - new Date().getTime()) / (1000 * 60 * 60 * 24)))}j
                    </span>
                  )}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <div style={{width:'48px', height:'48px', borderRadius:'14px', background:'#f8f7f4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0}}>{r.emoji}</div>
                  <div style={{flex:1}}>
                    <p style={{color:C.dark, fontSize:'15px', fontWeight:700, margin:'0 0 2px'}}>{r.titre}</p>
                    <p style={{color:C.textLight, fontSize:'12px', margin:0}}>SA {r.sa}{dpa ? ' · ' + new Date(new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'long'}) : ''}</p>
                  </div>
                  <button onClick={() => setActiveTab('rdv')} style={{width:'32px', height:'32px', borderRadius:'50%', background:C.dark, border:'none', cursor:'pointer', color:C.gold, fontSize:'14px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center'}}>→</button>
                </div>
              </div>
            ))}

            {/* LE SAVAIS-TU */}
            {dataReelle && (
              <div style={{background:C.dark, borderRadius:'16px', padding:'20px'}}>
                <div style={{display:'flex', gap:'12px', alignItems:'flex-start'}}>
                  <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(200,160,96,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>🧠</div>
                  <div>
                    <p style={{color:C.gold, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 6px'}}>Le savais-tu ?</p>
                    <p style={{color:C.white, fontSize:'14px', lineHeight:1.6, margin:0, fontWeight:500}}>{dataReelle.savistu}</p>
                  </div>
                </div>
              </div>
            )}

            {/* BEBE CE MOIS + MAMAN */}
            {dataReelle && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 10px'}}>Bebe ce mois</p>
                  <p style={{color:C.dark, fontSize:'13px', lineHeight:1.5, margin:0}}>{dataReelle.developpement}</p>
                </div>
                <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 10px'}}>Ce que vit maman</p>
                  <p style={{color:C.dark, fontSize:'13px', lineHeight:1.5, margin:0}}>{dataReelle.maman}</p>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========== BEBE ========== */}
        {activeTab === 'bebe' && data && sa && (
          <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>
                {avance ? 'Dans 4 semaines' : 'Semaine ' + saReelle}
              </h2>
              <button onClick={() => setAvance(!avance)} style={{fontSize:'11px', padding:'7px 14px', borderRadius:'20px', cursor:'pointer', fontWeight:700, background: avance ? C.dark : C.white, color: avance ? C.gold : C.text, border: avance ? 'none' : `1px solid ${C.border}`}}>
                {avance ? '← Revenir' : "S'avancer +4 SA"}
              </button>
            </div>

            <div style={{background:C.dark, borderRadius:'20px', padding:'24px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'16px', right:'20px', fontSize:'80px', lineHeight:1, opacity:0.9}}>{data.emoji}</div>
              <div style={{position:'relative'}}>
                <p style={{color:'rgba(200,160,96,0.7)', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 8px', fontWeight:600}}>SA {sa}</p>
                <p style={{color:C.white, fontSize:'28px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1.1}}>
                  {data.taille} · {data.poids}
                </p>
                <p style={{color:'rgba(255,255,255,0.5)', fontSize:'14px', margin:'0 0 8px'}}>
                  Comme {data.objet}
                </p>
              </div>
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <p style={{color:C.textLight, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 10px'}}>Developpement</p>
              <p style={{color:C.dark, fontSize:'14px', lineHeight:1.6, margin:0}}>{data.developpement}</p>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 10px'}}>Ce que vit maman</p>
                <p style={{color:C.dark, fontSize:'13px', lineHeight:1.5, margin:0}}>{data.maman}</p>
              </div>
              <div style={{background:C.gold, borderRadius:'16px', padding:'18px'}}>
                <p style={{color:'rgba(30,37,53,0.55)', fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 10px'}}>Ton role</p>
                <p style={{color:C.dark, fontSize:'13px', lineHeight:1.5, margin:0, fontWeight:600}}>{data.conseil}</p>
              </div>
            </div>

            <div style={{background:C.dark, borderRadius:'16px', padding:'20px'}}>
              <div style={{display:'flex', gap:'12px', alignItems:'flex-start'}}>
                <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(200,160,96,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>🧠</div>
                <div>
                  <p style={{color:C.gold, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 6px'}}>Le savais-tu ?</p>
                  <p style={{color:C.white, fontSize:'14px', lineHeight:1.6, margin:0}}>{data.savistu}</p>
                </div>
              </div>
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:'0 0 12px'}}>Journal</p>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Ce que j'ai ressenti cette semaine..." style={{width:'100%', background:'#f8f7f4', border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px', fontSize:'13px', color:C.dark, resize:'none', boxSizing:'border-box' as const, fontFamily:'sans-serif', outline:'none'}} rows={3}/>
              <button onClick={saveNote} style={{marginTop:'8px', background:C.dark, color:C.gold, fontSize:'12px', fontWeight:700, padding:'8px 20px', borderRadius:'20px', border:'none', cursor:'pointer'}}>Enregistrer</button>
              {notes.length > 0 && (
                <div style={{marginTop:'12px', display:'flex', flexDirection:'column', gap:'8px'}}>
                  {notes.slice(-3).reverse().map((n, i) => (
                    <p key={i} style={{color:C.textLight, fontSize:'12px', background:'#f8f7f4', borderRadius:'10px', padding:'10px', margin:0, lineHeight:1.5}}>{n}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== RDV ========== */}
        {activeTab === 'rdv' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Calendrier RDV</h2>
              {dpa && <p style={{color:C.textLight, fontSize:'12px', margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR', {day:'numeric', month:'long'})}</p>}
            </div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:'20px', top:0, bottom:0, width:'2px', background:C.border}}/>
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                {RDV_LIST.map((r, i) => {
                  const statut = !saReelle ? 'futur' : r.sa < saReelle ? 'passe' : r.sa <= saReelle + 2 ? 'prochain' : 'futur';
                  return (
                    <div key={i} style={{position:'relative', paddingLeft:'52px'}}>
                      <div style={{position:'absolute', left:'12px', top:'18px', width:'18px', height:'18px', borderRadius:'50%', border:`2px solid ${statut === 'passe' ? C.gold : statut === 'prochain' ? C.gold : C.border}`, background: statut === 'passe' ? C.gold : statut === 'prochain' ? C.gold : C.white, display:'flex', alignItems:'center', justifyContent:'center', transform: statut === 'prochain' ? 'scale(1.2)' : 'scale(1)'}}>
                        {statut === 'passe' && <span style={{color:C.dark, fontSize:'10px', fontWeight:700}}>✓</span>}
                      </div>
                      <button onClick={() => setRdvOuvert(rdvOuvert === i ? null : i)} style={{width:'100%', textAlign:'left', borderRadius:'16px', padding:'14px 16px', border:'none', cursor:'pointer', background: statut === 'prochain' ? C.dark : C.white, outline:'none', opacity: statut === 'passe' ? 0.55 : 1, borderLeft: statut === 'prochain' ? `3px solid ${C.gold}` : `1px solid ${C.border}`}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <span style={{fontSize:'18px'}}>{r.emoji}</span>
                            <div>
                              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                <p style={{color: statut === 'prochain' ? C.white : C.dark, fontSize:'13px', fontWeight:700, margin:0}}>{r.titre}</p>
                                {r.oblig && <span style={{background: statut === 'prochain' ? 'rgba(200,160,96,0.2)' : '#f8f7f4', color:C.gold, fontSize:'9px', fontWeight:700, padding:'2px 6px', borderRadius:'10px'}}>obligatoire</span>}
                              </div>
                              <p style={{color:C.textLight, fontSize:'11px', margin:0}}>SA {r.sa}{dpa ? ' · ' + new Date(new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'short'}) : ''}</p>
                            </div>
                          </div>
                          <span style={{color:C.textLight, fontSize:'11px'}}>{rdvOuvert === i ? '▲' : '▼'}</span>
                        </div>
                        {rdvOuvert === i && <p style={{color: statut === 'prochain' ? 'rgba(255,255,255,0.6)' : C.text, fontSize:'12px', lineHeight:1.5, margin:'10px 0 0', paddingTop:'10px', borderTop:`1px solid ${statut === 'prochain' ? 'rgba(255,255,255,0.1)' : C.border}`}}>{r.desc}</p>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========== PRATIQUE ========== */}
        {activeTab === 'pratique' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Pratique</h2>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px'}}>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:0}}>Valise maternite</p>
                <span style={{background:C.dark, color:C.gold, fontSize:'11px', fontWeight:700, padding:'3px 12px', borderRadius:'20px'}}>{Object.values(valiseChecked).filter(Boolean).length}/21</span>
              </div>
              <div style={{background:'#f8f7f4', borderRadius:'6px', height:'4px', marginBottom:'16px'}}>
                <div style={{background:C.gold, height:'4px', borderRadius:'6px', width:(Object.values(valiseChecked).filter(Boolean).length/21*100)+'%', transition:'width 0.3s'}}/>
              </div>
              {[
                {titre:'Pour toi', items:[{id:'v1',label:'Chargeur + batterie externe'},{id:'v2',label:'Vetements confort (2 jours)'},{id:'v3',label:'Snacks & eau'},{id:'v4',label:'Ecouteurs'},{id:'v5',label:'Documents hospitaliers'},{id:'v6',label:'Appareil photo charge'}]},
                {titre:'Pour elle', items:[{id:'v7',label:'Chemise de nuit accouchement'},{id:'v8',label:'Robe de chambre + chaussons'},{id:'v9',label:'Sous-vetements post-partum'},{id:'v10',label:'Produits de toilette'},{id:'v11',label:'Soutien-gorge allaitement x2'}]},
                {titre:'Pour bebe', items:[{id:'v12',label:'Body naissance x3'},{id:'v13',label:'Pyjama naissance x2'},{id:'v14',label:'Bonnet naissance x2'},{id:'v15',label:'Gigoteuse naissance'},{id:'v16',label:'Siege auto installe'},{id:'v17',label:'Couches nouveau-ne'}]},
                {titre:'Documents', items:[{id:'v18',label:'Carte vitale + mutuelle'},{id:'v19',label:'Carnet de maternite'},{id:'v20',label:'Pieces didentite'},{id:'v21',label:'Plan acces maternite'}]},
              ].map(s => (
                <div key={s.titre} style={{marginBottom:'16px'}}>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'2px', margin:'0 0 10px'}}>{s.titre}</p>
                  <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                    {s.items.map(item => (
                      <button key={item.id} onClick={() => toggleValise(item.id)} style={{display:'flex', alignItems:'center', gap:'12px', background:'none', border:'none', cursor:'pointer', textAlign:'left', padding:'4px 0'}}>
                        <div style={{width:'22px', height:'22px', borderRadius:'6px', border:`2px solid ${valiseChecked[item.id] ? C.gold : C.border}`, background: valiseChecked[item.id] ? C.gold : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s'}}>
                          {valiseChecked[item.id] && <span style={{color:C.dark, fontSize:'12px', fontWeight:700}}>✓</span>}
                        </div>
                        <span style={{fontSize:'13px', color: valiseChecked[item.id] ? C.textLight : C.dark, textDecoration: valiseChecked[item.id] ? 'line-through' : 'none'}}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:'0 0 16px'}}>Liste achats prioritaires</p>
              <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                {[
                  {label:'Siege auto groupe 0+', priorite:'urgent', prix:'80-300€'},
                  {label:'Babyphone video', priorite:'urgent', prix:'40-150€'},
                  {label:'Lit cododo / berceau', priorite:'urgent', prix:'60-400€'},
                  {label:'Poussette combinee', priorite:'avant naissance', prix:'200-1200€'},
                  {label:'Tire-lait electrique', priorite:'si allaitement', prix:'30-200€'},
                  {label:'Thermometre rectal', priorite:'urgent', prix:'15-40€'},
                  {label:'Humidificateur', priorite:'utile', prix:'30-80€'},
                ].map((a, i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px', background:'#f8f7f4', borderRadius:'12px'}}>
                    <div>
                      <p style={{color:C.dark, fontSize:'13px', fontWeight:600, margin:'0 0 4px'}}>{a.label}</p>
                      <span style={{background: a.priorite === 'urgent' ? '#fff0f0' : C.cream, color: a.priorite === 'urgent' ? '#cc4444' : C.textLight, fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'10px'}}>{a.priorite}</span>
                    </div>
                    <p style={{color:C.gold, fontSize:'13px', fontWeight:700, margin:0}}>{a.prix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:'0 0 16px'}}>Survie 1er mois</p>
              {[
                {titre:'Emmaillotage', contenu:'Etendre la couverture en losange. Replier le coin superieur. Poser bebe, epaules sur le bord. Ramener les cotes un par un, bien serre mais pas trop.'},
                {titre:'Bebe pleure — que faire ?', contenu:'1. Faim ? (toutes les 2-3h) 2. Couche sale ? 3. Trop chaud/froid ? (nuque = thermometre) 4. Besoin de contact ? 5. Coliques ? (velo avec les jambes)'},
                {titre:'Sommeil de bebe', contenu:'Nouveau-ne dort 16-18h/24. Sur le dos, dans son propre espace. Pas doreiller. Temperature chambre 18-20 C.'},
              ].map((s, i) => (
                <div key={i} style={{marginBottom: i < 2 ? '16px' : 0, paddingBottom: i < 2 ? '16px' : 0, borderBottom: i < 2 ? `1px solid ${C.border}` : 'none'}}>
                  <p style={{color:C.gold, fontSize:'12px', fontWeight:700, margin:'0 0 6px'}}>{s.titre}</p>
                  <p style={{color:C.text, fontSize:'13px', lineHeight:1.6, margin:0}}>{s.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== CADEAUX ========== */}
        {activeTab === 'cadeaux' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Cadeaux & Bons plans</h2>
            <div style={{background:C.gold, borderRadius:'16px', padding:'18px'}}>
              <div style={{fontSize:'18px', marginBottom:'10px'}}>✨</div>
              <p style={{color:'rgba(30,37,53,0.55)', fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 6px'}}>Idee du mois</p>
              <p style={{color:C.dark, fontSize:'14px', fontWeight:600, margin:0, lineHeight:1.5}}>{ideesMois}</p>
            </div>
            {PARTENAIRES.map(cat => (
              <div key={cat.categorie} style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px'}}>{cat.categorie}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px', background:'#f8f7f4', borderRadius:'12px'}}>
                      <div>
                        <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 2px'}}>{item.nom}</p>
                        <p style={{color:C.textLight, fontSize:'11px', margin:0}}>{item.desc}</p>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:'8px', flexShrink:0}}>
                        <span style={{background:C.gold, color:C.dark, fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'20px'}}>{item.remise}</span>
                        <a href={item.lien} style={{background:C.dark, color:C.gold, fontSize:'11px', fontWeight:700, padding:'6px 14px', borderRadius:'20px', textDecoration:'none'}}>Voir</a>
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
          <h1 style={{fontSize:'24px', fontWeight:800, color:C.dark, margin:'0 0 8px', textAlign:'center', fontFamily:'Georgia,serif'}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.text, fontSize:'14px', textAlign:'center', margin:'0 0 28px'}}>Deux infos pour personnaliser ton espace.</p>
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Ton prenom</label>
              <input type="text" placeholder="Thomas, Julien, Marc..." value={prenom} onChange={e => setPrenom(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif', outline:'none'}}/>
            </div>
            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Date prevue d'accouchement</label>
              <input type="date" value={dpa} onChange={e => setDpa(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif', outline:'none'}}/>
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
