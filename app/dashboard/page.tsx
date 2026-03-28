'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const C = {
  dark:       '#1e2535',
  blue:       '#2E5F8A',
  blueDark:   '#1A3D5C',
  gold:       '#c8a060',
  white:      '#ffffff',
  bg:         '#ffffff',
  border:     '#f0ede8',
  text:       '#1e2535',
  textLight:  '#6B8FA8',
  muted:      '#9aa0a8',
  orange:     '#FFF0E6',
  orangeText: '#7A3010',
  orangeHead: '#3D1A0A',
  orangeEye:  '#C04A1A',
  green:      '#E4F5EC',
  greenText:  '#0A4A28',
  greenHead:  '#0A2E1A',
  greenEye:   '#0D6B40',
  amber:      '#FFF7E0',
  amberText:  '#6A4A08',
  amberHead:  '#3A2800',
  amberEye:   '#8A6010',
  teal:       '#E0F5F0',
  tealText:   '#0A4A3C',
  tealHead:   '#0A2A24',
  tealEye:    '#0A6050',
  coral:      '#FDECEA',
  coralText:  '#7A2020',
  coralHead:  '#3D0A0A',
  coralEye:   '#A03030',
  blueLight:  '#E6F0FA',
  blueLightText: '#1A3A6A',
};

interface SAData {
  emoji: string;
  taille: string;
  poids: string;
  titre: string;
  intro: string;
  developpement: string;
  organes: string[];
  savistu: string;
  faq: { q: string; r: string }[];
  maman_titre: string;
  maman: string;
  maman_aide: string;
  maman_signe: string;
  alerte: string;
  doc_titre: string;
  doc: string;
  conseil: string;
}

