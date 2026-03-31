'use client';
import { useState } from 'react';

type Etape = { titre: string; texte: string };
type Atelier = {
  id: string;
  titre: string;
  sousTitre: string;
  couleur: string;
  fond: string;
  etapes: Etape[];
  conseil?: string;
  alerte?: string;
};

const ATELIERS: Atelier[] = [
  {
    id: 'secours',
    titre: 'Premiers secours',
    sousTitre: 'Gestes essentiels nourrisson',
    couleur: '#C04A1A',
    fond: '#FDECEA',
    alerte: 'En cas de doute : 15 (SAMU) ou 18 (pompiers).',
    etapes: [
      {
        titre: `Bébé s'étouffe - il tousse`,
        texte: `S'il tousse fort, il gère. Ne fais rien. Encourage la toux. Ne tape pas dans le dos, ne mets pas les doigts dans sa bouche.`,
      },
      {
        titre: `Bébé s'étouffe - il ne tousse plus`,
        texte: `Tête en bas sur ton avant-bras. 5 tapes fermes entre les omoplates avec le talon de la main. Si insuffisant : retourne-le sur le dos, 2 doigts au centre de la poitrine, 5 compressions. Alterner jusqu'à libération ou secours.`,
      },
      {
        titre: 'Bébé ne répond plus',
        texte: `Stimule doucement (talon de pied, son prénom). S'il ne réagit pas : appelle le 15, mets-le en position latérale de sécurité s'il respire, commence le massage cardiaque sinon (30 compressions + 2 insufflations).`,
      },
      {
        titre: 'Chute de hauteur',
        texte: `Ne bouge pas bébé si tu suspectes une blessure à la nuque. Appelle le 15 si : perte de connaissance, vomissements, pleurs inhabituels, fontanelle bombée, ou chute de plus de sa propre hauteur.`,
      },
      {
        titre: 'Fièvre nourrisson',
        texte: `Avant 3 mois : toute fièvre au-dessus de 38°C = appel pédiatre ou urgences sans attendre. Entre 3 et 6 mois : appel médecin le jour même. Après 6 mois : surveiller l'état général.`,
      },
    ],
    conseil: `La formation PSC1 nourrisson dure 7 heures et peut tout changer. Renseigne-toi en maternité ou auprès de la Croix-Rouge.`,
  },
  {
    id: 'change',
    titre: 'Changer la couche',
    sousTitre: 'Efficace et sans stress',
    couleur: '#1A4A7A',
    fond: '#E6F0FA',
    etapes: [
      {
        titre: 'Avant de commencer',
        texte: `Prépare tout à portée de main avant de poser bébé : couche propre ouverte, lingettes ou coton eau tiède, crème si besoin. Ne laisse jamais bébé seul sur la table, même une seconde.`,
      },
      {
        titre: 'Ouvrir et nettoyer',
        texte: `Soulève les fesses en tenant les deux chevilles doucement. Replie la couche sale sous les fesses. Nettoie toujours de l'avant vers l'arrière. Chez les garçons : garde une lingette prête sur le pénis.`,
      },
      {
        titre: 'Poser la couche propre',
        texte: `Glisse la couche propre sous les fesses. La partie avant remonte sur le ventre. Attaches symétriques sur le devant. Vérifie que les bords aux cuisses sont dépliés vers l'extérieur.`,
      },
      {
        titre: 'Le cordon ombilical',
        texte: `Plie le bord avant de la couche pour ne pas frotter dessus. Il tombe seul entre J5 et J15. Sérum physiologique une fois par jour si besoin. Ne pas tirer.`,
      },
      {
        titre: 'Les selles : ce qui est normal',
        texte: `J1-J3 : méconium noir/vert, normal. Ensuite : jaune moutarde si allaitement, beige si biberon. La fréquence varie beaucoup : de 8 fois par jour à une fois tous les 5 jours chez les bébés allaités.`,
      },
    ],
    conseil: `Le change est un moment de connexion. Parle-lui, nomme ce que tu fais. Même seul à 3h du matin.`,
  },
  {
    id: 'emmaillotage',
    titre: 'Emmailloter',
    sousTitre: 'La technique qui apaise',
    couleur: '#8A6010',
    fond: '#FFF7E0',
    etapes: [
      {
        titre: 'Départ',
        texte: `Carré de mousseline 120x120 cm en losange. Replie le coin supérieur de 15 cm vers le bas. Pose bébé sur le dos, nuque sur le bord replié, épaules légèrement en dessous.`,
      },
      {
        titre: 'Bras gauche',
        texte: `Place le bras gauche de bébé le long du corps. Prends le coin gauche du tissu, tire-le sur l'épaule gauche et glisse-le sous son dos droit.`,
      },
      {
        titre: 'Le bas',
        texte: `Remonte le coin inférieur sur son ventre et replie-le. Les hanches doivent rester libres : ne serre jamais les jambes ensemble. Un emmaillotage trop serré dans les jambes peut provoquer une dysplasie de hanche.`,
      },
      {
        titre: 'Bras droit et finition',
        texte: `Bras droit le long du corps. Tire le dernier coin sur l'épaule droite, glisse-le sous le dos. Tu dois pouvoir glisser deux doigts entre le tissu et la poitrine.`,
      },
      {
        titre: 'Quand arrêter',
        texte: `Dès que bébé montre des signes de retournement, vers 2 mois. Toujours sur le dos pour dormir emmailloté. Un bébé retourné sur le ventre emmailloté ne peut pas se repositionner.`,
      },
    ],
    conseil: `Certains bébés détestent l'emmaillotage. Si le tien se débat encore plus, respecte sa préférence.`,
  },
  {
    id: 'apaisement',
    titre: 'Apaiser bébé',
    sousTitre: 'Comprendre les pleurs',
    couleur: '#5050B0',
    fond: '#F0EEFF',
    etapes: [
      {
        titre: 'Le protocole de base',
        texte: `Dans l'ordre : faim, couche, température, douleur/coliques, besoin de contact. Si rien de tout ça : portage ou bruit blanc.`,
      },
      {
        titre: 'Reconnaitre le pleur de faim',
        texte: `Rythme régulier qui s'intensifie. Signes avant les pleurs : tourne la tête, ouvre la bouche, mains à la bouche. Repérer ces signaux tôt rend la tétée plus facile.`,
      },
      {
        titre: 'Les coliques',
        texte: `Mouvement : bercer, voiture. Chaleur : main sur le ventre, bain tiède. Position : bébé sur le ventre sur ton avant-bras. Bruit blanc : "shhhhh" fort près de l'oreille ou appli dédiée.`,
      },
      {
        titre: 'Le bruit blanc',
        texte: `Aussi fort que sa propre voix, pas plus. Rappelle les sons entendus in utero. Efficace pour l'apaisement et pour le sommeil. Les applis White Noise ou Baby Sleep fonctionnent bien.`,
      },
      {
        titre: 'Quand tu décroches toi',
        texte: `Si tu sens que tu perds le contrôle : pose bébé en sécurité dans son lit, sors de la chambre, respire 5 minutes. Revenir calme vaut mieux que rester en te forçant.`,
      },
    ],
    conseil: `Les pleurs culminent vers 6 semaines puis diminuent. Plus de 3h par jour pendant 3 jours consécutifs : parles-en au pédiatre.`,
  },
  {
    id: 'sein',
    titre: 'Allaitement',
    sousTitre: 'La bonne prise du sein',
    couleur: '#0D6B40',
    fond: '#E4F5EC',
    etapes: [
      {
        titre: `Les signes d'une bonne prise`,
        texte: `Bouche grande ouverte sur l'aréole (pas que le mamelon). Lèvres retroussées. Menton appuyé contre le sein. Tu entends des déglutitions. Si tu as mal au-delà de 30 secondes : mauvaise prise, détacher et recommencer.`,
      },
      {
        titre: 'Détacher sans douleur',
        texte: `Glisse ton petit doigt dans le coin de sa bouche pour briser la succion, puis écarte doucement. Recommencer n'est pas un échec.`,
      },
      {
        titre: 'Les positions',
        texte: `Berceau (classique), football (bébé sous le bras, utile après césarienne), allongée (pratique la nuit). Essaie les trois, ton corps trouve sa préférence.`,
      },
      {
        titre: 'Fréquence et durée',
        texte: `8 à 12 tétées par 24h les premières semaines. Pas de règle de durée : 10 à 40 minutes selon les bébés. Laisser finir un sein avant de proposer l'autre.`,
      },
      {
        titre: 'Ton rôle',
        texte: `Apporter à boire (elle perd beaucoup de liquide). Créer un environnement calme. Prendre le bébé entre les tétées pour qu'elle récupère. Une consultante en lactation (IBCLC) peut tout changer en une séance.`,
      },
    ],
    conseil: `La Leche League France propose un soutien gratuit par téléphone et des groupes locaux : 0970 840 404.`,
  },
];

