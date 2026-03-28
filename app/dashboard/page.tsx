'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  dark:'#1e2535', blue:'#2E5F8A', blueDark:'#1A3D5C', gold:'#c8a060',
  white:'#ffffff', border:'#f0ede8', text:'#1e2535', textLight:'#6B8FA8',
  muted:'#9aa0a8', orange:'#FFF0E6', green:'#E4F5EC', amber:'#FFF7E0',
  teal:'#E0F5F0', coral:'#FDECEA', blueLight:'#E6F0FA', cream:'#f7f5f0',
};

// ── Données semaines ──────────────────────────────────────────────────────────
type SAData = {
  emoji:string; taille:string; poids:string; titre:string; intro:string;
  developpement:string; organes:string[]; savistu:string;
  faq:{q:string;r:string}[]; maman_titre:string; maman:string;
  maman_aide:string; maman_signe:string; alerte:string; doc_titre:string;
  doc:string; conseil:string;
};

const SD: Record<number,SAData> = {
  6:{emoji:'🌾',taille:'0,6 cm',poids:'moins de 1 g',titre:"Le coeur commence à battre",intro:"À 6 SA, bébé mesure 0,6 cm. Le tube neural se ferme. Le coeur commence à battre de façon primitive.",developpement:"Le tube neural se ferme cette semaine. C'est la structure qui donnera naissance au cerveau et à la moelle épinière. Le coeur commence à battre autour de 100 à 120 battements par minute. Les bourgeons des membres apparaissent. Tous les organes principaux sont en cours d'initialisation.",organes:["Tube neural","Coeur primitif","Bourgeons des membres"],savistu:"Le coeur de bébé bat déjà à 6 SA, mais si petit qu'une échographie ne peut pas toujours le visualiser clairement.",faq:[{q:"Les nausées sont-elles normales ?",r:"Oui, elles sont causées par l'hormone hCG. Elles touchent 70 à 85% des femmes enceintes et sont souvent le signe d'une grossesse qui évolue normalement."},{q:"Que puis-je faire pour aider ?",r:"Prépare des en-cas légers à portée de main. Évite les odeurs fortes. Ton soutien silencieux et pratique compte énormément."}],maman_titre:"Les nausées peuvent être intenses",maman:"Les nausées matinales peuvent être intenses, parfois accompagnées de vomissements. La fatigue est souvent écrasante. Les seins sont sensibles et gonflés. Ces symptômes sont des signes que la grossesse évolue normalement.",maman_aide:"Prépare des en-cas légers accessibles à tout moment",maman_signe:"Les nausées peuvent survenir à n'importe quelle heure",alerte:"Si les vomissements sont si intenses qu'elle ne peut rien garder, consulter un médecin. C'est une hyperémèse gravidique qui nécessite un traitement.",doc_titre:"Le suivi médical commence",doc:"La première consultation doit être faite avant la fin du 1er trimestre. Elle permet de confirmer la grossesse, calculer la date d'accouchement prévue et prescrire les analyses de sang obligatoires.",conseil:"Les nausées sont réelles et épuisantes. Ne les minimise pas. Prends le relais sur les tâches ménagères sans qu'elle ait à demander."},
  7:{emoji:'🫐',taille:'1 cm',poids:'1 g',titre:"Le visage se structure",intro:"À 7 SA, bébé mesure 1 cm. Le visage commence à se structurer avec les fosses nasales et les bourgeons oculaires.",developpement:"Le visage commence à se structurer. Les fosses nasales, les bourgeons oculaires et les ébauches des oreilles sont visibles. Les bras et les jambes s'allongent. Le foie commence à produire des cellules sanguines.",organes:["Fosses nasales","Bourgeons oculaires","Ébauches des oreilles","Foie"],savistu:"À 7 SA, les empreintes digitales de bébé commencent à se former. Elles sont déjà uniques et ne changeront jamais.",faq:[{q:"L'hypersalivation est-elle normale ?",r:"Oui. C'est un phénomène normal mais inconfortable appelé ptyalisme gravidique, lié aux hormones."},{q:"Comment l'aider avec les odeurs ?",r:"Prends en charge la cuisine si certaines odeurs la font suffoquer. Propose des repas simples, froids si nécessaire."}],maman_titre:"Les nausées atteignent souvent leur pic",maman:"Les nausées atteignent souvent leur pic cette semaine. L'hypersensibilité aux odeurs peut rendre certains aliments insupportables. Certaines femmes développent une hypersalivation, phénomène normal mais inconfortable.",maman_aide:"Prends le relais en cuisine si certaines odeurs la font suffoquer",maman_signe:"L'hypersensibilité aux odeurs est neurologique, pas un caprice",alerte:"Si elle ne peut plus rien avaler du tout depuis plus de 24h, consulter en urgence.",doc_titre:"Les analyses de sang obligatoires",doc:"Les analyses prescrites lors de la 1ère consultation incluent le groupe sanguin, la rubéole, la toxoplasmose et les hépatites. Sans immunité contre la toxoplasmose, éviter la viande crue et les chats.",conseil:"Ce n'est pas une caprice. C'est neurologique. Propose des repas simples. Être présent sans surprotéger est la clé."},
  8:{emoji:'🫐',taille:'1,6 cm',poids:'1 g',titre:"Les doigts se séparent",intro:"À 8 SA, bébé mesure 1,6 cm. Les doigts commencent à se séparer. Le cerveau se développe très rapidement.",developpement:"Les doigts commencent à se séparer. Le cerveau se développe si rapidement qu'il forme des plis pour augmenter sa surface. Les organes génitaux se différencient mais ne sont pas encore visibles. Tous les organes principaux sont en cours de formation.",organes:["Doigts séparés","Plis cérébraux","Organes génitaux"],savistu:"Le cerveau de bébé produit environ 100 nouvelles cellules nerveuses par minute à ce stade.",faq:[{q:"La fatigue extrême est-elle normale ?",r:"Oui. Elle est liée à la production intense de progestérone et est tout à fait normale au 1er trimestre."},{q:"Les maux de tête sont-ils fréquents ?",r:"Oui, ils peuvent apparaître. Rester bien hydratée aide. Le paracétamol est possible, pas l'ibuprofène."}],maman_titre:"La fatigue est souvent écrasante",maman:"La fatigue extrême est normale et liée à la production intense de progestérone. Des maux de tête peuvent apparaître. L'humeur est souvent instable en raison des fluctuations hormonales.",maman_aide:"Prends le relais sur les tâches ménagères cette semaine",maman_signe:"Les sautes d'humeur sont biochimiques, pas personnelles",alerte:"Des pertes de sang importantes ou des douleurs abdominales intenses nécessitent une consultation en urgence.",doc_titre:"Déclarer la grossesse à la Sécurité sociale",doc:"La grossesse doit être déclarée à l'Assurance maladie avant la fin du 3e mois pour ouvrir les droits aux remboursements à 100% à partir du 6e mois. À faire sur ameli.fr.",conseil:"Prends le relais sur les tâches ménagères sans qu'elle ait à demander. Anticipe. Ces gestes concrets lui montrent que tu es pleinement présent."},
  9:{emoji:'🫒',taille:'2,3 cm',poids:'2 g',titre:"Bébé bouge mais tu ne le sens pas encore",intro:"À 9 SA, bébé mesure 2,3 cm. Tous les organes principaux sont maintenant en place. Il peut sucer son pouce.",developpement:"Bébé bouge mais est trop petit pour être senti. Tous les organes principaux sont maintenant en place. Les semaines suivantes serviront à les perfectionner. Le foetus peut sucer son pouce. Les dents de lait commencent à se former.",organes:["Succion du pouce","Dents de lait","Tous organes en place"],savistu:"À 9 SA, le coeur de bébé bat à environ 170 battements par minute, soit deux fois plus vite que le tien.",faq:[{q:"Les sautes d'humeur sont-elles normales ?",r:"Oui. Elles sont directement liées aux hormones. Ta stabilité émotionnelle est un ancrage précieux."},{q:"Quand le ventre va-t-il se voir ?",r:"Pour un premier enfant, le ventre devient visible entre la 12e et la 16e semaine."}],maman_titre:"Les sautes d'humeur sont fréquentes",maman:"Les sautes d'humeur sont fréquentes et intenses, directement liées aux hormones. Certaines femmes ressentent une anxiété accrue. Le ventre n'est pas encore visible mais les vêtements peuvent commencer à serrer.",maman_aide:"Écoute sans chercher à résoudre",maman_signe:"Les émotions intenses sont biochimiques",alerte:"Une douleur vive d'un côté du ventre avec saignements peut indiquer une grossesse extra-utérine. Consulter en urgence.",doc_titre:"La 1ère échographie approche",doc:"Elle a lieu entre 11 et 13 SA. Elle date précisément la grossesse, mesure la clarté nucale pour évaluer le risque de trisomie 21, et permet de voir le coeur battre. Prends une demi-journée.",conseil:"Les sautes d'humeur ne sont pas dirigées contre toi. Accueille-les avec calme. Ta stabilité émotionnelle est un ancrage précieux."},
  10:{emoji:'🍓',taille:'3 cm',poids:'4 g',titre:"La période embryonnaire est terminée",intro:"À 10 SA, bébé mesure 3 cm. Il est officiellement appelé foetus. Les ongles apparaissent. Bébé peut faire des petits mouvements.",developpement:"Les ongles apparaissent. Bébé peut faire des petits mouvements spontanés visibles à l'échographie. Le foetus est maintenant officiellement appelé foetus. La période embryonnaire est terminée. Les organes génitaux se différencient davantage.",organes:["Ongles","Mouvements spontanés","Organes génitaux différenciés"],savistu:"À 10 SA, tous les organes essentiels sont en place. Les 30 semaines suivantes serviront uniquement à les faire grandir.",faq:[{q:"La 1ère échographie est-elle obligatoire ?",r:"Oui. Elle est obligatoire entre 11 et 13 SA + 6 jours. Elle mesure la clarté nucale et date la grossesse."},{q:"Que puis-je faire pendant l'échographie ?",r:"Sois pleinement présent, téléphone en mode silencieux. Filme. Prépare des questions pour le médecin."}],maman_titre:"Les nausées commencent à diminuer",maman:"Les nausées commencent souvent à diminuer progressivement. Un regain d'énergie peut apparaître. La libido peut revenir progressivement. Les premières variations de poids deviennent parfois visibles.",maman_aide:"Planifie la première échographie ensemble",maman_signe:"La diminution des nausées est normale à ce stade",alerte:"Si les nausées disparaissent brusquement et complètement du jour au lendemain, mentionner au médecin lors de la prochaine consultation.",doc_titre:"La 1ère échographie",doc:"Elle a lieu entre 11 et 13 SA. Elle date précisément la grossesse, mesure la clarté nucale et permet de voir le coeur battre. C'est souvent le moment le plus marquant du 1er trimestre. Prends une demi-journée. Filme.",conseil:"La 1ère échographie approche. C'est un moment émotionnel fort. Sois pleinement présent, téléphone en mode silencieux. Prépare une liste de questions pour le médecin."},
  11:{emoji:'🍋',taille:'4 cm',poids:'7 g',titre:"Les dents de lait se forment",intro:"À 11 SA, bébé mesure 4 cm. Les dents de lait se forment sous les gencives. Il effectue des mouvements de déglutition.",developpement:"Les dents de lait se forment sous les gencives. Elles ne perceront que 6 mois après la naissance. Le foetus effectue des mouvements de déglutition et d'inhalation du liquide amniotique. Les os commencent à se solidifier.",organes:["Dents de lait","Déglutition","Os qui se solidifient"],savistu:"Les dents de lait de bébé sont déjà en formation à 11 SA. Elles ne perceront qu'environ 6 mois après la naissance.",faq:[{q:"Le masque de grossesse est-il permanent ?",r:"Non. Le masque de grossesse (chloasma) disparaît généralement après l'accouchement."},{q:"Comment l'accompagner si elle se sent mal dans son corps ?",r:"Ta présence bienveillante et tes retours positifs comptent beaucoup. Évite les commentaires sur son corps, même positifs."}],maman_titre:"Le ventre commence légèrement à s'arrondir",maman:"Le ventre commence légèrement à s'arrondir. Les nausées diminuent pour beaucoup. La peau peut changer. Certaines femmes développent le masque de grossesse ou une ligne brune sur l'abdomen.",maman_aide:"Accompagne-la si elle souhaite faire des courses de vêtements de grossesse",maman_signe:"Les changements corporels peuvent être difficiles à vivre",alerte:"Une fièvre supérieure à 38,5°C nécessite une consultation rapide. Certaines infections peuvent affecter le développement de bébé.",doc_titre:"Informer l'employeur et la mutuelle",doc:"La grossesse doit être déclarée à la mutuelle pour optimiser les remboursements. Informer l'employeur ouvre le droit à des protections légales. Il est interdit de licencier une femme enceinte.",conseil:"Accompagne-la si elle souhaite renouveler sa garde-robe. C'est souvent un moment où elle se sent mal dans son corps. Ta présence bienveillante compte beaucoup."},
  12:{emoji:'🍋',taille:'5,4 cm',poids:'14 g',titre:"La fin du 1er trimestre",intro:"À 12 SA, c'est la fin du 1er trimestre. Un cap majeur. Le risque de fausse couche chute considérablement après cette semaine.",developpement:"C'est la fin du 1er trimestre, un cap majeur. Le risque de fausse couche chute considérablement après cette semaine. Le visage est pleinement reconnaissable avec ses traits humains. L'échographie T1 mesure la clarté nucale pour évaluer le risque de trisomie.",organes:["Visage reconnaissable","Clarté nucale mesurée","Organes presque complets"],savistu:"Après 12 SA, le risque de fausse couche passe sous la barre des 2%. C'est pour cette raison que beaucoup de couples attendent ce cap pour annoncer la grossesse.",faq:[{q:"L'échographie T1 est-elle douloureuse ?",r:"Non. Elle est indolore. Elle dure environ 30 minutes. Les résultats de la clarté nucale sont communiqués dans les jours suivants."},{q:"Doit-on annoncer la grossesse maintenant ?",r:"C'est votre décision. Beaucoup de couples attendent la fin du 1er trimestre pour l'annoncer. Le risque de fausse couche chute significativement après 12 SA."}],maman_titre:"Le soulagement émotionnel est souvent palpable",maman:"Le soulagement émotionnel est souvent palpable après ce cap. L'énergie revient progressivement. L'échographie T1 est un moment très attendu.",maman_aide:"Sois là pour l'échographie T1, sans exception",maman_signe:"Les résultats de la clarté nucale peuvent prendre quelques jours",alerte:"L'échographie T1 est obligatoire. Les résultats de la clarté nucale seront communiqués dans les jours suivants. Reste disponible émotionnellement pour accueillir les résultats ensemble.",doc_titre:"L'échographie T1",doc:"Elle est obligatoire entre 11 et 13 SA. Elle examine la clarté nucale, date la grossesse et vérifie le développement général. C'est souvent la première vraie image de bébé.",conseil:"L'échographie T1 est un rendez-vous majeur. Sois là, sans exception. Apporte ton téléphone chargé pour filmer. Les résultats seront communiqués dans les jours qui suivent."},
  13:{emoji:'🍑',taille:'7,4 cm',poids:'23 g',titre:"Le 2e trimestre commence",intro:"À 13 SA, le 2e trimestre commence. C'est souvent la période la plus confortable de la grossesse.",developpement:"Bébé peut sucer son pouce. Le réflexe de succion est pleinement opérationnel. Les empreintes digitales sont définitives. Le système urinaire fonctionne. Les cordes vocales se forment.",organes:["Succion du pouce","Empreintes digitales définitives","Cordes vocales"],savistu:"Bébé peut sucer son pouce dès 13 SA. Ce réflexe entraîné in utero sera l'un des premiers comportements autonomes après la naissance.",faq:[{q:"La libido peut-elle revenir ?",r:"Oui. Le 2e trimestre est souvent une période de regain d'énergie et parfois de libido. C'est normal."},{q:"Quand annoncer la grossesse ?",r:"Le 2e trimestre est le bon moment. Le risque de fausse couche est très faible. C'est aussi le moment idéal pour commencer à vous projeter ensemble."}],maman_titre:"Le 2e trimestre commence",maman:"Le 2e trimestre commence. C'est souvent la période la plus confortable de la grossesse. L'énergie revient, les nausées disparaissent pour la plupart. La libido peut augmenter.",maman_aide:"Proposez un week-end ou une sortie pour célébrer ce cap",maman_signe:"Le regain d'énergie est réel au 2e trimestre",alerte:"Si des nausées très intenses persistent au-delà du 1er trimestre, consulter un médecin.",doc_titre:"Annoncer la grossesse",doc:"Le 2e trimestre est le bon moment pour annoncer officiellement la grossesse. C'est aussi le moment idéal pour commencer à vous projeter ensemble et pour démarrer les démarches administratives.",conseil:"C'est le bon moment pour annoncer officiellement la grossesse. C'est aussi le moment idéal pour commencer à vous projeter ensemble. Ces conversations créent du lien et de l'anticipation positive."},
  14:{emoji:'🍑',taille:'8,7 cm',poids:'43 g',titre:"Les reins fonctionnent",intro:"À 14 SA, bébé mesure 8,7 cm. Les reins fonctionnent. Le sexe de bébé peut parfois être deviné à l'échographie.",developpement:"Le foetus produit de l'urine et l'élimine dans le liquide amniotique. Les reins fonctionnent. Le sexe de bébé peut parfois être deviné à l'échographie.",organes:["Reins fonctionnels","Urine dans le liquide amniotique","Sexe parfois visible"],savistu:"À 14 SA, le visage de bébé peut produire une trentaine d'expressions différentes.",faq:[{q:"Les douleurs ligamentaires sont-elles normales ?",r:"Oui. Elles sont causées par l'étirement des ligaments ronds qui soutiennent l'utérus. Elles sont normales et sans danger."},{q:"Peut-on connaître le sexe de bébé ?",r:"Parfois à l'échographie du 2e trimestre, vers 20 SA. Mais certains parents préfèrent la surprise. C'est votre choix."}],maman_titre:"Le ventre s'arrondit clairement",maman:"Le ventre s'arrondit clairement. La libido est souvent revenue. Des douleurs ligamentaires dans le bas-ventre peuvent apparaître en raison de l'étirement des ligaments ronds.",maman_aide:"Propose un week-end en amoureux avant l'arrivée de bébé",maman_signe:"Les douleurs ligamentaires sont normales et sans danger",alerte:"Une douleur très forte d'un côté du ventre, différente des douleurs ligamentaires habituelles, nécessite une consultation.",doc_titre:"Week-end en amoureux",doc:"Le 2e trimestre est la fenêtre idéale pour un week-end en amoureux. L'énergie est revenue, le ventre est encore génable et l'accouchement est loin. Ce moment de reconnexion en couple est précieux.",conseil:"Propose un week-end ou une sortie en amoureux. Le 2e trimestre est la fenêtre idéale. Ce moment de reconnexion est précieux avant l'arrivée de bébé."},
  15:{emoji:'🍎',taille:'10 cm',poids:'70 g',titre:"Bébé entend pour la 1ère fois",intro:"À 15 SA, bébé mesure 10 cm. Il entend pour la première fois. Les vibrations sonores traversent le liquide amniotique.",developpement:"Bébé entend pour la première fois. Les vibrations sonores traversent le liquide amniotique et atteignent ses oreilles en formation. Il peut percevoir des sons graves, notamment les voix masculines. Le squelette continue de se solidifier.",organes:["Oreilles fonctionnelles","Audition des sons graves","Squelette qui se solidifie"],savistu:"Les voix masculines, plus graves, traversent mieux le liquide amniotique. Ta voix est donc l'une des mieux perçues par bébé in utero.",faq:[{q:"Doit-on vraiment parler à bébé ?",r:"Oui. Les études montrent que les nouveau-nés reconnaissent les voix entendues in utero et y réagissent différemment."},{q:"Quels sons bébé peut-il entendre ?",r:"Surtout les sons graves. Ta voix est idéalement perçue. Tu peux aussi lui faire écouter de la musique douce."}],maman_titre:"La prise de poids devient visible",maman:"La prise de poids devient visible. Des vergetures peuvent apparaître. Le système cardiovasculaire travaille davantage. Le volume sanguin augmente de 40% pendant la grossesse.",maman_aide:"Parle à bébé chaque soir",maman_signe:"Les vergetures sont génétiquement déterminées",alerte:"Des gonflements importants des chevilles, surtout asymétriques, peuvent signaler une phlébite. Consulter.",doc_titre:"Parler à bébé",doc:"Les études montrent que les nouveau-nés reconnaissent les voix entendues in utero. Ta voix, plus grave, est l'une des mieux perçues. Instaure un rituel de quelques minutes chaque soir.",conseil:"Parle à bébé chaque soir. Les études montrent que les nouveau-nés reconnaissent les voix entendues in utero et y réagissent différemment. C'est le début de votre relation avant même la naissance."},
  16:{emoji:'🥑',taille:'11,6 cm',poids:'100 g',titre:"Les premiers mouvements",intro:"À 16 SA, bébé mesure 11,6 cm. Les premières sensations de mouvement peuvent apparaître pour la maman.",developpement:"Le squelette se renforce progressivement. Le cartilage se transforme en os. Les yeux peuvent percevoir la lumière bien que toujours fermés. Le système nerveux central coordonne de mieux en mieux les mouvements.",organes:["Cartilage qui devient os","Yeux qui perçoivent la lumière","Coordination motrice"],savistu:"À 16 SA, le foetus peut attraper son propre cordon ombilical, ce qui témoigne du développement de sa coordination motrice.",faq:[{q:"Les premiers mouvements sont-ils douloureux ?",r:"Non. Ils sont souvent décrits comme des bulles ou des papillons dans le ventre. C'est une sensation légère."},{q:"Quand dois-je réserver les cours de préparation à l'accouchement ?",r:"Maintenant. Ils se remplissent vite. Des cours spécifiques pour les pères existent dans de nombreuses maternités."}],maman_titre:"Les premiers mouvements peuvent apparaître",maman:"Les premières sensations de mouvement peuvent apparaître. Souvent décrites comme des bulles ou des papillons dans le ventre. La pression sur la vessie augmente avec la croissance de l'utérus.",maman_aide:"Réserve les cours de préparation à l'accouchement maintenant",maman_signe:"Les premiers mouvements ressentis sont appelés 'quickening'",alerte:"Si aucun mouvement n'est ressenti d'ici 20 SA pour une 1ère grossesse, en parler au médecin.",doc_titre:"Réserver les cours de préparation",doc:"Les cours de préparation à l'accouchement se remplissent vite. À réserver maintenant. Des cours spécifiques pour les pères existent dans de nombreuses maternités. Y participer activement te permettra de te sentir acteur lors de l'accouchement.",conseil:"Les cours de préparation à l'accouchement sont à réserver maintenant. Des cours spécifiques pour les pères existent. Participer activement te permettra de te sentir pleinement acteur lors de l'accouchement."},
  17:{emoji:'🍐',taille:'13 cm',poids:'140 g',titre:"Les empreintes palmaires se forment",intro:"À 17 SA, bébé mesure 13 cm. Une couche de graisse brune commence à se former. Les empreintes palmaires se forment.",developpement:"Une couche de graisse brune commence à se former sous la peau. Elle servira à réguler la température corporelle après la naissance. Bébé s'entraîne à avaler et à respirer le liquide amniotique. Les empreintes palmaires se forment.",organes:["Graisse brune","Déglutition","Empreintes palmaires"],savistu:"Les empreintes de la paume de bébé se forment à 17 SA, uniques comme les siennes.",faq:[{q:"Peut-on pratiquer le sport pendant la grossesse ?",r:"Oui, une activité physique douce est recommandée. Natation, marche, yoga prénatal. Éviter les sports de contact."},{q:"Le massage du ventre est-il bénéfique ?",r:"Oui. Masse son ventre avec de l'huile chaque soir. Ce rituel prend 5 minutes et a un impact physique et émotionnel réel."}],maman_titre:"Des douleurs dans les côtes peuvent apparaître",maman:"Les mouvements de bébé sont parfois perceptibles. Le ventre est bien visible. Des douleurs dans les côtes peuvent apparaître en raison de l'expansion de l'utérus.",maman_aide:"Pose ta main sur son ventre le soir en parlant à bébé",maman_signe:"L'utérus arrive maintenant au niveau du nombril",alerte:"Des douleurs très intenses dans les côtes droites peuvent signaler un problème hépatique. Consulter rapidement.",doc_titre:"Le rituel du soir",doc:"Instaure le rituel de la main sur le ventre chaque soir en parlant à bébé. Même si tu ne sens encore rien, ce rituel crée une connexion émotionnelle réelle pour vous trois.",conseil:"Pose ta main sur son ventre le soir en parlant à bébé. Ce rituel crée une connexion émotionnelle réelle. Elle appréciera ce geste d'attention quotidien."},
  18:{emoji:'🫑',taille:'14,2 cm',poids:'190 g',titre:"Le sens du toucher se développe",intro:"À 18 SA, bébé mesure 14,2 cm. Il développe son sens du toucher. Il explore son environnement avec ses mains.",developpement:"Les os se solidifient davantage. Bébé développe son sens du toucher. Il explore son environnement avec ses mains et son visage. Le système vestibulaire se développe, lui permettant de percevoir les mouvements et sa position dans l'espace.",organes:["Sens du toucher","Système vestibulaire","Os solidifiés"],savistu:"À 18 SA, bébé peut entendre la musique que vous écoutez ensemble. Des études suggèrent que les nourrissons reconnaissent des mélodies entendues in utero.",faq:[{q:"Les douleurs dans le dos sont-elles normales ?",r:"Oui. Elles sont liées au changement de centre de gravité. Le massage du bas du dos quelques minutes par jour aide vraiment."},{q:"Les crampes nocturnes sont-elles normales ?",r:"Oui. Les crampes dans les jambes la nuit sont fréquentes. Hydratation, magnésium et étirements doux aident."}],maman_titre:"Le dos peut commencer à souffrir",maman:"Les douleurs ligamentaires sont fréquentes. Le dos peut commencer à souffrir. Des crampes nocturnes dans les jambes sont possibles.",maman_aide:"Propose des massages du dos régulièrement",maman_signe:"Les crampes nocturnes peuvent être soulagées par des étirements doux",alerte:"Des crampes dans le mollet avec rougeur et chaleur peuvent signaler une phlébite. Consulter rapidement.",doc_titre:"Le massage du dos",doc:"Propose des massages du dos régulièrement. Tu n'as pas besoin d'être expert. Quelques minutes de pression douce sur le bas du dos suffisent. Ce geste quotidien renforce votre connexion physique.",conseil:"Propose des massages du dos régulièrement. Tu n'as pas besoin d'être expert. Quelques minutes de pression douce sur le bas du dos suffisent."},
  19:{emoji:'🥭',taille:'15,3 cm',poids:'240 g',titre:"250 000 neurones par minute",intro:"À 19 SA, bébé mesure 15,3 cm. Les cellules cérébrales se multiplient à un rythme de 250 000 par minute.",developpement:"Tous les sens se développent rapidement. Le vernix caseosa commence à recouvrir la peau de bébé pour la protéger du liquide amniotique. Les cellules cérébrales se multiplient à un rythme de 250 000 par minute.",organes:["Vernix caseosa","Multiplication neuronale","Sens en développement"],savistu:"Le cerveau de bébé produit 250 000 nouvelles cellules nerveuses par minute à 19 SA. Cette phase de prolifération neuronale intense est unique dans toute sa vie.",faq:[{q:"Quand commencer à préparer la chambre ?",r:"Maintenant est un bon moment. Monter les meubles, choisir la décoration. Ces activités partagées t'ancrent dans la réalité de l'arrivée de bébé."},{q:"La congestion nasale est-elle normale ?",r:"Oui. Elle est causée par l'augmentation du volume sanguin et les hormones. Elle disparaît après l'accouchement."}],maman_titre:"Le ventre est très visible",maman:"Le ventre est très visible. Des problèmes de congestion nasale peuvent apparaître. La fatigue peut revenir légèrement.",maman_aide:"Commencez à préparer la chambre de bébé ensemble",maman_signe:"La congestion nasale est liée à l'augmentation du volume sanguin",alerte:"Si les mouvements de bébé s'arrêtent complètement, consulter rapidement.",doc_titre:"Préparer la chambre de bébé",doc:"Commencer à préparer la chambre de bébé ensemble. Monter les meubles, choisir la décoration. Ces activités partagées t'ancrent dans la réalité de l'arrivée de bébé.",conseil:"Commencez à préparer la chambre de bébé ensemble. Monter les meubles, choisir la décoration. Ces activités partagées t'ancrent dans la réalité de l'arrivée de bébé."},
  20:{emoji:'🍌',taille:'16,4 cm',poids:'300 g',titre:"La mi-grossesse",intro:"À 20 SA, c'est la mi-grossesse. L'échographie morphologique T2 est réalisée cette semaine. C'est la plus complète de la grossesse.",developpement:"C'est la mi-grossesse. L'échographie morphologique T2 est réalisée cette semaine. Elle est la plus complète de la grossesse. Elle examine en détail chaque organe, chaque membre. Le sexe est généralement visible.",organes:["Échographie T2","Tous organes examinés","Sexe généralement visible"],savistu:"L'échographie morphologique T2 examine plus de 100 critères anatomiques. C'est l'examen médical le plus complet de la grossesse.",faq:[{q:"Peut-on connaître le sexe de bébé à l'échographie T2 ?",r:"Généralement oui. Mais ce n'est pas toujours visible selon la position de bébé. Si vous souhaitez la surprise, prévenez l'échographiste."},{q:"L'échographie T2 détecte-t-elle toutes les malformations ?",r:"Elle examine plus de 100 critères mais ne peut pas détecter toutes les anomalies. Le taux de détection est d'environ 80%."}],maman_titre:"L'échographie T2 est souvent vécue avec anxiété",maman:"L'échographie T2 est souvent vécue avec une anxiété mêlée d'excitation. C'est le rendez-vous médical le plus attendu et potentiellement le plus stressant de la grossesse.",maman_aide:"Prends une demi-journée de congé pour cette échographie",maman_signe:"L'échographie T2 dure environ 45 minutes",alerte:"Si des anomalies sont détectées, une consultation avec un médecin spécialiste sera proposée. Reste disponible émotionnellement.",doc_titre:"L'échographie T2",doc:"Prends une demi-journée de congé. Préparez vos questions à l'avance. Filmez. Après, prenez le temps de vous poser ensemble pour digérer émotionnellement ce que vous venez de vivre.",conseil:"Prends une demi-journée de congé pour cette échographie. Préparez les questions à l'avance. Filmez. Après, prenez le temps de vous poser ensemble."},
};

