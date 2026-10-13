'use client';

const THEME_COLORS: Record<string,{bg:string;tc:string;accent:string}> = {
  peur:   { bg:'#F8E9DF', tc:'#9A4A2E', accent:'#B4593A' },
  couple: { bg:'#E5ECE1', tc:'#2F4F3E', accent:'#2F4F3E' },
  lien:   { bg:'#E3EBF3', tc:'#1A3D5C', accent:'#1A3D5C' },
  role:   { bg:'#E3EBF3', tc:'#1A3D5C', accent:'#1A3D5C' },
};

export type Semaine = {
  sa: number;
  theme: 'peur' | 'couple' | 'lien' | 'role';
  titre: string;
  intro: string;
  corps: string;
  conseil: string;
  source: string;
};

export const SEMAINES: Semaine[] = [
  {
    sa: 3, theme: 'peur',
    titre: "L'annonce, et le choc qui va avec",
    intro: "Tu viens d'apprendre que tu vas être père. Et la première réaction n'est peut-être pas celle que tu attendais.",
    corps: "C'est normal. Les recherches sur le passage à la paternité décrivent très souvent un mélange de joie, de fierté et d'inquiétude à l'annonce de la grossesse. Ce n'est pas un manque d'amour. C'est ton cerveau qui réalise que ta vie va changer profondément.\n\nCette ambivalence est une réaction saine. Les pères qui nient toute peur au départ sont souvent ceux qui la ressentent plus fort plus tard, quand l'accouchement approche. Accueillir cette émotion maintenant, c'est mieux la traverser.",
    conseil: "Dis-lui ce que tu ressens. Pas pour qu'elle te rassure, mais parce que partager ce moment crée une intimité que vous n'aurez plus jamais de la même façon.",
    source: "Genesoni & Tallandini, 2009, Birth"
  },
  {
    sa: 4, theme: 'couple',
    titre: "Le secret à deux : profitez-en",
    intro: "Avant d'annoncer la grossesse à tout le monde, il y a cette période unique où vous êtes les seuls à savoir.",
    corps: "Cette période de secret, souvent quelques semaines, est l'une des plus intimes d'une relation. Les couples qui la vivent consciemment en gardent un souvenir fort. Ce n'est pas juste une question de prudence médicale avant 12 SA. C'est un espace de complicité rare.\n\nLes recherches montrent que l'implication du père dès le début de la grossesse est associée à un meilleur vécu pour toute la famille. Prendre le temps de digérer la nouvelle à deux, c'est déjà t'impliquer.",
    conseil: "Créez un rituel à deux pour marquer ce moment. Un dîner, une sortie, une photo. Quelque chose qui appartient rien qu'à vous.",
    source: "Plantin, Olukoya & Ny, 2011, Fathering"
  },
  {
    sa: 5, theme: 'peur',
    titre: "La couvade : quand ton corps réagit aussi",
    intro: "Tu as peut-être des nausées, des maux de dos ou une fatigue inexpliquée. Tu n'es pas malade. Tu fais de la couvade.",
    corps: "Le syndrome de couvade est documenté depuis des décennies. Selon les études et les pays, une part importante des futurs pères ressent des symptômes physiques pendant la grossesse de leur partenaire : nausées, prise de poids, douleurs abdominales, fatigue. Ce n'est pas « dans ta tête » au sens péjoratif.\n\nLes causes restent mal connues. Des pistes psychologiques (implication, stress de la transition) et hormonales sont étudiées : une étude a par exemple observé une prolactine plus élevée en fin de grossesse chez les futurs pères qui avaient le plus de symptômes. Ton corps vit aussi cette période, à sa façon.",
    conseil: "Ne te moque pas de tes propres symptômes. Ils signalent que ton système nerveux est engagé dans ce qui se passe. C'est un signe d'implication, pas de fragilité.",
    source: "Brennan, Marshall-Lucette, Ayers & Ahmed, 2007, Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 6, theme: 'role',
    titre: "Prendre le relais en cuisine, sans attendre",
    intro: "Les nausées de ta partenaire peuvent rendre la cuisine impossible. C'est le moment où ton rôle pratique devient essentiel.",
    corps: "Les nausées gravidiques touchent 70 à 85% des femmes enceintes et sont souvent les plus intenses entre 6 et 10 SA. Elles sont liées aux hormones de grossesse : l'hCG, mais aussi une hormone appelée GDF15, selon des travaux récents. Elles ne sont pas dans la tête, elles ne sont pas exagérées, et elles peuvent être épuisantes.\n\nLes recherches sur le soutien paternel en grossesse montrent que les gestes pratiques et anticipés, ceux que le père fait sans attendre qu'on lui demande, sont associés à moins de détresse chez la future maman. Ce n'est pas juste de l'aide. C'est un signal fort : je suis là, je vois ce que tu traverses.",
    conseil: "Fais les courses. Prépare des repas froids ou tièdes (les odeurs chaudes sont souvent les pires). Évite de cuisiner du poisson ou des œufs. Ces petites adaptations font une différence réelle.",
    source: "Stapleton et al., 2012, Journal of Family Psychology"
  },
  {
    sa: 7, theme: 'couple',
    titre: "Écouter sans résoudre, ça s'apprend",
    intro: "Elle parle de ses peurs, de son inconfort, de ses angoisses. Et toi, tu cherches instinctivement à trouver une solution.",
    corps: "C'est un réflexe bien documenté. Les hommes tendent à répondre aux problèmes par des solutions. Mais pendant la grossesse, ce que ta partenaire cherche souvent, c'est d'être entendue, pas corrigée.\n\nLes travaux de John Gottman montrent que la satisfaction de couple baisse chez environ deux tiers des parents dans les années qui suivent une naissance. Les couples qui traversent le mieux cette période sont ceux qui entretiennent la tendresse et l'attention à ce que vit l'autre. Accueillir l'émotion avant de chercher une solution, c'est exactement ça.",
    conseil: "Ce soir, quand elle parle de quelque chose de difficile, commence par dire : je comprends que c'est dur. Pas de solution. Juste ça. Et observe ce qui se passe dans la conversation.",
    source: "Gottman & Gottman, 2007, And Baby Makes Three"
  },
  {
    sa: 8, theme: 'lien',
    titre: "Bientôt, ton bébé entendra ta voix",
    intro: "À 8 SA, l'oreille de bébé est en pleine formation. Il ne t'entend pas encore, mais dans quelques mois, ta voix fera partie des sons qui l'accompagnent.",
    corps: "Les premières réactions de bébé aux sons apparaissent vers 20 SA, d'abord pour les sons graves, puis son audition s'affine jusqu'à la fin de la grossesse. Les sons graves, comme une voix d'homme, traversent mieux la paroi du ventre que les sons aigus. Mais la voix que bébé entend le plus, c'est celle de sa mère, car elle lui parvient aussi de l'intérieur.\n\nUne expérience célèbre a montré que des nouveau-nés de quelques jours préféraient la voix de leur mère à celle d'une autre femme : ils l'avaient mémorisée in utero. Pour la voix du père, les études n'ont pas retrouvé cette préférence à la naissance. En revanche, en fin de grossesse, le fœtus réagit déjà à ta voix. Et après la naissance, bébé apprend à la reconnaître au fil des semaines, grâce aux câlins, au peau à peau et aux moments où tu lui parles.",
    conseil: "Commence maintenant, même si c'est tôt. Pose ta main sur le ventre le soir et parle-lui 5 minutes. Dis-lui ton prénom, ce que tu fais, ce que tu ressens. La régularité compte plus que le contenu.",
    source: "DeCasper & Fifer, 1980, Science. Lee & Kisilevsky, 2014, Developmental Psychobiology"
  },
  {
    sa: 9, theme: 'peur',
    titre: "La peur de la fausse couche : comment la porter",
    intro: "Entre 10 et 20% des grossesses se terminent par une fausse couche au 1er trimestre. Cette statistique est dans la tête de beaucoup de pères, même s'ils n'en parlent pas.",
    corps: "Les pères portent souvent cette peur en silence, pour ne pas inquiéter leur partenaire. C'est une forme de protection qui a un coût. Les études sur l'anxiété des pères autour de la naissance montrent que le manque de soutien et de personnes à qui parler fait partie des facteurs qui l'aggravent.\n\nPorter seul une peur n'est pas une forme de force. C'est une forme d'isolement. Ta partenaire porte probablement la même peur. En parler ensemble ne l'amplifie pas. Ça la partage. Et ce qui est partagé est moins lourd.",
    conseil: "Si la peur de la fausse couche est présente pour toi, parles-en à ta partenaire. Pas pour résoudre. Juste pour dire : moi aussi, j'ai peur. Et on traverse ça ensemble.",
    source: "Philpott et al., 2019, Midwifery"
  },
  {
    sa: 10, theme: 'role',
    titre: "Le premier RDV médical : tu n'es pas spectateur",
    intro: "La première consultation médicale approche. Beaucoup de pères y vont sans savoir quoi faire. Voilà ce qui change tout.",
    corps: "Dans les études sur l'expérience des pères lors des consultations prénatales, le sentiment d'être un tiers plutôt qu'un participant actif est l'un des plus fréquemment rapportés. Ces mêmes études montrent que les pères ont besoin d'être inclus et informés pour bien soutenir leur partenaire. Arriver avec tes questions, c'est une façon simple de prendre ta place.\n\nLa sage-femme ou le médecin peut aussi s'adresser principalement à ta partenaire. C'est ton rôle de poser des questions, de prendre des notes, et de t'assurer de comprendre ce qui se passe. Tu n'es pas là pour porter le manteau.",
    conseil: "Avant le RDV, prépare 3 questions que tu veux poser. Écris-les. Prends des notes pendant la consultation. Ce rôle actif change complètement la façon dont tu vis ces rendez-vous.",
    source: "Steen, Downe, Bamford & Edozien, 2012, Midwifery"
  },
  {
    sa: 11, theme: 'couple',
    titre: "Son corps change, ton regard compte",
    intro: "Le ventre commence à s'arrondir. La peau change. Elle observe son corps se transformer et regarde ta réaction.",
    corps: "Beaucoup de femmes enceintes disent que le regard de leur partenaire sur leur corps qui change compte pour leur bien-être. Une petite étude qualitative souligne combien le soutien du partenaire aide les femmes à traverser les bouleversements de la première maternité.\n\nCe n'est pas de la coquetterie. C'est de la psychologie de l'attachement. Ton regard est un miroir. Ce qu'elle voit dans tes yeux quand elle se regarde, c'est ce qu'elle pense d'elle-même.",
    conseil: "Évite les compliments à double tranchant du genre « tu es belle pour une femme enceinte ». Dis simplement : « tu es belle ». Point. La nuance est importante.",
    source: "Darvill, Skirton & Farrand, 2010, Midwifery"
  },
  {
    sa: 12, theme: 'peur',
    titre: "Le cap des 12 SA : souffler un peu",
    intro: "Après 12 semaines, le risque de fausse couche chute à moins de 2%. C'est un cap médical et psychologique majeur.",
    corps: "Beaucoup de futurs pères portent silencieusement l'angoisse d'une fausse couche pendant tout le premier trimestre. Ils ne l'expriment pas pour ne pas inquiéter leur partenaire. Mais cette angoisse retenue a un coût. Les études sur l'anxiété des pères autour de la naissance montrent que le manque de soutien et de personnes à qui parler fait partie des facteurs qui l'aggravent.\n\nPassé 12 SA, la solidité de la grossesse est statistiquement établie. Autoriser le soulagement est sain. Le nier par superstition ne protège personne.",
    conseil: "Parlez de ce que vous avez traversé ensemble ce premier trimestre. Même si tout s'est bien passé, ces semaines ont été chargées émotionnellement. Nommer ça ensemble, c'est en sortir ensemble.",
    source: "Philpott et al., 2019, Midwifery"
  },
  {
    sa: 13, theme: 'couple',
    titre: "Le 2e trimestre, la fenêtre du couple",
    intro: "Les nausées s'estompent souvent. L'énergie peut revenir. C'est souvent une meilleure période pour le couple, mais chaque grossesse est différente.",
    corps: "Le 2e trimestre est souvent documenté comme la période de la grossesse où le bien-être maternel est généralement meilleur. Les nausées diminuent pour beaucoup, la fatigue s'allège, le ventre n'est pas encore contraignant. Mais pas pour toutes. Certaines femmes restent fatiguées ou inconfortables.\n\nPour les couples, c'est une fenêtre potentiellement précieuse. Les recherches sur le coparentage montrent que la qualité de la relation de couple pendant la grossesse est liée à la façon dont les parents font équipe après la naissance. Ce que vous construisez maintenant a des effets réels plus tard.",
    conseil: "Propose quelque chose cette semaine. Un dîner, une sortie, une activité. Demande-lui d'abord comment elle se sent. Si elle en a l'énergie, profitez-en. Si elle est encore fatiguée, continue à prendre le relais.",
    source: "Van Egeren, 2004, Infant Mental Health Journal"
  },
  {
    sa: 14, theme: 'lien',
    titre: "La musique que bébé pourra reconnaître",
    intro: "Dans quelques semaines, bébé commencera à percevoir les sons. Une musique entendue souvent en fin de grossesse pourra lui sembler familière après sa naissance.",
    corps: "Le psychologue Peter Hepper a montré que des nouveau-nés de 2 à 4 jours, qui avaient souvent entendu le générique d'une série télé pendant la grossesse, se calmaient en l'entendant après la naissance, contrairement à une mélodie inconnue.\n\nCe n'est pas une mémorisation consciente. C'est une familiarisation neurologique. Les sons entendus régulièrement créent des traces dans le système auditif en développement. Ces traces restent quelques semaines après la naissance, surtout si la musique continue d'être écoutée.",
    conseil: "Choisissez une chanson ou une musique que vous aimez tous les deux. Passez-la régulièrement. Après la naissance, si bébé s'agite, essayez cette musique. Elle pourrait l'apaiser.",
    source: "Hepper, 1991, Irish Journal of Psychology"
  },
  {
    sa: 15, theme: 'role',
    titre: "Se former pendant la grossesse aide après",
    intro: "Beaucoup de pères disent qu'ils se seraient sentis plus à l'aise après la naissance s'ils s'étaient davantage préparés pendant la grossesse.",
    corps: "Une étude anglaise, qui a interrogé de futurs parents avant et après la naissance, montre que la plupart se sentaient mal préparés à la vie avec un bébé. Les pères, en particulier, se sentaient souvent tenus à l'écart des cours et des informations, et auraient aimé en savoir plus.\n\nSe former ne signifie pas devenir expert. Ça signifie réduire l'inconnu. Et l'inconnu est la principale source d'anxiété paternelle.",
    conseil: "Lis un article cette semaine sur le développement du nourrisson dans les 3 premiers mois. Pas pour mémoriser. Juste pour que la première semaine avec bébé ne soit pas totalement terra incognita.",
    source: "Deave, Johnson & Ingram, 2008, BMC Pregnancy and Childbirth"
  },
  {
    sa: 16, theme: 'peur',
    titre: "L'angoisse financière : tu n'es pas le seul",
    intro: "Est-ce qu'on aura assez d'argent ? Cette question tourne dans la tête de la grande majorité des futurs pères.",
    corps: "Dans les études sur le vécu des futurs pères, le rôle de « pourvoyeur » et les soucis d'argent reviennent souvent, à côté de la peur de ne pas être à la hauteur et de l'inquiétude pour la santé de la mère et du bébé.\n\nCette peur se nourrit souvent du flou. Ce qui aggrave l'anxiété : ne pas avoir fait les calculs réels. Ce qui la réduit : faire un budget concret, même approximatif.",
    conseil: "Passe une heure ce week-end à faire un budget réel : coûts fixes, aides disponibles (CAF, mutuelle, employeur), congé paternité. Les chiffres concrets sont moins effrayants que les projections floues.",
    source: "Chin, Hall & Daiches, 2011, Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 17, theme: 'lien',
    titre: "Le premier mouvement sous ta main",
    intro: "Ta partenaire sent souvent bébé bouger entre 18 et 22 SA. Pour toi, avec la main sur le ventre, il faut en général attendre quelques semaines de plus. C'est souvent le moment où tout devient réel pour les pères.",
    corps: "Pour beaucoup de pères, le moment où ils sentent bébé bouger sous leur main est le premier moment où la grossesse devient réelle, concrète, indéniable. Avant, c'est une écho, une prise de sang, un ventre qui s'arrondit. Mais sentir un mouvement sous sa paume, c'est autre chose.\n\nLes recherches sur l'attachement prénatal des pères montrent que ces moments où bébé devient concret nourrissent le lien. Et l'attachement ressenti pendant la grossesse est le meilleur indicateur du lien père-bébé après la naissance.",
    conseil: "Pose ta main sur le ventre ce soir après le dîner, quand bébé est souvent actif. Attends. Si tu ne sens rien, reviens demain. Note dans ton téléphone le jour et l'heure où tu sens le premier mouvement.",
    source: "Condon, Corkindale, Boyce & Gamble, 2013, Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 18, theme: 'couple',
    titre: "Le mal de dos : ce que tu peux faire",
    intro: "Les douleurs de dos touchent plus d'une femme enceinte sur deux, souvent à partir du 2e trimestre. Ce n'est pas une fatalité. Tu peux aider.",
    corps: "Le mal de dos pendant la grossesse est causé par le changement de centre de gravité, la relaxine (hormone qui assouplit les ligaments) et le poids croissant de l'utérus. Il s'intensifie en général au 3e trimestre.\n\nLes interventions les plus efficaces documentées : le massage par le partenaire (dans une étude, des massages faits par le conjoint ont diminué la douleur de dos et l'anxiété), la natation ou le yoga prénatal, le coussin de grossesse pour la nuit. Ce que tu peux faire : apprendre une technique de massage simple et l'appliquer régulièrement.",
    conseil: "Regarde une vidéo de massage du dos prénatal ce soir (10 minutes sur YouTube). Puis applique-la. Ce n'est pas compliqué. C'est utile, concret, et ça crée de la connexion physique.",
    source: "Field et al., 2008, Journal of Bodywork and Movement Therapies"
  },
  {
    sa: 19, theme: 'peur',
    titre: "Serai-je un bon père ? Une peur très partagée",
    intro: "Est-ce que je serai à la hauteur ? Cette question, presque tous les futurs pères se la posent. Et presque aucun n'en parle.",
    corps: "La peur de ne pas être à la hauteur fait partie des préoccupations les plus souvent rapportées par les futurs pères. Elle touche aussi bien les premiers papas que les pères de plusieurs enfants.\n\nCe qui est intéressant : cette peur est un signe d'implication, pas d'incompétence. La peur est le signal que ça compte pour toi. Et t'impliquer pendant la grossesse aide à te sentir plus prêt et plus à l'aise une fois bébé là.",
    conseil: "Écris une liste de 5 choses que tu veux faire différemment de ton propre père, et 5 choses que tu veux garder. Cet exercice simple clarifie ce que tu veux vraiment comme type de père.",
    source: "Draper, 2003, Nursing Inquiry"
  },
  {
    sa: 20, theme: 'role',
    titre: "L'écho T2, un rendez-vous clé",
    intro: "L'échographie morphologique du 2e trimestre est la plus complète de la grossesse. Ton rôle n'est pas d'être assis dans un coin.",
    corps: "L'écho T2, vers 22 SA, est l'examen le plus détaillé de l'anatomie de bébé : cerveau, cœur, reins, membres, visage. C'est elle qui permet de repérer le plus de malformations, même si aucune écho ne peut tout voir. Elle dure souvent entre 30 minutes et 1 heure. Pour les pères, c'est souvent le moment où bébé devient le plus réel : on voit son visage, ses mains, son cœur qui bat.\n\nUne étude suédoise sur le vécu des parents pendant l'échographie montre que c'est souvent un moment fort pour les pères, qui rend bébé plus réel, et qu'ils apprécient d'être inclus et de recevoir des explications.",
    conseil: "Prépare 3 questions avant l'écho. Discutez ensemble si vous souhaitez connaître le sexe. Si des résultats inattendus apparaissent, ta première réaction sera vue et ressentie par ta partenaire. Reste calme.",
    source: "Ekelin, Crang-Svalenius & Dykes, 2004, Midwifery"
  },
  {
    sa: 21, theme: 'lien',
    titre: "Bébé commence à entendre",
    intro: "C'est à peu près maintenant que bébé commence à réagir aux sons. Les sons graves lui parviennent en premier.",
    corps: "Vers 20 SA, bébé commence à réagir aux sons, d'abord aux plus graves. Les sons de l'extérieur lui arrivent atténués, mais les fréquences basses, comme une voix d'homme, passent plutôt bien. La voix qu'il entend le plus reste celle de sa mère.\n\nUne expérience classique a montré que des nouveau-nés de quelques jours préféraient la voix de leur mère à celle d'une autre femme. Pour la voix du père, cette préférence n'a pas été retrouvée à la naissance : bébé l'apprend ensuite, au fil des semaines. Lui parler dès maintenant, c'est déjà créer une habitude à vous deux, et commencer à te sentir père.",
    conseil: "Fixe un moment chaque soir, même 5 minutes. Parle-lui de ta journée, dis-lui ton prénom, lis quelques lignes à voix haute. La régularité compte plus que le contenu.",
    source: "DeCasper & Fifer, 1980, Science. Lee & Kisilevsky, 2014, Developmental Psychobiology"
  },
  {
    sa: 22, theme: 'couple',
    titre: "Planifier ensemble pour moins de stress",
    intro: "Les conversations sur l'organisation pratique après la naissance ne sont pas romantiques. Mais elles sont protectrices.",
    corps: "Les études sur le passage à la parentalité montrent que la répartition des tâches après la naissance est l'une des grandes sources de tension dans les couples, et que beaucoup de jeunes pères sont surpris par l'ampleur du changement.\n\nCes conversations sont difficiles car elles touchent à des sujets qui peuvent révéler des désaccords. Mais les désaccords non dits maintenant deviennent des conflits à 3h du matin avec un nourrisson qui pleure.",
    conseil: "Planifiez une réunion de projet bébé cette semaine. 30 minutes. Congé paternité, organisation des nuits, qui appelle qui quand il y a un problème. C'est moins romantique qu'un dîner. C'est plus utile.",
    source: "Fägerskiöld, 2008, Scandinavian Journal of Caring Sciences"
  },
  {
    sa: 23, theme: 'peur',
    titre: "L'insomnie des futurs pères existe",
    intro: "Tu n'arrives pas à dormir. Tu fais des scénarios catastrophes la nuit. Tu n'es pas seul.",
    corps: "L'insomnie prénatale touche aussi les pères. Les études sur la santé mentale des futurs pères montrent que l'anxiété et les troubles du sommeil ne sont pas rares pendant la grossesse.\n\nCes insomnies sont une manifestation d'hypervigilance protectrice. Ton cerveau se prépare à surveiller un être vulnérable. C'est un instinct, pas un trouble. Mais il mérite d'être pris au sérieux.",
    conseil: "Si l'insomnie est régulière, parles-en avec ta partenaire ou ton médecin. Une activité physique en journée, limiter les écrans le soir, et une routine de coucher aident significativement.",
    source: "Condon, Boyce & Corkindale, 2004, Australian and New Zealand Journal of Psychiatry"
  },
  {
    sa: 24, theme: 'role',
    titre: "Connaître la maternité avant le jour J",
    intro: "Visiter la maternité avant l'accouchement aide beaucoup de parents à se sentir plus sereins le jour J.",
    corps: "Connaître les lieux à l'avance (accès, urgences obstétricales, parking, chemin vers la salle de naissance), c'est autant d'inconnues en moins le jour de l'accouchement.\n\nPour les pères spécifiquement, ce repérage physique joue un rôle important. Quand le travail commence, ta mission est d'être calme et de gérer la logistique. Connaître les lieux te libère la tête pour être présent émotionnellement.",
    conseil: "Appelle ta maternité pour organiser une visite guidée. Repère l'entrée des urgences obstétricales (souvent différente de l'entrée principale). Teste le trajet aux heures de pointe.",
    source: "HAS, 2005, Préparation à la naissance et à la parentalité"
  },
  {
    sa: 25, theme: 'couple',
    titre: "Les nuits difficiles : être là, simplement",
    intro: "Elle peut se lever à 3h du matin, incapable de dormir. Ce que tu fais dans ces moments compte plus que tu ne le penses.",
    corps: "L'insomnie de fin de grossesse touche la majorité des femmes enceintes. Elle est causée par la pression physique de l'utérus, les mouvements de bébé, l'anxiété anticipatoire et les changements hormonaux. Elle n'est pas un signe que quelque chose va mal.\n\nCe qui compte pour ta partenaire dans ces moments, ce n'est pas que tu aies une solution. C'est que tu sois là. Les études sur le soutien du partenaire pendant la grossesse montrent que se sentir soutenue est associé à moins de stress et de détresse chez la future maman.",
    conseil: "Si elle se lève la nuit, lève-toi avec elle. Ne propose rien. Ne cherche pas à résoudre. Juste : tu veux qu'on s'assoie un peu ? Ta présence calme vaut tous les conseils.",
    source: "Stapleton et al., 2012, Journal of Family Psychology"
  },
  {
    sa: 26, theme: 'lien',
    titre: "Bébé réagit aux voix",
    intro: "À 26 SA, bébé ouvre les yeux pour la première fois. Ses sens se développent rapidement. Tu peux établir un contact réel.",
    corps: "En fin de grossesse, le fœtus réagit déjà aux voix. Une expérience a montré que chez des fœtus à terme, le rythme cardiaque accélérait en entendant la voix de leur mère, et ralentissait avec une voix inconnue.\n\nEt ta voix ? Une étude a montré qu'en fin de grossesse, le fœtus réagit aussi à la voix de son père. La préférence pour ta voix, elle, se construit après la naissance, au fil des semaines passées ensemble.",
    conseil: "Ce soir, pose ta main sur le ventre et parle-lui directement. Dis ton prénom, une chose que tu attends avec impatience. Attends une réponse (un mouvement). Si ça arrive, réponds par une pression douce.",
    source: "Kisilevsky et al., 2003, Psychological Science. Lee & Kisilevsky, 2014, Developmental Psychobiology"
  },
  {
    sa: 27, theme: 'peur',
    titre: "La peur de l'accouchement touche aussi les pères",
    intro: "La peur de l'accouchement chez le partenaire est documentée et sous-estimée.",
    corps: "Une étude britannique sur les pères en salle de naissance montre que beaucoup vivent des moments de peur intense pendant l'accouchement. Les peurs les plus fréquentes : voir leur partenaire souffrir sans pouvoir aider, perdre le contrôle émotionnellement, et rater quelque chose d'important.\n\nCes peurs ne disparaissent pas d'elles-mêmes. Ce qui les réduit : savoir à l'avance ce qui va se passer, connaître son rôle précis, et avoir répété mentalement les étapes. L'inconnu est la principale source d'anxiété.",
    conseil: "Lis le guide de l'accouchement de ta maternité cette semaine. Cherche des témoignages de pères en salle de naissance. La connaissance est le meilleur outil contre l'anxiété.",
    source: "Longworth & Kingdon, 2011, Midwifery"
  },
  {
    sa: 28, theme: 'role',
    titre: "La valise : prends l'initiative",
    intro: "Préparer la valise de maternité sans attendre qu'elle te le demande est un signal fort. Et pratique.",
    corps: "Souvent, c'est la future maman qui prend l'initiative pour la valise. Pourtant, faire cette démarche spontanément a une valeur symbolique et pratique forte.\n\nSymbolique : cela signale que tu prends la préparation à la naissance aussi au sérieux qu'elle. Pratique : une naissance peut arriver plus tôt que prévu. Avoir la valise prête à 32-33 SA élimine une source de stress potentielle.",
    conseil: "Consulte la liste dans l'app. Commence à rassembler ce qui est pour toi cette semaine. Montre-lui ce que tu as fait. C'est un geste concret qui vaut tous les discours.",
    source: "Fägerskiöld, 2008, Scandinavian Journal of Caring Sciences"
  },
  {
    sa: 29, theme: 'couple',
    titre: "Les cours de préparation : viens",
    intro: "Les cours de préparation à la naissance ne sont pas réservés aux mères. Ta présence change l'expérience.",
    corps: "Une étude australienne (Svensson, Barclay et Cooke, 2009) a montré qu'un programme de préparation pensé pour les futurs parents aidait les mamans à se sentir plus compétentes et mieux informées après la naissance. Et les études sur le vécu des pères montrent qu'ils se sentent mieux armés quand ils ont été préparés.\n\nDes cours spécifiques aux pères existent dans de nombreuses maternités. Ils abordent des sujets que les cours mixtes n'ont pas le temps de traiter : comment gérer son propre stress, comment soutenir sans être envahissant.",
    conseil: "Appelle ta maternité et demande s'il existe des séances spécifiques aux pères. Si non, va aux cours mixtes et pose des questions. Poser des questions n'est pas une faiblesse.",
    source: "Svensson, Barclay & Cooke, 2009, Midwifery"
  },
  {
    sa: 30, theme: 'peur',
    titre: "L'anxiété du 3e trimestre : comment la traverser",
    intro: "Le 3e trimestre peut raviver l'anxiété des pères. C'est fréquent. Et ça se travaille.",
    corps: "Pour beaucoup de pères, l'approche de la naissance ravive l'anxiété. La raison : le moment devient réel. La date approche. Les préparations pratiques révèlent ce qui n'est pas encore fait.\n\nCe qui aide : l'action. Chaque étape de préparation concrète accomplie aide à faire baisser l'anxiété. Ton cerveau gère mieux ce qu'il peut contrôler.",
    conseil: "Fais une liste de tout ce qui n'est pas encore préparé. Classe par urgence. Accomplis une chose par jour. L'anxiété sans action s'amplifie. L'anxiété avec action se transforme en compétence.",
    source: "Condon, Boyce & Corkindale, 2004, Australian and New Zealand Journal of Psychiatry"
  },
  {
    sa: 31, theme: 'lien',
    titre: "Te visualiser avec ton bébé",
    intro: "Te projeter dans ton rôle de père avant la naissance aide à tisser le lien. Ce n'est pas de la naïveté.",
    corps: "Les recherches sur l'attachement prénatal montrent que le lien que tu tisses avec bébé pendant la grossesse (penser à lui, l'imaginer, te projeter dans des scènes concrètes : donner le bain, consoler, jouer) est associé à un lien plus fort après la naissance.\n\nCette projection n'est pas une rêverie passive. C'est une façon de te préparer.",
    conseil: "Ferme les yeux 5 minutes ce soir. Visualise-toi tenir ton bébé pour la première fois. Comment tu te sens. Ce que tu lui dis. Comment il sent. Aussi détaillé que possible.",
    source: "Condon, Corkindale, Boyce & Gamble, 2013, Journal of Reproductive and Infant Psychology"
  },
  {
    sa: 32, theme: 'couple',
    titre: "La fatigue du 3e trimestre : adapter ton soutien",
    intro: "La fatigue du 3e trimestre est différente de celle du 1er. Elle est physique, profonde, et peut être démoralisante. Ton rôle change.",
    corps: "Au 3e trimestre, la fatigue maternelle est causée par le poids de bébé, les troubles du sommeil, la pression sur les organes et la préparation physiologique à l'accouchement. Les femmes décrivent souvent une fatigue qui ne disparaît pas après une nuit de sommeil.\n\nCe qui ne fonctionne pas : minimiser (ça ira), proposer des solutions (tu devrais te reposer plus), comparer (moi aussi je suis fatigué). Ce qui fonctionne : prendre en charge sans demander.",
    conseil: "Cette semaine, prends en charge 100% des tâches ménagères. Sans en parler, sans attendre un merci. Juste faire. C'est exactement ça, le soutien pratique.",
    source: "Stapleton et al., 2012, Journal of Family Psychology"
  },
  {
    sa: 33, theme: 'peur',
    titre: "Être témoin de sa douleur",
    intro: "Un des aspects les plus difficiles de l'accouchement pour les pères : voir souffrir quelqu'un qu'on aime sans pouvoir faire cesser la douleur.",
    corps: "Des études qualitatives sur l'expérience des pères en salle de naissance identifient l'impuissance face à la douleur de leur partenaire comme l'une des émotions les plus difficiles vécues. Cette impuissance peut générer de la culpabilité, de l'anxiété, ou un retrait émotionnel.\n\nCe que disent beaucoup de mères : la présence et le calme de leur partenaire les aident à traverser la douleur et à mieux vivre l'accouchement. Ton rôle n'est pas de faire cesser la douleur. C'est d'être stable. Et ça, tu peux le faire.",
    conseil: "Répète mentalement une phrase : ma stabilité est son soutien. Pas ma solution. Pas mon intervention. Ma stabilité. Quand tu restes calme face à sa douleur, tu l'aides concrètement.",
    source: "Longworth & Kingdon, 2011, Midwifery"
  },
  {
    sa: 34, theme: 'role',
    titre: "Le plan de naissance : pourquoi et comment",
    intro: "Le plan de naissance n'est pas un document pour contrôler l'accouchement. C'est un outil de communication avec l'équipe médicale.",
    corps: "En France, la HAS encourage le projet de naissance comme un moyen d'échanger avec l'équipe sur vos souhaits, même si le déroulement de l'accouchement peut s'en écarter. Le plan de naissance n'est pas contractuel. C'est une conversation ouverte.\n\nPour toi, participer à sa rédaction aide à connaître ses souhaits et à savoir comment l'aider le jour J.",
    conseil: "Assieds-toi avec elle cette semaine pour rédiger le plan de naissance ensemble. Une page maximum. Vos souhaits sur la péridurale, le peau à peau, la césarienne d'urgence. Poser ces questions maintenant évite de les poser en urgence.",
    source: "HAS, 2005, Préparation à la naissance et à la parentalité"
  },
  {
    sa: 35, theme: 'lien',
    titre: "Le dialogue tactile avec bébé",
    intro: "Bébé réagit aux stimulations extérieures depuis plusieurs semaines. Tu peux établir un contact physique réel avec lui.",
    corps: "À 35 SA, le système tactile de bébé est pleinement fonctionnel. Des études d'observation par échographie montrent que les fœtus bougent davantage (bras, tête, bouche) quand leur mère pose doucement la main sur son ventre.\n\nCe dialogue tactile implique le système nerveux de bébé et contribue à son développement sensoriel. Et pour toi, sentir une réponse physique de bébé sous ta main est souvent l'un des moments les plus forts de la grossesse.",
    conseil: "Pose ta main sur le ventre ce soir et exerce une pression très douce, régulière. Attends. Bébé peut répondre par un coup. Si c'est le cas, réponds à ton tour par une pression légère.",
    source: "Marx & Nagy, 2015, PLoS ONE"
  },
  {
    sa: 36, theme: 'couple',
    titre: "Marquer la fin de la grossesse",
    intro: "Ces dernières semaines à deux méritent d'être vécues, pas seulement traversées en attendant que ça arrive.",
    corps: "Marquer la fin de la grossesse par un geste à deux (photo, sortie, dîner, lettre), c'est se créer un souvenir et prendre le temps de dire au revoir à cette période avant l'arrivée de bébé.\n\nDans quelques semaines, votre vie sera profondément transformée. Ce ne sera pas moins bien. Ce sera différent. Prendre un moment pour honorer ce que vous avez vécu ensemble ces 9 mois est une façon saine de clore ce chapitre avant d'en ouvrir un autre.",
    conseil: "Organisez quelque chose cette semaine. Juste pour vous deux. Un dîner, une photo, une lettre que vous ouvrirez dans un an. Pour dire : on a vécu quelque chose ensemble, et c'est précieux.",
    source: "Plantin, Olukoya & Ny, 2011, Fathering"
  },
  {
    sa: 37, theme: 'peur',
    titre: "L'hypervigilance de fin de grossesse",
    intro: "Téléphone chargé en permanence, oreille aux aguets la nuit, vérifications répétées. C'est ton instinct de protection qui s'active.",
    corps: "Ce besoin de tout vérifier est fréquent chez les futurs pères à l'approche de la naissance. Des études ont aussi observé des changements hormonaux chez les pères autour de la naissance : prolactine plus élevée en fin de grossesse, testostérone plus basse juste avant et après la naissance.\n\nCe n'est pas de l'anxiété pathologique. C'est ton cerveau qui se prépare à surveiller un être vulnérable. La même biologie qui fera que tu te lèveras à 3h du matin sans te plaindre quand bébé pleurera.",
    conseil: "Programme une alarme quotidienne pour vérifier que ton téléphone est chargé et que le numéro de la maternité est accessible. Ce type de préparation rituelle transforme l'hypervigilance diffuse en préparation concrète.",
    source: "Condon, Boyce & Corkindale, 2004, Australian and New Zealand Journal of Psychiatry"
  },
  {
    sa: 38, theme: 'role',
    titre: "Tu es prêt, même si tu ne le sens pas",
    intro: "Le sentiment de ne pas être prêt est universel chez les futurs pères à quelques semaines de la naissance. Et il est trompeur.",
    corps: "Se sentir peu préparé à quelques semaines de la naissance est l'un des constats les plus fréquents des études sur le passage à la parentalité. Ce sentiment ne dit rien du père que tu seras. Il montre surtout que tu mesures ce qui t'attend.\n\nLa préparation se mesure à ce que tu as fait, pas à ce que tu ressens. Si tu as lu sur la grossesse, accompagné aux RDV, préparé la valise, appris les signes du travail : tu es prêt. Le reste viendra avec bébé.",
    conseil: "Fais la liste de tout ce que tu as appris et préparé ces 9 mois. Elle sera plus longue que tu ne le penses. Tu es plus prêt que tu ne le crois.",
    source: "Deave, Johnson & Ingram, 2008, BMC Pregnancy and Childbirth"
  },
  {
    sa: 39, theme: 'couple',
    titre: "L'attente : la vivre à deux",
    intro: "La DPA n'est qu'une estimation : bébé peut arriver avant, pile à la date, ou un peu après. L'attente est une épreuve. Pour elle surtout. Et pour vous deux.",
    corps: "L'attente de la naissance dans les dernières semaines est documentée comme une période de stress spécifique pour les deux parents. Pour les pères, l'anxiété prend souvent la forme de l'hypervigilance et du sentiment d'impuissance face à quelque chose qu'on ne peut pas contrôler.\n\nCe qui aide : maintenir une vie active, continuer les activités normales, éviter de rester à la maison à surveiller chaque symptôme. L'action est le meilleur antidote à l'attente.",
    conseil: "Propose une sortie douce chaque jour. Marche, cinéma, restaurant. Ne dis pas ça va venir. Propose : on sort ? L'action est le meilleur antidote à l'attente.",
    source: "Condon, Boyce & Corkindale, 2004, Australian and New Zealand Journal of Psychiatry"
  },
  {
    sa: 40, theme: 'role',
    titre: "Ta présence compte",
    intro: "Le jour de l'accouchement, tu n'as pas à tout gérer. Tu as à être là.",
    corps: "Les recherches de Marshall Klaus et John Kennell sur le soutien pendant l'accouchement sont parmi les plus citées en périnatalité. Leurs études portaient sur les doulas, des accompagnantes formées. Une grande synthèse des études confirme qu'un soutien continu pendant l'accouchement raccourcit un peu le travail, diminue un peu le recours aux antalgiques et améliore le vécu de la naissance. Le soutien d'un proche choisi, comme toi, aide surtout la future maman à mieux vivre ce moment.\n\nTon rôle n'est pas médical. Il n'est pas logistique non plus. Il est de rester calme, d'être physiquement présent, de regarder ta partenaire dans les yeux quand c'est difficile. Ce regard, cette présence l'aident à se sentir en sécurité.",
    conseil: "Répète mentalement cette phrase jusqu'à la naissance : mon rôle est d'être là. Pas de tout gérer. Pas de tout savoir. Juste d'être là. C'est suffisant. C'est même beaucoup.",
    source: "Klaus, Kennell & Klaus, 1993, Mothering the Mother. Bohren et al., 2017, Cochrane"
  },
  {
    sa: 41, theme: 'role',
    titre: "Le terme est là : tenir ensemble",
    intro: "Bébé n'est pas encore là. L'impatience, l'anxiété et la fatigue sont à leur maximum. Pour elle. Et pour toi.",
    corps: "Le post-terme est documenté comme l'une des périodes les plus difficiles psychologiquement de la grossesse pour les deux parents. Pour les pères, cette période révèle souvent un sentiment d'impuissance intense : tu ne peux rien faire pour accélérer les choses, et tu vois ta partenaire épuisée et anxieuse.\n\nDans ces jours d'attente, ce qui compte le plus n'est pas forcément ce que tu dis ou fais, mais ta capacité à rester calme. Ta régulation émotionnelle devient un ancrage pour elle. Elle lit tes réactions. Si tu restes calme, son système nerveux peut se calmer aussi.",
    conseil: "Arrête de parler de l'accouchement. Propose une sortie, un film, un dîner. Fais-lui vivre une journée normale. C'est le plus grand cadeau que tu puisses lui faire en ce moment.",
    source: "Steen, Downe, Bamford & Edozien, 2012, Midwifery"
  },
];

