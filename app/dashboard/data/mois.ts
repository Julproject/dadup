import type { MoisData } from './types';

export function getIdee(mois: number): string {
  const idees = [
    // Mois 1 (SA 1-4) : T1 debut, choc de l'annonce, nausees
    "Elle traverse les nausées en silence. Prends en charge les courses et les repas cette semaine sans qu'elle ait à demander. Ce geste concret compte plus qu'un discours.",
    // Mois 2 (SA 5-8) : nausees intenses, fatigue, 1ere consultation
    "Accompagne-la à sa première consultation médicale. Prends des notes, pose des questions. Ton implication dès le début change tout pour la suite.",
    // Mois 3 (SA 9-13) : fin T1, echo T1, annonce
    "L'échographie T1 approche. Filme-la, vis-la pleinement. Puis décidez ensemble comment annoncer la grossesse, à qui et quand. Ce moment ne se répète pas.",
    // Mois 4 (SA 14-17) : T2 debut, energie variable, ventre visible
    "Commande le coussin de grossesse maintenant. Les nuits deviennent difficiles. C'est concret, utile, et elle n'a pas à le demander.",
    // Mois 5 (SA 18-22) : echo T2, mi-grossesse, mouvements
    "L'échographie T2 est le rendez-vous le plus intense de la grossesse. Prépare 3 questions avec elle. Décidez ensemble si vous voulez connaitre le sexe. Sois pleinement là.",
    // Mois 6 (SA 23-27) : fin T2, ventre visible, dos douloureux
    "Visite la maternité avec elle ce mois. Repérez ensemble les accès, les urgences obstétricales, le parking. Ce repérage concret réduit le stress le jour J pour vous deux.",
    // Mois 7 (SA 28-31) : T3, fatigue, echo T3, valise
    "Commence la valise maternité cette semaine sans attendre qu'elle te le demande. Consulte la checklist dans l'app. C'est un signal fort : tu es aussi prêt qu'elle.",
    // Mois 8 (SA 32-35) : accouchement proche, insomnie, prep mentale
    "Prépare des repas au congélateur. Minimum 10 portions. Pas pour toi : pour les premières semaines après la naissance. C'est l'un des gestes les plus utiles et les moins faits.",
    // Mois 9 (SA 36-40) : terme, attente, mode alerte
    "Dis-lui ce soir que tu es fier d'elle. Pas pour la rassurer. Parce que c'est vrai. Ce qu'elle a traversé ces 9 mois est extraordinaire. Et toi, tu as été là.",
  ];
  return idees[Math.min(mois - 1, idees.length - 1)] || idees[0];
}