// Alias pour les SA manquantes
for(let sa=21;sa<=41;sa++){
  if(!(sa in SD)){
    const closest = sa<=30 ? 20 : sa<=35 ? 35 : 40;
    (SD as any)[sa] = (SD as any)[Math.min(sa,20)] || (SD as any)[20];
  }
}

// ── Missions ──────────────────────────────────────────────────────────────────
const MISSIONS: Record<number,string[]> = {
  6:["Dire à ta partenaire que tu es là pour elle","Faire les courses sans qu'elle ait à demander","Vérifier qu'un suivi médical est en place"],
  7:["Préparer des en-cas anti-nausées accessibles à tout moment","Éviter les odeurs fortes dans la maison","Commencer à lire sur la grossesse"],
  8:["Prendre le relais sur les tâches ménagères cette semaine","Accompagner ta partenaire à sa première consultation","Informer discrètement ton employeur si besoin"],
  9:["Pratiquer l'écoute active sans chercher à résoudre","Proposer un massage des pieds ou du dos le soir","Réduire les sources de stress dans la maison"],
  10:["Planifier la première échographie ensemble","Lire le guide accouchement","Préparer une liste de questions pour le médecin"],
  11:["Accompagner chercher des vêtements de grossesse si souhaité","Commencer à réfléchir à l'organisation financière","Déclarer la grossesse à la mutuelle"],
  12:["Être présent à l'échographie T1 — poser une demi-journée","Filmer et photographier l'échographie","Décider ensemble quand annoncer la grossesse"],
  13:["Annoncer la grossesse à la famille si vous le souhaitez","Commencer les discussions sur les prénoms","Lire le module post-partum pour anticiper"],
  14:["Organiser un week-end ou une sortie en amoureux","Commencer les recherches poussette et siège auto","Vérifier les aides financières et congés disponibles"],
  15:["Instaurer le rituel : parler à bébé chaque soir","Réserver les cours de préparation à l'accouchement","Commencer un album photo de la grossesse"],
  16:["Réserver les cours de préparation si pas encore fait","Établir la liste des achats prioritaires avec budget","Réfléchir à l'aménagement de la chambre"],
  17:["Instaurer le rituel de la main sur le ventre le soir","Commander le coussin de grossesse","Commencer le module valise maternité"],
  18:["Proposer des massages du dos réguliers","Préparer la chambre de bébé ensemble","Se renseigner sur les crèches de votre ville"],
  19:["Montage des meubles de la chambre de bébé","Établir la liste de naissance pour la famille","Initialiser les démarches de congé paternité"],
  20:["Bloquer la demi-journée pour l'échographie T2","Préparer les questions pour l'échographiste","Célébrer la mi-grossesse ensemble"],
  21:["Installer la veilleuse et vérifier l'éclairage","Commencer l'assemblage des meubles","Choisir la maternité définitivement"],
  22:["Instaurer le massage du ventre avec de l'huile le soir","Visiter la maternité et repérer les accès","Préparer le plan de naissance en brouillon"],
  23:["Prendre en charge toutes les corvées physiques lourdes","Préparer le sac de maternité","Lire intégralement le guide accouchement"],
  24:["Accompagner au test HGPO","Commencer la valise maternité","Installer le siège auto et faire vérifier le montage"],
  25:["Bain de pieds le soir, en faire un rituel","Finaliser la chambre de bébé","Finaliser le congé paternité avec l'employeur"],
  26:["Commander le coussin de grossesse si pas encore fait","Finaliser le plan de naissance par écrit","Préparer une playlist pour la salle de naissance"],
  27:["Remettre le plan de naissance à la maternité","Préparer les documents administratifs d'admission","Tester le trajet vers la maternité aux heures de pointe"],
  28:["Commencer la valise maternité maintenant","Vérifier le siège auto","Prendre connaissance du congé paternité"],
  29:["Apprendre la règle 5-1-1 pour l'accouchement","Finaliser la valise maternité","Vérifier que le téléphone est chargé en permanence"],
  30:["Planifier le congé paternité avec l'employeur","Finaliser les démarches administratives","Lire sur le post-partum"],
  31:["Proposer des promenades courtes régulièrement","Vérifier que la chambre est prête","Relire le guide accouchement"],
  32:["Accompagner à l'échographie T3","Vérifier le siège auto et le trajet maternité","Préparer des repas pour les premiers jours de retour"],
  33:["Être disponible la nuit si elle est réveillée","Finaliser tous les achats prioritaires","Préparer les contacts d'urgence"],
  34:["Vérifier que la valise est prête et dans la voiture","Mémoriser le numéro de la maternité","Rester joignable en permanence"],
  35:["Installer le siège auto maintenant","Faire vérifier l'installation du siège par un professionnel","Préparer la liste des personnes à appeler"],
  36:["Valise prête et dans la voiture","Téléphone chargé en permanence","Mémoriser le numéro direct des urgences obstétricales"],
  37:["Mode alerte active","Rester joignable en permanence","Réviser les signes du début du travail"],
  38:["Être présent, rassurant","Revoir ensemble le plan de naissance","Préparer des repas pour les premiers jours"],
  39:["Organiser une sortie douce","Rester patient","Préparer la maison pour le retour"],
  40:["Contractions toutes les 5 min, pendant 1 min, depuis 1h","Appeler la maternité avant de partir","Garder ton calme"],
  41:["Rester positif et patient","Suivre les instructions de l'équipe médicale","Être là, pleinement présent"],
};

