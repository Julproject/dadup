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
// SA 3-5 + refonte SA 6-20 complète
// À coller dans SD juste avant le bloc SA 6

  3:{emoji:'🔬',taille:'0,1 mm',poids:'invisible',titre:"La fécondation vient d'avoir lieu",intro:"À 3 SA, l'ovule vient d'être fécondé. Le blastocyste s'implante dans l'utérus. La grossesse commence officiellement.",developpement:"La fécondation a eu lieu il y a quelques jours. L'œuf fécondé (zygote) s'est divisé en morula, puis en blastocyste. Il s'implante dans la paroi utérine (nidation). C'est à ce moment que commence la production de l'hormone hCG, celle qui rend le test positif.",organes:["Blastocyste","Nidation","Production de hCG"],savistu:"SA signifie Semaine d'Aménorrhée, comptée depuis le 1er jour des dernières règles. SG signifie Semaine de Grossesse, comptée depuis la fécondation. 3 SA = 1 SG. Les médecins français utilisent toujours les SA.",faq:[{q:"Quelle est la différence entre SA et SG ?",r:"SA (Semaine d'Aménorrhée) compte depuis les dernières règles. SG (Semaine de Grossesse) compte depuis la fécondation. Les SA sont toujours 2 semaines de plus que les SG. En France, les médecins utilisent toujours les SA."},{q:"Peut-on déjà faire un test de grossesse ?",r:"Un test urinaire peut être positif dès 3 SA si l'implantation a eu lieu. Un test sanguin (dosage de hCG) est plus fiable et détectable plus tôt."}],maman_titre:"L'implantation peut causer des saignements",maman:"Des petits saignements rosés (saignements d'implantation) sont possibles et normaux. Elle peut ne ressentir aucun symptôme ou une légère fatigue. Le test de grossesse peut être positif.",maman_aide:"Crée un espace calme ce soir pour vous deux. La nouvelle mérite d'être vécue pleinement avant d'être partagée.",maman_signe:"Les saignements d'implantation sont roses ou marrons, jamais rouges abondants",alerte:"Des saignements rouges abondants dès ce stade nécessitent une consultation. Une grossesse extra-utérine doit être écartée.",doc_titre:"SA vs SG : comprendre le calendrier",doc:"En France, tout le suivi médical utilise les SA (Semaines d'Aménorrhée). La DPA (Date Prévue d'Accouchement) est calculée à 41 SA depuis les dernières règles. Une grossesse dure 280 jours, soit 40 semaines de grossesse (SG) ou 41 SA.",conseil:"Le test est positif. Laisse la nouvelle s'installer avant de tout annoncer. Prenez ce moment juste pour vous deux. C'est votre secret pour l'instant."},

  4:{emoji:'🫧',taille:'0,2 mm',poids:'invisible',titre:"L'embryon s'organise",intro:"À 4 SA, l'embryon est microscopique mais son organisation est déjà en cours. Les trois feuillets embryonnaires se forment.",developpement:"Les trois feuillets embryonnaires se mettent en place : l'ectoderme (futur cerveau et peau), le mésoderme (futurs muscles, os, cœur) et l'endoderme (futurs organes internes). Le placenta commence à se former. Le sac gestationnel est visible à l'échographie.",organes:["Ectoderme","Mésoderme","Endoderme","Sac gestationnel"],savistu:"Le placenta n'est pas un organe de la mère. C'est un organe entièrement nouveau, créé par l'embryon, qui assure les échanges entre la mère et bébé. Il sera expulsé après la naissance.",faq:[{q:"Quel est le rôle du placenta ?",r:"Le placenta assure les échanges entre la mère et bébé : oxygène, nutriments, anticorps dans un sens, déchets dans l'autre. Il produit aussi les hormones de grossesse."},{q:"Quand faut-il prendre la 1ère consultation ?",r:"Avant la fin du 3e mois (avant 15 SA). Elle confirme la grossesse, calcule la DPA, prescrit les analyses obligatoires et ouvre le dossier de maternité."}],maman_titre:"Les hormones commencent à agir",maman:"Le taux de hCG double toutes les 48h. Les premières nausées peuvent apparaître. Les seins peuvent être tendus. La fatigue peut s'installer. Ces symptômes sont la preuve que la grossesse évolue.",maman_aide:"Réserve dès maintenant la première consultation médicale. Cherche un médecin ou une sage-femme acceptant les nouvelles grossesses.",maman_signe:"La prise de sang de hCG confirme la grossesse et son évolution",alerte:"Un taux de hCG qui n'augmente pas correctement peut indiquer une fausse couche précoce ou une grossesse extra-utérine. Le médecin fera un suivi par prises de sang.",doc_titre:"Le rôle de la sage-femme",doc:"La sage-femme est une profession médicale autonome habilitée à suivre toute la grossesse normale, à accoucher et à assurer les soins post-nataux. Elle peut prescrire des médicaments, des analyses et des arrêts de travail. Elle est remboursée à 100% par la Sécurité sociale pendant la grossesse.",conseil:"Cherche une sage-femme libérale maintenant. Elles se remplissent vite. Une sage-femme peut assurer tout le suivi de grossesse, l'accouchement et les soins après. C'est souvent un suivi plus personnalisé qu'avec un médecin."},

  5:{emoji:'🌱',taille:'2 mm',poids:'invisible',titre:"Le tube neural se ferme",intro:"À 5 SA, l'embryon mesure 2 mm. Le tube neural, qui donnera naissance au cerveau et à la moelle épinière, commence à se fermer.",developpement:"Le tube neural commence à se fermer. C'est une étape critique : s'il ne se ferme pas correctement, il peut causer des malformations comme le spina bifida. C'est pourquoi l'acide folique (vitamine B9) est prescrit avant et pendant le 1er trimestre. Le cœur primitif commence à se former.",organes:["Tube neural","Cœur primitif","Ébauches des membres"],savistu:"L'acide folique (vitamine B9) réduit de 70% le risque de malformations du tube neural. Il doit être pris idéalement 1 mois avant la conception et jusqu'à la fin du 1er trimestre.",faq:[{q:"À quoi sert l'acide folique ?",r:"La vitamine B9 est indispensable à la fermeture du tube neural. Elle doit être prise avant la conception si possible. En l'absence de supplémentation, l'alimentation couvre rarement les besoins."},{q:"Quand le cœur commence-t-il à battre ?",r:"Les premières pulsations cardiaques primitives apparaissent vers 5-6 SA. Elles ne sont pas encore régulières mais constituent le tout début du système cardiovasculaire."}],maman_titre:"Les nausées peuvent commencer",maman:"Les nausées matinales peuvent débuter dès 5 SA pour certaines femmes. La fatigue intense est courante. L'odorat peut être hypersensible. Ces symptômes sont directement liés à la montée de hCG.",maman_aide:"Assure-toi qu'elle prend de l'acide folique si ce n'est pas encore fait. C'est urgent.",maman_signe:"L'acide folique doit être pris jusqu'à la fin du 1er trimestre au minimum",alerte:"Saignements rouges abondants + douleur latérale intense : grossesse extra-utérine possible, urgence médicale absolue. Appeler le 15.",doc_titre:"Les professionnels qui vont vous accompagner",doc:"Obstétricien (gynécologue-obstétricien) : médecin spécialiste des grossesses à risque et des accouchements. Sage-femme : profession médicale autonome pour les grossesses normales. Médecin généraliste : peut assurer le 1er trimestre. Pédiatre : choisir maintenant, les carnets se remplissent.",conseil:"Cherche un pédiatre maintenant. Pas après la naissance, maintenant. Ils ont souvent des délais de plusieurs semaines pour la 1ère consultation de J8. Appelle les pédiatres du quartier cette semaine."},

  6:{emoji:'🌾',taille:'0,6 cm',poids:'moins de 1 g',titre:"Le cœur commence à battre",intro:"À 6 SA, bébé mesure 0,6 cm. Le tube neural est fermé. Le cœur commence à battre de façon primitive.",developpement:"Le cœur primitif bat autour de 100 à 120 battements par minute. Les bourgeons des membres apparaissent. Le cerveau et la moelle épinière se développent rapidement depuis le tube neural. Les premières ébauches des yeux et des oreilles sont visibles.",organes:["Cœur primitif","Bourgeons des membres","Ébauches des yeux"],savistu:"Le cœur de bébé bat déjà à 6 SA, mais il est si petit qu'une échographie ne peut pas toujours le visualiser clairement. Il ne ressemble pas encore à un cœur humain : c'est un tube cardiaque qui se contracte.",faq:[{q:"Les nausées sont-elles normales ?",r:"Oui. Elles sont causées par l'hormone hCG dont le taux est au maximum entre 6 et 12 SA. Elles touchent 70 à 85% des femmes enceintes et signalent souvent une grossesse qui évolue normalement."},{q:"Combien de temps durent les nausées ?",r:"Elles diminuent généralement après 12 SA quand le taux de hCG baisse. Pour certaines femmes, elles persistent jusqu'au 2e trimestre."}],maman_titre:"Les nausées peuvent être intenses",maman:"Les nausées peuvent survenir à toute heure, pas seulement le matin. La fatigue est souvent écrasante. Les seins sont tendus et gonflés. L'odorat est hypersensible. Ces symptômes signalent que la grossesse évolue normalement.",maman_aide:"Gère toute la logistique alimentaire : fais les courses, anticipe les repas légers, évite de cuisiner des plats aux odeurs fortes.",maman_signe:"Les nausées s'intensifient avec la montée du taux de hCG",alerte:"Vomissements si intenses qu'elle ne peut rien garder depuis 24h : hyperémèse gravidique, consulter en urgence.",doc_titre:"La première consultation médicale",doc:"Elle doit avoir lieu avant la fin du 1er trimestre (avant 15 SA). Elle confirme la grossesse, calcule la DPA, prescrit les analyses de sang obligatoires (groupe sanguin, rubéole, toxoplasmose, hépatites) et ouvre le dossier de suivi.",conseil:"Ne minimise pas les nausées. C'est physiologique et épuisant. Ce que tu peux faire : anticiper, gérer la logistique alimentaire, prendre le relais sur tout ce qui produit des odeurs."},

  7:{emoji:'🫐',taille:'1 cm',poids:'1 g',titre:"Le visage se structure",intro:"À 7 SA, bébé mesure 1 cm. Le visage commence à se structurer avec les fosses nasales et les bourgeons oculaires.",developpement:"Le visage prend forme. Les fosses nasales, les bourgeons oculaires et les ébauches des oreilles sont visibles. Les bras et les jambes s'allongent. Le foie commence à produire des cellules sanguines. Le placenta assure de mieux en mieux les échanges.",organes:["Fosses nasales","Bourgeons oculaires","Foie actif"],savistu:"À 7 SA, les empreintes digitales de bébé commencent à se former dans les couches superficielles de la peau. Elles sont déjà génétiquement uniques et ne changeront jamais.",faq:[{q:"L'hypersalivation est-elle normale ?",r:"Oui. C'est un phénomène appelé ptyalisme gravidique, lié aux hormones. Il disparaît généralement après le 1er trimestre."},{q:"Les sautes d'humeur sont-elles normales ?",r:"Oui. Elles sont directement liées aux fluctuations hormonales, comme un syndrome prémenstruel amplifié. Ta stabilité émotionnelle est un ancrage précieux pour elle."}],maman_titre:"L'hypersensibilité aux odeurs est maximale",maman:"L'hypersensibilité aux odeurs peut rendre certains aliments ou environnements insupportables. C'est un mécanisme neurologique de protection du fœtus contre les substances potentiellement toxiques.",maman_aide:"Prends en charge la cuisine entièrement. Propose des repas froids ou tièdes qui dégagent peu d'odeurs.",maman_signe:"L'hypersensibilité aux odeurs est neurologique, pas psychologique",alerte:"Si elle ne peut plus rien avaler du tout depuis plus de 24h, consulter en urgence (hyperémèse gravidique).",doc_titre:"Les analyses de sang obligatoires",doc:"Prescrites lors de la 1ère consultation : groupe sanguin et rhésus, NFS, rubéole, toxoplasmose, syphilis, hépatite B, VIH (avec accord). Sans immunité contre la toxoplasmose : éviter viande crue, charcuterie, fruits et légumes non lavés, jardinage sans gants.",conseil:"L'hypersensibilité aux odeurs n'est pas un caprice. C'est neurologique. Adapte l'environnement de la maison : aère, évite les produits ménagères parfumés, range les aliments malodorants."},

  8:{emoji:'🫐',taille:'1,6 cm',poids:'1 g',titre:"Les doigts se séparent",intro:"À 8 SA, bébé mesure 1,6 cm. Les doigts commencent à se séparer. Le cerveau se développe à un rythme extraordinaire.",developpement:"Les doigts se séparent des palmures interdigitales. Le cerveau produit environ 100 nouvelles cellules nerveuses par minute. Les organes génitaux se différencient mais ne sont pas encore visibles à l'échographie. Tous les organes principaux sont en cours de formation simultanée.",organes:["Doigts séparés","Neurogenèse intense","Organes génitaux"],savistu:"Le cerveau de bébé produit 100 nouvelles cellules nerveuses par minute à 8 SA. C'est le pic de la neurogenèse embryonnaire. Cette production ralentira progressivement jusqu'à la naissance.",faq:[{q:"La fatigue extrême est-elle normale ?",r:"Oui. La progestérone, hormone dominante du 1er trimestre, est un sédatif naturel. Elle ralentit le métabolisme pour préserver l'énergie pour la grossesse."},{q:"Doit-on déclarer la grossesse à la Sécurité sociale ?",r:"Oui, avant la fin du 3e mois (avant 15 SA) sur ameli.fr. Cela ouvre les droits aux remboursements à 100% à partir du 6e mois."}],maman_titre:"La fatigue est souvent écrasante",maman:"La fatigue intense est normale et liée à la progestérone. Des maux de tête peuvent apparaître. L'humeur est parfois instable. Les sautes d'humeur sont biochimiques, pas personnelles.",maman_aide:"Prends le relais sur les tâches ménagères sans qu'elle ait à demander. Anticipe. Ne laisse pas la maison se dégrader.",maman_signe:"La fatigue du 1er trimestre est comparable à un décalage horaire permanent",alerte:"Pertes de sang importantes ou douleurs abdominales intenses : consulter en urgence.",doc_titre:"Déclarer la grossesse",doc:"Sur ameli.fr, déclarer la grossesse avant 15 SA. Informer la mutuelle pour optimiser les remboursements. Informer l'employeur ouvre des protections légales : il est interdit de licencier une femme enceinte, même en période d'essai.",conseil:"Ce que tu fais sans qu'elle demande a dix fois plus de valeur que ce que tu fais quand elle te le dit. La charge mentale de la grossesse est déjà lourde. Anticipe."},

  9:{emoji:'🫒',taille:'2,3 cm',poids:'2 g',titre:"Tous les organes sont en place",intro:"À 9 SA, bébé mesure 2,3 cm. Tous les organes principaux sont maintenant initialisés. Les semaines suivantes serviront à les développer.",developpement:"Tous les organes principaux sont en place. Bébé peut déjà sucer son pouce. Les dents de lait commencent à se former sous les gencives. Son cœur bat à 170 battements par minute. Il peut faire de petits mouvements mais ils ne sont pas encore perceptibles.",organes:["Tous organes initialisés","Succion du pouce","Dents de lait en formation"],savistu:"À 9 SA, bébé peut déjà sucer son pouce. Ce réflexe de succion entraîné in utero sera l'un de ses premiers comportements autonomes après la naissance pour s'alimenter.",faq:[{q:"Quand la grossesse devient-elle stable ?",r:"Après 12 SA, le risque de fausse couche passe sous 2%. C'est le cap psychologique et médical du 1er trimestre."},{q:"Les émotions intenses sont-elles normales ?",r:"Oui. Elles sont biochimiques, liées aux hormones. Accueille-les sans les juger ni chercher à les corriger."}],maman_titre:"Les émotions peuvent être intenses",maman:"Les sautes d'humeur peuvent être intenses. L'anxiété sur la grossesse est fréquente. Le ventre n'est pas encore visible mais les vêtements peuvent commencer à serrer.",maman_aide:"Écoute sans chercher à résoudre. Assieds-toi avec elle, sans téléphone, et accueille ce qu'elle ressent.",maman_signe:"L'anxiété du 1er trimestre est normale et très fréquente",alerte:"Douleur vive d'un côté du ventre avec saignements : grossesse extra-utérine possible. Consulter en urgence.",doc_titre:"La 1ère échographie approche",doc:"Elle a lieu entre 11 et 13 SA + 6 jours. Elle date précisément la grossesse, mesure la clarté nucale (dépistage de la trisomie 21) et vérifie le développement général. C'est souvent la première fois que vous verrez bébé.",conseil:"Quand elle pleure sans raison apparente, ne cherche pas à comprendre. Reste calme, prends-la dans tes bras. Ta stabilité émotionnelle est son ancrage."},

  10:{emoji:'🍓',taille:'3 cm',poids:'4 g',titre:"La période embryonnaire est terminée",intro:"À 10 SA, bébé mesure 3 cm. Il est officiellement appelé fœtus. La période embryonnaire est terminée. Tous les organes essentiels sont en place.",developpement:"Bébé est maintenant un fœtus. Les ongles apparaissent. Il peut faire des petits mouvements spontanés visibles à l'échographie. Les organes génitaux se différencient davantage. Le fœtus peut ouvrir et fermer ses poings.",organes:["Ongles","Poings qui s'ouvrent","Organes génitaux en différenciation"],savistu:"À 10 SA, tous les organes essentiels sont en place. Les 30 semaines suivantes serviront uniquement à les faire grandir, se perfectionner et s'entraîner. C'est un changement de phase majeur.",faq:[{q:"L'échographie T1 est-elle obligatoire ?",r:"Oui. Elle est obligatoire entre 11 SA et 13 SA + 6 jours. Elle mesure la clarté nucale pour le dépistage de la trisomie 21 et date précisément la grossesse."},{q:"Que faire pendant l'échographie ?",r:"Sois pleinement présent, téléphone en mode silencieux. Filme. Prépare des questions pour l'échographiste. Ce rendez-vous compte pour vous trois."}],maman_titre:"Les nausées commencent à diminuer",maman:"Les nausées commencent souvent à diminuer progressivement. Un regain d'énergie peut apparaître. La libido peut revenir. Les premières variations de poids deviennent parfois visibles.",maman_aide:"Pose une demi-journée de congé dans ton agenda. Prépare une liste de questions pour l'échographiste.",maman_signe:"La diminution des nausées à 10-12 SA est normale",alerte:"Si les nausées disparaissent brusquement et complètement du jour au lendemain, le mentionner au médecin lors du prochain rendez-vous.",doc_titre:"Le dépistage de la trisomie 21",doc:"Il combine la mesure de la clarté nucale à l'échographie T1 et une prise de sang (marqueurs sériques maternels). Ce n'est pas un diagnostic : c'est une évaluation du risque. En cas de risque élevé, un diagnostic peut être proposé (amniocentèse ou trophoblaste).",conseil:"L'échographie T1 peut être émotionnellement intense. Entendre le cœur, voir bébé pour la première fois. Prépare-toi à ressentir quelque chose d'inattendu. C'est normal."},

  11:{emoji:'🍋',taille:'4 cm',poids:'7 g',titre:"Les dents de lait se forment",intro:"À 11 SA, bébé mesure 4 cm. Les dents de lait se forment sous les gencives. Il effectue des mouvements de déglutition.",developpement:"Les dents de lait se forment sous les gencives. Elles ne perceront que 6 mois environ après la naissance. Le fœtus effectue des mouvements de déglutition et inhalation du liquide amniotique. Les os commencent à se solidifier. Le foie produit des globules rouges.",organes:["Dents de lait","Déglutition","Solidification osseuse"],savistu:"Les 20 dents de lait de bébé sont toutes en formation à 11 SA. Elles ne perceront qu'environ 6 à 8 mois après la naissance, mais leur structure est déjà là.",faq:[{q:"Le masque de grossesse est-il permanent ?",r:"Non. Le masque de grossesse (chloasma) est lié aux hormones et disparaît généralement après l'accouchement. La protection solaire limite son apparition."},{q:"Quand informer l'employeur ?",r:"Légalement, elle n'est pas obligée de prévenir avant la fin du 1er trimestre. Informer l'employeur ouvre des protections légales immédiates (ne peut plus être licenciée)."}],maman_titre:"Le corps change visiblement",maman:"Le ventre commence légèrement à s'arrondir. La peau peut changer. Certaines femmes développent le masque de grossesse ou une ligne brune sur l'abdomen (linea nigra). Ces changements peuvent être difficiles à vivre.",maman_aide:"Ne fais aucun commentaire sur son corps, même positif. Dis-lui simplement qu'elle est belle. Ton regard sur elle compte énormément.",maman_signe:"La linea nigra est causée par la mélanine stimulée par les hormones",alerte:"Fièvre supérieure à 38,5°C : consulter rapidement. Certaines infections peuvent affecter le développement fœtal.",doc_titre:"Informer l'employeur",doc:"La grossesse doit être déclarée à la mutuelle pour optimiser les remboursements. Informer l'employeur ouvre des droits : interdiction de licenciement, autorisation d'absence pour les examens médicaux sans perte de salaire, adaptation du poste si nécessaire.",conseil:"Son corps change et ce n'est pas toujours facile à accepter. Ne fais pas de commentaires sur sa silhouette, même positifs et bien intentionnés. Dis-lui qu'elle est belle, point."},

  12:{emoji:'🍋',taille:'5,4 cm',poids:'14 g',titre:"La fin du 1er trimestre",intro:"À 12 SA, c'est la fin du 1er trimestre. Le risque de fausse couche chute considérablement. L'échographie T1 a lieu cette semaine.",developpement:"C'est la fin du 1er trimestre, un cap majeur. Après 12 SA, le risque de fausse couche passe sous 2%. Le visage est pleinement reconnaissable. L'échographie T1 mesure la clarté nucale. Bébé peut avaler, sucer et faire des grimaces.",organes:["Visage reconnaissable","Grimaces","Déglutition active"],savistu:"Après 12 SA, le risque de fausse couche passe sous la barre des 2%. C'est pour cette raison que la majorité des couples attend ce cap pour annoncer la grossesse à leur entourage.",faq:[{q:"L'échographie T1 est-elle douloureuse ?",r:"Non. Elle est indolore, dure environ 30 minutes. Une sonde abdominale est utilisée en priorité, vaginale si la visualisation est insuffisante."},{q:"Peut-on annoncer la grossesse maintenant ?",r:"C'est votre décision. Le risque de fausse couche est passé sous 2%. Beaucoup de couples attendent ce cap. Comment et à qui vous l'annoncez, c'est une décision à prendre ensemble."}],maman_titre:"Le soulagement émotionnel est souvent palpable",maman:"Le soulagement émotionnel après ce cap est réel. L'énergie revient progressivement. L'échographie T1 est souvent vécue avec beaucoup d'émotions.",maman_aide:"Filme l'échographie. Ce sera l'un des premiers souvenirs de bébé. Arrive 10 minutes en avance.",maman_signe:"Les résultats de la clarté nucale peuvent prendre quelques jours",alerte:"Les résultats de la clarté nucale arrivent dans les jours suivants. Reste disponible émotionnellement pour accueillir les résultats ensemble, quels qu'ils soient.",doc_titre:"Le bouchon muqueux et le col",doc:"Le col de l'utérus est fermé par un bouchon muqueux qui protège la grossesse. Il se perdra en fin de grossesse, souvent quelques jours avant l'accouchement. La modification du col (effacement, dilatation) commence progressivement dans les dernières semaines.",conseil:"Les résultats de la clarté nucale peuvent prendre quelques jours et générer de l'anxiété. Sois disponible, pas envahissant. Si les résultats sont complexes, votre médecin vous guidera étape par étape."},

  13:{emoji:'🍑',taille:'7,4 cm',poids:'23 g',titre:"Le 2e trimestre commence",intro:"À 13 SA, le 2e trimestre commence. C'est souvent la période la plus confortable de la grossesse. L'énergie revient.",developpement:"Le réflexe de succion est pleinement opérationnel. Les empreintes digitales sont définitives. Le système urinaire fonctionne. Les cordes vocales se forment. Le fœtus peut réagir à la lumière.",organes:["Empreintes définitives","Système urinaire","Cordes vocales"],savistu:"Bébé produit déjà de l'urine à 13 SA. Cette urine rejoint le liquide amniotique. Bébé ingère ce liquide et le filtre en permanence. Le liquide amniotique est donc partiellement de l'urine recyclée.",faq:[{q:"La libido peut-elle revenir au 2e trimestre ?",r:"Oui. C'est fréquent. Les nausées disparaissent, l'énergie revient, le ventre n'est pas encore encombrant. Le 2e trimestre est souvent une période plus légère et plus connectée."},{q:"Quand annoncer la grossesse ?",r:"Si pas encore fait, maintenant est le moment idéal. Risque faible, énergie revenue, ventre pas encore visible. Profitez-en pour faire quelque chose de spécial."}],maman_titre:"Le regain d'énergie est réel",maman:"Le 2e trimestre commence. L'énergie revient. Les nausées disparaissent pour la plupart. La libido peut augmenter. C'est souvent la meilleure période de la grossesse.",maman_aide:"Lance la conversation sur les prénoms. C'est légère, joyeuse et crée du lien.",maman_signe:"Le regain d'énergie du 2e trimestre est physiologique",alerte:"Des nausées très intenses qui persistent au-delà de 14 SA : consulter, un traitement médicamenteux peut être nécessaire.",doc_titre:"Annoncer la grossesse au travail",doc:"Elle n'est légalement pas obligée d'annoncer la grossesse avant le congé maternité. Mais annoncer tôt ouvre des droits : aménagement du poste, autorisations d'absence pour les examens médicaux, protection contre le licenciement.",conseil:"L'annonce de la grossesse à la famille est un moment fort que vous ne vivrez qu'une fois avec ce bébé. Prenez le temps de décider ensemble comment, quand et à qui. Ce n'est pas une décision à prendre seul."},

  14:{emoji:'🍑',taille:'8,7 cm',poids:'43 g',titre:"Les reins fonctionnent",intro:"À 14 SA, bébé mesure 8,7 cm. Les reins fonctionnent. Le sexe de bébé peut parfois être deviné à l'échographie.",developpement:"Les reins de bébé fonctionnent et produisent de l'urine. Son visage peut produire une trentaine d'expressions différentes. Le sexe est parfois visible à l'échographie selon la position. Les os du crâne se solidifient.",organes:["Reins fonctionnels","Expressions faciales","Os du crâne"],savistu:"À 14 SA, le visage de bébé peut produire une trentaine d'expressions différentes. Il fronce les sourcils, grimace, sourit. Ces expressions ne sont pas conscientes mais témoignent du développement neurologique.",faq:[{q:"Les douleurs ligamentaires sont-elles normales ?",r:"Oui. Les ligaments ronds soutiennent l'utérus et s'étirent avec sa croissance. Des douleurs dans le bas-ventre, souvent d'un côté, sont normales et sans danger."},{q:"Peut-on connaître le sexe de bébé à 14 SA ?",r:"C'est parfois possible selon la position de bébé, mais c'est à l'échographie T2 (vers 20 SA) qu'il est généralement visible avec certitude."}],maman_titre:"Le ventre s'arrondit",maman:"Le ventre s'arrondit clairement. Les douleurs ligamentaires dans le bas-ventre peuvent apparaître. La libido est souvent revenue. Le 2e trimestre est souvent décrit comme la meilleure période.",maman_aide:"Réserve une table dans son restaurant préféré ce week-end. Sans prévenir. Le 2e trimestre est fait pour les moments de couple.",maman_signe:"Les douleurs ligamentaires sont normales et sans danger",alerte:"Douleur très forte et persistante d'un côté du ventre, différente des douleurs ligamentaires habituelles : consulter.",doc_titre:"Choisir sa maternité",doc:"Il est recommandé de choisir sa maternité avant 20 SA. Les maternités ont des niveaux différents (1, 2, 3) selon leur capacité à gérer les complications. Une grossesse normale peut accoucher dans une maternité de niveau 1. En cas de grossesse à risque, une maternité de niveau 3 est nécessaire.",conseil:"Le 2e trimestre est la fenêtre idéale pour un moment de couple. L'énergie est revenue, le ventre est encore génable, et l'accouchement est loin. Profitez-en vraiment."},

  15:{emoji:'🍎',taille:'10 cm',poids:'70 g',titre:"Bébé entend pour la 1ère fois",intro:"À 15 SA, bébé mesure 10 cm. Il entend pour la première fois. Les vibrations sonores traversent le liquide amniotique.",developpement:"Bébé entend pour la première fois. Les vibrations sonores traversent le liquide amniotique. Il perçoit surtout les sons graves, notamment les voix masculines. Son squelette se solidifie. Le système cardio-vasculaire achemine 25 litres de sang par jour.",organes:["Audition fonctionnelle","Sons graves perçus","Squelette en solidification"],savistu:"Les voix masculines, plus graves, traversent mieux le liquide amniotique. Ta voix est donc l'une des mieux perçues par bébé in utero. Il la reconnaîtra à la naissance.",faq:[{q:"Doit-on vraiment parler à bébé ?",r:"Oui. Les études montrent que les nouveau-nés reconnaissent les voix entendues in utero et les préfèrent aux voix inconnues. C'est le début de votre relation."},{q:"La prise de poids est-elle normale ?",r:"Oui. La prise de poids recommandée pour une grossesse normale est de 11 à 16 kg au total. Au 2e trimestre, environ 500g par semaine."}],maman_titre:"La prise de poids devient visible",maman:"La prise de poids devient visible. Des vergetures peuvent apparaître selon la génétique. Le volume sanguin augmente de 40% pendant la grossesse.",maman_aide:"Instaure un rituel : parler à bébé le soir, 5 minutes, ta main sur son ventre. Ta voix grave est la mieux perçue par bébé.",maman_signe:"Les vergetures sont génétiquement déterminées, pas liées à l'hydratation",alerte:"Des gonflements asymétriques des jambes, surtout avec rougeur et chaleur : peut indiquer une phlébite. Consulter.",doc_titre:"Le dépistage de la trisomie 21 par prise de sang",doc:"Le test des marqueurs sériques maternels (MSM) est une prise de sang qui complète la mesure de la clarté nucale. Il peut être fait entre 14 et 17 SA. Il affine l'évaluation du risque de trisomie 21. Ce n'est pas un diagnostic.",conseil:"Parle à bébé chaque soir. Pas besoin de trouver les mots parfaits. Dis-lui ton prénom, ce que tu fais, ce que tu ressens. Il mémorise ta voix et te reconnaîtra à la naissance."},

  16:{emoji:'🥑',taille:'11,6 cm',poids:'100 g',titre:"Les premiers mouvements",intro:"À 16 SA, bébé mesure 11,6 cm. Les premières sensations de mouvement peuvent apparaître pour la maman.",developpement:"Le squelette se renforce progressivement. Les yeux peuvent percevoir la lumière bien que toujours fermés. Le système nerveux central coordonne de mieux en mieux les mouvements. Bébé peut attraper son propre cordon ombilical.",organes:["Perception de la lumière","Coordination motrice","Préhension du cordon"],savistu:"À 16 SA, le fœtus peut attraper son propre cordon ombilical. Ce geste témoigne du développement de sa coordination motrice. Il ne risque rien : le cordon est résistant et souple.",faq:[{q:"Les premiers mouvements font-ils mal ?",r:"Non. Ils sont souvent décrits comme des bulles ou des papillons dans le ventre. C'est une sensation légère et agréable."},{q:"Quand réserver les cours de préparation ?",r:"Maintenant. Ils se remplissent vite. Des cours spécifiques pour les pères existent dans de nombreuses maternités et sont très utiles."}],maman_titre:"Les premiers mouvements peuvent apparaître",maman:"Les premières sensations de mouvement (quickening) peuvent apparaître. Souvent décrites comme des bulles ou des papillons. Pour une première grossesse, elles sont plus tardives (18-20 SA).",maman_aide:"Renseigne-toi sur les cours de préparation à l'accouchement spécifiques aux pères dans votre maternité.",maman_signe:"Pour une 1ère grossesse, les mouvements se sentent généralement entre 18 et 22 SA",alerte:"Si aucun mouvement n'est ressenti d'ici 22 SA pour une 1ère grossesse : en parler au médecin.",doc_titre:"Les cours de préparation à l'accouchement",doc:"8 séances remboursées à 100% par l'Assurance maladie pour la maman. Disponibles en maternité, cabinet de sage-femme ou en ligne. Des cours spécifiques pour les pères (future naissance, parentalité) existent dans de nombreuses structures. Ils changent vraiment la façon d'aborder l'accouchement.",conseil:"Renseigne-toi sur le plan de naissance cette semaine. C'est un document d'une page que vous remettrez à la maternité pour exprimer vos souhaits. Prendre l'initiative de le préparer, c'est être acteur."},

  17:{emoji:'🍐',taille:'13 cm',poids:'140 g',titre:"Les empreintes palmaires se forment",intro:"À 17 SA, bébé mesure 13 cm. Une couche de graisse brune se forme. Les empreintes palmaires sont définitives.",developpement:"La graisse brune se forme sous la peau. Elle servira à réguler la température corporelle après la naissance. Bébé s'entraîne à avaler et respirer le liquide amniotique. Ses empreintes palmaires sont définitives, comme ses empreintes digitales.",organes:["Graisse brune","Déglutition active","Empreintes palmaires"],savistu:"À 17 SA, bébé s'entraîne déjà à avaler le liquide amniotique, environ 500 ml par jour. Cet entraînement prépare son système digestif pour l'alimentation après la naissance.",faq:[{q:"Les douleurs dans les côtes sont-elles normales ?",r:"Oui. Elles sont liées à l'expansion de l'utérus qui pousse sur la cage thoracique. Elles s'intensifieront au 3e trimestre."},{q:"Peut-on pratiquer le sport ?",r:"Oui. Une activité physique douce est recommandée : natation, yoga prénatal, marche. Elle réduit les douleurs, améliore le sommeil et prépare le corps à l'accouchement."}],maman_titre:"Des douleurs dans les côtes peuvent apparaître",maman:"Les mouvements de bébé sont parfois perceptibles. Le ventre est bien visible. Des douleurs dans les côtes peuvent apparaître avec l'expansion de l'utérus.",maman_aide:"Note dans ton téléphone la date et l'heure du premier mouvement que tu sens sous ta main. Tu liras cette note dans 10 ans.",maman_signe:"L'utérus arrive au niveau du nombril vers 20 SA",alerte:"Douleurs très intenses sous les côtes droites : peut indiquer un problème hépatique. Consulter rapidement.",doc_titre:"L'activité physique pendant la grossesse",doc:"L'activité physique modérée est recommandée pendant toute la grossesse. Sports recommandés : natation, aquagym, yoga prénatal, marche. À éviter : sports de contact, activités à risque de chute, plongée. Les bénéfices : réduction des douleurs, meilleur sommeil, préparation à l'accouchement.",conseil:"Propose-lui de faire une sortie sportive ensemble : marche en forêt, natation, yoga. L'activité physique à deux renforce la connexion et lui fait du bien physiquement."},

  18:{emoji:'🫑',taille:'14,2 cm',poids:'190 g',titre:"Le sens du toucher se développe",intro:"À 18 SA, bébé mesure 14,2 cm. Il développe son sens du toucher. Son système vestibulaire lui permet de percevoir sa position.",developpement:"Le sens du toucher se développe. Bébé explore son environnement avec ses mains et son visage. Le système vestibulaire se développe, lui permettant de percevoir les mouvements et sa position dans l'espace. Ses os se solidifient davantage.",organes:["Sens du toucher","Système vestibulaire","Solidification osseuse"],savistu:"À 18 SA, bébé peut entendre la musique que vous écoutez. Des études suggèrent que les nourrissons reconnaissent des mélodies entendues in utero et les réentendre les apaise après la naissance.",faq:[{q:"Les douleurs dans le dos sont-elles normales ?",r:"Oui. Le changement de centre de gravité modifie la posture. Des massages réguliers, la natation et le yoga prénatal aident significativement."},{q:"Les crampes nocturnes sont-elles normales ?",r:"Oui. Elles sont fréquentes au 2e trimestre. Hydratation, magnésium et étirements doux aident. Un massage des mollets avant de dormir prévient les crampes."}],maman_titre:"Le dos peut commencer à souffrir",maman:"Les douleurs lombaires apparaissent avec le changement de centre de gravité. Les crampes nocturnes dans les jambes sont possibles. L'utérus monte.",maman_aide:"Apprends une technique de massage du dos précise. Une vidéo YouTube, 10 minutes. Puis mets-la en pratique ce soir.",maman_signe:"Les crampes nocturnes peuvent être soulagées par des étirements des mollets avant de dormir",alerte:"Crampe dans le mollet avec rougeur et chaleur localisée : peut indiquer une phlébite. Consulter rapidement.",doc_titre:"La maternité et ses services",doc:"Il est temps de choisir votre maternité définitivement si pas encore fait. Demandez à visiter. Posez des questions sur leur politique d'accompagnement (peau à peau, allaitement, présence du père en salle), les équipements disponibles (baignoire, ballon, péridurale ambulatoire).",conseil:"Le mal de dos va s'intensifier au 3e trimestre. Investis dans un coussin de grossesse maintenant. C'est concret, immédiatement utile, et elle n'a pas à le demander."},

  19:{emoji:'🥭',taille:'15,3 cm',poids:'240 g',titre:"250 000 neurones par minute",intro:"À 19 SA, bébé mesure 15,3 cm. Les cellules cérébrales se multiplient à un rythme de 250 000 par minute.",developpement:"Le vernix caseosa (enduit blanchâtre protecteur) recouvre la peau de bébé. Les cellules cérébrales se multiplient à 250 000 par minute. Tous les sens se développent rapidement. Le corps se couvre de lanugo (fin duvet protecteur).",organes:["Vernix caseosa","Lanugo","Multiplication neuronale"],savistu:"Le lanugo, fin duvet qui recouvre bébé à 19 SA, disparaîtra avant la naissance pour la plupart des bébés. S'il en reste, il tombe naturellement dans les premières semaines.",faq:[{q:"Quand commencer la chambre de bébé ?",r:"Maintenant est un bon moment. Les meubles peuvent prendre du temps à livrer. Et monter les meubles ensemble, c'est une façon concrète de se projeter."},{q:"La congestion nasale est-elle normale ?",r:"Oui. Elle est causée par l'augmentation du volume sanguin et les hormones. Elle disparaît après l'accouchement."}],maman_titre:"Le ventre est très visible",maman:"Le ventre est très visible. La congestion nasale peut apparaître. La fatigue peut légèrement revenir. Des ronflements peuvent apparaître pour la même raison.",maman_aide:"Établis la liste des achats prioritaires pour bébé avec budget et délais de livraison. Prends en charge la logistique.",maman_signe:"La congestion nasale est liée à l'augmentation du volume sanguin de 40%",alerte:"Si les mouvements de bébé s'arrêtent complètement pendant plus de 12h : contacter la maternité.",doc_titre:"La liste des achats prioritaires",doc:"Essentiel : siège auto groupe 0+ (obligatoire pour quitter la maternité), lit cododo ou berceau, baignoire bébé, thermomètre rectal, tire-lait si allaitement prévu. Superflu : chauffe-biberon électrique, stérilisateur UV, balancelle électrique. Commandez maintenant pour recevoir avant 34 SA.",conseil:"Propose de monter la chambre de bébé ensemble ce week-end. Toi tu montes les meubles, elle décore. Ces activités partagées t'ancrent dans la réalité de l'arrivée de bébé."},

  20:{emoji:'🍌',taille:'16,4 cm',poids:'300 g',titre:"La mi-grossesse",intro:"À 20 SA, c'est la mi-grossesse. L'échographie morphologique T2 a lieu cette semaine. C'est la plus complète de la grossesse.",developpement:"C'est la mi-grossesse. L'échographie T2 examine en détail chaque organe et chaque membre. Elle vérifie le cerveau, le cœur, les reins, la colonne vertébrale. Le sexe est généralement visible si vous souhaitez le connaître.",organes:["Échographie T2","Tous organes vérifiés","Sexe généralement visible"],savistu:"L'échographie T2 examine plus de 100 critères anatomiques. C'est l'examen médical le plus complet de la grossesse. Le taux de détection des malformations majeures est d'environ 80%.",faq:[{q:"Faut-il connaître le sexe de bébé ?",r:"C'est une décision entièrement personnelle. Si vous ne voulez pas le savoir, prévenez l'échographiste au début du rendez-vous."},{q:"Que se passe-t-il si une anomalie est détectée ?",r:"Une consultation avec un médecin spécialiste est proposée pour évaluer la situation. Vous serez accompagnés à chaque étape."}],maman_titre:"L'échographie T2 est souvent vécue avec anxiété",maman:"L'échographie T2 est souvent vécue avec anxiété mêlée d'excitation. C'est le rendez-vous le plus attendu et potentiellement le plus émotionnel de la grossesse.",maman_aide:"Prépare 3 questions précises pour l'échographiste. Discutez ensemble avant si vous souhaitez connaître le sexe.",maman_signe:"L'échographie T2 dure environ 45 minutes à 1 heure",alerte:"Si des anomalies sont détectées, une consultation spécialisée sera proposée. Restez calmes : une anomalie détectée ne signifie pas forcément une pathologie grave.",doc_titre:"L'échographie T2 morphologique",doc:"Obligatoire vers 20-22 SA. Examine chaque organe, mesure la croissance, vérifie le placenta et le liquide amniotique. Un compte-rendu détaillé est remis. En cas d'anomalie, un avis en centre de référence (CPDP) peut être proposé.",conseil:"L'échographie T2 peut révéler des informations inattendues. Quoi qu'il arrive, ton rôle est d'être calme et solide. Elle lit tes réactions. Ta stabilité est son ancrage."},


  21:{emoji:'🥕',taille:'26 cm',poids:'360 g',titre:"Les sourcils apparaissent",intro:"À 21 SA, bébé mesure 26 cm. Ses sourcils et ses paupières sont maintenant visibles. Il développe un sens du goût primitif.",developpement:"Les sourcils et les cils apparaissent. Bébé peut percevoir des saveurs dans le liquide amniotique. Son sens du toucher se développe. Il explore son environnement en touchant son visage et son cordon ombilical. Les mouvements sont de plus en plus coordonnés.",organes:["Sourcils et cils","Sens du goût","Toucher développé"],savistu:"Bébé goûte le liquide amniotique et y perçoit les saveurs de ce que mange sa maman. Si elle mange épicé, il le sait.",faq:[{q:"Les coups de pied sont-ils normaux ?",r:"Oui. Les mouvements actifs sont un signe de bonne santé. À partir de 28 SA, il est recommandé de surveiller les mouvements quotidiens."},{q:"Comment surveiller les mouvements ?",r:"Nota 10 mouvements par session. Si tu ne comptes pas 10 mouvements en 2h, appelle la maternité."}],maman_titre:"Les rondeurs s'affirment",maman:"Le ventre est bien visible. La fatigue du 1er trimestre est loin. Elle peut ressentir des contractions de Braxton Hicks, des contractions d'entraînement indolores et normales.",maman_aide:"Crée un album photo partagé avec elle. Une photo par semaine. C'est simple et ça compte.",maman_signe:"Les contractions de Braxton Hicks sont normales et sans douleur",alerte:"Contractions régulières et douloureuses avant 37 SA : appeler la maternité immédiatement.",doc_titre:"Les contractions de Braxton Hicks",doc:"Ce sont des contractions d'entraînement, irrégulières et indolores. Normales à partir du 2e trimestre. Elles se distinguent des vraies contractions par leur irrégularité et l'absence de douleur progressive.",conseil:"Dans 20 ans, les photos de grossesse seront l'un des souvenirs les plus précieux. Prends cette habitude maintenant, avant qu'il ne soit trop tard."},

  22:{emoji:'🥥',taille:'27 cm',poids:'430 g',titre:"Les yeux se forment complètement",intro:"À 22 SA, bébé mesure 27 cm. Ses yeux sont formés mais les iris manquent encore de pigmentation. Il réagit aux sons extérieurs.",developpement:"Les yeux de bébé sont entièrement formés. La pigmentation des iris se développera dans les semaines suivantes. Son ouïe est mature. Il peut se souvenir de sons entendus régulièrement. Les poumons commencent à produire du surfactant.",organes:["Yeux formés","Ouïe mature","Production de surfactant"],savistu:"Les bébés naissent avec les yeux bleus ou gris foncé, quelle que soit leur origine. La couleur définitive se fixe dans les premiers mois de vie.",faq:[{q:"Peut-on déjà parler d'un caractère ?",r:"Les études montrent que certains traits de comportement observés in utero (calme, agité) se retrouvent après la naissance."},{q:"Le stress de maman affecte-t-il bébé ?",r:"Oui. Le cortisol (hormone du stress) traverse le placenta. Aider ta partenaire à gérer son stress, c'est directement prendre soin de bébé."}],maman_titre:"La mémoire des sons commence",maman:"Elle peut ressentir des démangeaisons sur le ventre liées à l'étirement de la peau. Le ventre peut sembler dur par moments à cause des contractions de Braxton Hicks.",maman_aide:"Lis à voix haute 10 minutes chaque soir. Bébé t'entend et mémorise ta voix.",maman_signe:"Les démangeaisons abdominales sont liées à l'étirement cutané",alerte:"Des démangeaisons intenses sur tout le corps, surtout la nuit, peuvent indiquer une cholestase gravidique. Consulter rapidement.",doc_titre:"Le surfactant pulmonaire",doc:"Le surfactant est une substance produite par les poumons qui leur permet de fonctionner après la naissance. Sa production débute à 22 SA et est complète vers 36 SA. C'est pourquoi les prématurés avant 34 SA nécessitent souvent une aide respiratoire.",conseil:"Le stress que tu absorbes protège ta partenaire. Quand tu restes calme dans les moments difficiles, tu régules son système nerveux et celui de bébé. C'est documenté scientifiquement."},

  23:{emoji:'🫐',taille:'28 cm',poids:'500 g',titre:"Le demi-kilo",intro:"À 23 SA, bébé pèse environ 500 g. Ses empreintes digitales sont définitivement formées. Il développe ses propres cycles de sommeil.",developpement:"Bébé a ses propres cycles de sommeil et d'éveil, souvent décalés par rapport aux nôtres. Ses empreintes digitales sont définitives. Le cerveau se développe très rapidement. La peau reste transparente mais commence à s'opacifier.",organes:["Cycles veille-sommeil","Empreintes définitives","Opacification de la peau"],savistu:"Les cycles de sommeil de bébé in utero sont souvent opposés à ceux de sa mère. Quand elle dort, bébé s'agite souvent. Ce pattern peut se prolonger après la naissance.",faq:[{q:"Les coups nocturnes sont-ils normaux ?",r:"Oui. Bébé est souvent plus actif la nuit car les mouvements de marche de maman le bercent le jour."},{q:"Faut-il parler bébé ou langage normal ?",r:"Parle normalement, sans simplifier. Les études montrent que le langage 'bébé' ralentit légèrement l'acquisition du vocabulaire."}],maman_titre:"Les rythmes changent",maman:"Les coups de pied peuvent réveiller la nuit. Le dos peut être plus douloureux. La fatigue revient progressivement en fin de 2e trimestre.",maman_aide:"Prends en charge les tâches physiques lourdes sans discussion. Courses, aspirateur, port de charges.",maman_signe:"Les mouvements nocturnes intenses de bébé sont normaux",alerte:"Absence de mouvements pendant plus de 12h : contacter la maternité.",doc_titre:"La position de bébé",doc:"À 23 SA, la position de bébé change constamment. Il ne se positionnera définitivement (tête en bas) qu'autour de 32-34 SA. Une présentation par le siège à terme nécessite une discussion avec l'obstétricien sur la voie d'accouchement.",conseil:"Prends le relais physique total cette semaine. Pas de discussion, pas de négociation. Tu portes les courses, tu passes l'aspirateur, tu fais la vaisselle. Sans qu'elle demande."},

  24:{emoji:'🌽',taille:'30 cm',poids:'600 g',titre:"La viabilité",intro:"À 24 SA, bébé atteint le seuil de viabilité. En cas de naissance prématurée, les équipes médicales interviendraient. C'est un cap psychologique important.",developpement:"24 SA est le seuil légal de viabilité. Les poumons continuent leur maturation. Les yeux s'ouvrent et se ferment. Bébé développe des réflexes de saisie plus précis. Le cortex cérébral commence à se plisser.",organes:["Seuil de viabilité","Yeux qui s'ouvrent","Cortex cérébral plissé"],savistu:"À 24 SA, le taux de survie en cas de naissance prématurée est d'environ 50% avec une prise en charge néonatale intensive. À 28 SA, il passe à plus de 90%.",faq:[{q:"Faut-il s'inquiéter à chaque mouvement inhabituel ?",r:"Non, mais restez attentifs. La règle des 10 mouvements en 2h est un bon repère à partir de 28 SA."},{q:"Le test HGPO approche, qu'est-ce que c'est ?",r:"C'est un test de dépistage du diabète gestationnel. Il se fait en laboratoire, dure 2h avec 3 prises de sang. Ta présence est un soutien utile."}],maman_titre:"Un cap psychologique",maman:"Atteindre 24 SA peut soulager des angoisses latentes. Ce cap marque un tournant émotionnel pour beaucoup de femmes enceintes. Le diabète gestationnel doit être dépisté cette semaine.",maman_aide:"Accompagne-la au test HGPO. 2h d'attente en laboratoire, c'est long seul.",maman_signe:"Le diabète gestationnel touche 8 à 10% des grossesses en France",alerte:"Résultats HGPO anormaux : diabète gestationnel à prendre en charge immédiatement avec un diabétologue.",doc_titre:"Le diabète gestationnel",doc:"Il touche 8 à 10% des grossesses. Non traité, il augmente le risque de macrosomie (gros bébé), de césarienne et de complications néonatales. Traité par régime et parfois insuline, la grossesse se déroule normalement.",conseil:"Le test HGPO dure 2 heures. Elle doit être à jeun, elle ne peut pas conduire si elle se sent faible après. Réserve cette demi-journée et reste avec elle."},

  25:{emoji:'🫛',taille:'32 cm',poids:'660 g',titre:"Les réseaux capillaires se développent",intro:"À 25 SA, bébé mesure 32 cm. Ses vaisseaux capillaires se développent sous la peau, lui donnant un teint rosé. Il répond aux stimulations lumineuses.",developpement:"Les capillaires sanguins se développent sous la peau, lui donnant une couleur rosée. Bébé réagit à la lumière dirigée sur le ventre. Ses poumons continuent de se préparer à la respiration. Les structures cérébrales responsables de la conscience commencent à se former.",organes:["Capillaires sanguins","Réaction à la lumière","Conscience naissante"],savistu:"Si tu diriges une lampe torche sur le ventre de ta partenaire, bébé peut se détourner ou au contraire se tourner vers la lumière. Sa vision primitive est déjà fonctionnelle.",faq:[{q:"Les crampes dans les jambes sont-elles normales ?",r:"Oui. Elles sont liées à la compression des veines par l'utérus et au manque de magnésium. Hydratation et étirements aident."},{q:"Quand commencer la valise de maternité ?",r:"Maintenant est un bon moment. Commencer la liste au moins. Une naissance prématurée peut arriver."}],maman_titre:"La circulation sanguine travaille dur",maman:"Les varices et hémorroïdes peuvent apparaître à cause de l'augmentation du volume sanguin et de la pression de l'utérus. Les crampes nocturnes sont fréquentes.",maman_aide:"Commence la liste de la valise de maternité ce week-end. Prends l'initiative.",maman_signe:"Les varices sont liées à l'augmentation du volume sanguin de 40%",alerte:"Des gonflements importants et asymétriques des jambes peuvent indiquer une phlébite. Consulter rapidement.",doc_titre:"Commencer la valise",doc:"Ne pas attendre le 8e mois pour la valise. Une liste complète se trouve dans le module À préparer. L'essentiel : pièces d'identité, carte Vitale, carnet de maternité, vêtements de rechange, chargeur.",conseil:"Fais le bain de pieds ce soir. Eau chaude, 15 minutes, massage des mollets. Ce n'est pas anecdotique : ça soulage les crampes, les varices et c'est un moment de connexion."},

  26:{emoji:'🥬',taille:'33 cm',poids:'760 g',titre:"Les yeux s'ouvrent",intro:"À 26 SA, bébé ouvre les yeux pour la première fois. Il perçoit des variations de lumière. Ses poumons se préparent intensément à la respiration.",developpement:"Bébé ouvre ses yeux pour la première fois. Il peut distinguer la lumière de l'obscurité. Ses poumons produisent de plus en plus de surfactant. Il pratique des mouvements de respiration avec le liquide amniotique. Son cerveau coordonne de mieux en mieux ses mouvements.",organes:["Yeux ouverts","Respiration simulée","Coordination cérébrale"],savistu:"Bébé cligne déjà des yeux in utero. Ce réflexe est présent dès que les paupières peuvent s'ouvrir et se fermer, vers 26 SA.",faq:[{q:"Le plan de naissance est-il obligatoire ?",r:"Non, mais il est fortement recommandé. Il permet à l'équipe médicale de connaître vos souhaits (péridurale, peau à peau, couper le cordon...) sans avoir à tout expliquer en urgence."},{q:"Comment gérer son anxiété sur l'accouchement ?",r:"La préparer, pas l'éviter. Lire, se former, visiter la maternité. L'inconnu génère l'anxiété. La connaissance génère la confiance."}],maman_titre:"L'essoufflement peut apparaître",maman:"L'utérus monte et appuie sur le diaphragme, causant un essoufflement à l'effort. C'est normal. Le plan de naissance est à rédiger maintenant.",maman_aide:"Cherche le formulaire de plan de naissance de votre maternité et remplis-le avec elle ce week-end.",maman_signe:"L'essoufflement est lié à la compression du diaphragme par l'utérus",alerte:"Essoufflement au repos ou douleur thoracique : consulter en urgence.",doc_titre:"Le plan de naissance",doc:"Document d'une page maximum remis à la maternité. Il indique vos préférences : péridurale ou non, peau à peau immédiat, qui coupe le cordon, musique en salle... L'équipe médicale n'est pas obligée de le suivre mais le respecte en général.",conseil:"Prends l'initiative de rédiger le plan de naissance. Pose les questions difficiles : et si c'est une césarienne en urgence, et si bébé doit aller en réanimation. Mieux vaut avoir réfléchi avant que pendant."},

  27:{emoji:'🥦',taille:'34 cm',poids:'875 g',titre:"La fin du 2e trimestre",intro:"À 27 SA, c'est la dernière semaine du 2e trimestre. Bébé est de plus en plus actif. Le 3e trimestre commence dans une semaine.",developpement:"Le cerveau de bébé continue de se développer rapidement avec la formation de nouvelles connexions. Il distingue désormais les voix familières et peut avoir des préférences musicales. Son système immunitaire commence à se former grâce aux anticorps maternels.",organes:["Connexions cérébrales","Préférences sonores","Système immunitaire naissant"],savistu:"Les anticorps de la mère traversent le placenta pour donner à bébé une protection immunitaire passive qui durera les premiers mois de vie.",faq:[{q:"Le 3e trimestre est-il vraiment difficile ?",r:"Il peut être physiquement éprouvant pour elle. Ton rôle de soutien pratique devient encore plus important."},{q:"Doit-on préparer le retour de maternité ?",r:"Oui. Les premiers jours à la maison sont souvent sous-estimés. Prévoir de la nourriture, de l'aide, et du calme."}],maman_titre:"La fatigue revient",maman:"La fatigue du 3e trimestre s'installe progressivement. Le sommeil devient plus difficile avec le volume du ventre. L'anxiété sur l'accouchement peut augmenter.",maman_aide:"Prépare les repas de la semaine ce week-end. Un congélateur bien rempli avant l'accouchement, c'est du temps libéré après.",maman_signe:"La fatigue du 3e trimestre est physiologique et normale",alerte:"Maux de tête intenses, troubles visuels ou gonflement brutal du visage et des mains : consulter en urgence (prééclampsie).",doc_titre:"Préparer le retour de maternité",doc:"Les 48h après le retour sont souvent les plus difficiles. Prévoir : repas préparés au congélateur, aide d'un proche pour les premiers jours, liste des contacts utiles (sage-femme de ville, pédiatre, IBCLC si allaitement).",conseil:"Commence dès maintenant à préparer des repas au congélateur. Pas pour toi. Pour les premières semaines après la naissance. C'est l'un des gestes les plus utiles et les moins faits."},

  28:{emoji:'🍆',taille:'35 cm',poids:'1 kg',titre:"Le kilo",intro:"À 28 SA, bébé pèse 1 kg. C'est le début du 3e trimestre. La consultation du 7e mois a lieu cette semaine.",developpement:"Bébé pèse 1 kg. Ses poumons sont suffisamment développés pour qu'une naissance à ce stade soit viable avec assistance. Ses mouvements sont puissants et réguliers. Il peut avoir le hoquet, perceptible comme des petits soubresauts rythmés.",organes:["1 kg atteint","Hoquet perceptible","Poumons viables"],savistu:"Le hoquet de bébé in utero est un signe de bon développement neurologique. Il entraîne sa respiration en contractant son diaphragme de façon rythmée.",faq:[{q:"Comment préparer son accouchement en tant que papa ?",r:"Lire le module accouchement de DadUp. Connaître les étapes, les signes du travail, la règle 5-1-1, et son rôle précis en salle de naissance."},{q:"Quand partir à la maternité ?",r:"Règle 5-1-1 : contractions toutes les 5 minutes, depuis 1 heure, pendant 1 minute chacune. Appelle la maternité avant de partir."}],maman_titre:"Le 3e trimestre commence",maman:"La consultation du 7e mois vérifie la position de bébé, la tension artérielle et les analyses de sang. La fatigue s'intensifie. Dormir devient difficile.",maman_aide:"Lis le guide accouchement complet cette semaine. Tu dois savoir exactement quoi faire.",maman_signe:"La consultation du 7e mois est obligatoire",alerte:"Tensions artérielles élevées répétées, maux de tête ou troubles visuels : prééclampsie possible, consulter en urgence.",doc_titre:"La règle 5-1-1",doc:"Pour partir à la maternité au bon moment : contractions toutes les 5 minutes, durent 1 minute chacune, depuis 1 heure. Appelle toujours la maternité avant de partir. Une poche des eaux qui crève = partir immédiatement.",conseil:"Mémorise le numéro direct des urgences obstétricales de ta maternité. Pas le standard, le direct. Programme-le dans tes favoris. Tu dois pouvoir l'appeler les yeux fermés."},

  29:{emoji:'🫚',taille:'36 cm',poids:'1,15 kg',titre:"Les os se minéralisent",intro:"À 29 SA, le squelette de bébé se minéralise activement. Ses besoins en calcium sont maximaux. Ses mouvements sont puissants.",developpement:"Le squelette se minéralise rapidement. Les besoins en calcium sont au maximum. Bébé accumule des réserves de graisse. Son cerveau est maintenant capable de réguler sa propre température. Les mouvements sont de plus en plus puissants et parfois douloureux pour maman.",organes:["Minéralisation osseuse","Réserves de graisse","Régulation thermique"],savistu:"Bébé absorbe 250 mg de calcium par jour à ce stade, prélevés directement sur les réserves de sa mère. Si son alimentation est insuffisante, c'est la densité osseuse de la mère qui en souffre.",faq:[{q:"Les coups forts sont-ils inquiétants ?",r:"Non. Des coups forts sont le signe d'un bébé actif et en bonne santé. Ce qui inquiète, c'est l'absence de mouvement."},{q:"La valise est-elle vraiment urgente ?",r:"Oui. Les naissances prématurées arrivent sans prévenir. La valise doit être prête à partir de 32 SA."}],maman_titre:"Les mouvements peuvent faire mal",maman:"Les coups sous les côtes peuvent être douloureux. Le reflux gastrique s'intensifie. Le sommeil est de plus en plus fragmenté.",maman_aide:"Installe le coussin de grossesse ce soir si pas encore fait. C'est concret et utile.",maman_signe:"Le reflux gastrique est aggravé par la pression de l'utérus sur l'estomac",alerte:"Douleur intense et localisée sous les côtes droites : peut indiquer un problème hépatique. Consulter.",doc_titre:"Le coussin de grossesse",doc:"Indispensable pour dormir confortablement à partir du 3e trimestre. Position recommandée : sur le côté gauche, coussin entre les genoux. Améliore la circulation sanguine vers le placenta.",conseil:"Le reflux la réveille la nuit. Surélève la tête du lit avec quelques livres sous les pieds de lit côté tête. Simple, efficace, sans médicament."},

  30:{emoji:'🍈',taille:'38 cm',poids:'1,3 kg',titre:"Le cerveau se plisse",intro:"À 30 SA, le cerveau de bébé forme ses gyri et sulci, les plis caractéristiques qui augmentent sa surface. C'est un signe de développement cognitif avancé.",developpement:"Le cerveau forme ses plis (gyri et sulci) pour augmenter sa surface et sa capacité de traitement. Bébé accumule des graisses sous-cutanées. Sa peau devient moins transparente. Il peut réagir à la douleur. Ses pupilles réagissent à la lumière.",organes:["Plis cérébraux","Graisse sous-cutanée","Réaction à la douleur"],savistu:"Le cerveau d'un bébé à terme a la même structure plissée que le cerveau adulte. Ces plis se forment entre 28 et 40 SA et permettent d'augmenter la surface corticale de 30 fois.",faq:[{q:"Les séances de préparation à la naissance sont-elles obligatoires ?",r:"Non, mais très utiles. 8 séances remboursées par l'Assurance maladie. Des séances spécifiques pour les pères existent."},{q:"Doit-on visiter la maternité ?",r:"Oui. Connaître les lieux réduit considérablement le stress le jour J. Demandez la visite guidée à votre maternité."}],maman_titre:"La préparation à la naissance",maman:"Les cours de préparation à l'accouchement sont en cours ou à finaliser. Le congé maternité approche. La fatigue peut être intense.",maman_aide:"Visite la maternité avec elle. Repère les accès, le parking, le chemin vers la salle des naissances.",maman_signe:"Le congé maternité commence généralement 6 semaines avant la DPA",alerte:"Si les cours de préparation ne sont pas encore réservés, c'est urgent. Ils se remplissent vite.",doc_titre:"Visiter la maternité",doc:"Demandez à visiter la maternité avant 34 SA. Repérez l'entrée des urgences obstétricales (différente de l'entrée principale), le parking, l'ascenseur. Testez le trajet aux heures de pointe.",conseil:"Fais le trajet maternité cette semaine, aux heures où vous partiriez probablement. Note le temps exact. Identifie une route de secours en cas de bouchon. Ce repérage te sera utile le jour J."},

  31:{emoji:'🧅',taille:'39 cm',poids:'1,5 kg',titre:"Bébé prend du poids rapidement",intro:"À 31 SA, bébé prend environ 250g par semaine. Il prend sa position définitive dans l'utérus. Les mouvements sont très perceptibles.",developpement:"La prise de poids s'accélère. Bébé prend environ 250g par semaine jusqu'à la naissance. Il commence à prendre sa position définitive, idéalement tête en bas. Ses poumons sont presque matures. Il tête son pouce régulièrement.",organes:["Prise de poids rapide","Position tête en bas","Poumons presque matures"],savistu:"Bébé tête son pouce in utero pour entraîner le réflexe de succion dont il aura besoin dès la naissance pour s'alimenter. C'est un entraînement, pas une habitude à corriger.",faq:[{q:"Si bébé est en siège à 31 SA, est-ce grave ?",r:"Non. Beaucoup de bébés se retournent avant 36 SA. Si le siège persiste, une version par manoeuvre externe peut être proposée."},{q:"Comment gérer l'insomnie de fin de grossesse ?",r:"Pas de solution miracle. Micro-siestes dans la journée, température fraîche dans la chambre, coussin de grossesse, dîner léger."}],maman_titre:"Les insomnies s'installent",maman:"L'insomnie devient fréquente. Difficulté à trouver une position confortable. Anxiété nocturne sur l'accouchement.",maman_aide:"Prends en charge les réveils nocturnes liés à l'anxiété. Reste éveillé avec elle si elle ne dort pas.",maman_signe:"L'insomnie de fin de grossesse est normale et fréquente",alerte:"Si bébé est toujours en siège à 36 SA, une consultation spécialisée est nécessaire pour décider de la voie d'accouchement.",doc_titre:"La version par manoeuvre externe",doc:"Si bébé est en siège à 36 SA, l'obstétricien peut tenter de le retourner manuellement. Cette procédure, réalisée sous surveillance, a un taux de succès de 50 à 60%.",conseil:"Si elle ne dort pas, lève-toi avec elle. Pas pour résoudre. Juste pour ne pas la laisser seule à 3h du matin avec ses angoisses. Ta présence calme vaut tous les discours."},

  32:{emoji:'🥜',taille:'40 cm',poids:'1,7 kg',titre:"L'échographie T3",intro:"À 32 SA, l'échographie du 3e trimestre vérifie la position de bébé, son poids estimé et la quantité de liquide amniotique.",developpement:"Bébé est presque à terme sur le plan neurologique. Ses ongles ont atteint l'extrémité de ses doigts. Il pratique des mouvements de respiration 30 à 40% du temps. Ses reins produisent environ 500 ml d'urine par jour qui rejoignent le liquide amniotique.",organes:["Ongles complets","Respiration pratiquée","Urine quotidienne 500ml"],savistu:"À 32 SA, si bébé naissait, ses chances de survie sans séquelles importantes sont supérieures à 95% dans une maternité de niveau 3.",faq:[{q:"L'échographie T3 mesure-t-elle le poids exact ?",r:"Non. Elle estime le poids avec une marge d'erreur de 10 à 15%. C'est un indicateur, pas une mesure précise."},{q:"Que se passe-t-il si le placenta est bas ?",r:"Un placenta praevia bas est réévalué à 32 SA. Beaucoup remontent spontanément. S'il reste bas à terme, une césarienne est programmée."}],maman_titre:"L'échographie T3 approche",maman:"L'échographie T3 peut générer de l'anxiété. Le col commence à se modifier progressivement. La respiration peut être difficile avec la pression de l'utérus sur le diaphragme.",maman_aide:"Pose une demi-journée de congé pour l'échographie T3. Sois présent.",maman_signe:"La respiration difficile est liée à la position haute de l'utérus qui comprime le diaphragme",alerte:"Saignements rouges vifs : appeler le 15 immédiatement. Peut indiquer un décollement placentaire.",doc_titre:"L'échographie T3",doc:"Elle mesure la taille de bébé, estime son poids, vérifie sa position, évalue la quantité de liquide amniotique et examine le placenta. Un compte-rendu détaillé est remis le jour même.",conseil:"L'échographie T3 peut révéler des informations nouvelles (position, poids, placenta). Reste factuel et calme pendant le rendez-vous. Les questions se posent après, à tête reposée."},

  33:{emoji:'🍍',taille:'42 cm',poids:'1,9 kg',titre:"Les poumons finalisent leur maturation",intro:"À 33 SA, les poumons de bébé finalisent leur maturation. Sa peau se lisse grâce aux dépôts de graisse sous-cutanée.",developpement:"Les poumons finalisent leur maturation. La production de surfactant est maintenant suffisante pour une respiration autonome en cas de naissance prématurée. La peau se lisse. Bébé accumule des réserves énergétiques importantes.",organes:["Poumons matures","Peau lisse","Réserves énergétiques"],savistu:"Si tu touches le ventre doucement, bébé peut répondre en se retournant ou en donnant un coup. Cette réactivité tactile est un signe de bonne santé neurologique.",faq:[{q:"Quand partir en congé paternité ?",r:"Le congé paternité de 28 jours peut commencer dès la naissance ou dans les 6 mois suivants. Commencer immédiatement est recommandé pour le lien parent-enfant."},{q:"La valise est-elle vraiment prête ?",r:"Elle doit l'être maintenant. À 33 SA, une naissance est possible et probable d'être imminente dans les semaines suivantes."}],maman_titre:"La fatigue est intense",maman:"Chaque tâche physique devient difficile. Se lever, s'habiller, marcher peuvent être éprouvants. Le moral peut fluctuer.",maman_aide:"Prends en charge 100% des tâches domestiques cette semaine. Sans exception.",maman_signe:"La fatigue physique intense est normale en fin de grossesse",alerte:"Contractions régulières et douloureuses avant 37 SA : appeler la maternité sans attendre.",doc_titre:"Le congé paternité",doc:"28 jours calendaires (ou 35 pour naissances multiples), rémunérés à 100% plafonné. Prévenir l'employeur au moins 15 jours avant. Incompressible : les 4 premiers jours sont obligatoires.",conseil:"Anticipe les premiers jours de retour de maternité. Remplis le congélateur, nettoie la maison, prépare la chambre de bébé. Ces gestes concrets te permettront d'être disponible à 100% pour ta famille."},

  34:{emoji:'🎃',taille:'43 cm',poids:'2,1 kg',titre:"Bébé se retourne définitivement",intro:"À 34 SA, bébé prend sa position définitive. La tête doit être en bas. Ses ongles dépassent ses doigts.",developpement:"Bébé prend sa position finale. Si tête en bas, il restera ainsi jusqu'à la naissance. Ses ongles dépassent légèrement ses doigts et devront être coupés à la naissance. Ses pupilles réagissent à la lumière. Il distingue le jour de la nuit.",organes:["Position finale","Ongles longs","Distinction jour/nuit"],savistu:"Bébé réagit différemment selon les moments de la journée. Il est plus actif quand sa maman est allongée et au repos, car les mouvements de marche le berçaient.",faq:[{q:"Le siège auto est-il prêt ?",r:"Il doit l'être maintenant. Le siège auto groupe 0+ est obligatoire pour quitter la maternité. Fais-le vérifier par un professionnel."},{q:"Que faire si l'eau se rompt en public ?",r:"Rester calme. La rupture des membranes est généralement indolore. Appeler la maternité immédiatement. Pas d'urgence absolue sauf si le liquide est teinté (vert ou marron)."}],maman_titre:"La pression sur le bassin s'intensifie",maman:"La descente de bébé dans le bassin crée une pression pelvienne intense. La respiration est parfois plus facile car l'utérus descend. Les pertes vaginales peuvent augmenter.",maman_aide:"Vérifie que le siège auto est installé et validé par un professionnel.",maman_signe:"L'augmentation des pertes vaginales est normale en fin de grossesse",alerte:"Liquide amniotique teinté de vert ou de marron : partir à la maternité immédiatement.",doc_titre:"Le siège auto",doc:"Obligatoire pour quitter la maternité. Groupe 0+ (0 à 13 kg), dos à la route. Fais vérifier l'installation par un professionnel formé (Prévention Routière, certains garagistes). Le faire avant 36 SA.",conseil:"Teste le siège auto avec une poupée ou un nounours. Pratique les gestes : mise en place, sangles, ajustement. Le jour J, tu le feras peut-être avec les mains qui tremblent d'émotion."},

  35:{emoji:'🥐',taille:'44 cm',poids:'2,4 kg',titre:"Mode alerte imminent",intro:"À 35 SA, une naissance est possible à tout moment. L'essentiel doit être prêt. Reste joignable en permanence.",developpement:"Bébé est pratiquement à terme. Ses poumons sont matures. Il a accumulé suffisamment de graisse pour réguler sa température. Son système immunitaire reçoit ses derniers anticorps maternels via le placenta. Il dort 90 à 95% du temps.",organes:["Système immunitaire finalisé","Thermorégulation","Sommeil dominant"],savistu:"À 35 SA, bébé dort 90 à 95% du temps. Ce sommeil intense est une préparation aux efforts de la naissance et du début de vie.",faq:[{q:"Les signes avant-coureurs de l'accouchement ?",r:"Perte du bouchon muqueux (mucus rosâtre), contractions de Braxton Hicks plus fréquentes, descente de bébé, modification du col. Ces signes peuvent précéder l'accouchement de quelques jours à quelques semaines."},{q:"Faut-il rester proche de la maternité ?",r:"Oui. Éviter les voyages de plus de 30 minutes de la maternité à partir de 37 SA."}],maman_titre:"Chaque jour compte",maman:"Chaque semaine supplémentaire améliore le pronostic de bébé. La fatigue est maximale. L'impatience et l'anxiété coexistent.",maman_aide:"Reste joignable à tout moment. Téléphone chargé, sonnerie activée.",maman_signe:"Le bouchon muqueux peut se perdre plusieurs jours avant l'accouchement",alerte:"Contractions toutes les 5 min depuis 1h + 1 min chacune : règle 5-1-1, appeler la maternité.",doc_titre:"Les signes du travail",doc:"Vrais signes : contractions régulières, progressives, qui s'intensifient. Poche des eaux qui se rompt. Faux signes : contractions de Braxton Hicks (irrégulières, qui s'arrêtent au changement de position). En cas de doute : appeler la maternité.",conseil:"Programme une alarme quotidienne à 20h pour vérifier que le téléphone est chargé. Simple, efficace. Tu ne peux pas être injoignable ces prochaines semaines."},

  36:{emoji:'🫧',taille:'45 cm',poids:'2,6 kg',titre:"La consultation du 9e mois",intro:"À 36 SA, la consultation du 9e mois est obligatoire. L'obstétricien examine le col et confirme la position définitive de bébé.",developpement:"Bébé est presque à terme. Son lanon (fin duvet sur la peau) disparaît presque complètement. Il avale environ 1 litre de liquide amniotique par jour. Ses intestins contiennent du méconium, sa première selle.",organes:["Lanon qui disparaît","Méconium formé","Déglutition intense"],savistu:"Le méconium accumulé dans les intestins de bébé sera sa première selle après la naissance. Il est vert très foncé, presque noir, et inodore. C'est normal.",faq:[{q:"Qu'est-ce que le bouchon muqueux ?",r:"C'est un bouchon de mucus qui obstrue le col de l'utérus pendant la grossesse. Sa perte (mucus rosâtre ou jaunâtre) peut précéder l'accouchement de quelques heures à quelques semaines."},{q:"Quand contacter la maternité ?",r:"Règle 5-1-1 pour les contractions. Immédiatement si poche des eaux rompue, saignements, arrêt des mouvements de bébé."}],maman_titre:"La fin approche",maman:"L'impatience et l'anxiété se mélangent. La fatigue est maximale. Le col commence à se modifier. Chaque rendez-vous médical est attendu avec espoir.",maman_aide:"Accompagne-la à la consultation du 9e mois. C'est le dernier rendez-vous avant le grand jour.",maman_signe:"La modification du col peut commencer des semaines avant l'accouchement",alerte:"Perte des eaux : partir à la maternité. Saignements rouges vifs : appeler le 15.",doc_titre:"La consultation du 9e mois",doc:"Obligatoire à 36 SA. L'obstétricien examine le col (dilatation, effacement), confirme la position de bébé, vérifie la tension artérielle et les analyses. Le plan de naissance est remis à cette occasion.",conseil:"La consultation du 9e mois peut apporter de bonnes ou moins bonnes nouvelles. Col fermé, bébé encore haut : ça ne dit rien sur quand bébé arrivera. Chaque grossesse est différente. Garde ton calme."},

  37:{emoji:'🌟',taille:'47 cm',poids:'2,9 kg',titre:"À terme",intro:"À 37 SA, bébé est officiellement à terme. Une naissance peut survenir à tout moment. Mode alerte maximale.",developpement:"Bébé est à terme. Tous ses organes sont matures. Il continue à accumuler des réserves de graisse. Son cerveau continue de se développer (il continuera jusqu'à l'âge de 25 ans). Il est prêt pour la vie hors utérus.",organes:["Tous organes matures","Réserves de graisse","Cerveau en développement continu"],savistu:"Le cerveau humain n'est pas entièrement développé à la naissance. Il continuera de se développer jusqu'à l'âge de 25 ans. La naissance n'est qu'une étape dans ce long processus.",faq:[{q:"Peut-on déclencher l'accouchement ?",r:"Le déclenchement médicalement motivé est possible à partir de 37 SA. Le déclenchement de convenance avant 39 SA est déconseillé."},{q:"Que faire si rien ne se passe ?",r:"Être patient. 50% des accouchements ont lieu après la DPA. Une surveillance médicale renforcée commence à 41 SA."}],maman_titre:"L'attente",maman:"L'attente peut être psychologiquement difficile. Chaque jour sans contraction peut générer de la frustration ou de l'anxiété.",maman_aide:"Propose une sortie douce chaque jour. Marche, cinéma, restaurant. L'attente est plus supportable quand elle est active.",maman_signe:"50% des accouchements ont lieu après la DPA",alerte:"Règle 5-1-1 + poche des eaux = partir. Mouvements de bébé absents depuis plus de 2h = appeler la maternité.",doc_titre:"Le déclenchement",doc:"Le déclenchement médical est indiqué en cas de post-terme (42 SA), diabète gestationnel mal contrôlé, prééclampsie ou rupture prématurée des membranes. Il se fait par perfusion d'ocytocine ou pose de prostaglandines.",conseil:"L'attente est une épreuve pour elle. Ne dis pas 'ça va venir'. Propose-lui de sortir, de voir des amis, de faire quelque chose. L'action est le meilleur antidote à l'attente."},

  38:{emoji:'🎯',taille:'48 cm',poids:'3,1 kg',titre:"48 cm, 3 kg",intro:"À 38 SA, bébé mesure en moyenne 48 cm et pèse 3 kg. Il est pleinement développé. Chaque jour supplémentaire renforce ses réserves.",developpement:"Bébé est entièrement développé. Il continue d'accumuler des réserves de graisse. Ses ongles sont longs et devront être coupés rapidement après la naissance. Ses cheveux peuvent être abondants ou quasi absents selon les bébés.",organes:["Développement complet","Ongles longs","Cheveux variables"],savistu:"La quantité de cheveux de bébé à la naissance n'a aucun lien avec les brûlures d'estomac de la maman pendant la grossesse. C'est un mythe populaire, mais il est génétiquement déterminé.",faq:[{q:"Comment gérer l'entourage qui demande 'alors ?'",r:"C'est épuisant pour elle. Bloquer les notifications, désigner une personne contact famille, et ne pas se sentir obligés de répondre."},{q:"Les rapports sexuels peuvent-ils déclencher l'accouchement ?",r:"Les prostaglandines du sperme peuvent ramollir le col, mais les études ne montrent pas de déclenchement systématique chez les femmes à terme."}],maman_titre:"L'entourage peut peser",maman:"Les messages et appels répétés de l'entourage peuvent être épuisants. Le ventre est au maximum. Chaque geste est un effort.",maman_aide:"Prends en charge les messages de l'entourage. Réponds à leur place pour lui épargner cette tâche.",maman_signe:"L'épuisement de fin de grossesse est réel et légitime",alerte:"Diminution significative des mouvements de bébé : appeler la maternité immédiatement.",doc_titre:"Gérer l'entourage",doc:"Désignez une personne de confiance (parent, ami proche) qui sera votre relais d'information après la naissance. Cela vous évitera de répondre à 50 messages pendant les premières heures avec bébé.",conseil:"Crée un message groupé famille : 'On vous préviendra dès que bébé est là. On vous demande de ne pas appeler avant.' Envoie-le toi. C'est ton rôle de protéger cet espace."},

  39:{emoji:'🏆',taille:'50 cm',poids:'3,3 kg',titre:"50 cm, 3,3 kg",intro:"À 39 SA, bébé est à la taille moyenne d'un nouveau-né. Il peut arriver d'un jour à l'autre. La maison doit être prête.",developpement:"Bébé a la taille et le poids d'un nouveau-né moyen. Son système nerveux continue de se développer. Le placenta commence à vieillir progressivement. Bébé est prêt pour la vie extérieure.",organes:["Taille et poids à terme","Placenta qui vieillit","Système nerveux finalisé"],savistu:"Chaque jour après 39 SA améliore encore légèrement les fonctions cognitives de bébé. Les bébés nés à 39-40 SA ont statistiquement de légèrement meilleures performances scolaires que ceux nés à 37-38 SA.",faq:[{q:"La maison est-elle vraiment prête ?",r:"Vérifier : chambre de bébé, siège auto installé, valise prête, congélateur rempli, sage-femme de ville contactée, pédiatre choisi."},{q:"Quoi faire pour ne pas perdre la tête dans l'attente ?",r:"Travailler normalement si possible, voir des amis, maintenir une routine. Le cerveau supporte mieux l'attente quand il est occupé."}],maman_titre:"Le grand jour approche",maman:"Chaque journée peut être la dernière avant la naissance. L'excitation et la peur se mélangent. Le col est en cours de modification.",maman_aide:"Prépare la maison pour le retour. Draps propres, frigo rempli, lumières douces dans la chambre.",maman_signe:"La modification du col peut s'accélérer dans les derniers jours",alerte:"Règle 5-1-1 ou poche des eaux : appeler la maternité. Ne pas attendre.",doc_titre:"La liste finale",doc:"À vérifier avant 40 SA : valise en voiture, siège auto installé et vérifié, numéro maternité programmé, congé paternité notifié à l'employeur, plan de naissance remis, pédiatre choisi, sage-femme de ville contactée.",conseil:"Dis-lui ce soir que tu es fier d'elle. Pas pour la rassurer. Parce que c'est vrai. Ce qu'elle a fait ces 9 mois est extraordinaire. Et toi, tu as été présent. C'est ce qui compte."},

  40:{emoji:'👶',taille:'51 cm',poids:'3,4 kg',titre:"Le grand jour",intro:"À 40 SA, c'est la date prévue d'accouchement. Bébé peut arriver aujourd'hui. Tout est prêt. Tu es prêt.",developpement:"Bébé est entièrement développé. Il est prêt. Ses poumons, son cerveau, ses organes sont à maturité. Il attend le signal hormonal qui déclenchera le travail.",organes:["Développement complet","Signal hormonal imminent","Prêt pour la naissance"],savistu:"C'est la maman qui déclenche hormonalement son propre accouchement. Son cerveau envoie un signal qui déclenche la production d'ocytocine. Bébé joue aussi un rôle dans ce signal.",faq:[{q:"Si rien ne se passe à 40 SA ?",r:"C'est fréquent. 50% des accouchements ont lieu après 40 SA. Une surveillance médicale renforcée commence. Un déclenchement est généralement proposé à 41 SA."},{q:"Comment rester calme le jour J ?",r:"Focus sur une chose à la fois. Tu n'as pas à tout gérer. Ta seule mission : être là pour elle, physiquement et émotionnellement."}],maman_titre:"C'est le jour J ou presque",maman:"L'attente est à son comble. Chaque contraction est analysée. Le corps se prépare intensément.",maman_aide:"Reste à portée de main. Téléphone chargé. Prêt à partir à tout moment.",maman_signe:"Le travail commence souvent la nuit car le corps est au repos",alerte:"Règle 5-1-1 + poche des eaux : partir. Si tu doutes, appelle la maternité. Ils ne t'en voudront jamais d'appeler.",doc_titre:"Le jour de l'accouchement",doc:"Rappel : appelle la maternité avant de partir. Reste calme et focus. Ton rôle en salle de naissance : être là physiquement, l'encourager par ta présence, parler à l'équipe si besoin, couper le cordon si vous le souhaitez.",conseil:"Aujourd'hui ou dans quelques jours, tu seras père. Ce que tu as préparé, ce que tu as appris, la façon dont tu as été présent ces 9 mois, tout ça a compté. Continue comme ça."},
};

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
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#f7f5f0',borderRadius:'24px',padding:'5px 8px 5px 14px'}}>
            <span style={{fontSize:'13px',fontWeight:800,color:C.dark}}>{prenom||'DadUp'}</span>
            {saReelle&&(
              <div style={{background:C.dark,color:C.white,fontSize:'11px',fontWeight:800,padding:'4px 10px',borderRadius:'14px',textAlign:'center' as const,lineHeight:1.2}}>
                <span style={{display:'block'}}>{isPost?`Mois ${moisBebe+1}`:`${saReelle} SA`}</span>
                <small style={{display:'block',fontSize:'8px',color:'rgba(255,255,255,0.55)',fontWeight:600,letterSpacing:'0.5px'}}>{isPost?'Post-naissance':tri}</small>
              </div>
            )}
          </div>
          <button onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});localStorage.clear();window.location.href='/login';}} style={{background:'none',border:'none',padding:'4px',cursor:'pointer',opacity:0.35,display:'flex',alignItems:'center'}} title="Se déconnecter">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
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
    // Lire le tab depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get('tab');
    if(tabFromUrl) setActiveTabRaw(tabFromUrl);
    // Charger depuis Supabase
    fetch('/api/auth/me')
      .then(r=>r.json())
      .then(({user})=>{
        if(!user){window.location.href='/login';return;}
        const prenom=user.prenom||'';
        const dpa=user.dpa||'';
        setPrenom(prenom); setDpa(dpa);
        setValiseChecked(user.valise_checked||{});
        setMissionsChecked(user.missions_checked||{});
        setRdvDates(user.rdv_dates||{});
        setNextRdvDate(user.next_rdv||'');
        if(prenom) localStorage.setItem('dadup_prenom',prenom);
        if(dpa)    localStorage.setItem('dadup_dpa',dpa);
        if(!dpa)   setShowOnboarding(true);
      })
      .catch(()=>{window.location.href='/login';});
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

  const sync=(data:Record<string,any>)=>{fetch('/api/auth/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});};
  const toggleV=(id:string)=>{const u={...valiseChecked,[id]:!valiseChecked[id]};setValiseChecked(u);localStorage.setItem('dadup_valise',JSON.stringify(u));sync({valise_checked:u});};
  const toggleM=(id:string)=>{const u={...missionsChecked,[id]:!missionsChecked[id]};setMissionsChecked(u);localStorage.setItem('dadup_missions',JSON.stringify(u));sync({missions_checked:u});};
  const saveRdv=(v:string)=>{setNextRdvDate(v);localStorage.setItem('dadup_next_rdv',v);sync({next_rdv:v});};
  const saveRdvI=(s:number,v:string)=>{const u={...rdvDates,[s]:v};setRdvDates(u);localStorage.setItem('dadup_rdv_dates',JSON.stringify(u));sync({rdv_dates:u});};
  const saveOnb=(d:string,p:string)=>{localStorage.setItem('dadup_dpa',d);localStorage.setItem('dadup_prenom',p);setDpa(d);setPrenom(p);setShowOnboarding(false);sync({dpa:d,prenom:p});};

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
