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
    sousTitre: 'Les bons gestes, étape par étape',
    couleur: '#1A4A7A',
    fond: '#E6F0FA',
    etapes: [
      {
        titre: 'Préparer avant de commencer',
        texte: `Avant de poser bébé sur la table à langer, prépare tout ce dont tu as besoin : couche propre ouverte et dépliée, coton ou lingettes sans parfum, eau tiède ou solution nettoyante, crème protectrice si besoin. Ne laisse jamais bébé seul sur la table à langer, même une seconde. Une main reste toujours posée sur lui.`,
      },
      {
        titre: 'Retirer la couche souillée',
        texte: `Ouvre les attaches et rabats le devant de la couche vers le bas. Pour soulever les fesses de bébé, glisse tes deux mains de chaque côté de ses hanches et soulève doucement. Utilise la partie propre de la couche pour essuyer le plus gros. Retire la couche et écarte-la.`,
      },
      {
        titre: 'Nettoyer la peau',
        texte: `Utilise du coton hydrophile imbibé d'eau tiède ou des lingettes sans parfum ni alcool. Nettoie toujours de l'avant vers l'arrière (du pubis vers les fesses), pour les filles comme pour les garçons. Cela évite de transporter des bactéries fécales vers les organes génitaux. Pour les filles, écarte doucement les grandes lèvres et nettoie de haut en bas. Pour les garçons, nettoie sans décalotter : le prépuce est naturellement adhérent les premières années et ne doit jamais être rétracté de force.`,
      },
      {
        titre: 'Poser la couche propre',
        texte: `Glisse la couche propre sous les fesses de bébé en la positionnant de façon que la partie avec les attaches soit sous lui. La partie avant remonte sur le ventre. Fixe les deux attaches de façon symétrique sur le devant. Vérifie que les bords en caoutchouc sur les cuisses sont bien dépliés vers l'extérieur pour éviter les fuites. Tu dois pouvoir glisser deux doigts entre la couche et le ventre de bébé.`,
      },
      {
        titre: 'Le cordon ombilical',
        texte: `Plie le bord avant de la couche vers le bas pour ne pas frotter le cordon ombilical. Le cordon tombe seul entre le 5e et le 15e jour. Le soin recommandé est simple : nettoyer à l'eau, avec un savon doux si besoin, bien sécher, sans antiseptique systématique, et laisser le cordon à l'air. En cas de rougeur autour du cordon, d'odeur forte ou d'écoulement, consulte sans attendre. Ne tire jamais dessus.`,
      },
      {
        titre: 'Les selles : ce qui est normal',
        texte: `Les trois premiers jours, les selles sont noires et goudronneuses : c'est le méconium, tout à fait normal. À partir du 4e jour, elles deviennent jaune moutarde et grumeleuses si bébé est allaité, ou beige et plus formées s'il est nourri au lait infantile. Les premières semaines, un bébé allaité fait en général au moins 3 selles par jour : s'il en fait moins, parles-en à la sage-femme, cela peut signaler qu'il ne boit pas assez. Après 4 à 6 semaines, la fréquence devient très variable : certains bébés allaités ne font qu'une selle tous les quelques jours, sans constipation tant que les selles restent molles. Des selles décolorées (blanches, grises, beige très pâle ou jaune paille) ne sont jamais normales : compare-les à la carte de couleur des selles de son carnet de santé et consulte rapidement si elles y ressemblent.`,
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
        texte: `Une bonne prise du sein se reconnaît à plusieurs signes : la bouche de bébé est grande ouverte et couvre une grande partie de l'aréole (pas seulement le mamelon), les lèvres sont retroussées vers l'extérieur, le menton appuie contre le sein, le nez est dégagé. On entend des déglutitions régulières. Si la douleur persiste au-delà des 30 premières secondes, c'est le signe d'une mauvaise prise. Elle peut glisser un doigt dans le coin de la bouche de bébé pour interrompre doucement la succion, puis le repositionner. Recommencer n'est pas un échec.`,
      },
      {
        titre: "Les positions d'allaitement",
        texte: `La position en berceau est la plus courante : bébé est allongé face à sa mère, ventre contre ventre, sa tête dans le creux du coude. La position en ballon de rugby (bébé sous le bras, les pieds vers l'arrière) est souvent recommandée après une césarienne car elle évite d'appuyer sur la cicatrice. La position allongée sur le côté est pratique la nuit. Ce qui compte : bébé est bien face au sein et la maman est bien installée.`,
      },
      {
        titre: 'Fréquence et durée',
        texte: `L'OMS recommande un allaitement à la demande, sans horaire imposé. Les premières semaines, bébé tète en général 8 à 12 fois par 24 heures. Il n'y a pas de durée fixe : certains bébés sont rassasiés en 10 minutes, d'autres prennent 40 minutes. Il est recommandé de laisser bébé finir un sein complètement avant de proposer l'autre, pour qu'il reçoive le lait de fin de tétée, plus riche en graisses.`,
      },
      {
        titre: 'La montée de lait',
        texte: `La montée de lait survient en général entre le 2e et le 4e jour après la naissance. Les seins deviennent chauds, lourds, parfois douloureux. C'est transitoire. Avant la montée de lait, bébé reçoit du colostrum, un liquide épais très riche en anticorps, exactement adapté à ses besoins. La quantité paraît faible mais est suffisante. Il ne faut pas compléter avec un biberon sauf avis médical explicite.`,
      },
      {
        titre: 'Ton rôle concret',
        texte: `Ton soutien a un impact direct sur la durée et la réussite de l'allaitement. Concrètement : apporte-lui à boire (elle perd beaucoup de liquide pendant les tétées), prends bébé entre les tétées pour qu'elle récupère, assure-toi qu'elle peut manger correctement, soutiens ses décisions sans pression extérieure. Si elle rencontre des difficultés, oriente-la vers une consultante en lactation certifiée IBCLC.`,
      },
    ],
    conseil: `La Leche League France propose un soutien gratuit par téléphone et des groupes locaux : retrouve les contacts sur lllfrance.org. Une consultation avec une IBCLC permet souvent de débloquer les difficultés d'allaitement.`,
  },
  {
    id: 'apaisement',
    titre: 'Apaiser bébé',
    sousTitre: 'Comprendre et répondre aux pleurs',
    couleur: '#1A3D5C',
    fond: '#E3EBF3',
    etapes: [
      {
        titre: "Vérifier les causes dans l'ordre",
        texte: `Quand bébé pleure, passe en revue les causes les plus fréquentes dans cet ordre : la faim (cause la plus courante), la couche souillée, la température (trop chaud ou trop froid), la douleur ou les coliques, le besoin de contact et de portage. Si aucune cause n'est identifiée, le portage, le bercement ou un bruit blanc doux aident souvent à apaiser un nourrisson.`,
      },
      {
        titre: 'Reconnaître les signaux de faim avant les pleurs',
        texte: `Les pleurs sont un signal tardif de faim. Avant d'en arriver là, bébé montre des signaux précoces : il tourne la tête d'un côté à l'autre (réflexe de fouissement), ouvre et ferme la bouche, porte ses mains à sa bouche. Répondre à ces signaux précoces rend la tétée plus facile et réduit le stress de bébé.`,
      },
      {
        titre: 'Les coliques du nourrisson',
        texte: `Les coliques touchent environ 20 % des nourrissons et se définissent par des pleurs intenses plus de 3 heures par jour, plus de 3 jours par semaine, pendant plus de 3 semaines. Elles débutent souvent vers 2 à 3 semaines et disparaissent spontanément vers 3 mois. Ce qui peut aider : le mouvement (bercer, se promener en portant bébé), la chaleur douce sur le ventre, le portage ventral, le bruit blanc. Aucun médicament n'a prouvé son efficacité.`,
      },
      {
        titre: 'Le bruit blanc',
        texte: `Le bruit blanc rappelle à bébé les sons entendus in utero. Il est efficace pour l'apaisement et pour faciliter l'endormissement. Garde un volume faible (50 dB maximum, l'équivalent d'une conversation à voix basse) et place l'appareil ou le téléphone à au moins 2 mètres de son lit, jamais contre son oreille. Si tu peux, coupe-le une fois qu'il est endormi.`,
      },
      {
        titre: 'Quand tu décroches toi-même',
        texte: `Les pleurs prolongés activent le système de stress chez l'adulte. Si tu sens que tu perds le contrôle, pose bébé en sécurité dans son lit sur le dos, sors de la pièce et prends 5 minutes pour te calmer. Revenir calme vaut toujours mieux que rester dans la pièce en se forçant. Ne jamais secouer un bébé : le syndrome du bébé secoué peut provoquer des lésions cérébrales graves ou le décès.`,
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
        texte: `L'emmaillotage reproduit la sensation de contention ressentie in utero. Il peut apaiser certains bébés agités et faciliter l'endormissement en réduisant le réflexe de Moro (sursaut). Ce n'est pas une technique universelle : certains bébés y réagissent bien, d'autres pas du tout. À utiliser uniquement les premières semaines, pas comme habitude à long terme.`,
      },
      {
        titre: 'Matériel et position de départ',
        texte: `Utilise un carré de mousseline fine de 120 × 120 cm minimum, posé en losange sur une surface plane. Rabats le coin supérieur d'environ 15 cm vers le centre. Pose bébé sur le dos, sa nuque sur le bord replié, les épaules légèrement en dessous du bord du tissu. Ses fesses doivent être au centre du tissu.`,
      },
      {
        titre: 'Envelopper les bras et le corps',
        texte: `Place le bras gauche de bébé le long de son corps. Prends le coin gauche du tissu, tire-le sur son épaule gauche en passant sur son bras, et glisse-le fermement sous son dos côté droit. Remonte ensuite le coin inférieur du tissu sur son ventre. Puis place le bras droit le long de son corps, tire le coin droit sur son épaule droite et glisse-le sous son dos côté gauche. Tu dois pouvoir glisser deux doigts entre le tissu et sa poitrine.`,
      },
      {
        titre: 'Les hanches : point critique de sécurité',
        texte: `Ne serre jamais les jambes de bébé ensemble dans l'emmaillotage. Les hanches doivent rester en position naturelle, légèrement fléchies et écartées comme celles d'une grenouille. Un emmaillotage trop serré dans les jambes augmente significativement le risque de dysplasie de hanche.`,
      },
      {
        titre: 'Quand arrêter',
        texte: `Arrête l'emmaillotage dès que bébé montre des signes de tentative de retournement, généralement vers 2 mois. Un bébé emmailloté qui se retourne sur le ventre ne peut pas se repositionner seul et risque l'étouffement. Bébé doit toujours dormir sur le dos.`,
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
        texte: `Si bébé tousse fort, il gère. La toux est le mécanisme naturel de défense des voies aériennes. N'interviens pas, encourage la toux en le maintenant assis ou légèrement penché en avant. Ne tape pas dans le dos pendant qu'il tousse efficacement, ne mets pas tes doigts dans sa bouche.`,
      },
      {
        titre: "Bébé s'étouffe et ne tousse plus ou ne crie plus",
        texte: `Si la toux devient inefficace ou que bébé ne fait plus de bruit, agis immédiatement et, si quelqu'un est avec toi, demande-lui d'appeler le 15. Couche bébé à plat ventre sur ton avant-bras, la tête plus basse que le corps, en tenant sa mâchoire entre ton pouce et tes doigts, sans appuyer sur sa gorge. Donne jusqu'à 5 tapes fermes entre les omoplates avec le talon de ta main. Si l'objet ne sort pas : retourne-le sur le dos, toujours la tête un peu plus basse, place 2 doigts au centre de la poitrine, juste sous la ligne des mamelons, et donne 5 compressions franches en enfonçant d'environ un tiers de l'épaisseur du thorax (environ 4 cm). Alterne 5 tapes dans le dos et 5 compressions thoraciques jusqu'à ce que l'objet soit expulsé ou que les secours arrivent. S'il perd connaissance, appelle le 15 si ce n'est pas déjà fait et commence la réanimation (étape suivante).`,
      },
      {
        titre: 'Bébé perd connaissance ou ne réagit plus',
        texte: `Stimule-le doucement : tapote la plante de ses pieds et appelle-le par son prénom à voix forte. S'il ne réagit pas, appelle le 15 immédiatement et mets le haut-parleur. Place sa tête en position neutre, menton légèrement relevé, et regarde s'il respire pendant 10 secondes au maximum. S'il respire normalement, place-le sur le côté en position latérale de sécurité. S'il ne respire pas ou respire de façon anormale, commence par 5 insufflations en couvrant sa bouche et son nez avec ta bouche. Enchaîne avec 30 compressions avec 2 doigts au centre de la poitrine, juste sous la ligne des mamelons, en enfonçant d'un tiers de l'épaisseur du thorax (environ 4 cm), à un rythme de 100 à 120 par minute. Puis alterne 2 insufflations et 30 compressions jusqu'à l'arrivée des secours. Si tu es seul sans téléphone, fais 1 minute de réanimation avant d'aller appeler.`,
      },
      {
        titre: 'Chute de hauteur',
        texte: `Ne bouge pas bébé si tu suspectes une blessure à la nuque ou à la colonne. Appelle le 15 immédiatement si : perte de connaissance même brève, vomissements répétés, pleurs inhabituels ou au contraire absence de pleurs, fontanelle bombée, convulsions, ou chute d'une hauteur supérieure à sa propre taille. Si bébé pleure immédiatement et semble normal, surveille-le attentivement pendant 24 heures. Avant 3 mois, ou s'il a une bosse importante, fais-le examiner par un médecin même s'il semble aller bien.`,
      },
      {
        titre: 'Fièvre du nourrisson',
        texte: `Avant 3 mois : toute température de 38 °C ou plus est une urgence médicale. Appelle le 15 ou rends-toi aux urgences pédiatriques sans attendre. Entre 3 et 6 mois : consulte ton médecin le jour même pour toute fièvre de 38 °C ou plus. Après 6 mois : surveille surtout son état général. Un enfant qui joue, boit et réagit normalement malgré la fièvre est rassurant. Avant 2 ans, consulte si la fièvre dure plus de 24 heures. À tout âge, appelle le 15 s'il a des taches rouges ou violacées qui ne s'effacent pas quand tu appuies dessus, s'il est anormalement somnolent ou difficile à réveiller, s'il respire mal, a les lèvres bleues ou fait une convulsion. Chez le nourrisson, la prise de température par voie rectale reste la plus fiable.`,
      },
    ],
    conseil: `La formation PSC1 (7 heures) inclut les gestes sur le nourrisson, et des initiations aux premiers secours enfants et nourrissons existent aussi. Ces formations peuvent sauver une vie. Renseigne-toi auprès de ta maternité, de la Croix-Rouge ou de la Protection Civile. Certaines maternités proposent ces formations aux futurs pères pendant la grossesse.`,
  },
];

