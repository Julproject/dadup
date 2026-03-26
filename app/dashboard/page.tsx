'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const C = {
  dark: '#1e2535',
  gold: '#c8a060',
  cream: '#faf6f0',
  white: '#ffffff',
  border: '#e8e0d0',
  text: '#4a5568',
  textLight: '#9aa0a8',
};

const SEMAINES_DATA: Record<number, {
  emoji: string; taille: string; poids: string; objet: string;
  developpement: string; maman: string; conseil: string; savistu: string;
}> = {
  6:{emoji:'🌾',taille:'0.6 cm',poids:'< 1g',objet:'un grain de riz',developpement:"Le tube neural se ferme cette semaine — c'est la structure qui donnera naissance au cerveau et a la moelle epiniere. Le coeur commence a battre de facon primitive, autour de 100 a 120 battements par minute. Les bourgeons des membres apparaissent. Tous les organes principaux sont en cours d'initialisation.",maman:"Les nausees matinales peuvent etre intenses, parfois accompagnees de vomissements. La fatigue est souvent ecrasante, due a la progesterone. Les seins sont sensibles et gonfles. Ces symptomes, bien que difficiles a vivre, sont des signes que la grossesse evolue normalement.",conseil:"Les nausees sont reelles et physiquement epuisantes — ne les minimise pas. Prepare des en-cas legers a portee de main. Evite les odeurs fortes a la maison. Ton soutien silencieux et pratique compte enormement a ce stade.",savistu:"Le coeur de bebe bat deja a 6 SA, mais il est si petit qu'une echographie ne peut pas encore toujours le visualiser clairement. Ce sont ces premieres pulsations qui seront recherchees lors de la premiere consultation."},
  7:{emoji:'🫐',taille:'1 cm',poids:'1g',objet:'une pile bouton',developpement:"Le visage commence a se structurer : les fosses nasales, les bourgeons oculaires et les ebauches des oreilles sont visibles. Les bras et les jambes s'allongent. Le foie commence a produire des cellules sanguines. Le cerveau se developpe a un rythme impressionnant.",maman:"Les nausees atteignent souvent leur pic cette semaine. L'hypersensibilite aux odeurs peut rendre certains aliments ou environnements insupportables. Certaines femmes developpent une hypersalivation, phenomene normal mais inconfortable.",conseil:"Prends le relais en cuisine si certaines odeurs la font suffoquer. Ce n'est pas une caprice — c'est neurologique. Propose des repas simples, froids si necessaire. Etre present sans surproteger est la cle de cette periode.",savistu:"A 7 SA, les empreintes digitales de bebe commencent a se former. Elles sont deja uniques et ne changeront jamais. C'est l'une des premieres marques d'identite biologique de ton enfant."},
  8:{emoji:'🫐',taille:'1.6 cm',poids:'1g',objet:'une pile AA',developpement:"Les doigts commencent a se separer. Le cerveau se developpe si rapidement qu'il forme des plis pour augmenter sa surface. Les organes genitaux se differencient mais ne sont pas encore visibles. Tous les organes principaux sont en cours de formation.",maman:"La fatigue extreme est normale et liee a la production intense de progesterone. Des maux de tete peuvent apparaitre. L'humeur est souvent instable en raison des fluctuations hormonales.",conseil:"Prends le relais sur les taches menageres sans qu'elle ait a demander. Anticipe : faire les courses, preparer le diner, passer l'aspirateur. Ces gestes concrets la soulagent physiquement et lui montrent que tu es pleinement present.",savistu:"Le cerveau de bebe produit environ 100 nouvelles cellules nerveuses par minute a ce stade. Cette explosion neuronale est l'une des plus intenses de toute sa vie."},
  9:{emoji:'🫒',taille:'2.3 cm',poids:'2g',objet:'un bouchon de liege',developpement:"Bebe bouge mais est trop petit pour etre senti. Tous les organes principaux sont maintenant en place — les semaines suivantes serviront a les perfectionner. Le foetus peut sucer son pouce. Les dents de lait commencent a se former sous les gencives.",maman:"Les sautes d'humeur sont frequentes et intenses, directement liees aux hormones. Certaines femmes ressentent une anxiete accrue. Le ventre n'est pas encore visible mais les vetements peuvent commencer a serrer.",conseil:"Les sautes d'humeur ne sont pas dirigees contre toi — elles sont biochimiques. Accueille-les avec calme. Ne prends pas la defense, ne te justifie pas : ecoute. Ta stabilite emotionnelle est un ancrage precieux.",savistu:"A SA 9, le coeur de bebe bat a environ 170 battements par minute — soit deux fois plus vite que le tien. Ce rythme eleve est normal et signe d'un developpement cardiaque sain."},
  10:{emoji:'🍓',taille:'3 cm',poids:'4g',objet:'une balle de ping-pong',developpement:"Les ongles apparaissent. Bebe peut faire des petits mouvements spontanes visibles a l'echographie. Le foetus est maintenant officiellement appele foetus — la periode embryonnaire est terminee. Les organes genitaux se differencient davantage.",maman:"Les nausees commencent souvent a diminuer progressivement. Un regain d'energie peut apparaitre. Les premieres variations de poids deviennent parfois visibles.",conseil:"La premiere echographie approche — c'est un moment emotionnel fort. Sois pleinement present, telephone en mode silencieux. Prepare une liste de questions pour le medecin. C'est souvent le moment ou la realite de la grossesse devient tangible pour le pere.",savistu:"A SA 10, le foetus peut deja froncer les sourcils et faire des grimaces. Son systeme nerveux est suffisamment developpe pour produire des expressions faciales rudimentaires."},
  11:{emoji:'🍋',taille:'4 cm',poids:'7g',objet:'un bouchon de vin',developpement:"Les dents de lait se forment sous les gencives — elles ne perceront que 6 mois apres la naissance. Le foetus effectue des mouvements de deglutition et d'inhalation du liquide amniotique. Les os commencent a se solidifier.",maman:"Le ventre commence legerement a s'arrondir. Les nausees diminuent pour beaucoup. La peau peut changer : certaines femmes developpent le masque de grossesse ou une ligne brune sur l'abdomen.",conseil:"Accompagne-la si elle souhaite faire des courses de vetements de grossesse. C'est souvent un moment ou elle se sent mal dans son corps — ta presence bienveillante et tes retours positifs comptent beaucoup.",savistu:"Les dents de lait de bebe sont deja en formation a SA 11. Programmees depuis la vie intra-uterine, elles ne perceront le bout de leur nez qu'environ 6 mois apres la naissance."},
  12:{emoji:'🍋',taille:'5.4 cm',poids:'14g',objet:'une balle de golf',developpement:"C'est la fin du 1er trimestre — un cap majeur. Le risque de fausse couche chute considerablement apres cette semaine. Le visage est pleinement reconnaissable avec ses traits humains. L'echographie T1 mesure la clarte nucale pour evaluer le risque de trisomie.",maman:"Le soulagement emotionnel est souvent palpable apres ce cap. L'energie revient progressivement. L'echographie T1 est un moment tres attendu — c'est souvent la premiere vraie image de bebe.",conseil:"L'echographie T1 est un rendez-vous majeur : sois la, sans exception. Apporte ton telephone charge pour filmer. Les resultats de la clarte nucale seront communiques dans les jours qui suivent — reste disponible emotionnellement pour accueillir les resultats ensemble.",savistu:"Apres SA 12, le risque de fausse couche passe sous la barre des 2%. C'est pour cette raison que beaucoup de couples attendent ce cap pour annoncer la grossesse a leur entourage."},
  13:{emoji:'🍑',taille:'7.4 cm',poids:'23g',objet:'un marqueur',developpement:"Bebe peut sucer son pouce — le reflexe de succion est pleinement operationnel. Les empreintes digitales sont definitives. Le systeme urinaire fonctionne : bebe urine dans le liquide amniotique. Les cordes vocales se forment.",maman:"Le 2e trimestre commence : c'est souvent la periode la plus confortable de la grossesse. L'energie revient, les nausees disparaissent pour la plupart. La libido peut augmenter.",conseil:"C'est le bon moment pour annoncer officiellement la grossesse. C'est aussi le moment ideal pour commencer a vous projeter ensemble : prenoms, organisation de la maison, conge paternite. Ces conversations creent du lien et de l'anticipation positive.",savistu:"Bebe peut sucer son pouce des SA 13. Ce reflexe entraine in utero sera l'un des premiers comportements autonomes apres la naissance — essentiel pour l'alimentation."},
  14:{emoji:'🍑',taille:'8.7 cm',poids:'43g',objet:'une telecommande',developpement:"Le foetus produit de l'urine et l'elimine dans le liquide amniotique, qu'il avale ensuite — c'est le cycle normal de filtration. Les reins fonctionnent. Le sexe de bebe peut parfois etre devine a l'echographie.",maman:"Le ventre s'arrondit clairement. La libido est souvent revenue. Des douleurs ligamentaires dans le bas-ventre peuvent apparaitre en raison de l'etirement des ligaments ronds.",conseil:"Proposez un week-end en amoureux avant l'arrivee de bebe. Le 2e trimestre est la fenetre ideale : energie revenue, ventre encore genable, accouchement loin. Ce moment de reconnexion en couple est precieux.",savistu:"A SA 14, le visage de bebe peut produire une trentaine d'expressions differentes. Ces micro-expressions faciales temoignent du developpement avance de son systeme nerveux."},
  15:{emoji:'🍎',taille:'10 cm',poids:'70g',objet:'une balle de squash',developpement:"Bebe entend pour la premiere fois : les vibrations sonores traversent le liquide amniotique et atteignent ses oreilles en formation. Il peut percevoir des sons graves, notamment les voix masculines. Le squelette continue de se solidifier.",maman:"La prise de poids devient visible. Des vergetures peuvent apparaitre — c'est genetique. Le systeme cardiovasculaire travaille davantage : le volume sanguin augmente de 40% pendant la grossesse.",conseil:"Parle a bebe chaque soir. Les etudes montrent que les nouveau-nes reconnaissent les voix entendues in utero et reagissent differemment a la voix du pere. C'est le debut de votre relation avant meme la naissance.",savistu:"Les voix masculines, plus graves, traversent mieux le liquide amniotique. Ta voix est donc l'une des mieux percues par bebe in utero — raison de plus pour lui parler regulierement."},
  16:{emoji:'🥑',taille:'11.6 cm',poids:'100g',objet:'un avocat',developpement:"Le squelette se renforce progressivement — le cartilage se transforme en os. Les yeux peuvent percevoir la lumiere bien que toujours fermes. Le systeme nerveux central coordonne de mieux en mieux les mouvements.",maman:"Les premieres sensations de mouvement peuvent apparaitre — souvent decrites comme des bulles ou des papillons dans le ventre. La pression sur la vessie augmente avec la croissance de l'uterus.",conseil:"Les cours de preparation a l'accouchement sont a reserver maintenant — ils se remplissent vite. Des cours specifiques pour les peres existent dans de nombreuses maternites. Participer activement te permettra de te sentir acteur lors de l'accouchement.",savistu:"A SA 16, le foetus peut attraper son propre cordon ombilical. Ce comportement exploratoire precoce temoigne du developpement de sa coordination motrice."},
  17:{emoji:'🍐',taille:'13 cm',poids:'140g',objet:'un iPhone',developpement:"Une couche de graisse brune commence a se former sous la peau — elle servira a reguler la temperature corporelle apres la naissance. Bebe s'entraine a avaler et a respirer le liquide amniotique. Les empreintes palmaires se forment.",maman:"Les mouvements de bebe sont parfois perceptibles. Le ventre est bien visible. Des douleurs dans les cotes peuvent apparaitre en raison de l'expansion de l'uterus.",conseil:"Pose ta main sur son ventre le soir en parlant a bebe. Meme si tu ne sens encore rien, ce rituel cree une connexion emotionnelle reelle pour vous trois. Elle appreciera ce geste d'attention quotidien.",savistu:"Les empreintes de la paume de bebe se forment a SA 17 — uniques comme les siennes. Elles temoignent du developpement des couches profondes de la peau."},
  18:{emoji:'🫑',taille:'14.2 cm',poids:'190g',objet:'un stylo epais',developpement:"Les os se solidifient davantage. Bebe developpe son sens du toucher — il explore son environnement avec ses mains et son visage. Le systeme vestibulaire se developpe, lui permettant de percevoir les mouvements et sa position dans l'espace.",maman:"Les douleurs ligamentaires sont frequentes. Le dos peut commencer a souffrir. Des crampes nocturnes dans les jambes sont possibles.",conseil:"Propose des massages du dos regulierement. Tu n'as pas besoin d'etre expert : quelques minutes de pression douce sur le bas du dos suffisent. Ce geste quotidien renforce votre connexion physique.",savistu:"A SA 18, bebe peut entendre la musique que vous ecoutez ensemble. Des etudes suggerent que les nourrissons reconnaissent des melodies entendues in utero et s'en trouvent apaises apres la naissance."},
  19:{emoji:'🥭',taille:'15.3 cm',poids:'240g',objet:'une canette de soda',developpement:"Tous les sens se developpent rapidement. Le vernix caseosa commence a recouvrir la peau de bebe pour la proteger du liquide amniotique. Les cellules cerebrales se multiplient a un rythme de 250 000 par minute.",maman:"Le ventre est tres visible. Des problemes de congestion nasale peuvent apparaitre. La fatigue peut revenir legerement.",conseil:"Commencez a preparer la chambre de bebe ensemble. Monter les meubles, choisir la decoration : ces activites partagees t'ancrent dans la realite de l'arrivee de bebe.",savistu:"Le cerveau de bebe produit 250 000 nouvelles cellules nerveuses par minute a SA 19. Cette phase de proliferation neuronale intense est unique dans toute sa vie."},
  20:{emoji:'🍌',taille:'16.4 cm',poids:'300g',objet:'un livre de poche',developpement:"C'est la mi-grossesse. L'echographie morphologique T2 est realisee cette semaine : c'est la plus complete de la grossesse. Elle examine en detail chaque organe, chaque membre. Le sexe est generalement visible.",maman:"L'echographie T2 est souvent vecue avec une anxiete melee d'excitation. C'est le rendez-vous medical le plus attendu et potentiellement le plus stressant de la grossesse.",conseil:"Prends une demi-journee de conge pour cette echographie. Preparez vos questions a l'avance. Filmez. Apres, prenez le temps de vous poser ensemble pour digerer emotionnellement ce que vous venez de vivre.",savistu:"L'echographie morphologique T2 examine plus de 100 criteres anatomiques. C'est l'examen le plus complet de la grossesse, realise par un medecin specialise en echographie foetale."},
  21:{emoji:'🥕',taille:'26.7 cm',poids:'360g',objet:'une bouteille 33cl',developpement:"Bebe a maintenant un cycle veille-sommeil distinct : il dort environ 12 a 14 heures par jour dans le ventre. Les mouvements sont de plus en plus coordonnes. Le systeme digestif s'entraine en absorbant le liquide amniotique.",maman:"Le ventre est tres visible. Des problemes de digestion et de reflux peuvent apparaitre. Le centre de gravite du corps change, modifiant la posture.",conseil:"Installe une veilleuse dans la chambre de bebe — c'est le moment de commencer a rendre l'espace concret. Ces petits gestes d'anticipation t'aident a te projeter dans ton role de pere.",savistu:"Bebe est souvent le plus actif quand sa mere est au repos — les mouvements de la marche l'endorment, comme un bercement naturel."},
  22:{emoji:'🥭',taille:'27.8 cm',poids:'430g',objet:'un ballon de handball',developpement:"Les yeux sont formes mais encore fermes. Les sourcils et les cils sont visibles. Le sens du toucher est tres developpe. Les poumons produisent du liquide — un entrainement precoce a la respiration.",maman:"Des vergetures peuvent apparaitre. Des crampes nocturnes dans les mollets sont frequentes. Le sommeil peut devenir difficile.",conseil:"Masse son ventre avec de l'huile chaque soir — huile de calendula, d'amande douce ou de rose musquee. Ce rituel prend 5 minutes et a un impact physique et emotionnel reel.",savistu:"Les vergetures sont genetiquement determinees. Mais une bonne hydratation de la peau peut en limiter l'etendue et rendre la peau plus confortable."},
  23:{emoji:'🍊',taille:'28.9 cm',poids:'500g',objet:'une bouteille 50cl',developpement:"Bebe a le hoquet regulierement — entrainement du diaphragme. Il pese maintenant exactement 500g. Les ongles sont longs et visibles. Le cerveau se developpe intensement.",maman:"L'essoufflement peut apparaitre a l'effort. Le ventre est lourd. Des douleurs dans le pubis peuvent survenir — liees a l'assouplissement hormonal des ligaments.",conseil:"Prends en charge spontanement les corvees physiques lourdes. Sans lui demander si elle veut de l'aide. L'anticipation est plus precieuse que la reponse a une demande.",savistu:"Le hoquet de bebe est un entrainement musculaire du diaphragme — une preparation a la respiration autonome apres la naissance."},
  24:{emoji:'🌽',taille:'30 cm',poids:'600g',objet:'une regle 30cm',developpement:"Le visage est presque entierement forme. Bebe reconnait clairement la voix de ses deux parents. Les poumons produisent du surfactant — la substance indispensable qui permettra aux alveoles de ne pas s'affaisser apres la naissance.",maman:"Le test de depistage du diabete gestationnel (HGPO) doit etre realise cette semaine — 2 heures, 3 prises de sang. Un diabete gestationnel non traite augmente les risques pour bebe.",conseil:"Accompagne-la au test HGPO — ca dure 2 heures et l'attente est longue. Ta presence transforme ce moment contraignant en moment partage.",savistu:"Le surfactant, produit par les poumons des SA 24, est vital : sans lui, les alveoles pulmonaires s'affaisseraient a chaque expiration. Les bebes tres prematures necessitent souvent une injection artificielle."},
  25:{emoji:'🥬',taille:'34.6 cm',poids:'660g',objet:'un rouleau essuie-tout',developpement:"Les poumons continuent leur maturation active. Bebe commence a accumuler de la graisse sous-cutanee. Ses mouvements sont tres perceptibles de l'exterieur.",maman:"Les jambes lourdes et les varices sont frequentes en raison de la compression des veines par l'uterus. Le sommeil est perturbe.",conseil:"Propose-lui un bain de pieds chaud le soir. Tu peux aussi masser ses mollets pour activer la circulation. Ces petites attentions regulieres comptent plus qu'un grand geste isole.",savistu:"A SA 25, bebe commence a stocker de la graisse brune. Cette graisse a pour unique fonction de produire de la chaleur apres la naissance pour maintenir sa temperature corporelle."},
  26:{emoji:'🥦',taille:'35.6 cm',poids:'760g',objet:'une raquette de ping-pong',developpement:"Les yeux s'ouvrent pour la premiere fois. Bebe peut voir la lumiere qui filtre. Les cils et les sourcils sont bien visibles. Le cerveau atteint une complexite suffisante pour que bebe puisse rever.",maman:"L'inconfort general augmente. Le sommeil est difficile — la position dorsale gauche est recommandee. Des reflux nocturnes peuvent interrompre le sommeil.",conseil:"Un coussin de grossesse change radicalement la qualite du sommeil. C'est l'un des investissements les plus utiles de la grossesse. Commande-le maintenant.",savistu:"Bebe ouvre les yeux pour la premiere fois a SA 26. La couleur des yeux a la naissance est presque toujours bleue ou grise — la melanine de l'iris se developpe progressivement apres la naissance."},
  27:{emoji:'🥬',taille:'36.6 cm',poids:'875g',objet:'une bouteille de vin',developpement:"Bebe peut rever — son activite cerebrale pendant le sommeil est similaire a celle d'un adulte en phase REM. C'est la fin du 2e trimestre. Le foetus est capable de mouvements coordonnes complexes.",maman:"C'est souvent la fin du trimestre le plus confortable. La fatigue revient progressivement. L'anxiete autour de l'accouchement peut commencer a se manifester.",conseil:"Planifiez votre plan de naissance ensemble : preferences sur la peridurale, la presence du pere, la gestion de la douleur. Ce document te permet de defendre ses souhaits pendant le travail.",savistu:"Les recherches montrent que bebe entre en sommeil paradoxal (REM) a partir de SA 27. Cette phase est associee au traitement des emotions et a la consolidation de la memoire."},
  28:{emoji:'🍆',taille:'37.6 cm',poids:'1 kg',objet:'un kilo de farine',developpement:"Debut du 3e trimestre. Le cerveau entre dans une phase de developpement accelere. La vision est fonctionnelle. Bebe se retourne souvent et ses mouvements sont tres perceptibles.",maman:"L'essoufflement et les reflux gastriques sont frequents. Le dos et le bassin supportent un poids croissant. Les contractions de Braxton Hicks peuvent apparaitre.",conseil:"Commence a preparer la valise maternite maintenant — pas dans 4 semaines. Avoir la valise prete tot evite le stress si le travail commence plus tot que prevu.",savistu:"A SA 28, bebe peut voir la lumiere qui filtre a travers la paroi abdominale. Certains parents s'amusent a braquer une lampe de poche sur le ventre — bebe peut reagir en bougeant."},
  29:{emoji:'🎃',taille:'38.6 cm',poids:'1.15 kg',objet:'un casque audio',developpement:"Les muscles et les poumons se renforcent activement. Les mouvements de bebe sont desormais visibles de l'exterieur. Le systeme immunitaire commence a se developper.",maman:"Les contractions de Braxton Hicks peuvent etre frequentes et inquietantes. Elles se distinguent des vraies par leur irregularite et leur caractere non douloureux.",conseil:"Apprends la regle 5-1-1 : contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure = direction maternite. Cette regle simple t'evitera de partir trop tot ou trop tard.",savistu:"Les mouvements de bebe a SA 29 peuvent etre si intenses qu'ils reveillent la mere la nuit. Ces grandes mobilisations correspondent a des phases de developpement moteur actif."},
  30:{emoji:'🥬',taille:'39.9 cm',poids:'1.3 kg',objet:'un livre de 300 pages',developpement:"Le cerveau se plisse pour augmenter sa surface de traitement. Les poumons sont presque matures. Bebe prend du poids regulierement — environ 200 a 250g par semaine.",maman:"La fatigue intense revient. Le sommeil est difficile. L'anxiete autour de l'accouchement peut augmenter. Des oedemes aux pieds sont courants.",conseil:"Planifie ton conge paternite maintenant avec ton employeur. Un conge bien prepare te permet d'etre pleinement present sans pression professionnelle.",savistu:"Le cerveau humain est le seul a se plier sur lui-meme pour maximiser sa surface corticale. Un cerveau humain deplie aurait la taille d'une feuille A3. Ce processus debute in utero des SA 30."},
  31:{emoji:'🍍',taille:'41.1 cm',poids:'1.5 kg',objet:'un fer a repasser',developpement:"Tous les sens sont operationnels et coordonnes. Bebe s'entraine activement a la respiration. Il distingue le gout sucre du gout amer dans le liquide amniotique.",maman:"Les difficultes a marcher longtemps apparaissent. Le centre de gravite modifie provoque des douleurs pelviennes. Des contractions de Braxton Hicks frequentes sont normales.",conseil:"Propose des promenades courtes plutot que de rester immobiles. L'activite physique douce est benefique jusqu'a l'accouchement. Adapte le rythme a ses capacites du moment.",savistu:"Bebe peut maintenant distinguer le gout sucre du gout amer dans le liquide amniotique. Il avale davantage quand le liquide est sucre — une des premieres manifestations de ses preferences gustatives."},
  32:{emoji:'🥭',taille:'42.4 cm',poids:'1.7 kg',objet:'un ballon de foot T1',developpement:"Bebe se met en position tete en bas dans la majorite des cas. L'echographie T3 verifie cette position, estime le poids et evalue la quantite de liquide amniotique.",maman:"L'echographie T3 est realisee cette semaine. Si bebe est en siege, une version par manoeuvre externe peut etre proposee entre SA 36 et 37.",conseil:"Accompagne-la a l'echographie T3 sans faute. Si bebe est en siege, ne dramatise pas — des solutions existent. Ta presence calme et rassurante est determinante.",savistu:"Environ 3 a 4% des bebes restent en siege a terme. La version par manoeuvre externe permet de retourner bebe dans 60% des cas, realisee entre SA 36 et 37."},
  33:{emoji:'🍍',taille:'43.7 cm',poids:'1.9 kg',objet:'un sac a dos leger',developpement:"Le squelette est presque complet. Le cerveau continue son developpement intense. Les ongles sont si longs que bebe peut se griffer. Les poumons sont en phase finale de maturation.",maman:"L'essoufflement atteint son maximum. L'insomnie est quasi-systematique. L'impatience et l'anxiete augmentent a mesure que la date approche.",conseil:"Prends en charge les nuits difficiles quand tu le peux. Si elle est reveilee a 3h du matin, etre reveille avec elle fait une vraie difference. La solitude nocturne est particulierement difficile.",savistu:"Les ongles de bebe a SA 33 sont suffisamment longs pour qu'il se griffe le visage in utero. C'est pourquoi certains nouveau-nes naissent avec de petites griffures sur le visage."},
  34:{emoji:'🍈',taille:'45 cm',poids:'2.15 kg',objet:'un club de golf',developpement:"Le systeme nerveux central est mature. Bebe regule lui-meme sa temperature corporelle. La descente dans le bassin peut commencer. Un bebe ne a SA 34 a plus de 99% de chances de survie sans sequelles.",maman:"La descente du bebe dans le bassin soulage parfois l'essoufflement mais augmente la pression pelvienne. Les envies frequentes d'uriner s'intensifient.",conseil:"Si les cours de preparation a l'accouchement ne sont pas encore commences, c'est urgent. La preparation te permet de comprendre le processus et de ne pas paniquer pendant le travail.",savistu:"Un bebe ne a SA 34 a aujourd'hui plus de 99% de chances de survie sans sequelles grace aux progres de la neonatologie. La limite de viabilite en France est fixee a SA 22."},
  35:{emoji:'🍈',taille:'46.2 cm',poids:'2.4 kg',objet:'une raquette badminton',developpement:"Les reins et le foie sont pleinement fonctionnels. Bebe prend environ 250g par semaine. Les poumons sont quasi-matures.",maman:"Les envies frequentes d'uriner sont maximales. La pression pelvienne est intense. Des douleurs dans le pubis peuvent rendre la marche difficile.",conseil:"Installe le siege auto maintenant et fais verifier l'installation par un professionnel. Un siege mal installe est aussi dangereux qu'un siege absent.",savistu:"Bebe prend 250g par semaine a partir de SA 35. Cette prise de poids finale est essentielle pour sa thermoregulation apres la naissance."},
  36:{emoji:'🥗',taille:'47.4 cm',poids:'2.6 kg',objet:'un ballon basket junior',developpement:"Les poumons sont presque matures. L'instinct de nidification de la mere est a son maximum. Des pertes de bouchon muqueux peuvent survenir. Le col commence a se preparer.",maman:"L'instinct de nidification est documente scientifiquement — il precede souvent le debut du travail. La fatigue est intense mais des bouffees d'energie peuvent surgir.",conseil:"La valise doit etre prete et dans la voiture maintenant. Le telephone doit etre charge en permanence. Memorise le numero direct du service des urgences obstetricales.",savistu:"L'instinct de nidification est un phenomene biologique reel, documente chez de nombreux mammiferes. Il se manifeste par le besoin intense de tout nettoyer et organiser."},
  37:{emoji:'🌿',taille:'48.6 cm',poids:'2.85 kg',objet:'une batte de baseball',developpement:"Bebe est considere a terme. Il pourrait naitre a tout moment sans risque majeur. Ses poumons sont matures, son systeme digestif est pret, ses reflexes sont complets.",maman:"Les contractions peuvent survenir a tout moment. L'anxiete et l'impatience sont maximales. Le col peut commencer a se dilater sans que ce soit perceptible.",conseil:"Mode alerte active. Reste joignable en permanence. Revise les signes du debut du travail : perte du bouchon muqueux, contractions regulieres, perte des eaux.",savistu:"Bebe est considere a terme des SA 37. Pourtant les deux dernieres semaines sont importantes pour la maturation finale du cerveau et des poumons."},
  38:{emoji:'🌿',taille:'49.8 cm',poids:'3.1 kg',objet:'un haltere 3kg',developpement:"Bebe est pret. Sa tete s'est engagee dans le bassin. Tous ses systemes sont operationnels. Il attend le signal hormonal pour declencer le travail.",maman:"L'impatience et l'anxiete sont melees d'excitation. Le sommeil est quasi-impossible. Le besoin de soutien emotionnel est maximal.",conseil:"Sois present, rassurant, sans minimiser son anxiete. Revoyez ensemble le plan de naissance. Preparez des repas pour les premiers jours de retour a la maison.",savistu:"La tete de bebe est maintenant engagee dans le bassin. Le corps se prepare activement a l'accouchement — le col ramollit, s'efface et commence a se dilater."},
  39:{emoji:'🍉',taille:'50.7 cm',poids:'3.25 kg',objet:'un ballon de foot T3',developpement:"Bebe est pleinement developpe. Il produit ses propres hormones de stress pour se preparer a l'accouchement. Chaque jour supplementaire lui permet de gagner en maturite.",maman:"Chaque jour semble une eternite. La fatigue physique et emotionnelle est a son comble. Les sorties sont difficiles mais benefiques pour le moral.",conseil:"Organise une sortie douce — cinema, restaurant calme, promenade courte. Changer les idees est important pour vous deux. La patience est la qualite la plus importante ces derniers jours.",savistu:"Seulement 5% des bebes naissent exactement a la DPA. La naissance peut survenir entre SA 37 et SA 42 sans etre consideree comme anormale."},
  40:{emoji:'🍉',taille:'51.2 cm',poids:'3.4 kg',objet:'un ballon de foot taille 4',developpement:"C'est le jour J prevu. Bebe a attendu 280 jours pour te rencontrer. Tous ses systemes sont pleinement operationnels.",maman:"Stress et excitation maximaux. Chaque contraction est une potentielle alerte. Le corps est en mode attente totale.",conseil:"Contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure = appelle la maternite avant de partir. Garde ton calme — c'est le signal que tu attendais.",savistu:"Le travail est declenche par un cocktail hormonal impliquant le foetus lui-meme. C'est bebe qui choisit le moment de naitre en envoyant des signaux chimiques a l'uterus."},
  41:{emoji:'🍉',taille:'51.5 cm',poids:'3.6 kg',objet:'un ballon de foot taille 5',developpement:"Depassement de terme. Bebe continue de prendre du poids. Une surveillance medicale renforcee est mise en place. Le declenchement peut etre propose.",maman:"L'inconfort est majeur. La frustration et l'anxiete sont intenses. Un soutien emotionnel constant est indispensable.",conseil:"Reste positif et patient. Le depassement de terme est tres courant et ne signifie pas que quelque chose ne va pas. Suis les instructions de l'equipe medicale.",savistu:"Seulement 5% des bebes naissent exactement a la DPA. Le depassement jusqu'a SA 41+6 est considere comme normal sur le plan medical."},
};

