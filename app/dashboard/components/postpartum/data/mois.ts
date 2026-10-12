import type { MoisData } from '../../../data/types';

export function getIdee(mois: number): string {
  const idees = [
    "Fais une empreinte de sa main ou son pied cette semaine. Dans 10 ans, tu te souviendras de ce moment.",
    "Filme-le qui babille. Ces sons disparaissent vite. Garde-les.",
    "Un selfie par semaine avec bébé, même angle, même endroit. Un an de photos, une vidéo de vie.",
    "Commence un carnet de ses premières fois : premier rire, premier retournement, premier mot.",
    "Filme ses premiers fous rires. Le rire d'un bébé est impossible à oublier, mais on l'oublie quand même.",
    "Une sortie rien que tous les deux ce mois. Toi et bébé. Tu en es capable.",
    "Note ses premiers sons qui ressemblent à des mots. Dans quelques semaines, ce seront de vrais mots.",
    "Prends une photo avec le même doudou chaque mois jusqu'à 1 an. Le résultat vaut le coup.",
    "Filme ses premiers pas. Même ratés. Surtout ratés.",
    "Enregistre une recette de ses purées préférées. Un jour, il voudra savoir.",
    "Organise une sortie spéciale pour ses 10 mois. Juste parce que.",
    "Prépare quelque chose pour son premier anniversaire. Pas grand chose. Juste quelque chose qui vient de toi.",
  ];
  return idees[Math.min(mois, 11)] || idees[0];
}

