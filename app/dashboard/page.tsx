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
  bg: '#f8f7f4',
};

const SEMAINES_DATA: Record<number, {
  emoji: string; taille: string; poids: string;
  titre: string; intro: string;
  maman_titre: string; maman: string; maman_aide: string; maman_signe: string;
  alerte: string; savistu: string; doc_titre: string; doc: string;
  conseil: string; idee_label: string;
  bebe_dev: string; bebe_organes: string; bebe_anecdote: string; bebe_faq: string;
}> = {
  6:{
    emoji:'🌾', taille:'0.6 cm', poids:'moins de 1g',
    titre:'Le cœur bat pour la première fois',
    intro:'À 6 SA (semaines d\'aménorrhée), bébé mesure à peine un grain de riz. Mais son cœur bat déjà — environ 110 fois par minute.',
    maman_titre:'La fatigue et les nausées s\'installent',
    maman:'Les premières semaines sont physiquement éprouvantes. La progestérone — une hormone qui prépare l\'utérus à accueillir bébé — provoque une fatigue intense. Les nausées peuvent survenir à toute heure, pas seulement le matin. Les seins sont souvent sensibles et gonflés.',
    maman_aide:'Gingembre, biscuits secs, repas froids sans odeur forte. Prends le relais en cuisine si certaines odeurs la font souffrir.',
    maman_signe:'Les nausées intenses sont souvent le signe d\'un bon taux de hCG — l\'hormone de grossesse. Paradoxalement, elles sont rassurantes.',
    alerte:'Si elle vomit plus de 3 fois par jour et ne peut plus rien avaler, consulter un médecin — c\'est une hyperemesis gravidarum (nausées sévères nécessitant un traitement).',
    savistu:'Le cœur de bébé bat déjà à 6 SA, mais il est si petit qu\'une échographie ne peut pas toujours le visualiser clairement.',
    doc_titre:'Les premières analyses de sang',
    doc:'Lors de la première consultation médicale, plusieurs prises de sang sont prescrites. Elles vérifient le groupe sanguin, l\'immunité contre la rubéole et la toxoplasmose. La toxoplasmose est une infection bénigne en temps normal, mais dangereuse pour bébé si la mère n\'est pas immunisée — elle impose d\'éviter la viande crue, les fruits de mer crus et le contact avec les litières de chats.',
    conseil:'Prends le relais sur les tâches ménagères sans qu\'elle ait à demander. C\'est le soutien le plus concret que tu puisses apporter maintenant.',
    idee_label:'Encadre la photo de la première échographie. Un cadeau simple qui comptera longtemps.',
    bebe_dev:'Le tube neural se referme cette semaine — c\'est la structure qui va devenir le cerveau et la moelle épinière. Le cœur commence à battre. Les ébauches des bras et des jambes apparaissent.',
    bebe_organes:'Cerveau : le tube neural se ferme. Cœur : premières contractions à ~110 bpm. Yeux : fossettes optiques visibles. Foie : production des premiers globules rouges.',
    bebe_anecdote:'À 6 SA, le futur bébé mesure autant qu\'un grain de riz — mais son cœur bat déjà. La nature est remarquablement efficace.',
    bebe_faq:'Faut-il arrêter le sport ? L\'activité modérée est recommandée, évite les sports de contact et les efforts intenses. Peut-on voyager ? Oui, le 1er trimestre est sans risque particulier pour les voyages si la grossesse est normale.',
  },
  7:{
    emoji:'🫐', taille:'1 cm', poids:'1g',
    titre:'Le visage commence à se dessiner',
    intro:'À 7 SA, bébé mesure environ 1 cm — comme une petite pile bouton. Le visage commence à prendre forme : les fosses nasales et les bourgeons des oreilles sont déjà visibles.',
    maman_titre:'Les nausées atteignent souvent leur pic',
    maman:'L\'hypersensibilité aux odeurs peut rendre certains aliments ou espaces insupportables. Une hypersalivation (production excessive de salive) peut aussi apparaître — c\'est normal mais inconfortable. La fatigue reste intense.',
    maman_aide:'Repas froids plutôt que chauds, petites quantités fréquentes. Évite de faire chauffer des plats odorants à la maison.',
    maman_signe:'L\'hypersensibilité aux odeurs est un mécanisme de protection naturel qui pousse à éviter les aliments potentiellement dangereux pendant la grossesse.',
    alerte:'Si elle ne peut plus s\'hydrater correctement, consulter rapidement — la déshydratation pendant la grossesse nécessite une prise en charge médicale.',
    savistu:'Les empreintes digitales de bébé commencent à se former à 7 SA. Elles sont déjà uniques et ne changeront jamais de toute sa vie.',
    doc_titre:'Pourquoi le premier trimestre est si fatigant',
    doc:'Le corps fabrique littéralement un nouvel organe — le placenta — pendant les 12 premières semaines. C\'est une charge énorme pour l\'organisme. La progestérone ralentit aussi le système digestif pour mieux absorber les nutriments. Résultat : fatigue, somnolence, difficulté à se concentrer. C\'est temporaire.',
    conseil:'Propose des repas simples, froids si nécessaire. Être présent sans surprotéger est la clé de cette période.',
    idee_label:'Offre-lui un abonnement à une application de méditation ou de sophrologie pour traverser cette période plus sereinement.',
    bebe_dev:'Le visage se structure : fosses nasales, bourgeons oculaires, ébauches des oreilles. Les bras et jambes s\'allongent. Le foie commence à produire des cellules sanguines.',
    bebe_organes:'Cerveau : deux hémisphères distincts visibles. Yeux : cristallin en formation. Oreilles : canaux semi-circulaires. Poumons : premiers bourgeons bronchiques.',
    bebe_anecdote:'Le cerveau de bébé crée 250 000 nouvelles cellules nerveuses par minute à ce stade. C\'est le rythme de croissance neurologique le plus intense de toute sa vie.',
    bebe_faq:'Peut-elle prendre des médicaments contre les nausées ? Certains sont autorisés — en parler avec le médecin. Le gingembre est une alternative naturelle efficace. L\'ibuprofène est interdit pendant toute la grossesse.',
  },
  8:{
    emoji:'🫐', taille:'1.6 cm', poids:'1g',
    titre:'Tous les organes sont en construction',
    intro:'À 8 SA, bébé mesure 1,6 cm — comme une pile AA. Les doigts commencent à se séparer. Tous les organes principaux sont en cours de formation simultanée.',
    maman_titre:'La fatigue est à son maximum',
    maman:'La progestérone provoque une fatigue écrasante — le corps consacre une énergie considérable à la construction du placenta. Des maux de tête peuvent apparaître en raison des changements de circulation sanguine. La constipation s\'installe souvent car la progestérone ralentit le transit intestinal.',
    maman_aide:'Alimentation riche en fibres et bonne hydratation pour la constipation. Pour les maux de tête : paracétamol autorisé, jamais d\'ibuprofène.',
    maman_signe:'La constipation est un signe que le corps fait bien son travail — le transit ralentit pour mieux absorber les nutriments destinés à bébé.',
    alerte:'En cas de saignements importants ou de douleurs abdominales intenses, appeler la maternité immédiatement.',
    savistu:'Le cerveau de bébé produit environ 100 nouvelles cellules nerveuses par minute à ce stade — une des phases les plus intenses de toute sa vie.',
    doc_titre:'Ce que la première consultation comprend',
    doc:'La première consultation médicale a lieu idéalement entre 8 et 10 SA. Elle comprend un examen clinique, le calcul de la date prévue d\'accouchement (DPA), une ordonnance de prises de sang et la prescription de l\'acide folique (vitamine essentielle pour le développement du cerveau de bébé). C\'est aussi le moment de déclarer la grossesse à la Sécurité sociale.',
    conseil:'Prends le relais sur les tâches ménagères sans qu\'elle ait à demander. Anticipe : courses, dîner, ménage.',
    idee_label:'Prépare une liste de prénoms — même trop tôt, c\'est une conversation légère et douce à avoir ensemble.',
    bebe_dev:'Les doigts commencent à se séparer. Le cerveau forme déjà des plis pour augmenter sa surface. Tous les organes principaux sont simultanément en construction.',
    bebe_organes:'Cerveau : premiers sillons corticaux. Cœur : 4 cavités distinctes. Mains : doigts en cours de séparation. Reins : premiers néphrons. Yeux : rétine pigmentée.',
    bebe_anecdote:'À 8 SA, bébé peut déjà bouger ses membres — mais tu ne le sentiras que dans 12 semaines environ. Les mouvements existent bien avant d\'être perceptibles.',
    bebe_faq:'Peut-elle prendre un bain chaud ? Les bains très chauds sont à éviter au 1er trimestre — la chaleur excessive peut être néfaste pour le développement du tube neural. Un bain tiède est parfait.',
  },
  9:{
    emoji:'🫒', taille:'2.3 cm', poids:'2g',
    titre:'Bébé ressemble déjà à un humain',
    intro:'À 9 SA, bébé mesure 2,3 cm — comme un bouchon de liège. Le visage est distinctement humain. Il peut sucer son pouce. Les dents de lait se forment déjà sous les gencives.',
    maman_titre:'Les sautes d\'humeur sont normales',
    maman:'Les fluctuations hormonales — surtout l\'œstrogène et la progestérone — provoquent des sautes d\'humeur intenses et imprévisibles. Ce n\'est pas dirigé contre toi. L\'anxiété autour du risque de fausse couche (encore statistiquement présent) peut aussi s\'ajouter.',
    maman_aide:'Écoute sans chercher à résoudre. Ta stabilité émotionnelle est un ancrage précieux. Ne prends pas la défense, ne minimise pas.',
    maman_signe:'Les émotions fortes en début de grossesse sont documentées scientifiquement — le cerveau se reconfigure littéralement pour développer les circuits de l\'attachement maternel.',
    alerte:'En cas de crampes importantes avec saignements, consulter rapidement — ce sont des signes à surveiller au 1er trimestre.',
    savistu:'À 9 SA, le cœur de bébé bat à environ 170 battements par minute — deux fois plus vite que le tien.',
    doc_titre:'Le risque de fausse couche au 1er trimestre',
    doc:'Le risque de fausse couche est le plus élevé entre 6 et 10 SA, puis diminue fortement chaque semaine. C\'est pour cette raison que beaucoup de couples attendent 12 SA pour annoncer la grossesse. Cette attente peut être stressante — sois présent et dédramatise sans minimiser l\'inquiétude.',
    conseil:'Les sautes d\'humeur ne sont pas contre toi — elles sont biochimiques. Accueille-les avec calme.',
    idee_label:'Propose une sortie douce — cinéma, promenade, dîner calme — pour alléger le quotidien.',
    bebe_dev:'Bébé bouge mais est trop petit pour être senti. Tous les organes principaux sont en place. Les dents de lait se forment sous les gencives. Le fœtus peut sucer son pouce.',
    bebe_organes:'Dents de lait : ébauches sous les gencives. Yeux : paupières fusionnées. Cerveau : cervelet visible. Intestins : dans le cordon (normal à ce stade). Poumons : lobules en formation.',
    bebe_anecdote:'Les intestins de bébé sont temporairement logés dans le cordon ombilical à 9 SA — hernie physiologique entièrement normale. Ils rentreront dans l\'abdomen à 11 SA.',
    bebe_faq:'Quand passer la première échographie ? Entre 11 et 13 SA. Peut-elle avoir un chat ? Elle peut garder son chat, mais doit éviter de nettoyer la litière pour prévenir la toxoplasmose (infection transmissible par les excréments de chat).',
  },
  10:{
    emoji:'🍓', taille:'3 cm', poids:'4g',
    titre:'La période embryonnaire est terminée',
    intro:'À 10 SA, bébé mesure 3 cm — comme une balle de ping-pong. Il est officiellement un fœtus. Les ongles apparaissent. Il peut faire des petits mouvements spontanés visibles à l\'échographie.',
    maman_titre:'Un peu de répit souvent en vue',
    maman:'Les nausées commencent souvent à diminuer progressivement. Un regain d\'énergie peut apparaître. La libido peut revenir progressivement. Le ventre ne se voit pas encore mais les vêtements commencent à serrer.',
    maman_aide:'C\'est le bon moment pour planifier la première échographie ensemble si ce n\'est pas encore fait.',
    maman_signe:'La diminution des nausées vers 10-12 SA est normale — le taux de hCG commence à se stabiliser.',
    alerte:'Si les nausées disparaissent brusquement et complètement du jour au lendemain, mentionner cela au médecin lors de la prochaine consultation.',
    savistu:'À 10 SA, le fœtus peut déjà froncer les sourcils et faire des grimaces — le système nerveux est suffisamment développé.',
    doc_titre:'Comprendre la première échographie',
    doc:'La première échographie a lieu entre 11 et 13 SA. Elle sert à dater précisément la grossesse, mesurer la clarté nucale (un espace à la nuque de bébé qui aide à évaluer le risque de trisomie 21), et voir le cœur battre. C\'est souvent le moment le plus marquant du 1er trimestre pour les deux parents.',
    conseil:'La première échographie approche. Sois pleinement présent — téléphone en mode silencieux, filme si tu peux.',
    idee_label:'Réserve ce rendez-vous dans ton agenda maintenant. C\'est un moment à vivre ensemble, pas à manquer.',
    bebe_dev:'Les ongles apparaissent. Bébé fait des petits mouvements visibles à l\'échographie. Le foie commence à produire de la bile. La période embryonnaire est terminée.',
    bebe_organes:'Foie : production de bile débutante. Intestins : retour dans l\'abdomen. Ongles : premiers kératinisés. Thyroïde : fonctionnelle. Cerveau : premières circonvolutions.',
    bebe_anecdote:'À 10 SA, tous les organes essentiels sont en place. Les 30 semaines suivantes serviront uniquement à les faire grandir et maturer. Le plan de construction est terminé.',
    bebe_faq:'Quand annoncer la grossesse ? La plupart des couples attendent 12 SA — après la première échographie qui confirme que tout va bien. Rien n\'oblige à attendre, c\'est une décision personnelle.',
  },
  11:{
    emoji:'🍋', taille:'4 cm', poids:'7g',
    titre:'Les os commencent à se solidifier',
    intro:'À 11 SA, bébé mesure 4 cm — comme un bouchon de vin. Les os se solidifient progressivement. Le fœtus avale du liquide amniotique, entraînant ses futurs réflexes.',
    maman_titre:'Le ventre commence légèrement à s\'arrondir',
    maman:'Le ventre commence à pointer, surtout visible pour les femmes minces ou en deuxième grossesse. La peau peut changer : la linea nigra (une ligne brune sur le ventre) peut apparaître. Les cheveux et ongles poussent plus vite grâce aux œstrogènes.',
    maman_aide:'Si elle se sent mal dans son corps, ta bienveillance et tes retours positifs comptent beaucoup. Accompagne-la si elle veut chercher des vêtements de grossesse.',
    maman_signe:'La linea nigra est une pigmentation normale causée par les hormones. Elle disparaît spontanément après l\'accouchement.',
    alerte:'Les saignements légers après un rapport sexuel sont possibles et sans danger — le col est très vascularisé pendant la grossesse. Si abondants, appeler le médecin.',
    savistu:'Les dents de lait de bébé sont déjà en formation à 11 SA — elles ne perceront qu\'environ 6 mois après la naissance.',
    doc_titre:'La déclaration de grossesse à la Sécu',
    doc:'Avant 15 SA, la grossesse doit être déclarée à la Sécurité sociale sur ameli.fr — c\'est obligatoire et ça ouvre les droits aux remboursements à 100% des soins liés à la grossesse. C\'est aussi le moment de prévenir la mutuelle complémentaire.',
    conseil:'Accompagne-la chercher ses premiers vêtements de grossesse si elle en a envie. C\'est souvent un moment où elle se sent mal dans son corps.',
    idee_label:'Commencez à parler des prénoms — une conversation légère et joyeuse pour vous projeter ensemble.',
    bebe_dev:'Les dents de lait se forment sous les gencives. Le fœtus avale et inhale du liquide amniotique, entraînant ses futurs réflexes. Les os commencent à se solidifier par ossification.',
    bebe_organes:'Os : ossification débutante. Dents : bourgeons sous gencives. Muscles : contractions volontaires possibles. Foie : 10% de la masse corporelle totale.',
    bebe_anecdote:'À 11 SA, le fœtus peut distinguer les sons graves de l\'extérieur — ta voix, plus grave, est l\'une des mieux perçues. Commence à lui parler.',
    bebe_faq:'La linea nigra est-elle permanente ? Non, elle disparaît dans les mois suivant l\'accouchement. Peut-elle se teindre les cheveux ? Les teintures sont déconseillées au 1er trimestre, tolérées ensuite avec des produits sans ammoniaque.',
  },
  12:{
    emoji:'🍋', taille:'5.4 cm', poids:'14g',
    titre:'La fin du 1er trimestre — un cap majeur',
    intro:'À 12 SA, bébé mesure 5,4 cm — comme une balle de golf. Le risque de fausse couche chute fortement après cette semaine. Le visage est pleinement reconnaissable. C\'est la semaine de l\'échographie T1.',
    maman_titre:'Un soulagement souvent palpable',
    maman:'Le passage de 12 SA est souvent vécu comme une libération émotionnelle. L\'énergie revient progressivement. L\'utérus dépasse maintenant le bassin — le ventre commence à être visible. Le risque de fausse couche passe sous 2%.',
    maman_aide:'C\'est le moment d\'annoncer la grossesse si vous le souhaitez. Accompagne-la dans cette réflexion.',
    maman_signe:'Après 12 SA, le risque de fausse couche tombe en dessous de 2%. Chaque semaine qui passe renforce encore cette sécurité.',
    alerte:'L\'échographie T1 mesure la clarté nucale — un espace à la nuque du bébé. Si elle est augmentée, des examens complémentaires sont proposés pour évaluer le risque de trisomie 21. Ce n\'est pas un diagnostic, juste un dépistage.',
    savistu:'Après 12 SA, le risque de fausse couche passe sous 2%. C\'est pour ça que beaucoup de couples attendent ce cap pour annoncer.',
    doc_titre:'L\'échographie T1 expliquée',
    doc:'L\'échographie du 1er trimestre se fait entre 11 et 13 SA. Elle mesure la longueur du fœtus pour dater précisément la grossesse, examine le cœur, et mesure la clarté nucale (un espace entre la nuque et la peau). Une clarté nucale augmentée peut indiquer un risque de trisomie 21 — le médecin proposera alors un dépistage sanguin complémentaire. C\'est un examen de dépistage, pas un diagnostic.',
    conseil:'L\'échographie T1 est un rendez-vous majeur. Sois là, sans exception. Apporte ton téléphone chargé pour filmer.',
    idee_label:'Annoncez la grossesse à la famille — c\'est le bon moment si vous avez attendu les 12 SA.',
    bebe_dev:'Fin du 1er trimestre. Le visage est pleinement reconnaissable avec ses traits humains. L\'échographie T1 est réalisée cette semaine. Les reins commencent à produire de l\'urine.',
    bebe_organes:'Cerveau : hémisphères bien séparés. Reins : production d\'urine débutante. Intestins : dans l\'abdomen définitivement. Poumons : premières inspirations de liquide.',
    bebe_anecdote:'À 12 SA, le fœtus boit environ 15 ml de liquide amniotique par jour et urine dans ce même liquide — recyclé toutes les 3 heures par le placenta. Un système parfaitement autonome.',
    bebe_faq:'Qu\'est-ce que la trisomie 21 ? C\'est une anomalie chromosomique (un chromosome 21 en trop) qui entraîne un handicap intellectuel et physique. Le dépistage prénatal permet de l\'évaluer — ce n\'est pas une condamnation, et la décision d\'approfondir les examens appartient entièrement aux parents.',
  },
  13:{emoji:'🍑',taille:'7.4 cm',poids:'23g',titre:'Bébé peut sucer son pouce',intro:'À 13 SA, bébé mesure 7,4 cm — comme un marqueur. Le 2e trimestre commence. Bébé peut sucer son pouce. Les empreintes digitales sont définitives.',maman_titre:'Le trimestre le plus confortable souvent débute',maman:'L\'énergie revient souvent avec le 2e trimestre. Les nausées disparaissent pour la plupart des femmes. La libido peut augmenter. Le ventre s\'arrondit de façon agréable.',maman_aide:'C\'est le bon moment pour un week-end en amoureux — énergie revenue, ventre encore gérable.',maman_signe:'Le 2e trimestre est souvent décrit comme la lune de miel de la grossesse — profitez-en.',alerte:'Les douleurs ligamentaires dans le bas du ventre sont fréquentes au 2e trimestre — c\'est l\'étirement des ligaments ronds qui soutiennent l\'utérus. Normales et sans gravité.',savistu:'Bébé peut sucer son pouce dès 13 SA. Ce réflexe entraîné in utero sera essentiel pour s\'alimenter après la naissance.',doc_titre:'Le congé paternité — comment ça marche',doc:'Le congé paternité en France dure 25 jours calendaires (week-ends inclus), dont 4 obligatoires à prendre dans les jours suivant la naissance. Il est indemnisé à 100% du salaire net dans la limite du plafond de la Sécurité sociale. À déclarer à ton employeur au moins 1 mois avant la date prévue.',conseil:'C\'est le bon moment pour annoncer officiellement. Commencez à vous projeter ensemble : prénoms, organisation.',idee_label:'Réserve un dîner dans son restaurant préféré — une soirée normale, juste vous deux.',bebe_dev:'Bébé peut sucer son pouce. Les empreintes digitales sont définitives. Le système urinaire fonctionne : bébé urine dans le liquide amniotique.',bebe_organes:'Cordes vocales : premières structures. Pouce : succion active. Pancréas : insuline sécrétée. Rate : production de globules blancs.',bebe_anecdote:'Les empreintes digitales de bébé se forment définitivement à 13 SA. Elles résultent d\'interactions aléatoires entre la pression cutanée et la croissance des cellules — un processus unique à chaque individu.',bebe_faq:'Comment déclarer le congé paternité ? Auprès de l\'employeur et de la CPAM. Il peut être fractionné en 2 périodes. L\'employeur ne peut pas le refuser.'},
  14:{emoji:'🍑',taille:'8.7 cm',poids:'43g',titre:'Le sexe de bébé parfois visible',intro:'À 14 SA, bébé mesure 8,7 cm — comme une télécommande. Les reins fonctionnent. Le sexe peut parfois être deviné à l\'échographie.',maman_titre:'Le ventre s\'arrondit clairement',maman:'Le ventre s\'arrondit clairement. La libido est souvent revenue. Des douleurs ligamentaires dans le bas du ventre peuvent apparaître — c\'est l\'étirement normal des ligaments ronds. Le volume sanguin augmente de 40% sur toute la grossesse.',maman_aide:'Proposez un week-end en amoureux — c\'est maintenant que c\'est le plus facile à organiser.',maman_signe:'L\'augmentation du volume sanguin explique les palpitations et la légère baisse de tension parfois ressenties.',alerte:'Les douleurs ligamentaires sont vives mais normales. Si elles sont accompagnées de fièvre ou de saignements, consulter.',savistu:'À 14 SA, le visage de bébé peut produire une trentaine d\'expressions différentes — le système nerveux est déjà très développé.',doc_titre:'Les droits et aides pendant la grossesse',doc:'La grossesse ouvre des droits spécifiques : remboursement à 100% des soins liés à la grossesse par la Sécu, congé maternité (16 semaines pour le 1er enfant), allocations de la CAF (Prime à la naissance). Renseignez-vous sur ameli.fr et caf.fr pour ne rien manquer.',conseil:'Proposez un week-end en amoureux. Le 2e trimestre est la fenêtre idéale — énergie revenue, ventre encore gérable.',idee_label:'Offre-lui un massage prénatal en institut ou à domicile.',bebe_dev:'Les reins fonctionnent et filtrent le sang. Le fœtus produit de l\'urine dans le liquide amniotique, qu\'il avale ensuite — cycle normal de filtration.',bebe_organes:'Reins : filtration active. Placenta : pleinement fonctionnel. Thymus : maturation immunitaire. Sang : groupe sanguin défini.',bebe_anecdote:'Le placenta à 14 SA produit suffisamment d\'hormones pour maintenir la grossesse seul — le corps jaune qui prenait le relais depuis le début peut disparaître.',bebe_faq:'Peut-on découvrir le sexe à l\'échographie ? À 14 SA, c\'est possible mais pas certain. L\'échographie T2 à 22 SA est beaucoup plus fiable pour ça.'},
  15:{emoji:'🍎',taille:'10 cm',poids:'70g',titre:'Bébé entend pour la première fois',intro:'À 15 SA, bébé mesure 10 cm — comme une balle de squash. Il entend pour la première fois. Les vibrations sonores traversent le liquide amniotique. Les voix graves — comme la tienne — sont parmi les mieux perçues.',maman_titre:'Les premiers mouvements bientôt',maman:'La prise de poids devient visible. Des vergetures peuvent apparaître sur les seins, le ventre ou les hanches — c\'est génétique, pas lié à la qualité de la peau. Le système cardiovasculaire travaille davantage avec l\'augmentation du volume sanguin.',maman_aide:'Propose une huile ou crème hydratante pour le ventre chaque soir — pas pour prévenir les vergetures (impossible), mais pour le confort et la connexion.',maman_signe:'Les vergetures sont génétiquement déterminées. Aucune crème ne peut totalement les prévenir, mais l\'hydratation limite l\'inconfort.',alerte:'Si elle ressent les premiers mouvements de bébé, c\'est normal entre 16 et 20 SA. Avant, les mouvements existent mais ne sont pas perceptibles.',savistu:'Les voix masculines, plus graves, traversent mieux le liquide amniotique. Ta voix est l\'une des mieux perçues par bébé in utero.',doc_titre:'Parler à bébé — ce que la science dit',doc:'Des études montrent que les nouveau-nés reconnaissent les voix entendues in utero et y réagissent différemment. Parler à bébé chaque soir n\'est pas symbolique — c\'est le début concret de votre relation. Ça peut sembler bizarre au début. Fais-le quand même.',conseil:'Parle à bébé chaque soir. Il reconnaîtra ta voix à la naissance.',idee_label:'Crée un album photo de la grossesse — commence maintenant avec les premières semaines.',bebe_dev:'Bébé entend pour la première fois. Le squelette se solidifie progressivement. Le sens de l\'odorat se développe.',bebe_organes:'Oreilles : cochlée fonctionnelle. Os : solidification avancée. Peau : duvet léger (lanugo) qui apparaît. Graisses : dépôts bruns débutants.',bebe_anecdote:'Les chercheurs ont montré que les bébés dont les mères ont regardé un feuilleton pendant la grossesse reconnaissent son générique à la naissance et se calment en l\'entendant.',bebe_faq:'Faut-il lui jouer de la musique ? Pas obligatoire, mais ça ne fait pas de mal. Évite les sons très forts directement sur le ventre. Ta voix naturelle est ce qui compte le plus.'},
  16:{emoji:'🥑',taille:'11.6 cm',poids:'100g',titre:'Les premiers mouvements approchent',intro:'À 16 SA, bébé mesure 11,6 cm — comme un avocat. Le squelette se renforce. Les yeux peuvent percevoir la lumière. Les premières sensations de mouvement peuvent apparaître pour la mère.',maman_titre:'Les "papillons" dans le ventre',maman:'Les premiers mouvements de bébé peuvent être perçus — souvent décrits comme des bulles ou des papillons dans le ventre. La pression sur la vessie augmente avec la croissance de l\'utérus. Des crampes dans les jambes peuvent apparaître la nuit.',maman_aide:'Pose ta main sur son ventre le soir. Même si tu ne sens encore rien, ce rituel crée une connexion réelle pour vous trois.',maman_signe:'Les premiers mouvements sentis par la mère s\'appellent les "quickenings" — ils sont souvent confondus avec des gaz au début.',alerte:'Si tu entends parler d\'anémie lors de la prochaine prise de sang, c\'est fréquent en grossesse — les globules rouges doivent irriguer deux corps. Un supplément en fer peut être prescrit.',savistu:'À 16 SA, le fœtus peut attraper son propre cordon ombilical — comportement exploratoire qui témoigne du développement de sa coordination.',doc_titre:'Réserver les cours de préparation à l\'accouchement',doc:'Les cours de préparation à l\'accouchement sont remboursés par la Sécurité sociale (jusqu\'à 8 séances). Ils se remplissent vite, surtout en ville. Des cours spécifiques pour les pères existent — renseigne-toi auprès de la maternité. C\'est le moment de les réserver.',conseil:'Réserve les cours de préparation à l\'accouchement maintenant — ils se remplissent vite.',idee_label:'Propose une soirée à construire la liste de naissance ensemble — pratique et agréable.',bebe_dev:'Le squelette se renforce — le cartilage se transforme progressivement en os. Les yeux perçoivent la lumière. Le système nerveux central coordonne mieux les mouvements.',bebe_organes:'Os : ossification à 60%. Yeux : sensibles à la lumière. Cordon : 3 vaisseaux distincts. Liquide amniotique : environ 200 ml.',bebe_anecdote:'Le liquide amniotique est entièrement renouvelé toutes les 3 heures. Bébé avale, filtre, urine — un recyclage parfait qui maintient une composition stable.',bebe_faq:'L\'anémie de grossesse, c\'est grave ? Non, c\'est très courant. Elle se traite facilement avec un supplément en fer prescrit par le médecin et une alimentation riche en fer (viande rouge, légumes verts).'},
  17:{emoji:'🍐',taille:'13 cm',poids:'140g',titre:'La graisse brune commence à se former',intro:'À 17 SA, bébé mesure 13 cm — comme un iPhone. Une couche de graisse brune se forme sous la peau — elle servira à réguler la température corporelle après la naissance.',maman_titre:'Le "baby brain" — oui, c\'est réel',maman:'La mémoire peut sembler défaillante. Des études IRM confirment une réorganisation neurologique pendant la grossesse — le cerveau se reconfigure pour développer les circuits de l\'attachement maternel. C\'est temporaire. Des douleurs dans les côtes peuvent aussi apparaître.',maman_aide:'Ne te moque pas du "baby brain" — c\'est un phénomène documenté qui peut être frustrant à vivre.',maman_signe:'La réorganisation neurologique de la grossesse renforce les circuits émotionnels et de l\'attachement — au détriment temporaire de certaines fonctions cognitives.',alerte:'Des douleurs dans les côtes sont normales — l\'utérus pousse sur les côtes inférieures avec la croissance de bébé.',savistu:'Les empreintes de la paume de bébé se forment à 17 SA — uniques, résultant d\'interactions aléatoires entre tension cutanée et prolifération cellulaire.',doc_titre:'La myélinisation du cerveau',doc:'La myélinisation est le processus qui enveloppe les neurones d\'une gaine protectrice pour accélérer la transmission des signaux nerveux. Elle commence à 17 SA dans certaines zones. Ce processus se poursuivra jusqu\'à 25 ans pour les lobes frontaux (siège du raisonnement et du contrôle des émotions).',conseil:'Pose ta main sur son ventre le soir en parlant à bébé. Ce rituel crée une connexion émotionnelle réelle.',idee_label:'Offre-lui le coussin de grossesse — il change tout pour le sommeil.',bebe_dev:'La graisse brune se forme sous la peau pour réguler la température après la naissance. Bébé s\'entraîne à avaler et respirer le liquide amniotique.',bebe_organes:'Graisse brune : thermogenèse préparée. Méconium : premiers résidus intestinaux. Peau : vernix caseosa en dépôt. Cerveau : gyri et sulci visibles.',bebe_anecdote:'Le "pregnancy brain" est réel — des études IRM montrent une réduction de la matière grise au T2 et T3, liée à une restructuration neurologique qui rend la mère plus attentive aux signaux émotionnels de son bébé.',bebe_faq:'Peut-elle voyager en avion ? Oui jusqu\'à 36 SA pour la plupart des compagnies — vérifier les conditions de la compagnie. Prévoir un certificat médical si proche du terme.'},
  18:{emoji:'🫑',taille:'14.2 cm',poids:'190g',titre:'Le sens du toucher se développe',intro:'À 18 SA, bébé mesure 14,2 cm — comme un stylo épais. Il développe son sens du toucher, explore son environnement avec ses mains. Il peut entendre la musique que vous écoutez.',maman_titre:'Le dos commence à souffrir',maman:'La lordose lombaire s\'accentue — la courbe naturelle du bas du dos se creuse pour compenser le poids croissant du ventre. Des crampes nocturnes dans les mollets sont fréquentes.',maman_aide:'Massages du dos réguliers — pas besoin d\'être expert, une pression douce sur le bas du dos suffit. Ce geste quotidien soulage vraiment.',maman_signe:'La myélinisation nerveuse commence — les connexions entre les nerfs se protègent progressivement d\'une gaine isolante.',alerte:'Des crampes nocturnes dans les mollets peuvent signaler un déficit en magnésium. Mentionner au médecin — une supplémentation peut être prescrite.',savistu:'À 18 SA, bébé peut entendre la musique que vous écoutez ensemble. Des études suggèrent qu\'il reconnaît certaines mélodies après la naissance.',doc_titre:'La kiné pelvienne — c\'est quoi et pourquoi c\'est important',doc:'La kinésithérapie pelvienne prénatale renforce et prépare le périnée à l\'accouchement, prévient les fuites urinaires post-partum, et aide à mieux gérer la douleur pendant le travail. La HAS (Haute Autorité de Santé) recommande de la proposer à toutes les femmes enceintes dès le 2e trimestre. Si ce n\'est pas encore prescrit, rappeler au médecin.',conseil:'Propose des massages du dos régulièrement — quelques minutes suffisent et ça change tout.',idee_label:'Commencez à préparer la chambre de bébé ensemble ce mois-ci.',bebe_dev:'Le sens du toucher est très développé. Le système vestibulaire — qui gère l\'équilibre — se met en place. Les os se solidifient davantage.',bebe_organes:'Système vestibulaire : équilibre actif. Toucher : récepteurs cutanés fonctionnels. Myéline : gaine nerveuse en formation. Vertèbres : ossification avancée.',bebe_anecdote:'La myélinisation nerveuse commence à 18 SA dans certaines zones du cerveau. Ce processus, qui protège les neurones et accélère les signaux nerveux, se poursuivra jusqu\'à 25 ans pour les lobes frontaux.',bebe_faq:'La diastasis des muscles abdominaux pendant la grossesse, c\'est quoi ? C\'est l\'écartement normal des muscles grands droits de l\'abdomen pour laisser place à l\'utérus. Elle se résorbe seule après l\'accouchement dans la plupart des cas, avec de la kiné si besoin.'},
  19:{emoji:'🥭',taille:'15.3 cm',poids:'240g',titre:'Tous les sens s\'éveillent',intro:'À 19 SA, bébé mesure 15,3 cm — comme une canette de soda. Tous ses sens se développent rapidement. Le vernix caseosa — un enduit blanc et gras — commence à recouvrir sa peau.',maman_titre:'Le ventre est très visible',maman:'Le ventre est désormais très visible pour l\'entourage. Des problèmes de congestion nasale peuvent apparaître — le volume sanguin augmenté gonfle les muqueuses. Le centre de gravité commence à se modifier, changeant la posture.',maman_aide:'Un humidificateur dans la chambre aide pour la congestion nasale. C\'est aussi le moment de commander le coussin de grossesse si ce n\'est pas encore fait.',maman_signe:'La congestion nasale de grossesse est causée par le gonflement des muqueuses lié à l\'augmentation du volume sanguin. Ce n\'est pas un rhume.',alerte:'Évite les peintures et rénovations dans la chambre de bébé pendant la grossesse — certains produits contiennent des perturbateurs endocriniens. Privilégie les peintures A+ et aère au minimum 3 semaines.',savistu:'Le cerveau de bébé produit 250 000 nouvelles cellules nerveuses par minute à 19 SA — une des phases les plus intenses.',doc_titre:'Ce que bébé goûte in utero',doc:'Bébé peut goûter le liquide amniotique à 19 SA. Ce liquide reflète les saveurs de l\'alimentation maternelle. Des études montrent que les bébés dont les mères ont mangé de l\'ail ou de la vanille pendant la grossesse les reconnaissent et les apprécient davantage après la naissance. La diversité alimentaire de la mère prépare les préférences futures de bébé.',conseil:'Préparez la chambre de bébé ensemble ce mois-ci — moment de complicité fort.',idee_label:'Établissez la liste de naissance ensemble — pratique pour la famille et agréable à faire.',bebe_dev:'Tous les sens se développent rapidement. Le vernix caseosa protège la peau fragile de bébé du liquide amniotique. Les cellules cérébrales se multiplient intensément.',bebe_organes:'Sens : tous 5 en activation simultanée. Peau : vernix protecteur. Rétine : photorécepteurs. Papilles gustatives : fonctionnelles. Récepteurs olfactifs : actifs.',bebe_anecdote:'Bébé goûte le liquide amniotique à 19 SA. Des études ont montré que les bébés dont les mères ont mangé de l\'ail in utero l\'apprécient davantage après la naissance.',bebe_faq:'Faut-il éviter les peintures pour la chambre de bébé ? Oui pendant la grossesse — utilise des peintures certifiées A+ et laisse aérer au minimum 3 semaines avant l\'installation de bébé.'},
  20:{emoji:'🍌',taille:'16.4 cm',poids:'300g',titre:'La mi-grossesse — cap symbolique',intro:'À 20 SA, bébé mesure 16,4 cm — comme un livre de poche. C\'est la mi-grossesse. L\'échographie morphologique T2 est réalisée cette semaine — c\'est la plus importante de la grossesse.',maman_titre:'L\'échographie T2 — un moment fort',maman:'L\'échographie T2 est souvent vécue avec une anxiété mêlée d\'excitation. C\'est le rendez-vous médical le plus attendu de la grossesse. Elle peut durer de 45 à 90 minutes selon la coopération de bébé.',maman_aide:'Prends une demi-journée de congé pour cet examen. Préparez vos questions en amont. Filmez si possible.',maman_signe:'L\'échographie T2 examine plus de 100 critères anatomiques. Si le médecin souhaite revoir un point, c\'est souvent par précaution — ne pas paniquer avant d\'avoir les explications.',alerte:'L\'échographie T2 peut parfois ne pas voir certaines anomalies — ce n\'est pas un examen parfait. Si un doute est exprimé, des examens complémentaires seront proposés.',savistu:'L\'échographie morphologique T2 examine plus de 100 critères anatomiques en 45 à 90 minutes.',doc_titre:'Ce que l\'écho T2 regarde',doc:'L\'échographie morphologique T2 examine en détail chaque organe (cerveau, cœur à 4 cavités, reins, estomac), chaque membre, le visage, la colonne vertébrale, et la position du placenta. Elle permet aussi généralement de connaître le sexe de bébé si les parents le souhaitent. C\'est réalisé par un médecin spécialisé en échographie fœtale.',conseil:'Prends une demi-journée de congé pour cette échographie. Filmez. C\'est un moment à vivre pleinement.',idee_label:'Célébrez la mi-grossesse — un dîner, une sortie, un moment rien qu\'à vous.',bebe_dev:'Mi-grossesse. L\'échographie T2 vérifie tous les organes. Bébé est recouvert d\'un enduit protecteur (vernix caseosa). Le sexe est généralement visible.',bebe_organes:'Tous systèmes vérifiés à l\'écho T2 : cerveau, cœur 4 cavités, reins, membres, lèvres palatines, colonne vertébrale.',bebe_anecdote:'À 20 SA, bébé a parcouru la moitié du chemin. Les 20 semaines suivantes serviront principalement à la croissance et à la maturation — la construction est presque terminée.',bebe_faq:'Le sexe de bébé — peut-on vraiment le voir à l\'écho T2 ? Oui, dans la grande majorité des cas. Mais bébé peut ne pas coopérer ! Si la position ne permet pas de voir, le médecin essaiera de nouveau en fin d\'examen.'},
  21:{emoji:'🥕',taille:'26.7 cm',poids:'360g',titre:'Bébé a son propre rythme veille-sommeil',intro:'À 21 SA, bébé mesure 26,7 cm — comme une bouteille de 33cl. Il a maintenant un cycle veille-sommeil distinct. Il dort environ 12 à 14 heures par jour dans le ventre.',maman_titre:'Le ventre est bien là',maman:'Le ventre est très visible. Des problèmes de digestion et de reflux peuvent apparaître — l\'utérus commence à comprimer l\'estomac. La posture change, ce qui peut provoquer des douleurs dorsales.',maman_aide:'Des repas plus petits et plus fréquents aident avec les reflux. Surélever légèrement la tête du lit peut aussi aider pour la nuit.',maman_signe:'Le reflux de grossesse est causé par la compression de l\'estomac par l\'utérus et par le relâchement du sphincter œsophagien dû aux hormones.',alerte:'Le lanugo — un duvet fin sur le corps de bébé — est parfois visible à l\'échographie. C\'est normal et il disparaît avant ou peu après la naissance.',savistu:'Bébé est souvent le plus actif quand sa mère est au repos — les mouvements de la marche l\'endorment, comme un bercement naturel.',doc_titre:'La liste de naissance — comment bien la faire',doc:'La liste de naissance est utile pour guider la famille et les amis. Conseil : inclure des articles à différents prix, prioriser l\'essentiel (siège auto, lit, poussette), éviter la surenchère. Les groupes Facebook de parents locaux et les sites de revente permettent d\'acquérir certains articles en très bon état pour bien moins cher.',conseil:'Installe une veilleuse dans la chambre de bébé — premier geste concret pour préparer l\'espace.',idee_label:'Visitez la maternité ensemble ce mois-ci pour vous repérer.',bebe_dev:'Bébé a un cycle veille-sommeil distinct — il dort environ 12-14h/jour. Les mouvements sont de plus en plus coordonnés.',bebe_organes:'Cycle circadien : actif/inactif 20-30 min. Intestins : méconium s\'accumule. Peau : lanugo couvre le corps. Yeux : mouvements REM actifs.',bebe_anecdote:'Le lanugo est un duvet fin qui couvre le corps de bébé à 21 SA. Vestige évolutif qui servait d\'isolant thermique à nos ancêtres. Il disparaît avant ou peu après la naissance.',bebe_faq:'À partir de quand compter les mouvements de bébé ? À partir de 28 SA, 10 mouvements en 2 heures en période active est le seuil rassurant. En dessous, appeler la maternité.'},
  22:{emoji:'🥭',taille:'27.8 cm',poids:'430g',titre:'Les yeux sont formés',intro:'À 22 SA, bébé mesure 27,8 cm — comme un ballon de handball. Les yeux sont formés mais encore fermés. Les sourcils et cils sont visibles à l\'échographie.',maman_titre:'Les vergetures et crampes nocturnes',maman:'Des vergetures peuvent apparaître sur le ventre, les hanches ou les seins — génétiquement déterminées et non prévenables. Des crampes nocturnes dans les mollets sont fréquentes. La relaxine — une hormone qui prépare le bassin à l\'accouchement — assouplit tous les ligaments du corps.',maman_aide:'Masse son ventre avec de l\'huile chaque soir — pas pour prévenir les vergetures, mais pour le confort et le lien.',maman_signe:'La relaxine assouplit tous les ligaments — pas seulement le bassin. Les chevilles sont plus fragiles pendant la grossesse. Attention aux sols inégaux.',alerte:'La relaxine qui assouplit les ligaments explique pourquoi les entorses sont plus fréquentes pendant la grossesse. Chaussures stables recommandées.',savistu:'Les vergetures sont génétiquement déterminées — elles ne peuvent pas être totalement évitées. L\'hydratation limite l\'inconfort mais pas les vergetures elles-mêmes.',doc_titre:'Le plan de naissance — préparer maintenant',doc:'Le plan de naissance est un document qui résume les souhaits des parents pour l\'accouchement : préférence sur la péridurale, positions souhaitées, présence du père, musique, gestion de la douleur, soins après la naissance. Ce n\'est pas un contrat — l\'équipe médicale l\'adaptera si nécessaire — mais il aide à communiquer vos souhaits.',conseil:'Masse son ventre avec de l\'huile chaque soir — rituel physique et émotionnel qui compte.',idee_label:'Visitez la maternité ensemble pour vous repérer avant le jour J.',bebe_dev:'Les yeux sont formés mais encore fermés. Les cils et sourcils sont visibles. Les poumons produisent du liquide — entraînement précoce à la respiration.',bebe_organes:'Yeux : paupières distinctes. Cils : implantés. Relaxine : ligaments très souples. Poumons : liquide inspiré activement.',bebe_anecdote:'La relaxine agit sur TOUS les ligaments du corps, pas seulement le bassin. C\'est pourquoi les chevilles sont plus fragiles pendant la grossesse.',bebe_faq:'La symphyse pubienne douloureuse (SPD) — c\'est quoi ? C\'est une douleur au niveau de l\'os du pubis causée par l\'assouplissement excessif des ligaments. Elle touche environ 1 femme sur 5. Traitement : kiné pelvienne, et parfois béquilles si sévère.'},
  23:{emoji:'🍊',taille:'28.9 cm',poids:'500g',titre:'Bébé pèse maintenant 500 grammes',intro:'À 23 SA, bébé mesure 28,9 cm — comme une bouteille de 50cl. Il pèse exactement 500 grammes. Il a le hoquet régulièrement — entraînement du diaphragme.',maman_titre:'L\'essoufflement commence',maman:'L\'essoufflement peut apparaître à l\'effort — l\'utérus commence à comprimer le diaphragme. Le ventre est lourd. Des douleurs dans le pubis peuvent survenir (diastasis de la symphyse pubienne) — liées à l\'assouplissement hormonal des ligaments.',maman_aide:'Prends en charge spontanément les corvées physiques lourdes. L\'anticipation est plus précieuse que la réponse à une demande.',maman_signe:'Le diastasis de la symphyse pubienne (SPD) touche environ 1 femme sur 5. Si elle se plaint de douleurs pubiques irradiant les cuisses, insister pour une consultation en kiné pelvienne.',alerte:'Si les douleurs pubiques sont intenses avec boiterie, consulter — une prise en charge en kiné pelvienne est très efficace.',savistu:'Le hoquet de bébé est un entraînement musculaire du diaphragme — préparation à la respiration autonome après la naissance.',doc_titre:'La gelée de Wharton — le protecteur du cordon',doc:'La gelée de Wharton est une substance gélatineuse qui entoure les 3 vaisseaux du cordon ombilical (2 artères + 1 veine). Elle est souple pour que le cordon ne se pince pas lors des mouvements de bébé. Sans elle, chaque mouvement de bébé risquerait d\'interrompre son alimentation.',conseil:'Prends en charge les corvées physiques sans attendre qu\'elle demande. L\'anticipation est plus précieuse.',idee_label:'Préparez ensemble le plan de naissance ce mois-ci.',bebe_dev:'Bébé a le hoquet régulièrement — entraînement du diaphragme. Les ongles sont longs. Le cerveau se développe intensément.',bebe_organes:'Diaphragme : contractions rythmiques. Ongles : kératine visible. Peau : moins transparente. Cerveau : 30 milliards de neurones.',bebe_anecdote:'La gelée de Wharton protège les vaisseaux du cordon ombilical — une mécanique remarquablement simple qui protège l\'alimentation de bébé pendant 9 mois.',bebe_faq:'Doit-on préparer un plan de naissance ? Pas obligatoire, mais très utile. Il permet à l\'équipe médicale de connaître vos souhaits et au père de défendre ces souhaits si elle ne peut plus le faire pendant le travail.'},
  24:{emoji:'🌽',taille:'30 cm',poids:'600g',titre:'Le visage est presque entièrement formé',intro:'À 24 SA, bébé mesure 30 cm — comme une règle. Il reconnaît clairement les voix de ses deux parents. Les poumons produisent du surfactant.',maman_titre:'Le test du diabète gestationnel',maman:'Le test de dépistage du diabète gestationnel (HGPO — hyperglycémie provoquée par voie orale) est prescrit cette semaine. C\'est un test long de 2 heures avec 3 prises de sang. Le diabète gestationnel est un diabète qui apparaît pendant la grossesse et disparaît généralement après.',maman_aide:'Accompagne-la à ce test — 2 heures d\'attente, c\'est long. Ta présence transforme ce moment contraignant en moment partagé.',maman_signe:'Le diabète gestationnel touche environ 10% des femmes enceintes. Bien suivi, il ne présente pas de danger pour bébé.',alerte:'Le diabète gestationnel non traité peut provoquer une macrosomie — bébé trop grand — et une hypoglycémie à la naissance. Avec un suivi adapté, tout se passe bien.',savistu:'Le surfactant produit par les poumons dès 24 SA est vital : sans lui, les alvéoles pulmonaires s\'affaisseraient à chaque expiration. Les très prématurés en ont besoin en injection.',doc_titre:'Comprendre le diabète gestationnel',doc:'Le diabète gestationnel est une intolérance au glucose qui apparaît pendant la grossesse. Il est lié à des hormones placentaires qui réduisent l\'efficacité de l\'insuline. Traitement : régime alimentaire adapté et parfois injections d\'insuline. Il disparaît généralement après l\'accouchement mais augmente le risque de diabète de type 2 plus tard dans la vie.',conseil:'Accompagne-la au test HGPO — 2 heures ensemble est bien plus agréable.',idee_label:'Offre-lui une semaine de repas livrés — le confort au quotidien.',bebe_dev:'Le visage est presque entièrement formé. Bébé reconnaît clairement les voix de ses deux parents. Les poumons produisent du surfactant — substance qui permettra aux alvéoles de ne pas s\'affaisser à la naissance.',bebe_organes:'Surfactant : alvéoles stabilisées. Visage : traits définitifs. Oreilles : reconnaissent les voix. Liquide amniotique : 400-500 ml.',bebe_anecdote:'Un bébé né à 24 SA avec soins intensifs néonataux a environ 50% de chances de survie aujourd\'hui — contre 0% il y a 40 ans. La médecine périnatale a transformé ces pronostics.',bebe_faq:'HGPO — comment s\'y préparer ? À jeun le matin. 3 prises de sang : à jeun, 1h et 2h après absorption d\'un liquide sucré. Résultats en quelques jours.'},
  25:{emoji:'🥬',taille:'34.6 cm',poids:'660g',titre:'Les mouvements sont visibles de l\'extérieur',intro:'À 25 SA, bébé mesure 34,6 cm — comme un rouleau d\'essuie-tout. Les mouvements sont désormais visibles de l\'extérieur du ventre.',maman_titre:'Les jambes lourdes s\'installent',maman:'Les jambes lourdes et les varices sont fréquentes — l\'utérus comprime les veines qui ramènent le sang des jambes vers le cœur. Des bas de contention (classe 2) peuvent être prescrits. Le sommeil est de plus en plus perturbé.',maman_aide:'Bain de pieds chaud le soir + massage des mollets. Ces attentions régulières comptent plus qu\'un grand geste isolé.',maman_signe:'Les varices de grossesse régressent souvent d\'elles-mêmes après l\'accouchement. Les bas de contention les soulage et préviennent les complications.',alerte:'En cas de douleur dans le mollet avec rougeur et chaleur, consulter rapidement — risque de phlébite (caillot dans une veine) plus élevé pendant la grossesse.',savistu:'À 25 SA, bébé stocke de la graisse brune — la seule graisse dont la fonction est de produire de la chaleur pour maintenir sa température après la naissance.',doc_titre:'La veine cave inférieure et pourquoi dormir sur le côté gauche',doc:'L\'utérus comprime la veine cave inférieure (grande veine qui ramène le sang des jambes vers le cœur) quand on s\'allonge sur le dos. En position dorsale, le retour sanguin est réduit, ce qui peut provoquer des étourdissements. C\'est pourquoi le côté gauche est recommandé pour dormir — il libère la veine cave et améliore la circulation vers le placenta.',conseil:'Bain de pieds chaud le soir. Ce geste simple change beaucoup.',idee_label:'Offre-lui le coussin de grossesse si ce n\'est pas encore fait — essentiel pour le sommeil.',bebe_dev:'Les mouvements sont visibles de l\'extérieur. Bébé accumule de la graisse sous-cutanée.',bebe_organes:'Graisse brune : thermogenèse. Varices : compression veineuse. Rétine : photorécepteurs actifs. Liquide amniotique : environ 500 ml.',bebe_anecdote:'La veine cave inférieure est comprimée par l\'utérus en position allongée sur le dos — c\'est pourquoi le côté gauche est recommandé pour dormir dès 20 SA.',bebe_faq:'Les hémorroïdes pendant la grossesse — comment les traiter ? Elles touchent 30-40% des femmes au 3e trimestre. Régime riche en fibres, bonne hydratation, ne pas rester assis longtemps. Des crèmes topiques autorisées existent.'},
  26:{emoji:'🥦',taille:'35.6 cm',poids:'760g',titre:'Les yeux s\'ouvrent pour la première fois',intro:'À 26 SA, bébé mesure 35,6 cm — comme une raquette de ping-pong. Ses yeux s\'ouvrent pour la première fois. Il peut voir la lumière qui filtre à travers la paroi abdominale.',maman_titre:'Le sommeil devient difficile',maman:'Le sommeil est difficile — trouver une position confortable est un défi croissant. La position dorsale gauche est recommandée pour ne pas comprimer la veine cave inférieure. Des reflux nocturnes peuvent aussi interrompre le sommeil.',maman_aide:'Un coussin de grossesse change radicalement la qualité du sommeil. Surélever légèrement la tête du lit aide pour les reflux.',maman_signe:'Le reflux nocturne est causé par la compression de l\'estomac et le relâchement hormonal du sphincter œsophagien.',alerte:'La diastasis des muscles grands droits touche 60% des femmes au 3e trimestre. Elle se manifeste par un renflement médian à l\'effort. La kiné pelvienne aide à la prévenir.',savistu:'Bébé ouvre les yeux pour la première fois à 26 SA. La couleur des yeux à la naissance est presque toujours bleue ou grise — la mélanine se développe dans les semaines suivantes.',doc_titre:'Comprendre la diastasis abdominale',doc:'La diastasis des muscles grands droits est l\'écartement des deux colonnes musculaires abdominales pour laisser place à l\'utérus. Elle touche 60% des femmes au 3e trimestre. Elle n\'est pas douloureuse mais peut affaiblir le gainage. La kiné pelvienne prénatale aide à la gérer, et les exercices d\'abdos en crochet (planche, gainage doux) sont à préférer aux crunch classiques.',conseil:'Commander le coussin de grossesse maintenant si ce n\'est pas fait — ça change tout pour le sommeil.',idee_label:'Finalisez le plan de naissance ensemble ce mois-ci.',bebe_dev:'Les yeux s\'ouvrent pour la première fois. Bébé peut voir la lumière. Le cerveau atteint une complexité suffisante pour rêver.',bebe_organes:'Yeux : paupières s\'ouvrent. Rêves : activité REM documentée. Progestérone : reflux possible. Utérus : hauteur 26 cm.',bebe_anecdote:'Le sommeil sur le côté gauche favorise le retour veineux et améliore la circulation placentaire. Une précaution simple mais efficace.',bebe_faq:'La diastasis abdominale se traite-t-elle seule ? Souvent oui après l\'accouchement. La kiné pelvienne accélère la récupération. Évite les exercices d\'abdos creux et les crunch pendant la grossesse.'},
  27:{emoji:'🥬',taille:'36.6 cm',poids:'875g',titre:'Bébé peut rêver',intro:'À 27 SA, bébé mesure 36,6 cm — comme une bouteille de vin. Il peut rêver — son activité cérébrale pendant le sommeil est similaire à celle d\'un adulte en phase REM. C\'est la fin du 2e trimestre.',maman_titre:'La fin du trimestre le plus confortable',maman:'C\'est souvent la fin de la période la plus agréable de la grossesse. La fatigue revient progressivement. L\'anxiété autour de l\'accouchement peut commencer à se manifester — c\'est normal et sain.',maman_aide:'Parler de vos angoisses respectives sur l\'accouchement — ça libère et ça rapproche.',maman_signe:'L\'anxiété pré-accouchement est normale et documentée. Elle pousse à se préparer — c\'est adaptatif.',alerte:'Les anticorps maternels commencent à traverser le placenta pour immuniser bébé. La vaccination anticoqueluche de la mère (et du père) protégera bébé les premiers mois de vie avant sa propre vaccination.',savistu:'Les recherches montrent que bébé entre en sommeil paradoxal (REM) à partir de 27 SA — phase associée au traitement des émotions.',doc_titre:'Pourquoi se vacciner contre la coqueluche pendant la grossesse',doc:'La coqueluche est une maladie respiratoire grave pour les nourrissons de moins de 3 mois — trop jeunes pour être vaccinés. La vaccination de la mère pendant la grossesse (et du père) permet de transférer des anticorps à bébé avant la naissance. C\'est la principale protection disponible pour les premiers mois. Recommandée à tous les adultes qui seront en contact avec bébé.',conseil:'Planifiez votre plan de naissance ensemble ce mois-ci.',idee_label:'Déposez le plan de naissance à la maternité lors d\'une visite.',bebe_dev:'Bébé peut rêver. Fin du 2e trimestre. Mouvements coordonnés complexes.',bebe_organes:'Rêves : activité cérébrale REM. Immunité : anticorps maternels transmis. Peau : moins ridée. Ouïe : discrimination des voix.',bebe_anecdote:'Les anticorps maternels traversent le placenta à partir de 27 SA pour immuniser bébé avant la naissance. C\'est pour ça que la vaccination de la mère protège aussi le nouveau-né.',bebe_faq:'Le plan de naissance — c\'est contraignant pour l\'équipe médicale ? Non. C\'est consultatif. L\'équipe l\'adaptera selon la situation. Mais il aide à communiquer vos souhaits et à réduire l\'anxiété du jour J.'},
  28:{emoji:'🍆',taille:'37.6 cm',poids:'1 kg',titre:'Le début du 3e trimestre',intro:'À 28 SA, bébé pèse maintenant 1 kg — comme un kilo de farine. C\'est le début du 3e trimestre. Le cerveau entre dans une phase de développement accéléré.',maman_titre:'Les contractions de Braxton Hicks',maman:'Les contractions de Braxton Hicks (fausses contractions d\'entraînement) peuvent apparaître — l\'utérus se contracte par intermittence, sans régularité ni douleur intense. L\'essoufflement et les reflux gastriques sont fréquents. Le dos et le bassin supportent un poids croissant.',maman_aide:'Commence à préparer la valise maternité maintenant. Avoir la valise prête tôt évite le stress si le travail commence plus tôt que prévu.',maman_signe:'Les contractions de Braxton Hicks sont des contractions d\'entraînement — l\'utérus se prépare au travail. Elles sont irrégulières et disparaissent en changeant de position.',alerte:'Règle des vraies contractions : régulières + qui s\'intensifient + qui ne disparaissent pas en changeant de position = appeler la maternité.',savistu:'À 28 SA, bébé peut voir la lumière qui filtre à travers la paroi abdominale.',doc_titre:'Distinguer les vraies des fausses contractions',doc:'Les contractions de Braxton Hicks (fausses) : irrégulières, disparaissent en changeant de position, non douloureuses ou légèrement inconfortables. Les vraies contractions : régulières (toutes les 5-10 minutes), s\'intensifient progressivement, ne disparaissent pas en changeant de position. La règle 5-1-1 : contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure = direction maternité.',conseil:'Commence la valise maternité maintenant — pas dans 4 semaines.',idee_label:'Organise une visite de la maternité pour vous repérer avant le grand jour.',bebe_dev:'Début T3. Cerveau en développement accéléré. Vision fonctionnelle.',bebe_organes:'Cerveau : gyri et sulci en multiplication. Vision : acuité 20/400. Reins : 500 ml d\'urine/jour. Poumons : 80% matures.',bebe_anecdote:'Le liquide amniotique atteint son volume maximum à 28 SA (environ 800 ml) puis diminue progressivement jusqu\'au terme.',bebe_faq:'La règle 5-1-1 des contractions — qu\'est-ce que c\'est ? Contractions toutes les 5 minutes, durant 1 minute chacune, depuis au moins 1 heure = appeler la maternité. Valable pour un premier accouchement. Multipares : partir plus tôt.'},
  29:{emoji:'🎃',taille:'38.6 cm',poids:'1.15 kg',titre:'Les mouvements visibles de l\'extérieur',intro:'À 29 SA, bébé mesure 38,6 cm — comme un casque audio. Ses mouvements sont désormais visibles de l\'extérieur du ventre. Les muscles et poumons se renforcent activement.',maman_titre:'L\'insomnie s\'installe',maman:'L\'insomnie s\'installe souvent — difficultés à trouver une position, réveils fréquents pour uriner, inquiétudes. Les contractions de Braxton Hicks peuvent être fréquentes et inquiétantes.',maman_aide:'Si elle est réveillée la nuit, être réveillé avec elle fait une vraie différence. La solitude nocturne est particulièrement difficile en fin de grossesse.',maman_signe:'Un bébé né à 29 SA avec prise en charge néonatale intensive a 90% de chances de survie sans séquelles majeures. Chaque semaine supplémentaire in utero réduit la durée d\'hospitalisation.',alerte:'Apprends la règle 5-1-1 des contractions. Enregistre le numéro direct des urgences obstétricales de ta maternité dans ton téléphone.',savistu:'Un bébé né à 29 SA a 90% de chances de survie sans séquelles majeures avec une prise en charge néonatale.',doc_titre:'La préparation à l\'accouchement pour les pères',doc:'Des séances de préparation à l\'accouchement spécifiques pour les pères existent dans de nombreuses maternités. Elles couvrent : le déroulement du travail, les signes de début d\'accouchement, comment soutenir sans stresser, les techniques de respiration, la péridurale. Ne pas y aller par peur de se sentir inutile en salle — c\'est exactement l\'inverse qui se passe.',conseil:'Apprends la règle 5-1-1 et enregistre le numéro de la maternité dans ton téléphone.',idee_label:'Prépare des repas à congeler pour le retour à la maison après la naissance.',bebe_dev:'Les mouvements de bébé sont visibles de l\'extérieur. Le système immunitaire commence à se développer.',bebe_organes:'Muscles : masse musculaire +50%. Immunité : anticorps maternels en transfert actif. Poumons : suffisants pour survie ex-utéro.',bebe_anecdote:'La sophrologie, l\'hypnose, la méthode Gasquet ou l\'haptonomie — des alternatives à la préparation classique. L\'haptonomie inclut le père dès le début avec un contact physique spécifique sur le ventre.',bebe_faq:'L\'haptonomie — c\'est quoi ? C\'est une méthode de préparation qui inclut le père dès le début. Tu apprends à entrer en contact avec bébé via des pressions douces sur le ventre. Des études montrent que les bébés répondent à ces contacts spécifiques.'},
  30:{emoji:'🥬',taille:'39.9 cm',poids:'1.3 kg',titre:'Le cerveau se plisse',intro:'À 30 SA, bébé mesure 39,9 cm — comme un livre de 300 pages. Le cerveau se plisse pour augmenter sa surface de traitement. Les poumons sont presque matures.',maman_titre:'La fatigue intense revient',maman:'La fatigue intense de fin de grossesse revient. Le sommeil est difficile. L\'anxiété autour de l\'accouchement peut augmenter. Des œdèmes (gonflements) aux pieds et aux chevilles apparaissent souvent en fin de journée.',maman_aide:'Planifie ton congé paternité maintenant avec ton employeur — un congé bien préparé te permet d\'être pleinement présent.',maman_signe:'Les œdèmes aux chevilles sont normaux en fin de grossesse — liés à la rétention d\'eau et à la compression des veines. S\'ils sont asymétriques ou avec douleur, consulter.',alerte:'Les œdèmes asymétriques (un pied plus gonflé que l\'autre) avec douleur au mollet nécessitent une consultation urgente — risque de phlébite.',savistu:'Le cerveau humain est le seul à se plier sur lui-même pour maximiser sa surface corticale. Un cerveau humain déplié aurait la taille d\'une feuille A3.',doc_titre:'Le congé paternité en détail',doc:'Le congé paternité dure 25 jours calendaires dont 4 obligatoires à prendre dans les 4 jours suivant la naissance. Il est indemnisé à 100% du salaire net dans la limite du plafond Sécu. Il peut être fractionné en 2 périodes. À déclarer à l\'employeur au moins 1 mois avant la date prévue. L\'employeur ne peut pas le refuser.',conseil:'Planifie et confirme ton congé paternité avec ton employeur maintenant.',idee_label:'Réserve une livraison de repas pour les premiers jours après la naissance.',bebe_dev:'Le cerveau se plisse pour augmenter sa surface de traitement. Les poumons presque matures. Prise de poids 200-250g/semaine.',bebe_organes:'Cerveau : sillons et circonvolutions. Poumons : 95% fonctionnels. Graisse : 8% du poids. Position : 60% tête en bas.',bebe_anecdote:'La prise de poids finale de bébé (250g/semaine) est entièrement constituée de graisse de réserve et de croissance musculaire — la phase de finition après 6 mois de construction.',bebe_faq:'Le congé paternité peut-il être fractionné ? Oui, en 2 périodes maximum, à prendre dans les 6 mois suivant la naissance. L\'employeur ne peut pas le refuser.'},
  31:{emoji:'🍍',taille:'41.1 cm',poids:'1.5 kg',titre:'Tous les sens sont opérationnels',intro:'À 31 SA, bébé mesure 41,1 cm — comme un fer à repasser. Tous ses sens sont opérationnels et coordonnés. Il distingue le goût sucré du goût amer.',maman_titre:'Difficultés à marcher longtemps',maman:'Les difficultés à marcher longtemps apparaissent. Des douleurs pelviennes sont fréquentes. Les contractions de Braxton Hicks peuvent être régulières sans être inquiétantes.',maman_aide:'Propose des promenades courtes. L\'activité physique douce est bénéfique jusqu\'à l\'accouchement.',maman_signe:'Si bébé est encore en présentation par le siège à 31 SA, pas d\'inquiétude — la plupart se retournent spontanément avant 36 SA.',alerte:'Si bébé est en siège à 36 SA, une version par manœuvre externe peut être proposée — procédure médicale qui retourne bébé manuellement. Elle réussit dans 60% des cas.',savistu:'Bébé peut distinguer le goût sucré du goût amer dans le liquide amniotique dès 31 SA.',doc_titre:'La présentation par le siège',doc:'Environ 3-4% des bébés restent en présentation par le siège (les fesses en bas) à terme. La version par manœuvre externe (VME) est proposée entre 36 et 37 SA — un médecin retourne bébé manuellement sous surveillance médicale. Elle réussit dans 50-60% des cas. En cas d\'échec, une césarienne programmée est généralement proposée, même si l\'accouchement par le siège voie basse reste possible dans certaines maternités.',conseil:'Propose des promenades courtes. L\'activité physique douce est bénéfique.',idee_label:'Monte et installe les meubles de la chambre de bébé ce mois-ci.',bebe_dev:'Tous les sens opérationnels. Bébé s\'entraîne à la respiration. Goût sucré/amer discriminés.',bebe_organes:'Sens gustatif : sucré/amer discriminés. Respiration : 30-40 mouvements/h. Position : 80% tête en bas.',bebe_anecdote:'Bébé a des préférences alimentaires à 31 SA influencées par l\'alimentation maternelle. Les enfants dont les mères ont mangé varié pendant la grossesse sont souvent plus facilement omnivores.',bebe_faq:'La présentation par le siège — peut-on accoucher normalement ? Dans certaines maternités expertes, oui. Mais la césarienne est souvent proposée par sécurité. La VME (version par manœuvre externe) à 36-37 SA mérite d\'être tentée avant.'},
  32:{emoji:'🥭',taille:'42.4 cm',poids:'1.7 kg',titre:'Bébé se met tête en bas',intro:'À 32 SA, bébé mesure 42,4 cm. Dans la majorité des cas, il se met en position tête en bas — la position idéale pour l\'accouchement. L\'échographie T3 vérifie tout ça.',maman_titre:'L\'échographie T3',maman:'L\'échographie du 3e trimestre (T3) est réalisée cette semaine. Elle vérifie la position de bébé, estime son poids, évalue la quantité de liquide amniotique et l\'état du placenta.',maman_aide:'Accompagne-la à l\'échographie T3 sans faute. Si bébé est en siège, ne dramatise pas — des solutions existent.',maman_signe:'L\'estimation du poids fœtal par échographie a une marge d\'erreur de ±15% — un bébé estimé à 2 kg peut peser entre 1,7 et 2,3 kg. Ne pas trop se fier aux chiffres absolus.',alerte:'Le placenta peut être évalué par "grade" à l\'échographie. Un placenta grade III est normal en fin de grossesse — il ne signifie pas un vieillissement pathologique.',savistu:'L\'estimation du poids fœtal par biométrie échographique a une marge d\'erreur de ±15% — ne pas se focaliser sur les chiffres.',doc_titre:'Ce que l\'écho T3 vérifie',doc:'L\'échographie du 3e trimestre (entre 30 et 35 SA) vérifie : la présentation de bébé (tête en bas ou siège), l\'estimation du poids par biométrie, la quantité de liquide amniotique, la position et le grade du placenta, et le bien-être fœtal par Doppler (mesure de la circulation sanguine dans le cordon).',conseil:'Accompagne-la à l\'écho T3 sans exception.',idee_label:'Finalise tous les achats prioritaires ce mois-ci.',bebe_dev:'Bébé se met en position tête en bas. L\'écho T3 vérifie position, poids, liquide amniotique.',bebe_organes:'Position : tête engagée 80%. Liquide amniotique : 700-800 ml. Poids estimé : ±15% par biométrie.',bebe_anecdote:'Le score de Manning évalue le bien-être fœtal sur 5 critères échographiques. Un score > 8/10 indique que bébé se porte bien.',bebe_faq:'Le score de Manning — c\'est quoi ? C\'est une évaluation du bien-être fœtal par 5 critères échographiques : mouvements respiratoires, mouvements corporels, tonus, liquide amniotique, rythme cardiaque. Score > 8/10 = bébé en forme.'},
  33:{emoji:'🍍',taille:'43.7 cm',poids:'1.9 kg',titre:'Les ongles dépassent les doigts',intro:'À 33 SA, bébé mesure 43,7 cm — comme un sac à dos léger. Les ongles sont si longs qu\'il peut se griffer le visage in utero. Le squelette est presque complet.',maman_titre:'L\'essoufflement est maximal',maman:'L\'essoufflement atteint son maximum — l\'utérus comprime fortement le diaphragme. L\'insomnie est quasi-systématique. L\'impatience et l\'anxiété augmentent à mesure que la date approche.',maman_aide:'Sois disponible la nuit. Être réveillé avec elle fait une vraie différence — la solitude nocturne est particulièrement difficile.',maman_signe:'La tocologie — peur pathologique de l\'accouchement — touche 6-10% des femmes enceintes. Un soutien psychologique spécialisé est très efficace si c\'est son cas.',alerte:'La consultation pré-anesthésie est obligatoire avant tout accouchement (même sans péridurale prévue). Elle doit être faite entre 32 et 37 SA. Vérifiez qu\'elle est planifiée.',savistu:'Les ongles de bébé à 33 SA sont suffisamment longs pour qu\'il se griffe le visage in utero — d\'où les petites griffures parfois visibles à la naissance.',doc_titre:'La consultation pré-anesthésie',doc:'La consultation pré-anesthésie est obligatoire avant tout accouchement, même si une péridurale n\'est pas prévue. Elle permet à l\'anesthésiste d\'évaluer d\'éventuels risques et d\'être prêt en cas d\'urgence. Elle doit être faite entre 32 et 37 SA. Si elle n\'est pas encore planifiée, appeler la maternité.',conseil:'Sois disponible la nuit. La solitude nocturne en fin de grossesse est particulièrement difficile.',idee_label:'Prépare des repas à congeler pour les premiers jours après la naissance.',bebe_dev:'Squelette presque complet. Ongles longs. Poumons en phase finale de maturation.',bebe_organes:'Ongles : dépassent les doigts. Poumons : 98% matures. Graisse : 15% du poids.',bebe_anecdote:'La tocologie (peur pathologique de l\'accouchement) touche 6-10% des femmes. Non traitée, elle augmente les demandes de césarienne. Un suivi psychologique est très efficace.',bebe_faq:'La consultation pré-anesthésie — est-elle vraiment obligatoire ? Oui, même sans péridurale prévue. Elle permet à l\'anesthésiste d\'être prêt en cas d\'urgence pendant l\'accouchement.'},
  34:{emoji:'🍈',taille:'45 cm',poids:'2.15 kg',titre:'Le système nerveux est mature',intro:'À 34 SA, bébé mesure 45 cm — comme un club de golf. Le système nerveux central est mature. Un bébé né à 34 SA a aujourd\'hui plus de 99% de chances de survie sans séquelles.',maman_titre:'La descente de bébé dans le bassin',maman:'La descente du bébé dans le bassin soulage l\'essoufflement mais augmente la pression pelvienne. Les envies fréquentes d\'uriner s\'intensifient.',maman_aide:'Si les cours de préparation à l\'accouchement ne sont pas commencés, c\'est urgent. Des sessions intensives existent.',maman_signe:'La descente de bébé dans le bassin s\'appelle l\'engagement. Elle peut survenir plusieurs semaines avant l\'accouchement — surtout pour un premier enfant.',alerte:'La corticothérapie (injections de cortisone) peut être prescrite si une naissance prématurée avant 35 SA est possible — elle accélère la maturation pulmonaire de bébé.',savistu:'Un bébé né à 34 SA a aujourd\'hui plus de 99% de chances de survie sans séquelles.',doc_titre:'La corticothérapie en cas de risque de prématurité',doc:'Si une naissance prématurée semble possible avant 35 SA, des injections de cortisone (bêtaméthasone) peuvent être prescrites à la mère. Elles accélèrent la maturation des poumons de bébé en 48 heures. Ce traitement est très efficace — il divise par 2 le risque de complications pulmonaires chez les prématurés.',conseil:'Si les cours de préparation ne sont pas commencés, c\'est urgent maintenant.',idee_label:'Fais vérifier l\'installation du siège auto par un professionnel.',bebe_dev:'Système nerveux central mature. Thermorégulation autonome. Descente dans le bassin possible.',bebe_organes:'SNC : maturation quasi-complète. Thermorégulation : autonome. Adipeux : 12% du poids.',bebe_anecdote:'Les soins de développement en néonatologie (peau à peau, musique, voix des parents) réduisent la durée d\'hospitalisation d\'environ 20% chez les prématurés — la présence parentale est thérapeutique.',bebe_faq:'Le siège auto — comment vérifier l\'installation ? Certains magasins spécialisés (Bébé 9, Leclerc), pompiers ou associations proposent des vérifications gratuites. L\'airbag passager est incompatible avec un siège bébé à l\'avant — le désactiver obligatoirement.'},
  35:{emoji:'🍈',taille:'46.2 cm',poids:'2.4 kg',titre:'Bébé prend 250g par semaine',intro:'À 35 SA, bébé mesure 46,2 cm — comme une raquette de badminton. Il prend maintenant environ 250g par semaine — la phase de finition avant l\'arrivée.',maman_titre:'La pression pelvienne est intense',maman:'Les envies fréquentes d\'uriner sont maximales. La pression pelvienne est intense. Des douleurs dans le pubis peuvent rendre la marche difficile.',maman_aide:'Installe le siège auto et fais vérifier l\'installation. Un siège mal installé est aussi dangereux qu\'un siège absent.',maman_signe:'La prise de poids finale de bébé est essentielle pour sa thermorégulation après la naissance — chaque gramme compte.',alerte:'L\'airbag passager et le siège bébé à l\'avant sont incompatibles — l\'airbag peut blesser mortellement un enfant. Désactive-le obligatoirement si siège à l\'avant.',savistu:'Bébé prend 250g par semaine à partir de 35 SA — cette prise de poids est essentielle pour la thermorégulation néonatale.',doc_titre:'Le siège auto — choisir et installer correctement',doc:'Tous les sièges auto vendus depuis 2018 sont en norme i-Size (R129) — plus stricte que l\'ancienne norme. Le siège à contre-sens (dos à la route) est recommandé jusqu\'à au moins 15 mois, idéalement jusqu\'à 4 ans — il réduit les risques de blessure cervicale de 5 fois. L\'airbag passager est incompatible avec un siège bébé à l\'avant — le désactiver obligatoirement.',conseil:'Installe le siège auto et fais vérifier l\'installation par un professionnel.',idee_label:'Finalise absolument tous les achats essentiels.',bebe_dev:'Reins et foie pleinement fonctionnels. Prise de 250g/semaine. Poumons quasi-matures.',bebe_organes:'Reins : fonctionnels à 100%. Foie : stockage glycogène. Position : 90% tête en bas.',bebe_anecdote:'Le siège à contre-sens (dos à la route) réduit les risques de blessure cervicale de 5 fois en cas de choc frontal. La tête très lourde d\'un bébé est protégée par le dossier du siège.',bebe_faq:'Siège auto i-Size ou ancienne norme — quelle différence ? La norme i-Size (R129) est plus stricte et impose le contre-sens plus longtemps. Elle est obligatoire sur tous les sièges vendus depuis 2018.'},
  36:{emoji:'🥗',taille:'47.4 cm',poids:'2.6 kg',titre:'Les poumons sont matures',intro:'À 36 SA, bébé mesure 47,4 cm — comme un ballon de basket junior. Les poumons sont matures. L\'instinct de nidification est à son maximum.',maman_titre:'L\'instinct de nidification',maman:'L\'instinct de nidification est documenté scientifiquement — il précède souvent le début du travail de quelques jours. Des pertes de bouchon muqueux peuvent survenir. Le col commence à se préparer.',maman_aide:'La valise doit être prête et dans la voiture maintenant. Le téléphone chargé en permanence.',maman_signe:'Le bouchon muqueux protège l\'utérus des infections depuis le début. Sa perte est un signe de maturation cervicale — mais l\'accouchement peut encore attendre plusieurs jours.',alerte:'À partir de 36 SA, rester joignable en permanence. Avoir le numéro direct des urgences obstétricales de la maternité.',savistu:'L\'instinct de nidification est un phénomène biologique réel, documenté chez de nombreux mammifères. Il précède souvent le début du travail.',doc_titre:'Le bouchon muqueux — c\'est quoi',doc:'Le bouchon muqueux est un bouchon de mucus qui ferme le col de l\'utérus depuis le début de la grossesse, protégeant bébé des infections. Sa perte (mucus épais, parfois rosé) signifie que le col commence à se préparer à l\'accouchement. L\'accouchement peut survenir dans les heures, les jours ou les semaines suivantes — ce n\'est pas un signal d\'urgence, sauf si accompagné de saignements importants.',conseil:'Valise dans la voiture. Téléphone chargé en permanence. Mode alerte.',idee_label:'Prévenez la famille et les amis proches que ça peut arriver bientôt.',bebe_dev:'Poumons presque matures. Instinct de nidification. Col en préparation.',bebe_organes:'Bouchon muqueux : peut se perdre. Col : ramollissement. Vernix : quasiment disparu.',bebe_anecdote:'Le bouchon muqueux peut se perdre progressivement sur plusieurs jours ou d\'un coup. Sa couleur rosée est normale — liée à de petits vaisseaux qui se rompent lors de la maturation du col.',bebe_faq:'Bouchon muqueux perdu = accouchement imminent ? Non. L\'accouchement peut encore tarder de quelques jours à 2 semaines. Pas d\'urgence sauf saignements abondants ou perte des eaux.'},
  37:{emoji:'🌿',taille:'48.6 cm',poids:'2.85 kg',titre:'Bébé est à terme',intro:'À 37 SA, bébé est officiellement à terme. Il pourrait naître à tout moment sans risque majeur. Ses poumons sont matures, ses réflexes complets.',maman_titre:'L\'anxiété et l\'impatience sont maximales',maman:'Les contractions peuvent survenir à tout moment. L\'anxiété et l\'impatience sont maximales. Le col peut commencer à se dilater sans que ce soit perceptible.',maman_aide:'Mode alerte active. Reste joignable en permanence. Révise les signes du début du travail.',maman_signe:'Bébé est à terme dès 37 SA. Mais les deux dernières semaines sont importantes pour la maturation finale du cerveau et des poumons.',alerte:'Signes du début du travail : contractions régulières (règle 5-1-1), perte des eaux (liquide clair et continu), saignements. En cas de perte des eaux : direction maternité dans les 12 heures même sans contractions.',savistu:'Bébé est à terme dès 37 SA. Les deux dernières semaines sont importantes pour la maturation finale du cerveau.',doc_titre:'Comment reconnaître le début du travail',doc:'Le début du travail se reconnaît à : des contractions régulières qui s\'intensifient et ne s\'arrêtent pas en changeant de position (règle 5-1-1 pour un 1er enfant), une perte des eaux (liquide inodore, incolore, continu qui coule à chaque mouvement — différent des urines), parfois des pertes sanguines rosées (show). En cas de doute sur la perte des eaux : pad absorbant + appel maternité.',conseil:'Mode alerte maximum. Téléphone toujours sur toi. Numéro maternité en favori.',idee_label:'Relisez ensemble votre plan de naissance.',bebe_dev:'À terme. Poumons matures. Réflexes complets. Bébé prêt à tout moment.',bebe_organes:'Col : effacement progressif. SNC : maturation finale. Poumons : maturité complète.',bebe_anecdote:'La perte des eaux : liquide amniotique = inodore, incolore, continu (coule à chaque mouvement). Différent des urines (odeur caractéristique, discontinu). En cas de doute : appeler la maternité.',bebe_faq:'La perte des eaux — que faire ? Direction maternité dans les 12 heures maximum, même sans contractions. Le risque d\'infection (chorioamniotite) augmente à chaque heure. Ne pas attendre les contractions.'},
  38:{emoji:'🌿',taille:'49.8 cm',poids:'3.1 kg',titre:'Bébé attend le signal',intro:'À 38 SA, bébé pèse 3,1 kg — comme un haltère de 3 kg. Sa tête est engagée dans le bassin. Tous ses systèmes sont prêts. Il attend le signal hormonal pour déclencher le travail.',maman_titre:'L\'impatience est à son comble',maman:'L\'impatience et l\'anxiété sont mêlées d\'excitation. Le sommeil est quasi-impossible. Le besoin de soutien émotionnel est maximal.',maman_aide:'Sois présent, rassurant. Prépare des repas pour les premiers jours de retour à la maison.',maman_signe:'C\'est bébé qui déclenche son propre accouchement — il envoie des signaux hormonaux à l\'utérus quand ses poumons sont matures.',alerte:'La péridurale ambulatoire (walking epidural) permet de se déplacer sous péridurale — disponible dans certaines maternités. Se renseigner en amont si ça l\'intéresse.',savistu:'C\'est bébé qui déclenche son propre accouchement en envoyant des signaux hormonaux à l\'utérus — un mécanisme encore partiellement mystérieux.',doc_titre:'Le déclenchement — c\'est quoi',doc:'Si le travail ne démarre pas spontanément à terme, un déclenchement peut être proposé. Il peut se faire par gel de prostaglandines (appliqué sur le col pour l\'assouplir), rupture artificielle des membranes (poche des eaux), ou perfusion de syntocinon (forme synthétique de l\'ocytocine, l\'hormone naturelle du travail). Un déclenchement ne signifie pas forcément une césarienne.',conseil:'Sois présent et rassurant. Prépare les repas pour les premiers jours post-naissance.',idee_label:'Préviens famille et amis proches que ça peut arriver à tout moment.',bebe_dev:'Bébé est prêt. Tête engagée dans le bassin. Attend le signal hormonal.',bebe_organes:'Tête : diamètre bipariétal ~93mm. Col : effacement progressif. Hormones : ocytocine + prostaglandines.',bebe_anecdote:'La péridurale ambulatoire (walking epidural) permet de marcher sous péridurale — elle nécessite un dosage plus faible et une surveillance particulière. Disponible dans certaines maternités — se renseigner à l\'avance.',bebe_faq:'Le déclenchement artificiel — est-ce douloureux ? Le gel de prostaglandines appliqué sur le col peut provoquer des crampes. La perfusion de syntocinon (sous péridurale souvent) intensifie les contractions. Un déclenchement ne compromet pas forcément le projet d\'accouchement sans péridurale si c\'est le souhait.'},
  39:{emoji:'🍉',taille:'50.7 cm',poids:'3.25 kg',titre:'Bébé produit ses propres hormones de stress',intro:'À 39 SA, bébé est pleinement développé. Il produit ses propres hormones de stress pour se préparer à l\'accouchement. Chaque jour supplémentaire lui permet de gagner en maturité.',maman_titre:'L\'attente est épuisante',maman:'Chaque jour semble une éternité. La fatigue physique et émotionnelle est à son comble. Les sorties sont difficiles mais bénéfiques pour le moral.',maman_aide:'Organise une sortie douce. Changer les idées est important pour vous deux.',maman_signe:'Le stress de l\'accouchement prépare bébé à la vie extra-utérine — les hormones libèrent le surfactant des alvéoles et activent la thermogenèse.',alerte:'Seulement 5% des bébés naissent exactement à la DPA. Une naissance entre 37 et 42 SA est normale. La surveillance médicale s\'intensifie après 41 SA.',savistu:'Seulement 5% des bébés naissent exactement à la DPA. Une naissance entre 37 et 42 SA est normale.',doc_titre:'Le dépassement de terme — que se passe-t-il',doc:'Après 41 SA, la surveillance médicale s\'intensifie avec un monitoring (enregistrement du rythme cardiaque de bébé) deux fois par semaine et des échographies régulières. Un déclenchement peut être proposé à partir de 41 SA selon les protocoles de la maternité. Au-delà de 42 SA, il est quasi-systématique.',conseil:'Organise une sortie douce — cinéma, restaurant calme, promenade.',idee_label:'Écris-lui une lettre manuscrite sur ce que cette grossesse représente pour toi.',bebe_dev:'Pleinement développé. Hormones de stress sécrétées pour préparer la naissance.',bebe_organes:'Cortisol : sécrété pour préparer la naissance. Poumons : maturité absolue. Graisse : 15-16% du poids.',bebe_anecdote:'Le stress de l\'accouchement est bénéfique pour bébé — les hormones de stress libèrent le surfactant des alvéoles et activent la production de chaleur. Un bébé né par césarienne programmée sans travail a plus de risques respiratoires.',bebe_faq:'Le dépassement de terme est-il dangereux ? Pas avant 42 SA avec une surveillance adaptée. Le monitoring 2x/semaine permet de détecter tout signe de souffrance fœtale. Le déclenchement est proposé à partir de 41 SA selon les protocoles.'},
  40:{emoji:'🍉',taille:'51.2 cm',poids:'3.4 kg',titre:'Le jour J',intro:'À 40 SA, c\'est la date prévue. Bébé a attendu 280 jours pour te rencontrer. Tous ses systèmes sont pleinement opérationnels.',maman_titre:'Chaque contraction peut être la bonne',maman:'Stress et excitation maximaux. Chaque contraction est scrutée. Le corps est en mode attente totale.',maman_aide:'Règle 5-1-1 : contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure = appeler la maternité avant de partir.',maman_signe:'Le travail peut durer de 6 à 20 heures pour un premier enfant. Rester calme et accompagner sans stresser est ton rôle principal.',alerte:'En cas de perte des eaux : direction maternité dans les 12 heures même sans contractions. En cas de saignements importants : urgences immédiates.',savistu:'C\'est bébé qui choisit le moment de naître en envoyant des signaux hormonaux à l\'utérus.',doc_titre:'Ton rôle en salle de naissance',doc:'En salle de naissance, le père est souvent décrit comme "l\'ancre" par les sages-femmes — présence calme, regard, voix, main à tenir. Pas besoin de savoir quoi dire. Être là suffit. Chronométre les contractions, encourage entre chaque, respecte les décisions médicales, sois le lien entre elle et l\'équipe si elle ne peut plus communiquer.',conseil:'Contractions 5min/1h = appeler la maternité. Garde ton calme.',idee_label:'Le jour est arrivé — sois présent, calme, et confiant.',bebe_dev:'Bébé est prêt. Tous systèmes opérationnels. 280 jours d\'attente.',bebe_organes:'Tout est prêt. Le corps de bébé attend le signal de naissance.',bebe_anecdote:'En salle de naissance, la présence du père réduit la durée du travail, la demande de péridurale et améliore le vécu de l\'accouchement par la mère — documenté par plusieurs études obstétricales.',bebe_faq:'Que faire si le travail dure très longtemps ? La patience est clé. Un premier travail dure en moyenne 12 heures. L\'équipe médicale surveille en permanence. Ton rôle : être présent, encourager, ne pas dramatiser.'},
  41:{emoji:'🍉',taille:'51.5 cm',poids:'3.6 kg',titre:'Dépassement de terme',intro:'À 41 SA, bébé continue de grandir. Le dépassement est très courant — seulement 5% des bébés naissent exactement à la DPA. La surveillance médicale est renforcée.',maman_titre:'La frustration est intense',maman:'L\'inconfort est majeur. La frustration et l\'anxiété sont intenses. Un soutien émotionnel constant est indispensable.',maman_aide:'Reste positif et patient. Le dépassement est très courant. Suis les instructions de l\'équipe médicale.',maman_signe:'Le dépassement de terme jusqu\'à 41+6 SA est considéré comme normal sur le plan médical.',alerte:'Le score de Bishop évalue la maturité du col — plus il est élevé, plus le déclenchement sera facile. Il sera évalué à chaque consultation.',savistu:'Le dépassement de terme jusqu\'à 41+6 SA est normal. La surveillance s\'intensifie mais c\'est une précaution standard.',doc_titre:'Le score de Bishop',doc:'Le score de Bishop évalue la maturité du col de l\'utérus sur 13 points en mesurant : la dilatation, l\'effacement, la consistance, la position du col et l\'engagement de la tête. Un score élevé (> 8) indique un col favorable — le déclenchement se passera bien. Un score faible (< 6) indique un col défavorable — une préparation du col par gel de prostaglandines sera nécessaire avant le déclenchement.',conseil:'Reste positif et patient. Suis les instructions médicales à la lettre.',idee_label:'Profite de ces derniers jours à deux — dans quelques jours tout change.',bebe_dev:'Dépassement de terme. Surveillance médicale renforcée. Déclenchement possible.',bebe_organes:'Placenta : vieillissement possible. Liquide amniotique : peut diminuer. Col : maturation avancée.',bebe_anecdote:'Le score de Bishop évalue la maturité du col sur 13 points. Un score élevé = col favorable = déclenchement plus facile.',bebe_faq:'Méthodes naturelles pour déclencher le travail — lesquelles fonctionnent vraiment ? Le rapport sexuel (les prostaglandines du sperme ont un effet similaire au gel médical), la stimulation des mamelons (libère de l\'ocytocine), la marche active. Aucune n\'est garantie, mais toutes sont sans risque.'},
};

