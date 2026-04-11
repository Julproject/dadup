'use client';
import { useState, useMemo } from 'react';

const C = {
  dark: '#1e2535', blue: '#2E5F8A', blueDark: '#1A3D5C', gold: '#c8a060',
  white: '#ffffff', border: '#f0ede8', muted: '#9aa0a8', cream: '#f7f5f0',
};

type Terme = { mot: string; def: string; cat: string };

const CATEGORIES = [
  { id: 'suivi',    label: 'Suivi médical',  bg: '#E6F0FA', tc: '#1A4A7A' },
  { id: 'bebe',     label: 'Bébé',           bg: '#E4F5EC', tc: '#0D6B40' },
  { id: 'sympt',    label: 'Symptômes',      bg: '#FFF7E0', tc: '#8A6010' },
  { id: 'accouche', label: 'Accouchement',   bg: '#FFF0E6', tc: '#C04A1A' },
  { id: 'admin',    label: 'Préparation',    bg: '#F0EEFF', tc: '#5050B0' },
  { id: 'postpart', label: 'Post-partum',    bg: '#E0F5F0', tc: '#0A5040' },
  { id: 'alerte',   label: 'Alertes',        bg: '#FDECEA', tc: '#8A0000' },
];

const TERMES: Terme[] = [
  // SUIVI MÉDICAL
  { cat: 'suivi', mot: 'SA — Semaine d\'Aménorrhée', def: 'Façon de compter la grossesse en France. On compte depuis le 1er jour des dernières règles. La grossesse dure 41 SA. Ton médecin utilise toujours les SA.' },
  { cat: 'suivi', mot: 'SG — Semaine de Grossesse', def: 'Autre façon de compter, depuis la fécondation. Les SG ont toujours 2 semaines de moins que les SA. Si le médecin dit "22 SA", ça correspond à 20 SG.' },
  { cat: 'suivi', mot: 'DPA — Date Prévue d\'Accouchement', def: 'La date calculée à 41 SA depuis les dernières règles. C\'est une estimation. Seulement 5% des bébés naissent exactement ce jour-là.' },
  { cat: 'suivi', mot: 'Échographie T1', def: 'Première échographie obligatoire entre 11 et 13 SA. Elle date la grossesse, vérifie que le cœur bat et mesure la clarté nucale. C\'est souvent la première fois que tu vois bébé.' },
  { cat: 'suivi', mot: 'Échographie T2 morphologique', def: 'Deuxième échographie obligatoire vers 22 SA. La plus complète. Elle examine plus de 100 critères anatomiques : cerveau, cœur, reins, membres. Dure environ 45 minutes.' },
  { cat: 'suivi', mot: 'Échographie T3', def: 'Troisième échographie obligatoire vers 32 SA. Elle vérifie la croissance de bébé, sa position, le volume de liquide amniotique et l\'état du placenta.' },
  { cat: 'suivi', mot: 'Clarté nucale', def: 'Mesure d\'une zone derrière la nuque de bébé lors de l\'écho T1. Plus elle est épaisse, plus le risque de trisomie 21 peut être élevé. C\'est une évaluation de risque, pas un diagnostic.' },
  { cat: 'suivi', mot: 'Trisomie 21', def: 'Anomalie chromosomique (un chromosome 21 en trop). Le dépistage combine la clarté nucale et une prise de sang. En cas de risque élevé, un diagnostic peut être proposé.' },
  { cat: 'suivi', mot: 'DPNI — Dépistage Prénatal Non Invasif', def: 'Prise de sang qui analyse l\'ADN de bébé dans le sang maternel. Très fiable pour détecter la trisomie 21. Non remboursé en première intention.' },
  { cat: 'suivi', mot: 'Amniocentèse', def: 'Prélèvement de liquide amniotique pour analyser les chromosomes de bébé. Seul examen qui donne un diagnostic certain. Proposé si le risque de trisomie est élevé.' },
  { cat: 'suivi', mot: 'HGPO — Test de diabète gestationnel', def: 'Test entre 24 et 28 SA. Tu bois une solution sucrée, puis 3 prises de sang en 2 heures mesurent comment le corps gère le sucre. Accompagne-la, c\'est long.' },
  { cat: 'suivi', mot: 'Diabète gestationnel', def: 'Glycémie (taux de sucre) élevée pendant la grossesse. Traité par régime alimentaire, parfois insuline. Disparaît généralement après l\'accouchement.' },
  { cat: 'suivi', mot: 'Streptocoque B', def: 'Bactérie naturellement présente chez certaines femmes. Un dépistage est fait vers 36 SA. Si positif, un antibiotique est administré pendant le travail pour protéger bébé.' },
  { cat: 'suivi', mot: 'Toxoplasmose', def: 'Infection parasitaire transmise par la viande crue ou la litière des chats. Interdite pendant la grossesse si elle n\'a pas déjà été contractée. Contrôle sanguin mensuel.' },
  { cat: 'suivi', mot: 'Rubéole', def: 'Maladie virale dangereuse pour le fœtus. Un test sanguin vérifie si elle est immunisée. Si non, vaccin après l\'accouchement (pas pendant la grossesse).' },
  { cat: 'suivi', mot: 'EPP — Entretien Prénatal Précoce', def: 'Entretien avec une sage-femme au 4e mois. Obligatoire depuis 2020. Il aborde la santé mentale, le soutien, les besoins du couple. Vous pouvez y aller ensemble.' },
  { cat: 'suivi', mot: 'Hauteur utérine', def: 'Mesure de la distance entre le pubis et le sommet de l\'utérus. Permet de vérifier que bébé grandit normalement. En cm, elle correspond approximativement au nombre de SA.' },
  { cat: 'suivi', mot: 'Monitoring fœtal', def: 'Appareil qui enregistre simultanément le rythme cardiaque de bébé et les contractions. Utilisé en fin de grossesse et pendant le travail pour surveiller l\'état de bébé.' },

  // DÉVELOPPEMENT DE BÉBÉ
  { cat: 'bebe', mot: 'Blastocyste', def: 'Stade de l\'œuf fécondé avant l\'implantation dans l\'utérus. Environ 5 jours après la fécondation. Il ressemble à une petite boule creuse de quelques centaines de cellules.' },
  { cat: 'bebe', mot: 'Nidation', def: 'Moment où l\'œuf fécondé s\'implante dans la paroi de l\'utérus. Vers 3-4 SA. C\'est à ce moment que débute officiellement la grossesse et que l\'hCG commence à être produite.' },
  { cat: 'bebe', mot: 'Embryon', def: 'Nom donné à bébé de la fécondation jusqu\'à 10 SA. Après, on parle de fœtus. En 10 semaines, tous les organes essentiels sont mis en place.' },
  { cat: 'bebe', mot: 'Fœtus', def: 'Nom de bébé à partir de 10 SA. Les organes sont en place, les semaines suivantes servent à les faire grandir et maturer. Il peut déjà bouger, sucer son pouce, entendre.' },
  { cat: 'bebe', mot: 'Placenta', def: 'Organe temporaire qui se forme pendant la grossesse. Il nourrit bébé, lui apporte l\'oxygène et filtre les déchets. Il est expulsé après la naissance (la délivrance).' },
  { cat: 'bebe', mot: 'Liquide amniotique', def: 'Liquide qui entoure et protège bébé dans l\'utérus. Il maintient la température, amortit les chocs et permet à bébé de s\'exercer à déglutir. Bébé en avale et en produit en permanence.' },
  { cat: 'bebe', mot: 'Cordon ombilical', def: 'Lien entre bébé et le placenta. Il transporte le sang oxygéné vers bébé et ramène le sang chargé de déchets vers le placenta. Tu pourras peut-être le couper à la naissance.' },
  { cat: 'bebe', mot: 'Vernix caseosa', def: 'Enduit blanc et gras qui recouvre la peau de bébé in utero. Il protège sa peau du liquide amniotique. On peut le voir à la naissance, surtout sur les plis.' },
  { cat: 'bebe', mot: 'Lanugo', def: 'Fin duvet qui couvre le corps de bébé vers 16-20 SA. Il disparaît généralement avant la naissance. S\'il en reste, il tombe naturellement dans les premières semaines de vie.' },
  { cat: 'bebe', mot: 'Présentation céphalique', def: 'Position idéale : bébé est la tête en bas, prêt pour l\'accouchement voie basse. C\'est la position de la grande majorité des bébés à terme.' },
  { cat: 'bebe', mot: 'Présentation en siège', def: 'Bébé est les fesses ou les pieds en bas. Vers 32-34 SA, une version par manœuvres externes peut être tentée. Sinon, une césarienne est souvent proposée.' },
  { cat: 'bebe', mot: 'Viabilité fœtale', def: 'Seuil à partir duquel bébé peut survivre hors de l\'utérus avec assistance médicale. En France, fixé à 22 SA. Avant ce seuil, une naissance prématurée n\'est pas réanimable.' },
  { cat: 'bebe', mot: 'Sac gestationnel', def: 'Première structure visible à l\'échographie, vers 4-5 SA. C\'est la poche qui contient l\'embryon et le liquide amniotique. Son absence peut indiquer une grossesse extra-utérine.' },
  { cat: 'bebe', mot: 'hCG — Hormone de grossesse', def: 'Hormone produite dès la nidation. C\'est elle que détectent les tests de grossesse. Son taux double tous les 2 jours en début de grossesse. Elle est responsable des nausées.' },
  { cat: 'bebe', mot: 'Terme', def: 'Une grossesse est dite "à terme" entre 37 et 41 SA. Avant 37 SA = prématuré. Après 41 SA = dépassement de terme, une surveillance renforcée est mise en place.' },
  { cat: 'bebe', mot: 'Prématurité', def: 'Naissance avant 37 SA. Le pronostic dépend du terme : à 34 SA, les risques sont faibles ; avant 28 SA, une réanimation néonatale intensive est nécessaire.' },

  // SYMPTÔMES
  { cat: 'sympt', mot: 'Nausées matinales', def: 'Nausées fréquentes en début de grossesse, surtout le matin. Causées par la montée rapide de l\'hCG. Disparaissent souvent vers 12-14 SA, parfois plus tard.' },
  { cat: 'sympt', mot: 'Hyperemesis gravidique', def: 'Forme sévère de nausées : vomissements très fréquents, déshydratation, perte de poids. Nécessite une consultation en urgence. Plus rare que les nausées classiques.' },
  { cat: 'sympt', mot: 'Brûlures d\'estomac', def: 'Remontées acides fréquentes en cours de grossesse, surtout au 3e trimestre. L\'utérus qui grossit comprime l\'estomac. Des repas plus petits et plus fréquents peuvent aider.' },
  { cat: 'sympt', mot: 'Symphyse pubienne (SPD)', def: 'Douleur au niveau du pubis causée par l\'assouplissement des ligaments. Peut rendre difficile la marche, monter les escaliers ou s\'habiller. Une sage-femme peut aider.' },
  { cat: 'sympt', mot: 'Crampes nocturnes', def: 'Crampes dans les mollets, fréquentes au 2e et 3e trimestre. Liées au manque de magnésium, à la compression vasculaire. Des étirements avant le coucher peuvent aider.' },
  { cat: 'sympt', mot: 'Contractions de Braxton-Hicks', def: 'Contractions irrégulières, indolores, qui préparent l\'utérus à l\'accouchement. Elles peuvent commencer dès 20 SA. Elles passent au repos et ne s\'intensifient pas.' },
  { cat: 'sympt', mot: 'Linea nigra', def: 'Ligne foncée verticale qui peut apparaître sur le ventre pendant la grossesse. Causée par la mélanine stimulée par les hormones. Disparaît progressivement après l\'accouchement.' },
  { cat: 'sympt', mot: 'Masque de grossesse (chloasma)', def: 'Taches brunes sur le visage, souvent sur le front et les joues. Causées par les hormones. La protection solaire limite leur apparition. Disparaissent après l\'accouchement.' },
  { cat: 'sympt', mot: 'Œdème des chevilles', def: 'Gonflement des pieds et chevilles, surtout en fin de journée et de grossesse. Lié à la rétention d\'eau. Les surélever et éviter de rester debout longtemps peut aider.' },
  { cat: 'sympt', mot: 'Varices', def: 'Veines dilatées visibles sous la peau, souvent sur les jambes. La pression de l\'utérus ralentit la circulation. Des bas de contention peuvent être prescrits.' },
  { cat: 'sympt', mot: 'Hémorroïdes', def: 'Veines dilatées dans la zone anale, fréquentes en grossesse. La constipation aggrave le problème. Une hydratation suffisante et une alimentation riche en fibres aident.' },
  { cat: 'sympt', mot: 'Sciatique', def: 'Douleur qui descend dans la fesse et la jambe. L\'utérus peut comprimer le nerf sciatique. La chaleur locale, certaines positions et la kinésithérapie peuvent soulager.' },
  { cat: 'sympt', mot: 'Saignements d\'implantation', def: 'Petits saignements rosés ou marrons vers 3-4 SA, quand l\'œuf s\'implante dans l\'utérus. Normaux et sans danger. Différents des règles : plus courts et plus légers.' },
  { cat: 'sympt', mot: 'Leucorrhées (pertes blanches)', def: 'Pertes vaginales blanches ou translucides, normales pendant la grossesse. Elles augmentent en quantité. Si elles changent d\'odeur ou de couleur, consulter.' },

  // ACCOUCHEMENT
  { cat: 'accouche', mot: 'Travail (phase active)', def: 'Phase de l\'accouchement où les contractions sont régulières, de plus en plus rapprochées et intenses. Il dilate progressivement le col jusqu\'à 10 cm. Durée variable selon les femmes.' },
  { cat: 'accouche', mot: 'Contractions régulières', def: 'Contractions qui s\'intensifient, se rapprochent et durent plus longtemps au fil du temps. Elles ne passent pas au repos. Différentes des Braxton-Hicks.' },
  { cat: 'accouche', mot: 'Règle 5-1-1', def: 'Signal pour appeler la maternité : contractions toutes les 5 minutes, qui durent 1 minute, depuis 1 heure. Ne pas attendre ce stade pour partir si c\'est loin.' },
  { cat: 'accouche', mot: 'Perte des eaux', def: 'Rupture de la poche des eaux. Peut être un flot soudain ou un écoulement progressif. Le liquide est normalement clair. Appeler la maternité immédiatement.' },
  { cat: 'accouche', mot: 'Bouchon muqueux', def: 'Amas de mucus qui ferme le col de l\'utérus pendant la grossesse. Sa perte (souvent gélatineuse et rosée) peut survenir quelques jours à quelques semaines avant l\'accouchement.' },
  { cat: 'accouche', mot: 'Dilatation du col', def: 'Ouverture progressive du col de l\'utérus pendant le travail. Mesurée en centimètres, de 0 à 10 cm. À 10 cm, l\'accouchement peut commencer.' },
  { cat: 'accouche', mot: 'Effacement du col', def: 'Raccourcissement et amincissement du col de l\'utérus avant et pendant le travail. Il doit être complètement effacé avant que la dilatation puisse progresser rapidement.' },
  { cat: 'accouche', mot: 'Péridurale', def: 'Anesthésie locorégionale injectée dans l\'espace péridural du dos. Supprime ou réduit la douleur des contractions. Peut être posée à partir de 3-4 cm de dilatation.' },
  { cat: 'accouche', mot: 'Rachianesthésie', def: 'Anesthésie plus rapide que la péridurale, injectée directement dans le liquide céphalorachidien. Utilisée principalement pour les césariennes programmées.' },
  { cat: 'accouche', mot: 'Épisiotomie', def: 'Incision chirurgicale du périnée réalisée si nécessaire pour faciliter la sortie de bébé ou éviter une déchirure grave. Suturée après l\'accouchement sous anesthésie locale.' },
  { cat: 'accouche', mot: 'Déchirure périnéale', def: 'Déchirure naturelle du périnée pendant la sortie de bébé. De grade 1 (superficielle) à grade 4 (profonde). Les grades 1 et 2 sont fréquents et guérissent bien.' },
  { cat: 'accouche', mot: 'Césarienne', def: 'Accouchement chirurgical par incision de l\'abdomen et de l\'utérus. Peut être programmée ou décidée en urgence. Récupération plus longue qu\'un accouchement voie basse.' },
  { cat: 'accouche', mot: 'Forceps / Ventouse', def: 'Instruments utilisés pour aider à extraire bébé si le travail n\'avance plus ou si bébé montre des signes de souffrance. Utilisés sous anesthésie, laissent parfois des marques temporaires.' },
  { cat: 'accouche', mot: 'Délivrance', def: 'Expulsion du placenta après la naissance de bébé. Survient généralement dans les 30 minutes. Peut être assistée par une injection d\'ocytocine pour réduire les saignements.' },
  { cat: 'accouche', mot: 'Peau à peau', def: 'Contact direct entre la peau de bébé et la peau d\'un parent juste après la naissance. Régule la température de bébé, stabilise son rythme cardiaque et renforce l\'attachement.' },
  { cat: 'accouche', mot: 'Score d\'Apgar', def: 'Évaluation de l\'état de bébé à 1 et 5 minutes après la naissance. Note de 0 à 10 sur 5 critères : couleur, rythme cardiaque, réflexes, tonus, respiration. 7 ou plus = excellent.' },

  // PRÉPARATION & ADMIN
  { cat: 'admin', mot: 'PAN — Préparation à la Naissance', def: '7 séances remboursées par la Sécurité sociale avec une sage-femme. Respiration, gestion de la douleur, allaitement, retour à la maison. Les cours pour pères existent : demande-les.' },
  { cat: 'admin', mot: 'Haptonomie', def: 'Pratique de contact tactile entre le père et bébé à travers le ventre maternel. Elle permet au père de créer un lien avec bébé avant la naissance. À explorer dès 20 SA.' },
  { cat: 'admin', mot: 'Plan de naissance', def: 'Document écrit (1 page max) qui exprime vos souhaits pour l\'accouchement : péridurale ou pas, musique, peau à peau, qui coupe le cordon. Remis à la maternité.' },
  { cat: 'admin', mot: 'Congé maternité', def: 'Congé légal autour de l\'accouchement. Durée variable selon le nombre d\'enfants. En France : 6 semaines avant et 10 semaines après la naissance pour un premier enfant.' },
  { cat: 'admin', mot: 'Congé paternité', def: '28 jours calendaires (35 pour naissances multiples), rémunérés à 100% plafonné. 4 premiers jours obligatoires. À poser dans les 6 mois suivant la naissance.' },
  { cat: 'admin', mot: 'Maternité niveau 1 / 2 / 3', def: 'Classification des maternités. Niveau 1 : grossesses simples. Niveau 2 : complications modérées, unité de soins intensifs néo. Niveau 3 : grossesses à hauts risques, réanimation néonatale.' },
  { cat: 'admin', mot: 'CPAM / Ameli', def: 'Caisse Primaire d\'Assurance Maladie. La grossesse doit être déclarée avant 14 SA sur ameli.fr pour bénéficier de la prise en charge à 100% à partir du 6e mois.' },
  { cat: 'admin', mot: 'Carnet de maternité', def: 'Carnet médical remis lors de la première consultation. Il contient tous les résultats d\'examens et le suivi de la grossesse. À apporter à chaque rendez-vous.' },
  { cat: 'admin', mot: 'Sage-femme libérale', def: 'Sage-femme en exercice privé qui peut assurer le suivi de grossesse, les cours de préparation à la naissance et le suivi post-natal à domicile. Remboursée par la Sécurité sociale.' },
  { cat: 'admin', mot: 'Pédiatre', def: 'Médecin spécialiste des enfants. Idéalement choisi avant la naissance. L\'examen J8 (8 jours après la naissance) est obligatoire et doit être réalisé par un médecin.' },

  // POST-PARTUM
  { cat: 'postpart', mot: 'Baby blues', def: 'Période de tristesse et d\'émotions intenses entre J3 et J5 après l\'accouchement. Touche 50 à 80% des femmes. Lié à la chute hormonale. Dure quelques jours, pas plus de 2 semaines.' },
  { cat: 'postpart', mot: 'Dépression post-partum', def: 'Épisode dépressif qui survient dans les semaines ou mois après l\'accouchement. Différent du baby blues : dure plus de 2 semaines. Nécessite une aide professionnelle.' },
  { cat: 'postpart', mot: 'Montée de lait', def: 'Arrivée du lait maternel entre J2 et J4 après la naissance. Les seins deviennent chauds et lourds. Avant, bébé reçoit du colostrum, tout aussi nourrissant.' },
  { cat: 'postpart', mot: 'Colostrum', def: 'Premier lait produit par les seins, épais et jaunâtre. Très riche en anticorps et nutriments. Les quantités semblent faibles mais sont parfaitement adaptées aux besoins de bébé les premiers jours.' },
  { cat: 'postpart', mot: 'Allaitement', def: 'Alimentation de bébé au sein. L\'OMS recommande un allaitement exclusif jusqu\'à 6 mois. Pas obligatoire. Les difficultés sont fréquentes : une consultante IBCLC peut tout changer.' },
  { cat: 'postpart', mot: 'Consultante en lactation (IBCLC)', def: 'Professionnelle certifiée spécialisée dans l\'allaitement. Elle peut résoudre la plupart des difficultés (douleur, prise du sein, production). Remboursée selon les mutuelles.' },
  { cat: 'postpart', mot: 'Méconium', def: 'Premières selles de bébé, noires et goudronneuses. Totalement normal. Apparaît dans les 48 premières heures. Après J3-J4, les selles deviennent jaunes (allaitement) ou beige (biberon).' },
  { cat: 'postpart', mot: 'Coliques du nourrisson', def: 'Pleurs intenses plus de 3h/jour, plus de 3j/semaine, pendant plus de 3 semaines. Touchent environ 20% des bébés. Cause inconnue. Disparaissent spontanément vers 3 mois.' },
  { cat: 'postpart', mot: 'Reflux (RGO)', def: 'Remontée du contenu gastrique après les tétées. Fréquent chez les nourrissons. Position verticale 30 minutes après les repas peut aider. Consulter si bébé perd du poids.' },
  { cat: 'postpart', mot: 'Mort Inattendue du Nourrisson (MIN)', def: 'Décès inexpliqué d\'un nourrisson de moins d\'1 an. La prévention passe par la position sur le dos, une chambre à 18-20°C, rien dans le lit (ni oreiller, ni couette, ni doudou).' },
  { cat: 'postpart', mot: 'Examen J8', def: 'Examen médical obligatoire réalisé entre J6 et J10 après la naissance. Il vérifie que bébé récupère bien son poids de naissance et que tout va bien cliniquement.' },
  { cat: 'postpart', mot: 'Rééducation périnéale', def: 'Séances de kinésithérapie pour renforcer le périnée après l\'accouchement. 10 séances remboursées. Elle en a besoin, même si la grossesse s\'est bien passée.' },
  { cat: 'postpart', mot: '4e trimestre', def: 'Les 3 premiers mois après la naissance. Période d\'adaptation intense pour bébé (habitué à l\'utérus) et pour les parents. La période la plus difficile, et la plus courte.' },
  { cat: 'postpart', mot: 'Diversification alimentaire', def: 'Introduction d\'aliments solides en plus du lait, à partir de 6 mois. Peut se faire en purées ou en DME (Diversification Menée par l\'Enfant) avec des morceaux adaptés.' },

  // ALERTES
  { cat: 'alerte', mot: 'Fausse couche', def: 'Arrêt spontané de la grossesse avant 22 SA. Très fréquente : 1 grossesse sur 4 en début de grossesse. La cause est souvent chromosomique. Nécessite un soutien émotionnel important.' },
  { cat: 'alerte', mot: 'Grossesse extra-utérine (GEU)', def: 'L\'œuf fécondé s\'implante en dehors de l\'utérus, le plus souvent dans une trompe. Urgence médicale. Signes : douleur intense d\'un côté, saignements. Appeler le 15.' },
  { cat: 'alerte', mot: 'Pré-éclampsie', def: 'Hypertension artérielle et présence de protéines dans les urines pendant la grossesse. Peut mettre en danger la mère et bébé. Nécessite une surveillance hospitalière.' },
  { cat: 'alerte', mot: 'Placenta praevia', def: 'Placenta positionné trop bas dans l\'utérus, pouvant obstruer le col. Peut provoquer des saignements. Souvent détecté à l\'écho T3. Une césarienne est généralement nécessaire.' },
  { cat: 'alerte', mot: 'Souffrance fœtale', def: 'Manque d\'oxygène pour bébé pendant la grossesse ou le travail. Détectée au monitoring par des anomalies du rythme cardiaque. Peut nécessiter une extraction rapide.' },
  { cat: 'alerte', mot: 'Rupture prématurée des membranes', def: 'Perte des eaux avant 37 SA. Urgence médicale : risque d\'infection et d\'accouchement prématuré. Aller aux urgences immédiatement si cela se produit.' },
  { cat: 'alerte', mot: 'Accouchement prématuré', def: 'Naissance avant 37 SA. Avant 34 SA, une hospitalisation est nécessaire. Des corticoïdes peuvent être injectés pour accélérer la maturation des poumons de bébé.' },
  { cat: 'alerte', mot: 'Dépassement de terme', def: 'Grossesse qui dépasse 41 SA. Une surveillance renforcée est mise en place. Un déclenchement artificiel du travail peut être proposé à 41 SA + quelques jours.' },
];

