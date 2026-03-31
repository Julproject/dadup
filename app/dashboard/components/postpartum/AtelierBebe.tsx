'use client';
import { useState } from 'react';

type Etape = { titre: string; texte: string; svg?: string };
type Atelier = {
  id: string;
  titre: string;
  sousTitre: string;
  couleur: string;
  tc: string;
  fond: string;
  icone: string;
  intro: string;
  alerte?: string;
  etapes: Etape[];
  conseil?: string;
};

// ── Illustrations SVG inline ──────────────────────────────────────────────────

const SVG_HEIMLICH = `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="160" fill="#FDECEA" rx="12"/>
  <!-- Corps bébé couché sur avant-bras -->
  <ellipse cx="100" cy="80" rx="55" ry="22" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5"/>
  <!-- Tête -->
  <circle cx="150" cy="72" r="18" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5"/>
  <!-- Visage -->
  <circle cx="156" cy="70" r="2" fill="#c47a3a"/>
  <path d="M151 76 Q156 79 161 76" stroke="#c47a3a" stroke-width="1.5" fill="none"/>
  <!-- Avant-bras -->
  <rect x="35" y="88" width="120" height="18" rx="9" fill="#d4956a" stroke="#c07a50" stroke-width="1.5"/>
  <!-- Flèches indiquant les tapes dans le dos -->
  <path d="M90 55 L90 42 L80 50 M90 42 L100 50" stroke="#C04A1A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M75 60 L75 47 L65 55 M75 47 L85 55" stroke="#C04A1A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <text x="100" y="148" text-anchor="middle" font-size="11" fill="#8A0000" font-weight="700">5 tapes fermes entre les omoplates</text>
</svg>`;

const SVG_POSITIONS = `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="160" fill="#E4F5EC" rx="12"/>
  <!-- Position latérale de sécurité -->
  <!-- Corps -->
  <ellipse cx="100" cy="90" rx="50" ry="20" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5" transform="rotate(-15 100 90)"/>
  <!-- Tête -->
  <circle cx="55" cy="75" r="20" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5"/>
  <!-- Visage calme -->
  <circle cx="60" cy="73" r="2.5" fill="#c47a3a"/>
  <path d="M55 80 Q60 83 66 80" stroke="#c47a3a" stroke-width="1.5" fill="none"/>
  <!-- Bras devant -->
  <path d="M90 85 Q110 75 125 80" stroke="#e8a87c" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- Jambe pliée -->
  <path d="M130 95 Q145 90 148 105 Q148 118 135 120" stroke="#e8a87c" stroke-width="8" stroke-linecap="round" fill="none"/>
  <text x="100" y="148" text-anchor="middle" font-size="11" fill="#0D6B40" font-weight="700">Position latérale de sécurité</text>
</svg>`;

const SVG_CHANGE = `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="160" fill="#E6F0FA" rx="12"/>
  <!-- Table à langer -->
  <rect x="20" y="95" width="160" height="12" rx="4" fill="#c8a060"/>
  <rect x="30" y="107" width="6" height="40" rx="3" fill="#9a7840"/>
  <rect x="164" y="107" width="6" height="40" rx="3" fill="#9a7840"/>
  <!-- Bébé allongé -->
  <ellipse cx="100" cy="88" rx="52" ry="16" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5"/>
  <!-- Tête -->
  <circle cx="152" cy="82" r="16" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5"/>
  <!-- Visage -->
  <circle cx="157" cy="80" r="2" fill="#c47a3a"/>
  <!-- Couche -->
  <ellipse cx="85" cy="92" rx="22" ry="10" fill="white" stroke="#aac0d8" stroke-width="1.5"/>
  <!-- Main adulte -->
  <path d="M55 72 Q50 60 60 56 Q70 52 72 62 Q80 55 88 58 Q90 68 80 70" fill="#d4956a" stroke="#c07a50" stroke-width="1"/>
  <text x="100" y="150" text-anchor="middle" font-size="11" fill="#1A4A7A" font-weight="700">Une main sur le ventre, toujours</text>
</svg>`;

