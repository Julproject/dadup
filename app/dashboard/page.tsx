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
  organes: string; faq: string; anecdote: string; doc: string;
}> = {
  6:{emoji:'🌾',taille:'0.6 cm',poids:'< 1g',objet:'un grain de riz',
    developpement:"Le tube neural se ferme cette semaine — c'est la structure qui donnera naissance au cerveau et à la moelle épinière. Le cœur commence à battre de façon primitive, autour de 100 à 120 battements par minute. Les bourgeons des membres apparaissent. Tous les organes principaux sont en cours d'initialisation.",
    maman:"Les nausées matinales peuvent être intenses et survenir à tout moment de la journée — le terme 'matinales' est trompeur. Elles sont causées par la montée rapide de la hCG (hormone de grossesse). La fatigue est souvent écrasante, due à la progestérone qui ralentit le métabolisme. Les seins sont sensibles et gonflés. Des saignements légers d'implantation peuvent survenir — c'est normal. Les émotions sont amplifiées : bonheur, peur, anxiété peuvent coexister. Tout cela est physiologiquement normal.",
    conseil:"Les nausées sont réelles et physiquement épuisantes — ne les minimise pas. Prépare des en-cas légers à portée de main. Évite les odeurs fortes. Ton soutien silencieux compte.",
    savistu:"Le cœur de bébé bat déjà à 6 SA, mais si petit qu'une échographie ne peut pas toujours le visualiser. Ces premières pulsations seront recherchées lors de la première consultation.",
    organes:"Cœur : premières contractions. Cerveau : tube neural en fermeture. Yeux : fossettes optiques visibles. Foie : premiers globules rouges. Intestins : en formation.",
    faq:"Dois-je arrêter le sport ? L'activité modérée est conseillée, évite les sports de contact. Puis-je voyager ? Oui, le T1 est safe si grossesse normale. Quand prendre de l'acide folique ? Immédiatement, si pas déjà fait.",
    anecdote:"À 6 SA, le futur bébé mesure la même chose qu'un grain de riz mais son cœur bat déjà — 2× plus vite que le tien. La nature est remarquablement efficace.",
    doc:"Le saviez-vous ? 1 grossesse sur 4 se termine avant 12 SA. C'est pour ça que beaucoup de couples n'annoncent qu'après ce cap. Si elle ressent de la tristesse mêlée à la joie, c'est une réaction normale et documentée."},
  7:{emoji:'🫐',taille:'1 cm',poids:'1g',objet:'une pile bouton',
    developpement:"Le visage commence à se structurer : les fosses nasales, les bourgeons oculaires et les ébauches des oreilles sont visibles. Les bras et les jambes s'allongent. Le foie commence à produire des cellules sanguines. Le cerveau se développe à un rythme impressionnant — des milliers de neurones se créent chaque seconde.",
    maman:"Les nausées atteignent souvent leur pic cette semaine. L'hypersensibilité aux odeurs peut rendre certains aliments ou environnements insupportables. Une hypersalivation (ptyalisme) peut apparaître — normale mais inconfortable. Le sommeil peut être perturbé par des envies fréquentes d'uriner. Le col de l'utérus est très vascularisé — des saignements légers après rapports sont possibles et bénins.",
    conseil:"Prends le relais en cuisine si certaines odeurs la font suffoquer. Ce n'est pas une caprice — c'est neurologique. Propose des repas simples, froids si nécessaire.",
    savistu:"À 7 SA, les empreintes digitales de bébé commencent à se former. Elles sont déjà uniques et ne changeront jamais — première marque d'identité biologique.",
    organes:"Cerveau : deux hémisphères distincts. Yeux : cristallin en formation. Oreilles : canaux semi-circulaires. Poumons : bourgeons bronchiques. Membres : coudes visibles.",
    faq:"Comment l'aider avec les nausées ? Gingembre, biscuits secs, repas froids sans odeur. Les médicaments anti-nausées sont-ils sûrs ? Certains oui — parlez-en au médecin. Le sport aggrave les nausées ?",
    anecdote:"Le cerveau de bébé crée 250 000 nouvelles cellules nerveuses par minute à ce stade. C'est le rythme de croissance neurologique le plus intense de toute sa vie.",
    doc:"Livre de référence : 'J'attends un enfant' de Laurence Pernoud (bible des grossesses françaises). Il explique que les nausées sont un signe de bonne implantation hormonale — paradoxalement rassurant."},
  8:{emoji:'🫐',taille:'1.6 cm',poids:'1g',objet:'une pile AA',
    developpement:"Les doigts commencent à se séparer. Le cerveau se développe si rapidement qu'il forme des plis pour augmenter sa surface. Les organes génitaux se différencient mais ne sont pas encore visibles. Tous les organes principaux sont en cours de formation — la periode embryonnaire touche à sa fin.",
    maman:"La fatigue extrême est normale et liée à la production intense de progestérone qui prépare l'utérus. Des maux de tête peuvent apparaître liés aux changements circulatoires. L'humeur est souvent instable. Des douleurs dans les seins et le bas du ventre sont fréquentes. La constipation peut s'installer — la progestérone ralentit le transit.",
    conseil:"Prends le relais sur les tâches ménagères sans qu'elle ait à demander. Anticipe : courses, dîner, ménage. Ces gestes concrets la soulagent physiquement.",
    savistu:"Le cerveau de bébé produit environ 100 nouvelles cellules nerveuses par minute. Cette explosion neuronale est l'une des plus intenses de toute sa vie.",
    organes:"Cerveau : sillons corticaux visibles. Cœur : 4 cavités distinctes. Mains : doigts en séparation. Rein : néphrons en formation. Yeux : rétine pigmentée.",
    faq:"Peut-elle prendre du paracétamol ? Oui, c'est l'antidouleur autorisé. L'ibuprofène est interdit pendant toute la grossesse. La constipation est-elle normale ? Oui, augmente fibres et eau.",
    anecdote:"À 8 SA, bébé peut déjà bouger ses membres — mais tu ne le sentiras que dans 12 semaines. Les mouvements existent bien avant d'être perceptibles.",
    doc:"Selon 'Le Guide de la Grossesse' (Hachette), à 8 SA, le cerveau de l'embryon consomme 50% de l'énergie totale du corps — priorité absolue au développement neurologique."},
  9:{emoji:'🫒',taille:'2.3 cm',poids:'2g',objet:'un bouchon de liège',
    developpement:"Bébé bouge mais est trop petit pour être senti. Tous les organes principaux sont maintenant en place — les semaines suivantes serviront à les perfectionner. Le fœtus peut sucer son pouce. Les dents de lait commencent à se former sous les gencives. Le visage est distinctement humain.",
    maman:"Les sautes d'humeur sont fréquentes et intenses, directement liées aux hormones — particulièrement l'œstrogène et la progestérone. Certaines femmes ressentent une anxiété accrue autour du risque de fausse couche. Le ventre n'est pas encore visible mais les vêtements peuvent commencer à serrer. Des vertiges en se levant sont possibles — hypotension orthostatique.",
    conseil:"Les sautes d'humeur ne sont pas dirigées contre toi — elles sont biochimiques. Accueille avec calme. Ta stabilité émotionnelle est un ancrage précieux.",
    savistu:"À SA 9, le cœur de bébé bat à environ 170 battements/min — deux fois plus vite que le tien. Ce rythme élevé est normal et signe d'un développement cardiaque sain.",
    organes:"Dents de lait : ébauches sous les gencives. Yeux : paupières fusionnées. Cerveau : cervelet visible. Intestins : dans le cordon (hernie physiologique normale). Poumons : lobules en formation.",
    faq:"Quand passer la première écho ? À 11-13 SA idéalement. Faut-il éviter les chats ? Oui — toxoplasmose. Peut-elle manger du fromage ? Éviter les fromages au lait cru.",
    anecdote:"La hernie physiologique du cordon est normale à 9 SA — les intestins sont temporairement dans le cordon ombilical. Ils rentreront dans l'abdomen à 11 SA. La nature fait bien les choses.",
    doc:"Selon l'OMS, le risque de fausse couche est maximal entre SA 6 et SA 10, puis décroît fortement. Chaque semaine qui passe réduit ce risque — information rassurante à partager avec elle."},
  10:{emoji:'🍓',taille:'3 cm',poids:'4g',objet:'une balle de ping-pong',
    developpement:"Les ongles apparaissent. Bébé peut faire des petits mouvements spontanés visibles à l'échographie. Le fœtus est maintenant officiellement appelé fœtus — la période embryonnaire est terminée. Les organes génitaux se différencient davantage. Le foie commence à produire de la bile.",
    maman:"Les nausées commencent souvent à diminuer progressivement. Un regain d'énergie peut apparaître. Les premières variations de poids deviennent parfois visibles. Le risque de fausse couche diminue significativement. La libido peut revenir progressivement.",
    conseil:"La première échographie approche — c'est un moment émotionnel fort. Sois pleinement présent, téléphone en mode silencieux. Prépare des questions.",
    savistu:"À SA 10, le fœtus peut déjà froncer les sourcils et faire des grimaces. Son système nerveux est suffisamment développé pour des expressions faciales rudimentaires.",
    organes:"Foie : production de bile débutante. Intestins : retour dans l'abdomen. Ongles : premiers kératinisés. Thyroïde : fonctionnelle. Cerveau : circonvolutions visibles.",
    faq:"Quand annoncer la grossesse ? Beaucoup attendent SA 12. Les examens prénataux remboursés — quels sont-ils ? Écho T1 + prise de sang + consultations mensuelles. Le sport : quelle intensité ?",
    anecdote:"À 10 SA, tous les organes essentiels sont en place. Les 30 semaines suivantes serviront uniquement à les faire grandir et maturer. Le plan de construction est terminé.",
    doc:"'Super Papa' de Virginie Dumont : 'La première échographie est souvent le moment où la grossesse devient réelle pour le père — un visage, des battements, une vraie présence.' Prépare-toi émotionnellement."},
  11:{emoji:'🍋',taille:'4 cm',poids:'7g',objet:'un bouchon de vin',
    developpement:"Les dents de lait se forment sous les gencives — elles ne perceront que 6 mois après la naissance. Le fœtus effectue des mouvements de déglutition et d'inhalation du liquide amniotique, entraînant ses futurs réflexes. Les os commencent à se solidifier par ossification.",
    maman:"Le ventre commence légèrement à s'arrondir. Les nausées diminuent pour beaucoup. La peau peut changer : masque de grossesse (mélasma) ou ligne brune sur l'abdomen (linea nigra). Les cheveux et ongles poussent plus vite grâce aux œstrogènes.",
    conseil:"Si elle souhaite annoncer la grossesse à son entourage professionnel, c'est souvent le moment. Soutiens sa décision quelle qu'elle soit.",
    savistu:"Les dents de lait de bébé sont déjà en formation à SA 11. Programmées depuis la vie intra-utérine, elles ne perceront qu'environ 6 mois après la naissance.",
    organes:"Os : ossification débutante. Dents : bourgeons sous gencives. Muscles : contraction volontaire possible. Foie : 10% de la masse corporelle. Yeux : iris pigmenté.",
    faq:"La linea nigra est-elle permanente ? Non, elle disparaît après l'accouchement. Le masque de grossesse — comment le prévenir ? Éviter le soleil, crème SPF50. Peut-elle se teindre les cheveux ?",
    anecdote:"Le fœtus à 11 SA peut distinguer les sons graves de l'extérieur — il entend déjà ta voix, même si ce n'est pas encore clairement. Commence à lui parler.",
    doc:"La linea nigra est causée par une stimulation des mélanocytes par les œstrogènes. Elle est présente chez 75% des femmes enceintes et disparaît spontanément dans les mois suivant l'accouchement."},
  12:{emoji:'🍋',taille:'5.4 cm',poids:'14g',objet:'une balle de golf',
    developpement:"C'est la fin du 1er trimestre — un cap majeur. Le risque de fausse couche chute considérablement après cette semaine. Le visage est pleinement reconnaissable avec ses traits humains. L'échographie T1 est réalisée cette semaine : elle mesure la clarté nucale pour évaluer le risque de trisomie 21.",
    maman:"Le soulagement émotionnel est souvent palpable après ce cap. L'énergie revient progressivement. L'utérus dépasse maintenant le bassin — le ventre commence à être visible. Le risque de fausse couche passe sous 2%.",
    conseil:"L'échographie T1 est un rendez-vous majeur. Sois là, sans exception. Apporte ton téléphone chargé pour filmer. Prépare des questions en amont.",
    savistu:"Après SA 12, le risque de fausse couche passe sous 2%. C'est pour cette raison que beaucoup de couples attendent ce cap pour annoncer.",
    organes:"Cerveau : hémisphères bien séparés. Reins : production d'urine débutante. Intestins : dans l'abdomen définitivement. Poumons : première inspiration de liquide. Foie : production de globules rouges.",
    faq:"Qu'est-ce que la clarté nucale ? Mesure d'un espace entre la nuque et la peau — si augmentée, risque de trisomie plus élevé. Le dépistage de trisomie est-il obligatoire ? Non, mais fortement recommandé. Quand le sexe est-il visible ?",
    anecdote:"À SA 12, le fœtus a tous ses organes en place et boit environ 15 ml de liquide amniotique par jour. Il urine dans ce même liquide — recyclé toutes les 3 heures par le placenta.",
    doc:"Selon la HAS (Haute Autorité de Santé), l'écho T1 est l'examen prénatal le plus important du premier trimestre. Elle permet de détecter des anomalies chromosomiques, des malformations majeures et de dater précisément la grossesse."},
  13:{emoji:'🍑',taille:'7.4 cm',poids:'23g',objet:'un marqueur',
    developpement:"Bébé peut sucer son pouce. Les empreintes digitales sont définitives. Le système urinaire fonctionne : bébé urine dans le liquide amniotique. Les cordes vocales se forment. Le fœtus peut grimper et se retourner dans l'utérus.",
    maman:"Le 2e trimestre commence — souvent la période la plus confortable. L'énergie revient, les nausées disparaissent. La libido peut augmenter. Le ventre s'arrondit de façon agréable.",
    conseil:"C'est le bon moment pour annoncer officiellement. Commencez à vous projeter ensemble : prénoms, organisation, congé paternité.",
    savistu:"Bébé peut sucer son pouce dès SA 13. Ce réflexe, entraîné in utero, sera l'un des premiers comportements autonomes après la naissance.",
    organes:"Cordes vocales : premières structures. Pouce : suction active. Peau : couche de vernix débutante. Pancréas : insuline sécrétée. Rate : production globules blancs.",
    faq:"Le congé paternité — comment ça marche ? 25 jours calendaires, à prendre dans les 6 mois. Doit-on choisir la maternité maintenant ? Dans les grandes villes, oui. Qu'est-ce que le projet de naissance ?",
    anecdote:"Les empreintes digitales de bébé se forment définitivement à SA 13. Elles résultent de la tension entre la peau qui pousse et les cellules qui résistent — un processus aléatoire unique.",
    doc:"'Les Maternelles' (guide France 5) : 'Le 2e trimestre est souvent décrit comme la lune de miel de la grossesse — énergie revenue, ventre visible mais gérable, couple souvent plus proche.'"},
  14:{emoji:'🍑',taille:'8.7 cm',poids:'43g',objet:'une télécommande',
    developpement:"Le fœtus produit de l'urine et l'élimine dans le liquide amniotique, qu'il avale ensuite — cycle normal de filtration. Les reins fonctionnent. Le sexe de bébé peut parfois être deviné à l'échographie.",
    maman:"Le ventre s'arrondit clairement. La libido est souvent revenue. Des douleurs ligamentaires dans le bas-ventre peuvent apparaître en raison de l'étirement des ligaments ronds. Le volume sanguin augmente de 40% sur toute la grossesse.",
    conseil:"Proposez un week-end en amoureux avant l'arrivée de bébé. Le 2e trimestre est la fenêtre idéale.",
    savistu:"À SA 14, le visage de bébé peut produire une trentaine d'expressions différentes — le système nerveux est suffisamment développé.",
    organes:"Reins : filtration active. Ligaments : étirement important. Placenta : pleinement fonctionnel. Sang : groupe sanguin défini. Thymus : maturation immunitaire.",
    faq:"Les douleurs ligamentaires — comment les soulager ? Changement de position lent, ceinture de grossesse. Le placenta prævia — c'est grave ? Sa position à T1 n'est pas définitive. Peut-elle prendre un bain chaud ?",
    anecdote:"Le placenta à SA 14 produit suffisamment d'hormones pour maintenir la grossesse seul — le corps jaune (qui prenait le relais jusque-là) peut tranquillement disparaître.",
    doc:"Le volume sanguin maternel augmente de 40% pendant la grossesse. Ce phénomène explique la fatigue, les palpitations et la baisse de tension — le cœur travaille davantage pour irriguer deux corps."},
  15:{emoji:'🍎',taille:'10 cm',poids:'70g',objet:'une balle de squash',
    developpement:"Bébé entend pour la première fois. Les vibrations sonores traversent le liquide amniotique et atteignent ses oreilles en formation. Il peut percevoir des sons graves notamment les voix masculines. Le squelette continue de se solidifier.",
    maman:"La prise de poids devient visible. Des vergetures peuvent apparaître sur les seins, ventre ou hanches — génétiques et non liées à la qualité de la peau. Volume sanguin en forte augmentation.",
    conseil:"Parle à bébé chaque soir. Les études montrent que les nouveau-nés reconnaissent les voix entendues in utero et réagissent différemment à la voix du père.",
    savistu:"Les voix masculines, plus graves, traversent mieux le liquide amniotique. Ta voix est donc l'une des mieux perçues par bébé in utero.",
    organes:"Oreilles : cochlée fonctionnelle. Os : solidification avancée. Peau : duvet (lanugo) qui apparaît. Graisses : dépôts bruns débutants. Poumons : arbre bronchique complet.",
    faq:"Quand commencer à parler à bébé ? Maintenant ! Les vergetures sont-elles prévenables ? En partie avec hydratation intensive. Comment bien dormir au 2e trimestre ?",
    anecdote:"Bébé peut distinguer la voix de sa mère de celle d'une étrangère dès SA 15. Des études montrent qu'il ralentit ses mouvements en l'entendant — signe de reconnaissance.",
    doc:"Recherche de l'Université de Grenoble (2013) : les nouveau-nés orientent leur tête vers la source de la voix paternelle dès les premières heures de vie si le père a parlé régulièrement pendant la grossesse."},
  16:{emoji:'🥑',taille:'11.6 cm',poids:'100g',objet:'un avocat',
    developpement:"Le squelette se renforce progressivement — le cartilage se transforme en os. Les yeux peuvent percevoir la lumière bien que toujours fermés. Le système nerveux central coordonne mieux les mouvements.",
    maman:"Les premiers mouvements de bébé peuvent être perçus — souvent décrits comme des bulles ou papillons dans le ventre. La pression sur la vessie augmente. Possible légère anémie ferriprive.",
    conseil:"Les cours de préparation à l'accouchement sont à réserver maintenant — ils se remplissent vite. Des cours spécifiques pour les pères existent.",
    savistu:"À SA 16, le fœtus peut attraper son propre cordon ombilical — comportement exploratoire précoce témoin de sa coordination motrice.",
    organes:"Os : ossification 60% complète. Yeux : sensibles à la lumière. Oreilles : positionnées définitivement. Cordon : 3 vaisseaux bien distincts. Liquide amniotique : 200 ml.",
    faq:"L'anémie de grossesse — comment la prévenir ? Alimentation riche en fer, supplémentation si prescrite. Peut-elle nager ? Oui, excellent sport pour la grossesse. Qu'est-ce que la psychoprophylaxie obstétricale ?",
    anecdote:"Le liquide amniotique est entièrement renouvelé toutes les 3 heures. Bébé avale, filtre, urine — un recyclage parfait qui maintient une composition stable.",
    doc:"La HAS recommande une supplémentation en fer à partir du 2e trimestre si l'hémoglobine est inférieure à 11 g/dL. La carence en fer est la première cause d'anémie chez la femme enceinte."},
  17:{emoji:'🍐',taille:'13 cm',poids:'140g',objet:'un iPhone',
    developpement:"Une couche de graisse brune commence à se former sous la peau — elle servira à réguler la température corporelle après la naissance. Bébé s'entraîne à avaler et à respirer le liquide amniotique.",
    maman:"Les mouvements de bébé sont parfois perceptibles. Le ventre est bien visible. Des douleurs dans les côtes peuvent apparaître en raison de l'expansion de l'utérus. La mémoire peut sembler défaillante — c'est documenté.",
    conseil:"Pose ta main sur son ventre le soir en parlant à bébé. Ce rituel crée une connexion émotionnelle réelle pour vous trois.",
    savistu:"Les empreintes de la paume de bébé se forment à SA 17 — uniques, résultant d'interactions aléatoires entre tension cutanée et prolifération cellulaire.",
    organes:"Graisse brune : thermogenèse préparée. Méconium : premiers résidus intestinaux. Oreilles : position finale. Peau : vernix caseosa en dépôt. Cerveau : gyri et sulci visibles.",
    faq:"Le 'baby brain' existe-t-il ? Oui, documenté scientifiquement — baisse temporaire de certaines fonctions cognitives. Est-ce normal de ne pas encore sentir bouger ? Oui, surtout au premier bébé. Peut-elle voyager en avion ?",
    anecdote:"Le 'pregnancy brain' ou 'baby brain' est réel — des études IRM montrent une réduction de la matière grise au T2 et T3, liée à une restructuration neurologique au profit des circuits émotionnels.",
    doc:"Selon 'Super Papa' (Virginie Dumont) : 'Le père qui pose régulièrement la main sur le ventre crée un lien physique qui facilite son attachement — bien avant la naissance.'"},
  18:{emoji:'🫑',taille:'14.2 cm',poids:'190g',objet:'un stylo épais',
    developpement:"Les os se solidifient davantage. Bébé développe son sens du toucher — il explore son environnement avec ses mains et son visage. Le système vestibulaire se développe, lui permettant de percevoir les mouvements.",
    maman:"Les douleurs ligamentaires sont fréquentes. Le dos peut commencer à souffrir — la lordose lombaire s'accentue. Des crampes nocturnes dans les jambes sont possibles. Le sommeil peut être perturbé.",
    conseil:"Propose des massages du dos régulièrement. Ce geste quotidien renforce votre connexion physique et soulage efficacement.",
    savistu:"À SA 18, bébé peut entendre la musique que vous écoutez. Des études suggèrent que les nourrissons reconnaissent des mélodies entendues in utero.",
    organes:"Système vestibulaire : équilibre actif. Toucher : récepteurs cutanés fonctionnels. Myéline : gaine nerveuse en formation. Vertèbres : ossification avancée. Utérus : hauteur à nombril.",
    faq:"La lordose lombaire — comment la soulager ? Exercices de renforcement du dos, ceinture de grossesse. Peut-elle dormir sur le ventre ? Plus vraiment confortable mais sans risque. Le matelas doit-il changer ?",
    anecdote:"La myélinisation — gaine isolante autour des neurones — commence à SA 18 dans certaines zones. Ce processus se poursuivra jusqu'à... l'âge de 25 ans pour les lobes frontaux.",
    doc:"La HAS recommande la kiné pelvienne préventive dès le 2e trimestre pour prévenir les douleurs pelviennes et les incontinences post-partum. À mentionner au médecin si pas encore prescrit."},
  19:{emoji:'🥭',taille:'15.3 cm',poids:'240g',objet:'une canette de soda',
    developpement:"Tous les sens se développent rapidement. Le vernix caseosa — enduit blanc gras — commence à recouvrir la peau de bébé pour la protéger du liquide amniotique. Les cellules cérébrales se multiplient à un rythme exceptionnel.",
    maman:"Le ventre est très visible. Des problèmes de congestion nasale peuvent apparaître en raison de l'augmentation du volume sanguin. La fatigue peut revenir légèrement. Le centre de gravité commence à se modifier.",
    conseil:"Commencez à préparer la chambre de bébé ensemble — moment de complicité fort.",
    savistu:"Le cerveau de bébé produit 250 000 nouvelles cellules nerveuses par minute à SA 19. Cette phase de prolifération neuronale est unique dans toute sa vie.",
    organes:"Sens : tous 5 actifs ou en activation. Peau : vernix caseosa protecteur. Rétine : photorécepteurs. Goût : papilles gustatives fonctionnelles. Odorat : récepteurs nasaux.",
    faq:"Congestion nasale de grossesse — remède naturel ? Sérum physiologique, humidificateur. La chambre de bébé — quand la préparer idéalement ? Entre SA 20 et 30. PNDS et risques chimiques dans les peintures ?",
    anecdote:"Bébé peut goûter le liquide amniotique à SA 19 — et il reflète les saveurs de l'alimentation maternelle. Des études montrent que les bébés dont les mères mangeaient de l'ail in utero acceptent mieux l'ail après la naissance.",
    doc:"Les perturbateurs endocriniens dans les peintures et rénovations sont à éviter pendant la grossesse. Pour la chambre de bébé : peintures A+ recommandées, aérer au minimum 3 semaines avant l'arrivée."},
  20:{emoji:'🍌',taille:'16.4 cm',poids:'300g',objet:'un livre de poche',
    developpement:"C'est la mi-grossesse. L'échographie morphologique T2 est réalisée cette semaine — la plus complète. Elle examine en détail chaque organe, chaque membre. Le sexe est généralement visible.",
    maman:"L'échographie T2 est souvent vécue avec une anxiété mêlée d'excitation. C'est le rendez-vous médical le plus attendu. Certaines femmes décrivent une connexion émotionnelle forte à cet examen.",
    conseil:"Prends une demi-journée de congé pour cette échographie. Filmez. Après, prenez le temps de vous poser ensemble.",
    savistu:"L'échographie morphologique T2 examine plus de 100 critères anatomiques. C'est l'examen le plus complet de la grossesse.",
    organes:"Tous systèmes vérifiés à l'écho T2 : cerveau, cœur 4 cavités, reins, membres, lèvres palatines, colonne vertébrale. La vésicule biliaire est visible.",
    faq:"Que fait-on si l'écho T2 trouve une anomalie ? Des examens complémentaires sont proposés. L'amniocentèse — quand est-elle indiquée ? Quel est le taux de faux positifs ? Comment le sexe est-il déterminé ?",
    anecdote:"L'échographie T2 peut parfois manquer 20% des malformations — ce n'est pas un examen parfait. Si le médecin souhaite revoir un point, c'est normal et ne signifie pas une malformation.",
    doc:"Selon la HAS, l'échographie morphologique T2 doit être réalisée entre SA 20 et SA 25, idéalement entre SA 21 et SA 23 pour une qualité optimale. Durée : 45 à 90 minutes selon la coopération du bébé."},
  21:{emoji:'🥕',taille:'26.7 cm',poids:'360g',objet:'une bouteille 33cl',
    developpement:"Bébé a maintenant un cycle veille-sommeil distinct — il dort environ 12 à 14h par jour dans le ventre. Les mouvements sont de plus en plus coordonnés. Le système digestif s'entraîne en absorbant le liquide amniotique.",
    maman:"Le ventre est très visible. Des problèmes de digestion et de reflux peuvent apparaître. Le centre de gravité du corps change, modifiant la posture et provoquant des douleurs dorsales.",
    conseil:"Installe une veilleuse dans la chambre de bébé — geste d'anticipation qui t'ancre dans la réalité de l'arrivée.",
    savistu:"Bébé est souvent le plus actif quand sa mère est au repos — les mouvements de la marche l'endorment, comme un bercement naturel.",
    organes:"Cycle circadien : actif/inactif 20-30 min. Intestins : méconium s'accumule. Peau : lanugo couvre tout le corps. Yeux : mouvements REM actifs. Liquide amniotique : 300-400 ml.",
    faq:"Les mouvements de bébé — à quelle fréquence les sentir ? 10 mouvements en 2h est le minimum rassurant. Que faire si on ne sent plus bouger ? Appel maternité. Le lanugo — qu'est-ce que c'est ?",
    anecdote:"Le lanugo est un duvet fin qui couvre tout le corps de bébé à SA 21. Il servait d'isolant thermique aux premiers humains — vestige évolutif qui disparaît avant la naissance pour la plupart.",
    doc:"Les 'kicks count' (comptage des mouvements) sont recommandés à partir de SA 28 — 10 mouvements en 2 heures en période active est le seuil rassurant selon les guidelines obstétricaux."},
  22:{emoji:'🥭',taille:'27.8 cm',poids:'430g',objet:'un ballon de handball',
    developpement:"Les yeux sont formés mais encore fermés. Les sourcils et les cils sont visibles. Le sens du toucher est très développé. Les poumons produisent du liquide — entraînement précoce à la respiration.",
    maman:"Des vergetures peuvent apparaître. Des crampes nocturnes dans les mollets sont fréquentes. Le sommeil peut devenir difficile. Les hormones relaxine et progestérone assouplissent tous les ligaments.",
    conseil:"Masse son ventre avec de l'huile chaque soir — rituel physique et émotionnel. 5 minutes suffisent.",
    savistu:"Les vergetures sont génétiquement déterminées — elles ne peuvent pas être totalement évitées. Mais une bonne hydratation limite l'inconfort.",
    organes:"Yeux : paupières distinctes. Cils : implantés. Sourcils : visibles. Relaxine : ligaments très souples. Poumons : liquide inspiré activement.",
    faq:"La relaxine — pourquoi provoque-t-elle des douleurs ? Elle assouplit les articulations du bassin en préparation à l'accouchement. Gaine abdominale et sport — que faire ? Éviter les exercices d'abdos creux. SPD (Symphyse Pubienne Douloureuse) ?",
    anecdote:"La relaxine n'agit pas que sur le bassin — elle assouplit TOUS les ligaments du corps. C'est pourquoi la cheville est plus facile à se tordre pendant la grossesse — attention aux sols inégaux.",
    doc:"Selon le CNGOF (Collège National des Gynécologues), les crampes nocturnes pendant la grossesse touchent 30% des femmes. Elles sont liées au magnésium — une supplémentation peut être prescrite."},
  23:{emoji:'🍊',taille:'28.9 cm',poids:'500g',objet:'une bouteille 50cl',
    developpement:"Bébé a le hoquet régulièrement — entraînement du diaphragme. Il pèse maintenant exactement 500g. Les ongles sont longs et visibles. Le cerveau se développe intensément.",
    maman:"L'essoufflement peut apparaître à l'effort en raison de la pression de l'utérus sur le diaphragme. Le ventre est lourd. Des douleurs dans le pubis peuvent survenir — diastasis de la symphyse pubienne.",
    conseil:"Prends en charge spontanément les corvées physiques lourdes. L'anticipation est plus précieuse que la réponse à une demande.",
    savistu:"Le hoquet de bébé est un entraînement musculaire du diaphragme — préparation à la respiration autonome après la naissance.",
    organes:"Diaphragme : contractions rythmiques (hoquet). Ongles : kératine visible. Peau : moins transparente. Cerveau : 30 milliards de neurones. Cordon : Wharton gelée protectrice.",
    faq:"La diastasis de la symphyse — comment la diagnostiquer ? Douleur pubienne irradiant les cuisses, boiterie. Traitement : kiné pelvienne, béquilles si sévère. Peut-elle conduire encore ? Comment trouver une sage-femme libérale ?",
    anecdote:"La gelée de Wharton protège les 3 vaisseaux du cordon ombilical — elle est gélatineuse pour que le cordon ne se pince pas lors des mouvements de bébé. Une mécanique remarquablement simple.",
    doc:"La diastasis de la symphyse pubienne (SPD) touche environ 1 femme sur 5. Elle peut être invalidante si non traitée. Si elle se plaint de douleurs pubiques irradiant les cuisses, insiste pour une consultation en kiné pelvienne."},
  24:{emoji:'🌽',taille:'30 cm',poids:'600g',objet:'une règle 30cm',
    developpement:"Le visage est presque entièrement formé. Bébé reconnaît clairement la voix de ses deux parents. Les poumons produisent du surfactant — la substance indispensable qui permettra aux alvéoles de ne pas s'affaisser après la naissance.",
    maman:"Le test de dépistage du diabète gestationnel (HGPO) doit être réalisé cette semaine. C'est un test long de 2 heures avec 3 prises de sang. La surveillance est importante.",
    conseil:"Accompagne-la au test HGPO — 2 heures ensemble. Ta présence transforme ce moment contraignant en moment partagé.",
    savistu:"Le surfactant, produit par les poumons dès SA 24, est vital : sans lui, les alvéoles s'affaisseraient à chaque expiration. Les très prématurés en ont besoin en injection.",
    organes:"Surfactant : alvéoles stabilisées. Visage : traits définitifs. Oreilles : reconnaisent les voix. Yeux : réflexe cornéen présent. Liquide amniotique : 400-500 ml.",
    faq:"Diabète gestationnel — que se passe-t-il si positif ? Régime + suivi glycémique, parfois insuline. Risques pour bébé ? Macrosomie, hypoglycémie néonatale. Peut-il se résorber après l'accouchement ?",
    anecdote:"Un bébé né à SA 24 avec soins intensifs néonataux a environ 50% de chances de survie aujourd'hui — contre 0% il y a 40 ans. La médecine périnatale a transformé le pronostic des grands prématurés.",
    doc:"Selon la HAS, le dépistage du diabète gestationnel est recommandé pour toutes les femmes ayant des facteurs de risque (IMC>25, antécédents familiaux, âge>35 ans) entre SA 24 et SA 28."},
  25:{emoji:'🥬',taille:'34.6 cm',poids:'660g',objet:'un rouleau essuie-tout',
    developpement:"Les poumons continuent leur maturation active. Bébé commence à accumuler de la graisse sous-cutanée. Ses mouvements sont très perceptibles de l'extérieur.",
    maman:"Les jambes lourdes et les varices sont fréquentes en raison de la compression veineuse. Le sommeil est perturbé. Des bas de contention peuvent être prescrits.",
    conseil:"Bain de pieds chaud le soir + massage des mollets. Ces petites attentions régulières comptent plus qu'un grand geste isolé.",
    savistu:"À SA 25, bébé stocke de la graisse brune — la seule graisse dont la fonction est de produire de la chaleur pour maintenir la température corporelle après la naissance.",
    organes:"Graisse brune : thermogenèse. Varices : compression veineuse cave. Rétine : photorécepteurs L, M, S. Cervelet : coordination. Liquide amniotique : 500 ml.",
    faq:"Varices de grossesse — sont-elles permanentes ? Souvent régressent après accouchement. Bas de contention — comment les choisir ? Sur prescription, classe 2 recommandée. Hémorroïdes — comment les traiter ?",
    anecdote:"La veine cave inférieure est comprimée par l'utérus en position allongée sur le dos — c'est pourquoi la position dorsale gauche est recommandée pour dormir dès SA 20.",
    doc:"Les hémorroïdes touchent 30-40% des femmes enceintes au 3e trimestre. Elles sont liées à la compression veineuse et à la constipation. Régime riche en fibres, hydratation et éviter la station assise prolongée."},
  26:{emoji:'🥦',taille:'35.6 cm',poids:'760g',objet:'une raquette de ping-pong',
    developpement:"Les yeux s'ouvrent pour la première fois. Bébé peut voir la lumière qui filtre. Les cils et sourcils sont bien visibles. Le cerveau atteint une complexité suffisante pour que bébé puisse rêver.",
    maman:"L'inconfort général augmente. Le sommeil est difficile — la position dorsale gauche est recommandée. Des reflux nocturnes peuvent interrompre le sommeil.",
    conseil:"Un coussin de grossesse change radicalement la qualité du sommeil. C'est l'un des investissements les plus utiles. Commande-le maintenant.",
    savistu:"Bébé ouvre les yeux pour la première fois à SA 26. La couleur des yeux à la naissance est presque toujours bleue ou grise — la mélanine se développe après.",
    organes:"Yeux : paupières s'ouvrent. Rêves : activité REM documentée. Cils : implantés définitivement. Progestérone : ralentissement œsophagien → reflux. Utérus : hauteur 26 cm.",
    faq:"Reflux gastro-œsophagien — comment le gérer ? Repas fractionnés, surélever le haut du lit, éviter aliments acides. Le sommeil sur le côté gauche — pourquoi gauche et pas droite ? Diastasis des droits de l'abdomen ?",
    anecdote:"Le sommeil sur le côté gauche favorise le retour veineux vers le cœur et améliore la circulation placentaire. Une étude néo-zélandaise a montré un lien entre sommeil dorsal et risque de mortinatalité — cause à effet non prouvée mais la précaution s'impose.",
    doc:"La diastasis des muscles grands droits touche 60% des femmes au 3e trimestre. Elle se manifeste par un renflement médian à l'effort. La kiné pelvienne prénatale aide à la prévenir et à la traiter."},
  27:{emoji:'🥬',taille:'36.6 cm',poids:'875g',objet:'une bouteille de vin',
    developpement:"Bébé peut rêver — son activité cérébrale pendant le sommeil est similaire à celle d'un adulte en phase REM. C'est la fin du 2e trimestre. Le fœtus est capable de mouvements coordonnés complexes.",
    maman:"C'est souvent la fin du trimestre le plus confortable. La fatigue revient progressivement. L'anxiété autour de l'accouchement peut commencer à se manifester.",
    conseil:"Planifiez votre plan de naissance ensemble ce mois-ci. Ce document te permet de défendre ses souhaits si elle ne peut plus le faire pendant le travail.",
    savistu:"Les recherches montrent que bébé entre en sommeil paradoxal (REM) à partir de SA 27 — phase associée au traitement des émotions et consolidation de la mémoire.",
    organes:"Rêves : activité cérébrale REM. Mouvements : coordonnés et intentionnels. Peau : moins ridée (graisse sous-cutanée). Immunité : anticorps maternels transmis. Ouïe : discrimination des voix.",
    faq:"Qu'est-ce que le plan de naissance ? Document qui précise les souhaits pour l'accouchement : péridurale, positions, présence du père. Est-il contraignant pour l'équipe médicale ? Non, mais consultatif. Visite de la maternité — quand ?",
    anecdote:"Les anticorps maternels traversent le placenta à partir de SA 27 pour immuniser bébé avant la naissance — protection passive qui durera 3 à 6 mois. C'est pour ça que la vaccination de la mère protège aussi le nouveau-né.",
    doc:"Le plan de naissance — guide de rédaction selon la HAS : souhaits sur la péridurale, la déambulation, la position d'accouchement, la présence du père, le peau-à-peau, l'allaitement, la gestion du cordon."},
  28:{emoji:'🍆',taille:'37.6 cm',poids:'1 kg',objet:'un kilo de farine',
    developpement:"Début du 3e trimestre. Le cerveau entre dans une phase de développement accéléré. La vision est fonctionnelle. Bébé se retourne souvent et ses mouvements sont très perceptibles.",
    maman:"L'essoufflement et les reflux gastriques sont fréquents. Le dos et le bassin supportent un poids croissant. Les contractions de Braxton Hicks — fausses contractions d'entraînement — peuvent apparaître.",
    conseil:"Commence à préparer la valise maternité maintenant. Avoir la valise prête tôt évite le stress si le travail commence plus tôt que prévu.",
    savistu:"À SA 28, bébé peut voir la lumière qui filtre à travers la paroi abdominale. Certains parents s'amusent à braquer une lampe de poche — bébé peut réagir.",
    organes:"Cerveau : gyri et sulci en multiplication. Vision : acuité 20/400. Reins : 500 ml d'urine/jour. Poumons : 80% matures. Liquide amniotique : 800 ml (maximum).",
    faq:"Contractions de Braxton Hicks — comment les distinguer des vraies ? Irrégulières, disparaissent en changeant de position, non douloureuses. Le monitoring en fin de grossesse — c'est quoi ? Rythme cardiaque fœtal + contractions.",
    anecdote:"Le liquide amniotique atteint son volume maximum à SA 28 (environ 800 ml) puis diminue progressivement jusqu'au terme. Sa composition est contrôlée en permanence par les reins fœtaux.",
    doc:"La surveillance du rythme cardiaque fœtal (RCF) devient systématique à partir de SA 28 lors des consultations. C'est un indicateur précieux du bien-être fœtal — apprends à lire un tracé de monitoring avec la sage-femme."},
  29:{emoji:'🎃',taille:'38.6 cm',poids:'1.15 kg',objet:'un casque audio',
    developpement:"Les muscles et les poumons se renforcent activement. Les mouvements de bébé sont désormais visibles de l'extérieur. Le système immunitaire commence à se développer.",
    maman:"Les contractions de Braxton Hicks peuvent être fréquentes et inquiétantes. Elles se distinguent des vraies par leur irrégularité et caractère non douloureux. L'insomnie s'installe souvent.",
    conseil:"Apprends la règle 5-1-1 : contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure = direction maternité.",
    savistu:"Les mouvements de bébé à SA 29 peuvent être si intenses qu'ils réveillent la mère la nuit — signe de développement moteur actif.",
    organes:"Muscles : masse musculaire +50%. Immunité : IgG maternels transfert actif. Poumons : surfactant suffisant pour survie ex-utéro. Graisse : 3.5% du poids. Rétine : photorécepteurs matures.",
    faq:"Que faire en cas de mouvements anormaux ou absents ? Appel maternité immédiat. La méthode Gasquet pour accouchement — c'est quoi ? Comment préparer psychologiquement l'accouchement ?",
    anecdote:"Un bébé né à SA 29 avec prise en charge néonatale intensive a 90% de chances de survie sans séquelles majeures. Chaque semaine supplémentaire in utero réduit la durée d'hospitalisation néonatale de 3 jours en moyenne.",
    doc:"Sophrologie, hypnose, méthode Gasquet, haptonomie — des alternatives à la préparation classique. L'haptonomie inclut le père dès le début : il apprend à entrer en contact avec bébé via le toucher sur le ventre."},
  30:{emoji:'🥬',taille:'39.9 cm',poids:'1.3 kg',objet:'un livre de 300 pages',
    developpement:"Le cerveau se plisse pour augmenter sa surface de traitement. Les poumons sont presque matures. Bébé prend du poids régulièrement — environ 200 à 250g par semaine désormais.",
    maman:"La fatigue intense revient. Le sommeil est difficile. L'anxiété autour de l'accouchement peut augmenter. Des œdèmes aux pieds et aux chevilles sont courants en fin de journée.",
    conseil:"Planifie ton congé paternité maintenant avec ton employeur. Un congé bien préparé te permet d'être pleinement présent.",
    savistu:"Le cerveau humain est le seul à se plier sur lui-même pour maximiser sa surface corticale. Un cerveau humain déplié aurait la taille d'une feuille A3.",
    organes:"Cerveau : sillons et circonvolutions. Poumons : 95% fonctionnels. Rein : 200 ml urine/jour. Méconium : intestin plein. Graisse : 8% du poids. Position : 60% tête en bas.",
    faq:"Le congé paternité en France — comment ça marche exactement ? 25 jours calendaires dont 4 obligatoires, 6 mois pour les prendre. Peut-il être fractionné ? L'employeur peut-il le refuser ? Indemnisation ?",
    anecdote:"La prise de poids finale de bébé (250g/semaine) est entièrement constituée de graisse de réserve et de croissance musculaire. C'est la phase de 'finition' après 6 mois de construction des organes.",
    doc:"Le congé paternité (loi 2021) : 25 jours dont 4 obligatoires dans les 4 jours suivant la naissance. Indemnisé à 100% du salaire net dans la limite du plafond Sécu. À déclarer à l'employeur 1 mois avant la naissance prévue."},
  31:{emoji:'🍍',taille:'41.1 cm',poids:'1.5 kg',objet:'un fer à repasser',
    developpement:"Tous les sens sont opérationnels et coordonnés. Bébé s'entraîne activement à la respiration. Il distingue le goût sucré du goût amer dans le liquide amniotique.",
    maman:"Les difficultés à marcher longtemps apparaissent. Le centre de gravité modifié provoque des douleurs pelviennes. Des contractions de Braxton Hicks fréquentes sont normales.",
    conseil:"Propose des promenades courtes. L'activité physique douce est bénéfique jusqu'à l'accouchement.",
    savistu:"Bébé peut distinguer le goût sucré du goût amer dans le liquide amniotique dès SA 31 — premières préférences gustatives.",
    organes:"Sens gustatif : sucré/amer discriminés. Respiration : 30-40 mouvements/h. Cheveux : bien visibles à l'écho. Position : 80% tête en bas. Peau : moins ridée, graisse visible.",
    faq:"La présentation par le siège — comment la corriger ? Version par manœuvre externe entre SA 36-37, moxibustion (médecine chinoise), postures inversées. Accouchement par le siège possible ? Césarienne programmée ?",
    anecdote:"Bébé a déjà des préférences alimentaires à SA 31 — influencées par l'alimentation maternelle. Les études montrent que les enfants dont les mères ont mangé varié pendant la grossesse sont plus facilement omnivores.",
    doc:"La version par manœuvre externe (VME) pour retourner un bébé en siège réussit dans 50-60% des cas. Elle est réalisée à SA 36-37, sous surveillance, avec un tocolytique pour relâcher l'utérus. Demandez-en une si bébé reste en siège."},
  32:{emoji:'🥭',taille:'42.4 cm',poids:'1.7 kg',objet:'un ballon de foot T1',
    developpement:"Bébé se met en position tête en bas dans la majorité des cas. L'échographie T3 vérifie cette position, estime le poids et évalue la quantité de liquide amniotique.",
    maman:"L'échographie T3 est réalisée cette semaine. Si bébé est en siège, une version par manœuvre externe peut être proposée entre SA 36 et 37. La fréquence des mouvements de bébé peut varier.",
    conseil:"Accompagne-la à l'échographie T3 sans faute. Si bébé est en siège, ne dramatise pas — des solutions existent.",
    savistu:"Environ 3-4% des bébés restent en siège à terme. La version par manœuvre externe réussit dans 60% des cas.",
    organes:"Position : tête engagée 80%. Liquide amniotique : 700-800 ml. Poids estimé : ±15% par biométrie. Placenta : grade I-II. Col : long et fermé normalement.",
    faq:"Biométrie fœtale à l'écho — que mesure-t-on ? Périmètre crânien, abdominal, longueur fémorale. Score de Manning — c'est quoi ? Comment évaluer le bien-être fœtal à domicile ?",
    anecdote:"L'estimation du poids fœtal par biométrie échographique a une marge d'erreur de ±15% — un bébé estimé à 2 kg peut peser entre 1.7 et 2.3 kg. Ne pas trop se fier aux chiffres absolus.",
    doc:"Le score de Manning évalue le bien-être fœtal par 5 critères échographiques : mouvements respiratoires, mouvements corporels, tonus, liquide amniotique, RCF. Score > 8/10 = bébé en bonne forme."},
  33:{emoji:'🍍',taille:'43.7 cm',poids:'1.9 kg',objet:'un sac à dos léger',
    developpement:"Le squelette est presque complet. Le cerveau continue son développement intense. Les ongles sont si longs que bébé peut se griffer. Les poumons sont en phase finale de maturation.",
    maman:"L'essoufflement atteint son maximum. L'insomnie est quasi-systématique. L'impatience et l'anxiété augmentent. Le soutien émotionnel est crucial.",
    conseil:"Prends en charge les nuits difficiles quand tu le peux. La solitude nocturne est particulièrement difficile en fin de grossesse.",
    savistu:"Les ongles de bébé à SA 33 sont suffisamment longs pour qu'il se griffe le visage in utero — d'où les petites griffures parfois visibles à la naissance.",
    organes:"Ongles : dépassent le bout des doigts. Cheveux : bien développés. Poumons : 98% matures. Col : débute sa maturation. Graisse : 15% du poids.",
    faq:"Comment gérer l'anxiété pré-accouchement ? Sophrologie, préparation à la naissance, en parler ouvertement. La tocologie — peur pathologique de l'accouchement — comment la traiter ? Réunion pré-anesthésie ?",
    anecdote:"La tocologie (peur pathologique de l'accouchement) touche 6-10% des femmes enceintes. Non traitée, elle augmente le taux de demande de césarienne. Un soutien psychologique spécialisé est très efficace.",
    doc:"La consultation pré-anesthésie est obligatoire avant tout accouchement (même sans péridurale prévue). Elle doit être faite entre SA 32 et SA 37. Vérifiez qu'elle est bien planifiée."},
  34:{emoji:'🍈',taille:'45 cm',poids:'2.15 kg',objet:'un club de golf',
    developpement:"Le système nerveux central est mature. Bébé régule lui-même sa température corporelle. La descente dans le bassin peut commencer. Un bébé né à SA 34 a plus de 99% de chances de survie.",
    maman:"La descente du bébé dans le bassin soulage parfois l'essoufflement mais augmente la pression pelvienne. Les envies fréquentes d'uriner s'intensifient.",
    conseil:"Si les cours de préparation à l'accouchement ne sont pas commencés, c'est urgent. Des sessions intensives existent.",
    savistu:"Un bébé né à SA 34 a aujourd'hui plus de 99% de chances de survie sans séquelles grâce aux progrès de la néonatologie.",
    organes:"SNC : maturation quasi-complète. Thermorégulation : autonome. Méconium : bouchon formé. Adipeux : 12% du poids. Poumons : surfactant abondant.",
    faq:"La corticothérapie — à quoi ça sert ? Accélère la maturation pulmonaire si naissance prématurée imminente. L'épidural de surveillance — c'est quoi ? Comment se passe une naissance prématurée ?",
    anecdote:"Les soins de développement en néonatologie (peau-à-peau, musique, voix des parents) réduisent la durée d'hospitalisation d'environ 20% chez les prématurés — la présence parentale est thérapeutique.",
    doc:"En cas de naissance entre SA 34 et SA 37 (prématurité tardive), bébé est généralement en bonne santé mais peut avoir besoin d'aide pour téter et maintenir sa température. Pas d'inquiétude — la prise en charge est rodée."},
  35:{emoji:'🍈',taille:'46.2 cm',poids:'2.4 kg',objet:'une raquette de badminton',
    developpement:"Les reins et le foie sont pleinement fonctionnels. Bébé prend environ 250g par semaine. Les poumons sont quasi-matures.",
    maman:"Les envies fréquentes d'uriner sont maximales. La pression pelvienne est intense. Des douleurs dans le pubis peuvent rendre la marche difficile.",
    conseil:"Installe le siège auto et fais vérifier l'installation par un professionnel. Un siège mal installé est aussi dangereux qu'un siège absent.",
    savistu:"Bébé prend 250g par semaine à partir de SA 35 — cette prise de poids finale est essentielle pour la thermorégulation néonatale.",
    organes:"Reins : fonctionnels à 100%. Foie : stockage glycogène. Position : 90% tête en bas. Cheveux : épais et visibles. Vernix : en diminution.",
    faq:"Siège auto — groupe 0+ vs i-Size ? Les normes de sécurité actuelles. Installation à contre-sens — jusqu'à quand ? Comment vérifier l'installation correcte ? Airbag passager et siège bébé — incompatible ?",
    anecdote:"L'airbag passager et le siège bébé à l'avant sont incompatibles — l'airbag peut blesser mortellement un enfant de moins de 10 ans. Il faut obligatoirement désactiver l'airbag passager si siège à l'avant.",
    doc:"Selon l'UTAC (homologation française), tous les sièges auto vendus depuis 2018 sont en norme i-Size (R129) — plus stricte que l'ancienne norme ECE R44. Privilégier les sièges i-Size pour la meilleure protection."},
  36:{emoji:'🥗',taille:'47.4 cm',poids:'2.6 kg',objet:'un ballon basket junior',
    developpement:"Les poumons sont presque matures. L'instinct de nidification de la mère est à son maximum. Des pertes de bouchon muqueux peuvent survenir. Le col commence à se préparer.",
    maman:"L'instinct de nidification est documenté scientifiquement — il précède souvent le début du travail. La fatigue est intense mais des bouffées d'énergie peuvent surgir.",
    conseil:"La valise doit être prête et dans la voiture maintenant. Mémorise le numéro direct des urgences obstétricales.",
    savistu:"L'instinct de nidification est un phénomène biologique réel, documenté chez de nombreux mammifères. Il se manifeste par le besoin intense de tout nettoyer et organiser.",
    organes:"Bouchon muqueux : peut partir SA 36-40. Col : ramollissement débutant. Tête : peut s'engager. Vernix : quasiment disparu. Liquide amniotique : diminution.",
    faq:"La perte du bouchon muqueux — est-ce le signe que l'accouchement est imminent ? Pas nécessairement — l'accouchement peut survenir 2 semaines après. Monitoring de fin de grossesse — à quelle fréquence ? Grossesse prolongée — que faire ?",
    anecdote:"Le bouchon muqueux protège l'utérus des infections depuis le début de la grossesse. Sa perte (gélatineux, parfois rosé) est un signe de maturation cervicale — mais l'accouchement peut encore attendre plusieurs jours.",
    doc:"À partir de SA 36, les consultations deviennent hebdomadaires dans certaines maternités. Un monitoring (RCF + utérin) peut être proposé. Renseignez-vous auprès de votre maternité sur le protocole de surveillance de fin de grossesse."},
  37:{emoji:'🌿',taille:'48.6 cm',poids:'2.85 kg',objet:'une batte de baseball',
    developpement:"Bébé est considéré à terme. Ses poumons sont matures, son système digestif est prêt, ses réflexes sont complets. Il pourrait naître à tout moment.",
    maman:"Les contractions peuvent survenir à tout moment. L'anxiété et l'impatience sont maximales. Le col peut commencer à se dilater sans que ce soit perceptible.",
    conseil:"Mode alerte active. Reste joignable en permanence. Révise les signes du début du travail.",
    savistu:"Bébé est considéré à terme dès SA 37. Pourtant les deux dernières semaines sont importantes pour la maturation finale du cerveau et des poumons.",
    organes:"Col : peut débuter effacement. Tête : engagée dans le bassin. SNC : maturation finale. Myéline : cortex préfrontal en cours. Poumons : maturité complète.",
    faq:"Comment reconnaître le début du travail ? Contractions régulières + rapprochées, perte des eaux, saignements. Différence entre perte des eaux et fuite urinaire ? Appeler la maternité pour quels signes ?",
    anecdote:"La règle mnémotechnique pour la perte des eaux : liquide amniotique = inodore, incolore, continu (coule à chaque mouvement) vs urines = odeur caractéristique, discontinu. En cas de doute, pad absorbant + appel maternité.",
    doc:"En cas de perte des eaux, direction maternité dans les 12 heures maximum même sans contractions — risque d'infection (chorioamniotite) et de procidence du cordon. Ne pas attendre les contractions pour appeler."},
  38:{emoji:'🌿',taille:'49.8 cm',poids:'3.1 kg',objet:'un haltère 3kg',
    developpement:"Bébé est prêt. Sa tête s'est engagée dans le bassin. Tous ses systèmes sont opérationnels. Il attend le signal hormonal pour déclencher le travail.",
    maman:"L'impatience et l'anxiété sont mêlées d'excitation. Le sommeil est quasi-impossible. Le besoin de soutien émotionnel est maximal.",
    conseil:"Sois présent, rassurant. Prépare des repas pour les premiers jours de retour à la maison.",
    savistu:"La tête de bébé est maintenant engagée dans le bassin. Le corps se prépare activement — le col ramollit, s'efface et commence à se dilater.",
    organes:"Tête : diamètre bipariétal ~93mm. Col : effacement progressif. Hormones : ocytocine + prostaglandines. Bébé : synthèse de cortisol déclencheur. Placenta : grade III.",
    faq:"Le déclenchement — comment ça se passe ? Gel de prostaglandines ou rupture artificielle des membranes ou syntocinon IV. Indications ? Les contractions de prodrome — c'est quoi ? Péridurale ambulatoire ?",
    anecdote:"C'est bébé qui déclenche son propre accouchement — il envoie des signaux hormonaux à l'utérus quand ses poumons sont matures. L'accouchement est une collaboration biologique unique.",
    doc:"La péridurale ambulatoire (walking epidural) permet de se déplacer sous péridurale — disponible dans certaines maternités. Se renseigner en amont. Elle nécessite un dosage plus faible et une surveillance particulière."},
  39:{emoji:'🍉',taille:'50.7 cm',poids:'3.25 kg',objet:'un ballon foot T3',
    developpement:"Bébé est pleinement développé. Il produit ses propres hormones de stress pour se préparer à l'accouchement. Chaque jour supplémentaire lui permet de gagner en maturité.",
    maman:"Chaque jour semble une éternité. La fatigue physique et émotionnelle est à son comble.",
    conseil:"Organise une sortie douce. La patience est la qualité la plus importante de ces derniers jours.",
    savistu:"Seulement 5% des bébés naissent exactement à la DPA. La naissance peut survenir entre SA 37 et SA 42 sans être anormale.",
    organes:"Cortisol : sécrété par surrénales fœtales. Poumons : maturité absolue. Méconium : abondant. Graisse : 15-16% du poids. Système digestif : prêt pour lait.",
    faq:"Post-terme — à partir de quand parle-t-on de dépassement ? À partir de SA 41. Surveillance renforcée ? Oui, monitoring 2×/semaine. Déclenchement systématique à SA 41 ou 42 ?",
    anecdote:"Le stress de l'accouchement prépare bébé à la vie extra-utérine — les hormones de stress libèrent le surfactant des alvéoles et activent la thermogenèse. Un bébé né par césarienne programmée sans travail a plus de risques respiratoires.",
    doc:"Selon les recommandations du CNGOF, un déclenchement peut être proposé à SA 41+0 après information de la patiente. Au-delà de SA 42+0, le déclenchement devient quasi-systématique en raison du risque de mort fœtale in utero."},
  40:{emoji:'🍉',taille:'51.2 cm',poids:'3.4 kg',objet:'un ballon foot taille 4',
    developpement:"C'est le jour J prévu. Bébé a attendu 280 jours pour te rencontrer. Tous ses systèmes sont pleinement opérationnels.",
    maman:"Stress et excitation maximaux. Chaque contraction est une alerte. Le corps est en mode attente totale.",
    conseil:"Contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure = appelle la maternité. Garde ton calme.",
    savistu:"C'est bébé qui choisit le moment de naître en envoyant des signaux hormonaux à l'utérus — mécanisme encore partiellement mystérieux.",
    organes:"Tout est prêt. L'attente est normale.",
    faq:"La règle 5-1-1 — toujours valable ? Oui pour un premier accouchement. Multipares : partir plus tôt. Comment soutenir pendant le travail ? Que fait le père en salle de naissance ?",
    anecdote:"En salle de naissance, le père est souvent décrit comme 'l'ancre' par les sages-femmes — présence calme, regard, voix, main à tenir. Pas besoin de savoir quoi dire. Être là suffit.",
    doc:"Le rôle du père en salle de naissance selon la HAS : tenir la main, parler doucement, chronométrer les contractions, respecter les décisions médicales, être le lien entre elle et l'équipe. Prépare-toi à ce rôle."},
  41:{emoji:'🍉',taille:'51.5 cm',poids:'3.6 kg',objet:'un ballon foot taille 5',
    developpement:"Dépassement de terme. Bébé continue de prendre du poids. Surveillance médicale renforcée. Le déclenchement peut être proposé.",
    maman:"L'inconfort est majeur. La frustration et l'anxiété sont intenses. Un soutien émotionnel constant est indispensable.",
    conseil:"Reste positif et patient. Le dépassement est très courant. Suis les instructions de l'équipe médicale.",
    savistu:"Le dépassement jusqu'à SA 41+6 est considéré comme normal. Au-delà, la surveillance s'intensifie.",
    organes:"Placenta : vieillissement possible (grade III). Liquide amniotique : peut diminuer. Surveillance : monitoring 2×/semaine. Col : maturation avancée.",
    faq:"Méthodes naturelles pour déclencher le travail — lesquelles fonctionnent ? Rapport sexuel (prostaglandines), marche, stimulation des mamelons. Gel de prostaglandines — comment ça se passe ? Col défavorable — score de Bishop ?",
    anecdote:"Le score de Bishop évalue la maturité du col sur 13 points (dilatation, effacement, consistance, position, engagement). Un score < 6 = col défavorable, déclenchement plus difficile. Il sera évalué à chaque consultation.",
    doc:"Le post-terme strict (≥ SA 42) concerne 5-10% des grossesses. Le risque de mort fœtale in utero augmente légèrement après SA 41+3 — d'où la surveillance rapprochée et la proposition de déclenchement."},
};