const MISSIONS: Record<number, string[]> = {
  6:['Dire à ta partenaire que tu es là quoi qu\'il arrive','Faire les courses sans qu\'elle ait à demander','Vérifier qu\'un suivi médical est en place'],
  7:['Préparer des en-cas anti-nausées accessibles','Éviter les odeurs fortes à la maison','Commencer à lire sur la grossesse'],
  8:['Prendre le relais sur les tâches ménagères cette semaine','Accompagner à la première consultation','Informer ton employeur discrètement si besoin'],
  9:['Pratiquer l\'écoute active sans chercher à résoudre','Proposer un massage des pieds ou du dos le soir','Réduire les sources de stress à la maison'],
  10:['Planifier la première échographie ensemble','Préparer une liste de questions pour le médecin','Commencer à chercher des prénoms'],
  11:['Accompagner chercher des vêtements de grossesse','Commencer à réfléchir à l\'organisation financière','Déclarer la grossesse à la mutuelle'],
  12:['Être présent à l\'écho T1 — prendre une demi-journée','Filmer et photographier l\'échographie','Décider ensemble quand annoncer'],
  13:['Annoncer si vous le souhaitez','Commencer à parler des prénoms','Lire le module post-partum pour anticiper'],
  14:['Organiser un week-end en amoureux','Commencer les recherches poussette et siège auto','Vérifier les aides et congés disponibles'],
  15:['Parler à bébé chaque soir — commencer maintenant','Réserver les cours de préparation à l\'accouchement','Commencer un album photo de la grossesse'],
  16:['Réserver les cours si pas encore fait','Établir la liste des achats avec budget','Réfléchir à l\'aménagement de la chambre'],
  17:['Instaurer le rituel de la main sur le ventre','Commander le coussin de grossesse','Commencer le module valise maternité'],
  18:['Proposer des massages du dos régulièrement','Préparer la chambre de bébé ensemble','Se renseigner sur les crèches de votre ville'],
  19:['Monter les meubles de la chambre de bébé','Établir la liste de naissance pour la famille','Initialiser les démarches de congé paternité avec le RH'],
  20:['Bloquer la demi-journée pour l\'écho T2','Préparer les questions pour l\'échographiste','Célébrer la mi-grossesse'],
  21:['Installer la veilleuse','Visiter la maternité','Choisir la maternité définitivement'],
  22:['Instaurer le massage du ventre avec de l\'huile','Préparer le plan de naissance en brouillon','Commencer à repérer le trajet vers la maternité'],
  23:['Prendre en charge toutes les corvées physiques','Commencer à préparer le sac de maternité','Lire intégralement le guide accouchement'],
  24:['Accompagner au test HGPO — 2 heures ensemble','Commencer la valise maternité','Installer le siège auto'],
  25:['Bain de pieds le soir — en faire un rituel','Finaliser la chambre de bébé','Confirmer ton congé paternité avec l\'employeur'],
  26:['Finaliser le plan de naissance par écrit','Tester le trajet vers la maternité','Préparer une playlist si souhaité'],
  27:['Remettre le plan de naissance à la maternité','Préparer les documents administratifs d\'admission','Se faire vacciner contre la coqueluche'],
  28:['Commencer la valise maternité de façon urgente','Enregistrer le numéro de la maternité dans ton téléphone','Maîtriser la règle 5-1-1 des contractions'],
  29:['Être disponible la nuit quand le sommeil est difficile','Préparer un plan B pour rejoindre la maternité vite','Réserver les cours de préparation si pas encore fait'],
  30:['Confirmer le congé paternité avec l\'employeur','Finaliser la valise maternité','Préparer des repas à congeler'],
  31:['Valise dans le coffre de la voiture','Continuer à préparer des repas congelés','Installer le berceau dans la chambre parentale'],
  32:['Accompagner à l\'écho T3 sans exception','Finaliser tous les achats prioritaires','Vérifier que la consultation pré-anesthésie est planifiée'],
  33:['Être disponible la nuit','Confirmer les dates de congé paternité','Préparer la maison pour le retour'],
  34:['Commencer la préparation accouchement si pas encore fait','Tester le trajet à différentes heures','Valise dans le coffre de la voiture'],
  35:['Faire vérifier le siège auto par un professionnel','Finaliser tous les achats restants','Préparer la maison pour l\'arrivée'],
  36:['Valise prête et dans la voiture','Téléphone chargé à 100% en permanence','Rester joignable à tout moment'],
  37:['Mode alerte maximum — téléphone toujours sur soi','Relire les signes du début du travail','Vérifier que la valise est complète'],
  38:['Être présent et disponible émotionnellement','Préparer des repas pour les premiers jours','Prévenir famille et amis proches'],
  39:['Organiser une sortie douce','Maintenir le soutien émotionnel','Garder son calme — tu es prêt'],
  40:['Règle 5-1-1 — appeler la maternité','Garder son calme','Avoir tous les documents à portée de main'],
  41:['Rester positif et patient','Soutien émotionnel et physique maximum','Suivre les instructions médicales'],
};