// ── RDV ───────────────────────────────────────────────────────────────────────
const RDV_LIST = [
  {sa:8, titre:"1ère consultation médicale", desc:"Confirmer la grossesse, calculer la DPA, prescrire les analyses de sang obligatoires.", oblig:true, emoji:"🩺"},
  {sa:11, titre:"Échographie T1 + clarté nucale", desc:"Dater précisément la grossesse, mesurer la clarté nucale, évaluer le risque de trisomie 21.", oblig:true, emoji:"🔬"},
  {sa:15, titre:"Test de dépistage de la trisomie", desc:"Prise de sang pour évaluer le risque de trisomie 21 en complément de l'échographie.", oblig:false, emoji:"🩸"},
  {sa:20, titre:"Échographie T2 morphologique", desc:"Examiner en détail chaque organe et chaque membre. La plus complète de la grossesse.", oblig:true, emoji:"👶"},
  {sa:24, titre:"Test de diabète gestationnel (HGPO)", desc:"2h de test, 3 prises de sang. Un diabète gestationnel non traité augmente les risques.", oblig:false, emoji:"🧪"},
  {sa:28, titre:"Consultation du 7e mois", desc:"Vérifier la position de bébé, la tension artérielle, les examens sanguins.", oblig:true, emoji:"📋"},
  {sa:32, titre:"Échographie T3", desc:"Vérifier la position de bébé, estimer le poids, évaluer le liquide amniotique.", oblig:true, emoji:"🔬"},
  {sa:36, titre:"Consultation du 9e mois", desc:"Examen du col, vérification de la position de bébé, préparer l'accouchement.", oblig:true, emoji:"🏥"},
  {sa:39, titre:"Accouchement prévu", desc:"Date d'accouchement prévue. Rester joignable. Mode alerte active.", oblig:false, emoji:"👶"},
];