const MISSIONS: Record<number, string[]> = {
  6:["Dire à ta partenaire que tu es là pour elle quoi qu'il arrive","Faire les courses sans qu'elle ait à demander","Vérifier qu'un suivi médical est en place (gynéco ou sage-femme)"],
  7:["Préparer des en-cas anti-nausées accessibles","Éviter les odeurs fortes dans la maison","Commencer à lire sur la grossesse — module RDV en priorité"],
  8:["Prendre le relais sur les tâches ménagères cette semaine","Accompagner à la première consultation si possible","Informer discrètement ton employeur si besoin"],
  9:["Pratiquer l'écoute active sans chercher à résoudre","Proposer un massage des pieds ou du dos le soir","Réduire les sources de stress dans la maison"],
  10:["Planifier la première échographie ensemble","Lire le guide accouchement du module RDV","Préparer une liste de questions pour le médecin"],
  11:["Accompagner pour des vêtements de grossesse si souhaité","Commencer à réfléchir à l'organisation financière","Déclarer la grossesse à la mutuelle complémentaire"],
  12:["Être présent à l'écho T1 — prendre une demi-journée","Filmer et photographier l'échographie","Décider ensemble quand et à qui annoncer la grossesse"],
  13:["Annoncer la grossesse à la famille si vous le souhaitez","Commencer les discussions sur les prénoms","Lire le module post-partum pour anticiper"],
  14:["Organiser un week-end ou sortie en amoureux","Commencer les recherches poussette et siège auto","Vérifier les aides financières et congés disponibles"],
  15:["Instaurer le rituel : parler à bébé chaque soir","Réserver les cours de préparation à l'accouchement","Commencer un album photo de la grossesse"],
  16:["Réserver les cours de préparation si pas encore fait","Établir la liste des achats prioritaires avec budget","Réfléchir à l'aménagement de la chambre"],
  17:["Instaurer le rituel de la main sur le ventre le soir","Commander le coussin de grossesse","Commencer le module valise maternité"],
  18:["Proposer des massages du dos réguliers","Préparer la chambre de bébé ensemble","Se renseigner sur les crèches de votre ville"],
  19:["Montage des meubles de la chambre de bébé","Établir la liste de naissance pour la famille","Initialiser les démarches de congé paternité avec le RH"],
  20:["Bloquer la demi-journée pour l'écho T2","Préparer les questions pour l'échographiste","Célébrer la mi-grossesse ensemble"],
  21:["Installer la veilleuse et vérifier l'éclairage","Commencer l'assemblage des meubles","Choisir la maternité définitivement si pas encore fait"],
  22:["Instaurer le massage du ventre avec de l'huile le soir","Visiter la maternité et repérer les accès","Préparer le plan de naissance en brouillon"],
  23:["Prendre en charge toutes les corvées physiques lourdes","Préparer le sac de maternité — commencer par les documents","Lire intégralement le guide accouchement"],
  24:["Accompagner au test HGPO — 2 heures ensemble","Commencer la valise maternité de façon structurée","Installer le siège auto et faire vérifier le montage"],
  25:["Bain de pieds le soir — en faire un rituel","Finaliser la chambre de bébé","Finaliser ton congé paternité avec l'employeur"],
  26:["Commander le coussin de grossesse si pas encore fait","Finaliser le plan de naissance par écrit","Préparer une playlist pour la salle de naissance si souhaité"],
  27:["Remettre le plan de naissance à la maternité","Préparer les documents administratifs d'admission","Tester le trajet vers la maternité aux heures de pointe"],
  28:["Commencer la valise maternité de façon urgente","Enregistrer le numéro direct de la maternité","Relire le module accouchement en entier"],
  29:["Maîtriser la règle 5-1-1 des contractions","Avoir le numéro de la maternité en favori","Rester joignable en permanence"],
  30:["Confirmer le congé paternité avec l'employeur","Finaliser la valise maternité","Préparer la maison pour le retour : courses, repas congelés"],
  31:["Valise dans le coffre de la voiture","Préparer des repas en avance et les congeler","Installer le berceau dans la chambre parentale"],
  32:["Accompagner à l'écho T3 sans exception","Discuter de la position de bébé avec le médecin","Finaliser tous les achats prioritaires"],
  33:["Être disponible la nuit quand le sommeil est difficile","Préparer un plan B pour rejoindre la maternité rapidement","Confirmer les dates de congé paternité"],
  34:["Commencer la préparation accouchement si pas encore fait","Tester le trajet maternité à différentes heures","Valise dans le coffre de la voiture"],
  35:["Faire vérifier l'installation du siège auto","Finaliser tous les achats restants","Préparer la maison pour l'arrivée de bébé"],
  36:["Valise dans la voiture — vérifier qu'elle est complète","Téléphone chargé à 100% en permanence","Rester joignable à tout moment"],
  37:["Mode alerte maximum — téléphone toujours sur soi","Relire le guide accouchement une dernière fois","Vérifier que la valise est complète"],
  38:["Être présent et disponible émotionnellement","Préparer des repas pour les premiers jours post-naissance","Prévenir famille et amis proches"],
  39:["Organiser une sortie douce pour changer les idées","Maintenir le soutien émotionnel constant","Garder son calme — tu es prêt"],
  40:["Contractions 5min/1h = appel maternité immédiat","Garder son calme — c'est le moment que tu attendais","Avoir tous les documents à portée de main"],
  41:["Rester positif et patient","Soutien émotionnel et physique maximum","Suivre rigoureusement les instructions médicales"],
};

