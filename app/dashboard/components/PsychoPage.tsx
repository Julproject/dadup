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
    titre: `L'annonce. Et le choc qui va avec.`,
    intro: `Tu viens d'apprendre que tu vas etre pere. Et la premiere reaction n'est peut-etre pas celle que tu attendais.`,
    corps: `C'est normal. Des etudes menees sur plusieurs milliers de futurs peres montrent que plus de 80% d'entre eux ressentent un melange de joie et de peur a l'annonce de la grossesse. Ce n'est pas un manque d'amour. C'est ton cerveau qui realise que ta vie va changer profondement.\n\nCette ambivalence est une reaction saine. Les peres qui nient toute peur au depart sont souvent ceux qui la ressentent plus fort plus tard, quand l'accouchement approche. Accueillir cette emotion maintenant, c'est mieux la traverser.`,
    conseil: `Dis-lui ce que tu ressens. Pas pour qu'elle te rassure, mais parce que partager ce moment cree une intimite que vous n'aurez plus jamais de la meme facon.`,
    source: `Genesoni & Tallandini, 2009 - Human Reproduction Update`
  },
  {
    sa: 4, theme: 'couple',
    titre: `Le secret a deux. Profitez-en.`,
    intro: `Avant d'annoncer la grossesse a tout le monde, il y a cette periode unique ou vous etes les seuls a savoir.`,
    corps: `Cette periode de secret, souvent quelques semaines, est l'une des plus intimes d'une relation. Les couples qui la vivent consciemment en gardent un souvenir fort. Ce n'est pas juste une question de prudence medicale avant 12 SA. C'est un espace de complicite rare.\n\nLes recherches sur la transition vers la parentalite montrent que les couples qui prennent le temps de "digerer" la nouvelle ensemble avant de la partager vivent mieux les premieres semaines de grossesse. Ils sont plus alignes, moins influences par les opinions exterieures.`,
    conseil: `Creez un rituel a deux pour marquer ce moment. Un diner, une sortie, une photo. Quelque chose qui appartient rien qu'a vous.`,
    source: `Plantin, Olukoya & Ny, 2011 - Journal of Men's Health`
  },
  {
    sa: 5, theme: 'peur',
    titre: `La couvade : quand ton corps reagit aussi.`,
    intro: `Tu as peut-etre des nausees, des maux de dos ou une fatigue inexpliquee. Tu n'es pas malade. Tu fais de la couvade.`,
    corps: `Le syndrome de couvade est documente depuis des decennies. Entre 25% et 65% des futurs peres ressentent des symptomes physiques pendant la grossesse de leur partenaire : nausees, prise de poids, douleurs abdominales, fatigue. Ce n'est pas psychosomatique au sens pejoratif du terme. C'est neurologique.\n\nLes recherches suggerent que ces symptomes sont lies aux fluctuations hormonales des peres pendant la grossesse. Le taux de prolactine (hormone impliquee dans le lien parent-enfant) augmente chez les futurs peres. Ton corps se prepare a son role, a sa facon.`,
    conseil: `Ne te moque pas de tes propres symptomes. Ils signalent que ton systeme nerveux est engage dans ce qui se passe. C'est un signe d'implication, pas de fragilite.`,
    source: `Brennan, Marshall-Lucette, Ayers & Ahmed, 2007 - Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 6, theme: 'role',
    titre: `Prendre le relais en cuisine. Sans attendre.`,
    intro: `Les nausees de ta partenaire peuvent rendre la cuisine impossible. C'est le moment ou ton role pratique devient essentiel.`,
    corps: `Les nausees gravidiques touchent 70 a 85% des femmes enceintes et sont souvent les plus intenses entre 6 et 10 SA. Elles sont causees par la montee brutale de l'hormone hCG. Elles ne sont pas dans la tete, elles ne sont pas exagerees, et elles peuvent etre epuisantes.\n\nLes recherches sur le soutien paternel en grossesse montrent que les gestes pratiques et anticipes, ceux que le pere fait sans attendre qu'on lui demande, ont un impact direct sur le stress maternel. Ce n'est pas juste de l'aide. C'est un signal fort : je suis la, je vois ce que tu traverses.`,
    conseil: `Fais les courses. Prepare des repas froids ou tieides (les odeurs chaudes sont souvent les pires). Evite de cuisiner du poisson ou des oeufs. Ces petites adaptations font une difference reelle.`,
    source: `Sante Publique France, 2021 - Grossesse et role du conjoint`
  },
  {
    sa: 7, theme: 'couple',
    titre: `Ecouter sans resoudre. Ca s'apprend.`,
    intro: `Elle parle de ses peurs, de son inconfort, de ses angoisses. Et toi, tu cherches instinctivement a trouver une solution.`,
    corps: `C'est un reflexe bien documente. Les hommes tendent a repondre aux problemes par des solutions. Mais pendant la grossesse, ce que ta partenaire cherche souvent, c'est d'etre entendue, pas corrigee.\n\nLes travaux de John Gottman sur les couples montrent que la capacite a repondre a l'emotionnel par l'emotionnel est l'un des predicteurs les plus forts de la satisfaction conjugale apres la naissance d'un enfant. Les couples ou le pere repondait d'abord a l'emotion avant de proposer des solutions avaient une meilleure satisfaction conjugale deux ans apres la naissance.`,
    conseil: `Ce soir, quand elle parle de quelque chose de difficile, commence par dire : je comprends que c'est dur. Pas de solution. Juste ca. Et observe ce qui se passe dans la conversation.`,
    source: `Gottman & Gottman, 2007 - And Baby Makes Three`
  },
  {
    sa: 8, theme: 'lien',
    titre: `Ton bebe t'entend deja. Vraiment.`,
    intro: `A 8 SA, l'oreille interne de bebe commence a se former. Dans quelques semaines, il percevra les sons. Ta voix sera l'une des premieres qu'il reconnait.`,
    corps: `Le systeme auditif fotal est fonctionnel vers 16 a 18 SA. Mais la preparation neurologique commence bien avant. Les voix masculines, plus graves, traversent mieux le liquide amniotique que les voix aigues. C'est pour ca que ta voix est particulierement bien percue par bebe in utero.\n\nUne experience fondatrice de DeCasper et Fifer (1980) a montre que des nouveau-nes de quelques heures preferaient la voix de leur mere a celle d'autres femmes, preuve qu'ils avaient memorise cette voix in utero. Des etudes ulterieures ont etendu ce resultat aux voix paternelles entendues regulierement. Si tu lui parles regulierement d'ici la naissance, il tournera la tete vers ta voix dans les premieres heures de sa vie.`,
    conseil: `Commence maintenant, meme si c'est tot. Pose ta main sur le ventre le soir et parle-lui 5 minutes. Dis-lui ton prenom, ce que tu fais, ce que tu ressens. La regularite compte plus que le contenu.`,
    source: `DeCasper & Fifer, 1980 - Science`
  },
  {
    sa: 9, theme: 'peur',
    titre: `La peur de la fausse couche. Comment la porter.`,
    intro: `Entre 10 et 20% des grossesses se terminent par une fausse couche au 1er trimestre. Cette statistique est dans la tete de beaucoup de peres, meme s'ils n'en parlent pas.`,
    corps: `Les peres portent souvent cette peur en silence, pour ne pas inquieter leur partenaire. C'est une forme de protection qui a un cout. Les etudes sur la sante mentale paternelle pendant la grossesse montrent que les peres qui n'ont pas d'espace pour exprimer leurs peurs presentent plus de symptomes anxieux en post-partum.\n\nPorter seul une peur n'est pas une forme de force. C'est une forme d'isolement. Ta partenaire porte probablement la meme peur. En parler ensemble ne l'amplifie pas. Ca la partage. Et ce qui est partage est moins lourd.`,
    conseil: `Si la peur de la fausse couche est presente pour toi, parles-en a ta partenaire. Pas pour resoudre. Juste pour dire : moi aussi, j'ai peur. Et on traverse ca ensemble.`,
    source: `Franche & Mikail, 2001 - Health Psychology`
  },
  {
    sa: 10, theme: 'role',
    titre: `Le premier RDV medical. Ton role n'est pas d'etre spectateur.`,
    intro: `La premiere consultation medicale approche. Beaucoup de peres y vont sans savoir quoi faire. Voila ce qui change tout.`,
    corps: `Dans les etudes sur l'experience des peres lors des consultations prenatales, le sentiment d'etre un "tiers" plutot qu'un participant actif est l'un des plus frequemment rapportes. Les peres qui arrivent avec des questions preparees se sentent significativement plus impliques et plus competents dans leur role.\n\nLa sage-femme ou le medecin peut aussi s'adresser principalement a ta partenaire. C'est ton role de poser des questions, de prendre des notes, et de t'assurer de comprendre ce qui se passe. Tu n'es pas la pour porter le manteau.`,
    conseil: `Avant le RDV, prepare 3 questions que tu veux poser. Ecris-les. Prends des notes pendant la consultation. Ce role actif change completement la facon dont tu vis ces rendez-vous.`,
    source: `Steen, Downe, Bamford & Edozien, 2012 - European Journal of Obstetrics & Gynecology`
  },
  {
    sa: 11, theme: 'couple',
    titre: `Son corps change. Ton regard compte enormement.`,
    intro: `Le ventre commence a s'arrondir. La peau change. Elle observe son corps se transformer et regarde ta reaction.`,
    corps: `Les femmes enceintes rapportent que le regard de leur partenaire sur leur corps en transformation est l'un des facteurs les plus importants de leur bien-etre emotionnel pendant la grossesse. Une etude de Darvill, Skirton et Farrand (2010) aupres de 100 femmes enceintes montre que le soutien corporel du partenaire (pas seulement verbal mais physique : toucher, regard) est un predicteur independant de l'estime de soi maternelle.\n\nCe n'est pas de la coquetterie. C'est de la psychologie de l'attachement. Ton regard est un miroir. Ce qu'elle voit dans tes yeux quand elle se regarde, c'est ce qu'elle pense d'elle-meme.`,
    conseil: `Ne fais aucun commentaire sur son corps, meme positif du genre tu es belle pour une femme enceinte. Dis simplement : tu es belle. Point. La nuance est importante.`,
    source: `Darvill, Skirton & Farrand, 2010 - Midwifery`
  },
  {
    sa: 12, theme: 'peur',
    titre: `Le cap des 12 SA. Souffler un peu.`,
    intro: `Apres 12 semaines, le risque de fausse couche chute a moins de 2%. C'est un cap medical et psychologique majeur.`,
    corps: `Beaucoup de futurs peres portent silencieusement l'angoisse d'une fausse couche pendant tout le premier trimestre. Ils ne l'expriment pas pour ne pas inquieter leur partenaire. Mais cette angoisse retenue a un cout. Les etudes sur la sante mentale paternelle montrent que les peres qui n'ont pas d'espace pour exprimer leurs peurs presentent plus de symptomes anxieux en post-partum.\n\nPasse 12 SA, la solidite de la grossesse est statistiquement etablie. Autoriser le soulagement est sain. Le nier par superstition ne protege personne.`,
    conseil: `Parlez de ce que vous avez traverse ensemble ce premier trimestre. Meme si tout s'est bien passe, ces semaines ont ete chargees emotionnellement. Nommer ca ensemble, c'est en sortir ensemble.`,
    source: `Franche & Mikail, 2001 - Health Psychology`
  },
  {
    sa: 13, theme: 'couple',
    titre: `Le 2e trimestre. La fenetre du couple.`,
    intro: `Les nausees s'estompent souvent. L'energie peut revenir. C'est souvent une meilleure periode pour le couple, mais chaque grossesse est differente.`,
    corps: `Le 2e trimestre est souvent documente comme la periode de la grossesse ou le bien-etre maternel est generalement meilleur. Les nausees diminuent pour beaucoup, la fatigue s'allege, le ventre n'est pas encore contraignant. Mais pas pour toutes. Certaines femmes restent fatiguees ou inconfortables.\n\nPour les couples, c'est une fenetre potentiellement precieuse. Les recherches de Paul Ramchandani a l'Universite de Cambridge montrent que la qualite de la relation de couple pendant la grossesse predit directement la qualite du co-parentage apres la naissance. Ce que vous construisez maintenant a des effets reels plus tard.`,
    conseil: `Propose quelque chose cette semaine. Un diner, une sortie, une activite. Demande-lui d'abord comment elle se sent. Si elle en a l'energie, profitez-en. Si elle est encore fatiguee, continue a prendre le relais.`,
    source: `Ramchandani, Stein, Evans & O'Connor, 2005 - Lancet`
  },
  {
    sa: 14, theme: 'lien',
    titre: `La musique que bebe reconnaitra a la naissance.`,
    intro: `Bebe commence a percevoir les sons. Ce que vous ecoutez maintenant, il pourra le reconnaitre apres sa naissance.`,
    corps: `Une etude publiee dans la revue Infant Behavior and Development a montre que des nouveau-nes exposes regulierement a une melodie specifique in utero presentaient des reponses comportementales differentes a cette melodie apres la naissance comparé a des melodies inconnues.\n\nCe n'est pas une memorisation consciente. C'est une familiarisation neurologique. Les sons entendus regulierement creent des traces dans le systeme auditif en developpement. Ces traces persistent apres la naissance et jouent un role dans la regulation emotionnelle du nourrisson.`,
    conseil: `Choisissez une chanson ou une musique que vous aimez tous les deux. Passez-la regulierement. Apres la naissance, si bebe s'agite, essayez cette musique. Elle pourrait l'apaiser.`,
    source: `Hepper, 1991 - Infant Behavior and Development`
  },
  {
    sa: 15, theme: 'role',
    titre: `Se former pendant la grossesse change tout apres.`,
    intro: `Les peres qui se preparent activement pendant la grossesse se sentent beaucoup plus confiants et impliques apres la naissance.`,
    corps: `Une etude longitudinale menee sur 3 ans aupres de 622 couples a compare les peres qui s'etaient formes pendant la grossesse (lectures, cours, discussions avec d'autres peres) a ceux qui avaient attendu la naissance. Resultat : les peres prepares montraient des niveaux d'anxiete post-natale significativement plus bas et une plus grande satisfaction dans leur role paternel des les premieres semaines.\n\nSe former ne signifie pas devenir expert. Ca signifie reduire l'inconnu. Et l'inconnu est la principale source d'anxiete paternelle.`,
    conseil: `Lis un article cette semaine sur le developpement du nourrisson dans les 3 premiers mois. Pas pour memoriser. Juste pour que la premiere semaine avec bebe ne soit pas totalement terra incognita.`,
    source: `Deave, Johnson & Ingram, 2008 - BMC Pregnancy and Childbirth`
  },
  {
    sa: 16, theme: 'peur',
    titre: `L'angoisse financiere. Elle touche presque tous les peres.`,
    intro: `Est-ce qu'on aura assez d'argent ? Cette question tourne dans la tete de la grande majorite des futurs peres.`,
    corps: `Dans les etudes sur les preoccupations paternelles pendant la grossesse, l'angoisse financiere arrive regulierement dans le top 3, juste apres la peur de ne pas etre a la hauteur et la peur pour la sante de la mere et du bebe.\n\nCette peur est souvent disproportionnee par rapport a la realite. Les etudes montrent que les peres surestiment systematiquement le cout d'un enfant la premiere annee. Ce qui aggrave l'anxiete : ne pas avoir fait les calculs reels. Ce qui la reduit : faire un budget concret, meme approximatif.`,
    conseil: `Passe une heure ce week-end a faire un budget reel : couts fixes, aides disponibles (CAF, mutuelle, employeur), conge paternite. Les chiffres concrets sont moins effrayants que les projections floues.`,
    source: `Chin, Daiches & Hall, 2011 - Qualitative Health Research`
  },
  {
    sa: 17, theme: 'lien',
    titre: `Le premier mouvement que tu sentiras sous ta main.`,
    intro: `Vers 17-20 SA, les mouvements de bebe deviennent perceptibles de l'exterieur. C'est souvent le moment ou tout devient reel pour les peres.`,
    corps: `Pour beaucoup de peres, le moment ou ils sentent bebe bouger sous leur main est le premier moment ou la grossesse devient reelle, concrete, indeniable. Avant, c'est une echo, une prise de sang, un ventre qui s'arrondit. Mais sentir un mouvement sous sa paume, c'est autre chose.\n\nDes recherches sur l'attachement prenatal paternel montrent que ce contact physique est l'un des declencheurs les plus puissants du processus d'attachement chez les peres. Les peres qui ont eu un contact physique regulier avec le ventre de leur partenaire developpent un attachement plus fort apres la naissance. Source : Condon 1993.`,
    conseil: `Pose ta main sur le ventre ce soir apres le diner, quand bebe est souvent actif. Attends. Si tu ne sens rien, reviens demain. Note dans ton telephone le jour et l'heure ou tu sens le premier mouvement.`,
    source: `Condon, 1993 - Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 18, theme: 'couple',
    titre: `Le mal de dos. Ce que tu peux faire concretement.`,
    intro: `Les douleurs lombaires touchent 60 a 70% des femmes enceintes au 2e trimestre. Ce n'est pas une fatalite. Tu peux aider.`,
    corps: `Le mal de dos pendant la grossesse est cause par le changement de centre de gravite, la relaxine (hormone qui assouplit les ligaments) et le poids croissant de l'uterus. Il s'intensifie en general au 3e trimestre.\n\nLes interventions les plus efficaces documentees : le massage du dos par le partenaire (reduction de la douleur de 30% dans certaines etudes), la natation ou le yoga prenatal, le coussin de grossesse pour la nuit. Ce que tu peux faire : apprendre une technique de massage simple et l'appliquer regulierement. Pas comme un service. Comme un rituel.`,
    conseil: `Regarde une video de massage du dos prenatal ce soir (10 minutes sur YouTube). Puis applique-la. Ce n'est pas complique. C'est utile, concret, et ca cree de la connexion physique.`,
    source: `Field et al., 1999 - Journal of Psychosomatic Obstetrics`
  },
  {
    sa: 19, theme: 'peur',
    titre: `Ne pas savoir si tu seras un bon pere. La peur universelle.`,
    intro: `Est-ce que je serai a la hauteur ? Cette question, presque tous les futurs peres se la posent. Et presque aucun n'en parle.`,
    corps: `La peur de ne pas etre a la hauteur comme pere est la preoccupation la plus frequemment rapportee chez les futurs peres, tous pays et toutes cultures confondus. Elle touche aussi bien les premiers papas que les peres de plusieurs enfants.\n\nCe qui est interessant : cette peur est un signe d'implication, pas d'incompetence. Les peres qui ne se posent jamais cette question sont generalement ceux qui s'impliquent le moins. La peur est le signal que ca compte pour toi. Et les etudes montrent que les peres qui se forment et s'impliquent pendant la grossesse deviennent de bien meilleurs peres, independamment de leurs craintes initiales. Source : Deave et al. 2008.`,
    conseil: `Ecris une liste de 5 choses que tu veux faire differemment de ton propre pere, et 5 choses que tu veux garder. Cet exercice simple clarifie ce que tu veux vraiment comme type de pere.`,
    source: `Draper, 2003 - Sociology of Health & Illness`
  },
  {
    sa: 20, theme: 'role',
    titre: `L'echo T2. Le RDV le plus important de la grossesse.`,
    intro: `L'echographie morphologique du 2e trimestre est la plus complete de la grossesse. Ton role n'est pas d'etre assis dans un coin.`,
    corps: `L'echo T2 examine plus de 100 criteres anatomiques. C'est la seule echo qui peut detecter la grande majorite des malformations. Elle dure 45 minutes a 1 heure. Pour les peres, c'est souvent le moment ou bebe devient le plus reel : on voit son visage, ses mains, son coeur qui bat.\n\nDes etudes sur l'experience des peres lors de l'echo T2 montrent que ceux qui arrivent avec des questions preparees vivent le rendez-vous de facon significativement plus positive et se sentent plus impliques dans la grossesse dans les semaines suivantes. Source : Ekelin et al. 2004.`,
    conseil: `Prepare 3 questions avant l'echo. Discutez ensemble si vous souhaitez connaitre le sexe. Si des resultats inattendus apparaissent, ta premiere reaction sera vue et ressentie par ta partenaire. Reste calme.`,
    source: `Ekelin, Crang-Svalenius & Dykes, 2004 - Midwifery`
  },
  {
    sa: 21, theme: 'lien',
    titre: `Bebe memorise ta voix. Deja.`,
    intro: `Il ne s'agit plus de theorie. Bebe entend, et il enregistre.`,
    corps: `A 21 SA, l'audition foetale est fonctionnelle. Les sons exterieurs sont percus avec moins d'intensite qu'apres la naissance, mais les frequences basses (comme les voix masculines) passent particulierement bien. Si tu lui parles regulierement d'ici la naissance, il tournera la tete vers ta voix dans les premieres heures de sa vie.\n\nUne experience classique de DeCasper et Fifer (1980) a montre que des nouveau-nes de quelques heures preferaient la voix de leur mere a celle d'autres femmes. Des etudes ulterieures ont etendu ce resultat aux voix paternelles entendues regulierement in utero.`,
    conseil: `Fixe un moment chaque soir, meme 5 minutes. Parle-lui de ta journee, dis-lui ton prenom, lis quelques lignes a voix haute. La regularite compte plus que le contenu.`,
    source: `DeCasper & Fifer, 1980 - Science`
  },
  {
    sa: 22, theme: 'couple',
    titre: `Planifier ensemble reduit le stress a deux.`,
    intro: `Les conversations sur l'organisation pratique apres la naissance ne sont pas romantiques. Mais elles sont protectrices.`,
    corps: `Une etude menee sur 218 couples suivis pendant et apres la grossesse montre que ceux qui avaient eu des conversations explicites sur la repartition des taches, le conge parental et l'organisation de la vie apres la naissance vivaient une transition post-natale significativement moins conflictuelle.\n\nCes conversations sont difficiles car elles touchent a des sujets qui peuvent reveler des desaccords. Mais les desaccords non dits maintenant deviennent des conflits a 3h du matin avec un nourrisson qui pleure.`,
    conseil: `Planifiez une reunion de projet bebe cette semaine. 30 minutes. Conge paternite, organisation des nuits, qui appelle qui quand il y a un probleme. C'est moins romantique qu'un diner. C'est plus utile.`,
    source: `Fagerskiold, 2008 - Scandinavian Journal of Caring Sciences`
  },
  {
    sa: 23, theme: 'peur',
    titre: `L'insomnie paternelle. Elle existe vraiment.`,
    intro: `Tu n'arrives pas a dormir. Tu fais des scenarios catastrophes la nuit. Tu n'es pas seul.`,
    corps: `L'insomnie prenatale touche aussi les peres. Des etudes sur la sante mentale des futurs peres montrent que les troubles du sommeil, l'hypervigilance nocturne et les pensees intrusives (et si quelque chose se passait mal ?) sont des symptomes courants au 2e et 3e trimestre, surtout chez les peres tres impliques.\n\nCes insomnies sont une manifestation d'hypervigilance protectrice. Ton cerveau se prepare a surveiller un etre vulnerable. C'est un instinct, pas un trouble. Mais il merite d'etre pris au serieux.`,
    conseil: `Si l'insomnie est reguliere, parles-en avec ta partenaire ou ton medecin. Une activite physique en journee, limiter les ecrans le soir, et une routine de coucher aident significativement.`,
    source: `Condon, Boyce & Corkindale, 2004 - Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 24, theme: 'role',
    titre: `Connaitre la maternite avant le jour J.`,
    intro: `Visiter la maternite avant l'accouchement reduit l'anxiete des deux parents de facon mesurable.`,
    corps: `Des etudes sur la preparation a l'accouchement montrent que les couples qui ont visite leur maternite et qui connaissent les lieux (acces, urgences obstetricales, parking, chemin vers la salle de naissance) vivent le jour de l'accouchement avec un niveau de stress significativement plus bas.\n\nPour les peres specifiquement, ce reperage physique joue un role important. Quand le travail commence, ta mission est d'etre calme et de gerer la logistique. Connaitre les lieux te libere la tete pour etre present emotionnellement.`,
    conseil: `Appelle ta maternite pour organiser une visite guidee. Repere l'entree des urgences obstetricales (souvent differente de l'entree principale). Teste le trajet aux heures de pointe.`,
    source: `Sante Publique France, 2021 - Guide de la naissance`
  },
  {
    sa: 25, theme: 'couple',
    titre: `Les nuits difficiles. Etre la sans rien dire.`,
    intro: `Elle peut se lever a 3h du matin, incapable de dormir. Ce que tu fais dans ces moments compte plus que tu ne le penses.`,
    corps: `L'insomnie de fin de grossesse touche la majorite des femmes enceintes. Elle est causee par la pression physique de l'uterus, les mouvements de bebe, l'anxiete anticipatoire et les changements hormonaux. Elle n'est pas un signe que quelque chose va mal.\n\nCe qui compte pour ta partenaire dans ces moments, ce n'est pas que tu aies une solution. C'est que tu sois la. Les etudes sur le soutien conjugal prenatal montrent que la simple presence physique du partenaire pendant les episodes d'insomnie reduit les niveaux de cortisol mesures chez la femme enceinte.`,
    conseil: `Si elle se leve la nuit, leve-toi avec elle. Ne propose rien. Ne cherche pas a resoudre. Juste : tu veux qu'on s'assoie un peu ? Ta presence calme vaut tous les conseils.`,
    source: `Beydoun & Saftlas, 2008 - Paediatric and Perinatal Epidemiology`
  },
  {
    sa: 26, theme: 'lien',
    titre: `Bebe reagit a ta voix. Pour de vrai.`,
    intro: `A 26 SA, bebe ouvre les yeux pour la premiere fois. Ses sens se developpent rapidement. Tu peux etablir un contact reel.`,
    corps: `Des etudes d'imagerie cerebrale fetale (IRM foetale) montrent que le cerveau de bebe a 26-28 SA presente deja des reponses differenciees aux sons familiers et aux sons inconnus. Sa voix a lui, la tienne, celle de ta partenaire, sont deja des sons "connus" s'il les a entendus regulierement.\n\nUne experience menee par Kisilevsky et al. (2003) a montre que des foetus de 33-34 SA avaient un rythme cardiaque different quand ils entendaient la voix de leur mere versus une voix inconnue. Ce n'est pas de l'imagination. C'est de la neurologie.`,
    conseil: `Ce soir, pose ta main sur le ventre et parle-lui directement. Dis ton prenom, une chose que tu attends avec impatience. Attends une reponse (un mouvement). Si ca arrive, reponds par une pression douce.`,
    source: `Kisilevsky et al., 2003 - Psychological Science`
  },
  {
    sa: 27, theme: 'peur',
    titre: `La peur de l'accouchement. Elle touche aussi les peres.`,
    intro: `La tokophobie secondaire (peur de l'accouchement chez le partenaire) est documentee et sous-estimee.`,
    corps: `Une etude britannique sur les peres en salle de naissance montre que 40% des peres presents lors de l'accouchement decrivent avoir ressenti une peur intense a un moment ou un autre. Les peurs les plus frequentes : voir leur partenaire souffrir sans pouvoir aider, perdre le controle emotionnellement, et rater quelque chose d'important.\n\nCes peurs ne disparaissent pas d'elles-memes. Ce qui les reduit : savoir a l'avance ce qui va se passer, connaitre son role precis, et avoir repete mentalement les etapes. L'inconnu est la principale source d'anxiete.`,
    conseil: `Lis le guide de l'accouchement de ta maternite cette semaine. Cherche des temoignages de peres en salle de naissance. La connaissance est le meilleur outil contre l'anxiete.`,
    source: `Longworth & Kingdon, 2011 - Midwifery`
  },
  {
    sa: 28, theme: 'role',
    titre: `La valise. Prends l'initiative.`,
    intro: `Preparer la valise de maternite sans attendre qu'elle te le demande est un signal fort. Et pratique.`,
    corps: `Dans les faits, une majorite de peres attend que leur partenaire prenne l'initiative pour la valise. Pourtant, faire cette demarche spontanement a une valeur symbolique et pratique forte.\n\nSymbolique : cela signale que tu prends la preparation a la naissance aussi au serieux qu'elle. Pratique : une naissance peut arriver plus tot que prevu. Avoir la valise prete a 32-33 SA elimine une source de stress potentielle.`,
    conseil: `Consulte la liste dans l'app. Commence a rassembler ce qui est pour toi cette semaine. Montre-lui ce que tu as fait. C'est un geste concret qui vaut tous les discours.`,
    source: `Fagerskiold, 2008 - Scandinavian Journal of Caring Sciences`
  },
  {
    sa: 29, theme: 'couple',
    titre: `Les cours de preparation. Viens vraiment.`,
    intro: `Les cours de preparation a la naissance ne sont pas reserves aux meres. Ta presence change l'experience.`,
    corps: `Une etude suedoise portant sur 1 015 couples montre que les peres qui participent aux cours de preparation a la naissance presentent des niveaux d'anxiete pre-accouchement significativement plus bas et se sentent plus efficaces dans leur role pendant le travail.\n\nDes cours specifiques aux peres existent dans de nombreuses maternites. Ils abordent des sujets que les cours mixtes n'ont pas le temps de traiter : comment gerer son propre stress, comment soutenir sans etre envahissant.`,
    conseil: `Appelle ta maternite et demande s'il existe des seances specifiques aux peres. Si non, va aux cours mixtes et pose des questions. Poser des questions n'est pas une faiblesse.`,
    source: `Svensson, Barclay & Cooke, 2009 - Journal of Perinatal Education`
  },
  {
    sa: 30, theme: 'peur',
    titre: `L'anxiete du 3e trimestre. Son pic, et comment le traverser.`,
    intro: `Le 3e trimestre est souvent le moment ou l'anxiete des peres culmine. C'est documente. Et ca se travaille.`,
    corps: `Des etudes longitudinales suivant les peres tout au long de la grossesse montrent un pic d'anxiete au 3e trimestre, souvent plus intense que celui du 1er trimestre. La raison : le moment devient reel. La date approche. Les preparations pratiques revelent ce qui n'est pas encore fait.\n\nCe qui aide : l'action. Chaque etape de preparation concrete accomplie reduit measurablement le niveau d'anxiete. Ton cerveau gere mieux ce qu'il peut controler.`,
    conseil: `Fais une liste de tout ce qui n'est pas encore prepare. Classe par urgence. Accomplis une chose par jour. L'anxiete sans action s'amplifie. L'anxiete avec action se transforme en competence.`,
    source: `Condon, Boyce & Corkindale, 2004 - Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 31, theme: 'lien',
    titre: `Te visualiser avec ton bebe. Ca change les choses.`,
    intro: `Se projeter mentalement dans le role de pere avant la naissance renforce l'attachement apres. Ce n'est pas de la naivete.`,
    corps: `Des recherches sur les representations mentales prenatales des peres montrent que les peres qui se visualisent activement avec leur bebe pendant la grossesse (qui imaginent des scenes concretes : donner le bain, consoler, jouer) developpent un attachement paternel plus fort apres la naissance et s'adaptent plus vite au role parental.\n\nCette visualisation n'est pas une reverie passive. C'est une preparation mentale. Ton cerveau ne distingue pas completement l'imagine du vecu.`,
    conseil: `Ferme les yeux 5 minutes ce soir. Visualise-toi tenir ton bebe pour la premiere fois. Comment tu te sens. Ce que tu lui dis. Comment il sent. Aussi detaille que possible.`,
    source: `Brandon et al., 2009 - Infant Mental Health Journal`
  },
  {
    sa: 32, theme: 'couple',
    titre: `La fatigue du 3e trimestre. Adapter son soutien.`,
    intro: `La fatigue du 3e trimestre est differente de celle du 1er. Elle est physique, profonde, et peut etre demoralisante. Ton role change.`,
    corps: `Au 3e trimestre, la fatigue maternelle est causee par le poids de bebe, les troubles du sommeil, la pression sur les organes et la preparation physiologique a l'accouchement. Les femmes decrivent souvent une fatigue qui ne disparait pas apres une nuit de sommeil.\n\nCe qui ne fonctionne pas : minimiser (ca ira), proposer des solutions (tu devrais te reposer plus), comparer (moi aussi je suis fatigue. Ce qui fonctionne : prendre en charge sans demander.`,
    conseil: `Cette semaine, prends en charge 100% des taches menageres. Sans en parler, sans attendre un merci. Juste faire. C'est exactement ca, le soutien pratique.`,
    source: `Stapleton, Schetter, Westling, Rini & Glynn, 2012 - American Journal of Obstetrics and Gynecology`
  },
  {
    sa: 33, theme: 'peur',
    titre: `Etre temoins de la douleur. Ce que ca fait aux peres.`,
    intro: `Un des aspects les plus difficiles de l'accouchement pour les peres : voir souffrir quelqu'un qu'on aime sans pouvoir faire cesser la douleur.`,
    corps: `Des etudes qualitatives sur l'experience des peres en salle de naissance identifient l'impuissance face a la douleur de leur partenaire comme l'une des emotions les plus difficiles vecues. Cette impuissance peut generer de la culpabilite, de l'anxiete, ou un retrait emotionnel.\n\nCe que les recherches montrent : la presence physique et la stabilite emotionnelle du pere ont un effet reel sur la perception de la douleur par la mere. Ton role n'est pas de faire cesser la douleur. C'est d'etre stable. Et ca, tu peux le faire.`,
    conseil: `Repete mentalement une phrase : ma stabilite est son soutien. Pas ma solution. Pas mon intervention. Ma stabilite. Quand tu restes calme face a sa douleur, tu l'aides concretement.`,
    source: `Longworth & Kingdon, 2011 - Midwifery`
  },
  {
    sa: 34, theme: 'role',
    titre: `Le plan de naissance. Pourquoi et comment le faire vraiment.`,
    intro: `Le plan de naissance n'est pas un document pour controler l'accouchement. C'est un outil de communication avec l'equipe medicale.`,
    corps: `Des etudes sur les plans de naissance montrent que les couples qui en ont redige un se sentent plus entendus par l'equipe medicale, meme quand le deroulement de l'accouchement s'ecarte du plan. Le plan de naissance n'est pas contractuel. C'est une conversation ouverte.\n\nPour les peres, s'impliquer dans la redaction du plan de naissance a un effet mesurable sur leur sentiment de competence le jour J. Ca reduit l'improvisation et clarifie le role de chacun.`,
    conseil: `Assieds-toi avec elle cette semaine pour rediger le plan de naissance ensemble. Une page maximum. Vos souhaits sur la peridural, le peau a peau, la cesarienne d'urgence. Poser ces questions maintenant evite de les poser en urgence.`,
    source: `Byrne, Haase Hewson & Coad, 2014 - International Journal of Childbirth`
  },
  {
    sa: 35, theme: 'lien',
    titre: `Le dialogue tactile avec bebe.`,
    intro: `Bebe reagit aux stimulations exterieures depuis plusieurs semaines. Tu peux etablir un contact physique reel avec lui.`,
    corps: `A 35 SA, le systeme tactile de bebe est pleinement fonctionnel. Des etudes d'observation montrent que les foetus repondent a une pression douce sur le ventre par des mouvements diriges vers la source de stimulation. Ils peuvent repondre a une pression douce par un mouvement en retour.\n\nCe dialogue tactile implique le systeme nerveux de bebe et contribue a son developpement sensoriel. Et pour toi, sentir une reponse physique de bebe sous ta main est souvent l'un des moments les plus forts de la grossesse.`,
    conseil: `Pose ta main sur le ventre ce soir et exerce une pression tres douce, reguliere. Attends. Bebe peut repondre par un coup. Si c'est le cas, reponds a ton tour par une pression legere.`,
    source: `Kisilevsky et al., 2003 - Psychological Science`
  },
  {
    sa: 36, theme: 'couple',
    titre: `Marquer la fin de la grossesse. Consciemment.`,
    intro: `Ces dernieres semaines a deux meritent d'etre vecues, pas seulement traversees en attendant que ca arrive.`,
    corps: `Les couples qui marquent consciemment la fin de la grossesse, par un acte delibere (photo, sortie, diner, lettre), rapportent des souvenirs plus positifs de cette periode et une meilleure transition vers la parentalite.\n\nDans quelques semaines, votre vie sera profondement transformee. Ce ne sera pas moins bien. Ce sera different. Prendre un moment pour honorer ce que vous avez vecu ensemble ces 9 mois est une facon saine de clore ce chapitre avant d'en ouvrir un autre.`,
    conseil: `Organisez quelque chose cette semaine. Juste pour vous deux. Un diner, une photo, une lettre que vous ouvrirez dans un an. Pour dire : on a vecu quelque chose ensemble, et c'est precieux.`,
    source: `Plantin, Olukoya & Ny, 2011 - Journal of Men's Health`
  },
  {
    sa: 37, theme: 'peur',
    titre: `L'hypervigilance de fin de grossesse. Ton corps est en mode alerte.`,
    intro: `Telephone charge en permanence, oreille aux aguets la nuit, verifications repetees. C'est ton instinct de protection qui s'active.`,
    corps: `Ce comportement d'hypervigilance a ete documente chez les futurs peres dans les 3 a 4 dernieres semaines de grossesse. Il s'agit d'une montee en puissance de l'instinct de protection, correlee a des changements hormonaux chez les futurs peres (augmentation de la prolactine et de l'ocytocine, diminution de la testosterone).\n\nCe n'est pas de l'anxiete pathologique. C'est ton cerveau qui se prepare a surveiller un etre vulnerable. La meme biologie qui fera que tu te leveras a 3h du matin sans te plaindre quand bebe pleurera.`,
    conseil: `Programme une alarme quotidienne pour verifier que ton telephone est charge et que le numero de la maternite est accessible. Ce type de preparation rituelle transforme l'hypervigilance diffuse en preparation concrete.`,
    source: `Condon, Boyce & Corkindale, 2004 - Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 38, theme: 'role',
    titre: `Tu es pret. Meme si tu ne le ressens pas comme ca.`,
    intro: `Le sentiment de ne pas etre pret est universel chez les futurs peres a quelques semaines de la naissance. Et il est trompeur.`,
    corps: `Des etudes sur le sentiment de preparation paternelle montrent qu'il n'existe pas de correlation entre le sentiment subjectif d'etre pret et la qualite reelle du parentage dans les premiers mois. Les peres qui se sentent les moins prets ne sont pas les moins bons peres. Ils sont souvent les plus conscients de ce qui les attend.\n\nLa preparation se mesure a ce que tu as fait, pas a ce que tu ressens. Si tu as lu sur la grossesse, accompagne aux RDV, prepare la valise, appris les signes du travail : tu es pret. Le reste viendra avec bebe.`,
    conseil: `Fais la liste de tout ce que tu as appris et prepare ces 9 mois. Elle sera plus longue que tu ne le penses. Tu es plus pret que tu ne le crois.`,
    source: `Deave, Johnson & Ingram, 2008 - BMC Pregnancy and Childbirth`
  },
  {
    sa: 39, theme: 'couple',
    titre: `L'attente. Comment la vivre a deux.`,
    intro: `50% des accouchements ont lieu apres la DPA. L'attente est une epreuve. Pour elle surtout. Et pour vous deux.`,
    corps: `L'attente de la naissance dans les dernieres semaines est documentee comme une periode de stress specifique pour les deux parents. Pour les peres, l'anxiete prend souvent la forme de l'hypervigilance et du sentiment d'impuissance face a quelque chose qu'on ne peut pas controler.\n\nCe qui aide : maintenir une vie active, continuer les activites normales, eviter de rester a la maison a surveiller chaque symptome. L'action est le meilleur antidote a l'attente.`,
    conseil: `Propose une sortie douce chaque jour. Marche, cinema, restaurant. Ne dis pas ca va venir. Propose : on sort ? L'action est le meilleur antidote a l'attente.`,
    source: `Condon, Boyce & Corkindale, 2004 - Journal of Reproductive and Infant Psychology`
  },
  {
    sa: 40, theme: 'role',
    titre: `Ta presence, c'est tout ce dont elle a besoin.`,
    intro: `Le jour de l'accouchement, tu n'as pas a tout gerer. Tu as a etre la.`,
    corps: `Les recherches de Marshall Klaus et John Kennell sur le soutien pendant l'accouchement sont parmi les plus citees en perinatalite. Ils ont montre que la presence d'une personne de soutien non medicale reduit la duree du travail de 25%, le recours a la peridurale de 60%, et le risque de depression post-partum de facon significative.\n\nTon role n'est pas medical. Il n'est pas logistique non plus. Il est de rester calme, d'etre physiquement present, de regarder ta partenaire dans les yeux quand c'est difficile. Ce regard, cette presence, ont des effets physiologiques mesurables sur sa douleur et son stress.`,
    conseil: `Repete mentalement cette phrase jusqu'a la naissance : mon role est d'etre la. Pas de tout gerer. Pas de tout savoir. Juste d'etre la. C'est suffisant. C'est meme beaucoup.`,
    source: `Klaus, Kennell & Klaus, 1993 - Mothering the Mother`
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
    peur:   'Emotions & peurs',
    couple: 'Vie de couple',
    lien:   'Lien avec bebe',
    role:   'Role actif',
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
        <p style={{color:Cs.muted,fontSize:'13px',margin:'0 0 16px',lineHeight:1.6}}>Un psychologue perinatal peut t'aider. C'est fait pour ca.</p>
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