// ── Partenaires ───────────────────────────────────────────────────────────────
const PARTENAIRES = [
  {categorie:"Puériculture", items:[
    {nom:"Cybex", desc:"Sièges auto et poussettes premium", remise:"-10%", lien:"https://www.cybex-online.com"},
    {nom:"Babyzen", desc:"Poussette YOYO", remise:"-8%", lien:"https://www.babyzen.com"},
  ]},
  {categorie:"Santé & bien-être", items:[
    {nom:"Weleda", desc:"Huile de massage pour femmes enceintes", remise:"-15%", lien:"https://www.weleda.fr"},
    {nom:"Mustela", desc:"Soins pour la peau pendant la grossesse", remise:"-10%", lien:"https://www.mustela.fr"},
  ]},
  {categorie:"Préparation à la naissance", items:[
    {nom:"Mon Réseau Périnatal", desc:"Trouver une sage-femme ou un cours de préparation", remise:"Gratuit", lien:"https://www.monreseauperinatal.fr"},
  ]},
];

// ── Idée du mois ──────────────────────────────────────────────────────────────
function getIdee(mois:number):string {
  const idees = [
    "Planifie la première échographie ensemble et réserve la demi-journée.",
    "Prépare un dîner romantique à la maison, un soir de semaine.",
    "Commande le coussin de grossesse dont elle a besoin pour dormir.",
    "Visite la maternité ensemble et repère les accès.",
    "Prépare un album photo numérique de la grossesse.",
    "Organise une soirée film à la maison, juste vous deux.",
    "Finalise la chambre de bébé ensemble.",
    "Propose un week-end ou une sortie avant l'arrivée de bébé.",
    "Prépare des repas à l'avance pour les premiers jours après la naissance.",
  ];
  return idees[Math.min(mois-1, idees.length-1)] || idees[0];
}

