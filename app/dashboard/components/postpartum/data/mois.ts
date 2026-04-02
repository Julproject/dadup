import type { MoisData } from '../../../data/types';

export function getIdee(mois: number): string {
  const idees = [
    "Fais une empreinte de sa main ou son pied cette semaine. Dans 10 ans, tu te souviendras de ce moment.",
    "Filme-le qui babille. Ces sons disparaissent vite. Garde-les.",
    "Un selfie par semaine avec bébé, meme angle, meme endroit. Un an de photos, une vidéo de vie.",
    "Commence un carnet de ses premieres fois : premier rire, premier retournement, premier mot.",
    "Filme ses premiers fous rires. Le rire d'un bébé est impossible à oublier - mais on l'oublie quand meme.",
    "Une sortie juste vous deux ce mois. Toi et bébé. Sans elle. Tu en es capable.",
    "Note ses premiers sons qui ressemblent a des mots. Dans quelques semaines, ca sera des vrais mots.",
    "Prends une photo avec le meme doudou chaque mois jusqu'a 1 an. Le résultat vaut le coup.",
    "Filme ses premiers pas. Meme ratés. Surtout ratés.",
    "Enregistre une recette de ses purées préférées. Un jour, il voudra savoir.",
    "Organise une sortie spéciale pour ses 10 mois. Juste parce que.",
    "Prépare quelque chose pour son premier anniversaire. Pas grand chose. Juste quelque chose qui vient de toi.",
  ];
  return idees[Math.min(mois, 11)] || idees[0];
}