export default function AtelierBebe({C: propC}: any) {
  const [atelierActif, setAtelierActif] = useState('secours');
  const [etapeOuverte, setEtapeOuverte] = useState<number | null>(0);

  const atelier = ATELIERS.find(a => a.id === atelierActif) || ATELIERS[0];

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'20px', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      {/* EN-TÊTE */}
      <div style={{background:'#1A3D5C', borderRadius:'20px', padding:'22px 24px'}}>
        <p style={{color:'rgba(200,220,240,0.5)', fontSize:'10px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 6px'}}>Atelier pratique</p>
        <p style={{color:'#fff', fontSize:'20px', fontWeight:800, margin:0}}>Les gestes qui comptent</p>
      </div>

      {/* NAVIGATION */}
      <div style={{display:'flex', gap:'7px', overflowX:'auto' as const, paddingBottom:'2px'}}>
        {ATELIERS.map(a => (
          <button key={a.id} onClick={() => { setAtelierActif(a.id); setEtapeOuverte(0); }} style={{
            flexShrink:0,
            padding:'8px 16px',
            border:'none',
            borderRadius:'20px',
            cursor:'pointer',
            fontSize:'12px',
            fontWeight:700,
            background: atelierActif === a.id ? '#1e2535' : a.fond,
            color: atelierActif === a.id ? '#fff' : a.couleur,
          }}>
            {a.titre}
          </button>
        ))}
      </div>

      {/* INTRO ATELIER */}
      <div style={{background:atelier.fond, borderRadius:'16px', padding:'16px 18px', borderLeft:`3px solid ${atelier.couleur}`}}>
        <p style={{color:atelier.couleur, fontSize:'16px', fontWeight:800, margin:'0 0 2px'}}>{atelier.titre}</p>
        <p style={{color:'#6a7585', fontSize:'12px', margin:0}}>{atelier.sousTitre}</p>
      </div>

      {/* ALERTE */}
      {atelier.alerte && (
        <div style={{background:'#FDECEA', borderRadius:'14px', padding:'12px 16px', display:'flex', gap:'10px', alignItems:'center'}}>
          <span style={{fontSize:'16px', flexShrink:0}}>⚠️</span>
          <p style={{color:'#8A0000', fontSize:'13px', fontWeight:600, margin:0}}>{atelier.alerte}</p>
        </div>
      )}

      {/* ÉTAPES */}
      <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
        {atelier.etapes.map((etape, idx) => {
          const ouvert = etapeOuverte === idx;
          return (
            <div key={idx} style={{borderRadius:'14px', border: ouvert ? `1.5px solid ${atelier.couleur}` : '1.5px solid #f0ede8', overflow:'hidden', background:'#fff'}}>
              <button
                onClick={() => setEtapeOuverte(ouvert ? null : idx)}
                style={{width:'100%', display:'flex', alignItems:'center', gap:'12px', padding:'13px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const}}
              >
                <span style={{
                  width:'24px', height:'24px', borderRadius:'50%', flexShrink:0,
                  background: ouvert ? atelier.couleur : '#f0ede8',
                  color: ouvert ? '#fff' : '#9aa0a8',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'11px', fontWeight:800,
                }}>{idx + 1}</span>
                <span style={{color: ouvert ? atelier.couleur : '#1e2535', fontSize:'14px', fontWeight:700, flex:1, lineHeight:1.3}}>{etape.titre}</span>
                <span style={{color:'#ccc', fontSize:'16px', flexShrink:0}}>{ouvert ? '−' : '+'}</span>
              </button>
              {ouvert && (
                <div style={{padding:'0 16px 16px 52px'}}>
                  <p style={{color:'#3a4a5a', fontSize:'13px', lineHeight:1.75, margin:0}}>{etape.texte}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CONSEIL */}
      {atelier.conseil && (
        <div style={{background:'#1e2535', borderRadius:'16px', padding:'16px 18px'}}>
          <p style={{color:'#c8a060', fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 7px'}}>À retenir</p>
          <p style={{color:'#fff', fontSize:'13px', lineHeight:1.7, margin:0}}>{atelier.conseil}</p>
        </div>
      )}

    </div>
  );
}