export default function AtelierBebe({C: propC}: any) {
  const [atelierActif, setAtelierActif] = useState('change');
  const [etapeOuverte, setEtapeOuverte] = useState<number | null>(0);

  const atelier = ATELIERS.find(a => a.id === atelierActif) || ATELIERS[0];

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'20px', fontFamily:'inherit'}}>

      <div style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)', borderRadius:'20px', padding:'22px 24px'}}>
        <p style={{color:'rgba(200,220,240,0.5)', fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase' as const, margin:'0 0 6px'}}>Atelier pratique</p>
        <p style={{color:'#fff', fontSize:'20px', fontWeight:800, margin:'0 0 4px'}}>Les gestes qui comptent</p>
      </div>

      <div style={{display:'flex', gap:'7px', overflowX:'auto' as const, paddingBottom:'2px'}}>
        {ATELIERS.map(a => (
          <button key={a.id} onClick={() => { setAtelierActif(a.id); setEtapeOuverte(0); }} style={{
            flexShrink:0, minHeight:'44px', padding:'10px 18px', border:'none', borderRadius:'24px', cursor:'pointer',
            fontSize:'14px', fontWeight:800,
            background: atelierActif === a.id ? 'linear-gradient(135deg,#0a1f32,#1A3D5C)' : '#ffffff',
            color: atelierActif === a.id ? '#fff' : '#15263A',
            boxShadow: atelierActif === a.id ? '0 4px 16px rgba(26,61,92,0.25)' : '0 1px 4px rgba(0,0,0,0.08)',
          }}>
            {a.titre}
          </button>
        ))}
      </div>

      <div style={{background:'#DCE5D7', border:'1px solid #C9D8C4', borderRadius:'20px', padding:'18px 20px'}}>
        <p style={{color:'#15263A', fontSize:'18px', fontWeight:800, margin:'0 0 4px'}}>{atelier.titre}</p>
        <p style={{color:'#2F4F3E', fontSize:'14px', fontWeight:600, margin:0}}>{atelier.sousTitre}</p>
      </div>

      {atelier.alerte && (
        <div style={{background:'#F8E9DF', border:'1px solid #F2DACB', borderRadius:'16px', padding:'14px 16px', display:'flex', gap:'12px', alignItems:'flex-start'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B4593A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink:0, marginTop:'1px'}}><path d="M12 3l9 16H3zM12 10v4M12 17h.01" /></svg>
          <p style={{color:'#8a3d22', fontSize:'14px', fontWeight:700, margin:0, lineHeight:1.6}}>{atelier.alerte}</p>
        </div>
      )}

      <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
        {atelier.etapes.map((etape, idx) => {
          const ouvert = etapeOuverte === idx;
          return (
            <div key={idx} style={{borderRadius:'18px', border:'1px solid #E6E0D5', overflow:'hidden', background:'#fff', boxShadow:'0 6px 20px rgba(21,38,58,0.05)'}}>
              <button
                onClick={() => setEtapeOuverte(ouvert ? null : idx)}
                style={{width:'100%', minHeight:'56px', display:'flex', alignItems:'center', gap:'12px', padding:'13px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const}}
              >
                <span style={{
                  width:'28px', height:'28px', borderRadius:'9px', flexShrink:0,
                  background: ouvert ? 'linear-gradient(160deg,#0c1d2e,#1A3D5C)' : '#EEF1EC',
                  color: ouvert ? '#fff' : '#2F4F3E',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'11px', fontWeight:800,
                }}>{idx + 1}</span>
                <span style={{color:'#15263A', fontSize:'15px', fontWeight:800, flex:1, lineHeight:1.3}}>{etape.titre}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3D5C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{flexShrink:0, transform: ouvert ? 'rotate(180deg)' : 'none', transition:'transform .2s'}}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {ouvert && (
                <div style={{padding:'0 16px 16px 56px'}}>
                  <p style={{color:'#15263A', fontSize:'14px', lineHeight:1.75, margin:0}}>{etape.texte}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {atelier.conseil && (
        <div style={{background:'linear-gradient(160deg,#0c1d2e,#1A3D5C 70%,#24507a)', borderRadius:'20px', padding:'18px 20px'}}>
          <p style={{color:'#C9D8C4', fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' as const, margin:'0 0 7px'}}>À retenir</p>
          <p style={{color:'#fff', fontSize:'14px', lineHeight:1.7, margin:0}}>{atelier.conseil}</p>
        </div>
      )}

    </div>
  );
}