// ── MOIS_DATA (post-naissance) ────────────────────────────────────────────────
const MOIS_DATA: Record<number,{
  titre:string; intro:string;
  developpement:{titre:string;contenu:string}[];
  sante:{titre:string;contenu:string}[];
  papa:{titre:string;contenu:string}[];
  rdv:string; vaccins:string; alerte:string;
}> = {
  0:{
    titre:'1er mois',
    intro:"Les premières semaines sont une période d'adaptation intense. Bébé découvre le monde, et vous découvrez votre rôle de parents.",
    developpement:[
      {titre:'Vision',contenu:"Bébé voit à 20-30 cm, la distance parfaite pour voir ton visage pendant la tétée. Il est attiré par les contrastes forts et les visages humains. Source : HAS 2023."},
      {titre:'Sommeil',contenu:"14 à 17h par 24h en cycles de 2 à 3h. Le sommeil paradoxal représente 50% de son temps, essentiel pour le développement cérébral. Source : Académie américaine de pédiatrie."},
      {titre:'Réflexes primitifs',contenu:"Réflexe de Moro (sursaut), grasping (prise), succion, marche automatique. Tous normaux et signe d'un système nerveux sain. Ils disparaissent vers 3 à 4 mois. Source : Larimer 2021."},
    ],
    sante:[
      {titre:'Allaitement',contenu:"8 à 12 tétées par 24h est normal. La montée de lait survient J2-J4. Une bonne prise du sein : bouche grande ouverte, lèvres retroussées, menton contre le sein. Source : OMS."},
      {titre:'Cordon ombilical',contenu:"Nettoyer avec du sérum physiologique 1x/jour. Il tombe naturellement entre J7 et J21. Ne pas couvrir, ne pas tirer. Consulter si rougeur autour du cordon. Source : HAS."},
      {titre:'Poids',contenu:"Perte de poids physiologique normale jusqu'à 10% du poids de naissance dans les premiers jours. Récupération du poids de naissance attendue avant J10-J14. Source : HAS 2022."},
    ],
    papa:[
      {titre:'Le peau à peau',contenu:"30 min de peau à peau par jour avec toi régule la température de bébé, stabilise son rythme cardiaque et renforce votre lien. Les études montrent une réduction du stress pour les deux. Source : Moore 2016."},
      {titre:'Les nuits',contenu:"Organise-vous en roulements. Prends le relais certaines nuits pour que ta partenaire récupère. La privation de sommeil post-partum est le premier facteur de dépression post-natale."},
      {titre:'Baby blues',contenu:"50 à 80% des femmes vivent un baby blues J3-J5 (larmes, émotions intenses, fatigue). C'est hormonal, normal, et passe en quelques jours. Si ça dure plus de 2 semaines, consulter. Source : CNGOF."},
    ],
    rdv:"Examen J8 obligatoire par le médecin. Examen du 1er mois entre J28 et J32.",
    vaccins:"BCG si indiqué. Pas de vaccin obligatoire avant 2 mois.",
    alerte:"Température supérieure à 38°C avant 3 mois : urgences pédiatriques sans attendre. Refus de s'alimenter sur 2 tétées consécutives. Fontanelle bombée. Difficultés respiratoires : appeler le 15.",
  },
  1:{
    titre:'2e mois',
    intro:"Le premier vrai sourire apparaît, un sourire social intentionnel. C'est le début de la communication.",
    developpement:[
      {titre:'Le sourire social',contenu:"Vers 6 semaines, bébé sourit en réponse à ton visage et ta voix. Ce n'est plus un réflexe mais une communication intentionnelle. C'est une étape majeure du développement socio-émotionnel. Source : Brazelton 2006."},
      {titre:'Motricité',contenu:"Bébé tient sa tête quelques secondes en position ventrale. Il suit des yeux un objet qui se déplace lentement. Ses mouvements deviennent plus coordonnés. Source : Denver II."},
      {titre:'Vocalises',contenu:"Premiers sons voyelles. Bébé expérimente sa voix. Il réagit aux voix familières en tournant la tête. C'est le début du langage. Source : Locke 1993."},
    ],
    sante:[
      {titre:'Coliques du nourrisson',contenu:"Pleurs intenses plus de 3h/jour, plus de 3j/semaine, plus de 3 semaines. Touchent 20% des bébés. Cause inconnue, disparaissent spontanément vers 3 mois. Source : HAS 2021."},
      {titre:'Régurgitations',contenu:"Normales si bébé grossit bien et n'a pas l'air douloureux. Signe de RGO pathologique : pleurs pendant la tétée, refus de manger, mauvaise prise de poids. Source : ESPGHAN 2018."},
    ],
    papa:[
      {titre:'Parle-lui',contenu:"Parle-lui face à face en exagérant tes expressions. Les études IRM montrent que le cerveau de bébé synchronise son activité avec celle du parent qui lui parle. Source : Harvard CDC."},
      {titre:'Dépression post-partum paternelle',contenu:"10% des pères développent une dépression post-partum dans les 3 à 6 premiers mois. Symptômes : irritabilité, retrait, anxiété excessive. En parler à un médecin est un signe de force. Source : Paulson 2010."},
    ],
    rdv:"Examen du 2e mois. Début du carnet de vaccination.",
    vaccins:"DTCaP-Hib-HepB (Hexavalent) : 1ère dose. Méningocoque B : 1ère dose. Rotavirus : 1ère dose (oral). Source : Calendrier vaccinal 2024.",
    alerte:"Absence de sourire à 2 mois. Absence de réaction aux sons. Hypotonie majeure (bébé mou). Perte de poids.",
  },
  2:{
    titre:'3e mois',
    intro:"Bébé devient un vrai partenaire d'échange. Les coliques s'estompent, les nuits commencent à s'allonger.",
    developpement:[
      {titre:'Interaction sociale',contenu:"Bébé rit aux éclats pour la première fois. Il reconnaît ses parents à la vue. Il cherche activement le contact visuel et répond dans une conversation. Source : Tronick 1978."},
      {titre:'Motricité',contenu:"Tient bien sa tête. En position ventrale, se soulève sur les avant-bras. Ouvre et ferme les mains intentionnellement. Commence à attraper ce qu'on lui tend. Source : Denver II."},
      {titre:'Sommeil',contenu:"Les nuits s'allongent progressivement. 4 à 6h de sommeil continu est possible. Le rythme circadien commence à se mettre en place. Source : Touchette 2005."},
    ],
    sante:[
      {titre:'Diversification',contenu:"Pas encore. La diversification alimentaire ne commence pas avant 4 mois révolus. Le lait maternel ou infantile couvre tous les besoins. Source : OMS / HAS."},
      {titre:'Position de sommeil',contenu:"Toujours sur le dos, dans son propre espace de sommeil, sans tour de lit, sans oreiller, sans couette. Recommandation HAS pour prévenir la mort inattendue du nourrisson. Source : HAS 2020."},
    ],
    papa:[
      {titre:'Le jeu',contenu:"Montre-lui des objets colorés, fais des bulles, lis des livres cartonnés. Le jeu n'est pas un luxe, c'est le moteur principal du développement cognitif et émotionnel. Source : Ginsburg 2007."},
      {titre:'Le congé paternité',contenu:"Si pas encore utilisé, le prendre maintenant pour établir votre lien avant la reprise du travail. Les études montrent que l'implication précoce du père prédit un meilleur développement de l'enfant à 5 ans. Source : Tanaka 2005."},
    ],
    rdv:"Pas de rendez-vous obligatoire ce mois. Surveiller le développement.",
    vaccins:"DTCaP-Hib-HepB : 2e dose. Méningocoque B : 2e dose. Rotavirus : 2e dose. Pneumocoque : 1ère dose. Source : Calendrier vaccinal 2024.",
    alerte:"Absence de rires. Absence de suivi visuel. Pas de réaction aux sons forts. Rigidité ou hypotonie des membres.",
  },
  3:{
    titre:'4e mois',
    intro:"Bébé explore activement le monde. Ses mains deviennent ses premiers outils de découverte.",
    developpement:[
      {titre:'Préhension',contenu:"Bébé attrape et tient des objets. Il les porte à la bouche. C'est normal, c'est ainsi qu'il explore. La phase orale est un stade de développement essentiel décrit par Piaget. Source : Piaget 1952."},
      {titre:'Vocalisations',contenu:"Gazouillements variés, syllabes comme ba, da, ma. Il répond quand tu lui parles en alternant. C'est un vrai dialogue. Source : Kuhl 2004."},
      {titre:'Motricité',contenu:"Se retourne du ventre au dos. Porte ses pieds à la bouche. En position assise soutenue, tient la tête parfaitement. Source : Denver II."},
    ],
    sante:[
      {titre:'Début de diversification possible',contenu:"Entre 4 et 6 mois révolus selon l'enfant. Commencer si bébé tient sa tête, montre de l'intérêt pour la nourriture, n'a plus le réflexe d'extrusion. Légumes en purée lisse. Source : ESPGHAN / HAS."},
      {titre:'Érythème fessier',contenu:"Changer régulièrement, laisser l'air, crème à l'oxyde de zinc. Si plaques blanches dans la bouche ou sur les fesses, candidose, traitement antifongique sur prescription. Source : HAS."},
    ],
    papa:[
      {titre:'La lecture',contenu:"Lire à voix haute 10 minutes par jour à cet âge améliore le vocabulaire à 2 ans et les capacités de lecture à 5 ans. Des livres cartonnés avec peu de mots et des images contrastées. Source : Duursma 2008."},
    ],
    rdv:"Examen du 4e mois obligatoire.",
    vaccins:"Méningocoque B : 3e dose. Source : Calendrier vaccinal 2024.",
    alerte:"Pas de préhension volontaire. Asymétrie des mouvements. Absence de gazouillements. Pas de sourire.",
  },
  4:{
    titre:'5e mois',
    intro:"L'âge de la curiosité. Bébé se tourne vers tout ce qui bouge et tout ce qui fait du bruit.",
    developpement:[
      {titre:'Reconnaissance sociale',contenu:"Bébé distingue les visages familiers des étrangers. L'angoisse de l'étranger peut débuter. Il reconnaît son prénom et réagit quand on l'appelle. Source : Fagan 1979."},
      {titre:'Motricité',contenu:"Se retourne dos-ventre. Peut se tenir assis avec appui. Explore tout avec ses mains et sa bouche. Commence à prendre des objets en opposition pouce-index. Source : Denver II."},
    ],
    sante:[
      {titre:'Diversification',contenu:"Si commencée, introduire les légumes un à un (4 à 7 jours entre chaque). Carottes, courgettes, haricots verts, potiron. Purée lisse sans sel ni sucre ajouté. Source : PNNS / HAS."},
      {titre:'Dentition',contenu:"Les premières dents (incisives inférieures) peuvent apparaître entre 5 et 8 mois. Signes : bave, irritabilité, besoin de mordre. Pas de fièvre intense normale à la dent. Source : AAP."},
    ],
    papa:[
      {titre:'Angoisse de séparation',contenu:"Normale et signe d'attachement sain. Ne pas forcer les contacts avec des inconnus. L'attachement sécure est le meilleur prédicteur de santé mentale à l'âge adulte. Source : Bowlby / Ainsworth."},
    ],
    rdv:"Pas de rendez-vous obligatoire. Surveillance de la diversification.",
    vaccins:"Pas de vaccin ce mois.",
    alerte:"Asymétrie dans les mouvements. Absence de retournement. Perte d'acquis.",
  },
  5:{
    titre:'6e mois',
    intro:"Mi-première année. Bébé est de plus en plus autonome et interactif. La diversification est en plein essor.",
    developpement:[
      {titre:'Langage',contenu:"Syllabes redupliquées : bababa, mamama, dadada. Ce n'est pas encore du langage mais l'entraînement phonologique qui y conduit. Plus tu lui parles, plus son cerveau se structure linguistiquement. Source : Kuhl 2007."},
      {titre:'Motricité',contenu:"Assis sans soutien pendant quelques secondes. Debout avec appui, commence à faire des petits sauts. Transfert d'objet d'une main à l'autre. Source : Denver II."},
    ],
    sante:[
      {titre:'Diversification à 6 mois',contenu:"OMS recommande 6 mois d'allaitement exclusif avant diversification. Introduire les fruits et légumes. Vers 7 à 8 mois : viande ou poisson (10g/jour). Oeuf cuit dès 6 mois. Source : OMS / ESPGHAN 2017."},
      {titre:'Allergènes',contenu:"Introduction précoce des allergènes majeurs (arachide, oeuf, gluten) entre 4 et 12 mois réduit le risque d'allergie. Ne pas retarder leur introduction sans avis médical. Source : LEAP Study / ESPGHAN."},
    ],
    papa:[
      {titre:'La motricité libre',contenu:"Laisser bébé explorer le sol en sécurité, sans le mettre assis ou debout avant qu'il ne le fasse seul. La motricité libre développe la confiance en soi et l'autonomie. Source : Pikler / Bernard-Bonnin 2012."},
    ],
    rdv:"Examen du 6e mois obligatoire. Bilan complet.",
    vaccins:"DTCaP-Hib-HepB : 3e dose (rappel). Pneumocoque : 2e dose. Méningocoque C. Source : Calendrier vaccinal 2024.",
    alerte:"Absence de syllabes. Pas de tenue assise avec appui. Absence de sourire réciproque. Régressions notables.",
  },
  6:{
    titre:'7e mois',
    intro:"Bébé commence à se déplacer. L'espace autour de lui doit maintenant être sécurisé.",
    developpement:[
      {titre:'Déplacement',contenu:"Rampement, 4 pattes ou retournements successifs. Chaque bébé trouve sa technique. Le 4 pattes croisé (bras gauche + jambe droite) est idéal neurologiquement mais pas obligatoire. Source : AAP 2022."},
      {titre:'Permanence de l\'objet',contenu:"Bébé comprend qu'un objet caché existe encore. Étape majeure de Piaget. Il cherche le jouet que tu caches sous une couverture. Base de la pensée abstraite. Source : Piaget 1954."},
    ],
    sante:[
      {titre:'Sécurisation du domicile',contenu:"Bloquer les prises électriques, coins de table, escaliers. Placer les produits ménagers hors de portée. Attacher les meubles lourds aux murs. La chute est la 1ère cause d'accident à cet âge. Source : Santé Publique France."},
    ],
    papa:[
      {titre:'Cache-cache',contenu:"Se cacher derrière tes mains puis réapparaître est bien plus qu'un jeu : c'est l'entraînement de la permanence de l'objet et de la gestion émotionnelle de la séparation. Source : Stern 1985."},
    ],
    rdv:"Pas de rendez-vous obligatoire.",
    vaccins:"Pas de vaccin ce mois.",
    alerte:"Absence de déplacement. Asymétrie motrice. Pas de permanence de l'objet.",
  },
  7:{
    titre:'8e mois',
    intro:"L'angoisse de séparation est à son pic. C'est le signe d'un attachement sain et sécure.",
    developpement:[
      {titre:'Angoisse du 8e mois',contenu:"Normale et attendue entre 6 et 12 mois. Bébé prend conscience qu'il est séparé de ses parents. Un attachement sécure est la meilleure protection contre l'anxiété future. Source : Ainsworth 1978."},
      {titre:'Compréhension',contenu:"Non, donne, bravo. Bébé commence à comprendre des mots simples avant de les parler. Vocabulaire réceptif supérieur au vocabulaire expressif jusqu'à 18 mois. Source : Bates 1976."},
    ],
    sante:[
      {titre:'Alimentation',contenu:"Texture : purées avec petits morceaux mous. Viande ou poisson : 10g/jour. Introduire progressivement les textures pour prévenir le refus alimentaire futur. Source : HAS / PNNS."},
      {titre:'Sommeil',contenu:"Régression du sommeil fréquente au 8e mois liée à l'angoisse de séparation. Rituel du coucher stable = sécurité. Source : HAS 2017."},
    ],
    papa:[
      {titre:'Les au revoir',contenu:"Toujours dire au revoir quand tu pars, même si bébé pleure, plutôt que de partir en douce. Les départs discrets augmentent l'anxiété. Bébé ne comprend pas pourquoi tu as disparu. Source : Bowlby."},
    ],
    rdv:"Examen du 8e mois conseillé.",
    vaccins:"Grippe si indiqué (prématurés, pathologies).",
    alerte:"Absence de réaction à son prénom. Pas de syllabes. Absence de geste au revoir. Régression importante.",
  },
  8:{
    titre:'9e mois',
    intro:"Bébé dit ses premiers mots, ou presque. Mama et dada commencent à avoir du sens.",
    developpement:[
      {titre:'Premiers mots',contenu:"Les premiers mots signifiants apparaissent entre 9 et 14 mois. Mama et dada associés à la bonne personne. Le vocabulaire expressif au 12e mois prédit le développement du langage à 2 ans. Source : Fenson 1994."},
      {titre:'Pince pouce-index',contenu:"Bébé peut saisir de petits objets avec précision. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent être avalés. Source : Denver II."},
    ],
    sante:[
      {titre:'Alimentation',contenu:"3 repas et 2 laitages par jour. Introduire les féculents, légumineuses. Éviter sel, sucre ajouté, miel avant 1 an, charcuterie. Jus de fruits : aucun avant 1 an. Source : PNNS / HAS 2021."},
    ],
    papa:[
      {titre:'Lire chaque soir',contenu:"10 minutes de lecture le soir, même à cet âge, est la pratique parentale la mieux documentée pour le développement du langage. Les enfants à qui on lit quotidiennement ont 1,4 million de mots de plus à 5 ans. Source : Logan 2019."},
    ],
    rdv:"Pas de rendez-vous obligatoire.",
    vaccins:"Méningocoque B : dose de rappel si non fait à 6 mois.",
    alerte:"Absence de pince pouce-index. Pas de syllabes variées. Absence de compréhension de mots simples.",
  },
  9:{
    titre:'10e mois',
    intro:"Bébé devient de plus en plus curieux et déterminé. Il teste les limites. C'est normal et nécessaire.",
    developpement:[
      {titre:'Debout',contenu:"Bébé se met debout en s'aidant des meubles. Marche en se tenant aux meubles. Les premières chutes font partie de l'apprentissage. Source : Adolph 2012."},
      {titre:'Imitation',contenu:"Imite gestes et sons volontairement : taper des mains, faire coucou, sonner. L'imitation est le moteur principal de l'apprentissage du langage et des comportements sociaux. Source : Meltzoff 2002."},
    ],
    sante:[
      {titre:'Brossage des dents',contenu:"Dès la première dent, brosser matin et soir avec une brosse à dents adaptée et du dentifrice fluoré 500ppm (taille d'un grain de riz). Source : Union Française pour la Santé Bucco-Dentaire / HAS."},
    ],
    papa:[
      {titre:'Les limites',contenu:"Commencer à poser des limites claires et constantes. Non = non, toujours. La consistance des règles (même règle, même réaction) est plus importante que la sévérité. Elle crée la sécurité. Source : Baumrind 1966."},
    ],
    rdv:"Pas de rendez-vous obligatoire.",
    vaccins:"Pas de vaccin ce mois.",
    alerte:"Pas de mise debout avec appui. Absence d'imitation. Pas de pince pouce-index.",
  },
  10:{
    titre:'11e mois',
    intro:"Les premiers pas sont imminents. Une période d'excitation intense pour toute la famille.",
    developpement:[
      {titre:'Avant les premiers pas',contenu:"Bébé peut se tenir debout sans appui quelques secondes. Il pivote debout, fait des pas latéraux contre les meubles. Les premiers pas indépendants arrivent en moyenne à 12 mois (entre 9 et 15 mois, tout est normal). Source : WHO Motor Development Study."},
      {titre:'Compréhension',contenu:"Comprend des phrases simples : donne-moi, où est papa, viens. Commence à suivre des instructions simples. Son vocabulaire réceptif explose. Source : Tomasello 1995."},
    ],
    sante:[
      {titre:'Alimentation vers 1 an',contenu:"Préparer la transition vers le lait de croissance (ou lait entier dès 1 an) et une alimentation de plus en plus familiale. Éviter miel, charcuterie, fromages au lait cru encore quelques mois. Source : HAS / PNNS 4."},
    ],
    papa:[
      {titre:'Préparer le 1er anniversaire',contenu:"Le premier anniversaire est autant pour vous que pour bébé. Prendre un moment pour célébrer ce que vous avez traversé ensemble, en couple. La relation de couple est la base de la stabilité de l'enfant. Source : Gottman 2000."},
    ],
    rdv:"Examen du 12e mois obligatoire (peut être fait à 11 mois).",
    vaccins:"ROR (Rougeole-Oreillons-Rubéole) : 1ère dose. Méningocoque C : rappel. Varicelle : 1ère dose. Source : Calendrier vaccinal 2024.",
    alerte:"Absence totale de mots. Pas de marche avec appui. Perte d'acquis. Absence de pointage.",
  },
  11:{
    titre:'1 an !',
    intro:"Un an. Un cap immense. Bébé est maintenant un petit être en pleine expansion.",
    developpement:[
      {titre:'Les premiers pas',contenu:"La marche indépendante arrive en moyenne à 12 mois, mais entre 9 et 15 mois, c'est dans la norme. Ne jamais forcer avec des trotteurs, ils retardent la marche et augmentent le risque de chute. Source : AAP / HAS."},
      {titre:'Langage',contenu:"2 à 5 mots significatifs en moyenne à 12 mois. La compréhension est bien plus développée que la production. L'important : bébé comprend-il ce qu'on lui dit ? Source : Rescorla 1989."},
      {titre:'Jeu symbolique',contenu:"Premiers jeux du type faire semblant : faire boire une peluche, téléphoner avec un objet. C'est le début de la pensée symbolique, base du langage et de la cognition. Source : Piaget / Vygotski."},
    ],
    sante:[
      {titre:'Alimentation 1 an',contenu:"Lait de croissance ou lait entier (500ml/jour max). Alimentation variée de table. 4 repas par jour. Pas de lait demi-écrémé avant 2 ans. Pas de restriction alimentaire sans avis médical. Source : PNNS / HAS 2021."},
      {titre:'Bucco-dentaire',contenu:"Consultation chez le dentiste recommandée dès 1 an. Source : UFSBD 2022."},
    ],
    papa:[
      {titre:'Bilan de l\'année',contenu:"Tu as fait quelque chose d'extraordinaire cette année. La recherche montre que les pères qui s'impliquent activement la première année ont des enfants avec une meilleure régulation émotionnelle et de meilleures performances scolaires. Source : Lamb 2004."},
    ],
    rdv:"Examen du 12e mois obligatoire. Bilan complet.",
    vaccins:"ROR : 1ère dose. Méningocoque C. Varicelle. Source : Calendrier vaccinal 2024.",
    alerte:"Absence totale de mots à 12 mois. Pas de marche avec appui à 15 mois, consultation neuropédiatrie. Perte d'acquis moteurs ou langagiers.",
  },
};