export const MOIS_DATA: Record<number, MoisData> = {
  0: {
    titre: "Les premieres semaines",
    intro: "Bienvenue dans le quatrieme trimestre. Bébé vient de quitter un environnement chaud, sombre et rythmé par les battements de coeur. Il a besoin de recréer ce cocon. Et toi, tu découvres que personne n'est vraiment préparé a ca.",
    developpement: [
      {
        titre: "Ce que voit bébé",
        contenu: "Sa vision est floue au-dela de 25 cm, exactement la distance entre ton visage et le sien pendant une tétée. Il distingue les contrastes forts : noir, blanc, rouge. Son visage préféré ? Le tien. Il te reconnait deja."
      },
      {
        titre: "Ce qu'il entend",
        contenu: "L'audition est son sens le plus développé a la naissance. Il reconnait la voix entendue in utero. Parle-lui normalement, pas en voix de bébé forcée. Ta voix grave le rassure depuis 9 mois. Source : Kisilevsky 2009."
      },
      {
        titre: "Ses réflexes primitifs",
        contenu: "Réflexe de Moro (il sursaute quand il se sent tomber), grasping (il serre ton doigt), succion, marche automatique. Ce sont des signes d'un systeme nerveux sain. Ils disparaissent vers 3 a 4 mois. Source : HAS."
      },
      {
        titre: "Ce qu'il aime des les premiers jours",
        contenu: "Le peau a peau : ton corps régule sa température, son rythme cardiaque et son stress. Etre porté. Le bruit blanc constant. Etre emmailloté, les bras calés contre son corps. Ces besoins sont biologiques, pas des caprices. Source : Moore 2016."
      },
      {
        titre: "Le hoquet et les grimaces",
        contenu: "Bébé a le hoquet plusieurs fois par jour : son diaphragme s'entraine. Les grimaces pendant le sommeil ne sont pas de la douleur : c'est son cerveau qui traite les informations en sommeil paradoxal."
      }
    ],
    sante: [
      {
        titre: "L'allaitement",
        contenu: "8 a 12 tétées par 24h est normal. La montée de lait survient entre J2 et J4. Une bonne prise du sein : bouche grande ouverte, levres retroussées, menton contre le sein. Si douleur intense persistante : consulter une sage-femme ou une consultante IBCLC. Source : OMS."
      },
      {
        titre: "Le cordon ombilical",
        contenu: "Il tombe entre 5 et 15 jours. Ne pas le mouiller inutilement, ne pas chercher a l'enlever. C'est normal qu'il noircisse avant de tomber. Si rougeur autour ou odeur forte : consulter. Source : HAS."
      },
      {
        titre: "Le poids",
        contenu: "Une perte de poids allant jusqu'a 10% du poids de naissance est normale dans les premiers jours. La récupération du poids de naissance est attendue avant J10-J14. Source : HAS 2022."
      },
      {
        titre: "Le sommeil en sécurité",
        contenu: "Sur le dos uniquement, dans son propre espace de sommeil, sans oreiller ni couette, sans tour de lit. La chambre partagée (pas le lit partagé) réduit le risque de mort subite. Source : HAS 2020."
      }
    ],
    papa: [
      {
        titre: "Prends le relais des nuits",
        contenu: "La privation de sommeil est le principal facteur de dépression post-partum. Si elle allaite, prends en charge le change, le portage et le recoucher apres chaque tétée. Si biberon, alternez les nuits. Ce geste est l'un des plus importants de ce mois. Source : Inserm 2021."
      },
      {
        titre: "Le baby blues : c'est réel",
        contenu: "50 a 80% des femmes vivent un baby blues entre J3 et J5 : larmes soudaines, euphorie suivie d'effondrement, épuisement. C'est hormonal, normal, et ca passe en quelques jours. Si ca dure plus de deux semaines : consulter un médecin. Source : CNGOF."
      },
      {
        titre: "Ta propre santé mentale",
        contenu: "10 a 15% des peres développent une dépression post-partum dans les 6 premiers mois. Signes : irritabilité, retrait, anxiété excessive, sentiment d'etre inutile. En parler a un médecin est un signe de force, pas de faiblesse. Source : Paulson et Bazemore 2010."
      },
      {
        titre: "Reconnais les signaux de faim",
        contenu: "Bébé indique qu'il a faim avant de pleurer : il tourne la tete, ouvre la bouche, porte ses mains a sa bouche. Répondre a ces signaux précoces évite le cycle pleurs-stress-tétée difficile. Source : AAP 2022."
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
      { titre: "Le peau a peau", contenu: "30 minutes de peau a peau par jour, torse nu contre torse nu. Ca régule sa température, stabilise son rythme cardiaque et renforce votre lien. Tu peux faire ca en regardant un film ou en lisant." },
      { titre: "Le bain du soir", contenu: "Eau a 37°C, 5 minutes maximum. Parle-lui doucement pendant tout le bain. Pas besoin de savon a chaque fois. Ce rituel quotidien l'apaise et t'appartient." },
      { titre: "Le massage bébé", contenu: "Apres le bain, quelques minutes de massage doux sur ses jambes, son ventre et son dos. Des mouvements lents et réguliers. La chaleur de tes mains le rassure." }
    ],
    rdv: "Examen J8 obligatoire chez le médecin ou la sage-femme. Examen du 1er mois entre J28 et J32. La sage-femme de ville peut faire les visites a domicile : demande-la avant la sortie de maternité.",
    vaccins: "BCG si indiqué. Pas de vaccin obligatoire avant 2 mois.",
    alerte: "Température supérieure a 38°C avant 3 mois : urgences pédiatriques sans attendre. Refus de s'alimenter sur 2 tétées consécutives. Fontanelle bombée. Difficultés respiratoires : appeler le 15. Fais confiance a ton instinct : si quelque chose te semble anormal, appelle. Tu ne dérangeras jamais trop."
  },

  1: {
    titre: "Mois 2 - L'éveil",
    intro: "Bébé commence a sourire pour de vrai. Pas le sourire du gaz du mois dernier : un sourire social, en réponse a ton visage. C'est le début d'une communication réelle.",
    developpement: [
      {
        titre: "Le sourire social",
        contenu: "Vers 6 semaines, bébé sourit en réponse a ton visage et ta voix. Ce n'est plus un réflexe : c'est une communication intentionnelle. Réponds toujours a son sourire par un sourire. Tu lui apprends que la communication fonctionne. Source : Brazelton 2006."
      },
      {
        titre: "Le controle de la tete",
        contenu: "Il tient sa tete quelques secondes en position ventrale. Le tummy time (ventre sur le sol, sous surveillance) est essentiel : 2 a 3 minutes plusieurs fois par jour. C'est inconfortable pour lui au début. Reste avec lui."
      },
      {
        titre: "Les sons",
        contenu: "Premiers sons voyelles. Il réagit aux voix familières en tournant la tete. Il répond dans une conversation en alternant. Parle-lui face a face en exagérant tes expressions. Son cerveau synchronise son activité avec la tienne. Source : Harvard CDC."
      },
      {
        titre: "La vision",
        contenu: "Sa vision s'améliore. Il suit des yeux un objet qui se déplace lentement. Il préfere les visages aux objets, et les visages familiers aux inconnus."
      },
      {
        titre: "Ce qu'il aime ce mois",
        contenu: "Les mobiles avec des contrastes forts. Ta voix qui lui parle directement. Etre tenu en position semi-assise pour regarder le monde. Le peau a peau reste tres important."
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
        contenu: "10% des peres développent une dépression post-partum dans les 3 a 6 premiers mois. Symptomes peu connus : irritabilité, retrait, anxiété excessive, prise de risques. En parler a un médecin change les choses. Source : Paulson et Bazemore, JAMA 2010."
      },
      {
        titre: "Parle-lui en faisant les choses",
        contenu: "La je te mets ton pyjama, maintenant on va au bain, voila ton biberon. Nommer chaque geste du quotidien construit le vocabulaire plus efficacement que les jeux éducatifs. Source : Hart et Risley 1995."
      }
    ],
    activites: [
      { titre: "Le mobile maison", contenu: "Des formes noires et blanches suspendues a 25 cm de ses yeux. Il les fixe, les suit. Tu peux les fabriquer avec du papier. Ca vaut n'importe quel mobile vendu en magasin." },
      { titre: "Tummy time quotidien", contenu: "Ventre sur le sol, sous ta surveillance. Commence par 2 minutes, augmente progressivement. Mets-toi a son niveau et parle-lui pour l'encourager." },
      { titre: "La danse", contenu: "Tiens-le contre toi et danse doucement. Il aime le mouvement, le rythme, ta chaleur. C'est du portage déguisé." }
    ],
    rdv: "Examen du 2e mois obligatoire. Début du calendrier vaccinal. Ne pas rater.",
    vaccins: "DTCaP-Hib-HepB (Hexavalent) 1re dose + Méningocoque B 1re dose + Rotavirus 1re dose (oral). Source : Calendrier vaccinal 2025.",
    alerte: "Absence de sourire a 2 mois. Absence de réaction aux sons. Bébé mou comme une poupée de chiffon. Perte de poids. Mentionne-le au pédiatre."
  },

  2: {
    titre: "Mois 3 - La découverte",
    intro: "3 mois. Le cap souvent décrit comme une renaissance. Les coliques s'estompent, le sommeil s'organise, et bébé rit aux éclats pour la premiere fois.",
    developpement: [
      {
        titre: "Le rire",
        contenu: "Le premier vrai rire arrive généralement entre 2,5 et 4 mois. Court, souvent inattendu. Il reconnait ses parents a la vue et cherche activement le contact visuel."
      },
      {
        titre: "Les mains",
        contenu: "Il découvre ses mains, les observe avec fascination, les porte a la bouche, tente de saisir les objets. C'est le début de la coordination oeil-main, base de toute manipulation future."
      },
      {
        titre: "Le controle de la tete",
        contenu: "Tenu assis avec soutien, il maintient sa tete droite. En tummy time, il se redresse sur ses avant-bras et leve la tete a 45 degrés."
      },
      {
        titre: "La reconnaissance des émotions",
        contenu: "Il distingue une voix heureuse d'une voix triste ou en colere. Son cerveau limbique cartographie deja les émotions. Ta stabilité émotionnelle est sa sécurité."
      },
      {
        titre: "Le sommeil",
        contenu: "Les nuits s'allongent progressivement. 4 a 6h de sommeil continu est possible. Expose-le a la lumiere naturelle le matin pour l'aider a régler son horloge biologique. Source : Touchette 2005."
      }
    ],
    sante: [
      {
        titre: "La diversification : pas encore",
        contenu: "La diversification alimentaire ne commence pas avant 4 mois révolus (17 semaines). Le lait couvre tous les besoins. Introduire trop tot augmente le risque d'allergies. Source : OMS / HAS."
      },
      {
        titre: "La régression du sommeil a 4 mois approche",
        contenu: "Vers 3-4 mois, le sommeil se restructure. Bébé passe de cycles néonataux a des cycles adultes, ce qui crée des réveils entre les cycles. Normal, attendu, temporaire."
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
      { titre: "Les hochets légers", contenu: "Pose un hochet léger dans sa main. Il commence a attraper et secouer intentionnellement. Laisse-le explorer seul, n'aide pas a chaque fois." },
      { titre: "Les livres cartonnés", contenu: "Des livres avec peu de mots et des images simples en contraste fort. Lis a voix haute avec des intonations variées. Il ne comprend pas les mots mais enregistre le rythme et la musicalité du langage." },
      { titre: "Le miroir", contenu: "Montre-lui son reflet. Il observe ce bébé qui l'imite avec fascination. Fais des grimaces ensemble. C'est l'un de ses jeux préférés ce mois-ci." }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois. Surveiller le développement.",
    vaccins: "DTCaP-Hib-HepB 2e dose + Méningocoque B 2e dose + Rotavirus 2e dose + Pneumocoque 1re dose. Source : Calendrier vaccinal 2025.",
    alerte: "Absence de rires ou de vocalises. Absence de suivi visuel. Pas de réaction aux sons forts. Raideur ou mollesse anormale des membres."
  },

  3: {
    titre: "Mois 4 - La régression du sommeil",
    intro: "Les nuits s'amélioraient. Et la elles se dégradent. C'est la régression du sommeil a 4 mois. C'est normal, documenté, et temporaire. Ca ne veut pas dire que tu fais mal quelque chose.",
    developpement: [
      {
        titre: "La régression du sommeil",
        contenu: "Vers 3-4 mois, le sommeil de bébé se restructure pour ressembler au sommeil adulte. Il se réveille entre chaque cycle (90 min) et ne sait pas encore se rendormir seul. C'est une étape neurologique, pas un probleme de comportement. Source : AAP 2022."
      },
      {
        titre: "Les mains comme outils",
        contenu: "Il attrape intentionnellement les objets présentés. Il les porte a sa bouche : c'est de l'exploration sensorielle, pas juste de la succion. Laisse-le faire."
      },
      {
        titre: "La permanence de l'objet débute",
        contenu: "Il commence a chercher un objet qu'il a laissé tomber. Son cerveau commence a comprendre que les choses continuent d'exister meme quand il ne les voit pas."
      },
      {
        titre: "Les vocalises",
        contenu: "Gazouillements variés, syllabes comme ba, da, ma. Il répond quand tu lui parles en alternant. C'est une conversation. Réponds a chaque son."
      }
    ],
    sante: [
      {
        titre: "Début de diversification possible",
        contenu: "Entre 17 et 26 semaines selon l'enfant. Commencer si bébé tient sa tete, montre de l'intéret pour la nourriture, n'a plus le réflexe d'extrusion (ne repousse plus la cuillere avec la langue). Légumes en purée lisse, sans sel ni sucre. Source : HAS / PNNS 2023."
      },
      {
        titre: "Sécuriser la table a langer",
        contenu: "Bébé commence a se retourner. Ne le laisse jamais seul sur une surface élevée. Garde toujours une main sur lui pendant le change."
      }
    ],
    papa: [
      {
        titre: "La lecture quotidienne",
        contenu: "Lire a voix haute 10 minutes par jour améliore le vocabulaire a 2 ans et les capacités de lecture a 5 ans. Des livres avec peu de mots et des images contrastées. Source : Logan 2019."
      },
      {
        titre: "Les rituels du coucher",
        contenu: "Bain, pyjama, tétée ou biberon, chanson, dodo. Toujours dans le meme ordre. La prévisibilité est sécurisante pour un cerveau de 4 mois. Prends en charge ce rituel plusieurs soirs par semaine."
      },
      {
        titre: "La charge mentale",
        contenu: "4 mois apres la naissance, la répartition des taches peut cristalliser des tensions. La charge mentale (rendez-vous, stocks, tailles suivantes) est souvent invisible. Une conversation directe vaut mieux que du ressentiment."
      }
    ],
    activites: [
      { titre: "Explorer les textures", contenu: "Fais-lui toucher des surfaces différentes : tissu doux, bois, plastique, ta barbe, un glaçon dans un tissu. Il enregistre chaque sensation." },
      { titre: "Les hochets et anneaux", contenu: "Pose des hochets légers dans sa main. Il commence a attraper et a secouer intentionnellement. Chaque objet est une expérience." },
      { titre: "Le miroir a deux", contenu: "Assis face au miroir avec lui, montre-lui vos deux reflets. Nomme ce que tu vois. Montre-lui ton nez, puis le sien. Il commence a différencier les personnes." }
    ],
    rdv: "Examen du 4e mois obligatoire.",
    vaccins: "Méningocoque B 3e dose. Source : Calendrier vaccinal 2025.",
    alerte: "Si bébé n'attrape pas encore d'objets, ne gazouille pas ou présente des mouvements asymétriques, mentionne-le au pédiatre. Ce n'est pas forcément inquiétant, mais un regard médical est toujours utile."
  },

  4: {
    titre: "Mois 5 - La curiosité",
    intro: "Tout l'intéresse. Il attrape, examine, mordille, lache, recommence. C'est sa facon d'apprendre. Le monde est un laboratoire et toi tu es son guide.",
    developpement: [
      {
        titre: "La reconnaissance sociale",
        contenu: "Bébé distingue les visages familiers des étrangers. L'angoisse de l'étranger peut débuter. Il reconnait son prénom et réagit quand on l'appelle."
      },
      {
        titre: "La motricité",
        contenu: "Se retourne dos-ventre. Peut se tenir assis avec appui. Commence a prendre des objets en opposition pouce-index. Source : Denver II."
      },
      {
        titre: "L'attachement préférentiel",
        contenu: "Il manifeste une préférence claire pour ses figures d'attachement. Ne le force jamais a faire le beau avec quelqu'un qui lui est inconnu. L'attachement sécure est le meilleur prédicteur de santé mentale a l'age adulte. Source : Bowlby / Ainsworth."
      },
      {
        titre: "Les premiers sons proto-linguistiques",
        contenu: "Il produit des sons consonantiques : ba, ma, da. Ces sons sont le résultat de l'entrainement vocal des mois précédents. Réponds-lui comme s'il parlait."
      }
    ],
    sante: [
      {
        titre: "La diversification alimentaire",
        contenu: "Si commencée, introduire les légumes un a un avec 4 a 7 jours entre chaque : carottes, courgettes, haricots verts, potiron. Purée lisse sans sel ni sucre. Source : PNNS / HAS."
      },
      {
        titre: "La dentition",
        contenu: "Les premieres dents (incisives inférieures) peuvent apparaitre entre 5 et 8 mois. Signes : bave, irritabilité, besoin de mordre. La fievre élevée n'est pas liée aux dents. Source : AAP."
      }
    ],
    papa: [
      {
        titre: "Les activités d'éveil",
        contenu: "Bacs a textures (tissu, bois, plastique), musique avec différents instruments, livres a toucher. Tu peux fabriquer des jouets simples : une bouteille avec du riz dedans fait un excellent hochet."
      },
      {
        titre: "Ne pas forcer le contact",
        contenu: "Si bébé pleure avec un inconnu, ne le force pas a y aller. L'attachement sécure se construit en respectant ses signaux. Il viendra a son rythme."
      }
    ],
    activites: [
      { titre: "La position assise aidée", contenu: "Installe-le assis entre tes jambes pour qu'il découvre cette perspective. Il voit le monde autrement. Pas plus de 10 minutes, et toujours avec soutien." },
      { titre: "Les premieres purées en jeu", contenu: "Si la diversification a commencé, laisse-le toucher la purée avec ses doigts. Mettre les mains dans la nourriture est une exploration sensorielle normale." },
      { titre: "Cacher et retrouver", contenu: "Cache un jouet sous une couverture devant ses yeux. Laisse-le le chercher. C'est l'entrainement de la permanence de l'objet, une étape cognitive majeure." }
    ],
    rdv: "Pas de rendez-vous obligatoire. Surveillance de la diversification.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Asymétrie dans les mouvements. Absence de retournement. Perte d'acquis (régression)."
  },

  5: {
    titre: "Mois 6 - La moitié de la premiere année",
    intro: "Six mois. Bébé pese environ le double de son poids de naissance. Il mange de la nourriture solide, rit, joue, vous reconnait de loin.",
    developpement: [
      {
        titre: "Le langage",
        contenu: "Syllabes redupliquées : bababa, mamama, dadada. Ce n'est pas encore du langage mais l'entrainement phonologique qui y conduit. Plus tu lui parles, plus son cerveau se structure. Réponds a ses syllabes comme si c'était une vraie conversation. Source : Kuhl 2007."
      },
      {
        titre: "La position assise",
        contenu: "Assis sans soutien pendant quelques secondes, puis de plus en plus longtemps. Transfert d'objet d'une main a l'autre. Ne mets pas de cale pour le maintenir assis : il doit trouver son équilibre seul. Source : Denver II."
      },
      {
        titre: "La permanence de l'objet",
        contenu: "Il cherche un objet qu'on vient de cacher sous un tissu devant lui. Il comprend que l'objet existe encore meme s'il ne le voit plus. Etape majeure de Piaget. Joue a ce jeu régulierement."
      },
      {
        titre: "La peur de l'étranger",
        contenu: "Elle se renforce ce mois. Il peut pleurer avec des personnes qu'il ne voit pas régulierement. Expositions régulières et progressives, sans forcer. Source : Ainsworth 1978."
      }
    ],
    sante: [
      {
        titre: "La diversification a 6 mois",
        contenu: "L'OMS recommande 6 mois d'allaitement exclusif avant diversification. Vers 7-8 mois : viande ou poisson (10g par jour). Oeuf cuit des 6 mois. Source : OMS / ESPGHAN 2017."
      },
      {
        titre: "Introduction précoce des allergenes",
        contenu: "Introduction précoce des allergenes majeurs (arachide, oeuf, gluten) entre 4 et 12 mois réduit le risque d'allergie. Ne pas retarder sans avis médical. Source : LEAP Study / ESPGHAN 2022."
      },
      {
        titre: "Les premieres dents",
        contenu: "Les incisives centrales inférieures apparaissent généralement entre 6 et 10 mois. Une fois sorties, nettoyer matin et soir avec une brosse a dents adaptée et du dentifrice fluoré 500ppm (taille d'un grain de riz). Source : UFSBD."
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
      { titre: "Le bain debout", contenu: "Laisse-le se tenir debout dans le bain (avec toi derriere). Il adore. Ca renforce ses jambes et lui donne confiance." },
      { titre: "Les chansons avec gestes", contenu: "Les chansons avec des gestes (promenons-nous, une souris verte) renforcent la coordination et le langage en meme temps. Répete les memes chansons : la répétition est de l'apprentissage." },
      { titre: "L'exploration sensorielle", contenu: "Pose-le sur différentes surfaces : herbe, sable, moquette, carrelage. Chaque texture est une information nouvelle pour son cerveau." }
    ],
    rdv: "Examen du 6e mois obligatoire. Bilan complet : motricité, langage, vision, audition.",
    vaccins: "DTCaP-Hib-HepB rappel + Pneumocoque 2e dose + Méningocoque C. Source : Calendrier vaccinal 2025.",
    alerte: "Absence de syllabes. Pas de tenue assise avec appui. Absence de sourire réciproque. Régressions notables."
  },

  6: {
    titre: "Mois 7 - En mouvement",
    intro: "Bébé commence a se déplacer. L'espace autour de lui doit maintenant etre sécurisé. La chute est la premiere cause d'accident a cet age.",
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
        contenu: "Il commence a faire au revoir avec la main, a tendre les bras pour etre pris. Ces gestes précedent le langage verbal et sont aussi importants que les mots."
      }
    ],
    sante: [
      {
        titre: "Sécurisation du domicile",
        contenu: "Bloquer les prises électriques, sécuriser les coins de table, installer des barrieres d'escalier. Placer tous les produits ménagers hors de portée. Attacher les meubles lourds aux murs. La chute est la 1ere cause d'accident a cet age. Source : Santé Publique France."
      },
      {
        titre: "Alimentation a 7 mois",
        contenu: "Introduction de la viande et du poisson (10g par jour). Légumes et fruits bien acceptés. Continuer le lait en parallele. Eviter sel, sucre, miel. Source : PNNS / HAS."
      }
    ],
    papa: [
      {
        titre: "Cache-cache",
        contenu: "Se cacher derriere tes mains puis réapparaitre est bien plus qu'un jeu : c'est l'entrainement de la permanence de l'objet et de la gestion émotionnelle de la séparation. Bébé apprend que tu reviens toujours. Source : Stern 1985."
      },
      {
        titre: "Sécuriser sans sur-protéger",
        contenu: "Sécurise l'environnement mais laisse-le explorer. Un bébé qui ne tombe jamais n'apprend pas a gérer les risques. L'objectif : un environnement sur dans lequel il peut prendre des petits risques. Source : Adolph 2012."
      }
    ],
    activites: [
      { titre: "Le parcours au sol", contenu: "Crée un petit parcours avec des coussins, une couverture roulée, un tunnel. Il rampera, escalera, explorera. Reste a proximité mais n'aide pas a chaque obstacle." },
      { titre: "Les jeux de balles", contenu: "Une balle légere qu'il peut attraper et lancer (meme maladroitement). Roule-la vers lui et attends qu'il te la renvoie. Ca peut durer tres longtemps." },
      { titre: "La musique active", contenu: "Tape sur une casserole avec une cuillere en bois. Il adore le bruit qu'il peut créer lui-meme. Le sentiment de causer quelque chose est fondamental pour le développement de l'agentivité." }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de déplacement. Asymétrie motrice. Absence de permanence de l'objet."
  },

  7: {
    titre: "Mois 8 - L'angoisse de séparation",
    intro: "L'angoisse du 8e mois est a son pic. Bébé pleure quand tu pars, meme 30 secondes. C'est un signe d'attachement sain et sécure. Il sait que tu existes quand tu n'es pas la. C'est un progres.",
    developpement: [
      {
        titre: "Angoisse du 8e mois",
        contenu: "Normale et attendue entre 6 et 12 mois. Bébé prend conscience qu'il est séparé de ses parents et que tu peux partir. Un attachement sécure est la meilleure protection contre l'anxiété future. Source : Ainsworth 1978."
      },
      {
        titre: "Compréhension du langage",
        contenu: "Non, donne, bravo, viens. Bébé commence a comprendre des mots simples avant de les parler. Son vocabulaire de compréhension est bien supérieur a ce qu'il peut dire. Continue a lui parler souvent et normalement. Source : Bates 1976."
      },
      {
        titre: "La pince pouce-index débute",
        contenu: "Il commence a saisir de petits objets avec précision. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent etre avalés. Source : Denver II."
      }
    ],
    sante: [
      {
        titre: "Alimentation a 8 mois",
        contenu: "Texture : purées avec petits morceaux mous. Viande ou poisson : 10g par jour. Introduire progressivement les textures pour prévenir le refus alimentaire futur. Eviter sel, sucre, miel. Source : HAS / PNNS."
      },
      {
        titre: "Sommeil",
        contenu: "Régression du sommeil fréquente au 8e mois liée a l'angoisse de séparation. Un rituel du coucher stable et prévisible est la meilleure réponse. La constance te protege autant que lui. Source : HAS 2017."
      }
    ],
    papa: [
      {
        titre: "Dire au revoir correctement",
        contenu: "Toujours dire au revoir quand tu pars, meme si bébé pleure, plutot que de partir en douce. Les départs discrets augmentent l'anxiété. Bébé ne comprend pas pourquoi tu as disparu. Un vrai au revoir lui dit : tu pars, mais tu reviens. Source : Bowlby."
      },
      {
        titre: "Rituel du coucher",
        contenu: "Bain, pyjama, tétée ou biberon, lecture, calin, dodo. Toujours dans le meme ordre. La prévisibilité est sécurisante. Prends en charge ce rituel au moins 3 soirs par semaine."
      }
    ],
    activites: [
      { titre: "Les jeux de cache-cache", contenu: "Cache-toi derriere un meuble et réapparais. Bébé rit a chaque fois. Ce n'est pas juste du fun : il entraine sa gestion de la séparation et la permanence de l'objet." },
      { titre: "Les empilements", contenu: "Des gros cubes qu'il peut empiler et renverser. Il adore surtout les renverser. Laisse-le faire : c'est de la physique appliquée." },
      { titre: "L'eau au bain", contenu: "Des petits contenants : gobelet, ecumoire, arrosoir. Vider, remplir, renverser. Il peut rester 20 minutes dans le bain avec ca. Reste avec lui." }
    ],
    rdv: "Examen du 8e mois conseillé.",
    vaccins: "Grippe si indiqué (prématurés, pathologies chroniques).",
    alerte: "Absence de réaction a son prénom. Pas de syllabes variées. Absence de geste au revoir. Régression importante."
  },

  8: {
    titre: "Mois 9 - Les premiers mots",
    intro: "Mama et dada commencent a avoir du sens. Bébé pointe du doigt ce qui l'intéresse. C'est de la communication intentionnelle. C'est majeur.",
    developpement: [
      {
        titre: "Premiers mots signifiants",
        contenu: "Les premiers mots apparaissent entre 9 et 14 mois. Mama et dada associés a la bonne personne. Réponds a chaque tentative de communication. Le vocabulaire expressif a 12 mois prédit le développement du langage a 2 ans. Source : Fenson 1994."
      },
      {
        titre: "Le pointage proto-déclaratif",
        contenu: "Bébé pointe du doigt un objet, te regarde pour partager sa découverte, puis regarde l'objet. Ce geste dit : regarde ca avec moi. C'est le partage d'attention conjointe, précurseur essentiel du langage. Source : Bates 1976."
      },
      {
        titre: "La pince pouce-index",
        contenu: "Bébé peut saisir de tres petits objets avec précision. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent etre avalés. Source : Denver II."
      }
    ],
    sante: [
      {
        titre: "Alimentation a 9 mois",
        contenu: "3 repas et 2 laitages par jour. Introduire les féculents et légumineuses. Eviter sel, sucre ajouté, miel avant 1 an, charcuterie. Aucun jus de fruits avant 1 an. Les morceaux mous sont maintenant la norme. Source : PNNS / HAS 2021."
      },
      {
        titre: "Le brossage des dents",
        contenu: "Des la premiere dent : brosse matin et soir avec une brosse a dents adaptée et du dentifrice fluoré 500ppm (taille d'un grain de riz). Source : UFSBD."
      }
    ],
    papa: [
      {
        titre: "Lire chaque soir",
        contenu: "10 minutes de lecture a voix haute chaque soir est la pratique parentale la mieux documentée pour le développement du langage. Les enfants a qui on lit quotidiennement ont 1,4 million de mots de plus a 5 ans. Source : Logan 2019."
      },
      {
        titre: "Répondre au pointage",
        contenu: "Quand bébé pointe quelque chose, regarde dans la meme direction et nomme l'objet. Ce geste simple est l'un des plus puissants pour le développement du langage."
      }
    ],
    activites: [
      { titre: "Les escaliers en sécurité", contenu: "Apprends-lui a monter et descendre a reculons. Montre-lui le geste en premier. C'est une compétence motrice utile qu'il peut apprendre maintenant." },
      { titre: "Les premiers gribouillis", contenu: "Des gros crayons de cire sur du papier épais. Il ne dessine pas encore, mais il adore laisser une trace. Valorise chaque gribouilli." },
      { titre: "La récré dehors", contenu: "Herbe, sable, graviers, flaques d'eau. Les textures naturelles sont irremplacables. Laisse-le salir. L'exploration sensorielle extérieure est fondamentale." }
    ],
    rdv: "Examen du 9e mois obligatoire. Motricité, langage, vision, audition. Prépare tes questions.",
    vaccins: "Méningocoque B rappel si non fait a 6 mois.",
    alerte: "Absence de pince pouce-index. Pas de syllabes variées. Absence de compréhension de mots simples."
  },

  9: {
    titre: "Mois 10 - La communication intentionnelle",
    intro: "Il te dit quelque chose. Peut-etre pas avec des mots, mais avec des gestes et des regards. Il pointe du doigt ce qui l'intéresse. Il veut que tu le voies. C'est majeur.",
    developpement: [
      {
        titre: "Debout et premiers pas",
        contenu: "Bébé se met debout en s'aidant des meubles. Marche en se tenant. Les premieres chutes font partie de l'apprentissage : ne pas sur-réagir. Il tombe, il se releve, il recommence. Source : Adolph 2012."
      },
      {
        titre: "Imitation",
        contenu: "Il imite gestes et sons volontairement : taper des mains, faire coucou, souffler. L'imitation est le moteur principal de l'apprentissage du langage et des comportements sociaux. Joue a l'imiter et laisse-le t'imiter. Source : Meltzoff 2002."
      },
      {
        titre: "Les limites",
        contenu: "Il commence a tester ce qu'il peut faire et ce qu'il ne peut pas. C'est nécessaire. Lui dire non calmement et fermement, sans s'énerver, lui permet de comprendre le monde."
      }
    ],
    sante: [
      {
        titre: "Alimentation autonome",
        contenu: "Propose des morceaux qu'il peut saisir seul : légumes cuits mous, fruits mous, pain. Le manger-main développe l'autonomie et la motricité fine. Surveille mais n'interviens pas a chaque bouchée. Source : HAS."
      }
    ],
    papa: [
      {
        titre: "La limite bienveillante",
        contenu: "Non signifie non, dit calmement et fermement. La constance de la limite est plus importante que le ton. Un parent qui cede parfois génere plus d'insistance qu'un parent qui ne cede jamais. Source : Baumrind 1967."
      },
      {
        titre: "Exploration sécurisée",
        contenu: "Laisse-le explorer au sol, en extérieur, dans la boue si besoin. Les textures naturelles sont irremplacables pour le développement sensoriel. Un enfant qui explore apprend. Source : Adolph 2012."
      }
    ],
    activites: [
      { titre: "Les premieres chutes encouragées", contenu: "Quand il tombe, ne pas dramatiser. Un 'Oupsss, tu t'es levé !' plutot qu'un cri de frayeur. Ta réaction détermine la sienne." },
      { titre: "Tri et classement", contenu: "Des objets de différentes couleurs ou tailles a trier dans des bols. Il ne classe pas encore vraiment, mais il manipule et explore. C'est suffisant." },
      { titre: "La lecture participative", contenu: "Pose des questions sur les images. Ou est le chien ? Il cherche avec son doigt. Cette interaction booste son langage." }
    ],
    rdv: "Pas de rendez-vous obligatoire.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de mise debout avec appui. Pas de pointage du doigt. Absence de compréhension simple."
  },

  10: {
    titre: "Mois 11 - Les premiers pas approchent",
    intro: "Peut-etre ce mois, peut-etre dans quelques semaines. L'age normal des premiers pas va de 9 a 18 mois. Chaque bébé a son rythme. Ne pas comparer.",
    developpement: [
      {
        titre: "Marche",
        contenu: "Bébé marche en se tenant aux meubles. Certains font leurs premiers pas seuls ce mois, d'autres attendront encore. Les premiers pas entre 9 et 18 mois sont tous normaux. Source : Denver II."
      },
      {
        titre: "Langage expressif",
        contenu: "2 a 5 mots signifiants en moyenne a 12 mois. Mais la variabilité est énorme. L'essentiel : comprend-il ce qu'on lui dit ? Si oui, le langage expressif suivra. Source : Fenson 1994."
      },
      {
        titre: "Le jeu symbolique naissant",
        contenu: "Il fait semblant de dormir, de manger, de téléphoner. Précurseur de la pensée abstraite et de la créativité. Joue avec lui : fais semblant de boire dans sa tasse vide."
      }
    ],
    sante: [
      {
        titre: "Alimentation a 11 mois",
        contenu: "Repas de plus en plus proches des repas familiaux, sans sel ajouté. Les légumineuses (lentilles, pois chiches) sont une excellente source de protéines et de fer. Varier les textures et les couleurs. Source : PNNS 2023."
      }
    ],
    papa: [
      {
        titre: "Lache-le",
        contenu: "Quand il essaie de marcher, résiste a l'envie de le tenir. Laisse-le trouver son équilibre seul. Les chutes maitrisées lui apprennent a gérer son corps. Source : Adolph 2012."
      },
      {
        titre: "Ton bilan de 11 mois",
        contenu: "Dans un mois, bébé a 1 an. C'est aussi ton 1er anniversaire de pere. Tu as appris plus cette année que tu ne le mesures. Prépare quelque chose de simple pour marquer ce cap."
      }
    ],
    activites: [
      { titre: "Les premiers pas encouragés", contenu: "Tends les mains a 50 cm de lui et encourage-le a venir vers toi. Pas trop loin pour ne pas frustrer. Chaque pas est une victoire a célébrer clairement." },
      { titre: "Tri et classement", contenu: "Des objets de différentes couleurs ou tailles a trier dans des bols. Il ne classe pas encore vraiment, mais il manipule, transvase, explore." },
      { titre: "La lecture participative", contenu: "Pose des questions sur les images. Ou est le chien ? Il cherche avec son doigt. Cette interaction booste son langage plus que la lecture passive." }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de mise debout. Pas de mots signifiants. Régression d'acquis. Absence d'intéret pour les autres."
  },

  11: {
    titre: "1 an !",
    intro: "Un an. Un cap immense. Bébé marche (ou presque), dit ses premiers mots, te reconnait de loin, rit avec toi. Cette année vous a transformés. Tous les deux.",
    developpement: [
      {
        titre: "Les premiers pas",
        contenu: "La marche indépendante arrive en moyenne a 12 mois, mais entre 9 et 15 mois tout est dans la norme. Ne jamais utiliser de trotteurs : ils retardent la marche et augmentent le risque de chute. Source : AAP 2023."
      },
      {
        titre: "Le langage",
        contenu: "2 a 5 mots significatifs en moyenne a 12 mois. La compréhension est bien plus développée que la production. L'important : bébé comprend-il ce qu'on lui dit ? Source : Fenson 1994."
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
        titre: "L'alimentation a 1 an",
        contenu: "Passage possible au lait entier (pas écrémé, 500ml par jour max). Alimentation variée de table, 4 repas par jour. Pas de lait demi-écrémé avant 2 ans. Pas de miel avant 1 an. Source : PNNS / HAS."
      },
      {
        titre: "Le dentiste",
        contenu: "Consultation recommandée des 1 an. Premiere visite de repérage, pas de soin. Ca habitue bébé et permet au dentiste de dépister tot. Source : UFSBD."
      }
    ],
    papa: [
      {
        titre: "Ce que tu lui as donné cette année",
        contenu: "Une présence stable. Des rituels. Un regard bienveillant. La sécurité de savoir qu'il peut explorer parce que tu es la quand il revient. Les peres qui s'impliquent activement la premiere année ont des enfants avec une meilleure régulation émotionnelle a 5 ans. Source : Feldman 2010."
      },
      {
        titre: "Toi, un an apres",
        contenu: "Tu es différent. Plus patient que tu ne le pensais. Plus ému par des choses simples. Plus conscient de ce qui compte vraiment. Cette transformation est réelle et permanente."
      }
    ],
    activites: [
      { titre: "Le jardin ou le parc", contenu: "Sol irrégulier, herbe, petites pentes. Pour un marcheur débutant, l'extérieur est le meilleur terrain d'entrainement." },
      { titre: "Les puzzles 2-3 pieces", contenu: "Des encastrements simples avec de grosses pieces. Guide sa main sans faire a sa place." },
      { titre: "Cuisiner ensemble", contenu: "Assis dans sa chaise haute, donne-lui un bol et une cuillere pendant que tu prépares a manger. Il imite, il explore. C'est son premier cours de cuisine." }
    ],
    rdv: "Examen des 12 mois obligatoire. Bilan complet : motricité, langage, vision, audition. Prépare tes questions. Signale tout ce qui t'inquiete, meme si ca te semble léger.",
    vaccins: "ROR (rougeole, oreillons, rubéole) 1re dose + Méningocoque C + Varicelle 1re dose. Source : Calendrier vaccinal 2025.",
    alerte: "Absence de mots. Pas de pointage. Absence de marche ou déplacement efficace. Pas de jeu d'imitation. La perte de compétences deja acquises mérite toujours une consultation."
  }
};