const RDV_LIST = [
  {sa:8,emoji:'🏥',titre:'1ère consultation',desc:"Confirmation grossesse, prise de sang complète, calcul DPA. Sois là, prends des notes.",oblig:true},
  {sa:12,emoji:'🔬',titre:'Écho T1 + trisomie',desc:"Premier visage de bébé. Mesure de la clarté nucale. Durée 30-45 min. Apporte ton téléphone.",oblig:true},
  {sa:16,emoji:'📋',titre:'Consultation mensuelle',desc:"Suivi standard : tension, poids, hauteur utérine. Bonne occasion de poser vos questions.",oblig:false},
  {sa:20,emoji:'📝',titre:'Déclaration grossesse CPAM',desc:"À effectuer avant 15 SA sur ameli.fr. Déclarer aussi à l'employeur.",oblig:true},
  {sa:22,emoji:'👶',titre:'Écho T2 morphologique',desc:"L'échographie la plus importante. Examen minutieux de tous les organes. Durée 45-60 min.",oblig:true},
  {sa:24,emoji:'🩸',titre:'Test diabète gestationnel',desc:"Test HGPO : 3 prises de sang sur 2 heures. Accompagne-la.",oblig:false},
  {sa:28,emoji:'💉',titre:'Début T3 + bilan sanguin',desc:"Bilan sanguin complet. Vaccin coqueluche recommandé pour les deux parents.",oblig:false},
  {sa:32,emoji:'📏',titre:'Écho T3 croissance',desc:"Vérification de la position de bébé, poids estimé, liquide amniotique.",oblig:true},
  {sa:34,emoji:'🎓',titre:'Préparation accouchement',desc:"3 à 8 séances 100% remboursées. Des séances pour les pères existent.",oblig:false},
  {sa:36,emoji:'💬',titre:'Entretien prénatal tardif',desc:"Bilan global, finalisation du projet de naissance. Présence du père recommandée.",oblig:true},
  {sa:38,emoji:'🧳',titre:'Visite pré-accouchement',desc:"Dernière consultation avant le terme. Vérification du col et position de bébé.",oblig:false},
  {sa:40,emoji:'🎉',titre:'Jour J — DPA',desc:"Contractions toutes les 5 minutes pendant 1 heure = appelle la maternité avant de partir.",oblig:true},
];