const SD: Record<number, SAData> = {
  6: {
    emoji: '🌾', taille: '0.6 cm', poids: '< 1 g',
    titre: 'Le cœur bat pour la première fois',
    intro: 'À 6 SA, bébé mesure à peine 0,6 cm — comme un grain de riz. Mais son cœur bat déjà à environ 110 battements par minute. C\'est la semaine où tout commence vraiment.',
    developpement: 'Le tube neural se referme — c\'est la structure qui deviendra le cerveau et la moelle épinière. Le cœur effectue ses premières contractions. Les bourgeons des membres (futurs bras et jambes) apparaissent. Le foie commence à produire les premiers globules rouges.',
    organes: ['🫀 Cœur : 110 bpm', '🧠 Tube neural se ferme', '🦴 Bourgeons des membres', '🩸 Foie : globules rouges'],
    savistu: 'Le cœur de bébé bat déjà à 6 SA — mais si petit qu\'une échographie ne peut pas toujours le visualiser. Ces premières pulsations seront recherchées lors de la première consultation médicale.',
    faq: [
      { q: 'Faut-il prendre de l\'acide folique ?', r: 'Oui — idéalement dès avant la grossesse. L\'acide folique (vitamine B9) est essentiel pour la fermeture du tube neural. Si ce n\'est pas commencé, commencer immédiatement sur prescription médicale.' },
      { q: 'Peut-elle faire du sport ?', r: 'L\'activité modérée est recommandée : marche, natation, yoga prénatal. Éviter les sports de contact et les efforts intenses. En cas de doute, demander à la sage-femme ou au médecin.' },
    ],
    maman_titre: 'La fatigue et les nausées s\'installent',
    maman: 'La progestérone — une hormone qui prépare l\'utérus à accueillir bébé — provoque une fatigue intense dès les premières semaines. Les nausées peuvent survenir à toute heure de la journée (le terme "matinales" est trompeur). Les seins sont souvent sensibles et gonflés. Certaines femmes ressentent aussi des saignements très légers d\'implantation — sans danger.',
    maman_aide: 'Gingembre, biscuits secs, petits repas fréquents. Prends le relais en cuisine si certaines odeurs la font souffrir. Ton soutien pratique et silencieux compte énormément.',
    maman_signe: 'Les nausées intenses sont souvent le signe d\'un bon taux de hCG (hormone de grossesse). Paradoxalement, elles sont rassurantes.',
    alerte: 'Si elle vomit plus de 3 fois par jour et ne peut plus s\'hydrater, consulter un médecin — c\'est une hyperemesis gravidarum (nausées sévères) qui nécessite une prise en charge.',
    doc_titre: 'Les premières analyses de sang',
    doc: 'Lors de la première consultation, plusieurs prises de sang sont prescrites. Elles vérifient le groupe sanguin, l\'immunité contre la rubéole et la toxoplasmose. La toxoplasmose est une infection transmissible par la viande crue et les excréments de chat — bénigne normalement, mais dangereuse pour bébé si la mère n\'est pas immunisée. Sans immunité, éviter la viande crue, les fruits de mer crus et le nettoyage de la litière.',
    conseil: 'Prends le relais sur les tâches ménagères sans attendre qu\'elle demande. C\'est le soutien le plus concret à ce stade.',
  },
  7: {
    emoji: '🫐', taille: '1 cm', poids: '1 g',
    titre: 'Le visage commence à se dessiner',
    intro: 'À 7 SA, bébé mesure 1 cm — comme une petite pile bouton. Le visage prend forme : les fosses nasales et les bourgeons des oreilles sont déjà visibles.',
    developpement: 'Le visage se structure progressivement avec les fosses nasales, les bourgeons oculaires et les ébauches des oreilles. Les bras et les jambes s\'allongent. Le foie commence à produire des cellules sanguines. Le cerveau se développe à un rythme exceptionnel.',
    organes: ['🧠 Deux hémisphères distincts', '👁️ Cristallin en formation', '👂 Canaux semi-circulaires', '🫁 Premiers bourgeons bronchiques'],
    savistu: 'Les empreintes digitales de bébé commencent à se former à 7 SA. Elles sont déjà uniques et ne changeront jamais — c\'est la première marque d\'identité biologique de ton enfant.',
    faq: [
      { q: 'Comment aider contre les nausées ?', r: 'Gingembre sous toutes ses formes (tisane, bonbons, biscuits au gingembre), biscuits secs avant de se lever, petits repas fréquents sans odeur forte. Certains médicaments anti-nausées sont autorisés — demander au médecin.' },
      { q: 'L\'ibuprofène est-il autorisé ?', r: 'Non. L\'ibuprofène est interdit pendant toute la grossesse. Seul le paracétamol est autorisé pour les douleurs, à la dose minimale efficace.' },
    ],
    maman_titre: 'Les nausées atteignent souvent leur pic',
    maman: 'L\'hypersensibilité aux odeurs peut rendre certains espaces insupportables. Une hypersalivation (production excessive de salive, appelée ptyalisme) peut aussi apparaître — normale mais inconfortable. La fatigue reste intense car le corps construit le placenta, un organe entier, en parallèle.',
    maman_aide: 'Repas froids plutôt que chauds — ils ont moins d\'odeur. Petites quantités souvent. Évite de faire chauffer des plats odorants.',
    maman_signe: 'L\'hypersensibilité aux odeurs est un mécanisme de protection naturel : le corps pousse à éviter les aliments potentiellement risqués pendant la grossesse.',
    alerte: 'Si elle ne peut plus s\'hydrater correctement pendant 24h, consulter rapidement — la déshydratation en grossesse est une urgence médicale.',
    doc_titre: 'Pourquoi le 1er trimestre est si épuisant',
    doc: 'Le corps fabrique un nouvel organe — le placenta — en 12 semaines. C\'est une charge énorme. La progestérone ralentit aussi le système digestif pour mieux absorber les nutriments destinés à bébé. Résultat : fatigue, somnolence, difficultés à se concentrer. C\'est entièrement physiologique et temporaire.',
    conseil: 'Propose des repas sans odeur, froids si nécessaire. Être présent sans surprotéger est la clé.',
  },
  8: {
    emoji: '🫐', taille: '1.6 cm', poids: '1 g',
    titre: 'Tous les organes en construction simultanée',
    intro: 'À 8 SA, bébé mesure 1,6 cm — comme une pile AA. Les doigts commencent à se séparer. C\'est une semaine charnière : tous les organes principaux sont simultanément en cours de formation.',
    developpement: 'Les doigts commencent à se séparer distinctement. Le cerveau se développe si rapidement qu\'il forme déjà des plis pour augmenter sa surface. Les organes génitaux se différencient mais ne sont pas encore visibles à l\'échographie. La période embryonnaire touche à sa fin.',
    organes: ['🧠 Premiers sillons corticaux', '🫀 4 cavités distinctes', '✋ Doigts en séparation', '🫘 Premiers néphrons (reins)', '👁️ Rétine pigmentée'],
    savistu: 'Le cerveau de bébé produit environ 100 nouvelles cellules nerveuses par minute à 8 SA. C\'est l\'une des phases de prolifération neuronale les plus intenses de toute sa vie.',
    faq: [
      { q: 'Peut-elle prendre un bain chaud ?', r: 'Les bains très chauds (> 38°C) sont à éviter au 1er trimestre — la chaleur excessive peut perturber le développement du tube neural. Un bain tiède est parfait.' },
      { q: 'Qu\'est-ce que la constipation de grossesse ?', r: 'La progestérone ralentit le transit intestinal pour mieux absorber les nutriments. C\'est normal. Alimentation riche en fibres, bonne hydratation, activité douce. Des laxatifs doux peuvent être prescrits si nécessaire.' },
    ],
    maman_titre: 'La fatigue est à son maximum',
    maman: 'La progestérone provoque une fatigue écrasante — le corps consacre une énergie considérable à la construction du placenta. Des maux de tête peuvent apparaître liés aux changements de circulation sanguine. La constipation s\'installe souvent. Des sautes d\'humeur intenses sont normales.',
    maman_aide: 'Alimentation riche en fibres et bonne hydratation pour la constipation. Pour les maux de tête : paracétamol autorisé, jamais d\'ibuprofène.',
    maman_signe: 'La constipation est un signe que le corps fait bien son travail — le transit ralentit pour mieux absorber les nutriments destinés à bébé.',
    alerte: 'En cas de saignements importants avec douleurs abdominales intenses, appeler la maternité immédiatement.',
    doc_titre: 'Ce que comprend la première consultation',
    doc: 'La première consultation médicale a lieu idéalement entre 8 et 10 SA. Elle comprend un examen clinique, le calcul de la DPA (date prévue d\'accouchement), une ordonnance de prises de sang, et la prescription d\'acide folique. C\'est aussi le moment de déclarer la grossesse à la Sécurité sociale sur ameli.fr — obligatoire avant 15 SA pour ouvrir les droits aux remboursements à 100%.',
    conseil: 'Prends le relais sur les tâches ménagères sans qu\'elle ait à demander. Anticipe.',
  },
  9: {
    emoji: '🫒', taille: '2.3 cm', poids: '2 g',
    titre: 'Bébé ressemble déjà à un humain',
    intro: 'À 9 SA, bébé mesure 2,3 cm — comme un bouchon de liège. Le visage est distinctement humain. Il peut sucer son pouce. Les dents de lait se forment déjà sous les gencives.',
    developpement: 'Bébé bouge mais est trop petit pour être senti. Tous les organes principaux sont en place — les semaines suivantes serviront à les perfectionner. Le fœtus peut sucer son pouce. Les dents de lait commencent à se former sous les gencives. Le visage est reconnaissablement humain.',
    organes: ['🦷 Dents de lait sous les gencives', '👁️ Paupières fusionnées', '🧠 Cervelet visible', '🫁 Lobules pulmonaires en formation'],
    savistu: 'À 9 SA, le cœur de bébé bat à environ 170 battements par minute — deux fois plus vite que le tien. Ce rythme élevé est normal et signe d\'un développement cardiaque sain.',
    faq: [
      { q: 'Peut-elle garder son chat ?', r: 'Oui — à condition d\'éviter de nettoyer la litière (risque de toxoplasmose). Si elle n\'est pas immunisée, quelqu\'un d\'autre doit s\'en charger, ou utiliser des gants et se laver les mains soigneusement.' },
      { q: 'Quand passer la première échographie ?', r: 'Entre 11 et 13 SA. Elle mesure la clarté nucale et date précisément la grossesse. C\'est l\'un des examens les plus importants du 1er trimestre.' },
    ],
    maman_titre: 'Les sautes d\'humeur sont normales',
    maman: 'Les fluctuations hormonales — surtout l\'œstrogène et la progestérone — provoquent des sautes d\'humeur intenses et imprévisibles. Ce n\'est pas dirigé contre toi. L\'anxiété autour du risque de fausse couche (statistiquement présent avant 12 SA) peut aussi s\'ajouter à ces émotions.',
    maman_aide: 'Écoute sans chercher à résoudre. Ne prends pas la défense, ne minimise pas. Ta stabilité émotionnelle est un ancrage précieux dans cette période instable.',
    maman_signe: 'Les émotions fortes en début de grossesse sont documentées scientifiquement — le cerveau se reconfigure pour développer les circuits de l\'attachement maternel.',
    alerte: 'En cas de crampes importantes avec saignements rouges, consulter rapidement — ce sont des signes à surveiller au 1er trimestre.',
    doc_titre: 'Le risque de fausse couche au 1er trimestre',
    doc: 'Le risque de fausse couche est le plus élevé entre 6 et 10 SA, puis diminue fortement chaque semaine. À 9 SA, il est encore d\'environ 5-8%. À 12 SA, il passe sous 2%. C\'est pour cette raison que beaucoup de couples attendent ce cap pour annoncer la grossesse. Cette attente peut être stressante — sois présent et dédramatise sans minimiser l\'inquiétude.',
    conseil: 'Les sautes d\'humeur ne sont pas dirigées contre toi — elles sont biochimiques. Accueille avec calme et patience.',
  },
  10: {
    emoji: '🍓', taille: '3 cm', poids: '4 g',
    titre: 'La période embryonnaire est terminée',
    intro: 'À 10 SA, bébé mesure 3 cm — comme une balle de ping-pong. Il est officiellement un fœtus. Les ongles apparaissent. Il peut faire des petits mouvements spontanés visibles à l\'échographie.',
    developpement: 'Les ongles apparaissent. Bébé fait des petits mouvements spontanés visibles à l\'échographie. Le foie commence à produire de la bile. La période embryonnaire est terminée — tous les organes essentiels sont en place et commencent leur maturation.',
    organes: ['🫀 Cœur : 4 cavités complètes', '🫘 Foie : production de bile', '💅 Premiers ongles kératinisés', '🦷 Thyroïde fonctionnelle'],
    savistu: 'À 10 SA, tous les organes essentiels sont en place. Les 30 semaines suivantes serviront uniquement à les faire grandir et maturer. La phase de construction est terminée.',
    faq: [
      { q: 'Quand annoncer la grossesse ?', r: 'La plupart des couples attendent 12 SA — après la première échographie qui confirme que tout va bien et que le risque de fausse couche chute sous 2%. Rien n\'oblige à attendre, c\'est une décision entièrement personnelle.' },
      { q: 'Les nausées vont-elles s\'arrêter ?', r: 'Pour la plupart des femmes, les nausées diminuent progressivement entre 10 et 14 SA quand le taux de hCG commence à se stabiliser. Certaines femmes les ont pendant toute la grossesse — c\'est rare mais possible.' },
    ],
    maman_titre: 'Un peu de répit souvent en vue',
    maman: 'Les nausées commencent souvent à diminuer progressivement. Un regain d\'énergie peut apparaître. La libido peut revenir progressivement. Le ventre ne se voit pas encore mais les vêtements commencent à serrer dans la région du ventre.',
    maman_aide: 'C\'est le bon moment pour planifier la première échographie ensemble si ce n\'est pas encore fait.',
    maman_signe: 'La diminution des nausées vers 10-12 SA est normale — le taux de hCG commence à se stabiliser après son pic.',
    alerte: 'Si les nausées disparaissent brusquement et complètement du jour au lendemain (et non progressivement), mentionner cela au médecin lors de la prochaine consultation.',
    doc_titre: 'Comprendre la première échographie',
    doc: 'La première échographie a lieu entre 11 et 13 SA. Elle sert à dater précisément la grossesse, à mesurer la clarté nucale (un espace à la nuque de bébé qui aide à évaluer le risque de trisomie 21), et à voir le cœur battre. C\'est souvent le moment le plus marquant du 1er trimestre pour les deux parents — prends une demi-journée et filme.',
    conseil: 'La première échographie approche. Sois pleinement présent — téléphone en mode silencieux, filme si tu peux.',
  },
  11: {
    emoji: '🍋', taille: '4 cm', poids: '7 g',
    titre: 'Les os commencent à se solidifier',
    intro: 'À 11 SA, bébé mesure 4 cm — comme un bouchon de vin. Les os se solidifient progressivement. Le fœtus avale du liquide amniotique, entraînant ses futurs réflexes de déglutition.',
    developpement: 'Les os se solidifient par ossification — le cartilage se transforme progressivement en os. Le fœtus avale et inhale du liquide amniotique, entraînant ses futurs réflexes. Les muscles répondent à des stimulations. Les dents de lait se forment sous les gencives.',
    organes: ['🦴 Ossification débutante', '🦷 Bourgeons dentaires sous gencives', '💪 Premiers mouvements volontaires', '🫀 Foie : 10% de la masse totale'],
    savistu: 'À 11 SA, le fœtus peut distinguer les sons graves de l\'extérieur — ta voix, plus grave, est l\'une des mieux perçues. C\'est le bon moment pour commencer à lui parler.',
    faq: [
      { q: 'La linea nigra — c\'est quoi ?', r: 'C\'est une ligne brune qui peut apparaître sur le ventre, causée par une stimulation des mélanocytes (cellules pigmentaires) par les œstrogènes. Elle touche 75% des femmes enceintes et disparaît spontanément après l\'accouchement.' },
      { q: 'Peut-elle se teindre les cheveux ?', r: 'Les teintures sont déconseillées au 1er trimestre. À partir du 2e trimestre, les teintures sans ammoniaque sont généralement tolérées, mais il vaut mieux en parler avec le médecin.' },
    ],
    maman_titre: 'Le ventre commence légèrement à s\'arrondir',
    maman: 'Le ventre commence à pointer, surtout visible pour les femmes minces ou en deuxième grossesse. La linea nigra (une ligne brune verticale sur le ventre) peut apparaître — c\'est normal. Les cheveux et ongles poussent plus vite grâce aux œstrogènes.',
    maman_aide: 'Si elle se sent mal dans son corps, ta bienveillance et tes retours positifs comptent beaucoup. Accompagne-la si elle veut chercher des vêtements de grossesse.',
    maman_signe: 'La linea nigra est causée par les hormones et disparaît spontanément après l\'accouchement — pas de traitement nécessaire.',
    alerte: 'Les saignements légers après un rapport sexuel sont possibles et sans danger — le col est très vascularisé pendant la grossesse. Si abondants, appeler le médecin.',
    doc_titre: 'Déclarer la grossesse à la Sécu',
    doc: 'Avant 15 SA, la grossesse doit être déclarée à la Sécurité sociale sur ameli.fr — c\'est obligatoire et ça ouvre les droits aux remboursements à 100% de tous les soins liés à la grossesse. C\'est aussi le moment de prévenir la mutuelle complémentaire.',
    conseil: 'Accompagne-la chercher ses premiers vêtements de grossesse si elle en a envie — c\'est souvent un moment émotionnel.',
  },
  12: {
    emoji: '🍋', taille: '5.4 cm', poids: '14 g',
    titre: 'Le cap des 12 SA — un tournant majeur',
    intro: 'À 12 SA, bébé mesure 5,4 cm — comme une balle de golf. C\'est la fin du 1er trimestre. Le risque de fausse couche chute sous 2%. L\'échographie T1 est réalisée cette semaine.',
    developpement: 'Le visage est pleinement reconnaissable avec ses traits humains. Les reins commencent à produire de l\'urine. L\'échographie T1 mesure la clarté nucale pour évaluer le risque de trisomie 21. C\'est le cap qui marque la fin de la période la plus fragile.',
    organes: ['🧠 Hémisphères bien séparés', '🫘 Reins : production d\'urine', '🫁 Poumons : premières inspirations de liquide', '🫀 Cœur : 4 cavités complètes visibles'],
    savistu: 'Après 12 SA, le risque de fausse couche passe sous 2%. À 10 SA, il était encore à 5-8%. Chaque semaine qui passe renforce cette sécurité. C\'est pour ça que beaucoup attendent ce cap pour annoncer.',
    faq: [
      { q: 'Qu\'est-ce que la trisomie 21 ?', r: 'C\'est une anomalie chromosomique (un chromosome 21 en trop) qui entraîne un handicap intellectuel et physique. Le dépistage prénatal permet d\'évaluer le risque — ce n\'est pas un diagnostic. La décision d\'approfondir les examens appartient entièrement aux parents.' },
      { q: 'Qu\'est-ce que la clarté nucale ?', r: 'C\'est un espace entre la nuque et la peau du fœtus mesuré à l\'échographie. Si elle est augmentée, le risque de trisomie 21 est plus élevé — le médecin proposera alors une prise de sang complémentaire pour affiner l\'évaluation.' },
    ],
    maman_titre: 'Un soulagement souvent palpable',
    maman: 'Le passage de 12 SA est souvent vécu comme une libération émotionnelle. L\'énergie revient progressivement. L\'utérus dépasse maintenant le bassin — le ventre commence à être visible. Le risque de fausse couche passe sous 2%.',
    maman_aide: 'C\'est le moment d\'annoncer la grossesse si vous le souhaitez. Accompagne-la dans cette réflexion.',
    maman_signe: 'Après 12 SA, le risque de fausse couche tombe sous 2%. La grossesse entre dans sa phase la plus stable.',
    alerte: 'L\'échographie T1 mesure la clarté nucale. Si elle est augmentée, des examens complémentaires sont proposés pour évaluer le risque de trisomie. Ce n\'est pas un diagnostic — c\'est un dépistage.',
    doc_titre: 'L\'échographie T1 expliquée',
    doc: 'L\'échographie du 1er trimestre se fait entre 11 et 13 SA. Elle date précisément la grossesse, examine le cœur, et mesure la clarté nucale (un espace entre la nuque et la peau). Combinée à une prise de sang, elle permet d\'évaluer le risque de trisomie 21. C\'est un dépistage, pas un diagnostic — un résultat à risque ne signifie pas que bébé a une trisomie. Durée : 30 à 45 minutes.',
    conseil: 'L\'échographie T1 est un rendez-vous majeur. Sois là, sans exception. Apporte ton téléphone chargé pour filmer.',
  },
  13: {
    emoji: '🍑', taille: '7.4 cm', poids: '23 g',
    titre: 'Bébé peut sucer son pouce',
    intro: 'À 13 SA, bébé mesure 7,4 cm — comme un marqueur. Le 2e trimestre commence. Bébé peut sucer son pouce. Les empreintes digitales sont définitives.',
    developpement: 'Bébé peut sucer son pouce — le réflexe de succion est pleinement opérationnel. Les empreintes digitales sont définitives et uniques. Le système urinaire fonctionne : bébé urine dans le liquide amniotique. Les cordes vocales se forment.',
    organes: ['👍 Réflexe de succion actif', '🖐️ Empreintes digitales définitives', '🫘 Système urinaire fonctionnel', '🗣️ Cordes vocales en formation', '🫁 Pancréas : insuline sécrétée'],
    savistu: 'Les empreintes digitales de bébé se forment définitivement à 13 SA. Elles résultent d\'interactions aléatoires entre la pression cutanée et la croissance des cellules — un processus unique à chaque individu.',
    faq: [
      { q: 'Le congé paternité — comment ça fonctionne ?', r: 'En France, le congé paternité dure 25 jours calendaires (week-ends inclus), dont 4 obligatoires à prendre dans les jours suivant la naissance. Il est indemnisé à 100% du salaire net dans la limite du plafond Sécu. À déclarer à l\'employeur au moins 1 mois avant.' },
      { q: 'Faut-il choisir la maternité maintenant ?', r: 'Dans les grandes villes, oui — les maternités se remplissent vite. Renseignez-vous sur les maternités proches, leurs niveaux (1, 2 ou 3 selon la complexité des naissances gérées), et prenez rendez-vous pour une visite.' },
    ],
    maman_titre: 'Le trimestre le plus confortable commence',
    maman: 'L\'énergie revient souvent avec le 2e trimestre. Les nausées disparaissent pour la plupart des femmes. La libido peut augmenter. Le ventre s\'arrondit de façon agréable. C\'est souvent la période décrite comme la plus douce de la grossesse.',
    maman_aide: 'C\'est le bon moment pour un week-end en amoureux — énergie revenue, ventre encore gérable.',
    maman_signe: 'Le 2e trimestre est souvent décrit comme "la lune de miel de la grossesse" — profitez de cette énergie retrouvée.',
    alerte: 'Les douleurs ligamentaires dans le bas du ventre sont fréquentes au 2e trimestre — c\'est l\'étirement des ligaments ronds qui soutiennent l\'utérus. Normales et sans gravité.',
    doc_titre: 'Le congé paternité en détail',
    doc: 'Le congé paternité dure 25 jours calendaires dont 4 obligatoires à prendre dans les 4 jours suivant la naissance. Il peut être fractionné en 2 périodes. Il est indemnisé à 100% du salaire net dans la limite du plafond Sécu. À déclarer à l\'employeur au moins 1 mois avant la date prévue. L\'employeur ne peut pas le refuser.',
    conseil: 'C\'est le bon moment pour annoncer officiellement. Parlez des prénoms, de l\'organisation — projeter ensemble crée du lien.',
  },
  14: {
    emoji: '🍑', taille: '8.7 cm', poids: '43 g',
    titre: 'Le sexe de bébé parfois visible',
    intro: 'À 14 SA, bébé mesure 8,7 cm — comme une télécommande. Les reins fonctionnent. Le sexe peut parfois être deviné à l\'échographie, sans garantie.',
    developpement: 'Les reins filtrent le sang et produisent de l\'urine que bébé élimine dans le liquide amniotique — qu\'il avale ensuite. Cycle normal de filtration. Le sexe de bébé peut parfois être deviné mais l\'écho T2 à 22 SA est beaucoup plus fiable.',
    organes: ['🫘 Reins : filtration active', '🩺 Placenta pleinement fonctionnel', '🛡️ Thymus : maturation immunitaire', '🩸 Groupe sanguin défini'],
    savistu: 'Le placenta à 14 SA produit suffisamment d\'hormones pour maintenir la grossesse seul — le corps jaune qui prenait le relais depuis le début peut désormais disparaître.',
    faq: [
      { q: 'Peut-on connaître le sexe à l\'écho ?', r: 'À 14 SA, c\'est possible mais pas fiable. L\'échographie T2 à 22 SA est beaucoup plus précise pour déterminer le sexe de bébé.' },
      { q: 'Les douleurs ligamentaires — comment les soulager ?', r: 'Changement de position lent, éviter les mouvements brusques, ceinture de grossesse si les douleurs sont fréquentes. Si intenses avec fièvre ou saignements, consulter.' },
    ],
    maman_titre: 'Le ventre s\'arrondit clairement',
    maman: 'Le ventre s\'arrondit clairement. La libido est souvent revenue. Des douleurs ligamentaires dans le bas du ventre peuvent apparaître — c\'est l\'étirement normal des ligaments ronds. Le volume sanguin augmente de 40% sur toute la grossesse, ce qui peut provoquer des palpitations légères.',
    maman_aide: 'Proposez un week-end en amoureux — c\'est le moment idéal : énergie revenue, ventre encore gérable, accouchement loin.',
    maman_signe: 'L\'augmentation du volume sanguin de 40% explique les palpitations et la légère baisse de tension parfois ressenties en début de grossesse.',
    alerte: 'Si les douleurs ligamentaires sont très intenses, avec boiterie ou irradiation dans les cuisses, parler d\'une possible SPD (douleur de la symphyse pubienne) à la sage-femme.',
    doc_titre: 'Les droits et aides pendant la grossesse',
    doc: 'La grossesse ouvre des droits spécifiques : remboursement à 100% des soins liés à la grossesse par la Sécu, congé maternité (16 semaines pour le 1er enfant), prime à la naissance de la CAF (environ 1 000€), allocations familiales. Se renseigner sur ameli.fr et caf.fr.',
    conseil: 'Proposez un week-end en amoureux. Le 2e trimestre est la fenêtre idéale pour ce moment à deux.',
  },
  15: {
    emoji: '🍎', taille: '10 cm', poids: '70 g',
    titre: 'Bébé entend pour la première fois',
    intro: 'À 15 SA, bébé mesure 10 cm — comme une balle de squash. Il entend pour la première fois. Les vibrations sonores traversent le liquide amniotique. Les voix graves — comme la tienne — sont parmi les mieux perçues.',
    developpement: 'La cochlée (organe de l\'ouïe dans l\'oreille interne) est fonctionnelle. Bébé peut percevoir les sons graves. Le squelette continue de se solidifier. Le sens de l\'odorat se développe.',
    organes: ['👂 Cochlée fonctionnelle', '🦴 Solidification osseuse avancée', '🧴 Premiers dépôts de graisse brune', '🌬️ Récepteurs olfactifs actifs'],
    savistu: 'Des études montrent que les nouveau-nés reconnaissent les voix entendues in utero et y réagissent différemment. Parler à bébé chaque soir n\'est pas symbolique — c\'est le début concret de votre relation.',
    faq: [
      { q: 'Faut-il lui jouer de la musique ?', r: 'Pas obligatoire, mais ça ne fait pas de mal. Ta voix naturelle est ce qui compte le plus — plus grave, elle traverse mieux le liquide amniotique. Évite les sons très forts directement sur le ventre.' },
      { q: 'Les vergetures — peut-on les prévenir ?', r: 'Les vergetures sont génétiquement déterminées — aucune crème ne peut totalement les prévenir. Une bonne hydratation de la peau limite l\'inconfort et peut réduire leur étendue, mais pas leur apparition si elle y est prédisposée génétiquement.' },
    ],
    maman_titre: 'Les premiers mouvements bientôt',
    maman: 'La prise de poids devient visible. Des vergetures peuvent apparaître sur les seins, le ventre ou les hanches — génétiquement déterminées et non liées à la qualité de la peau. Le système cardiovasculaire travaille davantage avec l\'augmentation du volume sanguin.',
    maman_aide: 'Propose une huile ou crème hydratante pour le ventre chaque soir — pas pour prévenir les vergetures, mais pour le confort et la connexion.',
    maman_signe: 'Les voix masculines, plus graves, traversent mieux le liquide amniotique. Ta voix est l\'une des mieux perçues par bébé in utero dès maintenant.',
    alerte: 'Si elle ressent les premiers mouvements de bébé (souvent entre 16 et 20 SA), c\'est normal. Avant, les mouvements existent mais ne sont pas encore perceptibles.',
    doc_titre: 'Parler à bébé — ce que la science dit',
    doc: 'Des études publiées dans Infant Behavior and Development montrent que les nouveau-nés reconnaissent les voix entendues in utero et y réagissent différemment. Parler à bébé chaque soir peut sembler bizarre au début — fais-le quand même. C\'est le début de votre relation avant la naissance.',
    conseil: 'Parle à bébé chaque soir. Il reconnaîtra ta voix à la naissance.',
  },
  16: {
    emoji: '🥑', taille: '11.6 cm', poids: '100 g',
    titre: 'Les premiers mouvements approchent',
    intro: 'À 16 SA, bébé mesure 11,6 cm — comme un avocat. Le squelette se renforce. Les premières sensations de mouvement peuvent apparaître pour la mère.',
    developpement: 'Le squelette se renforce progressivement — le cartilage se transforme en os. Les yeux peuvent percevoir la lumière bien que toujours fermés. Le système nerveux central coordonne mieux les mouvements. Le fœtus peut attraper son propre cordon ombilical.',
    organes: ['🦴 Ossification à 60%', '👁️ Sensibles à la lumière', '🫧 Liquide amniotique : ~200 ml', '🔗 Cordon : 3 vaisseaux distincts'],
    savistu: 'À 16 SA, le fœtus peut attraper son propre cordon ombilical — comportement exploratoire précoce qui témoigne du développement de sa coordination motrice.',
    faq: [
      { q: 'L\'anémie de grossesse — c\'est grave ?', r: 'L\'anémie est très courante pendant la grossesse — les globules rouges doivent irriguer deux corps. Elle se traite facilement avec un supplément en fer prescrit par le médecin et une alimentation riche en fer (viande rouge, légumes verts, légumineuses).' },
      { q: 'Quand réserver les cours de préparation à l\'accouchement ?', r: 'Maintenant — les cours se remplissent vite, surtout en ville. Des cours spécifiques pour les pères existent dans de nombreuses maternités. Ils couvrent le déroulement du travail, les techniques de soutien et la péridurale.' },
    ],
    maman_titre: 'Les "papillons" dans le ventre',
    maman: 'Les premiers mouvements de bébé peuvent être perçus — souvent décrits comme des bulles ou des papillons dans le ventre. La pression sur la vessie augmente avec la croissance de l\'utérus. Des crampes dans les jambes peuvent apparaître la nuit.',
    maman_aide: 'Pose ta main sur son ventre le soir. Même si tu ne sens encore rien, ce rituel crée une connexion réelle.',
    maman_signe: 'Les premiers mouvements sentis par la mère s\'appellent les "quickenings" — souvent confondus avec des gaz au début. C\'est un moment très fort émotionnellement.',
    alerte: 'Si elle parle d\'anémie lors de la prochaine prise de sang, c\'est fréquent en grossesse — les globules rouges doivent irriguer deux corps. Un supplément en fer peut être prescrit.',
    doc_titre: 'Réserver les cours de préparation à l\'accouchement',
    doc: 'Les cours de préparation à l\'accouchement sont remboursés par la Sécurité sociale (jusqu\'à 8 séances). Ils se remplissent vite, surtout en ville. Des cours spécifiques pour les pères existent — renseigne-toi auprès de la maternité ou d\'une sage-femme libérale. Ces cours couvrent le déroulement du travail, les techniques de respiration, la péridurale, et le rôle du père en salle de naissance.',
    conseil: 'Réserve les cours de préparation à l\'accouchement maintenant — ils se remplissent vite.',
  },
  17: {
    emoji: '🍐', taille: '13 cm', poids: '140 g',
    titre: 'La graisse brune commence à se former',
    intro: 'À 17 SA, bébé mesure 13 cm — comme un iPhone. Une couche de graisse brune se forme sous la peau. Elle servira à réguler la température corporelle après la naissance.',
    developpement: 'La graisse brune (tissu adipeux brun) commence à se former sous la peau — son unique fonction est de produire de la chaleur pour maintenir la température corporelle après la naissance. Les empreintes de la paume se forment définitivement.',
    organes: ['🧈 Graisse brune : thermogenèse', '💩 Méconium : premiers résidus', '🖐️ Empreintes palmaires définitives', '🧠 Gyri et sulci visibles au cerveau'],
    savistu: 'Le "pregnancy brain" (ou baby brain) est réel — des études IRM montrent une réorganisation neurologique pendant la grossesse. Le cerveau se reconfigure pour développer les circuits de l\'attachement maternel, au détriment temporaire de certaines fonctions cognitives.',
    faq: [
      { q: 'Peut-elle voyager en avion ?', r: 'Oui jusqu\'à 36 SA pour la plupart des compagnies, mais chaque compagnie a ses règles — vérifier avant. Un certificat médical peut être demandé à partir de 28 SA. Les vols longs augmentent le risque de phlébite — se lever régulièrement et porter des bas de contention.' },
      { q: 'Le "baby brain" — c\'est réel ou un mythe ?', r: 'C\'est documenté scientifiquement. Des études IRM montrent une réduction de la matière grise au T2 et T3, liée à une restructuration neurologique. Les circuits émotionnels se renforcent au détriment temporaire des fonctions cognitives. C\'est transitoire.' },
    ],
    maman_titre: 'Le "baby brain" — oui, c\'est réel',
    maman: 'La mémoire peut sembler défaillante — des études IRM confirment une réorganisation neurologique pendant la grossesse. Le cerveau se reconfigure pour développer les circuits de l\'attachement maternel. C\'est temporaire. Des douleurs dans les côtes peuvent aussi apparaître.',
    maman_aide: 'Ne te moque pas du "baby brain" — c\'est un phénomène documenté qui peut être frustrant à vivre.',
    maman_signe: 'La réorganisation neurologique de la grossesse renforce les circuits émotionnels et de l\'attachement — au détriment temporaire de certaines fonctions cognitives.',
    alerte: 'Des douleurs dans les côtes sont normales — l\'utérus pousse sur les côtes inférieures avec la croissance de bébé. Si intenses ou accompagnées de fièvre, consulter.',
    doc_titre: 'La myélinisation du cerveau',
    doc: 'La myélinisation est le processus qui enveloppe les neurones d\'une gaine protectrice pour accélérer la transmission des signaux nerveux. Elle commence à 17 SA dans certaines zones du cerveau. Ce processus se poursuivra jusqu\'à 25 ans pour les lobes frontaux (siège du raisonnement et du contrôle des émotions) — c\'est pourquoi le cerveau humain continue de se développer si longtemps après la naissance.',
    conseil: 'Pose ta main sur son ventre le soir en parlant à bébé. Ce rituel crée une connexion émotionnelle réelle.',
  },
  18: {
    emoji: '🫑', taille: '14.2 cm', poids: '190 g',
    titre: 'Le sens du toucher se développe',
    intro: 'À 18 SA, bébé mesure 14,2 cm — comme un stylo épais. Il développe son sens du toucher, explore son environnement avec ses mains. Il peut entendre la musique que vous écoutez.',
    developpement: 'Le système vestibulaire — qui gère l\'équilibre et la perception des mouvements — se met en place. Bébé explore son environnement avec ses mains et son visage. Les os se solidifient davantage. La myélinisation nerveuse progresse.',
    organes: ['⚖️ Système vestibulaire actif', '✋ Récepteurs cutanés du toucher', '🧬 Myéline : gaine nerveuse', '🦴 Vertèbres ossification avancée'],
    savistu: 'La myélinisation nerveuse commence à 18 SA dans certaines zones. Ce processus — qui protège les neurones et accélère les signaux nerveux — se poursuivra jusqu\'à 25 ans pour les lobes frontaux.',
    faq: [
      { q: 'La kinésithérapie pelvienne — c\'est quoi ?', r: 'La kiné pelvienne prénatale prépare le périnée à l\'accouchement, prévient les fuites urinaires post-partum, et aide à gérer la douleur pendant le travail. La HAS la recommande à toutes les femmes enceintes dès le 2e trimestre. Si pas encore prescrit, rappeler au médecin.' },
      { q: 'La diastasis abdominale — c\'est quoi ?', r: 'C\'est l\'écartement des deux colonnes de muscles abdominaux pour laisser place à l\'utérus. Elle touche 60% des femmes au 3e trimestre. Elle se résorbe seule après l\'accouchement dans la plupart des cas, avec de la kiné si besoin. Éviter les crunchs classiques pendant la grossesse.' },
    ],
    maman_titre: 'Le dos commence à souffrir',
    maman: 'La lordose lombaire s\'accentue — la courbe naturelle du bas du dos se creuse pour compenser le poids croissant du ventre. Des crampes nocturnes dans les mollets sont fréquentes et peuvent signaler un déficit en magnésium.',
    maman_aide: 'Massages du dos réguliers — pas besoin d\'être expert, une pression douce sur le bas du dos suffit. Ce geste quotidien soulage vraiment.',
    maman_signe: 'Les crampes nocturnes dans les mollets touchent 30% des femmes enceintes. Elles sont liées au magnésium — une supplémentation peut être prescrite.',
    alerte: 'Des crampes nocturnes fréquentes peuvent signaler un déficit en magnésium. Mentionner au médecin lors de la prochaine consultation.',
    doc_titre: 'La kiné pelvienne — pourquoi c\'est important',
    doc: 'La kinésithérapie pelvienne prénatale renforce le périnée, prépare à l\'accouchement et prévient les fuites urinaires post-partum. La HAS (Haute Autorité de Santé) recommande de la proposer à toutes les femmes enceintes dès le 2e trimestre. Si une ordonnance n\'a pas encore été donnée, c\'est le moment de la demander.',
    conseil: 'Propose des massages du dos réguliers. Ce geste quotidien renforce votre connexion et soulage vraiment.',
  },
  19: {
    emoji: '🥭', taille: '15.3 cm', poids: '240 g',
    titre: 'Tous les sens s\'éveillent',
    intro: 'À 19 SA, bébé mesure 15,3 cm — comme une canette de soda. Tous ses sens se développent rapidement. Le vernix caseosa — un enduit blanc et gras — commence à recouvrir sa peau pour la protéger.',
    developpement: 'Tous les sens se développent simultanément. Le vernix caseosa protège la peau fragile du fœtus du liquide amniotique. Les cellules cérébrales se multiplient à un rythme exceptionnel. Bébé peut goûter le liquide amniotique.',
    organes: ['👅 Papilles gustatives fonctionnelles', '👃 Récepteurs olfactifs actifs', '👁️ Photorécepteurs rétiniens', '🧴 Vernix caseosa protecteur'],
    savistu: 'Bébé peut goûter le liquide amniotique à 19 SA. Des études montrent que les bébés dont les mères ont mangé de l\'ail ou de la vanille pendant la grossesse les reconnaissent et les apprécient davantage après la naissance.',
    faq: [
      { q: 'Faut-il éviter certaines peintures pour la chambre de bébé ?', r: 'Oui pendant la grossesse — certaines peintures contiennent des perturbateurs endocriniens. Utiliser des peintures certifiées A+ et aérer au minimum 3 semaines avant l\'installation de bébé.' },
      { q: 'La congestion nasale pendant la grossesse — comment la soulager ?', r: 'Elle est causée par le gonflement des muqueuses lié à l\'augmentation du volume sanguin. Sérum physiologique, humidificateur dans la chambre. Ce n\'est pas un rhume — pas de décongestionnants nasaux sans avis médical.' },
    ],
    maman_titre: 'Le ventre est très visible',
    maman: 'Le ventre est désormais très visible. Des problèmes de congestion nasale peuvent apparaître — le volume sanguin augmenté gonfle les muqueuses. Le centre de gravité commence à se modifier, changeant la posture et pouvant provoquer des douleurs dorsales.',
    maman_aide: 'Un humidificateur dans la chambre aide pour la congestion nasale. Commander le coussin de grossesse si ce n\'est pas encore fait.',
    maman_signe: 'La congestion nasale de grossesse est causée par le gonflement des muqueuses lié à l\'augmentation du volume sanguin — pas un rhume.',
    alerte: 'Évite les peintures et rénovations dans la chambre de bébé pendant la grossesse — certains produits contiennent des perturbateurs endocriniens.',
    doc_titre: 'Ce que bébé goûte in utero',
    doc: 'Bébé peut goûter le liquide amniotique à 19 SA. Ce liquide reflète les saveurs de l\'alimentation maternelle. Des études publiées dans Chemical Senses montrent que les bébés dont les mères ont mangé de l\'ail ou de la vanille pendant la grossesse les reconnaissent et les apprécient davantage après la naissance. La diversité alimentaire de la mère pendant la grossesse prépare les préférences gustatives futures de bébé.',
    conseil: 'Préparez la chambre de bébé ensemble ce mois-ci — moment de complicité fort.',
  },
  20: {
    emoji: '🍌', taille: '16.4 cm', poids: '300 g',
    titre: 'La mi-grossesse',
    intro: 'À 20 SA, bébé mesure 16,4 cm — comme un livre de poche. C\'est la mi-grossesse. L\'échographie morphologique T2 est réalisée cette semaine — c\'est la plus importante de toute la grossesse.',
    developpement: 'Mi-grossesse. Bébé est recouvert du vernix caseosa protecteur. L\'échographie T2 examine en détail chaque organe, chaque membre, le cerveau. Le sexe est généralement visible.',
    organes: ['🧠 Cerveau : tous les lobes visibles', '🫀 Cœur T2 : 4 cavités + valves', '🫘 Reins fonctionnels', '🦴 Squelette complet visible', '👁️ Cristallin développé'],
    savistu: 'L\'échographie morphologique T2 examine plus de 100 critères anatomiques. C\'est l\'examen médical le plus complet de toute la grossesse. Si le médecin souhaite revoir un point, c\'est souvent par précaution — ne pas paniquer avant d\'avoir les explications.',
    faq: [
      { q: 'L\'écho T2 peut-elle rater des anomalies ?', r: 'Oui — l\'échographie T2 peut manquer 20% des malformations selon les études. Ce n\'est pas un examen parfait. Si un doute est exprimé, des examens complémentaires sont proposés. Cela ne signifie pas une malformation.' },
      { q: 'Le sexe de bébé — peut-on vraiment le voir ?', r: 'Oui, dans la grande majorité des cas à 20 SA. Mais bébé peut ne pas coopérer si les jambes sont croisées ! Si la position ne permet pas de voir, le médecin réessaiera en fin d\'examen.' },
    ],
    maman_titre: 'L\'échographie T2 — un moment fort',
    maman: 'L\'échographie T2 est souvent vécue avec une anxiété mêlée d\'excitation. C\'est le rendez-vous médical le plus attendu de la grossesse. Elle peut durer de 45 à 90 minutes selon la coopération de bébé.',
    maman_aide: 'Prends une demi-journée de congé. Préparez vos questions en amont. Filmez si possible.',
    maman_signe: 'L\'écho T2 examine plus de 100 critères anatomiques. C\'est l\'examen le plus complet de la grossesse.',
    alerte: 'Si le médecin souhaite revoir un point ou refaire une échographie, c\'est souvent par précaution — ne pas paniquer avant d\'avoir les explications.',
    doc_titre: 'Ce que l\'écho T2 regarde',
    doc: 'L\'échographie morphologique T2 examine : le cerveau, le cœur (4 cavités + valves), les reins, l\'estomac, les membres, le visage (lèvres palatines), la colonne vertébrale, la position du placenta. Elle permet aussi généralement de connaître le sexe de bébé. Elle est réalisée par un médecin spécialisé en échographie fœtale. Durée : 45 à 90 minutes.',
    conseil: 'Prends une demi-journée de congé pour cette échographie. Filmez. C\'est un moment à vivre pleinement.',
  },
  21: { emoji:'🥕', taille:'26.7 cm', poids:'360 g', titre:'Bébé a son propre rythme', intro:'À 21 SA, bébé mesure 26,7 cm. Il a maintenant un cycle veille-sommeil distinct — il dort environ 12 à 14 heures par jour.', developpement:'Bébé a un cycle veille-sommeil distinct. Les mouvements sont de plus en plus coordonnés. Le système digestif s\'entraîne en absorbant le liquide amniotique.', organes:['😴 Cycle veille/sommeil 20-30 min','💩 Méconium s\'accumule','🦱 Lanugo couvre le corps','👁️ Mouvements REM actifs'], savistu:'Bébé est souvent le plus actif quand sa mère est au repos — les mouvements de la marche l\'endorment comme un bercement.', faq:[{q:'Le lanugo — c\'est quoi ?',r:'C\'est un duvet fin qui couvre le corps de bébé à 21 SA. Vestige évolutif qui servait d\'isolant thermique. Il disparaît avant ou peu après la naissance.'},{q:'À partir de quand compter les mouvements ?',r:'À partir de 28 SA, 10 mouvements en 2 heures en période active est le seuil rassurant. En dessous, appeler la maternité.'}], maman_titre:'Le ventre est bien là', maman:'Le ventre est très visible. Des reflux peuvent apparaître — l\'utérus comprime l\'estomac. La posture change, ce qui peut provoquer des douleurs dorsales.', maman_aide:'Des repas plus petits et plus fréquents aident avec les reflux. Surélever légèrement la tête du lit peut aussi aider.', maman_signe:'Le reflux de grossesse est causé par la compression de l\'estomac et le relâchement hormonal du sphincter œsophagien.', alerte:'Le lanugo visible à l\'échographie est normal et disparaît avant ou peu après la naissance.', doc_titre:'La liste de naissance — comment bien la faire', doc:'Conseil : inclure des articles à différents prix, prioriser l\'essentiel (siège auto, lit, poussette), éviter la surenchère. Les groupes de parents locaux et les sites de revente permettent d\'acquérir certains articles en très bon état pour beaucoup moins cher.', conseil:'Installe une veilleuse dans la chambre de bébé — premier geste concret pour l\'espace.',
  },
  22: { emoji:'🥭', taille:'27.8 cm', poids:'430 g', titre:'Les yeux sont formés', intro:'À 22 SA, bébé mesure 27,8 cm. Les yeux sont formés mais encore fermés. Les sourcils et cils sont visibles.', developpement:'Les yeux sont formés mais encore fermés. Les sourcils et cils sont visibles. Le sens du toucher est très développé. Les poumons produisent du liquide — entraînement à la respiration.', organes:['👁️ Paupières distinctes','👀 Cils implantés','🏋️ Relaxine : ligaments souples','🫁 Poumons : liquide inspiré'], savistu:'La relaxine assouplit TOUS les ligaments du corps, pas seulement le bassin. Les chevilles sont plus fragiles pendant la grossesse — attention aux sols inégaux.', faq:[{q:'La douleur de la symphyse pubienne (SPD) ?',r:'La relaxine assouplit les ligaments du bassin, parfois trop — douleur au pubis irradiant les cuisses, boiterie. Touche 1 femme sur 5. Traitement : kiné pelvienne, ceinture de grossesse, béquilles si sévère.'},{q:'Le plan de naissance — qu\'est-ce que c\'est ?',r:'Un document qui résume vos souhaits pour l\'accouchement : péridurale, positions, présence du père, musique. Ce n\'est pas contraignant pour l\'équipe médicale — mais il aide à communiquer vos souhaits et réduit l\'anxiété.'}], maman_titre:'Vergetures et crampes nocturnes', maman:'Des vergetures peuvent apparaître — génétiquement déterminées, non prévenables. Des crampes nocturnes sont fréquentes. La relaxine assouplit tous les ligaments du corps.', maman_aide:'Masse son ventre avec de l\'huile chaque soir — pas pour prévenir les vergetures, mais pour le confort et le lien.', maman_signe:'Les vergetures sont génétiquement déterminées. Aucune crème ne peut les prévenir totalement — l\'hydratation limite l\'inconfort.', alerte:'La relaxine rend les chevilles plus fragiles. Chaussures stables recommandées.', doc_titre:'Le plan de naissance — préparer maintenant', doc:'Le plan de naissance résume les souhaits des parents : péridurale, positions, présence du père, musique, soins après la naissance. Ce n\'est pas un contrat — l\'équipe médicale l\'adaptera si nécessaire. Mais il aide à communiquer vos souhaits et à réduire l\'anxiété du jour J.', conseil:'Massage du ventre avec de l\'huile chaque soir — rituel simple et efficace.',
  },
  23: { emoji:'🍊', taille:'28.9 cm', poids:'500 g', titre:'Bébé pèse 500 grammes', intro:'À 23 SA, bébé mesure 28,9 cm. Il pèse exactement 500 grammes. Il a le hoquet régulièrement — entraînement de son diaphragme.', developpement:'Le hoquet de bébé est un entraînement musculaire du diaphragme — préparation à la respiration autonome. Les ongles sont longs. Le cerveau se développe intensément.', organes:['🫁 Diaphragme : contractions rythmiques','💅 Ongles : kératine visible','🧠 30 milliards de neurones','🔗 Gelée de Wharton protège le cordon'], savistu:'La gelée de Wharton protège les vaisseaux du cordon ombilical — souple pour que le cordon ne se pince pas lors des mouvements de bébé.', faq:[{q:'La diastasis de la symphyse pubienne — traitements ?',r:'Kiné pelvienne spécialisée, ceinture pelvienne, adaptation des activités. Si sévère : béquilles prescrites. Consulter si douleurs pubiques irradiant les cuisses avec boiterie.'},{q:'Faut-il préparer un plan de naissance ?',r:'Pas obligatoire, mais très utile. Il permet à l\'équipe médicale de connaître vos souhaits et au père de défendre ces souhaits si elle ne peut plus le faire pendant le travail.'}], maman_titre:'L\'essoufflement commence', maman:'L\'essoufflement peut apparaître à l\'effort — l\'utérus commence à comprimer le diaphragme. Le ventre est lourd. Des douleurs dans le pubis peuvent survenir.', maman_aide:'Prends en charge spontanément les corvées physiques lourdes. L\'anticipation est plus précieuse que la réponse à une demande.', maman_signe:'La douleur de la symphyse pubienne touche environ 1 femme sur 5. Une kiné pelvienne spécialisée est très efficace.', alerte:'Si les douleurs pubiques sont intenses avec boiterie, consulter — une prise en charge en kiné pelvienne est recommandée.', doc_titre:'La gelée de Wharton', doc:'La gelée de Wharton est une substance gélatineuse qui entoure les 3 vaisseaux du cordon ombilical (2 artères + 1 veine). Elle est souple pour que le cordon ne se pince pas lors des mouvements de bébé. Sans elle, chaque mouvement risquerait d\'interrompre l\'alimentation de bébé.', conseil:'Prends en charge les corvées physiques sans attendre qu\'elle demande.',
  },
  24: { emoji:'🌽', taille:'30 cm', poids:'600 g', titre:'Le surfactant se forme', intro:'À 24 SA, bébé mesure 30 cm. Il reconnaît clairement les voix de ses parents. Les poumons produisent du surfactant — substance vitale pour la respiration après la naissance.', developpement:'Le visage est presque entièrement formé. Bébé reconnaît les voix. Les poumons produisent du surfactant — sans lui, les alvéoles s\'affaisseraient à chaque expiration après la naissance.', organes:['🫁 Surfactant : alvéoles stabilisées','👤 Visage : traits définitifs','👂 Reconnaît les voix des parents','💧 Liquide amniotique : 400-500 ml'], savistu:'Un bébé né à 24 SA avec soins intensifs néonataux a environ 50% de chances de survie aujourd\'hui — contre 0% il y a 40 ans. La médecine périnatale a transformé ces pronostics.', faq:[{q:'Le diabète gestationnel — c\'est quoi ?',r:'C\'est un diabète qui apparaît pendant la grossesse, lié à des hormones placentaires qui réduisent l\'efficacité de l\'insuline. Il touche ~10% des femmes enceintes. Bien suivi (régime + parfois insuline), il ne présente pas de danger pour bébé. Il disparaît généralement après l\'accouchement.'},{q:'L\'HGPO — comment ça se passe ?',r:'Le test HGPO (hyperglycémie provoquée par voie orale) : à jeun le matin, 3 prises de sang (à jeun, 1h et 2h après absorption d\'un liquide sucré). Durée : 2 heures. Résultats en quelques jours.'}], maman_titre:'Le test du diabète gestationnel', maman:'Le test de dépistage du diabète gestationnel (HGPO) est prescrit cette semaine. C\'est un test long de 2 heures avec 3 prises de sang. Le diabète gestationnel touche environ 10% des femmes enceintes.', maman_aide:'Accompagne-la à ce test — 2 heures d\'attente ensemble est bien plus agréable.', maman_signe:'Le diabète gestationnel bien suivi ne présente pas de danger pour bébé. Un régime adapté suffit dans la plupart des cas.', alerte:'Le diabète gestationnel non traité peut provoquer une macrosomie (bébé trop grand) et une hypoglycémie à la naissance. Avec un suivi adapté, tout se passe bien.', doc_titre:'Comprendre le diabète gestationnel', doc:'Le diabète gestationnel est une intolérance au glucose pendant la grossesse. Il est lié à des hormones placentaires qui réduisent l\'efficacité de l\'insuline. Traitement : régime alimentaire adapté (réduction des sucres rapides) et parfois injections d\'insuline. Il disparaît généralement après l\'accouchement mais augmente légèrement le risque de diabète de type 2 plus tard.', conseil:'Accompagne-la au test HGPO — 2 heures ensemble.',
  },
  25: { emoji:'🥬', taille:'34.6 cm', poids:'660 g', titre:'Les mouvements visibles', intro:'À 25 SA, bébé mesure 34,6 cm. Ses mouvements sont désormais visibles de l\'extérieur du ventre.', developpement:'Les mouvements sont visibles de l\'extérieur. Bébé accumule de la graisse sous-cutanée pour ses rondeurs de nouveau-né.', organes:['🧈 Graisse brune : stockage thermique','🦵 Varices : compression veineuse','👁️ Rétine : photorécepteurs actifs','💧 Liquide amniotique : ~500 ml'], savistu:'La veine cave inférieure est comprimée par l\'utérus en position allongée sur le dos — c\'est pourquoi le côté gauche est recommandé pour dormir dès 20 SA.', faq:[{q:'Les varices de grossesse — sont-elles permanentes ?',r:'Souvent non — elles régressent après l\'accouchement dans la majorité des cas. Les bas de contention (classe 2, sur prescription) les soulagent et préviennent les complications.'},{q:'Hémorroïdes — comment les traiter ?',r:'Elles touchent 30-40% des femmes enceintes au 3e trimestre. Régime riche en fibres, bonne hydratation, ne pas rester assis longtemps. Des crèmes topiques autorisées existent — demander au médecin.'}], maman_titre:'Les jambes lourdes', maman:'Les jambes lourdes et les varices sont fréquentes — l\'utérus comprime les veines qui ramènent le sang des jambes vers le cœur. Des bas de contention peuvent être prescrits.', maman_aide:'Bain de pieds chaud le soir + massage des mollets. Ces attentions régulières comptent plus qu\'un grand geste isolé.', maman_signe:'Les varices de grossesse régressent souvent après l\'accouchement. Les bas de contention les soulagent.', alerte:'En cas de douleur dans le mollet avec rougeur et chaleur, consulter rapidement — risque de phlébite plus élevé pendant la grossesse.', doc_titre:'Dormir sur le côté gauche', doc:'L\'utérus comprime la veine cave inférieure (grande veine qui ramène le sang des jambes vers le cœur) quand on s\'allonge sur le dos. En position dorsale, le retour sanguin est réduit. Le côté gauche est recommandé pour dormir — il libère la veine cave et améliore la circulation vers le placenta.', conseil:'Bain de pieds chaud le soir. Ce geste simple change beaucoup.',
  },
  26: { emoji:'🥦', taille:'35.6 cm', poids:'760 g', titre:'Les yeux s\'ouvrent', intro:'À 26 SA, bébé mesure 35,6 cm. Ses yeux s\'ouvrent pour la première fois. Il peut voir la lumière qui filtre.', developpement:'Les yeux s\'ouvrent pour la première fois. Bébé peut voir la lumière qui filtre. Le cerveau atteint une complexité suffisante pour rêver.', organes:['👁️ Paupières s\'ouvrent','💭 Activité REM : bébé rêve','🏃 Relaxine : ligaments très souples','🫁 Poumons : liquide inspiré activement'], savistu:'Bébé ouvre les yeux pour la première fois à 26 SA. La couleur des yeux à la naissance est presque toujours bleue ou grise — la mélanine se développe dans les semaines suivantes.', faq:[{q:'Le reflux nocturne — comment le gérer ?',r:'Repas fractionnés, éviter les aliments acides le soir, surélever légèrement la tête du lit. Certains antiacides sont autorisés pendant la grossesse — demander au médecin.'},{q:'La diastasis abdominale — comment la prévenir ?',r:'Éviter les crunchs classiques et les exercices abdos creux. Préférer le gainage doux (planche), les exercices en crochet. La kiné pelvienne prénatale aide à la gérer.'}], maman_titre:'Le sommeil devient difficile', maman:'Le sommeil est difficile — trouver une position confortable est un défi croissant. La position dorsale gauche est recommandée. Des reflux nocturnes peuvent aussi interrompre le sommeil.', maman_aide:'Un coussin de grossesse change radicalement la qualité du sommeil. Surélever légèrement la tête du lit aide pour les reflux.', maman_signe:'Le sommeil sur le côté gauche favorise le retour veineux et améliore la circulation placentaire.', alerte:'La diastasis des muscles grands droits touche 60% des femmes au 3e trimestre. La kiné pelvienne aide à la prévenir.', doc_titre:'La diastasis abdominale', doc:'La diastasis des muscles grands droits est l\'écartement des deux colonnes musculaires abdominales pour laisser place à l\'utérus. Elle touche 60% des femmes au 3e trimestre. La kiné pelvienne prénatale aide à la gérer. Éviter les crunchs classiques pendant la grossesse — préférer le gainage doux.', conseil:'Commander le coussin de grossesse maintenant — ça change tout pour le sommeil.',
  },
  27: { emoji:'🥬', taille:'36.6 cm', poids:'875 g', titre:'Bébé peut rêver', intro:'À 27 SA, bébé pèse 875 grammes. Il peut rêver — son activité cérébrale pendant le sommeil est similaire à celle d\'un adulte en phase REM.', developpement:'Bébé peut rêver. Fin du 2e trimestre. Mouvements coordonnés complexes.', organes:['💭 Activité REM documentée','🛡️ Anticorps maternels transmis','🧠 Discrimination des voix','👶 Peau moins ridée (graisse)'], savistu:'Les anticorps maternels traversent le placenta à partir de 27 SA pour immuniser bébé avant la naissance. La vaccination de la mère protège aussi le nouveau-né les premiers mois.', faq:[{q:'Le plan de naissance — comment le rédiger ?',r:'Souhaits sur la péridurale, les positions, la présence du père, la musique, la gestion du cordon, le peau-à-peau, l\'allaitement. 1 page maximum. Le remettre à la maternité à 32-36 SA.'},{q:'La vaccination coqueluche — pourquoi importante ?',r:'La coqueluche est grave pour les nourrissons de moins de 3 mois — trop jeunes pour être vaccinés. La vaccination de la mère (et du père) pendant la grossesse transfère des anticorps à bébé pour le protéger les premiers mois.'}], maman_titre:'Fin du trimestre le plus confortable', maman:'C\'est souvent la fin de la période la plus agréable de la grossesse. La fatigue revient progressivement. L\'anxiété autour de l\'accouchement peut commencer à se manifester.', maman_aide:'Parler de vos angoisses respectives sur l\'accouchement — ça libère et ça rapproche.', maman_signe:'L\'anxiété pré-accouchement est normale et adaptative — elle pousse à se préparer.', alerte:'Se faire vacciner contre la coqueluche pendant la grossesse — protège bébé dès la naissance.', doc_titre:'La vaccination coqueluche', doc:'La coqueluche est une maladie respiratoire grave pour les nourrissons de moins de 3 mois. La vaccination de la mère (et du père) permet de transférer des anticorps à bébé avant la naissance. C\'est la principale protection disponible pour les premiers mois, avant que bébé puisse être lui-même vacciné.', conseil:'Planifiez votre plan de naissance ensemble ce mois-ci.',
  },
  28: { emoji:'🍆', taille:'37.6 cm', poids:'1 kg', titre:'Début du 3e trimestre', intro:'À 28 SA, bébé pèse 1 kilogramme. C\'est le début du 3e trimestre. Le cerveau entre dans une phase de développement accéléré.', developpement:'Début du 3e trimestre. Cerveau en développement accéléré. Vision fonctionnelle. Mouvements très perceptibles.', organes:['🧠 Sillons corticaux en multiplication','👁️ Vision : acuité 20/400','🫘 Reins : 500 ml urine/jour','🫁 Poumons : 80% matures'], savistu:'Le liquide amniotique atteint son volume maximum à 28 SA (~800 ml) puis diminue progressivement jusqu\'au terme.', faq:[{q:'Contractions de Braxton Hicks — fausses ou vraies ?',r:'Fausses (Braxton Hicks) : irrégulières, disparaissent en changeant de position, non douloureuses. Vraies contractions : régulières, s\'intensifient, ne disparaissent pas en changeant de position. Règle 5-1-1 : toutes les 5 min, 1 min, depuis 1h = maternité.'},{q:'Le monitoring — c\'est quoi ?',r:'C\'est l\'enregistrement simultané du rythme cardiaque de bébé et des contractions utérines. Il évalue le bien-être fœtal. Il devient systématique lors des consultations à partir de SA 28-32 dans certaines maternités.'}], maman_titre:'Les contractions de Braxton Hicks', maman:'Les contractions de Braxton Hicks (fausses contractions) peuvent apparaître — l\'utérus se contracte par intermittence. L\'essoufflement et les reflux sont fréquents. Le dos et le bassin supportent un poids croissant.', maman_aide:'Commence à préparer la valise maternité maintenant — pas dans 4 semaines.', maman_signe:'Contractions de Braxton Hicks : irrégulières, disparaissent en changeant de position. Vraies contractions : règle 5-1-1.', alerte:'Règle 5-1-1 : contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure = appeler la maternité.', doc_titre:'Distinguer vraies et fausses contractions', doc:'Les contractions de Braxton Hicks (fausses) : irrégulières, disparaissent en changeant de position, non douloureuses. Les vraies contractions : régulières (toutes les 5-10 minutes), s\'intensifient progressivement, ne s\'arrêtent pas en changeant de position. La règle 5-1-1 pour un 1er enfant : contractions toutes les 5 minutes, durant 1 minute, depuis au moins 1 heure = appeler la maternité.', conseil:'Commence la valise maternité maintenant — pas dans 4 semaines.',
  },
  29: { emoji:'🎃', taille:'38.6 cm', poids:'1.15 kg', titre:'Mouvements visibles de l\'extérieur', intro:'À 29 SA, les mouvements de bébé sont désormais visibles de l\'extérieur du ventre. Les muscles et poumons se renforcent.', developpement:'Mouvements visibles de l\'extérieur. Système immunitaire en développement. Muscles et poumons se renforcent.', organes:['💪 Masse musculaire +50%','🛡️ Anticorps IgG en transfert actif','🫁 Poumons : survie ex-utéro possible','🧈 Graisse : 3.5% du poids'], savistu:'Un bébé né à 29 SA avec prise en charge néonatale intensive a 90% de chances de survie sans séquelles majeures. Chaque semaine supplémentaire in utero réduit la durée d\'hospitalisation néonatale.', faq:[{q:'L\'haptonomie — c\'est quoi ?',r:'C\'est une méthode de préparation qui inclut le père dès le début. Tu apprends à entrer en contact avec bébé via des pressions douces sur le ventre. Des études montrent que les bébés répondent à ces contacts spécifiques.'},{q:'La sophrologie pour l\'accouchement — est-ce efficace ?',r:'Des études montrent que la sophrologie réduit l\'anxiété pré-accouchement et la perception de la douleur pendant le travail. Elle est remboursée dans le cadre de la préparation à l\'accouchement (8 séances).'}], maman_titre:'L\'insomnie s\'installe', maman:'L\'insomnie s\'installe souvent — difficultés à trouver une position, réveils fréquents. Les contractions de Braxton Hicks peuvent être fréquentes.', maman_aide:'Être réveillé avec elle la nuit fait une vraie différence. La solitude nocturne est particulièrement difficile en fin de grossesse.', maman_signe:'Un bébé né à 29 SA a 90% de chances de survie. Chaque semaine supplémentaire compte.', alerte:'Apprends la règle 5-1-1 des contractions. Enregistre le numéro direct des urgences obstétricales.', doc_titre:'Préparation à l\'accouchement pour les pères', doc:'Des séances de préparation spécifiques pour les pères existent dans de nombreuses maternités. Elles couvrent : le déroulement du travail, les signes de début d\'accouchement, comment soutenir sans stresser, les techniques de respiration, la péridurale, et le rôle concret du père en salle de naissance.', conseil:'Apprends la règle 5-1-1 et enregistre le numéro de la maternité dans ton téléphone.',
  },
  30: { emoji:'🥬', taille:'39.9 cm', poids:'1.3 kg', titre:'Le cerveau se plisse', intro:'À 30 SA, bébé pèse 1,3 kg. Le cerveau se plisse pour augmenter sa surface de traitement. Les poumons sont presque matures.', developpement:'Le cerveau se plisse pour augmenter sa surface corticale. Poumons presque matures. Bébé prend 200-250g/semaine.', organes:['🧠 Sillons et circonvolutions','🫁 Poumons : 95% fonctionnels','💩 Méconium : intestin plein','🧈 Graisse : 8% du poids'], savistu:'Le cerveau humain est le seul à se plier sur lui-même pour maximiser sa surface corticale. Un cerveau humain déplié aurait la taille d\'une feuille A3. Ce processus débute in utero à 30 SA.', faq:[{q:'Le congé paternité peut-il être fractionné ?',r:'Oui — en 2 périodes maximum, à prendre dans les 6 mois suivant la naissance. L\'employeur ne peut pas le refuser. À déclarer au moins 1 mois avant la date prévue.'},{q:'Préparer des repas à congeler — bonne idée ?',r:'Excellente idée. Les premières semaines avec un nouveau-né sont épuisantes — avoir des repas prêts dans le congélateur est l\'un des gestes les plus utiles que tu puisses faire avant la naissance.'}], maman_titre:'La fatigue intense revient', maman:'La fatigue intense de fin de grossesse revient. Le sommeil est difficile. L\'anxiété autour de l\'accouchement peut augmenter. Des œdèmes aux pieds apparaissent souvent en fin de journée.', maman_aide:'Confirme ton congé paternité avec ton employeur maintenant — un congé bien préparé te permet d\'être pleinement présent.', maman_signe:'Les œdèmes aux chevilles sont normaux en fin de grossesse. S\'ils sont asymétriques avec douleur, consulter.', alerte:'Des œdèmes asymétriques (un pied plus gonflé) avec douleur au mollet nécessitent une consultation urgente — risque de phlébite.', doc_titre:'Le congé paternité en détail', doc:'Le congé paternité dure 25 jours calendaires dont 4 obligatoires à prendre dans les 4 jours suivant la naissance. Il est indemnisé à 100% du salaire net dans la limite du plafond Sécu. Il peut être fractionné en 2 périodes à prendre dans les 6 mois suivant la naissance. À déclarer à l\'employeur au moins 1 mois avant.', conseil:'Confirme ton congé paternité avec ton employeur maintenant.',
  },
  31: { emoji:'🍍', taille:'41.1 cm', poids:'1.5 kg', titre:'Tous les sens opérationnels', intro:'À 31 SA, tous les sens de bébé sont opérationnels et coordonnés. Il distingue le goût sucré du goût amer.', developpement:'Tous les sens opérationnels. Bébé s\'entraîne à la respiration. Goût sucré/amer discriminés.', organes:['👅 Sucré/amer discriminés','🌬️ Mouvements respiratoires 30-40/h','💇 Cheveux bien développés','📍 Position : 80% tête en bas'], savistu:'Bébé a des préférences alimentaires à 31 SA influencées par l\'alimentation maternelle. Les enfants dont les mères ont mangé varié pendant la grossesse sont souvent plus facilement omnivores.', faq:[{q:'La présentation par le siège — options ?',r:'Version par manœuvre externe (VME) entre 36-37 SA (réussit dans 50-60% des cas), moxibustion (médecine chinoise), postures inversées. Si échec : césarienne programmée généralement proposée.'},{q:'Les mouvements de bébé à surveiller ?',r:'À partir de 28 SA, 10 mouvements en 2 heures en période active. En dessous de ce seuil ou si changement notable des habitudes de bébé : appeler la maternité sans attendre.'}], maman_titre:'Difficultés à marcher longtemps', maman:'Les difficultés à marcher longtemps apparaissent. Des douleurs pelviennes sont fréquentes. Les contractions de Braxton Hicks peuvent être régulières.', maman_aide:'Propose des promenades courtes. L\'activité physique douce reste bénéfique jusqu\'à l\'accouchement.', maman_signe:'Si bébé est encore en siège à 31 SA, pas d\'inquiétude — la plupart se retournent spontanément avant 36 SA.', alerte:'Si bébé est en siège à 36 SA, une version par manœuvre externe peut être proposée entre 36-37 SA.', doc_titre:'La présentation par le siège', doc:'Environ 3-4% des bébés restent en siège (fesses en bas) à terme. La version par manœuvre externe (VME) est proposée entre 36 et 37 SA — un médecin retourne bébé manuellement sous surveillance. Elle réussit dans 50-60% des cas. Si échec, une césarienne programmée est généralement proposée.', conseil:'Propose des promenades courtes — l\'activité douce reste bénéfique.',
  },
  32: { emoji:'🥭', taille:'42.4 cm', poids:'1.7 kg', titre:'Bébé se met tête en bas', intro:'À 32 SA, bébé se met en position tête en bas dans la majorité des cas. L\'échographie T3 vérifie tout ça.', developpement:'Bébé se met en position tête en bas. Écho T3 vérifie position, poids, liquide amniotique.', organes:['📍 Position : tête en bas 80%','💧 Liquide amniotique : 700-800 ml','⚖️ Poids estimé : ±15% écho','🟡 Placenta : grade I-II normal'], savistu:'L\'estimation du poids fœtal par échographie a une marge d\'erreur de ±15%. Un bébé estimé à 2 kg peut peser entre 1,7 et 2,3 kg — ne pas se focaliser sur les chiffres absolus.', faq:[{q:'Le score de Manning — c\'est quoi ?',r:'C\'est une évaluation du bien-être fœtal par 5 critères échographiques : mouvements respiratoires, mouvements corporels, tonus, liquide amniotique, rythme cardiaque fœtal. Score > 8/10 = bébé en forme.'},{q:'La consultation pré-anesthésie — est-elle obligatoire ?',r:'Oui — même sans péridurale prévue. Elle permet à l\'anesthésiste d\'évaluer d\'éventuels risques et d\'être prêt en cas d\'urgence. Elle doit être faite entre 32 et 37 SA. Si pas encore planifiée, appeler la maternité.'}], maman_titre:'L\'échographie T3', maman:'L\'échographie du 3e trimestre vérifie la position de bébé, estime son poids, évalue le liquide amniotique et l\'état du placenta.', maman_aide:'Accompagne-la à l\'écho T3 sans faute. Si bébé est en siège, ne dramatise pas — des solutions existent.', maman_signe:'L\'estimation du poids par écho a une marge de ±15% — pas de panique sur les chiffres.', alerte:'La consultation pré-anesthésie est obligatoire avant tout accouchement. Si pas encore planifiée, appeler la maternité.', doc_titre:'L\'écho T3 — ce qu\'elle vérifie', doc:'L\'échographie du 3e trimestre (entre 30 et 35 SA) vérifie : la présentation de bébé (tête en bas ou siège), le poids estimé par biométrie (±15%), la quantité de liquide amniotique, la position et le grade du placenta, et la circulation sanguine dans le cordon (Doppler).', conseil:'Accompagne-la à l\'écho T3 sans exception.',
  },
  33: { emoji:'🍍', taille:'43.7 cm', poids:'1.9 kg', titre:'Les ongles dépassent les doigts', intro:'À 33 SA, les ongles de bébé sont si longs qu\'il peut se griffer le visage in utero. Le squelette est presque complet.', developpement:'Squelette presque complet. Ongles longs. Poumons en phase finale de maturation.', organes:['💅 Ongles dépassent les doigts','🫁 Poumons : 98% matures','🧈 Graisse : 15% du poids','🔤 Col : débute sa maturation'], savistu:'La tocologie (peur pathologique de l\'accouchement) touche 6-10% des femmes enceintes. Non traitée, elle augmente les demandes de césarienne. Un soutien psychologique est très efficace.', faq:[{q:'Comment gérer l\'anxiété pré-accouchement ?',r:'Sophrologie, hypnose, préparation à la naissance, en parler ouvertement avec la sage-femme. La tocologie (peur pathologique) mérite un suivi psychologique spécialisé — très efficace.'},{q:'La consultation pré-anesthésie — quoi apporter ?',r:'Carte vitale, carnet de maternité, liste des médicaments, antécédents médicaux et chirurgicaux, allergies. L\'anesthésiste évalue les risques et explique les options analgésiques.'}], maman_titre:'L\'essoufflement est maximal', maman:'L\'essoufflement atteint son maximum — l\'utérus comprime fortement le diaphragme. L\'insomnie est quasi-systématique. L\'impatience et l\'anxiété augmentent.', maman_aide:'Sois disponible la nuit. La solitude nocturne en fin de grossesse est particulièrement difficile.', maman_signe:'La consultation pré-anesthésie est obligatoire entre 32 et 37 SA — même sans péridurale prévue.', alerte:'La consultation pré-anesthésie doit être faite avant 37 SA. Si pas encore planifiée, appeler la maternité aujourd\'hui.', doc_titre:'La consultation pré-anesthésie', doc:'La consultation pré-anesthésie est obligatoire avant tout accouchement, même si une péridurale n\'est pas prévue. Elle permet à l\'anesthésiste d\'évaluer d\'éventuels risques et d\'être prêt en cas d\'urgence. Elle doit être faite entre 32 et 37 SA.', conseil:'Sois disponible la nuit. La solitude nocturne en fin de grossesse est particulièrement difficile.',
  },
  34: { emoji:'🍈', taille:'45 cm', poids:'2.15 kg', titre:'Système nerveux mature', intro:'À 34 SA, le système nerveux central de bébé est mature. Un bébé né à 34 SA a plus de 99% de chances de survie sans séquelles.', developpement:'Système nerveux central mature. Thermorégulation autonome. Descente dans le bassin possible.', organes:['🧠 SNC : maturation quasi-complète','🌡️ Thermorégulation autonome','💊 Méconium : bouchon formé','🧈 Adipeux : 12% du poids'], savistu:'Un bébé né à 34 SA a aujourd\'hui plus de 99% de chances de survie sans séquelles grâce aux progrès de la néonatologie. La limite de viabilité en France est fixée à 22 SA.', faq:[{q:'La corticothérapie — à quoi ça sert ?',r:'Si une naissance prématurée avant 35 SA est possible, des injections de cortisone (bêtaméthasone) peuvent être prescrites à la mère. Elles accélèrent la maturation pulmonaire de bébé en 48 heures — très efficaces.'},{q:'Le siège auto — comment vérifier l\'installation ?',r:'Certains magasins spécialisés (Bébé 9, Leclerc), pompiers ou associations proposent des vérifications gratuites. L\'airbag passager est incompatible avec un siège bébé à l\'avant — le désactiver obligatoirement.'}], maman_titre:'La descente de bébé', maman:'La descente du bébé dans le bassin soulage l\'essoufflement mais augmente la pression pelvienne. Les envies fréquentes d\'uriner s\'intensifient.', maman_aide:'Si les cours de préparation ne sont pas commencés, c\'est urgent. Des sessions intensives existent.', maman_signe:'La descente de bébé dans le bassin peut survenir plusieurs semaines avant l\'accouchement — surtout pour un premier enfant.', alerte:'La corticothérapie (injections de cortisone) peut être prescrite si une naissance prématurée avant 35 SA semble possible.', doc_titre:'Siège auto — choisir et installer', doc:'Tous les sièges vendus depuis 2018 sont en norme i-Size (R129) — plus stricte que l\'ancienne norme. Le siège à contre-sens (dos à la route) est recommandé jusqu\'à au moins 15 mois, idéalement jusqu\'à 4 ans — réduit les risques de blessure cervicale de 5 fois. L\'airbag passager est incompatible avec un siège bébé à l\'avant — le désactiver obligatoirement.', conseil:'Fais vérifier l\'installation du siège auto par un professionnel.',
  },
  35: { emoji:'🍈', taille:'46.2 cm', poids:'2.4 kg', titre:'250 grammes par semaine', intro:'À 35 SA, bébé prend environ 250 grammes par semaine — la phase de finition. Les poumons sont quasi-matures.', developpement:'Prise de 250g/semaine. Reins et foie pleinement fonctionnels. Poumons quasi-matures.', organes:['🫘 Reins : 100% fonctionnels','🫀 Foie : stockage glycogène','📍 Position : 90% tête en bas','💇 Cheveux épais et visibles'], savistu:'La prise de poids finale de 250g/semaine est entièrement constituée de graisse de réserve et de croissance musculaire — essentielle pour la thermorégulation néonatale.', faq:[{q:'Siège auto i-Size vs ancienne norme ?',r:'La norme i-Size (R129) est plus stricte : impose le contre-sens plus longtemps et les tests sont plus rigoureux. Elle est obligatoire sur tous les sièges vendus depuis 2018.'},{q:'La péridurale ambulatoire — c\'est quoi ?',r:'Elle permet de se déplacer sous péridurale — dosage plus faible, surveillance particulière. Disponible dans certaines maternités. Se renseigner à l\'avance si ça l\'intéresse.'}], maman_titre:'Pression pelvienne intense', maman:'Les envies fréquentes d\'uriner sont maximales. La pression pelvienne est intense. Des douleurs dans le pubis peuvent rendre la marche difficile.', maman_aide:'Installe le siège auto maintenant et fais vérifier l\'installation.', maman_signe:'Chaque gramme de prise de poids à ce stade est essentiel pour la thermorégulation de bébé après la naissance.', alerte:'L\'airbag passager et le siège bébé à l\'avant sont incompatibles — l\'airbag peut blesser mortellement. Désactiver obligatoirement.', doc_titre:'Siège auto — les règles essentielles', doc:'Le siège à contre-sens (dos à la route) est recommandé jusqu\'à au moins 15 mois. Il réduit les risques de blessure cervicale de 5 fois en cas de choc frontal. L\'airbag passager doit être désactivé si siège à l\'avant. Une vérification par un professionnel est recommandée.', conseil:'Installe et fais vérifier le siège auto maintenant.',
  },
  36: { emoji:'🥗', taille:'47.4 cm', poids:'2.6 kg', titre:'Les poumons sont matures', intro:'À 36 SA, les poumons de bébé sont matures. L\'instinct de nidification est à son maximum. Mode alerte.', developpement:'Poumons matures. Instinct de nidification. Perte possible du bouchon muqueux.', organes:['🫁 Poumons : maturité complète','🔩 Bouchon muqueux : peut se perdre','📉 Liquide amniotique diminue','💇 Vernix : quasiment disparu'], savistu:'Le bouchon muqueux peut se perdre progressivement ou d\'un coup. Sa couleur rosée est normale. Sa perte ne signifie pas que l\'accouchement est imminent.', faq:[{q:'Bouchon muqueux perdu = accouchement imminent ?',r:'Pas nécessairement — l\'accouchement peut encore tarder de quelques jours à 2 semaines. Ce n\'est pas une urgence, sauf si accompagné de saignements abondants ou perte des eaux.'},{q:'Monitoring de fin de grossesse ?',r:'À partir de 36 SA, un monitoring (enregistrement du rythme cardiaque de bébé) peut être proposé lors des consultations. Il évalue le bien-être fœtal. Fréquence variable selon les maternités.'}], maman_titre:'L\'instinct de nidification', maman:'L\'instinct de nidification est documenté scientifiquement — il précède souvent le début du travail. Des pertes de bouchon muqueux peuvent survenir. Le col commence à se préparer.', maman_aide:'Valise dans la voiture. Téléphone chargé en permanence. Mode alerte actif.', maman_signe:'L\'instinct de nidification est un phénomène biologique réel, documenté chez de nombreux mammifères.', alerte:'À partir de 36 SA, rester joignable en permanence. Avoir le numéro direct des urgences obstétricales.', doc_titre:'Le bouchon muqueux', doc:'Le bouchon muqueux est un bouchon de mucus qui ferme le col de l\'utérus depuis le début de la grossesse, protégeant bébé des infections. Sa perte signifie que le col commence à se préparer. L\'accouchement peut survenir dans les heures, jours ou semaines suivantes — ce n\'est pas une urgence sauf si accompagné de saignements importants.', conseil:'Valise dans la voiture. Téléphone chargé en permanence. Mode alerte.',
  },
  37: { emoji:'🌿', taille:'48.6 cm', poids:'2.85 kg', titre:'Bébé est à terme', intro:'À 37 SA, bébé est officiellement à terme. Il pourrait naître à tout moment sans risque majeur.', developpement:'Bébé à terme. Poumons matures. Réflexes complets. Peut naître à tout moment.', organes:['✅ SNC : maturation finale','✅ Poumons : maturité complète','🔓 Col : effacement progressif','📍 Tête : peut s\'engager'], savistu:'Bébé est à terme dès 37 SA. Les deux dernières semaines sont importantes pour la maturation finale du cerveau et des poumons — chaque jour compte.', faq:[{q:'Comment reconnaître le début du travail ?',r:'Contractions régulières qui s\'intensifient et ne s\'arrêtent pas (règle 5-1-1), perte des eaux (liquide inodore, incolore, continu), pertes sanguines rosées (show). En cas de doute sur la perte des eaux : pad absorbant + appel maternité.'},{q:'Perte des eaux — que faire ?',r:'Direction maternité dans les 12 heures maximum, même sans contractions. Le risque d\'infection augmente à chaque heure. Ne pas attendre les contractions pour appeler.'}], maman_titre:'Anxiété et impatience maximales', maman:'Les contractions peuvent survenir à tout moment. L\'anxiété et l\'impatience sont maximales. Le col peut commencer à se dilater sans que ce soit perceptible.', maman_aide:'Mode alerte actif. Reste joignable en permanence. Révise les signes du début du travail.', maman_signe:'La perte des eaux : liquide amniotique = inodore, incolore, continu. Différent des urines. En cas de doute : appeler la maternité.', alerte:'En cas de perte des eaux : direction maternité dans les 12 heures maximum même sans contractions.', doc_titre:'Reconnaître le début du travail', doc:'Le début du travail se reconnaît à : des contractions régulières qui s\'intensifient et ne s\'arrêtent pas en changeant de position (règle 5-1-1 pour un 1er enfant), une perte des eaux (liquide inodore, incolore, continu — différent des urines), parfois des pertes sanguines rosées (show). En cas de doute : appel maternité.', conseil:'Mode alerte maximum. Téléphone toujours sur toi.',
  },
  38: { emoji:'🌿', taille:'49.8 cm', poids:'3.1 kg', titre:'Bébé attend le signal', intro:'À 38 SA, bébé pèse 3,1 kg. Sa tête est engagée dans le bassin. Il attend le signal hormonal pour déclencher le travail.', developpement:'Tête engagée. Tous systèmes opérationnels. Attend le signal hormonal.', organes:['📐 Tête : diamètre bipariétal ~93mm','🔓 Col : effacement progressif','⚗️ Cortisol bébé : signal de naissance','🟡 Placenta : grade III normal'], savistu:'C\'est bébé qui déclenche son propre accouchement — il envoie des signaux hormonaux à l\'utérus quand ses poumons sont matures. Un mécanisme encore partiellement mystérieux pour la science.', faq:[{q:'Le déclenchement — comment ça se passe ?',r:'Gel de prostaglandines (appliqué sur le col pour l\'assouplir), rupture artificielle des membranes, ou perfusion de syntocinon (forme synthétique de l\'ocytocine). Un déclenchement ne signifie pas forcément une césarienne.'},{q:'Ton rôle en salle de naissance ?',r:'Présence calme, regard, voix, main à tenir. Chronométrer les contractions, encourager entre chaque. Être le lien entre elle et l\'équipe médicale. Des études montrent que la présence du père réduit la durée du travail et améliore le vécu de l\'accouchement.'}], maman_titre:'L\'impatience est à son comble', maman:'L\'impatience et l\'anxiété sont mêlées d\'excitation. Le sommeil est quasi-impossible. Le besoin de soutien émotionnel est maximal.', maman_aide:'Sois présent, rassurant. Prépare des repas pour les premiers jours de retour à la maison.', maman_signe:'C\'est bébé qui choisit le moment de naître — il envoie des signaux hormonaux à l\'utérus quand il est prêt.', alerte:'La péridurale ambulatoire permet de se déplacer sous péridurale — disponible dans certaines maternités. Se renseigner à l\'avance.', doc_titre:'Ton rôle en salle de naissance', doc:'En salle de naissance, le père est souvent décrit comme "l\'ancre" par les sages-femmes. Des études obstétricales montrent que la présence du père réduit la durée du travail, diminue la demande de péridurale et améliore le vécu de l\'accouchement par la mère. Présence calme, regard, voix, main à tenir. Pas besoin de savoir quoi dire — être là suffit.', conseil:'Sois présent et rassurant. Prépare les repas pour les premiers jours.',
  },
  39: { emoji:'🍉', taille:'50.7 cm', poids:'3.25 kg', titre:'Bébé produit ses hormones de stress', intro:'À 39 SA, bébé est pleinement développé. Il produit ses propres hormones de stress pour se préparer à l\'accouchement.', developpement:'Pleinement développé. Hormones de stress sécrétées pour préparer la naissance.', organes:['⚗️ Cortisol : prépare la naissance','✅ Poumons : maturité absolue','💩 Méconium abondant','🧈 Graisse : 15-16% du poids'], savistu:'Le stress de l\'accouchement est bénéfique pour bébé — les hormones libèrent le surfactant et activent la thermogenèse. Un bébé né par césarienne programmée sans travail a plus de risques respiratoires.', faq:[{q:'Méthodes naturelles pour déclencher le travail ?',r:'Rapport sexuel (prostaglandines du sperme), stimulation des mamelons (libère de l\'ocytocine), marche active. Aucune n\'est garantie mais toutes sont sans risque.'},{q:'Le dépassement de terme — quand s\'inquiéter ?',r:'Pas avant 42 SA avec une surveillance adaptée. Le monitoring 2x/semaine permet de détecter tout signe de souffrance fœtale. Un déclenchement peut être proposé à partir de 41 SA.'}], maman_titre:'L\'attente est épuisante', maman:'Chaque jour semble une éternité. La fatigue physique et émotionnelle est à son comble. Les sorties sont difficiles mais bénéfiques pour le moral.', maman_aide:'Organise une sortie douce. Changer les idées est important pour vous deux.', maman_signe:'Seulement 5% des bébés naissent exactement à la DPA. Une naissance entre 37 et 42 SA est normale.', alerte:'Seulement 5% des bébés naissent à la DPA. La surveillance s\'intensifie après 41 SA.', doc_titre:'Le dépassement de terme', doc:'Après 41 SA, la surveillance médicale s\'intensifie avec un monitoring 2 fois par semaine et des échographies régulières. Un déclenchement peut être proposé à partir de 41 SA selon les protocoles. Au-delà de 42 SA, il est quasi-systématique selon les recommandations du CNGOF.', conseil:'Organise une sortie douce — cinéma, restaurant calme, promenade.',
  },
  40: { emoji:'🍉', taille:'51.2 cm', poids:'3.4 kg', titre:'Le jour J', intro:'À 40 SA, c\'est la date prévue. Bébé a attendu 280 jours. Tous ses systèmes sont pleinement opérationnels.', developpement:'Le jour J prévu. Bébé prêt. Tous systèmes opérationnels.', organes:['✅ Tout est prêt','⏳ Le corps attend le signal'], savistu:'C\'est bébé qui choisit le moment de naître — en envoyant des signaux hormonaux à l\'utérus. Un mécanisme encore partiellement mystérieux pour la science.', faq:[{q:'La règle 5-1-1 — toujours valable ?',r:'Oui pour un premier accouchement. Pour un 2e enfant ou plus, partir plus tôt — le travail peut aller plus vite.'},{q:'Que faire si le travail dure très longtemps ?',r:'La patience est clé. Un premier travail dure en moyenne 12 heures. L\'équipe médicale surveille en permanence. Ton rôle : être présent, encourager, ne pas dramatiser.'}], maman_titre:'Chaque contraction peut être la bonne', maman:'Stress et excitation maximaux. Chaque contraction est scrutée. Le corps est en mode attente totale.', maman_aide:'Règle 5-1-1 : contractions toutes les 5 minutes, pendant 1 minute, depuis 1 heure = appeler la maternité avant de partir.', maman_signe:'Le travail peut durer de 6 à 20 heures pour un premier enfant. Rester calme et accompagner sans stresser est ton rôle principal.', alerte:'En cas de perte des eaux : direction maternité dans les 12 heures même sans contractions. En cas de saignements importants : urgences immédiates.', doc_titre:'Ton rôle en salle de naissance', doc:'Des études obstétricales montrent que la présence active du père (présence calme, contact physique, encouragements verbaux) réduit la durée du travail et améliore significativement le vécu de l\'accouchement par la mère. Pas besoin de savoir quoi faire — être là, calme et disponible, suffit.', conseil:'Contractions 5min/1h = appeler la maternité. Garde ton calme.',
  },
  41: { emoji:'🍉', taille:'51.5 cm', poids:'3.6 kg', titre:'Dépassement de terme', intro:'À 41 SA, bébé continue de grandir. Le dépassement est très courant — seulement 5% des bébés naissent exactement à la DPA.', developpement:'Dépassement de terme. Surveillance renforcée. Déclenchement possible.', organes:['🔍 Surveillance : monitoring 2x/semaine','💧 Liquide amniotique : peut diminuer','🔓 Col : maturation avancée','🟡 Placenta : vieillissement possible'], savistu:'Le dépassement de terme jusqu\'à 41+6 SA est considéré comme normal. La surveillance médicale s\'intensifie mais c\'est une précaution standard.', faq:[{q:'Le score de Bishop — c\'est quoi ?',r:'Il évalue la maturité du col sur 13 points (dilatation, effacement, consistance, position, engagement). Score > 8 = col favorable, déclenchement facile. Score < 6 = col défavorable, préparation nécessaire.'},{q:'Méthodes naturelles pour déclencher le travail ?',r:'Rapport sexuel (prostaglandines du sperme), stimulation des mamelons (libère de l\'ocytocine), marche active, acupuncture. Aucune garantie mais sans risque.'}], maman_titre:'La frustration est intense', maman:'L\'inconfort est majeur. La frustration et l\'anxiété sont intenses. Un soutien émotionnel constant est indispensable.', maman_aide:'Reste positif et patient. Le dépassement est très courant. Suis les instructions médicales.', maman_signe:'Le score de Bishop évalue la maturité du col. Un score élevé = déclenchement plus facile.', alerte:'Le déclenchement peut être proposé à partir de 41 SA selon les protocoles. Au-delà de 42 SA, il est quasi-systématique.', doc_titre:'Le score de Bishop', doc:'Le score de Bishop évalue la maturité du col de l\'utérus sur 13 points en mesurant la dilatation, l\'effacement, la consistance, la position du col et l\'engagement de la tête. Un score élevé (> 8) indique un col favorable — le déclenchement se passera bien. Un score faible (< 6) indique qu\'une préparation du col par gel de prostaglandines sera nécessaire.', conseil:'Reste positif et patient. Suis les instructions médicales à la lettre.',
  },
};

