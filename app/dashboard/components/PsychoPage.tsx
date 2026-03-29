'use client';
import { useState } from 'react';

const C = {
  dark:'#1e2535', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#c8a060',
  white:'#ffffff', border:'#f0ede8', muted:'#9aa0a8',
  green:'#E4F5EC', orange:'#FFF0E6', amber:'#FFF7E0',
  coral:'#FDECEA', teal:'#E0F5F0', blueLight:'#E6F0FA',
};

type Semaine = {
  sa: number;
  theme: 'peur' | 'couple' | 'lien' | 'role';
  emoji: string;
  titre: string;
  contenu: string;
  source?: string;
};

const THEMES = [
  { id:'tous',   label:'Toutes les semaines' },
  { id:'peur',   label:'💭 Émotions & peurs',    color:'#FFF0E6', tc:'#C04A1A' },
  { id:'couple', label:'❤️ Vie de couple',        color:'#E4F5EC', tc:'#0D6B40' },
  { id:'lien',   label:'👶 Lien avec bébé',       color:'#E6F0FA', tc:'#1A4A7A' },
  { id:'role',   label:'🙌 Rôle actif',           color:'#FFF7E0', tc:'#8A6010' },
];

const THEME_COLORS: Record<string,{bg:string;tc:string}> = {
  peur:   { bg:'#FFF0E6', tc:'#C04A1A' },
  couple: { bg:'#E4F5EC', tc:'#0D6B40' },
  lien:   { bg:'#E6F0FA', tc:'#1A4A7A' },
  role:   { bg:'#FFF7E0', tc:'#8A6010' },
};