export const MOIS_DATA: Record<number, MoisData> = {
  0: {
    titre: "Les premières semaines",
    intro: "Bienvenue dans le quatrième trimestre. Bébé vient de quitter un environnement chaud, sombre et rythmé par les battements de cœur. Il a besoin de recréer ce cocon. Et toi, tu découvres que personne n'est vraiment préparé à ça.",
    developpement: [
      {
        titre: "Ce que voit bébé",
        contenu: "Sa vision est floue au-delà de 25 cm, exactement la distance entre ton visage et le sien quand tu le tiens dans tes bras. Il distingue les contrastes forts : noir, blanc, rouge. Il apprend très vite à reconnaître ton visage."
      },
      {
        titre: "Ce qu'il entend",
        contenu: "L'audition est son sens le plus développé à la naissance. Il reconnaît surtout la voix de sa mère, entendue in utero. La tienne lui devient vite familière si tu lui parles souvent. Parle-lui normalement, pas en voix de bébé forcée. Source : Kisilevsky 2009."
      },
      {
        titre: "Ses réflexes primitifs",
        contenu: "Réflexe de Moro (il sursaute quand il se sent tomber), grasping (il serre ton doigt), succion, marche automatique. Ce sont des signes d'un système nerveux sain. Ils disparaissent progressivement au cours des premiers mois, la plupart entre 2 et 6 mois."
      },
      {
        titre: "Ce qu'il aime dès les premiers jours",
        contenu: "Le peau à peau : ton corps régule sa température, son rythme cardiaque et son stress. Être porté. Un bruit blanc doux. Être emmailloté, les bras calés contre son corps et les jambes libres de bouger. Ces besoins sont biologiques, pas des caprices. Source : Moore 2016."
      },
      {
        titre: "Le hoquet et les grimaces",
        contenu: "Bébé a le hoquet plusieurs fois par jour : son diaphragme s'entraîne. Les grimaces pendant le sommeil ne sont pas de la douleur : c'est son cerveau qui traite les informations en sommeil paradoxal."
      }
    ],
    sante: [
      {
        titre: "L'allaitement",
        contenu: "8 à 12 tétées par 24h est normal. La montée de lait survient entre J2 et J4. Une bonne prise du sein : bouche grande ouverte, lèvres retroussées, menton contre le sein. Si douleur intense persistante : consulter une sage-femme ou une consultante IBCLC. Source : OMS."
      },
      {
        titre: "Le cordon ombilical",
        contenu: "Il tombe en général entre 5 et 15 jours. Nettoie-le à l'eau, avec un savon doux si besoin, sèche-le bien et laisse-le à l'air, hors de la couche. Ne cherche pas à l'enlever. C'est normal qu'il noircisse avant de tomber. Si rougeur autour, odeur forte ou écoulement : consulte le jour même. Source : SFN 2023."
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
        contenu: "La privation de sommeil est un facteur de risque reconnu de dépression post-partum, pour elle comme pour toi. Si elle allaite, prends en charge le change, le portage et le recoucher après chaque tétée. Si biberon, alternez les nuits. Ce geste est l'un des plus importants de ce mois."
      },
      {
        titre: "Le baby blues : c'est réel",
        contenu: "50 à 80% des femmes vivent un baby blues entre J3 et J5 : larmes soudaines, euphorie suivie d'effondrement, épuisement. C'est hormonal, normal, et ça passe en quelques jours. Si ça dure plus de deux semaines : consulter un médecin. Source : CNGOF."
      },
      {
        titre: "Ta propre santé mentale",
        contenu: "Environ 1 père sur 10 traverse une dépression autour de la naissance, avec un pic entre 3 et 6 mois après l'arrivée de bébé. Signes : irritabilité, retrait, anxiété excessive, sentiment d'être inutile. En parler à un médecin est un signe de force, pas de faiblesse. Source : Paulson et Bazemore, JAMA 2010."
      },
      {
        titre: "Reconnais les signaux de faim",
        contenu: "Bébé indique qu'il a faim avant de pleurer : il tourne la tête, ouvre la bouche, porte ses mains à sa bouche. Répondre à ces signaux précoces évite le cycle pleurs-stress-tétée difficile. Source : AAP 2022."
      }
    ,
      {
        titre: "Fais-toi confiance",
        contenu: "Bébé est là. Tu n'es pas prêt à 100% et personne ne l'est. Ce que tu ressens, l'amour mélangé à la peur, c'est exactement ce que doit ressentir un père qui s'implique. Tu es prêt. Fais-toi confiance."
      },
      {
        titre: "Le rythme des nuits",
        contenu: "Les premières semaines, bébé se réveille toutes les 2 à 3 heures pour manger. C'est son rythme physiologique normal jusqu'à environ 3 mois. Pas d'inquiétude si les nuits semblent chaotiques : c'est temporaire et attendu."
      }],
    activites: [
      { titre: "Le peau à peau", contenu: "30 minutes de peau à peau par jour, torse nu contre torse nu. Ça régule sa température, stabilise son rythme cardiaque et renforce ton lien avec lui. Tu peux faire ça en regardant un film ou en lisant." },
      { titre: "Le bain du soir", contenu: "Eau à 37°C, 5 minutes maximum. Parle-lui doucement pendant tout le bain. Pas besoin de savon à chaque fois. Ce rituel quotidien l'apaise et t'appartient." },
      { titre: "Le massage bébé", contenu: "Après le bain, quelques minutes de massage doux sur ses jambes, son ventre et son dos. Des mouvements lents et réguliers. La chaleur de tes mains le rassure." }
    ],
    rdv: "Examen obligatoire dans les 8 jours, par un médecin (souvent à la maternité), qui remplit le 1er certificat de santé. Puis un examen au cours de la 2e semaine et un autre vers 1 mois. La sage-femme de ville peut faire des visites à domicile : demande-la avant la sortie de maternité.",
    vaccins: "BCG si indiqué. Pas de vaccin obligatoire avant 2 mois.",
    alerte: "Température de 38 °C ou plus avant 3 mois : urgences pédiatriques sans attendre. Refus de s'alimenter sur 2 tétées consécutives. Fontanelle bombée. Difficultés respiratoires : appeler le 15. Fais confiance à ton instinct : si quelque chose te semble anormal, appelle. Tu ne dérangeras jamais trop."
  },

  1: {
    titre: "L'éveil",
    intro: "Bébé commence à sourire pour de vrai. Pas le sourire du gaz du mois dernier : un sourire social, en réponse à ton visage. C'est le début d'une communication réelle.",
    developpement: [
      {
        titre: "Le sourire social",
        contenu: "Vers 6 semaines, bébé sourit en réponse à ton visage et ta voix. Ce n'est plus un réflexe : c'est une communication intentionnelle. Réponds toujours à son sourire par un sourire. Tu lui apprends que la communication fonctionne. Source : Brazelton 2006."
      },
      {
        titre: "Le contrôle de la tête",
        contenu: "Il tient sa tête quelques secondes en position ventrale. Le tummy time (ventre sur le sol, sous surveillance) est essentiel : 2 à 3 minutes plusieurs fois par jour. C'est inconfortable pour lui au début. Reste avec lui."
      },
      {
        titre: "Les sons",
        contenu: "Premiers sons voyelles. Il réagit aux voix familières en tournant la tête. Il répond dans une conversation en alternant. Parle-lui face à face en exagérant tes expressions. Son cerveau synchronise son activité avec la tienne. Source : Harvard CDC."
      },
      {
        titre: "La vision",
        contenu: "Sa vision s'améliore. Il suit des yeux un objet qui se déplace lentement. Il préfère les visages aux objets, et les visages familiers aux inconnus."
      },
      {
        titre: "Ce qu'il aime ce mois",
        contenu: "Les mobiles avec des contrastes forts. Ta voix qui lui parle directement. Être tenu en position semi-assise pour regarder le monde. Le peau à peau reste très important."
      }
    ],
    sante: [
      {
        titre: "Les coliques",
        contenu: "Pleurs intenses plus de 3h par jour, plus de 3 jours par semaine, pendant plus de 3 semaines. Touchent 20% des bébés. Cause incertaine, disparaissent spontanément vers 3 mois. Le portage, la chaleur sur le ventre et le mouvement rythmé aident. Source : HAS 2021."
      },
      {
        titre: "Les régurgitations",
        contenu: "Normales si bébé grossit bien et n'a pas l'air douloureux. Signe de RGO pathologique : pleurs pendant la tétée, refus de manger, mauvaise prise de poids. Dans ce cas, consulter. Source : ESPGHAN 2018."
      }
    ],
    papa: [
      {
        titre: "Dépression post-partum paternelle",
        contenu: "Environ 10 % des pères traversent une dépression entre la grossesse et la première année de bébé, et jusqu'à 1 sur 4 entre 3 et 6 mois après la naissance. Symptômes peu connus : irritabilité, retrait, anxiété excessive, prise de risques. En parler à un médecin change les choses. Source : Paulson et Bazemore, JAMA 2010."
      },
      {
        titre: "Parle-lui en faisant les choses",
        contenu: "Là, je te mets ton pyjama, maintenant on va au bain, voilà ton biberon. Nommer chaque geste du quotidien construit le vocabulaire plus efficacement que les jeux éducatifs. Source : Hart et Risley 1995."
      }
    ],
    activites: [
      { titre: "Le mobile maison", contenu: "Des formes noires et blanches suspendues à 25 cm de ses yeux. Il les fixe, les suit. Tu peux les fabriquer avec du papier. Ça vaut n'importe quel mobile vendu en magasin." },
      { titre: "Tummy time quotidien", contenu: "Ventre sur le sol, sous ta surveillance. Commence par 2 minutes, augmente progressivement. Mets-toi à son niveau et parle-lui pour l'encourager." },
      { titre: "La danse", contenu: "Tiens-le contre toi et danse doucement. Il aime le mouvement, le rythme, ta chaleur. C'est du portage déguisé." }
    ],
    rdv: "Examen du 2e mois obligatoire. Début du calendrier vaccinal. Ne pas rater.",
    vaccins: "À 2 mois : DTCaP-Hib-HepB (hexavalent) 1re dose + pneumocoque 1re dose (obligatoires). Rotavirus 1re dose par voie orale (recommandé). Source : calendrier des vaccinations 2025.",
    alerte: "Absence de sourire à 2 mois ou absence de réaction aux sons : parles-en au pédiatre. Bébé très mou, comme une poupée de chiffon, ou qui perd du poids : consulte rapidement."
  },

  2: {
    titre: "La découverte",
    intro: "3 mois. Le cap souvent décrit comme une renaissance. Les coliques s'estompent, le sommeil s'organise, et bébé rit aux éclats pour la première fois.",
    developpement: [
      {
        titre: "Le rire",
        contenu: "Le premier vrai rire arrive généralement entre 2,5 et 4 mois. Court, souvent inattendu. Il reconnaît ses parents à la vue et cherche activement le contact visuel."
      },
      {
        titre: "Les mains",
        contenu: "Il découvre ses mains, les observe avec fascination, les porte à la bouche, tente de saisir les objets. C'est le début de la coordination œil-main, base de toute manipulation future."
      },
      {
        titre: "Le contrôle de la tête",
        contenu: "Tenu assis avec soutien, il maintient sa tête droite. En tummy time, il se redresse sur ses avant-bras et lève la tête à 45 degrés."
      },
      {
        titre: "La reconnaissance des émotions",
        contenu: "Il distingue une voix heureuse d'une voix triste ou en colère. Son cerveau limbique cartographie déjà les émotions. Ta stabilité émotionnelle est sa sécurité."
      },
      {
        titre: "Le sommeil",
        contenu: "Les nuits s'allongent progressivement. 4 à 6h de sommeil continu est possible. Expose-le à la lumière naturelle le matin pour l'aider à régler son horloge biologique. Source : Touchette 2005."
      }
    ],
    sante: [
      {
        titre: "La diversification : pas encore",
        contenu: "La diversification alimentaire ne commence pas avant 4 mois révolus (17 semaines). Le lait couvre tous les besoins. Introduire trop tôt augmente le risque d'allergies. Source : OMS / HAS."
      },
      {
        titre: "La régression du sommeil à 4 mois approche",
        contenu: "Vers 3-4 mois, le sommeil se restructure. Bébé passe de cycles néonataux à des cycles adultes, ce qui crée des réveils entre les cycles. Normal, attendu, temporaire."
      }
    ],
    papa: [
      {
        titre: "Le jeu : c'est ton domaine",
        contenu: "Montre-lui des objets colorés, lis des livres cartonnés. Le jeu n'est pas un luxe : c'est le moteur principal du développement cognitif et émotionnel. Source : Ginsburg 2007."
      },
      {
        titre: "Reprendre une activité physique",
        contenu: "3 mois de privation de sommeil et de stress ont un impact réel sur ton énergie et ton humeur. 30 minutes d'activité physique 3 fois par semaine améliore significativement les deux. Source : Inserm."
      }
    ],
    activites: [
      { titre: "Les hochets légers", contenu: "Pose un hochet léger dans sa main. Il commence à attraper et secouer intentionnellement. Laisse-le explorer seul, n'aide pas à chaque fois." },
      { titre: "Les livres cartonnés", contenu: "Des livres avec peu de mots et des images simples en contraste fort. Lis à voix haute avec des intonations variées. Il ne comprend pas les mots mais enregistre le rythme et la musicalité du langage." },
      { titre: "Le miroir", contenu: "Montre-lui son reflet. Il observe ce bébé qui l'imite avec fascination. Fais des grimaces ensemble. C'est l'un de ses jeux préférés ce mois-ci." }
    ],
    rdv: "Examen du 3e mois obligatoire. C'est aussi le moment des vaccins des 3 mois.",
    vaccins: "À 3 mois : méningocoque B 1re dose (obligatoire). Rotavirus 2e dose (recommandé). Source : calendrier des vaccinations 2025.",
    alerte: "Absence de rires ou de vocalises. Absence de suivi visuel. Pas de réaction aux sons forts. Raideur ou mollesse anormale des membres."
  },

  3: {
    titre: "La régression du sommeil",
    intro: "Les nuits s'amélioraient. Et là elles se dégradent. C'est la régression du sommeil à 4 mois. C'est normal, documenté, et temporaire. Ça ne veut pas dire que tu fais mal quelque chose.",
    developpement: [
      {
        titre: "La régression du sommeil",
        contenu: "Vers 3-4 mois, le sommeil de bébé se restructure pour ressembler au sommeil adulte. Il se réveille plus facilement entre ses cycles (environ 50 à 60 minutes chez le bébé) et ne sait pas encore se rendormir seul. C'est une étape neurologique, pas un problème de comportement."
      },
      {
        titre: "Les mains comme outils",
        contenu: "Il attrape intentionnellement les objets présentés. Il les porte à sa bouche : c'est de l'exploration sensorielle, pas juste de la succion. Laisse-le faire."
      },
      {
        titre: "La permanence de l'objet débute",
        contenu: "Il commence à chercher un objet qu'il a laissé tomber. Son cerveau commence à comprendre que les choses continuent d'exister même quand il ne les voit pas."
      },
      {
        titre: "Les vocalises",
        contenu: "Gazouillements variés, syllabes comme ba, da, ma. Il répond quand tu lui parles en alternant. C'est une conversation. Réponds à chaque son."
      }
    ],
    sante: [
      {
        titre: "Début de diversification possible",
        contenu: "Entre 17 et 26 semaines selon l'enfant. Commencer si bébé tient sa tête, montre de l'intérêt pour la nourriture, n'a plus le réflexe d'extrusion (ne repousse plus la cuillère avec la langue). Légumes en purée lisse, sans sel ni sucre. Source : HAS / PNNS 2023."
      },
      {
        titre: "Sécuriser la table à langer",
        contenu: "Bébé commence à se retourner. Ne le laisse jamais seul sur une surface élevée. Garde toujours une main sur lui pendant le change."
      }
    ],
    papa: [
      {
        titre: "La lecture quotidienne",
        contenu: "Lire à voix haute chaque jour l'expose à beaucoup plus de mots : environ 290 000 mots de plus entendus à 5 ans avec un livre par jour. Choisis des livres avec peu de mots et des images contrastées. Source : Logan 2019."
      },
      {
        titre: "Les rituels du coucher",
        contenu: "Bain, pyjama, tétée ou biberon, chanson, dodo. Toujours dans le même ordre. La prévisibilité est sécurisante pour un cerveau de 4 mois. Prends en charge ce rituel plusieurs soirs par semaine."
      },
      {
        titre: "La charge mentale",
        contenu: "4 mois après la naissance, la répartition des tâches peut cristalliser des tensions. La charge mentale (rendez-vous, stocks, tailles suivantes) est souvent invisible. Une conversation directe vaut mieux que du ressentiment."
      }
    ],
    activites: [
      { titre: "Explorer les textures", contenu: "Fais-lui toucher des surfaces différentes : tissu doux, bois, plastique, ta barbe, un glaçon dans un tissu. Il enregistre chaque sensation." },
      { titre: "Les hochets et anneaux", contenu: "Pose des hochets légers dans sa main. Il commence à attraper et à secouer intentionnellement. Chaque objet est une expérience." },
      { titre: "Le miroir à deux", contenu: "Assis face au miroir avec lui, montre-lui ton reflet et le sien. Nomme ce que tu vois. Montre-lui ton nez, puis le sien. Il commence à différencier les personnes." }
    ],
    rdv: "Examen du 4e mois obligatoire.",
    vaccins: "À 4 mois : DTCaP-Hib-HepB 2e dose + pneumocoque 2e dose (obligatoires). 3e dose de rotavirus si le vaccin utilisé en prévoit trois. Source : calendrier des vaccinations 2025.",
    alerte: "Si bébé n'attrape pas encore d'objets, ne gazouille pas ou présente des mouvements asymétriques, mentionne-le au pédiatre. Ce n'est pas forcément inquiétant, mais un regard médical est toujours utile."
  },

  4: {
    titre: "La curiosité",
    intro: "Tout l'intéresse. Il attrape, examine, mordille, lâche, recommence. C'est sa façon d'apprendre. Le monde est un laboratoire et toi tu es son guide.",
    developpement: [
      {
        titre: "La reconnaissance sociale",
        contenu: "Bébé distingue les visages familiers des étrangers. L'angoisse de l'étranger peut débuter. Il reconnaît son prénom et réagit quand on l'appelle."
      },
      {
        titre: "La motricité",
        contenu: "Se retourne dos-ventre. Peut se tenir assis avec appui. Attrape les objets à pleine main et les porte à la bouche. La pince pouce-index viendra plutôt vers 9 mois. Source : Denver II."
      },
      {
        titre: "L'attachement préférentiel",
        contenu: "Il manifeste une préférence claire pour ses figures d'attachement. Ne le force jamais à faire le beau avec quelqu'un qu'il ne connaît pas. Un attachement sécure est un facteur de protection important pour sa santé émotionnelle future. Source : Bowlby / Ainsworth."
      },
      {
        titre: "Les premiers sons proto-linguistiques",
        contenu: "Il produit des sons consonantiques : ba, ma, da. Ces sons sont le résultat de l'entraînement vocal des mois précédents. Réponds-lui comme s'il parlait."
      }
    ],
    sante: [
      {
        titre: "La diversification alimentaire",
        contenu: "Si commencée, introduire les légumes un à un avec 4 à 7 jours entre chaque : carottes, courgettes, haricots verts, potiron. Purée lisse sans sel ni sucre. Source : PNNS / HAS."
      },
      {
        titre: "La dentition",
        contenu: "Les premières dents (incisives inférieures) peuvent apparaître entre 5 et 8 mois. Signes : bave, irritabilité, besoin de mordre. La fièvre élevée n'est pas liée aux dents. Source : AAP."
      }
    ],
    papa: [
      {
        titre: "Les activités d'éveil",
        contenu: "Bacs à textures (tissu, bois, plastique), musique avec différents instruments, livres à toucher. Tu peux fabriquer des jouets simples : une petite bouteille avec du riz dedans, bouchon bien vissé et scotché, fait un excellent hochet."
      },
      {
        titre: "Ne pas forcer le contact",
        contenu: "Si bébé pleure avec un inconnu, ne le force pas à y aller. L'attachement sécure se construit en respectant ses signaux. Il viendra à son rythme."
      }
    ],
    activites: [
      { titre: "Le sol à plat ventre", contenu: "Installe-le au sol sur le ventre ou sur le dos, avec des jouets autour. Il découvre le monde à sa façon et renforce son dos. Laisse-le trouver seul la position assise." },
      { titre: "Les premières purées en jeu", contenu: "Si la diversification a commencé, laisse-le toucher la purée avec ses doigts. Mettre les mains dans la nourriture est une exploration sensorielle normale." },
      { titre: "Cacher et retrouver", contenu: "Cache un jouet sous une couverture devant ses yeux. Laisse-le le chercher. C'est l'entraînement de la permanence de l'objet, une étape cognitive majeure." }
    ],
    rdv: "Examen du 5e mois obligatoire. Pense à faire le point sur la diversification si elle a commencé.",
    vaccins: "Méningocoque B 2e dose (obligatoire). Source : calendrier des vaccinations 2025.",
    alerte: "Asymétrie dans les mouvements. Absence de retournement. Perte d'acquis (régression)."
  },

  5: {
    titre: "La moitié de la première année",
    intro: "Six mois. Bébé pèse environ le double de son poids de naissance. Il mange de la nourriture solide, rit, joue, vous reconnaît de loin.",
    developpement: [
      {
        titre: "Le langage",
        contenu: "Syllabes redupliquées : bababa, mamama, dadada. Ce n'est pas encore du langage mais l'entraînement phonologique qui y conduit. Plus tu lui parles, plus son cerveau se structure. Réponds à ses syllabes comme si c'était une vraie conversation. Source : Kuhl 2007."
      },
      {
        titre: "La position assise",
        contenu: "Assis sans soutien pendant quelques secondes, puis de plus en plus longtemps. Transfert d'objet d'une main à l'autre. Ne mets pas de cale pour le maintenir assis : il doit trouver son équilibre seul. Source : Denver II."
      },
      {
        titre: "La permanence de l'objet",
        contenu: "Il cherche un objet qu'on vient de cacher sous un tissu devant lui. Il comprend que l'objet existe encore même s'il ne le voit plus. Étape majeure de Piaget. Joue à ce jeu régulièrement."
      },
      {
        titre: "La peur de l'étranger",
        contenu: "Elle se renforce ce mois. Il peut pleurer avec des personnes qu'il ne voit pas régulièrement. Expositions régulières et progressives, sans forcer. Source : Ainsworth 1978."
      }
    ],
    sante: [
      {
        titre: "La diversification a 6 mois",
        contenu: "L'OMS recommande 6 mois d'allaitement exclusif. En France, la diversification peut commencer entre 4 et 6 mois révolus. Viande, poisson et œuf bien cuits peuvent être proposés dès le début, en petite quantité (environ 10 g par jour, soit 2 cuillères à café). Source : Santé publique France 2021."
      },
      {
        titre: "Introduction précoce des allergènes",
        contenu: "Les allergènes majeurs (œuf, arachide, gluten, produits laitiers) sont à introduire dès le début de la diversification, entre 4 et 6 mois, même s'il y a des allergies dans la famille. L'arachide toujours en poudre ou en purée lisse, jamais de cacahuète entière (risque d'étouffement). Source : Santé publique France 2021."
      },
      {
        titre: "Les premières dents",
        contenu: "Les incisives centrales inférieures apparaissent généralement entre 6 et 10 mois. Une fois sorties, brosse-les matin et soir avec une brosse à dents adaptée et une trace de dentifrice fluoré à 1000 ppm. Source : UFSBD 2022."
      }
    ],
    papa: [
      {
        titre: "Motricité libre",
        contenu: "Laisse bébé explorer le sol en sécurité, sans le mettre assis ou debout avant qu'il ne le fasse seul. Un bébé qui trouve seul sa position est plus habile qu'un bébé installé. Source : Pikler / Bernard-Bonnin 2012."
      },
      {
        titre: "L'examen du 6e mois",
        contenu: "C'est l'un des examens pédiatriques les plus complets. Viens avec une liste de tes observations : comment il mange, dort, se déplace, réagit. Tu es un parent observateur si tu es présent au quotidien."
      }
    ,
      {
        titre: "La diversification alimentaire",
        contenu: "À 6 mois révolus, bébé peut commencer à manger autre chose que du lait. La diversification menée par l'enfant (DME) consiste à proposer des morceaux adaptés qu'il attrape seul, sous surveillance constante. Purées et morceaux sont tous les deux valides : l'important est de varier les saveurs et les textures progressivement."
      },
      {
        titre: "La langue des signes bébé",
        contenu: "Dès 6 mois, tu peux apprendre quelques signes simples inspirés de la langue des signes française : manger, lait, encore, dodo. Répète chaque signe avec le mot à voix haute. Bébé commencera à les reproduire vers 8 à 10 mois, avant même de parler. Cela réduit la frustration et renforce la communication."
      }],
    activites: [
      { titre: "Le bain assis", contenu: "Installe-le assis dans le bain, une main toujours sur lui, et laisse-le taper dans l'eau. Ne le laisse jamais seul, même quelques secondes : quelques centimètres d'eau suffisent pour une noyade." },
      { titre: "Les chansons avec gestes", contenu: "Les chansons avec des gestes (promenons-nous, une souris verte) renforcent la coordination et le langage en même temps. Répète les mêmes chansons : la répétition est de l'apprentissage." },
      { titre: "L'exploration sensorielle", contenu: "Pose-le sur différentes surfaces : herbe, sable, moquette, carrelage. Chaque texture est une information nouvelle pour son cerveau." }
    ],
    rdv: "Examen du 6e mois obligatoire. Bilan complet : motricité, langage, vision, audition.",
    vaccins: "Méningocoque ACWY 1re dose (obligatoire). Source : calendrier des vaccinations 2025.",
    alerte: "Absence de syllabes. Pas de tenue assise avec appui. Absence de sourire réciproque. Régressions notables."
  },

  6: {
    titre: "En mouvement",
    intro: "Bébé commence à se déplacer. L'espace autour de lui doit maintenant être sécurisé. La chute est la première cause d'accident à cet âge.",
    developpement: [
      {
        titre: "Déplacement",
        contenu: "Rampement, 4 pattes ou retournements successifs. Chaque bébé trouve sa technique. Le 4 pattes croisé (bras gauche + jambe droite) est idéal neurologiquement mais pas obligatoire. Les chutes font partie de l'apprentissage. Source : AAP 2022."
      },
      {
        titre: "Permanence de l'objet renforcée",
        contenu: "Bébé comprend qu'un objet caché existe encore et le cherche activement. Base de la pensée abstraite. Cache un jouet sous une couverture devant lui et laisse-le chercher. Source : Piaget 1954."
      },
      {
        titre: "La communication gestuelle",
        contenu: "Il commence à faire au revoir avec la main, à tendre les bras pour être pris. Ces gestes précèdent le langage verbal et sont aussi importants que les mots."
      }
    ],
    sante: [
      {
        titre: "Sécurisation du domicile",
        contenu: "Bloquer les prises électriques, sécuriser les coins de table, installer des barrières d'escalier. Placer tous les produits ménagers hors de portée. Attacher les meubles lourds aux murs. La chute est la 1re cause d'accident à cet âge. Source : Santé Publique France."
      },
      {
        titre: "Alimentation à 7 mois",
        contenu: "Viande, poisson ou œuf bien cuits : environ 10 g par jour. Légumes et fruits bien acceptés. Continuer le lait en parallèle. Éviter sel, sucre, miel. Source : Santé publique France 2021."
      }
    ],
    papa: [
      {
        titre: "Cache-cache",
        contenu: "Se cacher derrière tes mains puis réapparaître est bien plus qu'un jeu : c'est l'entraînement de la permanence de l'objet et de la gestion émotionnelle de la séparation. Bébé apprend que tu reviens toujours. Source : Stern 1985."
      },
      {
        titre: "Sécuriser sans surprotéger",
        contenu: "Sécurise l'environnement mais laisse-le explorer. Un bébé qui ne tombe jamais n'apprend pas à gérer les risques. L'objectif : un environnement sûr dans lequel il peut prendre des petits risques. Source : Adolph 2012."
      }
    ],
    activites: [
      { titre: "Le parcours au sol", contenu: "Crée un petit parcours avec des coussins, une couverture roulée, un tunnel. Il rampera, grimpera, explorera. Reste à proximité mais n'aide pas à chaque obstacle." },
      { titre: "Les jeux de balles", contenu: "Une balle légère qu'il peut attraper et lancer (même maladroitement). Roule-la vers lui et attends qu'il te la renvoie. Ça peut durer très longtemps." },
      { titre: "La musique active", contenu: "Tape sur une casserole avec une cuillère en bois. Il adore le bruit qu'il peut créer lui-même. Le sentiment de causer quelque chose est fondamental pour le développement de l'agentivité." }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de déplacement. Asymétrie motrice. Absence de permanence de l'objet."
  },

  7: {
    titre: "L'angoisse de séparation",
    intro: "L'angoisse du 8e mois est à son pic. Bébé pleure quand tu pars, même 30 secondes. C'est un signe d'attachement sain et sécure. Il sait que tu existes quand tu n'es pas là. C'est un progrès.",
    developpement: [
      {
        titre: "Angoisse du 8e mois",
        contenu: "Normale et attendue entre 6 et 12 mois. Bébé prend conscience qu'il est séparé de ses parents et que tu peux partir. Un attachement sécure est la meilleure protection contre l'anxiété future. Source : Ainsworth 1978."
      },
      {
        titre: "Compréhension du langage",
        contenu: "Non, donne, bravo, viens. Bébé commence à comprendre des mots simples avant de les parler. Son vocabulaire de compréhension est bien supérieur à ce qu'il peut dire. Continue à lui parler souvent et normalement. Source : Bates 1976."
      },
      {
        titre: "La pince pouce-index débute",
        contenu: "Il commence à saisir de petits objets avec précision. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent être avalés. Source : Denver II."
      }
    ],
    sante: [
      {
        titre: "Alimentation à 8 mois",
        contenu: "Texture : purées avec petits morceaux mous. Viande ou poisson : 10g par jour. Introduire progressivement les textures pour prévenir le refus alimentaire futur. Éviter sel, sucre, miel. Source : HAS / PNNS."
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
        contenu: "Bain, pyjama, tétée ou biberon, lecture, câlin, dodo. Toujours dans le même ordre. La prévisibilité est sécurisante. Prends en charge ce rituel au moins 3 soirs par semaine."
      }
    ],
    activites: [
      { titre: "Les jeux de cache-cache", contenu: "Cache-toi derrière un meuble et réapparais. Bébé rit à chaque fois. Ce n'est pas juste du fun : il entraîne sa gestion de la séparation et la permanence de l'objet." },
      { titre: "Les empilements", contenu: "Des gros cubes qu'il peut empiler et renverser. Il adore surtout les renverser. Laisse-le faire : c'est de la physique appliquée." },
      { titre: "L'eau au bain", contenu: "Des petits contenants : gobelet, écumoire, arrosoir. Vider, remplir, renverser. Il peut rester 20 minutes dans le bain avec ça. Reste avec lui." }
    ],
    rdv: "Pas d'examen obligatoire ce mois. Le prochain a lieu au cours du 9e mois, avec le 2e certificat de santé.",
    vaccins: "Grippe si indiqué (prématurés, pathologies chroniques).",
    alerte: "Absence de réaction à son prénom. Pas de syllabes variées. Absence de geste au revoir. Régression importante."
  },

  8: {
    titre: "Les premiers mots",
    intro: "Mama et dada commencent à avoir du sens. Bébé pointe du doigt ce qui l'intéresse. C'est de la communication intentionnelle. C'est majeur.",
    developpement: [
      {
        titre: "Premiers mots signifiants",
        contenu: "Les premiers mots apparaissent entre 9 et 14 mois. Mama et dada associés à la bonne personne. Réponds à chaque tentative de communication. Le vocabulaire expressif à 12 mois prédit le développement du langage à 2 ans. Source : Fenson 1994."
      },
      {
        titre: "Le pointage proto-déclaratif",
        contenu: "Bébé pointe du doigt un objet, te regarde pour partager sa découverte, puis regarde l'objet. Ce geste dit : regarde ça avec moi. C'est le partage d'attention conjointe, précurseur essentiel du langage. Source : Bates 1976."
      },
      {
        titre: "La pince pouce-index",
        contenu: "Bébé peut saisir de très petits objets avec précision. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent être avalés. Source : Denver II."
      }
    ],
    sante: [
      {
        titre: "Alimentation à 9 mois",
        contenu: "3 repas et 2 laitages par jour. Introduire les féculents et légumineuses. Éviter sel, sucre ajouté, miel avant 1 an, charcuterie. Aucun jus de fruits avant 1 an. Les morceaux mous sont maintenant la norme. Source : PNNS / HAS 2021."
      },
      {
        titre: "Le brossage des dents",
        contenu: "Dès la première dent : brosse matin et soir avec une brosse à dents adaptée et une trace de dentifrice fluoré à 1000 ppm. Source : UFSBD 2022."
      }
    ],
    papa: [
      {
        titre: "Lire chaque soir",
        contenu: "10 minutes de lecture à voix haute chaque soir, c'est l'une des habitudes les plus utiles pour son langage. Un enfant à qui on lit un livre par jour aura entendu environ 290 000 mots de plus à 5 ans, et jusqu'à 1,4 million avec 5 livres par jour. Source : Logan 2019."
      },
      {
        titre: "Répondre au pointage",
        contenu: "Quand bébé pointe quelque chose, regarde dans la même direction et nomme l'objet. Ce geste simple est l'un des plus puissants pour le développement du langage."
      }
    ],
    activites: [
      { titre: "Les escaliers en sécurité", contenu: "Apprends-lui à monter et descendre à reculons. Montre-lui le geste en premier. C'est une compétence motrice utile qu'il peut apprendre maintenant." },
      { titre: "Les premiers gribouillis", contenu: "Des gros crayons de cire sur du papier épais. Il ne dessine pas encore, mais il adore laisser une trace. Valorise chaque gribouillis." },
      { titre: "La récré dehors", contenu: "Herbe, sable, graviers, flaques d'eau. Les textures naturelles sont irremplaçables. Laisse-le salir. L'exploration sensorielle extérieure est fondamentale." }
    ],
    rdv: "Examen du 9e mois obligatoire, avec le 2e certificat de santé. Motricité, langage, vision, audition. Prépare tes questions.",
    vaccins: "Pas de vaccin prévu ce mois. Si une dose a été oubliée, le médecin peut la rattraper.",
    alerte: "Absence de pince pouce-index. Pas de syllabes variées. Absence de compréhension de mots simples."
  },

  9: {
    titre: "La communication intentionnelle",
    intro: "Il te dit quelque chose. Peut-être pas avec des mots, mais avec des gestes et des regards. Il pointe du doigt ce qui l'intéresse. Il veut que tu le voies. C'est majeur.",
    developpement: [
      {
        titre: "Debout et premiers pas",
        contenu: "Bébé se met debout en s'aidant des meubles. Marche en se tenant. Les premières chutes font partie de l'apprentissage : ne pas surréagir. Il tombe, il se relève, il recommence. Source : Adolph 2012."
      },
      {
        titre: "Imitation",
        contenu: "Il imite gestes et sons volontairement : taper des mains, faire coucou, souffler. L'imitation est le moteur principal de l'apprentissage du langage et des comportements sociaux. Joue à l'imiter et laisse-le t'imiter. Source : Meltzoff 2002."
      },
      {
        titre: "Les limites",
        contenu: "Il commence à tester ce qu'il peut faire et ce qu'il ne peut pas. C'est nécessaire. Lui dire non calmement et fermement, sans s'énerver, lui permet de comprendre le monde."
      }
    ],
    sante: [
      {
        titre: "Alimentation autonome",
        contenu: "Propose des morceaux qu'il peut saisir seul : légumes cuits mous, fruits mous, pain. Le manger-main développe l'autonomie et la motricité fine. Surveille mais n'interviens pas à chaque bouchée. Source : HAS."
      }
    ],
    papa: [
      {
        titre: "La limite bienveillante",
        contenu: "Non signifie non, dit calmement et fermement. La constance compte plus que le ton : si un non devient parfois un oui quand il insiste, il apprend à insister davantage."
      },
      {
        titre: "Exploration sécurisée",
        contenu: "Laisse-le explorer au sol, en extérieur, dans la boue si besoin. Les textures naturelles sont irremplaçables pour le développement sensoriel. Un enfant qui explore apprend. Source : Adolph 2012."
      }
    ],
    activites: [
      { titre: "Les premières chutes encouragées", contenu: "Quand il tombe, ne pas dramatiser. Un 'Oupsss, tu t'es levé !' plutôt qu'un cri de frayeur. Ta réaction détermine la sienne." },
      { titre: "Tri et classement", contenu: "Des objets de différentes couleurs ou tailles à trier dans des bols. Il ne classe pas encore vraiment, mais il manipule et explore. C'est suffisant." },
      { titre: "La lecture participative", contenu: "Pose des questions sur les images. Où est le chien ? Il cherche avec son doigt. Cette interaction booste son langage." }
    ],
    rdv: "Pas de rendez-vous obligatoire.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de mise debout avec appui. Pas de pointage du doigt. Absence de compréhension simple."
  },

  10: {
    titre: "Les premiers pas approchent",
    intro: "Peut-être ce mois, peut-être dans quelques semaines. L'âge normal des premiers pas va de 9 à 18 mois. Chaque bébé a son rythme. Ne pas comparer.",
    developpement: [
      {
        titre: "Marche",
        contenu: "Bébé marche en se tenant aux meubles. Certains font leurs premiers pas seuls ce mois, d'autres attendront encore. Les premiers pas entre 9 et 18 mois sont tous normaux. Source : Denver II."
      },
      {
        titre: "Langage expressif",
        contenu: "2 à 5 mots signifiants en moyenne à 12 mois. Mais la variabilité est énorme. L'essentiel : comprend-il ce qu'on lui dit ? Si oui, le langage expressif suivra. Source : Fenson 1994."
      },
      {
        titre: "Le jeu symbolique naissant",
        contenu: "Il fait semblant de dormir, de manger, de téléphoner. Précurseur de la pensée abstraite et de la créativité. Joue avec lui : fais semblant de boire dans sa tasse vide."
      }
    ],
    sante: [
      {
        titre: "Alimentation à 11 mois",
        contenu: "Repas de plus en plus proches des repas familiaux, sans sel ajouté. Les légumineuses (lentilles, pois chiches) sont une excellente source de protéines et de fer. Varier les textures et les couleurs. Source : PNNS 2023."
      }
    ],
    papa: [
      {
        titre: "Lâche-le",
        contenu: "Quand il essaie de marcher, résiste à l'envie de le tenir. Laisse-le trouver son équilibre seul. Les chutes maîtrisées lui apprennent à gérer son corps. Source : Adolph 2012."
      },
      {
        titre: "Ton bilan de 11 mois",
        contenu: "Dans un mois, bébé a 1 an. C'est aussi ton 1er anniversaire de père. Tu as appris plus cette année que tu ne le mesures. Prépare quelque chose de simple pour marquer ce cap."
      }
    ],
    activites: [
      { titre: "Les premiers pas encouragés", contenu: "Tends les mains à 50 cm de lui et encourage-le à venir vers toi. Pas trop loin pour ne pas frustrer. Chaque pas est une victoire à célébrer clairement." },
      { titre: "Tri et classement", contenu: "Des objets de différentes couleurs ou tailles à trier dans des bols. Il ne classe pas encore vraiment, mais il manipule, transvase, explore." },
      { titre: "La lecture participative", contenu: "Pose des questions sur les images. Où est le chien ? Il cherche avec son doigt. Cette interaction booste son langage plus que la lecture passive." }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois.",
    vaccins: "À 11 mois : rappels DTCaP-Hib-HepB et pneumocoque (obligatoires). Source : calendrier des vaccinations 2025.",
    alerte: "Absence de mise debout. Pas de mots signifiants. Régression d'acquis. Absence d'intérêt pour les autres."
  },

  11: {
    titre: "1 an !",
    intro: "Un an. Un cap immense. Bébé marche (ou presque), dit ses premiers mots, te reconnaît de loin, rit avec toi. Cette année vous a transformés. Tous les deux.",
    developpement: [
      {
        titre: "Les premiers pas",
        contenu: "La marche indépendante arrive en moyenne vers 12 à 13 mois, mais tout est dans la norme entre 9 et 18 mois. Évite les trotteurs : ils n'aident pas à marcher et exposent à des chutes graves."
      },
      {
        titre: "Le langage",
        contenu: "2 à 5 mots significatifs en moyenne à 12 mois. La compréhension est bien plus développée que la production. L'important : bébé comprend-il ce qu'on lui dit ? Source : Fenson 1994."
      },
      {
        titre: "Le jeu symbolique",
        contenu: "Premiers jeux du type faire semblant : faire boire une peluche, téléphoner avec un objet. C'est le début de la pensée symbolique, base du langage et de la cognition."
      },
      {
        titre: "L'attachement sécure construit",
        contenu: "Un bébé qui explore librement, utilise ses parents comme base de sécurité, est perturbé par les séparations mais se rassure rapidement au retour : cet attachement se construit sur 12 mois de réponses cohérentes. Source : Ainsworth."
      }
    ],
    sante: [
      {
        titre: "L'alimentation à 1 an",
        contenu: "Après 1 an, le lait de croissance est conseillé jusqu'à 3 ans, en alternance possible avec du lait de vache entier UHT (jamais écrémé ni demi-écrémé, pas de lait cru avant 5 ans). Compte environ 500 ml de produits laitiers par jour. Alimentation variée, 4 repas par jour. Source : Santé publique France 2021."
      },
      {
        titre: "Le dentiste",
        contenu: "Consultation recommandée dès 1 an. Première visite de repérage, pas de soin. Ça habitue bébé et permet au dentiste de dépister tôt. Source : UFSBD."
      }
    ],
    papa: [
      {
        titre: "Ce que tu lui as donné cette année",
        contenu: "Une présence stable. Des rituels. Un regard bienveillant. La sécurité de savoir qu'il peut explorer parce que tu es là quand il revient. Les pères qui s'impliquent activement la première année ont des enfants avec une meilleure régulation émotionnelle à 5 ans. Source : Feldman 2010."
      },
      {
        titre: "Toi, un an après",
        contenu: "Tu es différent. Plus patient que tu ne le pensais. Plus ému par des choses simples. Plus conscient de ce qui compte vraiment. Cette transformation est réelle et permanente."
      }
    ],
    activites: [
      { titre: "Le jardin ou le parc", contenu: "Sol irrégulier, herbe, petites pentes. Pour un marcheur débutant, l'extérieur est le meilleur terrain d'entraînement." },
      { titre: "Les puzzles 2-3 pièces", contenu: "Des encastrements simples avec de grosses pièces. Guide sa main sans faire à sa place." },
      { titre: "Cuisiner ensemble", contenu: "Assis dans sa chaise haute, donne-lui un bol et une cuillère pendant que tu prépares à manger. Il imite, il explore. C'est son premier cours de cuisine." }
    ],
    rdv: "Examen des 12 mois obligatoire. Bilan complet : motricité, langage, vision, audition. Prépare tes questions. Signale tout ce qui t'inquiète, même si ça te semble léger.",
    vaccins: "À 12 mois : ROR (rougeole, oreillons, rubéole) 1re dose + rappels méningocoque B et méningocoque ACWY (obligatoires). La 2e dose de ROR suit entre 16 et 18 mois. Source : calendrier des vaccinations 2025.",
    alerte: "Absence de mots. Pas de pointage. Absence de marche ou déplacement efficace. Pas de jeu d'imitation. La perte de compétences déjà acquises mérite toujours une consultation."
  }
};