// ── Helper SA ─────────────────────────────────────────────────────────────────
function getSA(offset=0):number|null {
  try {
    const dpa = localStorage.getItem('dadup_dpa');
    if(!dpa) return null;
    const dpaDate = new Date(dpa);
    const now = new Date();
    const diff = Math.ceil((dpaDate.getTime()-now.getTime())/(1000*60*60*24));
    const sa = Math.round(40 - diff/7) + offset;
    return Math.max(6, Math.min(42, sa));
  } catch { return null; }
}

// ── Composant Onboarding ──────────────────────────────────────────────────────
function Onboarding({onSave}:{onSave:(d:string,p:string)=>void}) {
  const [dpa,setDpa]=useState('');
  const [prenom,setPrenom]=useState('');
  return(
    <main style={{minHeight:'100vh',background:'#f7f5f0',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <div style={{maxWidth:'420px',width:'100%'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:'28px'}}>
          <svg viewBox="0 0 300 300" width="64" height="64">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
        </div>
        <div style={{background:C.white,borderRadius:'24px',padding:'28px',border:`1px solid ${C.border}`}}>
          <h1 style={{fontSize:'22px',fontWeight:800,color:C.dark,margin:'0 0 8px',textAlign:'center'}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.textLight,fontSize:'13px',textAlign:'center',margin:'0 0 24px'}}>Deux infos pour personnaliser ton espace</p>
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:600,marginBottom:'7px'}}>Ton prénom</label>
              <input type="text" placeholder="Thomas, Julien, Marc..." value={prenom} onChange={e=>setPrenom(e.target.value)} style={{width:'100%',background:'#f7f5f0',border:`1px solid ${C.border}`,borderRadius:'10px',padding:'12px 14px',fontSize:'14px',color:C.dark,outline:'none'}}/>
            </div>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:600,marginBottom:'7px'}}>Date d'accouchement prévue</label>
              <input type="date" value={dpa} onChange={e=>setDpa(e.target.value)} style={{width:'100%',background:'#f7f5f0',border:`1px solid ${C.border}`,borderRadius:'10px',padding:'12px 14px',fontSize:'14px',color:C.dark,outline:'none'}}/>
            </div>
            <button onClick={()=>dpa&&onSave(dpa,prenom)} disabled={!dpa} style={{background:dpa?C.dark:'#ccc',color:C.white,border:'none',padding:'14px',borderRadius:'32px',fontSize:'15px',fontWeight:700,cursor:dpa?'pointer':'not-allowed',marginTop:'4px'}}>
              Accéder à mon espace
            </button>
          </div>
        </div>
        <p style={{textAlign:'center',color:C.textLight,fontSize:'11px',marginTop:'14px'}}>Aucune donnée personnelle stockée en ligne.</p>
      </div>
    </main>
  );
}

