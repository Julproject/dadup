'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const SEMAINES_DATA: Record<number, {
  fruit: string;
  emoji: string;
  taille: string;
  poids: string;
  developpement: string;
  maman: string;
  conseil: string;
}> = {
  6: { fruit: 'grain de riz', emoji: '🌾', taille: '0.6 cm', poids: '< 1g', developpement: 'Le cœur commence à battre. Les premières cellules nerveuses se forment.', maman: 'Fatigue intense, nausées matinales possibles. Seins sensibles.', conseil: 'Accompagne-la sans jugement. Les nausées sont réelles et épuisantes.' },
  7: { fruit: 'myrtille', emoji: '🫐', taille: '1 cm', poids: '1g', developpement: 'Le visage commence à se former. Les bras et jambes apparaissent.', maman: 'Nausées souvent au pic. Hypersensibilité aux odeurs.', conseil: 'Prépare des en-cas légers à portée de main. Évite les odeurs fortes.' },
  8: { fruit: 'myrtille', emoji: '🫐', taille: '1.6 cm', poids: '1g', developpement: 'Les doigts commencent à se former. Le cerveau se développe rapidement.', maman: 'Fatigue extrême normale. Envies alimentaires inhabituelles.', conseil: 'Prends le relais sur les tâches ménagères sans qu\'elle ait à demander.' },
  9: { fruit: 'olive', emoji: '🫒', taille: '2.3 cm', poids: '2g', developpement: 'Bébé bouge mais trop petit pour être senti. Tous les organes sont en place.', maman: 'Humeurs changeantes dues aux hormones. Totalement normal.', conseil: 'Sois patient avec les sautes d\'humeur. Ce n\'est pas contre toi.' },
  10: { fruit: 'fraise', emoji: '🍓', taille: '3 cm', poids: '4g', developpement: 'Les ongles apparaissent. Bébé peut faire des petits mouvements.', maman: 'Nausées commencent souvent à diminuer. Retour d\'énergie possible.', conseil: 'Planifiez ensemble la première échographie. Moment fort en émotions.' },
  11: { fruit: 'citron vert', emoji: '🍋', taille: '4 cm', poids: '7g', developpement: 'Les dents de lait se forment sous les gencives. Reflexe de succion présent.', maman: 'Le ventre commence à se arrondir légèrement.', conseil: 'Accompagne-la chercher ses premiers vêtements de grossesse.' },
  12: { fruit: 'citron', emoji: '🍋', taille: '5.4 cm', poids: '14g', developpement: 'Fin du 1er trimestre. Risque de fausse couche chute fortement. Visage reconnaissable.', maman: 'Soulagement émotionnel souvent au passage des 12 SA. Énergie qui revient.', conseil: 'Première grande échographie. Filme, prends des photos, vis ce moment à fond.' },
  13: { fruit: 'pêche', emoji: '🍑', taille: '7.4 cm', poids: '23g', developpement: 'Bébé peut sucer son pouce. Les empreintes digitales se forment.', maman: 'Début du 2e trimestre. Souvent la période la plus agréable.', conseil: 'C\'est le bon moment pour annoncer officiellement la grossesse.' },
  14: { fruit: 'pêche', emoji: '🍑', taille: '8.7 cm', poids: '43g', developpement: 'Bébé fait des grimaces, fronce les sourcils. Les reins fonctionnent.', maman: 'Ventre qui s\'arrondit. Libido souvent revenue.', conseil: 'Proposez un voyage ou un week-end en amoureux avant l\'arrivée de bébé.' },
  15: { fruit: 'pomme', emoji: '🍎', taille: '10 cm', poids: '70g', developpement: 'Bébé entend les sons pour la première fois. Parle-lui !', maman: 'Prise de poids visible. Dos qui commence à travailler.', conseil: 'Parle à bébé chaque soir. Il reconnaîtra ta voix à la naissance.' },
  16: { fruit: 'avocat', emoji: '🥑', taille: '11.6 cm', poids: '100g', developpement: 'Le squelette se renforce. Les yeux peuvent percevoir la lumière.', maman: 'Les premières sensations de mouvements possibles.', conseil: 'Pense à réserver les cours de préparation à l\'accouchement.' },
  17: { fruit: 'poire', emoji: '🍐', taille: '13 cm', poids: '140g', developpement: 'Une couche de graisse se forme sous la peau. Bébé s\'entraîne à avaler.', maman: 'Mouvements de bébé parfois perceptibles. Moment magique.', conseil: 'Pose ta main sur son ventre le soir. Tu sentiras bientôt les coups.' },
  18: { fruit: 'poivron', emoji: '🫑', taille: '14.2 cm', poids: '190g', developpement: 'Les os se solidifient. Bébé développe son sens du toucher.', maman: 'Douleurs ligamentaires possibles. Dos sensible.', conseil: 'Propose-lui des massages du dos. Simple et très apprécié.' },
  19: { fruit: 'mangue', emoji: '🥭', taille: '15.3 cm', poids: '240g', developpement: 'Les sens se développent rapidement. Bébé réagit aux sons externes.', maman: 'Ventre bien visible. Fatigue possible retour.', conseil: 'Préparez la chambre de bébé ensemble. Moment de complicité important.' },
  20: { fruit: 'banane', emoji: '🍌', taille: '16.4 cm', poids: '300g', developpement: 'Mi-grossesse ! Bébé est recouvert d\'un enduit protecteur blanc.', maman: 'Grande échographie T2. Moment clé de la grossesse.', conseil: 'Prends une demi-journée de congé pour cette échographie. Prépare tes questions.' },
  21: { fruit: 'carotte', emoji: '🥕', taille: '26.7 cm', poids: '360g', developpement: 'Bébé dort et se réveille à intervalles réguliers. Rythme établi.', maman: 'Ventre très visible. Dos et bassin sous pression.', conseil: 'Installe une veilleuse dans la chambre de bébé. Pense à l\'organisation pratique.' },
  22: { fruit: 'papaye', emoji: '🥭', taille: '27.8 cm', poids: '430g', developpement: 'Les yeux sont formés mais encore fermés. Bébé perçoit la lumière.', maman: 'Vergetures possibles. Crampes nocturnes.', conseil: 'Masse son ventre avec de l\'huile. Geste simple, très apprécié.' },
  23: { fruit: 'pamplemousse', emoji: '🍊', taille: '28.9 cm', poids: '500g', developpement: 'Bébé a le hoquet régulièrement. Ongles visibles.', maman: 'Essoufflement possible à l\'effort. Ventre lourd.', conseil: 'Prends en charge les corvées physiques sans qu\'elle demande.' },
  24: { fruit: 'épi de maïs', emoji: '🌽', taille: '30 cm', poids: '600g', developpement: 'Visage presque formé. Bébé reconnaît la voix de ses parents.', maman: 'Diabète gestationnel à tester. Accompagne-la pour ce test.', conseil: 'Test HGPO cette semaine. Reste avec elle, ça dure 2 heures.' },
  25: { fruit: 'navet', emoji: '🫚', taille: '34.6 cm', poids: '660g', developpement: 'Les poumons se développent activement. Réflexe de respiration exercé.', maman: 'Jambes lourdes. Varices possibles.', conseil: 'Propose-lui un bain de pieds le soir. Petit geste, grand effet.' },
  26: { fruit: 'chou-fleur', emoji: '🥦', taille: '35.6 cm', poids: '760g', developpement: 'Les yeux s\'ouvrent pour la première fois. Cils et sourcils visibles.', maman: 'Inconfort croissant. Difficultés à dormir.', conseil: 'Installe un coussin de grossesse. Investissement qui change tout.' },
  27: { fruit: 'laitue', emoji: '🥬', taille: '36.6 cm', poids: '875g', developpement: 'Bébé peut rêver. Activité cérébrale intense.', maman: 'Fin du 2e trimestre. Dernière ligne droite.', conseil: 'Planifiez votre plan de naissance ensemble ce mois-ci.' },
  28: { fruit: 'aubergine', emoji: '🍆', taille: '37.6 cm', poids: '1 kg', developpement: 'Début du 3e trimestre. Bébé se retourne souvent. Vision fonctionnelle.', maman: 'Essoufflement, reflux. Corps sous forte pression.', conseil: 'Commence à préparer ta valise maternité. Ne laisse pas ça au dernier moment.' },
  29: { fruit: 'butternut', emoji: '🎃', taille: '38.6 cm', poids: '1.15 kg', developpement: 'Muscles et poumons se renforcent. Mouvements puissants.', maman: 'Contractions de Braxton Hicks normales. Ne pas paniquer.', conseil: 'Apprends à reconnaître les vraies contractions des fausses. Informe-toi.' },
  30: { fruit: 'chou', emoji: '🥬', taille: '39.9 cm', poids: '1.3 kg', developpement: 'Cerveau en développement rapide. Bébé régule sa température.', maman: 'Fatigue intense de retour. Impatience qui monte.', conseil: 'Prends un congé paternité bien planifié. Organise ton travail à l\'avance.' },
  31: { fruit: 'ananas', emoji: '🍍', taille: '41.1 cm', poids: '1.5 kg', developpement: 'Tous les sens sont opérationnels. Bébé pratique la respiration.', maman: 'Difficultés à marcher longtemps. Bas du dos douloureux.', conseil: 'Propose des courtes promenades plutôt que de longues sorties.' },
  32: { fruit: 'mangue', emoji: '🥭', taille: '42.4 cm', poids: '1.7 kg', developpement: 'Bébé se met en position tête en bas normalement. Ongles longs.', maman: 'Grande échographie T3. Position de bébé vérifiée.', conseil: 'Accompagne-la à l\'écho T3. Vérification position — peut nécessiter une césarienne.' },
  33: { fruit: 'ananas', emoji: '🍍', taille: '43.7 cm', poids: '1.9 kg', developpement: 'Squelette presque complet. Cerveau se développe encore intensément.', maman: 'Essoufflement maximal. Insomnie fréquente.', conseil: 'Prends en charge les nuits difficiles — lève-toi si elle ne dort pas.' },
  34: { fruit: 'melon', emoji: '🍈', taille: '45 cm', poids: '2.15 kg', developpement: 'Système nerveux central mature. Ongles atteignent le bout des doigts.', maman: 'Descente du bébé dans le bassin souvent. Respiration facilitée.', conseil: 'Commence les cours de préparation accouchement si pas encore fait.' },
  35: { fruit: 'melon', emoji: '🍈', taille: '46.2 cm', poids: '2.4 kg', developpement: 'Reins et foie fonctionnels. Réflexes bien développés.', maman: 'Envies fréquentes d\'uriner. Bassin douloureux.', conseil: 'Installe le siège auto maintenant. Vérifie qu\'il est correctement installé.' },
  36: { fruit: 'laitue romaine', emoji: '🥗', taille: '47.4 cm', poids: '2.6 kg', developpement: 'Presque prêt ! Poumons presque matures. Graisse sous la peau abondante.', maman: 'Envie intense de "nidifier", tout préparer. Écoute-la.', conseil: 'Valise maternité doit être prête. Téléphone chargé 24h/24 désormais.' },
  37: { fruit: 'bette à carde', emoji: '🌿', taille: '48.6 cm', poids: '2.85 kg', developpement: 'Bébé est considéré à terme. Peut naître à tout moment.', maman: 'Contractions possibles à tout moment. Garder son calme.', conseil: 'Mode alerte activé. Reste joignable en permanence.' },
  38: { fruit: 'poireau', emoji: '🌿', taille: '49.8 cm', poids: '3.1 kg', developpement: 'Bébé est prêt. Continue de prendre du poids.', maman: 'Impatience et anxiété mêlées. Besoin de soutien moral.', conseil: 'Sois présent, rassurant. Elle a besoin de toi maintenant plus que jamais.' },
  39: { fruit: 'pastèque petite', emoji: '🍉', taille: '50.7 cm', poids: '3.25 kg', developpement: 'Pleinement développé. Attend le bon signal pour naître.', maman: 'Chaque jour semble long. Soutien émotionnel crucial.', conseil: 'Organise une sortie douce — cinéma, restaurant. Changer les idées.' },
  40: { fruit: 'pastèque', emoji: '🍉', taille: '51.2 cm', poids: '3.4 kg', developpement: 'C\'est le jour J ! Bébé est prêt depuis longtemps.', maman: 'DPA atteinte. Stress et excitation maximaux.', conseil: 'Contractions toutes les 5min pendant 1h = maternité. Reste calme.' },
  41: { fruit: 'pastèque', emoji: '🍉', taille: '51.5 cm', poids: '3.6 kg', developpement: 'Bébé trop chill ! Dépassement de terme. Surveillance médicale renforcée.', maman: 'Inconfort majeur. Frustration normale. Sois extra patient.', conseil: 'Déclenchement possible. Reste disponible et positif.' },
};

