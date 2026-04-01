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
  titre: string;
  intro: string;
  corps: string;
  conseil: string;
  source: string;
};

const SEMAINES: Semaine[] = [
  {
    sa: 3, theme: 'peur',
    titre: "L'annonce. Et le choc qui va avec.",
    intro: "Tu viens d'apprendre que tu vas être père. Et la première réaction n'est peut-être pas celle que tu attendais.",
    corps: "C'est normal. Des études menées sur plusieurs milliers de futurs pères montrent que plus de 80% d'entre eux ressentent un mélange de joie et de peur à l'annonce de la grossesse. Ce n'est pas un manque d'amour. C'est ton cerveau qui réalise que ta vie va changer profondément.\n\nCette ambivalence est une réaction saine. Les pères qui nient toute peur au départ sont souvent ceux qui la ressentent plus fort plus tard, quand l'accouchement approche. Accueillir cette émotion maintenant, c'est mieux la traverser.",
    conseil: "Dis-lui ce que tu ressens. Pas pour qu'elle te rassure, mais parce que partager ce moment crée une intimité que vous n'aurez plus jamais de la même façon.",
    source: "Genesoni & Tallandini, 2009 - Human Reproduction Update"
  },
  {
    sa: 4, theme: 'couple',
    titre: "Le secret à deux. Profitez-en.",
    intro: "Avant d'annoncer la grossesse à tout le monde, il y a cette période unique où vous êtes les seuls à savoir.",
    corps: "Cette période de secret, souvent quelques semaines, est l'une des plus intimes d'une relation. Les couples qui la vivent consciemment en gardent un souvenir fort. Ce n'est pas juste une question de prudence médicale avant 12 SA. C'est un espace de complicité rare.\n\nLes recherches sur la transition vers la parentalité montrent que les couples qui prennent le temps de digérer la nouvelle ensemble avant de la partager vivent mieux les premières semaines de grossesse. Ils sont plus alignés, moins influencés par les opinions extérieures.",
    conseil: "Créez un rituel à deux pour marquer ce moment. Un dîner, une sortie, une photo. Quelque chose qui appartient rien qu'à vous.",
    source: "Plantin, Olukoya & Ny, 2011 - Journal of Men's Health"
  },
  {
    sa: 5, theme: 'peur',
    titre: "La couvade : quand ton corps réagit aussi.",
    intro: "Tu as peut-être des nausées, des maux de dos ou une fatigue inexpliquée. Tu n'es pas malade. Tu fais de la couvade.",
    corps: "Le syndrome de couvade est documenté depuis des décennies. Entre 25% et 65% des futurs pères ressentent des symptômes physiques pendant la grossesse de leur partenaire : nausées, prise de poids, douleurs abdominales, fatigue. Ce n'est pas psychosomatique au sens péjoratif du terme. C'est neurologique.\n\nLes recherches suggèrent que ces symptômes sont liés aux fluctuations hormonales des pères pendant la grossesse. Le taux de prolactine (hormone impliquée dans le lien parent-enfant) augmente chez les futurs pères. Ton corps se prépare à son rôle, à sa façon.",
    conseil: "Ne te moque pas de tes propres symptômes. Ils signalent que ton système nerveux est engagé dans ce qui se passe. C'est un signe d'implication, pas de fragilité.",
    source: "Brennan, Marshall-Lucette, Ayers & Ahmed, 2007 - Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 6, theme: 'role',
    titre: "Prendre le relais en cuisine. Sans attendre.",
    intro: "Les nausées de ta partenaire peuvent rendre la cuisine impossible. C'est le moment où ton rôle pratique devient essentiel.",
    corps: "Les nausées gravidiques touchent 70 à 85% des femmes enceintes et sont souvent les plus intenses entre 6 et 10 SA. Elles sont causées par la montée brutale de l'hormone hCG. Elles ne sont pas dans la tête, elles ne sont pas exagérées, et elles peuvent être épuisantes.\n\nLes recherches sur le soutien paternel en grossesse montrent que les gestes pratiques et anticipés, ceux que le père fait sans attendre qu'on lui demande, ont un impact direct sur le stress maternel. Ce n'est pas juste de l'aide. C'est un signal fort : je suis là, je vois ce que tu traverses.",
    conseil: "Fais les courses. Prépare des repas froids ou tièdes (les odeurs chaudes sont souvent les pires). Évite de cuisiner du poisson ou des oeufs. Ces petites adaptations font une différence réelle.",
    source: "Santé Publique France, 2021 - Grossesse et rôle du conjoint"
  },
  {
    sa: 7, theme: 'couple',
    titre: "Écouter sans résoudre. Ça s'apprend.",
    intro: "Elle parle de ses peurs, de son inconfort, de ses angoisses. Et toi, tu cherches instinctivement à trouver une solution.",
    corps: "C'est un réflexe bien documenté. Les hommes tendent à répondre aux problèmes par des solutions. Mais pendant la grossesse, ce que ta partenaire cherche souvent, c'est d'être entendue, pas corrigée.\n\nLes travaux de John Gottman sur les couples montrent que la capacité à répondre à l'émotionnel par l'émotionnel est l'un des prédicteurs les plus forts de la satisfaction conjugale après la naissance d'un enfant. Les couples où le père répondait d'abord à l'émotion avant de proposer des solutions avaient une meilleure satisfaction conjugale deux ans après la naissance.",
    conseil: "Ce soir, quand elle parle de quelque chose de difficile, commence par dire : je comprends que c'est dur. Pas de solution. Juste ça. Et observe ce qui se passe dans la conversation.",
    source: "Gottman & Gottman, 2007 - And Baby Makes Three"
  },
  {
    sa: 8, theme: 'lien',
    titre: "Ton bébé t'entend déjà. Vraiment.",
    intro: "À 8 SA, l'oreille interne de bébé commence à se former. Dans quelques semaines, il percevra les sons. Ta voix sera l'une des premières qu'il reconnaît.",
    corps: "Le système auditif foetal est fonctionnel vers 16 à 18 SA. Mais la préparation neurologique commence bien avant. Les voix masculines, plus graves, traversent mieux le liquide amniotique que les voix aiguës. C'est pour ça que ta voix est particulièrement bien perçue par bébé in utero.\n\nUne expérience fondatrice de DeCasper et Fifer (1980) a montré que des nouveau-nés de quelques heures préféraient la voix de leur mère à celle d'autres femmes, preuve qu'ils avaient mémorisé cette voix in utero. Des études ultérieures ont étendu ce résultat aux voix paternelles entendues régulièrement. Si tu lui parles régulièrement d'ici la naissance, il tournera la tête vers ta voix dans les premières heures de sa vie.",
    conseil: "Commence maintenant, même si c'est tôt. Pose ta main sur le ventre le soir et parle-lui 5 minutes. Dis-lui ton prénom, ce que tu fais, ce que tu ressens. La régularité compte plus que le contenu.",
    source: "DeCasper & Fifer, 1980 - Science"
  },
  {
    sa: 9, theme: 'peur',
    titre: "La peur de la fausse couche. Comment la porter.",
    intro: "Entre 10 et 20% des grossesses se terminent par une fausse couche au 1er trimestre. Cette statistique est dans la tête de beaucoup de pères, même s'ils n'en parlent pas.",
    corps: "Les pères portent souvent cette peur en silence, pour ne pas inquiéter leur partenaire. C'est une forme de protection qui a un coût. Les études sur la santé mentale paternelle pendant la grossesse montrent que les pères qui n'ont pas d'espace pour exprimer leurs peurs présentent plus de symptômes anxieux en post-partum.\n\nPorter seul une peur n'est pas une forme de force. C'est une forme d'isolement. Ta partenaire porte probablement la même peur. En parler ensemble ne l'amplifie pas. Ça la partage. Et ce qui est partagé est moins lourd.",
    conseil: "Si la peur de la fausse couche est présente pour toi, parles-en à ta partenaire. Pas pour résoudre. Juste pour dire : moi aussi, j'ai peur. Et on traverse ça ensemble.",
    source: "Franche & Mikail, 2001 - Health Psychology"
  },
  {
    sa: 10, theme: 'role',
    titre: "Le premier RDV médical. Ton rôle n'est pas d'être spectateur.",
    intro: "La première consultation médicale approche. Beaucoup de pères y vont sans savoir quoi faire. Voilà ce qui change tout.",
    corps: "Dans les études sur l'expérience des pères lors des consultations prénatales, le sentiment d'être un tiers plutôt qu'un participant actif est l'un des plus fréquemment rapportés. Les pères qui arrivent avec des questions préparées se sentent significativement plus impliqués et plus compétents dans leur rôle.\n\nLa sage-femme ou le médecin peut aussi s'adresser principalement à ta partenaire. C'est ton rôle de poser des questions, de prendre des notes, et de t'assurer de comprendre ce qui se passe. Tu n'es pas là pour porter le manteau.",
    conseil: "Avant le RDV, prépare 3 questions que tu veux poser. Écris-les. Prends des notes pendant la consultation. Ce rôle actif change complètement la façon dont tu vis ces rendez-vous.",
    source: "Steen, Downe, Bamford & Edozien, 2012 - European Journal of Obstetrics & Gynecology"
  },
  {
    sa: 11, theme: 'couple',
    titre: "Son corps change. Ton regard compte énormément.",
    intro: "Le ventre commence à s'arrondir. La peau change. Elle observe son corps se transformer et regarde ta réaction.",
    corps: "Les femmes enceintes rapportent que le regard de leur partenaire sur leur corps en transformation est l'un des facteurs les plus importants de leur bien-être émotionnel pendant la grossesse. Une étude de Darvill, Skirton et Farrand (2010) auprès de 100 femmes enceintes montre que le soutien corporel du partenaire est un prédicteur indépendant de l'estime de soi maternelle.\n\nCe n'est pas de la coquetterie. C'est de la psychologie de l'attachement. Ton regard est un miroir. Ce qu'elle voit dans tes yeux quand elle se regarde, c'est ce qu'elle pense d'elle-même.",
    conseil: "Ne fais aucun commentaire sur son corps, même positif du genre tu es belle pour une femme enceinte. Dis simplement : tu es belle. Point. La nuance est importante.",
    source: "Darvill, Skirton & Farrand, 2010 - Midwifery"
  },
  {
    sa: 12, theme: 'peur',
    titre: "Le cap des 12 SA. Souffler un peu.",
    intro: "Après 12 semaines, le risque de fausse couche chute à moins de 2%. C'est un cap médical et psychologique majeur.",
    corps: "Beaucoup de futurs pères portent silencieusement l'angoisse d'une fausse couche pendant tout le premier trimestre. Ils ne l'expriment pas pour ne pas inquiéter leur partenaire. Mais cette angoisse retenue a un coût. Les études sur la santé mentale paternelle montrent que les pères qui n'ont pas d'espace pour exprimer leurs peurs présentent plus de symptômes anxieux en post-partum.\n\nPassé 12 SA, la solidité de la grossesse est statistiquement établie. Autoriser le soulagement est sain. Le nier par superstition ne protège personne.",
    conseil: "Parlez de ce que vous avez traversé ensemble ce premier trimestre. Même si tout s'est bien passé, ces semaines ont été chargées émotionnellement. Nommer ça ensemble, c'est en sortir ensemble.",
    source: "Franche & Mikail, 2001 - Health Psychology"
  },
  {
    sa: 13, theme: 'couple',
    titre: "Le 2e trimestre. La fenêtre du couple.",
    intro: "Les nausées s'estompent souvent. L'énergie peut revenir. C'est souvent une meilleure période pour le couple, mais chaque grossesse est différente.",
    corps: "Le 2e trimestre est souvent documenté comme la période de la grossesse où le bien-être maternel est généralement meilleur. Les nausées diminuent pour beaucoup, la fatigue s'allège, le ventre n'est pas encore contraignant. Mais pas pour toutes. Certaines femmes restent fatiguées ou inconfortables.\n\nPour les couples, c'est une fenêtre potentiellement précieuse. Les recherches de Paul Ramchandani à l'Université de Cambridge montrent que la qualité de la relation de couple pendant la grossesse prédit directement la qualité du co-parentage après la naissance. Ce que vous construisez maintenant a des effets réels plus tard.",
    conseil: "Propose quelque chose cette semaine. Un dîner, une sortie, une activité. Demande-lui d'abord comment elle se sent. Si elle en a l'énergie, profitez-en. Si elle est encore fatiguée, continue à prendre le relais.",
    source: "Ramchandani, Stein, Evans & O'Connor, 2005 - Lancet"
  },
  {
    sa: 14, theme: 'lien',
    titre: "La musique que bébé reconnaîtra à la naissance.",
    intro: "Bébé commence à percevoir les sons. Ce que vous écoutez maintenant, il pourra le reconnaître après sa naissance.",
    corps: "Une étude publiée dans la revue Infant Behavior and Development a montré que des nouveau-nés exposés régulièrement à une mélodie spécifique in utero présentaient des réponses comportementales différentes à cette mélodie après la naissance comparé à des mélodies inconnues.\n\nCe n'est pas une mémorisation consciente. C'est une familiarisation neurologique. Les sons entendus régulièrement créent des traces dans le système auditif en développement. Ces traces persistent après la naissance et jouent un rôle dans la régulation émotionnelle du nourrisson.",
    conseil: "Choisissez une chanson ou une musique que vous aimez tous les deux. Passez-la régulièrement. Après la naissance, si bébé s'agite, essayez cette musique. Elle pourrait l'apaiser.",
    source: "Hepper, 1991 - Infant Behavior and Development"
  },
  {
    sa: 15, theme: 'role',
    titre: "Se former pendant la grossesse change tout après.",
    intro: "Les pères qui se préparent activement pendant la grossesse se sentent beaucoup plus confiants et impliqués après la naissance.",
    corps: "Une étude longitudinale menée sur 3 ans auprès de 622 couples a comparé les pères qui s'étaient formés pendant la grossesse (lectures, cours, discussions avec d'autres pères) à ceux qui avaient attendu la naissance. Résultat : les pères préparés montraient des niveaux d'anxiété post-natale significativement plus bas et une plus grande satisfaction dans leur rôle paternel dès les premières semaines.\n\nSe former ne signifie pas devenir expert. Ça signifie réduire l'inconnu. Et l'inconnu est la principale source d'anxiété paternelle.",
    conseil: "Lis un article cette semaine sur le développement du nourrisson dans les 3 premiers mois. Pas pour mémoriser. Juste pour que la première semaine avec bébé ne soit pas totalement terra incognita.",
    source: "Deave, Johnson & Ingram, 2008 - BMC Pregnancy and Childbirth"
  },
  {
    sa: 16, theme: 'peur',
    titre: "L'angoisse financière. Elle touche presque tous les pères.",
    intro: "Est-ce qu'on aura assez d'argent ? Cette question tourne dans la tête de la grande majorité des futurs pères.",
    corps: "Dans les études sur les préoccupations paternelles pendant la grossesse, l'angoisse financière arrive régulièrement dans le top 3, juste après la peur de ne pas être à la hauteur et la peur pour la santé de la mère et du bébé.\n\nCette peur est souvent disproportionnée par rapport à la réalité. Les études montrent que les pères surestiment systématiquement le coût d'un enfant la première année. Ce qui aggrave l'anxiété : ne pas avoir fait les calculs réels. Ce qui la réduit : faire un budget concret, même approximatif.",
    conseil: "Passe une heure ce week-end à faire un budget réel : coûts fixes, aides disponibles (CAF, mutuelle, employeur), congé paternité. Les chiffres concrets sont moins effrayants que les projections floues.",
    source: "Chin, Daiches & Hall, 2011 - Qualitative Health Research"
  },
  {
    sa: 17, theme: 'lien',
    titre: "Le premier mouvement que tu sentiras sous ta main.",
    intro: "Vers 17-20 SA, les mouvements de bébé deviennent perceptibles de l'extérieur. C'est souvent le moment où tout devient réel pour les pères.",
    corps: "Pour beaucoup de pères, le moment où ils sentent bébé bouger sous leur main est le premier moment où la grossesse devient réelle, concrète, indéniable. Avant, c'est une écho, une prise de sang, un ventre qui s'arrondit. Mais sentir un mouvement sous sa paume, c'est autre chose.\n\nDes recherches sur l'attachement prénatal paternel montrent que ce contact physique est l'un des déclencheurs les plus puissants du processus d'attachement chez les pères. Les pères qui ont eu un contact physique régulier avec le ventre de leur partenaire développent un attachement plus fort après la naissance.",
    conseil: "Pose ta main sur le ventre ce soir après le dîner, quand bébé est souvent actif. Attends. Si tu ne sens rien, reviens demain. Note dans ton téléphone le jour et l'heure où tu sens le premier mouvement.",
    source: "Condon, 1993 - Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 18, theme: 'couple',
    titre: "Le mal de dos. Ce que tu peux faire concrètement.",
    intro: "Les douleurs lombaires touchent 60 à 70% des femmes enceintes au 2e trimestre. Ce n'est pas une fatalité. Tu peux aider.",
    corps: "Le mal de dos pendant la grossesse est causé par le changement de centre de gravité, la relaxine (hormone qui assouplit les ligaments) et le poids croissant de l'utérus. Il s'intensifie en général au 3e trimestre.\n\nLes interventions les plus efficaces documentées : le massage du dos par le partenaire (réduction de la douleur de 30% dans certaines études), la natation ou le yoga prénatal, le coussin de grossesse pour la nuit. Ce que tu peux faire : apprendre une technique de massage simple et l'appliquer régulièrement.",
    conseil: "Regarde une vidéo de massage du dos prénatal ce soir (10 minutes sur YouTube). Puis applique-la. Ce n'est pas compliqué. C'est utile, concret, et ça crée de la connexion physique.",
    source: "Field et al., 1999 - Journal of Psychosomatic Obstetrics"
  },
  {
    sa: 19, theme: 'peur',
    titre: "Ne pas savoir si tu seras un bon père. La peur universelle.",
    intro: "Est-ce que je serai à la hauteur ? Cette question, presque tous les futurs pères se la posent. Et presque aucun n'en parle.",
    corps: "La peur de ne pas être à la hauteur comme père est la préoccupation la plus fréquemment rapportée chez les futurs pères, tous pays et toutes cultures confondus. Elle touche aussi bien les premiers papas que les pères de plusieurs enfants.\n\nCe qui est intéressant : cette peur est un signe d'implication, pas d'incompétence. Les pères qui ne se posent jamais cette question sont généralement ceux qui s'impliquent le moins. La peur est le signal que ça compte pour toi. Et les études montrent que les pères qui se forment et s'impliquent pendant la grossesse deviennent de bien meilleurs pères, indépendamment de leurs craintes initiales.",
    conseil: "Écris une liste de 5 choses que tu veux faire différemment de ton propre père, et 5 choses que tu veux garder. Cet exercice simple clarifie ce que tu veux vraiment comme type de père.",
    source: "Draper, 2003 - Sociology of Health & Illness"
  },
  {
    sa: 20, theme: 'role',
    titre: "L'écho T2. Le RDV le plus important de la grossesse.",
    intro: "L'échographie morphologique du 2e trimestre est la plus complète de la grossesse. Ton rôle n'est pas d'être assis dans un coin.",
    corps: "L'écho T2 examine plus de 100 critères anatomiques. C'est la seule écho qui peut détecter la grande majorité des malformations. Elle dure 45 minutes à 1 heure. Pour les pères, c'est souvent le moment où bébé devient le plus réel : on voit son visage, ses mains, son coeur qui bat.\n\nDes études sur l'expérience des pères lors de l'écho T2 montrent que ceux qui arrivent avec des questions préparées vivent le rendez-vous de façon significativement plus positive et se sentent plus impliqués dans la grossesse dans les semaines suivantes.",
    conseil: "Prépare 3 questions avant l'écho. Discutez ensemble si vous souhaitez connaître le sexe. Si des résultats inattendus apparaissent, ta première réaction sera vue et ressentie par ta partenaire. Reste calme.",
    source: "Ekelin, Crang-Svalenius & Dykes, 2004 - Midwifery"
  },
  {
    sa: 21, theme: 'lien',
    titre: "Bébé mémorise ta voix. Déjà.",
    intro: "Il ne s'agit plus de théorie. Bébé entend, et il enregistre.",
    corps: "À 21 SA, l'audition foetale est fonctionnelle. Les sons extérieurs sont perçus avec moins d'intensité qu'après la naissance, mais les fréquences basses (comme les voix masculines) passent particulièrement bien. Si tu lui parles régulièrement d'ici la naissance, il tournera la tête vers ta voix dans les premières heures de sa vie.\n\nUne expérience classique de DeCasper et Fifer (1980) a montré que des nouveau-nés de quelques heures préféraient la voix de leur mère à celle d'autres femmes. Des études ultérieures ont étendu ce résultat aux voix paternelles entendues régulièrement in utero.",
    conseil: "Fixe un moment chaque soir, même 5 minutes. Parle-lui de ta journée, dis-lui ton prénom, lis quelques lignes à voix haute. La régularité compte plus que le contenu.",
    source: "DeCasper & Fifer, 1980 - Science"
  },
  {
    sa: 22, theme: 'couple',
    titre: "Planifier ensemble réduit le stress à deux.",
    intro: "Les conversations sur l'organisation pratique après la naissance ne sont pas romantiques. Mais elles sont protectrices.",
    corps: "Une étude menée sur 218 couples suivis pendant et après la grossesse montre que ceux qui avaient eu des conversations explicites sur la répartition des tâches, le congé parental et l'organisation de la vie après la naissance vivaient une transition post-natale significativement moins conflictuelle.\n\nCes conversations sont difficiles car elles touchent à des sujets qui peuvent révéler des désaccords. Mais les désaccords non dits maintenant deviennent des conflits à 3h du matin avec un nourrisson qui pleure.",
    conseil: "Planifiez une réunion de projet bébé cette semaine. 30 minutes. Congé paternité, organisation des nuits, qui appelle qui quand il y a un problème. C'est moins romantique qu'un dîner. C'est plus utile.",
    source: "Fägerskiöld, 2008 - Scandinavian Journal of Caring Sciences"
  },
  {
    sa: 23, theme: 'peur',
    titre: "L'insomnie paternelle. Elle existe vraiment.",
    intro: "Tu n'arrives pas à dormir. Tu fais des scénarios catastrophes la nuit. Tu n'es pas seul.",
    corps: "L'insomnie prénatale touche aussi les pères. Des études sur la santé mentale des futurs pères montrent que les troubles du sommeil, l'hypervigilance nocturne et les pensées intrusives sont des symptômes courants au 2e et 3e trimestre, surtout chez les pères très impliqués.\n\nCes insomnies sont une manifestation d'hypervigilance protectrice. Ton cerveau se prépare à surveiller un être vulnérable. C'est un instinct, pas un trouble. Mais il mérite d'être pris au sérieux.",
    conseil: "Si l'insomnie est régulière, parles-en avec ta partenaire ou ton médecin. Une activité physique en journée, limiter les écrans le soir, et une routine de coucher aident significativement.",
    source: "Condon, Boyce & Corkindale, 2004 - Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 24, theme: 'role',
    titre: "Connaître la maternité avant le jour J.",
    intro: "Visiter la maternité avant l'accouchement réduit l'anxiété des deux parents de façon mesurable.",
    corps: "Des études sur la préparation à l'accouchement montrent que les couples qui ont visité leur maternité et qui connaissent les lieux (accès, urgences obstétricales, parking, chemin vers la salle de naissance) vivent le jour de l'accouchement avec un niveau de stress significativement plus bas.\n\nPour les pères spécifiquement, ce repérage physique joue un rôle important. Quand le travail commence, ta mission est d'être calme et de gérer la logistique. Connaître les lieux te libère la tête pour être présent émotionnellement.",
    conseil: "Appelle ta maternité pour organiser une visite guidée. Repère l'entrée des urgences obstétricales (souvent différente de l'entrée principale). Teste le trajet aux heures de pointe.",
    source: "Santé Publique France, 2021 - Guide de la naissance"
  },
  {
    sa: 25, theme: 'couple',
    titre: "Les nuits difficiles. Être là sans rien dire.",
    intro: "Elle peut se lever à 3h du matin, incapable de dormir. Ce que tu fais dans ces moments compte plus que tu ne le penses.",
    corps: "L'insomnie de fin de grossesse touche la majorité des femmes enceintes. Elle est causée par la pression physique de l'utérus, les mouvements de bébé, l'anxiété anticipatoire et les changements hormonaux. Elle n'est pas un signe que quelque chose va mal.\n\nCe qui compte pour ta partenaire dans ces moments, ce n'est pas que tu aies une solution. C'est que tu sois là. Les études sur le soutien conjugal prénatal montrent que la simple présence physique du partenaire pendant les épisodes d'insomnie réduit les niveaux de cortisol mesurés chez la femme enceinte.",
    conseil: "Si elle se lève la nuit, lève-toi avec elle. Ne propose rien. Ne cherche pas à résoudre. Juste : tu veux qu'on s'assoie un peu ? Ta présence calme vaut tous les conseils.",
    source: "Beydoun & Saftlas, 2008 - Paediatric and Perinatal Epidemiology"
  },
  {
    sa: 26, theme: 'lien',
    titre: "Bébé réagit à ta voix. Pour de vrai.",
    intro: "À 26 SA, bébé ouvre les yeux pour la première fois. Ses sens se développent rapidement. Tu peux établir un contact réel.",
    corps: "Des études d'imagerie cérébrale foetale montrent que le cerveau de bébé à 26-28 SA présente déjà des réponses différenciées aux sons familiers et aux sons inconnus. Ta voix, entendue régulièrement, est déjà un son connu pour lui.\n\nUne expérience menée par Kisilevsky et al. (2003) a montré que des foetus de 33-34 SA avaient un rythme cardiaque différent quand ils entendaient la voix de leur mère versus une voix inconnue. Ce n'est pas de l'imagination. C'est de la neurologie.",
    conseil: "Ce soir, pose ta main sur le ventre et parle-lui directement. Dis ton prénom, une chose que tu attends avec impatience. Attends une réponse (un mouvement). Si ça arrive, réponds par une pression douce.",
    source: "Kisilevsky et al., 2003 - Psychological Science"
  },
  {
    sa: 27, theme: 'peur',
    titre: "La peur de l'accouchement. Elle touche aussi les pères.",
    intro: "La peur de l'accouchement chez le partenaire est documentée et sous-estimée.",
    corps: "Une étude britannique sur les pères en salle de naissance montre que 40% des pères présents lors de l'accouchement décrivent avoir ressenti une peur intense à un moment ou un autre. Les peurs les plus fréquentes : voir leur partenaire souffrir sans pouvoir aider, perdre le contrôle émotionnellement, et rater quelque chose d'important.\n\nCes peurs ne disparaissent pas d'elles-mêmes. Ce qui les réduit : savoir à l'avance ce qui va se passer, connaître son rôle précis, et avoir répété mentalement les étapes. L'inconnu est la principale source d'anxiété.",
    conseil: "Lis le guide de l'accouchement de ta maternité cette semaine. Cherche des témoignages de pères en salle de naissance. La connaissance est le meilleur outil contre l'anxiété.",
    source: "Longworth & Kingdon, 2011 - Midwifery"
  },
  {
    sa: 28, theme: 'role',
    titre: "La valise. Prends l'initiative.",
    intro: "Préparer la valise de maternité sans attendre qu'elle te le demande est un signal fort. Et pratique.",
    corps: "Dans les faits, une majorité de pères attend que leur partenaire prenne l'initiative pour la valise. Pourtant, faire cette démarche spontanément a une valeur symbolique et pratique forte.\n\nSymbolique : cela signale que tu prends la préparation à la naissance aussi au sérieux qu'elle. Pratique : une naissance peut arriver plus tôt que prévu. Avoir la valise prête à 32-33 SA élimine une source de stress potentielle.",
    conseil: "Consulte la liste dans l'app. Commence à rassembler ce qui est pour toi cette semaine. Montre-lui ce que tu as fait. C'est un geste concret qui vaut tous les discours.",
    source: "Fägerskiöld, 2008 - Scandinavian Journal of Caring Sciences"
  },
  {
    sa: 29, theme: 'couple',
    titre: "Les cours de préparation. Viens vraiment.",
    intro: "Les cours de préparation à la naissance ne sont pas réservés aux mères. Ta présence change l'expérience.",
    corps: "Une étude suédoise portant sur 1 015 couples montre que les pères qui participent aux cours de préparation à la naissance présentent des niveaux d'anxiété pré-accouchement significativement plus bas et se sentent plus efficaces dans leur rôle pendant le travail.\n\nDes cours spécifiques aux pères existent dans de nombreuses maternités. Ils abordent des sujets que les cours mixtes n'ont pas le temps de traiter : comment gérer son propre stress, comment soutenir sans être envahissant.",
    conseil: "Appelle ta maternité et demande s'il existe des séances spécifiques aux pères. Si non, va aux cours mixtes et pose des questions. Poser des questions n'est pas une faiblesse.",
    source: "Svensson, Barclay & Cooke, 2009 - Journal of Perinatal Education"
  },
  {
    sa: 30, theme: 'peur',
    titre: "L'anxiété du 3e trimestre. Son pic, et comment le traverser.",
    intro: "Le 3e trimestre est souvent le moment où l'anxiété des pères culmine. C'est documenté. Et ça se travaille.",
    corps: "Des études longitudinales suivant les pères tout au long de la grossesse montrent un pic d'anxiété au 3e trimestre, souvent plus intense que celui du 1er trimestre. La raison : le moment devient réel. La date approche. Les préparations pratiques révèlent ce qui n'est pas encore fait.\n\nCe qui aide : l'action. Chaque étape de préparation concrète accomplie réduit measurablement le niveau d'anxiété. Ton cerveau gère mieux ce qu'il peut contrôler.",
    conseil: "Fais une liste de tout ce qui n'est pas encore préparé. Classe par urgence. Accomplis une chose par jour. L'anxiété sans action s'amplifie. L'anxiété avec action se transforme en compétence.",
    source: "Condon, Boyce & Corkindale, 2004 - Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 31, theme: 'lien',
    titre: "Te visualiser avec ton bébé. Ça change les choses.",
    intro: "Se projeter mentalement dans le rôle de père avant la naissance renforce l'attachement après. Ce n'est pas de la naïveté.",
    corps: "Des recherches sur les représentations mentales prénatales des pères montrent que les pères qui se visualisent activement avec leur bébé pendant la grossesse (qui imaginent des scènes concrètes : donner le bain, consoler, jouer) développent un attachement paternel plus fort après la naissance et s'adaptent plus vite au rôle parental.\n\nCette visualisation n'est pas une rêverie passive. C'est une préparation mentale. Ton cerveau ne distingue pas complètement l'imaginé du vécu.",
    conseil: "Ferme les yeux 5 minutes ce soir. Visualise-toi tenir ton bébé pour la première fois. Comment tu te sens. Ce que tu lui dis. Comment il sent. Aussi détaillé que possible.",
    source: "Brandon et al., 2009 - Infant Mental Health Journal"
  },
  {
    sa: 32, theme: 'couple',
    titre: "La fatigue du 3e trimestre. Adapter son soutien.",
    intro: "La fatigue du 3e trimestre est différente de celle du 1er. Elle est physique, profonde, et peut être démoralisante. Ton rôle change.",
    corps: "Au 3e trimestre, la fatigue maternelle est causée par le poids de bébé, les troubles du sommeil, la pression sur les organes et la préparation physiologique à l'accouchement. Les femmes décrivent souvent une fatigue qui ne disparaît pas après une nuit de sommeil.\n\nCe qui ne fonctionne pas : minimiser (ça ira), proposer des solutions (tu devrais te reposer plus), comparer (moi aussi je suis fatigué). Ce qui fonctionne : prendre en charge sans demander.",
    conseil: "Cette semaine, prends en charge 100% des tâches ménagères. Sans en parler, sans attendre un merci. Juste faire. C'est exactement ça, le soutien pratique.",
    source: "Stapleton et al., 2012 - American Journal of Obstetrics and Gynecology"
  },
  {
    sa: 33, theme: 'peur',
    titre: "Être témoin de la douleur. Ce que ça fait aux pères.",
    intro: "Un des aspects les plus difficiles de l'accouchement pour les pères : voir souffrir quelqu'un qu'on aime sans pouvoir faire cesser la douleur.",
    corps: "Des études qualitatives sur l'expérience des pères en salle de naissance identifient l'impuissance face à la douleur de leur partenaire comme l'une des émotions les plus difficiles vécues. Cette impuissance peut générer de la culpabilité, de l'anxiété, ou un retrait émotionnel.\n\nCe que les recherches montrent : la présence physique et la stabilité émotionnelle du père ont un effet réel sur la perception de la douleur par la mère. Ton rôle n'est pas de faire cesser la douleur. C'est d'être stable. Et ça, tu peux le faire.",
    conseil: "Répète mentalement une phrase : ma stabilité est son soutien. Pas ma solution. Pas mon intervention. Ma stabilité. Quand tu restes calme face à sa douleur, tu l'aides concrètement.",
    source: "Longworth & Kingdon, 2011 - Midwifery"
  },
  {
    sa: 34, theme: 'role',
    titre: "Le plan de naissance. Pourquoi et comment le faire vraiment.",
    intro: "Le plan de naissance n'est pas un document pour contrôler l'accouchement. C'est un outil de communication avec l'équipe médicale.",
    corps: "Des études sur les plans de naissance montrent que les couples qui en ont rédigé un se sentent plus entendus par l'équipe médicale, même quand le déroulement de l'accouchement s'écarte du plan. Le plan de naissance n'est pas contractuel. C'est une conversation ouverte.\n\nPour les pères, s'impliquer dans la rédaction du plan de naissance a un effet mesurable sur leur sentiment de compétence le jour J. Ça réduit l'improvisation et clarifie le rôle de chacun.",
    conseil: "Assieds-toi avec elle cette semaine pour rédiger le plan de naissance ensemble. Une page maximum. Vos souhaits sur la péridurale, le peau à peau, la césarienne d'urgence. Poser ces questions maintenant évite de les poser en urgence.",
    source: "Byrne, Haase Hewson & Coad, 2014 - International Journal of Childbirth"
  },
  {
    sa: 35, theme: 'lien',
    titre: "Le dialogue tactile avec bébé.",
    intro: "Bébé réagit aux stimulations extérieures depuis plusieurs semaines. Tu peux établir un contact physique réel avec lui.",
    corps: "À 35 SA, le système tactile de bébé est pleinement fonctionnel. Des études d'observation montrent que les foetus répondent à une pression douce sur le ventre par des mouvements dirigés vers la source de stimulation. Ils peuvent répondre à une pression douce par un mouvement en retour.\n\nCe dialogue tactile implique le système nerveux de bébé et contribue à son développement sensoriel. Et pour toi, sentir une réponse physique de bébé sous ta main est souvent l'un des moments les plus forts de la grossesse.",
    conseil: "Pose ta main sur le ventre ce soir et exerce une pression très douce, régulière. Attends. Bébé peut répondre par un coup. Si c'est le cas, réponds à ton tour par une pression légère.",
    source: "Kisilevsky et al., 2003 - Psychological Science"
  },
  {
    sa: 36, theme: 'couple',
    titre: "Marquer la fin de la grossesse. Consciemment.",
    intro: "Ces dernières semaines à deux méritent d'être vécues, pas seulement traversées en attendant que ça arrive.",
    corps: "Les couples qui marquent consciemment la fin de la grossesse, par un acte délibéré (photo, sortie, dîner, lettre), rapportent des souvenirs plus positifs de cette période et une meilleure transition vers la parentalité.\n\nDans quelques semaines, votre vie sera profondément transformée. Ce ne sera pas moins bien. Ce sera différent. Prendre un moment pour honorer ce que vous avez vécu ensemble ces 9 mois est une façon saine de clore ce chapitre avant d'en ouvrir un autre.",
    conseil: "Organisez quelque chose cette semaine. Juste pour vous deux. Un dîner, une photo, une lettre que vous ouvrirez dans un an. Pour dire : on a vécu quelque chose ensemble, et c'est précieux.",
    source: "Plantin, Olukoya & Ny, 2011 - Journal of Men's Health"
  },
  {
    sa: 37, theme: 'peur',
    titre: "L'hypervigilance de fin de grossesse. Ton corps est en mode alerte.",
    intro: "Téléphone chargé en permanence, oreille aux aguets la nuit, vérifications répétées. C'est ton instinct de protection qui s'active.",
    corps: "Ce comportement d'hypervigilance a été documenté chez les futurs pères dans les 3 à 4 dernières semaines de grossesse. Il s'agit d'une montée en puissance de l'instinct de protection, corrélée à des changements hormonaux chez les futurs pères (augmentation de la prolactine et de l'ocytocine, diminution de la testostérone).\n\nCe n'est pas de l'anxiété pathologique. C'est ton cerveau qui se prépare à surveiller un être vulnérable. La même biologie qui fera que tu te lèveras à 3h du matin sans te plaindre quand bébé pleurera.",
    conseil: "Programme une alarme quotidienne pour vérifier que ton téléphone est chargé et que le numéro de la maternité est accessible. Ce type de préparation rituelle transforme l'hypervigilance diffuse en préparation concrète.",
    source: "Condon, Boyce & Corkindale, 2004 - Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 38, theme: 'role',
    titre: "Tu es prêt. Même si tu ne le ressens pas comme ça.",
    intro: "Le sentiment de ne pas être prêt est universel chez les futurs pères à quelques semaines de la naissance. Et il est trompeur.",
    corps: "Des études sur le sentiment de préparation paternelle montrent qu'il n'existe pas de corrélation entre le sentiment subjectif d'être prêt et la qualité réelle du parentage dans les premiers mois. Les pères qui se sentent les moins prêts ne sont pas les moins bons pères. Ils sont souvent les plus conscients de ce qui les attend.\n\nLa préparation se mesure à ce que tu as fait, pas à ce que tu ressens. Si tu as lu sur la grossesse, accompagné aux RDV, préparé la valise, appris les signes du travail : tu es prêt. Le reste viendra avec bébé.",
    conseil: "Fais la liste de tout ce que tu as appris et préparé ces 9 mois. Elle sera plus longue que tu ne le penses. Tu es plus prêt que tu ne le crois.",
    source: "Deave, Johnson & Ingram, 2008 - BMC Pregnancy and Childbirth"
  },
  {
    sa: 39, theme: 'couple',
    titre: "L'attente. Comment la vivre à deux.",
    intro: "50% des accouchements ont lieu après la DPA. L'attente est une épreuve. Pour elle surtout. Et pour vous deux.",
    corps: "L'attente de la naissance dans les dernières semaines est documentée comme une période de stress spécifique pour les deux parents. Pour les pères, l'anxiété prend souvent la forme de l'hypervigilance et du sentiment d'impuissance face à quelque chose qu'on ne peut pas contrôler.\n\nCe qui aide : maintenir une vie active, continuer les activités normales, éviter de rester à la maison à surveiller chaque symptôme. L'action est le meilleur antidote à l'attente.",
    conseil: "Propose une sortie douce chaque jour. Marche, cinéma, restaurant. Ne dis pas ça va venir. Propose : on sort ? L'action est le meilleur antidote à l'attente.",
    source: "Condon, Boyce & Corkindale, 2004 - Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 40, theme: 'role',
    titre: "Ta présence, c'est tout ce dont elle a besoin.",
    intro: "Le jour de l'accouchement, tu n'as pas à tout gérer. Tu as à être là.",
    corps: "Les recherches de Marshall Klaus et John Kennell sur le soutien pendant l'accouchement sont parmi les plus citées en périnatalité. Ils ont montré que la présence d'une personne de soutien non médicale réduit la durée du travail de 25%, le recours à la péridurale de 60%, et le risque de dépression post-partum de façon significative.\n\nTon rôle n'est pas médical. Il n'est pas logistique non plus. Il est de rester calme, d'être physiquement présent, de regarder ta partenaire dans les yeux quand c'est difficile. Ce regard, cette présence, ont des effets physiologiques mesurables sur sa douleur et son stress.",
    conseil: "Répète mentalement cette phrase jusqu'à la naissance : mon rôle est d'être là. Pas de tout gérer. Pas de tout savoir. Juste d'être là. C'est suffisant. C'est même beaucoup.",
    source: "Klaus, Kennell & Klaus, 1993 - Mothering the Mother"
  },
];