const MISSIONS: Record<number, string[]> = {
  6:["Dire a ta partenaire que tu es la pour elle quoi qu'il arrive","Faire les courses sans qu'elle ait a demander","Verifier que vous avez bien un suivi medical en place"],
  7:["Preparer des en-cas anti-nausees accessibles a tout moment","Eviter les odeurs fortes dans la maison","Commencer a lire sur la grossesse — module RDV en priorite"],
  8:["Prendre le relais sur les taches menageres cette semaine","Accompagner ta partenaire a sa premiere consultation","Informer discretement ton employeur si besoin"],
  9:["Pratiquer l'ecoute active sans chercher a resoudre","Proposer un massage des pieds ou du dos le soir","Reduire les sources de stress dans la maison"],
  10:["Planifier la premiere echographie ensemble","Lire le guide accouchement du module RDV","Preparer une liste de questions pour le medecin"],
  11:["Accompagner chercher des vetements de grossesse si souhaite","Commencer a reflechir a l'organisation financiere","Declarer la grossesse a la mutuelle"],
  12:["Etre present a l'echographie T1 — poser une demi-journee","Filmer et photographier l'echographie","Decider ensemble de qui annoncer la grossesse"],
  13:["Annoncer la grossesse a la famille si vous le souhaitez","Commencer les discussions sur les prenoms","Lire le module post-partum pour anticiper"],
  14:["Organiser un week-end ou sortie en amoureux","Commencer les recherches poussette et siege auto","Verifier les aides financieres et conges disponibles"],
  15:["Instaurer le rituel : parler a bebe chaque soir","Reserver les cours de preparation a l'accouchement","Commencer un album photo de la grossesse"],
  16:["Reserver les cours de preparation si pas encore fait","Etablir la liste des achats prioritaires avec budget","Reflechir a l'amenagement de la chambre"],
  17:["Instaurer le rituel de la main sur le ventre le soir","Commander le coussin de grossesse","Commencer le module valise maternite"],
  18:["Proposer des massages du dos reguliers","Preparer la chambre de bebe ensemble","Se renseigner sur les creches de votre ville"],
  19:["Montage des meubles de la chambre de bebe","Etablir la liste de naissance pour la famille","Initialiser les demarches de conge paternite avec le RH"],
  20:["Bloquer la demi-journee pour l'echographie T2","Preparer les questions pour l'echographiste","Celebrer la mi-grossesse ensemble"],
  21:["Installer la veilleuse et verifier l'eclairage","Commencer l'assemblage des meubles","Choisir la maternite definitivement"],
  22:["Instaurer le massage du ventre avec de l'huile le soir","Visiter la maternite et reperer les acces","Preparer le plan de naissance en brouillon"],
  23:["Prendre en charge toutes les corvees physiques lourdes","Preparer le sac de maternite — commencer par les documents","Lire integralement le guide accouchement"],
  24:["Accompagner au test HGPO — 2 heures ensemble","Commencer la valise maternite","Installer le siege auto et faire verifier le montage"],
  25:["Bain de pieds le soir — en faire un rituel","Finaliser la chambre de bebe","Finaliser ton conge paternite avec l'employeur"],
  26:["Commander le coussin de grossesse si pas encore fait","Finaliser le plan de naissance par ecrit","Preparer une playlist pour la salle de naissance"],
  27:["Remettre le plan de naissance a la maternite","Preparer les documents administratifs d'admission","Tester le trajet vers la maternite aux heures de pointe"],
  28:["Commencer la valise maternite de facon urgente","Enregistrer le numero direct de la maternite","Relire le module accouchement en entier"],
  29:["Maitriser la regle 5-1-1 des contractions","Avoir le numero de la maternite en favori","Rester joignable en permanence"],
  30:["Confirmer le conge paternite avec l'employeur","Finaliser la valise maternite","Preparer la maison pour le retour : courses, repas congeles"],
  31:["Valise dans le coffre de la voiture","Preparer des repas en avance et les conger","Installer le berceau dans la chambre parentale"],
  32:["Accompagner a l'echographie T3 sans exception","Discuter de la position de bebe avec le medecin","Finaliser tous les achats prioritaires"],
  33:["Etre disponible la nuit quand le sommeil est difficile","Preparer un plan B pour rejoindre la maternite rapidement","Confirmer les dates de conge paternite"],
  34:["Commencer la preparation accouchement si pas encore fait","Tester le trajet maternite a differentes heures","Valise dans le coffre de la voiture"],
  35:["Faire verifier l'installation du siege auto","Finaliser tous les achats restants","Preparer la maison pour l'arrivee de bebe"],
  36:["Valise dans la voiture — verifier qu'elle est complete","Telephone charge a 100% en permanence","Rester joignable a tout moment"],
  37:["Mode alerte maximum — telephone toujours sur soi","Relire le guide accouchement une derniere fois","Verifier que la valise est complete"],
  38:["Etre present et disponible emotionnellement","Preparer des repas pour les premiers jours post-naissance","Prevenir famille et amis proches"],
  39:["Organiser une sortie douce pour changer les idees","Maintenir le soutien emotionnel constant","Garder son calme — tu es pret"],
  40:["Contractions 5min/1h = appel maternite immediat","Garder son calme — c'est le moment que tu attendais","Avoir tous les documents a portee de main"],
  41:["Rester positif et patient","Soutien emotionnel et physique maximum","Suivre rigoureusement les instructions medicales"],
};