const SVG_EMMAILLOTAGE = `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="160" fill="#FFF7E0" rx="12"/>
  <!-- Bébé emmailloté -->
  <!-- Corps enroulé -->
  <ellipse cx="100" cy="100" rx="38" ry="30" fill="#f0e0c8" stroke="#c8a060" stroke-width="2"/>
  <!-- Tissu enroulé - lignes -->
  <path d="M65 85 Q100 75 135 85" stroke="#c8a060" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
  <path d="M63 95 Q100 88 137 95" stroke="#c8a060" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
  <path d="M65 108 Q100 102 135 108" stroke="#c8a060" stroke-width="1.5" fill="none" stroke-dasharray="4 2"/>
  <!-- Tête qui dépasse -->
  <circle cx="100" cy="62" r="22" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5"/>
  <!-- Visage serein -->
  <circle cx="106" cy="60" r="2.5" fill="#c47a3a"/>
  <circle cx="94" cy="60" r="2.5" fill="#c47a3a"/>
  <path d="M94 68 Q100 72 106 68" stroke="#c47a3a" stroke-width="1.5" fill="none"/>
  <!-- Petits bras cachés -->
  <text x="100" y="150" text-anchor="middle" font-size="11" fill="#8A6010" font-weight="700">Bras le long du corps, hanches libres</text>
</svg>`;

const SVG_APAISEMENT = `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="160" fill="#F0EEFF" rx="12"/>
  <!-- Parent tenant bébé -->
  <!-- Torse parent -->
  <ellipse cx="95" cy="105" rx="42" ry="35" fill="#4a5568" opacity="0.15"/>
  <!-- Bras parent -->
  <path d="M55 95 Q60 120 80 130 Q100 135 120 130 Q140 120 145 95" stroke="#9a8070" stroke-width="14" stroke-linecap="round" fill="none"/>
  <!-- Bébé dans les bras -->
  <ellipse cx="95" cy="92" rx="30" ry="18" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5"/>
  <!-- Tête bébé -->
  <circle cx="125" cy="83" r="16" fill="#f9d5b0" stroke="#e8a87c" stroke-width="1.5"/>
  <!-- Visage apaisé -->
  <path d="M119 89 Q125 93 131 89" stroke="#c47a3a" stroke-width="1.5" fill="none"/>
  <!-- Ondes son bruit blanc -->
  <path d="M158 70 Q163 75 158 80" stroke="#5050B0" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M162 66 Q170 75 162 84" stroke="#5050B0" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M166 62 Q177 75 166 88" stroke="#5050B0" stroke-width="1" fill="none" stroke-linecap="round"/>
  <text x="100" y="150" text-anchor="middle" font-size="11" fill="#5050B0" font-weight="700">Peau contre peau + bruit blanc</text>
</svg>`;

// ── Données ───────────────────────────────────────────────────────────────────

