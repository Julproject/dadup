import type { MoisData } from './types';

export function getIdee(mois:number):string {
  const idees = [
    "Planifie la première échographie ensemble et réserve la demi-journée.",
    "Prépare un dîner romantique à la maison, un soir de semaine.",
    "Commande le coussin de grossesse dont elle a besoin pour dormir.",
    "Visite la maternité ensemble et repère les accès.",
    "Prépare un album photo numérique de la grossesse.",
    "Organise une soirée film à la maison, juste vous deux.",
    "Finalise la chambre de bébé ensemble.",
    "Propose un week-end ou une sortie avant l'arrivée de bébé.",
    "Prépare des repas à l'avance pour les premiers jours après la naissance.",
  ];
  return idees[Math.min(mois-1, idees.length-1)] || idees[0];
}

export const MOIS_DATA: Record<number,{
  titre:string; intro:string;
  developpement:{titre:string;contenu:string}[];
  sante:{titre:string;contenu:string}[];
  papa:{titre:string;contenu:string}[];
  rdv:string; vaccins:string; alerte:string;
}> = {
  0:{
    titre:'1er mois',
    intro:"Les premières semaines sont une période d'adaptation intense. Bébé découvre le monde, et vous découvrez votre rôle de parents.",
    developpement:[
      {titre:'Vision',contenu:"Bébé voit à 20-30 cm, la distance parfaite pour voir ton visage pendant la tétée. Il est attiré par les contrastes forts et les visages humains. Source : HAS 2023."},
      {titre:'Sommeil',contenu:"14 à 17h par 24h en cycles de 2 à 3h. Le sommeil paradoxal représente 50% de son temps, essentiel pour le développement cérébral. Source : Académie américaine de pédiatrie."},
      {titre:'Réflexes primitifs',contenu:"Réflexe de Moro (sursaut), grasping (prise), succion, marche automatique. Tous normaux et signe d'un système nerveux sain. Ils disparaissent vers 3 à 4 mois. Source : Larimer 2021."},
    ],
    sante:[
      {titre:'Allaitement',contenu:"8 à 12 tétées par 24h est normal. La montée de lait survient J2-J4. Une bonne prise du sein : bouche grande ouverte, lèvres retroussées, menton contre le sein. Source : OMS."},
      {titre:'Cordon ombilical',contenu:"Nettoyer avec du sérum physiologique 1x/jour. Il tombe naturellement entre J7 et J21. Ne pas couvrir, ne pas tirer. Consulter si rougeur autour du cordon. Source : HAS."},
      {titre:'Poids',contenu:"Perte de poids physiologique normale jusqu'à 10% du poids de naissance dans les premiers jours. Récupération du poids de naissance attendue avant J10-J14. Source : HAS 2022."},
    ],
    papa:[
      {titre:'Le peau à peau',contenu:"30 min de peau à peau par jour avec toi régule la température de bébé, stabilise son rythme cardiaque et renforce votre lien. Les études montrent une réduction du stress pour les deux. Source : Moore 2016."},
      {titre:'Les nuits',contenu:"Organise-vous en roulements. Prends le relais certaines nuits pour que ta partenaire récupère. La privation de sommeil post-partum est le premier facteur de dépression post-natale."},
      {titre:'Baby blues',contenu:"50 à 80% des femmes vivent un baby blues J3-J5 (larmes, émotions intenses, fatigue). C'est hormonal, normal, et passe en quelques jours. Si ça dure plus de 2 semaines, consulter. Source : CNGOF."},
    ],
    rdv:"Examen J8 obligatoire par le médecin. Examen du 1er mois entre J28 et J32.",
    vaccins:"BCG si indiqué. Pas de vaccin obligatoire avant 2 mois.",
    alerte:"Température supérieure à 38°C avant 3 mois : urgences pédiatriques sans attendre. Refus de s'alimenter sur 2 tétées consécutives. Fontanelle bombée. Difficultés respiratoires : appeler le 15.",
  },
  1:{
    titre:'2e mois',
    intro:"Le premier vrai sourire apparaît, un sourire social intentionnel. C'est le début de la communication.",
    developpement:[
      {titre:'Le sourire social',contenu:"Vers 6 semaines, bébé sourit en réponse à ton visage et ta voix. Ce n'est plus un réflexe mais une communication intentionnelle. C'est une étape majeure du développement socio-émotionnel. Source : Brazelton 2006."},
      {titre:'Motricité',contenu:"Bébé tient sa tête quelques secondes en position ventrale. Il suit des yeux un objet qui se déplace lentement. Ses mouvements deviennent plus coordonnés. Source : Denver II."},
      {titre:'Vocalises',contenu:"Premiers sons voyelles. Bébé expérimente sa voix. Il réagit aux voix familières en tournant la tête. C'est le début du langage. Source : Locke 1993."},
    ],
    sante:[
      {titre:'Coliques du nourrisson',contenu:"Pleurs intenses plus de 3h/jour, plus de 3j/semaine, plus de 3 semaines. Touchent 20% des bébés. Cause inconnue, disparaissent spontanément vers 3 mois. Source : HAS 2021."},
      {titre:'Régurgitations',contenu:"Normales si bébé grossit bien et n'a pas l'air douloureux. Signe de RGO pathologique : pleurs pendant la tétée, refus de manger, mauvaise prise de poids. Source : ESPGHAN 2018."},
    ],
    papa:[
      {titre:'Parle-lui',contenu:"Parle-lui face à face en exagérant tes expressions. Les études IRM montrent que le cerveau de bébé synchronise son activité avec celle du parent qui lui parle. Source : Harvard CDC."},
      {titre:'Dépression post-partum paternelle',contenu:"10% des pères développent une dépression post-partum dans les 3 à 6 premiers mois. Symptômes : irritabilité, retrait, anxiété excessive. En parler à un médecin est un signe de force. Source : Paulson 2010."},
    ],
    rdv:"Examen du 2e mois. Début du carnet de vaccination.",
    vaccins:"DTCaP-Hib-HepB (Hexavalent) : 1ère dose. Méningocoque B : 1ère dose. Rotavirus : 1ère dose (oral). Source : Calendrier vaccinal 2024.",
    alerte:"Absence de sourire à 2 mois. Absence de réaction aux sons. Hypotonie majeure (bébé mou). Perte de poids.",
  },
  2:{
    titre:'3e mois',
    intro:"Bébé devient un vrai partenaire d'échange. Les coliques s'estompent, les nuits commencent à s'allonger.",
    developpement:[
      {titre:'Interaction sociale',contenu:"Bébé rit aux éclats pour la première fois. Il reconnaît ses parents à la vue. Il cherche activement le contact visuel et répond dans une conversation. Source : Tronick 1978."},
      {titre:'Motricité',contenu:"Tient bien sa tête. En position ventrale, se soulève sur les avant-bras. Ouvre et ferme les mains intentionnellement. Commence à attraper ce qu'on lui tend. Source : Denver II."},
      {titre:'Sommeil',contenu:"Les nuits s'allongent progressivement. 4 à 6h de sommeil continu est possible. Le rythme circadien commence à se mettre en place. Source : Touchette 2005."},
    ],
    sante:[
      {titre:'Diversification',contenu:"Pas encore. La diversification alimentaire ne commence pas avant 4 mois révolus. Le lait maternel ou infantile couvre tous les besoins. Source : OMS / HAS."},
      {titre:'Position de sommeil',contenu:"Toujours sur le dos, dans son propre espace de sommeil, sans tour de lit, sans oreiller, sans couette. Recommandation HAS pour prévenir la mort inattendue du nourrisson. Source : HAS 2020."},
    ],
    papa:[
      {titre:'Le jeu',contenu:"Montre-lui des objets colorés, fais des bulles, lis des livres cartonnés. Le jeu n'est pas un luxe, c'est le moteur principal du développement cognitif et émotionnel. Source : Ginsburg 2007."},
      {titre:'Le congé paternité',contenu:"Si pas encore utilisé, le prendre maintenant pour établir votre lien avant la reprise du travail. Les études montrent que l'implication précoce du père prédit un meilleur développement de l'enfant à 5 ans. Source : Tanaka 2005."},
    ],
    rdv:"Pas de rendez-vous obligatoire ce mois. Surveiller le développement.",
    vaccins:"DTCaP-Hib-HepB : 2e dose. Méningocoque B : 2e dose. Rotavirus : 2e dose. Pneumocoque : 1ère dose. Source : Calendrier vaccinal 2024.",
    alerte:"Absence de rires. Absence de suivi visuel. Pas de réaction aux sons forts. Rigidité ou hypotonie des membres.",
  },
  3:{
    titre:'4e mois',
    intro:"Bébé explore activement le monde. Ses mains deviennent ses premiers outils de découverte.",
    developpement:[
      {titre:'Préhension',contenu:"Bébé attrape et tient des objets. Il les porte à la bouche. C'est normal, c'est ainsi qu'il explore. La phase orale est un stade de développement essentiel décrit par Piaget. Source : Piaget 1952."},
      {titre:'Vocalisations',contenu:"Gazouillements variés, syllabes comme ba, da, ma. Il répond quand tu lui parles en alternant. C'est un vrai dialogue. Source : Kuhl 2004."},
      {titre:'Motricité',contenu:"Se retourne du ventre au dos. Porte ses pieds à la bouche. En position assise soutenue, tient la tête parfaitement. Source : Denver II."},
    ],
    sante:[
      {titre:'Début de diversification possible',contenu:"Entre 4 et 6 mois révolus selon l'enfant. Commencer si bébé tient sa tête, montre de l'intérêt pour la nourriture, n'a plus le réflexe d'extrusion. Légumes en purée lisse. Source : ESPGHAN / HAS."},
      {titre:'Érythème fessier',contenu:"Changer régulièrement, laisser l'air, crème à l'oxyde de zinc. Si plaques blanches dans la bouche ou sur les fesses, candidose, traitement antifongique sur prescription. Source : HAS."},
    ],
    papa:[
      {titre:'La lecture',contenu:"Lire à voix haute 10 minutes par jour à cet âge améliore le vocabulaire à 2 ans et les capacités de lecture à 5 ans. Des livres cartonnés avec peu de mots et des images contrastées. Source : Duursma 2008."},
    ],
    rdv:"Examen du 4e mois obligatoire.",
    vaccins:"Méningocoque B : 3e dose. Source : Calendrier vaccinal 2024.",
    alerte:"Pas de préhension volontaire. Asymétrie des mouvements. Absence de gazouillements. Pas de sourire.",
  },
  4:{
    titre:'5e mois',
    intro:"L'âge de la curiosité. Bébé se tourne vers tout ce qui bouge et tout ce qui fait du bruit.",
    developpement:[
      {titre:'Reconnaissance sociale',contenu:"Bébé distingue les visages familiers des étrangers. L'angoisse de l'étranger peut débuter. Il reconnaît son prénom et réagit quand on l'appelle. Source : Fagan 1979."},
      {titre:'Motricité',contenu:"Se retourne dos-ventre. Peut se tenir assis avec appui. Explore tout avec ses mains et sa bouche. Commence à prendre des objets en opposition pouce-index. Source : Denver II."},
    ],
    sante:[
      {titre:'Diversification',contenu:"Si commencée, introduire les légumes un à un (4 à 7 jours entre chaque). Carottes, courgettes, haricots verts, potiron. Purée lisse sans sel ni sucre ajouté. Source : PNNS / HAS."},
      {titre:'Dentition',contenu:"Les premières dents (incisives inférieures) peuvent apparaître entre 5 et 8 mois. Signes : bave, irritabilité, besoin de mordre. Pas de fièvre intense normale à la dent. Source : AAP."},
    ],
    papa:[
      {titre:'Angoisse de séparation',contenu:"Normale et signe d'attachement sain. Ne pas forcer les contacts avec des inconnus. L'attachement sécure est le meilleur prédicteur de santé mentale à l'âge adulte. Source : Bowlby / Ainsworth."},
    ],
    rdv:"Pas de rendez-vous obligatoire. Surveillance de la diversification.",
    vaccins:"Pas de vaccin ce mois.",
    alerte:"Asymétrie dans les mouvements. Absence de retournement. Perte d'acquis.",
  },
  5:{
    titre:'6e mois',
    intro:"Mi-première année. Bébé est de plus en plus autonome et interactif. La diversification est en plein essor.",
    developpement:[
      {titre:'Langage',contenu:"Syllabes redupliquées : bababa, mamama, dadada. Ce n'est pas encore du langage mais l'entraînement phonologique qui y conduit. Plus tu lui parles, plus son cerveau se structure linguistiquement. Source : Kuhl 2007."},
      {titre:'Motricité',contenu:"Assis sans soutien pendant quelques secondes. Debout avec appui, commence à faire des petits sauts. Transfert d'objet d'une main à l'autre. Source : Denver II."},
    ],
    sante:[
      {titre:'Diversification à 6 mois',contenu:"OMS recommande 6 mois d'allaitement exclusif avant diversification. Introduire les fruits et légumes. Vers 7 à 8 mois : viande ou poisson (10g/jour). Oeuf cuit dès 6 mois. Source : OMS / ESPGHAN 2017."},
      {titre:'Allergènes',contenu:"Introduction précoce des allergènes majeurs (arachide, oeuf, gluten) entre 4 et 12 mois réduit le risque d'allergie. Ne pas retarder leur introduction sans avis médical. Source : LEAP Study / ESPGHAN."},
    ],
    papa:[
      {titre:'La motricité libre',contenu:"Laisser bébé explorer le sol en sécurité, sans le mettre assis ou debout avant qu'il ne le fasse seul. La motricité libre développe la confiance en soi et l'autonomie. Source : Pikler / Bernard-Bonnin 2012."},
    ],
    rdv:"Examen du 6e mois obligatoire. Bilan complet.",
    vaccins:"DTCaP-Hib-HepB : 3e dose (rappel). Pneumocoque : 2e dose. Méningocoque C. Source : Calendrier vaccinal 2024.",
    alerte:"Absence de syllabes. Pas de tenue assise avec appui. Absence de sourire réciproque. Régressions notables.",
  },
  6:{
    titre:'7e mois',
    intro:"Bébé commence à se déplacer. L'espace autour de lui doit maintenant être sécurisé.",
    developpement:[
      {titre:'Déplacement',contenu:"Rampement, 4 pattes ou retournements successifs. Chaque bébé trouve sa technique. Le 4 pattes croisé (bras gauche + jambe droite) est idéal neurologiquement mais pas obligatoire. Source : AAP 2022."},
      {titre:'Permanence de l\'objet',contenu:"Bébé comprend qu'un objet caché existe encore. Étape majeure de Piaget. Il cherche le jouet que tu caches sous une couverture. Base de la pensée abstraite. Source : Piaget 1954."},
    ],
    sante:[
      {titre:'Sécurisation du domicile',contenu:"Bloquer les prises électriques, coins de table, escaliers. Placer les produits ménagers hors de portée. Attacher les meubles lourds aux murs. La chute est la 1ère cause d'accident à cet âge. Source : Santé Publique France."},
    ],
    papa:[
      {titre:'Cache-cache',contenu:"Se cacher derrière tes mains puis réapparaître est bien plus qu'un jeu : c'est l'entraînement de la permanence de l'objet et de la gestion émotionnelle de la séparation. Source : Stern 1985."},
    ],
    rdv:"Pas de rendez-vous obligatoire.",
    vaccins:"Pas de vaccin ce mois.",
    alerte:"Absence de déplacement. Asymétrie motrice. Pas de permanence de l'objet.",
  },
  7:{
    titre:'8e mois',
    intro:"L'angoisse de séparation est à son pic. C'est le signe d'un attachement sain et sécure.",
    developpement:[
      {titre:'Angoisse du 8e mois',contenu:"Normale et attendue entre 6 et 12 mois. Bébé prend conscience qu'il est séparé de ses parents. Un attachement sécure est la meilleure protection contre l'anxiété future. Source : Ainsworth 1978."},
      {titre:'Compréhension',contenu:"Non, donne, bravo. Bébé commence à comprendre des mots simples avant de les parler. Vocabulaire réceptif supérieur au vocabulaire expressif jusqu'à 18 mois. Source : Bates 1976."},
    ],
    sante:[
      {titre:'Alimentation',contenu:"Texture : purées avec petits morceaux mous. Viande ou poisson : 10g/jour. Introduire progressivement les textures pour prévenir le refus alimentaire futur. Source : HAS / PNNS."},
      {titre:'Sommeil',contenu:"Régression du sommeil fréquente au 8e mois liée à l'angoisse de séparation. Rituel du coucher stable = sécurité. Source : HAS 2017."},
    ],
    papa:[
      {titre:'Les au revoir',contenu:"Toujours dire au revoir quand tu pars, même si bébé pleure, plutôt que de partir en douce. Les départs discrets augmentent l'anxiété. Bébé ne comprend pas pourquoi tu as disparu. Source : Bowlby."},
    ],
    rdv:"Examen du 8e mois conseillé.",
    vaccins:"Grippe si indiqué (prématurés, pathologies).",
    alerte:"Absence de réaction à son prénom. Pas de syllabes. Absence de geste au revoir. Régression importante.",
  },
  8:{
    titre:'9e mois',
    intro:"Bébé dit ses premiers mots, ou presque. Mama et dada commencent à avoir du sens.",
    developpement:[
      {titre:'Premiers mots',contenu:"Les premiers mots signifiants apparaissent entre 9 et 14 mois. Mama et dada associés à la bonne personne. Le vocabulaire expressif au 12e mois prédit le développement du langage à 2 ans. Source : Fenson 1994."},
      {titre:'Pince pouce-index',contenu:"Bébé peut saisir de petits objets avec précision. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent être avalés. Source : Denver II."},
    ],
    sante:[
      {titre:'Alimentation',contenu:"3 repas et 2 laitages par jour. Introduire les féculents, légumineuses. Éviter sel, sucre ajouté, miel avant 1 an, charcuterie. Jus de fruits : aucun avant 1 an. Source : PNNS / HAS 2021."},
    ],
    papa:[
      {titre:'Lire chaque soir',contenu:"10 minutes de lecture le soir, même à cet âge, est la pratique parentale la mieux documentée pour le développement du langage. Les enfants à qui on lit quotidiennement ont 1,4 million de mots de plus à 5 ans. Source : Logan 2019."},
    ],
    rdv:"Pas de rendez-vous obligatoire.",
    vaccins:"Méningocoque B : dose de rappel si non fait à 6 mois.",
    alerte:"Absence de pince pouce-index. Pas de syllabes variées. Absence de compréhension de mots simples.",
  },
  9:{
    titre:'10e mois',
    intro:"Bébé devient de plus en plus curieux et déterminé. Il teste les limites. C'est normal et nécessaire.",
    developpement:[
      {titre:'Debout',contenu:"Bébé se met debout en s'aidant des meubles. Marche en se tenant aux meubles. Les premières chutes font partie de l'apprentissage. Source : Adolph 2012."},
      {titre:'Imitation',contenu:"Imite gestes et sons volontairement : taper des mains, faire coucou, sonner. L'imitation est le moteur principal de l'apprentissage du langage et des comportements sociaux. Source : Meltzoff 2002."},
    ],
    sante:[
      {titre:'Brossage des dents',contenu:"Dès la première dent, brosser matin et soir avec une brosse à dents adaptée et du dentifrice fluoré 500ppm (taille d'un grain de riz). Source : Union Française pour la Santé Bucco-Dentaire / HAS."},
    ],
    papa:[
      {titre:'Les limites',contenu:"Commencer à poser des limites claires et constantes. Non = non, toujours. La consistance des règles (même règle, même réaction) est plus importante que la sévérité. Elle crée la sécurité. Source : Baumrind 1966."},
    ],
    rdv:"Pas de rendez-vous obligatoire.",
    vaccins:"Pas de vaccin ce mois.",
    alerte:"Pas de mise debout avec appui. Absence d'imitation. Pas de pince pouce-index.",
  },
  10:{
    titre:'11e mois',
    intro:"Les premiers pas sont imminents. Une période d'excitation intense pour toute la famille.",
    developpement:[
      {titre:'Avant les premiers pas',contenu:"Bébé peut se tenir debout sans appui quelques secondes. Il pivote debout, fait des pas latéraux contre les meubles. Les premiers pas indépendants arrivent en moyenne à 12 mois (entre 9 et 15 mois, tout est normal). Source : WHO Motor Development Study."},
      {titre:'Compréhension',contenu:"Comprend des phrases simples : donne-moi, où est papa, viens. Commence à suivre des instructions simples. Son vocabulaire réceptif explose. Source : Tomasello 1995."},
    ],
    sante:[
      {titre:'Alimentation vers 1 an',contenu:"Préparer la transition vers le lait de croissance (ou lait entier dès 1 an) et une alimentation de plus en plus familiale. Éviter miel, charcuterie, fromages au lait cru encore quelques mois. Source : HAS / PNNS 4."},
    ],
    papa:[
      {titre:'Préparer le 1er anniversaire',contenu:"Le premier anniversaire est autant pour vous que pour bébé. Prendre un moment pour célébrer ce que vous avez traversé ensemble, en couple. La relation de couple est la base de la stabilité de l'enfant. Source : Gottman 2000."},
    ],
    rdv:"Examen du 12e mois obligatoire (peut être fait à 11 mois).",
    vaccins:"ROR (Rougeole-Oreillons-Rubéole) : 1ère dose. Méningocoque C : rappel. Varicelle : 1ère dose. Source : Calendrier vaccinal 2024.",
    alerte:"Absence totale de mots. Pas de marche avec appui. Perte d'acquis. Absence de pointage.",
  },
  11:{
    titre:'1 an !',
    intro:"Un an. Un cap immense. Bébé est maintenant un petit être en pleine expansion.",
    developpement:[
      {titre:'Les premiers pas',contenu:"La marche indépendante arrive en moyenne à 12 mois, mais entre 9 et 15 mois, c'est dans la norme. Ne jamais forcer avec des trotteurs, ils retardent la marche et augmentent le risque de chute. Source : AAP / HAS."},
      {titre:'Langage',contenu:"2 à 5 mots significatifs en moyenne à 12 mois. La compréhension est bien plus développée que la production. L'important : bébé comprend-il ce qu'on lui dit ? Source : Rescorla 1989."},
      {titre:'Jeu symbolique',contenu:"Premiers jeux du type faire semblant : faire boire une peluche, téléphoner avec un objet. C'est le début de la pensée symbolique, base du langage et de la cognition. Source : Piaget / Vygotski."},
    ],
    sante:[
      {titre:'Alimentation 1 an',contenu:"Lait de croissance ou lait entier (500ml/jour max). Alimentation variée de table. 4 repas par jour. Pas de lait demi-écrémé avant 2 ans. Pas de restriction alimentaire sans avis médical. Source : PNNS / HAS 2021."},
      {titre:'Bucco-dentaire',contenu:"Consultation chez le dentiste recommandée dès 1 an. Source : UFSBD 2022."},
    ],
    papa:[
      {titre:'Bilan de l\'année',contenu:"Tu as fait quelque chose d'extraordinaire cette année. La recherche montre que les pères qui s'impliquent activement la première année ont des enfants avec une meilleure régulation émotionnelle et de meilleures performances scolaires. Source : Lamb 2004."},
    ],
    rdv:"Examen du 12e mois obligatoire. Bilan complet.",
    vaccins:"ROR : 1ère dose. Méningocoque C. Varicelle. Source : Calendrier vaccinal 2024.",
    alerte:"Absence totale de mots à 12 mois. Pas de marche avec appui à 15 mois, consultation neuropédiatrie. Perte d'acquis moteurs ou langagiers.",
  },
};