const MISSIONS: Record<number, string[]> = {
  6:['Dire à ta partenaire que tu es là quoi qu\'il arrive','Faire les courses sans qu\'elle ait à demander','Vérifier qu\'un suivi médical est en place'],
  7:['Préparer des en-cas anti-nausées accessibles','Éviter les odeurs fortes à la maison','Commencer à lire sur la grossesse'],
  8:['Prendre le relais sur les tâches ménagères','Accompagner à la première consultation','Informer ton employeur discrètement si besoin'],
  9:['Pratiquer l\'écoute active sans chercher à résoudre','Proposer un massage le soir','Réduire les sources de stress à la maison'],
  10:['Planifier la première échographie ensemble','Préparer une liste de questions pour le médecin','Commencer à chercher des prénoms'],
  11:['Accompagner chercher des vêtements de grossesse','Réfléchir à l\'organisation financière','Déclarer la grossesse à la mutuelle'],
  12:['Être présent à l\'écho T1 — prendre une demi-journée','Filmer et photographier l\'échographie','Décider ensemble quand annoncer'],
  13:['Annoncer si vous le souhaitez','Parler des prénoms','Lire sur le post-partum pour anticiper'],
  14:['Organiser un week-end en amoureux','Commencer les recherches poussette et siège auto','Vérifier les aides et congés disponibles'],
  15:['Parler à bébé chaque soir — commencer maintenant','Réserver les cours de préparation à l\'accouchement','Commencer un album photo de la grossesse'],
  16:['Réserver les cours si pas encore fait','Établir la liste des achats avec budget','Réfléchir à l\'aménagement de la chambre'],
  17:['Instaurer le rituel de la main sur le ventre','Commander le coussin de grossesse','Commencer le module valise maternité'],
  18:['Proposer des massages du dos régulièrement','Préparer la chambre de bébé ensemble','Renseigner sur les crèches de votre ville'],
  19:['Monter les meubles de la chambre de bébé','Établir la liste de naissance','Initialiser les démarches de congé paternité avec le RH'],
  20:['Bloquer la demi-journée pour l\'écho T2','Préparer les questions pour l\'échographiste','Célébrer la mi-grossesse'],
  21:['Installer la veilleuse','Visiter la maternité','Choisir la maternité définitivement'],
  22:['Instaurer le massage du ventre avec de l\'huile','Préparer le plan de naissance en brouillon','Repérer le trajet vers la maternité'],
  23:['Prendre en charge les corvées physiques lourdes','Commencer à préparer le sac de maternité','Lire le guide accouchement en entier'],
  24:['Accompagner au test HGPO — 2 heures ensemble','Commencer la valise maternité','Installer le siège auto'],
  25:['Bain de pieds le soir — en faire un rituel','Finaliser la chambre de bébé','Confirmer le congé paternité avec l\'employeur'],
  26:['Finaliser le plan de naissance par écrit','Tester le trajet vers la maternité','Préparer une playlist si souhaité'],
  27:['Remettre le plan de naissance à la maternité','Préparer les documents d\'admission','Se faire vacciner contre la coqueluche'],
  28:['Commencer la valise maternité de façon urgente','Enregistrer le numéro de la maternité','Maîtriser la règle 5-1-1'],
  29:['Être disponible la nuit','Préparer un plan B pour rejoindre la maternité vite','Réserver les cours de préparation si pas encore fait'],
  30:['Confirmer le congé paternité avec l\'employeur','Finaliser la valise maternité','Préparer des repas à congeler'],
  31:['Valise dans le coffre de la voiture','Continuer les repas congelés','Installer le berceau dans la chambre parentale'],
  32:['Accompagner à l\'écho T3 sans exception','Finaliser tous les achats prioritaires','Vérifier que la consultation pré-anesthésie est planifiée'],
  33:['Être disponible la nuit','Confirmer les dates de congé paternité','Préparer la maison pour le retour'],
  34:['Commencer la préparation accouchement si pas encore fait','Tester le trajet à différentes heures','Valise dans le coffre'],
  35:['Faire vérifier le siège auto','Finaliser tous les achats','Préparer la maison pour l\'arrivée'],
  36:['Valise prête et dans la voiture','Téléphone chargé à 100% en permanence','Rester joignable à tout moment'],
  37:['Mode alerte — téléphone toujours sur soi','Relire les signes du début du travail','Vérifier que la valise est complète'],
  38:['Être présent et disponible émotionnellement','Préparer des repas pour les premiers jours','Prévenir famille et amis proches'],
  39:['Organiser une sortie douce','Maintenir le soutien émotionnel','Garder son calme — tu es prêt'],
  40:['Règle 5-1-1 — appeler la maternité','Garder son calme','Tous les documents à portée de main'],
  41:['Rester positif et patient','Soutien émotionnel maximum','Suivre les instructions médicales'],
};

