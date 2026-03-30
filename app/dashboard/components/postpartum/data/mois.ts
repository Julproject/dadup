import type { MoisData } from '../../data/types';

export { getIdee } from '../../data/mois';

export const MOIS_DATA: Record<number, MoisData> = {
  0: {
    titre: "Les premières semaines",
    intro: "Bienvenue dans le quatrième trimestre. Bébé vient de quitter un environnement chaud, sombre et rythmé par ton coeur. Il a besoin de recréer ce cocon. Et toi, tu découvres que personne n'est vraiment préparé à ca.",
    developpement: [
      {
        titre: "Ce que voit bébé",
        contenu: "Sa vision est floue au-delà de 25 cm, exactement la distance entre ton visage et le sien pendant une tétée. Il distingue les contrastes forts : noir, blanc, rouge. Son visage préféré ? Le tien. Il les reconnaît déjà. Source : HAS 2023."
      },
      {
        titre: "Ce qu'il entend",
        contenu: "L'audition est son sens le plus développé à la naissance. Il reconnaît la voix entendue in utero. Parle-lui normalement, pas en voix de bébé forcée. Ta voix grave le rassure depuis 9 mois."
      },
      {
        titre: "Ses réflexes primitifs",
        contenu: "Réflexe de Moro (sursaut quand il se sent tomber), grasping (il serre ton doigt), succion, marche automatique. Ce sont des signes d'un système nerveux sain. Ils disparaissent vers 3 à 4 mois. Source : Larimer 2021."
      },
      {
        titre: "Ce qu'il aime dès les premiers jours",
        contenu: "Le peau à peau : ton corps régule sa température, son rythme cardiaque et son stress. Être porté. Le bruit blanc constant (hottes, aspirateurs). Être emmailloté, les bras calés. Source : Moore 2016."
      },
      {
        titre: "Le hoquet et les grimaces",
        contenu: "Bébé a le hoquet plusieurs fois par jour : son diaphragme s'entraîne. Les grimaces pendant le sommeil ne sont pas des douleurs : c'est son cerveau qui traite les informations en sommeil paradoxal."
      }
    ],
    sante: [
      {
        titre: "L'allaitement",
        contenu: "8 à 12 tétées par 24h est normal. La montée de lait survient entre J2 et J4. Une bonne prise du sein : bouche grande ouverte, lèvres retroussées, menton contre le sein. Source : OMS."
      },
      {
        titre: "Le cordon ombilical",
        contenu: "Il tombe entre 5 et 15 jours. Ne pas le mouiller inutilement, ne pas chercher à l'enlever. Si rougeur autour ou odeur forte : consulter. C'est normal qu'il noircisse avant de tomber. Source : HAS."
      },
      {
        titre: "Le poids",
        contenu: "Perte de poids physiologique normale jusqu'à 10% du poids de naissance les premiers jours. Récupération attendue avant J10-J14. Source : HAS 2022."
      },
      {
        titre: "Le sommeil en sécurité",
        contenu: "Sur le dos uniquement, dans son propre espace de sommeil, sans oreiller ni couette, sans tour de lit. La chambre partagée (pas le lit partagé) réduit le risque de mort subite. Source : HAS 2020."
      }
    ],
    papa: [
      {
        titre: "Les nuits : prends le relais",
        contenu: "La privation de sommeil est le principal facteur de dépression post-partum. Si elle allaite, prends en charge le changement, le portage et le recoucher après chaque tétée. Si biberon, alternez les nuits. Ce geste concret est l'un des plus importants de ce mois."
      },
      {
        titre: "Le baby blues : c'est réel",
        contenu: "50 à 80% des femmes vivent un baby blues entre J3 et J5 : larmes soudaines, euphorie suivie d'effondrement. C'est hormonal, normal, et passe en quelques jours. Si ca dure plus de deux semaines : consulter. Source : CNGOF."
      },
      {
        titre: "Ta propre santé mentale",
        contenu: "10 à 15% des pères développent une dépression post-partum dans les 6 premiers mois. Signes : irritabilité, retrait, anxiété excessive. En parler à un médecin est un signe de force, pas de faiblesse. Source : Paulson 2010."
      },
      {
        titre: "Reconnais les signaux de faim",
        contenu: "Bébé indique qu'il a faim avant de pleurer : il tourne la tête, ouvre la bouche, porte ses mains à sa bouche. Répondre à ces signaux précoces évite le cycle pleurs-stress-tétée difficile."
      }
    ],
    rdv: "Examen J8 obligatoire chez le médecin ou la sage-femme. Examen du 1er mois entre J28 et J32. La sage-femme de ville peut faire les visites à domicile : pense à la contacter avant la sortie de maternité.",
    vaccins: "BCG si indiqué. Pas de vaccin obligatoire avant 2 mois.",
    alerte: "Appelle le 15 ou le pédiatre si : température supérieure à 38°C avant 3 mois (urgence absolue), refus de manger sur 2 tétées consécutives, fontanelle bombée, convulsions, teint grisâtre, difficultés respiratoires."
  },

  1: {
    titre: "Mois 2 - L'éveil",
    intro: "Bébé commence à sourire pour de vrai. Pas le sourire du gaz du mois dernier : un sourire social, en réponse à ton visage. C'est le début d'une communication réelle.",
    developpement: [
      {
        titre: "Le sourire social",
        contenu: "Vers 6 semaines, bébé sourit en réponse à ton visage et ta voix. Ce n'est plus un réflexe : c'est une communication intentionnelle. Étape majeure du développement socio-émotionnel. Source : Brazelton 2006."
      },
      {
        titre: "Le contrôle de la tête",
        contenu: "Il tient sa tête quelques secondes en position ventrale. Le tummy time (ventre sur le sol, sous surveillance) est essentiel. Commence par 2 à 3 minutes plusieurs fois par jour."
      },
      {
        titre: "Les sons",
        contenu: "Premiers sons voyelles. Il réagit aux voix familières en tournant la tête. Il répond dans une conversation en alternant. C'est le début du langage. Source : Locke 1993."
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
        contenu: "Pleurs intenses plus de 3h/jour, plus de 3 jours par semaine, plus de 3 semaines. Touchent 20% des bébés. Cause inconnue, disparaissent spontanément vers 3 mois. Le portage, la chaleur sur le ventre et le mouvement aident. Source : HAS 2021."
      },
      {
        titre: "Les régurgitations",
        contenu: "Normales si bébé grossit bien et n'a pas l'air douloureux. Signe de RGO pathologique : pleurs pendant la tétée, refus de manger, mauvaise prise de poids. Source : ESPGHAN 2018."
      },
      {
        titre: "La tête plate (plagiocéphalie)",
        contenu: "Si tu remarques un aplatissement du crâne d'un côté : le tummy time et alterner le côté où il tourne la tête aident. Signale-le au pédiatre lors du prochain examen."
      }
    ],
    papa: [
      {
        titre: "Le bain : prends-le en charge",
        contenu: "Eau à 37°C, 5 à 10 minutes maximum, soutenir la nuque en permanence. Parle-lui pendant tout le bain. Cette routine quotidienne renforce votre lien de façon très concrète."
      },
      {
        titre: "Parle-lui face à face",
        contenu: "Parle-lui en exagérant tes expressions. Les études IRM montrent que le cerveau de bébé synchronise son activité avec celle du parent qui lui parle. Source : Harvard CDC."
      },
      {
        titre: "Les pleurs inconsolables : les 5-S",
        contenu: "Harvey Karp : swaddling (emmailloter), side (sur le côté dans tes bras), shushing (bruit blanc), swinging (bercer), sucking (tétine). Les 5 ensemble. Pas toujours efficace, mais souvent."
      }
    ],
    rdv: "Examen du 2e mois. Début du carnet de vaccination.",
    vaccins: "DTCaP-Hib-HepB (Hexavalent) 1re dose + Méningocoque B 1re dose + Rotavirus 1re dose (oral). Source : Calendrier vaccinal 2024.",
    alerte: "Absence de sourire à 2 mois. Absence de réaction aux sons. Bébé très mou (hypotonie). Perte de poids."
  },

  2: {
    titre: "Mois 3 - La découverte",
    intro: "3 mois. Le cap souvent décrit comme une renaissance. Les coliques s'estompent, le sommeil s'organise, et bébé rit aux éclats pour la première fois.",
    developpement: [
      {
        titre: "Le rire",
        contenu: "Le premier vrai rire apparaît généralement entre 2,5 et 4 mois. Un son court, souvent inattendu. Il reconnaît ses parents à la vue et cherche activement le contact visuel. Source : Tronick 1978."
      },
      {
        titre: "Les mains",
        contenu: "Il découvre ses mains, les regarde avec fascination, les porte à sa bouche. Il commence à attraper les objets qu'on lui présente. C'est le début de la coordination oeil-main."
      },
      {
        titre: "Le contrôle de la tête",
        contenu: "Tenu assis avec soutien, il maintient sa tête droite. En tummy time, il se redresse sur ses avant-bras et lève la tête à 45 degrés. Source : Denver II."
      },
      {
        titre: "La reconnaissance des émotions",
        contenu: "Il distingue une voix heureuse d'une voix triste ou en colère. Si tu parles fort avec une voix tendue, il peut sursauter ou pleurer. Son cerveau limbique cartographie déjà les émotions."
      },
      {
        titre: "Le sommeil",
        contenu: "Les nuits s'allongent progressivement. 4 à 6h de sommeil continu est possible. Le rythme circadien commence à se mettre en place. Source : Touchette 2005."
      }
    ],
    sante: [
      {
        titre: "La diversification : pas encore",
        contenu: "La diversification alimentaire ne commence pas avant 4 mois révolus. Le lait maternel ou infantile couvre tous les besoins jusqu'à 4-6 mois. Source : OMS / HAS."
      },
      {
        titre: "La régression du sommeil à 4 mois arrive",
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
        contenu: "Trois mois de privation de sommeil et de stress ont un impact réel. Reprendre une activité physique, même 30 minutes 3 fois par semaine, améliore significativement l'humeur et le sommeil."
      },
      {
        titre: "Parler à bébé : comment bien faire",
        contenu: "Parler lentement, avec des intonations variées, en répétant. Nomme tout ce que tu fais avec lui. Il enregistre chaque mot même s'il ne les comprend pas encore. Source : Kuhl 2004."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire ce mois. Surveiller le développement.",
    vaccins: "DTCaP-Hib-HepB 2e dose + Méningocoque B 2e dose + Rotavirus 2e dose + Pneumocoque 1re dose. Source : Calendrier vaccinal 2024.",
    alerte: "Absence de rires. Absence de suivi visuel. Pas de réaction aux sons forts. Rigidité ou hypotonie des membres. Absence de sourire à 3 mois."
  },

  3: {
    titre: "Mois 4 - La communication",
    intro: "Bébé devient un vrai interlocuteur. Il attend sa réponse dans une conversation, proteste quand tu t'arrêtes, rit quand quelque chose l'amuse.",
    developpement: [
      {
        titre: "Les protoconversations",
        contenu: "Bébé fait des pauses quand tu parles, puis répond à son tour. C'est une conversation sans mots mais avec les mêmes règles. Ce protocole d'alternance est la base du langage. Source : Kuhl 2004."
      },
      {
        titre: "La préhension",
        contenu: "Bébé attrape et tient des objets, les porte à la bouche. C'est normal : la phase orale est un stade de développement essentiel décrit par Piaget. Source : Piaget 1952."
      },
      {
        titre: "Le retournement",
        contenu: "Il commence à se retourner du ventre vers le dos, souvent par accident. Assure-toi de ne jamais le laisser seul sur une surface élevée à partir de ce mois."
      },
      {
        titre: "Les vocalisations",
        contenu: "Gazouillements variés, syllabes comme ba, da, ma. Il répond quand tu lui parles en alternant. Source : Locke 1993."
      }
    ],
    sante: [
      {
        titre: "Début de diversification possible",
        contenu: "Entre 4 et 6 mois révolus selon l'enfant. Commencer si bébé tient sa tête, montre de l'intérêt pour la nourriture, n'a plus le réflexe d'extrusion. Légumes en purée lisse, sans sel ni sucre. Source : ESPGHAN / HAS."
      },
      {
        titre: "La régression du sommeil",
        contenu: "C'est maintenant. Des nuits qui s'étaient améliorées se dégradent soudainement. Pas de solution miracle : de la constance dans les rituels du coucher, et attendre. Ca passe."
      }
    ],
    papa: [
      {
        titre: "La lecture quotidienne",
        contenu: "Lire à voix haute 10 minutes par jour améliore le vocabulaire à 2 ans et les capacités de lecture à 5 ans. Des livres cartonnés avec peu de mots et des images contrastées. Source : Duursma 2008."
      },
      {
        titre: "Les rituels du coucher",
        contenu: "Un rituel du coucher cohérent (bain, pyjama, tétée, chanson, dodo) aide bébé à comprendre que la nuit arrive. Prends en charge ce rituel plusieurs soirs par semaine."
      },
      {
        titre: "Parler de la charge mentale",
        contenu: "Quatre mois après la naissance, la répartition des tâches peut cristalliser des tensions. La charge mentale (rendez-vous, stocks, tailles suivantes) est souvent invisible. Une conversation directe vaut mieux que du ressentiment."
      }
    ],
    rdv: "Examen du 4e mois obligatoire.",
    vaccins: "Méningocoque B 3e dose. Source : Calendrier vaccinal 2024.",
    alerte: "Pas de préhension volontaire. Asymétrie des mouvements. Absence de gazouillements. Pas de sourire réciproque."
  },

  4: {
    titre: "Mois 5 - La curiosité",
    intro: "Tout l'intéresse. Il attrape, examine, mordille, lâche, recommence. C'est sa façon d'apprendre. Le monde est un laboratoire.",
    developpement: [
      {
        titre: "La reconnaissance sociale",
        contenu: "Bébé distingue les visages familiers des étrangers. L'angoisse de l'étranger peut débuter. Il reconnaît son prénom et réagit quand on l'appelle. Source : Fagan 1979."
      },
      {
        titre: "La motricité",
        contenu: "Se retourne dos-ventre. Peut se tenir assis avec appui. Commence à prendre des objets en opposition pouce-index. Source : Denver II."
      },
      {
        titre: "Le lien d'attachement",
        contenu: "Il manifeste une préférence claire pour ses figures d'attachement. Ne le force jamais à faire le beau avec quelqu'un qui lui est inconnu. L'attachement sécure est le meilleur prédicteur de santé mentale à l'âge adulte. Source : Bowlby / Ainsworth."
      },
      {
        titre: "Les premiers sons proto-linguistiques",
        contenu: "Il produit des sons consonantiques : ba, ma, da. Ces sons sont le résultat de l'entraînement vocal des mois précédents. Réponds-lui comme s'il parlait. Source : Kuhl 2007."
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
        contenu: "Bacs à textures différentes (tissu, bois, plastique), musique avec différents instruments, livres à toucher. Tu peux fabriquer des jouets simples : une bouteille avec du riz dedans fait un excellent hochet."
      },
      {
        titre: "L'angoisse de séparation",
        contenu: "Normale et signe d'attachement sain. Ne pas forcer les contacts avec des inconnus. Source : Bowlby / Ainsworth."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire. Surveillance de la diversification.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Asymétrie dans les mouvements. Absence de retournement. Perte d'acquis. Absence de réaction au prénom."
  },

  5: {
    titre: "Mois 6 - La moitié de la première année",
    intro: "Six mois. Ton bébé pèse environ le double de son poids de naissance. Il mange de la nourriture solide, rit, joue, vous reconnaît de loin.",
    developpement: [
      {
        titre: "Le langage",
        contenu: "Syllabes redupliquées : bababa, mamama, dadada. Ce n'est pas encore du langage mais l'entraînement phonologique qui y conduit. Plus tu lui parles, plus son cerveau se structure. Source : Kuhl 2007."
      },
      {
        titre: "La position assise",
        contenu: "Assis sans soutien pendant quelques secondes, puis plus longtemps. Transfert d'objet d'une main à l'autre. Ne mets pas de cale pour le maintenir assis : il doit trouver son équilibre seul. Source : Denver II."
      },
      {
        titre: "La permanence de l'objet",
        contenu: "Il cherche un objet qu'on vient de cacher sous un tissu devant lui. Il comprend que l'objet existe encore même s'il ne le voit plus. Étape majeure de Piaget. Source : Piaget 1954."
      },
      {
        titre: "La peur de l'étranger",
        contenu: "Elle se renforce ce mois. Il peut pleurer avec des personnes qu'il ne voit pas régulièrement. Solution : expositions régulières et progressives, sans forcer."
      }
    ],
    sante: [
      {
        titre: "La diversification à 6 mois",
        contenu: "OMS recommande 6 mois d'allaitement exclusif avant diversification. Vers 7-8 mois : viande ou poisson (10g/jour). Oeuf cuit dès 6 mois. Source : OMS / ESPGHAN 2017."
      },
      {
        titre: "Les allergènes",
        contenu: "Introduction précoce des allergènes majeurs (arachide, oeuf, gluten) entre 4 et 12 mois réduit le risque d'allergie. Ne pas retarder leur introduction sans avis médical. Source : LEAP Study / ESPGHAN."
      },
      {
        titre: "Les premières dents",
        contenu: "Les incisives centrales inférieures apparaissent généralement entre 6 et 10 mois. Une fois sorties, les nettoyer matin et soir avec une compresse humide."
      }
    ],
    papa: [
      {
        titre: "La motricité libre",
        contenu: "Laisser bébé explorer le sol en sécurité, sans le mettre assis ou debout avant qu'il ne le fasse seul. La motricité libre développe la confiance en soi et l'autonomie. Source : Pikler / Bernard-Bonnin 2012."
      },
      {
        titre: "Préparer les repas de bébé",
        contenu: "Préparer les purées en grande quantité et les congeler en petites portions. Une carotte cuite mixée avec un peu de bouillon de légumes maison, c'est tout ce qu'il lui faut. Économique et utile."
      }
    ],
    rdv: "Examen du 6e mois obligatoire. Bilan complet.",
    vaccins: "DTCaP-Hib-HepB 3e dose (rappel) + Pneumocoque 2e dose + Méningocoque C. Source : Calendrier vaccinal 2024.",
    alerte: "Absence de syllabes. Pas de tenue assise avec appui. Absence de sourire réciproque. Régressions notables."
  },

  6: {
    titre: "Mois 7 - En mouvement",
    intro: "Il commence à se déplacer. Pas encore à quatre pattes pour tous, mais il trouve ses stratégies. Son monde s'agrandit. Ton espace aussi doit s'adapter.",
    developpement: [
      {
        titre: "Le quatre pattes",
        contenu: "Certains bébés rampent, d'autres se propulsent sur les fesses, d'autres passent directement à la marche. Ce qui compte : qu'il se déplace. Le quatre pattes croisé renforce les connexions entre les deux hémisphères cérébraux. Source : AAP 2022."
      },
      {
        titre: "La permanence de l'objet",
        contenu: "Bébé comprend qu'un objet caché existe encore. Il cherche le jouet que tu caches sous une couverture. Base de la pensée abstraite. Source : Piaget 1954."
      },
      {
        titre: "La compréhension du non",
        contenu: "Il commence à comprendre certains mots dans leur contexte, notamment non dit d'un ton ferme. Il ne comprend pas encore la règle, mais il capte l'émotion. Utilise le non avec parcimonie, pour les vraies situations de danger."
      },
      {
        titre: "Les jeux de cause à effet",
        contenu: "Il adore appuyer sur des boutons qui font du bruit, taper sur des surfaces. Lâcher des objets pour que tu les ramasses (et recommencer 20 fois) : ce n'est pas de la malice, c'est de la science expérimentale."
      }
    ],
    sante: [
      {
        titre: "Sécuriser la maison",
        contenu: "Protège les angles bas, bloque les tiroirs, sécurise les escaliers, range les produits ménagers hors de portée. Mets-toi à sa hauteur pour voir ce qui est accessible. La chute est la 1re cause d'accident à cet âge. Source : Santé Publique France."
      },
      {
        titre: "L'alimentation",
        contenu: "Textures : purées avec petits morceaux mous. Viande ou poisson : 10g/jour. Introduire progressivement les textures pour prévenir le refus alimentaire futur. Source : HAS / PNNS."
      }
    ],
    papa: [
      {
        titre: "Le cache-cache",
        contenu: "Se cacher derrière tes mains puis réapparaître est bien plus qu'un jeu : c'est l'entraînement de la permanence de l'objet et de la gestion émotionnelle de la séparation. Source : Stern 1985."
      },
      {
        titre: "Le jeu au sol",
        contenu: "Mets-toi par terre avec lui, à sa hauteur. Le jeu au sol que tu partages avec lui est différent du jeu qu'il fait seul. Tu es le premier autre être humain avec qui il apprend à jouer."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Absence de déplacement. Asymétrie motrice. Pas de permanence de l'objet. Absence de syllabes."
  },

  7: {
    titre: "Mois 8 - La personnalité",
    intro: "L'angoisse de séparation est à son pic. C'est le signe d'un attachement sain et sécure. Il a un caractère. Il fait comprendre ce qu'il veut et ce qu'il ne veut pas.",
    developpement: [
      {
        titre: "L'angoisse du 8e mois",
        contenu: "Normale et attendue entre 6 et 12 mois. Bébé prend conscience qu'il est séparé de ses parents. Un attachement sécure est la meilleure protection contre l'anxiété future. Source : Ainsworth 1978."
      },
      {
        titre: "La compréhension",
        contenu: "Non, donne, bravo. Bébé commence à comprendre des mots simples avant de les parler. Vocabulaire réceptif supérieur au vocabulaire expressif jusqu'à 18 mois. Source : Bates 1976."
      },
      {
        titre: "Se mettre debout",
        contenu: "Il se hisse en position debout en s'appuyant sur les meubles. Il commence à marcher en se tenant aux meubles (cruising). Assure-toi que les meubles sont stables."
      },
      {
        titre: "L'imitation",
        contenu: "Il t'imite : taper dans les mains, mettre un chapeau, parler dans un téléphone jouet. L'imitation est le mécanisme d'apprentissage social fondamental. Ce que tu fais devant lui, il le mémorise. Source : Meltzoff 2002."
      }
    ],
    sante: [
      {
        titre: "L'alimentation",
        contenu: "Trois repas et 2 laitages par jour. Introduire les féculents et légumineuses. Éviter sel, sucre ajouté, miel avant 1 an, charcuterie. Jus de fruits : aucun avant 1 an. Source : PNNS / HAS 2021."
      },
      {
        titre: "Le sommeil",
        contenu: "Régression du sommeil fréquente liée à l'angoisse de séparation. Rituel du coucher stable = sécurité. Chaque perturbation n'est pas une régression définitive. Source : HAS 2017."
      }
    ],
    papa: [
      {
        titre: "Les au revoir : toujours les faire",
        contenu: "Toujours dire au revoir quand tu pars, même si bébé pleure. Les départs discrets augmentent l'anxiété : bébé ne comprend pas pourquoi tu as disparu. Source : Bowlby."
      },
      {
        titre: "Les rituels qui comptent",
        contenu: "Bébé comprend la routine et la prévisibilité le rassure. Tes rituels (le bain, la chanson du soir, la promenade du dimanche matin) sont mémorisés et attendus. Ces moments construisent la sécurité affective."
      }
    ],
    rdv: "Examen du 8e mois conseillé.",
    vaccins: "Grippe si indiqué (prématurés, pathologies chroniques).",
    alerte: "Absence de réaction à son prénom. Pas de syllabes. Absence de geste au revoir. Régression importante d'acquis."
  },

  8: {
    titre: "Mois 9 - L'exploration",
    intro: "Bébé dit ses premiers mots, ou presque. Mama et dada commencent à avoir du sens. Il s'éloigne pour explorer, puis revient te voir. Tu es sa base de sécurité.",
    developpement: [
      {
        titre: "Les premiers mots",
        contenu: "Les premiers mots signifiants apparaissent entre 9 et 14 mois. Mama et dada associés à la bonne personne. Le vocabulaire expressif au 12e mois prédit le développement du langage à 2 ans. Source : Fenson 1994."
      },
      {
        titre: "La pince pouce-index",
        contenu: "Bébé peut saisir de petits objets avec précision entre le pouce et l'index. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent être avalés. Source : Denver II."
      },
      {
        titre: "La base de sécurité",
        contenu: "Bébé s'éloigne pour explorer, puis revient te voir, puis repart. C'est exactement ce que décrit Bowlby. Toi et sa mère, vous êtes sa base de sécurité : il part en exploration parce qu'il sait qu'il peut revenir. Source : Bowlby 1969."
      },
      {
        titre: "La compréhension des émotions",
        contenu: "Il regarde ton visage quand il est dans une situation ambiguë pour savoir comment réagir (social referencing). Ton expression détermine sa réaction. Tu es son baromètre émotionnel."
      }
    ],
    sante: [
      {
        titre: "Le brossage des dents",
        contenu: "Dès la première dent : brosse matin et soir avec une brosse à dents adaptée et du dentifrice fluoré 500ppm (taille d'un grain de riz). Source : UFSBD / HAS."
      },
      {
        titre: "La diversification à 9 mois",
        contenu: "Les morceaux mous sont maintenant la norme. Toujours surveiller pendant les repas. Aliments à éviter : raisins entiers, noix, olives, bonbons, tout ce qui est dur et rond."
      }
    ],
    papa: [
      {
        titre: "Lire chaque soir",
        contenu: "10 minutes de lecture le soir est la pratique parentale la mieux documentée pour le développement du langage. Les enfants à qui on lit quotidiennement ont 1,4 million de mots de plus à 5 ans. Source : Logan 2019."
      },
      {
        titre: "Les jeux d'exploration",
        contenu: "Cache un jouet sous une couverture devant lui. Fais-lui découvrir des textures nouvelles : l'herbe, le sable, l'eau, la boue. Ces explorations sensorielles sont fondamentales pour le développement cognitif."
      }
    ],
    rdv: "Examen du 9e mois obligatoire. Consultation la plus complète depuis le 1er mois : motricité, langage, vision, audition. Prépare tes questions.",
    vaccins: "Méningocoque B rappel si non fait à 6 mois.",
    alerte: "Absence de pince pouce-index. Pas de syllabes variées. Absence de compréhension de mots simples. Pas de pointage."
  },

  9: {
    titre: "Mois 10 - La communication intentionnelle",
    intro: "Il te dit quelque chose. Peut-être pas avec des mots, mais avec des gestes et des regards. Il pointe du doigt ce qui l'intéresse. C'est de la communication intentionnelle. C'est majeur.",
    developpement: [
      {
        titre: "Debout",
        contenu: "Bébé se met debout en s'aidant des meubles. Marche en se tenant aux meubles. Les premières chutes font partie de l'apprentissage. Source : Adolph 2012."
      },
      {
        titre: "Le pointage proto-déclaratif",
        contenu: "Il pointe du doigt un objet, te regarde pour partager sa découverte, puis regarde à nouveau l'objet. Geste qui dit : Regarde ca avec moi. C'est le partage d'attention conjointe, précurseur essentiel du langage. Source : Tomasello 1995."
      },
      {
        titre: "L'imitation intentionnelle",
        contenu: "Imite gestes et sons volontairement : taper des mains, faire coucou, sonner. L'imitation est le moteur principal de l'apprentissage du langage et des comportements sociaux. Source : Meltzoff 2002."
      },
      {
        titre: "Les premiers mots avec sens",
        contenu: "Entre 10 et 14 mois, les premiers vrais mots apparaissent : sons produits de façon cohérente pour désigner la même chose. Le vocabulaire est encore minuscule mais intentionnel."
      }
    ],
    sante: [
      {
        titre: "La chaussure : quand et comment",
        contenu: "Les chaussures ne sont utiles qu'à l'extérieur. À l'intérieur, pieds nus ou chaussettes antidérapantes. Quand il marche dehors : chaussures souples, semelles flexibles, une taille de plus que le pied. Évite les chaussures rigides."
      }
    ],
    papa: [
      {
        titre: "Les limites : poser les bases",
        contenu: "Commencer à poser des limites claires et constantes. Non = non, toujours. La consistance des règles (même règle, même réaction) est plus importante que la sévérité. Elle crée la sécurité. Source : Baumrind 1966."
      },
      {
        titre: "Son premier anniversaire approche",
        contenu: "Le premier anniversaire est pour les adultes, pas pour bébé. Il ne comprend pas l'enjeu. Un petit rassemblement familial simple vaut mieux qu'une fête surchargée qui le fatigue."
      }
    ],
    rdv: "Pas de rendez-vous obligatoire.",
    vaccins: "Pas de vaccin ce mois.",
    alerte: "Pas de mise debout avec appui. Absence d'imitation. Pas de pointage. Absence de compréhension de mots simples."
  },

  10: {
    titre: "Mois 11 - Vers la marche",
    intro: "Il se tient debout seul quelques secondes. Il lâche le meuble, hésite, se rassoit. Il recommence. Chaque tentative est une leçon de persévérance.",
    developpement: [
      {
        titre: "Avant les premiers pas",
        contenu: "Bébé peut se tenir debout sans appui quelques secondes. Les premiers pas indépendants arrivent en moyenne à 12 mois, entre 9 et 15 mois tout est normal. Ne jamais forcer avec des trotteurs. Source : WHO Motor Development Study."
      },
      {
        titre: "La compréhension",
        contenu: "Comprend des phrases simples : donne-moi, où est papa, viens. Commence à suivre des instructions simples. Son vocabulaire réceptif explose. Source : Tomasello 1995."
      },
      {
        titre: "L'humour",
        contenu: "Il comprend ce qui est drôle. Il fait des blagues : mettre le pot sur la tête, te donner quelque chose et le reprendre. L'humour est une compétence sociale complexe qui demande de comprendre les attentes de l'autre."
      },
      {
        titre: "La colère et la frustration",
        contenu: "Il veut ce qu'il veut, maintenant. Ses frustrations sont intenses parce qu'il ne peut pas encore les verbaliser. Ce n'est pas de la manipulation : c'est une surcharge émotionnelle que son cortex préfrontal immature ne peut pas encore réguler."
      }
    ],
    sante: [
      {
        titre: "L'alimentation vers 1 an",
        contenu: "Préparer la transition vers le lait de croissance ou lait entier dès 1 an. Alimentation de plus en plus familiale. Pas de lait demi-écrémé avant 2 ans. Pas de restriction sans avis médical. Source : HAS / PNNS 4."
      },
      {
        titre: "Les bobos et les chutes",
        contenu: "Il tombe en apprenant à marcher, des dizaines de fois par jour. Les bobos mineurs font partie du développement. Chutes à surveiller : de hauteur, choc à la tête avec perte de conscience, vomissements après une chute."
      }
    ],
    papa: [
      {
        titre: "Gérer les crises",
        contenu: "Face à une crise : ne cède pas systématiquement, ne punis pas non plus. Reste calme, nomme l'émotion (Je vois que tu es en colère), maintiens la limite avec douceur. Épuisant mais efficace. Source : Baumrind 1966."
      },
      {
        titre: "Préparer le 1er anniversaire",
        contenu: "Le premier anniversaire est autant pour vous que pour bébé. Prendre un moment pour célébrer ce que vous avez traversé ensemble, en couple. La relation de couple est la base de la stabilité de l'enfant. Source : Gottman 2000."
      }
    ],
    rdv: "Examen du 12e mois obligatoire (peut être fait à 11 mois).",
    vaccins: "ROR (Rougeole-Oreillons-Rubéole) 1re dose + Méningocoque C rappel + Varicelle 1re dose. Source : Calendrier vaccinal 2024.",
    alerte: "Absence totale de mots. Pas de marche avec appui. Perte d'acquis. Absence de pointage à 12 mois."
  },

  11: {
    titre: "1 an !",
    intro: "Un an. Un cap immense. Bébé marche (ou presque), dit ses premiers mots, te reconnaît de loin, rit avec toi. Cette année vous a transformés. Tous les deux.",
    developpement: [
      {
        titre: "Les premiers pas",
        contenu: "La marche indépendante arrive en moyenne à 12 mois, mais entre 9 et 15 mois tout est dans la norme. Ne jamais forcer avec des trotteurs : ils retardent la marche et augmentent le risque de chute. Source : AAP / HAS."
      },
      {
        titre: "Le langage",
        contenu: "2 à 5 mots significatifs en moyenne à 12 mois. La compréhension est bien plus développée que la production. L'important : bébé comprend-il ce qu'on lui dit ? Source : Rescorla 1989."
      },
      {
        titre: "Le jeu symbolique",
        contenu: "Premiers jeux du type faire semblant : faire boire une peluche, téléphoner avec un objet. C'est le début de la pensée symbolique, base du langage et de la cognition. Source : Piaget / Vygotski."
      },
      {
        titre: "L'attachement sécure construit",
        contenu: "Un bébé qui explore librement, utilise ses parents comme base de sécurité, est perturbé par les séparations mais se rassure rapidement au retour : cet attachement se construit sur 12 mois de réponses cohérentes à ses besoins."
      }
    ],
    sante: [
      {
        titre: "L'alimentation à 1 an",
        contenu: "Lait de croissance ou lait entier (500ml/jour max). Alimentation variée de table, 4 repas par jour. Pas de lait demi-écrémé avant 2 ans. Pas de miel avant 1 an. Source : PNNS / HAS 2021."
      },
      {
        titre: "Le dentiste",
        contenu: "Consultation chez le dentiste recommandée dès 1 an. Source : UFSBD 2022."
      }
    ],
    papa: [
      {
        titre: "Ce que tu lui as donné cette année",
        contenu: "Une présence stable. Des rituels. Un regard bienveillant. La sécurité de savoir qu'il peut explorer parce que tu es là quand il revient. Les pères qui s'impliquent activement la première année ont des enfants avec une meilleure régulation émotionnelle à 5 ans. Source : Lamb 2004."
      },
      {
        titre: "Toi, un an après",
        contenu: "Tu es différent. Plus patient que tu ne le pensais. Plus ému par des choses simples. Plus conscient de ce qui compte vraiment. Cette transformation est réelle et permanente."
      }
    ],
    rdv: "Examen du 12e mois obligatoire. Bilan complet.",
    vaccins: "ROR 1re dose + Méningocoque C + Varicelle. Source : Calendrier vaccinal 2024.",
    alerte: "Absence totale de mots à 12 mois. Pas de marche avec appui à 15 mois : consultation neuropédiatrie. Perte d'acquis moteurs ou langagiers."
  }
};