// ── Composant Topbar ──────────────────────────────────────────────────────────
function Topbar({prenom,saReelle,tri,prog,isPost,moisBebe,activeTab,setActiveTab}:{
  prenom:string;saReelle:number|null;tri:string;prog:number;
  isPost:boolean;moisBebe:number;
  activeTab:string;setActiveTab:(t:string)=>void;
}) {
  const navGrossesse = [
    {id:'home',     label:'Accueil',    bg:'#FFF0E6', tc:'#C04A1A'},
    {id:'bebe',     label:'Bébé',       bg:'#E4F5EC', tc:'#0D6B40'},
    {id:'rdv',      label:'RDV',        bg:'#E6F0FA', tc:'#1A4A7A'},
    {id:'pratique', label:'À préparer', bg:'#FFF7E0', tc:'#8A6010'},
    {id:'bonsplans',label:'Bons plans', bg:'#FDECEA', tc:'#A03030'},
  ];
  const navPost = [
    {id:'home', label:'Ce mois-ci', bg:'#E4F5EC', tc:'#0D6B40'},
    {id:'bebe', label:'Mon bébé',   bg:'#E6F0FA', tc:'#2E5F8A'},
    {id:'rdv',  label:'Santé & RDV',bg:'#FFF0E6', tc:'#C04A1A'},
  ];
  const tabs = isPost ? navPost : navGrossesse;

  return (
    <div style={{background:C.white,borderBottom:`1.5px solid ${C.border}`,position:'sticky',top:0,zIndex:40}}>
      {/* Ligne 1 : logo + profil */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 28px',maxWidth:'1180px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <svg viewBox="0 0 300 300" width="34" height="34">
            <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
            <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
            <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
          </svg>
          <span style={{fontSize:'20px',fontWeight:900,color:C.dark,letterSpacing:'-0.3px'}}>DadUp</span>
        </div>
        {/* Profil : prénom + SA + barre % dessous */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'5px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#f7f5f0',borderRadius:'24px',padding:'5px 8px 5px 14px'}}>
            <span style={{fontSize:'14px',fontWeight:800,color:C.dark}}>{prenom||'DadUp'}</span>
            {saReelle&&(
              <div style={{background:C.dark,color:C.white,fontSize:'11px',fontWeight:800,padding:'4px 10px',borderRadius:'14px',textAlign:'center' as const,lineHeight:1.2}}>
                <span style={{display:'block'}}>{isPost?`Mois ${moisBebe+1}`:`${saReelle} SA`}</span>
                <small style={{display:'block',fontSize:'8px',color:'rgba(255,255,255,0.55)',fontWeight:600,letterSpacing:'0.5px'}}>{isPost?'Post-naissance':tri}</small>
              </div>
            )}
          </div>
          {/* Barre de progression sous le badge */}
          <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
            <div style={{width:'72px',height:'4px',background:'#f0ede8',borderRadius:'4px',overflow:'hidden'}}>
              <div style={{height:'4px',background:C.gold,borderRadius:'4px',width:prog+'%'}}/>
            </div>
            <span style={{fontSize:'11px',fontWeight:700,color:C.gold}}>{prog}%</span>
          </div>
        </div>
      </div>
      {/* Ligne 2 : onglets */}
      <div style={{display:'flex',gap:'6px',padding:'0 24px 12px',overflowX:'auto' as const,maxWidth:'1180px',margin:'0 auto'}}>
        {tabs.map(n=>{
          const on = activeTab===n.id;
          return(
            <button key={n.id} onClick={()=>setActiveTab(n.id)} style={{
              padding:'8px 20px',fontSize:'13px',fontWeight:800,border:'none',
              borderRadius:'24px',cursor:'pointer',whiteSpace:'nowrap' as const,flexShrink:0,
              background:on?C.dark:n.bg,color:on?C.white:n.tc,
            }}>{n.label}</button>
          );
        })}
      </div>
    </div>
  );
}