const PARTENAIRES = [
  {categorie:'Pour elle',items:[
    {nom:'Mothercare',desc:'Vêtements grossesse & allaitement',remise:'-15%',lien:'#'},
    {nom:'Soin & Bien-être',desc:'Massage prénatal à domicile',remise:'-20%',lien:'#'},
    {nom:'Jolimoi',desc:'Cosmétiques naturels grossesse safe',remise:'-10%',lien:'#'},
  ]},
  {categorie:'Pour bébé',items:[
    {nom:'Cybex',desc:'Sièges auto & poussettes premium',remise:'-12%',lien:'#'},
    {nom:'Monbebe',desc:'Vêtements bébé bio & doux',remise:'-15%',lien:'#'},
    {nom:'Babymoov',desc:'Babyphone & accessoires',remise:'-10%',lien:'#'},
  ]},
  {categorie:'Pour toi',items:[
    {nom:'Box Papa',desc:'Box mensuelle future paternité',remise:'-25%',lien:'#'},
    {nom:'Cultura',desc:'Livres paternité & éveil bébé',remise:'-10%',lien:'#'},
    {nom:'Firstcry',desc:'Tout pour bébé à prix réduit',remise:'-15%',lien:'#'},
  ]},
];

const IDEES_MOIS: Record<number,string> = {
  1:"Encadre la photo de la première échographie et offre-lui le cadre.",
  2:"Réserve une table dans son restaurant préféré pour un dîner en amoureux.",
  3:"Offre-lui une séance de massage prénatal à domicile ou en institut.",
  4:"Crée un album photo numérique ou physique de la grossesse.",
  5:"Organise un week-end ou une escapade à deux avant bébé.",
  6:"Préparez la chambre de bébé ensemble un dimanche.",
  7:"Offre-lui un coussin de grossesse de qualité.",
  8:"Planifie un dernier road trip doux avant l'accouchement.",
  9:"Écris-lui une lettre manuscrite sur ce que cette grossesse représente pour toi.",
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [rdvOuvert, setRdvOuvert] = useState<number|null>(null);
  const [rdvDates, setRdvDates] = useState<Record<number,string>>({});
  const [valiseChecked, setValiseChecked] = useState<Record<string,boolean>>({});
  const [missionsChecked, setMissionsChecked] = useState<Record<string,boolean>>({});
  const [avance, setAvance] = useState(false);
  const [nextRdvDate, setNextRdvDate] = useState('');

  useEffect(() => {
    const d = searchParams.get('dpa') || localStorage.getItem('dadup_dpa') || '';
    const p = localStorage.getItem('dadup_prenom') || '';
    const v = JSON.parse(localStorage.getItem('dadup_valise') || '{}');
    const m = JSON.parse(localStorage.getItem('dadup_missions') || '{}');
    const r = localStorage.getItem('dadup_next_rdv') || '';
    const rd = JSON.parse(localStorage.getItem('dadup_rdv_dates') || '{}');
    if (!d) setShowOnboarding(true); else setDpa(d);
    setPrenom(p);
    setValiseChecked(v);
    setMissionsChecked(m);
    setNextRdvDate(r);
    setRdvDates(rd);
  }, []);

  const getSA = (offset = 0) => {
    if (!dpa) return null;
    const conception = new Date(new Date(dpa).getTime() - 40*7*24*60*60*1000);
    const diff = new Date().getTime() - conception.getTime();
    return Math.max(1, Math.min(42, Math.floor(diff/(7*24*60*60*1000))+offset));
  };

  const sa = getSA(avance ? 4 : 0);
  const saReelle = getSA();
  const data = sa ? (SEMAINES_DATA[sa] || SEMAINES_DATA[40]) : null;
  const dataReelle = saReelle ? (SEMAINES_DATA[saReelle] || SEMAINES_DATA[40]) : null;
  const dpaDate = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.ceil((dpaDate.getTime() - new Date().getTime())/(1000*60*60*24)) : null;
  const moisGrossesse = saReelle ? Math.ceil(saReelle/4.3) : 1;
  const ideesMois = IDEES_MOIS[Math.min(moisGrossesse, 9)] || IDEES_MOIS[9];
  const isPostPartum = joursRestants !== null && joursRestants < 0;
  const progression = Math.min(100, Math.round(((saReelle||0)/40)*100));
  const trimestre = (saReelle||0) <= 14 ? 'T1' : (saReelle||0) <= 27 ? 'T2' : 'T3';
  const missions = saReelle ? (MISSIONS[saReelle] || MISSIONS[40]) : [];
  const nextRdv = RDV_LIST.filter(r => saReelle && r.sa >= saReelle)[0];

  const toggleValise = (id: string) => {
    const u = {...valiseChecked, [id]:!valiseChecked[id]};
    setValiseChecked(u);
    localStorage.setItem('dadup_valise', JSON.stringify(u));
  };

  const toggleMission = (id: string) => {
    const u = {...missionsChecked, [id]:!missionsChecked[id]};
    setMissionsChecked(u);
    localStorage.setItem('dadup_missions', JSON.stringify(u));
  };

  const saveRdvDate = (val: string) => {
    setNextRdvDate(val);
    localStorage.setItem('dadup_next_rdv', val);
  };

  const saveRdvDateForItem = (sa: number, val: string) => {
    const u = {...rdvDates, [sa]: val};
    setRdvDates(u);
    localStorage.setItem('dadup_rdv_dates', JSON.stringify(u));
  };

  const saveOnboarding = (d: string, p: string) => {
    localStorage.setItem('dadup_dpa', d);
    localStorage.setItem('dadup_prenom', p);
    setDpa(d); setPrenom(p); setShowOnboarding(false);
  };

  const tabs = [
    {id:'home',label:'Accueil'},
    {id:'bebe',label:'Bébé'},
    {id:'rdv',label:'RDV'},
    {id:'pratique',label:'Pratique'},
    {id:'bonsplans',label:'Bons plans'},
  ];

  if (showOnboarding) return <Onboarding onSave={saveOnboarding}/>;

  return (
    <div style={{minHeight:'100vh', background:'#f8f7f4', paddingBottom:'32px', fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif'}}>

      {/* HEADER */}
      <div style={{background:C.cream, position:'sticky', top:0, zIndex:40, borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px'}}>
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
          <a href="/dashboard" onClick={() => setActiveTab('home')} style={{
            display:'flex', alignItems:'center', gap:'10px', textDecoration:'none',
            background:C.white, border:`1px solid ${C.border}`, borderRadius:'14px', padding:'7px 12px',
          }}>
            <p style={{color:C.dark, fontSize:'15px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>
              {prenom || 'DadUp'}
            </p>
            {saReelle && (
              <div style={{background:C.dark, borderRadius:'10px', padding:'5px 10px', display:'flex', flexDirection:'column', alignItems:'center', gap:'1px'}}>
                <p style={{color:C.gold, fontSize:'13px', fontWeight:800, margin:0, lineHeight:1}}>SA {saReelle}</p>
                <p style={{color:'rgba(200,160,96,0.6)', fontSize:'9px', fontWeight:600, margin:0, letterSpacing:'1px'}}>{trimestre}</p>
              </div>
            )}
          </a>
        </div>
        <div style={{padding:'0 16px 10px', display:'flex', gap:'6px', overflowX:'auto'}}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding:'7px 14px', fontSize:'12px', fontWeight: activeTab===t.id ? 700 : 400,
              color: activeTab===t.id ? C.gold : C.textLight,
              background: activeTab===t.id ? C.dark : C.white,
              border: activeTab===t.id ? 'none' : `1px solid ${C.border}`,
              borderRadius:'20px', cursor:'pointer', whiteSpace:'nowrap' as const, flexShrink:0,
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'16px 20px 16px', maxWidth:'100%'}}>

        {/* ========== ACCUEIL ========== */}
        {activeTab === 'home' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>

            {isPostPartum ? (
              <div style={{background:C.dark, borderRadius:'20px', padding:'32px', textAlign:'center'}}>
                <p style={{fontSize:'48px', margin:'0 0 8px'}}>👶</p>
                <p style={{color:C.white, fontSize:'24px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Bébé est là !</p>
                <p style={{color:C.gold, fontSize:'13px', margin:'4px 0 0'}}>Mode post-partum actif</p>
              </div>
            ) : dataReelle && saReelle && (
              <div style={{background:C.dark, borderRadius:'20px', padding:'20px', display:'flex', alignItems:'center', gap:'16px'}}>
                <div style={{flex:1}}>
                  <p style={{color:'rgba(200,160,96,0.7)', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 6px', fontWeight:600}}>{saReelle} SA · {trimestre}</p>
                  <p style={{color:C.white, fontSize:'22px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1.2}}>
                    Bébé fait {dataReelle.taille}<br/>et pèse {dataReelle.poids}
                  </p>
                  <p style={{color:'rgba(255,255,255,0.35)', fontSize:'12px', margin:'0 0 16px'}}>
                    {joursRestants && joursRestants > 0 ? joursRestants+' jours avant le grand jour' : 'Le grand jour approche !'}
                  </p>
                  <div style={{background:'rgba(255,255,255,0.1)', borderRadius:'4px', height:'3px', marginBottom:'6px'}}>
                    <div style={{background:C.gold, height:'3px', borderRadius:'4px', width:progression+'%'}}/>
                  </div>
                  <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
                    {['T1','T2','T3'].map((t,i) => {
                      const s=[14,27,40]; const actif=(saReelle||0)>(i===0?0:s[i-1]); const enCours=trimestre===t;
                      return <span key={t} style={{background:enCours?'rgba(200,160,96,0.2)':actif?C.gold:'rgba(255,255,255,0.06)',color:enCours?C.gold:actif?C.dark:'rgba(255,255,255,0.25)',fontSize:'10px',fontWeight:700,padding:'2px 8px',borderRadius:'20px'}}>{t}{actif&&!enCours?' ✓':enCours?' →':''}</span>;
                    })}
                    <span style={{color:'rgba(255,255,255,0.3)',fontSize:'11px',marginLeft:'auto'}}>{progression}%</span>
                  </div>
                </div>
                <div style={{fontSize:'56px', lineHeight:1, flexShrink:0}}>{dataReelle.emoji}</div>
              </div>
            )}

            {/* PROCHAIN RDV */}
            {nextRdv && (
              <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px'}}>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:800, margin:0}}>Prochain rendez-vous</p>
                  {dpa && <span style={{background:'#f8f7f4', color:C.gold, fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'20px', border:`1px solid ${C.border}`}}>
                    {Math.max(0,Math.round((new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000-new Date().getTime())/(1000*60*60*24)))}j
                  </span>}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
                  <div style={{width:'44px', height:'44px', borderRadius:'12px', background:'#f8f7f4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0}}>{nextRdv.emoji}</div>
                  <div style={{flex:1}}>
                    <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:'0 0 2px'}}>{nextRdv.titre}</p>
                    <p style={{color:C.textLight, fontSize:'12px', margin:0}}>{nextRdv.sa} SA{dpa?' · '+new Date(new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):''}</p>
                  </div>
                  <button onClick={() => setActiveTab('rdv')} style={{width:'30px', height:'30px', borderRadius:'50%', background:C.dark, border:'none', cursor:'pointer', color:C.gold, fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center'}}>→</button>
                </div>
                <div style={{borderTop:`1px solid ${C.border}`, paddingTop:'10px'}}>
                  <p style={{color:C.textLight, fontSize:'11px', fontWeight:600, margin:'0 0 6px'}}>Ma date de RDV :</p>
                  <input type="date" value={nextRdvDate} onChange={e => saveRdvDate(e.target.value)}
                    style={{width:'100%', background:'#f8f7f4', border:`1px solid ${C.border}`, borderRadius:'10px', padding:'9px 12px', fontSize:'13px', color:C.dark, boxSizing:'border-box' as const}}/>
                  {nextRdvDate && <p style={{color:C.gold, fontSize:'11px', margin:'5px 0 0', fontWeight:600}}>
                    RDV le {new Date(nextRdvDate).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}
                  </p>}
                </div>
              </div>
            )}

            {/* CONSEIL + IDEE */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
              {dataReelle && (
                <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                  <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'8px'}}>
                    <span style={{fontSize:'16px'}}>💡</span>
                    <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Conseil</p>
                  </div>
                  <p style={{color:C.text, fontSize:'12px', lineHeight:1.6, margin:0}}>{dataReelle.conseil}</p>
                </div>
              )}
              <div style={{background:C.gold, borderRadius:'16px', padding:'16px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'8px'}}>
                  <span style={{fontSize:'16px'}}>🎁</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Idée du mois</p>
                </div>
                <p style={{color:C.dark, fontSize:'12px', lineHeight:1.6, margin:0, fontWeight:500}}>{ideesMois}</p>
              </div>
            </div>

            {/* CE QUE VIT MAMAN */}
            {dataReelle && (
              <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px'}}>
                  <span style={{fontSize:'16px'}}>🤱</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Ce que vit maman</p>
                </div>
                <p style={{color:C.text, fontSize:'13px', lineHeight:1.7, margin:'0 0 12px'}}>{dataReelle.maman}</p>
                <div style={{background:'#f8f7f4', borderRadius:'10px', padding:'12px', borderLeft:`3px solid ${C.gold}`, borderRadius:'0 10px 10px 0'}}>
                  <p style={{color:C.dark, fontSize:'12px', fontWeight:700, margin:'0 0 4px'}}>⚠️ Quand appeler la maternité ?</p>
                  <p style={{color:C.text, fontSize:'12px', lineHeight:1.5, margin:0}}>Contractions régulières et rapprochées, perte de liquide amniotique, saignements, absence de mouvements fœtaux sur plusieurs heures. En cas de doute, appelez toujours.</p>
                </div>
              </div>
            )}

            {/* DOC DE LA SEMAINE */}
            {dataReelle && (
              <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px'}}>
                  <span style={{fontSize:'16px'}}>📖</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>À savoir cette semaine</p>
                </div>
                <p style={{color:C.text, fontSize:'13px', lineHeight:1.7, margin:0}}>{dataReelle.doc}</p>
              </div>
            )}

            {/* LE SAVAIS-TU */}
            {dataReelle && (
              <div style={{background:C.dark, borderRadius:'16px', padding:'16px'}}>
                <div style={{display:'flex', gap:'10px', alignItems:'flex-start'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'10px', background:'rgba(200,160,96,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0}}>🧠</div>
                  <div>
                    <p style={{color:C.gold, fontSize:'13px', fontWeight:800, margin:'0 0 5px'}}>Le savais-tu ?</p>
                    <p style={{color:C.white, fontSize:'12px', lineHeight:1.6, margin:0}}>{dataReelle.savistu}</p>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ */}
            {dataReelle && (
              <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px'}}>
                  <span style={{fontSize:'16px'}}>❓</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Questions fréquentes</p>
                </div>
                <p style={{color:C.text, fontSize:'12px', lineHeight:1.7, margin:0}}>{dataReelle.faq}</p>
              </div>
            )}

            {/* MISSION */}
            {missions.length > 0 && (
              <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'12px'}}>
                  <span style={{fontSize:'16px'}}>🎯</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Ta mission cette semaine</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                  {missions.map((m,i) => {
                    const id='mission_'+saReelle+'_'+i;
                    const done=missionsChecked[id];
                    return (
                      <button key={id} onClick={() => toggleMission(id)} style={{display:'flex', gap:'10px', alignItems:'flex-start', background:'#f8f7f4', border:'none', cursor:'pointer', textAlign:'left', padding:'9px 10px', borderRadius:'10px'}}>
                        <div style={{width:'20px', height:'20px', borderRadius:'5px', border:`2px solid ${done?C.gold:C.border}`, background:done?C.gold:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px'}}>
                          {done && <span style={{color:C.dark, fontSize:'11px', fontWeight:700}}>✓</span>}
                        </div>
                        <p style={{color:done?C.textLight:C.dark, fontSize:'12px', margin:0, lineHeight:1.5, textDecoration:done?'line-through':'none'}}>{m}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========== BÉBÉ ========== */}
        {activeTab === 'bebe' && data && sa && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <h2 style={{color:C.dark, fontSize:'20px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>
                {avance ? 'Dans 4 semaines' : saReelle+' semaines'}
              </h2>
              <button onClick={() => setAvance(!avance)} style={{fontSize:'11px', padding:'6px 12px', borderRadius:'20px', cursor:'pointer', fontWeight:700, background:avance?C.dark:C.white, color:avance?C.gold:C.text, border:avance?'none':`1px solid ${C.border}`}}>
                {avance ? '← Revenir' : "S'avancer +4 SA"}
              </button>
            </div>

            {/* HERO */}
            <div style={{background:C.dark, borderRadius:'20px', padding:'20px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'12px', right:'16px', fontSize:'72px', lineHeight:1, opacity:0.9}}>{data.emoji}</div>
              <div style={{position:'relative'}}>
                <p style={{color:'rgba(200,160,96,0.7)', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 6px', fontWeight:600}}>{sa} SA</p>
                <p style={{color:C.white, fontSize:'26px', fontWeight:800, margin:'0 0 2px', fontFamily:'Georgia,serif', lineHeight:1.1}}>{data.taille} · {data.poids}</p>
              </div>
            </div>

            {/* DÉVELOPPEMENT */}
            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px'}}>
                <span style={{fontSize:'16px'}}>🔬</span>
                <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Développement</p>
              </div>
              <p style={{color:C.text, fontSize:'13px', lineHeight:1.7, margin:0}}>{data.developpement}</p>
            </div>

            {/* ORGANES */}
            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px'}}>
                <span style={{fontSize:'16px'}}>🫀</span>
                <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Organes — état cette semaine</p>
              </div>
              <p style={{color:C.text, fontSize:'13px', lineHeight:1.7, margin:0}}>{data.organes}</p>
            </div>

            {/* ANECDOTE */}
            <div style={{background:C.dark, borderRadius:'16px', padding:'16px'}}>
              <div style={{display:'flex', gap:'10px', alignItems:'flex-start'}}>
                <div style={{width:'32px', height:'32px', borderRadius:'10px', background:'rgba(200,160,96,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0}}>✨</div>
                <div>
                  <p style={{color:C.gold, fontSize:'13px', fontWeight:800, margin:'0 0 5px'}}>Anecdote scientifique</p>
                  <p style={{color:C.white, fontSize:'12px', lineHeight:1.6, margin:0}}>{data.anecdote}</p>
                </div>
              </div>
            </div>

            {/* LE SAVAIS-TU */}
            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px'}}>
                <span style={{fontSize:'16px'}}>🧠</span>
                <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Le savais-tu ?</p>
              </div>
              <p style={{color:C.text, fontSize:'13px', lineHeight:1.7, margin:0}}>{data.savistu}</p>
            </div>

            {/* FAQ BÉBÉ */}
            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px'}}>
                <span style={{fontSize:'16px'}}>❓</span>
                <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Questions fréquentes</p>
              </div>
              <p style={{color:C.text, fontSize:'13px', lineHeight:1.7, margin:0}}>{data.faq}</p>
            </div>

          </div>
        )}

        {/* ========== RDV ========== */}
        {activeTab === 'rdv' && (
          <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <h2 style={{color:C.dark, fontSize:'20px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Calendrier RDV</h2>
              {dpa && <p style={{color:C.textLight, fontSize:'12px', margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR',{day:'numeric',month:'long'})}</p>}
            </div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:'20px', top:0, bottom:0, width:'2px', background:C.border}}/>
              <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                {RDV_LIST.map((r,i) => {
                  const statut = !saReelle ? 'futur' : r.sa < saReelle ? 'passe' : r.sa <= saReelle+2 ? 'prochain' : 'futur';
                  const rdvDate = dpa ? new Date(new Date(dpa).getTime()-(40-r.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}) : '';
                  return (
                    <div key={i} style={{position:'relative', paddingLeft:'50px'}}>
                      <div style={{position:'absolute', left:'12px', top:'16px', width:'18px', height:'18px', borderRadius:'50%', border:`2px solid ${statut==='passe'?C.gold:statut==='prochain'?C.gold:C.border}`, background:statut==='passe'?C.gold:statut==='prochain'?C.gold:C.white, display:'flex', alignItems:'center', justifyContent:'center', transform:statut==='prochain'?'scale(1.2)':'scale(1)'}}>
                        {statut==='passe' && <span style={{color:C.dark, fontSize:'9px', fontWeight:700}}>✓</span>}
                      </div>
                      <button onClick={() => setRdvOuvert(rdvOuvert===i?null:i)} style={{width:'100%', textAlign:'left', borderRadius:'14px', padding:'12px 14px', border:'none', cursor:'pointer', background:statut==='prochain'?C.dark:C.white, outline:'none', opacity:statut==='passe'?0.5:1, borderLeft:statut==='prochain'?`3px solid ${C.gold}`:`1px solid ${C.border}`}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <span style={{fontSize:'16px'}}>{r.emoji}</span>
                            <div>
                              <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                <p style={{color:statut==='prochain'?C.white:C.dark, fontSize:'13px', fontWeight:700, margin:0}}>{r.titre}</p>
                                {r.oblig && <span style={{background:statut==='prochain'?'rgba(200,160,96,0.2)':'#f8f7f4', color:C.gold, fontSize:'9px', fontWeight:700, padding:'2px 6px', borderRadius:'8px'}}>obligatoire</span>}
                              </div>
                              <p style={{color:C.textLight, fontSize:'11px', margin:0}}>{r.sa} SA{dpa?' · '+rdvDate:''}</p>
                            </div>
                          </div>
                          <span style={{color:C.textLight, fontSize:'10px'}}>{rdvOuvert===i?'▲':'▼'}</span>
                        </div>
                        {rdvOuvert === i && (
                          <div style={{marginTop:'10px', paddingTop:'10px', borderTop:`1px solid ${statut==='prochain'?'rgba(255,255,255,0.1)':C.border}`}}>
                            <p style={{color:statut==='prochain'?'rgba(255,255,255,0.6)':C.text, fontSize:'12px', lineHeight:1.5, margin:'0 0 10px'}}>{r.desc}</p>
                            <div style={{display:'flex', gap:'8px', flexWrap:'wrap' as const}}>
                              <a href={`https://www.doctolib.fr/recherche?speciality=gynecologue-obstetricien`} target="_blank" rel="noopener noreferrer" style={{background:statut==='prochain'?'rgba(200,160,96,0.2)':C.cream, color:statut==='prochain'?C.gold:C.dark, fontSize:'11px', fontWeight:700, padding:'6px 12px', borderRadius:'20px', textDecoration:'none', border:statut==='prochain'?'none':`1px solid ${C.border}`, display:'inline-flex', alignItems:'center', gap:'4px'}}>
                                📅 Prendre RDV sur Doctolib
                              </a>
                            </div>
                            <div style={{marginTop:'8px'}}>
                              <p style={{color:statut==='prochain'?'rgba(255,255,255,0.5)':C.textLight, fontSize:'10px', fontWeight:600, margin:'0 0 5px'}}>Ma date de RDV :</p>
                              <input type="date" value={rdvDates[r.sa]||''} onChange={e => saveRdvDateForItem(r.sa, e.target.value)}
                                style={{background:statut==='prochain'?'rgba(255,255,255,0.1)':'#f8f7f4', border:`1px solid ${statut==='prochain'?'rgba(255,255,255,0.2)':C.border}`, borderRadius:'8px', padding:'6px 10px', fontSize:'12px', color:statut==='prochain'?C.white:C.dark, width:'100%', boxSizing:'border-box' as const}}/>
                              {rdvDates[r.sa] && <p style={{color:C.gold, fontSize:'11px', margin:'4px 0 0', fontWeight:600}}>
                                RDV le {new Date(rdvDates[r.sa]).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}
                              </p>}
                            </div>
                          </div>
                        )}
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
            <h2 style={{color:C.dark, fontSize:'20px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Pratique</h2>

            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'7px'}}>
                  <span style={{fontSize:'16px'}}>🧳</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Valise maternité</p>
                </div>
                <span style={{background:C.dark, color:C.gold, fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'20px'}}>{Object.values(valiseChecked).filter(Boolean).length}/21</span>
              </div>
              <div style={{background:'#f8f7f4', borderRadius:'4px', height:'3px', marginBottom:'14px'}}>
                <div style={{background:C.gold, height:'3px', borderRadius:'4px', width:(Object.values(valiseChecked).filter(Boolean).length/21*100)+'%'}}/>
              </div>
              {[
                {titre:'Pour toi', items:[{id:'v1',label:'Chargeur + batterie externe'},{id:'v2',label:'Vêtements confort (2 jours)'},{id:'v3',label:'Snacks & eau'},{id:'v4',label:'Écouteurs'},{id:'v5',label:'Documents hospitaliers'},{id:'v6',label:'Appareil photo chargé'}]},
                {titre:'Pour elle', items:[{id:'v7',label:'Chemise de nuit accouchement'},{id:'v8',label:'Robe de chambre + chaussons'},{id:'v9',label:'Sous-vêtements post-partum'},{id:'v10',label:'Produits de toilette'},{id:'v11',label:'Soutien-gorge allaitement x2'}]},
                {titre:'Pour bébé', items:[{id:'v12',label:'Body naissance x3'},{id:'v13',label:'Pyjama naissance x2'},{id:'v14',label:'Bonnet naissance x2'},{id:'v15',label:'Gigoteuse naissance'},{id:'v16',label:'Siège auto installé'},{id:'v17',label:'Couches nouveau-né'}]},
                {titre:'Documents', items:[{id:'v18',label:'Carte vitale + mutuelle'},{id:'v19',label:'Carnet de maternité'},{id:'v20',label:'Pièces d\'identité'},{id:'v21',label:'Plan accès maternité'}]},
              ].map(s => (
                <div key={s.titre} style={{marginBottom:'14px'}}>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'2px', margin:'0 0 8px'}}>{s.titre}</p>
                  <div style={{display:'flex', flexDirection:'column', gap:'7px'}}>
                    {s.items.map(item => (
                      <button key={item.id} onClick={() => toggleValise(item.id)} style={{display:'flex', alignItems:'center', gap:'10px', background:'none', border:'none', cursor:'pointer', textAlign:'left', padding:'3px 0'}}>
                        <div style={{width:'20px', height:'20px', borderRadius:'5px', border:`2px solid ${valiseChecked[item.id]?C.gold:C.border}`, background:valiseChecked[item.id]?C.gold:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                          {valiseChecked[item.id] && <span style={{color:C.dark, fontSize:'11px', fontWeight:700}}>✓</span>}
                        </div>
                        <span style={{fontSize:'13px', color:valiseChecked[item.id]?C.textLight:C.dark, textDecoration:valiseChecked[item.id]?'line-through':'none'}}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'14px'}}>
                <span style={{fontSize:'16px'}}>🛒</span>
                <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Achats prioritaires</p>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                {[
                  {label:'Siège auto groupe 0+', priorite:'urgent', prix:'80-300€'},
                  {label:'Babyphone vidéo', priorite:'urgent', prix:'40-150€'},
                  {label:'Lit cododo / berceau', priorite:'urgent', prix:'60-400€'},
                  {label:'Poussette combinée', priorite:'avant naissance', prix:'200-1200€'},
                  {label:'Tire-lait électrique', priorite:'si allaitement', prix:'30-200€'},
                  {label:'Thermomètre rectal', priorite:'urgent', prix:'15-40€'},
                  {label:'Humidificateur', priorite:'utile', prix:'30-80€'},
                ].map((a,i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', background:'#f8f7f4', borderRadius:'10px'}}>
                    <div>
                      <p style={{color:C.dark, fontSize:'13px', fontWeight:600, margin:'0 0 3px'}}>{a.label}</p>
                      <span style={{background:a.priorite==='urgent'?'#fff0f0':C.cream, color:a.priorite==='urgent'?'#cc4444':C.textLight, fontSize:'10px', fontWeight:700, padding:'2px 7px', borderRadius:'8px'}}>{a.priorite}</span>
                    </div>
                    <p style={{color:C.gold, fontSize:'13px', fontWeight:700, margin:0}}>{a.prix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
              <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'14px'}}>
                <span style={{fontSize:'16px'}}>🌙</span>
                <p style={{color:C.dark, fontSize:'13px', fontWeight:800, margin:0}}>Survie 1er mois</p>
              </div>
              {[
                {titre:'Emmaillotage', contenu:"Couverture en losange. Coin supérieur replié à 15cm. Bébé épaules sur le bord. Ramener côté gauche → sous le dos. Bas vers le haut. Côté droit → sous le dos. Test : 2 doigts passent au niveau des hanches."},
                {titre:'Bébé pleure — protocole', contenu:"1. Faim ? (toutes les 2-3h) 2. Couche sale ? 3. Température ? (nuque = thermomètre) 4. Besoin contact ? (peau à peau) 5. Coliques ? (vélo avec les jambes) 6. Surstimulé ? (pièce calme, voix douce)"},
                {titre:'Sommeil de bébé', contenu:"16-18h/24 en cycles de 2-3h. Toujours sur le dos. Pas d'oreiller ni couette. Température : 18-20°C. Les réveils nocturnes diminuent progressivement vers 3-4 mois."},
                {titre:"Signaux d'alerte — urgences pédiatriques", contenu:"Température > 38°C avant 3 mois. Refus de s'alimenter sur 2 tétées. Pleurs inconsolables inhabituels. Teint gris ou jaunâtre intense. Fontanelle bombée. Difficultés respiratoires → 15 (SAMU) ou urgences pédiatriques."},
              ].map((s,i) => (
                <div key={i} style={{marginBottom:i<3?'14px':0, paddingBottom:i<3?'14px':0, borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
                  <p style={{color:C.gold, fontSize:'12px', fontWeight:800, margin:'0 0 5px'}}>{s.titre}</p>
                  <p style={{color:C.text, fontSize:'12px', lineHeight:1.6, margin:0}}>{s.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== BONS PLANS ========== */}
        {activeTab === 'bonsplans' && (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <h2 style={{color:C.dark, fontSize:'20px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Bons plans</h2>
            {PARTENAIRES.map(cat => (
              <div key={cat.categorie} style={{background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 12px'}}>{cat.categorie}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                  {cat.items.map((item,i) => (
                    <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', background:'#f8f7f4', borderRadius:'10px'}}>
                      <div>
                        <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 2px'}}>{item.nom}</p>
                        <p style={{color:C.textLight, fontSize:'11px', margin:0}}>{item.desc}</p>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:'6px', flexShrink:0}}>
                        <span style={{background:C.gold, color:C.dark, fontSize:'11px', fontWeight:700, padding:'3px 8px', borderRadius:'20px'}}>{item.remise}</span>
                        <a href={item.lien} style={{background:C.dark, color:C.gold, fontSize:'11px', fontWeight:700, padding:'5px 12px', borderRadius:'20px', textDecoration:'none'}}>Voir</a>
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

function Onboarding({onSave}: {onSave:(dpa:string,prenom:string)=>void}) {
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');
  return (
    <main style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'420px', width:'100%'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:'28px'}}>
          <svg viewBox="0 0 300 300" width="68" height="68">
            <circle cx="150" cy="150" r="145" fill="#3a4f6e"/>
            <circle cx="150" cy="150" r="122" fill="#4a6080"/>
            <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
            <circle cx="150" cy="112" r="40" fill="#c8a060"/>
            <ellipse cx="150" cy="196" rx="27" ry="31" fill="#faf6f0"/>
            <circle cx="150" cy="128" r="26" fill="#faf6f0"/>
          </svg>
        </div>
        <div style={{background:C.white, borderRadius:'24px', padding:'28px', border:`1px solid ${C.border}`}}>
          <h1 style={{fontSize:'22px', fontWeight:800, color:C.dark, margin:'0 0 8px', textAlign:'center', fontFamily:'Georgia,serif'}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.text, fontSize:'13px', textAlign:'center', margin:'0 0 24px'}}>Deux infos pour personnaliser ton espace.</p>
          <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
            <div>
              <label style={{display:'block', color:C.dark, fontSize:'12px', fontWeight:600, marginBottom:'7px'}}>Ton prénom</label>
              <input type="text" placeholder="Thomas, Julien, Marc..." value={prenom} onChange={e => setPrenom(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'10px', padding:'11px 14px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, outline:'none'}}/>
            </div>
            <div>
              <label style={{display:'block', color:C.dark, fontSize:'12px', fontWeight:600, marginBottom:'7px'}}>Date prévue d'accouchement</label>
              <input type="date" value={dpa} onChange={e => setDpa(e.target.value)}
                style={{width:'100%', background:C.cream, border:`1px solid ${C.border}`, borderRadius:'10px', padding:'11px 14px', fontSize:'14px', color:C.dark, boxSizing:'border-box' as const, outline:'none'}}/>
            </div>
            <button onClick={() => dpa && onSave(dpa,prenom)} disabled={!dpa} style={{background:dpa?C.dark:'#ccc', color:C.white, border:'none', borderRadius:'24px', padding:'13px', fontSize:'14px', fontWeight:700, cursor:dpa?'pointer':'not-allowed', marginTop:'6px'}}>
              Accéder à mon espace
            </button>
          </div>
        </div>
        <p style={{textAlign:'center', color:C.textLight, fontSize:'11px', marginTop:'14px'}}>Aucune donnée personnelle stockée en ligne.</p>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center'}}><p style={{color:C.textLight}}>Chargement...</p></div>}>
      <DashboardContent/>
    </Suspense>
  );
}
