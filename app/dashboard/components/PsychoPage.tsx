'use client';

const THEME_COLORS: Record<string,{bg:string;tc:string;accent:string}> = {
  peur:   { bg:'#FFF0E6', tc:'#C04A1A', accent:'#E8803A' },
  couple: { bg:'#E4F5EC', tc:'#0D6B40', accent:'#1A9458' },
  lien:   { bg:'#E6F0FA', tc:'#1A4A7A', accent:'#2E6FAA' },
  role:   { bg:'#F0EEFF', tc:'#5050B0', accent:'#6060C8' },
};

type Semaine = {
  sa: number;
  theme: 'peur' | 'couple' | 'lien' | 'role';
  emoji: string;
  titre: string;
  intro: string;
  corps: string;
  conseil: string;
  source: string;
};

const SEMAINES: Semaine[] = [
  {
    sa: 3, theme: 'peur', emoji: '😮',
    titre: `L'annonce. Et le choc qui va avec.`,
    intro: `Tu viens d'apprendre que tu vas être père. Et la première réaction n'est peut-être pas celle que tu attendais.`,
    corps: `C'est normal. Des études menées sur plusieurs milliers de futurs pères montrent que plus de 80% d'entre eux ressentent un mélange de joie et de peur à l'annonce de la grossesse. Ce n'est pas un manque d'amour. C'est ton cerveau qui réalise que ta vie va changer profondément.\n\nCette ambivalence est une réaction saine. Les pères qui nient toute peur au départ sont souvent ceux qui la ressentent plus fort plus tard, quand l'accouchement approche. Accueillir cette émotion maintenant, c'est mieux la traverser.`,
    conseil: `Dis-lui ce que tu ressens. Pas pour qu'elle te rassure, mais parce que partager ce moment crée une intimité que vous n'aurez plus jamais de la même façon.`,
    source: `Genesoni & Tallandini, 2009  -  Human Reproduction Update`
  },
  {
    sa: 4, theme: 'couple', emoji: '🤫',
    titre: `Le secret à deux. Profitez-en.`,
    intro: `Avant d'annoncer la grossesse à tout le monde, il y a cette période unique où vous êtes les seuls à savoir.`,
    corps: `Cette période de secret, souvent quelques semaines, est l'une des plus intimes d'une relation. Les couples qui la vivent consciemment en gardent un souvenir fort. Ce n'est pas juste une question de prudence médicale avant 12 SA. C'est un espace de complicité rare.\n\nLes recherches sur la transition vers la parentalité montrent que les couples qui prennent le temps de "digérer" la nouvelle ensemble avant de la partager avec l'entourage vivent mieux les premières semaines de grossesse. Ils sont plus alignés, moins influencés par les opinions extérieures.`,
    conseil: `Créez un rituel à deux pour marquer ce moment. Un dîner, une sortie, une photo. Quelque chose qui appartient rien qu'à vous.`,
    source: `Plantin, Olukoya & Ny, 2011  -  Journal of Men's Health`
  },
  {
    sa: 5, theme: 'peur', emoji: '🤢',
    titre: `La couvade : quand ton corps réagit aussi.`,
    intro: `Tu as peut-être des nausées, des maux de dos ou une fatigue inexpliquée. Tu n'es pas malade. Tu fais de la couvade.`,
    corps: `Le syndrome de couvade est documenté depuis des décennies. Entre 25% et 65% des futurs pères ressentent des symptômes physiques pendant la grossesse de leur partenaire : nausées, prise de poids, douleurs abdominales, fatigue. Ce n'est pas psychosomatique au sens péjoratif du terme. C'est neurologique.\n\nLes recherches suggèrent que ces symptômes sont liés aux fluctuations hormonales des pères pendant la grossesse. Le taux de prolactine (hormone impliquée dans le lien parent-enfant) augmente chez les futurs pères. Ton corps se prépare à son rôle, à sa façon.`,
    conseil: `Ne te moque pas de tes propres symptômes. Ils signalent que ton système nerveux est engagé dans ce qui se passe. C'est un signe d'implication, pas de fragilité.`,
    source: `Brennan, Marshall-Lucette, Ayers & Ahmed, 2007  -  Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 6, theme: 'role', emoji: '🍳',
    titre: `Prendre le relais en cuisine. Sans attendre.`,
    intro: `Les nausées de ta partenaire peuvent rendre la cuisine impossible. C'est le moment où ton rôle pratique devient essentiel.`,
    corps: `Les nausées gravidiques touchent 70 à 85% des femmes enceintes et sont souvent les plus intenses entre 6 et 10 SA. Elles sont causées par la montée brutale de l'hormone hCG. Elles ne sont pas dans la tête, elles ne sont pas exagérées, et elles peuvent être épuisantes.\n\nLes recherches sur le soutien paternel en grossesse montrent que les gestes pratiques et anticipés, ceux que le père fait sans attendre qu'on lui demande, ont un impact direct sur le stress maternel. Ce n'est pas juste de l'aide. C'est un signal fort : "Je suis là, je vois ce que tu traverses."`,
    conseil: `Fais les courses. Prépare des repas froids ou tièdes (les odeurs chaudes sont souvent les pires). Évite de cuisiner du poisson ou des œufs dans la cuisine. Ces petites adaptations font une différence réelle.`,
    source: `Santé Publique France, 2021  -  Grossesse et rôle du conjoint`
  },
  {
    sa: 7, theme: 'couple', emoji: '👂',
    titre: `Écouter sans résoudre. Ça s'apprend.`,
    intro: `Elle parle de ses peurs, de son inconfort, de ses angoisses. Et toi, tu cherches instinctivement à trouver une solution.`,
    corps: `C'est un réflexe masculin bien documenté. Les hommes tendent à répondre aux problèmes par des solutions. Mais pendant la grossesse, ce que ta partenaire cherche souvent, c'est d'être entendue, pas corrigée.\n\nLes travaux de John Gottman sur les couples montrent que la capacité à "répondre à l'émotionnel par l'émotionnel" est l'un des prédicteurs les plus forts de la satisfaction conjugale après la naissance d'un enfant. Les couples où le père apprend à valider les émotions plutôt qu'à les résoudre traversent mieux la transition vers la parentalité.`,
    conseil: `La prochaine fois qu'elle partage quelque chose de difficile, dis : "Je t'entends. C'est vraiment dur." Résiste à l'envie d'ajouter un "mais" ou un "tu pourrais...". Fais ça une fois. Regarde ce qui se passe.`,
    source: `Gottman & Gottman, 2007  -  And Baby Makes Three`
  },
  {
    sa: 8, theme: 'peur', emoji: '🪞',
    titre: `La peur de ne pas être à la hauteur. Elle est universelle.`,
    intro: `"Est-ce que je vais être un bon père ?" Cette question tourne en boucle pour presque tous les futurs papas.`,
    corps: `Une étude menée auprès de 622 futurs pères montre que la peur de ne pas être à la hauteur est la préoccupation la plus fréquente au 1er trimestre. Elle est suivie de près par la peur de ne pas savoir quoi faire pratiquement et la peur de l'impact financier.\n\nLa bonne nouvelle : les pères qui expriment cette peur tôt dans la grossesse sont ceux qui s'impliquent le plus après la naissance. La peur de mal faire est un moteur de préparation. Elle ne prédit pas l'échec. Elle prédit l'effort.`,
    conseil: `Note trois choses que tu veux faire différemment de ton propre père, et trois choses que tu veux transmettre. Cet exercice, recommandé par les psychologues périnataux, ancre le projet paternel de façon concrète.`,
    source: `Deave & Johnson, 2008  -  Midwifery`
  },
  {
    sa: 9, theme: 'lien', emoji: '🎙️',
    titre: `Ta voix grave est celle que bébé entend le mieux.`,
    intro: `À 9 SA, l'oreille interne de bébé commence à se former. Et les fréquences graves traversent mieux le liquide amniotique.`,
    corps: `Le système auditif fœtal est fonctionnel à partir de 18-20 SA, mais les structures qui le rendront possible commencent à se former dès 9 SA. Les recherches en perception auditive fœtale montrent que les sons graves, comme les voix masculines, traversent plus facilement les parois abdominales et le liquide amniotique que les voix aiguës.\n\nDes études ont montré que les nouveau-nés préfèrent les voix entendues régulièrement in utero à des voix inconnues. Si tu parles à bébé maintenant, plusieurs fois par semaine, il te reconnaîtra dès les premières heures de sa vie.`,
    conseil: `Ce soir, pose ta main sur son ventre et dis quelques mots à bébé. Ton prénom. Ce que tu ressens. Ce que tu lui souhaites. Tu te sentiras peut-être ridicule. C'est normal. Continue quand même.`,
    source: `Granier-Deferre, Bassereau, Ribeiro, Jacquet & DeCasper, 2011  -  PLoS ONE`
  },
  {
    sa: 10, theme: 'role', emoji: '🔬',
    titre: `L'échographie T1. Le moment où ça devient réel.`,
    intro: `Voir le cœur battre pour la première fois est souvent le moment où la paternité bascule du concept à la réalité.`,
    corps: `Des chercheurs ont interviewé des centaines de futurs pères sur leur expérience de la première échographie. La majorité décrit ce moment comme un "tournant émotionnel" : avant, la grossesse était abstraite. Après, elle est réelle. Le cœur qui bat, la silhouette, les mouvements.\n\nPour beaucoup de pères, c'est aussi le moment où l'anxiété diminue. Voir que tout va bien visuellement apporte une réassurance que les mots du médecin ne donnent pas de la même façon. Ta présence à ce rendez-vous n'est pas optionnelle.`,
    conseil: `Prépare deux ou trois questions pour l'échographiste avant le rendez-vous. Arrive 10 minutes en avance. Éteins ton téléphone. Et si tu sens quelque chose d'inattendu pendant l'examen, ne le cache pas.`,
    source: `Draper, 2002  -  Sociology of Health & Illness`
  },
  {
    sa: 11, theme: 'couple', emoji: '💛',
    titre: `Son corps change. Ton regard compte.`,
    intro: `Elle commence à voir son corps se transformer. Et elle se demande parfois si tu la trouves toujours attirante.`,
    corps: `Les recherches sur l'image corporelle pendant la grossesse montrent que les femmes enceintes sont particulièrement sensibles au regard de leur partenaire sur leur corps changeant. Même les femmes qui se disent "à l'aise" avec leur grossesse peuvent traverser des moments de doute.\n\nUn regard bienveillant, un compliment sincère, un geste de tendresse régulier : ces signaux ont un impact documenté sur le bien-être émotionnel des femmes enceintes. Ton rôle de miroir positif est concret et puissant.`,
    conseil: `Ne fais pas de commentaires sur son corps, même positifs du type "tu es belle pour une femme enceinte". Dis simplement "tu es belle". Point. La nuance est importante.`,
    source: `Darvill, Skirton & Farrand, 2010  -  Midwifery`
  },
  {
    sa: 12, theme: 'peur', emoji: '🛡️',
    titre: `Le cap des 12 SA. Souffler un peu.`,
    intro: `Après 12 semaines, le risque de fausse couche chute à moins de 2%. C'est un cap médical et psychologique majeur.`,
    corps: `Beaucoup de futurs pères portent silencieusement l'angoisse d'une fausse couche pendant tout le premier trimestre. Ils ne l'expriment pas pour "ne pas inquiéter" leur partenaire. Mais cette angoisse retenue a un coût. Les études sur la santé mentale paternelle pendant la grossesse montrent que les pères qui n'ont pas d'espace pour exprimer leurs peurs présentent plus de symptômes anxieux en post-partum.\n\nPassé 12 SA, la solidité de la grossesse est statistiquement établie. Autoriser le soulagement est sain. Le nier par superstition ne protège personne.`,
    conseil: `Parlez de ce que vous avez traversé ensemble ce premier trimestre. Même si tout s'est bien passé, ces semaines ont probablement été chargées émotionnellement pour vous deux. Nommer ça ensemble, c'est en sortir ensemble.`,
    source: `Franche & Mikail, 2001  -  Health Psychology`
  },
  {
    sa: 13, theme: 'couple', emoji: '🌿',
    titre: `Le 2e trimestre. La fenêtre du couple.`,
    intro: `Les nausées s'estompent. L'énergie revient. C'est souvent la meilleure période de la grossesse pour le couple.`,
    corps: `Le 2e trimestre est documenté comme la période de la grossesse où le bien-être maternel est généralement le meilleur. Les nausées diminuent, la fatigue s'allège, le ventre n'est pas encore contraignant. Et la libido revient souvent.\n\nPour les couples, c'est une fenêtre précieuse. Les recherches de Paul Ramchandani à l'Université de Cambridge montrent que la qualité de la relation de couple pendant la grossesse prédit directement la qualité du co-parentage après la naissance. Ce que vous construisez maintenant a des effets réels plus tard.`,
    conseil: `Planifiez quelque chose ensemble cette semaine. Un dîner, un week-end, une activité que vous n'avez jamais faite. Pas parce que c'est "la dernière fois". Mais parce que vous méritez ces moments maintenant.`,
    source: `Paulson & Bazemore, 2010  -  JAMA`
  },
  {
    sa: 14, theme: 'lien', emoji: '🎵',
    titre: `La musique que bébé reconnaîtra à la naissance.`,
    intro: `Bébé commence à percevoir les sons. Ce que vous écoutez maintenant, il pourra le reconnaître après sa naissance.`,
    corps: `Une étude publiée dans la revue Infant Behavior and Development a montré que des nouveau-nés exposés régulièrement à une mélodie spécifique in utero (dans les dernières semaines de grossesse) présentaient des réponses comportementales différentes à cette mélodie après la naissance comparé à des mélodies inconnues.\n\nCe n'est pas une mémorisation consciente. C'est une familiarisation neurologique. Les sons entendus régulièrement créent des "traces" dans le système auditif en développement. Ces traces persistent après la naissance et jouent un rôle dans la régulation émotionnelle du nourrisson.`,
    conseil: `Choisissez une chanson ou une musique que vous aimez tous les deux. Passez-la régulièrement. Après la naissance, si bébé s'agite, essayez cette musique. Elle pourrait l'apaiser.`,
    source: `Hepper, 1991  -  Infant Behavior and Development`
  },
  {
    sa: 15, theme: 'role', emoji: '📖',
    titre: `Se former pendant la grossesse change tout après.`,
    intro: `Les pères qui se préparent activement pendant la grossesse se sentent beaucoup plus confiants et impliqués après la naissance.`,
    corps: `Une étude longitudinale menée sur 3 ans auprès de 622 couples a comparé les pères qui s'étaient "formés" pendant la grossesse (lectures, cours, discussions avec d'autres pères) à ceux qui avaient attendu la naissance. Résultat : les pères préparés montraient des niveaux d'anxiété post-natale significativement plus bas et une plus grande satisfaction dans leur rôle paternel dès les premières semaines.\n\nSe former ne signifie pas devenir expert. Ça signifie réduire l'inconnu. Et l'inconnu est la principale source d'anxiété paternelle.`,
    conseil: `Lis un article cette semaine sur le développement du nourrisson dans les 3 premiers mois. Pas pour mémoriser. Juste pour que la première semaine avec bébé ne soit pas totalement terra incognita.`,
    source: `Deave, Johnson & Ingram, 2008  -  BMC Pregnancy and Childbirth`
  },
  {
    sa: 16, theme: 'peur', emoji: '💸',
    titre: `L'angoisse financière. Elle touche presque tous les pères.`,
    intro: `"Est-ce qu'on aura assez d'argent ?" Cette question tourne dans la tête de la grande majorité des futurs pères.`,
    corps: `Dans les études sur les préoccupations paternelles pendant la grossesse, l'angoisse financière arrive régulièrement dans le top 3, juste après la peur de ne pas être à la hauteur et la peur pour la santé de la mère et du bébé. Elle touche tous les niveaux de revenus.\n\nCe qui est intéressant : l'angoisse financière diminue significativement quand les couples en parlent ensemble et font une estimation concrète de leurs dépenses à venir. La peur de l'inconnu financier est souvent plus grande que la réalité. Et même quand la réalité est difficile, l'avoir nommée ensemble permet d'agir plutôt que de ruminer.`,
    conseil: `Faites ensemble une liste des dépenses prévues dans les 6 prochains mois. Pas pour avoir la solution parfaite, juste pour sortir les chiffres de vos têtes et les mettre sur papier. L'action réduit l'anxiété.`,
    source: `Condon, Boyce & Corkindale, 2004  -  Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 17, theme: 'lien', emoji: '🤲',
    titre: `Le contact physique avec le ventre crée un lien réel.`,
    intro: `Poser ta main sur le ventre de ta partenaire n'est pas un geste symbolique. C'est une façon concrète de construire le lien avec bébé.`,
    corps: `Des recherches sur l'attachement paternel prénatal montrent que les pères qui ont un contact physique régulier avec le ventre (toucher, parler en s'adressant directement à bébé) développent un sentiment de lien plus fort avant la naissance, ce qui est corrélé avec un engagement paternel plus intense après la naissance.\n\nCe lien prénatal n'est pas automatique chez les pères comme il peut l'être chez les mères. Il se construit activement. Le contact physique est l'un des moyens les plus efficaces pour y parvenir.`,
    conseil: `Ce soir, installe-toi confortablement avec ta partenaire. Pose ta main sur son ventre. Reste là cinq minutes. Tu n'as pas besoin de parler. L'intention suffit à commencer.`,
    source: `Brandon, Pitts, Denton, Stringer & Evans, 2009  -  Journal of Midwifery & Women's Health`
  },
  {
    sa: 18, theme: 'couple', emoji: '🛁',
    titre: `Le toucher comme langage du couple.`,
    intro: `La grossesse transforme le corps et parfois la relation physique. Le massage est une façon de maintenir la connexion.`,
    corps: `Des études sur le massage pendant la grossesse (Tiffany Field, Université de Miami) montrent que les femmes qui reçoivent des massages réguliers de leur partenaire pendant la grossesse présentent des niveaux de cortisol (hormone du stress) plus bas, moins de symptômes dépressifs, et une qualité de sommeil meilleure. Les effets sont mesurables après seulement 5 semaines de massages réguliers.\n\nPour le couple, le massage crée un espace de connexion physique qui ne dépend pas de la libido ou du désir, qui peuvent être variables pendant la grossesse. C'est un geste de soin concret et puissant.`,
    conseil: `Pas besoin d'être masseur. Quelques minutes de pression douce sur les lombaires et les épaules, le soir. Demande-lui ce qui lui fait du bien. Adapte-toi. Faites-en un rituel.`,
    source: `Field et al., 1999  -  Journal of Psychosomatic Obstetrics & Gynecology`
  },
  {
    sa: 19, theme: 'peur', emoji: '🌊',
    titre: `Le deuil de la vie d'avant. Il est normal.`,
    intro: `Un sentiment de perte de liberté peut apparaître. C'est une émotion normale, et même nécessaire.`,
    corps: `La transition vers la paternité implique ce que les psychologues appellent une "recomposition identitaire". Tu ne perds pas ton identité, mais tu l'enrichis d'un nouveau rôle. Et comme toute transition importante, elle implique de laisser quelque chose derrière soi.\n\nJoanna Draper, chercheuse à l'Université de Keele, a documenté ce que vivent les futurs pères comme un "deuil anticipatoire" de certains aspects de leur vie d'avant. Ce n'est pas de l'égoïsme. C'est une réaction psychologique normale à un changement majeur. Le reconnaître, c'est mieux le traverser.`,
    conseil: `Identifie une ou deux choses de ta vie actuelle que tu veux préserver après la naissance. Pas en opposition à ton rôle de père, mais parce que rester toi-même te rendra un meilleur père. Parles-en avec ta partenaire.`,
    source: `Draper, 2003  -  Journal of Advanced Nursing`
  },
  {
    sa: 20, theme: 'role', emoji: '📋',
    titre: `L'échographie T2. Prépare tes questions.`,
    intro: `L'échographie morphologique du 2e trimestre est le rendez-vous médical le plus complet de la grossesse. Sois acteur, pas spectateur.`,
    corps: `L'échographie T2, réalisée entre 20 et 22 SA, examine plus de 100 critères anatomiques. Elle vérifie le cerveau, le cœur, les reins, la colonne vertébrale, les membres. Elle peut révéler des informations importantes, attendues ou non.\n\nDes études sur l'expérience paternelle lors des échographies montrent que les pères qui ont préparé des questions et qui participent activement à l'échange avec l'échographiste vivent l'expérience de façon plus positive et mémorisent mieux les informations. Ceux qui restent en retrait se sentent souvent exclus d'un moment important.`,
    conseil: `Note 3 questions avant le rendez-vous. Discutez ensemble si vous souhaitez connaître le sexe. Et si des résultats inattendus apparaissent, ta première réaction sera vue et ressentie par ta partenaire. Reste calme, posez les questions ensemble.`,
    source: `Ekelin, Crang-Svalenius & Dykes, 2004  -  Midwifery`
  },
  {
    sa: 21, theme: 'lien', emoji: '📣',
    titre: `Bébé mémorise ta voix. Déjà.`,
    intro: `Il ne s'agit plus de théorie. Bébé entend, et il enregistre.`,
    corps: `Une expérience classique de DeCasper et Fifer (1980) a montré que des nouveau-nés de quelques heures préféraient la voix de leur mère à celle d'autres femmes, preuve qu'ils avaient mémorisé cette voix in utero. Des études ultérieures ont étendu ce résultat aux voix paternelles entendues régulièrement.\n\nÀ 21 SA, l'audition fœtale est fonctionnelle. Les sons extérieurs sont perçus avec moins d'intensité qu'après la naissance, mais les fréquences basses (comme les voix masculines) passent particulièrement bien. Si tu parles régulièrement à bébé d'ici la naissance, il tournera la tête vers ta voix dans les premières heures de sa vie.`,
    conseil: `Fixe un moment chaque soir, même 5 minutes. Parle-lui de ta journée, dis-lui ton prénom, lis quelques lignes à voix haute. La régularité compte plus que le contenu.`,
    source: `DeCasper & Fifer, 1980  -  Science`
  },
  {
    sa: 22, theme: 'couple', emoji: '🗺️',
    titre: `Planifier ensemble réduit le stress à deux.`,
    intro: `Les conversations sur l'organisation pratique après la naissance ne sont pas romantiques. Mais elles sont protectrices.`,
    corps: `Une étude menée sur 218 couples suivis pendant et après la grossesse montre que ceux qui avaient eu des conversations explicites sur la répartition des tâches, le congé parental et l'organisation de la vie après la naissance vivaient une transition post-natale significativement moins conflictuelle. La satisfaction conjugale à 6 mois post-partum était meilleure chez ces couples.\n\nCes conversations sont difficiles car elles touchent à des sujets qui peuvent révéler des désaccords. Mais les désaccords non dit maintenant deviennent des conflits à 3h du matin avec un nourrisson qui pleure.`,
    conseil: `Planifiez une "réunion de projet bébé" cette semaine. 30 minutes. Congé paternité, organisation des nuits, qui appelle qui quand il y a un problème. C'est moins romantique qu'un dîner. C'est plus utile.`,
    source: `Fägerskiöld, 2008  -  Scandinavian Journal of Caring Sciences`
  },
  {
    sa: 23, theme: 'peur', emoji: '😴',
    titre: `L'insomnie paternelle. Elle existe vraiment.`,
    intro: `Tu n'arrives pas à dormir. Tu fais des scénarios catastrophes la nuit. Tu n'es pas seul.`,
    corps: `L'insomnie prénatale touche aussi les pères. Des études sur la santé mentale des futurs pères montrent que les troubles du sommeil, l'hypervigilance nocturne et les pensées intrusives (et si quelque chose se passait mal ?) sont des symptômes courants au 2e et 3e trimestre, surtout chez les pères très impliqués.\n\nCes insomnies sont une manifestation d'hypervigilance protectrice. Ton cerveau se prépare à surveiller un être vulnérable. C'est un instinct, pas un trouble. Mais il mérite d'être pris au sérieux plutôt qu'ignoré.`,
    conseil: `Si l'insomnie est régulière, parles-en avec ta partenaire ou ton médecin. Une activité physique en journée, limiter les écrans le soir, et établir une routine de coucher aident significativement. Tu auras besoin de tes ressources dans les prochains mois.`,
    source: `Condon, Boyce & Corkindale, 2004  -  Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 24, theme: 'role', emoji: '🏥',
    titre: `Connaître la maternité avant le jour J.`,
    intro: `Visiter la maternité avant l'accouchement réduit l'anxiété des deux parents de façon mesurable.`,
    corps: `Des études sur la préparation à l'accouchement montrent que les couples qui ont visité leur maternité et qui connaissent les lieux physiquement (accès, urgences obstétricales, parking, chemin vers la salle de naissance) vivent le jour de l'accouchement avec un niveau de stress significativement plus bas.\n\nPour les pères spécifiquement, ce repérage physique joue un rôle important. Quand le travail commence, ta mission est d'être calme et de gérer la logistique. Connaître les lieux te libère la tête pour être présent émotionnellement.`,
    conseil: `Appelle ta maternité pour organiser une visite guidée. Demande à voir la salle de naissance. Repère l'entrée des urgences obstétricales (souvent différente de l'entrée principale). Teste le trajet aux heures de pointe.`,
    source: `Santé Publique France, 2021  -  Guide de la naissance`
  },
  {
    sa: 25, theme: 'couple', emoji: '🌙',
    titre: `Les nuits difficiles. Être là sans rien dire.`,
    intro: `Elle peut se lever à 3h du matin, incapable de dormir. Ce que tu fais dans ces moments compte plus que tu ne le penses.`,
    corps: `L'insomnie de fin de grossesse touche la majorité des femmes enceintes. Elle est causée par la pression physique de l'utérus, les mouvements de bébé, l'anxiété anticipatoire et les changements hormonaux. Elle n'est pas un signe que quelque chose va mal.\n\nCe qui compte pour ta partenaire dans ces moments, ce n'est pas que tu aies une solution. C'est que tu ne dises pas "rendors-toi" et que tu te retournes de l'autre côté. Les études sur le soutien conjugal nocturne pendant la grossesse montrent que la présence passive, rester éveillé avec elle, a un effet de régulation émotionnelle réel.`,
    conseil: `La prochaine fois qu'elle se lève la nuit et ne dort pas, lève-toi avec elle. Pas pour résoudre. Juste pour être là. Un verre d'eau, un coussin, s'asseoir côte à côte. C'est suffisant.`,
    source: `Darvill, Skirton & Farrand, 2010  -  Midwifery`
  },
  {
    sa: 26, theme: 'lien', emoji: '📚',
    titre: `Lire à voix haute à bébé. Un rituel qui paie.`,
    intro: `Lire à voix haute le soir n'est pas une lubie. C'est une façon efficace d'exposer bébé à ta voix régulièrement.`,
    corps: `Les recherches sur le développement du langage montrent que les enfants dont les pères leur ont lu des histoires in utero et après la naissance présentent de meilleures compétences langagières à 2 ans. Ce n'est pas magique. C'est de la régularité.\n\nLe fait de lire à voix haute crée aussi un rituel. Les rituels du soir structurent la relation parent-enfant bien avant la naissance. Et après la naissance, avoir l'habitude de lire ensemble facilite la transition vers la lecture partagée, l'une des pratiques parentales les plus efficaces pour le développement cognitif.`,
    conseil: `Lis n'importe quoi. Un article, un livre, la météo. La voix et la régularité comptent, pas le contenu. 10 minutes le soir, 4 à 5 fois par semaine. Commence maintenant.`,
    source: `Logan, 2019  -  Early Childhood Education Journal`
  },
  {
    sa: 27, theme: 'peur', emoji: '⚡',
    titre: `La peur de l'accouchement. Elle concerne aussi les pères.`,
    intro: `Peur de paniquer, peur de voir ta partenaire souffrir, peur de ne pas savoir quoi faire. Ces peurs sont réelles et documentées.`,
    corps: `Une étude britannique sur les pères en salle de naissance (Longworth & Kingdon, 2011) montre que 40% des pères présidents lors de l'accouchement décrivent avoir ressenti une peur intense à un moment ou un autre. Les peurs les plus fréquentes : voir leur partenaire souffrir sans pouvoir l'aider, perdre le contrôle émotionnellement, et "rater" quelque chose d'important.\n\nCes peurs ne disparaissent pas d'elles-mêmes. Ce qui les réduit : savoir à l'avance ce qui va se passer, connaître son rôle précis, et avoir répété mentalement les étapes. L'inconnu est la principale source d'anxiété.`,
    conseil: `Lis le guide de l'accouchement de ta maternité cette semaine. Cherche des vidéos (prévenues) de témoignages de pères en salle de naissance. La connaissance est le meilleur anxiolytique que tu aies.`,
    source: `Longworth & Kingdon, 2011  -  Midwifery`
  },
  {
    sa: 28, theme: 'role', emoji: '🎒',
    titre: `La valise. Prends l'initiative.`,
    intro: `Préparer la valise de maternité sans attendre qu'elle te le demande est un signal fort. Et pratique.`,
    corps: `La valise de maternité est souvent listée comme "à faire" par les femmes enceintes dès le 3e trimestre. Dans les faits, une majorité de pères attend que leur partenaire prenne l'initiative. Pourtant, faire cette démarche spontanément a une valeur symbolique et pratique forte.\n\nSymbolique : cela signale que tu prends la préparation à la naissance aussi au sérieux qu'elle. Pratique : une naissance peut arriver plus tôt que prévu. Avoir la valise prête à 32-33 SA élimine une source de stress potentielle.`,
    conseil: `Consulte la liste de la section "À préparer" de l'app. Commence à rassembler ce qui est pour toi cette semaine. Montre-lui ce que tu as fait. C'est un geste concret qui vaut tous les discours.`,
    source: `Fägerskiöld, 2008  -  Scandinavian Journal of Caring Sciences`
  },
  {
    sa: 29, theme: 'couple', emoji: '🎓',
    titre: `Les cours de préparation. Viens vraiment.`,
    intro: `Les cours de préparation à la naissance ne sont pas réservés aux mères. Ta présence change l'expérience.`,
    corps: `Une étude suédoise portant sur 1 015 couples montre que les pères qui participent aux cours de préparation à la naissance présentent des niveaux d'anxiété pré-accouchement significativement plus bas et se sentent plus efficaces dans leur rôle pendant le travail. Ces effets sont plus marqués pour les pères que pour les mères, car les mères ont souvent d'autres sources d'information.\n\nDes cours spécifiques aux pères existent dans de nombreuses maternités. Ils abordent des sujets que les cours mixtes n'ont pas le temps de traiter : comment gérer son propre stress, comment soutenir sans être envahissant, que faire si l'on sent qu'on perd pied.`,
    conseil: `Appelle ta maternité et demande s'il existe des séances spécifiques aux pères. Si non, va aux cours mixtes et pose des questions. Poser des questions n'est pas une faiblesse. C'est ce que font les adultes responsables.`,
    source: `Svensson, Barclay & Cooke, 2009  -  Journal of Perinatal Education`
  },
  {
    sa: 30, theme: 'peur', emoji: '🧘',
    titre: `L'anxiété du 3e trimestre. Son pic, et comment le traverser.`,
    intro: `Le 3e trimestre est souvent le moment où l'anxiété des pères culmine. C'est documenté. Et ça se travaille.`,
    corps: `Des études longitudinales suivant les pères tout au long de la grossesse montrent un pic d'anxiété au 3e trimestre, souvent plus intense que celui du 1er trimestre. La raison : le moment devient réel. La date approche. Les préparations pratiques révèlent ce qui n'est pas encore fait.\n\nCe qui aide : l'action. Chaque étape de préparation concrète accomplie réduit measurablement le niveau d'anxiété. Ce n'est pas de la procrastination. C'est de la physiologie. Ton cerveau gère mieux ce qu'il peut contrôler.`,
    conseil: `Fais une liste de tout ce qui n'est pas encore préparé. Classe par urgence. Accomplis une chose par jour. L'anxiété sans action s'amplifie. L'anxiété avec action se transforme en compétence.`,
    source: `Condon, Boyce & Corkindale, 2004  -  Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 31, theme: 'lien', emoji: '💫',
    titre: `Te visualiser avec ton bébé. Ça change les choses.`,
    intro: `Se projeter mentalement dans le rôle de père avant la naissance renforce l'attachement après. Ce n'est pas de la naïveté.`,
    corps: `Des recherches sur les représentations mentales prénatales des pères (Brandon et al., 2009) montrent que les pères qui se visualisent activement avec leur bébé pendant la grossesse, qui imaginent des scènes concrètes (donner le bain, consoler, jouer), développent un attachement paternel plus fort après la naissance et s'adaptent plus vite au rôle parental.\n\nCette visualisation n'est pas une rêverie passive. C'est une préparation mentale. Les sportifs de haut niveau l'utilisent pour améliorer leurs performances. Ton cerveau ne distingue pas complètement l'imaginé du vécu.`,
    conseil: `Ferme les yeux 5 minutes ce soir. Visualise-toi tenir ton bébé pour la première fois. Comment tu te sens. Ce que tu lui dis. Comment il sent. Aussi détaillé que possible. Répète cet exercice plusieurs fois avant la naissance.`,
    source: `Brandon, Pitts, Denton, Stringer & Evans, 2009  -  Journal of Midwifery & Women's Health`
  },
  {
    sa: 32, theme: 'couple', emoji: '📄',
    titre: `Le plan de naissance. Rédigez-le ensemble.`,
    intro: `Le plan de naissance n'est pas un document anodin. Le processus de le rédiger ensemble est aussi important que le document lui-même.`,
    corps: `Le plan de naissance est un document court (1 page maximum) que vous remettez à l'équipe médicale. Il exprime vos souhaits : péridurale ou pas, musique en salle, peau à peau immédiat, qui coupe le cordon, présence d'autres personnes. L'équipe n'est pas obligée de le suivre intégralement, mais elle le respecte généralement.\n\nCe qui compte pour le couple : rédiger ce document ensemble oblige à avoir des conversations importantes. Quelles sont vos priorités ? Quelles sont vos peurs ? Qu'est-ce qui est négociable et qu'est-ce qui ne l'est pas ? Ces conversations renforcent la cohésion avant un moment intense.`,
    conseil: `Cherche en ligne "plan de naissance France modèle" et télécharge un modèle. Remplissez-le ensemble lors d'une soirée calme. Prenez votre temps. Les points de désaccord sont des conversations importantes à avoir maintenant.`,
    source: `Santé Publique France, 2021  -  Maternité et droits des patients`
  },
  {
    sa: 33, theme: 'role', emoji: '🛡️',
    titre: `Filtrer l'entourage. C'est ton rôle.`,
    intro: `En fin de grossesse, l'entourage peut devenir envahissant. Te positionner comme filtre protège ta partenaire.`,
    corps: `Les semaines précédant la naissance sont souvent marquées par une intensification des sollicitations de l'entourage : questions sur la date, visites non programmées, conseils non demandés. Pour une femme en fin de grossesse, gérer ces sollicitations représente une charge mentale et émotionnelle supplémentaire.\n\nLes recherches sur le soutien paternel montrent que les pères qui prennent en charge activement la gestion de l'entourage (répondre aux messages, coordonner les visites, communiquer sur ce dont vous avez besoin) allègent significativement le charge mentale maternelle dans les dernières semaines.`,
    conseil: `Propose-lui de prendre en charge les messages de la famille et des amis qui demandent des nouvelles. Préparez ensemble un message type pour informer tout le monde de la naissance dès qu'elle aura lieu, sans avoir à le rédiger dans l'urgence.`,
    source: `Darvill, Skirton & Farrand, 2010  -  Midwifery`
  },
  {
    sa: 34, theme: 'peur', emoji: '🎯',
    titre: `Ton rôle le jour J. Il est plus simple que tu ne le crois.`,
    intro: `Beaucoup de pères s'inquiètent de "ce qu'ils doivent faire" pendant l'accouchement. La réponse est plus simple que tu ne le penses.`,
    corps: `Une analyse des témoignages de pères présents lors de l'accouchement montre que les pères qui ont vécu l'expérience le mieux ne sont pas ceux qui avaient les connaissances médicales les plus poussées. Ce sont ceux qui avaient compris que leur rôle n'est pas médical.\n\nTon rôle ce jour-là : être présent physiquement, rester calme (ou du moins en donner l'impression), tenir sa main quand elle en a besoin, parler à l'équipe si elle ne peut pas, lui rappeler qu'elle est capable. Une étude de Klaus et Kennell a montré que la présence d'une personne de soutien non médicale réduit la durée du travail et le recours aux analgésiques.`,
    conseil: `Mémorise une phrase pour le jour J. "Tu es capable. Tu vas y arriver. Je suis là." Tu n'as pas besoin de savoir quoi faire. Tu as besoin de savoir quoi dire.`,
    source: `Klaus, Kennell & Klaus, 1993  -  Mothering the Mother`
  },
  {
    sa: 35, theme: 'lien', emoji: '✋',
    titre: `Bébé réagit à tes mains. Pour de vrai.`,
    intro: `À 35 SA, bébé perçoit clairement les pressions sur le ventre. Ce dialogue tactile est réel.`,
    corps: `Des recherches sur la réactivité fœtale montrent qu'à partir de 28-30 SA, les fœtus réagissent de façon mesurable aux stimulations tactiles externes. Ils peuvent répondre à une pression douce par un mouvement en retour. À 35 SA, ces réactions sont bien établies.\n\nCe dialogue tactile n'est pas métaphorique. Il implique le système nerveux de bébé et contribue à son développement sensoriel. Et pour toi, sentir une réponse physique de bébé sous ta main est souvent l'un des moments les plus forts de la grossesse pour les pères.`,
    conseil: `Pose ta main sur le ventre ce soir et exerce une pression très douce, régulière. Attends. Bébé peut répondre par un coup. Si c'est le cas, réponds à ton tour par une pression légère. Restez là quelques minutes.`,
    source: `Kisilevsky et al., 2003  -  Psychological Science`
  },
  {
    sa: 36, theme: 'couple', emoji: '📸',
    titre: `Marquer la fin de la grossesse. Consciemment.`,
    intro: `Ces dernières semaines à deux méritent d'être vécues, pas seulement traversées en attendant que ça arrive.`,
    corps: `Les couples qui marquent consciemment la fin de la grossesse, par un acte délibéré (photo, sortie, dîner, lettre), rapportent des souvenirs plus positifs de cette période et une meilleure transition vers la parentalité. Ce n'est pas de la sentimentalité. C'est de la psychologie positive appliquée.\n\nDans quelques semaines, votre vie sera profondément transformée. Ce ne sera pas moins bien. Ce sera différent. Prendre un moment pour honorer ce que vous avez vécu ensemble ces 9 mois est une façon saine de clore ce chapitre avant d'en ouvrir un autre.`,
    conseil: `Organisez quelque chose cette semaine. Juste pour vous deux. Pas pour "profiter avant que tout change". Mais pour dire : on a vécu quelque chose ensemble, et c'est précieux. Une photo, un dîner, une lettre que vous ouvrirez dans un an.`,
    source: `Plantin, Olukoya & Ny, 2011  -  Journal of Men's Health`
  },
  {
    sa: 37, theme: 'peur', emoji: '📱',
    titre: `L'hypervigilance de fin de grossesse. Ton corps est en mode alerte.`,
    intro: `Téléphone chargé en permanence, oreille aux aguets la nuit, vérifications répétées. C'est ton instinct de protection qui s'active.`,
    corps: `Ce comportement d'hypervigilance a été documenté chez les futurs pères dans les 3 à 4 dernières semaines de grossesse. Il s'agit d'une montée en puissance de l'instinct de protection, corrélée à des changements hormonaux chez les futurs pères (augmentation de la prolactine et de l'ocytocine, diminution de la testostérone).\n\nCe n'est pas de l'anxiété pathologique. C'est ton cerveau qui se prépare à surveiller un être vulnérable. La même biologie qui fera que tu te leveras à 3h du matin sans te plaindre quand bébé pleurera.`,
    conseil: `Programme une alarme quotidienne pour vérifier que ton téléphone est chargé et que le numéro de la maternité est accessible. Ce type de préparation rituelle aide à transformer l'hypervigilance diffuse en préparation concrète.`,
    source: `Condon, Boyce & Corkindale, 2004  -  Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 38, theme: 'role', emoji: '🌅',
    titre: `Tu es prêt. Même si tu ne le sens pas.`,
    intro: `Aucun père ne se sent vraiment prêt la veille de la naissance. C'est universel. Et ce n'est pas un problème.`,
    corps: `Des études longitudinales sur la transition vers la paternité montrent que le sentiment de "ne pas être prêt" juste avant la naissance n'est pas corrélé avec la qualité du parentage après. Les pères qui se sentent prêts ne s'en sortent pas mieux que ceux qui doutent.\n\nCe qui compte : l'implication pendant la grossesse. Le fait d'avoir été présent, d'avoir appris, d'avoir soutenu. Tout ça a déjà changé quelque chose en toi. La paternité ne commence pas à la naissance. Elle a commencé le jour où tu as appris la nouvelle et choisi d'être là.`,
    conseil: `Ce soir, dis-lui que tu es fier d'elle. Pas pour qu'elle te rassure en retour. Parce que c'est vrai. Ces 9 mois ont été exigeants pour vous deux. Et vous y êtes.`,
    source: `Deave & Johnson, 2008  -  Midwifery`
  },
  {
    sa: 39, theme: 'couple', emoji: '🕯️',
    titre: `Les derniers jours. Vivez-les, ne les attendez pas.`,
    intro: `L'attente des derniers jours peut être épuisante. Choisissez de la vivre plutôt que de la subir.`,
    corps: `L'attente de la naissance dans les derniers jours est décrite par beaucoup de couples comme une des périodes les plus difficiles psychologiquement. Chaque contraction analysée, chaque nuit sans réveil scrutée. Cette vigilance constante est épuisante.\n\nLes couples qui traversent mieux cette période sont ceux qui ont décidé consciemment de "vivre normalement" plutôt que d'attendre. Sortir, voir des amis, regarder un film, faire une balade. L'action réduit l'hypervigilance. Et dans quelques jours, vous serez trois. Ce moment à deux mérite d'être habité.`,
    conseil: `Proposez une sortie aujourd'hui. Rien de compliqué. Une heure dehors. La naissance arrivera quand elle arrivera. D'ici là, vous êtes encore deux, et c'est précieux.`,
    source: `Plantin, Olukoya & Ny, 2011  -  Journal of Men's Health`
  },
  {
    sa: 40, theme: 'role', emoji: '💪',
    titre: `Ta présence, c'est tout ce dont elle a besoin.`,
    intro: `Le jour de l'accouchement, tu n'as pas à tout gérer. Tu as à être là.`,
    corps: `Les recherches de Marshall Klaus et John Kennell sur le soutien pendant l'accouchement sont parmi les plus citées en périnatalité. Ils ont montré que la présence d'une personne de soutien non médicale, qu'ils appellent "doula" mais qui peut être le père, réduit la durée du travail de 25%, le recours à la péridurale de 60%, et le risque de dépression post-partum de façon significative.\n\nTon rôle n'est pas médical. Il n'est pas logistique non plus. Il est de rester calme, d'être physiquement présent, de regarder ta partenaire dans les yeux quand c'est difficile. Ce regard, cette présence, ont des effets physiologiques mesurables sur sa douleur et son stress.`,
    conseil: `Répète mentalement cette phrase jusqu'à la naissance : "Mon rôle est d'être là. Pas de tout gérer. Pas de tout savoir. Juste d'être là." C'est suffisant. C'est même beaucoup.`,
    source: `Klaus, Kennell & Klaus, 1993  -  Mothering the Mother`
  },
];