const RDV_LIST = [
  {sa:8,emoji:'🏥',titre:'1ère consultation',desc:'Confirmation grossesse, prises de sang complètes, calcul de la DPA. Sois là, prends des notes.',oblig:true},
  {sa:12,emoji:'🔬',titre:'Écho T1 + trisomie',desc:'Premier visage de bébé. Mesure de la clarté nucale pour évaluer le risque de trisomie 21. Durée : 30-45 min. Filme.',oblig:true},
  {sa:16,emoji:'📋',titre:'Consultation mensuelle',desc:'Suivi standard : tension artérielle, poids, hauteur utérine. Occasion de poser vos questions.',oblig:false},
  {sa:20,emoji:'📝',titre:'Déclaration grossesse CPAM',desc:'À faire avant 15 SA sur ameli.fr. Ouvre les droits aux remboursements à 100%. Aussi à déclarer à l\'employeur.',oblig:true},
  {sa:22,emoji:'👶',titre:'Écho T2 morphologique',desc:'L\'échographie la plus importante. Examine en détail tous les organes et membres. Durée : 45-90 min. Prends une demi-journée.',oblig:true},
  {sa:24,emoji:'🩸',titre:'Test diabète gestationnel',desc:'Test HGPO : 3 prises de sang sur 2 heures. Dépiste un diabète qui peut apparaître pendant la grossesse. Accompagne-la.',oblig:false},
  {sa:28,emoji:'💉',titre:'Début T3 + bilan sanguin',desc:'Bilan sanguin complet. Vaccin coqueluche recommandé pour les deux parents — protège bébé dès la naissance.',oblig:false},
  {sa:32,emoji:'📏',titre:'Écho T3 croissance',desc:'Vérifie la position de bébé, estime son poids, évalue le liquide amniotique et le placenta.',oblig:true},
  {sa:34,emoji:'🎓',titre:'Préparation accouchement',desc:'3 à 8 séances remboursées à 100%. Des séances pour les pères existent dans de nombreuses maternités.',oblig:false},
  {sa:36,emoji:'💬',titre:'Entretien prénatal tardif',desc:'Bilan global, finalisation du projet de naissance. Présence du père fortement recommandée.',oblig:true},
  {sa:38,emoji:'🧳',titre:'Consultation pré-terme',desc:'Vérification du col et position de bébé. Moment pour finaliser les dernières questions pratiques.',oblig:false},
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

function getIdee(mois: number): string {
  const idees = [
    'Encadre la photo de la première échographie et offre-lui le cadre.',
    'Réserve une table dans son restaurant préféré — une soirée rien qu\'à vous deux.',
    'Offre-lui une séance de massage prénatal à domicile ou en institut.',
    'Crée un album photo de la grossesse — commence maintenant.',
    'Organise un week-end ou une escapade avant l\'arrivée de bébé.',
    'Préparez la chambre de bébé ensemble un dimanche.',
    'Offre-lui un coussin de grossesse de qualité.',
    'Planifie un dernier road trip doux avant l\'accouchement.',
    'Écris-lui une lettre manuscrite sur ce que cette grossesse représente pour toi.',
  ];
  return idees[Math.min(mois - 1, 8)];
}


const MOIS_DATA: Record<number, {
  titre: string;
  intro: string;
  developpement: {titre:string; contenu:string}[];
  sante: {titre:string; contenu:string}[];
  papa: {titre:string; contenu:string}[];
  rdv: string;
  vaccins: string;
  alerte: string;
}> = {
  0: {
    titre: 'Le premier mois',
    intro: 'Les premières semaines sont une période d\'adaptation intense pour toute la famille. Bébé découvre le monde, et vous découvrez votre rôle de parents.',
    developpement: [
      {titre:'Vision', contenu:'Bébé voit à 20-30 cm — distance parfaite pour voir ton visage pendant la tétée. Sa vision est floue au-delà. Il est attiré par les contrastes forts et les visages humains. Source : HAS 2023.'},
      {titre:'Sommeil', contenu:'14 à 17h par 24h en cycles de 2-3h. Le sommeil paradoxal représente 50% de son temps (vs 20% adulte) — essentiel pour le développement cérébral. Source : Académie américaine de pédiatrie.'},
      {titre:'Réflexes primitifs', contenu:'Réflexe de Moro (sursaut), grasping (prise), succion, marche automatique — tous normaux et signe d\'un système nerveux sain. Ils disparaissent vers 3-4 mois. Source : Larimer 2021.'},
      {titre:'Communication', contenu:'Bébé reconnaît déjà ta voix et celle de sa mère — entendues in utero. Les pleurs sont son seul langage : faim, inconfort, besoin de contact. Apprendre à les différencier prend 2-3 semaines.'},
    ],
    sante: [
      {titre:'Allaitement', contenu:'8 à 12 tétées par 24h est normal. La montée de lait survient J2-J4. Une bonne prise du sein = bouche grande ouverte, lèvres retroussées, menton contre le sein. Source : OMS / UNICEF.'},
      {titre:'Cordon ombilical', contenu:'Nettoyer avec sérum physiologique 1x/jour. Il tombe naturellement entre J7 et J21. Ne pas couvrir, ne pas tirer. Consulter si rougeur autour du cordon ou odeur. Source : HAS.'},
      {titre:'Poids', contenu:'Perte de poids physiologique normale : jusqu\'à 10% du poids de naissance dans les premiers jours. Récupération du poids de naissance attendue avant J10-J14. Source : HAS 2022.'},
      {titre:'Couches', contenu:'6 à 8 couches mouillées/jour = bébé bien hydraté. Selles jaunes grumeleuses normales en allaitement. Consulter si moins de 6 couches/jour ou selles blanches.'},
    ],
    papa: [
      {titre:'Le peau à peau', contenu:'30 min de peau à peau par jour avec toi régule la température de bébé, stabilise son rythme cardiaque et renforce votre lien. Les études montrent une réduction du stress pour les deux. Source : Moore 2016.'},
      {titre:'Les nuits', contenu:'Organise-vous en roulements : prends le relais certaines nuits pour que ta partenaire récupère. La privation de sommeil post-partum est le premier facteur de dépression post-natale.'},
      {titre:'Baby blues', contenu:'50 à 80% des femmes vivent un baby blues J3-J5 (larmes, émotions intenses, fatigue). C\'est hormonal, normal, et passe en quelques jours. Si ça dure plus de 2 semaines → consulter (dépression post-partum). Source : CNGOF.'},
    ],
    rdv: 'Examen J8 obligatoire par le médecin. Examen du 1er mois entre J28 et J32.',
    vaccins: 'BCG si indiqué. Pas de vaccin obligatoire avant 2 mois.',
    alerte: 'Température > 38°C avant 3 mois → urgences pédiatriques sans attendre. Refus de s\'alimenter sur 2 tétées consécutives. Fontanelle bombée. Difficultés respiratoires → 15.',
  },
  1: {
    titre: '2e mois',
    intro: 'Le premier vrai sourire apparaît — un sourire social, intentionnel. C\'est le début de la communication.',
    developpement: [
      {titre:'Le sourire social', contenu:'Vers 6 semaines, bébé sourit en réponse à ton visage et ta voix — ce n\'est plus un réflexe mais une communication intentionnelle. C\'est une étape majeure du développement socio-émotionnel. Source : Brazelton 2006.'},
      {titre:'Motricité', contenu:'Bébé tient sa tête quelques secondes en position ventrale. Il suit des yeux un objet qui se déplace lentement. Ses mouvements deviennent plus coordonnés. Source : Denver II.'},
      {titre:'Vocalises', contenu:'Premiers "areu" et sons voyelles — bébé expérimente sa voix. Il réagit aux voix familières en tournant la tête. C\'est le début du langage. Source : Locke 1993.'},
    ],
    sante: [
      {titre:'Coliques du nourrisson', contenu:'Pleurs intenses > 3h/jour, > 3j/semaine, > 3 semaines. Touchent 20% des bébés. Cause inconnue, disparaissent spontanément vers 3 mois. Pas de traitement médicamenteux prouvé. Source : HAS 2021.'},
      {titre:'Régurgitations', contenu:'Normales si bébé grossit bien et n\'a pas l\'air douloureux. Signe de RGO pathologique : pleurs pendant/après tétée, refus de manger, mauvaise prise de poids. Source : ESPGHAN 2018.'},
    ],
    papa: [
      {titre:'Parle-lui', contenu:'Parle-lui face à face, en exagérant tes expressions. Les études IRM montrent que le cerveau de bébé synchronise son activité avec celle du parent qui lui parle. C\'est le "serve and return" — base du développement cognitif. Source : Harvard CDC.'},
      {titre:'Dépression post-partum paternelle', contenu:'10% des pères développent une dépression post-partum dans les 3-6 premiers mois. Symptômes : irritabilité, retrait, anxiété excessive. En parler à un médecin est un signe de force. Source : Paulson 2010.'},
    ],
    rdv: 'Examen du 2e mois. Début du carnet de vaccination.',
    vaccins: 'DTCaP-Hib-HepB (Hexavalent) : 1ère dose. Méningocoque B : 1ère dose. Rotavirus : 1ère dose (oral). Source : Calendrier vaccinal 2024.',
    alerte: 'Absence de sourire à 2 mois. Absence de réaction aux sons. Hypotonie majeure (bébé "mou"). Perte de poids.',
  },
  2: {
    titre: '3e mois',
    intro: 'Bébé devient un vrai partenaire d\'échange. Les coliques s\'estompent, les nuits commencent à s\'allonger.',
    developpement: [
      {titre:'Interaction sociale', contenu:'Bébé rit aux éclats pour la première fois. Il reconnaît ses parents à la vue. Il cherche activement le contact visuel et "répond" dans une conversation. Source : Tronick 1978.'},
      {titre:'Motricité', contenu:'Tient bien sa tête. En position ventrale, se soulève sur les avant-bras. Ouvre et ferme les mains intentionnellement. Commence à attraper ce qu\'on lui tend. Source : Denver II.'},
      {titre:'Sommeil', contenu:'Les nuits s\'allongent progressivement : 4-6h de sommeil continu est possible. Le rythme circadien commence à se mettre en place. Source : Touchette 2005.'},
    ],
    sante: [
      {titre:'Diversification', contenu:'Pas encore. La diversification alimentaire ne commence pas avant 4 mois révolus (OMS recommande 6 mois exclusivement). Le lait maternel ou infantile couvre tous les besoins. Source : OMS / HAS.'},
      {titre:'Position de sommeil', contenu:'Toujours sur le dos, dans son propre espace de sommeil, sans tour de lit, sans oreiller, sans couette. C\'est la recommandation HAS pour prévenir la mort inattendue du nourrisson (MIN). Source : HAS 2020.'},
    ],
    papa: [
      {titre:'Le jeu', contenu:'Montre-lui des objets colorés, fais des bulles, lis des livres cartonnés. Le jeu à cet âge n\'est pas un luxe — c\'est le moteur principal du développement cognitif et émotionnel. Source : Ginsburg 2007.'},
      {titre:'Le congé paternité', contenu:'Si pas encore utilisé : le prendre maintenant pour établir votre lien avant la reprise du travail. Les études montrent que l\'implication précoce du père prédit un meilleur développement de l\'enfant à 5 ans. Source : Tanaka 2005.'},
    ],
    rdv: 'Pas de rendez-vous obligatoire ce mois. Surveiller le développement.',
    vaccins: 'DTCaP-Hib-HepB : 2e dose. Méningocoque B : 2e dose. Rotavirus : 2e dose. Pneumocoque : 1ère dose. Source : Calendrier vaccinal 2024.',
    alerte: 'Absence de rires. Absence de suivi visuel. Pas de réaction aux sons forts. Rigidité ou hypotonie des membres.',
  },
  3: {
    titre: '4e mois',
    intro: 'Bébé explore activement le monde. Ses mains deviennent ses premiers outils de découverte.',
    developpement: [
      {titre:'Préhension', contenu:'Bébé attrape et tient des objets. Il les porte à la bouche — c\'est normal, c\'est ainsi qu\'il explore. La phase orale est un stade de développement essentiel décrit par Piaget. Source : Piaget 1952.'},
      {titre:'Vocalisations', contenu:'Gazouillements variés, syllabes comme "ba", "da", "ma". Il "répond" quand tu lui parles en alternant — c\'est un vrai dialogue. Source : Kuhl 2004.'},
      {titre:'Motricité', contenu:'Se retourne du ventre au dos. Porte ses pieds à la bouche. En position assise soutenue, tient la tête parfaitement. Source : Denver II.'},
    ],
    sante: [
      {titre:'Début de diversification possible', contenu:'Entre 4 et 6 mois révolus selon l\'enfant. Commencer si : bébé tient sa tête, montre de l\'intérêt pour la nourriture, n\'a plus le réflexe d\'extrusion. Légumes en purée lisse. Source : ESPGHAN / HAS.'},
      {titre:'Érythème fessier', contenu:'Changer régulièrement, laisser l\'air, crème à l\'oxyde de zinc. Si plaques blanches dans la bouche ou sur les fesses → candidose → traitement antifongique sur prescription. Source : HAS.'},
    ],
    papa: [
      {titre:'La lecture', contenu:'Lire à voix haute 10 minutes par jour à cet âge améliore le vocabulaire à 2 ans et les capacités de lecture à 5 ans. Des livres cartonnés avec peu de mots et des images contrastées. Source : Duursma 2008.'},
    ],
    rdv: 'Examen du 4e mois obligatoire.',
    vaccins: 'Méningocoque B : 3e dose. Source : Calendrier vaccinal 2024.',
    alerte: 'Pas de préhension volontaire. Asymétrie des mouvements. Absence de gazouillements. Pas de sourire.',
  },
  4: {
    titre: '5e mois',
    intro: 'L\'âge de la curiosité : bébé se tourne vers tout ce qui bouge et tout ce qui fait du bruit.',
    developpement: [
      {titre:'Reconnaissance sociale', contenu:'Bébé distingue les visages familiers des étrangers — l\'angoisse de l\'étranger peut débuter. Il reconnaît son prénom et réagit quand on l\'appelle. Source : Fagan 1979.'},
      {titre:'Motricité', contenu:'Se retourne dos-ventre. Peut se tenir assis avec appui. Explore tout avec ses mains et sa bouche. Commence à prendre des objets en opposition pouce-index. Source : Denver II.'},
    ],
    sante: [
      {titre:'Diversification', contenu:'Si commencée, introduire les légumes un à un (4-7 jours entre chaque). Carottes, courgettes, haricots verts, potiron. Purée lisse sans sel ni sucre ajouté. Source : PNNS / HAS.'},
      {titre:'Dentition', contenu:'Les premières dents (incisives inférieures) peuvent apparaître entre 5 et 8 mois. Signes : bave, irritabilité, besoin de mordre. Pas de douleur intense normale — si forte fièvre → consulter. Source : AAP.'},
    ],
    papa: [
      {titre:'L\'angoisse de séparation', contenu:'Normale et signe d\'attachement sain. Ne pas forcer les contacts avec des inconnus. L\'attachement sécure — base fournie par toi et sa mère — est le meilleur prédicteur de santé mentale à l\'âge adulte. Source : Bowlby / Ainsworth.'},
    ],
    rdv: 'Pas de rendez-vous obligatoire. Surveillance de la diversification.',
    vaccins: 'Pas de vaccin ce mois.',
    alerte: 'Asymétrie dans les mouvements. Absence de retournement. Perte d\'acquis (régressions importantes).',
  },
  5: {
    titre: '6e mois',
    intro: 'Mi-première année. Bébé est de plus en plus autonome et interactif. La diversification est en plein essor.',
    developpement: [
      {titre:'Langage', contenu:'Syllabes redupliquées : "bababa", "mamama", "dadada". Ce n\'est pas encore du langage mais l\'entraînement phonologique qui y conduit. Plus tu lui parles, plus son cerveau se structure linguistiquement. Source : Kuhl 2007.'},
      {titre:'Motricité', contenu:'Assis sans soutien pendant quelques secondes. Debout avec appui, commence à faire des petits sauts. Transfert d\'objet d\'une main à l\'autre. Source : Denver II.'},
    ],
    sante: [
      {titre:'Diversification à 6 mois', contenu:'OMS recommande 6 mois d\'allaitement exclusif avant diversification. Introduire les fruits et légumes. Vers 7-8 mois : viande/poisson (10g/jour). Œuf cuit bien cuit dès 6 mois. Source : OMS / ESPGHAN 2017.'},
      {titre:'Allergènes', contenu:'Introduction précoce des allergènes majeurs (arachide, œuf, gluten) entre 4 et 12 mois RÉDUIT le risque d\'allergie. Ne pas retarder leur introduction sans avis médical. Source : LEAP Study / ESPGHAN.'},
    ],
    papa: [
      {titre:'La motricité libre', contenu:'Laisser bébé explorer le sol en sécurité — sans le mettre assis ou debout avant qu\'il ne le fasse seul. La motricité libre (Pikler) développe la confiance en soi et l\'autonomie. Source : Pikler / Bernard-Bonnin 2012.'},
    ],
    rdv: 'Examen du 6e mois obligatoire. Bilan complet.',
    vaccins: 'DTCaP-Hib-HepB : 3e dose (rappel). Pneumocoque : 2e dose. Méningocoque C. Source : Calendrier vaccinal 2024.',
    alerte: 'Absence de syllabes. Pas de tenue assise avec appui. Absence de sourire réciproque. Régressions notables.',
  },
  6: {
    titre: '7e mois',
    intro: 'Bébé commence à se déplacer. L\'espace autour de lui doit maintenant être sécurisé.',
    developpement: [
      {titre:'Déplacement', contenu:'Rampement, 4 pattes ou retournements successifs — chaque bébé trouve sa technique. Le 4 pattes croisé (bras gauche + jambe droite) est idéal neurologiquement mais pas obligatoire. Source : AAP 2022.'},
      {titre:'Permanence de l\'objet', contenu:'Bébé comprend qu\'un objet caché existe encore — étape majeure de Piaget. Il cherche le jouet que tu caches sous une couverture. Base de la pensée abstraite. Source : Piaget 1954.'},
    ],
    sante: [
      {titre:'Sécurisation du domicile', contenu:'Bloquer les prises électriques, coins de table, escaliers. Placer les produits ménagers hors de portée. Attacher les meubles lourds aux murs. La chute est la 1ère cause d\'accident à cet âge. Source : Santé Publique France.'},
    ],
    papa: [
      {titre:'Cache-cache', contenu:'Se cacher derrière tes mains puis réapparaître est bien plus qu\'un jeu : c\'est l\'entraînement de la permanence de l\'objet ET de la gestion émotionnelle de la séparation. Source : Stern 1985.'},
    ],
    rdv: 'Pas de rendez-vous obligatoire.',
    vaccins: 'Pas de vaccin ce mois.',
    alerte: 'Absence de déplacement (pas de reptation ni ramper). Pas de permanence de l\'objet. Asymétrie motrice.',
  },
  7: {
    titre: '8e mois',
    intro: 'L\'angoisse de séparation est à son pic. C\'est le signe d\'un attachement sain et sécure.',
    developpement: [
      {titre:'Angoisse du 8e mois', contenu:'Normale et attendue entre 6 et 12 mois. Bébé prend conscience qu\'il est séparé de ses parents et que vous pouvez disparaître. Un attachement sécure est la meilleure protection contre l\'anxiété future. Source : Ainsworth 1978.'},
      {titre:'Compréhension', contenu:'"Non", "donne", "bravo" : bébé commence à comprendre des mots simples avant de les parler. Vocabulaire réceptif > vocabulaire expressif jusqu\'à 18 mois. Source : Bates 1976.'},
    ],
    sante: [
      {titre:'Alimentation', contenu:'Texture : purées avec petits morceaux mous. Viande/poisson : 10g/jour. Introduire progressivement les textures pour prévenir le refus alimentaire futur. Source : HAS / PNNS.'},
      {titre:'Sommeil', contenu:'Régression du sommeil fréquente au 8e mois liée à l\'angoisse de séparation. Rituel du coucher stable = sécurité. Ne pas laisser bébé pleurer seul de façon prolongée avant 1 an. Source : HAS 2017.'},
    ],
    papa: [
      {titre:'Les au revoir', contenu:'Toujours dire au revoir quand tu pars (même si bébé pleure) plutôt que de partir en douce. Les départs discrets augmentent l\'anxiété — bébé ne comprend pas pourquoi tu as disparu. Source : Bowlby.'},
    ],
    rdv: 'Examen du 8e mois conseillé.',
    vaccins: 'Grippe si indiqué (prématurés, pathologies).',
    alerte: 'Absence de réaction à son prénom. Pas de syllabes. Absence de geste "au revoir". Régression importante.',
  },
  8: {
    titre: '9e mois',
    intro: 'Bébé dit ses premiers mots — ou presque. "Mama" et "dada" commencent à avoir du sens.',
    developpement: [
      {titre:'Premiers mots', contenu:'Les premiers mots signifiants apparaissent entre 9 et 14 mois. "Mama" et "dada" associés à la bonne personne. Le vocabulaire expressif au 12e mois est un bon prédicteur du développement du langage à 2 ans. Source : Fenson 1994.'},
      {titre:'Pincer', contenu:'Pince pouce-index : bébé peut saisir de petits objets avec précision. Signe de maturation neurologique fine. Attention aux petits objets qui peuvent être avalés. Source : Denver II.'},
    ],
    sante: [
      {titre:'Alimentation', contenu:'3 repas + 2 laitages/jour. Introduire les féculents, légumineuses. Éviter sel, sucre ajouté, miel avant 1 an, charcuterie. Jus de fruits : aucun avant 1 an. Source : PNNS / HAS 2021.'},
    ],
    papa: [
      {titre:'Lire chaque soir', contenu:'10 minutes de lecture le soir, même à cet âge, est la pratique parentale la mieux documentée pour le développement du langage. Les enfants à qui on lit quotidiennement ont 1,4 million de mots de plus à 5 ans. Source : Logan 2019.'},
    ],
    rdv: 'Pas de rendez-vous obligatoire.',
    vaccins: 'Méningocoque B : dose de rappel (si non fait à 6 mois).',
    alerte: 'Absence de pince pouce-index. Pas de syllabes variées. Absence de compréhension de mots simples.',
  },
  9: {
    titre: '10e mois',
    intro: 'Bébé devient de plus en plus curieux et déterminé. Il teste les limites — c\'est normal et nécessaire.',
    developpement: [
      {titre:'Debout', contenu:'Bébé se met debout en s\'aidant des meubles. Marche en se tenant aux meubles (cruse). Les premières chutes font partie de l\'apprentissage. Source : Adolph 2012.'},
      {titre:'Imitation', contenu:'Imite gestes et sons volontairement — taper des mains, faire coucou, sonner. L\'imitation est le moteur principal de l\'apprentissage du langage et des comportements sociaux. Source : Meltzoff 2002.'},
    ],
    sante: [
      {titre:'Brossage des dents', contenu:'Dès la première dent, brosser matin et soir avec une brosse à dents adaptée et du dentifrice fluoré 500ppm (taille d\'un grain de riz). Source : Union Française pour la Santé Bucco-Dentaire / HAS.'},
    ],
    papa: [
      {titre:'Les limites', contenu:'Commencer à poser des limites claires et constantes. Non = non, toujours. La consistance des règles (même règle, même réaction) est plus importante que la sévérité. Elle crée la sécurité. Source : Baumrind 1966.'},
    ],
    rdv: 'Pas de rendez-vous obligatoire.',
    vaccins: 'Pas de vaccin ce mois.',
    alerte: 'Pas de mise debout avec appui. Absence d\'imitation. Pas de prise pouce-index.',
  },
  10: {
    titre: '11e mois',
    intro: 'Les premiers pas sont imminents. Une période d\'excitation intense pour toute la famille.',
    developpement: [
      {titre:'Avant les premiers pas', contenu:'Bébé peut se tenir debout sans appui quelques secondes. Il pivote debout, fait des pas latéraux contre les meubles. Les premiers pas indépendants arrivent en moyenne à 12 mois (entre 9 et 15 mois, tout est normal). Source : WHO Motor Development Study.'},
      {titre:'Compréhension', contenu:'Comprend des phrases simples : "donne-moi", "où est papa ?", "viens". Commence à suivre des instructions simples. Son vocabulaire réceptif explose. Source : Tomasello 1995.'},
    ],
    sante: [
      {titre:'Alimentation vers 1 an', contenu:'Préparer la transition vers le lait de croissance (ou lait entier dès 1 an) et une alimentation de plus en plus familiale. Éviter : miel, charcuterie, fromages au lait cru encore quelques mois. Source : HAS / PNNS 4.'},
    ],
    papa: [
      {titre:'Préparer le 1 an', contenu:'Le premier anniversaire est autant pour vous que pour bébé. Prendre un moment pour célébrer ce que vous avez traversé ensemble — en couple. La relation de couple est la base de la stabilité de l\'enfant. Source : Gottman 2000.'},
    ],
    rdv: 'Examen du 12e mois obligatoire (peut être fait à 11 mois).',
    vaccins: 'ROR (Rougeole-Oreillons-Rubéole) : 1ère dose. Méningocoque C : rappel. Varicelle : 1ère dose. Source : Calendrier vaccinal 2024.',
    alerte: 'Absence totale de mots. Pas de marche avec appui. Perte d\'acquis. Absence de pointage.',
  },
  11: {
    titre: '12e mois — 1 an !',
    intro: 'Un an. C\'est un cap immense. Bébé est maintenant un petit être en pleine expansion.',
    developpement: [
      {titre:'Les premiers pas', contenu:'La marche indépendante arrive en moyenne à 12 mois, mais entre 9 et 15 mois c\'est dans la norme. Ne jamais forcer avec des trotteurs — ils retardent la marche et augmentent le risque de chute. Source : AAP / HAS.'},
      {titre:'Langage', contenu:'2 à 5 mots significatifs en moyenne à 12 mois. Mais la compréhension est bien plus développée que la production. L\'important : bébé comprend-il ce qu\'on lui dit ? Source : Rescorla 1989.'},
      {titre:'Jeu symbolique', contenu:'Premiers jeux "faire semblant" : faire boire une peluche, téléphoner avec un objet. C\'est le début de la pensée symbolique — base du langage et de la cognition. Source : Piaget / Vygotski.'},
    ],
    sante: [
      {titre:'Alimentation 1 an', contenu:'Lait de croissance ou lait entier (500ml/jour max). Alimentation variée de table. 4 repas/jour. Pas de lait demi-écrémé avant 2 ans. Pas de restriction alimentaire sans avis médical. Source : PNNS / HAS 2021.'},
      {titre:'Bucco-dentaire', contenu:'Consultation chez le dentiste recommandée dès 1 an. Source : UFSBD 2022.'},
    ],
    papa: [
      {titre:'Bilan de l\'année', contenu:'Tu as fait quelque chose d\'extraordinaire cette année. La recherche montre que les pères qui s\'impliquent activement la première année ont des enfants avec une meilleure régulation émotionnelle, des meilleures performances scolaires, et une meilleure santé mentale à l\'adolescence. Source : Lamb 2004.'},
    ],
    rdv: 'Examen du 12e mois obligatoire. Bilan complet.',
    vaccins: 'ROR : 1ère dose. Méningocoque C. Varicelle. Source : Calendrier vaccinal 2024.',
    alerte: 'Absence totale de mots à 12 mois. Pas de marche avec appui à 15 mois → consultation neuropédiatrie. Perte d\'acquis moteurs ou langagiers.',
  },
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');
  const [moisActif, setMoisActif] = useState(0);
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
  const data = sa ? (SD[sa] || SD[40]) : null;
  const dataR = saReelle ? (SD[saReelle] || SD[40]) : null;
  const dpaDate = dpa ? new Date(dpa) : null;
  const joursRestants = dpaDate ? Math.ceil((dpaDate.getTime() - new Date().getTime())/(1000*60*60*24)) : null;
  const moisG = saReelle ? Math.ceil(saReelle/4.3) : 1;
  const idee = getIdee(moisG);
  const isPost = joursRestants !== null && joursRestants < 0;
  const prog = Math.min(100, Math.round(((saReelle||0)/40)*100));
  const tri = (saReelle||0) <= 14 ? 'T1' : (saReelle||0) <= 27 ? 'T2' : 'T3';
  const missions = saReelle ? (MISSIONS[saReelle] || MISSIONS[40]) : [];
  // Mois bébé post-naissance (0 = mois 1, 1 = mois 2, etc.)
  const moisBebe = isPost && dpaDate
    ? Math.min(11, Math.floor(Math.abs(joursRestants!) / 30))
    : 0;
  const dataBebe = MOIS_DATA[moisBebe];
  // Post-naissance : onglet actif par défaut = 'ce-mois'

  const nextRdv = RDV_LIST.filter(r => saReelle && r.sa >= saReelle)[0];

  const toggleV = (id: string) => { const u={...valiseChecked,[id]:!valiseChecked[id]}; setValiseChecked(u); localStorage.setItem('dadup_valise',JSON.stringify(u)); };
  const toggleM = (id: string) => { const u={...missionsChecked,[id]:!missionsChecked[id]}; setMissionsChecked(u); localStorage.setItem('dadup_missions',JSON.stringify(u)); };
  const saveRdv = (v: string) => { setNextRdvDate(v); localStorage.setItem('dadup_next_rdv',v); };
  const saveRdvI = (s: number, v: string) => { const u={...rdvDates,[s]:v}; setRdvDates(u); localStorage.setItem('dadup_rdv_dates',JSON.stringify(u)); };
  const saveOnb = (d: string, p: string) => { localStorage.setItem('dadup_dpa',d); localStorage.setItem('dadup_prenom',p); setDpa(d); setPrenom(p); setShowOnboarding(false); };

  if (showOnboarding) return <Onboarding onSave={saveOnb}/>;

  const navTabs = isPost ? [
    {id:'home',     label:'Ce mois-ci',   bg:'#E4F5EC', tc:'#0D6B40'},
    {id:'bebe',     label:'Mon bébé',     bg:'#E6F0FA', tc:'#2E5F8A'},
    {id:'rdv',      label:'Santé & RDV',  bg:'#FFF0E6', tc:'#C04A1A'},
  ] : [
    {id:'home',     label:'Accueil',      bg:'#FFF0E6', tc:'#C04A1A'},
    {id:'bebe',     label:'Bébé',         bg:'#E4F5EC', tc:'#0D6B40'},
    {id:'rdv',      label:'RDV',          bg:'#E6F0FA', tc:'#1A4A7A'},
    {id:'pratique', label:'À préparer',   bg:'#FFF7E0', tc:'#8A6010'},
    {id:'bonsplans',label:'Bons plans',   bg:'#FDECEA', tc:'#A03030'},
    {id:'lasuite',  label:'La suite',     bg:'#F0EEFF', tc:'#5050B0'},
  ];

  return (
    <div style={{minHeight:'100vh',background:C.white,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        
        body,*{-webkit-font-smoothing:antialiased;}
        .dd-c{max-width:1080px;margin:0 auto;padding:32px 36px;display:grid;gap:20px;}
        .dd-row3{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:16px;}
        .dd-row33{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
        .dd-row2{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:16px;}
        .dd-mg{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        @media(max-width:860px){
          .dd-c{padding:16px!important;}
          .dd-row3,.dd-row33,.dd-row2{grid-template-columns:1fr!important;}
          .dd-mg{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <div style={{background:C.white,borderBottom:'2px solid #e8e4de',position:'sticky',top:0,zIndex:40}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 32px',height:'64px',maxWidth:'1180px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <svg viewBox="0 0 300 300" width="36" height="36">
              <circle cx="150" cy="150" r="145" fill="#1A3D5C"/>
              <circle cx="150" cy="150" r="122" fill="#2E5F8A"/>
              <ellipse cx="150" cy="205" rx="58" ry="54" fill="#c8a060"/>
              <circle cx="150" cy="112" r="40" fill="#c8a060"/>
              <ellipse cx="150" cy="196" rx="27" ry="31" fill="#F7FAFC"/>
              <circle cx="150" cy="128" r="26" fill="#F7FAFC"/>
            </svg>
            <span style={{fontSize:'22px',fontWeight:900,color:C.dark,letterSpacing:'-0.5px'}}>DadUp</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
            {saReelle&&<div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'80px',height:'4px',background:'#f0ede8',borderRadius:'4px',overflow:'hidden'}}>
                <div style={{height:'4px',background:C.gold,borderRadius:'4px',width:prog+'%'}}/>
              </div>
              <span style={{fontSize:'12px',fontWeight:800,color:C.gold}}>{prog}%</span>
            </div>}
            <div style={{display:'flex',alignItems:'center',gap:'10px',background:"#f7f5f0",borderRadius:'28px',padding:'6px 8px 6px 16px'}}>
              <span style={{fontSize:'15px',fontWeight:800,color:C.dark}}>{prenom||'DadUp'}</span>
              {saReelle&&<div style={{background:C.dark,color:C.white,borderRadius:'16px',padding:'5px 12px',textAlign:'center' as const}}>
                <span style={{fontSize:'12px',fontWeight:900,display:'block',lineHeight:1}}>{saReelle} SA</span>
                <small style={{fontSize:'8px',fontWeight:700,color:'rgba(255,255,255,0.5)',letterSpacing:'1px',display:'block'}}>{tri}</small>
              </div>}
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:'6px',padding:'0 28px 14px',overflowX:'auto' as const,maxWidth:'1180px',margin:'0 auto'}}>
          {navTabs.map((n,idx)=>{
            const tc=[
              {bg:'#FFF0E6',c:'#C04A1A'},
              {bg:'#E4F5EC',c:'#0D6B40'},
              {bg:'#E6F0FA',c:'#1A4A7A'},
              {bg:'#FFF7E0',c:'#8A6010'},
              {bg:'#FDECEA',c:'#A03030'},
            {bg:'#F0EEFF',c:'#5050B0'},
    ][idx]||{bg:'#f7f5f0',c:'#1e2535'};
            const on=activeTab===n.id;
            return (<button key={n.id} onClick={()=>setActiveTab(n.id)} style={{padding:'9px 22px',fontSize:'13px',fontWeight:800,border:'none',borderRadius:'24px',cursor:'pointer',whiteSpace:'nowrap' as const,flexShrink:0,transition:'all 0.15s',background:on?C.dark:tc.bg,color:on?C.white:tc.c}}>
              {n.label}
            </button>);
          })}
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div className="dd-c">


        {/* ========== ACCUEIL ========== */}
        {activeTab==='home' && (
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

            {/* HERO */}
            {isPost ? (
              <div style={{background:C.dark,borderRadius:'24px',padding:'32px',marginBottom:'32px',textAlign:'center'}}>
                <p style={{fontSize:'48px',margin:'0 0 8px'}}>👶</p>
                <p style={{color:C.white,fontSize:'26px',fontWeight:800,margin:0,}}>Bébé est là !</p>
              </div>
            ) : dataR && saReelle && (
              <div style={{background:C.blue,borderRadius:'24px',marginBottom:'24px'}}>
                <div style={{padding:'32px 28px 24px',position:'relative'}}>
                  <div style={{position:'absolute',top:0,right:0,bottom:0,width:'40%',display:'flex',alignItems:'center',justifyContent:'center',opacity:0.1,overflow:'hidden',borderRadius:'0 24px 0 0'}}>
                    <div style={{fontSize:'140px',lineHeight:1}}>{dataR.emoji}</div>
                  </div>
                  <div style={{position:'relative'}}>
                    <p style={{color:'rgba(200,160,96,0.6)',fontSize:'10px',letterSpacing:'3px',textTransform:'uppercase',margin:'0 0 10px',fontWeight:600}}>{saReelle} semaines · {tri}</p>
                    <p style={{color:C.white,fontSize:'32px',fontWeight:800,margin:0,lineHeight:1.1}}>Bébé fait</p>
                    <p style={{color:C.gold,fontSize:'48px',fontWeight:800,margin:0,lineHeight:1}}>{dataR.taille}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'15px',margin:'6px 0 0'}}>et pèse environ {dataR.poids}</p>
                    {joursRestants&&joursRestants>0&&<p style={{color:'rgba(255,255,255,0.25)',fontSize:'13px',margin:'4px 0 0'}}>{joursRestants} jours avant le grand jour</p>}
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
                  {[['Taille',dataR.taille,false],['Poids',dataR.poids,false],['Progression',prog+'%',true]].map(([l,v,g])=>(
                    <div key={String(l)} style={{padding:'16px',textAlign:'center',borderRight:'1px solid rgba(255,255,255,0.08)'}}>
                      <p style={{color:'rgba(255,255,255,0.35)',fontSize:'9px',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 5px'}}>{String(l)}</p>
                      <p style={{color:g?C.gold:'#fff',fontSize:'16px',fontWeight:800,margin:0}}>{String(v)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROCHAIN RDV */}
            {nextRdv&&(
              <div style={{marginBottom:'32px'}}>
                <p style={{color:C.textLight,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 16px'}}>Prochain rendez-vous</p>
                <div style={{display:'flex',alignItems:'center',gap:'16px',paddingBottom:'20px',borderBottom:`1px solid ${C.border}`}}>
                  <div style={{width:'52px',height:'52px',borderRadius:'16px',background:'#E6F0FA',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>{nextRdv.emoji}</div>
                  <div style={{flex:1}}>
                    <p style={{color:C.dark,fontSize:'17px',fontWeight:800,margin:'0 0 2px',}}>{nextRdv.titre}</p>
                    <p style={{color:C.textLight,fontSize:'13px',margin:0}}>{nextRdv.sa} SA{dpa?' · '+new Date(new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'long'}):''}</p>
                  </div>
                  {dpa&&<div style={{background:'rgba(200,160,96,0.12)',borderRadius:'12px',padding:'8px 12px',textAlign:'center',flexShrink:0}}>
                    <p style={{color:C.gold,fontSize:'20px',fontWeight:800,margin:0,lineHeight:1}}>{Math.max(0,Math.round((new Date(dpa).getTime()-(40-nextRdv.sa)*7*24*60*60*1000-new Date().getTime())/(1000*60*60*24)))}j</p>
                  </div>}
                </div>
                <div style={{paddingTop:'16px'}}>
                  <p style={{color:C.textLight,fontSize:'11px',fontWeight:600,margin:'0 0 8px'}}>Ma date de RDV :</p>
                  <input type="date" value={nextRdvDate} onChange={e=>saveRdv(e.target.value)} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:'10px',padding:'10px 14px',fontSize:'13px',color:C.dark,width:'100%',boxSizing:'border-box' as const}}/>
                  {nextRdvDate&&<p style={{color:C.gold,fontSize:'12px',margin:'6px 0 0',fontWeight:600}}>RDV le {new Date(nextRdvDate).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
                </div>
              </div>
            )}

            {/* CE QUE VIT MAMAN / CE MOIS-CI PAPA */}
            {isPost ? (
              dataBebe && (
                <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                  <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:0}}>Pour toi ce mois-ci</p>
                  {dataBebe.papa.map((item,i)=>(
                    <div key={i} style={{background:'#FFF0E6',borderRadius:'18px',padding:'20px 22px'}}>
                      <p style={{color:'#3D1A0A',fontSize:'15px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
                      <p style={{color:'#7A3010',fontSize:'13px',lineHeight:1.75,margin:0}}>{item.contenu}</p>
                    </div>
                  ))}
                </div>
              )
            ) : dataR&&(
              <div style={{marginBottom:'0',background:'#FFF0E6',borderRadius:'22px',padding:'24px 26px'}}>
                <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 12px'}}>Ce que vit maman</p>
                <p style={{color:'#3D1A0A',fontSize:'18px',fontWeight:800,margin:'0 0 12px',lineHeight:1.3}}>{dataR.maman_titre}</p>
                <p style={{color:'#7A3010',fontSize:'14px',lineHeight:1.8,margin:'0 0 16px'}}>{dataR.maman}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'16px'}}>
                  <div style={{background:'rgba(255,255,255,0.65)',borderRadius:'14px',padding:'14px'}}>
                    <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',margin:'0 0 6px'}}>Tu peux aider</p>
                    <p style={{color:'#7A3010',fontSize:'13px',lineHeight:1.6,margin:0}}>{dataR.maman_aide}</p>
                  </div>
                  <div style={{background:'rgba(255,255,255,0.65)',borderRadius:'14px',padding:'14px'}}>
                    <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',margin:'0 0 6px'}}>Le savoir</p>
                    <p style={{color:'#7A3010',fontSize:'13px',lineHeight:1.6,margin:0}}>{dataR.maman_signe}</p>
                  </div>
                </div>
                <div style={{borderLeft:'3px solid #C04A1A',paddingLeft:'14px'}}>
                  <p style={{color:'#3D1A0A',fontSize:'13px',fontWeight:700,margin:'0 0 5px'}}>Quand appeler ?</p>
                  <p style={{color:'#7A3010',fontSize:'13px',lineHeight:1.6,margin:0}}>{dataR.alerte}</p>
                </div>
              </div>
            )}
            {/* LE SAVAIS-TU */}
            {!isPost&&dataR&&(
              <div style={{background:'#1A3D5C',borderRadius:'22px',padding:'26px',marginBottom:'0'}}>
                <p style={{color:'rgba(200,160,96,0.6)',fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 14px',fontWeight:700}}>Le savais-tu ?</p>
                <p style={{color:'#fff',fontSize:'17px',fontWeight:700,lineHeight:1.55,margin:0,fontStyle:'italic'}}>&#34;{dataR.savistu}&#34;</p>
              </div>
            )}

            {/* À SAVOIR */}
            {!isPost&&dataR&&(
              <div style={{marginBottom:'0',background:'#E0F5F0',borderRadius:'22px',padding:'24px 26px'}}>
                <p style={{color:'#0A6050',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 12px'}}>À savoir cette semaine</p>
                <p style={{color:'#0A2A24',fontSize:'17px',fontWeight:800,margin:'0 0 10px',lineHeight:1.3}}>{dataR.doc_titre}</p>
                <p style={{color:'#0A4A3C',fontSize:'14px',lineHeight:1.8,margin:0}}>{dataR.doc}</p>
              </div>
            )}

            {/* CONSEIL + IDÉE */}
            {isPost ? null :
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'32px'}}>
              {dataR&&(
                <div style={{background:'#FDECEA',borderRadius:'22px',padding:'24px 26px'}}>
                  <p style={{color:'#A03030',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 10px'}}>Conseil</p>
                  <p style={{color:'#7A2020',fontSize:'14px',lineHeight:1.75,margin:0}}>{dataR.conseil}</p>
                </div>
              )}
              <div style={{background:'#FFF7E0',borderRadius:'22px',padding:'24px 26px'}}>
                <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 10px'}}>Idée du mois</p>
                <p style={{color:'#3A2800',fontSize:'15px',fontWeight:800,lineHeight:1.4,margin:0}}>{idee}</p>
              </div>
            </div>

}
            {/* MISSIONS */}
            {missions.length>0&&(
              <div>
                <p style={{color:'#9aa0a8',fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 14px'}}>Ta mission cette semaine</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {missions.map((m,i)=>{
                    const id='m_'+saReelle+'_'+i;
                    const done=missionsChecked[id];
                    return(
                      <button key={id} onClick={()=>toggleM(id)} style={{display:'flex',gap:'14px',alignItems:'center',background:C.white,border:`1.5px solid ${C.border}`,cursor:'pointer',textAlign:'left',padding:'14px 18px',borderRadius:'16px'}}>
                        <div style={{width:'22px',height:'22px',borderRadius:'6px',border:`2px solid ${done?'#0D6B40':C.border}`,background:done?'#0D6B40':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                          {done&&<span style={{color:C.dark,fontSize:'12px',fontWeight:700}}>✓</span>}
                        </div>
                        <p style={{color:done?C.textLight:C.dark,fontSize:'13px',margin:0,lineHeight:1.4,textDecoration:done?'line-through':'none'}}>{m}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== BÉBÉ / MON BÉBÉ ========== */}
        {activeTab==='bebe' && (isPost ? (
          dataBebe && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div style={{background:C.blue,borderRadius:'22px',padding:'24px 28px'}}>
                <p style={{color:'rgba(200,220,240,0.65)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Mon bébé · {dataBebe.titre}</p>
                <p style={{color:C.white,fontSize:'22px',fontWeight:800,margin:'0 0 6px'}}>{dataBebe.intro}</p>
              </div>
              <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:0}}>Développement</p>
              {dataBebe.developpement.map((item,i)=>(
                <div key={i} style={{background:'#E4F5EC',borderRadius:'18px',padding:'20px 22px'}}>
                  <p style={{color:'#0A2E1A',fontSize:'15px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
                  <p style={{color:'#0A4A28',fontSize:'13px',lineHeight:1.75,margin:0}}>{item.contenu}</p>
                </div>
              ))}
              <p style={{color:'#1A4A7A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:0}}>Santé & soins</p>
              {dataBebe.sante.map((item,i)=>(
                <div key={i} style={{background:'#E6F0FA',borderRadius:'18px',padding:'20px 22px'}}>
                  <p style={{color:'#0A1E3A',fontSize:'15px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
                  <p style={{color:'#1A3A6A',fontSize:'13px',lineHeight:1.75,margin:0}}>{item.contenu}</p>
                </div>
              ))}
              <div style={{background:'#FDECEA',borderRadius:'18px',padding:'18px 22px',borderLeft:'3px solid #A03030'}}>
                <p style={{color:'#A03030',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Signes à surveiller</p>
                <p style={{color:'#3D0A0A',fontSize:'13px',lineHeight:1.7,margin:0}}>{dataBebe.alerte}</p>
              </div>
            </div>
          )
        ) : data && sa && (
          <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'28px'}}>
              <div>
                <p style={{color:C.textLight,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 4px'}}>{avance?'Dans 4 semaines':'Cette semaine'}</p>
                <h2 style={{color:C.dark,fontSize:'26px',fontWeight:800,margin:0,}}>{saReelle} semaines</h2>
              </div>
              <button onClick={()=>setAvance(!avance)} style={{fontSize:'11px',padding:'8px 16px',borderRadius:'20px',cursor:'pointer',fontWeight:700,background:avance?C.dark:C.white,color:avance?C.gold:C.text,border:avance?'none':`1px solid ${C.border}`}}>
                {avance?'← Revenir':'+4 semaines →'}
              </button>
            </div>

            {/* HERO BÉBÉ */}
            <div style={{background:C.blue,borderRadius:'24px',overflow:'hidden',marginBottom:'24px'}}>
              <div style={{padding:'32px 28px 24px',position:'relative'}}>
                <div style={{position:'absolute',top:0,right:0,bottom:0,width:'38%',display:'flex',alignItems:'center',justifyContent:'center',opacity:0.12,overflow:'hidden'}}>
                  <div style={{fontSize:'130px',lineHeight:1}}>{data.emoji}</div>
                </div>
                <div style={{position:'relative'}}>
                  <p style={{color:'rgba(200,160,96,0.6)',fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 8px',fontWeight:600}}>{sa} SA · {tri}</p>
                  <p style={{color:C.white,fontSize:'15px',margin:'0 0 4px',opacity:0.65}}>{data.titre}</p>
                  <p style={{color:C.gold,fontSize:'46px',fontWeight:800,margin:0,lineHeight:1}}>{data.taille}</p>
                  <p style={{color:'rgba(255,255,255,0.35)',fontSize:'16px',margin:'6px 0 0'}}>{data.poids}</p>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{padding:'16px',textAlign:'center',borderRight:'1px solid rgba(255,255,255,0.08)'}}>
                  <p style={{color:'rgba(255,255,255,0.35)',fontSize:'9px',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 5px'}}>Taille</p>
                  <p style={{color:'#fff',fontSize:'16px',fontWeight:800,margin:0}}>{data.taille}</p>
                </div>
                <div style={{padding:'16px',textAlign:'center',borderRight:'1px solid rgba(255,255,255,0.08)'}}>
                  <p style={{color:'rgba(255,255,255,0.35)',fontSize:'9px',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 5px'}}>Poids</p>
                  <p style={{color:'#fff',fontSize:'16px',fontWeight:800,margin:0}}>{data.poids}</p>
                </div>
                <div style={{padding:'16px',textAlign:'center'}}>
                  <p style={{color:'rgba(255,255,255,0.35)',fontSize:'9px',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 5px'}}>Progression</p>
                  <p style={{color:C.gold,fontSize:'16px',fontWeight:800,margin:0}}>{prog}%</p>
                </div>
              </div>
            </div>

            {/* DÉVELOPPEMENT */}
            <div style={{marginBottom:'28px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'14px'}}>
                <div style={{width:'3px',height:'22px',background:C.gold,borderRadius:'2px',flexShrink:0}}></div>
                <p style={{color:C.dark,fontSize:'15px',fontWeight:800,margin:0}}>Développement</p>
              </div>
              <p style={{color:C.text,fontSize:'14px',lineHeight:1.8,margin:0,paddingLeft:'15px',borderLeft:`1px solid ${C.border}`}}>{data.developpement}</p>
            </div>

            {/* ORGANES en chips */}
            <div style={{marginBottom:'28px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'14px'}}>
                <div style={{width:'3px',height:'22px',background:C.gold,borderRadius:'2px',flexShrink:0}}></div>
                <p style={{color:C.dark,fontSize:'15px',fontWeight:800,margin:0}}>Organes cette semaine</p>
              </div>
              <div style={{display:'flex',flexWrap:'wrap' as const,gap:'8px',paddingLeft:'15px'}}>
                {data.organes.map((o,i)=>(
                  <span key={i} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:'20px',padding:'8px 14px',fontSize:'13px',color:C.dark}}>{o}</span>
                ))}
              </div>
            </div>

            {/* ANECDOTE — citation */}
            <div style={{background:C.blueDark,borderRadius:'22px',padding:'28px',marginBottom:'0'}}>
              <p style={{color:'rgba(200,160,96,0.6)',fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 14px',fontWeight:600}}>Anecdote scientifique</p>
              <p style={{color:C.white,fontSize:'17px',fontWeight:600,lineHeight:1.6,margin:0,}}>"{data.savistu}"</p>
            </div>

            {/* FAQ */}
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'14px'}}>
                <div style={{width:'3px',height:'22px',background:C.gold,borderRadius:'2px',flexShrink:0}}></div>
                <p style={{color:C.dark,fontSize:'15px',fontWeight:800,margin:0}}>Questions fréquentes</p>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px',paddingLeft:'15px'}}>
                {data.faq.map((f,i)=>(
                  <div key={i} style={{background:C.white,borderRadius:'14px',padding:'18px 20px',border:`1px solid ${C.border}`}}>
                    <p style={{color:C.dark,fontSize:'14px',fontWeight:700,margin:'0 0 8px'}}>{f.q}</p>
                    <p style={{color:C.text,fontSize:'13px',lineHeight:1.65,margin:0}}>{f.r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ========== RDV / SANTÉ & RDV ========== */}
        {activeTab==='rdv'&&(isPost ? (
          dataBebe && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div style={{background:C.dark,borderRadius:'22px',padding:'24px 28px'}}>
                <p style={{color:'rgba(200,160,96,0.65)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase' as const,margin:'0 0 8px'}}>Santé & RDV · {dataBebe.titre}</p>
                <p style={{color:C.white,fontSize:'22px',fontWeight:800,margin:0}}>Tout ce qu'il faut surveiller ce mois-ci</p>
              </div>
              <div style={{background:'#FFF7E0',borderRadius:'18px',padding:'20px 22px'}}>
                <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Rendez-vous médical</p>
                <p style={{color:'#3A2800',fontSize:'14px',lineHeight:1.7,margin:0}}>{dataBebe.rdv}</p>
              </div>
              <div style={{background:'#E4F5EC',borderRadius:'18px',padding:'20px 22px'}}>
                <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Vaccins</p>
                <p style={{color:'#0A4A28',fontSize:'14px',lineHeight:1.7,margin:0}}>{dataBebe.vaccins}</p>
              </div>
              <div style={{background:'#FDECEA',borderRadius:'18px',padding:'20px 22px',borderLeft:'3px solid #A03030'}}>
                <p style={{color:'#A03030',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase' as const,margin:'0 0 10px'}}>Signes d'alerte urgents</p>
                <p style={{color:'#3D0A0A',fontSize:'14px',lineHeight:1.75,margin:0}}>{dataBebe.alerte}</p>
              </div>
            </div>
          )
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
            <div style={{marginBottom:'28px'}}>
              <h2 style={{color:C.dark,fontSize:'24px',fontWeight:800,margin:'0 0 4px',}}>Calendrier</h2>
              {dpa&&<p style={{color:C.textLight,fontSize:'13px',margin:0}}>DPA : {new Date(dpa).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</p>}
            </div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute',left:'20px',top:0,bottom:0,width:'1px',background:C.border}}/>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {RDV_LIST.map((r,i)=>{
                  const s=!saReelle?'futur':r.sa<saReelle?'passe':r.sa<=saReelle+2?'prochain':'futur';
                  const rd=dpa?new Date(new Date(dpa).getTime()-(40-r.sa)*7*24*60*60*1000).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}):'';
                  return(
                    <div key={i} style={{position:'relative',paddingLeft:'50px'}}>
                      <div style={{position:'absolute',left:'12px',top:'18px',width:'17px',height:'17px',borderRadius:'50%',border:`2px solid ${s==='passe'?C.gold:s==='prochain'?C.gold:C.border}`,background:s==='passe'?'#0D6B40':s==='prochain'?C.gold:C.bg,display:'flex',alignItems:'center',justifyContent:'center',transform:s==='prochain'?'scale(1.2)':'scale(1)'}}>
                        {s==='passe'&&<span style={{color:C.dark,fontSize:'9px',fontWeight:700}}>✓</span>}
                      </div>
                      <button onClick={()=>setRdvOuvert(rdvOuvert===i?null:i)} style={{width:'100%',textAlign:'left',borderRadius:'14px',padding:'14px 16px',border:'none',cursor:'pointer',background:s==='prochain'?C.dark:C.white,outline:'none',opacity:s==='passe'?0.5:1,boxSizing:'border-box' as const,borderLeft:s==='prochain'?`3px solid ${C.gold}`:`1px solid ${C.border}`}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            <span style={{fontSize:'16px'}}>{r.emoji}</span>
                            <div>
                              <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                                <p style={{color:s==='prochain'?C.white:C.dark,fontSize:'13px',fontWeight:700,margin:0}}>{r.titre}</p>
                                {r.oblig&&<span style={{background:s==='prochain'?'rgba(200,160,96,0.2)':'#f8f7f4',color:C.gold,fontSize:'9px',fontWeight:700,padding:'2px 6px',borderRadius:'8px'}}>obligatoire</span>}
                              </div>
                              <p style={{color:C.textLight,fontSize:'11px',margin:0}}>{r.sa} SA{dpa?' · '+rd:''}</p>
                            </div>
                          </div>
                          <span style={{color:C.textLight,fontSize:'10px'}}>{rdvOuvert===i?'▲':'▼'}</span>
                        </div>
                        {rdvOuvert===i&&(
                          <div style={{marginTop:'12px',paddingTop:'12px',borderTop:`1px solid ${s==='prochain'?'rgba(255,255,255,0.1)':C.border}`}}>
                            <p style={{color:s==='prochain'?'rgba(255,255,255,0.65)':C.text,fontSize:'13px',lineHeight:1.6,margin:'0 0 12px'}}>{r.desc}</p>
                            <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'6px',background:s==='prochain'?C.blue:'#f7f5f0',color:s==='prochain'?C.white:C.dark,fontSize:'12px',fontWeight:700,padding:'8px 14px',borderRadius:'20px',textDecoration:'none',border:s==='prochain'?'none':`1px solid ${C.border}`}}>
                              📅 Prendre RDV sur Doctolib
                            </a>
                            <div style={{marginTop:'12px'}}>
                              <p style={{color:s==='prochain'?'rgba(255,255,255,0.4)':C.textLight,fontSize:'11px',margin:'0 0 6px'}}>Ma date de RDV :</p>
                              <input type="date" value={rdvDates[r.sa]||''} onChange={e=>saveRdvI(r.sa,e.target.value)} style={{background:s==='prochain'?'rgba(255,255,255,0.08)':'#f8f7f4',border:`1px solid ${s==='prochain'?'rgba(255,255,255,0.15)':C.border}`,borderRadius:'8px',padding:'8px 12px',fontSize:'12px',color:s==='prochain'?C.white:C.dark,width:'100%',boxSizing:'border-box' as const}}/>
                              {rdvDates[r.sa]&&<p style={{color:C.gold,fontSize:'11px',margin:'5px 0 0',fontWeight:600}}>{new Date(rdvDates[r.sa]).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</p>}
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
        ))}

        {/* ========== PRATIQUE ========== */}
        {!isPost&&activeTab==='pratique'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
            <h2 style={{color:C.dark,fontSize:'24px',fontWeight:800,margin:'0 0 28px',}}>Pratique</h2>

            {/* VALISE */}
            <div style={{marginBottom:'32px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                <p style={{color:C.textLight,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:0}}>Valise maternité</p>
                <span style={{background:C.blue,color:C.gold,fontSize:'11px',fontWeight:700,padding:'3px 12px',borderRadius:'20px'}}>{Object.values(valiseChecked).filter(Boolean).length}/21</span>
              </div>
              <div style={{background:C.border,borderRadius:'4px',height:'3px',marginBottom:'20px'}}>
                <div style={{background:C.gold,height:'3px',borderRadius:'4px',width:(Object.values(valiseChecked).filter(Boolean).length/21*100)+'%'}}/>
              </div>
              {[
                {titre:'Pour toi',items:[{id:'v1',label:'Chargeur + batterie externe'},{id:'v2',label:'Vêtements confort (2 jours)'},{id:'v3',label:'Snacks & eau'},{id:'v4',label:'Écouteurs'},{id:'v5',label:'Documents hospitaliers'},{id:'v6',label:'Appareil photo chargé'}]},
                {titre:'Pour elle',items:[{id:'v7',label:'Chemise de nuit accouchement'},{id:'v8',label:'Robe de chambre + chaussons'},{id:'v9',label:'Sous-vêtements post-partum'},{id:'v10',label:'Produits de toilette'},{id:'v11',label:'Soutien-gorge allaitement x2'}]},
                {titre:'Pour bébé',items:[{id:'v12',label:'Body naissance x3'},{id:'v13',label:'Pyjama naissance x2'},{id:'v14',label:'Bonnet naissance x2'},{id:'v15',label:'Gigoteuse naissance'},{id:'v16',label:'Siège auto installé'},{id:'v17',label:'Couches nouveau-né'}]},
                {titre:'Documents',items:[{id:'v18',label:'Carte vitale + mutuelle'},{id:'v19',label:'Carnet de maternité'},{id:'v20',label:'Pièces d\'identité'},{id:'v21',label:'Plan accès maternité'}]},
              ].map(s=>(
                <div key={s.titre} style={{marginBottom:'20px'}}>
                  <p style={{color:C.textLight,fontSize:'10px',fontWeight:700,textTransform:'uppercase',letterSpacing:'2px',margin:'0 0 10px'}}>{s.titre}</p>
                  <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                    {s.items.map(item=>(
                      <button key={item.id} onClick={()=>toggleV(item.id)} style={{display:'flex',alignItems:'center',gap:'14px',background:C.white,border:`1px solid ${C.border}`,cursor:'pointer',textAlign:'left',padding:'13px 16px',borderRadius:'12px'}}>
                        <div style={{width:'20px',height:'20px',borderRadius:'5px',border:`2px solid ${valiseChecked[item.id]?C.gold:C.border}`,background:valiseChecked[item.id]?C.gold:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                          {valiseChecked[item.id]&&<span style={{color:C.dark,fontSize:'11px',fontWeight:700}}>✓</span>}
                        </div>
                        <span style={{fontSize:'13px',color:valiseChecked[item.id]?C.textLight:C.dark,textDecoration:valiseChecked[item.id]?'line-through':'none'}}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{height:'1px',background:C.border,marginBottom:'32px'}}/>

            {/* ACHATS */}
            <div style={{marginBottom:'32px'}}>
              <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 16px'}}>Achats prioritaires</p>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {[
                  {label:'Siège auto groupe 0+',p:'urgent',prix:'80-300€'},
                  {label:'Babyphone vidéo',p:'urgent',prix:'40-150€'},
                  {label:'Lit cododo / berceau',p:'urgent',prix:'60-400€'},
                  {label:'Poussette combinée',p:'avant naissance',prix:'200-1200€'},
                  {label:'Tire-lait électrique',p:'si allaitement',prix:'30-200€'},
                  {label:'Thermomètre rectal',p:'urgent',prix:'15-40€'},
                  {label:'Humidificateur',p:'utile',prix:'30-80€'},
                ].map((a,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',background:C.white,borderRadius:'12px',border:`1px solid ${C.border}`}}>
                    <div>
                      <p style={{color:C.dark,fontSize:'13px',fontWeight:600,margin:'0 0 4px'}}>{a.label}</p>
                      <span style={{background:a.p==='urgent'?'#fff0f0':'#f7f5f0',color:a.p==='urgent'?'#cc4444':C.textLight,fontSize:'10px',fontWeight:700,padding:'2px 8px',borderRadius:'8px'}}>{a.p}</span>
                    </div>
                    <p style={{color:C.gold,fontSize:'13px',fontWeight:700,margin:0}}>{a.prix}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========== BONS PLANS ========== */}
        {!isPost&&activeTab==='bonsplans'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
            <h2 style={{color:C.dark,fontSize:'24px',fontWeight:800,margin:'0 0 28px',}}>Bons plans</h2>
            {PARTENAIRES.map((cat,ci)=>(
              <div key={cat.categorie} style={{marginBottom:ci<PARTENAIRES.length-1?'28px':0}}>
                <p style={{color:'#1A4A7A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 14px'}}>{cat.categorie}</p>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {cat.items.map((item,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 18px',background:'#E4F5EC',border:'none',borderRadius:'18px'}}>
                      <div>
                        <p style={{color:C.dark,fontSize:'14px',fontWeight:700,margin:'0 0 3px'}}>{item.nom}</p>
                        <p style={{color:C.textLight,fontSize:'12px',margin:0}}>{item.desc}</p>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
                        <span style={{background:'#FFF7E0',color:'#8A6010',fontSize:'11px',fontWeight:700,padding:'4px 10px',borderRadius:'20px'}}>{item.remise}</span>
                        <a href={item.lien} style={{background:C.blue,color:'#fff',fontSize:'11px',fontWeight:700,padding:'7px 14px',borderRadius:'20px',textDecoration:'none'}}>Voir</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== LA SUITE ========== */}
        {!isPost&&activeTab==='lasuite'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <div>
              <p style={{color:'#5050B0',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 6px'}}>Après la naissance</p>
              <h2 style={{color:C.dark,fontSize:'24px',fontWeight:800,margin:'0 0 4px'}}>La suite — mois par mois</h2>
              <p style={{color:C.textLight,fontSize:'13px',margin:0}}>Contenu médical validé · Sources HAS, OMS, CNGOF, AAP</p>
            </div>

            {/* SÉLECTEUR DE MOIS */}
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap' as const}}>
              {([0,1,2,3,4,5,6,7,8,9,10,11] as number[]).map(m=>(
                <button key={m} onClick={()=>setMoisActif(m)} style={{padding:'8px 16px',fontSize:'12px',fontWeight:800,border:'none',borderRadius:'20px',cursor:'pointer',background:moisActif===m?'#5050B0':'#F0EEFF',color:moisActif===m?'#fff':'#5050B0'}}>
                  {m===0?'1er mois':`${m+1}e mois`}
                  {!joursRestants&&m>0?'':null}
                </button>
              ))}
            </div>

            {/* CONTENU DU MOIS */}
            {(()=>{
              const d = MOIS_DATA[moisActif];
              if(!d) return null;
              return (
                <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                  {/* INTRO */}
                  <div style={{background:'#F0EEFF',borderRadius:'22px',padding:'24px 26px'}}>
                    <p style={{color:'#5050B0',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 10px'}}>{d.titre}</p>
                    <p style={{color:'#26215C',fontSize:'16px',fontWeight:700,lineHeight:1.5,margin:0}}>{d.intro}</p>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:'16px'}}>
                    {/* DÉVELOPPEMENT */}
                    <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                      <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:0}}>Développement</p>
                      {d.developpement.map((item,i)=>(
                        <div key={i} style={{background:'#E4F5EC',borderRadius:'18px',padding:'18px 20px'}}>
                          <p style={{color:'#0A2E1A',fontSize:'14px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
                          <p style={{color:'#0A4A28',fontSize:'13px',lineHeight:1.7,margin:0}}>{item.contenu}</p>
                        </div>
                      ))}
                    </div>

                    {/* SANTÉ */}
                    <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                      <p style={{color:'#1A4A7A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:0}}>Santé & soins</p>
                      {d.sante.map((item,i)=>(
                        <div key={i} style={{background:'#E6F0FA',borderRadius:'18px',padding:'18px 20px'}}>
                          <p style={{color:'#0A1E3A',fontSize:'14px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
                          <p style={{color:'#1A3A6A',fontSize:'13px',lineHeight:1.7,margin:0}}>{item.contenu}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PAPA */}
                  <div>
                    <p style={{color:'#C04A1A',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 12px'}}>Pour toi, papa</p>
                    <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:'12px'}}>
                      {d.papa.map((item,i)=>(
                        <div key={i} style={{background:'#FFF0E6',borderRadius:'18px',padding:'18px 20px'}}>
                          <p style={{color:'#3D1A0A',fontSize:'14px',fontWeight:800,margin:'0 0 6px'}}>{item.titre}</p>
                          <p style={{color:'#7A3010',fontSize:'13px',lineHeight:1.7,margin:0}}>{item.contenu}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:'16px'}}>
                    {/* RDV */}
                    <div style={{background:'#FFF7E0',borderRadius:'18px',padding:'18px 20px'}}>
                      <p style={{color:'#8A6010',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 10px'}}>RDV médical</p>
                      <p style={{color:'#3A2800',fontSize:'13px',lineHeight:1.6,margin:0}}>{d.rdv}</p>
                    </div>
                    {/* VACCINS */}
                    <div style={{background:'#E4F5EC',borderRadius:'18px',padding:'18px 20px'}}>
                      <p style={{color:'#0D6B40',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 10px'}}>Vaccins</p>
                      <p style={{color:'#0A4A28',fontSize:'13px',lineHeight:1.6,margin:0}}>{d.vaccins}</p>
                    </div>
                  </div>

                  {/* ALERTE */}
                  <div style={{background:'#FDECEA',borderRadius:'18px',padding:'18px 20px',borderLeft:'3px solid #A03030'}}>
                    <p style={{color:'#A03030',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'0 0 10px'}}>Signes à surveiller</p>
                    <p style={{color:'#3D0A0A',fontSize:'13px',lineHeight:1.7,margin:0}}>{d.alerte}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
}


function Onboarding({onSave}:{onSave:(d:string,p:string)=>void}) {
  const [dpa,setDpa]=useState('');
  const [prenom,setPrenom]=useState('');
  return(
    <main style={{minHeight:'100vh',background:"#f7f5f0",display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:'sans-serif'}}>
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
          <h1 style={{fontSize:'22px',fontWeight:800,color:C.dark,margin:'0 0 8px',textAlign:'center',}}>Bienvenue sur DadUp</h1>
          <p style={{color:C.text,fontSize:'13px',textAlign:'center',margin:'0 0 24px'}}>Deux infos pour personnaliser ton espace.</p>
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:600,marginBottom:'7px'}}>Ton prénom</label>
              <input type="text" placeholder="Thomas, Julien, Marc..." value={prenom} onChange={e=>setPrenom(e.target.value)} style={{width:'100%',background:"#f7f5f0",border:`1px solid ${C.border}`,borderRadius:'10px',padding:'11px 14px',fontSize:'14px',color:C.dark,boxSizing:'border-box' as const,outline:'none'}}/>
            </div>
            <div>
              <label style={{display:'block',color:C.dark,fontSize:'12px',fontWeight:600,marginBottom:'7px'}}>Date prévue d'accouchement</label>
              <input type="date" value={dpa} onChange={e=>setDpa(e.target.value)} style={{width:'100%',background:"#f7f5f0",border:`1px solid ${C.border}`,borderRadius:'10px',padding:'11px 14px',fontSize:'14px',color:C.dark,boxSizing:'border-box' as const,outline:'none'}}/>
            </div>
            <button onClick={()=>dpa&&onSave(dpa,prenom)} disabled={!dpa} style={{background:dpa?C.dark:'#ccc',color:C.white,border:'none',borderRadius:'24px',padding:'13px',fontSize:'14px',fontWeight:700,cursor:dpa?'pointer':'not-allowed',marginTop:'6px'}}>
              Accéder à mon espace
            </button>
          </div>
        </div>
        <p style={{textAlign:'center',color:C.textLight,fontSize:'11px',marginTop:'14px'}}>Aucune donnée personnelle stockée en ligne.</p>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return(
    <Suspense fallback={<div style={{minHeight:'100vh',background:"#f7f5f0",display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:C.textLight}}>Chargement...</p></div>}>
      <DashboardContent/>
    </Suspense>
  );
}