const RDV_LIST = [
  {sa:8,emoji:'🏥',titre:'1ere consultation',desc:"Confirmation grossesse, prise de sang complete, calcul DPA. Bilan de debut de grossesse. Sois la, prends des notes.",oblig:true},
  {sa:12,emoji:'🔬',titre:'Echo T1 + trisomie',desc:"Premier visage de bebe. Mesure de la clarte nucale pour le depistage de la trisomie 21. Duree 30-45 min. Apporte ton telephone.",oblig:true},
  {sa:16,emoji:'📋',titre:'Consultation mensuelle',desc:"Suivi standard : tension, poids, hauteur uterine. Bonne occasion de poser toutes vos questions.",oblig:false},
  {sa:20,emoji:'📝',titre:'Declaration grossesse CPAM',desc:"A effectuer avant SA 15 sur ameli.fr. Declaration egalement a l'employeur. Ouvre les droits aux remboursements grossesse.",oblig:true},
  {sa:22,emoji:'👶',titre:'Echo T2 morphologique',desc:"L'echographie la plus importante. Examen minutieux de tous les organes, membres et cerveau. Duree 45-60 min. Prends une demi-journee.",oblig:true},
  {sa:24,emoji:'🩸',titre:'Test diabete gestationnel',desc:"Test HGPO : 3 prises de sang sur 2 heures. Detecte un eventuel diabete gestationnel. Accompagne-la.",oblig:false},
  {sa:28,emoji:'💉',titre:'Debut T3 + bilan sanguin',desc:"Bilan sanguin complet. Vaccin coqueluche recommande pour les deux parents — tu protegeras bebe avant sa propre vaccination.",oblig:false},
  {sa:32,emoji:'📏',titre:'Echo T3 croissance',desc:"Verification de la position de bebe, estimation du poids, evaluation du liquide amniotique et placenta.",oblig:true},
  {sa:34,emoji:'🎓',titre:'Preparation accouchement',desc:"3 a 8 seances 100% remboursees. Des seances specifiques pour les peres existent. Ne manque pas ca.",oblig:false},
  {sa:36,emoji:'💬',titre:'Entretien prenatal tardif',desc:"Bilan global de la grossesse, finalisation du projet de naissance. Presence du pere fortement recommandee.",oblig:true},
  {sa:38,emoji:'🧳',titre:'Visite pre-accouchement',desc:"Derniere consultation avant le terme. Verification du col, position de bebe. Finaliser toutes les questions pratiques.",oblig:false},
  {sa:40,emoji:'🎉',titre:'Jour J — DPA',desc:"Contractions toutes les 5 minutes pendant 1 heure = appelle la maternite avant de partir.",oblig:true},
];