export default function PsychoPage({ C: propC, saReelle }: any) {
  const Cs = {
    dark:'#1e2535', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#c8a060',
    white:'#ffffff', border:'#f0ede8', muted:'#9aa0a8', cream:'#f7f5f0',
  };

  const saActuelle = saReelle || 20;
  const semaine = SEMAINES.find(s => s.sa === saActuelle)
    || SEMAINES.reduce((prev, curr) =>
      Math.abs(curr.sa - saActuelle) < Math.abs(prev.sa - saActuelle) ? curr : prev
    );

  const tc = THEME_COLORS[semaine.theme];
  const themeLabel: Record<string,string> = {
    peur:   'Émotions & peurs',
    couple: 'Vie de couple',
    lien:   'Lien avec bébé',
    role:   'Rôle actif',
  };

  const paragraphes = semaine.corps.split('\n\n');

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'24px',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      <div style={{background:Cs.blueDark,borderRadius:'24px',padding:'26px 28px'}}>
        <p style={{color:'rgba(200,220,240,0.55)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Psychologie du papa</p>
        <h2 style={{color:Cs.white,fontSize:'20px',fontWeight:800,margin:'0 0 8px',lineHeight:1.3}}>Cette semaine, une info pour toi.</h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',margin:0}}>Pour te guider, te rassurer, t'impliquer.</p>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap' as const}}>
        <span style={{background:Cs.dark,color:Cs.white,fontSize:'12px',fontWeight:800,padding:'6px 14px',borderRadius:'20px'}}>SA {semaine.sa}</span>
        <span style={{background:tc.bg,color:tc.tc,fontSize:'12px',fontWeight:700,padding:'6px 14px',borderRadius:'20px'}}>{themeLabel[semaine.theme]}</span>
      </div>

      <div style={{background:tc.bg,borderRadius:'24px',padding:'28px'}}>
        <h3 style={{color:Cs.dark,fontSize:'20px',fontWeight:800,margin:'0 0 14px',lineHeight:1.3}}>{semaine.titre}</h3>
        <p style={{color:tc.tc,fontSize:'14px',fontWeight:600,lineHeight:1.7,margin:0,fontStyle:'italic'}}>{semaine.intro}</p>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
        {paragraphes.map((para, i) => (
          <p key={i} style={{color:Cs.dark,fontSize:'15px',lineHeight:1.8,margin:0}}>{para}</p>
        ))}
      </div>

      <div style={{background:Cs.dark,borderRadius:'20px',padding:'22px 24px'}}>
        <p style={{color:Cs.gold,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Cette semaine</p>
        <p style={{color:Cs.white,fontSize:'15px',fontWeight:600,lineHeight:1.7,margin:0}}>{semaine.conseil}</p>
      </div>

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
