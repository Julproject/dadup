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
    id: 'change',
    titre: 'Changer la couche',
    sousTitre: 'La technique recommandée HAS 2023',
    couleur: '#1A4A7A',
    fond: '#E6F0FA',
    etapes: [
      {
        titre: 'Préparer avant de commencer',
        texte: `Avant de poser bébé sur la table à langer, prépare tout ce dont tu as besoin : couche propre ouverte et dépliée, coton ou lingettes sans parfum, eau tiède ou solution nettoyante, crème protectrice si besoin. Ne laisse jamais bébé seul sur la table à langer, même une seconde. Une main reste toujours posée sur lui. Source : HAS, Naissance et premiers mois de bébé, 2023.`,
      },
      {
        titre: 'Retirer la couche souillée',
        texte: `Ouvre les attaches et rabats le devant de la couche vers le bas. Pour soulever les fesses de bébé, glisse tes deux mains de chaque côté de ses hanches et soulève doucement. Utilise la partie propre de la couche pour essuyer le plus gros. Retire la couche et écarte-la. Source : Société Française de Pédiatrie, 2022.`,
      },
      {
        titre: 'Nettoyer la peau',
        texte: `Utilise du coton hydrophile imbibé d'eau tiède ou des lingettes sans parfum ni alcool. Nettoie toujours de l'avant vers l'arrière (du pubis vers les fesses), pour les filles comme pour les garçons. Cela évite de transporter des bactéries fécales vers les organes génitaux. Pour les filles, écarte doucement les grandes lèvres et nettoie de haut en bas. Pour les garçons, nettoie sans décalotter : le prépuce est naturellement adhérent les premières années et ne doit jamais être rétracté de force. Source : Société Française de Pédiatrie, 2022.`,
      },
      {
        titre: 'Poser la couche propre',
        texte: `Glisse la couche propre sous les fesses de bébé en la positionnant de façon que la partie avec les attaches soit sous lui. La partie avant remonte sur le ventre. Fixe les deux attaches de façon symétrique sur le devant. Vérifie que les bords en caoutchouc sur les cuisses sont bien dépliés vers l'extérieur pour éviter les fuites. Tu dois pouvoir glisser deux doigts entre la couche et le ventre de bébé. Source : HAS, 2023.`,
      },
      {
        titre: 'Le cordon ombilical',
        texte: `Plie le bord avant de la couche vers le bas pour ne pas frotter le cordon ombilical. Le cordon tombe seul entre le 5e et le 15e jour. La HAS recommande depuis 2013 un soin à sec : pas d'antiseptique systématique, laisser simplement sécher à l'air. En cas de rougeur autour du cordon, d'odeur forte ou d'écoulement, consulte sans attendre. Ne jamais tirer le cordon. Source : HAS, Soins du cordon ombilical, 2013, confirmé 2022.`,
      },
      {
        titre: 'Les selles : ce qui est normal',
        texte: `Les trois premiers jours, les selles sont noires et goudronneuses : c'est le méconium, tout à fait normal. À partir du 4e jour, elles deviennent jaune moutarde et grumeleuses si bébé est allaité, ou beige et plus formées s'il est nourri au lait infantile. La fréquence est très variable : plusieurs selles par jour à une selle tous les 5 jours chez les bébés allaités, sans que ce soit une constipation. Source : Académie Américaine de Pédiatrie, Caring for Your Baby, 2023.`,
      },
    ],
    conseil: `Le change est un moment de relation. Parle à bébé, nomme ce que tu fais, maintiens un contact visuel. Ces moments répétés construisent la confiance et le lien.`,
  },
  {
    id: 'allaitement',
    titre: 'Allaitement',
    sousTitre: 'Ton rôle concret',
    couleur: '#0D6B40',
    fond: '#E4F5EC',
    etapes: [
      {
        titre: "Les signes d'une bonne prise du sein",
        texte: `Une bonne prise du sein se reconnaît à plusieurs signes : la bouche de bébé est grande ouverte et couvre une grande partie de l'aréole (pas seulement le mamelon), les lèvres sont retroussées vers l'extérieur, le menton appuie contre le sein, le nez est dégagé. On entend des déglutitions régulières. Si la douleur persiste au-delà des 30 premières secondes, c'est le signe d'une mauvaise prise. Glisse un doigt dans le coin de la bouche de bébé pour interrompre doucement la succion, puis repositionne. Recommencer n'est pas un échec. Source : OMS, Counselling for Maternal and Newborn Health Care, 2022.`,
      },
      {
        titre: "Les positions d'allaitement",
        texte: `La position en berceau est la plus courante : bébé est allongé face à sa mère, ventre contre ventre, sa tête dans le creux du coude. La position en ballon de rugby (bébé sous le bras, les pieds vers l'arrière) est souvent recommandée après une césarienne car elle évite d'appuyer sur la cicatrice. La position allongée sur le côté est pratique la nuit. Ce qui compte : bébé est bien face au sein et la maman est confortable. Source : Leche League France, 2023.`,
      },
      {
        titre: 'Fréquence et durée',
        texte: `L'OMS recommande un allaitement à la demande, sans horaire imposé. Les premières semaines, bébé tète en général 8 à 12 fois par 24 heures. Il n'y a pas de durée fixe : certains bébés sont rassasiés en 10 minutes, d'autres prennent 40 minutes. Il est recommandé de laisser bébé finir un sein complètement avant de proposer l'autre, pour qu'il reçoive le lait de fin de tétée, plus riche en graisses. Source : OMS, Global Strategy for Infant and Young Child Feeding, 2022.`,
      },
      {
        titre: 'La montée de lait',
        texte: `La montée de lait survient en général entre le 2e et le 4e jour après la naissance. Les seins deviennent chauds, lourds, parfois douloureux. C'est transitoire. Dans les premières heures, bébé reçoit du colostrum, un liquide épais très riche en anticorps, exactement adapté à ses besoins. La quantité paraît faible mais est suffisante. Il ne faut pas compléter avec un biberon sauf avis médical explicite. Source : HAS, Allaitement maternel, mise en oeuvre et poursuite, 2022.`,
      },
      {
        titre: 'Ton rôle concret',
        texte: `Ton soutien a un impact direct sur la durée et la réussite de l'allaitement. Concrètement : apporte-lui à boire (elle perd beaucoup de liquide pendant les tétées), prends bébé entre les tétées pour qu'elle récupère, assure-toi qu'elle peut manger correctement, soutiens ses décisions sans pression extérieure. Si elle rencontre des difficultés, oriente-la vers une consultante en lactation certifiée IBCLC. Source : Rollins et al., Lancet, 2016.`,
      },
    ],
    conseil: `La Leche League France propose un soutien gratuit par téléphone et des groupes locaux : 0970 840 404. Une seule consultation avec une IBCLC peut résoudre la plupart des difficultés d'allaitement.`,
  },
  {
    id: 'apaisement',
    titre: 'Apaiser bébé',
    sousTitre: 'Comprendre et répondre aux pleurs',
    couleur: '#5050B0',
    fond: '#F0EEFF',
    etapes: [
      {
        titre: "Vérifier les causes dans l'ordre",
        texte: `Quand bébé pleure, passe en revue les causes les plus fréquentes dans cet ordre : la faim (cause la plus courante), la couche souillée, la température (trop chaud ou trop froid), la douleur ou les coliques, le besoin de contact et de portage. Si aucune cause n'est identifiée, le portage ou le bruit blanc sont les techniques les mieux documentées pour apaiser un nourrisson. Source : Hunziker & Barr, Pediatrics, 1986, répliqué depuis.`,
      },
      {
        titre: 'Reconnaître les signaux de faim avant les pleurs',
        texte: `Les pleurs sont un signal tardif de faim. Avant d'en arriver là, bébé montre des signaux précoces : il tourne la tête d'un côté à l'autre (réflexe de fouissement), ouvre et ferme la bouche, porte ses mains à sa bouche. Répondre à ces signaux précoces rend la tétée plus facile et réduit le stress de bébé. Source : Académie Américaine de Pédiatrie, 2023.`,
      },
      {
        titre: 'Les coliques du nourrisson',
        texte: `Les coliques touchent environ 20% des nourrissons et se définissent par des pleurs intenses plus de 3 heures par jour, plus de 3 jours par semaine, pendant plus de 3 semaines. Elles débutent souvent vers 2 à 3 semaines et disparaissent spontanément vers 3 mois. Ce qui peut aider : le mouvement (bercer, se promener en portant bébé), la chaleur douce sur le ventre, le portage ventral, le bruit blanc. Aucun médicament n'a prouvé son efficacité. Source : HAS, 2021.`,
      },
      {
        titre: 'Le bruit blanc',
        texte: `Le bruit blanc rappelle à bébé les sons entendus in utero. Il est efficace pour l'apaisement et pour faciliter l'endormissement. Il doit être aussi fort que la voix de bébé, jamais plus fort. Les applications White Noise Baby ou Baby Sleep Sound sont adaptées. À utiliser à bonne distance, jamais directement contre l'oreille. Source : Spencer et al., Archives of Disease in Childhood, 1990, confirmé depuis.`,
      },
      {
        titre: 'Quand tu décroches toi-même',
        texte: `Les pleurs prolongés activent le système de stress chez l'adulte. Si tu sens que tu perds le contrôle, pose bébé en sécurité dans son lit sur le dos, sors de la pièce et prends 5 minutes pour te calmer. Revenir calme vaut toujours mieux que rester dans la pièce en se forçant. Ne jamais secouer un bébé : le syndrome du bébé secoué peut provoquer des lésions cérébrales graves ou le décès. Source : INPES, Bébé secoué, 2022.`,
      },
    ],
    conseil: `Les pleurs culminent naturellement vers 6 semaines puis diminuent progressivement. Si les pleurs durent plus de 3 heures par jour pendant plusieurs jours consécutifs, parles-en au pédiatre pour écarter une cause médicale.`,
  },
  {
    id: 'emmaillotage',
    titre: 'Emmailloter',
    sousTitre: 'La technique correcte et ses limites',
    couleur: '#8A6010',
    fond: '#FFF7E0',
    etapes: [
      {
        titre: "Pourquoi emmailloter",
        texte: `L'emmaillotage reproduit la sensation de contention ressentie in utero. Il peut apaiser certains bébés agités et faciliter l'endormissement en réduisant le réflexe de Moro (sursaut). Ce n'est pas une technique universelle : certains bébés y réagissent bien, d'autres pas du tout. À utiliser uniquement les premières semaines, pas comme habitude à long terme. Source : van Sleuwen et al., Pediatrics, 2007.`,
      },
      {
        titre: 'Matériel et position de départ',
        texte: `Utilise un carré de mousseline fine de 120x120 cm minimum, posé en losange sur une surface plane. Rabats le coin supérieur d'environ 15 cm vers le centre. Pose bébé sur le dos, sa nuque sur le bord replié, les épaules légèrement en dessous du bord du tissu. Ses fesses doivent être au centre du tissu.`,
      },
      {
        titre: 'Envelopper les bras et le corps',
        texte: `Place le bras gauche de bébé le long de son corps. Prends le coin gauche du tissu, tire-le sur son épaule gauche en passant sur son bras, et glisse-le fermement sous son dos côté droit. Remonte ensuite le coin inférieur du tissu sur son ventre. Puis place le bras droit le long de son corps, tire le coin droit sur son épaule droite et glisse-le sous son dos côté gauche. Tu dois pouvoir glisser deux doigts entre le tissu et sa poitrine.`,
      },
      {
        titre: 'Les hanches : point critique de sécurité',
        texte: `Ne serre jamais les jambes de bébé ensemble dans l'emmaillotage. Les hanches doivent rester en position naturelle, légèrement fléchies et écartées comme celles d'une grenouille. Un emmaillotage trop serré dans les jambes augmente significativement le risque de dysplasie de hanche. Source : Académie Américaine de Pédiatrie, Safe Sleep, 2022.`,
      },
      {
        titre: 'Quand arrêter',
        texte: `Arrête l'emmaillotage dès que bébé montre des signes de tentative de retournement, généralement vers 2 mois. Un bébé emmailloté qui se retourne sur le ventre ne peut pas se repositionner seul et risque l'étouffement. Bébé doit toujours dormir sur le dos. Source : HAS, Mort inattendue du nourrisson, recommandations 2020.`,
      },
    ],
    conseil: `Si bébé se débat et pleure davantage emmailloté, respecte sa préférence. D'autres formes de portage ou de contact peuvent être tout aussi efficaces.`,
  },
  {
    id: 'secours',
    titre: 'Premiers secours',
    sousTitre: 'Gestes essentiels nourrisson',
    couleur: '#C04A1A',
    fond: '#FDECEA',
    alerte: "En cas de doute : appelle le 15 (SAMU) ou le 18 (pompiers). Ne raccroche pas avant d'avoir reçu les instructions.",
    etapes: [
      {
        titre: "Bébé s'étouffe et tousse",
        texte: `Si bébé tousse fort, il gère. La toux est le mécanisme naturel de défense des voies aériennes. N'interviens pas, encourage la toux en le maintenant assis ou légèrement penché en avant. Ne tape pas dans le dos pendant qu'il tousse efficacement, ne mets pas tes doigts dans sa bouche. Source : Croix-Rouge Française, Premiers secours nourrisson, 2023.`,
      },
      {
        titre: "Bébé s'étouffe et ne tousse plus ou ne crie plus",
        texte: `Si la toux devient inefficace ou que bébé ne fait plus de bruit, agis immédiatement. Retourne-le tête en bas sur ton avant-bras, ventre contre ton bras, la tête plus basse que le corps. Donne 5 tapes fermes entre les omoplates avec le talon de ta main ouverte. Si insuffisant : retourne-le sur le dos, place 2 doigts au centre de la poitrine entre les mamelons, et donne 5 compressions fermes d'environ 1,5 cm de profondeur. Alterne 5 tapes dans le dos et 5 compressions thoraciques jusqu'à ce que l'objet soit expulsé ou que les secours arrivent. Appelle le 15 dès le début. Source : Croix-Rouge Française, 2023.`,
      },
      {
        titre: 'Bébé perd connaissance ou ne réagit plus',
        texte: `Stimule doucement : talon de pied, appel de son prénom à voix forte. S'il ne réagit pas, appelle le 15 immédiatement et mets le haut-parleur. S'il respire, place-le en position latérale de sécurité. S'il ne respire pas, commence le massage cardiaque nourrisson : 30 compressions avec 2 doigts au centre de la poitrine, puis 2 insufflations bouche-bouche-nez. Continue jusqu'à l'arrivée des secours. Source : European Resuscitation Council, Guidelines 2021.`,
      },
      {
        titre: 'Chute de hauteur',
        texte: `Ne bouge pas bébé si tu suspectes une blessure à la nuque ou à la colonne. Appelle le 15 immédiatement si : perte de connaissance même brève, vomissements répétés, pleurs inhabituels ou au contraire absence de pleurs, fontanelle bombée, convulsions, ou chute d'une hauteur supérieure à sa propre taille. Si bébé pleure immédiatement et semble normal, surveille attentivement pendant 24 heures. Source : Société Française de Pédiatrie, 2023.`,
      },
      {
        titre: 'Fièvre du nourrisson',
        texte: `Avant 3 mois : toute température supérieure à 38°C est une urgence médicale. Appelle le 15 ou rends-toi aux urgences pédiatriques sans attendre. Entre 3 et 6 mois : consulte ton médecin le jour même pour toute fièvre supérieure à 38°C. Après 6 mois : surveille l'état général. Un enfant qui joue, boit et réagit normalement malgré la fièvre est rassurant. Source : HAS, Prise en charge de la fièvre chez l'enfant, 2017, actualisé 2023.`,
      },
    ],
    conseil: `La formation PSC1 nourrisson dure 7 heures et peut sauver une vie. Renseigne-toi auprès de ta maternité, de la Croix-Rouge ou de la Protection Civile. Certaines maternités proposent ces formations aux futurs pères pendant la grossesse.`,
  },
];