const SEMAINES: Semaine[] = [
  { sa:3,  theme:'peur',   emoji:'😮', titre:"Le test est positif. Et là, tout s'emballe.",
    contenu:`C'est normal de ressentir un mélange de joie et de peur. Les études montrent que plus de 80% des futurs pères vivent un "choc initial" à l'annonce. Ce n'est pas un manque d'amour. C'est de l'humanité.`,
    source:"Genesoni & Tallandini, 2009" },
  { sa:4,  theme:'couple', emoji:'💬', titre:"Parler d'abord entre vous, avant tout le monde.",
    contenu:`Avant d'annoncer la grossesse à votre entourage, prenez le temps de la vivre à deux. Cette période de secret crée une intimité unique. Ce moment ne reviendra plus. Profitez-en.`,
    source:"Plantin et al., 2011" },
  { sa:5,  theme:'peur',   emoji:'😟', titre:"Tu n'es pas seul à avoir des symptômes.",
    contenu:`Le syndrome de couvade existe. Environ 25 à 50% des pères ressentent des nausées, des douleurs ou de la fatigue pendant la grossesse de leur partenaire. C'est psychosomatique et réel. Ton corps reconnaît la grossesse à sa façon.`,
    source:"Brennan et al., 2007 - Syndrome de couvade" },
  { sa:6,  theme:'role',   emoji:'🍽️', titre:"La cuisine, c'est ton terrain ce trimestre.",
    contenu:`Les nausées de ta partenaire peuvent être intenses. Prends en charge la préparation des repas sans attendre qu'elle demande. Pas besoin d'être chef : des repas simples, sans odeurs fortes. Ce geste concret vaut mieux que tous les mots.`,
    source:"Santé Publique France - Grossesse et rôle du conjoint" },
  { sa:7,  theme:'couple', emoji:'🎧', titre:"Écouter sans chercher à résoudre.",
    contenu:`Elle a besoin que tu l'entendes, pas que tu fixes les problèmes. Quand elle parle de ses peurs ou de son inconfort, résiste à l'envie de proposer des solutions. Dis simplement : "Je t'entends. C'est difficile." Ça suffit souvent.`,
    source:"Gottman & Gottman, 2007 - Et baby makes three" },
  { sa:8,  theme:'peur',   emoji:'💭', titre:"Il est normal de douter d'être à la hauteur.",
    contenu:`La peur de ne pas être un bon père touche presque tous les futurs papas. Cette peur n'est pas un signal d'alarme. C'est un signe que tu prends ton rôle au sérieux. Les pères qui doutent s'impliquent plus, selon les recherches.`,
    source:"Deave & Johnson, 2008" },
  { sa:9,  theme:'lien',   emoji:'👂', titre:"Ta voix grave arrive déjà jusqu'à bébé.",
    contenu:`À 9 SA, l'oreille interne de bébé commence à se former. Les sons graves traversent mieux le liquide amniotique. Ta voix est donc l'une des premières qu'il entendra. Parle-lui le soir, même si tu te sens ridicule au début.`,
    source:"Granier-Deferre et al., 2011 - Perception auditive foetale" },
  { sa:10, theme:'role',   emoji:'🔬', titre:"L'échographie T1 : sois là, vraiment là.",
    contenu:`Voir le cœur battre pour la première fois est souvent le moment où la paternité devient réelle pour les pères. Beaucoup décrivent ce rendez-vous comme un tournant émotionnel. Pose une demi-journée. Téléphone en mode silencieux.`,
    source:"Draper, 2002 - Fatherhood and ultrasound" },
  { sa:11, theme:'couple', emoji:'❤️', titre:"Ton regard sur elle compte énormément.",
    contenu:`Son corps change. Elle peut se sentir moins attirante ou moins à l'aise. Un compliment sincère, un geste de tendresse régulier, regarder son ventre avec fierté : ces petits signes lui rappellent que tu es là et que tu l'aimes telle qu'elle est.`,
    source:"Darvill et al., 2010 - Expérience émotionnelle de la grossesse" },
  { sa:12, theme:'peur',   emoji:'🛡️', titre:"Après 12 SA, le risque de fausse couche chute fortement.",
    contenu:`Passer ce cap est souvent un grand soulagement. Si tu as vécu des semaines d'inquiétude silencieuse, c'est normal. Beaucoup de pères portent ces angoisses seuls pour "protéger" leur partenaire. Tu peux souffler un peu maintenant.`,
    source:"Franche, 2001 - Anxiété paternelle en grossesse" },
  { sa:13, theme:'couple', emoji:'🌿', titre:"Le 2e trimestre, c'est souvent le meilleur moment du couple.",
    contenu:`Les nausées disparaissent, l'énergie revient, la libido aussi souvent. Profitez-en pour vous retrouver en tant que couple avant la naissance. Un dîner, une sortie, un voyage court. Ces moments renforcent votre base commune.`,
    source:"Paulson & Bazemore, 2010" },
  { sa:14, theme:'lien',   emoji:'🎵', titre:"La musique que tu écoutes, bébé l'entend.",
    contenu:`Bébé commence à percevoir les sons extérieurs. Mettre de la musique douce près du ventre, ou chanter (peu importe si tu n'es pas chanteur), crée des souvenirs sonores que bébé pourra reconnaître après la naissance.`,
    source:"Hepper, 1991 - Familiarité musicale chez le foetus" },
  { sa:15, theme:'role',   emoji:'📚', titre:"Commence à lire, maintenant.",
    contenu:`Les pères qui se forment pendant la grossesse, même un peu, se sentent beaucoup plus confiants à la naissance. Pas besoin de lire un traité médical : quelques articles, une appli, des discussions avec d'autres papas. L'info, ça rassure.`,
    source:"Deave et al., 2008 - Préparation paternelle" },
  { sa:16, theme:'peur',   emoji:'💸', titre:"L'angoisse financière est universelle.",
    contenu:`La peur de ne pas avoir assez d'argent est l'une des plus répandues chez les futurs pères. Plutôt que de rester seul avec cette peur, parlez-en ensemble. Établir un budget, même approximatif, réduit considérablement le stress.`,
    source:"Condon et al., 2004 - Expérience paternelle de la grossesse" },
  { sa:17, theme:'lien',   emoji:'🤲', titre:"Pose ta main sur son ventre ce soir.",
    contenu:`Le contact physique avec le ventre de ta partenaire renforce le lien émotionnel avec bébé pour les deux parents. Ce geste quotidien n'est pas anodin : il t'ancre dans la réalité de la grossesse et prépare le terrain pour le peau à peau après la naissance.`,
    source:"Brandon et al., 2009 - Attachement paternel prénatal" },
  { sa:18, theme:'couple', emoji:'🛀', titre:"Propose un massage sans attendre.",
    contenu:`Le dos de ta partenaire souffre de plus en plus. Un massage de quelques minutes chaque soir est un geste de soin concret qui renforce votre connexion physique. Tu n'as pas besoin d'être expert. Quelques minutes de pression douce suffisent.`,
    source:"Field et al., 1999 - Massage pendant la grossesse" },
  { sa:19, theme:'peur',   emoji:'🪴', titre:"Ta vie ne va pas s'arrêter. Elle va changer.",
    contenu:`Beaucoup de pères vivent un deuil silencieux de leur liberté avant la naissance. Ce sentiment est normal et même sain. Reconnaître que ta vie va changer, sans la fuir, te permet de t'y préparer et d'y entrer sereinement.`,
    source:"Draper, 2003 - Transition vers la paternité" },
  { sa:20, theme:'role',   emoji:'🔍', titre:"L'échographie T2 : posez vos questions.",
    contenu:`C'est le rendez-vous médical le plus complet de la grossesse. Prépare des questions en amont, avec elle. Vouloir comprendre ce qu'il se passe médicalement, c'est une forme d'implication paternelle que les sages-femmes et médecins apprécient.`,
    source:"Ekelin et al., 2004 - Expérience de l'échographie morphologique" },
  { sa:21, theme:'lien',   emoji:'👋', titre:"Bébé te reconnaît déjà.",
    contenu:`Les recherches montrent que les nouveau-nés préfèrent les voix entendues régulièrement in utero. Si tu parles à bébé maintenant plusieurs fois par semaine, il tournera la tête vers ta voix dès les premières heures après la naissance.`,
    source:"DeCasper & Fifer, 1980 - Préférence vocale néonatale" },
  { sa:22, theme:'couple', emoji:'🗺️', titre:"Planifier ensemble réduit le stress de moitié.",
    contenu:`Parler du projet de naissance, du congé paternité, de l'organisation à la maison : ces conversations peuvent sembler trop pratiques. Mais les couples qui planifient ensemble vivent mieux la transition vers la parentalité.`,
    source:"Fägerskiöld, 2008 - Attentes paternelles" },
  { sa:23, theme:'peur',   emoji:'😴', titre:"Si tu n'arrives pas à dormir, c'est normal.",
    contenu:`L'insomnie prénominale touche aussi les pères : inquiétudes, scénarios catastrophes nocturnes, hypervigilance. Ce n'est pas de la faiblesse. C'est ton cerveau qui se prépare à protéger. Accorde-toi du repos consciemment.`,
    source:"Condon et al., 2004" },
  { sa:24, theme:'role',   emoji:'🏥', titre:"Visite la maternité avant le jour J.",
    contenu:`Connaître les lieux avant l'accouchement réduit significativement l'anxiété des deux parents ce jour-là. Repère l'entrée des urgences, le parking, l'ascenseur. Ce repérage concret te transforme de spectateur en acteur.`,
    source:"Santé Publique France - Préparation à la naissance" },
  { sa:25, theme:'couple', emoji:'🌙', titre:"Elle peut se lever la nuit sans que tu le saches.",
    contenu:`L'insomnie de fin de grossesse est fréquente. Si tu sens qu'elle est réveillée à 3h du matin, lève-toi avec elle. Pas besoin de parler. Juste être là. Ces moments de solidarité nocturne créent une connexion profonde.`,
    source:"Darvill et al., 2010" },
  { sa:26, theme:'lien',   emoji:'📖', titre:"Lis à voix haute le soir.",
    contenu:`Bébé mémorise les sons entendus régulièrement in utero. Lire à voix haute 10 minutes le soir, n'importe quoi, expose bébé à ta voix de façon régulière et rassurante. Après la naissance, ta lecture l'apaisera naturellement.`,
    source:"Logan, 2019 - Lecture parentale et développement" },
  { sa:27, theme:'peur',   emoji:'🏋️', titre:"La peur de l'accouchement est aussi la tienne.",
    contenu:`Les pères aussi ont peur de l'accouchement : peur de paniquer, de ne pas être à la hauteur, de voir leur partenaire souffrir. Cette peur ne disparaîtra pas seule. Se former, visualiser, en parler : c'est la seule façon de la dompter.`,
    source:"Longworth & Kingdon, 2011 - Pères en salle de naissance" },
  { sa:28, theme:'role',   emoji:'🎒', titre:"La valise n'est pas son problème. C'est le vôtre.",
    contenu:`Prendre l'initiative de préparer la valise de maternité sans attendre qu'elle le demande est un signal fort. C'est lui dire : "J'y pense autant que toi. Je suis là." Les gestes concrets parlent plus que les mots pendant la grossesse.`,
    source:"Fägerskiöld, 2008" },
  { sa:29, theme:'couple', emoji:'🎓', titre:"Les cours de préparation changent vraiment les choses.",
    contenu:`Les pères qui assistent aux cours de préparation à la naissance se sentent beaucoup plus impliqués et moins anxieux. Si des cours spécifiques aux pères existent dans votre maternité, c'est le moment de s'inscrire. Poser des questions n'est pas une faiblesse.`,
    source:"Svensson et al., 2009 - Préparation paternelle à la naissance" },
  { sa:30, theme:'peur',   emoji:'🧘', titre:"L'anxiété du 3e trimestre est normale.",
    contenu:`Le 3e trimestre est souvent le moment où l'anxiété des pères culmine. Le moment devient réel, la date approche. Ce pic d'anxiété est documenté et normal. Ce qui aide : agir. Chaque préparation concrète réduit le niveau de stress.`,
    source:"Condon et al., 2004 - Anxiété paternelle T3" },
  { sa:31, theme:'lien',   emoji:'💫', titre:"Visualise-toi avec ton bébé.",
    contenu:`Les recherches sur le lien paternel montrent que se projeter mentalement avec bébé avant la naissance renforce l'attachement après. Imagine-toi lui donner le bain, le tenir, lui parler. Ce n'est pas de la naïveté. C'est de la préparation mentale.`,
    source:"Brandon et al., 2009 - Représentation mentale prénatale" },
  { sa:32, theme:'couple', emoji:'🤝', titre:"Préparez ensemble le plan de naissance.",
    contenu:`Le plan de naissance est un document qui exprime vos souhaits à l'équipe médicale. Le rédiger ensemble oblige à se parler de choses importantes : péridurale, peau à peau, couper le cordon. Ce dialogue renforce la confiance mutuelle.`,
    source:"Santé Publique France - Plan de naissance" },
  { sa:33, theme:'role',   emoji:'🛡️', titre:"Protège son espace mental ces dernières semaines.",
    contenu:`L'entourage peut devenir envahissant en fin de grossesse. Prendre en charge les messages, filtrer les visites non souhaitées, gérer les "alors, c'est pour bientôt ?" : c'est un rôle discret mais essentiel. Elle ne devrait pas avoir à gérer ça.`,
    source:"Darvill et al., 2010" },
  { sa:34, theme:'peur',   emoji:'🎯', titre:"Tu n'auras pas à tout gérer seul ce jour-là.",
    contenu:`Beaucoup de pères s'inquiètent de ne pas savoir quoi faire pendant l'accouchement. Rappelle-toi : il y a une équipe médicale. Ton rôle n'est pas médical. C'est d'être là, de tenir la main, de rester calme. C'est suffisant. C'est essentiel.`,
    source:"Longworth & Kingdon, 2011" },
  { sa:35, theme:'lien',   emoji:'🌟', titre:"Bébé réagit à tes mains sur le ventre.",
    contenu:`À 35 SA, bébé perçoit clairement les pressions sur le ventre. Certains bébés donnent des coups en réponse aux pressions douces. Ce dialogue tactile est une forme de communication réelle. Profites-en : c'est l'une des dernières semaines avant la naissance.`,
    source:"Kisilevsky et al., 2003 - Réactivité foetale" },
  { sa:36, theme:'couple', emoji:'🕯️', titre:"Créez un souvenir de la fin de grossesse.",
    contenu:`Une photo de ventre, un dîner en amoureux, une soirée film : ces moments simples sont des souvenirs précieux. Dans quelques semaines, votre vie sera transformée. Ces derniers instants à deux méritent d'être marqués consciemment.`,
    source:"Plantin et al., 2011 - Expérience paternelle de fin de grossesse" },
  { sa:37, theme:'peur',   emoji:'⚡', titre:"L'hypervigilance de fin de grossesse est normale.",
    contenu:`Téléphone chargé en permanence, oreille aux aguets la nuit, vérifications répétées : cette hypervigilance de fin de grossesse touche presque tous les futurs pères. C'est ton instinct de protection qui s'active. Ne te bats pas contre lui.`,
    source:"Condon et al., 2004" },
  { sa:38, theme:'role',   emoji:'🌅', titre:"Tu es prêt, même si tu ne te sens pas prêt.",
    contenu:`Aucun père ne se sent vraiment prêt la veille de la naissance. Ce sentiment est universel. La vérité, c'est que la préparation que tu as faite, la présence que tu as eue ces 9 mois, t'ont déjà transformé. Tu es père. Ça a commencé bien avant le premier cri.`,
    source:"Deave & Johnson, 2008 - Transition vers la paternité" },
  { sa:39, theme:'couple', emoji:'🌅', titre:"Ces derniers jours à deux. Gravez-les.",
    contenu:`L'attente des derniers jours peut être épuisante pour vous deux. Plutôt que de la subir, choisissez de la vivre. Un film, une balade, un repas ensemble. Dans quelques jours, vous ne serez plus deux. Vous serez trois. C'est immense.`,
    source:"Plantin et al., 2011" },
  { sa:40, theme:'role',   emoji:'💪', titre:"Tu n'as pas à être parfait. Tu dois être là.",
    contenu:`Le jour J, ton rôle n'est pas médical. Tu n'as pas à tout savoir, tout contrôler, tout gérer. Tu dois être présent, stable, et lui tenir la main. Les pères qui restent calmes pendant l'accouchement aident physiquement leur partenaire à mieux gérer la douleur.`,
    source:"Longworth & Kingdon, 2011 - Rôle paternel en salle de naissance" },
];