// ── Composants onglets ────────────────────────────────────────────────────────
import Accueil from './components/Accueil';
import BebePage from './components/BebePage';
import RDVPage from './components/RDVPage';
import PreparerPage from './components/PreparerPage';
import BonsPlansPage from './components/BonsPlansPage';
import PostAccueil from './components/PostAccueil';
import PostBebe from './components/PostBebe';
import PostRDV from './components/PostRDV';

// ── DashboardContent ──────────────────────────────────────────────────────────
function DashboardContent() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTabRaw] = useState('home');

  const setActiveTab = (tab: string) => {
    setActiveTabRaw(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [valiseChecked, setValiseChecked] = useState<Record<string,boolean>>({});
  const [missionsChecked, setMissionsChecked] = useState<Record<string,boolean>>({});
  const [rdvDates, setRdvDates] = useState<Record<number,string>>({});
  const [avance, setAvance] = useState(false);
  const [nextRdvDate, setNextRdvDate] = useState('');
  const [rdvOuvert, setRdvOuvert] = useState<number|null>(null);

  useEffect(()=>{
    const d=localStorage.getItem('dadup_dpa')||'';
    const p=localStorage.getItem('dadup_prenom')||'';
    const v=JSON.parse(localStorage.getItem('dadup_valise')||'{}');
    const m=JSON.parse(localStorage.getItem('dadup_missions')||'{}');
    const r=JSON.parse(localStorage.getItem('dadup_rdv_dates')||'{}');
    const nr=localStorage.getItem('dadup_next_rdv')||'';
    setDpa(d); setPrenom(p); setValiseChecked(v);
    setMissionsChecked(m); setRdvDates(r); setNextRdvDate(nr);
    if(!d) setShowOnboarding(true);
    // Lire le tab depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get('tab');
    if(tabFromUrl) setActiveTabRaw(tabFromUrl);
  },[]);

  const sa = getSA(avance?4:0);
  const saReelle = getSA();
  const data = sa?(SD[sa]||SD[20]):null;
  const dataR = saReelle?(SD[saReelle]||SD[20]):null;
  const dpaDate = dpa?new Date(dpa):null;
  const joursRestants = dpaDate?Math.ceil((dpaDate.getTime()-new Date().getTime())/(1000*60*60*24)):null;
  const moisG = saReelle?Math.ceil(saReelle/4.3):1;
  const idee = getIdee(moisG);
  const isPost = joursRestants!==null&&joursRestants<0;
  const prog = isPost?100:Math.min(100,Math.round(((saReelle||0)/40)*100));
  const tri = (saReelle||0)<=14?'T1':(saReelle||0)<=27?'T2':'T3';
  const missions = saReelle?(MISSIONS[saReelle]||MISSIONS[20]||[]):[];
  const nextRdv = RDV_LIST.filter(r=>saReelle&&r.sa>=saReelle)[0];
  const moisBebe = isPost&&dpaDate?Math.min(11,Math.floor(Math.abs(joursRestants||0)/30)):0;
  const dataBebe = MOIS_DATA[moisBebe];

  const toggleV=(id:string)=>{const u={...valiseChecked,[id]:!valiseChecked[id]};setValiseChecked(u);localStorage.setItem('dadup_valise',JSON.stringify(u));};
  const toggleM=(id:string)=>{const u={...missionsChecked,[id]:!missionsChecked[id]};setMissionsChecked(u);localStorage.setItem('dadup_missions',JSON.stringify(u));};
  const saveRdv=(v:string)=>{setNextRdvDate(v);localStorage.setItem('dadup_next_rdv',v);};
  const saveRdvI=(s:number,v:string)=>{const u={...rdvDates,[s]:v};setRdvDates(u);localStorage.setItem('dadup_rdv_dates',JSON.stringify(u));};
  const saveOnb=(d:string,p:string)=>{localStorage.setItem('dadup_dpa',d);localStorage.setItem('dadup_prenom',p);setDpa(d);setPrenom(p);setShowOnboarding(false);};

  if(showOnboarding) return <Onboarding onSave={saveOnb}/>;

  // Shared props
  const shared = {C,isPost,dpa,prenom,saReelle,joursRestants,prog,tri,moisBebe,dataBebe,idee,missions,missionsChecked,toggleM,nextRdv,nextRdvDate,saveRdv,dataR,data,sa,avance,setAvance,valiseChecked,toggleV,rdvDates,saveRdvI,rdvOuvert,setRdvOuvert,MOIS_DATA,PARTENAIRES,RDV_LIST,SD};

  return (
    <div style={{minHeight:'100vh',background:C.white,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{-webkit-font-smoothing:antialiased;}
        .dd-c{max-width:1080px;margin:0 auto;padding:32px 36px;display:grid;gap:20px;}
        .dd-g2{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:16px;}
        .dd-g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
        .dd-mg{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .dd-g2col{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        @media(max-width:860px){
          .dd-c{padding:16px!important;}
          .dd-g2,.dd-g3,.dd-g2col{grid-template-columns:1fr!important;}
          .dd-mg{grid-template-columns:1fr!important;}
          nav>div{padding:0 16px!important;}
          .dd-topbar-inner{padding:10px 16px!important;}
          .dd-tabs{padding:0 12px 10px!important;}
        }
      `}</style>

      <Topbar
        prenom={prenom} saReelle={saReelle} tri={tri} prog={prog}
        isPost={isPost} moisBebe={moisBebe}
        activeTab={activeTab} setActiveTab={setActiveTab}
      />

      <div className="dd-c">
        {activeTab==='home' && (isPost
          ? <PostAccueil {...shared}/>
          : <Accueil {...shared}/>
        )}
        {activeTab==='bebe' && (isPost
          ? <PostBebe {...shared}/>
          : <BebePage {...shared}/>
        )}
        {activeTab==='rdv' && (isPost
          ? <PostRDV {...shared}/>
          : <RDVPage {...shared}/>
        )}
        {!isPost && activeTab==='pratique'  && <PreparerPage {...shared}/>}
        {!isPost && activeTab==='bonsplans' && <BonsPlansPage {...shared}/>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return(
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#f7f5f0',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'#9aa0a8',fontSize:'14px'}}>Chargement...</p></div>}>
      <DashboardContent/>
    </Suspense>
  );
}