const PARTENAIRES = [
  {categorie:'Pour elle',items:[
    {nom:'Mothercare',desc:'Vetements grossesse & allaitement',remise:'-15%',lien:'#'},
    {nom:'Soin & Bien-etre',desc:'Massage prenatal a domicile',remise:'-20%',lien:'#'},
    {nom:'Jolimoi',desc:'Cosmetiques naturels grossesse safe',remise:'-10%',lien:'#'},
  ]},
  {categorie:'Pour bebe',items:[
    {nom:'Cybex',desc:'Sieges auto & poussettes premium',remise:'-12%',lien:'#'},
    {nom:'Monbebe',desc:'Vetements bebe bio & doux',remise:'-15%',lien:'#'},
    {nom:'Babymoov',desc:'Babyphone & accessoires',remise:'-10%',lien:'#'},
  ]},
  {categorie:'Pour toi',items:[
    {nom:'Box Papa',desc:'Box mensuelle future paternite',remise:'-25%',lien:'#'},
    {nom:'Cultura',desc:'Livres paternite & eveil bebe',remise:'-10%',lien:'#'},
    {nom:'Firstcry',desc:'Tout pour bebe a prix reduit',remise:'-15%',lien:'#'},
  ]},
];

const IDEES_MOIS: Record<number,string> = {
  1:"Encadre la photo de la premiere echographie et offre-lui le cadre — un souvenir concret du tout debut de cette aventure.",
  2:"Reserve une table dans son restaurant prefere pour un diner en amoureux. Sans parler grossesse si elle en a envie — juste vous deux.",
  3:"Offre-lui une seance de massage prenatal a domicile ou en institut specialise. C'est l'un des gestes les plus aprecies en grossesse.",
  4:"Cree un album photo numerique ou physique de la grossesse. Ce souvenir sera precieux pour toute la famille.",
  5:"Organise un week-end ou une escapade a deux. C'est peut-etre la derniere opportunite avant plusieurs mois.",
  6:"Preparez la chambre de bebe ensemble un dimanche. Monter les meubles, accrocher les cadres — ce moment partage reste dans les memoires.",
  7:"Offre-lui un coussin de grossesse de qualite — c'est l'un des investissements les plus utiles pour son confort nocturne.",
  8:"Planifie un dernier road trip ou weekend en nature avant l'accouchement. Destination adaptee : pas trop loin, confort assure.",
  9:"Ecris-lui une lettre manuscrite sur ce que cette grossesse represente pour toi. Ce que tu ressens, ce que tu anticipes, ce que tu lui promets.",
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [rdvOuvert, setRdvOuvert] = useState<number|null>(null);
  const [valiseChecked, setValiseChecked] = useState<Record<string,boolean>>({});
  const [missionsChecked, setMissionsChecked] = useState<Record<string,boolean>>({});
  const [avance, setAvance] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [nextRdvDate, setNextRdvDate] = useState('');

  useEffect(() => {
    const d = searchParams.get('dpa') || localStorage.getItem('dadup_dpa') || '';
    const p = localStorage.getItem('dadup_prenom') || '';
    const n = JSON.parse(localStorage.getItem('dadup_notes') || '[]');
    const v = JSON.parse(localStorage.getItem('dadup_valise') || '{}');
    const m = JSON.parse(localStorage.getItem('dadup_missions') || '{}');
    const r = localStorage.getItem('dadup_next_rdv') || '';
    if (!d) { setShowOnboarding(true); } else { setDpa(d); }
    setPrenom(p);
    setNotes(n);
    setValiseChecked(v);
    setMissionsChecked(m);
    setNextRdvDate(r);
  }, []);

  const getSA = (offset = 0) => {
    if (!dpa) return null;
    const conception = new Date(new Date(dpa).getTime() - 40 * 7 * 24 * 60 * 60 * 1000);
    const diff = new Date().getTime() - conception.getTime();
    return Math.max(1, Math.min(42, Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + offset));
  };

  const sa = getSA(avance ? 4 : 0);
  const saReelle = getSA();
  const data = sa ? (SEMAINES_DATA[sa] || SEMAINES_DATA[40]) : null;
  const dataReelle = saReelle ? (SEMAINES_DATA[saReelle] || SEMAINES_DATA[40]) : null;
  const dpaDate = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.ceil((dpaDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
  const moisGrossesse = saReelle ? Math.ceil(saReelle / 4.3) : 1;
  const ideesMois = IDEES_MOIS[Math.min(moisGrossesse, 9)] || IDEES_MOIS[9];
  const isPostPartum = joursRestants !== null && joursRestants < 0;
  const progression = Math.min(100, Math.round(((saReelle || 0) / 40) * 100));
  const trimestre = (saReelle || 0) <= 14 ? 'T1' : (saReelle || 0) <= 27 ? 'T2' : 'T3';
  const missions = saReelle ? (MISSIONS[saReelle] || MISSIONS[40]) : [];
  const nextRdv = RDV_LIST.filter(r => saReelle && r.sa >= saReelle)[0];

  const saveNote = () => {
    if (!noteText.trim()) return;
    const newNotes = [...notes, new Date().toLocaleDateString('fr-FR') + ' — ' + noteText];
    setNotes(newNotes);
    localStorage.setItem('dadup_notes', JSON.stringify(newNotes));
    setNoteText('');
  };

  const toggleValise = (id: string) => {
    const updated = {...valiseChecked, [id]: !valiseChecked[id]};
    setValiseChecked(updated);
    localStorage.setItem('dadup_valise', JSON.stringify(updated));
  };

  const toggleMission = (id: string) => {
    const updated = {...missionsChecked, [id]: !missionsChecked[id]};
    setMissionsChecked(updated);
    localStorage.setItem('dadup_missions', JSON.stringify(updated));
  };

  const saveRdvDate = (val: string) => {
    setNextRdvDate(val);
    localStorage.setItem('dadup_next_rdv', val);
  };

  const saveOnboarding = (d: string, p: string) => {
    localStorage.setItem('dadup_dpa', d);
    localStorage.setItem('dadup_prenom', p);
    setDpa(d);
    setPrenom(p);
    setShowOnboarding(false);
  };

  const tabs = [
    {id:'home',label:'Accueil'},
    {id:'bebe',label:'Bebe'},
    {id:'rdv',label:'RDV'},
    {id:'pratique',label:'Pratique'},
    {id:'cadeaux',label:'Cadeaux'},
  ];

  if (showOnboarding) return <Onboarding onSave={saveOnboarding}/>;

  return (
    <div style={{minHeight:'100vh', background:'#f8f7f4', paddingBottom:'32px', fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif'}}>

      {/* HEADER */}
      <div style={{background:C.cream, position:'sticky', top:0, zIndex:40, borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px'}}>

          {/* LOGO gauche */}
          <a href="/dashboard" onClick={() => setActiveTab('home')} style={{textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="38" height="38">
              <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
              <circle cx="150" cy="150" r="122" fill="#4a6080"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
              <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
            </svg>
          </a>

          {/* PROFIL droite encadre */}
          <a href="/dashboard" onClick={() => setActiveTab('home')} style={{
            display:'flex', alignItems:'center', gap:'10px', textDecoration:'none',
            background:C.white, border:`1px solid ${C.border}`,
            borderRadius:'14px', padding:'8px 14px',
          }}>
            <div style={{textAlign:'right'}}>
              <p style={{color:C.dark, fontSize:'15px', fontWeight:800, margin:0, fontFamily:'Georgia,serif', lineHeight:1.2}}>
                {prenom || 'DadUp'}
              </p>
              <p style={{color:C.textLight, fontSize:'11px', margin:0}}>
                {isPostPartum ? 'Post-partum' : saReelle ? trimestre : 'Mon espace'}
              </p>
            </div>
            {saReelle && (
              <div style={{background:C.dark, color:C.gold, fontSize:'13px', fontWeight:800, padding:'6px 12px', borderRadius:'10px', lineHeight:1.2, textAlign:'center', flexShrink:0}}>
                <p style={{margin:0}}>SA {saReelle}</p>
              </div>
            )}
          </a>
        </div>

        {/* TABS */}
        <div style={{padding:'0 16px 12px', display:'flex', gap:'6px', overflowX:'auto'}}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding:'8px 16px', fontSize:'12px',
              fontWeight: activeTab === t.id ? 700 : 400,
              color: activeTab === t.id ? C.gold : C.textLight,
              background: activeTab === t.id ? C.dark : C.white,
              border: activeTab === t.id ? 'none' : `1px solid ${C.border}`,
              borderRadius:'20px', cursor:'pointer',
              whiteSpace:'nowrap' as const, flexShrink:0,
              transition:'all 0.15s',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'16px 20px', maxWidth:'100%'}}>

        {/* ========== ACCUEIL ========== */}
        {activeTab === 'home' && (
          <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>

            {isPostPartum ? (
              <div style={{background:C.dark, borderRadius:'20px', padding:'32px', textAlign:'center'}}>
                <p style={{fontSize:'48px', margin:'0 0 8px'}}>👶</p>
                <p style={{color:C.white, fontSize:'24px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Bebe est la !</p>
                <p style={{color:C.gold, fontSize:'13px', margin:'4px 0 0'}}>Mode post-partum active</p>
              </div>
            ) : dataReelle && saReelle && (
              <div style={{background:C.dark, borderRadius:'20px', padding:'24px', display:'flex', alignItems:'center', gap:'20px'}}>
                <div style={{flex:1}}>
                  <p style={{color:'rgba(200,160,96,0.7)', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 8px', fontWeight:600}}>SA {saReelle} · {trimestre}</p>
                  <p style={{color:C.white, fontSize:'24px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1.2}}>
                    Bebe fait {dataReelle.taille}<br/>et pese {dataReelle.poids}
                  </p>
                  <p style={{color:'rgba(255,255,255,0.35)', fontSize:'13px', margin:'0 0 20px'}}>
                    {joursRestants && joursRestants > 0 ? joursRestants + ' jours avant le grand jour' : 'Le grand jour approche !'}
                  </p>
                  <div style={{background:'rgba(255,255,255,0.1)', borderRadius:'6px', height:'4px', marginBottom:'8px'}}>
                    <div style={{background:C.gold, height:'4px', borderRadius:'6px', width:progression+'%'}}/>
                  </div>
                  <div style={{display:'flex', gap:'6px', alignItems:'center'}}>
                    {['T1','T2','T3'].map((t, i) => {
                      const seuils = [14, 27, 40];
                      const actif = (saReelle||0) > (i === 0 ? 0 : seuils[i-1]);
                      const enCours = trimestre === t;
                      return (
                        <span key={t} style={{
                          background: enCours ? 'rgba(200,160,96,0.2)' : actif ? C.gold : 'rgba(255,255,255,0.06)',
                          color: enCours ? C.gold : actif ? C.dark : 'rgba(255,255,255,0.25)',
                          fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'20px'
                        }}>{t}{actif && !enCours ? ' ✓' : enCours ? ' →' : ''}</span>
                      );
                    })}
                    <span style={{color:'rgba(255,255,255,0.3)', fontSize:'12px', marginLeft:'auto'}}>{progression}%</span>
                  </div>
                </div>
                <div style={{fontSize:'64px', lineHeight:1, flexShrink:0}}>{dataReelle.emoji}</div>
              </div>
            )}

            {/* PROCHAIN RDV */}
            {nextRdv && (
              <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px'}}>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Prochain rendez-vous</p>
                  {dpa && (
                    <span style={{background:'#f8f7f4', color:C.gold, fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'20px', border:`1px solid ${C.border}`}}>
                      {Math.max(0, Math.round((new Date(dpa).getTime() - (40 - nextRdv.sa) * 7 * 24 * 60 * 60 * 1000 - new Date().getTime()) / (1000 * 60 * 60 * 24)))}j
                    </span>
                  )}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'14px', marginBottom:'14px'}}>
                  <div style={{width:'48px', height:'48px', borderRadius:'14px', background:'#f8f7f4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0}}>{nextRdv.emoji}</div>
                  <div style={{flex:1}}>
                    <p style={{color:C.dark, fontSize:'15px', fontWeight:700, margin:'0 0 2px'}}>{nextRdv.titre}</p>
                    <p style={{color:C.textLight, fontSize:'12px', margin:0}}>SA {nextRdv.sa}{dpa ? ' · ' + new Date(new Date(dpa).getTime() - (40 - nextRdv.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'long'}) : ''}</p>
                  </div>
                  <button onClick={() => setActiveTab('rdv')} style={{width:'32px', height:'32px', borderRadius:'50%', background:C.dark, border:'none', cursor:'pointer', color:C.gold, fontSize:'14px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center'}}>→</button>
                </div>
                <div style={{borderTop:`1px solid ${C.border}`, paddingTop:'12px'}}>
                  <p style={{color:C.textLight, fontSize:'11px', fontWeight:600, margin:'0 0 8px'}}>Ma date de RDV :</p>
                  <input
                    type="date"
                    value={nextRdvDate}
                    onChange={e => saveRdvDate(e.target.value)}
                    style={{width:'100%', background:'#f8f7f4', border:`1px solid ${C.border}`, borderRadius:'10px', padding:'10px 14px', fontSize:'13px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif'}}
                  />
                  {nextRdvDate && (
                    <p style={{color:C.gold, fontSize:'12px', margin:'6px 0 0', fontWeight:600}}>
                      RDV le {new Date(nextRdvDate).toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long'})}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* CONSEIL + IDEE */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              {dataReelle && (
                <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px'}}>
                    <span style={{fontSize:'18px'}}>💡</span>
                    <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Conseil</p>
                  </div>
                  <p style={{color:C.text, fontSize:'13px', lineHeight:1.6, margin:0}}>{dataReelle.conseil}</p>
                </div>
              )}
              <div style={{background:C.gold, borderRadius:'16px', padding:'18px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px'}}>
                  <span style={{fontSize:'18px'}}>🎁</span>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Idee du mois</p>
                </div>
                <p style={{color:C.dark, fontSize:'13px', lineHeight:1.6, margin:0, fontWeight:500}}>{ideesMois}</p>
              </div>
            </div>

            {/* BEBE CE MOIS */}
            {dataReelle && (
              <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px'}}>
                  <span style={{fontSize:'18px'}}>👶</span>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Bebe ce mois — SA {saReelle}</p>
                </div>
                <p style={{color:C.text, fontSize:'13px', lineHeight:1.7, margin:0}}>{dataReelle.developpement}</p>
              </div>
            )}

            {/* CE QUE VIT MAMAN */}
            {dataReelle && (
              <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px'}}>
                  <span style={{fontSize:'18px'}}>🤱</span>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Ce que vit maman</p>
                </div>
                <p style={{color:C.text, fontSize:'13px', lineHeight:1.7, margin:'0 0 12px'}}>{dataReelle.maman}</p>
                <div style={{background:'#f8f7f4', borderRadius:'10px', padding:'12px', borderLeft:`3px solid ${C.gold}`}}>
                  <p style={{color:C.dark, fontSize:'12px', fontWeight:700, margin:'0 0 4px'}}>Quand appeler la maternite ?</p>
                  <p style={{color:C.text, fontSize:'12px', lineHeight:1.5, margin:0}}>Contractions regulieres et rapprochees, perte de liquide amniotique, saignements, ou absence de mouvements foetaux sur plusieurs heures : des signes a ne pas ignorer. En cas de doute, appelez toujours.</p>
                </div>
              </div>
            )}

            {/* LE SAVAIS-TU */}
            {dataReelle && (
              <div style={{background:C.dark, borderRadius:'16px', padding:'20px'}}>
                <div style={{display:'flex', gap:'12px', alignItems:'flex-start'}}>
                  <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(200,160,96,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>🧠</div>
                  <div>
                    <p style={{color:C.gold, fontSize:'14px', fontWeight:800, margin:'0 0 6px'}}>Le savais-tu ?</p>
                    <p style={{color:C.white, fontSize:'13px', lineHeight:1.6, margin:0}}>{dataReelle.savistu}</p>
                  </div>
                </div>
              </div>
            )}

            {/* MISSION */}
            {missions.length > 0 && (
              <div style={{background:C.white, borderRadius:'16px', padding:'20px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px'}}>
                  <span style={{fontSize:'18px'}}>🎯</span>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Ta mission cette semaine</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {missions.map((m, i) => {
                    const id = 'mission_' + saReelle + '_' + i;
                    const done = missionsChecked[id];
                    return (
                      <button key={id} onClick={() => toggleMission(id)} style={{display:'flex', gap:'12px', alignItems:'flex-start', background:'#f8f7f4', border:'none', cursor:'pointer', textAlign:'left', padding:'10px 12px', borderRadius:'10px'}}>
                        <div style={{width:'22px', height:'22px', borderRadius:'6px', border:`2px solid ${done ? C.gold : C.border}`, background: done ? C.gold : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px', transition:'all 0.15s'}}>
                          {done && <span style={{color:C.dark, fontSize:'12px', fontWeight:700}}>✓</span>}
                        </div>
                        <p style={{color: done ? C.textLight : C.dark, fontSize:'13px', margin:0, lineHeight:1.5, textDecoration: done ? 'line-through' : 'none'}}>{m}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========== BEBE ========== */}
        {activeTab === 'bebe' && data && sa && (
          <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>
                {avance ? 'Dans 4 semaines' : 'Semaine ' + saReelle}
              </h2>
              <button onClick={() => setAvance(!avance)} style={{fontSize:'11px', padding:'7px 14px', borderRadius:'20px', cursor:'pointer', fontWeight:700, background: avance ? C.dark : C.white, color: avance ? C.gold : C.text, border: avance ? 'none' : `1px solid ${C.border}`}}>
                {avance ? '← Revenir' : "S'avancer +4 SA"}
              </button>
            </div>

            <div style={{background:C.dark, borderRadius:'20px', padding:'24px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'16px', right:'20px', fontSize:'80px', lineHeight:1, opacity:0.9}}>{data.emoji}</div>
              <div style={{position:'relative'}}>
                <p style={{color:'rgba(200,160,96,0.7)', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 8px', fontWeight:600}}>SA {sa}</p>
                <p style={{color:C.white, fontSize:'28px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1.1}}>
                  {data.taille} · {data.poids}
                </p>
                <p style={{color:'rgba(255,255,255,0.5)', fontSize:'14px', margin:'0 0 8px'}}>
                  Comme {data.objet}
                </p>
              </div>
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px'}}>
                <span style={{fontSize:'18px'}}>🔬</span>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Developpement</p>
              </div>
              <p style={{color:C.text, fontSize:'14px', lineHeight:1.7, margin:0}}>{data.developpement}</p>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px'}}>
                  <span style={{fontSize:'16px'}}>🤱</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Ce que vit maman</p>
                </div>
                <p style={{color:C.text, fontSize:'13px', lineHeight:1.5, margin:0}}>{data.maman}</p>
              </div>
              <div style={{background:C.gold, borderRadius:'16px', padding:'18px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px'}}>
                  <span style={{fontSize:'16px'}}>💪</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Ton role</p>
                </div>
                <p style={{color:C.dark, fontSize:'13px', lineHeight:1.5, margin:0, fontWeight:500}}>{data.conseil}</p>
              </div>
            </div>

            <div style={{background:C.dark, borderRadius:'16px', padding:'20px'}}>
              <div style={{display:'flex', gap:'12px', alignItems:'flex-start'}}>
                <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(200,160,96,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0}}>🧠</div>
                <div>
                  <p style={{color:C.gold, fontSize:'14px', fontWeight:800, margin:'0 0 6px'}}>Le savais-tu ?</p>
                  <p style={{color:C.white, fontSize:'13px', lineHeight:1.6, margin:0}}>{data.savistu}</p>
                </div>
              </div>
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px'}}>
                <span style={{fontSize:'18px'}}>📓</span>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Journal</p>
              </div>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Ce que j'ai ressenti cette semaine..." style={{width:'100%', background:'#f8f7f4', border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px', fontSize:'13px', color:C.dark, resize:'none', boxSizing:'border-box' as const, fontFamily:'sans-serif', outline:'none'}} rows={3}/>
              <button onClick={saveNote} style={{marginTop:'8px', background:C.dark, color:C.gold, fontSize:'12px', fontWeight:700, padding:'8px 20px', borderRadius:'20px', border:'none', cursor:'pointer'}}>Enregistrer</button>
              {notes.length > 0 && (
                <div style={{marginTop:'12px', display:'flex', flexDirection:'column', gap:'8px'}}>
                  {notes.slice(-3).reverse().map((n, i) => (
                    <p key={i} style={{color:C.textLight, fontSize:'12px', background:'#f8f7f4', borderRadius:'10px', padding:'10px', margin:0, lineHeight:1.5}}>{n}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== RDV ========== */}
        {activeTab === 'rdv' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Calendrier RDV</h2>
              {dpa && <p style={{color:C.textLight, fontSize:'12px', margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR', {day:'numeric', month:'long'})}</p>}
            </div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:'20px', top:0, bottom:0, width:'2px', background:C.border}}/>
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                {RDV_LIST.map((r, i) => {
                  const statut = !saReelle ? 'futur' : r.sa < saReelle ? 'passe' : r.sa <= saReelle + 2 ? 'prochain' : 'futur';
                  return (
                    <div key={i} style={{position:'relative', paddingLeft:'52px'}}>
                      <div style={{position:'absolute', left:'12px', top:'18px', width:'18px', height:'18px', borderRadius:'50%', border:`2px solid ${statut === 'passe' ? C.gold : statut === 'prochain' ? C.gold : C.border}`, background: statut === 'passe' ? C.gold : statut === 'prochain' ? C.gold : C.white, display:'flex', alignItems:'center', justifyContent:'center', transform: statut === 'prochain' ? 'scale(1.2)' : 'scale(1)'}}>
                        {statut === 'passe' && <span style={{color:C.dark, fontSize:'10px', fontWeight:700}}>✓</span>}
                      </div>
                      <button onClick={() => setRdvOuvert(rdvOuvert === i ? null : i)} style={{width:'100%', textAlign:'left', borderRadius:'16px', padding:'14px 16px', border:'none', cursor:'pointer', background: statut === 'prochain' ? C.dark : C.white, outline:'none', opacity: statut === 'passe' ? 0.55 : 1, borderLeft: statut === 'prochain' ? `3px solid ${C.gold}` : `1px solid ${C.border}`}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <span style={{fontSize:'18px'}}>{r.emoji}</span>
                            <div>
                              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                <p style={{color: statut === 'prochain' ? C.white : C.dark, fontSize:'13px', fontWeight:700, margin:0}}>{r.titre}</p>
                                {r.oblig && <span style={{background: statut === 'prochain' ? 'rgba(200,160,96,0.2)' : '#f8f7f4', color:C.gold, fontSize:'9px', fontWeight:700, padding:'2px 6px', borderRadius:'10px'}}>obligatoire</span>}
                              </div>
                              <p style={{color:C.textLight, fontSize:'11px', margin:0}}>SA {r.sa}{dpa ? ' · ' + new Date(new Date(dpa).getTime() - (40 - r.sa) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {day:'numeric', month:'short'}) : ''}</p>
                            </div>
                          </div>
                          <span style={{color:C.textLight, fontSize:'11px'}}>{rdvOuvert === i ? '▲' : '▼'}</span>
                        </div>
                        {rdvOuvert === i && <p style={{color: statut === 'prochain' ? 'rgba(255,255,255,0.6)' : C.text, fontSize:'12px', lineHeight:1.5, margin:'10px 0 0', paddingTop:'10px', borderTop:`1px solid ${statut === 'prochain' ? 'rgba(255,255,255,0.1)' : C.border}`}}>{r.desc}</p>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========== PRATIQUE ========== */}
        {activeTab === 'pratique' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Pratique</h2>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{fontSize:'18px'}}>🧳</span>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Valise maternite</p>
                </div>
                <span style={{background:C.dark, color:C.gold, fontSize:'11px', fontWeight:700, padding:'3px 12px', borderRadius:'20px'}}>{Object.values(valiseChecked).filter(Boolean).length}/21</span>
              </div>
              <div style={{background:'#f8f7f4', borderRadius:'6px', height:'4px', marginBottom:'16px'}}>
                <div style={{background:C.gold, height:'4px', borderRadius:'6px', width:(Object.values(valiseChecked).filter(Boolean).length/21*100)+'%', transition:'width 0.3s'}}/>
              </div>
              {[
                {titre:'Pour toi', items:[{id:'v1',label:'Chargeur + batterie externe'},{id:'v2',label:'Vetements confort (2 jours)'},{id:'v3',label:'Snacks & eau'},{id:'v4',label:'Ecouteurs'},{id:'v5',label:'Documents hospitaliers'},{id:'v6',label:'Appareil photo charge'}]},
                {titre:'Pour elle', items:[{id:'v7',label:'Chemise de nuit accouchement'},{id:'v8',label:'Robe de chambre + chaussons'},{id:'v9',label:'Sous-vetements post-partum'},{id:'v10',label:'Produits de toilette'},{id:'v11',label:'Soutien-gorge allaitement x2'}]},
                {titre:'Pour bebe', items:[{id:'v12',label:'Body naissance x3'},{id:'v13',label:'Pyjama naissance x2'},{id:'v14',label:'Bonnet naissance x2'},{id:'v15',label:'Gigoteuse naissance'},{id:'v16',label:'Siege auto installe'},{id:'v17',label:'Couches nouveau-ne'}]},
                {titre:'Documents', items:[{id:'v18',label:'Carte vitale + mutuelle'},{id:'v19',label:'Carnet de maternite'},{id:'v20',label:'Pieces didentite'},{id:'v21',label:'Plan acces maternite'}]},
              ].map(s => (
                <div key={s.titre} style={{marginBottom:'16px'}}>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'2px', margin:'0 0 10px'}}>{s.titre}</p>
                  <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                    {s.items.map(item => (
                      <button key={item.id} onClick={() => toggleValise(item.id)} style={{display:'flex', alignItems:'center', gap:'12px', background:'none', border:'none', cursor:'pointer', textAlign:'left', padding:'4px 0'}}>
                        <div style={{width:'22px', height:'22px', borderRadius:'6px', border:`2px solid ${valiseChecked[item.id] ? C.gold : C.border}`, background: valiseChecked[item.id] ? C.gold : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s'}}>
                          {valiseChecked[item.id] && <span style={{color:C.dark, fontSize:'12px', fontWeight:700}}>✓</span>}
                        </div>
                        <span style={{fontSize:'13px', color: valiseChecked[item.id] ? C.textLight : C.dark, textDecoration: valiseChecked[item.id] ? 'line-through' : 'none'}}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px'}}>
                <span style={{fontSize:'18px'}}>🛒</span>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Liste achats prioritaires</p>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                {[
                  {label:'Siege auto groupe 0+', priorite:'urgent', prix:'80-300€'},
                  {label:'Babyphone video', priorite:'urgent', prix:'40-150€'},
                  {label:'Lit cododo / berceau', priorite:'urgent', prix:'60-400€'},
                  {label:'Poussette combinee', priorite:'avant naissance', prix:'200-1200€'},
                  {label:'Tire-lait electrique', priorite:'si allaitement', prix:'30-200€'},
                  {label:'Thermometre rectal', priorite:'urgent', prix:'15-40€'},
                  {label:'Humidificateur', priorite:'utile', prix:'30-80€'},
                ].map((a, i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px', background:'#f8f7f4', borderRadius:'12px'}}>
                    <div>
                      <p style={{color:C.dark, fontSize:'13px', fontWeight:600, margin:'0 0 4px'}}>{a.label}</p>
                      <span style={{background: a.priorite === 'urgent' ? '#fff0f0' : C.cream, color: a.priorite === 'urgent' ? '#cc4444' : C.textLight, fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'10px'}}>{a.priorite}</span>
                    </div>
                    <p style={{color:C.gold, fontSize:'13px', fontWeight:700, margin:0}}>{a.prix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px'}}>
                <span style={{fontSize:'18px'}}>🌙</span>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Survie 1er mois</p>
              </div>
              {[
                {titre:'Emmaillotage', contenu:"Etendre la couverture en losange. Replier le coin superieur a 15cm. Poser bebe epaules sur le bord replie. Ramener le cote gauche, glisser sous le dos. Ramener le bas vers le haut. Replier le cote droit et glisser sous le dos. Verifie que tu passes 2 doigts au niveau des hanches."},
                {titre:'Bebe pleure — protocole', contenu:"1. Faim ? (toutes les 2-3h) 2. Couche sale ? 3. Temperature ? (nuque = thermometre ideal) 4. Besoin de contact ? (peau a peau) 5. Coliques ? (position football ou velo avec les jambes) 6. Surstimule ? (piece calme, voix douce)"},
                {titre:'Sommeil de bebe', contenu:"Nouveau-ne dort 16-18h/24 en cycles de 2-3h. Toujours sur le dos, dans son propre espace. Sans oreiller ni couette. Temperature : 18-20°C. Les reveils nocturnes diminuent progressivement vers 3-4 mois."},
                {titre:"Signes d'alerte — urgences pediatriques", contenu:"Temperature > 38°C avant 3 mois. Refus de s'alimenter sur 2 tetes consecutives. Pleurs inhabituels inconsolables. Teint gris ou jaunatre intense. Fontanelle bombee. Difficultes respiratoires. En cas de doute : 15 (SAMU) ou urgences pediatriques."},
              ].map((s, i) => (
                <div key={i} style={{marginBottom: i < 3 ? '16px' : 0, paddingBottom: i < 3 ? '16px' : 0, borderBottom: i < 3 ? `1px solid ${C.border}` : 'none'}}>
                  <p style={{color:C.gold, fontSize:'13px', fontWeight:800, margin:'0 0 6px'}}>{s.titre}</p>
                  <p style={{color:C.text, fontSize:'13px', lineHeight:1.6, margin:0}}>{s.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== CADEAUX ========== */}
        {activeTab === 'cadeaux' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Cadeaux & Bons plans</h2>
            <div style={{background:C.gold, borderRadius:'16px', padding:'18px'}}>
              <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px'}}>
                <span style={{fontSize:'18px'}}>✨</span>
                <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Idee du mois</p>
              </div>
              <p style={{color:C.dark, fontSize:'13px', fontWeight:500, margin:0, lineHeight:1.6}}>{ideesMois}</p>
            </div>
            {PARTENAIRES.map(cat => (
              <div key={cat.categorie} style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px'}}>{cat.categorie}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px', background:'#f8f7f4', borderRadius:'12px'}}>
                      <div>
                        <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 2px'}}>{item.nom}</p>
                        <p style={{color:C.textLight, fontSize:'11px', margin:0}}>{item.desc}</p>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:'8px', flexShrink:0}}>
                        <span style={{background:C.gold, color:C.dark, fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'20px'}}>{item.remise}</span>
                        <a href={item.lien} style={{background:C.dark, color:C.gold, fontSize:'11px', fontWeight:700, padding:'6px 14px', borderRadius:'20px', textDecoration:'none'}}>Voir</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

function Onboarding({onSave}: {onSave: (dpa: string, prenom: string) => void}) {
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');

  return (
    <main style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'420px', width:'100%'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:'32px'}}>
          <svg viewBox="0 0 300 300" width="72" height="72">
            <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
            <circle cx="150" cy="150" r="122" fill="#4a6080"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
            <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
          </svg>
        </div>
        <div style={{background:C.white, borderRadius:'24px', padding:'32px', border:`1px solid ${C.border}`}}>
          <h1 style={{fontSize:'24px', fontWeight:800, color:C.dark, margin:'0 0 8px', textAlign:'center', fontFamily:'Georgia,serif'}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.text, fontSize:'14px', textAlign:'center', margin:'0 0 28px'}}>Deux infos pour personnaliser ton espace.</p>
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Ton prenom</label>
              <input type="text" placeholder="Thomas, Julien, Marc..." value={prenom} onChange={e => setPrenom(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif', outline:'none'}}/>
            </div>
            <div>
              <label style={{display:'block', color:C.dark, fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Date prevue d'accouchement</label>
              <input type="date" value={dpa} onChange={e => setDpa(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'12px 16px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, fontFamily:'sans-serif', outline:'none'}}/>
            </div>
            <button onClick={() => dpa && onSave(dpa, prenom)} disabled={!dpa} style={{background: dpa ? C.dark : '#ccc', color:C.white, border:'none', borderRadius:'24px', padding:'14px', fontSize:'14px', fontWeight:700, cursor: dpa ? 'pointer' : 'not-allowed', fontFamily:'sans-serif', marginTop:'8px'}}>
              Acceder a mon espace
            </button>
          </div>
        </div>
        <p style={{textAlign:'center', color:C.textLight, fontSize:'11px', marginTop:'16px'}}>Aucune donnee personnelle stockee en ligne.</p>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <p style={{color:C.textLight}}>Chargement...</p>
      </div>
    }>
      <DashboardContent/>
    </Suspense>
  );
}