export default function PsychoPage({ C: propC, saReelle }: any) {
  const Cs = {
    dark:'#1e2535', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#c8a060',
    white:'#ffffff', border:'#f0ede8', muted:'#9aa0a8', cream:'#f7f5f0',
  };

  // Trouver la semaine courante ou la plus proche
  const saActuelle = saReelle || 20;
  const semaine = SEMAINES.find(s => s.sa === saActuelle)
    || SEMAINES.reduce((prev, curr) =>
      Math.abs(curr.sa - saActuelle) < Math.abs(prev.sa - saActuelle) ? curr : prev
    );

  const tc = THEME_COLORS[semaine.theme];
  const themeLabel: Record<string,string> = {
    peur:   '💭 Émotions & peurs',
    couple: '❤️ Vie de couple',
    lien:   '👶 Lien avec bébé',
    role:   '🙌 Rôle actif',
  };

  const paragraphes = semaine.corps.split('\n\n');

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'24px',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      {/* EN-TÊTE */}
      <div style={{background:Cs.blueDark,borderRadius:'24px',padding:'26px 28px'}}>
        <p style={{color:'rgba(200,220,240,0.55)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Psychologie du papa</p>
        <h2 style={{color:Cs.white,fontSize:'20px',fontWeight:800,margin:'0 0 8px',lineHeight:1.3}}>Cette semaine, une info pour toi.</h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',margin:0}}>Une info vérifiée par semaine. Pour te guider, te rassurer, t'impliquer.</p>
      </div>

      {/* BADGE SA + THÈME */}
      <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap' as const}}>
        <span style={{background:Cs.dark,color:Cs.white,fontSize:'12px',fontWeight:800,padding:'6px 14px',borderRadius:'20px'}}>SA {semaine.sa}</span>
        <span style={{background:tc.bg,color:tc.tc,fontSize:'12px',fontWeight:700,padding:'6px 14px',borderRadius:'20px'}}>{themeLabel[semaine.theme]}</span>
      </div>

      {/* CARTE PRINCIPALE */}
      <div style={{background:tc.bg,borderRadius:'24px',padding:'28px'}}>
        <p style={{fontSize:'32px',margin:'0 0 14px',lineHeight:1}}>{semaine.emoji}</p>
        <h3 style={{color:Cs.dark,fontSize:'20px',fontWeight:800,margin:'0 0 14px',lineHeight:1.3}}>{semaine.titre}</h3>
        <p style={{color:tc.tc,fontSize:'14px',fontWeight:600,lineHeight:1.7,margin:0,fontStyle:'italic'}}>{semaine.intro}</p>
      </div>

      {/* CONTENU */}
      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
        {paragraphes.map((para, i) => (
          <p key={i} style={{color:Cs.dark,fontSize:'15px',lineHeight:1.8,margin:0}}>{para}</p>
        ))}
      </div>

      {/* CONSEIL */}
      <div style={{background:Cs.dark,borderRadius:'20px',padding:'22px 24px'}}>
        <p style={{color:Cs.gold,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Cette semaine</p>
        <p style={{color:Cs.white,fontSize:'15px',fontWeight:600,lineHeight:1.7,margin:0}}>{semaine.conseil}</p>
      </div>

      {/* SOURCE */}
      <p style={{color:Cs.muted,fontSize:'11px',margin:0,fontStyle:'italic',textAlign:'center' as const}}>Source : {semaine.source}</p>

      {/* CTA */}
      <div style={{background:Cs.cream,borderRadius:'20px',padding:'22px 24px',textAlign:'center' as const,border:`1px solid ${Cs.border}`}}>
        <p style={{color:Cs.dark,fontSize:'15px',fontWeight:700,margin:'0 0 6px'}}>Tu traverses quelque chose de difficile ?</p>
        <p style={{color:Cs.muted,fontSize:'13px',margin:'0 0 16px',lineHeight:1.6}}>Un psychologue périnatal peut t'aider. C'est fait pour ça.</p>
        <a
          href="https://www.doctolib.fr/psychologue"
          target="_blank"
          rel="noopener noreferrer"
          style={{display:'inline-block',background:Cs.blue,color:Cs.white,padding:'12px 24px',borderRadius:'32px',fontSize:'14px',fontWeight:800,textDecoration:'none'}}
        >
          Trouver un soutien sur Doctolib
        </a>
      </div>

    </div>
  );
}