const RDV_LIST = [
  { sa: 8, emoji: '🏥', titre: '1ère consultation', desc: 'Confirmation grossesse, prise de sang, calcul DPA. Sois là, prends des notes.', oblig: true },
  { sa: 12, emoji: '🔬', titre: 'Écho T1 + trisomie', desc: 'Premier visage de bébé ! Mesure clarté nucale. Apporte ton téléphone.', oblig: true },
  { sa: 16, emoji: '📋', titre: 'Consultation mensuelle', desc: 'Suivi tension, poids. Bonne occasion de poser vos questions.', oblig: false },
  { sa: 20, emoji: '📝', titre: 'Déclaration grossesse CPAM', desc: 'À faire avant 15 SA. Déclarer à la caisse et à l\'employeur.', oblig: true },
  { sa: 22, emoji: '👶', titre: 'Écho T2 morphologique', desc: 'La plus importante. Organes, membres, visage. Durée 45min.', oblig: true },
  { sa: 24, emoji: '🩸', titre: 'Test diabète gestationnel', desc: 'Test HGPO — 3 prises de sang en 2h. Accompagne-la.', oblig: false },
  { sa: 28, emoji: '💉', titre: 'Début T3 + vaccin coqueluche', desc: 'Vaccin recommandé pour le papa aussi. Parler du projet de naissance.', oblig: false },
  { sa: 32, emoji: '📏', titre: 'Écho T3 croissance', desc: 'Vérification position bébé, poids estimé. Si siège, on en parle.', oblig: true },
  { sa: 34, emoji: '🎓', titre: 'Préparation accouchement', desc: '3 à 8 séances remboursées. Les cours pour papas existent !', oblig: false },
  { sa: 36, emoji: '💬', titre: 'Entretien prénatal', desc: 'Bilan global, projet de naissance. Viens absolument.', oblig: true },
  { sa: 38, emoji: '🧳', titre: 'Valise prête ?', desc: 'Prépare la valise maintenant. Documents, vêtements, chargeurs.', oblig: false },
  { sa: 40, emoji: '🎉', titre: 'Jour J — DPA', desc: 'Contractions toutes les 5min pendant 1h = direction maternité !', oblig: true },
];