export default function AtelierBebe({C: propC}: any) {
  const [atelierActif, setAtelierActif] = useState('change');
  const [etapeOuverte, setEtapeOuverte] = useState<number | null>(0);

  const atelier = ATELIERS.find(a => a.id === atelierActif) || ATELIERS[0];

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'20px', fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      <div style={{background:'#1A3D5C', borderRadius:'20px', padding:'22px 24px'}}>
        <p style={{color:'rgba(200,220,240,0.5)', fontSize:'10px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 6px'}}>Atelier pratique</p>
        <p style={{color:'#fff', fontSize:'20px', fontWeight:800, margin:'0 0 4px'}}>Les gestes qui comptent</p>
        <p style={{color:'rgba(255,255,255,0.5)', fontSize:'13px', margin:0}}>Basé sur les recommandations HAS, SFP et Croix-Rouge 2023.</p>
      </div>

      <div style={{display:'flex', gap:'7px', overflowX:'auto' as const, paddingBottom:'2px'}}>
        {ATELIERS.map(a => (
          <button key={a.id} onClick={() => { setAtelierActif(a.id); setEtapeOuverte(0); }} style={{
            flexShrink:0, padding:'8px 16px', border:'none', borderRadius:'20px', cursor:'pointer',
            fontSize:'12px', fontWeight:700,
            background: atelierActif === a.id ? '#1e2535' : a.fond,
            color: atelierActif === a.id ? '#fff' : a.couleur,
          }}>
            {a.titre}
          </button>
        ))}
      </div>

      <div style={{background:atelier.fond, borderRadius:'16px', padding:'16px 18px', borderLeft:`3px solid ${atelier.couleur}`}}>
        <p style={{color:atelier.couleur, fontSize:'16px', fontWeight:800, margin:'0 0 2px'}}>{atelier.titre}</p>
        <p style={{color:'#6a7585', fontSize:'12px', margin:0}}>{atelier.sousTitre}</p>
      </div>

      {atelier.alerte && (
        <div style={{background:'#FDECEA', borderRadius:'14px', padding:'12px 16px', display:'flex', gap:'10px', alignItems:'flex-start'}}>
          <span style={{fontSize:'16px', flexShrink:0}}>⚠️</span>
          <p style={{color:'#8A0000', fontSize:'13px', fontWeight:600, margin:0}}>{atelier.alerte}</p>
        </div>
      )}

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

      {atelier.conseil && (
        <div style={{background:'#1e2535', borderRadius:'16px', padding:'16px 18px'}}>
          <p style={{color:'#c8a060', fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 7px'}}>À retenir</p>
          <p style={{color:'#fff', fontSize:'13px', lineHeight:1.7, margin:0}}>{atelier.conseil}</p>
        </div>
      )}

    </div>
  );
}