export default function DicoPapa({ C: propC }: any) {
  const [search, setSearch]   = useState('');
  const [catActive, setCat]   = useState<string | null>(null);
  const [ouvert, setOuvert]   = useState<string | null>(null);

  const filtered = useMemo(() => {
    return TERMES.filter(t => {
      const matchCat    = !catActive || t.cat === catActive;
      const matchSearch = !search || t.mot.toLowerCase().includes(search.toLowerCase()) || t.def.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, catActive]);

  const colors = Object.fromEntries(CATEGORIES.map(c => [c.id, { bg: c.bg, tc: c.tc }]));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* En-tête */}
      <div style={{ background: '#1A3D5C', borderRadius: '18px', padding: '18px 20px' }}>
        <p style={{ color: 'rgba(200,220,240,0.5)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 4px' }}>Grossesse</p>
        <p style={{ color: '#fff', fontSize: '20px', fontWeight: 800, margin: '0 0 2px' }}>Dictionnaire</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>{TERMES.length} termes expliqués en langage simple</p>
      </div>

      {/* Recherche */}
      <div style={{ position: 'relative' as const }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa0a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute' as const, left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Rechercher un terme..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCat(null); }}
          style={{ width: '100%', background: '#f7f5f0', border: '1.5px solid #f0ede8', borderRadius: '32px', padding: '11px 14px 11px 40px', fontSize: '14px', color: '#1e2535', outline: 'none', boxSizing: 'border-box' as const }}
        />
      </div>

      {/* Filtres catégories */}
      {!search && (
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' as const, paddingBottom: '2px' }}>
          <button
            onClick={() => setCat(null)}
            style={{ flexShrink: 0, padding: '6px 14px', fontSize: '12px', fontWeight: 700, border: 'none', borderRadius: '20px', cursor: 'pointer', background: !catActive ? '#1e2535' : '#f7f5f0', color: !catActive ? '#fff' : '#6a7585' }}
          >
            Tous
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(catActive === c.id ? null : c.id)}
              style={{ flexShrink: 0, padding: '6px 14px', fontSize: '12px', fontWeight: 700, border: 'none', borderRadius: '20px', cursor: 'pointer', background: catActive === c.id ? '#1e2535' : c.bg, color: catActive === c.id ? '#fff' : c.tc }}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Nombre de résultats si recherche */}
      {search && (
        <p style={{ color: '#9aa0a8', fontSize: '13px', margin: 0 }}>
          {filtered.length} résultat{filtered.length !== 1 ? 's' : ''} pour "{search}"
        </p>
      )}

      {/* Liste des termes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {filtered.length === 0 ? (
          <div style={{ background: '#f7f5f0', borderRadius: '16px', padding: '24px', textAlign: 'center' as const }}>
            <p style={{ color: '#9aa0a8', fontSize: '14px', margin: 0 }}>Aucun terme trouvé pour "{search}"</p>
          </div>
        ) : filtered.map(t => {
          const col = colors[t.cat];
          const isOpen = ouvert === t.mot;
          return (
            <div
              key={t.mot}
              style={{ borderRadius: '14px', border: isOpen ? `1.5px solid ${col.tc}30` : '1.5px solid #f0ede8', overflow: 'hidden', background: '#fff' }}
            >
              <button
                onClick={() => setOuvert(isOpen ? null : t.mot)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '13px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' as const }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: col.tc, flexShrink: 0, opacity: 0.7 }} />
                <span style={{ color: isOpen ? col.tc : '#1e2535', fontSize: '14px', fontWeight: 700, flex: 1, lineHeight: 1.3 }}>{t.mot}</span>
                <span style={{ color: '#ccc', fontSize: '16px', flexShrink: 0 }}>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 16px 16px 33px' }}>
                  <p style={{ color: '#3a4a5a', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>{t.def}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