const PARTENAIRES = [
  { categorie: 'Pour elle', items: [
    { nom: 'Mothercare', desc: 'Vêtements grossesse & allaitement', remise: '-15%', lien: '#' },
    { nom: 'Soin & Bien-être', desc: 'Massage prénatal à domicile', remise: '-20%', lien: '#' },
    { nom: 'Jolimoi', desc: 'Cosmétiques naturels grossesse safe', remise: '-10%', lien: '#' },
  ]},
  { categorie: 'Pour bébé', items: [
    { nom: 'Cybex', desc: 'Sièges auto & poussettes premium', remise: '-12%', lien: '#' },
    { nom: 'Monbebe', desc: 'Vêtements bébé bio & doux', remise: '-15%', lien: '#' },
    { nom: 'Babymoov', desc: 'Babyphone & accessoires puériculture', remise: '-10%', lien: '#' },
  ]},
  { categorie: 'Pour toi', items: [
    { nom: 'Box Papa', desc: 'Box mensuelle future paternité', remise: '-25%', lien: '#' },
    { nom: 'Cultura', desc: 'Livres paternité & éveil bébé', remise: '-10%', lien: '#' },
    { nom: 'Firstcry', desc: 'Tout pour bébé à prix réduit', remise: '-15%', lien: '#' },
  ]},
];