export default function PsychoPage({C: propC}:any) {
  const [vue, setVue] = useState<'semaines'|'themes'>('semaines');
  const [themeActif, setThemeActif] = useState<string>('tous');
  const [ouvert, setOuvert] = useState<number|null>(null);

  const filtered = themeActif === 'tous'
    ? SEMAINES
    : SEMAINES.filter(s => s.theme === themeActif);

  const progression = Math.round((SEMAINES.length / 38) * 100);

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'28px',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      {/* INTRO */}
      <div style={{background:C.blueDark,borderRadius:'24px',padding:'28px 30px'}}>
        <p style={{color:'rgba(200,220,240,0.65)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Psychologie</p>
        <h2 style={{color:C.white,fontSize:'22px',fontWeight:800,margin:'0 0 10px',lineHeight:1.3}}>Papa, c'est normal de douter.</h2>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',lineHeight:1.7,margin:0}}>38 semaines, 38 informations vérifiées pour te guider. Une par une, à ton rythme.</p>
      </div>

      {/* NAVIGATION */}
      <div style={{display:'flex',gap:'8px'}}>
        {([
          {id:'semaines', label:'📅 Par semaine'},
          {id:'themes',   label:'🔖 Par thème'},
        ] as const).map(v => (
          <button key={v.id} onClick={()=>setVue(v.id)} style={{
            flex:1,padding:'11px',border:'none',borderRadius:'14px',cursor:'pointer',
            fontSize:'14px',fontWeight:700,
            background:vue===v.id?C.dark:'#f7f5f0',
            color:vue===v.id?C.white:C.dark,
          }}>{v.label}</button>
        ))}
      </div>

      {/* FILTRE PAR THÈME */}
      {vue === 'themes' && (
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap' as const}}>
          {THEMES.map(t => (
            <button key={t.id} onClick={()=>setThemeActif(t.id)} style={{
              padding:'8px 14px',border:'none',borderRadius:'20px',cursor:'pointer',
              fontSize:'12px',fontWeight:700,
              background:themeActif===t.id?C.dark:(t as any).color||'#f7f5f0',
              color:themeActif===t.id?C.white:(t as any).tc||C.dark,
            }}>{t.label}</button>
          ))}
        </div>
      )}

      {/* PROGRESSION */}
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <div style={{flex:1,background:'#f0ede8',borderRadius:'4px',height:'4px'}}>
          <div style={{background:C.blue,height:'4px',borderRadius:'4px',width:progression+'%'}}/>
        </div>
        <span style={{fontSize:'12px',fontWeight:700,color:C.blue,flexShrink:0}}>{filtered.length} semaines</span>
      </div>

      {/* CARTES */}
      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        {filtered.map((s, idx) => {
          const tc = THEME_COLORS[s.theme];
          const isOpen = ouvert === s.sa;
          return (
            <button
              key={s.sa}
              onClick={() => setOuvert(isOpen ? null : s.sa)}
              style={{
                background:isOpen ? tc.bg : C.white,
                border:`1px solid ${isOpen ? 'transparent' : C.border}`,
                borderRadius:'18px',padding:'18px 20px',
                cursor:'pointer',textAlign:'left' as const,width:'100%',
                transition:'all 0.2s',
              }}
            >
              <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{
                  width:'42px',height:'42px',borderRadius:'14px',flexShrink:0,
                  background:isOpen?'rgba(255,255,255,0.7)':tc.bg,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'20px',
                }}>
                  {s.emoji}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{
                    color:tc.tc,fontSize:'10px',fontWeight:700,
                    letterSpacing:'1.5px',textTransform:'uppercase' as const,margin:'0 0 3px'
                  }}>SA {s.sa}</p>
                  <p style={{
                    color:C.dark,fontSize:'14px',fontWeight:700,
                    margin:0,lineHeight:1.4,
                  }}>{s.titre}</p>
                </div>
                <span style={{color:C.muted,fontSize:'16px',flexShrink:0,transform:isOpen?'rotate(180deg)':'rotate(0deg)',transition:'transform 0.2s'}}>▾</span>
              </div>

              {isOpen && (
                <div style={{marginTop:'16px',paddingTop:'16px',borderTop:`1px solid rgba(0,0,0,0.06)`}}>
                  <p style={{color:C.dark,fontSize:'14px',lineHeight:1.75,margin:'0 0 10px'}}>{s.contenu}</p>
                  {s.source && (
                    <p style={{color:C.muted,fontSize:'11px',margin:0,fontStyle:'italic'}}>Source : {s.source}</p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* SOURCES */}
      <div style={{background:'#f7f5f0',borderRadius:'18px',padding:'20px 22px'}}>
        <p style={{color:C.muted,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Sources</p>
        <p style={{color:C.muted,fontSize:'12px',lineHeight:1.7,margin:0}}>
          Genesoni & Tallandini (2009), Brennan et al. (2007), Gottman & Gottman (2007), Draper (2002, 2003), Deave & Johnson (2008), Condon et al. (2004), DeCasper & Fifer (1980), Brandon et al. (2009), Longworth & Kingdon (2011), Paulson & Bazemore (2010), Santé Publique France. Toutes les informations sont à titre informatif et ne remplacent pas un avis professionnel.
        </p>
      </div>

      {/* CTA */}
      <div style={{background:C.dark,borderRadius:'20px',padding:'24px',textAlign:'center' as const}}>
        <p style={{color:C.gold,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Tu traverses quelque chose de difficile ?</p>
        <p style={{color:C.white,fontSize:'15px',fontWeight:700,margin:'0 0 6px'}}>Parler à un professionnel aide vraiment.</p>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',margin:'0 0 16px'}}>Un psychologue périnatal accompagne les futurs pères. C'est fait pour ça.</p>
        <a
          href="https://www.reseau-perinatalite.fr"
          target="_blank"
          rel="noopener noreferrer"
          style={{display:'inline-block',background:C.gold,color:'#1c1510',padding:'12px 24px',borderRadius:'32px',fontSize:'14px',fontWeight:800,textDecoration:'none'}}
        >
          Trouver un soutien près de chez moi
        </a>
      </div>

    </div>
  );
}