const ATELIERS: Atelier[] = [
  {
    id: 'secours',
    titre: 'Premiers secours',
    sousTitre: 'Gestes essentiels nourrisson',
    couleur: '#C04A1A',
    tc: '#7A1A00',
    fond: '#FDECEA',
    icone: '🚨',
    intro: `Ces gestes peuvent sauver une vie. Lis-les maintenant, pas dans l'urgence. Et pense à faire une vraie formation PSC1 nourrisson si ce n'est pas encore fait.`,
    alerte: `En cas de doute : appelle le 15 (SAMU) ou le 18 (pompiers). Ne perds pas de temps à chercher.`,
    etapes: [
      {
        titre: `1. Bébé s'étouffe - il tousse`,
        texte: `S'il tousse fort, il gère. Ne fais rien. Encourage-le à tousser. Ne tape pas dans le dos, ne mets pas les doigts dans sa bouche. La toux est le mécanisme naturel le plus efficace.`,
      },
      {
        titre: `2. Bébé s'étouffe - il ne tousse plus`,
        texte: `Tête en bas sur ton avant-bras, visage vers le sol. 5 tapes fermes entre les omoplates avec le talon de la main. Si ça ne suffit pas : retourne-le sur le dos, 2 doigts au centre de la poitrine, 5 compressions. Alterner jusqu'à libération ou arrivée des secours.`,
        svg: SVG_HEIMLICH,
      },
      {
        titre: '3. Bébé ne répond plus',
        texte: `Stimule doucement (talon de pied, appel de son prénom). S'il ne réagit pas : appelle le 15 immédiatement, mets-le en position latérale de sécurité si il respire, commence le massage cardiaque s'il ne respire pas (30 compressions + 2 insufflations douces).`,
        svg: SVG_POSITIONS,
      },
      {
        titre: '4. Chute de hauteur',
        texte: `Ne bouge pas bébé si tu suspectes une blessure au cou ou à la colonne. Appelle le 15 si : perte de connaissance, même brève, vomissements, pleurs inhabituels, fontanelle bombée, ou chute de plus de sa hauteur.`,
      },
      {
        titre: '5. Fièvre chez le nourrisson',
        texte: `Avant 3 mois : toute fièvre > 38°C = appel pédiatre ou urgences sans attendre. Entre 3 et 6 mois : > 38°C = appel médecin le jour même. Après 6 mois : surveiller l'état général. Déshabiller, hydrater, paracétamol selon le poids sur prescription.`,
      },
    ],
    conseil: 'La formation PSC1 (Prévention et Secours Civiques de niveau 1) existe en version nourrisson. 7 heures. Renseignez-vous en maternité ou auprès de la Croix-Rouge.',
  },
  {
    id: 'change',
    titre: 'Changer la couche',
    sousTitre: 'Efficace, propre, sans stress',
    couleur: '#1A4A7A',
    tc: '#0A2A5A',
    fond: '#E6F0FA',
    icone: '🧷',
    intro: `Environ 6 à 8 couches par jour les premières semaines. Autant avoir la technique. C'est plus simple qu'il n'y paraît une fois qu'on a ses repères.`,
    etapes: [
      {
        titre: 'Avant de commencer',
        texte: `Prépare tout à portée de main AVANT de poser bébé : couche propre ouverte, lingettes ou coton + eau tiède, crème si besoin. Ne laisse jamais bébé seul sur la table à langer, même une seconde.`,
        svg: SVG_CHANGE,
      },
      {
        titre: 'Ouvrir et nettoyer',
        texte: `Détache les attaches, soulève les fesses de bébé en tenant ses deux chevilles doucement entre tes doigts (une main). Replie la couche sale sous les fesses. Nettoie de l'avant vers l'arrière, toujours. Chez les filles : essentiel pour éviter les infections. Chez les garçons : garde une lingette prête à poser sur le pénis pour éviter les surprises.`,
      },
      {
        titre: 'Poser la couche propre',
        texte: `Glisse la couche propre sous les fesses (la partie avec les attaches derrière). La partie avant remonte sur le ventre. Les attaches se collent sur le devant, symétriques. Vérifie que les bords aux cuisses sont bien dépliés vers l'extérieur pour éviter les fuites.`,
      },
      {
        titre: 'Le soin du cordon (premières semaines)',
        texte: `Le moignon du cordon doit rester sec. Plie le bord avant de la couche pour qu'il ne frotte pas dessus. Sérum physiologique si besoin, une fois par jour. Il tombe seul entre J5 et J15. Ne pas tirer.`,
      },
      {
        titre: 'Les selles : ce qui est normal',
        texte: `J1-J3 : méconium noir/vert foncé, normal. Ensuite : jaune moutarde si allaitement, jaune/beige si biberon. Fréquence très variable : de 8 fois par jour à une fois tous les 5 jours chez les bébés allaités. Pas un problème si bébé est bien, mange et prend du poids.`,
      },
    ],
    conseil: `Le change est un moment de contact et d'échange. Parle-lui, nomme ce que tu fais. Même seul dans la salle de bain à 3h du matin, c'est un moment de connexion.`,
  },
  {
    id: 'emmaillotage',
    titre: 'Emmailloter bébé',
    sousTitre: 'La technique qui apaise',
    couleur: '#8A6010',
    tc: '#5A3A00',
    fond: '#FFF7E0',
    icone: '🌯',
    intro: `L'emmaillotage recrée la sensation de l'utérus : contenu, chaud, rassuré. Efficace surtout dans les premières semaines. À faire correctement pour ne pas gêner la respiration ou les hanches.`,
    etapes: [
      {
        titre: 'Le tissu et la position de départ',
        texte: `Utilise un carré de mousseline (environ 120x120 cm) ou une couverture légère. Pose-le en losange. Replie le coin supérieur de 15 cm vers le bas. Pose bébé sur le dos, nuque sur le bord replié, épaules légèrement en dessous.`,
        svg: SVG_EMMAILLOTAGE,
      },
      {
        titre: 'Bras gauche',
        texte: `Place le bras gauche de bébé le long de son corps ou sur sa poitrine (selon sa préférence). Prends le coin gauche du tissu, tire-le par-dessus l'épaule gauche et glisse-le sous son dos droit. Tiens fermement.`,
      },
      {
        titre: 'Le bas',
        texte: `Remonte le coin inférieur sur son ventre et replie-le. Les hanches DOIVENT pouvoir bouger librement : ne serre jamais les jambes ensemble. Un bébé emmailloté trop serré dans les jambes peut développer une dysplasie de hanche.`,
      },
      {
        titre: 'Bras droit et finition',
        texte: `Place le bras droit le long du corps. Tire le dernier coin par-dessus l'épaule droite et glisse-le sous le dos. Vérifie : tu dois pouvoir glisser deux doigts entre le tissu et la poitrine. Sa tête doit toujours rester libre.`,
      },
      {
        titre: `Quand arrêter l'emmaillotage`,
        texte: `Dès que bébé montre des signes de retournement (généralement vers 2 mois), arrête l'emmaillotage. Un bébé retourné sur le ventre emmailloté ne peut pas se repositionner. Toujours sur le dos pour dormir emmailloté.`,
      },
    ],
    conseil: `Certains bébés détestent l'emmaillotage. Si le tien se débat et s'énerve encore plus, c'est qu'il préfère être libre de ses mouvements. Respecte sa préférence.`,
  },
  {
    id: 'apaisement',
    titre: 'Apaiser bébé',
    sousTitre: 'Comprendre et calmer les pleurs',
    couleur: '#5050B0',
    tc: '#2A2A80',
    fond: '#F0EEFF',
    icone: '🤍',
    intro: `Les pleurs sont le seul langage de bébé. Il ne pleure pas pour te manipuler. Il signale un besoin. Apprendre à les distinguer prend du temps, mais ça vient.`,
    etapes: [
      {
        titre: 'Le protocole de base',
        texte: `Dans l'ordre : faim (dernier repas il y a combien de temps ?), couche (vérifier), température (trop chaud ou trop froid ?), douleur ou inconfort (coliques ?), besoin de contact. Si rien de tout ça : besoin d'être porté ou bruit de fond.`,
        svg: SVG_APAISEMENT,
      },
      {
        titre: 'Reconnaître le pleur de faim',
        texte: `Rythme : wah-wah-wah régulier, qui s'intensifie. Signes associés : tourne la tête, ouvre la bouche, porte les mains à la bouche. À noter : bébé donne ces signaux AVANT de pleurer. Si tu les repères tôt, la tétée ou le biberon est plus facile.`,
      },
      {
        titre: 'Les coliques : ce qui aide',
        texte: `Le mouvement : bercer, se promener, voiture (le bruit du moteur est efficace). La chaleur : main chaude sur le ventre, bain tiède. Position : bébé sur le ventre sur ton avant-bras, ta main sous son ventre. Le bruit blanc : aspirer, faire "ssshhhh" fort près de son oreille, appli bruit blanc.`,
      },
      {
        titre: 'Le bruit blanc',
        texte: `Aussi fort que sa propre voix, pas plus. Des applications existent (White Noise, Baby Sleep Sounds). L'aspirer ou faire "ssshh" fort marche aussi. Le bruit blanc rappelle les sons entendus in utero. À utiliser pour le sommeil comme pour l'apaisement.`,
      },
      {
        titre: 'Quand toi tu décroches',
        texte: `Un bébé qui pleure depuis 45 minutes peut déclencher une frustration intense. C'est normal. Si tu sens que tu perds le contrôle : pose bébé en sécurité dans son lit, sors de la chambre, respire 5 minutes. Revenir calme est toujours mieux que rester en te forçant. Appelle quelqu'un si tu en as besoin.`,
      },
    ],
    conseil: 'Les pleurs culminent vers 6 semaines puis diminuent progressivement. Si ton bébé pleure plus de 3h par jour plus de 3 jours par semaine : parles-en au pédiatre pour écarter une cause médicale.',
  },
  {
    id: 'sein',
    titre: 'Allaitement',
    sousTitre: 'La bonne prise du sein',
    couleur: '#0D6B40',
    tc: '#064A2A',
    fond: '#E4F5EC',
    icone: '🌿',
    intro: `L'allaitement s'apprend. Ni toi ni bébé ne savez faire ça d'instinct les premiers jours. La bonne prise du sein est la clé de tout : moins de douleur, plus de lait, bébé satisfait.`,
    etapes: [
      {
        titre: `Les signes d'une bonne prise`,
        texte: `Bouche grande ouverte (pas juste le mamelon : l'aréole). Lèvres retroussées vers l'extérieur. Menton appuyé contre le sein. Nez dégagé ou légèrement effleurant le sein. Tu entends des déglutitions. Si tu as mal au-delà des 30 premières secondes : mauvaise prise, détacher et recommencer.`,
      },
      {
        titre: 'Comment détacher sans douleur',
        texte: `Ne tire jamais bébé directement. Glisse ton petit doigt dans le coin de sa bouche pour briser la succion, puis écarte doucement. Détacher pour recommencer n'est pas un échec, c'est de la technique.`,
      },
      {
        titre: 'Les positions',
        texte: `Position classique (berceau) : tête de bébé dans ton coude, corps le long de ton avant-bras. Position football (sous le bras) : utile après une césarienne ou si bébé a du mal à prendre. Position allongée : pratique la nuit. Essaie les trois, ton corps trouvera sa préférence.`,
      },
      {
        titre: 'La fréquence et la durée',
        texte: `8 à 12 tétées par 24h les premières semaines. Pas de règle stricte de durée : certains bébés tètent 10 minutes, d'autres 40. Laisser bébé finir un sein avant de proposer l'autre. Si doute sur la quantité : peser bébé régulièrement est le seul indicateur fiable.`,
      },
      {
        titre: `Ton rôle pendant l'allaitement`,
        texte: `Apporter à boire (elle perd beaucoup de liquide). Créer un environnement calme. Prendre le bébé entre les tétées pour qu'elle dorme. La soutenir sans minimiser les difficultés. L'allaitement peut être douloureux, épuisant, et frustrant les premières semaines. C'est normal. Une consultante en lactation (IBCLC) peut tout changer.`,
      },
    ],
    conseil: `La Leche League France propose un soutien gratuit par téléphone et des groupes locaux. Si l'allaitement se passe mal, ne pas attendre : une consultante en lactation règle souvent les problèmes en une séance.`,
  },
];