const IDEES_MOIS: Record<number, string> = {
  1: 'Encadre la première échographie et offre-lui le cadre.',
  2: 'Réserve un dîner dans son restaurant préféré, juste vous deux.',
  3: 'Offre-lui un soin prénatal ou massage à domicile.',
  4: 'Crée un album photo numérique de la grossesse.',
  5: 'Organise un week-end détente avant l\'arrivée de bébé.',
  6: 'Prépare la chambre de bébé ensemble un dimanche.',
  7: 'Offre-lui un coussin de grossesse premium.',
  8: 'Planifie un petit road trip doux avant la fin.',
  9: 'Écris-lui une lettre sur ce que représente cette grossesse pour toi.',
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [rdvOuvert, setRdvOuvert] = useState<number | null>(null);
  const [valiseChecked, setValiseChecked] = useState<Record<string, boolean>>({});
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
  const data = sa ? SEMAINES_DATA[sa] || SEMAINES_DATA[40] : null;
  const dpaDate = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.ceil((dpaDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
  const moisGrossesse = sa ? Math.ceil(sa / 4.3) : 1;
  const ideesMois = IDEES_MOIS[Math.min(moisGrossesse, 9)] || IDEES_MOIS[9];
  const isPostPartum = joursRestants !== null && joursRestants < 0;

  const saveNote = () => {
    if (!noteText.trim()) return;
    const newNotes = [...notes, `${new Date().toLocaleDateString('fr-FR')} — ${noteText}`];
    setNotes(newNotes);
    localStorage.setItem('dadup_notes', JSON.stringify(newNotes));
    setNoteText('');
  };

  const toggleValise = (id: string) => {
    const updated = { ...valiseChecked, [id]: !valiseChecked[id] };
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
    { id: 'home', label: 'Accueil' },
    { id: 'bebe', label: 'Bébé' },
    { id: 'rdv', label: 'RDV' },
    { id: 'pratique', label: 'Pratique' },
    { id: 'cadeaux', label: 'Cadeaux' },
  ];

  if (showOnboarding) {
    return <Onboarding onSave={saveOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] pb-24">

      <div className="bg-white border-b border-[#e8ddd4] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 300 300" width="32" height="32">
            <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
            <circle cx="150" cy="150" r="122" fill="#9a8470"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
            <circle cx="150" cy="112" r="40" fill="#c8a882"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
            <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
          </svg>
          <div>
            <p className="text-[#3a3028] font-bold text-sm" style={{fontFamily:'Georgia,serif'}}>
              {prenom ? `Bonjour ${prenom}` : 'DadUp'}
            </p>
            <p className="text-[#9a8470] text-xs">
              {isPostPartum ? 'Mode post-partum' : sa ? `Semaine ${saReelle}` : 'Mon espace'}
            </p>
          </div>
        </div>
        {saReelle && (
          <div className="flex items-center gap-2">
            <div className="bg-[#f0e8dc] px-3 py-1 rounded-full">
              <span className="text-[#6b5c4e] text-xs font-bold">SA {saReelle}</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-xl mx-auto px-4 py-5">

        {activeTab === 'home' && (
          <div className="space-y-4">
            {isPostPartum ? (
              <div className="bg-[#3a3028] rounded-3xl p-6 text-center">
                <p className="text-4xl mb-2">👶</p>
                <p className="text-[#f0e0cc] text-xl font-bold" style={{fontFamily:'Georgia,serif'}}>Bébé est là !</p>
                <p className="text-[#c8a882] text-sm mt-1">Mode post-partum activé</p>
              </div>
            ) : data && sa && (
              <div className="bg-[#3a3028] rounded-3xl p-5">
                <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-3">Cette semaine — SA {saReelle}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{data.emoji}</span>
                  <div>
                    <p className="text-[#f0e0cc] text-lg font-bold" style={{fontFamily:'Georgia,serif'}}>
                      Bébé a la taille d'une {data.fruit}
                    </p>
                    <p className="text-[#c8a882] text-sm">{data.taille} · {data.poids}</p>
                  </div>
                </div>
                {joursRestants !== null && joursRestants > 0 && (
                  <div className="bg-[#6b5c4e]/40 rounded-2xl px-4 py-2 text-center">
                    <p className="text-[#f0e0cc] text-sm">
                      {joursRestants} jour{joursRestants > 1 ? 's' : ''} avant le grand jour
                    </p>
                  </div>
                )}
              </div>
            )}

            {sa && (
              <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
                <div className="flex justify-between text-xs text-[#9a8470] mb-2">
                  <span>SA 1</span>
                  <span className="text-[#6b5c4e] font-bold">{Math.round((saReelle!/40)*100)}%</span>
                  <span>SA 40</span>
                </div>
                <div className="w-full bg-[#f0e8dc] rounded-full h-2 mb-3">
                  <div className="bg-[#c8a882] h-2 rounded-full transition-all" style={{width:`${Math.min(100,(saReelle!/40)*100)}%`}}/>
                </div>
                <div className="flex justify-between">
                  {[{sa:12,label:'T1'},{sa:28,label:'T2'},{sa:40,label:'T3'}].map(t => (
                    <div key={t.sa} className={`text-xs px-3 py-1 rounded-full ${saReelle! >= t.sa ? 'bg-[#c8a882] text-white' : 'bg-[#f0e8dc] text-[#9a8470]'}`}>{t.label}</div>
                  ))}
                </div>
              </div>
            )}

            {data && (
              <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
                <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-2">Conseil de la semaine</p>
                <p className="text-[#3a3028] text-sm leading-relaxed font-medium">{data.conseil}</p>
              </div>
            )}

            {ideesMois && (
              <div className="bg-[#f0e8dc] rounded-2xl p-4 border border-[#e8ddd4]">
                <p className="text-[#6b5c4e] text-xs uppercase tracking-widest mb-2">Idée du mois pour elle</p>
                <p className="text-[#3a3028] text-sm leading-relaxed">{ideesMois}</p>
              </div>
            )}

            {RDV_LIST.filter(r => saReelle && r.sa >= saReelle && r.sa <= saReelle + 3).slice(0, 1).map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border-2 border-[#c8a882]">
                <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-1">Prochain RDV</p>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{r.emoji}</span>
                  <div>
                    <p className="text-[#3a3028] font-bold text-sm">{r.titre}</p>
                    <p className="text-[#9a8470] text-xs">SA {r.sa}{dpa && ` · ${new Date(new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'long'})}`}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'bebe', label: 'Suivi bébé', sub: 'Développement SA ' + saReelle },
                { id: 'rdv', label: 'Mes RDV', sub: 'Calendrier personnalisé' },
                { id: 'pratique', label: 'Pratique', sub: 'Valise & achats' },
                { id: 'cadeaux', label: 'Cadeaux & bons plans', sub: 'Partenaires sélectionnés' },
              ].map(m => (
                <button key={m.id} onClick={() => setActiveTab(m.id)} className="bg-white rounded-2xl p-4 border border-[#e8ddd4] hover:border-[#c8a882] transition-all text-left">
                  <p className="text-[#3a3028] font-bold text-sm mb-1">{m.label}</p>
                  <p className="text-[#9a8470] text-xs">{m.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bebe' && data && sa && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#3a3028]" style={{fontFamily:'Georgia,serif'}}>
                {avance ? `Dans 4 semaines — SA ${sa}` : `Semaine ${saReelle}`}
              </h2>
              <button onClick={() => setAvance(!avance)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${avance ? 'bg-[#3a3028] text-[#f0e0cc] border-[#3a3028]' : 'bg-white text-[#9a8470] border-[#e8ddd4]'}`}>
                {avance ? '← Revenir' : 'S\'avancer →'}
              </button>
            </div>

            <div className="bg-[#3a3028] rounded-3xl p-5 flex items-center gap-4">
              <span className="text-6xl">{data.emoji}</span>
              <div>
                <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-1">Taille de bébé</p>
                <p className="text-[#f0e0cc] text-xl font-bold" style={{fontFamily:'Georgia,serif'}}>{data.fruit}</p>
                <p className="text-[#c8a882] text-sm">{data.taille} · {data.poids}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
              <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-2">Développement de bébé</p>
              <p className="text-[#3a3028] text-sm leading-relaxed">{data.developpement}</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
              <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-2">Ce que vit maman</p>
              <p className="text-[#3a3028] text-sm leading-relaxed">{data.maman}</p>
            </div>

            <div className="bg-[#f0e8dc] rounded-2xl p-4">
              <p className="text-[#6b5c4e] text-xs uppercase tracking-widest mb-2">Ton rôle cette semaine</p>
              <p className="text-[#3a3028] text-sm leading-relaxed font-medium">{data.conseil}</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
              <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-3">Journal — note un souvenir</p>
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Ce que j'ai ressenti cette semaine..."
                className="w-full bg-[#f8f5f0] border border-[#e8ddd4] rounded-xl p-3 text-sm text-[#3a3028] resize-none focus:outline-none focus:border-[#c8a882]"
                rows={3}
              />
              <button onClick={saveNote} className="mt-2 bg-[#3a3028] text-[#f0e0cc] text-xs font-bold px-4 py-2 rounded-full">Enregistrer</button>
              {notes.length > 0 && (
                <div className="mt-4 space-y-2">
                  {notes.slice(-3).reverse().map((n, i) => (
                    <p key={i} className="text-xs text-[#9a8470] bg-[#f8f5f0] rounded-xl p-3 leading-relaxed">{n}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rdv' && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#3a3028]" style={{fontFamily:'Georgia,serif'}}>Calendrier RDV</h2>
            {dpa && <p className="text-[#9a8470] text-sm">DPA : {new Date(dpa).toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'})}</p>}
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#e8ddd4]" />
              <div className="space-y-3">
                {RDV_LIST.map((r, i) => {
                  const statut = !saReelle ? 'futur' : r.sa < saReelle ? 'passe' : r.sa <= saReelle + 2 ? 'prochain' : 'futur';
                  return (
                    <div key={i} className="relative pl-14">
                      <div className={`absolute left-3.5 top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center ${statut === 'passe' ? 'bg-[#c8a882] border-[#c8a882]' : statut === 'prochain' ? 'bg-[#3a3028] border-[#3a3028] scale-125' : 'bg-[#f8f5f0] border-[#e8ddd4]'}`}>
                        {statut === 'passe' && <span className="text-white text-xs">✓</span>}
                        {statut === 'prochain' && <span className="w-2 h-2 bg-[#f0e0cc] rounded-full block" />}
                      </div>
                      <button onClick={() => setRdvOuvert(rdvOuvert === i ? null : i)} className={`w-full text-left rounded-2xl p-4 border transition-all ${statut === 'prochain' ? 'bg-[#3a3028] border-[#3a3028]' : 'bg-white border-[#e8ddd4] hover:border-[#c8a882]'} ${statut === 'passe' ? 'opacity-60' : ''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span>{r.emoji}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className={`text-sm font-bold ${statut === 'prochain' ? 'text-[#f0e0cc]' : 'text-[#3a3028]'}`}>{r.titre}</p>
                                {r.oblig && <span className={`text-xs px-1.5 py-0.5 rounded-full ${statut === 'prochain' ? 'bg-[#c8a882]/30 text-[#f0e0cc]' : 'bg-[#f0e8dc] text-[#c8a882]'}`}>obligatoire</span>}
                              </div>
                              <p className={`text-xs ${statut === 'prochain' ? 'text-[#c8a882]' : 'text-[#9a8470]'}`}>
                                SA {r.sa}{dpa && ` · ${new Date(new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'short'})}`}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xs ${statut === 'prochain' ? 'text-[#c8a882]' : 'text-[#c8b8a8]'}`}>{rdvOuvert === i ? '▲' : '▼'}</span>
                        </div>
                        {rdvOuvert === i && <p className={`mt-3 pt-3 border-t text-sm leading-relaxed ${statut === 'prochain' ? 'border-[#6b5c4e] text-[#e8d5c4]' : 'border-[#f0e8e0] text-[#6b5c4e]'}`}>{r.desc}</p>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pratique' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#3a3028]" style={{fontFamily:'Georgia,serif'}}>Pratique</h2>

            <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#3a3028] font-bold text-sm">Valise maternité</p>
                <span className="text-[#c8a882] text-xs font-bold">
                  {Object.values(valiseChecked).filter(Boolean).length}/22
                </span>
              </div>
              <div className="w-full bg-[#f0e8dc] rounded-full h-1.5 mb-4">
                <div className="bg-[#c8a882] h-1.5 rounded-full" style={{width:`${(Object.values(valiseChecked).filter(Boolean).length/22)*100}%`}}/>
              </div>
              {[
                { titre: 'Pour toi', items: [
                  {id:'v1',label:'Chargeur + batterie externe'},
                  {id:'v2',label:'Vêtements confort (2 jours)'},
                  {id:'v3',label:'Snacks & eau'},
                  {id:'v4',label:'Écouteurs'},
                  {id:'v5',label:'Documents hospitaliers'},
                  {id:'v6',label:'Appareil photo chargé'},
                ]},
                { titre: 'Pour elle', items: [
                  {id:'v7',label:'Chemise de nuit accouchement'},
                  {id:'v8',label:'Robe de chambre + chaussons'},
                  {id:'v9',label:'Sous-vêtements post-partum'},
                  {id:'v10',label:'Produits de toilette'},
                  {id:'v11',label:'Soutien-gorge allaitement x2'},
                ]},
                { titre: 'Pour bébé', items: [
                  {id:'v12',label:'Body naissance x3'},
                  {id:'v13',label:'Pyjama naissance x2'},
                  {id:'v14',label:'Bonnet naissance x2'},
                  {id:'v15',label:'Gigoteuse naissance'},
                  {id:'v16',label:'Siège auto (installé !)'},
                  {id:'v17',label:'Couches nouveau-né'},
                ]},
                { titre: 'Documents', items: [
                  {id:'v18',label:'Carte vitale + mutuelle'},
                  {id:'v19',label:'Carnet de maternité'},
                  {id:'v20',label:'Pièces d\'identité'},
                  {id:'v21',label:'Plan accès maternité'},
                ]},
              ].map(s => (
                <div key={s.titre} className="mb-4">
                  <p className="text-[#9a8470] text-xs font-bold uppercase tracking-widest mb-2">{s.titre}</p>
                  <div className="space-y-2">
                    {s.items.map(item => (
                      <button key={item.id} onClick={() => toggleValise(item.id)} className="w-full flex items-center gap-3 text-left">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${valiseChecked[item.id] ? 'bg-[#c8a882] border-[#c8a882]' : 'border-[#e8ddd4]'}`}>
                          {valiseChecked[item.id] && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className={`text-sm ${valiseChecked[item.id] ? 'line-through text-[#b0988a]' : 'text-[#3a3028]'}`}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
              <p className="text-[#3a3028] font-bold text-sm mb-3">Liste achats prioritaires</p>
              <div className="space-y-3">
                {[
                  {label:'Siège auto groupe 0+', priorite:'urgent', prix:'80-300€'},
                  {label:'Babyphone vidéo', priorite:'urgent', prix:'40-150€'},
                  {label:'Lit cododo / berceau', priorite:'urgent', prix:'60-400€'},
                  {label:'Poussette combinée', priorite:'avant naissance', prix:'200-1200€'},
                  {label:'Tire-lait électrique', priorite:'si allaitement', prix:'30-200€'},
                  {label:'Thermomètre rectal', priorite:'urgent', prix:'15-40€'},
                  {label:'Humidificateur', priorite:'utile', prix:'30-80€'},
                ].map((a, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-[#3a3028] text-sm font-medium">{a.label}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${a.priorite === 'urgent' ? 'bg-red-50 text-red-400' : 'bg-[#f0e8dc] text-[#9a8470]'}`}>{a.priorite}</span>
                    </div>
                    <p className="text-[#c8a882] text-sm font-bold">{a.prix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
              <p className="text-[#3a3028] font-bold text-sm mb-3">Guide survie 1er mois</p>
              {[
                {titre:'Emmaillotage', contenu:'Étendre la couverture en losange. Replier le coin supérieur. Poser bébé, épaules sur le bord. Ramener les côtés un par un, bien serré mais pas trop.'},
                {titre:'Bébé pleure — que faire ?', contenu:'1. Faim ? (toutes les 2-3h) 2. Couche sale ? 3. Trop chaud/froid ? (nuque = thermomètre) 4. Besoin de contact ? (peau à peau) 5. Coliques ? (vélo avec les jambes)'},
                {titre:'Sommeil de bébé', contenu:'Nouveau-né dort 16-18h/24. Sur le dos, dans son propre espace. Pas d\'oreiller. Température chambre 18-20°C. Les réveils nocturnes sont normaux et temporaires.'},
              ].map((s, i) => (
                <div key={i} className="mb-3 pb-3 border-b border-[#f0e8e0] last:border-0 last:mb-0 last:pb-0">
                  <p className="text-[#6b5c4e] font-bold text-sm mb-1">{s.titre}</p>
                  <p className="text-[#9a8470] text-xs leading-relaxed">{s.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cadeaux' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#3a3028]" style={{fontFamily:'Georgia,serif'}}>Cadeaux & Bons plans</h2>
            <p className="text-[#9a8470] text-sm">Sélection de partenaires avec des réductions exclusives pour les membres DadUp.</p>

            <div className="bg-[#f0e8dc] rounded-2xl p-4">
              <p className="text-[#6b5c4e] text-xs uppercase tracking-widest mb-2">Idée du mois</p>
              <p className="text-[#3a3028] text-sm font-medium leading-relaxed">{ideesMois}</p>
            </div>

            {PARTENAIRES.map(cat => (
              <div key={cat.categorie} className="bg-white rounded-2xl p-4 border border-[#e8ddd4]">
                <p className="text-[#c8a882] text-xs uppercase tracking-widest mb-3">{cat.categorie}</p>
                <div className="space-y-3">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#f8f5f0] rounded-xl">
                      <div>
                        <p className="text-[#3a3028] text-sm font-bold">{item.nom}</p>
                        <p className="text-[#9a8470] text-xs">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#c8a882] text-white text-xs font-bold px-2 py-1 rounded-full">{item.remise}</span>
                        <a href={item.lien} className="bg-[#3a3028] text-[#f0e0cc] text-xs font-bold px-3 py-1.5 rounded-full">Voir</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <p className="text-[#c8b8a8] text-xs text-center leading-relaxed">
              Les liens partenaires peuvent générer une commission. Cela nous permet de garder DadUp accessible.
            </p>
          </div>
        )}

      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8ddd4] px-2 py-2 z-40">
        <div className="max-w-xl mx-auto flex justify-around">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${activeTab === t.id ? 'bg-[#f0e8dc]' : ''}`}>
              <span className={`text-xs font-medium ${activeTab === t.id ? 'text-[#6b5c4e]' : 'text-[#b0988a]'}`}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

function Onboarding({ onSave }: { onSave: (dpa: string, prenom: string) => void }) {
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');

  return (
    <main className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 300 300" width="72" height="72">
            <circle cx="150" cy="150" r="145" fill="#6b5c4e"/>
            <circle cx="150" cy="150" r="122" fill="#9a8470"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a882"/>
            <circle cx="150" cy="112" r="40" fill="#c8a882"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#f0e0cc"/>
            <circle cx="150" cy="128" r="26" fill="#f0e0cc"/>
          </svg>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-[#e8ddd4]">
          <h1 className="text-2xl font-bold text-[#3a3028] mb-2 text-center" style={{fontFamily:'Georgia,serif'}}>Bienvenue sur DadUp</h1>
          <p className="text-[#9a8470] text-sm text-center mb-8">Deux informations pour personnaliser ton espace.</p>

          <div className="space-y-5">
            <div>
              <label className="block text-[#6b5c4e] text-sm font-semibold mb-2">Ton prénom</label>
              <input
                type="text"
                placeholder="Thomas, Julien, Marc..."
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                className="w-full bg-[#f8f5f0] border border-[#e8ddd4] rounded-2xl px-4 py-3 text-[#3a3028] text-sm focus:outline-none focus:border-[#c8a882]"
              />
            </div>
            <div>
              <label className="block text-[#6b5c4e] text-sm font-semibold mb-2">Date prévue d'accouchement</label>
              <input
                type="date"
                value={dpa}
                onChange={e => setDpa(e.target.value)}
                className="w-full bg-[#f8f5f0] border border-[#e8ddd4] rounded-2xl px-4 py-3 text-[#3a3028] text-sm focus:outline-none focus:border-[#c8a882]"
              />
            </div>
            <button
              onClick={() => dpa && onSave(dpa, prenom)}
              disabled={!dpa}
              className="w-full bg-[#3a3028] text-[#f0e0cc] font-bold py-4 rounded-full text-sm disabled:opacity-40 hover:bg-[#6b5c4e] transition-all"
            >
              Accéder à mon espace
            </button>
          </div>
        </div>
        <p className="text-center text-[#c8b8a8] text-xs mt-6">
          Aucune donnée personnelle stockée en ligne. Tout reste sur ton appareil.
        </p>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center">
        <p className="text-[#9a8470]">Chargement...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