export const MOIS_DATA: Record<number, MoisData> = {
  0: {
    titre: '1er mois',
    intro: "Les premières semaines après la naissance sont souvent les plus intenses de ta vie. Bébé vient de quitter un environnement chaud, sombre et rythmé par les battements de coeur. Il a besoin de retrouver ce cocon. Ton rôle est plus concret et plus important que tu ne l'imagines.",
    developpement: [
      {
        titre: "Ce que voit bébé",
        contenu: "Sa vision est floue au-delà de 25 cm, exactement la distance entre ton visage et le sien pendant une tétée. Il distingue les contrastes forts et les visages humains. Il reconnait déjà ton visage. Mets-toi à 20 cm et regarde-le dans les yeux : il te voit."
      },
      {
        titre: "Ce qu'il entend",
        contenu: "L'audition est son sens le plus développé à la naissance. Il reconnait ta voix : il l'a entendue in utero pendant des mois. Parle-lui normalement, pas en voix de bébé exagérée. Ta voix grave le rassure depuis 9 mois. Source : Kisilevsky 2009."
      },
      {
        titre: "Ses réflexes primitifs",
        contenu: "Réflexe de Moro (il sursaute quand il se sent tomber), grasping (il serre ton doigt fort), succion, marche automatique. Ce sont des signes d'un système nerveux sain, pas des comportements conscients. Ils disparaissent vers 3 à 4 mois. Source : HAS."
      },
      {
        titre: "Ce qu'il aime dès les premiers jours",
        contenu: "Le peau à peau : ton corps régule sa température et son rythme cardiaque. Être porté contre toi. Le bruit blanc constant. Être emmailloté, les bras calés contre son corps. Ces besoins sont biologiques, pas des caprices. Source : Moore 2016."
      },
      {
        titre: "Le hoquet et les grimaces",
        contenu: "Bébé a le hoquet plusieurs fois par jour : son diaphragme s'entraine. Les grimaces pendant le sommeil ne sont pas de la douleur : c'est son cerveau qui traite les informations en sommeil paradoxal. Tout va bien."
      }
    ],
    sante: [
      {
        titre: "L'allaitement",
        contenu: "8 à 12 tétées par 24h est normal. La montée de lait survient entre J2 et J4. Une bonne prise du sein : bouche grande ouverte, lèvres retroussées, menton contre le sein. Si douleur intense persistante : consulter une sage-femme ou une consultante IBCLC. Source : OMS."
      },
      {
        titre: "Le cordon ombilical",
        contenu: "Il tombe entre 5 et 15 jours. Ne pas le mouiller inutilement, ne pas chercher à l'enlever. C'est normal qu'il noircisse avant de tomber. Si rougeur autour ou odeur forte : consulter. Source : HAS."
      },
      {
        titre: "Le poids",
        contenu: "Une perte de poids allant jusqu'à 10% du poids de naissance est normale dans les premiers jours. La récupération du poids de naissance est attendue avant J10-J14. Source : HAS 2022."
      },
      {
        titre: "Le sommeil en sécurité",
        contenu: "Sur le dos uniquement, dans son propre espace de sommeil, sans oreiller ni couette, sans tour de lit. La chambre partagée (pas le lit partagé) réduit le risque de mort subite. Source : HAS 2020."
      }
    ],
    papa: [
      {
        titre: "Prends le relais des nuits",
        contenu: "La privation de sommeil est le principal facteur de dépression post-partum. Si elle allaite, prends en charge le change, le portage et le recoucher après chaque tétée. Si biberon, alternez les nuits. Ce geste est l'un des plus importants de ce mois. Source : Inserm 2021."
      },
      {
        titre: "Le baby blues : c'est réel",
        contenu: "50 à 80% des femmes vivent un baby blues entre J3 et J5 : larmes soudaines, euphorie suivie d'effondrement, épuisement. C'est hormonal, normal, et ça passe en quelques jours. Si ça dure plus de deux semaines : consulter un médecin. Source : CNGOF."
      },
      {
        titre: "Ta propre santé mentale",
        contenu: "10 à 15% des pères développent une dépression post-partum dans les 6 premiers mois. Signes : irritabilité, retrait, anxiété excessive, sentiment d'être inutile. En parler à un médecin est un signe de force, pas de faiblesse. Source : Paulson & Bazemore 2010."
      },
      {
        titre: "Reconnais les signaux de faim",
        contenu: "Bébé indique qu'il a faim avant de pleurer : il tourne la tête, ouvre la bouche, porte ses mains à sa bouche. Répondre à ces signaux précoces évite le cycle pleurs-stress-tétée difficile. Source : AAP 2022."
      }
    ],
    rdv: "Examen J8 obligatoire chez le médecin ou la sage-femme. Examen du 1er mois entre J28 et J32. Visite de la sage-femme à domicile possible dans les premiers jours : demande-la.",
    vaccins: "BCG si indiqué (contexte familial). Pas de vaccin obligatoire avant 2 mois.",
    alerte: "Température supérieure à 38°C avant 3 mois : urgences pédiatriques sans attendre. Refus de s'alimenter sur 2 tétées consécutives. Fontanelle bombée. Difficultés respiratoires : appeler le 15.",
  },

  1: {
    titre: '2e mois',
    intro: "Le premier vrai sourire apparait. Pas un réflexe : un sourire intentionnel, dirigé vers toi. C'est le début de la communication. Ton bébé te reconnait et t'envoie un signal clair : tu comptes pour lui.",
    developpement: [
      {
        titre: "Le sourire social",
        contenu: "Vers 6 semaines, bébé sourit en réponse à ton visage et ta voix. Ce n'est plus un réflexe mais une communication intentionnelle. C'est une étape majeure du développement socio-émotionnel. Réponds toujours à son sourire par un sourire : tu lui apprends que la communication fonctionne. Source : Brazelton 2006."
      },
      {
        titre: "Motricité",
        contenu: "Bébé tient sa tête quelques secondes en position ventrale. Il suit des yeux un objet qui se déplace lentement. Ses mouvements deviennent plus coordonnés. La position ventre à plat quelques minutes par jour est essentielle pour développer ses muscles. Source : Denver II."
      },
      {
        titre: "Vocalises",
        contenu: "Premiers sons voyelles. Bébé expérimente sa voix. Il réagit aux voix familières en tournant la tête. Parle-lui face à face, exagère tes expressions. Son cerveau synchronise son activité avec la tienne quand tu lui parles. Source : Harvard CDC / Locke 1993."
      }
    ],
    sante: [
      {
        titre: "Coliques du nourrisson",
        contenu: "Pleurs intenses plus de 3h par jour, plus de 3 jours par semaine, pendant plus de 3 semaines. Touchent 20% des bébés. Cause incertaine, disparaissent spontanément vers 3 mois. Aucun remède universel. La position en ballon de football sur ton avant-bras aide parfois. Source : HAS 2021."
      },
      {
        titre: "Régurgitations",
        contenu: "Normales si bébé grossit bien et n'a pas l'air douloureux. Signe de RGO pathologique : pleurs pendant la tétée, refus de manger, mauvaise prise de poids. Dans ce cas, consulter. Source : ESPGHAN 2018."
      }
    ],
    papa: [
      {
        titre: "Parle-lui face à face",
        contenu: "Parle-lui face à face en exagérant tes expressions. Des études IRM montrent que le cerveau de bébé synchronise son activité avec celle du parent qui lui parle. Ce n'est pas du jeu : c'est de la construction neuronale. Source : Harvard CDC."
      },
      {
        titre: "Dépression post-partum paternelle",
        contenu: "10% des pères développent une dépression post-partum dans les 3 à 6 premiers mois. Symptômes peu connus : irritabilité, retrait, anxiété excessive, prise de risques. En parler à un médecin change les choses. Source : Paulson & Bazemore, JAMA 2010."
      }
    ],
    rdv: "Examen du 2e mois. Début du calendrier vaccinal. Rendez-vous clé : ne pas le rater.",
    vaccins: "DTCaP-Hib-HepB (Hexavalent) : 1ère dose. Méningocoque B : 1ère dose. Rotavirus : 1ère dose (oral). Source : Calendrier vaccinal 2025.",
    alerte: "Absence de sourire à 2 mois. Absence de réaction aux sons. Hypotonie majeure (bébé mou comme une poupée de chiffon). Perte de poids.",
  },

  2: {
    titre: '3e mois',
    intro: "Bébé rit. Vraiment. Les coliques s'estompent souvent, les nuits s'allongent un peu. Il devient un vrai partenaire d'échange. Tu commences à voir la personnalité qui se construit.",
    developpement: [
      {
        titre: "Interaction sociale",
        contenu: "Bébé rit aux éclats pour la première fois. Il reconnait ses parents à la vue. Il cherche activement le contact visuel et répond quand tu lui parles : c'est une conversation. Source : Tronick 1978."
      },
      {
        titre: "Motricité",
        contenu: "Tient bien sa tête. En position ventrale, se soulève sur les avant-bras. Ouvre et ferme les mains intentionnellement. Commence à attraper ce qu'on lui tend. Encourage ces mouvements : c'est de la motricité libre en action. Source : Denver II."
      },
      {
        titre: "Sommeil",
        contenu: "Les nuits s'allongent progressivement. 4 à 6h de sommeil continu est possible. Le rythme jour-nuit commence à se mettre en place. Expose-le à la lumière naturelle le matin pour l'aider à régler son horloge biologique. Source : Touchette 2005."
      }
    ],
    sante: [
      {
        titre: "Diversification : pas encore",
        contenu: "La diversification alimentaire ne commence pas avant 4 mois révolus (17 semaines). Le lait maternel ou infantile couvre tous les besoins. Introduire trop tôt augmente le risque d'allergies. Source : OMS / HAS."
      },
      {
        titre: "Position de sommeil",
        contenu: "Toujours sur le dos, dans son propre espace, sans tour de lit, sans oreiller, sans couette. La chambre partagée (pas le lit partagé) réduit le risque de mort subite du nourrisson. Source : HAS 2020."
      }
    ],
    papa: [
      {
        titre: "Le jeu à 3 mois",
        contenu: "Montre-lui des objets colorés, fais des bulles, lis des livres cartonnés à voix haute. Le jeu n'est pas un luxe : c'est le moteur principal du développement cognitif et émotionnel. Source : Ginsburg 2007."
      },
      {
        titre: "Le congé paternité",
        contenu: "Si pas encore utilisé, le prendre maintenant pour établir votre lien avant la reprise du travail. Les études montrent que l'implication précoce du père prédit un meilleur développement de l'enfant à 5 ans. Source : Tanaka 2005."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois. Surveiller le développement.",
    vaccins: "DTCaP-Hib-HepB : 2e dose. Méningocoque B : 2e dose. Rotavirus : 2e dose. Pneumocoque : 1ère dose. Source : Calendrier vaccinal 2025.",
    alerte: "Absence de rires ou de vocalises. Absence de suivi visuel. Pas de réaction aux sons forts. Raideur ou mollesse anormale des membres.",
  },

  3: {
    titre: '4e mois',
    intro: "Bébé découvre ses mains. Il les regarde pendant de longues minutes, les porte à sa bouche, les utilise pour attraper. C'est fascinant à observer. Il commence aussi à percevoir la profondeur.",
    developpement: [
      {
        titre: "Découverte des mains",
        contenu: "Bébé découvre ses mains comme des outils. Il les observe, les porte à la bouche, tente de saisir des objets. C'est le début de la coordination oeil-main, base de toute manipulation future. Source : Piaget."
      },
      {
        titre: "Motricité",
        contenu: "Se retourne du ventre vers le dos. Tient bien sa tête dans toutes les positions. Commence à se redresser si on le tire assis. Source : Denver II."
      },
      {
        titre: "Perception",
        contenu: "Perçoit la profondeur et les distances. Distingue les expressions faciales : sourire, froncement de sourcils, surprise. Il lit les émotions sur ton visage depuis cet âge. Source : Gibson & Walk 1960."
      }
    ],
    sante: [
      {
        titre: "Diversification possible dès 17 semaines",
        contenu: "La diversification peut commencer entre 17 et 26 semaines (4 à 6 mois). Commencer par des légumes : carotte, courgette, haricot vert, en purée lisse sans sel ni sucre. Un légume nouveau tous les 3 à 4 jours. Source : HAS / PNNS 2023."
      },
      {
        titre: "Dentition précoce",
        contenu: "Les premières dents peuvent apparaitre dès 4 mois (incisives inférieures). Signes : bave excessive, irritabilité, besoin de mordre. La fièvre n'est pas un signe normal de poussée dentaire. Source : AAP."
      }
    ],
    papa: [
      {
        titre: "Porte-le",
        contenu: "Le portage (en écharpe ou porte-bébé physiologique) réduit les pleurs de 43% selon une étude de 1986, toujours citée. Bébé porté pleure moins, dort mieux, et son développement moteur est favorisé. Source : Hunziker & Barr 1986."
      },
      {
        titre: "Ton rôle à 4 mois",
        contenu: "Tu peux maintenant assurer toutes les fonctions de soin seul : bain, change, repas, endormissement. Ne laisse pas ta partenaire être la seule à savoir faire. Bébé doit t'associer aussi à la sécurité et au réconfort."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire. Si diversification démarrée, en parler au médecin.",
    vaccins: "DTCaP-Hib-HepB : 3e dose. Pneumocoque : 2e dose. Source : Calendrier vaccinal 2025.",
    alerte: "Absence de retournement ventre-dos. Pas de saisie volontaire d'objets. Absence de vocalises variées.",
  },

  4: {
    titre: '5e mois',
    intro: "L'angoisse de l'étranger commence. Bébé pleure avec des inconnus. C'est le signe d'un attachement sain et sécure. Il sait qui sont ses parents et il y tient.",
    developpement: [
      {
        titre: "Attachement",
        contenu: "Bébé reconnait ses parents à la vue et réagit différemment aux étrangers. C'est l'attachement préférentiel. Il peut pleurer quand un inconnu le prend. Signe d'un lien parent-enfant sain. Source : Ainsworth 1978."
      },
      {
        titre: "Motricité",
        contenu: "Se retourne dos-ventre et ventre-dos. Peut se tenir assis avec appui. Explore tout avec ses mains et sa bouche. Commence à prendre des objets en opposition pouce-index. Source : Denver II."
      },
      {
        titre: "Compréhension",
        contenu: "Bébé commence à comprendre son prénom et réagit quand on l'appelle. Il distingue le ton positif du ton sévère. Parle-lui toujours avec bienveillance : il comprend l'émotion avant les mots. Source : Fagan 1979."
      }
    ],
    sante: [
      {
        titre: "Diversification en cours",
        contenu: "Légumes bien acceptés, introduire les fruits. Continuer le lait en parallèle (lait maternel ou infantile). Eviter le sel, le sucre, le miel (risque de botulisme avant 1 an). Source : PNNS / HAS."
      },
      {
        titre: "Dentition",
        contenu: "Les incisives inférieures peuvent pointer. Une fois sorties, nettoyer matin et soir avec une compresse humide ou une brosse à dents du bon âge sans dentifrice. Source : UFSBD."
      }
    ],
    papa: [
      {
        titre: "Ne pas forcer le contact",
        contenu: "Quand bébé pleure avec un inconnu, ne pas le forcer à le laisser prendre. L'attachement sécure se construit en respectant ses signaux. Laisse-le venir à son rythme. Source : Bowlby / Ainsworth."
      },
      {
        titre: "Lire à voix haute",
        contenu: "10 minutes de lecture à voix haute par jour dès maintenant. Il ne comprend pas les mots mais perçoit le rythme, l'intonation, la musicalité du langage. C'est la fondation du développement du langage. Source : Logan 2019."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire. Surveillance de la diversification.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Asymétrie dans les mouvements. Absence de retournement. Perte d'acquis (régression).",
  },

  5: {
    titre: '6e mois',
    intro: "Mi-première année. Bébé pèse environ le double de son poids de naissance. Il rit, interagit, commence à se déplacer à sa façon. C'est une période de découvertes intenses.",
    developpement: [
      {
        titre: "Le langage",
        contenu: "Syllabes redupliquées : bababa, mamama, dadada. Ce n'est pas encore du langage mais l'entrainement phonologique qui y conduit. Plus tu lui parles, plus son cerveau se structure. Réponds à ses syllabes comme si c'était une vraie conversation. Source : Kuhl 2007."
      },
      {
        titre: "Position assise",
        contenu: "Assis sans soutien pendant quelques secondes, puis de plus en plus longtemps. Transfert d'objet d'une main à l'autre. Ne mets pas de cale pour le maintenir assis : il doit trouver son équilibre seul. Source : Denver II."
      },
      {
        titre: "Permanence de l'objet",
        contenu: "Il cherche un objet qu'on vient de cacher sous un tissu devant lui. Il comprend que l'objet existe encore même s'il ne le voit plus. Etape majeure de Piaget. Joue à ce jeu régulièrement. Source : Piaget 1954."
      }
    ],
    sante: [
      {
        titre: "Diversification à 6 mois",
        contenu: "L'OMS recommande 6 mois d'allaitement exclusif avant diversification. Vers 7 à 8 mois : viande ou poisson (10g par jour). Oeuf cuit dès 6 mois. Source : OMS / ESPGHAN 2017."
      },
      {
        titre: "Introduction précoce des allergènes",
        contenu: "Introduction précoce des allergènes majeurs (arachide, oeuf, gluten, lait de vache) entre 4 et 12 mois réduit le risque d'allergie. Ne pas retarder sans avis médical. Source : LEAP Study / ESPGHAN 2022."
      },
      {
        titre: "Premières dents",
        contenu: "Les incisives centrales inférieures apparaissent généralement entre 6 et 10 mois. Une fois sorties, nettoyer matin et soir avec une brosse à dents adaptée et du dentifrice fluoré 500ppm (taille d'un grain de riz). Source : UFSBD."
      }
    ],
    papa: [
      {
        titre: "Motricité libre",
        contenu: "Laisse bébé explorer le sol en sécurité, sans le mettre assis ou debout avant qu'il ne le fasse seul. La motricité libre développe la confiance en soi et l'autonomie. Un bébé qui trouve seul sa position est plus habile qu'un bébé installé. Source : Pikler / Bernard-Bonnin 2012."
      },
      {
        titre: "L'examen du 6e mois",
        contenu: "C'est l'un des examens pédiatriques les plus complets. Viens avec une liste de tes observations : comment il mange, dort, se déplace, réagit. Tu es le parent le plus observateur si tu es présent au quotidien."
      }
    ],
    rdv: "Examen du 6e mois obligatoire. Bilan complet : motricité, langage, vision, audition.",
    vaccins: "DTCaP-Hib-HepB : rappel. Pneumocoque : 2e dose. Méningocoque C. Source : Calendrier vaccinal 2025.",
    alerte: "Absence de syllabes. Pas de tenue assise avec appui. Absence de sourire réciproque. Régressions notables.",
  },

  6: {
    titre: '7e mois',
    intro: "Bébé commence à se déplacer. L'espace autour de lui doit maintenant être sécurisé. La chute est la première cause d'accident à cet âge.",
    developpement: [
      {
        titre: "Déplacement",
        contenu: "Rampement, 4 pattes ou retournements successifs. Chaque bébé trouve sa technique. Le 4 pattes croisé (bras gauche + jambe droite en simultané) est idéal neurologiquement mais pas obligatoire. Les chutes font partie de l'apprentissage. Source : AAP 2022."
      },
      {
        titre: "Permanence de l'objet renforcée",
        contenu: "Bébé comprend qu'un objet caché existe encore et le cherche activement. Base de la pensée abstraite et précurseur du langage. Cache un jouet sous une couverture devant lui et laisse-le chercher. Source : Piaget 1954."
      }
    ],
    sante: [
      {
        titre: "Sécurisation du domicile",
        contenu: "Bloquer les prises électriques, sécuriser les coins de table, installer des barrières d'escalier. Placer tous les produits ménagers hors de portée. Attacher les meubles lourds aux murs. La chute est la 1ère cause d'accident à cet âge. Source : Santé Publique France."
      }
    ],
    papa: [
      {
        titre: "Cache-cache",
        contenu: "Se cacher derrière tes mains puis réapparaitre est bien plus qu'un jeu : c'est l'entrainement de la permanence de l'objet et de la gestion émotionnelle de la séparation. Bébé apprend que tu reviens toujours. Source : Stern 1985."
      },
      {
        titre: "Sécuriser sans sur-protéger",
        contenu: "Sécurise l'environnement mais laisse-le explorer. Un bébé qui ne tombe jamais n'apprend pas à gérer les risques. L'objectif : un environnement sûr dans lequel il peut prendre des petits risques. Source : Adolph 2012."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de déplacement. Asymétrie motrice. Absence de permanence de l'objet.",
  },

  7: {
    titre: '8e mois',
    intro: "L'angoisse du 8e mois est à son pic. Bébé pleure quand tu pars, même 30 secondes. C'est un signe d'attachement sain et sécure. Il sait que tu existes quand tu n'es pas là. C'est un progrès.",
    developpement: [
      {
        titre: "Angoisse du 8e mois",
        contenu: "Normale et attendue entre 6 et 12 mois. Bébé prend conscience qu'il est séparé de ses parents et que tu peux partir. Un attachement sécure est la meilleure protection contre l'anxiété future. Source : Ainsworth 1978."
      },
      {
        titre: "Compréhension du langage",
        contenu: "Non, donne, bravo, viens. Bébé commence à comprendre des mots simples avant de les parler. Son vocabulaire de compréhension est bien supérieur à ce qu'il peut dire. Continue à lui parler normalement et souvent. Source : Bates 1976."
      }
    ],
    sante: [
      {
        titre: "Alimentation",
        contenu: "Texture : purées avec petits morceaux mous. Viande ou poisson : 10g par jour. Introduire progressivement les textures pour prévenir le refus alimentaire futur. Eviter sel, sucre, miel, charcuterie. Source : HAS / PNNS."
      },
      {
        titre: "Sommeil",
        contenu: "Régression du sommeil fréquente au 8e mois liée à l'angoisse de séparation. Un rituel du coucher stable et prévisible est la meilleure réponse. La constance te protège autant que lui. Source : HAS 2017."
      }
    ],
    papa: [
      {
        titre: "Dire au revoir correctement",
        contenu: "Toujours dire au revoir quand tu pars, même si bébé pleure, plutôt que de partir en douce. Les départs discrets augmentent l'anxiété. Bébé ne comprend pas pourquoi tu as disparu. Un vrai au revoir lui dit : tu pars, mais tu reviens. Source : Bowlby."
      },
      {
        titre: "Rituel du coucher",
        contenu: "Bain, pyjama, tétée ou biberon, lecture, câlin, dodo. Toujours dans le même ordre. La prévisibilité est sécurisante pour un cerveau de 8 mois. Prends en charge ce rituel au moins 3 soirs par semaine."
      }
    ],
    rdv: "Examen du 8e mois conseillé.",
    vaccins: "Grippe si indiqué (prématurés, pathologies chroniques).",
    alerte: "Absence de réaction à son prénom. Pas de syllabes variées. Absence de geste au revoir. Régression importante.",
  },

  8: {
    titre: '9e mois',
    intro: "Premiers mots. Ou presque. Mama et dada commencent à avoir du sens. Bébé pointe du doigt ce qui l'intéresse. C'est de la communication intentionnelle. C'est majeur.",
    developpement: [
      {
        titre: "Premiers mots signifiants",
        contenu: "Les premiers mots apparaissent entre 9 et 14 mois. Mama et dada associés à la bonne personne. Le vocabulaire expressif au 12e mois prédit le développement du langage à 2 ans. Réponds à chaque tentative de communication. Source : Fenson 1994."
      },
      {
        titre: "Le pointage proto-déclaratif",
        contenu: "Bébé pointe du doigt un objet, te regarde pour partager sa découverte, puis regarde l'objet. Ce geste dit : regarde ça avec moi. C'est le partage d'attention conjointe, précurseur essentiel du langage. Source : Bates 1976."
      },
      {
        titre: "Pince pouce-index",
        contenu: "Bébé peut saisir de très petits objets avec précision. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent être avalés. Source : Denver II."
      }
    ],
    sante: [
      {
        titre: "Alimentation à 9 mois",
        contenu: "3 repas et 2 laitages par jour. Introduire les féculents et légumineuses. Eviter sel, sucre ajouté, miel avant 1 an, charcuterie. Aucun jus de fruits avant 1 an. Les morceaux mous sont maintenant la norme. Source : PNNS / HAS 2021."
      }
    ],
    papa: [
      {
        titre: "Lire chaque soir",
        contenu: "10 minutes de lecture à voix haute chaque soir est la pratique parentale la mieux documentée pour le développement du langage. Les enfants à qui on lit quotidiennement ont 1,4 million de mots de plus à l'age de 5 ans. Source : Logan 2019."
      },
      {
        titre: "Répondre au pointage",
        contenu: "Quand bébé pointe quelque chose, regarde dans la même direction et nomme l'objet. Ce geste simple est l'un des plus puissants pour le développement du langage. Il apprend que les choses ont des noms et que la communication fonctionne."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois.",
    vaccins: "Méningocoque B : dose de rappel si non fait à 6 mois.",
    alerte: "Absence de pince pouce-index. Pas de syllabes variées. Absence de compréhension de mots simples.",
  },

  9: {
    titre: '10e mois',
    intro: "Bébé est de plus en plus curieux et déterminé. Il teste les limites. C'est normal et nécessaire : il explore jusqu'où va ton autorité. La constance de ta réponse lui construit la sécurité.",
    developpement: [
      {
        titre: "Debout et premiers pas",
        contenu: "Bébé se met debout en s'aidant des meubles. Marche en se tenant. Les premières chutes font partie de l'apprentissage : ne pas sur-réagir. Il tombe, il se relève, il recommence. C'est exactement ce qu'il doit faire. Source : Adolph 2012."
      },
      {
        titre: "Imitation",
        contenu: "Il imite gestes et sons volontairement : taper des mains, faire coucou, souffler. L'imitation est le moteur principal de l'apprentissage du langage et des comportements sociaux. Joue à l'imiter et laisse-le t'imiter. Source : Meltzoff 2002."
      }
    ],
    sante: [
      {
        titre: "Alimentation autonome",
        contenu: "Proposer des morceaux qu'il peut saisir seul : légumes cuits mous, fruits mous, pain. Le manger-main développe l'autonomie et la motricité fine. Surveiller mais ne pas intervenir à chaque bouchée. Source : HAS."
      }
    ],
    papa: [
      {
        titre: "La limite bienveillante",
        contenu: "Non signifie non, dit calmement et fermement. La constance de la limite est plus importante que le ton. Un parent qui cède parfois génère plus d'insistance qu'un parent qui ne cède jamais. La sécurité vient de la prévisibilité. Source : Baumrind 1967."
      },
      {
        titre: "Exploration sécurisée",
        contenu: "Laisse-le explorer au sol, en extérieur, dans la boue si besoin. Les textures naturelles (herbe, sable, eau, terre) sont irremplaçables pour le développement sensoriel. Un enfant qui explore apprend. Un enfant qu'on protège de tout apprend moins. Source : Adolph 2012."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de mise debout avec appui. Pas de pointage du doigt. Absence de compréhension simple.",
  },

  10: {
    titre: '11e mois',
    intro: "Les premiers pas approchent. Peut-être ce mois, peut-être dans quelques semaines. Chaque bébé a son rythme. L'âge normal des premiers pas va de 9 à 18 mois.",
    developpement: [
      {
        titre: "Marche",
        contenu: "Bébé marche en se tenant aux meubles (cruise). Certains font leurs premiers pas seuls ce mois, d'autres attendront encore. Les premiers pas entre 9 et 18 mois sont tous normaux. Ne pas comparer. Source : Denver II."
      },
      {
        titre: "Langage expressif",
        contenu: "2 à 5 mots signifiants en moyenne à 12 mois. Mais la variabilité est énorme. L'essentiel : comprend-il ce qu'on lui dit ? Si oui, le langage expressif suivra. Source : Fenson 1994."
      }
    ],
    sante: [
      {
        titre: "Alimentation à 11 mois",
        contenu: "Repas de plus en plus proches des repas familiaux, sans sel ajouté. Les légumineuses (lentilles, pois chiches) sont une excellente source de protéines et fer. Varier les textures et les couleurs. Source : PNNS 2023."
      }
    ],
    papa: [
      {
        titre: "Lache-le",
        contenu: "Quand il essaie de marcher, résiste à l'envie de le tenir. Laisse-le trouver son équilibre seul. Tombe-t-il ? C'est normal. Ce sont ces chutes maitrisées qui lui apprennent à gérer son corps. Source : Adolph 2012."
      },
      {
        titre: "Préparation au 1er anniversaire",
        contenu: "Dans un mois, bébé a 1 an. C'est aussi ton 1er anniversaire de père. Tu as appris plus cette année que tu ne le mesures. Prépare quelque chose de simple pour marquer ce cap : une photo, une lettre, un rituel."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de mise debout. Pas de mots signifiants. Régression d'acquis. Absence d'intérêt pour les autres.",
  },

  11: {
    titre: '12e mois - 1 an',
    intro: "Un an. Ton bébé est maintenant un enfant. Il comprend des dizaines de mots, communique, se déplace, a des préférences claires. Et toi, tu as traversé la première année. C'est une victoire.",
    developpement: [
      {
        titre: "Bilan à 1 an",
        contenu: "Bébé comprend des ordres simples (donne, viens, non). Dit 2 à 5 mots signifiants. Se déplace seul (marche ou rampe efficacement). Pointe du doigt pour communiquer. Joue à faire semblant de façon simple. Source : HAS / Denver II."
      },
      {
        titre: "Jeu symbolique naissant",
        contenu: "Il fait semblant de dormir, de manger, de téléphoner. Le jeu symbolique est le précurseur de la pensée abstraite et de la créativité. Joue avec lui : fais semblant de boire dans sa tasse vide. Source : Piaget."
      }
    ],
    sante: [
      {
        titre: "Alimentation à 1 an",
        contenu: "Passage possible au lait de vache entier (pas écrémé). 3 repas + 2 collations. Les repas familiaux adaptés sont la norme. Eviter encore : sel excessif, sucre ajouté, miel, charcuterie en grande quantité. Source : PNNS / HAS."
      },
      {
        titre: "Examen du 12e mois",
        contenu: "L'examen des 12 mois est l'un des plus complets : motricité, langage, vision, audition, développement socio-émotionnel. Prépare tes questions. Signale tout ce qui t'inquiète, même si ça te semble léger."
      }
    ],
    papa: [
      {
        titre: "Ton bilan à toi",
        contenu: "Tu as appris à ne pas dormir, à gérer l'inconnu, à aimer quelqu'un de façon nouvelle. Tu as probablement fait des erreurs. Tu as aussi réussi des choses que tu ne croyais pas capables de faire. Prends un moment pour le reconnaitre."
      },
      {
        titre: "La suite",
        contenu: "La 2e année est souvent plus facile logistiquement mais plus complexe émotionnellement. Bébé dit non, s'affirme, teste. Continue à être présent, cohérent et bienveillant. C'est tout ce dont il a besoin. Source : Baumrind 1967."
      }
    ],
    rdv: "Examen des 12 mois obligatoire. Bilan complet. Vaccins importants ce mois.",
    vaccins: "ROR (rougeole, oreillons, rubéole) : 1ère dose. Méningocoque C. Source : Calendrier vaccinal 2025.",
    alerte: "Absence de mots. Pas de pointage. Absence de marche ou déplacement efficace. Pas de jeu d'imitation. Tout symptôme qui te préoccupe mérite d'être mentionné au médecin.",
  },
};