export default function PsychoPage({ C: propC, saReelle }: any) {
  const Cs = {
    dark:'#1e2535', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#C9D8C4',
    white:'#ffffff', border:'#f0ede8', muted:'#9aa0a8', cream:'#F6F1E9',
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
    <div style={{display:'flex',flexDirection:'column',gap:'16px',fontFamily:'inherit'}}>

      <div style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)',borderRadius:'20px',padding:'22px 24px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-30px',right:'-30px',width:'150px',height:'150px',borderRadius:'50%',background:'radial-gradient(circle,rgba(157,176,154,0.18) 0%,transparent 65%)',pointerEvents:'none'}}></div>
        <p style={{color:'#C9D8C4',fontSize:'11px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Psychologie du papa</p>
        <h2 style={{color:Cs.white,fontSize:'22px',fontWeight:800,margin:'0 0 8px',lineHeight:1.3}}>Cette semaine, une info pour toi</h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',margin:0}}>Pour te guider, te rassurer, t'impliquer.</p>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap' as const}}>
        <span style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)',color:Cs.white,fontSize:'12px',fontWeight:800,padding:'6px 14px',borderRadius:'20px'}}>SA {semaine.sa}</span>
        <span style={{background:tc.bg,color:tc.tc,fontSize:'12px',fontWeight:700,padding:'6px 14px',borderRadius:'20px'}}>{themeLabel[semaine.theme]}</span>
      </div>

      <div style={{background:tc.bg,borderRadius:'20px',padding:'28px'}}>
        <h3 style={{color:Cs.dark,fontSize:'18px',fontWeight:800,margin:'0 0 14px',lineHeight:1.3}}>{semaine.titre}</h3>
        <p style={{color:tc.tc,fontSize:'14px',fontWeight:600,lineHeight:1.7,margin:0}}>{semaine.intro}</p>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
        {paragraphes.map((para, i) => (
          <p key={i} style={{color:Cs.dark,fontSize:'14px',lineHeight:1.75,margin:0}}>{para}</p>
        ))}
      </div>

      <div style={{background:'linear-gradient(135deg,#0a1f32,#1A3D5C)',borderRadius:'20px',padding:'22px 24px'}}>
        <p style={{color:Cs.gold,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Cette semaine</p>
        <p style={{color:Cs.white,fontSize:'16px',fontWeight:600,lineHeight:1.7,margin:0}}>{semaine.conseil}</p>
      </div>

      <div style={{background:Cs.cream,borderRadius:'20px',padding:'22px 24px',textAlign:'center' as const,border:`1px solid ${Cs.border}`}}>
        <p style={{color:Cs.dark,fontSize:'16px',fontWeight:700,margin:'0 0 6px'}}>Tu traverses quelque chose de difficile ?</p>
        <p style={{color:Cs.muted,fontSize:'14px',margin:'0 0 16px',lineHeight:1.6}}>Un psychologue périnatal peut t'aider. C'est fait pour ça.</p>
        <a
          href="https://www.doctolib.fr/psychologue"
          target="_blank"
          rel="noopener noreferrer"
          style={{display:'inline-block',background:'linear-gradient(135deg,#0a1f32,#1A3D5C)',color:Cs.white,padding:'12px 24px',borderRadius:'32px',fontSize:'14px',fontWeight:800,textDecoration:'none'}}
        >
          Trouver un soutien sur Doctolib
        </a>
      </div>


      {/* MENTION MÉDICALE */}
      <div style={{ background: 'rgba(200,232,255,0.3)', borderRadius: '12px', padding: '14px 16px', border: '1px solid rgba(46,95,138,0.15)', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
        <span style={{ fontSize: '16px', flexShrink: 0, color: '#1A3D5C' }}>⚕️</span>
        <p style={{ color: '#1A3D5C', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
          DadUp ne remplace pas l&apos;avis d&apos;un médecin. En cas de doute, appelle ta sage-femme ou ton médecin.
        </p>
      </div>

    </div>
  );
}