const RDV_LIST = [
  {sa:8,emoji:'🏥',titre:'1ère consultation',desc:'Confirmation grossesse, prises de sang complètes, calcul de la DPA (date prévue d\'accouchement). Sois là, prends des notes.',oblig:true},
  {sa:12,emoji:'🔬',titre:'Écho T1 + trisomie',desc:'Premier visage de bébé. Mesure de la clarté nucale pour évaluer le risque de trisomie 21. Durée : 30-45 min.',oblig:true},
  {sa:16,emoji:'📋',titre:'Consultation mensuelle',desc:'Suivi standard : tension artérielle, poids, hauteur utérine. Bonne occasion pour poser vos questions.',oblig:false},
  {sa:20,emoji:'📝',titre:'Déclaration grossesse CPAM',desc:'À faire avant 15 SA sur ameli.fr — ouvre les droits aux remboursements à 100%. Aussi à déclarer à l\'employeur.',oblig:true},
  {sa:22,emoji:'👶',titre:'Écho T2 morphologique',desc:'L\'échographie la plus importante. Examine en détail tous les organes, membres et le cerveau. Durée : 45-90 min.',oblig:true},
  {sa:24,emoji:'🩸',titre:'Test diabète gestationnel',desc:'Test HGPO : 3 prises de sang sur 2 heures. Dépiste un diabète qui peut apparaître pendant la grossesse.',oblig:false},
  {sa:28,emoji:'💉',titre:'Début T3 + bilan sanguin',desc:'Bilan sanguin complet. Vaccin coqueluche recommandé pour les deux parents pour protéger bébé dès la naissance.',oblig:false},
  {sa:32,emoji:'📏',titre:'Écho T3 croissance',desc:'Vérifie la position de bébé, estime son poids, évalue le liquide amniotique et le placenta.',oblig:true},
  {sa:34,emoji:'🎓',titre:'Préparation accouchement',desc:'3 à 8 séances remboursées à 100% par la Sécu. Des séances pour les pères existent dans de nombreuses maternités.',oblig:false},
  {sa:36,emoji:'💬',titre:'Entretien prénatal tardif',desc:'Bilan global, finalisation du projet de naissance. La présence du père est fortement recommandée.',oblig:true},
  {sa:38,emoji:'🧳',titre:'Consultation pré-terme',desc:'Vérification du col, position de bébé. Moment pour finaliser toutes les questions pratiques.',oblig:false},
  {sa:40,emoji:'🎉',titre:'Jour J — DPA',desc:'Contractions toutes les 5 minutes pendant 1 heure = appeler la maternité avant de partir.',oblig:true},
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
    setPrenom(p); setValiseChecked(v); setMissionsChecked(m); setNextRdvDate(r); setRdvDates(rd);
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
  const isPostPartum = joursRestants !== null && joursRestants < 0;
  const progression = Math.min(100, Math.round(((saReelle||0)/40)*100));
  const trimestre = (saReelle||0) <= 14 ? 'T1' : (saReelle||0) <= 27 ? 'T2' : 'T3';
  const missions = saReelle ? (MISSIONS[saReelle] || MISSIONS[40]) : [];
  const nextRdv = RDV_LIST.filter(r => saReelle && r.sa >= saReelle)[0];

  // Idée du mois par mois de grossesse
  const ideesMois: string[] = [
    'Encadre la photo de la première échographie et offre-lui le cadre.',
    'Réserve une table dans son restaurant préféré — une soirée normale, juste vous deux.',
    'Offre-lui une séance de massage prénatal à domicile ou en institut.',
    'Crée un album photo de la grossesse — commence maintenant.',
    'Organise un week-end ou une escapade avant l\'arrivée de bébé.',
    'Préparez la chambre de bébé ensemble un dimanche.',
    'Offre-lui un coussin de grossesse de qualité.',
    'Planifie un dernier road trip doux avant l\'accouchement.',
    'Écris-lui une lettre manuscrite sur ce que cette grossesse représente pour toi.',
  ];
  const idee = ideesMois[Math.min(moisGrossesse-1, 8)];

  const toggleValise = (id: string) => {
    const u = {...valiseChecked, [id]:!valiseChecked[id]};
    setValiseChecked(u); localStorage.setItem('dadup_valise', JSON.stringify(u));
  };
  const toggleMission = (id: string) => {
    const u = {...missionsChecked, [id]:!missionsChecked[id]};
    setMissionsChecked(u); localStorage.setItem('dadup_missions', JSON.stringify(u));
  };
  const saveRdvDate = (val: string) => {
    setNextRdvDate(val); localStorage.setItem('dadup_next_rdv', val);
  };
  const saveRdvDateForItem = (sa: number, val: string) => {
    const u = {...rdvDates, [sa]:val};
    setRdvDates(u); localStorage.setItem('dadup_rdv_dates', JSON.stringify(u));
  };
  const saveOnboarding = (d: string, p: string) => {
    localStorage.setItem('dadup_dpa', d); localStorage.setItem('dadup_prenom', p);
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
    <div style={{minHeight:'100vh', background:C.bg, paddingBottom:'40px', fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif'}}>

      {/* HEADER */}
      <div style={{background:C.cream, position:'sticky', top:0, zIndex:40, borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px'}}>
          <a href="/dashboard" onClick={() => setActiveTab('home')} style={{textDecoration:'none'}}>
            <svg viewBox="0 0 300 300" width="36" height="36">
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
              <div style={{background:C.dark, borderRadius:'10px', padding:'5px 10px', textAlign:'center'}}>
                <p style={{color:C.gold, fontSize:'13px', fontWeight:800, margin:0, lineHeight:1}}>{saReelle} SA</p>
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

      <div style={{padding:'24px 20px', maxWidth:'100%'}}>

        {/* ========== ACCUEIL ========== */}
        {activeTab === 'home' && (
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>

            {/* HERO */}
            {isPostPartum ? (
              <div style={{background:C.dark, borderRadius:'24px', padding:'28px 24px', marginBottom:'28px', textAlign:'center'}}>
                <p style={{fontSize:'48px', margin:'0 0 8px'}}>👶</p>
                <p style={{color:C.white, fontSize:'26px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>Bébé est là !</p>
                <p style={{color:C.gold, fontSize:'13px', margin:'4px 0 0'}}>Mode post-partum actif</p>
              </div>
            ) : dataReelle && saReelle && (
              <div style={{background:C.dark, borderRadius:'24px', padding:'28px 24px', marginBottom:'28px'}}>
                <p style={{color:'rgba(200,160,96,0.6)', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 12px', fontWeight:600}}>{saReelle} semaines d'aménorrhée · {trimestre}</p>
                <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px'}}>
                  <div>
                    <p style={{color:C.white, fontSize:'30px', fontWeight:800, margin:0, fontFamily:'Georgia,serif', lineHeight:1.1}}>Bébé fait</p>
                    <p style={{color:C.gold, fontSize:'42px', fontWeight:800, margin:0, fontFamily:'Georgia,serif', lineHeight:1}}>{dataReelle.taille}</p>
                    <p style={{color:'rgba(255,255,255,0.4)', fontSize:'14px', margin:'6px 0 0'}}>et pèse environ {dataReelle.poids}</p>
                    {joursRestants && joursRestants > 0 && (
                      <p style={{color:'rgba(255,255,255,0.3)', fontSize:'13px', margin:'4px 0 0'}}>{joursRestants} jours avant le grand jour</p>
                    )}
                  </div>
                  <div style={{fontSize:'72px', lineHeight:1, opacity:0.9, marginBottom:'4px', flexShrink:0}}>{dataReelle.emoji}</div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                  <div style={{flex:1, background:'rgba(255,255,255,0.1)', borderRadius:'4px', height:'3px'}}>
                    <div style={{background:C.gold, height:'3px', borderRadius:'4px', width:progression+'%'}}/>
                  </div>
                  <p style={{color:'rgba(255,255,255,0.3)', fontSize:'12px', margin:0}}>{progression}%</p>
                </div>
              </div>
            )}

            {/* PROCHAIN RDV — sobre, sans boîte lourde */}
            {nextRdv && (
              <div style={{padding:'0 4px', marginBottom:'28px'}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px'}}>Prochain rendez-vous</p>
                <div style={{display:'flex', alignItems:'center', gap:'14px', paddingBottom:'20px', borderBottom:`1px solid ${C.border}`}}>
                  <div style={{width:'52px', height:'52px', borderRadius:'16px', background:C.dark, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0}}>{nextRdv.emoji}</div>
                  <div style={{flex:1}}>
                    <p style={{color:C.dark, fontSize:'16px', fontWeight:800, margin:'0 0 2px', fontFamily:'Georgia,serif'}}>{nextRdv.titre}</p>
                    <p style={{color:C.textLight, fontSize:'12px', margin:0}}>{nextRdv.sa} SA{dpa?' · '+new Date(new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):''}</p>
                  </div>
                  {dpa && (
                    <div style={{background:'rgba(200,160,96,0.15)', borderRadius:'10px', padding:'6px 10px', textAlign:'center', flexShrink:0}}>
                      <p style={{color:C.gold, fontSize:'18px', fontWeight:800, margin:0, lineHeight:1}}>
                        {Math.max(0,Math.round((new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000-new Date().getTime())/(1000*60*60*24)))}j
                      </p>
                    </div>
                  )}
                </div>
                <div style={{paddingTop:'14px'}}>
                  <p style={{color:C.textLight, fontSize:'11px', fontWeight:600, margin:'0 0 7px'}}>Ajouter ma date de RDV :</p>
                  <input type="date" value={nextRdvDate} onChange={e => saveRdvDate(e.target.value)}
                    style={{background:C.white, border:`1px solid ${C.border}`, borderRadius:'10px', padding:'9px 12px', fontSize:'13px', color:C.dark, width:'100%', boxSizing:'border-box' as const}}/>
                  {nextRdvDate && <p style={{color:C.gold, fontSize:'12px', margin:'6px 0 0', fontWeight:600}}>
                    RDV le {new Date(nextRdvDate).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}
                  </p>}
                </div>
              </div>
            )}

            {/* CE QUE VIT MAMAN — section éditoriale */}
            {dataReelle && (
              <div style={{padding:'0 4px', marginBottom:'28px'}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 16px'}}>Ce que vit maman</p>
                <p style={{color:C.dark, fontSize:'17px', fontWeight:800, margin:'0 0 10px', fontFamily:'Georgia,serif', lineHeight:1.3}}>{dataReelle.maman_titre}</p>
                <p style={{color:C.text, fontSize:'14px', lineHeight:1.75, margin:'0 0 18px'}}>{dataReelle.maman}</p>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'18px'}}>
                  <div style={{background:C.white, borderRadius:'14px', padding:'14px', border:`1px solid ${C.border}`}}>
                    <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', margin:'0 0 6px'}}>Tu peux aider</p>
                    <p style={{color:C.dark, fontSize:'13px', lineHeight:1.55, margin:0}}>{dataReelle.maman_aide}</p>
                  </div>
                  <div style={{background:C.white, borderRadius:'14px', padding:'14px', border:`1px solid ${C.border}`}}>
                    <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', margin:'0 0 6px'}}>Le savoir</p>
                    <p style={{color:C.dark, fontSize:'13px', lineHeight:1.55, margin:0}}>{dataReelle.maman_signe}</p>
                  </div>
                </div>
                <div style={{borderLeft:`3px solid ${C.gold}`, paddingLeft:'14px'}}>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 4px'}}>Quand appeler ?</p>
                  <p style={{color:C.text, fontSize:'13px', lineHeight:1.55, margin:0}}>{dataReelle.alerte}</p>
                </div>
              </div>
            )}

            {/* LE SAVAIS-TU — grande citation */}
            {dataReelle && (
              <div style={{background:C.dark, borderRadius:'24px', padding:'24px', marginBottom:'28px'}}>
                <p style={{color:'rgba(200,160,96,0.6)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px', fontWeight:600}}>Le savais-tu ?</p>
                <p style={{color:C.white, fontSize:'17px', fontWeight:600, lineHeight:1.55, margin:0, fontFamily:'Georgia,serif'}}>"{dataReelle.savistu}"</p>
              </div>
            )}

            {/* À SAVOIR — prose éditoriale */}
            {dataReelle && (
              <div style={{padding:'0 4px', marginBottom:'28px'}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 16px'}}>À savoir cette semaine</p>
                <p style={{color:C.dark, fontSize:'17px', fontWeight:800, margin:'0 0 10px', fontFamily:'Georgia,serif', lineHeight:1.3}}>{dataReelle.doc_titre}</p>
                <p style={{color:C.text, fontSize:'14px', lineHeight:1.75, margin:0}}>{dataReelle.doc}</p>
              </div>
            )}

            {/* CONSEIL + IDÉE */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'28px'}}>
              {dataReelle && (
                <div style={{background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`}}>
                  <span style={{fontSize:'20px', display:'block', marginBottom:'10px'}}>💡</span>
                  <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 6px'}}>Conseil</p>
                  <p style={{color:C.text, fontSize:'13px', lineHeight:1.55, margin:0}}>{dataReelle.conseil}</p>
                </div>
              )}
              <div style={{background:C.gold, borderRadius:'16px', padding:'18px'}}>
                <span style={{fontSize:'20px', display:'block', marginBottom:'10px'}}>🎁</span>
                <p style={{color:C.dark, fontSize:'13px', fontWeight:700, margin:'0 0 6px'}}>Idée du mois</p>
                <p style={{color:C.dark, fontSize:'13px', lineHeight:1.55, margin:0, fontWeight:500}}>{idee}</p>
              </div>
            </div>

            {/* MISSIONS */}
            {missions.length > 0 && (
              <div style={{padding:'0 4px'}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px'}}>Ta mission cette semaine</p>
                <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                  {missions.map((m,i) => {
                    const id='mission_'+saReelle+'_'+i;
                    const done=missionsChecked[id];
                    return (
                      <button key={id} onClick={() => toggleMission(id)} style={{display:'flex', gap:'12px', alignItems:'center', background:C.white, border:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left', padding:'14px 16px', borderRadius:'14px'}}>
                        <div style={{width:'22px', height:'22px', borderRadius:'6px', border:`2px solid ${done?C.gold:C.border}`, background:done?C.gold:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                          {done && <span style={{color:C.dark, fontSize:'12px', fontWeight:700}}>✓</span>}
                        </div>
                        <p style={{color:done?C.textLight:C.dark, fontSize:'13px', margin:0, lineHeight:1.4, textDecoration:done?'line-through':'none'}}>{m}</p>
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
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px'}}>
              <div>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 4px'}}>{avance?'Dans 4 semaines':'Cette semaine'}</p>
                <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:0, fontFamily:'Georgia,serif'}}>{saReelle} semaines</h2>
              </div>
              <button onClick={() => setAvance(!avance)} style={{fontSize:'11px', padding:'7px 14px', borderRadius:'20px', cursor:'pointer', fontWeight:700, background:avance?C.dark:C.white, color:avance?C.gold:C.text, border:avance?'none':`1px solid ${C.border}`}}>
                {avance ? '← Revenir' : '+4 semaines'}
              </button>
            </div>

            {/* HERO BÉBÉ */}
            <div style={{background:C.dark, borderRadius:'24px', padding:'28px 24px', marginBottom:'28px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'12px', right:'16px', fontSize:'80px', lineHeight:1, opacity:0.85}}>{data.emoji}</div>
              <div style={{position:'relative'}}>
                <p style={{color:'rgba(200,160,96,0.6)', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', margin:'0 0 10px', fontWeight:600}}>{sa} SA</p>
                <p style={{color:C.white, fontSize:'32px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif', lineHeight:1.1}}>{data.taille}</p>
                <p style={{color:C.gold, fontSize:'18px', fontWeight:600, margin:0}}>{data.poids}</p>
              </div>
            </div>

            {/* TITRE + INTRO */}
            <div style={{padding:'0 4px', marginBottom:'28px'}}>
              <p style={{color:C.dark, fontSize:'18px', fontWeight:800, margin:'0 0 10px', fontFamily:'Georgia,serif', lineHeight:1.3}}>{data.titre}</p>
              <p style={{color:C.text, fontSize:'14px', lineHeight:1.75, margin:0}}>{data.intro}</p>
            </div>

            {/* DÉVELOPPEMENT */}
            <div style={{padding:'0 4px', marginBottom:'28px', paddingBottom:'28px', borderBottom:`1px solid ${C.border}`}}>
              <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px'}}>Développement</p>
              <p style={{color:C.text, fontSize:'14px', lineHeight:1.75, margin:0}}>{data.bebe_dev}</p>
            </div>

            {/* ORGANES */}
            <div style={{padding:'0 4px', marginBottom:'28px', paddingBottom:'28px', borderBottom:`1px solid ${C.border}`}}>
              <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px'}}>État des organes cette semaine</p>
              <p style={{color:C.text, fontSize:'14px', lineHeight:1.75, margin:0}}>{data.bebe_organes}</p>
            </div>

            {/* ANECDOTE */}
            <div style={{background:C.dark, borderRadius:'24px', padding:'24px', marginBottom:'28px'}}>
              <p style={{color:'rgba(200,160,96,0.6)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px', fontWeight:600}}>Anecdote scientifique</p>
              <p style={{color:C.white, fontSize:'16px', fontWeight:600, lineHeight:1.55, margin:0, fontFamily:'Georgia,serif'}}>"{data.bebe_anecdote}"</p>
            </div>

            {/* FAQ */}
            <div style={{padding:'0 4px'}}>
              <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px'}}>Questions fréquentes</p>
              <p style={{color:C.text, fontSize:'14px', lineHeight:1.75, margin:0}}>{data.bebe_faq}</p>
            </div>
          </div>
        )}

        {/* ========== RDV ========== */}
        {activeTab === 'rdv' && (
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
            <div style={{marginBottom:'24px'}}>
              <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:'0 0 4px', fontFamily:'Georgia,serif'}}>Calendrier</h2>
              {dpa && <p style={{color:C.textLight, fontSize:'13px', margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</p>}
            </div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:'20px', top:0, bottom:0, width:'1px', background:C.border}}/>
              <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                {RDV_LIST.map((r,i) => {
                  const statut = !saReelle ? 'futur' : r.sa < saReelle ? 'passe' : r.sa <= saReelle+2 ? 'prochain' : 'futur';
                  const rdvDate = dpa ? new Date(new Date(dpa).getTime()-(40-r.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}) : '';
                  return (
                    <div key={i} style={{position:'relative', paddingLeft:'50px'}}>
                      <div style={{position:'absolute', left:'12px', top:'17px', width:'17px', height:'17px', borderRadius:'50%', border:`2px solid ${statut==='passe'?C.gold:statut==='prochain'?C.gold:C.border}`, background:statut==='passe'?C.gold:statut==='prochain'?C.gold:C.bg, display:'flex', alignItems:'center', justifyContent:'center', transform:statut==='prochain'?'scale(1.2)':'scale(1)'}}>
                        {statut==='passe' && <span style={{color:C.dark, fontSize:'9px', fontWeight:700}}>✓</span>}
                      </div>
                      <button onClick={() => setRdvOuvert(rdvOuvert===i?null:i)} style={{width:'100%', textAlign:'left', borderRadius:'14px', padding:'13px 14px', border:'none', cursor:'pointer', background:statut==='prochain'?C.dark:C.white, outline:'none', opacity:statut==='passe'?0.5:1, boxSizing:'border-box' as const, borderLeft:statut==='prochain'?`3px solid ${C.gold}`:`1px solid ${C.border}`}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
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
                        {rdvOuvert===i && (
                          <div style={{marginTop:'12px', paddingTop:'12px', borderTop:`1px solid ${statut==='prochain'?'rgba(255,255,255,0.1)':C.border}`}}>
                            <p style={{color:statut==='prochain'?'rgba(255,255,255,0.65)':C.text, fontSize:'13px', lineHeight:1.6, margin:'0 0 12px'}}>{r.desc}</p>
                            <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex', alignItems:'center', gap:'6px', background:statut==='prochain'?'rgba(200,160,96,0.15)':C.cream, color:statut==='prochain'?C.gold:C.dark, fontSize:'12px', fontWeight:700, padding:'7px 14px', borderRadius:'20px', textDecoration:'none', border:statut==='prochain'?'none':`1px solid ${C.border}`}}>
                              📅 Prendre RDV sur Doctolib
                            </a>
                            <div style={{marginTop:'12px'}}>
                              <p style={{color:statut==='prochain'?'rgba(255,255,255,0.4)':C.textLight, fontSize:'11px', margin:'0 0 6px'}}>Ma date de RDV :</p>
                              <input type="date" value={rdvDates[r.sa]||''} onChange={e => saveRdvDateForItem(r.sa, e.target.value)}
                                style={{background:statut==='prochain'?'rgba(255,255,255,0.08)':'#f8f7f4', border:`1px solid ${statut==='prochain'?'rgba(255,255,255,0.15)':C.border}`, borderRadius:'8px', padding:'7px 10px', fontSize:'12px', color:statut==='prochain'?C.white:C.dark, width:'100%', boxSizing:'border-box' as const}}/>
                              {rdvDates[r.sa] && <p style={{color:C.gold, fontSize:'11px', margin:'5px 0 0', fontWeight:600}}>
                                {new Date(rdvDates[r.sa]).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}
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
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:'0 0 24px', fontFamily:'Georgia,serif'}}>Pratique</h2>

            {/* VALISE */}
            <div style={{marginBottom:'28px'}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px'}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:0}}>Valise maternité</p>
                <span style={{background:C.dark, color:C.gold, fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'20px'}}>{Object.values(valiseChecked).filter(Boolean).length}/21</span>
              </div>
              <div style={{background:C.border, borderRadius:'4px', height:'3px', marginBottom:'20px'}}>
                <div style={{background:C.gold, height:'3px', borderRadius:'4px', width:(Object.values(valiseChecked).filter(Boolean).length/21*100)+'%'}}/>
              </div>
              {[
                {titre:'Pour toi', items:[{id:'v1',label:'Chargeur + batterie externe'},{id:'v2',label:'Vêtements confort (2 jours)'},{id:'v3',label:'Snacks & eau'},{id:'v4',label:'Écouteurs'},{id:'v5',label:'Documents hospitaliers'},{id:'v6',label:'Appareil photo chargé'}]},
                {titre:'Pour elle', items:[{id:'v7',label:'Chemise de nuit accouchement'},{id:'v8',label:'Robe de chambre + chaussons'},{id:'v9',label:'Sous-vêtements post-partum'},{id:'v10',label:'Produits de toilette'},{id:'v11',label:'Soutien-gorge allaitement x2'}]},
                {titre:'Pour bébé', items:[{id:'v12',label:'Body naissance x3'},{id:'v13',label:'Pyjama naissance x2'},{id:'v14',label:'Bonnet naissance x2'},{id:'v15',label:'Gigoteuse naissance'},{id:'v16',label:'Siège auto installé'},{id:'v17',label:'Couches nouveau-né'}]},
                {titre:'Documents', items:[{id:'v18',label:'Carte vitale + mutuelle'},{id:'v19',label:'Carnet de maternité'},{id:'v20',label:'Pièces d\'identité'},{id:'v21',label:'Plan accès maternité'}]},
              ].map(s => (
                <div key={s.titre} style={{marginBottom:'18px'}}>
                  <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'2px', margin:'0 0 10px'}}>{s.titre}</p>
                  <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                    {s.items.map(item => (
                      <button key={item.id} onClick={() => toggleValise(item.id)} style={{display:'flex', alignItems:'center', gap:'12px', background:C.white, border:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left', padding:'12px 14px', borderRadius:'12px'}}>
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

            <div style={{height:'1px', background:C.border, marginBottom:'28px'}}/>

            {/* ACHATS */}
            <div style={{marginBottom:'28px'}}>
              <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 16px'}}>Achats prioritaires</p>
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
                  <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:C.white, borderRadius:'12px', border:`1px solid ${C.border}`}}>
                    <div>
                      <p style={{color:C.dark, fontSize:'13px', fontWeight:600, margin:'0 0 3px'}}>{a.label}</p>
                      <span style={{background:a.priorite==='urgent'?'#fff0f0':C.cream, color:a.priorite==='urgent'?'#cc4444':C.textLight, fontSize:'10px', fontWeight:700, padding:'2px 7px', borderRadius:'8px'}}>{a.priorite}</span>
                    </div>
                    <p style={{color:C.gold, fontSize:'13px', fontWeight:700, margin:0}}>{a.prix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{height:'1px', background:C.border, marginBottom:'28px'}}/>

            {/* SURVIE 1ER MOIS */}
            <div>
              <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 16px'}}>Survie 1er mois</p>
              {[
                {titre:'Emmaillotage',contenu:'Couverture en losange. Coin supérieur replié à 15cm. Bébé épaules sur le bord. Côté gauche → sous le dos. Bas vers le haut. Côté droit → sous le dos. Test : 2 doigts passent aux hanches.'},
                {titre:'Bébé pleure — protocole',contenu:'1. Faim ? (toutes les 2-3h)  2. Couche sale ?  3. Température ? (nuque = thermomètre)  4. Besoin de contact ? (peau à peau)  5. Coliques ? (vélo avec les jambes)  6. Surstimulé ? (pièce calme, voix douce)'},
                {titre:'Sommeil de bébé',contenu:'16-18h/24 en cycles de 2-3h. Toujours sur le dos. Sans oreiller ni couette. Température : 18-20°C. Les réveils nocturnes diminuent vers 3-4 mois.'},
                {titre:'Signaux d\'alerte — urgences pédiatriques',contenu:'Température > 38°C avant 3 mois. Refus de s\'alimenter sur 2 tétées. Pleurs inconsolables inhabituels. Teint gris ou jaunâtre intense. Fontanelle bombée. Difficultés respiratoires → 15 (SAMU).'},
              ].map((s,i) => (
                <div key={i} style={{marginBottom:i<3?'20px':0, paddingBottom:i<3?'20px':0, borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
                  <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:'0 0 7px'}}>{s.titre}</p>
                  <p style={{color:C.text, fontSize:'13px', lineHeight:1.65, margin:0}}>{s.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== BONS PLANS ========== */}
        {activeTab === 'bonsplans' && (
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
            <h2 style={{color:C.dark, fontSize:'22px', fontWeight:800, margin:'0 0 24px', fontFamily:'Georgia,serif'}}>Bons plans</h2>
            {PARTENAIRES.map((cat,ci) => (
              <div key={cat.categorie} style={{marginBottom: ci<PARTENAIRES.length-1 ? '28px' : 0}}>
                <p style={{color:C.textLight, fontSize:'10px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 14px'}}>{cat.categorie}</p>
                <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                  {cat.items.map((item,i) => (
                    <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', background:C.white, borderRadius:'14px', border:`1px solid ${C.border}`}}>
                      <div>
                        <p style={{color:C.dark, fontSize:'14px', fontWeight:700, margin:'0 0 2px'}}>{item.nom}</p>
                        <p style={{color:C.textLight, fontSize:'12px', margin:0}}>{item.desc}</p>
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

function Onboarding({onSave}: {onSave:(dpa:string,prenom:string)=>void}) {
  const [dpa, setDpa] = useState('');
  const [prenom, setPrenom] = useState('');
  return (
    <main style={{minHeight:'100vh', background:C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'420px', width:'100%'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:'28px'}}>
          <svg viewBox="0 0 300 300" width="64" height="64">
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