// ── Composant principal ───────────────────────────────────────────────────────

export default function AtelierBebe({ C: propC }: any) {
  const [atelierActif, setAtelierActif] = useState('secours');
  const [etapeOuverte, setEtapeOuverte] = useState<number | null>(0);

  const atelier = ATELIERS.find(a => a.id === atelierActif) || ATELIERS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* EN-TÊTE */}
      <div style={{ background: '#1A3D5C', borderRadius: '24px', padding: '24px 28px' }}>
        <p style={{ color: 'rgba(200,220,240,0.55)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 6px' }}>Atelier pratique</p>
        <p style={{ color: '#fff', fontSize: '20px', fontWeight: 800, margin: '0 0 6px' }}>Les gestes qui comptent</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>Pas à pas, illustré. Pour être prêt quand ça compte.</p>
      </div>

      {/* NAVIGATION ATELIERS */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' as const, paddingBottom: '2px' }}>
        {ATELIERS.map(a => (
          <button key={a.id} onClick={() => { setAtelierActif(a.id); setEtapeOuverte(0); }} style={{
            flexShrink: 0,
            padding: '10px 16px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 800,
            background: atelierActif === a.id ? '#1e2535' : a.fond,
            color: atelierActif === a.id ? '#fff' : a.couleur,
            transition: 'all 0.15s',
          }}>
            {a.icone} {a.titre}
          </button>
        ))}
      </div>

      {/* CARTE INTRO */}
      <div style={{ background: atelier.fond, borderRadius: '20px', padding: '20px 22px', borderLeft: `4px solid ${atelier.couleur}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: '24px' }}>{atelier.icone}</span>
          <div>
            <p style={{ color: atelier.tc, fontSize: '17px', fontWeight: 800, margin: 0 }}>{atelier.titre}</p>
            <p style={{ color: atelier.couleur, fontSize: '12px', fontWeight: 600, margin: 0 }}>{atelier.sousTitre}</p>
          </div>
        </div>
        <p style={{ color: atelier.tc, fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{atelier.intro}</p>
      </div>

      {/* ALERTE si présente */}
      {atelier.alerte && (
        <div style={{ background: '#FDECEA', borderRadius: '16px', padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
          <p style={{ color: '#8A0000', fontSize: '13px', fontWeight: 600, lineHeight: 1.6, margin: 0 }}>{atelier.alerte}</p>
        </div>
      )}

      {/* ÉTAPES */}
      <div>
        <p style={{ color: '#1e2535', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>
          Étapes ({atelier.etapes.length})
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {atelier.etapes.map((etape, idx) => {
            const ouvert = etapeOuverte === idx;
            return (
              <div key={idx} style={{
                background: '#fff',
                borderRadius: '18px',
                border: ouvert ? `2px solid ${atelier.couleur}` : '1.5px solid #f0ede8',
                overflow: 'hidden',
                transition: 'border-color 0.15s',
              }}>
                {/* Header étape */}
                <button
                  onClick={() => setEtapeOuverte(ouvert ? null : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                  }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: ouvert ? atelier.couleur : '#f0ede8',
                    color: ouvert ? '#fff' : '#9aa0a8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 800,
                  }}>
                    {idx + 1}
                  </div>
                  <p style={{
                    color: ouvert ? atelier.tc : '#1e2535',
                    fontSize: '14px',
                    fontWeight: 700,
                    margin: 0,
                    flex: 1,
                    lineHeight: 1.3,
                  }}>
                    {etape.titre}
                  </p>
                  <span style={{ color: '#9aa0a8', fontSize: '18px', flexShrink: 0 }}>
                    {ouvert ? '−' : '+'}
                  </span>
                </button>

                {/* Contenu ouvert */}
                {ouvert && (
                  <div style={{ padding: '0 18px 18px' }}>
                    {/* Illustration SVG si disponible */}
                    {etape.svg && (
                      <div
                        style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '14px', maxWidth: '240px' }}
                        dangerouslySetInnerHTML={{ __html: etape.svg }}
                      />
                    )}
                    <p style={{ color: '#3a4a5a', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>
                      {etape.texte}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CONSEIL FINAL */}
      {atelier.conseil && (
        <div style={{ background: '#1e2535', borderRadius: '18px', padding: '18px 20px' }}>
          <p style={{ color: '#c8a060', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>À retenir</p>
          <p style={{ color: '#fff', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{atelier.conseil}</p>
        </div>
      )}

    </div>
  );
}
